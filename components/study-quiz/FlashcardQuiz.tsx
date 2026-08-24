"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import QuizHeader from "./QuizHeader";

export interface FlashcardItem {
  id: string | number;
  prompt: string;
  answer: string;
  category?: string;
  options?: string[];
  aliases?: string[];
  keywords?: string[];
  explanation?: string;
  hint?: string;
  meta?: string;
  canTypeInHardMode?: boolean;
}

export type FlashcardMode = "both" | "type" | "multiple-choice";

export interface FlashcardQuizProps {
  moduleTag?: string;
  moduleCode?: string;
  title?: string;
  heading?: string;
  description?: string;
  studyGuideHref?: string;
  cards: FlashcardItem[];
  defaultMode?: FlashcardMode;
  hybridChoiceCount?: number;
  allowModeSwitch?: boolean;
  isEmbedded?: boolean;
  hideHeader?: boolean;
  initialHardMode?: boolean;
  onValidateSection?: (allCorrect: boolean, score: number, total: number) => void;
  onAnswersChange?: (answers: Record<string, string>) => void;
  onComplete?: (stats: { correct: number; total: number; score: number }) => void;
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
  return str.trim().toLowerCase().replace(/[\s\-_,./\\()]+/g, "");
}

function cleanTokens(str: string): string[] {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

export function validateFlashcardAnswer(card: FlashcardItem, userAns: string): boolean {
  if (!userAns || !userAns.trim()) return false;
  const u = userAns.trim().toLowerCase();
  const a = card.answer.trim().toLowerCase();

  if (u === a) return true;
  if (normalize(u) === normalize(a)) return true;

  // Handle acronym in parentheses like "SSH (Secure Shell)"
  if (card.answer.includes(" (")) {
    const parts = card.answer.split(" (");
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

  if (card.aliases && card.aliases.length > 0) {
    const uNorm = normalize(u);
    if (
      card.aliases.some(
        (alias) => normalize(alias) === uNorm || alias.toLowerCase().trim() === u
      )
    ) {
      return true;
    }
  }

  if (card.keywords && card.keywords.length > 0) {
    const uTokens = cleanTokens(u);
    const allKeywordsPresent = card.keywords.every((kw) => {
      const kwClean = kw.trim().toLowerCase();
      const kwNorm = normalize(kwClean);
      if (kwClean.includes(" ")) {
        return u.includes(kwClean) || normalize(u).includes(kwNorm);
      }
      return (
        uTokens.includes(kwClean) ||
        u.includes(kwClean) ||
        normalize(u).includes(kwNorm)
      );
    });
    if (allKeywordsPresent) return true;
  }

  return false;
}

interface CardResult {
  userAnswer: string;
  isCorrect: boolean;
  revealedWithoutAnswer?: boolean;
}

export default function FlashcardQuiz({
  moduleTag,
  moduleCode,
  title,
  heading = "[INTERACTIVE_FLASHCARD_DRILL]",
  description = "Study key concepts, ports, and protocols using interactive active-recall flashcards.",
  studyGuideHref,
  cards: initialCards,
  defaultMode = "both",
  hybridChoiceCount = 3,
  allowModeSwitch = true,
  isEmbedded = false,
  hideHeader = false,
  initialHardMode = false,
  onValidateSection,
  onAnswersChange,
  onComplete,
}: FlashcardQuizProps) {
  const [deck, setDeck] = useState<FlashcardItem[]>(() => {
    return initialHardMode ? shuffleArray(initialCards) : initialCards;
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeMode, setActiveMode] = useState<FlashcardMode>(
    initialHardMode ? "type" : defaultMode
  );
  const [isHardMode, setIsHardMode] = useState(initialHardMode);
  const [cardResults, setCardResults] = useState<Record<string, CardResult>>({});
  const [typeInput, setTypeInput] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasEverCompletedOnce, setHasEverCompletedOnce] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Derive all unique answers in the deck for generating multiple choice distractors
  const allDeckAnswers = useMemo(() => {
    const set = new Set<string>();
    initialCards.forEach((c) => {
      if (c.answer) set.add(c.answer);
    });
    return Array.from(set);
  }, [initialCards]);

  const currentCard = deck[currentIndex] || deck[0];
  const currentCardId = currentCard ? String(currentCard.id) : "";
  const currentResult = cardResults[currentCardId];
  const isAnswered = currentResult !== undefined;

  // Determine whether current card uses multiple choice or type input
  const isCardMultipleChoice = useMemo(() => {
    if (isHardMode) return false;
    if (activeMode === "type") return false;
    if (activeMode === "multiple-choice") return true;
    // Hybrid "both" mode: first hybridChoiceCount cards are multiple choice
    return currentIndex < hybridChoiceCount;
  }, [isHardMode, activeMode, currentIndex, hybridChoiceCount]);

  // Options for current card
  const currentOptions = useMemo(() => {
    if (!currentCard) return [];
    if (currentCard.options && currentCard.options.length >= 2) {
      return shuffleArray(currentCard.options);
    }
    // Auto-generate options from deck
    const sameCategoryAnswers = initialCards
      .filter((c) => c.category === currentCard.category && c.answer !== currentCard.answer)
      .map((c) => c.answer);
    const otherAnswers = allDeckAnswers.filter(
      (a) => a !== currentCard.answer && !sameCategoryAnswers.includes(a)
    );

    const candidates = shuffleArray([
      ...shuffleArray(sameCategoryAnswers),
      ...shuffleArray(otherAnswers),
    ]);

    const distractors = candidates.slice(0, 3);
    return shuffleArray([currentCard.answer, ...distractors]);
  }, [currentCard, initialCards, allDeckAnswers]);

  // Focus input when moving to a type-in card
  useEffect(() => {
    if (!isCardMultipleChoice && !isAnswered && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentIndex, isCardMultipleChoice, isAnswered]);

  // Update text input when changing card
  useEffect(() => {
    setTypeInput(currentResult?.userAnswer || "");
    setShowHint(false);
    setIsFlipped(isAnswered);
  }, [currentIndex, currentResult, isAnswered]);

  const handleSelectOption = (selected: string) => {
    if (isAnswered) return;
    const isCorrect = validateFlashcardAnswer(currentCard, selected);
    const updated = {
      ...cardResults,
      [currentCardId]: {
        userAnswer: selected,
        isCorrect,
      },
    };
    setCardResults(updated);
    setIsFlipped(true);

    // Sync answer changes
    const answersMap: Record<string, string> = {};
    Object.entries(updated).forEach(([k, v]) => {
      answersMap[k] = v.userAnswer;
    });
    onAnswersChange?.(answersMap);
  };

  const handleSubmitTypeAnswer = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isAnswered || !typeInput.trim()) return;

    const isCorrect = validateFlashcardAnswer(currentCard, typeInput);
    const updated = {
      ...cardResults,
      [currentCardId]: {
        userAnswer: typeInput.trim(),
        isCorrect,
      },
    };
    setCardResults(updated);
    setIsFlipped(true);

    const answersMap: Record<string, string> = {};
    Object.entries(updated).forEach(([k, v]) => {
      answersMap[k] = v.userAnswer;
    });
    onAnswersChange?.(answersMap);
  };

  const handleRevealWithoutAnswer = () => {
    if (isAnswered) {
      setIsFlipped(!isFlipped);
      return;
    }
    const updated = {
      ...cardResults,
      [currentCardId]: {
        userAnswer: "[SKIPPED]",
        isCorrect: false,
        revealedWithoutAnswer: true,
      },
    };
    setCardResults(updated);
    setIsFlipped(true);
  };

  const handleNextCard = () => {
    if (currentIndex < deck.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Completed the deck
      setIsCompleted(true);
      const total = deck.length;
      let correctCount = 0;
      Object.values(cardResults).forEach((r) => {
        if (r.isCorrect) correctCount++;
      });
      const allCorrect = correctCount === total;
      if (allCorrect) {
        setHasEverCompletedOnce(true);
      }
      onValidateSection?.(allCorrect, correctCount, total);
      onComplete?.({ correct: correctCount, total, score: correctCount });
    }
  };

  const handlePrevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleRestartDeck = (cardsToUse: FlashcardItem[] = initialCards, forceHard = false) => {
    const list = forceHard || isHardMode ? shuffleArray(cardsToUse) : cardsToUse;
    setDeck(list);
    setCurrentIndex(0);
    setCardResults({});
    setTypeInput("");
    setIsFlipped(false);
    setIsCompleted(false);
    setShowHint(false);
    if (forceHard) {
      setIsHardMode(true);
      setActiveMode("type");
    }
  };

  const handleRetryMissed = () => {
    const missedCards = initialCards.filter((c) => {
      const res = cardResults[String(c.id)];
      return !res || !res.isCorrect;
    });
    if (missedCards.length > 0) {
      handleRestartDeck(missedCards);
    } else {
      handleRestartDeck();
    }
  };

  const handleShuffle = () => {
    const shuffled = shuffleArray(deck);
    setDeck(shuffled);
    setCurrentIndex(0);
    setCardResults({});
    setTypeInput("");
    setIsFlipped(false);
    setIsCompleted(false);
  };

  const stats = useMemo(() => {
    let correct = 0;
    let answered = 0;
    let missed = 0;
    Object.values(cardResults).forEach((r) => {
      answered++;
      if (r.isCorrect) correct++;
      else missed++;
    });
    return { correct, answered, missed, total: deck.length };
  }, [cardResults, deck.length]);

  const allCompletedCorrectly = stats.correct === deck.length && isCompleted;

  const content = (
    <div className="space-y-6 font-mono">
      {!isEmbedded && (
        <div className="flex flex-wrap items-center justify-between pb-3 mb-4 border-b border-slate-800/80 gap-2">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
              {heading}
            </h2>
            {description && (
              <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
                {description}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Mode Toolbar & Progress Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 shadow-inner">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">DECK PROGRESS:</span>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
            {isCompleted ? deck.length : currentIndex + 1} / {deck.length}
          </span>
          <span className="text-xs text-slate-400 ml-2">CORRECT:</span>
          <span className="text-xs font-bold text-emerald-400">{stats.correct}</span>
          {stats.missed > 0 && (
            <>
              <span className="text-xs text-slate-400 ml-1">MISSED:</span>
              <span className="text-xs font-bold text-rose-400">{stats.missed}</span>
            </>
          )}
        </div>

        {allowModeSwitch && !isHardMode && (
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-slate-400 mr-1">MODE:</span>
            <button
              type="button"
              onClick={() => setActiveMode("both")}
              className={`px-2 py-1 text-[11px] rounded transition-all cursor-pointer font-bold ${
                activeMode === "both"
                  ? "bg-emerald-500/20 border border-emerald-500 text-emerald-300"
                  : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              Hybrid
            </button>
            <button
              type="button"
              onClick={() => setActiveMode("multiple-choice")}
              className={`px-2 py-1 text-[11px] rounded transition-all cursor-pointer font-bold ${
                activeMode === "multiple-choice"
                  ? "bg-emerald-500/20 border border-emerald-500 text-emerald-300"
                  : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              Multiple Choice
            </button>
            <button
              type="button"
              onClick={() => setActiveMode("type")}
              className={`px-2 py-1 text-[11px] rounded transition-all cursor-pointer font-bold ${
                activeMode === "type"
                  ? "bg-emerald-500/20 border border-emerald-500 text-emerald-300"
                  : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              Type-In
            </button>
          </div>
        )}
      </div>

      {/* Progress Line Track */}
      <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
        <div
          className="h-full bg-emerald-500 transition-all duration-300 shadow-sm shadow-emerald-400"
          style={{
            width: `${
              isCompleted
                ? 100
                : Math.min(100, Math.round(((currentIndex + 1) / deck.length) * 100))
            }%`,
          }}
        />
      </div>

      {/* Summary View upon Deck Completion */}
      {isCompleted ? (
        <div className="p-6 rounded-lg border border-slate-800 bg-slate-900/90 space-y-6">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2">
              <span
                className={`text-sm font-bold px-3 py-1 rounded border ${
                  allCompletedCorrectly
                    ? "bg-emerald-950/80 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/50"
                    : "bg-amber-950/80 border-amber-500 text-amber-400 shadow-lg shadow-amber-950/50"
                }`}
              >
                {allCompletedCorrectly
                  ? "[SESSION_COMPLETE - 100% ACCURACY]"
                  : "[SESSION_COMPLETE - DRILL SUMMARY]"}
              </span>
            </div>

            <div className="text-2xl sm:text-3xl font-bold font-mono">
              SCORE:{" "}
              <span
                className={
                  allCompletedCorrectly ? "text-emerald-400" : "text-amber-400"
                }
              >
                {stats.correct}
              </span>{" "}
              / {stats.total} (
              {Math.round((stats.correct / (stats.total || 1)) * 100)}%)
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
              {allCompletedCorrectly
                ? "Excellent job. You accurately recalled all cards in this flashcard deck."
                : "Good practice round. Review the missed cards below or drill them again to build retention."}
            </p>
          </div>

          {/* Review of Missed Cards */}
          {stats.missed > 0 && (
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h4 className="text-xs font-bold text-rose-400 tracking-wide uppercase">
                [MISSED_CARDS_REVIEW] ({stats.missed} cards)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {deck
                  .filter((c) => {
                    const res = cardResults[String(c.id)];
                    return !res || !res.isCorrect;
                  })
                  .map((c) => (
                    <div
                      key={c.id}
                      className="p-3 rounded border border-rose-950/60 bg-rose-950/20 space-y-1.5 text-xs"
                    >
                      <div className="flex items-center justify-between text-slate-400 text-[10px]">
                        <span>{c.category || "General"}</span>
                        {c.meta && <span>{c.meta}</span>}
                      </div>
                      <div className="text-slate-200 font-semibold">{c.prompt}</div>
                      <div className="text-emerald-400 font-bold">
                        Answer: {c.answer}
                      </div>
                      {c.explanation && (
                        <div className="text-slate-400 text-[11px]">
                          {c.explanation}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              type="button"
              onClick={() => handleRestartDeck(initialCards)}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm rounded-lg shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/20 transition-all cursor-pointer"
            >
              Restart Deck
            </button>

            {stats.missed > 0 && (
              <button
                type="button"
                onClick={handleRetryMissed}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm rounded-lg shadow-lg shadow-amber-950/50 transition-all cursor-pointer"
              >
                Retry Missed ({stats.missed})
              </button>
            )}

            <button
              type="button"
              onClick={() => handleRestartDeck(initialCards, true)}
              className="px-5 py-2.5 border border-emerald-500/40 hover:border-emerald-400 bg-slate-900 hover:bg-slate-800 text-emerald-400 font-bold text-xs sm:text-sm rounded-lg transition-all cursor-pointer"
            >
              {hasEverCompletedOnce || isHardMode
                ? "Practice Mastery (Type-In)"
                : "Practice Type-In Mode"}
            </button>
          </div>
        </div>
      ) : (
        /* Active Flashcard View */
        <div className="space-y-4">
          <div
            className={`p-5 sm:p-7 rounded-xl border transition-all duration-200 shadow-xl ${
              isAnswered
                ? currentResult?.isCorrect
                  ? "border-emerald-500/60 bg-gradient-to-b from-emerald-950/30 to-slate-900/90 shadow-emerald-950/20"
                  : "border-rose-500/60 bg-gradient-to-b from-rose-950/30 to-slate-900/90 shadow-rose-950/20"
                : "border-slate-800 bg-slate-900/90 hover:border-slate-700"
            }`}
          >
            {/* Card Header Badges */}
            <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-800/80 flex-wrap">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/50 border border-emerald-900/60 px-2 py-0.5 rounded">
                  CARD #{currentIndex + 1}
                </span>
                {currentCard.category && (
                  <span className="text-[11px] font-bold text-cyan-400 bg-cyan-950/40 border border-cyan-900/50 px-2 py-0.5 rounded">
                    {currentCard.category}
                  </span>
                )}
                {currentCard.meta && (
                  <span className="text-[11px] text-slate-400 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded">
                    {currentCard.meta}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-400 border border-slate-800 bg-slate-950 px-2 py-0.5 rounded uppercase">
                  {isHardMode
                    ? "MASTERY DRILL"
                    : isCardMultipleChoice
                    ? activeMode === "both"
                      ? `HYBRID MC (${currentIndex + 1}/${hybridChoiceCount})`
                      : "MULTIPLE CHOICE"
                    : "TYPE-IN"}
                </span>
              </div>
            </div>

            {/* Prompt Front */}
            <div className="space-y-4">
              <div className="text-slate-100 text-base sm:text-lg font-bold leading-relaxed">
                {currentCard.prompt}
              </div>

              {/* Hint section */}
              {currentCard.hint && !isAnswered && (
                <div>
                  {!showHint ? (
                    <button
                      type="button"
                      onClick={() => setShowHint(true)}
                      className="text-[11px] text-amber-400/80 hover:text-amber-300 underline cursor-pointer"
                    >
                      Need a hint?
                    </button>
                  ) : (
                    <div className="text-xs text-amber-300/90 bg-amber-950/30 border border-amber-900/40 p-2.5 rounded">
                      <span className="font-bold">HINT:</span> {currentCard.hint}
                    </div>
                  )}
                </div>
              )}

              {/* Answering Interactive Area */}
              <div className="pt-2">
                {isCardMultipleChoice ? (
                  /* Multiple Choice Mode Options */
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentOptions.map((opt, optIdx) => {
                      const isSelected = currentResult?.userAnswer === opt;
                      const isOptionCorrect = validateFlashcardAnswer(currentCard, opt);

                      let btnStyle =
                        "bg-slate-950/80 border-slate-800 text-slate-200 hover:border-emerald-500/50 hover:bg-slate-900";

                      if (isAnswered) {
                        if (isOptionCorrect) {
                          btnStyle =
                            "bg-emerald-950/70 border-emerald-500 text-emerald-300 shadow-sm shadow-emerald-950";
                        } else if (isSelected && !currentResult?.isCorrect) {
                          btnStyle = "bg-rose-950/70 border-rose-500 text-rose-300";
                        } else {
                          btnStyle = "bg-slate-950/40 border-slate-900 text-slate-500 opacity-60";
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectOption(opt)}
                          disabled={isAnswered}
                          className={`p-3 rounded-lg border text-left text-xs sm:text-sm font-mono transition-all flex items-start gap-2.5 cursor-pointer disabled:cursor-default ${btnStyle}`}
                        >
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-400 shrink-0">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="flex-1 break-words">{opt}</span>
                          {isAnswered && isOptionCorrect && (
                            <span className="text-[10px] font-bold text-emerald-400 shrink-0">
                              [CORRECT]
                            </span>
                          )}
                          {isAnswered && isSelected && !currentResult?.isCorrect && (
                            <span className="text-[10px] font-bold text-rose-400 shrink-0">
                              [INCORRECT]
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  /* Type-In Mode Input Form */
                  <form onSubmit={handleSubmitTypeAnswer} className="space-y-3">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        ref={inputRef}
                        type="text"
                        value={typeInput}
                        onChange={(e) => setTypeInput(e.target.value)}
                        disabled={isAnswered}
                        placeholder={
                          isAnswered
                            ? "Answer evaluated"
                            : "Type your answer here and press Enter..."
                        }
                        className={`flex-1 px-3.5 py-2.5 rounded-lg border bg-slate-950 text-xs sm:text-sm font-mono transition-all focus:outline-none ${
                          isAnswered
                            ? currentResult?.isCorrect
                              ? "border-emerald-500 text-emerald-300"
                              : "border-rose-500 text-rose-300"
                            : "border-slate-800 text-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                        }`}
                      />
                      {!isAnswered && (
                        <button
                          type="submit"
                          disabled={!typeInput.trim()}
                          className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:hover:bg-emerald-500 text-slate-950 font-bold text-xs sm:text-sm rounded-lg transition-all cursor-pointer disabled:cursor-not-allowed"
                        >
                          Submit
                        </button>
                      )}
                    </div>
                  </form>
                )}
              </div>

              {/* Flipped Answer & Explanation Panel */}
              {isFlipped && (
                <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-800 space-y-2 mt-4 transition-all">
                  <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-900">
                    <span className="font-bold text-emerald-400 uppercase tracking-wider">
                      [CORRECT_ANSWER]
                    </span>
                    {currentResult && (
                      <span
                        className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                          currentResult.isCorrect
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                            : "bg-rose-950 text-rose-400 border border-rose-800"
                        }`}
                      >
                        {currentResult.isCorrect ? "CORRECT" : "INCORRECT"}
                      </span>
                    )}
                  </div>

                  <div className="text-emerald-300 text-sm sm:text-base font-bold">
                    {currentCard.answer}
                  </div>

                  {currentCard.explanation && (
                    <div className="text-xs text-slate-400 pt-1 leading-relaxed">
                      {currentCard.explanation}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Card Navigation Footer */}
            <div className="flex items-center justify-between gap-3 pt-6 mt-6 border-t border-slate-800/80 flex-wrap">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevCard}
                  disabled={currentIndex === 0}
                  className="px-3.5 py-1.5 rounded bg-slate-950 border border-slate-800 hover:border-slate-700 disabled:opacity-30 disabled:hover:border-slate-800 text-slate-300 text-xs font-bold transition-all cursor-pointer disabled:cursor-not-allowed"
                >
                  &larr; Prev
                </button>
                <button
                  type="button"
                  onClick={handleShuffle}
                  className="px-3.5 py-1.5 rounded bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 text-xs transition-all cursor-pointer"
                >
                  Shuffle
                </button>
              </div>

              <div className="flex items-center gap-2">
                {!isAnswered ? (
                  <button
                    type="button"
                    onClick={handleRevealWithoutAnswer}
                    className="px-3.5 py-1.5 rounded bg-slate-950 border border-amber-800/60 hover:border-amber-600 text-amber-400 text-xs transition-all cursor-pointer"
                  >
                    Reveal Answer
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="px-3.5 py-1.5 rounded bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 text-xs transition-all cursor-pointer"
                  >
                    {isFlipped ? "Hide Card Back" : "Show Card Back"}
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleNextCard}
                  className="px-5 py-1.5 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-bold shadow-md shadow-emerald-950/40 transition-all cursor-pointer"
                >
                  {currentIndex === deck.length - 1 ? "Finish Deck" : "Next Card \u2192"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (hideHeader || isEmbedded) {
    return content;
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-8 font-mono">
      {title && (
        <QuizHeader
          moduleTag={moduleTag}
          moduleCode={moduleCode}
          title={title}
          studyGuideHref={studyGuideHref}
        />
      )}
      <main className="w-full max-w-4xl terminal-box border-l-4 border-l-emerald-500 shadow-2xl space-y-6">
        {content}
      </main>
    </div>
  );
}
