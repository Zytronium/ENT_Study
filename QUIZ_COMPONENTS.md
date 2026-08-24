# Reusable Study Quiz Components Guide

This document explains the reusable study quiz components located in `components/study-quiz/` and how to use them to quickly build new practice quizzes or multi-stage interactive activities.

---

## Table of Contents
1. [Overview & Architecture](#overview--architecture)
2. [Component Catalog](#component-catalog)
   - [QuizHeader](#1-quizheader)
   - [QuestionQuiz](#2-questionquiz)
   - [MatchToDefinitionsQuiz](#3-matchtodefinitionsquiz)
   - [MatchToLayerAndNumberQuiz](#4-matchtolayerandnumberquiz)
   - [CalculationQuiz](#5-calculationquiz)
   - [TableWithBlanksQuiz](#6-tablewithblanksquiz)
   - [FlashcardQuiz](#7-flashcardquiz)
   - [MultiSectionQuiz](#8-multisectionquiz)
   - [TabbedQuiz](#9-tabbedquiz)
3. [Mastery / Hard Mode System](#mastery--hard-mode-system)
4. [Flexible Keyword & Alias Validation](#flexible-keyword--alias-validation)
5. [Step-by-Step: Creating a New Quiz Page](#step-by-step-creating-a-new-quiz-page)
6. [Practice Test Sync Checklist](#practice-test-sync-checklist)

---

## Overview & Architecture

All study quiz components share a unified terminal styling theme (`cyber-glass-panel`, `terminal-box`, emerald accents) and standard validation lifecycles. They can be used in two modes:
1. **Standalone**: Renders its own header, content box, action cards, and validation footer.
2. **Embedded**: Renders headless inside `MultiSectionQuiz` or `TabbedQuiz` with `isEmbedded={true}` or `hideHeader={true}`.

```
components/study-quiz/
├── QuizHeader.tsx                 # Standard breadcrumb header & navigation
├── QuestionQuiz.tsx               # Multiple-choice & type-in knowledge checks
├── MatchToDefinitionsQuiz.tsx     # Term-to-definition matching
├── MatchToLayerAndNumberQuiz.tsx  # OSI Layer 1-7 matching & numbering
├── CalculationQuiz.tsx            # Numeric conversion & sizing inputs
├── TableWithBlanksQuiz.tsx        # Multi-stage matrix tables with blanks
├── FlashcardQuiz.tsx              # Interactive hybrid/type/MC flashcards
├── MultiSectionQuiz.tsx           # Step-by-step sequential multi-part runner
└── TabbedQuiz.tsx                 # Tab navigation wrapper for multi-view quizzes
```

---

## Component Catalog

### 1. `QuizHeader`

Renders the top bar containing the module badge, route title, link back to the study guide section, and navigation button back to the hub.

```tsx
import QuizHeader from "@/components/study-quiz/QuizHeader";

<QuizHeader
  moduleTag="DIAGNOSTIC_MODULE"
  moduleCode="ETH_802_3"
  title="802.3 Ethernet Standards"
  studyGuideHref="/study-guide#8023-ethernet-standards"
/>
```

#### Props
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | *(required)* | Display title of the quiz module. |
| `moduleTag` | `string` | `"DIAGNOSTIC_MODULE"` | Tag shown in the green badge. |
| `moduleCode` | `string` | `undefined` | Optional subcode shown next to the tag (e.g., `OSI_L1_L7`). |
| `studyGuideHref` | `string` | `undefined` | Link to relevant section in `/study-guide`. |

---

### 2. `QuestionQuiz`

Handles multiple-choice questions in normal mode and automatically switches to typed answers in mastery mode for eligible questions (`canTypeInHardMode: true`).

```tsx
import QuestionQuiz, { QuestionQuizItem } from "@/components/study-quiz/QuestionQuiz";

const QUESTIONS: QuestionQuizItem[] = [
  {
    id: "csma_cd",
    prompt: "What collision management method is used in half-duplex Ethernet?",
    category: "Media Access",
    options: ["CSMA/CD", "CSMA/CA", "Token Ring", "FDDI"],
    answer: "CSMA/CD",
    aliases: ["CSMA CD", "Carrier Sense Multiple Access with Collision Detection"],
    keywords: ["csma", "cd"],
    explanation: "CSMA/CD detects collisions after transmission and triggers a backoff algorithm.",
    hint: "Think collision detection on legacy coaxial/twisted-pair Ethernet.",
    canTypeInHardMode: true,
  },
];

export default function Page() {
  return (
    <QuestionQuiz
      title="Data Link Layer"
      moduleCode="L2_PROTOCOLS"
      studyGuideHref="/study-guide#data-link-layer"
      questions={QUESTIONS}
    />
  );
}
```

#### `QuestionQuizItem` Interface
- `id`: `string | number` - Unique identifier.
- `prompt`: `string` - Question text.
- `options`: `string[]` - Distractors and correct answer. Shuffled automatically.
- `answer`: `string` - The canonical correct answer string.
- `aliases`: `string[]` *(optional)* - Alternative acceptable text strings.
- `keywords`: `string[]` *(optional)* - Required key concepts/words for fuzzy text matching.
- `explanation`: `string` *(optional)* - Diagnostic feedback shown after validation.
- `hint`: `string` *(optional)* - Hint shown during question review.
- `canTypeInHardMode`: `boolean` *(optional)* - If `true`, turns into a text input during mastery mode.
- `imageSrc` / `alt`: `string` *(optional)* - Optional diagram image URL and description.

---

### 3. `MatchToDefinitionsQuiz`

Matches terms to definitions using either a dropdown selector or interactive clickable button pills.

```tsx
import MatchToDefinitionsQuiz, { DefinitionItem } from "@/components/study-quiz/MatchToDefinitionsQuiz";

const ITEMS: DefinitionItem[] = [
  {
    id: "tdr",
    term: "TDR (Time Domain Reflectometer)",
    definition: "Sends electrical pulses down copper cable to locate breaks or impedance mismatches.",
    aliases: ["TDR", "Time Domain Reflectometer"],
    keywords: ["tdr", "time domain"],
    detailHint: "Used primarily on metallic/copper cabling.",
  },
];

export default function Page() {
  return (
    <MatchToDefinitionsQuiz
      title="Networking Tools"
      moduleCode="TOOLS_01"
      studyGuideHref="/study-guide#networking-tools"
      items={ITEMS}
      mode="auto" // "select" | "buttons" | "auto"
    />
  );
}
```

#### Key Props & Features
- `mode`: `"select"` (dropdowns), `"buttons"` (clickable bank at top), or `"auto"` (buttons if <= 6 items, select if > 6).
- Automatically handles acronym matching for terms formatted like `ACRONYM (Full Term Name)`.
- Scrambles term order upon entering mastery mode or retry.

---

### 4. `MatchToLayerAndNumberQuiz`

Dedicated component for the OSI 7-Layer model. In normal mode, users select layer names. In mastery mode, the layer sequence is scrambled and users must provide both the layer name and its numeric index (1–7).

```tsx
import MatchToLayerAndNumberQuiz, { LayerItem } from "@/components/study-quiz/MatchToLayerAndNumberQuiz";

const OSI_LAYERS: LayerItem[] = [
  { number: 7, name: "Application", description: "Network processes to applications; HTTP, DNS, SSH, FTP." },
  { number: 6, name: "Presentation", description: "Data representation, encryption, compression; SSL/TLS, JPEG." },
  // ... Layer 5 through Layer 1
];

export default function Page() {
  return (
    <MatchToLayerAndNumberQuiz
      title="OSI Model"
      moduleCode="L1_THROUGH_L7"
      studyGuideHref="/study-guide#osi-model"
      layers={OSI_LAYERS}
    />
  );
}
```

---

### 5. `CalculationQuiz`

Validates exact numerical entries, bandwidth sizes, decimal values, and data conversions. Automatically strips formatting commas and checks aliases.

```tsx
import CalculationQuiz, { CalculationQuestion } from "@/components/study-quiz/CalculationQuiz";

const QUESTIONS: CalculationQuestion[] = [
  {
    id: "bytes_in_kb",
    question: "How many bytes are in 1 Kilobyte (KB)?",
    answer: "1000",
    unit: "Bytes",
    aliases: ["1,000", "1000 bytes"],
    explanation: "Standard decimal networking notation uses 1,000 bytes per KB.",
  },
];

export default function Page() {
  return (
    <CalculationQuiz
      title="Bits, Nibbles, and Bytes"
      moduleCode="CALC_DATA"
      studyGuideHref="/study-guide#bits-nibbles-and-bytes"
      questions={QUESTIONS}
    />
  );
}
```

---

### 6. `TableWithBlanksQuiz`

Interactive matrix completion component with progressive multi-stage blanks, dropdowns transitioning to text inputs, dual-value segment cells, and optional arbitrary row ordering.

```tsx
import TableWithBlanksQuiz, { TableColumn, TableRow } from "@/components/study-quiz/TableWithBlanksQuiz";

const COLUMNS: TableColumn[] = [
  { key: "standard", label: "Standard" },
  { key: "speed", label: "Speed" },
  { key: "distance", label: "Distance Limit" },
];

const ROWS: TableRow[] = [
  {
    id: "10gbase_t",
    standard: "10GBASE-T",
    speed: "10 Gbps",
    // Special dual-segment cell feature for 802.3 chart (55m vs 100m)
    cellSegments: {
      distance: [
        { key: "cat6", label: "Cat6", value: "55m", options: ["55m", "100m"] },
        { key: "cat6a", label: "Cat6a", value: "100m", options: ["55m", "100m"] },
      ],
    },
  },
  {
    id: "1000base_t",
    standard: "1000BASE-T",
    speed: "1 Gbps",
    distance: "100m",
  },
];

const COLUMN_OPTIONS = {
  speed: ["100 Mbps", "1 Gbps", "10 Gbps"],
  distance: ["55m", "100m", "500m"],
};

export default function Page() {
  return (
    <TableWithBlanksQuiz
      title="802.3 Ethernet Standards"
      columns={COLUMNS}
      rows={ROWS}
      columnOptions={COLUMN_OPTIONS}
      blankCountsByStage={[4, 8, 12]} // Stage 1 (dropdowns), Stage 2+ (type answer)
      allowAnyRowOrder={false} // Set true if blank rows can match any valid row order
    />
  );
}
```

#### Special Features of `TableWithBlanksQuiz`
- **Dual-Value Cell Segments (`cellSegments`)**: Allows sub-divided cells with separate labels, blanks, and option lists (ideal for standard distance breakdowns like Cat6 vs Cat6a).
- **Stage Progression**: Stage 1 uses dropdown selectors. Stage 2 and beyond switch to `useTextInput` (type the answer).
- **Mastery Mode**: Blanks all eligible cells across the entire matrix.
- **`allowAnyRowOrder={true}`**: When multiple rows are blank, uses 1-to-1 bijection matching to validate rows regardless of physical row position while preventing duplicate entries.

---

### 7. `FlashcardQuiz`

Interactive active-recall study flashcard deck supporting multiple operating modes:
- **Hybrid / Both Mode (`mode="both"`)**: Starts in Multiple Choice for the first N cards (default: 3), then automatically transitions into Type-the-Answer for the remaining deck cards.
- **Multiple Choice Mode (`mode="multiple-choice"`)**: All cards display shuffled multiple-choice buttons.
- **Type-In Mode (`mode="type"`)**: All cards require typing the answer.
- **Mastery / Hard Mode**: Scrambles the deck and enforces Type-the-Answer mode for all cards.

```tsx
import FlashcardQuiz, { FlashcardItem } from "@/components/study-quiz/FlashcardQuiz";

const CARDS: FlashcardItem[] = [
  {
    id: "fc-ssh",
    category: "Remote Access",
    prompt: "What is the standard port number for SSH (Secure Shell)?",
    answer: "22",
    aliases: ["22", "tcp 22", "port 22"],
    keywords: ["22"],
    options: ["22", "23", "3389", "80"],
    explanation: "SSH operates over TCP port 22 to provide encrypted remote management.",
    hint: "Replaces unencrypted Telnet (port 23).",
    meta: "TCP",
  },
];

export default function Page() {
  return (
    <FlashcardQuiz
      title="Transport Layer Ports"
      moduleCode="PORT_DRILL"
      cards={CARDS}
      defaultMode="both"
      hybridChoiceCount={3}
    />
  );
}
```

#### `FlashcardItem` Interface
- `id`: `string | number` - Unique card identifier.
- `prompt`: `string` - Front side prompt/question.
- `answer`: `string` - Back side canonical correct answer.
- `category` *(optional)*: `string` - Category badge (e.g., `"Port Ranges"`).
- `options` *(optional)*: `string[]` - Explicit distractor options (auto-generated from deck if omitted).
- `aliases` *(optional)*: `string[]` - Alternative acceptable spellings/formats.
- `keywords` *(optional)*: `string[]` - Tokenized keyword list for flexible evaluation.
- `explanation` *(optional)*: `string` - Context explanation revealed after answering.
- `hint` *(optional)*: `string` - Optional hint toggle.
- `meta` *(optional)*: `string` - Extra metadata tag (e.g., `"TCP 22"`).

---

### 8. `MultiSectionQuiz`

Orchestrates sequential multi-part study quizzes. Displays progressive stage dots, validates one section at a time, locks future stages until prior stages are passed, and resets answers cleanly upon retry.

```tsx
import MultiSectionQuiz, { MultiSectionConfig } from "@/components/study-quiz/MultiSectionQuiz";

const SECTIONS: MultiSectionConfig[] = [
  {
    id: "part1_mc",
    title: "Part 1: Core Concepts",
    subtitle: "Multiple Choice",
    type: "questions",
    questions: [
      {
        id: "q1",
        prompt: "What is the primary function of Layer 2 switches?",
        options: ["Forward frames via MAC addresses", "Route packets via IP addresses"],
        answer: "Forward frames via MAC addresses",
        canTypeInHardMode: true,
      },
    ],
  },
  {
    id: "part2_match",
    title: "Part 2: Switch Features",
    subtitle: "Definition Matching",
    type: "matching",
    matchingItems: [
      {
        id: "cam",
        term: "CAM Table",
        definition: "Memory storing MAC address to switch port mappings.",
      },
    ],
  },
];

export default function Page() {
  return (
    <MultiSectionQuiz
      title="Layer 2 Switches"
      moduleCode="SW_L2"
      studyGuideHref="/study-guide#layer-2-switches"
      sections={SECTIONS}
    />
  );
}
```

#### Supported `SectionType` Values
1. `"questions"`: Supply `questions: QuestionQuizItem[]`.
2. `"matching"`: Supply `matchingItems: DefinitionItem[]` and optional `matchingOptions`.
3. `"calculation"`: Supply `calculations: CalculationQuestion[]`.
4. `"custom"`: Supply `renderCustom` and `validateCustom` callbacks for unique activities (e.g. interactive simulators).

---

### 9. `TabbedQuiz`

Provides a top-level tab switcher to combine multiple sub-quizzes (such as a matrix reference table and a follow-up diagnostic question set) into a single route while preserving progress across tabs.

```tsx
import TabbedQuiz, { QuizTab } from "@/components/study-quiz/TabbedQuiz";
import TableWithBlanksQuiz from "@/components/study-quiz/TableWithBlanksQuiz";
import QuestionQuiz from "@/components/study-quiz/QuestionQuiz";

export default function Page() {
  const tabs: QuizTab[] = [
    {
      id: "table",
      label: "Reference Table",
      badge: "Matrix",
      content: (
        <TableWithBlanksQuiz
          columns={COLUMNS}
          rows={ROWS}
          isEmbedded={true}
        />
      ),
    },
    {
      id: "questions",
      label: "Conceptual Practice",
      badge: 6,
      content: (
        <QuestionQuiz
          questions={QUESTIONS}
          isEmbedded={true}
        />
      ),
    },
  ];

  return (
    <TabbedQuiz
      title="IP Address Classes"
      moduleCode="IP_CLASS_A_E"
      studyGuideHref="/study-guide#ip-address-classes"
      tabs={tabs}
    />
  );
}
```

---

## Mastery / Hard Mode System

Every quiz component supports an automated mastery workflow activated after the user completes the quiz with a 100% score:
- **Questions (`QuestionQuiz`)**: Scrambles question order and turns questions marked with `canTypeInHardMode: true` into text input boxes.
- **Definitions (`MatchToDefinitionsQuiz`)**: Scrambles terms and switches dropdowns to typed term inputs.
- **OSI Model (`MatchToLayerAndNumberQuiz`)**: Scrambles the 7 layers and requires entering the layer index number (1–7) alongside the layer name.
- **Tables (`TableWithBlanksQuiz`)**: Blanks every eligible cell and requires typed text inputs.
- **Multi-Section Quizzes (`MultiSectionQuiz`)**: Automatically loops back to Stage 1 in mastery mode once all stages are completed.

*Note: In the UI, hard mode is displayed with terminal badges such as `[MASTERY_MODE_ACTIVE]` or `[CALIBRATION_CYCLE_02]` rather than the literal phrase "hard mode".*

---

## Flexible Keyword & Alias Validation

When questions transition to type-the-answer mode, technical validation accommodates common phrasing variations and synonyms without marking correct understanding as wrong:

```ts
{
  id: "topology_bus",
  prompt: "What physical cable type is standard for legacy 10BASE2 bus networks?",
  answer: "Coaxial cable with BNC connectors",
  // Direct full-string alternative matches:
  aliases: [
    "Coaxial cable",
    "Coax",
    "RG-58",
    "10BASE2 Coax",
    "BNC cable",
  ],
  // Tokenized keyword checks (all specified keywords must be present):
  keywords: ["coax", "bnc"],
}
```

Validation engine matching rules:
1. Exact match (case-insensitive, trimmed).
2. Normalized match (punctuation and whitespace removed).
3. Alias array match against normalized user string.
4. Tokenized keyword match: if all items in `keywords` appear in the user's input, the answer is accepted.

---

## Step-by-Step: Creating a New Quiz Page

1. **Create the Route**: Create `app/<quiz-slug>/page.tsx`.
2. **Import Required Components**:
   ```tsx
   "use client";
   import MultiSectionQuiz, { MultiSectionConfig } from "@/components/study-quiz/MultiSectionQuiz";
   ```
3. **Define Quiz Data**: Structure questions, tables, or matching items according to the TypeScript interfaces above.
4. **Return the Component**:
   ```tsx
   export default function QuizPage() {
     return (
       <MultiSectionQuiz
         title="My New Topic"
         moduleCode="TOPIC_01"
         studyGuideHref="/study-guide#my-new-topic"
         sections={SECTIONS}
       />
     );
   }
   ```
5. **Add Layout Metadata**: Create `app/<quiz-slug>/layout.tsx` for route titles and descriptions.

---

## Practice Test Sync Checklist

Whenever you create or edit a study quiz, complete the following required steps:
- [ ] Add the question/activity to `lib/practice-test/questions.ts` or `lib/practice-test/registry.ts`.
- [ ] Add an alternatively worded equivalent question to `lib/practice-test/questions.ts`.
- [ ] Link the quiz on the home dashboard (`app/page.tsx`).
- [ ] Link the quiz under its respective section in the study guide viewer (`app/study-guide/page.tsx`).
- [ ] Verify functionality with tests (`npx tsx --test test/*.test.ts`).
- [ ] Build the application (`npm run build`) to ensure zero TypeScript and route generation errors.
