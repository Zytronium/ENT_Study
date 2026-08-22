"use client";

import { useState, useCallback, useMemo } from "react";
import QuizHeader from "./QuizHeader";

export interface DefinitionItem {
  id: string | number;
  term: string;
  definition: string;
  detailHint?: string;
  aliases?: string[];
  keywords?: string[];
  hint?: string;
}

export interface MatchToDefinitionsQuizProps {
  moduleTag?: string;
  moduleCode?: string;
  title?: string;
  heading?: string;
  description?: string;
  studyGuideHref?: string;
  items: DefinitionItem[];
  options?: string[];
  selectPlaceholder?: string;
  mode?: "select" | "buttons" | "auto";
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

export function validateDefinitionMatch(item: DefinitionItem, userAns: string): boolean {
  if (!userAns || !userAns.trim()) return false;
  const u = userAns.trim().toLowerCase();
  const t = item.term.trim().toLowerCase();

  if (u === t) return true;
  if (normalize(u) === normalize(t)) return true;

  // Handle acronym in parentheses like "TDR (Time Domain Reflectometer)"
  if (item.term.includes(" (")) {
    const acronym = item.term.split(" (")[0].toLowerCase().trim();
    const fullName = item.term.split(" (")[1].replace(")", "").toLowerCase().trim();
    if (u === acronym || u === fullName || normalize(u) === normalize(acronym) || normalize(u) === normalize(fullName)) {
      return true;
    }
  }

  if (item.aliases && item.aliases.length > 0) {
    const uNorm = normalize(u);
    if (item.aliases.some((alias) => normalize(alias) === uNorm || alias.toLowerCase().trim() === u)) {
      return true;
    }
  }

  if (item.keywords && item.keywords.length > 0) {
    const uTokens = cleanTokens(u);
    const allKeywordsPresent = item.keywords.every((kw) => {
      const kwClean = kw.trim().toLowerCase();
      const kwNorm = normalize(kwClean);
      if (kwClean.includes(" ")) {
        return u.includes(kwClean) || normalize(u).includes(kwNorm);
      }
      return uTokens.includes(kwClean) || u.includes(kwClean) || normalize(u).includes(kwNorm);
    });
    if (allKeywordsPresent) return true;
  }

  return false;
}

export default function MatchToDefinitionsQuiz({
  moduleTag,
  moduleCode,
  title,
  heading = "[TECHNICAL_DEFINITION_MATCHING]",
  description = "Match each technical definition or description to the correct standard networking term.",
  studyGuideHref,
  items: initialItems,
  options: customOptions,
  selectPlaceholder = "-- Select Term --",
  mode = "auto",
  isEmbedded = false,
  hideHeader = false,
  initialHardMode = false,
  onValidateSection,
  onAnswersChange,
  externalAnswers,
  externalShowResults,
}: MatchToDefinitionsQuizProps) {
  const [items, setItems] = useState<DefinitionItem[]>(() => {
    return initialHardMode ? shuffleArray(initialItems) : initialItems;
  });

  const [internalAnswers, setInternalAnswers] = useState<Record<string, string>>({});
  const [internalShowResults, setInternalShowResults] = useState(false);
  const [isHardMode, setIsHardMode] = useState(initialHardMode);
  const [hasCompletedOnce, setHasCompletedOnce] = useState(false);

  const answers = externalAnswers ?? internalAnswers;
  const showResults = externalShowResults ?? internalShowResults;

  const availableOptions = useMemo(() => {
    if (customOptions && customOptions.length > 0) return customOptions;
    const unique = Array.from(new Set(initialItems.map((i) => i.term)));
    return unique.sort((a, b) => a.localeCompare(b));
  }, [customOptions, initialItems]);

  const effectiveMode = useMemo(() => {
    if (mode !== "auto") return mode;
    return availableOptions.length <= 4 ? "buttons" : "select";
  }, [mode, availableOptions]);

  const handleAnswerChange = (itemId: string | number, value: string) => {
    const updated = { ...answers, [String(itemId)]: value };
    if (!externalAnswers) {
      setInternalAnswers(updated);
    }
    onAnswersChange?.(updated);
  };

  const results = useMemo(() => {
    let correct = 0;
    const map: Record<string, boolean> = {};
    items.forEach((item) => {
      const isRight = validateDefinitionMatch(item, answers[String(item.id)] || "");
      map[String(item.id)] = isRight;
      if (isRight) correct++;
    });
    return { map, correct, total: items.length };
  }, [items, answers]);

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
    setItems(shuffleArray(initialItems));
    const resetAns: Record<string, string> = {};
    if (!externalAnswers) {
      setInternalAnswers(resetAns);
      setInternalShowResults(false);
    }
    onAnswersChange?.(resetAns);
    if (allCorrect || hasCompletedOnce) {
      setIsHardMode(true);
    }
  }, [initialItems, allCorrect, hasCompletedOnce, externalAnswers, onAnswersChange]);

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
        {items.map((item, idx) => {
          const itemIdStr = String(item.id);
          const userVal = answers[itemIdStr] || "";
          const isCorrect = results.map[itemIdStr];

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
              <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-1.5 py-0.5 rounded shrink-0">
                      #{idx + 1}
                    </span>
                    {item.hint && (
                      <span className="text-[10px] text-cyan-400 font-mono bg-cyan-950/40 border border-cyan-900/50 px-1.5 py-0.5 rounded">
                        {item.hint}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-mono">
                    &ldquo;{item.definition}&rdquo;
                  </p>
                  {item.detailHint && (
                    <p className="text-[11px] text-slate-500 font-mono italic">
                      {item.detailHint}
                    </p>
                  )}
                </div>

                <div className="w-full md:w-64 shrink-0">
                  {isHardMode ? (
                    <input
                      type="text"
                      value={userVal}
                      onChange={(e) => handleAnswerChange(item.id, e.target.value)}
                      disabled={showResults}
                      placeholder="Type term..."
                      className={`w-full p-2 text-xs sm:text-sm font-mono rounded-lg outline-none border transition-colors ${
                        showResults
                          ? isCorrect
                            ? "border-emerald-500 text-emerald-400 bg-emerald-950/30"
                            : "border-rose-500 text-rose-400 bg-rose-950/30"
                          : "border-slate-700 text-slate-200 bg-slate-950 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                      }`}
                    />
                  ) : effectiveMode === "buttons" ? (
                    <div className="space-y-1.5">
                      {availableOptions.map((opt) => {
                        const isSelected = userVal === opt;
                        const isThisCorrect = opt === item.term;

                        let btnClasses =
                          "w-full text-left p-2 rounded text-xs font-mono border transition-all cursor-pointer ";
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
                            onClick={() => handleAnswerChange(item.id, opt)}
                            className={btnClasses}
                          >
                            <span className="mr-1.5 font-bold">{isSelected ? "[●]" : "[ ]"}</span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <select
                      value={userVal}
                      onChange={(e) => handleAnswerChange(item.id, e.target.value)}
                      disabled={showResults}
                      className={`w-full bg-slate-950 border p-2 text-xs sm:text-sm font-mono rounded-lg outline-none transition-colors ${
                        showResults
                          ? isCorrect
                            ? "border-emerald-500 text-emerald-400 bg-emerald-950/30"
                            : "border-rose-500 text-rose-400 bg-rose-950/30"
                          : "border-slate-700 text-slate-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                      }`}
                    >
                      <option value="">{selectPlaceholder}</option>
                      {availableOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              {showResults && !isCorrect && (
                <div className="mt-2 text-xs font-mono text-rose-400 bg-rose-950/30 border border-rose-900/50 p-2 rounded">
                  Correct answer: <span className="text-emerald-400 font-bold">{item.term}</span>
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
                      <span>[OK]</span> ALL DEFINITIONS SYNCHRONIZED
                    </span>
                    <p className="text-xs sm:text-sm text-emerald-300/90 font-mono">
                      All {results.total} terms correctly identified and mapped.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold font-mono mb-1 text-rose-400 flex items-center gap-2">
                      <span>[!]</span> CONFIGURATION MISMATCH DETECTED
                    </span>
                    <p className="text-xs sm:text-sm text-rose-300/90 font-mono">
                      {results.total - results.correct} term(s) need review. Examine the feedback above.
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
