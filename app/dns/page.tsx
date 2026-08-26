"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TabbedQuiz, { QuizTab } from "@/components/study-quiz/TabbedQuiz";
import FlashcardQuiz, { FlashcardItem } from "@/components/study-quiz/FlashcardQuiz";
import QuestionQuiz, { QuestionQuizItem } from "@/components/study-quiz/QuestionQuiz";

const recordOptions = ["A", "AAAA", "CNAME", "PTR", "MX", "SOA"];

const questions: QuestionQuizItem[] = [
  {
    id: "dns-name",
    category: "DNS Fundamentals",
    prompt: "What does DNS stand for?",
    options: ["Domain Name System", "Dynamic Network Service", "Domain Number Standard", "Digital Name Server"],
    answer: "Domain Name System",
    explanation: "DNS stands for Domain Name System.",
  },
  {
    id: "dns-port",
    category: "DNS Fundamentals",
    prompt: "Which port is associated with DNS?",
    options: ["53", "22", "69", "443"],
    answer: "53",
    explanation: "DNS uses TCP and UDP port 53.",
  },
  {
    id: "dns-a-record",
    category: "DNS Records",
    prompt: "Which DNS record resolves a name to an IPv4 address?",
    options: ["A", "AAAA", "PTR", "MX"],
    answer: "A",
    explanation: "An A record resolves a DNS name to an IPv4 address.",
  },
  {
    id: "dns-aaaa-record",
    category: "DNS Records",
    prompt: "Which record maps a DNS name to an IPv6 address?",
    options: ["AAAA", "A", "CNAME", "SOA"],
    answer: "AAAA",
    explanation: "An AAAA record resolves a DNS name to an IPv6 address.",
  },
  {
    id: "dns-reverse-record",
    category: "DNS Records",
    prompt: "Which DNS record performs reverse resolution from an IP address to a DNS name?",
    options: ["PTR", "CNAME", "MX", "A"],
    answer: "PTR",
    explanation: "PTR means Pointer and resolves an IP address to a DNS name.",
  },
  {
    id: "dns-record-roles",
    category: "DNS Records",
    prompt: "Which record contains authoritative information about a DNS zone?",
    options: ["SOA", "MX", "CNAME", "AAAA"],
    answer: "SOA",
    explanation: "SOA means Start of Authority and contains authoritative information about a DNS zone.",
  },
];

const flashcards: FlashcardItem[] = [
  {
    id: "fc-dns-a",
    category: "DNS Record",
    prompt: "Which DNS record resolves a name to an IPv4 address?",
    answer: "A",
    options: recordOptions,
    explanation: "A records resolve DNS names to IPv4 addresses.",
  },
  {
    id: "fc-dns-aaaa",
    category: "DNS Record",
    prompt: "Which DNS record resolves a name to an IPv6 address?",
    answer: "AAAA",
    options: recordOptions,
    explanation: "AAAA records resolve DNS names to IPv6 addresses.",
  },
  {
    id: "fc-dns-cname",
    category: "DNS Record",
    prompt: "Which record resolves a canonical or common name to a domain name?",
    answer: "CNAME",
    options: recordOptions,
    explanation: "CNAME records resolve a canonical name to a domain name.",
  },
  {
    id: "fc-dns-ptr",
    category: "DNS Record",
    prompt: "Which DNS record reverses the usual direction by resolving an IP address to a DNS name?",
    answer: "PTR",
    options: recordOptions,
    explanation: "PTR is a pointer record used for reverse resolution.",
  },
  {
    id: "fc-dns-mx",
    category: "DNS Record",
    prompt: "Which DNS record provides a mail server IP address?",
    answer: "MX",
    options: recordOptions,
    explanation: "MX records provide a mail server IP address.",
  },
  {
    id: "fc-dns-soa",
    category: "DNS Record",
    prompt: "Which DNS record contains authoritative information about a zone?",
    answer: "SOA",
    options: recordOptions,
    explanation: "SOA means Start of Authority and contains authoritative zone information.",
  },
  {
    id: "fc-dns-aaaaaaaa",
    category: "Bonus Record",
    prompt: "What are AAAAAAAA records for?",
    answer: "Allowing the DNS server to scream in pain",
    options: [
      "Allowing the DNS server to scream in pain",
      "Resolving DNS names to IPv8 addresses",
      "Sending mail through an MX server",
      "Starting authority for a DNS zone",
    ],
    explanation: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA (this record does not exist) AAAAAAAAAAAAAAAAAAAA",
    bonus: true,
  },
];

function DnsQuizContent() {
  const searchParams = useSearchParams();
  const isMastery = searchParams.get("mastery") === "true";

  const tabs: QuizTab[] = [
    {
      id: "questions",
      label: "[01_CONCEPT_ASSESSMENT]",
      content: (
        <QuestionQuiz
          heading="[DNS_CHALLENGE]"
          description="Identify DNS terminology, port usage, and common DNS record purposes."
          studyGuideHref="/study-guide#dns"
          questions={questions}
          initialHardMode={isMastery}
          hideHeader={true}
        />
      ),
    },
    {
      id: "flashcards",
      label: "[02_FLASHCARDS]",
      content: (
        <FlashcardQuiz
          heading="[DNS_RECORD_FLASHCARDS]"
          description="Match each DNS record definition to its record type. The AAAAAAAA card is a bonus question."
          cards={flashcards}
          defaultMode="multiple-choice"
          allowModeSwitch={false}
          initialHardMode={isMastery}
          hideHeader={true}
        />
      ),
    },
  ];

  return (
    <TabbedQuiz
      moduleTag="DIAGNOSTIC_MODULE"
      moduleCode="DNS"
      title="Domain Name System (DNS)"
      studyGuideHref="/study-guide#dns"
      tabs={tabs}
    />
  );
}

export default function DnsQuiz() {
  return (
    <Suspense fallback={null}>
      <DnsQuizContent />
    </Suspense>
  );
}
