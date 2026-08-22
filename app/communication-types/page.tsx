"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import MultiSectionQuiz, { MultiSectionConfig } from "@/components/study-quiz/MultiSectionQuiz";
import { DefinitionItem } from "@/components/study-quiz/MatchToDefinitionsQuiz";
import { QuestionQuizItem } from "@/components/study-quiz/QuestionQuiz";

const commTypes = ["Simplex", "Half-Duplex", "Full Duplex"];

const definitionChallenges: DefinitionItem[] = [
  {
    id: 1,
    term: "Simplex",
    definition: "Connection that allows ONLY ONE direction of communication.",
    detailHint: "Host A ─────────▶ Host B (One-way only)",
    aliases: ["simplex"],
  },
  {
    id: 2,
    term: "Half-Duplex",
    definition: "Connection that allows BOTH directions of communication, but ONLY ONE AT A TIME.",
    detailHint: "Host A ◀────────▶ Host B (Alternating turns)",
    aliases: ["half-duplex", "half duplex", "half"],
  },
  {
    id: 3,
    term: "Full Duplex",
    definition: "Connection that allows BOTH directions of communication AT THE SAME TIME.",
    detailHint: "Host A ◀════════▶ Host B (Simultaneous two-way)",
    aliases: ["full duplex", "full-duplex", "full"],
  },
];

const exampleChallenges: QuestionQuizItem[] = [
  {
    id: 101,
    prompt: "Radio Stations",
    category: "Everyday Audio/Broadcast",
    options: commTypes,
    answer: "Simplex",
    explanation: "Broadcasts transmit to listeners without receiving transmission back along the same path.",
    canTypeInHardMode: true,
    aliases: ["simplex", "one way", "one-way"],
    keywords: ["simplex"],
  },
  {
    id: 102,
    prompt: "Megaphone",
    category: "Everyday Audio/Broadcast",
    options: commTypes,
    answer: "Simplex",
    explanation: "Amplifies voice in a single outgoing direction; listeners cannot respond back through it.",
    canTypeInHardMode: true,
    aliases: ["simplex", "one way", "one-way"],
    keywords: ["simplex"],
  },
  {
    id: 103,
    prompt: "Walkie Talkies",
    category: "Radio/Human",
    options: commTypes,
    answer: "Half-Duplex",
    explanation: "Both parties can talk and listen, but only one can transmit at a time using Push-to-Talk (PTT).",
    canTypeInHardMode: true,
    aliases: ["half duplex", "half-duplex", "half", "halfduplex"],
    keywords: ["half"],
  },
  {
    id: 104,
    prompt: "CB Radio",
    category: "Radio/Human",
    options: commTypes,
    answer: "Half-Duplex",
    explanation: "Allows two-way voice transmission over a shared channel, but users must take turns transmitting.",
    canTypeInHardMode: true,
    aliases: ["half duplex", "half-duplex", "half", "halfduplex"],
    keywords: ["half"],
  },
  {
    id: 105,
    prompt: "Humans (Conversation)",
    category: "Radio/Human",
    options: commTypes,
    answer: "Half-Duplex",
    explanation: "Standard human conversation involves one person speaking while the other listens before replying.",
    canTypeInHardMode: true,
    aliases: ["half duplex", "half-duplex", "half", "halfduplex"],
    keywords: ["half"],
  },
  {
    id: 106,
    prompt: "Network Hubs",
    category: "Networking Hardware/Telecom",
    options: commTypes,
    answer: "Half-Duplex",
    explanation: "Hubs broadcast packets on a shared collision domain where devices must take turns sending frames.",
    canTypeInHardMode: true,
    aliases: ["half duplex", "half-duplex", "half", "halfduplex"],
    keywords: ["half"],
  },
  {
    id: 107,
    prompt: "Computer Networks (Modern Ethernet)",
    category: "Networking Hardware/Telecom",
    options: commTypes,
    answer: "Full Duplex",
    explanation: "Modern twisted-pair and fiber networks send and receive packets simultaneously over dedicated channels.",
    canTypeInHardMode: true,
    aliases: ["full duplex", "full-duplex", "full", "fullduplex"],
    keywords: ["full"],
  },
  {
    id: 108,
    prompt: "Network Switches",
    category: "Networking Hardware/Telecom",
    options: commTypes,
    answer: "Full Duplex",
    explanation: "Switches create dedicated point-to-point links allowing bidirectional simultaneous transmission without collisions.",
    canTypeInHardMode: true,
    aliases: ["full duplex", "full-duplex", "full", "fullduplex"],
    keywords: ["full"],
  },
  {
    id: 109,
    prompt: "Phone Lines (Telephone)",
    category: "Networking Hardware/Telecom",
    options: commTypes,
    answer: "Full Duplex",
    explanation: "Both callers can speak and hear each other simultaneously without cutting off the line.",
    canTypeInHardMode: true,
    aliases: ["full duplex", "full-duplex", "full", "fullduplex"],
    keywords: ["full"],
  },
];

const sections: MultiSectionConfig[] = [
  {
    id: "sec-definitions",
    title: "COMMUNICATION_DIRECTION_DEFINITIONS",
    subtitle: "[PART_01: CORE_DIRECTIONAL_DEFINITIONS]",
    description: "Match each data flow rule to Simplex, Half-Duplex, or Full Duplex.",
    type: "matching",
    matchingItems: definitionChallenges,
    matchingOptions: commTypes,
  },
  {
    id: "sec-examples",
    title: "REAL_WORLD_CLASSIFICATION",
    subtitle: "[PART_02: REAL_WORLD_SCENARIOS]",
    description: "Classify each everyday and networking technology into its communication type.",
    type: "questions",
    questions: exampleChallenges,
  },
];

function CommunicationTypesContent() {
  const searchParams = useSearchParams();
  const isMastery = searchParams.get("mastery") === "true";

  return (
    <MultiSectionQuiz
      moduleTag="DIAGNOSTIC_MODULE"
      moduleCode="TRANSMISSION_MODES"
      title="Communication Types"
      studyGuideHref="/study-guide#communication-types"
      sections={sections}
      initialHardMode={isMastery}
    />
  );
}

export default function CommunicationTypesQuiz() {
  return (
    <Suspense fallback={null}>
      <CommunicationTypesContent />
    </Suspense>
  );
}
