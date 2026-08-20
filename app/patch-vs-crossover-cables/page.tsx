"use client";

import { useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type CableConcept =
  | "Patch Cable"
  | "Crossover Cable"
  | "Shielded Twisted Pair (STP)"
  | "Unshielded Twisted Pair (UTP)"

const CABLE_CONCEPTS: CableConcept[] = [
  "Patch Cable",
  "Crossover Cable",
  "Shielded Twisted Pair (STP)",
  "Unshielded Twisted Pair (UTP)",
];

type ScenarioAnswer = "Patch Cable" | "Crossover Cable";
const SCENARIO_OPTIONS: ScenarioAnswer[] = ["Patch Cable", "Crossover Cable"];

interface DefinitionChallenge {
  id: string;
  definition: string;
  answer: CableConcept;
  aliases: string[];
}

interface ScenarioChallenge {
  id: string;
  deviceA: string;
  deviceB: string;
  answer: ScenarioAnswer;
  explanation: string;
  aliases: string[];
}

interface SpecQuestion {
  id: string;
  category: "Shielding & Industrial Use" | "Standards & Features" | "Cable Architecture";
  prompt: string;
  options: string[];
  answer: string;
  explanation: string;
}

const initialDefinitions: DefinitionChallenge[] = [
  {
    id: "def-patch",
    definition: "Ethernet cables that follow the same wiring standard (568A or 568B) on both terminated ends; used to connect two dissimilar devices.",
    answer: "Patch Cable",
    aliases: ["patch", "patch cable", "straight", "straight cable", "straight-through", "straight through"],
  },
  {
    id: "def-crossover",
    definition: "Ethernet cables that use both standards (568A on one end and 568B on the other) to connect two similar devices.",
    answer: "Crossover Cable",
    aliases: ["crossover", "crossover cable", "cross over", "cross-over"],
  },
  {
    id: "def-stp",
    definition: "Twisted pair cabling with an extra layer of shielding around the wire pairs under the outer jacket, specifically rated for industrial areas.",
    answer: "Shielded Twisted Pair (STP)",
    aliases: ["stp", "shielded twisted pair", "shielded twisted pair (stp)", "shielded"],
  },
  {
    id: "def-utp",
    definition: "Standard twisted pair cabling without internal shielding foil, used everywhere outside of industrial environments.",
    answer: "Unshielded Twisted Pair (UTP)",
    aliases: ["utp", "unshielded twisted pair", "unshielded twisted pair (utp)", "unshielded"],
  },
];

const initialScenarios: ScenarioChallenge[] = [
  {
    id: "scen-pc-router",
    deviceA: "Workstation (PC)",
    deviceB: "Network Router",
    answer: "Patch Cable",
    explanation: "Dissimilar devices (PC to Router) connect using standard patch (straight) cables.",
    aliases: ["patch", "patch cable", "straight", "straight cable"],
  },
  {
    id: "scen-pc-pc",
    deviceA: "Workstation (PC)",
    deviceB: "Second Workstation (PC)",
    answer: "Crossover Cable",
    explanation: "Similar host devices (PC to PC) require a crossover cable to cross transmit/receive pairs.",
    aliases: ["crossover", "crossover cable", "cross over"],
  },
  {
    id: "scen-router-switch",
    deviceA: "Network Router",
    deviceB: "Network Switch",
    answer: "Patch Cable",
    explanation: "Dissimilar devices (Router to Switch) utilize a standard patch (straight) cable.",
    aliases: ["patch", "patch cable", "straight", "straight cable"],
  },
  {
    id: "scen-switch-switch",
    deviceA: "Network Switch",
    deviceB: "Second Network Switch",
    answer: "Crossover Cable",
    explanation: "Directly linking similar devices (Switch to Switch) historically requires a crossover cable.",
    aliases: ["crossover", "crossover cable", "cross over"],
  },
  {
    id: "scen-pc-switch",
    deviceA: "Workstation (PC)",
    deviceB: "Network Switch / Hub",
    answer: "Patch Cable",
    explanation: "Connecting a host PC to a switch/hub (dissimilar devices) uses a patch (straight) cable.",
    aliases: ["patch", "patch cable", "straight", "straight cable"],
  },
  {
    id: "scen-router-router",
    deviceA: "Network Router",
    deviceB: "Second Network Router",
    answer: "Crossover Cable",
    explanation: "Connecting two similar devices (Router to Router) requires a crossover cable.",
    aliases: ["crossover", "crossover cable", "cross over"],
  },
];

const initialSpecQuestions: SpecQuestion[] = [
  {
    id: "spec-stp-environment",
    category: "Shielding & Industrial Use",
    prompt: "Where should Shielded Twisted Pair (STP) cables be installed according to network deployment standards?",
    options: [
      "In industrial areas with heavy machinery and high electrical noise",
      "Standard residential home living rooms",
      "Standard corporate office cubicles",
      "Exclusively submerged underwater",
    ],
    answer: "In industrial areas with heavy machinery and high electrical noise",
    explanation: "Shielded twisted pair (STP) cables should be used in industrial areas, while unshielded (UTP) cables belong everywhere else.",
  },
  {
    id: "spec-utp-environment",
    category: "Shielding & Industrial Use",
    prompt: "Where do Unshielded Twisted Pair (UTP) cables belong?",
    options: [
      "Everywhere outside of industrial areas",
      "Exclusively inside underground metal conduits",
      "Only in high-voltage generator rooms",
      "Directly attached to industrial electric motors",
    ],
    answer: "Everywhere outside of industrial areas",
    explanation: "UTP is the standard cable deployment everywhere outside of harsh industrial settings, though STP technically can be used anywhere.",
  },
  {
    id: "spec-stp-structure",
    category: "Cable Architecture",
    prompt: "What is the structural difference between Shielded Twisted Pair (STP) and Unshielded Twisted Pair (UTP)?",
    options: [
      "STP has an extra layer of shielding around the wire pairs underneath the outer jacket plastic",
      "STP replaces copper wires with solid fiber glass strands",
      "STP uses 12 pins instead of the standard 8-pin RJ45 connector",
      "STP has thicker outer plastic shielding",
    ],
    answer: "STP has an extra layer of shielding around the wire pairs underneath the outer jacket plastic",
    explanation: "Shielded twisted pair has another protective layer of shielding around the twisted pairs underneath the outer jacket plastic.",
  },
  {
    id: "spec-auto-mdix",
    category: "Standards & Features",
    prompt: "Why are physical crossover cables much less commonly needed in modern networking?",
    options: [
      "Modern Ethernet equipment supports Auto-MDI/MDIX to automatically detect and cross pairs",
      "All modern devices have transitioned exclusively to coaxial BNC connections",
      "Modern computers cannot connect directly via wired Ethernet",
      "The TIA-568A wiring standard was completely abolished",
    ],
    answer: "Modern Ethernet equipment supports Auto-MDI/MDIX to automatically detect and cross pairs",
    explanation: "Auto-MDI/MDIX automatically detects and compensates for crossed pairs, making physical crossover cables rarely necessary.",
  },
  {
    id: "spec-crossover-pinout",
    category: "Standards & Features",
    prompt: "What pinout configuration defines a Crossover Ethernet cable?",
    options: [
      "The same standard (either 568A or 568B) on both terminated ends",
      "568A on one end and 568B on the opposite end",
      "RJ45 coupler on one end and RJ45 connector on the other",
      "RJ45 keystone jacks on each end for use with a patch panel",
    ],
    answer: "568A on one end and 568B on the opposite end",
    explanation: "Crossover cables utilize 568A on one terminated end and 568B on the other end.",
  },
  {
    id: "spec-patch-pinout",
    category: "Standards & Features",
    prompt: "What pinout configuration defines a Patch (Straight) cable?",
    options: [
      "The same standard (either 568A or 568B) on both terminated ends",
      "568A on one end and 568B on the opposite end",
      "RJ45 coupler on one end and RJ45 connector on the other",
      "RJ45 keystone jacks on each end for use with a patch panel",
    ],
    answer: "The same standard (either 568A or 568B) on both terminated ends",
    explanation: "Patch (straight) cables follow the identical standard (both 568A or both 568B) on both ends.",
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function scrambleAllQuestions(
  definitions: DefinitionChallenge[],
  scenarios: ScenarioChallenge[],
  specs: SpecQuestion[]
) {
  return {
    definitions: shuffleArray(definitions),
    scenarios: shuffleArray(scenarios),
    specs: shuffleArray(specs).map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    })),
  };
}

function PatchVsCrossoverCablesQuizContent() {
  const searchParams = useSearchParams();
  const isMastery = searchParams.get("mastery") === "true";

  const [definitions, setDefinitions] = useState<DefinitionChallenge[]>(() => shuffleArray(initialDefinitions));
  const [scenarios, setScenarios] = useState<ScenarioChallenge[]>(() => shuffleArray(initialScenarios));
  const [specs, setSpecs] = useState<SpecQuestion[]>(() =>
    shuffleArray(initialSpecQuestions).map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }))
  );

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isTypingMode, setIsTypingMode] = useState<boolean>(() => isMastery);
  const [hasPassedOnce, setHasPassedOnce] = useState<boolean>(() => isMastery);
  const [, setAttemptCount] = useState<number>(1);

  const handleAnswerChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const isAnswerCorrect = useCallback(
    (id: string, correctAnswer: string, aliases?: string[]) => {
      const userValue = (answers[id] || "").trim().toLowerCase();
      if (!userValue) return false;
      const target = correctAnswer.trim().toLowerCase();
      if (userValue === target) return true;
      if (aliases && aliases.some((a) => a.toLowerCase() === userValue)) return true;
      return false;
    },
    [answers]
  );

  const definitionCorrectCount = definitions.filter((d) => isAnswerCorrect(d.id, d.answer, d.aliases)).length;
  const scenarioCorrectCount = scenarios.filter((s) => isAnswerCorrect(s.id, s.answer, s.aliases)).length;
  const specCorrectCount = specs.filter((sp) => isAnswerCorrect(sp.id, sp.answer)).length;

  const totalQuestions = definitions.length + scenarios.length + specs.length;
  const totalCorrect = definitionCorrectCount + scenarioCorrectCount + specCorrectCount;
  const allCorrect = totalCorrect === totalQuestions;

  const handleValidate = () => {
    setShowResults(true);
    if (allCorrect) {
      setHasPassedOnce(true);
    }
  };

  const handleResetAndScramble = () => {
    const nextScramble = scrambleAllQuestions(initialDefinitions, initialScenarios, initialSpecQuestions);
    setDefinitions(nextScramble.definitions);
    setScenarios(nextScramble.scenarios);
    setSpecs(nextScramble.specs);
    setAnswers({});
    setShowResults(false);
    setAttemptCount((prev) => prev + 1);

    if (allCorrect || hasPassedOnce) {
      setIsTypingMode(true);
      setHasPassedOnce(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-8">
      {/* Header */}
      <header className="w-full max-w-4xl mb-8 cyber-glass-panel p-4 sm:p-5 rounded-xl border border-slate-800 shadow-xl flex flex-wrap justify-between items-center gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-1.5 py-0.5 rounded">
              DIAGNOSTIC_MODULE
            </span>
            <span className="text-xs text-slate-500 font-mono">//</span>
            <span className="text-xs text-slate-400 font-mono">PHYSICAL_MEDIA</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="text-emerald-400 font-mono">ENT_ROUTER_V1</span>
            <span className="text-slate-600 font-light">|</span>
            <span className="text-slate-200">Patch vs Crossover Cables</span>
          </h1>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <Link
            href="/study-guide#patch-cables-vs-crossover-cables"
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

      <main className="w-full max-w-4xl space-y-8 font-mono">
        {/* SECTION 1: Cable Concept & Definitions */}
        <section className="terminal-box border-l-4 border-l-emerald-500 shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
                [PART_01: CABLE_TYPE_&_TECHNOLOGY_IDENTIFICATION]
              </h2>
            </div>
            {showResults && (
              <div className="font-mono text-xs px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300">
                SCORE:{" "}
                <span className={definitionCorrectCount === definitions.length ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                  {definitionCorrectCount}
                </span>{" "}
                / {definitions.length}
              </div>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mb-6">
            Match each definition to the corresponding cable type, media standard, or interface feature.
          </p>

          <div className="space-y-4">
            {definitions.map((def, index) => {
              const userVal = answers[def.id] || "";
              const isCorrect = isAnswerCorrect(def.id, def.answer, def.aliases);

              return (
                <div
                  key={def.id}
                  className={`p-4 rounded-lg border transition-all ${
                    showResults
                      ? isCorrect
                        ? "border-emerald-500/60 bg-emerald-950/20"
                        : "border-rose-500/60 bg-rose-950/20"
                      : "border-slate-800/80 bg-slate-900/70 hover:border-slate-700"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3 flex-grow">
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-2 py-0.5 rounded shrink-0">
                        #{String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-xs sm:text-sm text-slate-200 font-medium italic font-mono leading-relaxed">{def.definition}</p>
                      </div>
                    </div>

                    <div className="w-full md:w-72 shrink-0">
                      {isTypingMode ? (
                        <input
                          type="text"
                          placeholder="Type cable / concept name..."
                          disabled={showResults}
                          value={userVal}
                          onChange={(e) => handleAnswerChange(def.id, e.target.value)}
                          className={`w-full bg-slate-950 border p-2 text-xs sm:text-sm rounded-lg font-mono outline-none transition-colors ${
                            showResults
                              ? isCorrect
                                ? "border-emerald-500 text-emerald-400 bg-emerald-950/30"
                                : "border-rose-500 text-rose-400 bg-rose-950/30"
                              : "border-slate-700 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 text-slate-200"
                          }`}
                        />
                      ) : (
                        <select
                          disabled={showResults}
                          value={userVal}
                          onChange={(e) => handleAnswerChange(def.id, e.target.value)}
                          className={`w-full bg-slate-950 border p-2 text-xs sm:text-sm rounded-lg font-mono outline-none transition-colors ${
                            showResults
                              ? isCorrect
                                ? "border-emerald-500 text-emerald-400 bg-emerald-950/30"
                                : "border-rose-500 text-rose-400 bg-rose-950/30"
                              : "border-slate-700 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 text-slate-200"
                          }`}
                        >
                          <option value="">-- Select Cable / Concept --</option>
                          {CABLE_CONCEPTS.map((concept) => (
                            <option key={concept} value={concept}>
                              {concept}
                            </option>
                          ))}
                        </select>
                      )}

                      {showResults && !isCorrect && (
                        <div className="mt-1 text-xs font-mono text-red-400">
                          Expected: <strong>{def.answer}</strong>
                        </div>
                      )}
                      {showResults && isCorrect && (
                        <div className="mt-1 text-xs font-mono text-emerald-400">[OK] Correct: {def.answer}</div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 2: Device Interconnection Scenarios */}
        <section className="terminal-box border-l-4 border-l-emerald-500 shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
                [PART_02: DEVICE_INTERCONNECTION_SCENARIOS]
              </h2>
            </div>
            {showResults && (
              <div className="font-mono text-xs px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300">
                SCORE:{" "}
                <span className={scenarioCorrectCount === scenarios.length ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                  {scenarioCorrectCount}
                </span>{" "}
                / {scenarios.length}
              </div>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mb-6">
            Determine whether a Patch (Straight) cable or Crossover cable is required to interconnect the two devices.
          </p>

          <div className="space-y-4">
            {scenarios.map((scen, index) => {
              const userVal = answers[scen.id] || "";
              const isCorrect = isAnswerCorrect(scen.id, scen.answer, scen.aliases);

              return (
                <div
                  key={scen.id}
                  className={`p-4 rounded-lg border transition-all ${
                    showResults
                      ? isCorrect
                        ? "border-emerald-500/60 bg-emerald-950/20"
                        : "border-rose-500/60 bg-rose-950/20"
                      : "border-slate-800/80 bg-slate-900/70 hover:border-slate-700"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3 flex-grow">
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-2 py-0.5 rounded shrink-0">
                        #{String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap font-mono">
                          <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-200 border border-slate-800 text-xs font-mono font-bold">
                            {scen.deviceA}
                          </span>
                          <span className="text-emerald-400 text-xs font-mono font-bold">◄──────►</span>
                          <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-200 border border-slate-800 text-xs font-mono font-bold">
                            {scen.deviceB}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="w-full md:w-64 shrink-0">
                      {isTypingMode ? (
                        <input
                          type="text"
                          placeholder="Type cable type..."
                          disabled={showResults}
                          value={userVal}
                          onChange={(e) => handleAnswerChange(scen.id, e.target.value)}
                          className={`w-full bg-slate-950 border p-2 text-xs sm:text-sm rounded-lg font-mono outline-none transition-colors ${
                            showResults
                              ? isCorrect
                                ? "border-emerald-500 text-emerald-400 bg-emerald-950/30"
                                : "border-rose-500 text-rose-400 bg-rose-950/30"
                              : "border-slate-700 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 text-slate-200"
                          }`}
                        />
                      ) : (
                        <select
                          disabled={showResults}
                          value={userVal}
                          onChange={(e) => handleAnswerChange(scen.id, e.target.value)}
                          className={`w-full bg-slate-950 border p-2 text-xs sm:text-sm rounded-lg font-mono outline-none transition-colors ${
                            showResults
                              ? isCorrect
                                ? "border-emerald-500 text-emerald-400 bg-emerald-950/30"
                                : "border-rose-500 text-rose-400 bg-rose-950/30"
                              : "border-slate-700 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 text-slate-200"
                          }`}
                        >
                          <option value="">-- Select Cable Type --</option>
                          {SCENARIO_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      )}

                      {showResults && !isCorrect && (
                        <div className="mt-1 text-xs font-mono text-rose-400">
                          Expected: <strong>{scen.answer}</strong>
                        </div>
                      )}
                      {showResults && isCorrect && (
                        <div className="mt-1 text-xs font-mono text-emerald-400">[OK] Correct: {scen.answer}</div>
                      )}
                    </div>
                  </div>

                  {showResults && (
                    <div
                      className={`mt-3 text-xs p-2.5 rounded-lg border font-mono ${
                        isCorrect
                          ? "bg-emerald-950/40 text-emerald-300 border-emerald-800/60"
                          : "bg-rose-950/40 text-rose-300 border-rose-800/60"
                      }`}
                    >
                      <span className="font-bold">{isCorrect ? "[OK] VALIDATED: " : "[!] ERROR: "}</span>
                      <span className="font-mono">{scen.explanation}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: Shielding, Industrial Applications & Specifications */}
        <section className="terminal-box border-l-4 border-l-emerald-500 shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
                [PART_03: SHIELDING_&_ENGINEERING_SPECIFICATIONS]
              </h2>
            </div>
            {showResults && (
              <div className="font-mono text-xs px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300">
                SCORE:{" "}
                <span className={specCorrectCount === specs.length ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                  {specCorrectCount}
                </span>{" "}
                / {specs.length}
              </div>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mb-6">
            Select the correct technical response regarding STP/UTP usage environments, pinouts, and physical characteristics.
          </p>

          <div className="space-y-4">
            {specs.map((q, index) => {
              const selected = answers[q.id];
              const isCorrect = selected === q.answer;

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-lg border transition-all ${
                    showResults
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
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[11px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800 font-mono">
                          {q.category}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 font-medium mb-3">{q.prompt}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        {q.options.map((opt) => {
                          const isOptionSelected = selected === opt;
                          const isOptionCorrect = opt === q.answer;

                          let btnStyle = "bg-slate-950 border-slate-800 text-slate-300 hover:border-emerald-500/50 hover:text-white";
                          if (showResults) {
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
                              disabled={showResults}
                              onClick={() => handleAnswerChange(q.id, opt)}
                              className={`text-left p-2.5 rounded-lg text-xs font-mono border transition-all flex items-center justify-between cursor-pointer disabled:cursor-default ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {showResults && isOptionCorrect && <span className="text-emerald-400 text-xs font-bold">[OK]</span>}
                            </button>
                          );
                        })}
                      </div>

                      {showResults && (
                        <div
                          className={`mt-3 text-xs p-2.5 rounded-lg border font-mono ${
                            isCorrect
                              ? "bg-emerald-950/40 text-emerald-300 border-emerald-800/60"
                              : "bg-rose-950/40 text-rose-300 border-rose-800/60"
                          }`}
                        >
                          <span className="font-bold">{isCorrect ? "[OK] VALIDATED: " : "[!] ERROR: "}</span>
                          <span className="font-mono">{q.explanation}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Validation / Results Actions */}
        <section className="terminal-box border-l-4 border-l-emerald-500 shadow-2xl text-center">
          {!showResults ? (
            <div className="flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={handleValidate}
                className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-sm rounded-lg shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/20 transition-all cursor-pointer"
              >
                VALIDATE CABLE CONFIG
              </button>
              <p className="text-xs text-slate-400 font-mono">
                {Object.keys(answers).length} of {totalQuestions} questions answered
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div
                className={`p-6 rounded-lg border shadow-lg ${
                  allCorrect
                    ? "bg-emerald-950/40 text-emerald-300 border-emerald-500/60 shadow-emerald-950/40"
                    : "bg-rose-950/40 text-rose-300 border-rose-500/60 shadow-rose-950/40"
                }`}
              >
                {allCorrect ? (
                  <div className="flex flex-col items-center">
                    <span className="text-lg sm:text-xl font-bold font-mono text-emerald-400 flex items-center gap-2">
                      <span>[OK]</span> SUCCESS: ALL CABLE SYSTEMS SYNCHRONIZED
                    </span>
                    <p className="text-xs sm:text-sm text-emerald-300/90 font-mono mt-1">
                      Perfect Score: {totalCorrect} / {totalQuestions} correct across definitions, device scenarios, and shielding specifications.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="text-lg sm:text-xl font-bold font-mono text-rose-400 flex items-center gap-2">
                      <span>[!]</span> CABLE CONFIGURATION MISMATCH DETECTED
                    </span>
                    <p className="text-xs sm:text-sm text-rose-300/90 font-mono mt-1">
                      Score: {totalCorrect} / {totalQuestions} correct ({totalQuestions - totalCorrect} mismatches to resolve).
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleResetAndScramble}
                  className="px-6 py-2.5 border border-emerald-500/40 hover:border-emerald-400 bg-slate-900/80 hover:bg-slate-800 text-emerald-400 font-bold font-mono text-sm rounded-lg transition-all cursor-pointer"
                >
                  {allCorrect ? "RESET & SCRAMBLE" : "TRY AGAIN"}
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default function PatchVsCrossoverCablesQuiz() {
  return (
    <Suspense fallback={null}>
      <PatchVsCrossoverCablesQuizContent />
    </Suspense>
  );
}
