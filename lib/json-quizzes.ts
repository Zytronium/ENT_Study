import fs from "fs";
import path from "path";
import { STATIC_STUDY_TOPICS } from "@/lib/study-topics";

// -------- shared item types (mirror the existing quiz component props) --------

export type QuestionQuizItemJson = {
  id: string | number;
  category?: string;
  prompt: string;
  options: string[];
  answer: string;
  aliases?: string[];
  keywords?: string[];
  explanation?: string;
  hint?: string;
  canTypeInHardMode?: boolean;
  imageSrc?: string;
  alt?: string;
};

export type DefinitionItemJson = {
  id: string | number;
  term: string;
  definition: string;
  aliases?: string[];
  keywords?: string[];
  detailHint?: string;
};

export type CalculationQuestionJson = {
  id: string | number;
  question: string;
  answer: string;
  unit?: string;
  aliases?: string[];
  explanation?: string;
};

export type FlashcardItemJson = {
  id: string | number;
  category?: string;
  prompt: string;
  answer: string;
  options?: string[];
  aliases?: string[];
  keywords?: string[];
  explanation?: string;
  hint?: string;
  meta?: string;
};

export type TableColumnJson = { key: string; label: string };

// Rows are open-ended since column keys are author-defined per quiz.
export type TableRowJson = Record<string, unknown> & { id: string | number };

export type TableConfigJson = {
  columns: TableColumnJson[];
  rows: TableRowJson[];
  columnOptions?: Record<string, string[]>;
  blankCountsByStage?: number[];
  allowAnyRowOrder?: boolean;
};

export type TerminalCommandStepJson = {
  commands: string[];
  output: string;
};

export type TerminalTaskJson = {
  id: string | number;
  prompt: string;
  steps: TerminalCommandStepJson[];
  question?: {
    prompt: string;
    options: string[];
    answer: string;
    aliases?: string[];
    explanation?: string;
  };
};

export type TerminalConfigJson = {
  platform: "windows" | "linux";
  tasks: TerminalTaskJson[];
};

// -------- section types (used standalone or as tabs inside a tabbed quiz) --------

type SectionBase = {
  id: string;
  label: string;
  heading?: string;
  description?: string;
};

export type QuizSectionJson =
  | (SectionBase & { type: "questions"; questions: QuestionQuizItemJson[] })
  | (SectionBase & { type: "matching"; items: DefinitionItemJson[]; mode?: "select" | "buttons" | "auto" })
  | (SectionBase & { type: "calculation"; questions: CalculationQuestionJson[] })
  | (SectionBase & {
  type: "flashcards";
  cards: FlashcardItemJson[];
  defaultMode?: "multiple-choice" | "type" | "both";
  hybridChoiceCount?: number;
})
  | (SectionBase & { type: "table"; table: TableConfigJson })
  | (SectionBase & { type: "terminal"; terminal: TerminalConfigJson });

// -------- top-level quiz definition --------

type QuizMeta = {
  slug: string;
  title: string;
  date?: string;
  homeDescription: string;
  moduleTag?: string;
  moduleCode?: string;
  studyGuideAnchor?: string;
  studyGuideDescription?: string;
  offline?: boolean;
};

export type JsonQuizDefinition = QuizMeta &
  (
    | { type: "questions"; heading?: string; description?: string; questions: QuestionQuizItemJson[] }
    | {
    type: "matching";
    heading?: string;
    description?: string;
    items: DefinitionItemJson[];
    mode?: "select" | "buttons" | "auto";
  }
    | { type: "calculation"; heading?: string; description?: string; questions: CalculationQuestionJson[] }
    | {
    type: "flashcards";
    heading?: string;
    description?: string;
    cards: FlashcardItemJson[];
    defaultMode?: "multiple-choice" | "type" | "both";
    hybridChoiceCount?: number;
  }
    | { type: "table"; heading?: string; description?: string; table: TableConfigJson }
    | { type: "terminal"; heading?: string; description?: string; terminal: TerminalConfigJson }
    | { type: "tabbed"; tabs: QuizSectionJson[] }
    );

// A lightweight shape matching the `studyTopics` entries used on the home page.
export type StudyTopicEntry = {
  href: string;
  title: string;
  date: string;
  description: string;
  offline?: boolean;
};

const JSON_QUIZ_DIR = path.join(process.cwd(), "lib", "json_quizzes");

// Cached at module scope so repeated calls during a single build/request don't
// re-read the directory from disk.
let cache: JsonQuizDefinition[] | null = null;

function readQuizFile(fileName: string): JsonQuizDefinition {
  const fullPath = path.join(JSON_QUIZ_DIR, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");

  let parsed: JsonQuizDefinition;
  try {
    parsed = JSON.parse(raw) as JsonQuizDefinition;
  } catch (err) {
    throw new Error(`Failed to parse JSON quiz file "${fileName}": ${(err as Error).message}`);
  }

  if (!parsed.slug || !parsed.title || !parsed.type || !parsed.homeDescription) {
    throw new Error(
      `JSON quiz file "${fileName}" is missing one of the required fields: "slug", "title", "type", "homeDescription".`
    );
  }

  if (parsed.type === "tabbed" && (!Array.isArray(parsed.tabs) || parsed.tabs.length === 0)) {
    throw new Error(`JSON quiz file "${fileName}" has type "tabbed" but no "tabs" were provided.`);
  }

  return parsed;
}

// -------- public API --------

export function getAllJsonQuizzes(): JsonQuizDefinition[] {
  if (cache) return cache;

  if (!fs.existsSync(JSON_QUIZ_DIR)) {
    cache = [];
    return cache;
  }

  const files = fs.readdirSync(JSON_QUIZ_DIR).filter((f) => f.endsWith(".json"));
  const quizzes = files.map(readQuizFile);

  // Every JSON quiz is served at the site root (/<slug>), alongside other
  // top-level app/ route folders. A static route always wins on a name
  // collision, so a colliding JSON quiz would silently become unreachable.
  // Catch that at build time instead.
  const reservedSlugs = new Set<string>([
    "study-guide",
    "practice-test",
    "api",
    ...STATIC_STUDY_TOPICS.map((topic) => topic.href.replace(/^\//, "")),
  ]);

  const seenSlugs = new Set<string>();
  for (const quiz of quizzes) {
    if (seenSlugs.has(quiz.slug)) {
      throw new Error(`Duplicate JSON quiz slug detected: "${quiz.slug}". Slugs must be unique across lib/json_quizzes/.`);
    }
    seenSlugs.add(quiz.slug);

    if (reservedSlugs.has(quiz.slug)) {
      throw new Error(
        `JSON quiz slug "${quiz.slug}" collides with an existing route. Rename it in lib/json_quizzes/.`
      );
    }
  }

  cache = quizzes;
  return cache;
}

export function getJsonQuizBySlug(slug: string): JsonQuizDefinition | undefined {
  return getAllJsonQuizzes().find((quiz) => quiz.slug === slug);
}

export function getJsonQuizSlugs(): string[] {
  return getAllJsonQuizzes().map((quiz) => quiz.slug);
}

// Converts a JSON quiz definition into the same shape used by the static
// `studyTopics` list on the home page, so both sources can be merged and
// rendered by the same `StudyTopicLink` component.
export function jsonQuizToStudyTopic(quiz: JsonQuizDefinition): StudyTopicEntry {
  return {
    href: `/${quiz.slug}`,
    title: quiz.title,
    date: quiz.date ?? "",
    description: quiz.homeDescription,
    offline: quiz.offline ?? false,
  };
}
