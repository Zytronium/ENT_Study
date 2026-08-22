"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import MultiSectionQuiz, { MultiSectionConfig } from "@/components/study-quiz/MultiSectionQuiz";
import { DefinitionItem } from "@/components/study-quiz/MatchToDefinitionsQuiz";
import { CalculationQuestion } from "@/components/study-quiz/CalculationQuiz";
import { QuestionQuizItem } from "@/components/study-quiz/QuestionQuiz";

const stage1Matching: DefinitionItem[] = [
  { id: 1, term: "Bit", definition: "Abbreviated as lowercase 'b', represents a single 1 or 0 (on or off)." },
  { id: 2, term: "Nibble", definition: "A data unit composed of 4 bits." },
  { id: 3, term: "Byte", definition: "Abbreviated as uppercase 'B', consists of 8 bits." },
  { id: 4, term: "Kilobit (Kb)", definition: "Standard unit composed of exactly 1,000 bits." },
  { id: 5, term: "Kilobyte (KB)", definition: "Standard unit composed of exactly 1,024 bytes." },
];

const stage2Conversions: CalculationQuestion[] = [
  { id: 6, question: "How many bits are in a Nibble?", answer: "4", explanation: "1 Nibble = 4 bits." },
  { id: 7, question: "How many bits are in a Byte?", answer: "8", explanation: "1 Byte = 8 bits." },
  { id: 8, question: "How many nibbles are in a Byte?", answer: "2", explanation: "1 Byte = 2 nibbles (8 bits / 4 bits)." },
  { id: 9, question: "How many bits are in a kilobit (Kb)?", answer: "1000", explanation: "1 Kilobit (Kb) = 1,000 bits." },
  { id: 10, question: "How many bytes are in a kilobyte (KB)?", answer: "1024", explanation: "1 Kilobyte (KB) = 1,024 bytes." },
];

const stage3Misc: QuestionQuizItem[] = [
  {
    id: 11,
    prompt: "Data throughput (speed) is typically measured in which unit per second?",
    options: ["Bits", "Bytes"],
    answer: "Bits",
    explanation: "Network transfer speeds and throughput are measured in bits per second (b/s or bps).",
    canTypeInHardMode: true,
  },
  {
    id: 12,
    prompt: "Data storage is typically measured in which unit?",
    options: ["Bits", "Bytes"],
    answer: "Bytes",
    explanation: "Data storage capacities (RAM, hard drives, file sizes) are measured in Bytes (B).",
    canTypeInHardMode: true,
  },
  {
    id: 13,
    prompt: "Which abbreviation represents 1,000 bits?",
    options: ["Kb", "KB", "Mb", "MB"],
    answer: "Kb",
    explanation: "Lowercase 'b' denotes bits: Kb = 1,000 bits.",
    canTypeInHardMode: true,
  },
  {
    id: 14,
    prompt: "Which abbreviation represents 1,024 bytes?",
    options: ["Kb", "KB", "Mb", "MB"],
    answer: "KB",
    explanation: "Uppercase 'B' denotes bytes: KB = 1,024 bytes.",
    canTypeInHardMode: true,
  },
];

const sections: MultiSectionConfig[] = [
  {
    id: "sec-definitions",
    title: "DATA_UNITS_DEFINITIONS",
    subtitle: "[PART_01: TECHNICAL_DEFINITIONS]",
    description: "Match each standard data unit to its exact technical definition.",
    type: "matching",
    matchingItems: stage1Matching,
  },
  {
    id: "sec-conversions",
    title: "CONVERSION_CALCULATIONS",
    subtitle: "[PART_02: CONVERSION_TABLES]",
    description: "Calculate and enter the exact numerical conversions between bits, nibbles, bytes, and kilobytes.",
    type: "calculation",
    calculations: stage2Conversions,
  },
  {
    id: "sec-applications",
    title: "SPEED_VS_STORAGE_SPECS",
    subtitle: "[PART_03: SPEED_VS_STORAGE]",
    description: "Select the correct metrics and abbreviations for throughput vs storage.",
    type: "questions",
    questions: stage3Misc,
  },
];

function BitsBytesContent() {
  const searchParams = useSearchParams();
  const isMastery = searchParams.get("mastery") === "true";

  return (
    <MultiSectionQuiz
      moduleTag="DIAGNOSTIC_MODULE"
      moduleCode="DATA_UNITS"
      title="Bits, Nibbles, Bytes, and Conversions"
      studyGuideHref="/study-guide#bits-nibbles-and-bytes"
      sections={sections}
      initialHardMode={isMastery}
    />
  );
}

export default function BitsBytesNibbles() {
  return (
    <Suspense fallback={null}>
      <BitsBytesContent />
    </Suspense>
  );
}
