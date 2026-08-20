"use client";

import { useState, useCallback, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface PrivateIPRow {
  id: number;
  ipClass: string;
  ipRange: string;
  subnetMask: string;
}

type ColumnKey = "ipClass" | "ipRange" | "subnetMask";

interface ColumnConfig {
  key: ColumnKey;
  label: string;
}

const columns: ColumnConfig[] = [
  { key: "ipClass", label: "Class" },
  { key: "ipRange", label: "IP Address Range" },
  { key: "subnetMask", label: "Default Subnet Mask" },
];

const privateIPRows: PrivateIPRow[] = [
  {
    id: 1,
    ipClass: "A",
    ipRange: "10.0.0.0 - 10.255.255.255",
    subnetMask: "255.0.0.0",
  },
  {
    id: 2,
    ipClass: "B",
    ipRange: "172.16.0.0 - 172.31.255.255",
    subnetMask: "255.255.0.0",
  },
  {
    id: 3,
    ipClass: "C",
    ipRange: "192.168.0.0 - 192.168.255.255",
    subnetMask: "255.255.255.0",
  },
];

const columnOptions: Record<ColumnKey, string[]> = {
  ipClass: ["A", "B", "C"],
  ipRange: [
    "10.0.0.0 - 10.255.255.255",
    "172.16.0.0 - 172.31.255.255",
    "192.168.0.0 - 192.168.255.255",
  ],
  subnetMask: ["255.0.0.0", "255.255.0.0", "255.255.255.0"],
};

const BLANK_COUNTS_BY_STAGE = [3, 6, 9];
const TEXT_INPUT_UNLOCK_ATTEMPTS = 1;

function getAllCellKeysForRow(row: PrivateIPRow): string[] {
  return columns.map((col) => `${row.id}_${col.key}`);
}

function generateBlankSet(stageNum: number): Set<string> {
  const targetCount = BLANK_COUNTS_BY_STAGE[Math.min(stageNum - 1, BLANK_COUNTS_BY_STAGE.length - 1)];
  const selectedKeys = new Set<string>();

  if (targetCount >= privateIPRows.length) {
    privateIPRows.forEach((row) => {
      const rowKeys = getAllCellKeysForRow(row);
      const randomKey = rowKeys[Math.floor(Math.random() * rowKeys.length)];
      selectedKeys.add(randomKey);
    });
  }

  const allKeys = privateIPRows.flatMap((row) => getAllCellKeysForRow(row));
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
  const row = privateIPRows.find((r) => r.id === rowId);
  return row ? row[colKey] : "";
}

function normalizeIPRange(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/to/g, "-")
    .replace(/–/g, "-");
}

function isTextAnswerCorrect(key: string, correct: string, userInput: string): boolean {
  if (!userInput.trim()) return false;
  const colKey = getColKeyFromCellKey(key);

  if (colKey === "ipClass") {
    const clean = userInput.trim().toUpperCase().replace(/^CLASS\s*/i, "");
    return clean === correct;
  }
  if (colKey === "ipRange") {
    return normalizeIPRange(userInput) === normalizeIPRange(correct);
  }
  if (colKey === "subnetMask") {
    return userInput.trim() === correct.trim();
  }
  return userInput.trim().toLowerCase() === correct.trim().toLowerCase();
}

interface ConceptualQuestion {
  id: string;
  prompt: string;
  answer: string;
  options: string[];
  aliases: string[];
  explanation: string;
  canTypeInHardMode: boolean;
}

const CONCEPTUAL_QUESTIONS: ConceptualQuestion[] = [
  {
    id: "cq-class-c-usage",
    prompt: "Which private IP address class is most commonly used for small or home networks?",
    answer: "Class C",
    options: ["Class C", "Class A", "Class B", "Class D"],
    aliases: ["c", "class c", "class-c"],
    explanation: "Class C (192.168.0.0 - 192.168.255.255) is the most commonly used private class for small or home networks.",
    canTypeInHardMode: true,
  },
  {
    id: "cq-dhcp-assignment",
    prompt: "Which network entity assigns private IP addresses to devices on a local network?",
    answer: "DHCP server",
    options: ["DHCP server", "DNS server", "ISP gateway", "Loopback adapter"],
    aliases: [
      "dhcp",
      "dhcp server",
      "dynamic host configuration protocol",
      "dynamic host configuration protocol server",
    ],
    explanation: "A DHCP server dynamically assigns private IP addresses to devices within the defined private address ranges.",
    canTypeInHardMode: true,
  },
  {
    id: "cq-class-b-range",
    prompt: "What is the exact private IPv4 address range defined for Class B networks?",
    answer: "172.16.0.0 - 172.31.255.255",
    options: [
      "172.16.0.0 - 172.31.255.255",
      "10.0.0.0 - 10.255.255.255",
      "192.168.0.0 - 192.168.255.255",
      "169.254.0.0 - 169.254.255.255",
    ],
    aliases: [
      "172.16.0.0 - 172.31.255.255",
      "172.16.0.0-172.31.255.255",
      "172.16.0.0 to 172.31.255.255",
    ],
    explanation: "Class B private addressing spans from 172.16.0.0 through 172.31.255.255 with a default mask of 255.255.0.0.",
    canTypeInHardMode: true,
  },
  {
    id: "cq-class-a-mask",
    prompt: "What is the default subnet mask assigned to Class A private IP addresses?",
    answer: "255.0.0.0",
    options: ["255.0.0.0", "255.255.0.0", "255.255.255.0", "255.255.255.255"],
    aliases: ["255.0.0.0", "255.0.0.0/8", "/8"],
    explanation: "Class A networks utilize a default 8-bit subnet mask of 255.0.0.0.",
    canTypeInHardMode: true,
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function normalizeInput(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function validateConceptualInput(question: ConceptualQuestion, input: string): boolean {
  if (!input) return false;
  if (input === question.answer) return true;
  const clean = normalizeInput(input);
  if (clean === normalizeInput(question.answer)) return true;
  return question.aliases.some((alias) => clean === normalizeInput(alias));
}

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

function PrivateIPClassesQuizContent() {
  const searchParams = useSearchParams();
  const isMastery = searchParams.get("mastery") === "true";
  const initialStage = isMastery ? BLANK_COUNTS_BY_STAGE.length : 1;

  const [activeTab, setActiveTab] = useState<"table" | "questions">("table");
  const [stage, setStage] = useState(initialStage);
  const [blankCells, setBlankCells] = useState<Set<string>>(() => generateBlankSet(initialStage));
  const [tableAnswers, setTableAnswers] = useState<Record<string, string>>({});
  const [conceptAnswers, setConceptAnswers] = useState<Record<string, string>>({});
  const [showTableResults, setShowTableResults] = useState(false);
  const [showConceptResults, setShowConceptResults] = useState(false);
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [hasPassedConceptsOnce, setHasPassedConceptsOnce] = useState<boolean>(false);

  const useTableTextInput = isMastery || completedStages.length >= TEXT_INPUT_UNLOCK_ATTEMPTS;
  const useConceptTextInput = isMastery || hasPassedConceptsOnce;

  const [conceptQuestions, setConceptQuestions] = useState<ConceptualQuestion[]>(() =>
    isMastery ? shuffleArray(CONCEPTUAL_QUESTIONS) : CONCEPTUAL_QUESTIONS
  );

  const shuffledConceptOptions = useMemo(() => {
    const map: Record<string, string[]> = {};
    conceptQuestions.forEach((q) => {
      map[q.id] = shuffleArray(q.options);
    });
    return map;
  }, [conceptQuestions]);

  const startStage = useCallback((stageNum: number) => {
    setStage(stageNum);
    setBlankCells(generateBlankSet(stageNum));
    setTableAnswers({});
    setShowTableResults(false);
  }, []);

  const handleNextStage = () => {
    const nextStage = stage < BLANK_COUNTS_BY_STAGE.length ? stage + 1 : stage;
    startStage(nextStage);
  };

  const handleResetCurrentStage = () => {
    setBlankCells(generateBlankSet(stage));
    setTableAnswers({});
    setShowTableResults(false);
  };

  const handleCellChange = (cellKey: string, value: string) => {
    setTableAnswers((prev) => ({ ...prev, [cellKey]: value }));
  };

  const handleConceptChange = (questionId: string, value: string) => {
    setConceptAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const isCellCorrect = (key: string): boolean => {
    const correct = getCorrectAnswerForKey(key);
    const userVal = tableAnswers[key] || "";
    if (useTableTextInput) {
      return isTextAnswerCorrect(key, correct, userVal);
    }
    return userVal === correct;
  };

  const totalBlanks = blankCells.size;
  let correctBlanks = 0;
  blankCells.forEach((key) => {
    if (isCellCorrect(key)) {
      correctBlanks++;
    }
  });

  let correctConcepts = 0;
  conceptQuestions.forEach((q) => {
    if (validateConceptualInput(q, conceptAnswers[q.id] || "")) {
      correctConcepts++;
    }
  });

  const allTableCorrect = showTableResults && correctBlanks === totalBlanks;
  const allConceptsCorrect = showConceptResults && correctConcepts === conceptQuestions.length;

  const handleValidateTable = () => {
    setShowTableResults(true);
    if (correctBlanks === totalBlanks && !completedStages.includes(stage)) {
      setCompletedStages((prev) => [...prev, stage]);
    }
  };

  const handleValidateConcepts = () => {
    setShowConceptResults(true);
    if (correctConcepts === conceptQuestions.length && !hasPassedConceptsOnce) {
      setHasPassedConceptsOnce(true);
    }
  };

  const handleResetConcepts = () => {
    setConceptAnswers({});
    setShowConceptResults(false);
    setConceptQuestions(shuffleArray(CONCEPTUAL_QUESTIONS));
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
            <span className="text-xs text-slate-500 font-mono">{"//"}</span>
            <span className="text-xs text-slate-400 font-mono">RFC_1918_PRIVATE_RANGES</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="text-emerald-400 font-mono">ENT_ROUTER_V1</span>
            <span className="text-slate-600 font-light">|</span>
            <span className="text-slate-200">Private IP Address Classes</span>
          </h1>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <Link
            href="/study-guide#private-ipv4-addresses"
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

      <main className="w-full max-w-6xl terminal-box border-l-4 border-l-emerald-500 shadow-2xl space-y-6 font-mono">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("table")}
              className={`px-4 py-2 rounded-lg font-mono text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "table"
                  ? "bg-emerald-500/20 border border-emerald-500 text-emerald-400 shadow-sm shadow-emerald-950/50"
                  : "bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
              }`}
            >
              <span>[MATRIX_TABLE]</span>
              <span className="text-[11px] px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400 font-normal">
                {showTableResults
                  ? `${correctBlanks}/${totalBlanks}`
                  : `${Object.values(tableAnswers).filter((v) => v.trim() !== "").length}/${totalBlanks}`}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("questions")}
              className={`px-4 py-2 rounded-lg font-mono text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "questions"
                  ? "bg-cyan-500/20 border border-cyan-500 text-cyan-400 shadow-sm shadow-cyan-950/50"
                  : "bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
              }`}
            >
              <span>[KNOWLEDGE_CHECKS]</span>
              <span className="text-[11px] px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400 font-normal">
                {showConceptResults
                  ? `${correctConcepts}/${conceptQuestions.length}`
                  : `${Object.values(conceptAnswers).filter((v) => v.trim() !== "").length}/${conceptQuestions.length}`}
              </span>
            </button>
          </div>
          <div className="text-xs font-mono text-slate-400">
            ACTIVE_TAB: <span className="font-bold text-slate-200">{activeTab === "table" ? "TABLE MATRIX" : "DIAGNOSTIC QUESTIONS"}</span>
          </div>
        </div>

        {/* Table Tab Panel */}
        <div className={activeTab === "table" ? "space-y-6" : "hidden"}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
                [RFC_1918_PRIVATE_IP_MATRIX]
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-400">STAGE {stage} OF {BLANK_COUNTS_BY_STAGE.length}</span>
              <span className="text-slate-600">|</span>
              <span className="text-cyan-400">{totalBlanks} BLANKS ACTIVE</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Complete the missing fields for Class A, B, and C private IPv4 address allocations and default subnet masks across all highlighted blank cells in the matrix table below.
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
                {privateIPRows.map((row, rowIdx) => (
                  <tr
                    key={row.id}
                    className={`transition-colors ${
                      rowIdx % 2 === 0 ? "bg-slate-900/20" : "bg-slate-900/40"
                    } hover:bg-slate-800/30`}
                  >
                    {columns.map((col) => {
                      const cellKey = `${row.id}_${col.key}`;
                      const isBlank = blankCells.has(cellKey);
                      const selectedVal = tableAnswers[cellKey] || "";
                      const correctVal = row[col.key];

                      if (!isBlank) {
                        return (
                          <td
                            key={col.key}
                            className="p-3 border-r border-slate-800/60 last:border-r-0 text-slate-200"
                          >
                            <span className={col.key === "ipClass" ? "font-bold text-white" : ""}>
                              {col.key === "ipClass" ? `Class ${row[col.key]}` : row[col.key]}
                            </span>
                          </td>
                        );
                      }

                      const correct = isCellCorrect(cellKey);

                      return (
                        <td
                          key={col.key}
                          className={`p-2 border-r border-slate-800/60 last:border-r-0 transition-colors ${
                            showTableResults
                              ? correct
                                ? "bg-emerald-950/30"
                                : "bg-rose-950/30"
                              : "bg-slate-950/40"
                          }`}
                        >
                          <BlankCell
                            options={columnOptions[col.key]}
                            useTextInput={useTableTextInput}
                            showResults={showTableResults}
                            correct={correct}
                            correctVal={correctVal}
                            value={selectedVal}
                            onChange={(val) => handleCellChange(cellKey, val)}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Validation & Reset Controls */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-col items-center gap-4">
            {!showTableResults ? (
              <button
                type="button"
                onClick={handleValidateTable}
                disabled={Object.keys(tableAnswers).length === 0}
                className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-sm rounded-lg shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                VALIDATE PRIVATE IP MATRIX
              </button>
            ) : (
              <div className="w-full text-center space-y-4">
                <div
                  className={`p-4 rounded-lg border font-mono shadow-lg ${
                    allTableCorrect
                      ? "bg-emerald-950/40 text-emerald-300 border-emerald-500/60 shadow-emerald-950/40"
                      : "bg-rose-950/40 text-rose-300 border-rose-500/60 shadow-rose-950/40"
                  }`}
                >
                  <div className="text-xs mb-1 text-slate-400">
                    SCORE: <span className="font-bold text-white">{correctBlanks}</span> / {totalBlanks} BLANKS CORRECT
                  </div>
                  {allTableCorrect ? (
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
                        All {totalBlanks} blank private IP parameters accurately verified.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="text-base sm:text-lg font-bold mb-1 text-rose-400 flex items-center justify-center gap-2">
                        <span>[!]</span> MATRIX MISMATCH DETECTED
                      </div>
                      <p className="text-xs sm:text-sm text-rose-300/90 font-mono">
                        {totalBlanks - correctBlanks} parameter(s) incorrectly identified. Review flagged cells above.
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  {allTableCorrect && stage < BLANK_COUNTS_BY_STAGE.length && (
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
                    {allTableCorrect ? "SCRAMBLE & REPLAY STAGE" : "RETRY STAGE (NEW BLANKS)"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Questions Tab Panel */}
        <div className={activeTab === "questions" ? "space-y-6" : "hidden"}>
          <div className="pb-3 border-b border-slate-800/80">
            <h3 className="text-sm sm:text-base font-bold text-cyan-400 font-mono">
              [DIAGNOSTIC_KNOWLEDGE_CHECKS]
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Verify deployment parameters and subnetting rules for private IP allocations.
            </p>
          </div>

          <div className="space-y-4">
            {conceptQuestions.map((q, idx) => {
              const selected = conceptAnswers[q.id] || "";
              const isCorrect = validateConceptualInput(q, selected);
              const shouldType = useConceptTextInput && q.canTypeInHardMode;

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-lg border transition-all ${
                    showConceptResults
                      ? isCorrect
                        ? "border-emerald-500/60 bg-emerald-950/20"
                        : "border-rose-500/60 bg-rose-950/20"
                      : "border-slate-800/80 bg-slate-900/70 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/40 border border-cyan-900/50 px-2 py-0.5 rounded shrink-0">
                      #{idx + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm text-slate-200 font-medium mb-3">{q.prompt}</p>

                      {shouldType ? (
                        <div className="mt-2">
                          <input
                            type="text"
                            disabled={showConceptResults}
                            value={selected}
                            onChange={(e) => handleConceptChange(q.id, e.target.value)}
                            placeholder="Type the answer..."
                            className="w-full bg-slate-950 border border-slate-700 p-2.5 rounded-lg font-mono text-xs sm:text-sm text-slate-100 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 disabled:opacity-60"
                          />
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                          {shuffledConceptOptions[q.id].map((opt) => {
                            const isOptionSelected = selected === opt;
                            const isOptionCorrect = opt === q.answer;

                            let btnStyle =
                              "bg-slate-950 border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:text-white";
                            if (showConceptResults) {
                              if (isOptionCorrect) {
                                btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold";
                              } else if (isOptionSelected && !isOptionCorrect) {
                                btnStyle = "bg-rose-950/60 border-rose-500 text-rose-300 line-through";
                              } else {
                                btnStyle = "bg-slate-950/40 border-slate-800/40 text-slate-600 opacity-60";
                              }
                            } else if (isOptionSelected) {
                              btnStyle = "bg-cyan-950/40 border-cyan-400 text-cyan-300 font-bold shadow-sm";
                            }

                            return (
                              <button
                                key={opt}
                                type="button"
                                disabled={showConceptResults}
                                onClick={() => handleConceptChange(q.id, opt)}
                                className={`text-left p-2.5 rounded-lg text-xs font-mono border transition-all flex items-center justify-between cursor-pointer disabled:cursor-default ${btnStyle}`}
                              >
                                <span>{opt}</span>
                                {showConceptResults && isOptionCorrect && (
                                  <span className="text-emerald-400 text-xs font-bold">[OK]</span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {showConceptResults && (
                        <div
                          className={`mt-3 text-xs p-2.5 rounded-lg border font-mono ${
                            isCorrect
                              ? "bg-emerald-950/40 text-emerald-300 border-emerald-800/60"
                              : "bg-rose-950/40 text-rose-300 border-rose-800/60"
                          }`}
                        >
                          <span className="font-bold">
                            {isCorrect ? "[OK] VALIDATED: " : "[!] ERROR: "}
                          </span>
                          <span>{q.explanation}</span>
                          {!isCorrect && shouldType && (
                            <div className="mt-1 text-slate-300">
                              Expected: <span className="font-bold text-emerald-400">{q.answer}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Diagnostic Questions Validation & Reset Controls */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-col items-center gap-4">
            {!showConceptResults ? (
              <button
                type="button"
                onClick={handleValidateConcepts}
                disabled={Object.keys(conceptAnswers).length === 0}
                className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-sm rounded-lg shadow-lg shadow-cyan-950/50 hover:shadow-cyan-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                VALIDATE KNOWLEDGE CHECKS
              </button>
            ) : (
              <div className="w-full text-center space-y-4">
                <div
                  className={`p-4 rounded-lg border font-mono shadow-lg ${
                    allConceptsCorrect
                      ? "bg-emerald-950/40 text-emerald-300 border-emerald-500/60 shadow-emerald-950/40"
                      : "bg-rose-950/40 text-rose-300 border-rose-500/60 shadow-rose-950/40"
                  }`}
                >
                  <div className="text-xs mb-1 text-slate-400">
                    SCORE: <span className="font-bold text-white">{correctConcepts}</span> / {conceptQuestions.length} CHECKS CORRECT
                  </div>
                  {allConceptsCorrect ? (
                    <div>
                      <div className="text-base sm:text-lg font-bold mb-1 text-emerald-400 flex items-center justify-center gap-2">
                        <span>[OK]</span>
                        <span>ALL DIAGNOSTIC CHECKS VERIFIED</span>
                      </div>
                      <p className="text-xs sm:text-sm text-emerald-300/90 font-mono">
                        All conceptual knowledge checks accurately answered.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="text-base sm:text-lg font-bold mb-1 text-rose-400 flex items-center justify-center gap-2">
                        <span>[!]</span> KNOWLEDGE CHECK ERRORS DETECTED
                      </div>
                      <p className="text-xs sm:text-sm text-rose-300/90 font-mono">
                        {conceptQuestions.length - correctConcepts} check(s) incorrectly answered. Review flagged items above.
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    type="button"
                    onClick={handleResetConcepts}
                    className="px-6 py-2.5 border border-cyan-500/40 hover:border-cyan-400 bg-slate-900/80 hover:bg-slate-800 text-cyan-400 font-bold font-mono text-sm rounded-lg transition-all cursor-pointer"
                  >
                    {allConceptsCorrect ? "SCRAMBLE & REPLAY CHECKS" : "RETRY KNOWLEDGE CHECKS"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function PrivateIPClassesPage() {
  return (
    <Suspense fallback={null}>
      <PrivateIPClassesQuizContent />
    </Suspense>
  );
}
