"use client";

import { useState, useCallback, useMemo, useRef, useEffect, type PointerEvent } from "react";
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

// -------- constants --------
const DROPDOWN_THRESHOLD = 6;

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
      const kwTokens = cleanTokens(kw);
      if (kwTokens.length === 0) return false;
      return kwTokens.every((kt) => uTokens.includes(kt));
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
                                                 isEmbedded = false,
                                                 hideHeader = false,
                                                 initialHardMode = false,
                                                 onValidateSection,
                                                 onAnswersChange,
                                                 externalAnswers,
                                                 externalShowResults,
                                               }: MatchToDefinitionsQuizProps) {
  const [items, setItems] = useState<DefinitionItem[]>(() => {
    return shuffleArray(initialItems);
  });

  const [internalAnswers, setInternalAnswers] = useState<Record<string, string>>({});
  const [internalShowResults, setInternalShowResults] = useState(false);
  const [isHardMode, setIsHardMode] = useState(initialHardMode);
  const [hasCompletedOnce, setHasCompletedOnce] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>(() =>
    shuffleArray(customOptions && customOptions.length > 0 ? customOptions : initialItems.map((item) => item.term)),
  );
  const [dragging, setDragging] = useState<{ itemId: string; x: number; y: number } | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const sourceRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const targetRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [lineSegments, setLineSegments] = useState<Array<{
    id: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    correct: boolean;
  }>>([]);
  const [dragSegment, setDragSegment] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);

  const answers = externalAnswers ?? internalAnswers;
  const showResults = externalShowResults ?? internalShowResults;

  // -------- layout mode --------
  // Once there are more than DROPDOWN_THRESHOLD items, drag-to-connect lines get
  // too cluttered, so we fall back to a plain dropdown select per item.
  const useDropdown = items.length > DROPDOWN_THRESHOLD;

  const handleAnswerChange = (itemId: string | number, value: string) => {
    const updated = { ...answers, [String(itemId)]: value };
    if (!externalAnswers) {
      setInternalAnswers(updated);
    }
    onAnswersChange?.(updated);
  };

  const getBoardPoint = (clientX: number, clientY: number) => {
    const board = boardRef.current?.getBoundingClientRect();
    if (!board) return { x: clientX, y: clientY };
    return { x: clientX - board.left, y: clientY - board.top };
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragging) setDragging({ ...dragging, ...getBoardPoint(event.clientX, event.clientY) });
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const target = document.elementFromPoint(event.clientX, event.clientY)?.closest<HTMLButtonElement>(
      "[data-match-term]",
    );
    if (target?.dataset.matchTerm) handleAnswerChange(dragging.itemId, target.dataset.matchTerm);
    setDragging(null);
  };

  const handleTargetClick = (term: string) => {
    if (selectedItemId) {
      handleAnswerChange(selectedItemId, term);
      setSelectedItemId(null);
    }
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

  useEffect(() => {
    if (useDropdown) return;
    const board = boardRef.current?.getBoundingClientRect();
    if (!board) return;
    const nextLines = Object.entries(answers).flatMap(([itemId, term]) => {
      const source = sourceRefs.current[itemId]?.getBoundingClientRect();
      const target = targetRefs.current[term]?.getBoundingClientRect();
      if (!source || !target) return [];
      return [{
        id: itemId,
        x1: source.right - board.left,
        y1: source.top + source.height / 2 - board.top,
        x2: target.left - board.left,
        y2: target.top + target.height / 2 - board.top,
        correct: Boolean(showResults && results.map[itemId]),
      }];
    });
    setLineSegments(nextLines);
    if (dragging) {
      const source = sourceRefs.current[dragging.itemId]?.getBoundingClientRect();
      if (source) {
        setDragSegment({
          x1: source.right - board.left,
          y1: source.top + source.height / 2 - board.top,
          x2: dragging.x,
          y2: dragging.y,
        });
      }
    } else {
      setDragSegment(null);
    }
  }, [answers, items, shuffledOptions, showResults, results.map, dragging, useDropdown]);

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
    setShuffledOptions(
      shuffleArray(customOptions && customOptions.length > 0 ? customOptions : initialItems.map((item) => item.term)),
    );
    const resetAns: Record<string, string> = {};
    if (!externalAnswers) {
      setInternalAnswers(resetAns);
      setInternalShowResults(false);
    }
    onAnswersChange?.(resetAns);
    setSelectedItemId(null);
    setDragging(null);
    if (allCorrect || hasCompletedOnce) {
      setIsHardMode(true);
    }
  }, [initialItems, customOptions, allCorrect, hasCompletedOnce, externalAnswers, onAnswersChange]);

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

      <div
        ref={boardRef}
        className="relative space-y-3"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => setDragging(null)}
      >
        {!isHardMode && (
          <p className="text-xs text-slate-500">
            {useDropdown
              ? "Pick the matching term from the dropdown on each item."
              : "Drag each definition to its matching term, or click both sides to connect them."}
          </p>
        )}
        {!isHardMode ? (
          useDropdown ? (
            // -------- dropdown mode --------
            <div className="space-y-2.5">
              {items.map((item) => {
                const itemIdStr = String(item.id);
                const isCorrect = results.map[itemIdStr];
                const userVal = answers[itemIdStr] || "";
                return (
                  <div
                    key={item.id}
                    className={`rounded-lg border p-2.5 transition-all ${
                      showResults
                        ? isCorrect
                          ? "border-emerald-500/60 bg-emerald-950/20"
                          : "border-rose-500/60 bg-rose-950/20"
                        : "border-slate-800/80 bg-slate-900/70 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                      <div className="flex-1 min-w-0">
                        {item.hint && (
                          <span
                            className="mb-1 inline-block text-[10px] text-cyan-400 font-mono bg-cyan-950/40 border border-cyan-900/50 px-1.5 py-0.5 rounded">
                            {item.hint}
                          </span>
                        )}
                        <p className="text-xs text-slate-300 leading-snug font-mono">
                          &ldquo;{item.definition}&rdquo;
                        </p>
                        {item.detailHint && (
                          <p className="mt-0.5 text-[10px] text-slate-500 font-mono italic">{item.detailHint}</p>
                        )}
                      </div>
                      <select
                        value={userVal}
                        disabled={showResults}
                        onChange={(e) => handleAnswerChange(item.id, e.target.value)}
                        className={`shrink-0 rounded-md border px-2 py-1.5 text-xs font-mono outline-none transition-colors sm:w-48 ${
                          showResults
                            ? isCorrect
                              ? "border-emerald-500 bg-emerald-950/30 text-emerald-300"
                              : "border-rose-500 bg-rose-950/30 text-rose-300"
                            : userVal
                              ? "border-cyan-400 bg-cyan-950/30 text-cyan-300"
                              : "border-slate-700 bg-slate-950 text-slate-400"
                        }`}
                      >
                        <option value="">Select a term...</option>
                        {shuffledOptions.map((term) => (
                          <option key={term} value={term}>
                            {term}
                          </option>
                        ))}
                      </select>
                    </div>
                    {showResults && !isCorrect && (
                      <div
                        className="mt-2 text-xs font-mono text-rose-400 bg-rose-950/30 border border-rose-900/50 p-2 rounded">
                        Correct answer: <span className="text-emerald-400 font-bold">{item.term}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            // -------- drag-to-connect mode --------
            <div className="grid grid-cols-1 gap-2 sm:gap-4 md:grid-cols-[minmax(0,1fr)_minmax(13rem,0.6fr)] md:items-start md:gap-8">
              <div className="space-y-2">
                {items.map((item) => {
                  const itemIdStr = String(item.id);
                  const isCorrect = results.map[itemIdStr];
                  const isMatched = Boolean(answers[itemIdStr]);
                  return (
                    <div
                      key={item.id}
                      ref={(element) => {
                        sourceRefs.current[itemIdStr] = element as unknown as HTMLButtonElement;
                      }}
                      role="button"
                      tabIndex={showResults ? -1 : 0}
                      aria-disabled={showResults}
                      onPointerDown={(event) => {
                        if (showResults) return;
                        (event.currentTarget as HTMLDivElement).setPointerCapture(event.pointerId);
                        const point = getBoardPoint(event.clientX, event.clientY);
                        setSelectedItemId(itemIdStr);
                        setDragging({ itemId: itemIdStr, ...point });
                      }}
                      onClick={() => !showResults && setSelectedItemId(itemIdStr)}
                      className={`rounded-lg border p-2 transition-all touch-none select-none ${
                        showResults
                          ? isCorrect
                            ? "border-emerald-500/60 bg-emerald-950/20"
                            : "border-rose-500/60 bg-rose-950/20"
                          : isMatched
                            ? "border-cyan-400 bg-cyan-950/20 cursor-grab active:cursor-grabbing"
                            : "border-slate-800/80 bg-slate-900/70 hover:border-cyan-500/60 cursor-grab active:cursor-grabbing"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          {item.hint && (
                            <span
                              className="mb-1 inline-block text-[10px] text-cyan-400 font-mono bg-cyan-950/40 border border-cyan-900/50 px-1.5 py-0.5 rounded">
                              {item.hint}
                            </span>
                          )}
                          <p className="text-xs text-slate-300 leading-snug font-mono">
                            &ldquo;{item.definition}&rdquo;
                          </p>
                          {item.detailHint && (
                            <p className="mt-0.5 text-[10px] text-slate-500 font-mono italic">{item.detailHint}</p>
                          )}
                        </div>
                        <span
                          className={`shrink-0 text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                            isMatched
                              ? "border-cyan-400 text-cyan-300 bg-cyan-950/30"
                              : "border-slate-700 text-slate-500"
                          }`}
                        >
                          {isMatched ? answers[itemIdStr] : "drag →"}
                        </span>
                      </div>
                      {showResults && !isCorrect && (
                        <div
                          className="mt-1.5 text-[10px] font-mono text-rose-400 bg-rose-950/30 border border-rose-900/50 p-1.5 rounded">
                          Correct answer: <span className="text-emerald-400 font-bold">{item.term}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="space-y-2 md:pt-0">
                <p className="text-[10px] font-mono text-cyan-400">AVAILABLE TERMS</p>
                <div className="space-y-5">
                  {shuffledOptions.map((term) => {
                    const matchedItem = items.find((item) => answers[String(item.id)] === term);
                    const isSelected = selectedItemId !== null && answers[selectedItemId] === term;
                    const isCorrect = matchedItem ? results.map[String(matchedItem.id)] : undefined;
                    return (
                      <button
                        key={term}
                        ref={(element) => {
                          targetRefs.current[term] = element;
                        }}
                        type="button"
                        data-match-term={term}
                        disabled={showResults}
                        onClick={() => handleTargetClick(term)}
                        className={`w-full rounded-md border px-1.5 py-3 text-left text-xs transition-all ${
                          showResults
                            ? isCorrect
                              ? "border-emerald-500 bg-emerald-950/50 text-emerald-300"
                              : matchedItem
                                ? "border-rose-500 bg-rose-950/50 text-rose-300"
                                : "border-slate-800 bg-slate-950/50 text-slate-600"
                            : isSelected
                              ? "border-cyan-400 bg-cyan-950/40 text-cyan-300"
                              : "border-cyan-900/70 bg-slate-950 text-slate-300 hover:border-cyan-500"
                        }`}
                      >
                        {matchedItem ? "[●] " : "[ ] "}{term}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="space-y-3">
            {items.map((item) => {
              const itemIdStr = String(item.id);
              const userVal = answers[itemIdStr] || "";
              const isCorrect = results.map[itemIdStr];
              return (
                <div key={item.id}
                     className={`p-2.5 rounded-lg border transition-all ${showResults ? isCorrect ? "border-emerald-500/60 bg-emerald-950/20" : "border-rose-500/60 bg-rose-950/20" : "border-slate-800/80 bg-slate-900/70"}`}>
                  <p className="mb-2 text-xs text-slate-300 leading-snug">&ldquo;{item.definition}&rdquo;</p>
                  <input type="text" value={userVal} onChange={(e) => handleAnswerChange(item.id, e.target.value)}
                         disabled={showResults} placeholder="Type term..."
                         className={`w-full p-2 text-xs sm:text-sm font-mono rounded-lg outline-none border transition-colors ${showResults ? isCorrect ? "border-emerald-500 text-emerald-400 bg-emerald-950/30" : "border-rose-500 text-rose-400 bg-rose-950/30" : "border-slate-700 text-slate-200 bg-slate-950 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"}`}/>
                  {showResults && !isCorrect && <div className="mt-2 text-xs text-rose-400">Correct answer: <span
                    className="text-emerald-400 font-bold">{item.term}</span></div>}
                </div>
              );
            })}
          </div>
        )}
        {!isHardMode && !useDropdown && (
          <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
            {lineSegments.map((line) => (
              <line key={line.id} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                    stroke={line.correct ? "var(--accent)" : "var(--accent-cyan)"} strokeWidth="2"/>
            ))}
            {dragSegment && <line x1={dragSegment.x1} y1={dragSegment.y1} x2={dragSegment.x2} y2={dragSegment.y2}
                                  stroke="var(--accent-cyan)" strokeWidth="2"/>}
          </svg>
        )}
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
