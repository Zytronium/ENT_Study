"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import Link from "next/link";
import { ActivePracticeItem, MasterTableActivity } from "@/lib/practice-test/types";
import { generatePracticeTest } from "@/lib/practice-test/generator";
import { ExamSubmissionResponse, GlobalAnalyticsResponse } from "@/lib/practice-test/analytics-types";
import ReusableTableQuiz, { checkCellCorrect, isCellEligible } from "./ReusableTableQuiz";
import WireOrderingActivity, { Wire } from "./WireOrderingActivity";

export default function PracticeTestRunner() {
  const [items, setItems] = useState<ActivePracticeItem[]>(() => generatePracticeTest());

  // Answers state
  const [questionAnswers, setQuestionAnswers] = useState<Record<string, string>>({});
  const [tableAnswers, setTableAnswers] = useState<Record<string, Record<string, string>>>({});
  const [wireOrders, setWireOrders] = useState<Record<string, Wire[]>>({});

  const [showResults, setShowResults] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "incorrect" | "activities">("all");

  // Analytics state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<ExamSubmissionResponse | null>(null);
  const [globalStats, setGlobalStats] = useState<GlobalAnalyticsResponse | null>(null);

  useEffect(() => {
    fetch("/api/practice-test/analytics")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load analytics");
        return res.json();
      })
      .then((data: GlobalAnalyticsResponse) => {
        setGlobalStats(data);
      })
      .catch((err) => {
        console.warn("Could not load global test analytics:", err);
      });
  }, []);

  const totalPoints = useMemo(() => {
    return items.reduce((sum, item) => sum + item.points, 0);
  }, [items]);

  // Scoring logic
  const { score, itemResults } = useMemo(() => {
    let earned = 0;
    const results: Record<string, { correct: boolean; earnedPoints: number; maxPoints: number }> = {};

    items.forEach((item) => {
      if (item.type === "question") {
        const userVal = (questionAnswers[item.id] || "").trim().toLowerCase();
        const correctVal = item.answer.trim().toLowerCase();
        let isCorrect = userVal === correctVal;

        if (!isCorrect && item.aliases && item.aliases.length > 0) {
          const norm = userVal.replace(/[\s-]+/g, "");
          isCorrect = item.aliases.some((alias) => alias.toLowerCase().replace(/[\s-]+/g, "") === norm);
        }

        const pts = isCorrect ? item.points : 0;
        earned += pts;
        results[item.id] = { correct: isCorrect, earnedPoints: pts, maxPoints: item.points };
      } else if (item.type === "activity") {
        if (item.activity.type === "wire-ordering") {
          const order = wireOrders[item.id] || [];
          const isCorrect = order.length === 8 && order.every((w, idx) => w.position === idx + 1);
          const correctPins = order.filter((w, idx) => w.position === idx + 1).length;
          const pts = isCorrect ? item.points : Math.floor((correctPins / 8) * item.points);
          earned += pts;
          results[item.id] = { correct: isCorrect, earnedPoints: pts, maxPoints: item.points };
        } else if (item.activity.type === "table") {
          const tAct = item.activity as MasterTableActivity;
          const userAns = tableAnswers[item.id] || {};

          let eligibleCount = 0;

          tAct.rows.forEach((row) => {
            tAct.columns.forEach((col) => {
              const cellVal = String(row[col.key] ?? "");
              if (isCellEligible(cellVal)) {
                eligibleCount++;
              }
            });
          });

          const totalBlanks = Math.max(1, Math.round(eligibleCount * (2 / 3)));
          let blanksCorrect = 0;
          Object.keys(userAns).forEach((key) => {
            const parts = key.split("_");
            const rowId = parts[0];
            const colKey = parts.slice(1).join("_");
            const row = tAct.rows.find((r) => String(r.id) === String(rowId));
            const correctVal = row ? String(row[colKey] ?? "") : "";
            if (checkCellCorrect(correctVal, userAns[key], colKey)) {
              blanksCorrect++;
            }
          });

          const isPassed = blanksCorrect >= totalBlanks;
          const pts = isPassed ? item.points : Math.floor((blanksCorrect / totalBlanks) * item.points);
          earned += pts;
          results[item.id] = { correct: isPassed, earnedPoints: pts, maxPoints: item.points };
        }
      }
    });

    return {
      score: earned,
      itemResults: results,
    };
  }, [items, questionAnswers, tableAnswers, wireOrders]);

  const handleSelectOption = (itemId: string, option: string) => {
    if (showResults) return;
    setQuestionAnswers((prev) => ({ ...prev, [itemId]: option }));
  };

  const handleTableAnswersChange = useCallback((itemId: string, ans: Record<string, string>) => {
    setTableAnswers((prev) => ({ ...prev, [itemId]: ans }));
  }, []);

  const handleWireOrderChange = useCallback((itemId: string, order: Wire[]) => {
    setWireOrders((prev) => ({ ...prev, [itemId]: order }));
  }, []);

  const handleResetAndGenerateNew = () => {
    setShowResults(false);
    setSubmissionResult(null);
    setIsSubmitting(false);
    setQuestionAnswers({});
    setTableAnswers({});
    setWireOrders({});
    setItems(generatePracticeTest());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRetakeSame = () => {
    setShowResults(false);
    setSubmissionResult(null);
    setIsSubmitting(false);
    setQuestionAnswers({});
    setTableAnswers({});
    setWireOrders({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmitTest = async () => {
    setShowResults(true);
    setIsSubmitting(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    try {
      const res = await fetch("/api/practice-test/attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score, totalPoints }),
      });
      if (res.ok) {
        const data: ExamSubmissionResponse = await res.json();
        setSubmissionResult(data);
        if (data.stats) {
          setGlobalStats((prev) => ({
            totalAttempts: data.stats!.totalAttempts,
            averagePercentage: data.stats!.averagePercentage,
            averageScore: prev?.averageScore ?? Math.round((data.stats!.averagePercentage / 100) * 60 * 10) / 10,
            passRate: data.stats!.passRate,
          }));
        }
      } else {
        setSubmissionResult({ success: true, offline: true });
      }
    } catch {
      setSubmissionResult({ success: true, offline: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredItems = useMemo(() => {
    if (activeFilter === "incorrect" && showResults) {
      return items.filter((item) => !itemResults[item.id]?.correct || (itemResults[item.id]?.earnedPoints < itemResults[item.id]?.maxPoints));
    }
    if (activeFilter === "activities") {
      return items.filter((item) => item.type === "activity");
    }
    return items;
  }, [items, activeFilter, showResults, itemResults]);

  const percentage = Math.round((score / totalPoints) * 100);
  const isPassing = percentage >= 80;

  return (
    <div className="min-h-screen flex flex-col items-center pt-8 pb-12 px-3 sm:px-6 sm:py-8 w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <header className="w-full max-w-5xl mb-8 cyber-glass-panel p-4 sm:p-6 rounded-xl border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500/20 via-emerald-400 to-cyan-500/20" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6">
          <div className="w-full md:w-auto">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="cyber-badge cyber-badge-emerald shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                MASTER_EVALUATION
              </span>
              <span className="text-xs font-mono text-slate-500 hidden xs:inline">{"//"}</span>
              <span className="text-[11px] sm:text-xs font-mono text-cyan-400 break-all xs:break-normal">
                CCNA_COMPREHENSIVE_ASSESSMENT
              </span>
            </div>
            <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-white flex flex-wrap items-baseline gap-2 sm:gap-3 font-mono">
              <span className="text-emerald-400">ENT_PRACTICE_TEST</span>
              <span className="text-slate-600 font-light hidden sm:inline">|</span>
              <span className="text-slate-300 text-lg sm:text-2xl font-semibold">60-Point Master Exam</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-mono">
              Randomized evaluation pulled from all study modules. Includes interactive activities and alternate question formulations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-start md:justify-end shrink-0">
            {/* Hub Link */}
            <Link
              href="/"
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              {"<"} BACK TO HUB
            </Link>
          </div>
        </div>

        {/* Telemetry Bar */}
        <div className="mt-5 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="text-slate-600">EXAM_ITEMS:</span>
              <span className="text-cyan-400 font-bold">{items.length} Units ({totalPoints} Points Total)</span>
            </span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="flex items-center gap-1.5">
              <span className="text-slate-600">ACTIVITIES:</span>
              <span className="text-emerald-400 font-bold">
                {items.filter((i) => i.type === "activity").length} (10 pts each)
              </span>
            </span>
            {globalStats && globalStats.totalAttempts > 0 && (
              <>
                <span className="hidden sm:inline text-slate-700">|</span>
                <span className="flex items-center gap-1.5">
                  <span className="text-slate-600">COMMUNITY_TELEMETRY:</span>
                  <span className="text-cyan-400 font-bold">{globalStats.totalAttempts.toLocaleString()} Attempts</span>
                  <span className="text-slate-500">({globalStats.averagePercentage}% Avg)</span>
                </span>
              </>
            )}
          </div>

          {showResults && (
            <div className="flex items-center gap-2">
              <span className="text-slate-500">FINAL SCORE:</span>
              <span
                className={`font-bold px-2 py-0.5 rounded border ${
                  isPassing
                    ? "bg-emerald-950/40 border-emerald-900 text-emerald-400"
                    : "bg-rose-950/40 border-rose-900 text-rose-400"
                }`}
              >
                {score} / {totalPoints} ({percentage}%)
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-5xl space-y-6">
        {/* Results Banner (when submitted) */}
        {showResults && (
          <section className="terminal-box border-l-4 border-l-emerald-500 p-6 shadow-2xl bg-slate-950/95 space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-slate-500 tracking-wider">{"// EXAM_DIAGNOSTIC_REPORT"}</span>
                <h2 className="text-xl sm:text-2xl font-bold font-mono text-white mt-0.5 flex items-center gap-2">
                  <span className={isPassing ? "text-emerald-400" : "text-amber-400"}>
                    {isPassing ? "[PASS] CERTIFICATION READINESS DEMONSTRATED" : "[REVIEW] FURTHER STUDY RECOMMENDED"}
                  </span>
                </h2>
              </div>
              <div className="text-right flex flex-col items-start md:items-end">
                <span className="text-3xl font-bold font-mono text-white">
                  {score} <span className="text-sm font-normal text-slate-500">/ {totalPoints} PTS</span>
                </span>
                <span className={`text-xs font-mono font-bold ${isPassing ? "text-emerald-400" : "text-amber-400"}`}>
                  {percentage}% OVERALL ACCURACY
                </span>
              </div>
            </div>

            {/* Percentile Rank Telemetry */}
            <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-slate-500">{"//"} PERCENTILE_RANK:</span>
                {isSubmitting ? (
                  <span className="text-cyan-400 font-bold">[SYNCING TELEMETRY...]</span>
                ) : submissionResult && !submissionResult.offline && typeof submissionResult.percentile === "number" ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800 text-cyan-300 font-bold">
                      TOP {Math.max(1, Math.round(100 - submissionResult.percentile))}%
                    </span>
                    <span className="text-slate-400">
                      Scored higher than {submissionResult.percentile}% of all {submissionResult.stats?.totalAttempts ? `${submissionResult.stats.totalAttempts.toLocaleString()} ` : ""}recorded attempts
                    </span>
                  </div>
                ) : (
                  <span className="text-slate-400">
                    [OFFLINE_MODE] Score calculated locally. Database telemetry offline.
                  </span>
                )}
              </div>
              {globalStats && globalStats.totalAttempts > 0 && !submissionResult?.offline && (
                <div className="text-slate-400 text-[11px] shrink-0">
                  <span className="text-slate-600">GLOBAL_AVG:</span>{" "}
                  <span className="text-emerald-400 font-bold">{globalStats.averagePercentage}%</span>
                  <span className="text-slate-700 mx-1.5">|</span>
                  <span className="text-slate-600">PASS_RATE:</span>{" "}
                  <span className="text-cyan-400 font-bold">{globalStats.passRate}%</span>
                </div>
              )}
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-slate-500">FILTER VIEW:</span>
                <button
                  type="button"
                  onClick={() => setActiveFilter("all")}
                  className={`px-2.5 py-1 rounded border transition-colors ${
                    activeFilter === "all"
                      ? "bg-slate-800 border-slate-600 text-emerald-400 font-bold"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  All ({items.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter("incorrect")}
                  className={`px-2.5 py-1 rounded border transition-colors ${
                    activeFilter === "incorrect"
                      ? "bg-slate-800 border-slate-600 text-rose-400 font-bold"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  Incorrect ({items.filter((i) => !itemResults[i.id]?.correct || itemResults[i.id]?.earnedPoints < itemResults[i.id]?.maxPoints).length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter("activities")}
                  className={`px-2.5 py-1 rounded border transition-colors ${
                    activeFilter === "activities"
                      ? "bg-slate-800 border-slate-600 text-cyan-400 font-bold"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  Activities ({items.filter((i) => i.type === "activity").length})
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRetakeSame}
                  className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono font-bold transition-colors"
                >
                  [RETRY THIS TEST]
                </button>
                <button
                  type="button"
                  onClick={handleResetAndGenerateNew}
                  className="px-3 py-1.5 rounded-lg border border-emerald-500/50 bg-emerald-950/40 hover:bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold transition-colors"
                >
                  [GENERATE NEW RANDOM TEST]
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Practice Test Questions List */}
        <section className="space-y-6">
          {filteredItems.map((item, idx) => {
            const itemResult = itemResults[item.id];
            const isFullScore = itemResult?.earnedPoints === item.points;
            const hasPartial = itemResult?.earnedPoints > 0 && !isFullScore;

            let borderClass = "border-slate-800";
            if (showResults) {
              if (isFullScore) {
                borderClass = "border-emerald-500/60";
              } else if (hasPartial) {
                borderClass = "border-amber-500/60";
              } else {
                borderClass = "border-rose-500/60";
              }
            }

            return (
              <div
                key={item.id}
                className={`terminal-box ${borderClass} shadow-lg p-5 sm:p-6 transition-all space-y-4`}
              >
                {/* Item Top Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-950 border border-slate-700 text-slate-300">
                      ITEM #{idx + 1}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {showResults && (
                      <span
                        className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                          isFullScore
                            ? "bg-emerald-950/40 border-emerald-900 text-emerald-400"
                            : hasPartial
                            ? "bg-amber-950/40 border-amber-900 text-amber-400"
                            : "bg-rose-950/40 border-rose-900 text-rose-400"
                        }`}
                      >
                        {itemResult?.earnedPoints > 0 ? `+${itemResult.earnedPoints}/${item.points} PTS` : `0/${item.points} PTS`}
                      </span>
                    )}
                    <span className="text-xs font-mono text-slate-500">
                      WORTH {item.points} POINTS
                    </span>
                  </div>
                </div>

                {/* Render Standalone Question */}
                {item.type === "question" && (
                  <div className="space-y-4">
                    <p className="text-sm sm:text-base font-mono text-slate-100 leading-relaxed font-semibold">
                      {item.prompt}
                    </p>

                    {/* Multiple Choice Options */}
                    <div className="grid grid-cols-1 gap-2.5 pt-1">
                      {item.options.map((option) => {
                        const isSelected = questionAnswers[item.id] === option;
                        let optStyle =
                          "border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 hover:border-slate-700 text-slate-300";

                        if (showResults) {
                          const isThisCorrect = option === item.answer;
                          if (isThisCorrect) {
                            optStyle = "border-emerald-500/80 bg-emerald-950/30 text-emerald-300 font-bold";
                          } else if (isSelected && !isThisCorrect) {
                            optStyle = "border-rose-500/80 bg-rose-950/30 text-rose-300";
                          } else {
                            optStyle = "border-slate-900 bg-slate-950/40 text-slate-500 opacity-60";
                          }
                        } else if (isSelected) {
                          optStyle =
                            "border-emerald-500 bg-emerald-950/40 text-emerald-300 font-bold shadow-sm";
                        }

                        return (
                          <button
                            key={option}
                            type="button"
                            disabled={showResults}
                            onClick={() => handleSelectOption(item.id, option)}
                            className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm font-mono transition-all flex items-center justify-between gap-3 cursor-pointer disabled:cursor-default ${optStyle}`}
                          >
                            <span>{option}</span>
                            <span
                              className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                                isSelected
                                  ? "border-emerald-400 bg-emerald-400"
                                  : "border-slate-700"
                              }`}
                            >
                              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation and Expected Answer on Results */}
                    {showResults && (
                      <div className="mt-3 p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 font-mono text-xs space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 font-bold">CORRECT ANSWER:</span>
                          <span className="text-emerald-400 font-bold">{item.answer}</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed pt-1 border-t border-slate-800/80">
                          {item.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Render Interactive Table Activity */}
                {item.type === "activity" && item.activity.type === "table" && (
                  <ReusableTableQuiz
                    id={item.activity.id}
                    title={item.activity.title}
                    description={item.activity.description}
                    columns={item.activity.columns}
                    rows={item.activity.rows}
                    userAnswers={tableAnswers[item.id] || {}}
                    onAnswersChange={(ans) => handleTableAnswersChange(item.id, ans)}
                    showResults={showResults}
                  />
                )}

                {/* Render Wire Ordering Activity */}
                {item.type === "activity" && item.activity.type === "wire-ordering" && (
                  <WireOrderingActivity
                    order={wireOrders[item.id]}
                    onOrderChange={(order) => handleWireOrderChange(item.id, order)}
                    showResults={showResults}
                  />
                )}
              </div>
            );
          })}
        </section>

        {/* Bottom Submission Action Bar */}
        <section className="terminal-box p-6 border border-slate-800 bg-slate-950/95 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono text-slate-400">
            {!showResults ? (
              <span>
                Answer all questions and interactive activity matrices above, then submit for automated grading.
              </span>
            ) : (
              <span>
                Assessment complete. Review highlighted questions or generate a new randomized 30-question test.
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {!showResults ? (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmitTest}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-800 text-slate-950 font-mono text-sm font-bold shadow-lg shadow-emerald-950/40 hover:shadow-emerald-900/60 transition-all cursor-pointer disabled:cursor-not-allowed"
              >
                {isSubmitting ? "[EVALUATING & SYNCING...]" : "[SUBMIT PRACTICE TEST FOR EVALUATION]"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleResetAndGenerateNew}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-sm font-bold shadow-lg transition-all cursor-pointer"
              >
                [TAKE NEW RANDOMIZED TEST]
              </button>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
