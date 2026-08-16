"use client";

import { useState } from "react";
import Link from "next/link";

interface QuizQuestion {
  id: number;
  prompt: string;
  category: "Core Concept" | "Modem Types" | "Signal Conversion" | "Scenario";
  options: string[];
  answer: string;
  explanation: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    category: "Core Concept",
    prompt: "Which device provides the PHYSICAL connection to the Internet Service Provider (ISP)?",
    options: ["Modem", "Router"],
    answer: "Modem",
    explanation: "Modems provide the physical connection to the ISP by translating analog and digital signals.",
  },
  {
    id: 2,
    category: "Core Concept",
    prompt: "Which device provides the LOGICAL connection to the ISP and connects all local network devices together?",
    options: ["Modem", "Router"],
    answer: "Router",
    explanation: "Routers handle logical connections, IP routing, and connect multiple local devices to the internet.",
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
  },
  {
    id: 5,
    category: "Modem Types",
    prompt: "What physical cable type does a Cable Modem use to connect to the ISP?",
    options: ["Coaxial cables", "Phone lines", "Cat6 twisted pair", "Fiber optic"],
    answer: "Coaxial cables",
    explanation: "Cable modems use coaxial cables (remember: Cable modems use cables).",
  },
  {
    id: 6,
    category: "Modem Types",
    prompt: "What physical transmission line does a DSL Modem use?",
    options: ["Phone lines", "Coaxial cables", "Unshielded twisted pair only", "Radio waves"],
    answer: "Phone lines",
    explanation: "DSL modems use phone lines (remember: Digital Subscriber *Line* uses phone *lines*).",
  }
];

export default function ModemRouterQuiz() {
  const shuffleArray = <T, >(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const shuffleQuestionOptions = (questions: QuizQuestion[]): QuizQuestion[] => {
    return questions.map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));
  };

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [isScrambled, setIsScrambled] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => shuffleQuestionOptions(quizQuestions));

  const handleSelectAnswer = (qId: number, selected: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: selected }));
  };

  const isQuestionCorrect = (q: QuizQuestion) => {
    const userAns = (answers[q.id] || "").trim().toLowerCase();
    const correctAns = q.answer.trim().toLowerCase();
    return userAns === correctAns;
  };

  const score = questions.filter(isQuestionCorrect).length;
  const allCorrect = score === questions.length;

  const handleValidate = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    if (allCorrect && !isScrambled) {
      setIsScrambled(true);
      setQuestions(shuffleQuestionOptions([...quizQuestions].sort(() => Math.random() - 0.5)));
    } else {
      setQuestions(shuffleQuestionOptions([...quizQuestions]));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <header className="w-full max-w-4xl mb-8 border-b border-border pb-4">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <h1 className="text-3xl font-bold text-accent">ENT_ROUTER_V1 | Modem VS Router</h1>
          <div className="flex items-center gap-4 text-sm font-mono">
            <Link href="/study-guide#modems-vs-routers" className="text-accent hover:underline flex items-center gap-1">
              [VIEW IN STUDY GUIDE]
            </Link>
            <Link href="/" className="text-accent hover:underline">
              {"<"} BACK TO HUB
            </Link>
          </div>
        </div>
        <p className="text-sm text-slate-400 mt-2">
          Diagnostic Module: Physical vs. Logical ISP Connections & Signal Modulation
        </p>
      </header>

      <main className="w-full max-w-4xl space-y-8">
        {/* Interactive Quiz Box */}
        <section className="terminal-box">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 pb-4 border-b border-border">
            <div>
              <h2 className="text-xl font-bold text-accent underline">Modem vs Router</h2>
              <p className="text-xs text-slate-400 mt-1">
                {isScrambled
                  ? "Questions scrambled. Select the correct device, media, or modulation direction for each prompt."
                  : "Select the correct device, media, or modulation direction for each prompt."}
              </p>
            </div>
            {showResults && (
              <div className="font-mono text-sm px-3 py-1 rounded bg-slate-900 border border-border">
                Score: <span className={allCorrect ? "text-green-400 font-bold" : "text-yellow-400 font-bold"}>{score}</span> / {questions.length}
              </div>
            )}
          </div>

          <div className="space-y-6">
            {questions.map((q, index) => {
              const selected = answers[q.id] || "";
              const isCorrect = isQuestionCorrect(q);

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded border transition-colors ${
                    showResults
                      ? isCorrect
                        ? "border-green-500/60 bg-green-950/20"
                        : "border-red-500/60 bg-red-950/20"
                      : "border-border/60 bg-slate-900/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-accent font-mono text-xs mt-0.5 shrink-0">
                      [{String(index + 1).padStart(2, "0")}]
                    </span>
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-border">
                          {q.category}
                        </span>
                      </div>
                      <p className="text-sm text-slate-200 font-medium mb-3">{q.prompt}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        {q.options.map((opt) => {
                          const isOptionSelected = selected === opt;
                          const isOptionCorrect = opt === q.answer;

                          let btnStyle = "bg-slate-900 border-border text-slate-300 hover:border-accent hover:text-white";
                          if (showResults) {
                            if (isOptionCorrect) {
                              btnStyle = "bg-green-900/50 border-green-500 text-green-300 font-bold";
                            } else if (isOptionSelected && !isOptionCorrect) {
                              btnStyle = "bg-red-900/50 border-red-500 text-red-300 line-through";
                            } else {
                              btnStyle = "bg-slate-900/40 border-border/40 text-slate-500 opacity-60";
                            }
                          } else if (isOptionSelected) {
                            btnStyle = "bg-accent/20 border-accent text-accent font-bold";
                          }

                          return (
                            <button
                              key={opt}
                              type="button"
                              disabled={showResults}
                              onClick={() => handleSelectAnswer(q.id, opt)}
                              className={`text-left p-2.5 rounded text-xs border font-mono transition-all flex items-center justify-between ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {showResults && isOptionCorrect && <span className="text-green-400 text-xs">✓</span>}
                              {showResults && isOptionSelected && !isOptionCorrect && (
                                <span className="text-red-400 text-xs">✗</span>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {showResults && (
                        <div className="mt-3 pt-2 border-t border-border/40 text-xs flex flex-col gap-1">
                          <div className={isCorrect ? "text-green-400" : "text-red-400"}>
                            {isCorrect ? "✓ Correct configuration" : `✗ Incorrect. Expected: "${q.answer}"`}
                          </div>
                          <p className="text-slate-400 italic">{q.explanation}</p>
                        </div>
                      )}
                    </div>
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
                disabled={Object.keys(answers).length === 0}
                className="px-8 py-2.5 bg-accent text-slate-900 font-bold rounded hover:bg-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-mono text-sm tracking-wider"
              >
                VALIDATE ROUTER & MODEM CONFIG
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
                  {allCorrect ? (
                    <div>
                      <div className="text-xl font-bold mb-1">ALL PROTOCOLS SYNCHRONIZED</div>
                      <p className="text-xs text-slate-300">
                        Physical (Modem) and Logical (Router) hardware parameters accurately matched.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="text-xl font-bold mb-1">HARDWARE CONFIGURATION MISMATCH</div>
                      <p className="text-xs text-slate-300">
                        {questions.length - score} issue(s) detected. Review the items flagged in red above.
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
                    RESET DIAGNOSTICS
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
