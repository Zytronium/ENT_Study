"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";

interface QuizQuestion {
  id: string;
  category: "Architecture & Tables" | "Switch Operation & Forwarding";
  prompt: string;
  hint?: string;
  answer: string;
  options: string[];
  aliases: string[];
  explanation: string;
  canTypeInHardMode?: boolean;
}

const INITIAL_QUESTIONS: QuizQuestion[] = [
  {
    id: "q-traffic-address",
    category: "Architecture & Tables",
    prompt: "Which address type does a Layer 2 switch use to make forwarding decisions?",
    hint: "Layer 2 hardware address",
    answer: "MAC address",
    options: ["MAC address", "IPv4 address", "Default gateway IP", "TCP port number"],
    aliases: [
      "mac",
      "mac address",
      "mac addresses",
      "media access control",
      "physical address",
      "physical addresses",
      "layer 2 address",
      "layer 2 addresses",
    ],
    explanation: "Layer 2 switches make frame forwarding decisions based on Layer 2 MAC (Media Access Control) addresses.",
    canTypeInHardMode: true,
  },
  {
    id: "q-cam-table",
    category: "Architecture & Tables",
    prompt: "Which term is an alternate name for the MAC address table on a Layer 2 switch?",
    hint: "Three-letter acronym table",
    answer: "CAM table",
    options: ["CAM table", "Routing table", "ARP table", "Big MAC"],
    aliases: [
      "cam",
      "cam table",
      "cam tables",
      "content addressable memory",
      "content addressable memory table",
    ],
    explanation: "A switch's MAC address table is also known as a CAM (Content Addressable Memory) table.",
    canTypeInHardMode: true,
  },
  {
    id: "q-table-mapping",
    category: "Architecture & Tables",
    prompt: "What relationship is mapped and maintained within a switch MAC/CAM table?",
    answer: "Physical switch ports to MAC addresses",
    options: [
      "Physical switch ports to MAC addresses",
      "Logical IP addresses to domain names",
      "Switch port numbers to default gateways",
      "MAC addresses to transport port sockets",
    ],
    aliases: [],
    explanation: "A switch's MAC/CAM table maps physical switch ports to their learned MAC addresses.",
    canTypeInHardMode: false,
  },
  {
    id: "q-unknown-mac-broadcast",
    category: "Switch Operation & Forwarding",
    prompt: "How does a Layer 2 switch handle a frame destined for an unknown MAC address?",
    answer: "Broadcasts the frame on all ports except the sending port",
    options: [
      "Broadcasts the frame on all ports except the sending port",
      "Drops the frame immediately and notifies the source",
      "Forwards the frame exclusively to the default gateway",
      "Broadcasts the frame out all ports including the ingress port",
    ],
    aliases: [],
    explanation: "When the destination MAC is not in its table, the switch floods/broadcasts the frame out all ports except the one on which it was received.",
    canTypeInHardMode: false,
  },
  {
    id: "q-mac-learning",
    category: "Switch Operation & Forwarding",
    prompt: "How does a switch learn and record a device MAC address after querying an unknown destination?",
    answer: "Records the MAC address on the port that receives the target response",
    options: [
      "Records the MAC address on the port that receives the target response",
      "Requests an automatic port assignment mapping from the DHCP server",
      "Awaits a manual port configuration entry from a network administrator",
      "Inspects domain host records received directly from the default gateway",
    ],
    aliases: [],
    explanation: "When the target device responds, the switch notes the incoming port and records the device's MAC address under that port in the table.",
    canTypeInHardMode: false,
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function Layer2SwitchesPage() {
  const [questions, setQuestions] = useState<QuizQuestion[]>(() =>
    shuffleArray(INITIAL_QUESTIONS)
  );

  const shuffledOptions = useMemo(() => {
    const map: Record<string, string[]> = {};
    questions.forEach((q) => {
      map[q.id] = shuffleArray(q.options);
    });
    return map;
  }, [questions]);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const totalQuestions = questions.length;

  const results = useMemo(() => {
    if (!showResults) return { questionResults: {}, correctCount: 0 };

    let count = 0;
    const qResults: Record<string, boolean> = {};

    questions.forEach((q) => {
      const isCorrect = answers[q.id] === q.answer;
      qResults[q.id] = isCorrect;
      if (isCorrect) count++;
    });

    return { questionResults: qResults, correctCount: count };
  }, [showResults, questions, answers]);

  const allCorrect = showResults && results.correctCount === totalQuestions;

  const handleAnswerChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleValidate = () => {
    setShowResults(true);
  };

  const handleResetAndScramble = useCallback(() => {
    setQuestions(shuffleArray(INITIAL_QUESTIONS));
    setAnswers({});
    setShowResults(false);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-8">
      {/* Header */}
      <header className="w-full max-w-4xl mb-8 cyber-glass-panel p-4 sm:p-5 rounded-xl border border-slate-800 shadow-xl flex flex-wrap justify-between items-center gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-1.5 py-0.5 rounded">
              DIAGNOSTIC_MODULE
            </span>
            <span className="text-xs text-slate-500 font-mono">{"//"}</span>
            <span className="text-xs text-slate-400 font-mono">LAYER_2_SWITCHES</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="text-emerald-400 font-mono">ENT_ROUTER_V1</span>
            <span className="text-slate-600 font-light">|</span>
            <span className="text-slate-200">Layer 2 Switches</span>
          </h1>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <Link
            href="/study-guide#layer-2-switches---data-link-layer"
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
        {/* Main Quiz Section */}
        <section className="terminal-box border-l-4 border-l-emerald-500 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between pb-3 mb-4 border-b border-slate-800/80 gap-2">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
                [LAYER_2_SWITCH_DIAGNOSTIC_CHALLENGE]
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 font-mono mb-6">
            Select the correct option for each switch operation, table mapping, and frame forwarding requirement.
          </p>

          <div className="space-y-4">
            {questions.map((item, idx) => {
              const selected = answers[item.id] || "";
              const isCorrect = results.questionResults[item.id];

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-lg border transition-all ${
                    showResults
                      ? isCorrect
                        ? "border-emerald-500/60 bg-emerald-950/20"
                        : "border-rose-500/60 bg-rose-950/20"
                      : "border-slate-800/80 bg-slate-900/70 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-2 py-0.5 rounded shrink-0">
                      #{idx + 1}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/40 border border-cyan-900/50 px-1.5 py-0.5 rounded">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 font-medium mb-3">{item.prompt}</p>

                      <div className="grid grid-cols-1 gap-2 mt-2">
                        {shuffledOptions[item.id].map((opt) => {
                          const isOptionSelected = selected === opt;
                          const isOptionCorrect = opt === item.answer;

                          let btnStyle =
                            "bg-slate-950 border-slate-800 text-slate-300 hover:border-emerald-500/50 hover:text-white";
                          if (showResults) {
                            if (isOptionCorrect) {
                              btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold";
                            } else if (isOptionSelected && !isOptionCorrect) {
                              btnStyle = "bg-rose-950/60 border-rose-500 text-rose-300 line-through";
                            } else {
                              btnStyle = "bg-slate-950/40 border-slate-800/40 text-slate-600 opacity-60";
                            }
                          } else if (isOptionSelected) {
                            btnStyle = "bg-emerald-950/40 border-emerald-400 text-emerald-300 font-bold shadow-sm";
                          }

                          return (
                            <button
                              key={opt}
                              type="button"
                              disabled={showResults}
                              onClick={() => handleAnswerChange(item.id, opt)}
                              className={`text-left p-2.5 rounded-lg text-xs font-mono border transition-all flex items-center justify-between cursor-pointer disabled:cursor-default ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {showResults && isOptionCorrect && (
                                <span className="text-emerald-400 text-xs font-bold">[OK]</span>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {showResults && (
                        <div
                          className={`mt-3 text-xs p-2.5 rounded-lg border font-mono ${
                            isCorrect
                              ? "bg-emerald-950/40 text-emerald-300 border-emerald-800/60"
                              : "bg-rose-950/40 text-rose-300 border-rose-800/60"
                          }`}
                        >
                          <span className="font-bold">
                            {isCorrect ? "[OK] VALIDATED: " : "[!] ERROR: "}
                          </span>
                          <span className="font-mono">{item.explanation}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Validation & Reset Section */}
        <section className="terminal-box border-l-4 border-l-emerald-500 shadow-2xl text-center">
          {!showResults ? (
            <div className="flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={handleValidate}
                className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-sm rounded-lg shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/20 transition-all cursor-pointer"
              >
                VALIDATE ALL RESPONSES
              </button>
              <p className="text-xs text-slate-400 font-mono">
                {Object.values(answers).filter((v) => v.trim() !== "").length} of {totalQuestions}{" "}
                questions answered
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div
                className={`p-6 rounded-lg border shadow-lg ${
                  allCorrect
                    ? "bg-emerald-950/40 text-emerald-300 border-emerald-500/60 shadow-emerald-950/40"
                    : "bg-rose-950/40 text-rose-300 border-rose-500/60 shadow-rose-950/40"
                }`}
              >
                {allCorrect ? (
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-lg sm:text-xl font-bold font-mono text-emerald-400 flex items-center gap-2">
                      <span>[OK]</span> SUCCESS: LAYER 2 SWITCH OPERATION VALIDATED
                    </span>
                    <p className="text-xs sm:text-sm text-emerald-300/90 font-mono">
                      All MAC/CAM table mappings, frame broadcasting logic, and Layer 2 switching mechanics verified.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-lg sm:text-xl font-bold font-mono text-rose-400 flex items-center gap-2">
                      <span>[!]</span> CONFIGURATION MISMATCH DETECTED
                    </span>
                    <p className="text-xs sm:text-sm text-rose-300/90 font-mono">
                      {totalQuestions - results.correctCount} item(s) failed parity check. Review highlighted errors above.
                    </p>
                  </div>
                )}
                <div className="mt-4 text-xs font-mono text-slate-400">
                  Total Score: <span className="font-bold text-slate-200">{results.correctCount}</span> / {totalQuestions} (
                  {Math.round((results.correctCount / totalQuestions) * 100)}%)
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4">
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
        </section>
      </main>
    </div>
  );
}
