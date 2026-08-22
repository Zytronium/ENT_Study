"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TabbedQuiz, { QuizTab } from "@/components/study-quiz/TabbedQuiz";
import TableWithBlanksQuiz, { TableColumn, TableRow } from "@/components/study-quiz/TableWithBlanksQuiz";
import QuestionQuiz, { QuestionQuizItem } from "@/components/study-quiz/QuestionQuiz";

const columns: TableColumn[] = [
  { key: "ipClass", label: "Class" },
  { key: "ipRange", label: "IP Address Range" },
  { key: "subnetMask", label: "Default Subnet Mask" },
];

const privateIPRows: TableRow[] = [
  {
    id: 1,
    ipClass: "A",
    ipRange: "10.0.0.0 - 10.255.255.255",
    subnetMask: "255.0.0.0",
  },
  {
    id: 2,
    ipClass: "B",
    ipRange: "172.16.0.0 - 172.31.255.255",
    subnetMask: "255.255.0.0",
  },
  {
    id: 3,
    ipClass: "C",
    ipRange: "192.168.0.0 - 192.168.255.255",
    subnetMask: "255.255.255.0",
  },
];

const columnOptions: Record<string, string[]> = {
  ipClass: ["A", "B", "C"],
  ipRange: [
    "10.0.0.0 - 10.255.255.255",
    "172.16.0.0 - 172.31.255.255",
    "192.168.0.0 - 192.168.255.255",
  ],
  subnetMask: ["255.0.0.0", "255.255.0.0", "255.255.255.0"],
};

const BLANK_COUNTS_BY_STAGE = [3, 6, 9];

const conceptualQuestions: QuestionQuizItem[] = [
  {
    id: "cq-class-c-usage",
    prompt: "Which private IP address class is most commonly used for small or home networks?",
    answer: "Class C",
    options: ["Class C", "Class A", "Class B", "Class D"],
    aliases: ["c", "class c", "class-c"],
    keywords: ["class c"],
    explanation: "Class C (192.168.0.0 - 192.168.255.255) is the most commonly used private class for small or home networks.",
    canTypeInHardMode: true,
  },
  {
    id: "cq-dhcp-assignment",
    prompt: "Which network entity assigns private IP addresses to devices on a local network?",
    answer: "DHCP server",
    options: ["DHCP server", "DNS server", "ISP gateway", "Loopback adapter"],
    aliases: [
      "dhcp",
      "dhcp server",
      "dynamic host configuration protocol",
      "dynamic host configuration protocol server",
    ],
    keywords: ["dhcp"],
    explanation: "A DHCP server dynamically assigns private IP addresses to devices within the defined private address ranges.",
    canTypeInHardMode: true,
  },
  {
    id: "cq-class-b-range",
    prompt: "What is the exact private IPv4 address range defined for Class B networks?",
    answer: "172.16.0.0 - 172.31.255.255",
    options: [
      "172.16.0.0 - 172.31.255.255",
      "10.0.0.0 - 10.255.255.255",
      "192.168.0.0 - 192.168.255.255",
      "169.254.0.0 - 169.254.255.255",
    ],
    aliases: [
      "172.16.0.0 - 172.31.255.255",
      "172.16.0.0-172.31.255.255",
      "172.16.0.0 to 172.31.255.255",
    ],
    keywords: ["172.16", "172.31"],
    explanation: "Class B private addressing spans from 172.16.0.0 through 172.31.255.255 with a default mask of 255.255.0.0.",
    canTypeInHardMode: true,
  },
  {
    id: "cq-class-a-mask",
    prompt: "What is the default subnet mask assigned to Class A private IP addresses?",
    answer: "255.0.0.0",
    options: ["255.0.0.0", "255.255.0.0", "255.255.255.0", "255.255.255.255"],
    aliases: ["255.0.0.0", "255.0.0.0/8", "/8"],
    keywords: ["255.0.0.0"],
    explanation: "Class A networks utilize a default 8-bit subnet mask of 255.0.0.0.",
    canTypeInHardMode: true,
  },
];

function PrivateIPClassesContent() {
  const searchParams = useSearchParams();
  const isMastery = searchParams.get("mastery") === "true";

  const tabs: QuizTab[] = [
    {
      id: "table",
      label: "[01_PRIVATE_RANGES_MATRIX]",
      content: (
        <TableWithBlanksQuiz
          heading="[PRIVATE_IP_ADDRESS_RANGES_MATRIX]"
          description="Fill in the missing fields in the RFC 1918 private IPv4 address classes and default subnet masks across progressive stages."
          columns={columns}
          rows={privateIPRows}
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
          heading="[RFC_1918_CONCEPTUAL_ASSESSMENT]"
          description="Demonstrate your proficiency in private IP allocations, DHCP dynamics, and subnet boundary rules."
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
      moduleCode="RFC_1918_PRIVATE_SPACE"
      title="Private IP Address Classes"
      studyGuideHref="/study-guide#private-ip-classes"
      tabs={tabs}
    />
  );
}

export default function PrivateIPClassesQuiz() {
  return (
    <Suspense fallback={null}>
      <PrivateIPClassesContent />
    </Suspense>
  );
}
