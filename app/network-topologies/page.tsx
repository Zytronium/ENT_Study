"use client";

import { useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type TopologyName = "Star" | "Ring" | "Bus" | "Mesh";

const TOPOLOGY_NAMES: TopologyName[] = ["Star", "Ring", "Bus", "Mesh"];

interface DiagramChallenge {
  id: string;
  imageSrc: string;
  alt: string;
  diagramLabel: string;
  answer: TopologyName;
}

interface DefinitionChallenge {
  id: string;
  definition: string;
  detailHint: string;
  answer: TopologyName;
}

interface SpecQuestion {
  id: string;
  category: "Bus Topology" | "Star Topology";
  prompt: string;
  options: string[];
  answer: string;
  explanation: string;
}

const initialDiagrams: DiagramChallenge[] = [
  {
    id: "diag-star-1",
    imageSrc: "/study_guide_images/topology_star_1.webp",
    alt: "Topology diagram with a switch/hub in a central connection point and radial hosts. Lines all connect to the switch/hub.",
    diagramLabel: "Diagram 1: Central Hub/Switch Node with Radiating Hosts",
    answer: "Star",
  },
  {
    id: "diag-star-2",
    imageSrc: "/study_guide_images/topology_star_2.webp",
    alt: "Topology diagram layout with a switch/hub in a central connection point. Lines all connect to the switch/hub.",
    diagramLabel: "Diagram 2: Multi-Host Centralized Layout",
    answer: "Star",
  },
  {
    id: "diag-ring",
    imageSrc: "/study_guide_images/topology_ring.webp",
    alt: "Topology diagram showing closed circular loop",
    diagramLabel: "Diagram 3: Circular Closed-Loop Network Structure",
    answer: "Ring",
  },
  {
    id: "diag-bus",
    imageSrc: "/study_guide_images/topology_bus.webp",
    alt: "Topology diagram showing single trunk line with end terminators",
    diagramLabel: "Diagram 4: Linear Trunk Line with Endpoint Terminators",
    answer: "Bus",
  },
  {
    id: "diag-mesh-1",
    imageSrc: "/study_guide_images/topology_mesh_1.webp",
    alt: "Topology diagram with fully interconnected nodes arranged like a star in a pentagon",
    diagramLabel: "Diagram 5: Fully Interconnected Redundant Grid",
    answer: "Mesh",
  },
  {
    id: "diag-mesh-2",
    imageSrc: "/study_guide_images/topology_mesh_2.webp",
    alt: "Topology diagram with fully interconnected nodes arranged like an up-side-down star in a Baseball Home plate",
    diagramLabel: "Diagram 6: Multi-Path Redundant Network Layout",
    answer: "Mesh",
  },
];

const initialDefinitions: DefinitionChallenge[] = [
  {
    id: "def-star",
    definition: "All computers are connected to a central point (such as a hub or switch).",
    detailHint: "Uses twisted pair cabling and RJ45 connectors back to the central device.",
    answer: "Star",
  },
  {
    id: "def-ring",
    definition: "All computers are connected in a loop. They use a token to talk on the network.",
    detailHint: "Data travels sequentially from device to device along the loop.",
    answer: "Ring",
  },
  {
    id: "def-bus",
    definition: "Computers are connected in a line with a single coaxial cable, terminated on both ends.",
    detailHint: "Uses thicknet/thinnet cabling and BNC connectors with endpoint terminators.",
    answer: "Bus",
  },
  {
    id: "def-mesh",
    definition: "All computers are connected to every other computer; topology of the internet with extreme redundancy.",
    detailHint: "Provides high fault tolerance and can be implemented wired or wireless.",
    answer: "Mesh",
  },
];

const initialSpecQuestions: SpecQuestion[] = [
  {
    id: "spec-bus-cables",
    category: "Bus Topology",
    prompt: "What cable types are used in a Bus topology?",
    options: [
      "Twisted pair cables",
      "Thicknet (10base5) coaxial cables only",
      "Thinnet (10base2) coaxial cables only",
      "Thicknet (10base5) and Thinnet (10base2) coaxial cables",
    ],
    answer: "Thicknet (10base5) and Thinnet (10base2) coaxial cables",
    explanation: "Bus topologies utilize coaxial cables: both Thicknet (10base5) and Thinnet (10base2).",
  },
  {
    id: "spec-bus-connectors",
    category: "Bus Topology",
    prompt: "What connectors and termination devices are used in a Bus topology?",
    options: [
      "BNC connectors and terminators",
      "RJ45 connectors",
      "RJ11 jacks",
      "Coaxial terminators",
    ],
    answer: "BNC connectors and terminators",
    explanation: "Bus networks connect devices via BNC connectors (and T-connectors) and require terminators at both ends.",
  },
  {
    id: "spec-bus-termination",
    category: "Bus Topology",
    prompt: "How is the physical transmission medium configured in a Bus topology?",
    options: [
      "A single coaxial cable terminated on both ends",
      "Individual cables connecting to a central switching device",
      "A continuous closed circle with no endpoints",
      "Direct interconnected lines to every other host",
    ],
    answer: "A single coaxial cable terminated on both ends",
    explanation: "Bus topology hosts connect in a line to a single coaxial cable that must be terminated on both ends to prevent signal bounce.",
  },
  {
    id: "spec-star-cables",
    category: "Star Topology",
    prompt: "What type of cables are used in a Star topology?",
    options: [
      "Thinnet (10base2) coaxial cables only",
      "Thicknet (10base5) coaxial cables only",
      "Twisted pair cables",
      "Thicknet (10base5) and Thinnet (10base2) coaxial cables",
    ],
    answer: "Twisted pair cables",
    explanation: "Star topologies utilize twisted pair cables (such as Cat5/Cat6) connecting each workstation to the center.",
  },
  {
    id: "spec-star-connectors",
    category: "Star Topology",
    prompt: "What connectors are used with twisted pair cables in a Star topology?",
    options: [
      "BNC connectors and terminators",
      "RJ11 jacks",
      "Vampire taps",
      "RJ45 connectors",
    ],
    answer: "RJ45 connectors",
    explanation: "Twisted pair cables in a Star topology terminate with 8-pin RJ45 modular connectors.",
  },
  {
    id: "spec-star-center",
    category: "Star Topology",
    prompt: "What devices are placed at the central point of a Star topology network?",
    options: [
      "Switches or hubs",
      "Coaxial terminators",
      "BNC and T-connectors",
      "Modems or routers",
    ],
    answer: "Switches or hubs",
    explanation: "In a Star topology, all computers connect to a central point containing a switch or hub.",
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
  diagrams: DiagramChallenge[],
  definitions: DefinitionChallenge[],
  specs: SpecQuestion[]
) {
  return {
    diagrams: shuffleArray(diagrams),
    definitions: shuffleArray(definitions),
    specs: shuffleArray(specs).map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    })),
  };
}

function WiredNetworkTopologiesQuizContent() {
  const searchParams = useSearchParams();
  const isMastery = searchParams.get("mastery") === "true";

  const [diagrams, setDiagrams] = useState<DiagramChallenge[]>(() => shuffleArray(initialDiagrams));
  const [definitions, setDefinitions] = useState<DefinitionChallenge[]>(() => shuffleArray(initialDefinitions));
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
    (id: string, correctAnswer: string) => {
      const userValue = (answers[id] || "").trim().toLowerCase();
      const target = correctAnswer.trim().toLowerCase();
      return userValue === target;
    },
    [answers]
  );

  const diagramCorrectCount = diagrams.filter((d) => isAnswerCorrect(d.id, d.answer)).length;
  const definitionCorrectCount = definitions.filter((d) => isAnswerCorrect(d.id, d.answer)).length;
  const specCorrectCount = specs.filter((s) => isAnswerCorrect(s.id, s.answer)).length;

  const totalQuestions = diagrams.length + definitions.length + specs.length;
  const totalCorrect = diagramCorrectCount + definitionCorrectCount + specCorrectCount;
  const allCorrect = totalCorrect === totalQuestions;

  const handleValidate = () => {
    setShowResults(true);
    if (allCorrect) {
      setHasPassedOnce(true);
    }
  };

  const handleResetAndScramble = () => {
    const nextScramble = scrambleAllQuestions(initialDiagrams, initialDefinitions, initialSpecQuestions);
    setDiagrams(nextScramble.diagrams);
    setDefinitions(nextScramble.definitions);
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
            <span className="text-xs text-slate-400 font-mono">NETWORK_TOPOLOGY</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="text-emerald-400 font-mono">ENT_ROUTER_V1</span>
            <span className="text-slate-600 font-light">|</span>
            <span className="text-slate-200">Wired Network Topologies</span>
          </h1>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <Link
            href="/study-guide#network-topologies"
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
        {/* SECTION 1: Diagram Identification */}
        <section className="terminal-box border-l-4 border-l-emerald-500 shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
                [PART_01: TOPOLOGY_DIAGRAM_MATCHING]
              </h2>
            </div>
            {showResults && (
              <div className="font-mono text-xs px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300">
                SCORE:{" "}
                <span className={diagramCorrectCount === diagrams.length ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                  {diagramCorrectCount}
                </span>{" "}
                / {diagrams.length}
              </div>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mb-6">
            Identify the physical and logical layout shown in each visual network schematic diagram.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {diagrams.map((diag, index) => {
              const userVal = answers[diag.id] || "";
              const isCorrect = isAnswerCorrect(diag.id, diag.answer);

              return (
                <div
                  key={diag.id}
                  className={`flex flex-col justify-between p-4 rounded-xl border transition-all ${
                    showResults
                      ? isCorrect
                        ? "border-emerald-500/60 bg-emerald-950/20 shadow-emerald-950/40 shadow-sm"
                        : "border-rose-500/60 bg-rose-950/20 shadow-rose-950/40 shadow-sm"
                      : "border-slate-800 bg-slate-900/80 hover:border-slate-700"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-2 py-0.5 rounded">
                        #{String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 flex items-center justify-center min-h-44 mb-4 shadow-inner">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={diag.imageSrc}
                        alt={diag.alt}
                        className="max-h-40 max-w-full object-contain rounded drop-shadow-md"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`input-${diag.id}`} className="block text-xs font-mono text-slate-400 mb-1.5">
                      Topology Identification:
                    </label>

                    {isTypingMode ? (
                      <input
                        id={`input-${diag.id}`}
                        type="text"
                        placeholder="Type topology name (e.g. Star)..."
                        disabled={showResults}
                        value={userVal}
                        onChange={(e) => handleAnswerChange(diag.id, e.target.value)}
                        autoComplete="off"
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
                        id={`input-${diag.id}`}
                        disabled={showResults}
                        value={userVal}
                        onChange={(e) => handleAnswerChange(diag.id, e.target.value)}
                        className={`w-full bg-slate-950 border p-2 text-xs sm:text-sm rounded-lg font-mono outline-none transition-colors ${
                          showResults
                            ? isCorrect
                              ? "border-emerald-500 text-emerald-400 bg-emerald-950/30"
                              : "border-rose-500 text-rose-400 bg-rose-950/30"
                            : "border-slate-700 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 text-slate-200"
                        }`}
                      >
                        <option value="">-- Select Topology --</option>
                        {TOPOLOGY_NAMES.map((name) => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    )}

                    {showResults && !isCorrect && (
                      <div className="mt-2 text-xs font-mono text-rose-400 flex items-center justify-between">
                        <span>Mismatch</span>
                        <span>Expected: <strong>{diag.answer}</strong></span>
                      </div>
                    )}
                    {showResults && isCorrect && (
                      <div className="mt-2 text-xs font-mono text-emerald-400 flex items-center justify-between">
                        <span>[OK] Correct match</span>
                        <span>{diag.answer}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 2: Topology Definitions & Characteristics */}
        <section className="terminal-box border-l-4 border-l-emerald-500 shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
                [PART_02: TOPOLOGY_DEFINITIONS_&_DESCRIPTIONS]
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
            Match each architectural definition and operational description to its corresponding topology.
          </p>

          <div className="space-y-4">
            {definitions.map((def, index) => {
              const userVal = answers[def.id] || "";
              const isCorrect = isAnswerCorrect(def.id, def.answer);

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
                        <p className="text-xs text-cyan-400/80 font-mono mt-1">{def.detailHint}</p>
                      </div>
                    </div>

                    <div className="w-full md:w-64 shrink-0">
                      {isTypingMode ? (
                        <input
                          type="text"
                          placeholder="Type topology name..."
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
                          <option value="">-- Select Topology --</option>
                          {TOPOLOGY_NAMES.map((name) => (
                            <option key={name} value={name}>
                              {name}
                            </option>
                          ))}
                        </select>
                      )}

                      {showResults && !isCorrect && (
                        <div className="mt-1 text-xs font-mono text-rose-400">
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

        {/* SECTION 3: Bus & Star Cables & Connectors Specifications */}
        <section className="terminal-box border-l-4 border-l-emerald-500 shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
                [PART_03: BUS_&_STAR_MEDIA_CABLES_CONNECTORS]
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
            Hardware standards, physical cabling, and connector requirements for Bus and Star topologies.
          </p>

          <div className="space-y-4">
            {specs.map((q, index) => {
              const selected = answers[q.id] || "";
              const isCorrect = isAnswerCorrect(q.id, q.answer);

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
                VALIDATE TOPOLOGY CONFIG
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
                      <span>[OK]</span> SUCCESS: ALL TOPOLOGY SYSTEMS SYNCHRONIZED
                    </span>
                    <p className="text-xs sm:text-sm text-emerald-300/90 font-mono mt-1">
                      Perfect Score: {totalCorrect} / {totalQuestions} correct across diagrams, definitions, cables, and connectors.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="text-lg sm:text-xl font-bold font-mono text-rose-400 flex items-center gap-2">
                      <span>[!]</span> TOPOLOGY CONFIGURATION MISMATCH DETECTED
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
                  {allCorrect
                    ? "RESET & SCRAMBLE"
                    : "TRY AGAIN"}
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default function WiredNetworkTopologiesQuiz() {
  return (
    <Suspense fallback={null}>
      <WiredNetworkTopologiesQuizContent />
    </Suspense>
  );
}
