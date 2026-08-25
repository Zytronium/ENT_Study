"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import MultiSectionQuiz, { MultiSectionConfig } from "@/components/study-quiz/MultiSectionQuiz";
import { DefinitionItem } from "@/components/study-quiz/MatchToDefinitionsQuiz";
import { QuestionQuizItem } from "@/components/study-quiz/QuestionQuiz";

const NAT_TYPES = [
  "Static NAT",
  "Dynamic NAT",
  "PAT (Port Address Translation)",
];

const definitionItems: DefinitionItem[] = [
  {
    id: "def-static-nat",
    term: "Static NAT",
    definition: "1-to-1 translation that assigns one permanent public IP to one private IP; most commonly configured on servers.",
    detailHint: "Private Host (1:1) ◀════════▶ Public IP Address",
    aliases: ["static nat", "static", "1 to 1", "1:1", "1-to-1"],
    keywords: ["static"],
  },
  {
    id: "def-dynamic-nat",
    term: "Dynamic NAT",
    definition: "Many-to-many translation that allocates public IPs from a pool to private IPs on a first-come, first-served basis.",
    detailHint: "Private Hosts (N) ◀────────▶ Public IP Pool (M)",
    aliases: ["dynamic nat", "dynamic", "many to many", "many-to-many"],
    keywords: ["dynamic"],
  },
  {
    id: "def-pat",
    term: "PAT (Port Address Translation)",
    definition: "Many-to-1 translation that allows many internal clients to share a single public IP; also referred to as Overload.",
    detailHint: "Multiple Private Hosts (N:1) ◀════▶ Single Public IP (Overload)",
    aliases: [
      "pat",
      "port address translation",
      "overload",
      "nat overload",
      "port address translation (pat)",
      "pat (port address translation)",
    ],
    keywords: ["pat"],
  },
];

const scenarioQuestions: QuestionQuizItem[] = [
  {
    id: "scen-server-mapping",
    category: "Server Inbound Access",
    prompt: "An administrator configures an external web server inside the DMZ so that incoming internet traffic consistently reaches its private IP via a single dedicated public IP address.",
    options: NAT_TYPES,
    answer: "Static NAT",
    explanation: "Static NAT provides a persistent one-to-one translation between a public IP and an internal private IP, making it ideal for servers.",
    canTypeInHardMode: true,
    aliases: ["static nat", "static", "1:1 nat", "1 to 1 nat", "1:1"],
    keywords: ["static"],
  },
  {
    id: "scen-pool-exhaustion",
    category: "Shared Address Pool",
    prompt: "A company has a pool of 5 public IP addresses assigned by its ISP. When 10 employee workstations attempt to connect to the internet simultaneously, the first 5 devices obtain an address on a first-come, first-served basis.",
    options: NAT_TYPES,
    answer: "Dynamic NAT",
    explanation: "Dynamic NAT assigns public IP addresses from a shared pool to internal hosts dynamically on a first-come, first-served basis.",
    canTypeInHardMode: true,
    aliases: ["dynamic nat", "dynamic", "dynamic pool"],
    keywords: ["dynamic"],
  },
  {
    id: "scen-branch-single-ip",
    category: "Single Public Address Sharing",
    prompt: "A small branch office router connects 25 internal workstations to the internet simultaneously using only a single public IPv4 address assigned to its WAN interface.",
    options: NAT_TYPES,
    answer: "PAT (Port Address Translation)",
    explanation: "PAT (Port Address Translation) allows multiple internal devices with private IP addresses to share a single public IP address.",
    canTypeInHardMode: true,
    aliases: [
      "pat",
      "port address translation",
      "overload",
      "nat overload",
      "pat (port address translation)",
    ],
    keywords: ["pat"],
  },
  {
    id: "scen-overload-keyword",
    category: "Configuration Terminology",
    prompt: "When reviewing a router configuration, an engineer encounters the NAT parameter 'overload'. Which specific translation method does this term represent?",
    options: NAT_TYPES,
    answer: "PAT (Port Address Translation)",
    explanation: "The term 'overload' specifically refers to Port Address Translation (PAT).",
    canTypeInHardMode: true,
    aliases: [
      "pat",
      "port address translation",
      "pat (port address translation)",
    ],
    keywords: ["pat"],
  },
];

const conceptQuestions: QuestionQuizItem[] = [
  {
    id: "spec-nat-purpose",
    category: "IPv4 Preservation",
    prompt: "What is the primary purpose of Network Address Translation (NAT)?",
    options: [
      "Preserve public IP addresses",
      "Provide Layer 2 MAC address resolution",
      "Encrypt data packets across public backbones",
      "Assign default gateway IPs automatically"
    ],
    answer: "Preserve public IP addresses",
    explanation: "The primary purpose of NAT is to preserve public IP addresses by allowing internal networks to utilize private address spaces.",
    canTypeInHardMode: true,
    aliases: [
      "preserve public ip addresses",
      "preserve public ips",
      "preserve public ip",
      "preserve ip addresses",
      "save public ip addresses",
      "save public ips",
      "preserve public ipv4 addresses"
    ],
    keywords: ["preserve", "public"],
  },
  {
    id: "spec-private-ip-routable",
    category: "Internal vs Public Routability",
    prompt: "How are private IPv4 addresses treated when routed toward the public internet?",
    options: [
      "They are only used internally and are not routable to the internet",
      "They are globally unique and routable across internet backbones",
      "They are automatically converted to IPv6 loopback addresses",
      "They require half-duplex CSMA/CD traffic control on WAN links"
    ],
    answer: "They are only used internally and are not routable to the internet",
    explanation: "Private IPv4 addresses are strictly for internal local use and cannot be routed across the public internet without translation.",
    canTypeInHardMode: false,
  },
  {
    id: "spec-router-nat-device",
    category: "Hardware Implementation",
    prompt: "Which network device connects local client devices to the ISP and executes NAT to translate private IPs into public IPs?",
    options: [
      "Router",
      "Network Hub",
      "Network Switch",
      "Modem"
    ],
    answer: "Router",
    explanation: "Routers provide the logical connection to the ISP and run NAT to translate local private addresses to the network's public IP address.",
    canTypeInHardMode: true,
    aliases: ["router", "the router", "routers", "default gateway"],
    keywords: ["router"],
  },
  {
    id: "spec-translation-flow",
    category: "Address Translation Flow",
    prompt: "In the example 'PC (192.168.1.23) -> Router/NAT (203.0.113.45) -> Internet', how does the router process the outgoing packet?",
    options: [
      "Translates the PC private IP (192.168.1.23) into the router public IP (203.0.113.45)",
      "Replaces the destination web server IP with 192.168.1.23",
      "Converts the IPv4 packet into a 48-bit MAC broadcast frame",
      "Modulates the packet into an analog dial-up frequency tone"
    ],
    answer: "Translates the PC private IP (192.168.1.23) into the router public IP (203.0.113.45)",
    explanation: "NAT translates the private source IP address of the internal host into the network's assigned public IP address before forwarding it to the internet.",
    canTypeInHardMode: false,
  },
];

const sections: MultiSectionConfig[] = [
  {
    id: "sec-nat-definitions",
    title: "NAT_TRANSLATION_MODES",
    subtitle: "[PART_01: TRANSLATION_TYPES_&_DEFINITIONS]",
    description: "Match each NAT translation model to Static NAT, Dynamic NAT, or PAT (Port Address Translation).",
    type: "matching",
    matchingItems: definitionItems,
    matchingOptions: NAT_TYPES,
  },
  {
    id: "sec-nat-scenarios",
    title: "OPERATIONAL_SCENARIO_CLASSIFICATION",
    subtitle: "[PART_02: REAL_WORLD_NETWORK_SCENARIOS]",
    description: "Classify real-world deployment scenarios into the correct NAT translation method.",
    type: "questions",
    questions: scenarioQuestions,
  },
  {
    id: "sec-nat-theory",
    title: "NAT_ROUTING_&_ADDRESSING_CONCEPTS",
    subtitle: "[PART_03: CORE_NAT_THEORY]",
    description: "Verify your understanding of public vs private routability, translation flow, and address preservation.",
    type: "questions",
    questions: conceptQuestions,
  },
];

function NatQuizContent() {
  const searchParams = useSearchParams();
  const isMastery = searchParams.get("mastery") === "true";

  return (
    <MultiSectionQuiz
      moduleTag="DIAGNOSTIC_MODULE"
      moduleCode="NAT_ROUTING"
      title="Network Address Translation (NAT)"
      studyGuideHref="/study-guide#nat"
      sections={sections}
      initialHardMode={isMastery}
    />
  );
}

export default function NatQuiz() {
  return (
    <Suspense fallback={null}>
      <NatQuizContent />
    </Suspense>
  );
}
