"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import MultiSectionQuiz, { MultiSectionConfig } from "@/components/study-quiz/MultiSectionQuiz";
import { QuestionQuizItem } from "@/components/study-quiz/QuestionQuiz";

const MEDIUM_OPTIONS = ["Wired", "Wireless"];

const initialCharacteristicMatches: QuestionQuizItem[] = [
  {
    id: "char-reliable",
    category: "Reliability",
    prompt: "High reliability due to dedicated physical shielded or twisted copper path",
    options: MEDIUM_OPTIONS,
    answer: "Wired",
    explanation: "Wired connections provide high reliability with minimal external interference.",
    canTypeInHardMode: true,
    aliases: ["wired", "wire", "cable", "cabled", "copper", "fiber"],
    keywords: ["wired"],
  },
  {
    id: "char-mobile",
    category: "Mobility",
    prompt: "High physical mobility for client endpoints without cord constraints",
    options: MEDIUM_OPTIONS,
    answer: "Wireless",
    explanation: "Wireless allows untethered mobility across radio coverage zones.",
    canTypeInHardMode: true,
    aliases: ["wireless", "wi-fi", "wifi", "radio", "rf", "air"],
    keywords: ["wireless"],
  },
  {
    id: "char-secure",
    category: "Security",
    prompt: "Inherently more secure because physical access to the media or port is required to tap",
    options: MEDIUM_OPTIONS,
    answer: "Wired",
    explanation: "Wired mediums are confined to physical runs, making unauthorized interception harder.",
    canTypeInHardMode: true,
    aliases: ["wired", "wire", "cable", "cabled", "copper", "fiber"],
    keywords: ["wired"],
  },
  {
    id: "char-unreliable",
    category: "Reliability",
    prompt: "Unreliable transmission susceptible to RF attenuation, interference, and wall obstacles",
    options: MEDIUM_OPTIONS,
    answer: "Wireless",
    explanation: "Wireless is subject to environmental interference, walls, and distance degradation.",
    canTypeInHardMode: true,
    aliases: ["wireless", "wi-fi", "wifi", "radio", "rf", "air"],
    keywords: ["wireless"],
  },
  {
    id: "char-less-secure",
    category: "Security",
    prompt: "Less secure by default because radio waves broadcast openly through the air",
    options: MEDIUM_OPTIONS,
    answer: "Wireless",
    explanation: "Radio broadcasts can be intercepted by anyone within range without physical cable taps.",
    canTypeInHardMode: true,
    aliases: ["wireless", "wi-fi", "wifi", "radio", "rf", "air"],
    keywords: ["wireless"],
  },
  {
    id: "char-not-mobile",
    category: "Mobility",
    prompt: "Not mobile; devices must remain tethered to a wall jack or patch panel",
    options: MEDIUM_OPTIONS,
    answer: "Wired",
    explanation: "Wired devices are fixed to physical outlet and cable run locations.",
    canTypeInHardMode: true,
    aliases: ["wired", "wire", "cable", "cabled", "copper", "fiber"],
    keywords: ["wired"],
  },
];

const initialQuestions: QuestionQuizItem[] = [
  {
    id: "cont-wireless-method",
    category: "Contention Methods",
    prompt: "What is the contention method (traffic control) used in Wireless networks?",
    options: [
      "CSMA/CA",
      "CSMA/CD",
      "Token Passing Ring Protocol",
      "Vampire Tap Arbitration",
    ],
    answer: "CSMA/CA",
    explanation: "Wireless uses CSMA/CA (Collision Avoidance) because radios cannot easily detect collisions while transmitting.",
    canTypeInHardMode: true,
    aliases: ["csma/ca", "csma ca", "csmaca", "collision avoidance"],
    keywords: ["ca"],
  },
  {
    id: "cont-wired-method",
    category: "Contention Methods",
    prompt: "What is the contention method (traffic control) used in traditional Wired networks?",
    options: [
      "CSMA/CD",
      "CSMA/CA",
      "Full-Duplex Polling Only",
      "TKIP Collision Avoidance",
    ],
    answer: "CSMA/CD",
    explanation: "Wired Ethernet historically uses CSMA/CD (Collision Detection) to listen for voltage collisions on the wire.",
    canTypeInHardMode: true,
    aliases: ["csma/cd", "csma cd", "csmacd", "collision detection"],
    keywords: ["cd"],
  },
  {
    id: "cont-traits-compare",
    category: "Medium Characteristics",
    prompt: "Which set of characteristics correctly describes Wired vs Wireless?",
    options: [
      "Wired: Reliable, Secure, Not mobile | Wireless: Unreliable, Less secure, Mobile",
      "Wired: Unreliable, Secure, Mobile | Wireless: Reliable, Insecure, Not mobile",
      "Wired: Unreliable, Less secure, Mobile | Wireless: Reliable, Secure, Not mobile",
      "Wired and Wireless share identical reliability, security, and mobility",
    ],
    answer: "Wired: Reliable, Secure, Not mobile | Wireless: Unreliable, Less secure, Mobile",
    explanation: "Wired is reliable, secure, and not mobile. Wireless offers mobility at the cost of less reliability and security.",
    canTypeInHardMode: false,
  },
  {
    id: "cont-cd-acronym",
    category: "Collision Protocols",
    prompt: "What does the 'CD' stand for in CSMA/CD?",
    options: ["Collision Detection", "Collision Domain", "Carrier Diversity", "Continuous Duplex"],
    answer: "Collision Detection",
    explanation: "In CSMA/CD, CD stands for Collision Detection (listening for collisions after transmitting).",
    canTypeInHardMode: true,
    aliases: ["collision detection", "collision detect", "detection"],
    keywords: ["detection"],
  },
  {
    id: "cont-ca-acronym",
    category: "Collision Protocols",
    prompt: "What does the 'CA' stand for in CSMA/CA?",
    options: ["Collision Avoidance", "Collision Arbitration", "Carrier Access", "Channel Allocation"],
    answer: "Collision Avoidance",
    explanation: "In CSMA/CA, CA stands for Collision Avoidance (waiting and sensing before transmitting to avoid collisions).",
    canTypeInHardMode: true,
    aliases: ["collision avoidance", "collision avoid", "avoidance"],
    keywords: ["avoidance"],
  },
  {
    id: "cont-wireless-why-ca",
    category: "Contention Methods",
    prompt: "Why can't wireless networks rely on collision detection (CSMA/CD) like wired cables?",
    options: [
      "Wireless transceivers transmit with higher energy than received signals, overpowering collision detection during transmission",
      "Wireless signals travel too fast for electrical detection",
      "Wireless standards strictly prohibit the letter D in acronyms",
      "Wireless frequencies only operate in simplex mode",
    ],
    answer: "Wireless transceivers transmit with higher energy than received signals, overpowering collision detection during transmission",
    explanation: "A wireless station's own transmission overpowers the antenna receiver, making it impossible to detect other weaker colliding signals while transmitting.",
    canTypeInHardMode: false,
  },
];

const sections: MultiSectionConfig[] = [
  {
    id: "sec-traits",
    title: "MEDIUM_TRAITS_CLASSIFICATION",
    subtitle: "[PART_01: MEDIUM_TRAITS_&_CHARACTERISTICS]",
    description: "Identify whether each operational trait describes Wired or Wireless media.",
    type: "questions",
    questions: initialCharacteristicMatches,
  },
  {
    id: "sec-contention",
    title: "CONTENTION_&_COLLISION_PROTOCOLS",
    subtitle: "[PART_02: CONTENTION_METHODS_&_ENGINEERING_MECHANICS]",
    description: "Validate your knowledge of CSMA/CD vs CSMA/CA, collision mechanics, and transceiver physics.",
    type: "questions",
    questions: initialQuestions,
  },
];

function WiredVsWirelessContent() {
  const searchParams = useSearchParams();
  const isMastery = searchParams.get("mastery") === "true";

  return (
    <MultiSectionQuiz
      moduleTag="DIAGNOSTIC_MODULE"
      moduleCode="PHYSICAL_LAYER_MEDIA"
      title="Wired vs Wireless Networks"
      studyGuideHref="/study-guide#wired-vs-wireless"
      sections={sections}
      initialHardMode={isMastery}
    />
  );
}

export default function WiredVsWirelessQuiz() {
  return (
    <Suspense fallback={null}>
      <WiredVsWirelessContent />
    </Suspense>
  );
}
