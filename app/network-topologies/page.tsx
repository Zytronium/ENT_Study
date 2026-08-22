"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import MultiSectionQuiz, { MultiSectionConfig } from "@/components/study-quiz/MultiSectionQuiz";
import { DefinitionItem } from "@/components/study-quiz/MatchToDefinitionsQuiz";
import { QuestionQuizItem } from "@/components/study-quiz/QuestionQuiz";

const TOPOLOGY_NAMES = ["Star", "Ring", "Bus", "Mesh"];

const initialDiagrams: QuestionQuizItem[] = [
  {
    id: "diag-star-1",
    imageSrc: "/study_guide_images/topology_star_1.webp",
    alt: "Topology diagram with a switch/hub in a central connection point and radial hosts. Lines all connect to the switch/hub.",
    category: "Diagram 1: Central Hub/Switch Node with Radiating Hosts",
    prompt: "Identify the topology shown in this diagram:",
    options: TOPOLOGY_NAMES,
    answer: "Star",
    explanation: "All computers connect to a central point (such as a hub or switch) in a Star topology.",
    canTypeInHardMode: true,
  },
  {
    id: "diag-star-2",
    imageSrc: "/study_guide_images/topology_star_2.webp",
    alt: "Topology diagram layout with a switch/hub in a central connection point. Lines all connect to the switch/hub.",
    category: "Diagram 2: Multi-Host Centralized Layout",
    prompt: "Identify the topology shown in this diagram:",
    options: TOPOLOGY_NAMES,
    answer: "Star",
    explanation: "Radial host connections back to a central node indicate a Star topology.",
    canTypeInHardMode: true,
  },
  {
    id: "diag-ring",
    imageSrc: "/study_guide_images/topology_ring.webp",
    alt: "Topology diagram showing closed circular loop",
    category: "Diagram 3: Circular Closed-Loop Network Structure",
    prompt: "Identify the topology shown in this diagram:",
    options: TOPOLOGY_NAMES,
    answer: "Ring",
    explanation: "Computers connected in a continuous loop passing a token represent a Ring topology.",
    canTypeInHardMode: true,
  },
  {
    id: "diag-bus",
    imageSrc: "/study_guide_images/topology_bus.webp",
    alt: "Topology diagram showing single trunk line with end terminators",
    category: "Diagram 4: Linear Trunk Line with Endpoint Terminators",
    prompt: "Identify the topology shown in this diagram:",
    options: TOPOLOGY_NAMES,
    answer: "Bus",
    explanation: "A single coaxial cable terminated on both ends with hosts connected along the line is a Bus topology.",
    canTypeInHardMode: true,
  },
  {
    id: "diag-mesh-1",
    imageSrc: "/study_guide_images/topology_mesh_1.webp",
    alt: "Topology diagram with fully interconnected nodes arranged like a star in a pentagon",
    category: "Diagram 5: Fully Interconnected Redundant Grid",
    prompt: "Identify the topology shown in this diagram:",
    options: TOPOLOGY_NAMES,
    answer: "Mesh",
    explanation: "All computers connected to every other computer with high redundancy represent a Mesh topology.",
    canTypeInHardMode: true,
  },
  {
    id: "diag-mesh-2",
    imageSrc: "/study_guide_images/topology_mesh_2.webp",
    alt: "Topology diagram with fully interconnected nodes arranged like an up-side-down star in a Baseball Home plate",
    category: "Diagram 6: Multi-Path Redundant Network Layout",
    prompt: "Identify the topology shown in this diagram:",
    options: TOPOLOGY_NAMES,
    answer: "Mesh",
    explanation: "Multiple redundant interconnected paths between all nodes represent a Mesh topology.",
    canTypeInHardMode: true,
  },
];

const initialDefinitions: DefinitionItem[] = [
  {
    id: "def-star",
    term: "Star",
    definition: "All computers are connected to a central point (such as a hub or switch).",
    detailHint: "Uses twisted pair cabling and RJ45 connectors back to the central device.",
    aliases: ["star", "star topology"],
  },
  {
    id: "def-ring",
    term: "Ring",
    definition: "All computers are connected in a loop. They use a token to talk on the network.",
    detailHint: "Data travels sequentially from device to device along the loop.",
    aliases: ["ring", "ring topology"],
  },
  {
    id: "def-bus",
    term: "Bus",
    definition: "Computers are connected in a line with a single coaxial cable, terminated on both ends.",
    detailHint: "Uses thicknet/thinnet cabling and BNC connectors with endpoint terminators.",
    aliases: ["bus", "bus topology"],
  },
  {
    id: "def-mesh",
    term: "Mesh",
    definition: "All computers are connected to every other computer; topology of the internet with extreme redundancy.",
    detailHint: "Provides high fault tolerance and can be implemented wired or wireless.",
    aliases: ["mesh", "mesh topology"],
  },
];

const initialSpecQuestions: QuestionQuizItem[] = [
  {
    id: "spec-bus-cables",
    category: "Bus Topology",
    prompt: "What cable types are used in a Bus topology?",
    options: [
      "Twisted pair cables",
      "Thicknet (10base5) coaxial cables only",
      "Thinnet (10base2) coaxial cables only",
      "Thicknet (10base5) and Thinnet (10base2) coaxial cables",
    ],
    answer: "Thicknet (10base5) and Thinnet (10base2) coaxial cables",
    explanation: "Bus topologies utilize coaxial cables: both Thicknet (10base5) and Thinnet (10base2).",
    canTypeInHardMode: true,
    aliases: [
      "thicknet and thinnet",
      "thicknet and thinnet coaxial",
      "thicknet and thinnet coaxial cables",
      "thicknet and thinnet cables",
      "coaxial",
      "coaxial cable",
      "coaxial cables",
      "coax",
      "10base5 and 10base2",
      "10base5 and 10base2 coaxial",
      "10base5 and 10base2 coaxial cables",
      "thicknet (10base5) and thinnet (10base2)",
      "thicknet (10base5) and thinnet (10base2) coaxial",
      "thicknet (10base5) and thinnet (10base2) coaxial cables",
    ],
    keywords: ["thicknet", "thinnet"],
  },
  {
    id: "spec-bus-connectors",
    category: "Bus Topology",
    prompt: "What connectors and termination devices are used in a Bus topology?",
    options: [
      "BNC connectors and terminators",
      "RJ45 connectors",
      "RJ11 jacks",
      "Coaxial terminators",
    ],
    answer: "BNC connectors and terminators",
    explanation: "Bus networks connect devices via BNC connectors (and T-connectors) and require terminators at both ends.",
    canTypeInHardMode: true,
    aliases: [
      "bnc",
      "bnc connectors",
      "bnc connector",
      "bnc and terminators",
      "bnc connectors and terminators",
      "bnc and terminator",
      "bnc terminator",
      "bnc t-connectors and terminators",
    ],
    keywords: ["bnc"],
  },
  {
    id: "spec-bus-termination",
    category: "Bus Topology",
    prompt: "How is the physical transmission medium configured in a Bus topology?",
    options: [
      "A single coaxial cable terminated on both ends",
      "Individual cables connecting to a central switching device",
      "A continuous closed circle with no endpoints",
      "Direct interconnected lines to every other host",
    ],
    answer: "A single coaxial cable terminated on both ends",
    explanation: "Bus topology hosts connect in a line to a single coaxial cable that must be terminated on both ends to prevent signal bounce.",
    canTypeInHardMode: false,
  },
  {
    id: "spec-star-cables",
    category: "Star Topology",
    prompt: "What type of cables are used in a Star topology?",
    options: [
      "Thinnet (10base2) coaxial cables only",
      "Thicknet (10base5) coaxial cables only",
      "Twisted pair cables",
      "Thicknet (10base5) and Thinnet (10base2) coaxial cables",
    ],
    answer: "Twisted pair cables",
    explanation: "Star topologies utilize twisted pair cables (such as Cat5/Cat6) connecting each workstation to the center.",
    canTypeInHardMode: true,
    aliases: [
      "twisted pair",
      "twisted pair cable",
      "twisted pair cables",
      "twisted-pair",
      "twisted-pair cables",
      "utp",
      "stp",
      "unshielded twisted pair",
      "shielded twisted pair",
    ],
    keywords: ["twisted pair"],
  },
  {
    id: "spec-star-connectors",
    category: "Star Topology",
    prompt: "What connectors are used with twisted pair cables in a Star topology?",
    options: [
      "BNC connectors and terminators",
      "RJ11 jacks",
      "Vampire taps",
      "RJ45 connectors",
    ],
    answer: "RJ45 connectors",
    explanation: "Twisted pair cables in a Star topology terminate with 8-pin RJ45 modular connectors.",
    canTypeInHardMode: true,
    aliases: [
      "rj45",
      "rj-45",
      "rj 45",
      "rj45 connector",
      "rj45 connectors",
      "rj-45 connector",
      "rj-45 connectors",
    ],
    keywords: ["rj45"],
  },
  {
    id: "spec-star-center",
    category: "Star Topology",
    prompt: "What devices are placed at the central point of a Star topology network?",
    options: [
      "Switches or hubs",
      "Coaxial terminators",
      "BNC and T-connectors",
      "Modems or routers",
    ],
    answer: "Switches or hubs",
    explanation: "In a Star topology, all computers connect to a central point containing a switch or hub.",
    canTypeInHardMode: true,
    aliases: [
      "switch",
      "hub",
      "switches",
      "hubs",
      "switch or hub",
      "switches or hubs",
      "switch and hub",
      "switches and hubs",
      "hub or switch",
      "hubs or switches",
      "hub and switch",
      "hubs and switches",
    ],
    keywords: ["switch"],
  },
];

const sections: MultiSectionConfig[] = [
  {
    id: "sec-diagrams",
    title: "VISUAL_DIAGRAM_IDENTIFICATION",
    subtitle: "[PART_01: VISUAL_DIAGRAM_IDENTIFICATION]",
    description: "Inspect the network architecture diagrams and classify the wiring topology.",
    type: "questions",
    questions: initialDiagrams,
  },
  {
    id: "sec-definitions",
    title: "TEXTUAL_DEFINITION_MATCHING",
    subtitle: "[PART_02: TEXTUAL_DEFINITION_MATCHING]",
    description: "Match the architecture description and hardware traits to Star, Ring, Bus, or Mesh.",
    type: "matching",
    matchingItems: initialDefinitions,
    matchingOptions: TOPOLOGY_NAMES,
  },
  {
    id: "sec-specs",
    title: "HARDWARE_SPECS_&_MECHANICS",
    subtitle: "[PART_03: HARDWARE_SPECS_&_MECHANICS]",
    description: "Validate the required cable categories, termination devices, and central hub/switch hardware.",
    type: "questions",
    questions: initialSpecQuestions,
  },
];

function WiredNetworkTopologiesQuizContent() {
  const searchParams = useSearchParams();
  const isMastery = searchParams.get("mastery") === "true";

  return (
    <MultiSectionQuiz
      moduleTag="DIAGNOSTIC_MODULE"
      moduleCode="TOPOLOGY_STRUCTURES"
      title="Network Topologies"
      studyGuideHref="/study-guide#network-topologies"
      sections={sections}
      initialHardMode={isMastery}
    />
  );
}

export default function WiredNetworkTopologiesQuiz() {
  return (
    <Suspense fallback={null}>
      <WiredNetworkTopologiesQuizContent />
    </Suspense>
  );
}
