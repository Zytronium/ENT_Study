"use client";

import { useState, useCallback, Suspense, useMemo } from "react";
import Link from "next/link";

interface ContentionQuestion {
  id: string;
  category: "Contention Methods" | "Medium Characteristics" | "Collision Protocols";
  prompt: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface CharacteristicMatch {
  id: string;
  trait: string;
  answer: "Wired" | "Wireless";
  explanation: string;
}

const initialQuestions: ContentionQuestion[] = [
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
  },
  {
    id: "cont-cd-acronym",
    category: "Collision Protocols",
    prompt: "What does the 'CD' stand for in CSMA/CD?",
    options: ["Collision Detection", "Collision Domain", "Carrier Diversity", "Continuous Duplex"],
    answer: "Collision Detection",
    explanation: "In CSMA/CD, CD stands for Collision Detection (listening for collisions after transmitting).",
  },
  {
    id: "cont-ca-acronym",
    category: "Collision Protocols",
    prompt: "What does the 'CA' stand for in CSMA/CA?",
    options: ["Collision Avoidance", "Collision Arbitration", "Carrier Access", "Channel Allocation"],
    answer: "Collision Avoidance",
    explanation: "In CSMA/CA, CA stands for Collision Avoidance (waiting and sensing before transmitting to avoid collisions).",
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
  },
];

const initialCharacteristicMatches: CharacteristicMatch[] = [
  {
    id: "char-reliable",
    trait: "High reliability due to dedicated physical shielded or twisted copper path",
    answer: "Wired",
    explanation: "Wired connections provide high reliability with minimal external interference.",
  },
  {
    id: "char-mobile",
    trait: "High physical mobility for client endpoints without cord constraints",
    answer: "Wireless",
    explanation: "Wireless allows untethered mobility across radio coverage zones.",
  },
  {
    id: "char-secure",
    trait: "Inherently more secure because physical access to the media or port is required to tap",
    answer: "Wired",
    explanation: "Wired mediums are confined to physical runs, making unauthorized interception harder.",
  },
  {
    id: "char-unreliable",
    trait: "Unreliable transmission susceptible to RF attenuation, interference, and wall obstacles",
    answer: "Wireless",
    explanation: "Wireless is subject to environmental interference, walls, and distance degradation.",
  },
  {
    id: "char-less-secure",
    trait: "Less secure by default because radio waves broadcast openly through the air",
    answer: "Wireless",
    explanation: "Radio broadcasts can be intercepted by anyone within range without physical cable taps.",
  },
  {
    id: "char-not-mobile",
    trait: "Not mobile; devices must remain tethered to a wall jack or patch panel",
    answer: "Wired",
    explanation: "Wired devices are fixed to physical outlet and cable run locations.",
  },
];

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function WiredVsWirelessQuizContent() {
  const [questions, setQuestions] = useState<ContentionQuestion[]>(() =>
    shuffleArray(initialQuestions).map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }))
  );

  const [characteristicMatches, setCharacteristicMatches] = useState<CharacteristicMatch[]>(() =>
    shuffleArray(initialCharacteristicMatches)
  );

  const [generalAnswers, setGeneralAnswers] = useState<Record<string, string>>({});
  const [matchAnswers, setMatchAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleAnswerChange = (qId: string, val: string) => {
    setGeneralAnswers((prev) => ({ ...prev, [qId]: val }));
  };

  const handleMatchChange = (mId: string, val: string) => {
    setMatchAnswers((prev) => ({ ...prev, [mId]: val }));
  };

  const isQuestionCorrect = useCallback(
    (qId: string, correct: string) => {
      const userVal = (generalAnswers[qId] || "").trim();
      return userVal === correct;
    },
    [generalAnswers]
  );

  const isMatchCorrect = useCallback(
    (mId: string, correct: "Wired" | "Wireless") => {
      const userVal = (matchAnswers[mId] || "").trim();
      return userVal.toLowerCase() === correct.toLowerCase();
    },
    [matchAnswers]
  );

  const scoreData = useMemo(() => {
    let earned = 0;
    const total = questions.length + characteristicMatches.length;

    questions.forEach((q) => {
      if (isQuestionCorrect(q.id, q.answer)) earned++;
    });

    characteristicMatches.forEach((m) => {
      if (isMatchCorrect(m.id, m.answer)) earned++;
    });

    const percent = Math.round((earned / total) * 100);
    return { earned, total, percent, isPerfect: earned === total };
  }, [questions, characteristicMatches, isQuestionCorrect, isMatchCorrect]);

  const handleResetAndScramble = () => {
    setGeneralAnswers({});
    setMatchAnswers({});
    setShowResults(false);
    setQuestions(
      shuffleArray(initialQuestions).map((q) => ({
        ...q,
        options: shuffleArray(q.options),
      }))
    );
    setCharacteristicMatches(shuffleArray(initialCharacteristicMatches));
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-8">
      {/* Header */}
      <header className="w-full max-w-5xl mb-8 cyber-glass-panel p-4 sm:p-5 rounded-xl border border-slate-800 shadow-xl flex flex-wrap justify-between items-center gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-1.5 py-0.5 rounded">
              DIAGNOSTIC_MODULE
            </span>
            <span className="text-xs text-slate-500 font-mono">//</span>
            <span className="text-xs text-slate-400 font-mono">CONTENTION_CONTROL</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="text-emerald-400 font-mono">ENT_ROUTER_V1</span>
            <span className="text-slate-600 font-light">|</span>
            <span className="text-slate-200">Wired vs Wireless</span>
          </h1>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <Link
            href="/study-guide#wired-vs-wireless"
            className="px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-950/30 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-400 transition-all flex items-center gap-1.5 font-bold"
          >
            <span>[STUDY_GUIDE]</span>
          </Link>
          <Link
            href="/"
            className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-600 transition-all font-bold"
          >
            {"<"} BACK TO HUB
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-5xl flex flex-col gap-8 font-mono">
        {/* Section 1: Contention & Collision Methods */}
        <section className="terminal-box border-l-4 border-l-cyan-500 shadow-2xl">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-cyan-400 font-mono">
                [SECTION_01: CONTENTION_METHODS_&_COLLISION_PROTOCOLS]
              </h2>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mb-6">
            Collision Detection (CSMA/CD) vs Collision Avoidance (CSMA/CA) traffic control mechanisms.
          </p>

          <div className="space-y-4">
            {questions.map((q, idx) => {
              const isCorrect = isQuestionCorrect(q.id, q.answer);
              const userAnswer = generalAnswers[q.id] || "";

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-lg border transition-all ${
                    showResults
                      ? isCorrect
                        ? "border-emerald-500/60 bg-emerald-950/20"
                        : "border-rose-500/60 bg-rose-950/20"
                      : "border-slate-800/80 bg-slate-900/70 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/40 border border-cyan-900/50 px-2 py-0.5 rounded shrink-0">
                      #1.{idx + 1}
                    </span>
                    <div className="flex-grow">
                      <p className="text-xs sm:text-sm font-semibold text-slate-200 font-mono">{q.prompt}</p>
                      <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                        Category: {q.category}
                      </span>

                      <div className="mt-3 max-w-2xl">
                        <select
                          className={`w-full bg-slate-950 border p-2 text-xs sm:text-sm rounded-lg font-mono outline-none transition-colors ${
                            showResults
                              ? isCorrect
                                ? "border-emerald-500 text-emerald-400 bg-emerald-950/30"
                                : "border-rose-500 text-rose-400 bg-rose-950/30"
                              : "border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-slate-200"
                          }`}
                          value={userAnswer}
                          onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                          disabled={showResults}
                        >
                          <option value="">-- Select Answer --</option>
                          {q.options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>

                        {showResults && !isCorrect && (
                          <div className="text-xs text-rose-400 mt-2 font-mono space-y-0.5">
                            <div>Expected: {q.answer}</div>
                            <div className="text-slate-400 font-mono">{q.explanation}</div>
                          </div>
                        )}
                        {showResults && isCorrect && (
                          <div className="text-xs text-emerald-400 mt-2 font-mono">[OK] Verified: {q.explanation}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 2: Medium Characteristics Classification */}
        <section className="terminal-box border-l-4 border-l-amber-500 shadow-2xl">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-amber-400 font-mono">
                [SECTION_02: MEDIUM_CHARACTERISTICS_CLASSIFICATION]
              </h2>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mb-6">
            Classify each operational trait and security attribute as belonging to Wired or Wireless.
          </p>

          <div className="space-y-4">
            {characteristicMatches.map((m, idx) => {
              const isCorrect = isMatchCorrect(m.id, m.answer);
              const userAnswer = matchAnswers[m.id] || "";

              return (
                <div
                  key={m.id}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg border transition-all ${
                    showResults
                      ? isCorrect
                        ? "border-emerald-500/60 bg-emerald-950/20"
                        : "border-rose-500/60 bg-rose-950/20"
                      : "border-slate-800/80 bg-slate-900/70 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/40 border border-amber-900/50 px-2 py-0.5 rounded shrink-0">
                      #2.{idx + 1}
                    </span>
                    <div>
                      <p className="text-xs sm:text-sm text-slate-200 font-medium font-mono leading-relaxed">{m.trait}</p>
                      {showResults && !isCorrect && (
                        <span className="text-xs text-rose-400 font-mono block mt-1">
                          Expected: {m.answer} - {m.explanation}
                        </span>
                      )}
                      {showResults && isCorrect && (
                        <span className="text-xs text-emerald-400 font-mono block mt-1">
                          [OK] Correct: {m.explanation}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 sm:w-48 ml-7 sm:ml-0">
                    <select
                      className={`w-full bg-slate-950 border p-2 text-xs sm:text-sm rounded-lg font-mono outline-none transition-colors ${
                        showResults
                          ? isCorrect
                            ? "border-emerald-500 text-emerald-400 bg-emerald-950/30"
                            : "border-rose-500 text-rose-400 bg-rose-950/30"
                          : "border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-slate-200"
                      }`}
                      value={userAnswer}
                      onChange={(e) => handleMatchChange(m.id, e.target.value)}
                      disabled={showResults}
                    >
                      <option value="">-- Classify --</option>
                      <option value="Wired">Wired</option>
                      <option value="Wireless">Wireless</option>
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Validation & Control Actions */}
        <div className="terminal-box border-l-4 border-l-emerald-500 shadow-2xl flex flex-col items-center gap-4 p-6">
          {!showResults ? (
            <button
              type="button"
              onClick={() => setShowResults(true)}
              disabled={
                Object.keys(generalAnswers).length === 0 &&
                Object.keys(matchAnswers).length === 0
              }
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-sm sm:text-base rounded-lg shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              VALIDATE CONFIGURATION
            </button>
          ) : (
            <div className="w-full text-center space-y-4">
              <div
                className={`p-4 rounded-lg border font-mono shadow-lg ${
                  scoreData.isPerfect
                    ? "border-emerald-500/60 bg-emerald-950/40 text-emerald-300 shadow-emerald-950/40"
                    : "border-rose-500/60 bg-rose-950/40 text-rose-300 shadow-rose-950/40"
                }`}
              >
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="font-bold">
                    {scoreData.isPerfect
                      ? "[OK] PERFECT SCORE: ALL ANSWERS SYNCHRONIZED"
                      : "[!] DIAGNOSTIC MISALIGNMENT DETECTED"}
                  </span>
                  <span className="text-sm sm:text-base font-bold">
                    {scoreData.earned} / {scoreData.total} ({scoreData.percent}%)
                  </span>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleResetAndScramble}
                  className="px-6 py-2.5 border border-emerald-500/40 hover:border-emerald-400 bg-slate-900/80 hover:bg-slate-800 text-emerald-400 font-bold font-mono text-sm rounded-lg transition-all cursor-pointer"
                >
                  SCRAMBLE & RESET
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function WiredVsWirelessQuizPage() {
  return (
    <Suspense fallback={null}>
      <WiredVsWirelessQuizContent />
    </Suspense>
  );
}
