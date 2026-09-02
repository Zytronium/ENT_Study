"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import MultiSectionQuiz, { MultiSectionConfig } from "@/components/study-quiz/MultiSectionQuiz";
import { QuestionQuizItem } from "@/components/study-quiz/QuestionQuiz";

const INITIAL_TERM_CHALLENGES: QuestionQuizItem[] = [
  {
    id: "term-llc",
    prompt: "Upper sublayer of Layer 2 that binds logical addresses to physical cards.",
    hint: "Logical Link Control",
    answer: "LLC (Logical Link Control)",
    options: [
      "LLC (Logical Link Control)",
      "MAC (Media Access Control)",
      "ARP (Address Resolution Protocol)",
      "Physical Layer",
    ],
    aliases: ["llc", "logical link control", "logical link control (llc)"],
    keywords: ["llc"],
    explanation: "LLC stands for Logical Link Control. It is the upper sublayer of Layer 2 and binds logical addresses to physical cards.",
    canTypeInHardMode: true,
  },
  {
    id: "term-mac-sublayer",
    prompt: "Lower sublayer of Layer 2 that sits between LLC and the physical layer, handling medium access and Layer 2 addressing.",
    hint: "Media Access Control",
    answer: "MAC (Media Access Control)",
    options: [
      "MAC (Media Access Control)",
      "LLC (Logical Link Control)",
      "Physical Layer",
      "Network Layer",
    ],
    aliases: ["mac", "media access control", "media access control (mac)"],
    keywords: ["mac"],
    explanation: "MAC stands for Media Access Control. It is the lower sublayer of Layer 2 and manages medium access and Layer 2 addressing.",
    canTypeInHardMode: true,
  },
  {
    id: "term-arp",
    prompt: "Protocol used with IPv4 to determine/resolve the MAC address corresponding to a known local IP address.",
    hint: "Address Resolution Protocol",
    answer: "ARP (Address Resolution Protocol)",
    options: [
      "ARP (Address Resolution Protocol)",
      "LLC (Logical Link Control)",
      "MAC (Media Access Control)",
      "DNS",
    ],
    aliases: ["arp", "address resolution protocol", "address resolution protocol (arp)"],
    keywords: ["arp"],
    explanation: "ARP (Address Resolution Protocol) is what resolves the MAC address from an IPv4 address on the local network.",
    canTypeInHardMode: true,
  },
  {
    id: "term-mac-size-bits",
    prompt: "Total length/size of a traditional Layer 2 MAC address in bits.",
    hint: "Total bits (or 6 bytes)",
    answer: "48 bits",
    options: ["48 bits", "32 bits", "64 bits", "128 bits"],
    aliases: ["48", "48 bits", "48 bit", "48b"],
    keywords: ["48"],
    explanation: "A traditional MAC address is 48 bits (equal to 6 bytes).",
    canTypeInHardMode: true,
  },
  {
    id: "term-mac-size-bytes",
    prompt: "Total length/size of a traditional Layer 2 MAC address in bytes.",
    hint: "Total bytes (or 48 bits)",
    answer: "6 bytes",
    options: ["6 bytes", "4 bytes", "8 bytes", "16 bytes"],
    aliases: ["6", "6 bytes", "6 byte", "6b"],
    keywords: ["6"],
    explanation: "A traditional MAC address is 6 bytes (48 bits).",
    canTypeInHardMode: true,
  },
  {
    id: "term-oui-name",
    prompt: "Name of the first half (first 3 hex pairs / 24 bits) of a MAC address assigned to manufacturers.",
    hint: "OUI",
    answer: "OUI (Organizationally Unique Identifier)",
    options: [
      "OUI (Organizationally Unique Identifier)",
      "LLC (Logical Link Control)",
      "NIC (Network Interface Card)",
      "GUID (Globally Unique Identifier)",
    ],
    aliases: [
      "oui",
      "organizationally unique identifier",
      "organizationally unique identifier (oui)",
    ],
    keywords: ["oui"],
    explanation: "The first half of a MAC address is the OUI (Organizationally Unique Identifier).",
    canTypeInHardMode: true,
  },
  {
    id: "term-oui-assigner",
    prompt: "Organization/governing body that assigns the OUI to hardware manufacturers.",
    hint: "Standards organization",
    answer: "IEEE",
    options: ["IEEE", "IETF", "ISO", "FCC"],
    aliases: ["ieee", "institute of electrical and electronics engineers"],
    keywords: ["ieee"],
    explanation: "The IEEE assigns the OUI to hardware manufacturers to identify vendor origin.",
    canTypeInHardMode: true,
  },
  {
    id: "term-mac-target",
    prompt: "What does a MAC address specifically identify on a local network?",
    hint: "Hardware component, not location",
    answer: "Network Interface",
    options: [
      "Network Interface",
      "Physical Location of the device",
      "Geographic IP Subnet",
      "Internet Service Provider",
    ],
    aliases: ["network interface", "a network interface", "interface", "nic interface"],
    keywords: ["interface"],
    explanation: "A MAC address identifies a network interface, not the physical location of the device.",
    canTypeInHardMode: true,
  },
];

const INITIAL_SCENARIOS: QuestionQuizItem[] = [
  {
    id: "scen-resolve-mac",
    prompt: "A computer needs to transmit a packet to another device on the local network. It knows the destination IPv4 address but not the destination MAC address. Which protocol resolves the MAC address?",
    options: [
      "ARP (Address Resolution Protocol)",
      "LLC (Logical Link Control)",
      "MAC Sublayer",
      "Physical Layer Carrier Sense",
    ],
    answer: "ARP (Address Resolution Protocol)",
    explanation: "ARP is used with IPv4 to determine the MAC address corresponding to an IP address on the local network (not LLC).",
    canTypeInHardMode: true,
    aliases: ["arp", "address resolution protocol", "address resolution protocol (arp)"],
    keywords: ["arp"],
  },
  {
    id: "scen-oui-segment",
    prompt: "Given the sample MAC address 03:E5:B1:F4:B2:A4, which portion represents the Organizationally Unique Identifier (OUI) assigned to the manufacturer?",
    options: [
      "03:E5:B1",
      "F4:B2:A4",
      "03:E5:B1:F4",
      "B1:F4:B2:A4",
    ],
    answer: "03:E5:B1",
    explanation: "The first half of the 6 hexadecimal pairs (03:E5:B1) is the OUI, which identifies the manufacturer or vendor.",
    canTypeInHardMode: true,
    aliases: ["03:e5:b1", "03e5b1", "03-e5-b1", "first half", "first 3 pairs", "first 3 hex pairs"],
    keywords: ["03:e5:b1"],
  },
  {
    id: "scen-device-identifier",
    prompt: "Given the sample MAC address 03:E5:B1:F4:B2:A4, what does the second half (F4:B2:A4) represent?",
    options: [
      "The manufacturer-assigned unique sequence unique to the OUI",
      "The vendor ID code registered with the IEEE",
      "The IP network subnet mask converted to hexadecimal",
      "The room number and physical building coordinates of the hardware",
    ],
    answer: "The manufacturer-assigned unique sequence unique to the OUI",
    explanation: "The second half is a unique sequence produced by the vendor that should not be duplicated across other MAC addresses sharing the same OUI.",
    canTypeInHardMode: false,
  },
  {
    id: "scen-sublayer-interface",
    prompt: "In IEEE 802 architecture, which sublayer connects the Physical Layer to the upper logical controls and handles accessing the transmission medium?",
    options: [
      "MAC (Media Access Control)",
      "LLC (Logical Link Control)",
      "Network Layer",
      "Session Layer",
    ],
    answer: "MAC (Media Access Control)",
    explanation: "The MAC sublayer is the lower sublayer of Layer 2; it interfaces with the Physical Layer and handles access to the transmission medium.",
    canTypeInHardMode: true,
    aliases: ["mac", "media access control", "media access control (mac)", "mac sublayer"],
    keywords: ["mac"],
  },
  {
    id: "scen-mac-format",
    prompt: "How is a traditional 48-bit MAC address typically written and formatted?",
    options: [
      "Six hexadecimal pairs separated by colons",
      "Four decimal octets separated by dots",
      "Eight 16-bit hexadecimal blocks separated by semicolons",
      "Twelve decimal integers separated by dashes",
    ],
    answer: "Six hexadecimal pairs separated by colons",
    explanation: "A traditional MAC address is 48 bits (6 bytes) written as six hexadecimal pairs separated by colons or hyphens.",
    canTypeInHardMode: false,
  },
  {
    id: "scen-logical-binding",
    prompt: "Which sublayer of the Data-Link Layer is responsible for binding logical addresses to physical cards?",
    options: [
      "LLC (Logical Link Control)",
      "MAC (Media Access Control)",
      "Physical Layer",
      "Transport Layer",
    ],
    answer: "LLC (Logical Link Control)",
    explanation: "LLC (Logical Link Control) is the upper sublayer of the Data-Link Layer and binds logical addresses to physical cards.",
    canTypeInHardMode: true,
    aliases: ["llc", "logical link control", "logical link control (llc)", "llc sublayer"],
    keywords: ["llc"],
  },
];

const sections: MultiSectionConfig[] = [
  {
    id: "sec-terms",
    title: "SUBLAYERS_&_MAC_MECHANICS",
    subtitle: "[PART_01: SUBLAYERS_MAC_STRUCTURE_&_MECHANICS]",
    description: "Match Layer 2 sublayer architectures, MAC addressing lengths, and IEEE OUI mechanics.",
    type: "questions",
    questions: INITIAL_TERM_CHALLENGES,
  },
  {
    id: "sec-scenarios",
    title: "PRACTICAL_NETWORKING_SCENARIOS",
    subtitle: "[PART_02: PRACTICAL_NETWORKING_SCENARIOS]",
    description: "Apply your knowledge of ARP resolution, MAC byte splits, and Data-Link operational roles to realistic network scenarios.",
    type: "questions",
    questions: INITIAL_SCENARIOS,
  },
];

function DataLinkContent() {
  const searchParams = useSearchParams();
  const isMastery = searchParams.get("mastery") === "true";

  return (
    <MultiSectionQuiz
      moduleTag="DIAGNOSTIC_MODULE"
      moduleCode="LAYER_2_DATA_LINK"
      title="Data-Link Layer"
      studyGuideHref="/study-guide#the-data-link-layer"
      sections={sections}
      initialHardMode={isMastery}
    />
  );
}

export default function DataLinkQuiz() {
  return (
    <Suspense fallback={null}>
      <DataLinkContent />
    </Suspense>
  );
}
