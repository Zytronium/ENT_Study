"use client";

import { useState, useMemo, useCallback } from "react";
import QuizHeader from "./QuizHeader";
import { checkCellCorrect, isCellEligible } from "@/components/practice-test/ReusableTableQuiz";

export interface TableColumn {
  key: string;
  label: string;
}

export interface CellSegment {
  key: string;
  label: string;
  value: string;
  options?: string[];
}

export interface TableRow {
  id: number | string;
  [key: string]: unknown;
  /**
   * Special feature for 802.3 chart (or any multi-value cell)
   * Map of colKey -> CellSegment[]
   */
  cellSegments?: Record<string, CellSegment[]>;
}

export interface TableWithBlanksQuizProps {
  moduleTag?: string;
  moduleCode?: string;
  title?: string;
  heading?: string;
  description?: string;
  studyGuideHref?: string;
  columns: TableColumn[];
  rows: TableRow[];
  columnOptions?: Record<string, string[]>;
  blankCountsByStage?: number[];
  initialHardMode?: boolean;
  isEmbedded?: boolean;
  hideHeader?: boolean;
  allowAnyRowOrder?: boolean;
  onValidateSection?: (allCorrect: boolean, score: number, total: number) => void;
}

export function getBestRowMapping(
  rows: TableRow[],
  columns: TableColumn[],
  blankKeys: Set<string>,
  answers: Record<string, string>,
  useTextInput: boolean
): number[] {
  const n = rows.length;
  if (n <= 1) return rows.map((_, i) => i);

  const perms: number[][] = [];
  const current: number[] = [];
  const used: boolean[] = new Array(n).fill(false);

  function generatePerms() {
    if (current.length === n) {
      perms.push([...current]);
      return;
    }
    for (let i = 0; i < n; i++) {
      if (!used[i]) {
        used[i] = true;
        current.push(i);
        generatePerms();
        current.pop();
        used[i] = false;
      }
    }
  }
  generatePerms();

  let bestScore = -Infinity;
  let bestPerm = rows.map((_, i) => i);
  let bestIdentityMatches = -1;

  for (const perm of perms) {
    let score = 0;
    let identityMatches = 0;

    for (let r = 0; r < n; r++) {
      const targetIdx = perm[r];
      const targetRow = rows[targetIdx];
      const physicalRow = rows[r];
      if (targetIdx === r) identityMatches++;

      for (const col of columns) {
        const segs = physicalRow.cellSegments?.[col.key];
        const targetSegs = targetRow.cellSegments?.[col.key];

        if (segs && segs.length > 0 && targetSegs && targetSegs.length > 0) {
          segs.forEach((seg, sIdx) => {
            const cellKey = `${physicalRow.id}_${col.key}__${seg.key}`;
            const targetSegVal = targetSegs[sIdx]?.value || "";
            if (blankKeys.has(cellKey)) {
              const userVal = answers[cellKey] || "";
              if (userVal) {
                const isRight = useTextInput
                  ? checkCellCorrect(targetSegVal, userVal, col.key)
                  : userVal === targetSegVal;
                if (isRight) score += 1;
              }
            } else {
              // Fixed cell
              if (seg.value === targetSegVal) {
                score += 10;
              } else {
                score -= 1000;
              }
            }
          });
        } else {
          const cellKey = `${physicalRow.id}_${col.key}`;
          const targetVal = String(targetRow[col.key] ?? "");
          if (blankKeys.has(cellKey)) {
            const userVal = answers[cellKey] || "";
            if (userVal) {
              const isRight = useTextInput
                ? checkCellCorrect(targetVal, userVal, col.key)
                : userVal === targetVal;
              if (isRight) score += 1;
            }
          } else {
            // Fixed cell
            const fixedVal = String(physicalRow[col.key] ?? "");
            if (fixedVal === targetVal) {
              score += 10;
            } else {
              score -= 1000;
            }
          }
        }
      }
    }

    if (
      score > bestScore ||
      (score === bestScore && identityMatches > bestIdentityMatches)
    ) {
      bestScore = score;
      bestPerm = perm;
      bestIdentityMatches = identityMatches;
    }
  }

  return bestPerm;
}

export default function TableWithBlanksQuiz({
  moduleTag = "DIAGNOSTIC_MODULE",
  moduleCode,
  title,
  heading = "[STANDARDS_MATRIX_TABLE_CHALLENGE]",
  description,
  studyGuideHref,
  columns,
  rows: initialRows,
  columnOptions = {},
  blankCountsByStage,
  initialHardMode = false,
  isEmbedded = false,
  hideHeader = false,
  allowAnyRowOrder = false,
  onValidateSection,
}: TableWithBlanksQuizProps) {
  // Collect all eligible blank keys across all rows (including segments)
  const allEligibleKeys = useMemo(() => {
    const keys: string[] = [];
    initialRows.forEach((row) => {
      columns.forEach((col) => {
        const segs = row.cellSegments?.[col.key];
        if (segs && segs.length > 0) {
          segs.forEach((seg) => {
            if (isCellEligible(seg.value)) {
              keys.push(`${row.id}_${col.key}__${seg.key}`);
            }
          });
        } else {
          const val = row[col.key];
          if (isCellEligible(val)) {
            keys.push(`${row.id}_${col.key}`);
          }
        }
      });
    });
    return keys;
  }, [initialRows, columns]);

  const stages = useMemo(() => {
    if (blankCountsByStage && blankCountsByStage.length > 0) {
      return blankCountsByStage;
    }
    const total = allEligibleKeys.length;
    if (total <= 6) return [total];
    if (total <= 12) return [Math.ceil(total / 2), total];
    if (total <= 20) return [Math.ceil(total / 3), Math.ceil((total * 2) / 3), total];
    return [
      Math.ceil(total * 0.25),
      Math.ceil(total * 0.5),
      Math.ceil(total * 0.75),
      total,
    ];
  }, [blankCountsByStage, allEligibleKeys.length]);

  const [currentStageIndex, setCurrentStageIndex] = useState(() =>
    initialHardMode ? stages.length - 1 : 0
  );
  const rows = initialRows;
  const [isHardMode, setIsHardMode] = useState(initialHardMode);
  const [hasCompletedOnce, setHasCompletedOnce] = useState(initialHardMode);

  // Helper to generate a blank set for a given stage
  const generateBlanks = useCallback(
    (targetStageIdx: number) => {
      const targetCount = stages[Math.min(targetStageIdx, stages.length - 1)];
      const selected = new Set<string>();

      // Try picking at least one cell per row if targetCount >= rows.length
      if (targetCount >= rows.length) {
        rows.forEach((row) => {
          const rowKeys: string[] = [];
          columns.forEach((col) => {
            const segs = row.cellSegments?.[col.key];
            if (segs && segs.length > 0) {
              segs.forEach((seg) => {
                if (isCellEligible(seg.value)) {
                  rowKeys.push(`${row.id}_${col.key}__${seg.key}`);
                }
              });
            } else if (isCellEligible(row[col.key])) {
              rowKeys.push(`${row.id}_${col.key}`);
            }
          });
          if (rowKeys.length > 0) {
            const randomKey = rowKeys[Math.floor(Math.random() * rowKeys.length)];
            selected.add(randomKey);
          }
        });
      }

      const remaining = allEligibleKeys
        .filter((k) => !selected.has(k))
        .sort(() => Math.random() - 0.5);

      for (const k of remaining) {
        if (selected.size >= targetCount) break;
        selected.add(k);
      }

      return selected;
    },
    [rows, columns, stages, allEligibleKeys]
  );

  const [blankKeys, setBlankKeys] = useState<Set<string>>(() =>
    generateBlanks(initialHardMode ? stages.length - 1 : 0)
  );
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const useTextInput = initialHardMode || isHardMode || hasCompletedOnce || currentStageIndex >= 1;

  const handleCellChange = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const rowMapping = useMemo(() => {
    if (!allowAnyRowOrder) {
      return rows.map((_, i) => i);
    }
    return getBestRowMapping(rows, columns, blankKeys, answers, useTextInput);
  }, [allowAnyRowOrder, rows, columns, blankKeys, answers, useTextInput]);

  // Evaluation
  const results = useMemo(() => {
    const map: Record<string, boolean> = {};
    let correct = 0;
    const blankList = Array.from(blankKeys);

    blankList.forEach((key) => {
      let correctVal = "";
      const colKey = key.includes("__")
        ? key.split("__")[0].split("_").slice(1).join("_")
        : key.split("_").slice(1).join("_");

      if (key.includes("__")) {
        const [mainPart, segKey] = key.split("__");
        const [rowId] = mainPart.split("_");
        const physicalRowIdx = rows.findIndex((r) => String(r.id) === String(rowId));
        const targetRow = physicalRowIdx !== -1 ? rows[rowMapping[physicalRowIdx]] : undefined;
        const segs = targetRow?.cellSegments?.[colKey];
        const seg = segs?.find((s) => s.key === segKey);
        correctVal = seg ? seg.value : "";
      } else {
        const [rowId] = key.split("_");
        const physicalRowIdx = rows.findIndex((r) => String(r.id) === String(rowId));
        const targetRow = physicalRowIdx !== -1 ? rows[rowMapping[physicalRowIdx]] : undefined;
        correctVal = targetRow ? String(targetRow[colKey] ?? "") : "";
      }

      const userVal = answers[key] || "";
      const isRight = checkCellCorrect(correctVal, userVal, colKey);
      map[key] = isRight;
      if (isRight) correct++;
    });

    return { map, correct, total: blankList.length };
  }, [blankKeys, answers, rows, rowMapping]);

  const allCorrect = results.total > 0 && results.correct === results.total;

  const handleValidate = () => {
    setShowResults(true);
    if (allCorrect) {
      setHasCompletedOnce(true);
    }
    onValidateSection?.(allCorrect, results.correct, results.total);
  };

  const handleNextStage = () => {
    const nextStageIdx = currentStageIndex + 1;
    if (nextStageIdx < stages.length) {
      setCurrentStageIndex(nextStageIdx);
      setBlankKeys(generateBlanks(nextStageIdx));
      setAnswers({});
      setShowResults(false);
    } else {
      // Reached final stage - repeat final stage with new blanks
      setIsHardMode(true);
      setCurrentStageIndex(stages.length - 1);
      setBlankKeys(generateBlanks(stages.length - 1));
      setAnswers({});
      setShowResults(false);
    }
  };

  const handleResetStage = () => {
    setAnswers({});
    setShowResults(false);
    setBlankKeys(generateBlanks(currentStageIndex));
  };

  const content = (
    <div className="space-y-6 font-mono">
      {/* Quiz Header & Stage Bar */}
      <div className="flex flex-wrap items-center justify-between pb-3 mb-4 border-b border-slate-800/80 gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-base sm:text-lg font-bold text-emerald-400 font-mono">{heading}</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/40 border border-cyan-900/50 px-2 py-1 rounded">
            STAGE {currentStageIndex + 1} / {stages.length}
          </span>
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
      </div>

      {description && (
        <p className="text-xs sm:text-sm text-slate-400 font-mono">
          {description}
        </p>
      )}

      {/* Table Container with horizontal scroll */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/90 shadow-inner">
        <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
          <thead>
            <tr className="bg-slate-900/90 border-b border-slate-800 text-emerald-400">
              {columns.map((col) => (
                <th key={col.key} className="p-3 font-bold border-r border-slate-800/60 last:border-r-0 whitespace-nowrap">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {rows.map((row, rowIdx) => {
              const targetRow = rows[rowMapping[rowIdx]];
              return (
                <tr
                  key={row.id}
                  className={`transition-colors ${
                    rowIdx % 2 === 0 ? "bg-slate-900/20" : "bg-slate-900/40"
                  } hover:bg-slate-800/30`}
                >
                  {columns.map((col) => {
                    const segs = row.cellSegments?.[col.key];

                    // Dual / Multi-segment cell feature (e.g. 802.3 10GBase-T distance)
                    if (segs && segs.length > 0) {
                      const targetSegs = targetRow?.cellSegments?.[col.key];
                      return (
                        <td key={col.key} className="p-2 border-r border-slate-800/60 last:border-r-0 align-top min-w-[140px]">
                          <div className="space-y-1.5">
                            {segs.map((seg) => {
                              const cellKey = `${row.id}_${col.key}__${seg.key}`;
                              const isBlank = blankKeys.has(cellKey);
                              const userVal = answers[cellKey] || "";
                              const isCorrect = results.map[cellKey];
                              const targetSeg = targetSegs?.find((s) => s.key === seg.key);
                              const expectedSegVal = targetSeg ? targetSeg.value : seg.value;

                              const segStateClass = showResults
                                ? isCorrect
                                  ? "border-emerald-500 text-emerald-400 font-bold bg-emerald-950/20"
                                  : "border-rose-500 text-rose-400 font-bold bg-rose-950/20"
                                : userVal
                                ? "border-emerald-500/70 text-slate-100 bg-slate-900"
                                : "border-slate-700 hover:border-emerald-500/50 text-slate-300 bg-slate-900";

                              return (
                                <div key={seg.key} className="p-1.5 bg-slate-900/80 rounded border border-slate-800/60 flex flex-col gap-1">
                                  <span className="block text-[10px] text-slate-400 font-semibold">
                                    {seg.label}:
                                  </span>
                                  {isBlank ? (
                                    useTextInput ? (
                                      <input
                                        type="text"
                                        value={userVal}
                                        onChange={(e) => handleCellChange(cellKey, e.target.value)}
                                        disabled={showResults}
                                        placeholder="Type answer..."
                                        className={`w-full border p-1.5 text-xs rounded font-mono outline-none transition-colors ${segStateClass}`}
                                      />
                                    ) : (
                                      <select
                                        value={userVal}
                                        onChange={(e) => handleCellChange(cellKey, e.target.value)}
                                        disabled={showResults}
                                        className={`w-full border p-1.5 text-xs rounded font-mono outline-none transition-colors ${segStateClass}`}
                                      >
                                        <option value="">-- Select --</option>
                                        {(seg.options || columnOptions[col.key] || []).map((opt) => (
                                          <option key={opt} value={opt}>
                                            {opt}
                                          </option>
                                        ))}
                                      </select>
                                    )
                                  ) : (
                                    <span className={`text-slate-300 font-mono text-xs ${!isCellEligible(seg.value) ? "text-slate-600 italic" : ""}`}>
                                      {seg.value}
                                    </span>
                                  )}
                                  {showResults && isBlank && !isCorrect && (
                                    <span className="text-[10px] text-rose-400 font-mono leading-tight">
                                      Expected: {expectedSegVal}
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </td>
                      );
                    }

                    // Standard single cell
                    const cellKey = `${row.id}_${col.key}`;
                    const isBlank = blankKeys.has(cellKey);
                    const rawVal = row[col.key];
                    const targetVal = targetRow ? targetRow[col.key] : rawVal;
                    const userVal = answers[cellKey] || "";
                    const isCorrect = results.map[cellKey];
                    const options = columnOptions[col.key] || [];

                    if (!isBlank) {
                      return (
                        <td
                          key={col.key}
                          className={`p-3 border-r border-slate-800/60 last:border-r-0 text-slate-300 font-mono ${
                            !isCellEligible(rawVal) ? "text-slate-600 italic" : ""
                          }`}
                        >
                          {String(rawVal ?? "-")}
                        </td>
                      );
                    }

                    const stateClass = showResults
                      ? isCorrect
                        ? "border-emerald-500 text-emerald-400 font-bold bg-emerald-950/20"
                        : "border-rose-500 text-rose-400 font-bold bg-rose-950/20"
                      : userVal
                      ? "border-emerald-500/70 text-slate-100 bg-slate-900"
                      : "border-slate-700 hover:border-emerald-500/50 text-slate-300 bg-slate-900";

                    return (
                      <td key={col.key} className="p-2 border-r border-slate-800/60 last:border-r-0 min-w-[140px]">
                        <div className="flex flex-col gap-1">
                          {useTextInput ? (
                            <input
                              type="text"
                              value={userVal}
                              onChange={(e) => handleCellChange(cellKey, e.target.value)}
                              disabled={showResults}
                              placeholder="Type answer..."
                              className={`w-full border p-1.5 text-xs rounded font-mono outline-none transition-colors ${stateClass}`}
                            />
                          ) : (
                            <select
                              value={userVal}
                              onChange={(e) => handleCellChange(cellKey, e.target.value)}
                              disabled={showResults}
                              className={`w-full border p-1.5 text-xs rounded font-mono outline-none transition-colors ${stateClass}`}
                            >
                              <option value="">-- Select --</option>
                              {options.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                          )}
                          {showResults && !isCorrect && (
                            <span className="text-[10px] text-rose-400 font-mono leading-tight">
                              Expected: {String(targetVal)}
                            </span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Validation Buttons & Stage Advance */}
      <div className="pt-6 border-t border-slate-800/80 flex flex-col items-center gap-4">
        {!showResults ? (
          <button
            type="button"
            onClick={handleValidate}
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-sm rounded-lg shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/20 transition-all cursor-pointer"
          >
            VALIDATE TABLE BLANKS
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
                    <span>[OK]</span> STAGE {currentStageIndex + 1} COMPLETE
                  </span>
                  <p className="text-xs sm:text-sm text-emerald-300/90 font-mono">
                    All {results.total} table blanks correctly matched and verified.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <span className="text-lg font-bold font-mono mb-1 text-rose-400 flex items-center gap-2">
                    <span>[!]</span> MATRIX VALIDATION ERRORS
                  </span>
                  <p className="text-xs sm:text-sm text-rose-300/90 font-mono">
                    {results.total - results.correct} cell(s) incorrect. Review the highlighted corrections.
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {allCorrect && (
                <button
                  type="button"
                  onClick={handleNextStage}
                  className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-sm rounded-lg shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/20 transition-all cursor-pointer"
                >
                  {currentStageIndex + 1 < stages.length
                    ? `ADVANCE TO STAGE ${currentStageIndex + 2} (${stages[currentStageIndex + 1]} BLANKS)`
                    : "REPLAY MATRIX (NEW BLANKS)"}
                </button>
              )}
              <button
                type="button"
                onClick={handleResetStage}
                className="px-6 py-2.5 border border-emerald-500/40 hover:border-emerald-400 bg-slate-900/80 hover:bg-slate-800 text-emerald-400 font-bold font-mono text-sm rounded-lg transition-all cursor-pointer"
              >
                {allCorrect ? "REPLAY STAGE (NEW BLANKS)" : "RETRY THIS STAGE"}
              </button>
            </div>
          </div>
        )}
      </div>
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
      <main className="w-full max-w-5xl terminal-box border-l-4 border-l-emerald-500 shadow-2xl">
        {content}
      </main>
    </div>
  );
}
