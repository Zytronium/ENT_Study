"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TableWithBlanksQuiz, { TableColumn, TableRow } from "@/components/study-quiz/TableWithBlanksQuiz";

const columns: TableColumn[] = [
  { key: "version", label: "Version" },
  { key: "ieeeStandard", label: "IEEE Standard" },
  { key: "frequency", label: "Frequency" },
  { key: "speed", label: "Speed" },
  { key: "distance", label: "Distance" },
];

const standardRows: TableRow[] = [
  {
    id: 1,
    version: "Wi-Fi",
    ieeeStandard: "802.11",
    frequency: "2.4 GHz",
    speed: "2 Mb/s",
    distance: "100 ft",
  },
  {
    id: 2,
    version: "Wi-Fi 1",
    ieeeStandard: "802.11b",
    frequency: "2.4 GHz",
    speed: "11 Mb/s",
    distance: "100 ft",
  },
  {
    id: 3,
    version: "Wi-Fi 2",
    ieeeStandard: "802.11a",
    frequency: "5 GHz",
    speed: "54 Mb/s",
    distance: "100 ft",
  },
  {
    id: 4,
    version: "Wi-Fi 3",
    ieeeStandard: "802.11g",
    frequency: "2.4 GHz",
    speed: "54 Mb/s",
    distance: "125 ft",
  },
  {
    id: 5,
    version: "Wi-Fi 4",
    ieeeStandard: "802.11n",
    frequency: "2.4 GHz + 5 GHz",
    speed: "600 Mb/s",
    distance: "225 ft",
  },
  {
    id: 6,
    version: "Wi-Fi 5",
    ieeeStandard: "802.11ac",
    frequency: "5 GHz",
    speed: "1 Gb/s",
    distance: "90 ft",
  },
  {
    id: 7,
    version: "Wi-Fi 6",
    ieeeStandard: "802.11ax",
    frequency: "2.4 GHz + 5 GHz",
    speed: "14 Gb/s",
    distance: "100 ft",
  },
];

const columnOptions: Record<string, string[]> = {
  version: ["Wi-Fi", "Wi-Fi 1", "Wi-Fi 2", "Wi-Fi 3", "Wi-Fi 4", "Wi-Fi 5", "Wi-Fi 6"],
  ieeeStandard: ["802.11", "802.11a", "802.11ac", "802.11ax", "802.11b", "802.11g", "802.11n"],
  frequency: ["2.4 GHz", "5 GHz", "2.4 GHz + 5 GHz"],
  speed: ["2 Mb/s", "11 Mb/s", "54 Mb/s", "600 Mb/s", "1 Gb/s", "14 Gb/s"],
  distance: ["90 ft", "100 ft", "125 ft", "225 ft"],
};

const BLANK_COUNTS_BY_STAGE = [5, 10, 16, 22, 28, 35];

function WifiStandardsContent() {
  const searchParams = useSearchParams();
  const isMastery = searchParams.get("mastery") === "true";

  return (
    <TableWithBlanksQuiz
      moduleTag="DIAGNOSTIC_MODULE"
      moduleCode="802.11_STANDARDS_MATRIX"
      title="802.11 Wireless Standards"
      heading="[802.11_WIRELESS_STANDARDS_MATRIX]"
      description="Fill in the missing fields in the 802.11 wireless standards matrix across progressive difficulty stages."
      studyGuideHref="/study-guide#80211-wireless-standards"
      columns={columns}
      rows={standardRows}
      columnOptions={columnOptions}
      blankCountsByStage={BLANK_COUNTS_BY_STAGE}
      initialHardMode={isMastery}
    />
  );
}

export default function WifiStandardsQuiz() {
  return (
    <Suspense fallback={null}>
      <WifiStandardsContent />
    </Suspense>
  );
}
