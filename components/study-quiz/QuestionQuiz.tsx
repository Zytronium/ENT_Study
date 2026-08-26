"use client";

import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import QuizHeader from "./QuizHeader";

export interface QuestionQuizItem {
  id: string | number;
  prompt: string;
  category?: string;
  options?: string[];
  answer: string;
  explanation?: string;
  hint?: string;
  aliases?: string[];
  keywords?: string[];
  canTypeInHardMode?: boolean;
  imageSrc?: string;
  alt?: string;
}

export interface QuestionQuizProps {
  moduleTag?: string;
  moduleCode?: string;
  title?: string;
  heading?: string;
  description?: string;
  studyGuideHref?: string;
  questions: QuestionQuizItem[];
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

function normalize(str: string): string {
  return str.trim().toLowerCase().replace(/[\s-]+/g, "");
}

function cleanTokens(str: string): string[] {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

export function validateQuestionAnswer(q: QuestionQuizItem, userAns: string): boolean {
  if (!userAns || !userAns.trim()) return false;
  const u = userAns.trim().toLowerCase();
  const a = q.answer.trim().toLowerCase();
  if (u === a) return true;
  if (normalize(u) === normalize(a)) return true;

  // Handle acronym in parentheses like "SSH (Secure Shell)"
  if (q.answer.includes(" (")) {
    const parts = q.answer.split(" (");
    const acronym = parts[0].toLowerCase().trim();
    const fullName = parts[1].replace(")", "").toLowerCase().trim();
    if (
      u === acronym ||
      u === fullName ||
      normalize(u) === normalize(acronym) ||
      normalize(u) === normalize(fullName)
    ) {
      return true;
    }
  }

  // If user selected or entered an explicit distractor from options, reject it immediately
  if (q.options && q.options.length > 0) {
    const isExplicitDistractor = q.options.some(
      (opt) =>
        (opt.toLowerCase().trim() === u || normalize(opt) === normalize(u)) &&
        opt.toLowerCase().trim() !== a &&
        normalize(opt) !== normalize(a)
    );
    if (isExplicitDistractor) {
      return false;
    }
  }

  if (q.aliases && q.aliases.length > 0) {
    const uNorm = normalize(u);
    if (q.aliases.some((alias) => normalize(alias) === uNorm || alias.toLowerCase().trim() === u)) {
      return true;
    }
  }

  if (q.keywords && q.keywords.length > 0) {
    const uTokens = cleanTokens(u);
    const allKeywordsPresent = q.keywords.every((kw) => {
      const kwTokens = cleanTokens(kw);
      if (kwTokens.length === 0) return false;
      return kwTokens.every((kt) => uTokens.includes(kt));
    });
    if (allKeywordsPresent) return true;
  }

  return false;
}

export default function QuestionQuiz({
  moduleTag,
  moduleCode,
  title,
  heading = "[KNOWLEDGE_ASSESSMENT_CHALLENGE]",
  description,
  studyGuideHref,
  questions: initialQuestions,
  isEmbedded = false,
  hideHeader = false,
  initialHardMode = false,
  onValidateSection,
  onAnswersChange,
  externalAnswers,
  externalShowResults,
}: QuestionQuizProps) {
  const [questions, setQuestions] = useState<QuestionQuizItem[]>(() => {
    const list = shuffleArray(initialQuestions);
    return list.map((q) => ({
      ...q,
      options: q.options ? shuffleArray(q.options) : undefined,
    }));
  });

  const [internalAnswers, setInternalAnswers] = useState<Record<string, string>>({});
  const [internalShowResults, setInternalShowResults] = useState(false);
  const [isHardMode, setIsHardMode] = useState(initialHardMode);
  const [hasCompletedOnce, setHasCompletedOnce] = useState(false);

  const answers = externalAnswers ?? internalAnswers;
  const showResults = externalShowResults ?? internalShowResults;

  const handleSelectAnswer = (qId: string | number, selected: string) => {
    const updated = { ...answers, [String(qId)]: selected };
    if (!externalAnswers) {
      setInternalAnswers(updated);
    }
    onAnswersChange?.(updated);
  };

  const results = useMemo(() => {
    let correct = 0;
    const map: Record<string, boolean> = {};
    questions.forEach((q) => {
      const isRight = validateQuestionAnswer(q, answers[String(q.id)] || "");
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

  const handleResetAndScramble = useCallback(() => {
    const scrambled = shuffleArray(initialQuestions).map((q) => ({
      ...q,
      options: q.options ? shuffleArray(q.options) : undefined,
    }));
    setQuestions(scrambled);
    const resetAns: Record<string, string> = {};
    if (!externalAnswers) {
      setInternalAnswers(resetAns);
      setInternalShowResults(false);
    }
    onAnswersChange?.(resetAns);
    if (allCorrect || hasCompletedOnce) {
      setIsHardMode(true);
    }
  }, [initialQuestions, allCorrect, hasCompletedOnce, externalAnswers, onAnswersChange]);

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
          const shouldType = isHardMode && q.canTypeInHardMode;

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
                  #{idx + 1}
                </span>
                <div className="flex-1">
                  {q.category && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/40 border border-cyan-900/50 px-1.5 py-0.5 rounded">
                        {q.category}
                      </span>
                    </div>
                  )}

                  {q.imageSrc && (
                    <div className="mb-4 p-2 bg-slate-950/80 border border-slate-800 rounded flex justify-center">
                      <Image
                        src={q.imageSrc}
                        alt={q.alt || "Quiz visual"}
                        width={400}
                        height={250}
                        className="max-h-56 object-contain rounded"
                      />
                    </div>
                  )}

                  <p className="text-sm sm:text-base font-semibold text-slate-100 mb-3">{q.prompt}</p>

                  {shouldType ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={userVal}
                        onChange={(e) => handleSelectAnswer(q.id, e.target.value)}
                        disabled={showResults}
                        placeholder="Type your answer here..."
                        className={`w-full p-2.5 rounded-lg text-xs font-mono border outline-none transition-all ${
                          showResults
                            ? isCorrect
                              ? "bg-emerald-950/60 border-emerald-500 text-emerald-300"
                              : "bg-rose-950/60 border-rose-500 text-rose-300"
                            : "bg-slate-950 border-slate-700 text-slate-100 focus:border-emerald-400"
                        }`}
                      />
                    </div>
                  ) : q.options && q.options.length > 0 ? (
                    <div className="space-y-2">
                      {q.options.map((opt) => {
                        const isSelected = userVal === opt;
                        const isThisCorrect = opt === q.answer;

                        let btnClasses =
                          "w-full text-left p-2.5 rounded-lg text-xs font-mono border transition-all cursor-pointer ";
                        if (showResults) {
                          if (isThisCorrect) {
                            btnClasses += "bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold";
                          } else if (isSelected && !isThisCorrect) {
                            btnClasses += "bg-rose-950/60 border-rose-500 text-rose-300 line-through";
                          } else {
                            btnClasses += "bg-slate-950/40 border-slate-800/40 text-slate-600 opacity-60";
                          }
                        } else if (isSelected) {
                          btnClasses +=
                            "bg-emerald-950/40 border-emerald-400 text-emerald-300 font-bold shadow-sm";
                        } else {
                          btnClasses +=
                            "bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300";
                        }

                        return (
                          <button
                            key={opt}
                            type="button"
                            disabled={showResults}
                            onClick={() => handleSelectAnswer(q.id, opt)}
                            className={btnClasses}
                          >
                            <span className="mr-2 font-bold">{isSelected ? "[●]" : "[ ]"}</span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={userVal}
                        onChange={(e) => handleSelectAnswer(q.id, e.target.value)}
                        disabled={showResults}
                        placeholder="Type your answer..."
                        className={`w-full p-2.5 rounded-lg text-xs font-mono border outline-none transition-all ${
                          showResults
                            ? isCorrect
                              ? "bg-emerald-950/60 border-emerald-500 text-emerald-300"
                              : "bg-rose-950/60 border-rose-500 text-rose-300"
                            : "bg-slate-950 border-slate-700 text-slate-100 focus:border-emerald-400"
                        }`}
                      />
                    </div>
                  )}

                  {showResults && (
                    <div
                      className={`mt-3 p-3 rounded text-xs border ${
                        isCorrect
                          ? "bg-emerald-950/30 border-emerald-800/50 text-emerald-300"
                          : "bg-rose-950/30 border-rose-800/50 text-rose-300"
                      }`}
                    >
                      <div className="font-bold mb-1">
                        {isCorrect ? "[OK] CORRECT" : `[!] INCORRECT - Correct: ${q.answer}`}
                      </div>
                      {q.explanation && <div className="text-slate-400">{q.explanation}</div>}
                    </div>
                  )}
                </div>
              </div>
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
              VALIDATE CONFIGURATION
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
                      <span>[OK]</span> ALL SPECIFICATIONS VERIFIED
                    </span>
                    <p className="text-xs sm:text-sm text-emerald-300/90 font-mono">
                      All {results.total} questions answered correctly.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold font-mono mb-1 text-rose-400 flex items-center gap-2">
                      <span>[!]</span> SPECIFICATION MISMATCH DETECTED
                    </span>
                    <p className="text-xs sm:text-sm text-rose-300/90 font-mono">
                      {results.total - results.correct} question(s) need review. Examine the feedback above.
                    </p>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={handleResetAndScramble}
                className="px-6 py-2.5 border border-emerald-500/40 hover:border-emerald-400 bg-slate-900/80 hover:bg-slate-800 text-emerald-400 font-bold font-mono text-sm rounded-lg transition-all cursor-pointer"
              >
                {allCorrect || isHardMode
                  ? "SCRAMBLE FIRMWARE (Reset and scramble order)"
                  : "RESET FIRMWARE (Reset answers)"}
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
