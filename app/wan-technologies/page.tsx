"use client";

import { useState, useCallback, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// ---------------------------------------------------------------------------
// MATRIX TABLE DEFINITIONS (T1, E1, T3, E3, ISDN)
// ---------------------------------------------------------------------------

interface CarrierRow {
  id: number;
  carrier: string;
  channels: string;
  maxThroughput: string;
}

type ColumnKey = "carrier" | "channels" | "maxThroughput";

interface ColumnConfig {
  key: ColumnKey;
  label: string;
}

const columns: ColumnConfig[] = [
  { key: "carrier", label: "Carrier" },
  { key: "channels", label: "64 Kbps Channels" },
  { key: "maxThroughput", label: "Max Throughput" },
];

const carrierRows: CarrierRow[] = [
  {
    id: 1,
    carrier: "T1",
    channels: "24",
    maxThroughput: "1.544 Mbps",
  },
  {
    id: 2,
    carrier: "E1",
    channels: "32",
    maxThroughput: "2.048 Mbps",
  },
  {
    id: 3,
    carrier: "T3",
    channels: "672 (T1x28)",
    maxThroughput: "44.736 Mbps",
  },
  {
    id: 4,
    carrier: "E3",
    channels: "512 (E1x16)",
    maxThroughput: "34.368 Mbps",
  },
  {
    id: 5,
    carrier: "ISDN",
    channels: "2",
    maxThroughput: "128 Kbps",
  },
];

const columnOptions: Record<ColumnKey, string[]> = {
  carrier: ["T1", "E1", "T3", "E3", "ISDN"],
  channels: ["2", "24", "32", "672 (T1x28)", "512 (E1x16)"],
  maxThroughput: ["128 Kbps", "1.544 Mbps", "2.048 Mbps", "34.368 Mbps", "44.736 Mbps"],
};

const BLANK_COUNTS_BY_STAGE = [5, 10, 15];
const TEXT_INPUT_UNLOCK_ATTEMPTS = 1;

function getAllCellKeysForRow(row: CarrierRow): string[] {
  return columns.map((col) => `${row.id}_${col.key}`);
}

const PERMUTATIONS_5: number[][] = (function () {
  const result: number[][] = [];
  function permute(arr: number[], m: number[] = []) {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        const curr = arr.slice();
        const next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  }
  permute([0, 1, 2, 3, 4]);
  return result;
})();

function generateBlankSet(stageNum: number): Set<string> {
  const targetCount = BLANK_COUNTS_BY_STAGE[Math.min(stageNum - 1, BLANK_COUNTS_BY_STAGE.length - 1)];
  const selectedKeys = new Set<string>();

  if (targetCount >= carrierRows.length) {
    carrierRows.forEach((row) => {
      const rowKeys = getAllCellKeysForRow(row);
      const randomKey = rowKeys[Math.floor(Math.random() * rowKeys.length)];
      selectedKeys.add(randomKey);
    });
  }

  const allKeys = carrierRows.flatMap((row) => getAllCellKeysForRow(row));
  const remainingCandidates = allKeys
    .filter((key) => !selectedKeys.has(key))
    .sort(() => Math.random() - 0.5);

  for (const key of remainingCandidates) {
    if (selectedKeys.size >= targetCount) break;
    selectedKeys.add(key);
  }

  return selectedKeys;
}

function isTextAnswerCorrect(colKey: ColumnKey, correct: string, userInput: string): boolean {
  if (!userInput.trim()) return false;

  const cleanInput = userInput.trim().toLowerCase();
  const cleanCorrect = correct.trim().toLowerCase();

  if (colKey === "carrier") {
    return cleanInput === cleanCorrect || cleanInput.replace(/[-_ ]/g, "") === cleanCorrect.replace(/[-_ ]/g, "");
  }

  if (colKey === "channels") {
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

  if (colKey === "maxThroughput") {
    const rawNum = correct.split(" ")[0].toLowerCase();
    const rawUnit = (correct.split(" ")[1] || "").toLowerCase();
    const inputWithoutSpaces = cleanInput.replace(/\s+/g, "");

    return (
      cleanInput === cleanCorrect ||
      inputWithoutSpaces === `${rawNum}${rawUnit}` ||
      inputWithoutSpaces === `${rawNum}${rawUnit.replace("bps", "b/s")}` ||
      inputWithoutSpaces === `${rawNum}${rawUnit.replace("bps", "b")}` ||
      inputWithoutSpaces === `${rawNum}${rawUnit[0]}` ||
      cleanInput === rawNum
    );
  }

  return cleanInput === cleanCorrect;
}

function getBestRowMapping(
  tableAnswers: Record<string, string>,
  blankCells: Set<string>,
  useTextInput: boolean
): number[] {
  const scoreMatrix: number[][] = carrierRows.map((row) => {
    return carrierRows.map((targetCarrier) => {
      let score = 0;
      for (const col of columns) {
        const cellKey = `${row.id}_${col.key}`;
        const isBlank = blankCells.has(cellKey);
        const targetVal = targetCarrier[col.key];

        if (!isBlank) {
          const fixedVal = row[col.key];
          if (fixedVal === targetVal) {
            score += 10;
          }
        } else {
          const userVal = tableAnswers[cellKey] || "";
          if (userVal.trim()) {
            const isCorrect = useTextInput
              ? isTextAnswerCorrect(col.key, targetVal, userVal)
              : userVal === targetVal;
            if (isCorrect) {
              score += 1;
            }
          }
        }
      }
      return score;
    });
  });

  let bestPerm = [0, 1, 2, 3, 4];
  let maxScore = -1;
  let maxIdentityMatches = -1;

  for (const perm of PERMUTATIONS_5) {
    let currentScore = 0;
    let identityMatches = 0;
    for (let r = 0; r < 5; r++) {
      currentScore += scoreMatrix[r][perm[r]];
      if (perm[r] === r) {
        identityMatches++;
      }
    }

    if (
      currentScore > maxScore ||
      (currentScore === maxScore && identityMatches > maxIdentityMatches)
    ) {
      maxScore = currentScore;
      maxIdentityMatches = identityMatches;
      bestPerm = perm;
    }
  }

  return bestPerm;
}

// ---------------------------------------------------------------------------
// DIAGNOSTIC QUESTIONS & SCENARIOS
// ---------------------------------------------------------------------------

interface WANQuestion {
  id: string;
  prompt: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface WANScenarioMatch {
  id: string;
  scenarioTitle: string;
  description: string;
  options: string[];
  answer: string;
  explanation: string;
}

const initialPart1Questions: WANQuestion[] = [
  {
    id: "wan-pots-acronym",
    prompt: "What does the acronym 'POTS' stand for in telecommunications?",
    options: [
      "Plain Old Telephone Service",
      "Packet Optical Transmission System",
      "Private Open Telephony Standard",
      "Point of Termination System",
    ],
    answer: "Plain Old Telephone Service",
    explanation: "POTS stands for Plain Old Telephone Service, providing analog voice connections over legacy copper wiring.",
  },
  {
    id: "wan-pots-signal-type",
    prompt: "What signal type was used by traditional POTS lines for dial-up connections?",
    options: [
      "Analog signals",
      "Digital signals",
      "Radio frequency signals",
      "Telepathy",
    ],
    answer: "Analog signals",
    explanation: "Traditional POTS lines provided analog telephone connections over physical copper wires.",
  },
  {
    id: "wan-dialup-speeds",
    prompt: "What was the typical speed range of traditional dial-up modems?",
    options: [
      "Approximately 300 bps to 54 Kbps",
      "Approximately 64 Kbps to 128 Kbps",
      "Approximately 1.544 Mbps to 44.736 Mbps",
      "Approximately 10 Mb/s to 100 Mb/s",
    ],
    answer: "Approximately 300 bps to 54 Kbps",
    explanation: "Dial-up modem speeds ranged from approximately 300 bps (early acoustic couplers) up to 54 Kbps (or 56 Kbps standard), depending on the modem and line standard.",
  },
];

const initialPart2Questions: WANQuestion[] = [
  {
    id: "wan-channel-bandwidth",
    prompt: "What is the standard bandwidth capacity of each individual digital channel used in ISDN, T-carrier, and E-carrier systems?",
    options: [
      "64 Kbps",
      "32 Kbps",
      "128 Kbps",
      "54 Kbps",
    ],
    answer: "64 Kbps",
    explanation: "Standard digital carrier channels operate at 64 Kbps each, which is the bandwidth required to digitize an analog voice telephone call.",
  },
  {
    id: "wan-isdn-spec",
    prompt: "What is the maximum throughput and 64 Kbps channel count of an ISDN connection?",
    options: [
      "128 Kbps (2 channels)",
      "1.544 Mbps (24 channels)",
      "2.048 Mbps (32 channels)",
      "44.736 Mbps (672 channels)",
    ],
    answer: "128 Kbps (2 channels)",
    explanation: "Basic ISDN combines 2 individual 64 Kbps channels to deliver a maximum aggregate throughput of 128 Kbps.",
  },
  {
    id: "wan-t1-throughput",
    prompt: "What is the maximum throughput provided by a single North American T1 carrier line?",
    options: [
      "1.544 Mbps",
      "2.048 Mbps",
      "34.368 Mbps",
      "44.736 Mbps",
    ],
    answer: "1.544 Mbps",
    explanation: "A T1 carrier line provides a total maximum throughput of 1.544 Mbps across its 24 channels (including framing overhead).",
  },
  {
    id: "wan-e1-throughput",
    prompt: "What is the maximum throughput provided by a single European E1 carrier line?",
    options: [
      "2.048 Mbps",
      "1.544 Mbps",
      "34.368 Mbps",
      "44.736 Mbps",
    ],
    answer: "2.048 Mbps",
    explanation: "An E1 carrier line provides a total maximum throughput of 2.048 Mbps across its 32 channels.",
  },
  {
    id: "wan-t3-throughput",
    prompt: "What is the maximum throughput provided by a North American T3 carrier line?",
    options: [
      "44.736 Mbps",
      "34.368 Mbps",
      "1.544 Mbps",
      "2.048 Mbps",
    ],
    answer: "44.736 Mbps",
    explanation: "A T3 carrier line delivers a maximum throughput of 44.736 Mbps (aggregating 28 bundled T1 circuits).",
  },
  {
    id: "wan-e3-throughput",
    prompt: "What is the maximum throughput provided by a European E3 carrier line?",
    options: [
      "34.368 Mbps",
      "44.736 Mbps",
      "2.048 Mbps",
      "1.544 Mbps",
    ],
    answer: "34.368 Mbps",
    explanation: "An E3 carrier line delivers a maximum throughput of 34.368 Mbps (aggregating 16 bundled E1 circuits).",
  },
];

const initialPart3Questions: WANQuestion[] = [
  {
    id: "wan-t1-channel-count",
    prompt: "How many 64 Kbps channels are contained within a single T1 line?",
    options: [
      "24 channels",
      "32 channels",
      "28 channels",
      "16 channels",
    ],
    answer: "24 channels",
    explanation: "A standard T1 line contains exactly 24 individual 64 Kbps channels.",
  },
  {
    id: "wan-e1-channel-count",
    prompt: "How many 64 Kbps channels are contained within a single E1 line?",
    options: [
      "32 channels",
      "24 channels",
      "16 channels",
      "28 channels",
    ],
    answer: "32 channels",
    explanation: "A standard E1 line contains exactly 32 individual 64 Kbps channels.",
  },
  {
    id: "wan-t3-multiplier",
    prompt: "How many T1 circuits are bundled together to form a single T3 line, and how many total 64 Kbps channels does it provide?",
    options: [
      "28 T1 lines (672 channels)",
      "16 T1 lines (512 channels)",
      "24 T1 lines (576 channels)",
      "32 T1 lines (768 channels)",
    ],
    answer: "28 T1 lines (672 channels)",
    explanation: "A T3 line multiplexes 28 T1 lines (T1x28), providing a total of 672 channels (28 x 24 = 672).",
  },
  {
    id: "wan-e3-multiplier",
    prompt: "How many E1 circuits are bundled together to form a single E3 line, and how many total 64 Kbps channels does it provide?",
    options: [
      "16 E1 lines (512 channels)",
      "28 E1 lines (672 channels)",
      "24 E1 lines (768 channels)",
      "32 E1 lines (1024 channels)",
    ],
    answer: "16 E1 lines (512 channels)",
    explanation: "An E3 line multiplexes 16 E1 lines (E1x16), providing a total of 512 channels (16 x 32 = 512).",
  },
];

const initialPart4Questions: WANQuestion[] = [
  {
    id: "wan-north-america-standards",
    prompt: "Which digital carrier line standards were primarily used in North America?",
    options: [
      "T1 and T3",
      "E1 and E3",
      "ISDN and E1",
      "E3 and T3",
    ],
    answer: "T1 and T3",
    explanation: "T-carrier systems (T1 and T3) were developed and primarily deployed across North America.",
  },
  {
    id: "wan-europe-standards",
    prompt: "Which digital carrier line standards were primarily used in Europe?",
    options: [
      "E1 and E3",
      "T1 and T3",
      "ISDN and T1",
      "T3 and E1",
    ],
    answer: "E1 and E3",
    explanation: "E-carrier systems (E1 and E3) were developed and primarily deployed across Europe.",
  },
];

const initialScenarios: WANScenarioMatch[] = [
  {
    id: "scen-na-branch-office",
    scenarioTitle: "North American Branch Office Connection",
    description: "A branch office in Chicago connects to headquarters using a single digital carrier line providing 24 channels of 64 Kbps with a total throughput of 1.544 Mbps.",
    options: ["T1", "T3", "E1", "E3", "ISDN", "Dial-up POTS"],
    answer: "T1",
    explanation: "T1 is the standard North American digital carrier line delivering 24 channels and 1.544 Mbps max throughput.",
  },
  {
    id: "scen-eu-data-center",
    scenarioTitle: "European Data Center Primary Trunk",
    description: "A data center in Frankfurt deploys a digital line providing 32 channels of 64 Kbps with an overall throughput of 2.048 Mbps.",
    options: ["T1", "T3", "E1", "E3", "ISDN", "Dial-up POTS"],
    answer: "E1",
    explanation: "E1 is the European digital carrier standard delivering 32 channels and 2.048 Mbps max throughput.",
  },
  {
    id: "scen-na-telecom-aggregator",
    scenarioTitle: "North American High-Capacity Core Backbone",
    description: "An ISP core router aggregates 28 T1 circuits into a single high-speed trunk providing 672 channels and 44.736 Mbps throughput.",
    options: ["T1", "T3", "E1", "E3", "ISDN", "Dial-up POTS"],
    answer: "T3",
    explanation: "T3 bundles 28 T1 lines together (T1x28) to provide 672 channels and 44.736 Mbps throughput in North America.",
  },
  {
    id: "scen-eu-broadband-backbone",
    scenarioTitle: "European Metropolitan Trunk Bundling",
    description: "A telecom provider in Paris bundles 16 E1 circuits into a high-throughput line supplying 512 channels and 34.368 Mbps bandwidth.",
    options: ["T1", "T3", "E1", "E3", "ISDN", "Dial-up POTS"],
    answer: "E3",
    explanation: "E3 bundles 16 E1 lines together (E1x16) to provide 512 channels and 34.368 Mbps throughput in Europe.",
  },
  {
    id: "scen-small-office-digital",
    scenarioTitle: "Dual-Channel Digital Subscriber Connection",
    description: "A small business connects two 64 Kbps channels simultaneously over digital telephone lines to achieve 128 Kbps total bandwidth.",
    options: ["T1", "T3", "E1", "E3", "ISDN", "Dial-up POTS"],
    answer: "ISDN",
    explanation: "Basic ISDN operates by bonding two 64 Kbps channels together to reach a maximum throughput of 128 Kbps.",
  },
  {
    id: "scen-legacy-analog-terminal",
    scenarioTitle: "Remote Outpost Point-of-Sale Terminal",
    description: "A remote kiosk transmits point-of-sale data over copper telephone lines using an acoustic modulator ranging between 300 bps and 54 Kbps.",
    options: ["T1", "T3", "E1", "E3", "ISDN", "Dial-up POTS"],
    answer: "Dial-up POTS",
    explanation: "Dial-up POTS lines utilize analog telephone lines over copper wires with modem speeds ranging from 300 bps to 54 Kbps.",
  },
];

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// ---------------------------------------------------------------------------
// CELL SELECT OR INPUT COMPONENT
// ---------------------------------------------------------------------------

interface CellProps {
  cellKey: string;
  colKey: ColumnKey;
  value: string;
  correctVal: string;
  options: string[];
  showResults: boolean;
  useTextInput: boolean;
  onChange: (cellKey: string, value: string) => void;
}

function CarrierCellSelectOrInput({
  cellKey,
  colKey,
  value,
  correctVal,
  options,
  showResults,
  useTextInput,
  onChange,
}: CellProps) {
  const isCorrect = useTextInput
    ? isTextAnswerCorrect(colKey, correctVal, value)
    : value === correctVal;

  let cellBgClass = "bg-slate-900 border-slate-700 text-slate-200";
  if (showResults) {
    if (isCorrect) {
      cellBgClass = "bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold";
    } else {
      cellBgClass = "bg-rose-950/40 border-rose-500 text-rose-300";
    }
  }

  return (
    <div className="flex flex-col gap-1 w-full min-w-[140px]">
      {useTextInput ? (
        <input
          type="text"
          value={value}
          disabled={showResults}
          onChange={(e) => onChange(cellKey, e.target.value)}
          placeholder={`Type ${colKey}...`}
          className={`w-full p-2 text-xs font-mono rounded border transition-colors outline-none focus:border-emerald-500 disabled:opacity-90 ${cellBgClass}`}
        />
      ) : (
        <select
          value={value}
          disabled={showResults}
          onChange={(e) => onChange(cellKey, e.target.value)}
          className={`w-full p-2 text-xs font-mono rounded border transition-colors outline-none focus:border-emerald-500 disabled:opacity-90 cursor-pointer disabled:cursor-default ${cellBgClass}`}
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
          Expected: {correctVal}
        </span>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// MAIN QUIZ COMPONENT
// ---------------------------------------------------------------------------

function WANTechnologiesContent() {
  const searchParams = useSearchParams();
  const isMastery = searchParams.get("mastery") === "true";
  const initialStage = isMastery ? BLANK_COUNTS_BY_STAGE.length : 1;

  const [activeTab, setActiveTab] = useState<"table" | "questions">("table");
  const [stage, setStage] = useState(initialStage);
  const [blankCells, setBlankCells] = useState<Set<string>>(() => generateBlankSet(initialStage));
  const [tableAnswers, setTableAnswers] = useState<Record<string, string>>({});
  const [showTableResults, setShowTableResults] = useState(false);
  const [completedStages, setCompletedStages] = useState<number[]>([]);

  const useTableTextInput = isMastery || completedStages.length >= TEXT_INPUT_UNLOCK_ATTEMPTS;

  // Row Mapping for flexible carrier row order
  const rowMapping = useMemo(
    () => getBestRowMapping(tableAnswers, blankCells, useTableTextInput),
    [tableAnswers, blankCells, useTableTextInput]
  );

  // Diagnostic Questions State
  const [part1Questions, setPart1Questions] = useState<WANQuestion[]>(() =>
    isMastery
      ? shuffleArray(initialPart1Questions).map((q) => ({ ...q, options: shuffleArray(q.options) }))
      : initialPart1Questions
  );

  const [part2Questions, setPart2Questions] = useState<WANQuestion[]>(() =>
    isMastery
      ? shuffleArray(initialPart2Questions).map((q) => ({ ...q, options: shuffleArray(q.options) }))
      : initialPart2Questions
  );

  const [part3Questions, setPart3Questions] = useState<WANQuestion[]>(() =>
    isMastery
      ? shuffleArray(initialPart3Questions).map((q) => ({ ...q, options: shuffleArray(q.options) }))
      : initialPart3Questions
  );

  const [part4Questions, setPart4Questions] = useState<WANQuestion[]>(() =>
    isMastery
      ? shuffleArray(initialPart4Questions).map((q) => ({ ...q, options: shuffleArray(q.options) }))
      : initialPart4Questions
  );

  const [scenarios, setScenarios] = useState<WANScenarioMatch[]>(() =>
    isMastery
      ? shuffleArray(initialScenarios).map((s) => ({ ...s, options: shuffleArray(s.options) }))
      : initialScenarios
  );

  const [questionAnswers, setQuestionAnswers] = useState<Record<string, string>>({});
  const [showQuestionsResults, setShowQuestionsResults] = useState(false);

  // Table Matrix Handlers
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

  const isCellCorrect = useCallback(
    (rowIdx: number, colKey: ColumnKey): boolean => {
      const row = carrierRows[rowIdx];
      const cellKey = `${row.id}_${colKey}`;
      const targetCarrier = carrierRows[rowMapping[rowIdx]];
      const targetVal = targetCarrier[colKey];
      const userVal = tableAnswers[cellKey] || "";
      if (useTableTextInput) {
        return isTextAnswerCorrect(colKey, targetVal, userVal);
      }
      return userVal === targetVal;
    },
    [rowMapping, tableAnswers, useTableTextInput]
  );

  const totalBlanks = blankCells.size;
  let correctBlanks = 0;
  carrierRows.forEach((row, rowIdx) => {
    columns.forEach((col) => {
      const cellKey = `${row.id}_${col.key}`;
      if (blankCells.has(cellKey)) {
        if (isCellCorrect(rowIdx, col.key)) {
          correctBlanks++;
        }
      }
    });
  });

  const allTableCorrect = showTableResults && correctBlanks === totalBlanks;

  const handleValidateTable = () => {
    setShowTableResults(true);
    if (correctBlanks === totalBlanks && !completedStages.includes(stage)) {
      setCompletedStages((prev) => [...prev, stage]);
    }
  };

  // Diagnostic Questions Handlers
  const handleSelectQuestionAnswer = (id: string, value: string) => {
    setQuestionAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const isQuestionCorrect = useCallback(
    (id: string, correct: string) => {
      const userVal = (questionAnswers[id] || "").trim();
      return userVal === correct;
    },
    [questionAnswers]
  );

  const part1CorrectCount = useMemo(
    () => part1Questions.filter((q) => isQuestionCorrect(q.id, q.answer)).length,
    [part1Questions, isQuestionCorrect]
  );

  const part2CorrectCount = useMemo(
    () => part2Questions.filter((q) => isQuestionCorrect(q.id, q.answer)).length,
    [part2Questions, isQuestionCorrect]
  );

  const part3CorrectCount = useMemo(
    () => part3Questions.filter((q) => isQuestionCorrect(q.id, q.answer)).length,
    [part3Questions, isQuestionCorrect]
  );

  const part4CorrectCount = useMemo(
    () => part4Questions.filter((q) => isQuestionCorrect(q.id, q.answer)).length,
    [part4Questions, isQuestionCorrect]
  );

  const scenarioCorrectCount = useMemo(
    () => scenarios.filter((s) => isQuestionCorrect(s.id, s.answer)).length,
    [scenarios, isQuestionCorrect]
  );

  const totalDiagnosticQuestions =
    part1Questions.length +
    part2Questions.length +
    part3Questions.length +
    part4Questions.length +
    scenarios.length;

  const totalDiagnosticCorrect =
    part1CorrectCount +
    part2CorrectCount +
    part3CorrectCount +
    part4CorrectCount +
    scenarioCorrectCount;

  const allDiagnosticCorrect =
    showQuestionsResults && totalDiagnosticCorrect === totalDiagnosticQuestions;

  const handleValidateQuestions = () => {
    setShowQuestionsResults(true);
  };

  const handleResetAndScrambleQuestions = () => {
    setQuestionAnswers({});
    setShowQuestionsResults(false);
    setPart1Questions(
      shuffleArray(initialPart1Questions).map((q) => ({
        ...q,
        options: shuffleArray(q.options),
      }))
    );
    setPart2Questions(
      shuffleArray(initialPart2Questions).map((q) => ({
        ...q,
        options: shuffleArray(q.options),
      }))
    );
    setPart3Questions(
      shuffleArray(initialPart3Questions).map((q) => ({
        ...q,
        options: shuffleArray(q.options),
      }))
    );
    setPart4Questions(
      shuffleArray(initialPart4Questions).map((q) => ({
        ...q,
        options: shuffleArray(q.options),
      }))
    );
    setScenarios(
      shuffleArray(initialScenarios).map((s) => ({
        ...s,
        options: shuffleArray(s.options),
      }))
    );
  };

  const renderQuestionBlock = (q: WANQuestion, index: number) => {
    const selected = questionAnswers[q.id] || "";
    const isCorrect = isQuestionCorrect(q.id, q.answer);

    return (
      <div
        key={q.id}
        className={`p-4 rounded-lg border transition-all ${
          showQuestionsResults
            ? isCorrect
              ? "border-emerald-500/60 bg-emerald-950/20"
              : "border-rose-500/60 bg-rose-950/20"
            : "border-slate-800/80 bg-slate-900/70 hover:border-slate-700"
        }`}
      >
        <div className="flex items-start gap-3">
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-2 py-0.5 rounded shrink-0">
            #{String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex-grow">
            <p className="text-xs sm:text-sm text-slate-200 font-medium mb-3">{q.prompt}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {q.options.map((opt) => {
                const isOptionSelected = selected === opt;
                const isOptionCorrect = opt === q.answer;

                let btnStyle =
                  "bg-slate-950 border-slate-800 text-slate-300 hover:border-emerald-500/50 hover:text-white";
                if (showQuestionsResults) {
                  if (isOptionCorrect) {
                    btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold";
                  } else if (isOptionSelected && !isOptionCorrect) {
                    btnStyle = "bg-rose-950/60 border-rose-500 text-rose-300 line-through";
                  } else {
                    btnStyle = "bg-slate-950/40 border-slate-800/40 text-slate-600 opacity-60";
                  }
                } else if (isOptionSelected) {
                  btnStyle = "bg-emerald-950/40 border-emerald-400 text-emerald-300 font-bold shadow-sm";
                }

                return (
                  <button
                    key={opt}
                    type="button"
                    disabled={showQuestionsResults}
                    onClick={() => handleSelectQuestionAnswer(q.id, opt)}
                    className={`text-left p-2.5 rounded-lg text-xs font-mono border transition-all flex items-center justify-between cursor-pointer disabled:cursor-default ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {showQuestionsResults && isOptionCorrect && (
                      <span className="text-emerald-400 text-xs font-bold">[OK]</span>
                    )}
                    {showQuestionsResults && isOptionSelected && !isOptionCorrect && (
                      <span className="text-rose-400 text-xs font-bold">[!]</span>
                    )}
                  </button>
                );
              })}
            </div>

            {showQuestionsResults && (
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
                <span className="font-mono">{q.explanation}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 flex flex-col items-center justify-start max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <header className="w-full max-w-6xl terminal-box border-l-4 border-l-emerald-500 shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="cyber-badge cyber-badge-emerald">SYSTEM_WAN_DIAGNOSTICS</span>
            <span className="text-xs text-slate-500 font-mono">{"//"}</span>
            <span className="text-xs text-slate-400 font-mono">CARRIER_STANDARDS_&_MODEMS</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="text-emerald-400 font-mono">ENT_ROUTER_V1</span>
            <span className="text-slate-600 font-light">|</span>
            <span className="text-slate-200">WAN Technologies</span>
          </h1>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <Link
            href="/study-guide#wan-technologies"
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

      {/* Main Container */}
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
              <span>[DIAGNOSTIC_QUESTIONS]</span>
              <span className="text-[11px] px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400 font-normal">
                {showQuestionsResults
                  ? `${totalDiagnosticCorrect}/${totalDiagnosticQuestions}`
                  : `${Object.values(questionAnswers).filter((v) => v.trim() !== "").length}/${totalDiagnosticQuestions}`}
              </span>
            </button>
          </div>
          <div className="text-xs font-mono text-slate-400">
            ACTIVE_TAB: <span className="font-bold text-slate-200">{activeTab === "table" ? "TABLE MATRIX" : "DIAGNOSTIC QUESTIONS"}</span>
          </div>
        </div>

        {/* ---------------- TABLE TAB PANEL ---------------- */}
        <div className={activeTab === "table" ? "space-y-6" : "hidden"}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
                [CARRIER_SPECIFICATIONS_MATRIX]
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-400">STAGE {stage} OF {BLANK_COUNTS_BY_STAGE.length}</span>
              <span className="text-slate-600">|</span>
              <span className="text-cyan-400">{totalBlanks} BLANKS ACTIVE</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Complete the missing carrier standards, 64 Kbps channel capacities, and maximum throughput specifications across all highlighted blank cells in the matrix table below.
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
                {carrierRows.map((row, rowIdx) => (
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
                      const targetCarrier = carrierRows[rowMapping[rowIdx]];
                      const correctVal = targetCarrier[col.key];

                      if (!isBlank) {
                        return (
                          <td
                            key={col.key}
                            className="p-3 border-r border-slate-800/60 last:border-r-0 text-slate-200"
                          >
                            <span className={col.key === "carrier" ? "font-bold text-white" : ""}>
                              {row[col.key]}
                            </span>
                          </td>
                        );
                      }

                      return (
                        <td
                          key={col.key}
                          className="p-2.5 border-r border-slate-800/60 last:border-r-0 bg-slate-950/40"
                        >
                          <CarrierCellSelectOrInput
                            cellKey={cellKey}
                            colKey={col.key}
                            value={selectedVal}
                            correctVal={correctVal}
                            options={columnOptions[col.key]}
                            showResults={showTableResults}
                            useTextInput={useTableTextInput}
                            onChange={handleCellChange}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
            <div className="flex flex-wrap items-center gap-3">
              {!showTableResults ? (
                <button
                  type="button"
                  onClick={handleValidateTable}
                  className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-xs sm:text-sm rounded-lg shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/20 transition-all cursor-pointer"
                >
                  [CHECK_MATRIX_TABLE]
                </button>
              ) : allTableCorrect ? (
                stage < BLANK_COUNTS_BY_STAGE.length ? (
                  <button
                    type="button"
                    onClick={handleNextStage}
                    className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-xs sm:text-sm rounded-lg shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/20 transition-all cursor-pointer"
                  >
                    [NEXT_STAGE (STAGE {stage + 1})]
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleResetCurrentStage}
                    className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-xs sm:text-sm rounded-lg shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/20 transition-all cursor-pointer"
                  >
                    [PRACTICE_AGAIN]
                  </button>
                )
              ) : (
                <button
                  type="button"
                  onClick={() => setShowTableResults(false)}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-mono text-xs sm:text-sm rounded-lg shadow-lg shadow-amber-950/50 transition-all cursor-pointer"
                >
                  [RETRY_MISSED_CELLS]
                </button>
              )}
            </div>
          </div>

          {/* Table Results Summary */}
          {showTableResults && (
            <div
              className={`p-4 rounded-xl border font-mono transition-all ${
                allTableCorrect
                  ? "bg-emerald-950/30 border-emerald-500/60 text-emerald-200"
                  : "bg-slate-900/90 border-slate-800 text-slate-200"
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="space-y-1">
                  <div className="font-bold flex items-center gap-2">
                    <span className={allTableCorrect ? "text-emerald-400" : "text-amber-400"}>
                      {allTableCorrect ? "[STAGE_VERIFIED_SUCCESS]" : "[DIAGNOSTIC_EVALUATION]"}
                    </span>
                    <span>-</span>
                    <span>
                      Accuracy: {correctBlanks}/{totalBlanks} cells (
                      {Math.round((correctBlanks / totalBlanks) * 100)}%)
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {allTableCorrect
                      ? stage < BLANK_COUNTS_BY_STAGE.length
                        ? `Stage ${stage} passed. Advance to Stage ${stage + 1} to test more blanks.`
                        : "Carrier specification table fully mastered across all T-carrier, E-carrier, and ISDN standards."
                      : "Review highlighted red cells with expected values and try again."}
                  </p>
                </div>
                {allTableCorrect && stage < BLANK_COUNTS_BY_STAGE.length && (
                  <button
                    type="button"
                    onClick={handleNextStage}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-all shrink-0 cursor-pointer"
                  >
                    ADVANCE &rarr;
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ---------------- QUESTIONS TAB PANEL ---------------- */}
        <div className={activeTab === "questions" ? "space-y-8" : "hidden"}>
          {/* Part 1: POTS & Modems */}
          <section className="terminal-box border-l-4 border-l-emerald-500 shadow-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
                  [PART_01: POTS_&_MODEMS]
                </h3>
              </div>
              {showQuestionsResults && (
                <div className="font-mono text-xs px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300">
                  SCORE:{" "}
                  <span
                    className={
                      part1CorrectCount === part1Questions.length
                        ? "text-emerald-400 font-bold"
                        : "text-amber-400 font-bold"
                    }
                  >
                    {part1CorrectCount}
                  </span>{" "}
                  / {part1Questions.length}
                </div>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-mono mb-6">
              Select the correct technical response regarding analog copper lines, signal modulation, and dial-up throughput.
            </p>

            <div className="space-y-4">
              {part1Questions.map((q, index) => renderQuestionBlock(q, index))}
            </div>
          </section>

          {/* Part 2: Carrier Standards & Max Throughput */}
          <section className="terminal-box border-l-4 border-l-emerald-500 shadow-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
                  [PART_02: CARRIER_STANDARDS_&_MAX_THROUGHPUT]
                </h3>
              </div>
              {showQuestionsResults && (
                <div className="font-mono text-xs px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300">
                  SCORE:{" "}
                  <span
                    className={
                      part2CorrectCount === part2Questions.length
                        ? "text-emerald-400 font-bold"
                        : "text-amber-400 font-bold"
                    }
                  >
                    {part2CorrectCount}
                  </span>{" "}
                  / {part2Questions.length}
                </div>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-mono mb-6">
              Identify maximum throughput specifications and single-channel bandwidth across ISDN, T-carrier, and E-carrier systems.
            </p>

            <div className="space-y-4">
              {part2Questions.map((q, index) => renderQuestionBlock(q, index))}
            </div>
          </section>

          {/* Part 3: Channel Capacity & Carrier Multipliers */}
          <section className="terminal-box border-l-4 border-l-emerald-500 shadow-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
                  [PART_03: CHANNEL_CAPACITY_&_CARRIER_MULTIPLIERS]
                </h3>
              </div>
              {showQuestionsResults && (
                <div className="font-mono text-xs px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300">
                  SCORE:{" "}
                  <span
                    className={
                      part3CorrectCount === part3Questions.length
                        ? "text-emerald-400 font-bold"
                        : "text-amber-400 font-bold"
                    }
                  >
                    {part3CorrectCount}
                  </span>{" "}
                  / {part3Questions.length}
                </div>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-mono mb-6">
              Calculate 64 Kbps channel counts and multiplier bundling for T1, E1, T3, and E3.
            </p>

            <div className="space-y-4">
              {part3Questions.map((q, index) => renderQuestionBlock(q, index))}
            </div>
          </section>

          {/* Part 4: Geographic Deployment & Regional Standards */}
          <section className="terminal-box border-l-4 border-l-emerald-500 shadow-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
                  [PART_04: GEOGRAPHIC_DEPLOYMENT_&_REGIONAL_STANDARDS]
                </h3>
              </div>
              {showQuestionsResults && (
                <div className="font-mono text-xs px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300">
                  SCORE:{" "}
                  <span
                    className={
                      part4CorrectCount === part4Questions.length
                        ? "text-emerald-400 font-bold"
                        : "text-amber-400 font-bold"
                    }
                  >
                    {part4CorrectCount}
                  </span>{" "}
                  / {part4Questions.length}
                </div>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-mono mb-6">
              Match carrier standards (T-carrier vs E-carrier) to their historical and geographic regions of deployment.
            </p>

            <div className="space-y-4">
              {part4Questions.map((q, index) => renderQuestionBlock(q, index))}
            </div>
          </section>

          {/* Part 5: WAN Link Scenario Classification */}
          <section className="terminal-box border-l-4 border-l-emerald-500 shadow-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
                  [PART_05: WAN_LINK_SCENARIO_IDENTIFICATION]
                </h3>
              </div>
              {showQuestionsResults && (
                <div className="font-mono text-xs px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300">
                  SCORE:{" "}
                  <span
                    className={
                      scenarioCorrectCount === scenarios.length
                        ? "text-emerald-400 font-bold"
                        : "text-amber-400 font-bold"
                    }
                  >
                    {scenarioCorrectCount}
                  </span>{" "}
                  / {scenarios.length}
                </div>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-mono mb-6">
              Analyze real-world enterprise deployment scenarios and assign the optimal WAN technology or carrier standard.
            </p>

            <div className="space-y-4">
              {scenarios.map((s, index) => {
                const selected = questionAnswers[s.id] || "";
                const isCorrect = isQuestionCorrect(s.id, s.answer);

                return (
                  <div
                    key={s.id}
                    className={`p-4 rounded-lg border transition-all ${
                      showQuestionsResults
                        ? isCorrect
                          ? "border-emerald-500/60 bg-emerald-950/20"
                          : "border-rose-500/60 bg-rose-950/20"
                        : "border-slate-800/80 bg-slate-900/70 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-2 py-0.5 rounded shrink-0">
                        #{String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-grow">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="text-xs font-bold text-slate-200 font-mono">
                            {s.scenarioTitle}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-200 font-medium mb-3 font-mono">{s.description}</p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                          {s.options.map((opt) => {
                            const isOptionSelected = selected === opt;
                            const isOptionCorrect = opt === s.answer;

                            let btnStyle =
                              "bg-slate-950 border-slate-800 text-slate-300 hover:border-emerald-500/50 hover:text-white";
                            if (showQuestionsResults) {
                              if (isOptionCorrect) {
                                btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold";
                              } else if (isOptionSelected && !isOptionCorrect) {
                                btnStyle = "bg-rose-950/60 border-rose-500 text-rose-300 line-through";
                              } else {
                                btnStyle = "bg-slate-950/40 border-slate-800/40 text-slate-600 opacity-60";
                              }
                            } else if (isOptionSelected) {
                              btnStyle = "bg-emerald-950/40 border-emerald-400 text-emerald-300 font-bold shadow-sm";
                            }

                            return (
                              <button
                                key={opt}
                                type="button"
                                disabled={showQuestionsResults}
                                onClick={() => handleSelectQuestionAnswer(s.id, opt)}
                                className={`text-left p-2.5 rounded-lg text-xs font-mono border transition-all flex items-center justify-between cursor-pointer disabled:cursor-default ${btnStyle}`}
                              >
                                <span>{opt}</span>
                                {showQuestionsResults && isOptionCorrect && (
                                  <span className="text-emerald-400 text-xs font-bold">[OK]</span>
                                )}
                                {showQuestionsResults && isOptionSelected && !isOptionCorrect && (
                                  <span className="text-rose-400 text-xs font-bold">[!]</span>
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {showQuestionsResults && (
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
                            <span className="font-mono">{s.explanation}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Diagnostic Action Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleValidateQuestions}
                className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs sm:text-sm rounded-lg shadow-lg shadow-cyan-950/50 hover:shadow-cyan-500/20 transition-all cursor-pointer"
              >
                [CHECK_DIAGNOSTIC_RESPONSES]
              </button>
              <button
                type="button"
                onClick={handleResetAndScrambleQuestions}
                className="px-4 py-2.5 bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-mono text-xs rounded-lg transition-all cursor-pointer"
              >
                [RESET_&_SCRAMBLE_ALL]
              </button>
            </div>

            {showQuestionsResults && (
              <div className="font-mono text-xs px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950">
                OVERALL_SCORE:{" "}
                <span
                  className={
                    allDiagnosticCorrect
                      ? "text-emerald-400 font-bold"
                      : "text-amber-400 font-bold"
                  }
                >
                  {totalDiagnosticCorrect} / {totalDiagnosticQuestions} (
                  {Math.round((totalDiagnosticCorrect / totalDiagnosticQuestions) * 100)}%)
                </span>
              </div>
            )}
          </div>

          {/* Diagnostic Result Banner */}
          {showQuestionsResults && (
            <div
              className={`p-4 rounded-xl border font-mono transition-all ${
                allDiagnosticCorrect
                  ? "bg-emerald-950/30 border-emerald-500/60 text-emerald-200"
                  : "bg-slate-900/90 border-slate-800 text-slate-200"
              }`}
            >
              <div className="flex items-center gap-2 font-bold mb-1">
                <span className={allDiagnosticCorrect ? "text-emerald-400" : "text-amber-400"}>
                  {allDiagnosticCorrect
                    ? "[PERFECT_SCORE_VALIDATED]"
                    : "[DIAGNOSTIC_EVALUATION_COMPLETE]"}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {allDiagnosticCorrect
                  ? "All diagnostic questions and realistic WAN link scenarios accurately identified."
                  : "Review any incorrect answers and explanations above, then reset and scramble to try again."}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function WANTechnologiesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen p-8 flex items-center justify-center font-mono text-emerald-400">
          [INITIALIZING_WAN_TECHNOLOGY_DIAGNOSTICS...]
        </div>
      }
    >
      <WANTechnologiesContent />
    </Suspense>
  );
}
