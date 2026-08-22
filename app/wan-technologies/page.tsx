"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TabbedQuiz, { QuizTab } from "@/components/study-quiz/TabbedQuiz";
import TableWithBlanksQuiz, { TableColumn, TableRow } from "@/components/study-quiz/TableWithBlanksQuiz";
import MultiSectionQuiz, { MultiSectionConfig } from "@/components/study-quiz/MultiSectionQuiz";
import { QuestionQuizItem } from "@/components/study-quiz/QuestionQuiz";
import { DefinitionItem } from "@/components/study-quiz/MatchToDefinitionsQuiz";

const columns: TableColumn[] = [
  { key: "carrier", label: "Carrier" },
  { key: "channels", label: "64 Kbps Channels" },
  { key: "maxThroughput", label: "Max Throughput" },
];

const carrierRows: TableRow[] = [
  {
    id: 1,
    carrier: "T1",
    channels: "24",
    maxThroughput: "1.544 Mbps",
  },
  {
    id: 2,
    carrier: "E1",
    channels: "32",
    maxThroughput: "2.048 Mbps",
  },
  {
    id: 3,
    carrier: "T3",
    channels: "672 (T1x28)",
    maxThroughput: "44.736 Mbps",
  },
  {
    id: 4,
    carrier: "E3",
    channels: "512 (E1x16)",
    maxThroughput: "34.368 Mbps",
  },
  {
    id: 5,
    carrier: "ISDN",
    channels: "2",
    maxThroughput: "128 Kbps",
  },
];

const columnOptions: Record<string, string[]> = {
  carrier: ["T1", "E1", "T3", "E3", "ISDN"],
  channels: ["2", "24", "32", "672 (T1x28)", "512 (E1x16)"],
  maxThroughput: ["128 Kbps", "1.544 Mbps", "2.048 Mbps", "34.368 Mbps", "44.736 Mbps"],
};

const BLANK_COUNTS_BY_STAGE = [5, 10, 15];

const part1Questions: QuestionQuizItem[] = [
  {
    id: "wan-pots-acronym",
    prompt: "What does the acronym 'POTS' stand for in telecommunications?",
    options: [
      "Plain Old Telephone Service",
      "Packet Optical Transmission System",
      "Private Open Telephony Standard",
      "Point of Termination System",
    ],
    answer: "Plain Old Telephone Service",
    explanation: "POTS stands for Plain Old Telephone Service, providing analog voice connections over legacy copper wiring.",
    aliases: ["plain old telephone service", "pots"],
    keywords: ["plain", "old", "telephone", "service"],
    canTypeInHardMode: true,
  },
  {
    id: "wan-pots-signal-type",
    prompt: "What signal type was used by traditional POTS lines for dial-up connections?",
    options: [
      "Analog signals",
      "Digital signals",
      "Radio frequency signals",
      "Telepathy",
    ],
    answer: "Analog signals",
    explanation: "Traditional POTS lines provided analog telephone connections over physical copper wires.",
    aliases: ["analog", "analog signals", "analog signal"],
    keywords: ["analog"],
    canTypeInHardMode: true,
  },
  {
    id: "wan-dialup-speeds",
    prompt: "What was the typical speed range of traditional dial-up modems?",
    options: [
      "Approximately 300 bps to 54 Kbps",
      "Approximately 64 Kbps to 128 Kbps",
      "Approximately 1.544 Mbps to 44.736 Mbps",
      "Approximately 10 Mbps to 100 Mbps",
    ],
    answer: "Approximately 300 bps to 54 Kbps",
    explanation: "Dial-up modem speeds ranged from approximately 300 bps (early acoustic couplers) up to 54 Kbps (or 56 Kbps standard), depending on the modem and line standard.",
    aliases: [
      "300 bps to 54 kbps",
      "300bps to 54kbps",
      "300 bps - 54 kbps",
      "300-54kbps",
      "300 bps to 56 kbps",
      "54 kbps",
      "56 kbps",
    ],
    keywords: ["300", "54"],
    canTypeInHardMode: true,
  },
];

const part2Questions: QuestionQuizItem[] = [
  {
    id: "wan-channel-bandwidth",
    prompt: "What is the standard bandwidth capacity of each individual digital channel used in ISDN, T-carrier, and E-carrier systems?",
    options: [
      "64 Kbps",
      "32 Kbps",
      "128 Kbps",
      "54 Kbps",
    ],
    answer: "64 Kbps",
    explanation: "Standard digital carrier channels operate at 64 Kbps each, which is the bandwidth required to digitize an analog voice telephone call.",
    aliases: ["64 kbps", "64", "64kbps", "ds0", "64 k"],
    keywords: ["64"],
    canTypeInHardMode: true,
  },
  {
    id: "wan-isdn-spec",
    prompt: "What is the maximum throughput and 64 Kbps channel count of an ISDN connection?",
    options: [
      "128 Kbps (2 channels)",
      "1.544 Mbps (24 channels)",
      "2.048 Mbps (32 channels)",
      "44.736 Mbps (672 channels)",
    ],
    answer: "128 Kbps (2 channels)",
    explanation: "Basic ISDN combines 2 individual 64 Kbps channels to deliver a maximum aggregate throughput of 128 Kbps.",
    aliases: ["128 kbps", "128", "128kbps", "128 kbps (2 channels)"],
    keywords: ["128"],
    canTypeInHardMode: true,
  },
  {
    id: "wan-t1-throughput",
    prompt: "What is the maximum throughput provided by a single North American T1 carrier line?",
    options: [
      "1.544 Mbps",
      "2.048 Mbps",
      "34.368 Mbps",
      "44.736 Mbps",
    ],
    answer: "1.544 Mbps",
    explanation: "A T1 carrier line provides a total maximum throughput of 1.544 Mbps across its 24 channels (including framing overhead).",
    aliases: ["1.544 mbps", "1.544", "1.544mbps"],
    keywords: ["1.544"],
    canTypeInHardMode: true,
  },
  {
    id: "wan-e1-throughput",
    prompt: "What is the maximum throughput provided by a single European E1 carrier line?",
    options: [
      "2.048 Mbps",
      "1.544 Mbps",
      "34.368 Mbps",
      "44.736 Mbps",
    ],
    answer: "2.048 Mbps",
    explanation: "An E1 carrier line provides a total maximum throughput of 2.048 Mbps across its 32 channels.",
    aliases: ["2.048 mbps", "2.048", "2.048mbps"],
    keywords: ["2.048"],
    canTypeInHardMode: true,
  },
  {
    id: "wan-t3-throughput",
    prompt: "What is the maximum throughput provided by a North American T3 carrier line?",
    options: [
      "44.736 Mbps",
      "34.368 Mbps",
      "1.544 Mbps",
      "2.048 Mbps",
    ],
    answer: "44.736 Mbps",
    explanation: "A T3 carrier line delivers a maximum throughput of 44.736 Mbps (aggregating 28 bundled T1 circuits).",
    aliases: ["44.736 mbps", "44.736", "44.736mbps", "45 mbps"],
    keywords: ["44.736"],
    canTypeInHardMode: true,
  },
  {
    id: "wan-e3-throughput",
    prompt: "What is the maximum throughput provided by a European E3 carrier line?",
    options: [
      "34.368 Mbps",
      "44.736 Mbps",
      "2.048 Mbps",
      "1.544 Mbps",
    ],
    answer: "34.368 Mbps",
    explanation: "An E3 carrier line delivers a maximum throughput of 34.368 Mbps (aggregating 16 bundled E1 circuits).",
    aliases: ["34.368 mbps", "34.368", "34.368mbps", "34 mbps"],
    keywords: ["34.368"],
    canTypeInHardMode: true,
  },
];

const part3Questions: QuestionQuizItem[] = [
  {
    id: "wan-t1-channel-count",
    prompt: "How many 64 Kbps channels are contained within a single T1 line?",
    options: [
      "24 channels",
      "32 channels",
      "28 channels",
      "16 channels",
    ],
    answer: "24 channels",
    explanation: "A standard T1 line contains exactly 24 individual 64 Kbps channels.",
    aliases: ["24", "24 channels", "twenty four"],
    keywords: ["24"],
    canTypeInHardMode: true,
  },
  {
    id: "wan-e1-channel-count",
    prompt: "How many 64 Kbps channels are contained within a single E1 line?",
    options: [
      "32 channels",
      "24 channels",
      "16 channels",
      "28 channels",
    ],
    answer: "32 channels",
    explanation: "A standard E1 line contains exactly 32 individual 64 Kbps channels.",
    aliases: ["32", "32 channels", "thirty two"],
    keywords: ["32"],
    canTypeInHardMode: true,
  },
  {
    id: "wan-t3-multiplier",
    prompt: "How many T1 circuits are bundled together to form a single T3 line, and how many total 64 Kbps channels does it provide?",
    options: [
      "28 T1 lines (672 channels)",
      "16 T1 lines (512 channels)",
      "24 T1 lines (576 channels)",
      "32 T1 lines (768 channels)",
    ],
    answer: "28 T1 lines (672 channels)",
    explanation: "A T3 line multiplexes 28 T1 lines (T1x28), providing a total of 672 channels (28 x 24 = 672).",
    aliases: ["672", "672 channels", "28 t1", "28 t1 lines", "t1x28"],
    keywords: ["672"],
    canTypeInHardMode: true,
  },
  {
    id: "wan-e3-multiplier",
    prompt: "How many E1 circuits are bundled together to form a single E3 line, and how many total 64 Kbps channels does it provide?",
    options: [
      "16 E1 lines (512 channels)",
      "28 E1 lines (672 channels)",
      "24 E1 lines (768 channels)",
      "32 E1 lines (1024 channels)",
    ],
    answer: "16 E1 lines (512 channels)",
    explanation: "An E3 line multiplexes 16 E1 lines (E1x16), providing a total of 512 channels (16 x 32 = 512).",
    aliases: ["512", "512 channels", "16 e1", "16 e1 lines", "e1x16"],
    keywords: ["512"],
    canTypeInHardMode: true,
  },
];

const part4Questions: QuestionQuizItem[] = [
  {
    id: "wan-north-america-standards",
    prompt: "Which digital carrier line standards were primarily used in North America?",
    options: [
      "T1 and T3",
      "E1 and E3",
      "ISDN and E1",
      "E3 and T3",
    ],
    answer: "T1 and T3",
    explanation: "T-carrier systems (T1 and T3) were developed and primarily deployed across North America.",
    aliases: ["t1 and t3", "t-carrier", "t carrier"],
    keywords: ["t1", "t3"],
    canTypeInHardMode: true,
  },
  {
    id: "wan-europe-standards",
    prompt: "Which digital carrier line standards were primarily used in Europe?",
    options: [
      "E1 and E3",
      "T1 and T3",
      "ISDN and T1",
      "T3 and E1",
    ],
    answer: "E1 and E3",
    explanation: "E-carrier systems (E1 and E3) were developed and primarily deployed across Europe.",
    aliases: ["e1 and e3", "e-carrier", "e carrier"],
    keywords: ["e1", "e3"],
    canTypeInHardMode: true,
  },
];

const part5Scenarios: DefinitionItem[] = [
  {
    id: "scen-na-branch-office",
    term: "T1",
    definition: "A branch office in Chicago connects to headquarters using a single digital carrier line providing 24 channels of 64 Kbps with a total throughput of 1.544 Mbps.",
    detailHint: "North American Branch Office Connection",
    aliases: ["t1", "t-1", "t 1"],
    keywords: ["t1"],
  },
  {
    id: "scen-eu-data-center",
    term: "E1",
    definition: "A data center in Frankfurt deploys a digital line providing 32 channels of 64 Kbps with an overall throughput of 2.048 Mbps.",
    detailHint: "European Data Center Primary Trunk",
    aliases: ["e1", "e-1", "e 1"],
    keywords: ["e1"],
  },
  {
    id: "scen-na-telecom-aggregator",
    term: "T3",
    definition: "An ISP core router aggregates 28 T1 circuits into a single high-speed trunk providing 672 channels and 44.736 Mbps throughput.",
    detailHint: "North American High-Capacity Core Backbone",
    aliases: ["t3", "t-3", "t 3"],
    keywords: ["t3"],
  },
  {
    id: "scen-eu-broadband-backbone",
    term: "E3",
    definition: "A telecom provider in Paris bundles 16 E1 circuits into a high-throughput line supplying 512 channels and 34.368 Mbps bandwidth.",
    detailHint: "European Metropolitan Trunk Bundling",
    aliases: ["e3", "e-3", "e 3"],
    keywords: ["e3"],
  },
  {
    id: "scen-small-office-digital",
    term: "ISDN",
    definition: "A small business connects two 64 Kbps channels simultaneously over digital telephone lines to achieve 128 Kbps total bandwidth.",
    detailHint: "Dual-Channel Digital Subscriber Connection",
    aliases: ["isdn", "bri", "isdn bri"],
    keywords: ["isdn"],
  },
  {
    id: "scen-legacy-analog-terminal",
    term: "Dial-up POTS",
    definition: "A remote kiosk transmits point-of-sale data over copper telephone lines using an acoustic modulator ranging between 300 bps and 54 Kbps.",
    detailHint: "Remote Outpost Point-of-Sale Terminal",
    aliases: ["dial-up pots", "pots", "dial up", "dial-up", "dialup"],
    keywords: ["pots", "dial-up"],
  },
];

const scenarioOptions = ["T1", "T3", "E1", "E3", "ISDN", "Dial-up POTS"];

const wanSections: MultiSectionConfig[] = [
  {
    id: "part-1-pots",
    title: "POTS & Analog Modems",
    subtitle: "[PART_1: POTS & ANALOG MODEMS]",
    description: "Verify your knowledge of Plain Old Telephone Service, signaling types, and legacy bandwidth limits.",
    type: "questions",
    questions: part1Questions,
  },
  {
    id: "part-2-throughput",
    title: "Carrier Standards & Max Throughput",
    subtitle: "[PART_2: CARRIER STANDARDS & MAX THROUGHPUT]",
    description: "Validate maximum transmission throughput specifications for T1, E1, T3, E3, and ISDN digital links.",
    type: "questions",
    questions: part2Questions,
  },
  {
    id: "part-3-channels",
    title: "Channel Capacity & Multipliers",
    subtitle: "[PART_3: CHANNEL CAPACITY & MULTIPLIERS]",
    description: "Confirm channel counts and framing multipliers composing North American and European carrier hierarchies.",
    type: "questions",
    questions: part3Questions,
  },
  {
    id: "part-4-geography",
    title: "Geographic Deployment & Standards",
    subtitle: "[PART_4: GEOGRAPHIC DEPLOYMENT & STANDARDS]",
    description: "Identify the global regional deployment boundaries of T-carrier vs E-carrier telecommunication architectures.",
    type: "questions",
    questions: part4Questions,
  },
  {
    id: "part-5-scenarios",
    title: "WAN Link Deployment Scenarios",
    subtitle: "[PART_5: REALISTIC DEPLOYMENT SCENARIOS]",
    description: "Match enterprise networking requirements and branch deployment descriptions to the appropriate carrier technology.",
    type: "matching",
    matchingItems: part5Scenarios,
    matchingOptions: scenarioOptions,
  },
];

function WANTechnologiesContent() {
  const searchParams = useSearchParams();
  const isMastery = searchParams.get("mastery") === "true";

  const tabs: QuizTab[] = [
    {
      id: "table",
      label: "[01_CARRIER_SPECIFICATION_MATRIX]",
      content: (
        <TableWithBlanksQuiz
          heading="[WAN_CARRIER_SPECIFICATION_MATRIX]"
          description="Fill in the missing fields in the WAN carrier matrix (T1, E1, T3, E3, and ISDN) across progressive stages."
          columns={columns}
          rows={carrierRows}
          columnOptions={columnOptions}
          blankCountsByStage={BLANK_COUNTS_BY_STAGE}
          initialHardMode={isMastery}
          hideHeader={true}
          allowAnyRowOrder={true}
        />
      ),
    },
    {
      id: "questions",
      label: "[02_DIAGNOSTIC_QUESTIONS_&_SCENARIOS]",
      content: (
        <MultiSectionQuiz
          title="WAN Carrier Assessment"
          sections={wanSections}
          initialHardMode={isMastery}
          isEmbedded={true}
        />
      ),
    },
  ];

  return (
    <TabbedQuiz
      moduleTag="DIAGNOSTIC_MODULE"
      moduleCode="TELECOM_WAN_CARRIERS"
      title="WAN Technologies (T1, E1, T3, E3, ISDN)"
      studyGuideHref="/study-guide#wan-technologies"
      tabs={tabs}
    />
  );
}

export default function WANTechnologiesQuiz() {
  return (
    <Suspense fallback={null}>
      <WANTechnologiesContent />
    </Suspense>
  );
}
