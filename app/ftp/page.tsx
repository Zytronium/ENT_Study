"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import QuestionQuiz, { QuestionQuizItem } from "@/components/study-quiz/QuestionQuiz";

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

function FtpQuizContent() {
  const searchParams = useSearchParams();
  const isMastery = searchParams.get("mastery") === "true";

  return (
    <QuestionQuiz
      moduleTag="DIAGNOSTIC_MODULE"
      moduleCode="FILE_TRANSFER_PROTOCOLS"
      title="FTP, SFTP, & TFTP"
      heading="[FILE_TRANSFER_PROTOCOLS_CHALLENGE]"
      description="Identify the transport, security, authentication, and port characteristics of each protocol."
      studyGuideHref="/study-guide#ftp-sftp--tftp"
      questions={questions}
      initialHardMode={isMastery}
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
