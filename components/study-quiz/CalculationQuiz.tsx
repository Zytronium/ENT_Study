"use client";

import { useState, useMemo, useCallback } from "react";
import QuizHeader from "./QuizHeader";

export interface CalculationQuestion {
  id: string | number;
  question: string;
  answer: string;
  hint?: string;
  explanation?: string;
  unit?: string;
  aliases?: string[];
}

export interface CalculationQuizProps {
  moduleTag?: string;
  moduleCode?: string;
  title?: string;
  heading?: string;
  description?: string;
  studyGuideHref?: string;
  questions: CalculationQuestion[];
  isEmbedded?: boolean;
  hideHeader?: boolean;
  initialHardMode?: boolean;
  onValidateSection?: (allCorrect: boolean, score: number, total: number) => void;
  onAnswersChange?: (answers: Record<string, string>) => void;
  externalAnswers?: Record<string, string>;
  externalShowResults?: boolean;
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function validateCalculationAnswer(q: CalculationQuestion, userVal: string): boolean {
  if (!userVal || !userVal.trim()) return false;
  const cleanUser = userVal.replace(/,/g, "").trim().toLowerCase();
  const cleanAns = q.answer.replace(/,/g, "").trim().toLowerCase();

  if (cleanUser === cleanAns) return true;

  if (q.aliases && q.aliases.length > 0) {
    return q.aliases.some(
      (a) => a.replace(/,/g, "").trim().toLowerCase() === cleanUser
    );
  }

  return false;
}

export default function CalculationQuiz({
  moduleTag,
  moduleCode,
  title,
  heading = "[DATA_CALCULATION_&_CONVERSION]",
  description = "Calculate and enter the exact numerical conversion or size for each prompt.",
  studyGuideHref,
  questions: initialQuestions,
  isEmbedded = false,
  hideHeader = false,
  initialHardMode = false,
  onValidateSection,
  onAnswersChange,
  externalAnswers,
  externalShowResults,
}: CalculationQuizProps) {
  const [questions] = useState<CalculationQuestion[]>(() => {
    return initialHardMode ? shuffleArray(initialQuestions) : initialQuestions;
  });
  const [internalAnswers, setInternalAnswers] = useState<Record<string, string>>({});
  const [internalShowResults, setInternalShowResults] = useState(false);
  const [, setHasCompletedOnce] = useState(false);

  const answers = externalAnswers ?? internalAnswers;
  const showResults = externalShowResults ?? internalShowResults;

  const handleInputChange = (id: string | number, value: string) => {
    const updated = { ...answers, [String(id)]: value };
    if (!externalAnswers) {
      setInternalAnswers(updated);
    }
    onAnswersChange?.(updated);
  };

  const results = useMemo(() => {
    let correct = 0;
    const map: Record<string, boolean> = {};
    questions.forEach((q) => {
      const isRight = validateCalculationAnswer(q, answers[String(q.id)] || "");
      map[String(q.id)] = isRight;
      if (isRight) correct++;
    });
    return { map, correct, total: questions.length };
  }, [questions, answers]);

  const allCorrect = results.correct === results.total;

  const handleValidate = () => {
    if (!externalShowResults) {
      setInternalShowResults(true);
    }
    if (allCorrect) {
      setHasCompletedOnce(true);
    }
    onValidateSection?.(allCorrect, results.correct, results.total);
  };

  const handleReset = useCallback(() => {
    const resetAns: Record<string, string> = {};
    if (!externalAnswers) {
      setInternalAnswers(resetAns);
      setInternalShowResults(false);
    }
    onAnswersChange?.(resetAns);
  }, [externalAnswers, onAnswersChange]);

  const content = (
    <div className="space-y-6 font-mono">
      {!isEmbedded && (
        <div className="flex flex-wrap items-center justify-between pb-3 mb-4 border-b border-slate-800/80 gap-2">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-emerald-400 font-mono">{heading}</h2>
          </div>
          {showResults && (
            <div className="font-mono text-xs px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300">
              SCORE:{" "}
              <span className={allCorrect ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                {results.correct}
              </span>{" "}
              / {results.total}
            </div>
          )}
        </div>
      )}

      {!isEmbedded && description && (
        <p className="text-xs sm:text-sm text-slate-400 font-mono">
          {description}
        </p>
      )}

      <div className="space-y-4">
        {questions.map((q, idx) => {
          const qIdStr = String(q.id);
          const userVal = answers[qIdStr] || "";
          const isCorrect = results.map[qIdStr];

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
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-1.5 py-0.5 rounded shrink-0">
                      #{idx + 1}
                    </span>
                    {q.hint && (
                      <span className="text-[10px] text-cyan-400 font-mono bg-cyan-950/40 border border-cyan-900/50 px-1.5 py-0.5 rounded">
                        {q.hint}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 font-mono">{q.question}</p>
                </div>

                <div className="w-full sm:w-48 shrink-0 flex items-center gap-2">
                  <input
                    type="text"
                    value={userVal}
                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                    disabled={showResults}
                    placeholder="Enter value..."
                    className={`w-full p-2 text-xs sm:text-sm font-mono rounded-lg outline-none border transition-colors ${
                      showResults
                        ? isCorrect
                          ? "border-emerald-500 text-emerald-400 bg-emerald-950/30"
                          : "border-rose-500 text-rose-400 bg-rose-950/30"
                        : "border-slate-700 text-slate-200 bg-slate-950 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                    }`}
                  />
                  {q.unit && <span className="text-xs text-slate-400 font-mono">{q.unit}</span>}
                </div>
              </div>

              {showResults && (
                <div
                  className={`mt-2 p-2 rounded text-xs border ${
                    isCorrect
                      ? "bg-emerald-950/30 border-emerald-800/50 text-emerald-300"
                      : "bg-rose-950/30 border-rose-800/50 text-rose-300"
                  }`}
                >
                  <div className="font-bold">
                    {isCorrect ? "[OK] CORRECT" : `[!] INCORRECT - Expected: ${q.answer}`}
                  </div>
                  {q.explanation && <div className="text-slate-400 mt-1">{q.explanation}</div>}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!isEmbedded && (
        <div className="pt-6 border-t border-slate-800/80 flex flex-col items-center gap-4">
          {!showResults ? (
            <button
              type="button"
              onClick={handleValidate}
              className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-sm rounded-lg shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/20 transition-all cursor-pointer"
            >
              VALIDATE CALCULATIONS
            </button>
          ) : (
            <div className="text-center w-full">
              <div
                className={`p-4 mb-6 rounded-lg ${
                  allCorrect
                    ? "bg-emerald-950/40 text-emerald-300 border border-emerald-500/60 shadow-lg shadow-emerald-950/40"
                    : "bg-rose-950/40 text-rose-300 border border-rose-500/60 shadow-lg shadow-rose-950/40"
                }`}
              >
                {allCorrect ? (
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold font-mono mb-1 text-emerald-400 flex items-center gap-2">
                      <span>[OK]</span> ALL CALCULATIONS VERIFIED
                    </span>
                    <p className="text-xs sm:text-sm text-emerald-300/90 font-mono">
                      All {results.total} calculations and conversions verified successfully.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold font-mono mb-1 text-rose-400 flex items-center gap-2">
                      <span>[!]</span> CALCULATION ERRORS DETECTED
                    </span>
                    <p className="text-xs sm:text-sm text-rose-300/90 font-mono">
                      {results.total - results.correct} calculation(s) require adjustment.
                    </p>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 border border-emerald-500/40 hover:border-emerald-400 bg-slate-900/80 hover:bg-slate-800 text-emerald-400 font-bold font-mono text-sm rounded-lg transition-all cursor-pointer"
              >
                RESET CALCULATIONS
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (isEmbedded || hideHeader) {
    return content;
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-8">
      {title && (
        <QuizHeader
          moduleTag={moduleTag}
          moduleCode={moduleCode}
          title={title}
          studyGuideHref={studyGuideHref}
        />
      )}
      <main className="w-full max-w-4xl terminal-box border-l-4 border-l-emerald-500 shadow-2xl">
        {content}
      </main>
    </div>
  );
}
