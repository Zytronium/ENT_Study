"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import QuestionQuiz, { QuestionQuizItem } from "@/components/study-quiz/QuestionQuiz";

const questions: QuestionQuizItem[] = [
  {
    id: "static-definition",
    category: "Static Assignment",
    prompt: "Which statement best describes a static IP address assignment?",
    options: [
      "It is manually assigned and normally does not change",
      "It is automatically assigned when a DHCP server cannot be reached",
      "It is leased by DHCP for a default period of 8 days",
      "It is assigned only to ordinary PCs",
    ],
    answer: "It is manually assigned and normally does not change",
    explanation: "A static IP address is manually assigned to a device and does not normally change.",
  },
  {
    id: "static-devices",
    category: "Static Assignment",
    prompt: "Which group contains devices that are common candidates for static IP addresses?",
    options: [
      "Servers, printers, and routers",
      "PCs, servers, and printers",
      "PCs, routers, and DHCP clients",
      "DNS servers, PCs, and printers",
    ],
    answer: "Servers, printers, and routers",
    explanation: "Servers, printers, and routers are common candidates for static IP addresses, but PCs are not.",
  },
  {
    id: "apipa-purpose",
    category: "Automatic Assignment",
    prompt: "When is APIPA used?",
    options: [
      "When a DHCP server cannot be reached",
      "When a router manually assigns a permanent address",
      "When a DNS server provides the client's address",
      "When a client requests a second DHCP lease",
    ],
    answer: "When a DHCP server cannot be reached",
    explanation: "APIPA automatically assigns an address when a DHCP server cannot be reached, with no router or internet access.",
  },
  {
    id: "dhcp-settings",
    category: "DHCP",
    prompt: "What does DHCP automatically provide to clients?",
    options: [
      "An IP address, subnet mask, and other network configuration settings",
      "Only a DNS server name",
      "A manually assigned address that never changes",
      "Only a default gateway without an IP address",
    ],
    answer: "An IP address, subnet mask, and other network configuration settings",
    explanation: "DHCP automatically provides clients with an IP address and subnet mask along with other network configuration settings.",
  },
  {
    id: "dhcp-common-settings",
    category: "DHCP",
    prompt: "Which pair is identified as common network settings provided by DHCP?",
    options: [
      "Default gateway and DNS server IPs",
      "MAC address and printer name",
      "FTP port and SSH port",
      "Subnet name and browser version",
    ],
    answer: "Default gateway and DNS server IPs",
    explanation: "The default gateway and DNS server IPs are common settings provided by DHCP.",
  },
  {
    id: "ipconfig-command",
    category: "Viewing Configuration",
    prompt: "Which Windows command displays all IP configuration information, including DHCP details?",
    options: ["ipconfig /all", "ipconfig", "netconfig", "netconfig /all"],
    answer: "ipconfig /all",
    explanation: "On Windows, `ipconfig /all` displays the device's IPv4 address, subnet mask, gateway, DNS servers, and DHCP information.",
  },
  {
    id: "dora-sequence",
    category: "DORA",
    prompt: "What is the correct order of the four DHCP address-assignment steps?",
    options: [
      "Discover, Offer, Request, Acknowledge",
      "Discover, Request, Offer, Acknowledge",
      "Offer, Discover, Acknowledge, Request",
      "Request, Offer, Discover, Acknowledge",
    ],
    answer: "Discover, Offer, Request, Acknowledge",
    explanation: "DORA stands for Discover, Offer, Request, and Acknowledge.",
  },
  {
    id: "dora-lease",
    category: "DORA",
    prompt: "During DORA, what happens in the Acknowledge step?",
    options: [
      "The server acknowledges the request and leases the IP address; by default, it lasts 8 days",
      "The client broadcasts to ask whether a DHCP server is available",
      "The server offers an IP address before the client requests it",
      "The client requests an address from the DHCP server",
    ],
    answer: "The server acknowledges the request and leases the IP address; by default, it lasts 8 days",
    explanation: "In the Acknowledge step, the server confirms the request and leases the address for a default period of 8 days.",
  },
];

function IpAddressAssignmentQuizContent() {
  const searchParams = useSearchParams();
  const isMastery = searchParams.get("mastery") === "true";

  return (
    <QuestionQuiz
      moduleTag="DIAGNOSTIC_MODULE"
      moduleCode="IP_ADDRESS_ASSIGNMENT"
      title="IP Address Assignment"
      heading="[IP_ADDRESS_ASSIGNMENT_CHALLENGE]"
      description="Test your knowledge of static and automatic IP address assignment, DHCP, and DORA."
      studyGuideHref="/study-guide#ip-address-assignment"
      questions={questions}
      initialHardMode={isMastery}
    />
  );
}

export default function IpAddressAssignmentQuiz() {
  return (
    <Suspense fallback={null}>
      <IpAddressAssignmentQuizContent />
    </Suspense>
  );
}
