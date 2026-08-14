"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

interface EthernetStandardRow {
  id: number;
  ieeeStandard: string;
  tStandard: string;
  maxDistance: string;
  speed: string;
  cableType: string;
  minCategory: string;
  connectors: string;
}

type ColumnKey =
  | "ieeeStandard"
  | "tStandard"
  | "maxDistance"
  | "speed"
  | "cableType"
  | "minCategory"
  | "connectors";

interface ColumnConfig {
  key: ColumnKey;
  label: string;
}

interface DistanceSegment {
  label: string;
  value: string;
}

const columns: ColumnConfig[] = [
  { key: "ieeeStandard", label: "IEEE Standard" },
  { key: "tStandard", label: "T-Standard" },
  { key: "maxDistance", label: "Max Distance" },
  { key: "speed", label: "Speed" },
  { key: "cableType", label: "Cable Type" },
  { key: "minCategory", label: "Min. Category" },
  { key: "connectors", label: "Connectors" },
];

const standardRows: EthernetStandardRow[] = [
  {
    id: 1,
    ieeeStandard: "802.3",
    tStandard: "10base2",
    maxDistance: "200m",
    speed: "10 Mb/s",
    cableType: "Thinnet (thin coax)",
    minCategory: "—",
    connectors: "T-connectors, BNC connectors, terminators",
  },
  {
    id: 2,
    ieeeStandard: "802.3",
    tStandard: "10base5",
    maxDistance: "500m",
    speed: "10 Mb/s",
    cableType: "Thicknet (thick coax)",
    minCategory: "—",
    connectors: "Vampire Taps",
  },
  {
    id: 3,
    ieeeStandard: "802.3i",
    tStandard: "10baseT",
    maxDistance: "100m",
    speed: "10 Mb/s",
    cableType: "Twisted pair",
    minCategory: "Cat3 or better",
    connectors: "RJ45/RJ11",
  },
  {
    id: 4,
    ieeeStandard: "802.3u",
    tStandard: "100baseT",
    maxDistance: "100m",
    speed: "100 Mb/s",
    cableType: "Twisted pair",
    minCategory: "Cat5 or better",
    connectors: "RJ45",
  },
  {
    id: 5,
    ieeeStandard: "802.3z",
    tStandard: "1000baseT",
    maxDistance: "100m",
    speed: "1 Gb/s",
    cableType: "Twisted pair",
    minCategory: "Cat5e or better",
    connectors: "RJ45",
  },
  {
    id: 6,
    ieeeStandard: "802.3an",
    tStandard: "10GbaseT",
    // maxDistance is unused for this row's rendering, split into tenGigDistanceSegments below.
    maxDistance: "Cat5e/Cat6: 55m; Cat6a or better: 100m",
    speed: "10 Gb/s",
    cableType: "Twisted pair",
    minCategory: "Cat5e or better",
    connectors: "RJ45",
  },
];

// -------- 10GBase-T distance split --------
const tenGigDistanceSegments: DistanceSegment[] = [
  { label: "Cat5e/Cat6:", value: "55m" },
  { label: "Cat6a or better:", value: "100m" },
];

const columnOptions: Record<ColumnKey, string[]> = {
  ieeeStandard: ["802.3", "802.3i", "802.3u", "802.3z", "802.3an"],
  tStandard: ["10base2", "10base5", "10baseT", "100baseT", "1000baseT", "10GbaseT"],
  maxDistance: ["55m", "100m", "200m", "500m"],
  speed: ["10 Mb/s", "100 Mb/s", "1 Gb/s", "10 Gb/s"],
  cableType: ["Thicknet (thick coax)", "Thinnet (thin coax)", "Twisted pair"],
  minCategory: ["—", "Cat3 or better", "Cat5 or better", "Cat5e or better"],
  connectors: [
    "RJ45",
    "RJ45/RJ11",
    "T-connectors, BNC connectors, terminators",
    "Vampire Taps",
  ],
};

const BLANK_COUNTS_BY_STAGE = [6, 12, 18, 26, 34, 43];
const TEXT_INPUT_UNLOCK_ATTEMPTS = 1;

function getAllCellKeysForRow(row: EthernetStandardRow): string[] {
  const keys: string[] = [];
  columns.forEach((col) => {
    if (row.id === 6 && col.key === "maxDistance") {
      keys.push(`${row.id}_maxDistance_0`, `${row.id}_maxDistance_1`);
    } else {
      keys.push(`${row.id}_${col.key}`);
    }
  });
  return keys;
}

function generateBlankSet(stageNum: number): Set<string> {
  const targetCount = BLANK_COUNTS_BY_STAGE[Math.min(stageNum - 1, BLANK_COUNTS_BY_STAGE.length - 1)];
  const selectedKeys = new Set<string>();

  // If target count >= row count, ensure at least 1 blank per row for good coverage
  if (targetCount >= standardRows.length) {
    standardRows.forEach((row) => {
      const rowKeys = getAllCellKeysForRow(row);
      const randomKey = rowKeys[Math.floor(Math.random() * rowKeys.length)];
      selectedKeys.add(randomKey);
    });
  }

  const allKeys = standardRows.flatMap((row) => getAllCellKeysForRow(row));
  const remainingCandidates = allKeys
    .filter((key) => !selectedKeys.has(key))
    .sort(() => Math.random() - 0.5);

  for (const key of remainingCandidates) {
    if (selectedKeys.size >= targetCount) break;
    selectedKeys.add(key);
  }

  return selectedKeys;
}

function getColKeyFromCellKey(key: string): ColumnKey {
  const parts = key.split("_");
  return parts[1] as ColumnKey;
}

function getCorrectAnswerForKey(key: string): string {
  const parts = key.split("_");
  const rowId = parseInt(parts[0], 10);

  if (parts[1] === "maxDistance" && parts.length === 3) {
    const idx = parseInt(parts[2], 10);
    return tenGigDistanceSegments[idx].value;
  }

  const colKey = parts[1] as ColumnKey;
  const row = standardRows.find((r) => r.id === rowId);
  return row ? row[colKey] : "";
}

// -------- fuzzy answer matching (text input mode) --------

function normalizeStandardCode(s: string): string {
  return s.trim().toLowerCase().replace(/[\s-]+/g, "");
}

function normalizeDistance(s: string): string {
  const v = s.trim().toLowerCase().replace(/\s+/g, "");
  return v.replace(/meters?$/, "m");
}

function parseSpeedToMbps(input: string): number | null {
  // Requires a literal lowercase "b" in Mb/s, Mbps, Gb/s, Gbps; uppercase B is rejected.
  const match = input.trim().match(/^(\d+(?:\.\d+)?)\s*([MmGg])(bps|b\/s)$/);
  if (!match) return null;
  const value = parseFloat(match[1]);
  const unit = match[2].toLowerCase();
  return unit === "g" ? value * 1000 : value;
}

function matchesCableType(correct: string, input: string): boolean {
  const v = input.trim().toLowerCase();
  if (correct === "Thinnet (thin coax)") {
    return /thinnet/.test(v) || (/thin/.test(v) && /coax/.test(v));
  }
  if (correct === "Thicknet (thick coax)") {
    return /thicknet/.test(v) || (/thick/.test(v) && /coax/.test(v));
  }
  if (correct === "Twisted pair") {
    return /twisted/.test(v) && /pair/.test(v);
  }
  return v === correct.trim().toLowerCase();
}

function matchesMinCategory(correct: string, input: string): boolean {
  const v = input.trim().toLowerCase();
  if (correct === "—") {
    return ["-", "none", "n/a", "na", "—"].includes(v);
  }
  if (correct === "Cat3 or better") {
    return /cat\s*-?3/.test(v);
  }
  if (correct === "Cat5 or better") {
    return /cat\s*-?5(?!e)/.test(v);
  }
  if (correct === "Cat5e or better") {
    return /cat\s*-?5e/.test(v);
  }
  return v === correct.trim().toLowerCase();
}

function matchesConnectors(correct: string, input: string): boolean {
  const v = input.trim().toLowerCase();
  const hasRj45 = /rj\s*-?45/.test(v);
  const hasRj11 = /rj\s*-?11/.test(v);

  if (correct === "T-connectors, BNC connectors, terminators") {
    return /bnc/.test(v);
  }
  if (correct === "Vampire Taps") {
    return /vampire/.test(v);
  }
  if (correct === "RJ45/RJ11") {
    return hasRj45 && hasRj11;
  }
  if (correct === "RJ45") {
    return hasRj45 && !hasRj11;
  }
  return v === correct.trim().toLowerCase();
}

function isTextAnswerCorrect(key: string, correct: string, userInput: string): boolean {
  if (!userInput.trim()) return false;
  const colKey = getColKeyFromCellKey(key);

  if (colKey === "ieeeStandard" || colKey === "tStandard") {
    return normalizeStandardCode(userInput) === normalizeStandardCode(correct);
  }
  if (colKey === "maxDistance") {
    return normalizeDistance(userInput) === normalizeDistance(correct);
  }
  if (colKey === "speed") {
    const userMbps = parseSpeedToMbps(userInput);
    const correctMbps = parseSpeedToMbps(correct);
    return userMbps !== null && correctMbps !== null && userMbps === correctMbps;
  }
  if (colKey === "cableType") {
    return matchesCableType(correct, userInput);
  }
  if (colKey === "minCategory") {
    return matchesMinCategory(correct, userInput);
  }
  if (colKey === "connectors") {
    return matchesConnectors(correct, userInput);
  }
  return userInput.trim().toLowerCase() === correct.trim().toLowerCase();
}

// -------- blank cell control --------

function BlankCell({
                     options,
                     useTextInput,
                     showResults,
                     correct,
                     correctVal,
                     value,
                     onChange,
                   }: {
  options: string[];
  useTextInput: boolean;
  showResults: boolean;
  correct: boolean;
  correctVal: string;
  value: string;
  onChange: (val: string) => void;
}) {
  const stateClass = showResults
    ? correct
      ? "border-green-500 text-green-400 font-bold"
      : "border-red-500 text-red-400 font-bold"
    : value
      ? "border-accent text-slate-100"
      : "border-border/80 focus:border-accent text-slate-300";

  return (
    <div className="flex flex-col gap-1 min-w-[140px]">
      {useTextInput ? (
        <input
          type="text"
          disabled={showResults}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type your answer"
          className={`w-full bg-slate-900 border p-1.5 text-xs rounded font-mono outline-none transition-colors ${stateClass}`}
        />
      ) : (
        <select
          disabled={showResults}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-slate-900 border p-1.5 text-xs rounded font-mono outline-none transition-colors ${stateClass}`}
        >
          <option value="">-- Select --</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )}
      {showResults && !correct && (
        <span className="text-[10px] text-red-400 font-mono leading-tight">
          Expected: {correctVal}
        </span>
      )}
    </div>
  );
}

export default function EthernetStandardsQuiz() {
  const [stage, setStage] = useState(1);
  const [blankCells, setBlankCells] = useState<Set<string>>(() => generateBlankSet(1));
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [correctAttempts, setCorrectAttempts] = useState(0);

  const useTextInput = correctAttempts >= TEXT_INPUT_UNLOCK_ATTEMPTS;

  const startStage = useCallback((stageNum: number) => {
    setBlankCells(generateBlankSet(stageNum));
    setUserAnswers({});
    setShowResults(false);
  }, []);

  const handleSelectChange = (cellKey: string, value: string) => {
    setUserAnswers((prev) => ({ ...prev, [cellKey]: value }));
  };

  const isCellCorrect = (key: string): boolean => {
    const correct = getCorrectAnswerForKey(key);
    const userVal = userAnswers[key] || "";
    if (useTextInput) {
      return isTextAnswerCorrect(key, correct, userVal);
    }
    return userVal === correct;
  };

  // Calculate score
  const totalBlanks = blankCells.size;
  let correctBlanks = 0;
  blankCells.forEach((key) => {
    if (isCellCorrect(key)) {
      correctBlanks++;
    }
  });

  const allCorrect = totalBlanks > 0 && correctBlanks === totalBlanks;

  const handleValidate = () => {
    setShowResults(true);
    if (allCorrect) {
      setCorrectAttempts((prev) => prev + 1);
    }
  };

  const handleNextStage = () => {
    const nextStage = stage < BLANK_COUNTS_BY_STAGE.length ? stage + 1 : stage;
    setStage(nextStage);
    startStage(nextStage);
  };

  const handleResetCurrentStage = () => {
    startStage(stage);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-8">
      <header className="w-full max-w-6xl mb-8 border-b border-border pb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-accent">
            ENT_ROUTER_V1 | Wired Ethernet Standards
          </h1>
          <Link href="/" className="text-sm text-accent hover:underline">
            {"<"} BACK TO HUB
          </Link>
        </div>
        <p className="text-sm text-slate-400 mt-2">
          Diagnostic Module: IEEE 802.3 Physical &amp; Data-Link Standards Matrix
        </p>
      </header>

      <main className="w-full max-w-6xl terminal-box space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-4">
          <div>
            <h2 className="text-xl font-bold text-accent underline">
              802.3 Ethernet Standards Table
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Select the correct standard specification for each blank cell in the table.
            </p>
          </div>
        </div>

        {/* Interactive Matrix Table */}
        <div className="overflow-x-auto rounded border border-border">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
            <tr className="bg-slate-900/80 border-b border-border text-accent font-mono">
              {columns.map((col) => (
                <th key={col.key} className="p-3 font-bold border-r border-border/50 last:border-r-0 whitespace-nowrap">
                  {col.label}
                </th>
              ))}
            </tr>
            </thead>
            <tbody className="divide-y divide-border/40 font-mono">
            {standardRows.map((row, rowIdx) => (
              <tr
                key={row.id}
                className={`transition-colors ${
                  rowIdx % 2 === 0 ? "bg-slate-900/20" : "bg-slate-900/50"
                } hover:bg-slate-800/40`}
              >
                {columns.map((col) => {
                  // -------- split max distance cell (802.3an / 10GbaseT) --------
                  if (row.id === 6 && col.key === "maxDistance") {
                    return (
                      <td
                        key={col.key}
                        className="p-0 border-r border-border/30 last:border-r-0"
                      >
                        <div className="flex flex-col divide-y divide-border/30">
                          {tenGigDistanceSegments.map((segment, idx) => {
                            const cellKey = `${row.id}_maxDistance_${idx}`;
                            const isBlank = blankCells.has(cellKey);
                            const selectedVal = userAnswers[cellKey] || "";
                            const correct = isCellCorrect(cellKey);

                            return (
                              <div
                                key={cellKey}
                                className={`p-2 transition-colors ${
                                  isBlank
                                    ? showResults
                                      ? correct
                                        ? "bg-green-950/20"
                                        : "bg-red-950/20"
                                      : "bg-slate-950/30"
                                    : ""
                                }`}
                              >
                                <span className="text-slate-300 mr-1">{segment.label}</span>
                                {isBlank ? (
                                  <BlankCell
                                    options={columnOptions.maxDistance}
                                    useTextInput={useTextInput}
                                    showResults={showResults}
                                    correct={correct}
                                    correctVal={segment.value}
                                    value={selectedVal}
                                    onChange={(val) => handleSelectChange(cellKey, val)}
                                  />
                                ) : (
                                  <span className="text-slate-200">{segment.value}</span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </td>
                    );
                  }

                  const cellKey = `${row.id}_${col.key}`;
                  const isBlank = blankCells.has(cellKey);
                  const selectedVal = userAnswers[cellKey] || "";
                  const correctVal = row[col.key];

                  if (!isBlank) {
                    return (
                      <td
                        key={col.key}
                        className="p-3 border-r border-border/30 last:border-r-0 text-slate-200"
                      >
                          <span className={col.key === "tStandard" || col.key === "ieeeStandard" ? "font-bold text-slate-100" : ""}>
                            {row[col.key]}
                          </span>
                      </td>
                    );
                  }

                  const correct = isCellCorrect(cellKey);

                  return (
                    <td
                      key={col.key}
                      className={`p-2 border-r border-border/30 last:border-r-0 transition-colors ${
                        showResults
                          ? correct
                            ? "bg-green-950/20"
                            : "bg-red-950/20"
                          : "bg-slate-950/30"
                      }`}
                    >
                      <BlankCell
                        options={columnOptions[col.key]}
                        useTextInput={useTextInput}
                        showResults={showResults}
                        correct={correct}
                        correctVal={correctVal}
                        value={selectedVal}
                        onChange={(val) => handleSelectChange(cellKey, val)}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
            </tbody>
          </table>
        </div>

        {/* Validation & Reset Controls */}
        <div className="pt-4 border-t border-border flex flex-col items-center gap-4">
          {!showResults ? (
            <button
              type="button"
              onClick={handleValidate}
              disabled={Object.keys(userAnswers).length === 0}
              className="px-8 py-2.5 bg-accent text-slate-900 font-bold rounded hover:bg-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-mono text-sm tracking-wider cursor-pointer"
            >
              VALIDATE STANDARDS TABLE
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
                <div className="font-mono text-sm mb-1">
                  Score: <span className="font-bold">{correctBlanks}</span> / {totalBlanks}
                </div>
                {allCorrect ? (
                  <div>
                    <div className="text-xl font-bold mb-1">
                      {stage < BLANK_COUNTS_BY_STAGE.length
                        ? `STAGE ${stage} VERIFIED — READY FOR NEXT LEVEL`
                        : "MAXIMUM MATRIX PROFICIENCY ACHIEVED"}
                    </div>
                    <p className="text-xs text-slate-300">
                      All {totalBlanks} blank standard parameters accurately verified.
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="text-xl font-bold mb-1">STANDARDS MISMATCH DETECTED</div>
                    <p className="text-xs text-slate-300">
                      {totalBlanks - correctBlanks} parameter(s) incorrectly identified. Review flagged cells above.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                {allCorrect && stage < BLANK_COUNTS_BY_STAGE.length && (
                  <button
                    type="button"
                    onClick={handleNextStage}
                    className="px-6 py-2 bg-accent text-slate-900 font-bold rounded hover:bg-green-400 transition-colors font-mono text-xs cursor-pointer"
                  >
                    NEXT STAGE (+ MORE BLANKS)
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleResetCurrentStage}
                  className="px-6 py-2 border border-accent text-accent font-bold rounded hover:bg-accent/10 transition-colors font-mono text-xs cursor-pointer"
                >
                  {allCorrect ? "SCRAMBLE & REPLAY STAGE" : "RETRY STAGE (NEW BLANKS)"}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
