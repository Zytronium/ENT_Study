"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TabbedQuiz, { QuizTab } from "@/components/study-quiz/TabbedQuiz";
import TableWithBlanksQuiz, { TableColumn, TableRow } from "@/components/study-quiz/TableWithBlanksQuiz";
import QuestionQuiz, { QuestionQuizItem } from "@/components/study-quiz/QuestionQuiz";

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

const conceptualQuestions: QuestionQuizItem[] = [
  {
    id: "cq-ports-port-ranges",
    category: "Port Number Ranges",
    prompt: "According to standard transport layer port allocations, which port range is designated as System or Well-Known ports?",
    options: [
      "0 to 1023",
      "1024 to 49151",
      "49152 to 65535",
      "1 to 255",
    ],
    answer: "0 to 1023",
    explanation: "Ports 0 through 1023 are classified as System / Well-known ports.",
    aliases: ["0-1023", "0 to 1023", "0 - 1023", "0 through 1023"],
    keywords: ["0", "1023"],
    canTypeInHardMode: true,
  },
  {
    id: "cq-ports-tcp-vs-udp",
    category: "Transport Protocols",
    prompt: "What is a primary operational characteristic of the Transmission Control Protocol (TCP) compared to User Datagram Protocol (UDP)?",
    options: [
      "TCP is connection-oriented and provides reliable delivery with flow control and error checking",
      "TCP is connectionless and does not verify whether packets arrive intact",
      "TCP operates exclusively at Layer 3 to route packets across networks",
      "TCP is faster than UDP because it eliminates delivery acknowledgments",
    ],
    answer: "TCP is connection-oriented and provides reliable delivery with flow control and error checking",
    explanation: "TCP is a reliable, direction-oriented protocol that ensures data is delivered, while UDP is connectionless and unreliable.",
    aliases: [
      "tcp is connection-oriented and reliable",
      "reliable",
      "connection-oriented",
      "direction-oriented and reliable",
    ],
    keywords: ["reliable", "connection"],
    canTypeInHardMode: false,
  },
  {
    id: "cq-ports-web-secure",
    category: "Standard Protocols",
    prompt: "Which standard TCP port numbers are utilized by unencrypted HTTP and encrypted HTTPS web traffic respectively?",
    options: [
      "Port 80 for HTTP and Port 443 for HTTPS",
      "Port 20 for HTTP and Port 21 for HTTPS",
      "Port 25 for HTTP and Port 110 for HTTPS",
      "Port 53 for HTTP and Port 69 for HTTPS",
    ],
    answer: "Port 80 for HTTP and Port 443 for HTTPS",
    explanation: "HTTP operates over TCP port 80, whereas HTTPS uses TCP port 443.",
    aliases: [
      "80 and 443",
      "80, 443",
      "port 80 and port 443",
      "80/443",
      "80,443",
    ],
    keywords: ["80", "443"],
    canTypeInHardMode: true,
  },
  {
    id: "cq-ports-remote-management",
    category: "Remote Access Protocols",
    prompt: "Which secure CLI remote access protocol operates on TCP port 22, replacing the unencrypted Telnet protocol on TCP port 23?",
    options: [
      "SSH (Secure Shell)",
      "RDP (Remote Desktop Protocol)",
      "LDAP (Lightweight Directory Access Protocol)",
      "SMTP (Simple Mail Transfer Protocol)",
    ],
    answer: "SSH (Secure Shell)",
    explanation: "SSH provides encrypted remote management over TCP port 22, whereas Telnet operates over TCP port 23 unencrypted.",
    aliases: ["ssh", "secure shell", "ssh (secure shell)"],
    keywords: ["ssh"],
    canTypeInHardMode: true,
  },
  {
    id: "cq-ports-email-protocols",
    category: "Email Protocols",
    prompt: "Which email protocols use TCP ports 25, 110, and 143 respectively?",
    options: [
      "SMTP (Port 25), POP3 (Port 110), and IMAP (Port 143)",
      "POP3 (Port 25), SMTP (Port 110), and IMAP (Port 143)",
      "IMAP (Port 25), POP3 (Port 110), and SMTP (Port 143)",
      "SMTP (Port 25), IMAP (Port 110), and POP3 (Port 143)",
    ],
    answer: "SMTP (Port 25), POP3 (Port 110), and IMAP (Port 143)",
    explanation: "Simple Mail Transfer Protocol uses port 25, Post Office Protocol 3 uses port 110, and Internet Message Access Protocol uses port 143, all over TCP.",
    aliases: [
      "smtp, pop3, imap",
      "smtp, pop3, and imap",
      "smtp pop3 imap",
    ],
    keywords: ["smtp", "pop3", "imap"],
    canTypeInHardMode: false,
  },
  {
    id: "cq-ports-udp-services",
    category: "UDP Services",
    prompt: "Which of the following network services use UDP rather than TCP for their primary transport operations?",
    options: [
      "DHCP (Ports 67, 68), TFTP (Port 69), and SNMP (Port 161)",
      "HTTP (Port 80), HTTPS (Port 443), and SSH (Port 22)",
      "SMTP (Port 25), POP3 (Port 110), and IMAP (Port 143)",
      "FTP Data (Port 20), FTP Control (Port 21), and Telnet (Port 23)",
    ],
    answer: "DHCP (Ports 67, 68), TFTP (Port 69), and SNMP (Port 161)",
    explanation: "DHCP (UDP 67/68), TFTP (UDP 69), SNMP (UDP 161), and L2TP (UDP 1701) all use UDP as their transport protocol.",
    aliases: [
      "dhcp, tftp, snmp",
      "dhcp, tftp, and snmp",
      "dhcp tftp snmp",
    ],
    keywords: ["dhcp", "tftp", "snmp"],
    canTypeInHardMode: false,
  },
  {
    id: "cq-ports-ftp-operation",
    category: "File Transfer Protocols",
    prompt: "How are TCP port numbers 20 and 21 allocated during standard File Transfer Protocol (FTP) operations?",
    options: [
      "Port 20 is used for FTP Data transfer and Port 21 is used for FTP Control commands",
      "Port 20 is used for FTP Control commands and Port 21 is used for FTP Data transfer",
      "Port 20 is used for encrypted SFTP and Port 21 is used for unencrypted FTP",
      "Port 20 is used for TFTP UDP transfer and Port 21 is used for FTP TCP transfer",
    ],
    answer: "Port 20 is used for FTP Data transfer and Port 21 is used for FTP Control commands",
    explanation: "FTP uses two separate TCP connections: port 20 for data transmission and port 21 for command/control.",
    aliases: [
      "20 for data and 21 for control",
      "20 is data and 21 is control",
      "20 data, 21 control",
      "port 20 data and port 21 control",
    ],
    keywords: ["20", "21", "data", "control"],
    canTypeInHardMode: false,
  },
  {
    id: "cq-ports-directory-vpn-shares",
    category: "Directory & Sharing Protocols",
    prompt: "Which standard ports are used by LDAP (Lightweight Directory Access Protocol) and SMB (Server Message Block)?",
    options: [
      "LDAP uses TCP port 389; SMB uses TCP port 139 or 445",
      "LDAP uses UDP port 1701; SMB uses TCP port 3389",
      "LDAP uses TCP port 22; SMB uses UDP port 161",
      "LDAP uses TCP port 110; SMB uses TCP port 143",
    ],
    answer: "LDAP uses TCP port 389; SMB uses TCP port 139 or 445",
    explanation: "LDAP uses TCP port 389, and SMB uses TCP ports 139 or 445 for file and printer sharing.",
    aliases: [
      "ldap 389, smb 139 or 445",
      "389 and 139 or 445",
      "389, 139 or 445",
    ],
    keywords: ["389", "139", "445"],
    canTypeInHardMode: false,
  },
];

function PortChartContent() {
  const searchParams = useSearchParams();
  const isMastery = searchParams.get("mastery") === "true";

  const tabs: QuizTab[] = [
    {
      id: "table",
      label: "[01_PORT_MATRIX]",
      content: (
        <TableWithBlanksQuiz
          heading="[PROTOCOL_PORT_CHART_MATRIX]"
          description="Fill in the missing fields in the protocol/port matrix across progressive difficulty stages."
          columns={columns}
          rows={portRows}
          columnOptions={columnOptions}
          blankCountsByStage={BLANK_COUNTS_BY_STAGE}
          allowAnyRowOrder={true}
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
          heading="[TRANSPORT_LAYER_CONCEPTUAL_ASSESSMENT]"
          description="Test your knowledge of Layer 4 transport protocols, well-known port ranges, and standard protocol port allocations."
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
      moduleCode="PORT_CHART_MATRIX"
      title="Transport Layer Ports"
      studyGuideHref="/study-guide#layer-4-transport--ports"
      tabs={tabs}
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
