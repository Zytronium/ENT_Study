"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import MultiSectionQuiz, { MultiSectionConfig } from "@/components/study-quiz/MultiSectionQuiz";
import { QuestionQuizItem } from "@/components/study-quiz/QuestionQuiz";

function isValidIPv4(ip: string): boolean {
  const parts = ip.split(".");
  if (parts.length !== 4) return false;
  return parts.every((p) => {
    if (!/^\d+$/.test(p)) return false;
    const num = Number(p);
    return num >= 0 && num <= 255 && (p === "0" || !p.startsWith("0"));
  });
}

function isPublicIPv4(ip: string): boolean {
  if (!isValidIPv4(ip)) return false;
  const [o1, o2] = ip.split(".").map(Number);
  if (o1 === 0 || o1 === 10 || o1 === 127) return false;
  if (o1 === 172 && o2 >= 16 && o2 <= 31) return false;
  if (o1 === 192 && o2 === 168) return false;
  if (o1 === 169 && o2 === 254) return false;
  if (o1 >= 224) return false;
  return true;
}

function generateRandom192(): string {
  const o3 = Math.floor(Math.random() * 256);
  const o4 = Math.floor(Math.random() * 254) + 1;
  return `192.168.${o3}.${o4}`;
}

function generateRandomPublicIPv4(exclude: string[]): string {
  const validFirstOctets = [
    24, 38, 44, 50, 63, 64, 72, 81, 93, 104, 115, 128, 136, 142, 151, 162, 173, 185, 198, 203, 209, 216,
  ];
  for (let attempts = 0; attempts < 100; attempts++) {
    const o1 = validFirstOctets[Math.floor(Math.random() * validFirstOctets.length)];
    const o2 = Math.floor(Math.random() * 254) + 1;
    const o3 = Math.floor(Math.random() * 254) + 1;
    const o4 = Math.floor(Math.random() * 254) + 1;
    const candidate = `${o1}.${o2}.${o3}.${o4}`;
    if (isPublicIPv4(candidate) && !exclude.includes(candidate)) {
      return candidate;
    }
  }
  return "203.0.113.45";
}

function createPublicIpQuestion(userIp: string): QuestionQuizItem {
  const random192 = generateRandom192();
  const pub1 = generateRandomPublicIPv4([userIp]);
  const pub2 = generateRandomPublicIPv4([userIp, pub1]);
  const options = [userIp, random192, pub1, pub2];

  return {
    id: "q-user-public-ip",
    category: "Public vs Private & NAT",
    prompt: "Find out what your current public IPv4 address is (as seen by internet servers). Which of the following is your active public IPv4 address?",
    answer: userIp,
    options,
    aliases: [userIp],
    explanation: `Your current public IPv4 address is ${userIp}. Internal network devices with private addresses (such as ${random192}) share this single globally unique public IP via NAT when communicating over the internet.`,
    canTypeInHardMode: true,
  };
}

function createWindowsPublicIpQuestion(): QuestionQuizItem {
  return {
    id: "q-user-public-ip",
    category: "Public vs Private & NAT",
    prompt: "How would a user find out their current public IPv4 address on a Windows computer?",
    answer: "Visit an IP lookup website or run 'ipconfig' in Command Prompt",
    options: [
      "Visit an IP lookup website or run ipconfig in Command Prompt",
      "You can't, you can only see your private IP address",
      "Check the local loopback adapter configuration at 127.0.0.1",
      "Inspect the physical MAC address in the network adapter properties",
    ],
    aliases: [
      "visit an ip lookup website or run ipconfig in command prompt",
      "run ipconfig in command prompt or visit an ip lookup website",
      "what is my ip",
      "search what is my ip",
      "ipconfig",
      "ipconfig in command prompt",
    ],
    explanation: "Running 'ipconfig' in Command Prompt displays your local private IP address. To find the public IP address assigned by your ISP, search 'what is my IP' in a web browser or use an online IP lookup service.",
    canTypeInHardMode: false,
  };
}

const ipv4ArchitectureQuestions: QuestionQuizItem[] = [
  {
    id: "q-ipv4-bit-length",
    category: "IPv4 Architecture",
    prompt: "What is the total bit length of an IPv4 address?",
    answer: "32 bits",
    options: ["32 bits", "128 bits", "48 bits", "64 bits"],
    aliases: ["32", "32 bits", "32 bit", "32-bit", "32bits", "32b"],
    keywords: ["32"],
    explanation: "IPv4 addresses are 32-bit dotted decimal addresses composed of 4 octets (8 bits each).",
    canTypeInHardMode: true,
  },
  {
    id: "q-ipv4-components",
    category: "IPv4 Architecture",
    prompt: "An IPv4 address is structurally divided into which two primary parts?",
    answer: "Network and Host IP",
    options: [
      "Network and Host IP",
      "Prefix and Interface ID",
      "OUI and Vendor Assigned ID",
      "Transport Port and Socket",
    ],
    aliases: [
      "network and host",
      "network & host",
      "network and host ip",
      "network & host ip",
      "network host",
    ],
    keywords: ["network", "host"],
    explanation: "An IPv4 address consists of two structural components: the Network part and the Host IP part.",
    canTypeInHardMode: true,
  },
  {
    id: "q-ipv4-octet-range",
    category: "IPv4 Architecture",
    prompt: "What is the valid decimal numerical range for each 8-bit octet in an IPv4 address?",
    answer: "0 to 255",
    options: ["0 to 255", "1 to 254", "0 to 127", "0 to 256"],
    aliases: [
      "0 to 255",
      "0-255",
      "0 - 255",
      "0..255",
      "0 through 255",
      "0 to 255 range",
    ],
    keywords: ["255"],
    explanation: "Each of the 4 octets is 8 bits in size, allowing a decimal value range from 0 to 255.",
    canTypeInHardMode: true,
  },
  {
    id: "q-ipv4-total-space",
    category: "IPv4 Architecture",
    prompt: "Approximately how many unique address combinations exist in the complete 32-bit IPv4 address space?",
    answer: "Over 4 billion",
    options: ["Over 4 billion", "Over 16 million", "Over 65 thousand", "Over 340 undecillion"],
    aliases: [
      "4 billion",
      "over 4 billion",
      "4b",
      "4,000,000,000",
      "4000000000",
      "4.3 billion",
    ],
    keywords: ["billion"],
    explanation: "With 32 bits of addressing, IPv4 provides over 4 billion (2^32) unique possible addresses.",
    canTypeInHardMode: true,
  },
];

const publicPrivateQuestions: QuestionQuizItem[] = [
  {
    id: "q-public-private-split-reason",
    category: "Public vs Private & NAT",
    prompt: "What primary factor necessitated the division of IPv4 into public and private address allocations?",
    answer: "There are fewer possible IPv4 addresses than devices connected to the internet",
    options: [
      "There are fewer possible IPv4 addresses than devices connected to the internet",
      "Private addresses eliminate the operational need for local DHCP servers",
      "Public addresses cannot be routed across Layer 3 interfaces",
      "Local Ethernet switches cannot process standard 32-bit address formats",
    ],
    aliases: [],
    explanation: "Because there are fewer possible IPv4 addresses than devices on the internet, IPv4 addresses were split into public and private pools.",
    canTypeInHardMode: false,
  },
  {
    id: "q-public-ip-characteristics",
    category: "Public vs Private & NAT",
    prompt: "Which statement accurately describes public IPv4 addresses?",
    answer: "They are globally unique and allow communication over the internet",
    options: [
      "They are globally unique and allow communication over the internet",
      "They are assigned locally by internal client operating systems via APIPA",
      "They are restricted exclusively to small private home local area networks",
      "They cannot be translated by NAT-enabled border routing equipment",
    ],
    aliases: [],
    explanation: "Public IP addresses allow devices to communicate over the internet, are globally unique, and are typically assigned to routers by an ISP.",
    canTypeInHardMode: false,
  },
  {
    id: "q-nat-translation",
    category: "Public vs Private & NAT",
    prompt: "Which mechanism allows a router to translate internal private IP addresses to a public IP address for internet access?",
    answer: "NAT (Network Address Translation)",
    options: [
      "NAT (Network Address Translation)",
      "DHCP (Dynamic Host Configuration Protocol)",
      "DNS (Domain Name System)",
      "ARP (Address Resolution Protocol)",
    ],
    aliases: [
      "nat",
      "network address translation",
      "nat (network address translation)",
    ],
    keywords: ["nat"],
    explanation: "When an internal device accesses the internet, the router uses NAT (Network Address Translation) to translate private IPs into the network's public IP.",
    canTypeInHardMode: true,
  },
  {
    id: "q-private-dhcp",
    category: "Public vs Private & NAT",
    prompt: "Which network component is responsible for dynamically assigning private IP addresses to local client devices?",
    answer: "DHCP server",
    options: ["DHCP server", "DNS server", "ISP gateway router", "Default web proxy"],
    aliases: [
      "dhcp",
      "dhcp server",
      "dynamic host configuration protocol",
    ],
    keywords: ["dhcp"],
    explanation: "Private IP addresses are assigned to individual devices on a network by a DHCP server.",
    canTypeInHardMode: true,
  },
];

const specialAddressingQuestions: QuestionQuizItem[] = [
  {
    id: "q-loopback-address",
    category: "Special Addressing",
    prompt: "Which IPv4 address is specifically designated as the local host loopback address?",
    answer: "127.0.0.1",
    options: ["127.0.0.1", "169.254.0.1", "192.168.0.1", "10.0.0.1"],
    aliases: ["127.0.0.1", "127.0.0.1/8", "127.0.0.0", "loopback"],
    keywords: ["127.0.0.1"],
    explanation: "127.0.0.1 is designated as the IPv4 loopback address for internal host stack testing.",
    canTypeInHardMode: true,
  },
  {
    id: "q-apipa-address",
    category: "Special Addressing",
    prompt: "What does an assigned 169.254.X.X IP address indicate on a Windows host?",
    answer: "The DHCP server could not be reached and the device cannot access the internet",
    options: [
      "The DHCP server could not be reached and the device cannot access the internet",
      "The host successfully received a routable public IP address from the ISP",
      "The router configured a permanent static NAT translation mapping",
      "The local host completed a successful internal loopback diagnostic check",
    ],
    aliases: [],
    explanation: "169.254.X.X represents APIPA (Automatic Private IP Addressing). On Windows, this means the DHCP server could not be contacted and the device cannot reach the internet.",
    canTypeInHardMode: false,
  },
];

const ipv6ArchitectureQuestions: QuestionQuizItem[] = [
  {
    id: "q-ipv6-characteristics",
    category: "IPv6 Architecture",
    prompt: "What is the total bit length and numbering system used for IPv6 addresses?",
    answer: "128-bit hexadecimal address",
    options: [
      "128-bit hexadecimal address",
      "32-bit dotted decimal address",
      "48-bit hexadecimal address",
      "64-bit binary address",
    ],
    aliases: [
      "128-bit hexadecimal",
      "128-bit hex",
      "128 bit hexadecimal",
      "128 bits hexadecimal",
      "128 bit hex",
      "128",
      "128 bits",
    ],
    keywords: ["128"],
    explanation: "IPv6 uses a 128-bit hexadecimal address format (for example: 2001:0db8:85a3:0020:0000:8a2e:0370:7334).",
    canTypeInHardMode: true,
  },
  {
    id: "q-ipv6-parts",
    category: "IPv6 Architecture",
    prompt: "An IPv6 address is structurally divided into which two primary components?",
    answer: "Prefixes and Host IDs",
    options: [
      "Prefixes and Host IDs",
      "Network numbers and Subnet masks",
      "OUI segments and Vendor NICs",
      "Dotted octets and Socket numbers",
    ],
    aliases: [
      "prefixes and host ids",
      "prefixes & host ids",
      "prefixes and host id",
      "prefix and host id",
      "prefix and host ids",
      "prefixes and host",
    ],
    keywords: ["prefix", "host"],
    explanation: "An IPv6 address consists of 2 parts: Prefixes and Host IDs.",
    canTypeInHardMode: true,
  },
  {
    id: "q-ipv6-total-space",
    category: "IPv6 Architecture",
    prompt: "What is the total theoretical address capacity of the 128-bit IPv6 address pool?",
    answer: "Over 340 undecillion (2^128)",
    options: [
      "Over 340 undecillion (2^128)",
      "Over 4 billion (2^32)",
      "Over 16 million (2^24)",
      "Over 65 thousand (2^16)",
    ],
    aliases: [
      "340 undecillion",
      "340 undecilion",
      "over 340 undecillion",
      "over 340 undecilion",
      "340 undecillion (2^128)",
      "340 undecilion (2^128)",
      "over 340 undecillion (2^128)",
      "over 340 undecilion (2^128)",
      "2^128",
      "2¹²⁸",
      "undecillion",
    ],
    keywords: ["undecillion"],
    explanation: "IPv6 provides over 340 Undecillion (or 2^128) unique possible addresses.",
    canTypeInHardMode: true,
  },
];

function NetworkLayerIPContent() {
  const searchParams = useSearchParams();
  const isMastery = searchParams.get("mastery") === "true";
  const [userPublicIp, setUserPublicIp] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("https://api.ipify.org?format=json")
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error");
        return res.json();
      })
      .then((data) => {
        if (!cancelled && data && typeof data.ip === "string" && isPublicIPv4(data.ip)) {
          setUserPublicIp(data.ip);
        }
      })
      .catch(() => {
        // Fallback silently
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const dynamicPublicQuestion = userPublicIp && isPublicIPv4(userPublicIp)
    ? createPublicIpQuestion(userPublicIp)
    : createWindowsPublicIpQuestion();

  const sections: MultiSectionConfig[] = [
    {
      id: "sec-ipv4",
      title: "IPV4_ARCHITECTURE",
      subtitle: "[PART_01: IPV4_ARCHITECTURE]",
      description: "Validate your knowledge of 32-bit IPv4 structure, octet ranges, and address space.",
      type: "questions",
      questions: ipv4ArchitectureQuestions,
    },
    {
      id: "sec-public-private",
      title: "PUBLIC_VS_PRIVATE_&_NAT",
      subtitle: "[PART_02: PUBLIC_VS_PRIVATE_&_NAT]",
      description: "Review public vs private addressing rules, NAT translation, DHCP assignment, and public IP lookup.",
      type: "questions",
      questions: [dynamicPublicQuestion, ...publicPrivateQuestions],
    },
    {
      id: "sec-special",
      title: "SPECIAL_ADDRESSING",
      subtitle: "[PART_03: SPECIAL_ADDRESSING]",
      description: "Identify loopback addresses (127.0.0.1) and APIPA fallback addresses (169.254.X.X).",
      type: "questions",
      questions: specialAddressingQuestions,
    },
    {
      id: "sec-ipv6",
      title: "IPV6_ARCHITECTURE",
      subtitle: "[PART_04: IPV6_ARCHITECTURE]",
      description: "Validate 128-bit IPv6 structure, Network Prefix vs Interface ID, and 340 undecillion space.",
      type: "questions",
      questions: ipv6ArchitectureQuestions,
    },
  ];

  return (
    <MultiSectionQuiz
      moduleTag="DIAGNOSTIC_MODULE"
      moduleCode="LAYER_3_IP_ADDRESSING"
      title="Network Layer - IP Addresses"
      studyGuideHref="/study-guide#network-layer---ip-addresses"
      sections={sections}
      initialHardMode={isMastery}
    />
  );
}

export default function NetworkLayerIPQuiz() {
  return (
    <Suspense fallback={null}>
      <NetworkLayerIPContent />
    </Suspense>
  );
}
