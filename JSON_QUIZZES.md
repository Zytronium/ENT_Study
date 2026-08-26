# JSON-Driven Study Quizzes

This document explains `lib/json-quizzes.ts`, the `app/[slug]/` dynamic route, and how to add a new
study quiz as a JSON file instead of hand-writing a `.tsx` page.

---

## Overview

Drop a `.json` file into `lib/json_quizzes/` and it is automatically:
- Served at `/<slug>`
- Listed on the home dashboard (`app/page.tsx`)
- Linked from its study guide section, if `studyGuideAnchor` is set

No route file, layout file, or registry edit is required for the quiz itself. The JSON is read at build
time by `lib/json-quizzes.ts` (server-only, uses `fs`), so a new file requires a rebuild to appear.

Since the dynamic route lives at the site root (`app/[slug]/page.tsx`), it sits alongside every
hand-written quiz route (`/osi-model`, `/ports`, `/dns`, etc). Next.js always matches a static route
folder before falling back to a dynamic segment, so an existing static route wins on a name collision.
`lib/json-quizzes.ts` checks new slugs against the existing static routes at build time and throws if one
collides, so a colliding quiz fails loudly instead of silently becoming unreachable.

```
lib/json_quizzes/
├── dns-record-types.json
└── <your-new-quiz>.json
```

Under the hood, `app/[slug]/page.tsx` looks up the quiz by slug and hands it to
`components/study-quiz/JsonQuizRenderer.tsx`, a client component that maps the JSON onto the same
`QuestionQuiz`, `MatchToDefinitionsQuiz`, `CalculationQuiz`, `FlashcardQuiz`, `TableWithBlanksQuiz`,
`TerminalQuiz`, and `TabbedQuiz` components described in `QUIZ_COMPONENTS.md`. Every field name below matches the prop name on
those components, so the JSON is essentially their props serialized to JSON.

---

## Required Top-Level Fields

| Field | Type | Description |
| :--- | :--- | :--- |
| `slug` | `string` | Route segment. The quiz is served at `/<slug>`. Must be unique. |
| `title` | `string` | Quiz title, shown in the header and on the home dashboard. |
| `type` | `string` | One of `questions`, `matching`, `calculation`, `flashcards`, `table`, `terminal`, `tabbed`. |
| `homeDescription` | `string` | Description shown on the home dashboard card. |

## Optional Top-Level Fields

| Field | Type | Description |
| :--- | :--- | :--- |
| `date` | `string` | Date shown on the home dashboard card (e.g. `"8/26/26"`). |
| `moduleTag` | `string` | Defaults to `"DIAGNOSTIC_MODULE"`. |
| `moduleCode` | `string` | Subcode shown next to the module tag. |
| `studyGuideAnchor` | `string` | Heading `id` in `STUDY_GUIDE.md` this quiz belongs under. When set, a
practice quiz card is injected into the study guide beneath that heading, the same way it works for the
hand-written quizzes. |
| `studyGuideDescription` | `string` | Description shown on the study guide's practice quiz card. Falls back
to `homeDescription` when omitted. |
| `offline` | `boolean` | Shows the `[OFFLINE]` badge on the home dashboard card. |

---

## Single-Type Quiz (`type` other than `tabbed`)

For everything except `type: "tabbed"`, the top-level object also carries the section's own fields
directly, plus optional `heading` and `description` strings for the quiz content box:

```json
{
  "slug": "dns-record-types",
  "title": "DNS Record Types",
  "date": "8/26/26",
  "homeDescription": "Common DNS record types and what each one resolves.",
  "studyGuideAnchor": "dns-record-types",
  "studyGuideDescription": "Practice identifying DNS record types.",
  "type": "questions",
  "heading": "[DNS_RECORD_TYPE_CHALLENGE]",
  "description": "Test your knowledge of common DNS record types.",
  "questions": [
    {
      "id": "dns-record-a",
      "category": "Record Types",
      "prompt": "Which DNS record type maps a hostname directly to an IPv4 address?",
      "options": ["A", "AAAA", "CNAME", "MX"],
      "answer": "A",
      "aliases": ["a record", "a"],
      "keywords": ["a", "ipv4"],
      "explanation": "An A record maps a hostname to an IPv4 address.",
      "canTypeInHardMode": true
    }
  ]
}
```

### `type: "questions"`
`questions`: array of `QuestionQuizItem` objects (same shape as `QuestionQuiz` in `QUIZ_COMPONENTS.md`).

### `type: "matching"`
`items`: array of `DefinitionItem` objects. Optional `mode`: `"select" | "buttons" | "auto"`.

### `type: "calculation"`
`questions`: array of `CalculationQuestion` objects.

### `type: "flashcards"`
`cards`: array of `FlashcardItem` objects. Optional `defaultMode`: `"multiple-choice" | "type" | "both"`
(default `"both"`) and `hybridChoiceCount` (default `3`).

### `type: "table"`
`table`: an object with `columns`, `rows`, optional `columnOptions`, `blankCountsByStage`, and
`allowAnyRowOrder` (default `false`), matching `TableWithBlanksQuiz`'s props.

### `type: "terminal"`
`terminal`: an object with `platform` (`"windows"` or `"linux"`) and a `tasks` array. Each task has a `prompt` and
`steps`; each step has accepted `commands` and simulated `output`. A task may also include a `question` with `prompt`,
`options`, `answer`, optional `aliases`, and optional `explanation`. Tasks without a question are completed by entering
the command; tasks with a question require entering the command and selecting the correct answer.

---

## Tabbed Quiz (`type: "tabbed"`)

Combines several sections under one route, the same way `TabbedQuiz` combines a table, question set, and
flashcard deck on the ports page:

```json
{
  "slug": "example-tabbed-quiz",
  "title": "Example Tabbed Quiz",
  "homeDescription": "...",
  "type": "tabbed",
  "tabs": [
    {
      "id": "table",
      "label": "[01_TABLE]",
      "type": "table",
      "table": { "columns": [], "rows": [] }
    },
    {
      "id": "questions",
      "label": "[02_QUESTIONS]",
      "type": "questions",
      "questions": []
    }
  ]
}
```

Each entry in `tabs` uses the same section field names described above (`items`, `questions`, `cards`,
`table`), plus a required `id` and `label` for the tab itself.

---

## After Adding a New JSON Quiz

Follow the same checklist as any other quiz addition (see `HUMANS.md`):
- Add the question(s) and an alternatively worded equivalent to `lib/practice-test/questions.ts`.
- Add any new activity to `lib/practice-test/registry.ts`.
- Play test the new quiz at `/<slug>` and the master practice test.
- Run `npm run build`.

The home dashboard link and (if `studyGuideAnchor` is set) the study guide card are both generated
automatically, so there's nothing to hand-edit in `app/page.tsx` or `app/study-guide/page.tsx` for the quiz
itself.
