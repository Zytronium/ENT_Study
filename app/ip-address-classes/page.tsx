"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TabbedQuiz, { QuizTab } from "@/components/study-quiz/TabbedQuiz";
import TableWithBlanksQuiz, { TableColumn, TableRow } from "@/components/study-quiz/TableWithBlanksQuiz";
import QuestionQuiz, { QuestionQuizItem } from "@/components/study-quiz/QuestionQuiz";

const columns: TableColumn[] = [
  { key: "ipClass", label: "Class" },
  { key: "networkNumber", label: "Network Number" },
  { key: "netHost", label: "Net/Host" },
  { key: "subnetMask", label: "Subnet Mask" },
  { key: "possibleNetworks", label: "Possible Networks" },
  { key: "possibleHosts", label: "Possible Hosts" },
];

const ipClassRows: TableRow[] = [
  {
    id: 1,
    ipClass: "A",
    networkNumber: "1-126 (or 127)",
    netHost: "N.H.H.H",
    subnetMask: "255.0.0.0",
    possibleNetworks: "126",
    possibleHosts: "16M",
  },
  {
    id: 2,
    ipClass: "B",
    networkNumber: "128-191",
    netHost: "N.N.H.H",
    subnetMask: "255.255.0.0",
    possibleNetworks: "16k",
    possibleHosts: "65k",
  },
  {
    id: 3,
    ipClass: "C",
    networkNumber: "192-223",
    netHost: "N.N.N.H",
    subnetMask: "255.255.255.0",
    possibleNetworks: "2M",
    possibleHosts: "254",
  },
  {
    id: 4,
    ipClass: "D",
    networkNumber: "224-239",
    netHost: "-",
    subnetMask: "-",
    possibleNetworks: "-",
    possibleHosts: "-",
  },
  {
    id: 5,
    ipClass: "E",
    networkNumber: "240-254",
    netHost: "-",
    subnetMask: "-",
    possibleNetworks: "-",
    possibleHosts: "-",
  },
];

const columnOptions: Record<string, string[]> = {
  ipClass: ["A", "B", "C", "D", "E"],
  networkNumber: ["1-126 (or 127)", "128-191", "192-223", "224-239", "240-254"],
  netHost: ["N.H.H.H", "N.N.H.H", "N.N.N.H"],
  subnetMask: ["255.0.0.0", "255.255.0.0", "255.255.255.0"],
  possibleNetworks: ["126", "16k", "2M"],
  possibleHosts: ["16M", "65k", "254"],
};

const BLANK_COUNTS_BY_STAGE = [6, 11, 16, 22];

const conceptualQuestions: QuestionQuizItem[] = [
  {
    id: "cq-class-d-purpose",
    prompt: "What is the designated purpose of Class D IPv4 addresses (224-239)?",
    answer: "Documentation/labs",
    options: ["Documentation/labs", "Experimental", "Large enterprise networks", "Small office networks"],
    aliases: [
      "documentation/labs",
      "documentation / labs",
      "documentation",
      "labs",
      "documentation and labs",
    ],
    keywords: ["documentation", "labs"],
    explanation: "According to the study guide, Class D (224-239) is designated for documentation/labs.",
    canTypeInHardMode: true,
  },
  {
    id: "cq-class-e-purpose",
    prompt: "What is the designated purpose of Class E IPv4 addresses (240-254)?",
    answer: "Experimental",
    options: ["Experimental", "Documentation/labs", "Public ISP backbones", "Home network LANs"],
    aliases: ["experimental", "experiment", "experiments", "experimentation"],
    keywords: ["experimental"],
    explanation: "Class E (240-254) is designated for experimental use.",
    canTypeInHardMode: true,
  },
  {
    id: "cq-class-b-nethost",
    prompt: "What is the Net/Host octet structure for a standard Class B IPv4 network?",
    answer: "N.N.H.H",
    options: ["N.N.H.H", "N.H.H.H", "N.N.N.H", "N.N.N.N"],
    aliases: ["n.n.h.h", "nnhh", "n-n-h-h", "n.n.h.h."],
    keywords: ["n.n.h.h"],
    explanation: "Class B uses the first 2 octets for Network ID and the last 2 octets for Host ID (N.N.H.H).",
    canTypeInHardMode: true,
  },
  {
    id: "cq-class-c-hosts",
    prompt: "How many possible host addresses per network are available in Class C IPv4 addressing?",
    answer: "254",
    options: ["254", "65k", "16M", "126"],
    aliases: ["254", "254 hosts", "254 host addresses"],
    keywords: ["254"],
    explanation: "A Class C network has 8 host bits, providing 254 possible host addresses.",
    canTypeInHardMode: true,
  },
  {
    id: "cq-class-a-networks",
    prompt: "How many total possible networks are available in Class A IPv4 addressing?",
    answer: "126",
    options: ["126", "16k", "2M", "254"],
    aliases: ["126", "126 networks"],
    keywords: ["126"],
    explanation: "Class A provides 126 possible networks (ranges 1-126).",
    canTypeInHardMode: true,
  },
  {
    id: "cq-class-b-range",
    prompt: "What first-octet network number range defines Class B IPv4 addressing?",
    answer: "128-191",
    options: ["128-191", "1-126 (or 127)", "192-223", "224-239"],
    aliases: ["128-191", "128 - 191", "128 to 191", "128-191."],
    keywords: ["128-191"],
    explanation: "Class B network numbers range from 128 through 191.",
    canTypeInHardMode: true,
  },
];

function IPAddressClassesContent() {
  const searchParams = useSearchParams();
  const isMastery = searchParams.get("mastery") === "true";

  const tabs: QuizTab[] = [
    {
      id: "table",
      label: "[01_CLASS_MATRIX]",
      content: (
        <TableWithBlanksQuiz
          heading="[IPV4_CLASS_ARCHITECTURE_MATRIX]"
          description="Fill in missing network numbers, net/host structures, subnet masks, and network/host capacities across classes A through E."
          columns={columns}
          rows={ipClassRows}
          columnOptions={columnOptions}
          blankCountsByStage={BLANK_COUNTS_BY_STAGE}
          initialHardMode={isMastery}
          hideHeader={true}
        />
      ),
    },
    {
      id: "questions",
      label: "[02_CONCEPT_ASSESSMENT]",
      content: (
        <QuestionQuiz
          heading="[IPV4_CONCEPTUAL_ASSESSMENT]"
          description="Evaluate your core understanding of IPv4 class boundaries, designated purposes, and network/host allocations."
          questions={conceptualQuestions}
          initialHardMode={isMastery}
          hideHeader={true}
        />
      ),
    },
  ];

  return (
    <TabbedQuiz
      moduleTag="DIAGNOSTIC_MODULE"
      moduleCode="IPV4_CLASS_SYSTEM"
      title="IP Address Classes"
      studyGuideHref="/study-guide#ip-address-classes"
      tabs={tabs}
    />
  );
}

export default function IPAddressClassesQuiz() {
  return (
    <Suspense fallback={null}>
      <IPAddressClassesContent />
    </Suspense>
  );
}
