"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { TableColumnConfig, TableRowData } from "@/lib/practice-test/types";

interface ReusableTableQuizProps {
  id: string;
  title?: string;
  description?: string;
  columns: TableColumnConfig[];
  rows: TableRowData[];
  blankCellKeys?: string[];
  userAnswers?: Record<string, string>;
  onAnswersChange?: (answers: Record<string, string>) => void;
  showResults?: boolean;
  onCompletionChange?: (isComplete: boolean, score: number, total: number) => void;
}

export function isCellEligible(val: unknown): boolean {
  if (val === null || val === undefined) return false;
  const str = String(val).trim();
  return (
    str !== "" &&
    str !== "-" &&
    str !== "—" &&
    str !== "N/A" &&
    str !== "n/a" &&
    str !== "NA" &&
    str !== "na"
  );
}

function normalizeCode(s: string): string {
  return s.trim().toLowerCase().replace(/[\s-]+/g, "");
}

function normalizeDistance(s: string): string {
  const v = s.trim().toLowerCase().replace(/\s+/g, "");
  return v
    .replace(/meters?$/, "m")
    .replace(/(feet|foot|ft|')$/, "ft");
}

function parseSpeedToKbps(input: string): number | null {
  const clean = input.trim().toLowerCase().replace(/\s+/g, "");
  const match = clean.match(/^([\d.]+)\s*(k|m|g)?(b\/s|bps|b)?$/);
  if (!match) return null;
  const num = parseFloat(match[1]);
  if (isNaN(num)) return null;
  const unit = match[2] || "";
  if (unit === "g") return num * 1000000;
  if (unit === "m") return num * 1000;
  if (unit === "k") return num;
  return num;
}

function matchesSpeed(correct: string, input: string): boolean {
  const c = correct.trim().toLowerCase();
  const u = input.trim().toLowerCase();
  if (c === u) return true;
  if (normalizeCode(correct) === normalizeCode(input)) return true;
  const cKbps = parseSpeedToKbps(correct);
  const uKbps = parseSpeedToKbps(input);
  if (cKbps !== null && uKbps !== null && cKbps === uKbps) return true;

  const rawNum = correct.split(" ")[0].toLowerCase();
  const rawUnit = (correct.split(" ")[1] || "").toLowerCase();
  const inputWithoutSpaces = u.replace(/\s+/g, "");

  return (
    inputWithoutSpaces === `${rawNum}${rawUnit}` ||
    inputWithoutSpaces === `${rawNum}${rawUnit.replace("bps", "b/s")}` ||
    inputWithoutSpaces === `${rawNum}${rawUnit.replace("bps", "b")}` ||
    inputWithoutSpaces === `${rawNum}${rawUnit[0]}` ||
    u === rawNum
  );
}

function matchesCableType(correct: string, input: string): boolean {
  const v = input.trim().toLowerCase();
  const vNorm = v.replace(/[\s-]+/g, "");
  const c = correct.trim().toLowerCase();
  if (c.includes("thinnet") || c.includes("thin coax")) {
    return (
      /thinnet/.test(vNorm) ||
      (/thin/.test(v) && /coax/.test(v)) ||
      vNorm === "thin" ||
      vNorm === "thinnet" ||
      vNorm === "thincoax" ||
      vNorm === "thincoaxial"
    );
  }
  if (c.includes("thicknet") || c.includes("thick coax")) {
    return (
      /thicknet/.test(vNorm) ||
      (/thick/.test(v) && /coax/.test(v)) ||
      vNorm === "thick" ||
      vNorm === "thicknet" ||
      vNorm === "thickcoax" ||
      vNorm === "thickcoaxial"
    );
  }
  if (c.includes("twisted pair")) {
    return (
      (/twisted/.test(v) && /pair/.test(v)) ||
      vNorm === "twistedpair" ||
      vNorm === "twisted" ||
      vNorm === "utp" ||
      vNorm === "stp"
    );
  }
  return v === c || vNorm === c.replace(/[\s-]+/g, "");
}

function matchesMinCategory(correct: string, input: string): boolean {
  const v = input.trim().toLowerCase();
  const c = correct.trim().toLowerCase();
  if (["-", "—", "none", "n/a", "na"].includes(c)) {
    return ["-", "—", "none", "n/a", "na"].includes(v);
  }
  if (c.includes("cat5e") || c.includes("cat 5e")) {
    return /cat\s*-?5e/.test(v) || v === "5e" || v === "cat5e" || v === "cat 5e";
  }
  if (c.includes("cat5") || c.includes("cat 5")) {
    return (/cat\s*-?5(?!e)/.test(v) || v === "5" || v === "cat5" || v === "cat 5") && !/5e/.test(v);
  }
  if (c.includes("cat3") || c.includes("cat 3")) {
    return /cat\s*-?3/.test(v) || v === "3" || v === "cat3" || v === "cat 3";
  }
  return v === c;
}

function matchesConnectors(correct: string, input: string): boolean {
  const v = input.trim().toLowerCase();
  const c = correct.trim().toLowerCase();
  const hasRj45 = /rj\s*-?45/.test(v);
  const hasRj11 = /rj\s*-?11/.test(v);

  if (c.includes("bnc") || c.includes("t-connectors") || c.includes("terminators")) {
    return /bnc/.test(v) || /t-connector/.test(v) || /terminator/.test(v);
  }
  if (c.includes("vampire")) {
    return /vampire/.test(v);
  }
  if (c.includes("rj45/rj11") || (c.includes("rj45") && c.includes("rj11"))) {
    return hasRj45 && hasRj11;
  }
  if (c === "rj45") {
    return hasRj45 && !hasRj11;
  }
  return v === c;
}

function normalizeNetNumber(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/–/g, "-")
    .replace(/to/g, "-");
}

function normalizeCapacity(input: string): string {
  let s = input
    .trim()
    .toLowerCase()
    .replace(/,/g, "")
    .replace(/[-_]/g, "")
    .replace(/\s+/g, "");
  s = s.replace(/(hosts?|networks?|nets?)$/g, "");
  s = s.replace(/millions?/g, "m").replace(/mil\b/g, "m");
  s = s.replace(/thousands?/g, "k");
  if (s === "16000000") return "16m";
  if (s === "2000000") return "2m";
  if (s === "16000") return "16k";
  if (s === "65000") return "65k";
  return s;
}

function normalizeFrequency(input: string, correct: string): boolean {
  const v = normalizeCode(input);
  const c = normalizeCode(correct);
  if (c === "2.4ghz+5ghz") {
    return [
      "2.4ghz+5ghz",
      "2.4ghz/5ghz",
      "2.4+5ghz",
      "2.4ghzand5ghz",
      "2.4and5ghz",
      "2.4and5",
      "2.4,5ghz",
      "2.4,5",
      "5ghz+2.4ghz",
      "dualband",
      "dual-band",
    ].includes(v);
  }
  return v === c || v.replace("ghz", "") === c.replace("ghz", "");
}

function normalizeVersion(input: string, correct: string): boolean {
  const v = normalizeCode(input);
  const c = normalizeCode(correct);
  if (c === "wifi") {
    return ["wifi", "wi-fi", "legacy", "wifilegacy", "legacywifi"].includes(v);
  }
  if (c.startsWith("wifi")) {
    const num = c.replace("wifi", "");
    return v === c || v === `wi-fi${num}` || v === num;
  }
  return v === c;
}

function matchesChannels(correct: string, input: string): boolean {
  if (!input.trim()) return false;
  const cleanInput = input.trim().toLowerCase();
  const cleanCorrect = correct.trim().toLowerCase();

  if (cleanCorrect.startsWith("672")) {
    return (
      cleanInput === "672" ||
      cleanInput === "672 channels" ||
      cleanInput === "672(t1x28)" ||
      cleanInput === "672 (t1x28)" ||
      cleanInput === "t1x28" ||
      cleanInput === "28 t1" ||
      cleanInput === "28 t1s" ||
      cleanInput === "28 t1 lines"
    );
  }
  if (cleanCorrect.startsWith("512")) {
    return (
      cleanInput === "512" ||
      cleanInput === "512 channels" ||
      cleanInput === "512(e1x16)" ||
      cleanInput === "512 (e1x16)" ||
      cleanInput === "e1x16" ||
      cleanInput === "16 e1" ||
      cleanInput === "16 e1s" ||
      cleanInput === "16 e1 lines"
    );
  }
  return (
    cleanInput === cleanCorrect ||
    cleanInput === `${cleanCorrect} channels` ||
    cleanInput === `${cleanCorrect} ch` ||
    (cleanCorrect === "2" && cleanInput === "two")
  );
}

export function checkCellCorrect(correctVal: string, userVal: string, colKey?: string): boolean {
  if (!userVal || !userVal.trim()) return false;
  const c = correctVal.trim();
  const u = userVal.trim();
  const cLow = c.toLowerCase();
  const uLow = u.toLowerCase();

  if (cLow === uLow) return true;

  // Specific column handlers
  if (colKey === "cableType") {
    return matchesCableType(c, u);
  }
  if (colKey === "minCategory") {
    return matchesMinCategory(c, u);
  }
  if (colKey === "connectors") {
    return matchesConnectors(c, u);
  }
  if (colKey === "speed") {
    return matchesSpeed(c, u);
  }
  if (colKey === "maxDistance" || colKey === "distance") {
    return (
      normalizeDistance(u) === normalizeDistance(c) ||
      u.replace(/(m|meters?|ft|feet|foot|')$/i, "").trim() ===
        c.replace(/(m|meters?|ft|feet|foot|')$/i, "").trim()
    );
  }
  if (colKey === "version") {
    return normalizeVersion(u, c);
  }
  if (colKey === "frequency") {
    return normalizeFrequency(u, c);
  }
  if (colKey === "ieeeStandard" || colKey === "tStandard" || colKey === "carrier") {
    return normalizeCode(u) === normalizeCode(c);
  }
  if (colKey === "ipClass") {
    return uLow.replace(/^class\s*/i, "") === cLow.replace(/^class\s*/i, "");
  }
  if (colKey === "networkNumber") {
    const cleanU = normalizeNetNumber(u);
    if (c === "1-126 (or 127)") {
      return (
        cleanU === "1-126(or127)" ||
        cleanU === "1-126" ||
        cleanU === "1-127" ||
        cleanU === "1to126" ||
        cleanU === "1to127"
      );
    }
    return cleanU === normalizeNetNumber(c);
  }
  if (colKey === "netHost") {
    return uLow.replace(/[\s.]+/g, "") === cLow.replace(/[\s.]+/g, "");
  }
  if (colKey === "subnetMask") {
    return uLow === cLow;
  }
  if (colKey === "possibleNetworks" || colKey === "possibleHosts") {
    return normalizeCapacity(u) === normalizeCapacity(c);
  }
  if (colKey === "ipRange") {
    return normalizeNetNumber(u) === normalizeNetNumber(c);
  }
  if (colKey === "channels") {
    return matchesChannels(c, u);
  }

  // Universal fallback checks across all patterns
  if (normalizeCode(c) === normalizeCode(u)) return true;
  if (matchesCableType(c, u)) return true;
  if (matchesMinCategory(c, u)) return true;
  if (matchesConnectors(c, u)) return true;
  if (matchesSpeed(c, u)) return true;
  if (normalizeDistance(u) === normalizeDistance(c)) return true;
  if (normalizeVersion(u, c)) return true;
  if (normalizeFrequency(u, c)) return true;
  if (normalizeCapacity(u) === normalizeCapacity(c)) return true;
  if (normalizeNetNumber(u) === normalizeNetNumber(c)) return true;
  if (matchesChannels(c, u)) return true;

  return false;
}

function generateBlankCells(eligibleKeys: string[]): Set<string> {
  const targetCount = Math.max(1, Math.round(eligibleKeys.length * (2 / 3)));
  const shuffled = [...eligibleKeys].sort(() => Math.random() - 0.5);
  return new Set(shuffled.slice(0, targetCount));
}

export default function ReusableTableQuiz({
  id,
  title,
  description,
  columns,
  rows,
  blankCellKeys: providedBlankKeys,
  userAnswers: externalAnswers,
  onAnswersChange,
  showResults = false,
  onCompletionChange,
}: ReusableTableQuizProps) {
  const [internalAnswers, setInternalAnswers] = useState<Record<string, string>>({});
  const answers = externalAnswers ?? internalAnswers;

  // Compute all eligible cells across the table
  const eligibleCellKeys = useMemo(() => {
    const keys: string[] = [];
    rows.forEach((row) => {
      columns.forEach((col) => {
        const val = row[col.key];
        if (isCellEligible(val)) {
          keys.push(`${row.id}_${col.key}`);
        }
      });
    });
    return keys;
  }, [rows, columns]);

  // Generate or use provided blank set
  const blankCells = useMemo(() => {
    if (providedBlankKeys && providedBlankKeys.length > 0) {
      return new Set(providedBlankKeys);
    }
    return generateBlankCells(eligibleCellKeys);
  }, [providedBlankKeys, eligibleCellKeys]);

  const handleCellChange = useCallback(
    (cellKey: string, value: string) => {
      const next = { ...answers, [cellKey]: value };
      if (onAnswersChange) {
        onAnswersChange(next);
      } else {
        setInternalAnswers(next);
      }
    },
    [answers, onAnswersChange]
  );

  // Compute correctness
  const { correctCount, totalBlanks, isComplete } = useMemo(() => {
    let correct = 0;
    let filled = 0;

    blankCells.forEach((key) => {
      const parts = key.split("_");
      const rowId = parts[0];
      const colKey = parts.slice(1).join("_");
      const row = rows.find((r) => String(r.id) === String(rowId));
      const correctVal = row ? String(row[colKey] ?? "") : "";
      const userVal = answers[key] || "";

      if (userVal.trim().length > 0) {
        filled++;
      }

      if (checkCellCorrect(correctVal, userVal, colKey)) {
        correct++;
      }
    });

    const total = blankCells.size;
    const allFilled = total > 0 && filled === total;
    return {
      correctCount: correct,
      totalBlanks: total,
      isComplete: allFilled,
    };
  }, [blankCells, answers, rows]);

  useEffect(() => {
    if (onCompletionChange) {
      onCompletionChange(isComplete, correctCount, totalBlanks);
    }
  }, [isComplete, correctCount, totalBlanks, onCompletionChange]);

  return (
    <div className="w-full space-y-4">
      {title && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
          <h3 className="text-base sm:text-lg font-bold text-emerald-400 font-mono flex items-center gap-2">
            <span className="text-emerald-500 font-bold">[{id.toUpperCase()}]</span>
            <span>{title}</span>
          </h3>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-900/50 px-2 py-0.5 rounded shrink-0">
            {blankCells.size} BLANK CELLS TO COMPLETE
          </span>
        </div>
      )}

      {description && (
        <p className="text-xs sm:text-sm text-slate-400 font-mono leading-relaxed">
          {description}
        </p>
      )}

      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/90 shadow-inner">
        <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
          <thead>
            <tr className="bg-slate-900/90 border-b border-slate-800 text-emerald-400">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="p-3 font-bold border-r border-slate-800/60 last:border-r-0 whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {rows.map((row, rowIdx) => (
              <tr
                key={String(row.id)}
                className={`transition-colors ${
                  rowIdx % 2 === 0 ? "bg-slate-900/20" : "bg-slate-900/40"
                } hover:bg-slate-800/30`}
              >
                {columns.map((col) => {
                  const cellKey = `${row.id}_${col.key}`;
                  const isBlank = blankCells.has(cellKey);
                  const cellValue = String(row[col.key] ?? "");
                  const userVal = answers[cellKey] || "";
                  const isCorrect = checkCellCorrect(cellValue, userVal, col.key);

                  if (!isBlank) {
                    return (
                      <td
                        key={col.key}
                        className={`p-3 border-r border-slate-800/60 last:border-r-0 text-slate-300 font-mono ${
                          !isCellEligible(cellValue) ? "text-slate-600 italic" : ""
                        }`}
                      >
                        {cellValue}
                      </td>
                    );
                  }

                  // Blank cell styling
                  const stateClass = showResults
                    ? isCorrect
                      ? "border-emerald-500 text-emerald-400 font-bold bg-emerald-950/20"
                      : "border-rose-500 text-rose-400 font-bold bg-rose-950/20"
                    : userVal
                    ? "border-emerald-500/70 text-slate-100 bg-slate-900"
                    : "border-slate-700 hover:border-emerald-500/50 text-slate-300 bg-slate-900";

                  return (
                    <td
                      key={col.key}
                      className="p-2 border-r border-slate-800/60 last:border-r-0 min-w-[140px]"
                    >
                      <div className="flex flex-col gap-1">
                        <input
                          type="text"
                          disabled={showResults}
                          value={userVal}
                          onChange={(e) => handleCellChange(cellKey, e.target.value)}
                          placeholder="Type answer..."
                          className={`w-full border p-1.5 text-xs rounded font-mono outline-none transition-colors ${stateClass}`}
                        />
                        {showResults && !isCorrect && (
                          <span className="text-[10px] text-rose-400 font-mono leading-tight">
                            Expected: {cellValue}
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showResults && (
        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/90 border border-slate-800 font-mono text-xs">
          <span className="text-slate-400">
            Table Performance:{" "}
            <span
              className={`font-bold ${
                correctCount === totalBlanks
                  ? "text-emerald-400"
                  : correctCount > 0
                  ? "text-amber-400"
                  : "text-rose-400"
              }`}
            >
              {correctCount} / {totalBlanks} cells correct
            </span>
          </span>
          <span
            className={`font-bold px-2 py-0.5 rounded text-[11px] border ${
              correctCount === totalBlanks
                ? "bg-emerald-950/40 border-emerald-900 text-emerald-400"
                : correctCount > 0
                ? "bg-amber-950/40 border-amber-900 text-amber-300"
                : "bg-rose-950/40 border-rose-900 text-rose-400"
            }`}
          >
            {correctCount === totalBlanks
              ? "[PASSED - 10/10 PTS]"
              : correctCount > 0
              ? `[PARTIAL - ${Math.floor((correctCount / totalBlanks) * 10)}/10 PTS]`
              : "[0/10 PTS]"}
          </span>
        </div>
      )}
    </div>
  );
}
