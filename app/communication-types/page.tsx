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
    <div className="min-h-screen flex flex-col items-center p-8">
      <header className="w-full max-w-4xl mb-8 border-b border-border pb-4">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <h1 className="text-3xl font-bold text-accent">ENT_ROUTER_V1 | Communication Types</h1>
          <div className="flex items-center gap-4 text-sm font-mono">
            <Link href="/study-guide#connection-types" className="text-accent hover:underline flex items-center gap-1">
              [VIEW IN STUDY GUIDE]
            </Link>
            <Link href="/" className="text-sm text-accent hover:underline">
              {"<"} BACK TO HUB
            </Link>
          </div>
        </div>
        <p className="text-sm text-slate-400 mt-2">
          Diagnostic Module: Simplex, Half-Duplex, & Full Duplex Transmission Modes
        </p>
      </header>

      <main className="w-full max-w-4xl space-y-8">
        {/* Section 1: Definition Matching */}
        <section className="terminal-box">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-border">
            <h2 className="text-xl font-bold text-accent underline">Transmission Mode Definitions</h2>
          </div>
          <p className="text-xs text-slate-300 mb-6">
            Match each signal transmission principle to its corresponding connection standard.
          </p>

          <div className="space-y-4">
            {definitionChallenges.map((def, idx) => {
              const selected = defAnswers[def.id] || "";
              const isCorrect = isDefCorrect(def);

              return (
                <div
                  key={def.id}
                  className={`p-4 rounded border transition-colors ${
                    showResults
                      ? isCorrect
                        ? "border-green-500/60 bg-green-950/20"
                        : "border-red-500/60 bg-red-950/20"
                      : "border-border/60 bg-slate-900/50"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3 flex-grow">
                      <span className="text-accent font-mono text-xs mt-1 shrink-0">
                        [{String(idx + 1).padStart(2, "0")}]
                      </span>
                      <div>
                        <div className="text-sm text-slate-200 font-medium">{`"${def.description}"`}</div>
                        <div className="text-xs text-slate-400 font-mono mt-1 opacity-75">{def.directionVisual}</div>
                      </div>
                    </div>

                    <div className="w-full md:w-56 shrink-0">
                      <select
                        disabled={showResults}
                        value={selected}
                        onChange={(e) => handleDefSelect(def.id, e.target.value)}
                        className={`w-full bg-slate-900 border p-2 text-xs rounded font-mono outline-none ${
                          showResults
                            ? isCorrect
                              ? "border-green-500 text-green-400"
                              : "border-red-500 text-red-400"
                            : "border-border focus:border-accent text-slate-200"
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
                        <div className="text-xs text-red-400 mt-1 font-mono">Expected: {def.answer}</div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 2: Real-World Example Classification */}
        <section className="terminal-box">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-border">
            <h2 className="text-xl font-bold text-accent underline">Real-World & Hardware Classification</h2>
          </div>
          <p className="text-xs text-slate-300 mb-6">
            Identify the communication type utilized by each real-world system, protocol, or networking hardware device.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {examples.map((ex, idx) => {
              const selected = exAnswers[ex.id] || "";
              const isCorrect = isExCorrect(ex);

              return (
                <div
                  key={ex.id}
                  className={`p-4 rounded border transition-colors flex flex-col justify-between ${
                    showResults
                      ? isCorrect
                        ? "border-green-500/60 bg-green-950/20"
                        : "border-red-500/60 bg-red-950/20"
                      : "border-border/60 bg-slate-900/50"
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <span className="text-xs text-slate-400 font-mono">#{idx + 1}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-border">
                        {ex.category}
                      </span>
                    </div>

                    <div className="text-sm font-bold text-slate-100 mb-3">{ex.item}</div>
                  </div>

                  <div className="space-y-2 mt-2">
                    <div className="grid grid-cols-3 gap-1.5">
                      {commTypes.map((t) => {
                        const isChosen = selected === t;
                        const isTarget = t === ex.answer;

                        let style = "bg-slate-900 border-border text-slate-300 hover:border-accent";
                        if (showResults) {
                          if (isTarget) {
                            style = "bg-green-900/50 border-green-500 text-green-300 font-bold";
                          } else if (isChosen && !isTarget) {
                            style = "bg-red-900/50 border-red-500 text-red-300 line-through";
                          } else {
                            style = "bg-slate-900/30 border-border/30 text-slate-600 opacity-50";
                          }
                        } else if (isChosen) {
                          style = "bg-accent/20 border-accent text-accent font-bold";
                        }

                        return (
                          <button
                            key={t}
                            type="button"
                            disabled={showResults}
                            onClick={() => handleExSelect(ex.id, t)}
                            className={`p-1.5 rounded text-[11px] border font-mono text-center transition-all ${style}`}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>

                    {showResults && (
                      <div className="pt-2 border-t border-border/40 text-[11px]">
                        <div className={isCorrect ? "text-green-400 font-mono" : "text-red-400 font-mono"}>
                          {isCorrect ? "✓ Verified" : `✗ Target: ${ex.answer}`}
                        </div>
                        <p className="text-slate-400 italic text-[11px] mt-0.5">{ex.explanation}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-border flex flex-col items-center gap-4">
            {!showResults ? (
              <button
                type="button"
                onClick={handleValidate}
                disabled={Object.keys(defAnswers).length === 0 && Object.keys(exAnswers).length === 0}
                className="px-8 py-2.5 bg-accent text-slate-900 font-bold rounded hover:bg-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-mono text-sm tracking-wider"
              >
                VALIDATE COMMUNICATION MATRIX
              </button>
            ) : (
              <div className="w-full text-center space-y-4">
                <div
                  className={`p-4 rounded border ${
                    allCorrect
                      ? "bg-green-950/40 text-green-400 border-green-500"
                      : "bg-red-950/40 text-red-400 border-red-500"
                  }`}
                >
                  <div className="font-mono text-sm mb-1">
                    Score: <span className="font-bold">{totalScore}</span> / {totalQuestions}
                  </div>
                  {allCorrect ? (
                    <div>
                      <div className="text-xl font-bold mb-1">TRANSMISSION MODES VALIDATED</div>
                      <p className="text-xs text-slate-300">
                        Simplex, Half-Duplex, and Full Duplex criteria correctly verified across all systems.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="text-xl font-bold mb-1">TRANSMISSION MISALIGNMENT DETECTED</div>
                      <p className="text-xs text-slate-300">
                        {totalQuestions - totalScore} item(s) incorrectly classified. Review flagged items above.
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-2 border border-accent text-accent font-bold rounded hover:bg-accent/10 transition-colors font-mono text-xs"
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
