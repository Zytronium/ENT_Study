"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import QuestionQuiz from "@/components/study-quiz/QuestionQuiz";
import MatchToDefinitionsQuiz from "@/components/study-quiz/MatchToDefinitionsQuiz";
import CalculationQuiz from "@/components/study-quiz/CalculationQuiz";
import FlashcardQuiz from "@/components/study-quiz/FlashcardQuiz";
import TableWithBlanksQuiz from "@/components/study-quiz/TableWithBlanksQuiz";
import TabbedQuiz, { QuizTab } from "@/components/study-quiz/TabbedQuiz";
import type { JsonQuizDefinition, QuizSectionJson } from "@/lib/json-quizzes";

// -------- header props --------

type HeaderProps = {
  moduleTag?: string;
  moduleCode?: string;
  title?: string;
  studyGuideHref?: string;
};

// Builds the props every quiz component shares (header info in standalone
// mode, or hideHeader/isEmbedded when nested inside a TabbedQuiz tab).
function buildSharedProps(
  section: { heading?: string; description?: string },
  header: HeaderProps | null,
  isMastery: boolean
) {
  if (header === null) {
    return {
      heading: section.heading,
      description: section.description,
      initialHardMode: isMastery,
      hideHeader: true,
      isEmbedded: true,
    };
  }

  return {
    moduleTag: header.moduleTag ?? "DIAGNOSTIC_MODULE",
    moduleCode: header.moduleCode,
    title: header.title,
    studyGuideHref: header.studyGuideHref,
    heading: section.heading,
    description: section.description,
    initialHardMode: isMastery,
  };
}

// -------- section renderer --------

// `header` is null for a tab embedded inside TabbedQuiz, and set to the
// quiz-level header info when the section renders standalone.
function renderSection(section: QuizSectionJson, header: HeaderProps | null, isMastery: boolean) {
  const shared = buildSharedProps(section, header, isMastery);

  switch (section.type) {
    case "questions":
      return <QuestionQuiz {...shared} questions={section.questions} />;
    case "matching":
      return <MatchToDefinitionsQuiz {...shared} items={section.items} mode={section.mode ?? "auto"} />;
    case "calculation":
      return <CalculationQuiz {...shared} questions={section.questions} />;
    case "flashcards":
      return (
        <FlashcardQuiz
          {...shared}
          cards={section.cards}
          defaultMode={section.defaultMode ?? "both"}
          hybridChoiceCount={section.hybridChoiceCount ?? 3}
        />
      );
    case "table":
      return (
        <TableWithBlanksQuiz
          {...shared}
          columns={section.table.columns}
          rows={section.table.rows}
          columnOptions={section.table.columnOptions}
          blankCountsByStage={section.table.blankCountsByStage}
          allowAnyRowOrder={section.table.allowAnyRowOrder ?? false}
        />
      );
    default:
      return null;
  }
}

function JsonQuizContent({ quiz }: { quiz: JsonQuizDefinition }) {
  const searchParams = useSearchParams();
  const isMastery = searchParams.get("mastery") === "true";
  const studyGuideHref = quiz.studyGuideAnchor ? `/study-guide#${quiz.studyGuideAnchor}` : undefined;

  if (quiz.type === "tabbed") {
    const tabs: QuizTab[] = quiz.tabs.map((section) => ({
      id: section.id,
      label: section.label,
      content: renderSection(section, null, isMastery),
    }));

    return (
      <TabbedQuiz
        moduleTag={quiz.moduleTag ?? "DIAGNOSTIC_MODULE"}
        moduleCode={quiz.moduleCode}
        title={quiz.title}
        studyGuideHref={studyGuideHref}
        tabs={tabs}
      />
    );
  }

  // Standalone (non-tabbed) quiz: treat the whole definition as a single section.
  const section = { id: "root", label: quiz.title, ...quiz } as QuizSectionJson;
  const header: HeaderProps = {
    moduleTag: quiz.moduleTag,
    moduleCode: quiz.moduleCode,
    title: quiz.title,
    studyGuideHref,
  };

  return renderSection(section, header, isMastery);
}

export default function JsonQuizRenderer({ quiz }: { quiz: JsonQuizDefinition }) {
  return (
    <Suspense fallback={null}>
      <JsonQuizContent quiz={quiz} />
    </Suspense>
  );
}
