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
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-8">
      {/* Header */}
      <header className="w-full max-w-4xl mb-8 cyber-glass-panel p-4 sm:p-5 rounded-xl border border-slate-800 shadow-xl flex flex-wrap justify-between items-center gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-1.5 py-0.5 rounded">
              DIAGNOSTIC_MODULE
            </span>
            <span className="text-xs text-slate-500 font-mono">//</span>
            <span className="text-xs text-slate-400 font-mono">PHYSICAL_VS_LOGICAL</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="text-emerald-400 font-mono">ENT_ROUTER_V1</span>
            <span className="text-slate-600 font-light">|</span>
            <span className="text-slate-200">Modems vs Routers</span>
          </h1>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <Link
            href="/study-guide#modems-vs-routers"
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

      <main className="w-full max-w-4xl terminal-box border-l-4 border-l-emerald-500 shadow-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
              [MODEM_VS_ROUTER_DIAGNOSTIC]
            </h2>
          </div>
          {showResults && (
            <div className="font-mono text-xs px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300">
              SCORE: <span className={allCorrect ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>{score}</span> / {questions.length}
            </div>
          )}
        </div>

        <p className="mb-6 text-xs sm:text-sm text-slate-400 font-mono">
          {isScrambled
            ? "Questions scrambled. Select the correct device, media, or modulation direction for each prompt."
            : "Select the correct device, media, or modulation direction for each technical prompt."}
        </p>

        <div className="space-y-4">
          {questions.map((q, index) => {
            const selected = answers[q.id] || "";
            const isCorrect = isQuestionCorrect(q);

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
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-2 py-0.5 rounded shrink-0">
                    #{String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                        {q.category}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 font-medium mb-3 font-mono">{q.prompt}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      {q.options.map((opt) => {
                        const isOptionSelected = selected === opt;
                        const isOptionCorrect = opt === q.answer;

                        let btnStyle = "bg-slate-950 border-slate-800 text-slate-300 hover:border-emerald-500/50 hover:text-white";
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
                            onClick={() => handleSelectAnswer(q.id, opt)}
                            className={`text-left p-2.5 rounded-lg text-xs font-mono border transition-all flex items-center justify-between cursor-pointer disabled:cursor-default ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {showResults && isOptionCorrect && <span className="text-emerald-400 text-xs font-bold">[OK]</span>}
                            {showResults && isOptionSelected && !isOptionCorrect && (
                              <span className="text-rose-400 text-xs font-bold">[!]</span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {showResults && (
                      <div className="mt-3 pt-2.5 border-t border-slate-800/60 text-xs flex flex-col gap-1 font-mono">
                        <div className={isCorrect ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                          {isCorrect ? "[OK] Correct configuration" : `[!] Incorrect. Expected: "${q.answer}"`}
                        </div>
                        <p className="text-slate-400 italic font-mono">{q.explanation}</p>
                      </div>
                    )}
                  </div>
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
              disabled={Object.keys(answers).length === 0}
              className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-sm rounded-lg shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              VALIDATE CONFIGURATION
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
                {allCorrect ? (
                  <div>
                    <div className="text-base sm:text-lg font-bold font-mono mb-1 text-emerald-400 flex items-center justify-center gap-2">
                      <span>[OK]</span> ALL PROTOCOLS SYNCHRONIZED
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-300/90 font-mono">
                      Physical (Modem) and Logical (Router) hardware parameters accurately matched.
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="text-base sm:text-lg font-bold font-mono mb-1 text-rose-400 flex items-center justify-center gap-2">
                      <span>[!]</span> HARDWARE CONFIGURATION MISMATCH
                    </div>
                    <p className="text-xs sm:text-sm text-rose-300/90 font-mono">
                      {questions.length - score} issue(s) detected. Review flagged items above.
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
                  RESET DIAGNOSTICS
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
