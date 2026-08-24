"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TableWithBlanksQuiz, { TableColumn, TableRow } from "@/components/study-quiz/TableWithBlanksQuiz";

const columns: TableColumn[] = [
  { key: "protocol", label: "Protocol/Application" },
  { key: "tcpUdp", label: "TCP/UDP" },
  { key: "port", label: "Port Number" },
];

const portRows: TableRow[] = [
  { id: 1, protocol: "FTP Data", tcpUdp: "TCP", port: "20" },
  { id: 2, protocol: "FTP Control", tcpUdp: "TCP", port: "21" },
  { id: 3, protocol: "SSH", tcpUdp: "TCP", port: "22" },
  { id: 4, protocol: "Telnet", tcpUdp: "TCP", port: "23" },
  { id: 5, protocol: "SMTP", tcpUdp: "TCP", port: "25" },
  { id: 6, protocol: "DNS", tcpUdp: "TCP/UDP", port: "53" },
  { id: 7, protocol: "DHCP", tcpUdp: "UDP", port: "67, 68" },
  { id: 8, protocol: "TFTP", tcpUdp: "UDP", port: "69" },
  { id: 9, protocol: "HTTP", tcpUdp: "TCP", port: "80" },
  { id: 10, protocol: "HTTPS", tcpUdp: "TCP", port: "443" },
  { id: 11, protocol: "POP3", tcpUdp: "TCP", port: "110" },
  { id: 12, protocol: "SNMP", tcpUdp: "UDP", port: "161" },
  { id: 13, protocol: "RDP", tcpUdp: "TCP", port: "3389" },
  { id: 14, protocol: "IMAP", tcpUdp: "TCP", port: "143" },
  { id: 15, protocol: "SMB", tcpUdp: "TCP", port: "139 or 445" },
  { id: 16, protocol: "L2TP", tcpUdp: "UDP", port: "1701" },
  { id: 17, protocol: "LDAP", tcpUdp: "TCP", port: "389" },
];

const columnOptions: Record<string, string[]> = {
  protocol: [
    "FTP Data",
    "FTP Control",
    "SSH",
    "Telnet",
    "SMTP",
    "DNS",
    "DHCP",
    "TFTP",
    "HTTP",
    "HTTPS",
    "POP3",
    "SNMP",
    "RDP",
    "IMAP",
    "SMB",
    "L2TP",
    "LDAP",
  ],
  tcpUdp: ["TCP", "UDP", "TCP/UDP"],
  port: [
    "20",
    "21",
    "22",
    "23",
    "25",
    "53",
    "67, 68",
    "69",
    "80",
    "443",
    "110",
    "161",
    "3389",
    "143",
    "139 or 445",
    "1701",
    "389",
  ],
};

const BLANK_COUNTS_BY_STAGE = [5, 10, 17, 24, 32, 40, 51];

function PortChartContent() {
  const searchParams = useSearchParams();
  const isMastery = searchParams.get("mastery") === "true";

  return (
    <TableWithBlanksQuiz
      moduleTag="DIAGNOSTIC_MODULE"
      moduleCode="PORT_CHART_MATRIX"
      title="Protocol Port Chart"
      heading="[PROTOCOL_PORT_CHART_MATRIX]"
      description="Fill in the missing fields in the protocol/port matrix across progressive difficulty stages."
      studyGuideHref="/study-guide#protocol-port-chart"
      columns={columns}
      rows={portRows}
      columnOptions={columnOptions}
      blankCountsByStage={BLANK_COUNTS_BY_STAGE}
      allowAnyRowOrder={true}
      initialHardMode={isMastery}
    />
  );
}

export default function PortChartQuiz() {
  return (
    <Suspense fallback={null}>
      <PortChartContent />
    </Suspense>
  );
}
