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
    <div className="min-h-screen flex flex-col items-center p-8">
      <header className="w-full max-w-4xl mb-8 border-b border-border pb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-accent">ENT_ROUTER_V1 | Wired Network Topologies</h1>
          <Link href="/" className="text-sm text-accent hover:underline">
            {"<"} BACK TO HUB
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-2">
          <p className="text-sm text-slate-400">
            Diagnostic Module: Physical Network Layouts, Diagram Identification & Media Specifications
          </p>
        </div>
      </header>

      <main className="w-full max-w-4xl space-y-8">
        {/* SECTION 1: Diagram Identification */}
        <section className="terminal-box">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 pb-4 border-b border-border">
            <div>
              <h2 className="text-xl font-bold text-accent underline">Part 1: Network Topology Diagram Matching</h2>
              <p className="text-xs text-slate-400 mt-1">
                Identify the topology shown in each visual network schematic diagram.
              </p>
            </div>
            {showResults && (
              <div className="font-mono text-sm px-3 py-1 rounded bg-slate-900 border border-border">
                Diagrams:{" "}
                <span className={diagramCorrectCount === diagrams.length ? "text-green-400 font-bold" : "text-yellow-400 font-bold"}>
                  {diagramCorrectCount}
                </span>{" "}
                / {diagrams.length}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {diagrams.map((diag, index) => {
              const userVal = answers[diag.id] || "";
              const isCorrect = isAnswerCorrect(diag.id, diag.answer);

              return (
                <div
                  key={diag.id}
                  className={`flex flex-col justify-between p-4 rounded border transition-colors ${
                    showResults
                      ? isCorrect
                        ? "border-green-500/60 bg-green-950/20"
                        : "border-red-500/60 bg-red-950/20"
                      : "border-border/60 bg-slate-900/50"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-accent font-mono text-xs">[{String(index + 1).padStart(2, "0")}]</span>
                    </div>

                    <div className="bg-slate-950/80 border border-border/40 rounded p-3 flex items-center justify-center min-h-44 mb-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={diag.imageSrc}
                        alt={diag.alt}
                        className="max-h-40 max-w-full object-contain rounded drop-shadow-md"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`input-${diag.id}`} className="block text-xs font-mono text-slate-400 mb-1">
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
                        className={`w-full bg-slate-900 border p-2 text-sm rounded font-mono outline-none transition-colors ${
                          showResults
                            ? isCorrect
                              ? "border-green-500 text-green-400 bg-green-950/30"
                              : "border-red-500 text-red-400 bg-red-950/30"
                            : "border-border focus:border-accent text-slate-200"
                        }`}
                      />
                    ) : (
                      <select
                        id={`input-${diag.id}`}
                        disabled={showResults}
                        value={userVal}
                        onChange={(e) => handleAnswerChange(diag.id, e.target.value)}
                        className={`w-full bg-slate-900 border p-2 text-sm rounded font-mono outline-none transition-colors ${
                          showResults
                            ? isCorrect
                              ? "border-green-500 text-green-400 bg-green-950/30"
                              : "border-red-500 text-red-400 bg-red-950/30"
                            : "border-border focus:border-accent text-slate-200"
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
                      <div className="mt-2 text-xs font-mono text-red-400 flex items-center justify-between">
                        <span>Mismatch</span>
                        <span>Expected: <strong>{diag.answer}</strong></span>
                      </div>
                    )}
                    {showResults && isCorrect && (
                      <div className="mt-2 text-xs font-mono text-green-400 flex items-center justify-between">
                        <span>✓ Correct match</span>
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
        <section className="terminal-box">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 pb-4 border-b border-border">
            <div>
              <h2 className="text-xl font-bold text-accent underline">Part 2: Topology Definitions & Descriptions</h2>
              <p className="text-xs text-slate-400 mt-1">
                Match each architectural definition and operational description to its corresponding topology.
              </p>
            </div>
            {showResults && (
              <div className="font-mono text-sm px-3 py-1 rounded bg-slate-900 border border-border">
                Definitions:{" "}
                <span className={definitionCorrectCount === definitions.length ? "text-green-400 font-bold" : "text-yellow-400 font-bold"}>
                  {definitionCorrectCount}
                </span>{" "}
                / {definitions.length}
              </div>
            )}
          </div>

          <div className="space-y-4">
            {definitions.map((def, index) => {
              const userVal = answers[def.id] || "";
              const isCorrect = isAnswerCorrect(def.id, def.answer);

              return (
                <div
                  key={def.id}
                  className={`p-4 rounded border transition-colors ${
                    showResults
                      ? isCorrect
                        ? "border-green-500/60 bg-green-950/20"
                        : "border-red-500/60 bg-red-950/20"
                      : "border-border/60 bg-slate-900/50"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3 flex-grow">
                      <span className="text-accent font-mono text-xs mt-1 shrink-0">
                        [{String(index + 1).padStart(2, "0")}]
                      </span>
                      <div>
                        <p className="text-sm text-slate-200 font-medium italic">{def.definition}</p>
                        <p className="text-xs text-slate-400 mt-1">{def.detailHint}</p>
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
                          className={`w-full bg-slate-900 border p-2 text-sm rounded font-mono outline-none transition-colors ${
                            showResults
                              ? isCorrect
                                ? "border-green-500 text-green-400 bg-green-950/30"
                                : "border-red-500 text-red-400 bg-red-950/30"
                              : "border-border focus:border-accent text-slate-200"
                          }`}
                        />
                      ) : (
                        <select
                          disabled={showResults}
                          value={userVal}
                          onChange={(e) => handleAnswerChange(def.id, e.target.value)}
                          className={`w-full bg-slate-900 border p-2 text-sm rounded font-mono outline-none transition-colors ${
                            showResults
                              ? isCorrect
                                ? "border-green-500 text-green-400 bg-green-950/30"
                                : "border-red-500 text-red-400 bg-red-950/30"
                              : "border-border focus:border-accent text-slate-200"
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
                        <div className="mt-1 text-xs font-mono text-red-400">
                          Expected: <strong>{def.answer}</strong>
                        </div>
                      )}
                      {showResults && isCorrect && (
                        <div className="mt-1 text-xs font-mono text-green-400">✓ Correct: {def.answer}</div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: Bus & Star Cables & Connectors Specifications */}
        <section className="terminal-box">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 pb-4 border-b border-border">
            <div>
              <h2 className="text-xl font-bold text-accent underline">
                Part 3: Bus & Star Media, Cables, and Connectors
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Hardware standards, physical cabling, and connector requirements for Bus and Star topologies.
              </p>
            </div>
            {showResults && (
              <div className="font-mono text-sm px-3 py-1 rounded bg-slate-900 border border-border">
                Specifications:{" "}
                <span className={specCorrectCount === specs.length ? "text-green-400 font-bold" : "text-yellow-400 font-bold"}>
                  {specCorrectCount}
                </span>{" "}
                / {specs.length}
              </div>
            )}
          </div>

          <div className="space-y-6">
            {specs.map((q, index) => {
              const selected = answers[q.id] || "";
              const isCorrect = isAnswerCorrect(q.id, q.answer);

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded border transition-colors ${
                    showResults
                      ? isCorrect
                        ? "border-green-500/60 bg-green-950/20"
                        : "border-red-500/60 bg-red-950/20"
                      : "border-border/60 bg-slate-900/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-accent font-mono text-xs mt-0.5 shrink-0">
                      [{String(index + 1).padStart(2, "0")}]
                    </span>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-border font-mono">
                          {q.category}
                        </span>
                      </div>
                      <p className="text-sm text-slate-200 font-medium mb-3">{q.prompt}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        {q.options.map((opt) => {
                          const isOptionSelected = selected === opt;
                          const isOptionCorrect = opt === q.answer;

                          let btnStyle = "bg-slate-900 border-border text-slate-300 hover:border-accent hover:text-white";
                          if (showResults) {
                            if (isOptionCorrect) {
                              btnStyle = "bg-green-900/50 border-green-500 text-green-300 font-bold";
                            } else if (isOptionSelected && !isOptionCorrect) {
                              btnStyle = "bg-red-900/50 border-red-500 text-red-300 line-through";
                            } else {
                              btnStyle = "bg-slate-900/40 border-border/40 text-slate-500 opacity-60";
                            }
                          } else if (isOptionSelected) {
                            btnStyle = "bg-accent/20 border-accent text-accent font-bold";
                          }

                          return (
                            <button
                              key={opt}
                              type="button"
                              disabled={showResults}
                              onClick={() => handleAnswerChange(q.id, opt)}
                              className={`text-left p-2.5 rounded text-xs border font-mono transition-all flex items-center justify-between ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {showResults && isOptionCorrect && <span className="text-green-400 text-xs font-bold">✓</span>}
                            </button>
                          );
                        })}
                      </div>

                      {showResults && (
                        <div
                          className={`mt-3 text-xs p-2.5 rounded border ${
                            isCorrect
                              ? "bg-green-950/40 text-green-300 border-green-800/60"
                              : "bg-red-950/40 text-red-300 border-red-800/60"
                          }`}
                        >
                          <span className="font-bold font-mono">{isCorrect ? "✓ VALIDATED: " : "✗ ERROR: "}</span>
                          {q.explanation}
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
        <section className="terminal-box text-center">
          {!showResults ? (
            <div className="flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={handleValidate}
                className="px-8 py-3 bg-accent text-slate-900 font-bold rounded hover:bg-green-400 transition-colors font-mono tracking-wide cursor-pointer shadow-lg shadow-accent/20"
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
                className={`p-6 rounded border ${
                  allCorrect
                    ? "bg-green-900/30 text-green-400 border-green-500"
                    : "bg-red-900/30 text-red-400 border-red-500"
                }`}
              >
                {allCorrect ? (
                  <div className="flex flex-col items-center">
                    <span className="text-2xl mb-1 font-bold">SUCCESS! ALL TOPOLOGY SYSTEMS SYNCHRONIZED</span>
                    <p className="text-sm text-slate-300 mt-1">
                      Perfect Score: {totalCorrect} / {totalQuestions} correct across diagrams, definitions, cables, and connectors.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="text-2xl mb-1 font-bold">TOPOLOGY CONFIGURATION MISMATCH DETECTED</span>
                    <p className="text-sm text-slate-300 mt-1">
                      Score: {totalCorrect} / {totalQuestions} correct ({totalQuestions - totalCorrect} mismatches to resolve).
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleResetAndScramble}
                  className="px-6 py-2.5 border border-accent bg-accent/10 text-accent font-bold rounded hover:bg-accent hover:text-slate-900 transition-colors font-mono cursor-pointer"
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
