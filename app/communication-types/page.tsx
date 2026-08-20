"use client";

import { useState } from "react";
import Link from "next/link";

type CommType = "Simplex" | "Half-Duplex" | "Full Duplex";

interface DefinitionChallenge {
  id: number;
  description: string;
  answer: CommType;
  directionVisual: string;
}

interface ExampleChallenge {
  id: number;
  item: string;
  category: "Everyday Audio/Broadcast" | "Radio/Human" | "Networking Hardware/Telecom";
  answer: CommType;
  explanation: string;
}

const definitionChallenges: DefinitionChallenge[] = [
  {
    id: 1,
    description: "Connection that allows ONLY ONE direction of communication.",
    answer: "Simplex",
    directionVisual: "Host A ─────────▶ Host B (One-way only)",
  },
  {
    id: 2,
    description: "Connection that allows BOTH directions of communication, but ONLY ONE AT A TIME.",
    answer: "Half-Duplex",
    directionVisual: "Host A ◀────────▶ Host B (Alternating turns)",
  },
  {
    id: 3,
    description: "Connection that allows BOTH directions of communication AT THE SAME TIME.",
    answer: "Full Duplex",
    directionVisual: "Host A ◀════════▶ Host B (Simultaneous two-way)",
  },
];

const exampleChallenges: ExampleChallenge[] = [
  {
    id: 101,
    item: "Radio Stations",
    category: "Everyday Audio/Broadcast",
    answer: "Simplex",
    explanation: "Broadcasts transmit to listeners without receiving transmission back along the same path.",
  },
  {
    id: 102,
    item: "Megaphone",
    category: "Everyday Audio/Broadcast",
    answer: "Simplex",
    explanation: "Amplifies voice in a single outgoing direction; listeners cannot respond back through it.",
  },
  {
    id: 103,
    item: "Walkie Talkies",
    category: "Radio/Human",
    answer: "Half-Duplex",
    explanation: "Both parties can talk and listen, but only one can transmit at a time using Push-to-Talk (PTT).",
  },
  {
    id: 104,
    item: "CB Radio",
    category: "Radio/Human",
    answer: "Half-Duplex",
    explanation: "Allows two-way voice transmission over a shared channel, but users must take turns transmitting.",
  },
  {
    id: 105,
    item: "Humans (Conversation)",
    category: "Radio/Human",
    answer: "Half-Duplex",
    explanation: "Standard human conversation involves one person speaking while the other listens before replying.",
  },
  {
    id: 106,
    item: "Network Hubs",
    category: "Networking Hardware/Telecom",
    answer: "Half-Duplex",
    explanation: "Hubs broadcast packets on a shared collision domain where devices must take turns sending frames.",
  },
  {
    id: 107,
    item: "Computer Networks (Modern Ethernet)",
    category: "Networking Hardware/Telecom",
    answer: "Full Duplex",
    explanation: "Modern twisted-pair and fiber networks send and receive packets simultaneously over dedicated channels.",
  },
  {
    id: 108,
    item: "Network Switches",
    category: "Networking Hardware/Telecom",
    answer: "Full Duplex",
    explanation: "Switches create dedicated point-to-point links allowing bidirectional simultaneous transmission without collisions.",
  },
  {
    id: 109,
    item: "Phone Lines (Telephone)",
    category: "Networking Hardware/Telecom",
    answer: "Full Duplex",
    explanation: "Both callers can speak and hear each other simultaneously without cutting off the line.",
  },
];

const commTypes: CommType[] = ["Simplex", "Half-Duplex", "Full Duplex"];

export default function CommunicationTypesQuiz() {
  const [defAnswers, setDefAnswers] = useState<Record<number, string>>({});
  const [exAnswers, setExAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [examples, setExamples] = useState<ExampleChallenge[]>(exampleChallenges);

  const handleDefSelect = (id: number, value: string) => {
    setDefAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleExSelect = (id: number, value: string) => {
    setExAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const isDefCorrect = (c: DefinitionChallenge) => defAnswers[c.id] === c.answer;
  const isExCorrect = (c: ExampleChallenge) => exAnswers[c.id] === c.answer;

  const totalQuestions = definitionChallenges.length + examples.length;
  const correctDefsCount = definitionChallenges.filter(isDefCorrect).length;
  const correctExCount = examples.filter(isExCorrect).length;
  const totalScore = correctDefsCount + correctExCount;
  const allCorrect = totalScore === totalQuestions;

  const handleValidate = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setDefAnswers({});
    setExAnswers({});
    setShowResults(false);
    if (allCorrect) {
      setExamples([...exampleChallenges].sort(() => Math.random() - 0.5));
    } else {
      setExamples([...exampleChallenges]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-8">
      {/* Header */}
      <header className="w-full max-w-4xl mb-8 cyber-glass-panel p-4 sm:p-5 rounded-xl border border-slate-800 shadow-xl flex flex-wrap justify-between items-center gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-1.5 py-0.5 rounded">
              DIAGNOSTIC_MODULE
            </span>
            <span className="text-xs text-slate-500 font-mono">//</span>
            <span className="text-xs text-slate-400 font-mono">TRANSMISSION_MODES</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="text-emerald-400 font-mono">ENT_ROUTER_V1</span>
            <span className="text-slate-600 font-light">|</span>
            <span className="text-slate-200">Communication Types</span>
          </h1>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <Link
            href="/study-guide#connection-types"
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

      <main className="w-full max-w-4xl space-y-8 font-mono">
        {/* Section 1: Definition Matching */}
        <section className="terminal-box border-l-4 border-l-emerald-500 shadow-2xl">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
                [PART_01: TRANSMISSION_MODE_DEFINITIONS]
              </h2>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mb-6">
            Match each signal transmission principle to its corresponding connection standard.
          </p>

          <div className="space-y-4">
            {definitionChallenges.map((def, idx) => {
              const selected = defAnswers[def.id] || "";
              const isCorrect = isDefCorrect(def);

              return (
                <div
                  key={def.id}
                  className={`p-4 rounded-lg border transition-all ${
                    showResults
                      ? isCorrect
                        ? "border-emerald-500/60 bg-emerald-950/20"
                        : "border-rose-500/60 bg-rose-950/20"
                      : "border-slate-800/80 bg-slate-900/70 hover:border-slate-700"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3 flex-grow">
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-2 py-0.5 rounded shrink-0">
                        #{String(idx + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <div className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">{`"${def.description}"`}</div>
                        <div className="text-xs text-cyan-400 font-mono mt-1 opacity-80">{def.directionVisual}</div>
                      </div>
                    </div>

                    <div className="w-full md:w-56 shrink-0">
                      <select
                        disabled={showResults}
                        value={selected}
                        onChange={(e) => handleDefSelect(def.id, e.target.value)}
                        className={`w-full bg-slate-950 border p-2 text-xs sm:text-sm font-mono rounded-lg outline-none transition-colors ${
                          showResults
                            ? isCorrect
                              ? "border-emerald-500 text-emerald-400 bg-emerald-950/30"
                              : "border-rose-500 text-rose-400 bg-rose-950/30"
                            : "border-slate-700 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 text-slate-200"
                        }`}
                      >
                        <option value="">-- Select Type --</option>
                        {commTypes.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      {showResults && !isCorrect && (
                        <div className="text-xs text-rose-400 mt-1 font-mono">Expected: {def.answer}</div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 2: Real-World Example Classification */}
        <section className="terminal-box border-l-4 border-l-emerald-500 shadow-2xl">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
                [PART_02: REAL_WORLD_&_HARDWARE_CLASSIFICATION]
              </h2>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mb-6">
            Identify the communication type utilized by each real-world system, protocol, or networking hardware device.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {examples.map((ex, idx) => {
              const selected = exAnswers[ex.id] || "";
              const isCorrect = isExCorrect(ex);

              return (
                <div
                  key={ex.id}
                  className={`p-4 rounded-lg border transition-all flex flex-col justify-between ${
                    showResults
                      ? isCorrect
                        ? "border-emerald-500/60 bg-emerald-950/20"
                        : "border-rose-500/60 bg-rose-950/20"
                      : "border-slate-800/80 bg-slate-900/70 hover:border-slate-700"
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-1.5 py-0.5 rounded">
                        #{idx + 1}
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                        {ex.category}
                      </span>
                    </div>

                    <div className="text-sm font-bold text-slate-100 mb-3 font-mono">{ex.item}</div>
                  </div>

                  <div className="space-y-2 mt-2">
                    <div className="grid grid-cols-3 gap-1.5">
                      {commTypes.map((t) => {
                        const isChosen = selected === t;
                        const isTarget = t === ex.answer;

                        let style = "bg-slate-950 border-slate-800 text-slate-300 hover:border-emerald-500/50 hover:text-white";
                        if (showResults) {
                          if (isTarget) {
                            style = "bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold";
                          } else if (isChosen && !isTarget) {
                            style = "bg-rose-950/60 border-rose-500 text-rose-300 line-through";
                          } else {
                            style = "bg-slate-950/40 border-slate-800/40 text-slate-600 opacity-50";
                          }
                        } else if (isChosen) {
                          style = "bg-emerald-950/40 border-emerald-400 text-emerald-300 font-bold shadow-sm";
                        }

                        return (
                          <button
                            key={t}
                            type="button"
                            disabled={showResults}
                            onClick={() => handleExSelect(ex.id, t)}
                            className={`p-2 rounded-lg text-[11px] border font-mono text-center transition-all cursor-pointer disabled:cursor-default ${style}`}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>

                    {showResults && (
                      <div className="pt-2 border-t border-slate-800/60 text-xs font-mono">
                        <div className={isCorrect ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                          {isCorrect ? "[OK] Verified" : `[!] Target: ${ex.answer}`}
                        </div>
                        <p className="text-slate-400 italic font-mono text-[11px] mt-0.5">{ex.explanation}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col items-center gap-4">
            {!showResults ? (
              <button
                type="button"
                onClick={handleValidate}
                disabled={Object.keys(defAnswers).length === 0 && Object.keys(exAnswers).length === 0}
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-sm rounded-lg shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                VALIDATE COMMUNICATION MATRIX
              </button>
            ) : (
              <div className="w-full text-center space-y-4">
                <div
                  className={`p-4 rounded-lg ${
                    allCorrect
                      ? "bg-emerald-950/40 text-emerald-300 border border-emerald-500/60 shadow-lg shadow-emerald-950/40"
                      : "bg-rose-950/40 text-rose-300 border border-rose-500/60 shadow-lg shadow-rose-950/40"
                  }`}
                >
                  <div className="font-mono text-xs mb-1 text-slate-400">
                    DIAGNOSTIC SCORE: <span className="font-bold text-white">{totalScore}</span> / {totalQuestions}
                  </div>
                  {allCorrect ? (
                    <div>
                      <div className="text-base sm:text-lg font-bold font-mono mb-1 text-emerald-400 flex items-center justify-center gap-2">
                        <span>[OK]</span> TRANSMISSION MODES VALIDATED
                      </div>
                      <p className="text-xs sm:text-sm text-emerald-300/90 font-mono">
                        Simplex, Half-Duplex, and Full Duplex criteria correctly verified across all systems.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="text-base sm:text-lg font-bold font-mono mb-1 text-rose-400 flex items-center justify-center gap-2">
                        <span>[!]</span> TRANSMISSION MISALIGNMENT DETECTED
                      </div>
                      <p className="text-xs sm:text-sm text-rose-300/90 font-mono">
                        {totalQuestions - totalScore} item(s) incorrectly classified. Review flagged items above.
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-2.5 border border-emerald-500/40 hover:border-emerald-400 bg-slate-900/80 hover:bg-slate-800 text-emerald-400 font-bold font-mono text-sm rounded-lg transition-all cursor-pointer"
                  >
                    SCRAMBLE & RESET
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
