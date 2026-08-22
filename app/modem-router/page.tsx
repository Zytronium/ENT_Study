"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import QuestionQuiz, { QuestionQuizItem } from "@/components/study-quiz/QuestionQuiz";

const quizQuestions: QuestionQuizItem[] = [
  {
    id: 1,
    category: "Core Concept",
    prompt: "Which device provides the PHYSICAL connection to the Internet Service Provider (ISP)?",
    options: ["Modem", "Router"],
    answer: "Modem",
    explanation: "Modems provide the physical connection to the ISP by translating analog and digital signals.",
    canTypeInHardMode: true,
    aliases: ["modem", "modems", "modulator demodulator"],
    keywords: ["modem"],
  },
  {
    id: 2,
    category: "Core Concept",
    prompt: "Which device provides the LOGICAL connection to the ISP and connects all local network devices together?",
    options: ["Modem", "Router"],
    answer: "Router",
    explanation: "Routers handle logical connections, IP routing, and connect multiple local devices to the internet.",
    canTypeInHardMode: true,
    aliases: ["router", "routers"],
    keywords: ["router"],
  },
  {
    id: 3,
    category: "Signal Conversion",
    prompt: "What signal conversion does a modem perform on incoming analog signals from the ISP?",
    options: [
      "Modulates incoming digital signals into analog signals",
      "Demodulates incoming analog signals into digital signals",
    ],
    answer: "Demodulates incoming analog signals into digital signals",
    explanation: "Modems DE-modulate incoming analog signals to digital signals, and modulate outgoing digital signals to analog.",
    canTypeInHardMode: false,
  },
  {
    id: 4,
    category: "Signal Conversion",
    prompt: "What signal conversion does a modem perform on outgoing digital signals sent to the ISP?",
    options: [
      "Modulates outgoing digital signals into analog signals",
      "Demodulates outgoing analog signals into digital signals",
    ],
    answer: "Modulates outgoing digital signals into analog signals",
    explanation: "Modulator/Demodulator (Modem): Modulates outgoing digital data into analog transmission.",
    canTypeInHardMode: false,
  },
  {
    id: 5,
    category: "Modem Types",
    prompt: "What physical cable type does a Cable Modem use to connect to the ISP?",
    options: ["Coaxial cables", "Phone lines", "Cat6 twisted pair", "Fiber optic"],
    answer: "Coaxial cables",
    explanation: "Cable modems use coaxial cables (remember: Cable modems use cables).",
    canTypeInHardMode: true,
    aliases: ["coaxial", "coax", "coaxial cable", "coaxial cables", "rg6", "coax cable"],
    keywords: ["coax"],
  },
  {
    id: 6,
    category: "Modem Types",
    prompt: "What physical transmission line does a DSL Modem use?",
    options: ["Phone lines", "Coaxial cables", "Unshielded twisted pair only", "Radio waves"],
    answer: "Phone lines",
    explanation: "DSL modems use phone lines (remember: Digital Subscriber Line uses phone lines).",
    canTypeInHardMode: true,
    aliases: ["phone lines", "phone line", "telephone", "telephone lines", "rj11", "copper phone lines"],
    keywords: ["phone"],
  },
];

function ModemRouterQuizContent() {
  const searchParams = useSearchParams();
  const isMastery = searchParams.get("mastery") === "true";

  return (
    <QuestionQuiz
      moduleTag="DIAGNOSTIC_MODULE"
      moduleCode="PERIPHERAL_HARDWARE"
      title="Modem vs Router"
      heading="[MODEM_ROUTER_ARCHITECTURE_CHALLENGE]"
      description="Select or type the correct answer for modem and router hardware operations, modulation, and physical media."
      studyGuideHref="/study-guide#modem-vs-router"
      questions={quizQuestions}
      initialHardMode={isMastery}
    />
  );
}

export default function ModemRouterQuiz() {
  return (
    <Suspense fallback={null}>
      <ModemRouterQuizContent />
    </Suspense>
  );
}
