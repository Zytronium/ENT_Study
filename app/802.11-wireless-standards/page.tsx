"use client";

import { useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface WifiStandardRow {
  id: number;
  version: string;
  ieeeStandard: string;
  frequency: string;
  speed: string;
  distance: string;
}

type ColumnKey =
  | "version"
  | "ieeeStandard"
  | "frequency"
  | "speed"
  | "distance";

interface ColumnConfig {
  key: ColumnKey;
  label: string;
}

const columns: ColumnConfig[] = [
  { key: "version", label: "Version" },
  { key: "ieeeStandard", label: "IEEE Standard" },
  { key: "frequency", label: "Frequency" },
  { key: "speed", label: "Speed" },
  { key: "distance", label: "Distance" },
];

const standardRows: WifiStandardRow[] = [
  {
    id: 1,
    version: "Wi-Fi",
    ieeeStandard: "802.11",
    frequency: "2.4 GHz",
    speed: "2 Mb/s",
    distance: "100 ft",
  },
  {
    id: 2,
    version: "Wi-Fi 1",
    ieeeStandard: "802.11b",
    frequency: "2.4 GHz",
    speed: "11 Mb/s",
    distance: "100 ft",
  },
  {
    id: 3,
    version: "Wi-Fi 2",
    ieeeStandard: "802.11a",
    frequency: "5 GHz",
    speed: "54 Mb/s",
    distance: "100 ft",
  },
  {
    id: 4,
    version: "Wi-Fi 3",
    ieeeStandard: "802.11g",
    frequency: "2.4 GHz",
    speed: "54 Mb/s",
    distance: "125 ft",
  },
  {
    id: 5,
    version: "Wi-Fi 4",
    ieeeStandard: "802.11n",
    frequency: "2.4 GHz + 5 GHz",
    speed: "600 Mb/s",
    distance: "225 ft",
  },
  {
    id: 6,
    version: "Wi-Fi 5",
    ieeeStandard: "802.11ac",
    frequency: "5 GHz",
    speed: "1 Gb/s",
    distance: "90 ft",
  },
  {
    id: 7,
    version: "Wi-Fi 6",
    ieeeStandard: "802.11ax",
    frequency: "2.4 GHz + 5 GHz",
    speed: "14 Gb/s",
    distance: "100 ft",
  },
];

const columnOptions: Record<ColumnKey, string[]> = {
  version: ["Wi-Fi", "Wi-Fi 1", "Wi-Fi 2", "Wi-Fi 3", "Wi-Fi 4", "Wi-Fi 5", "Wi-Fi 6"],
  ieeeStandard: ["802.11", "802.11a", "802.11ac", "802.11ax", "802.11b", "802.11g", "802.11n"],
  frequency: ["2.4 GHz", "5 GHz", "2.4 GHz + 5 GHz"],
  speed: ["2 Mb/s", "11 Mb/s", "54 Mb/s", "600 Mb/s", "1 Gb/s", "14 Gb/s"],
  distance: ["90 ft", "100 ft", "125 ft", "225 ft"],
};

const BLANK_COUNTS_BY_STAGE = [5, 10, 16, 22, 28, 35];
const TEXT_INPUT_UNLOCK_ATTEMPTS = 1;

function getAllCellKeysForRow(row: WifiStandardRow): string[] {
  const keys: string[] = [];
  columns.forEach((col) => {
    keys.push(`${row.id}_${col.key}`);
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
  const colKey = parts[1] as ColumnKey;
  const row = standardRows.find((r) => r.id === rowId);
  return row ? row[colKey] : "";
}

// -------- fuzzy answer matching (text input mode) --------

function normalizeStandardCode(s: string): string {
  return s.trim().toLowerCase().replace(/[\s-]+/g, "");
}

function normalizeVersion(input: string, correct: string): boolean {
  const v = input.trim().toLowerCase().replace(/[\s-]+/g, "");
  const c = correct.trim().toLowerCase().replace(/[\s-]+/g, "");
  if (c === "wifi") {
    return ["wifi", "wi-fi", "legacy", "wifilegacy", "legacywifi"].includes(v);
  }
  return v === c;
}

function normalizeFrequency(input: string, correct: string): boolean {
  const v = input.trim().toLowerCase().replace(/[\s-]+/g, "");
  const c = correct.trim().toLowerCase().replace(/[\s-]+/g, "");
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
    ].includes(v);
  }
  return v === c || v.replace("ghz", "") === c.replace("ghz", "");
}

function normalizeDistance(input: string, correct: string): boolean {
  const v = input.trim().toLowerCase().replace(/[\s-]+/g, "");
  const c = correct.trim().toLowerCase().replace(/[\s-]+/g, "");
  const cleanV = v.replace(/(feet|foot|ft|')$/, "ft");
  return cleanV === c || v === c.replace("ft", "");
}

function parseSpeedToMbps(input: string): number | null {
  // Requires a literal lowercase "b" in Mb/s, Mbps, Gb/s, Gbps; uppercase B is rejected.
  const match = input.trim().match(/^(\d+(?:\.\d+)?)\s*([MmGg])(bps|b\/s)$/);
  if (!match) return null;
  const value = parseFloat(match[1]);
  const unit = match[2].toLowerCase();
  return unit === "g" ? value * 1000 : value;
}

function isTextAnswerCorrect(key: string, correct: string, userInput: string): boolean {
  if (!userInput.trim()) return false;
  const colKey = getColKeyFromCellKey(key);

  if (colKey === "version") {
    return normalizeVersion(userInput, correct);
  }
  if (colKey === "ieeeStandard") {
    return normalizeStandardCode(userInput) === normalizeStandardCode(correct);
  }
  if (colKey === "frequency") {
    return normalizeFrequency(userInput, correct);
  }
  if (colKey === "speed") {
    const userMbps = parseSpeedToMbps(userInput);
    const correctMbps = parseSpeedToMbps(correct);
    return userMbps !== null && correctMbps !== null && userMbps === correctMbps;
  }
  if (colKey === "distance") {
    return normalizeDistance(userInput, correct);
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

function WifiStandardsQuizContent() {
  const searchParams = useSearchParams();
  const isMastery = searchParams.get("mastery") === "true";
  const initialStage = isMastery ? BLANK_COUNTS_BY_STAGE.length : 1;

  const [stage, setStage] = useState(initialStage);
  const [blankCells, setBlankCells] = useState<Set<string>>(() => generateBlankSet(initialStage));
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [correctAttempts, setCorrectAttempts] = useState(0);

  const useTextInput = isMastery || correctAttempts >= TEXT_INPUT_UNLOCK_ATTEMPTS;

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
      {/* Header */}
      <header className="w-full max-w-6xl mb-8 cyber-glass-panel p-4 sm:p-5 rounded-xl border border-slate-800 shadow-xl flex flex-wrap justify-between items-center gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-1.5 py-0.5 rounded">
              DIAGNOSTIC_MODULE
            </span>
            <span className="text-xs text-slate-500 font-mono">//</span>
            <span className="text-xs text-slate-400 font-mono">IEEE_802.11_WIFI</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="text-emerald-400 font-mono">ENT_ROUTER_V1</span>
            <span className="text-slate-600 font-light">|</span>
            <span className="text-slate-200">Wireless Wi-Fi Standards</span>
          </h1>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <Link
            href="/study-guide#wireless-wi-fi-standards"
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

      <main className="w-full max-w-6xl terminal-box border-l-4 border-l-emerald-500 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
              [IEEE_802.11_WIRELESS_STANDARDS_MATRIX]
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">STAGE {stage} OF {BLANK_COUNTS_BY_STAGE.length}</span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-400">{totalBlanks} BLANKS ACTIVE</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-400 font-mono">
          Complete the IEEE 802.11 Wi-Fi specifications across version letters, operating frequencies, data rates, and indoor/outdoor range for all blank cells in the matrix table.
        </p>

        {/* Interactive Matrix Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/80 shadow-inner">
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
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {standardRows.map((row, rowIdx) => (
                <tr
                  key={row.id}
                  className={`transition-colors ${
                    rowIdx % 2 === 0 ? "bg-slate-900/20" : "bg-slate-900/40"
                  } hover:bg-slate-800/30`}
                >
                  {columns.map((col) => {
                    const cellKey = `${row.id}_${col.key}`;
                    const isBlank = blankCells.has(cellKey);
                    const selectedVal = userAnswers[cellKey] || "";
                    const correctVal = row[col.key];

                    if (!isBlank) {
                      return (
                        <td
                          key={col.key}
                          className="p-3 border-r border-slate-800/60 last:border-r-0 text-slate-200"
                        >
                          <span className={col.key === "version" || col.key === "ieeeStandard" ? "font-bold text-white" : ""}>
                            {row[col.key]}
                          </span>
                        </td>
                      );
                    }

                    const correct = isCellCorrect(cellKey);

                    return (
                      <td
                        key={col.key}
                        className={`p-2 border-r border-slate-800/60 last:border-r-0 transition-colors ${
                          showResults
                            ? correct
                              ? "bg-emerald-950/30"
                              : "bg-rose-950/30"
                            : "bg-slate-950/40"
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
        <div className="pt-6 border-t border-slate-800/80 flex flex-col items-center gap-4">
          {!showResults ? (
            <button
              type="button"
              onClick={handleValidate}
              disabled={Object.keys(userAnswers).length === 0}
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-sm rounded-lg shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              VALIDATE STANDARDS TABLE
            </button>
          ) : (
            <div className="w-full text-center space-y-4">
              <div
                className={`p-4 rounded-lg border font-mono shadow-lg ${
                  allCorrect
                    ? "bg-emerald-950/40 text-emerald-300 border-emerald-500/60 shadow-emerald-950/40"
                    : "bg-rose-950/40 text-rose-300 border-rose-500/60 shadow-rose-950/40"
                }`}
              >
                <div className="text-xs mb-1 text-slate-400">
                  SCORE: <span className="font-bold text-white">{correctBlanks}</span> / {totalBlanks} BLANKS CORRECT
                </div>
                {allCorrect ? (
                  <div>
                    <div className="text-base sm:text-lg font-bold mb-1 text-emerald-400 flex items-center justify-center gap-2">
                      <span>[OK]</span>
                      <span>
                        {stage < BLANK_COUNTS_BY_STAGE.length
                          ? `STAGE ${stage} VERIFIED — READY FOR NEXT LEVEL`
                          : "MAXIMUM MATRIX PROFICIENCY ACHIEVED"}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-300/90 font-mono">
                      All {totalBlanks} blank standard parameters accurately verified.
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="text-base sm:text-lg font-bold mb-1 text-rose-400 flex items-center justify-center gap-2">
                      <span>[!]</span> STANDARDS MISMATCH DETECTED
                    </div>
                    <p className="text-xs sm:text-sm text-rose-300/90 font-mono">
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
                    className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-sm rounded-lg shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/20 transition-all cursor-pointer"
                  >
                    NEXT STAGE (+ MORE BLANKS)
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleResetCurrentStage}
                  className="px-6 py-2.5 border border-emerald-500/40 hover:border-emerald-400 bg-slate-900/80 hover:bg-slate-800 text-emerald-400 font-bold font-mono text-sm rounded-lg transition-all cursor-pointer"
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

export default function WifiStandardsQuiz() {
  return (
    <Suspense fallback={null}>
      <WifiStandardsQuizContent />
    </Suspense>
  );
}
