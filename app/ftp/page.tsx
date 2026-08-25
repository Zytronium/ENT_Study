"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TabbedQuiz, { QuizTab } from "@/components/study-quiz/TabbedQuiz";
import FlashcardQuiz, { FlashcardItem } from "@/components/study-quiz/FlashcardQuiz";
import QuestionQuiz, { QuestionQuizItem } from "@/components/study-quiz/QuestionQuiz";

const protocolOptions = ["FTP", "SFTP", "TFTP", "SCP"];

const questions: QuestionQuizItem[] = [
  {
    id: "ftp-security",
    category: "FTP Characteristics",
    prompt: "Which statement accurately describes standard FTP?",
    options: [
      "It is unsecured, uses usernames and passwords, and operates over TCP",
      "It is secured, uses anonymous access, and operates over UDP",
      "It is secured, uses usernames and passwords, and shares TCP port 22 with SSH",
      "It is unsecured, uses anonymous access, and operates over UDP port 69",
    ],
    answer: "It is unsecured, uses usernames and passwords, and operates over TCP",
    explanation: "The study guide identifies FTP as unsecured, credential-based, and TCP-based.",
  },
  {
    id: "tftp-characteristics",
    category: "TFTP Characteristics",
    prompt: "Which combination describes TFTP?",
    options: [
      "TCP, usernames and passwords, ports 20 and 21",
      "TCP, usernames and passwords, port 22",
      "UDP, anonymous access, port 69",
      "UDP, usernames and passwords, port 21",
    ],
    answer: "UDP, anonymous access, port 69",
    explanation: "TFTP uses UDP, is anonymous, and operates on port 69.",
  },
  {
    id: "protocol-transport",
    category: "Protocol Comparison",
    prompt: "Which protocol is secured, uses TCP, and uses usernames and passwords?",
    options: ["FTP", "SFTP", "TFTP"],
    answer: "SFTP",
    explanation: "SFTP is the secured username & password file-transfer protocol that uses TCP.",
    canTypeInHardMode: true,
    aliases: ["secure ftp", "secure file transfer protocol", "sftp", "secure file transfer"],
    keywords: ["sftp"],
  },
];

const flashcards: FlashcardItem[] = [
  {
    id: "fc-ftp-definition",
    category: "FTP",
    prompt: "Which protocol is an unsecured, credential-based file-transfer protocol that uses TCP?",
    answer: "FTP",
    options: protocolOptions,
    explanation: "FTP uses usernames and passwords over TCP but is unsecured.",
  },
  {
    id: "fc-sftp-definition",
    category: "SFTP",
    prompt: "Which secured file-transfer protocol uses TCP, usernames and passwords, and shares port 22 with SSH?",
    answer: "SFTP",
    options: protocolOptions,
    explanation: "SFTP is secured, uses TCP and credentials, and shares TCP port 22 with SSH.",
  },
  {
    id: "fc-tftp-definition",
    category: "TFTP",
    prompt: "Which anonymous file-transfer protocol uses UDP and operates on port 69?",
    answer: "TFTP",
    options: protocolOptions,
    explanation: "TFTP uses UDP, is anonymous, and operates on UDP port 69.",
  },
  {
    id: "fc-scp-definition",
    category: "Bonus Protocol",
    prompt: "Which acronym has nothing to do with file transfer and everything to do with containing things that probably shouldn't exist?",
    answer: "SCP",
    options: protocolOptions,
    explanation: "SCP is the fictional foundation, Secure, Contain, Protect.",
    bonus: true,
  },
];

function FtpQuizContent() {
  const searchParams = useSearchParams();
  const isMastery = searchParams.get("mastery") === "true";

  const tabs: QuizTab[] = [
    {
      id: "questions",
      label: "[01_CONCEPT_ASSESSMENT]",
      content: (
        <QuestionQuiz
          heading="[FILE_TRANSFER_PROTOCOLS_CHALLENGE]"
          description="Identify the transport, security, authentication, and port characteristics of each protocol."
          studyGuideHref="/study-guide#ftp-sftp--tftp"
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
          heading="[FILE_TRANSFER_PROTOCOL_FLASHCARDS]"
          description="Match each file-transfer definition to its protocol. The SCP card is a bonus question."
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
      moduleCode="FILE_TRANSFER_PROTOCOLS"
      title="FTP, SFTP, & TFTP"
      studyGuideHref="/study-guide#ftp-sftp--tftp"
      tabs={tabs}
    />
  );
}

export default function FtpQuiz() {
  return (
    <Suspense fallback={null}>
      <FtpQuizContent />
    </Suspense>
  );
}
