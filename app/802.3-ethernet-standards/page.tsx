"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TableWithBlanksQuiz, { TableColumn, TableRow } from "@/components/study-quiz/TableWithBlanksQuiz";

const columns: TableColumn[] = [
  { key: "ieeeStandard", label: "IEEE Standard" },
  { key: "tStandard", label: "T-Standard" },
  { key: "maxDistance", label: "Max Distance" },
  { key: "speed", label: "Speed" },
  { key: "cableType", label: "Cable Type" },
  { key: "minCategory", label: "Min. Category" },
  { key: "connectors", label: "Connectors" },
];

const standardRows: TableRow[] = [
  {
    id: 1,
    ieeeStandard: "802.3",
    tStandard: "10base2",
    maxDistance: "200m",
    speed: "10 Mb/s",
    cableType: "Thinnet (thin coax)",
    minCategory: "-",
    connectors: "T-connectors, BNC connectors, terminators",
  },
  {
    id: 2,
    ieeeStandard: "802.3",
    tStandard: "10base5",
    maxDistance: "500m",
    speed: "10 Mb/s",
    cableType: "Thicknet (thick coax)",
    minCategory: "-",
    connectors: "Vampire Taps",
  },
  {
    id: 3,
    ieeeStandard: "802.3i",
    tStandard: "10baseT",
    maxDistance: "100m",
    speed: "10 Mb/s",
    cableType: "Twisted pair",
    minCategory: "Cat3 or better",
    connectors: "RJ45/RJ11",
  },
  {
    id: 4,
    ieeeStandard: "802.3u",
    tStandard: "100baseT",
    maxDistance: "100m",
    speed: "100 Mb/s",
    cableType: "Twisted pair",
    minCategory: "Cat5 or better",
    connectors: "RJ45",
  },
  {
    id: 5,
    ieeeStandard: "802.3z",
    tStandard: "1000baseT",
    maxDistance: "100m",
    speed: "1 Gb/s",
    cableType: "Twisted pair",
    minCategory: "Cat5e or better",
    connectors: "RJ45",
  },
  {
    id: 6,
    ieeeStandard: "802.3an",
    tStandard: "10GbaseT",
    maxDistance: "Cat5e/Cat6: 55m; Cat6a or better: 100m",
    speed: "10 Gb/s",
    cableType: "Twisted pair",
    minCategory: "Cat5e or better",
    connectors: "RJ45",
    cellSegments: {
      maxDistance: [
        { key: "0", label: "Cat5e/Cat6", value: "55m" },
        { key: "1", label: "Cat6a or better", value: "100m" },
      ],
    },
  },
];

const columnOptions: Record<string, string[]> = {
  ieeeStandard: ["802.3", "802.3i", "802.3u", "802.3z", "802.3an"],
  tStandard: ["10base2", "10base5", "10baseT", "100baseT", "1000baseT", "10GbaseT"],
  maxDistance: ["55m", "100m", "200m", "500m"],
  speed: ["10 Mb/s", "100 Mb/s", "1 Gb/s", "10 Gb/s"],
  cableType: ["Thicknet (thick coax)", "Thinnet (thin coax)", "Twisted pair"],
  minCategory: ["Cat3 or better", "Cat5 or better", "Cat5e or better"],
  connectors: [
    "RJ45",
    "RJ45/RJ11",
    "T-connectors, BNC connectors, terminators",
    "Vampire Taps",
  ],
};

const BLANK_COUNTS_BY_STAGE = [6, 12, 18, 26, 34, 41];

function EthernetStandardsContent() {
  const searchParams = useSearchParams();
  const isMastery = searchParams.get("mastery") === "true";

  return (
    <TableWithBlanksQuiz
      moduleTag="DIAGNOSTIC_MODULE"
      moduleCode="802.3_STANDARDS_MATRIX"
      title="802.3 Ethernet Standards"
      heading="[802.3_ETHERNET_STANDARDS_MATRIX]"
      description="Fill in the missing fields in the 802.3 Ethernet standards matrix across progressive difficulty stages."
      studyGuideHref="/study-guide#8023-ethernet-standards"
      columns={columns}
      rows={standardRows}
      columnOptions={columnOptions}
      blankCountsByStage={BLANK_COUNTS_BY_STAGE}
      initialHardMode={isMastery}
    />
  );
}

export default function EthernetStandardsQuiz() {
  return (
    <Suspense fallback={null}>
      <EthernetStandardsContent />
    </Suspense>
  );
}
