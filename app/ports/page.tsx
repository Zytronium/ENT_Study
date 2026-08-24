"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TabbedQuiz, { QuizTab } from "@/components/study-quiz/TabbedQuiz";
import TableWithBlanksQuiz, { TableColumn, TableRow } from "@/components/study-quiz/TableWithBlanksQuiz";
import QuestionQuiz, { QuestionQuizItem } from "@/components/study-quiz/QuestionQuiz";
import FlashcardQuiz, { FlashcardItem } from "@/components/study-quiz/FlashcardQuiz";

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
    explanation: "TCP is a reliable, connection-oriented protocol that ensures data is delivered, while UDP is connectionless and unreliable.",
    aliases: [
      "tcp is connection-oriented and reliable",
      "connection-oriented and reliable",
      "connection-oriented",
      "reliable and connection-oriented",
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

const portFlashcards: FlashcardItem[] = [
  // --- Port Ranges ---
  {
    id: "fc-range-well-known",
    category: "Port Ranges",
    prompt: "What is the designated port number range for System / Well-Known ports?",
    answer: "0 to 1023",
    aliases: ["0-1023", "0 to 1023", "0 - 1023", "0 through 1023"],
    keywords: ["0", "1023"],
    options: ["0 to 1023", "1024 to 49151", "49152 to 65535", "1 to 255"],
    explanation: "Ports 0 through 1023 are classified as System or Well-Known ports reserved for standard core network services.",
  },
  {
    id: "fc-range-well-known-name",
    category: "Port Ranges",
    prompt: "Which port classification is assigned to port numbers 0 through 1023?",
    answer: "System / Well-known ports",
    aliases: ["system", "well known", "well-known", "system / well-known", "well-known ports", "system ports"],
    keywords: ["system", "well", "known"],
    options: ["System / Well-known ports", "User / Registered ports", "Dynamic / Private ports", "Ephemeral ports"],
    explanation: "Ports 0-1023 are designated as System / Well-known ports.",
  },
  {
    id: "fc-range-registered",
    category: "Port Ranges",
    prompt: "What is the designated port number range for User / Registered ports?",
    answer: "1024 to 49151",
    aliases: ["1024-49151", "1024 to 49151", "1024 - 49151", "1024 through 49151"],
    keywords: ["1024", "49151"],
    options: ["1024 to 49151", "0 to 1023", "49152 to 65535", "1024 to 65535"],
    explanation: "Ports 1024 through 49151 are designated as User / Registered ports (such as RDP 3389 and L2TP 1701).",
  },
  {
    id: "fc-range-registered-name",
    category: "Port Ranges",
    prompt: "Which port classification is assigned to port numbers 1024 through 49151?",
    answer: "User / Registered ports",
    aliases: ["user", "registered", "user / registered", "registered ports", "user ports"],
    keywords: ["user", "registered"],
    options: ["User / Registered ports", "System / Well-known ports", "Dynamic / Private ports", "Core ports"],
    explanation: "Ports 1024-49151 are classified as User / Registered ports.",
  },
  {
    id: "fc-range-dynamic",
    category: "Port Ranges",
    prompt: "What is the designated port number range for Dynamic / Private ports?",
    answer: "49152 to 65535",
    aliases: ["49152-65535", "49152 to 65535", "49512-65535", "49512 to 65535"],
    keywords: ["49152", "65535"],
    options: ["49152 to 65535", "0 to 1023", "1024 to 49151", "32768 to 65535"],
    explanation: "Ports 49152 through 65535 are classified as Dynamic or Private ports.",
  },
  {
    id: "fc-range-dynamic-name",
    category: "Port Ranges",
    prompt: "Which port classification is assigned to port numbers 49152 through 65535?",
    answer: "Dynamic / Private ports",
    aliases: ["dynamic", "private", "dynamic / private", "dynamic / private ports", "private ports", "dynamic ports"],
    keywords: ["dynamic", "private"],
    options: ["Dynamic / Private ports", "System / Well-known ports", "User / Registered ports", "Reserved ports"],
    explanation: "Ports 49152-65535 are Dynamic / Private ports typically assigned dynamically for outbound client sessions.",
  },

  // --- Transport Protocols ---
  {
    id: "fc-tcp-reliability",
    category: "Transport Protocols",
    prompt: "What are the primary operational characteristics of TCP (Transmission Control Protocol)?",
    answer: "Connection-oriented and reliable",
    aliases: [
      "connection-oriented and reliable",
      "reliable and connection-oriented",
      "connection-oriented",
      "connection oriented",
      "connection oriented and reliable",
      "reliable and connection oriented",
    ],
    keywords: ["connection", "reliable"],
    options: [
      "Connection-oriented and reliable",
      "Connectionless and not reliable",
      "Broadcast-only and best-effort",
      "Hardware-based with no flow control",
    ],
    explanation: "TCP is a reliable, connection-oriented protocol that ensures delivery and provides flow control.",
  },
  {
    id: "fc-udp-reliability",
    category: "Transport Protocols",
    prompt: "What are the primary operational characteristics of UDP (User Datagram Protocol)?",
    answer: "Connectionless and not reliable",
    aliases: ["unreliable", "connectionless", "not reliable", "connectionless and not reliable", "connectionless and unreliable"],
    keywords: ["connectionless"],
    options: [
      "Connectionless and not reliable",
      "Connection-oriented and reliable",
      "Guaranteed delivery with sequencing",
      "Point-to-point virtual circuit",
    ],
    explanation: "UDP is connectionless and does not guarantee delivery; verifying delivery is handled by the application layer.",
  },

  // --- Protocols & Ports ---
  {
    id: "fc-ftp-data",
    category: "File Transfer",
    prompt: "What is the standard port number and transport protocol for FTP Data?",
    answer: "TCP 20",
    aliases: ["tcp 20", "port 20 tcp", "tcp port 20", "20 tcp", "20/tcp"],
    keywords: ["tcp", "20"],
    options: ["TCP 20", "TCP 21", "UDP 69", "TCP 22"],
    explanation: "FTP Data transfers files across TCP port 20.",
    meta: "FTP Data",
  },
  {
    id: "fc-ftp-control",
    category: "File Transfer",
    prompt: "What is the standard port number and transport protocol for FTP Control commands?",
    answer: "TCP 21",
    aliases: ["tcp 21", "port 21 tcp", "tcp port 21", "21 tcp", "21/tcp"],
    keywords: ["tcp", "21"],
    options: ["TCP 21", "TCP 20", "TCP 23", "TCP 22"],
    explanation: "FTP Control handles commands and connection setup over TCP port 21.",
    meta: "FTP Control",
  },
  {
    id: "fc-ssh-port",
    category: "Remote Access",
    prompt: "What is the standard port number for SSH (Secure Shell)?",
    answer: "22",
    aliases: ["22", "tcp 22", "port 22", "tcp port 22"],
    keywords: ["22"],
    options: ["22", "23", "3389", "80"],
    explanation: "SSH operates over TCP port 22 to provide encrypted remote CLI access.",
    meta: "TCP 22",
  },
  {
    id: "fc-ssh-protocol",
    category: "Remote Access",
    prompt: "Which secure encrypted remote management protocol operates on TCP port 22?",
    answer: "SSH (Secure Shell)",
    aliases: ["ssh", "secure shell", "ssh (secure shell)"],
    keywords: ["ssh"],
    options: ["SSH (Secure Shell)", "Telnet", "RDP", "LDAP"],
    explanation: "SSH operates over TCP port 22.",
    meta: "Port 22",
  },
  {
    id: "fc-telnet-port",
    category: "Remote Access",
    prompt: "What is the standard port number for Telnet?",
    answer: "23",
    aliases: ["23", "tcp 23", "port 23", "tcp port 23"],
    keywords: ["23"],
    options: ["23", "22", "25", "110"],
    explanation: "Telnet operates over TCP port 23 unencrypted.",
    meta: "TCP 23",
  },
  {
    id: "fc-telnet-protocol",
    category: "Remote Access",
    prompt: "Which unencrypted terminal protocol operates on TCP port 23?",
    answer: "Telnet",
    aliases: ["telnet", "teletype network"],
    keywords: ["telnet"],
    options: ["Telnet", "SSH", "TFTP", "SNMP"],
    explanation: "Telnet operates over TCP port 23 without encryption.",
    meta: "Port 23",
  },
  {
    id: "fc-smtp-port",
    category: "Email Protocols",
    prompt: "What is the standard port number for SMTP (Simple Mail Transfer Protocol)?",
    answer: "25",
    aliases: ["25", "tcp 25", "port 25", "tcp port 25"],
    keywords: ["25"],
    options: ["25", "110", "143", "53"],
    explanation: "SMTP sends email between mail transfer agents over TCP port 25.",
    meta: "TCP 25",
  },
  {
    id: "fc-smtp-protocol",
    category: "Email Protocols",
    prompt: "Which protocol uses TCP port 25 for sending and relaying email?",
    answer: "SMTP (Simple Mail Transfer Protocol)",
    aliases: ["smtp", "simple mail transfer protocol", "smtp (simple mail transfer protocol)"],
    keywords: ["smtp"],
    options: ["SMTP (Simple Mail Transfer Protocol)", "POP3", "IMAP", "SNMP"],
    explanation: "SMTP operates over TCP port 25.",
    meta: "Port 25",
  },
  {
    id: "fc-dns-port",
    category: "Name Resolution",
    prompt: "What port number is standardly used by DNS (Domain Name System)?",
    answer: "53",
    aliases: ["53", "port 53", "tcp/udp 53"],
    keywords: ["53"],
    options: ["53", "67", "69", "80"],
    explanation: "DNS uses port 53 for hostname-to-IP resolution.",
    meta: "TCP/UDP 53",
  },
  {
    id: "fc-dns-transport",
    category: "Name Resolution",
    prompt: "Which transport layer protocol(s) does DNS use on port 53?",
    answer: "TCP/UDP",
    aliases: ["tcp and udp", "tcp/udp", "both tcp and udp", "tcp, udp"],
    keywords: ["tcp", "udp"],
    options: ["TCP/UDP", "TCP only", "UDP only", "Neither"],
    explanation: "DNS can utilize both TCP and UDP on port 53 (UDP for standard queries, TCP for zone transfers).",
    meta: "Port 53",
  },
  {
    id: "fc-dhcp-ports",
    category: "Network Services",
    prompt: "Which port numbers and transport protocol are used by DHCP?",
    answer: "UDP 67, 68",
    aliases: ["udp 67, 68", "udp 67,68", "udp 67 and 68", "udp 67/68", "udp 67 68", "67, 68 udp", "67/68 udp", "67 68 udp"],
    keywords: ["udp", "67", "68"],
    options: ["UDP 67, 68", "UDP 69", "TCP 80", "TCP 20, 21"],
    explanation: "DHCP uses UDP port 67 (server) and UDP port 68 (client).",
    meta: "DHCP",
  },
  {
    id: "fc-tftp-port",
    category: "File Transfer",
    prompt: "What is the standard port number and transport protocol for TFTP (Trivial File Transfer Protocol)?",
    answer: "UDP 69",
    aliases: ["udp 69", "port 69 udp", "udp port 69", "69 udp", "69/udp"],
    keywords: ["udp", "69"],
    options: ["UDP 69", "TCP 20", "TCP 21", "UDP 161"],
    explanation: "TFTP uses UDP port 69 for lightweight unauthenticated file transfer.",
    meta: "TFTP",
  },
  {
    id: "fc-http-port",
    category: "Web Protocols",
    prompt: "What is the standard port number for unencrypted HTTP web traffic?",
    answer: "80",
    aliases: ["80", "tcp 80", "port 80", "tcp port 80"],
    keywords: ["80"],
    options: ["80", "443", "8080", "53"],
    explanation: "HTTP operates over TCP port 80.",
    meta: "TCP 80",
  },
  {
    id: "fc-https-port",
    category: "Web Protocols",
    prompt: "What is the standard port number for encrypted HTTPS web traffic?",
    answer: "443",
    aliases: ["443", "tcp 443", "port 443", "tcp port 443"],
    keywords: ["443"],
    options: ["443", "80", "8443", "22"],
    explanation: "HTTPS encrypts web traffic using SSL/TLS over TCP port 443.",
    meta: "TCP 443",
  },
  {
    id: "fc-pop3-port",
    category: "Email Protocols",
    prompt: "What is the standard port number for POP3 (Post Office Protocol)?",
    answer: "110",
    aliases: ["110", "tcp 110", "port 110", "tcp port 110"],
    keywords: ["110"],
    options: ["110", "143", "25", "389"],
    explanation: "POP3 retrieves email from a mail server over TCP port 110.",
    meta: "TCP 110",
  },
  {
    id: "fc-imap-port",
    category: "Email Protocols",
    prompt: "What is the standard port number for IMAP (Internet Message Access Protocol)?",
    answer: "143",
    aliases: ["143", "tcp 143", "port 143", "tcp port 143"],
    keywords: ["143"],
    options: ["143", "110", "25", "161"],
    explanation: "IMAP retrieves and manages email messages/folders over TCP port 143.",
    meta: "TCP 143",
  },
  {
    id: "fc-snmp-port",
    category: "Network Management",
    prompt: "What is the standard port number and transport protocol for SNMP (Simple Network Management Protocol)?",
    answer: "UDP 161",
    aliases: ["udp 161", "port 161 udp", "udp port 161", "161 udp", "161/udp"],
    keywords: ["udp", "161"],
    options: ["UDP 161", "TCP 161", "TCP 389", "UDP 1701"],
    explanation: "SNMP monitors network devices and queries metrics over UDP port 161.",
    meta: "SNMP",
  },
  {
    id: "fc-rdp-port",
    category: "Remote Access",
    prompt: "What is the standard port number for RDP (Remote Desktop Protocol)?",
    answer: "3389",
    aliases: ["3389", "tcp 3389", "port 3389", "tcp port 3389"],
    keywords: ["3389"],
    options: ["3389", "1701", "389", "22"],
    explanation: "Microsoft Remote Desktop Protocol operates over TCP port 3389.",
    meta: "TCP 3389",
  },
  {
    id: "fc-smb-port",
    category: "File Sharing",
    prompt: "Which port number(s) are standardly used by SMB (Server Message Block)?",
    answer: "139 or 445",
    aliases: ["139 or 445", "139, 445", "139,445", "139 and 445", "139/445", "445 or 139", "445", "139", "tcp 139 or 445"],
    keywords: ["139", "445"],
    options: ["139 or 445", "20 or 21", "67, 68", "110 or 143"],
    explanation: "SMB uses TCP port 139 (NetBIOS) or direct TCP port 445 for network file and printer sharing.",
    meta: "TCP 139 / 445",
  },
  {
    id: "fc-l2tp-port",
    category: "VPN & Tunneling",
    prompt: "What is the standard port number and transport protocol for L2TP (Layer 2 Tunneling Protocol)?",
    answer: "UDP 1701",
    aliases: ["udp 1701", "port 1701 udp", "udp port 1701", "1701 udp", "1701/udp"],
    keywords: ["udp", "1701"],
    options: ["UDP 1701", "TCP 1701", "TCP 389", "TCP 3389"],
    explanation: "L2TP creates VPN tunnels over UDP port 1701.",
    meta: "L2TP",
  },
  {
    id: "fc-ldap-port",
    category: "Directory Services",
    prompt: "What is the standard port number for LDAP (Lightweight Directory Access Protocol)?",
    answer: "389",
    aliases: ["389", "tcp 389", "port 389", "tcp port 389"],
    keywords: ["389"],
    options: ["389", "1701", "3389", "143"],
    explanation: "LDAP accesses and maintains directory information services over TCP port 389.",
    meta: "TCP 389",
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
    {
      id: "flashcards",
      label: "[03_FLASHCARDS]",
      content: (
        <FlashcardQuiz
          heading="[PORT_&_PROTOCOL_FLASHCARDS]"
          description="Drill all Layer 4 port numbers, protocol names, transport types, and port ranges with interactive active-recall flashcards."
          cards={portFlashcards}
          defaultMode="both"
          hybridChoiceCount={3}
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
