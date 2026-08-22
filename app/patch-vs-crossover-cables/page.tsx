"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import MultiSectionQuiz, { MultiSectionConfig } from "@/components/study-quiz/MultiSectionQuiz";
import { DefinitionItem } from "@/components/study-quiz/MatchToDefinitionsQuiz";
import { QuestionQuizItem } from "@/components/study-quiz/QuestionQuiz";

const CABLE_CONCEPTS = [
  "Patch Cable",
  "Crossover Cable",
  "Shielded Twisted Pair (STP)",
  "Unshielded Twisted Pair (UTP)",
];

const SCENARIO_OPTIONS = ["Patch Cable", "Crossover Cable"];

const initialDefinitions: DefinitionItem[] = [
  {
    id: "def-patch",
    term: "Patch Cable",
    definition: "Ethernet cables that follow the same wiring standard (568A or 568B) on both terminated ends; used to connect two dissimilar devices.",
    aliases: ["patch", "patch cable", "straight", "straight cable", "straight-through", "straight through"],
  },
  {
    id: "def-crossover",
    term: "Crossover Cable",
    definition: "Ethernet cables that use both standards (568A on one end and 568B on the other) to connect two similar devices.",
    aliases: ["crossover", "crossover cable", "cross over", "cross-over"],
  },
  {
    id: "def-stp",
    term: "Shielded Twisted Pair (STP)",
    definition: "Twisted pair cabling with an extra layer of shielding around the wire pairs under the outer jacket, specifically rated for industrial areas.",
    aliases: ["stp", "shielded twisted pair", "shielded twisted pair (stp)", "shielded"],
  },
  {
    id: "def-utp",
    term: "Unshielded Twisted Pair (UTP)",
    definition: "Standard twisted pair cabling without internal shielding foil, used everywhere outside of industrial environments.",
    aliases: ["utp", "unshielded twisted pair", "unshielded twisted pair (utp)", "unshielded"],
  },
];

const initialScenarios: QuestionQuizItem[] = [
  {
    id: "scen-pc-router",
    category: "Dissimilar Devices",
    prompt: "Workstation (PC) connecting to Network Router",
    options: SCENARIO_OPTIONS,
    answer: "Patch Cable",
    explanation: "Dissimilar devices (PC to Router) connect using standard patch (straight) cables.",
    canTypeInHardMode: true,
    aliases: ["patch", "patch cable", "straight", "straight through", "straight-through", "straight cable"],
    keywords: ["patch"],
  },
  {
    id: "scen-pc-pc",
    category: "Similar Devices",
    prompt: "Workstation (PC) connecting to Second Workstation (PC)",
    options: SCENARIO_OPTIONS,
    answer: "Crossover Cable",
    explanation: "Similar host devices (PC to PC) require a crossover cable to cross transmit/receive pairs.",
    canTypeInHardMode: true,
    aliases: ["crossover", "crossover cable", "cross over", "cross-over", "cross over cable"],
    keywords: ["cross"],
  },
  {
    id: "scen-router-switch",
    category: "Dissimilar Devices",
    prompt: "Network Router connecting to Network Switch",
    options: SCENARIO_OPTIONS,
    answer: "Patch Cable",
    explanation: "Dissimilar devices (Router to Switch) utilize a standard patch (straight) cable.",
    canTypeInHardMode: true,
    aliases: ["patch", "patch cable", "straight", "straight through", "straight-through", "straight cable"],
    keywords: ["patch"],
  },
  {
    id: "scen-switch-switch",
    category: "Similar Devices",
    prompt: "Network Switch connecting to Second Network Switch",
    options: SCENARIO_OPTIONS,
    answer: "Crossover Cable",
    explanation: "Directly linking similar devices (Switch to Switch) historically requires a crossover cable.",
    canTypeInHardMode: true,
    aliases: ["crossover", "crossover cable", "cross over", "cross-over", "cross over cable"],
    keywords: ["cross"],
  },
  {
    id: "scen-pc-switch",
    category: "Dissimilar Devices",
    prompt: "Workstation (PC) connecting to Network Switch / Hub",
    options: SCENARIO_OPTIONS,
    answer: "Patch Cable",
    explanation: "Connecting a host PC to a switch/hub (dissimilar devices) uses a patch (straight) cable.",
    canTypeInHardMode: true,
    aliases: ["patch", "patch cable", "straight", "straight through", "straight-through", "straight cable"],
    keywords: ["patch"],
  },
  {
    id: "scen-router-router",
    category: "Similar Devices",
    prompt: "Network Router connecting to Second Network Router",
    options: SCENARIO_OPTIONS,
    answer: "Crossover Cable",
    explanation: "Connecting two similar devices (Router to Router) requires a crossover cable.",
    canTypeInHardMode: true,
    aliases: ["crossover", "crossover cable", "cross over", "cross-over", "cross over cable"],
    keywords: ["cross"],
  },
];

const initialSpecQuestions: QuestionQuizItem[] = [
  {
    id: "spec-stp-environment",
    category: "Shielding & Industrial Use",
    prompt: "Where should Shielded Twisted Pair (STP) cables be installed according to network deployment standards?",
    options: [
      "In industrial areas with heavy machinery and high electrical noise",
      "Standard residential home living rooms",
      "Standard corporate office cubicles",
      "Exclusively submerged underwater",
    ],
    answer: "In industrial areas with heavy machinery and high electrical noise",
    explanation: "Shielded twisted pair (STP) cables should be used in industrial areas, while unshielded (UTP) cables belong everywhere else.",
    canTypeInHardMode: true,
    aliases: [
      "industrial",
      "industrial areas",
      "industrial environments",
      "industrial settings",
      "heavy machinery",
      "noisy environments",
      "industrial areas with heavy machinery",
    ],
    keywords: ["industrial"],
  },
  {
    id: "spec-utp-environment",
    category: "Shielding & Industrial Use",
    prompt: "Where do Unshielded Twisted Pair (UTP) cables belong?",
    options: [
      "Everywhere outside of industrial areas",
      "Exclusively inside underground metal conduits",
      "Only in high-voltage generator rooms",
      "Directly attached to industrial electric motors",
    ],
    answer: "Everywhere outside of industrial areas",
    explanation: "UTP is the standard cable deployment everywhere outside of harsh industrial settings, though STP technically can be used anywhere.",
    canTypeInHardMode: true,
    aliases: [
      "everywhere outside of industrial areas",
      "outside industrial",
      "everywhere else",
      "outside industrial areas",
      "non-industrial",
      "commercial and residential",
      "offices and homes",
    ],
    keywords: ["outside", "industrial"],
  },
  {
    id: "spec-stp-structure",
    category: "Cable Architecture",
    prompt: "What is the structural difference between Shielded Twisted Pair (STP) and Unshielded Twisted Pair (UTP)?",
    options: [
      "STP has an extra layer of shielding around the wire pairs underneath the outer jacket plastic",
      "STP replaces copper wires with solid fiber glass strands",
      "STP uses 12 pins instead of the standard 8-pin RJ45 connector",
      "STP has thicker outer plastic shielding",
    ],
    answer: "STP has an extra layer of shielding around the wire pairs underneath the outer jacket plastic",
    explanation: "Shielded twisted pair has another protective layer of shielding around the twisted pairs underneath the outer jacket plastic.",
    canTypeInHardMode: false,
  },
  {
    id: "spec-auto-mdix",
    category: "Standards & Features",
    prompt: "Why are physical crossover cables much less commonly needed in modern networking?",
    options: [
      "Modern Ethernet equipment supports Auto-MDI/MDIX to automatically detect and cross pairs",
      "All modern devices have transitioned exclusively to coaxial BNC connections",
      "Modern computers cannot connect directly via wired Ethernet",
      "The TIA-568A wiring standard was completely abolished",
    ],
    answer: "Modern Ethernet equipment supports Auto-MDI/MDIX to automatically detect and cross pairs",
    explanation: "Auto-MDI/MDIX automatically detects and compensates for crossed pairs, making physical crossover cables rarely necessary.",
    canTypeInHardMode: false,
  },
  {
    id: "spec-crossover-pinout",
    category: "Standards & Features",
    prompt: "What pinout configuration defines a Crossover Ethernet cable?",
    options: [
      "The same standard (either 568A or 568B) on both terminated ends",
      "568A on one end and 568B on the opposite end",
      "RJ45 coupler on one end and RJ45 connector on the other",
      "RJ45 keystone jacks on each end for use with a patch panel",
    ],
    answer: "568A on one end and 568B on the opposite end",
    explanation: "Crossover cables utilize 568A on one terminated end and 568B on the other end.",
    canTypeInHardMode: true,
    aliases: [
      "568a and 568b",
      "568a on one end 568b on the other",
      "568a on one end and 568b on the other",
      "a on one end b on the other",
      "568a / 568b",
      "568a/568b",
      "568a on one end and 568b on the opposite end",
    ],
    keywords: ["568a", "568b"],
  },
  {
    id: "spec-patch-pinout",
    category: "Standards & Features",
    prompt: "What pinout configuration defines a Patch (Straight) cable?",
    options: [
      "The same standard (either 568A or 568B) on both terminated ends",
      "568A on one end and 568B on the opposite end",
      "RJ45 coupler on one end and RJ45 connector on the other",
      "RJ45 keystone jacks on each end for use with a patch panel",
    ],
    answer: "The same standard (either 568A or 568B) on both terminated ends",
    explanation: "Patch (straight) cables follow the identical standard (both 568A or both 568B) on both ends.",
    canTypeInHardMode: true,
    aliases: [
      "same standard",
      "same on both ends",
      "same standard on both ends",
      "both 568a or both 568b",
      "identical on both ends",
      "the same standard (either 568a or 568b) on both terminated ends",
    ],
    keywords: ["same"],
  },
];

const sections: MultiSectionConfig[] = [
  {
    id: "sec-definitions",
    title: "CORE_CABLING_TERMINOLOGY",
    subtitle: "[PART_01: CORE_CABLING_TERMINOLOGY_&_DEFINITIONS]",
    description: "Match the definitions of Patch Cables, Crossover Cables, STP, and UTP.",
    type: "matching",
    matchingItems: initialDefinitions,
    matchingOptions: CABLE_CONCEPTS,
  },
  {
    id: "sec-scenarios",
    title: "DEVICE_TO_DEVICE_SCENARIOS",
    subtitle: "[PART_02: PRACTICAL_DEVICE_TO_DEVICE_SCENARIOS]",
    description: "Determine whether each connection requires a Patch (Straight) Cable or a Crossover Cable.",
    type: "questions",
    questions: initialScenarios,
  },
  {
    id: "sec-specs",
    title: "MECHANICAL_SPECS_&_STANDARDS",
    subtitle: "[PART_03: MECHANICAL_SPECIFICATIONS_&_STANDARDS]",
    description: "Validate shielding standards, industrial requirements, and Auto-MDI/MDIX features.",
    type: "questions",
    questions: initialSpecQuestions,
  },
];

function PatchVsCrossoverContent() {
  const searchParams = useSearchParams();
  const isMastery = searchParams.get("mastery") === "true";

  return (
    <MultiSectionQuiz
      moduleTag="DIAGNOSTIC_MODULE"
      moduleCode="CABLE_TERMINOLOGY"
      title="Patch vs Crossover & STP vs UTP"
      studyGuideHref="/study-guide#patch-vs-crossover-cables"
      sections={sections}
      initialHardMode={isMastery}
    />
  );
}

export default function PatchVsCrossoverCablesQuiz() {
  return (
    <Suspense fallback={null}>
      <PatchVsCrossoverContent />
    </Suspense>
  );
}
