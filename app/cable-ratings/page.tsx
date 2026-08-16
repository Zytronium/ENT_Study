"use client";

import { useState } from "react";
import Link from "next/link";

type CableRating = "CMP (Plenum)" | "CMR (Riser)" | "CM (General Use)";
const CABLE_RATINGS: CableRating[] = ["CMP (Plenum)", "CMR (Riser)", "CM (General Use)"];

interface ZoneChallenge {
  id: string;
  tag: string;
  zoneTitle: string;
  hazard: string;
  answer: CableRating;
}

interface ComplianceScenario {
  id: string;
  scenarioTitle: string;
  inspectionReport: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface SpecQuestion {
  id: string;
  category: string;
  prompt: string;
  options: string[];
  answer: string;
  explanation: string;
}

// -------- question data --------

const initialZones: ZoneChallenge[] = [
  {
    id: "zone-drop-ceiling-f2",
    tag: "ZONE-A",
    zoneTitle: "Floor 2 Drop Ceiling (HVAC Return Air Plenum)",
    hazard: "Air-handling space, burning cable smoke circulates building-wide via ductwork.",
    answer: "CMP (Plenum)",
  },
  {
    id: "zone-riser-shaft-f1-f2",
    tag: "ZONE-B",
    zoneTitle: "Vertical Utility Shaft Between Floors 1 & 2",
    hazard: "Acts as a chimney in a fire, cables must stop flames climbing floor to floor.",
    answer: "CMR (Riser)",
  },
  {
    id: "zone-cubicle-patch-f1",
    tag: "ZONE-D",
    zoneTitle: "Floor 1 Office Desk Run (Patch Cord)",
    hazard: "Single-room horizontal run, no HVAC or floor slab penetration.",
    answer: "CM (General Use)",
  },
  {
    id: "zone-raised-floor-server",
    tag: "ZONE-C",
    zoneTitle: "Floor 1 Server Room Raised Floor (Underfloor HVAC Plenum)",
    hazard: "Underfloor HVAC air circulation, non-plenum cables release poisonous gases into the server room.",
    answer: "CMP (Plenum)",
  },
  {
    id: "zone-elevator-chase",
    tag: "ZONE-E",
    zoneTitle: "Multi-Story Elevator Shaft Penetration",
    hazard: "Open vertical shaft, requires flame-retardant properties to stop vertical flame climb.",
    answer: "CMR (Riser)",
  },
];

const initialScenarios: ComplianceScenario[] = [
  {
    id: "scen-cmp-in-riser",
    scenarioTitle: "Plenum Cable in Vertical Riser Shaft",
    inspectionReport: "A contractor ran CMP (Plenum) rated cable inside a vertical wall chase between Floor 1 and Floor 2 instead of CMR.",
    options: ["Compliant", "Violation"],
    answer: "Compliant",
    explanation: "CMP outranks CMR in the substitution hierarchy, so it may legally replace CMR or CM anywhere.",
  },
  {
    id: "scen-cm-in-drop-ceiling",
    scenarioTitle: "Standard CM Cable in HVAC Return Ceiling",
    inspectionReport: "An installer ran standard CM (General Use) patch cabling above a drop ceiling that serves as the HVAC return air plenum.",
    options: ["Compliant", "Violation"],
    answer: "Violation",
    explanation: "CM produces dense toxic smoke when burned; only CMP is rated for plenum air-handling spaces.",
  },
  {
    id: "scen-cmr-for-desktop",
    scenarioTitle: "Riser Cable Used for Desktop Patch Run",
    inspectionReport: "An IT department uses leftover CMR (Riser) spool cable for short patch cables connecting desktops to wall jacks.",
    options: ["Compliant", "Violation"],
    answer: "Compliant",
    explanation: "CMR outranks CM, so by the downward substitution rule it may be used anywhere CM is specified.",
  },
];

const initialSpecQuestions: SpecQuestion[] = [
  {
    id: "spec-substitution-hierarchy",
    category: "Code Substitution Hierarchy",
    prompt: "Which statement accurately describes the cable rating substitution hierarchy?",
    options: [
      "CMP can substitute for CMR and CM; CMR can substitute for CM; CM cannot substitute for either",
      "CM can substitute for both CMR and CMP",
      "CMR can substitute for CMP, but not the reverse",
      "All ratings are fully interchangeable",
    ],
    answer: "CMP can substitute for CMR and CM; CMR can substitute for CM; CM cannot substitute for either",
    explanation: "The hierarchy is CMP > CMR > CM. Higher-rated cable may always substitute downward, never the reverse.",
  },
  {
    id: "spec-plenum-space",
    category: "Fire Safety Mechanics",
    prompt: "Why are CMP cables required in plenum spaces?",
    options: [
      "Plenum spaces circulate HVAC air, so smoke and toxic fumes spread rapidly building-wide",
      "Plenum spaces are underground and prone to moisture",
      "Plenum spaces carry high-voltage electrical current",
      "Plenum spaces are sealed server cabinets",
    ],
    answer: "Plenum spaces circulate HVAC air, so smoke and toxic fumes spread rapidly building-wide",
    explanation: "Plenum spaces feed HVAC return/supply air, so CMP's low-smoke, low-toxicity jacket keeps burning cable from poisoning the whole building's air supply.",
  },
  {
    id: "spec-riser-purpose",
    category: "Fire Safety Mechanics",
    prompt: "Why are CMR cables specifically engineered for vertical runs between floors?",
    options: [
      "To prevent fire from spreading vertically floor to floor (chimney effect)",
      "To stop Ethernet signal loss caused by gravity",
      "To shield against lightning EMP",
      "To resist plumbing leaks in wall chases",
    ],
    answer: "To prevent fire from spreading vertically floor to floor (chimney effect)",
    explanation: "Vertical shafts act like chimneys during a fire. CMR's flame-retardant jacket is rated to stop vertical fire spread between floors.",
  },
];

// -------- helpers --------

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function scrambleAllQuestions(zones: ZoneChallenge[], scenarios: ComplianceScenario[], specs: SpecQuestion[]) {
  return {
    zones: shuffleArray(zones),
    scenarios: shuffleArray(scenarios).map((s) => ({ ...s, options: shuffleArray(s.options) })),
    specs: shuffleArray(specs).map((q) => ({ ...q, options: shuffleArray(q.options) })),
  };
}

function OptionButtons({
                         options,
                         value,
                         onSelect,
                         disabled,
                         showResults,
                         correctAnswer,
                       }: {
  options: string[];
  value: string;
  onSelect: (v: string) => void;
  disabled: boolean;
  showResults: boolean;
  correctAnswer: string;
}) {
  return (
    <div className="space-y-2">
      {options.map((opt) => {
        const isSelected = value === opt;
        const isThisCorrect = opt === correctAnswer;

        let btnClasses = "w-full text-left p-2.5 rounded text-xs font-mono border transition-colors ";
        if (showResults) {
          if (isThisCorrect) {
            btnClasses += "bg-green-950/40 border-green-500 text-green-300 font-bold";
          } else if (isSelected && !isThisCorrect) {
            btnClasses += "bg-red-950/40 border-red-500 text-red-300 line-through";
          } else {
            btnClasses += "bg-slate-900/30 border-border/40 text-slate-500 opacity-60";
          }
        } else if (isSelected) {
          btnClasses += "bg-slate-800 border-accent text-accent font-bold";
        } else {
          btnClasses += "bg-slate-900/50 border-border hover:bg-slate-800 text-slate-300";
        }

        return (
          <button key={opt} type="button" disabled={disabled} onClick={() => onSelect(opt)} className={btnClasses}>
            <span className="mr-2 font-bold">{isSelected ? "[●]" : "[ ]"}</span>
            {opt}
          </button>
        );
      })}
    </div>
  );
}

export default function CableRatingsQuiz() {
  const [zones, setZones] = useState<ZoneChallenge[]>(() => shuffleArray(initialZones));
  const [scenarios, setScenarios] = useState<ComplianceScenario[]>(() =>
    shuffleArray(initialScenarios).map((s) => ({ ...s, options: shuffleArray(s.options) }))
  );
  const [specs, setSpecs] = useState<SpecQuestion[]>(() =>
    shuffleArray(initialSpecQuestions).map((q) => ({ ...q, options: shuffleArray(q.options) }))
  );

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const isCorrect = (id: string, correctAnswer: string) => answers[id] === correctAnswer;

  const zoneCorrectCount = zones.filter((z) => isCorrect(z.id, z.answer)).length;
  const scenarioCorrectCount = scenarios.filter((s) => isCorrect(s.id, s.answer)).length;
  const specCorrectCount = specs.filter((sp) => isCorrect(sp.id, sp.answer)).length;

  const totalQuestions = zones.length + scenarios.length + specs.length;
  const totalCorrect = zoneCorrectCount + scenarioCorrectCount + specCorrectCount;
  const allCorrect = totalCorrect === totalQuestions;
  const allAnswered = totalCorrect >= 0 && Object.keys(answers).length >= totalQuestions;

  const handleValidate = () => setShowResults(true);

  const handleResetAndScramble = () => {
    const next = scrambleAllQuestions(initialZones, initialScenarios, initialSpecQuestions);
    setZones(next.zones);
    setScenarios(next.scenarios);
    setSpecs(next.specs);
    setAnswers({});
    setShowResults(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-8">
      <header className="w-full max-w-4xl mb-8 border-b border-border pb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-accent">ENT_ROUTER_V1 | Cable Ratings</h1>
          <Link href="/" className="text-sm text-accent hover:underline">
            {"<"} BACK TO HUB
          </Link>
        </div>
        <p className="text-sm text-slate-400 mt-2">
          Diagnostic Module: Cable Routing (CMP, CMR, CM), Fire Safety & Substitution Hierarchy
        </p>
      </header>

      <main className="w-full max-w-4xl space-y-8">
        {/* -------- Part 1: zone routing -------- */}
        <section className="terminal-box">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 pb-4 border-b border-border">
            <div>
              <h2 className="text-xl font-bold text-accent underline">Part 1: Blueprint Zone Routing</h2>
              <p className="text-xs text-slate-400 mt-1">Pick the minimum code-compliant rating for each zone.</p>
            </div>
            {showResults && (
              <div className="font-mono text-sm px-3 py-1 rounded bg-slate-900 border border-border">
                Zones: <span className={zoneCorrectCount === zones.length ? "text-green-400 font-bold" : "text-yellow-400 font-bold"}>{zoneCorrectCount}</span> / {zones.length}
              </div>
            )}
          </div>

          <div className="mb-6 -mx-3 sm:mx-0 p-3 sm:p-4 rounded bg-slate-950 border border-border/80 font-mono text-xs overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
              <span className="text-accent font-bold uppercase tracking-wider text-xs sm:text-sm">
                [FACILITY BLUEPRINT: 2-STORY COMMERCIAL CROSS-SECTION]
              </span>
              <span className="text-slate-500 text-[10px] sm:text-xs">HVAC &amp; RISER SCHEMATIC</span>
            </div>

            <div className="overflow-x-auto py-1">
              <pre className="text-[7.65px] xs:text-[9px] sm:text-[11.5px] md:text-[13px] leading-[1.15] sm:leading-relaxed font-mono select-none text-slate-400 mx-auto w-fit">
{`+========================================================================+
|                       `}<span className="text-cyan-400 font-bold">[ROOFTOP HVAC AIR HANDLER]</span>{`                       |
+========================================================================+
| `}<span className="text-cyan-300 font-bold">[ZONE-A] DROP CEILING (HVAC RETURN AIR PLENUM SPACE)</span>{`                   |
| `}<span className="text-cyan-500">{`<-- <-- Exhaust / Return Air Circulation Path to Rooftop HVAC <-- <--  `}</span>{`|
+------------------------------------+------------------+----------------+
| `}<span className="text-slate-200 font-bold">[FLOOR 2] EXECUTIVE WORKSTATIONS</span>{`   | `}<span className="text-amber-300 font-bold">[ZONE-B]</span>{`         | `}<span className="text-amber-300 font-bold">[ZONE-E]</span>{`       |
|  - Desks & Wall Faceplates         | `}<span className="text-amber-400 font-bold">VERTICAL UTILITY</span>{` | `}<span className="text-amber-400 font-bold">MULTI-STORY</span>{`    |
|  - Horizontal Office Cabling       | `}<span className="text-amber-400 font-bold">RISER SHAFT</span>{`      | `}<span className="text-amber-400 font-bold">ELEVATOR SHAFT</span>{` |
|                                    | (Floor 1 <-> 2)  | CHASE          |
+====================================+                  | (All Floors)   |
| `}<span className="text-slate-500 font-bold">========== CONCRETE FLOOR SLAB / FIRE BARRIER =======</span>{` |                |
+====================================+                  |                |
| `}<span className="text-slate-200 font-bold">[FLOOR 1] MAIN OFFICES & SERVER RM</span>{` | `}<span className="text-amber-500/80">[Riser Zone]</span>{`     |                |
|  - `}<span className="text-emerald-400 font-bold">[ZONE-D] Desk Patch Cord</span>{`        |                  |                |
|    (Wall Jack ---> Desktop PC)     |                  |                |
+------------------------------------+------------------+                |
| `}<span className="text-cyan-300 font-bold">[ZONE-C] RAISED FLOOR (UNDERFLOOR HVAC PLENUM SPACE)</span>{`  |                |
| `}<span className="text-cyan-500">{`<-- Pressurized Cold Air Distribution under Racks <-- `}</span>{`| `}<span className="text-amber-500/80"> [Riser Zone]</span>{`  |
+=======================================================+================+
| `}<span className="text-slate-500 font-bold">================== GROUND CONCRETE FOUNDATION ========================</span>{` |
+========================================================================+`}
              </pre>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-800/80 text-[11px]">
              <div className="flex items-center gap-1.5 text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                <span><strong>ZONE-A &amp; ZONE-C:</strong> Plenum Air Spaces</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                <span><strong>ZONE-B &amp; ZONE-E:</strong> Vertical Risers</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <span><strong>ZONE-D:</strong> General Desk Run</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {zones.map((zone) => {
              const userVal = answers[zone.id] || "";
              const correct = isCorrect(zone.id, zone.answer);

              return (
                <div
                  key={zone.id}
                  className={`p-4 rounded border transition-colors ${
                    showResults ? (correct ? "border-green-500/60 bg-green-950/20" : "border-red-500/60 bg-red-950/20") : "border-border/60 bg-slate-900/50"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3 grow">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-accent font-mono text-xs font-bold shrink-0 mt-0.5">{zone.tag}</span>
                      <div>
                        <h3 className="text-sm text-slate-200 font-bold">{zone.zoneTitle}</h3>
                        <p className="text-xs text-slate-400 italic mt-0.5">Hazard: {zone.hazard}</p>
                      </div>
                    </div>

                    <div className="w-full md:w-64 shrink-0">
                      <select
                        disabled={showResults}
                        value={userVal}
                        onChange={(e) => handleAnswerChange(zone.id, e.target.value)}
                        className={`w-full bg-slate-900 border p-2 text-sm rounded font-mono outline-none transition-colors ${
                          showResults
                            ? correct
                              ? "border-green-500 text-green-400 bg-green-950/30"
                              : "border-red-500 text-red-400 bg-red-950/30"
                            : "border-border focus:border-accent text-slate-200"
                        }`}
                      >
                        <option value="">-- Select Cable Rating --</option>
                        {CABLE_RATINGS.map((rating) => (
                          <option key={rating} value={rating}>
                            {rating}
                          </option>
                        ))}
                      </select>

                      {showResults && !correct && <div className="mt-1 text-xs font-mono text-red-400">Expected: <strong>{zone.answer}</strong></div>}
                      {showResults && correct && <div className="mt-1 text-xs font-mono text-green-400">✓ Correct: {zone.answer}</div>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* -------- Part 2: compliance scenarios -------- */}
        <section className="terminal-box">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 pb-4 border-b border-border">
            <div>
              <h2 className="text-xl font-bold text-accent underline">Part 2: Compliance Scenarios</h2>
              <p className="text-xs text-slate-400 mt-1">Decide compliant or violation for each inspection.</p>
            </div>
            {showResults && (
              <div className="font-mono text-sm px-3 py-1 rounded bg-slate-900 border border-border">
                Scenarios: <span className={scenarioCorrectCount === scenarios.length ? "text-green-400 font-bold" : "text-yellow-400 font-bold"}>{scenarioCorrectCount}</span> / {scenarios.length}
              </div>
            )}
          </div>

          <div className="space-y-6">
            {scenarios.map((scen, index) => {
              const userVal = answers[scen.id] || "";
              const correct = isCorrect(scen.id, scen.answer);

              return (
                <div
                  key={scen.id}
                  className={`p-4 rounded border transition-colors ${
                    showResults ? (correct ? "border-green-500/60 bg-green-950/20" : "border-red-500/60 bg-red-950/20") : "border-border/60 bg-slate-900/50"
                  }`}
                >
                  <span className="text-accent font-mono text-xs font-bold block mb-2">
                    [INSPECTION #{String(index + 1).padStart(2, "0")}] {scen.scenarioTitle}
                  </span>
                  <p className="text-sm text-slate-200 font-medium mb-3">&ldquo;{scen.inspectionReport}&rdquo;</p>

                  <OptionButtons
                    options={scen.options}
                    value={userVal}
                    onSelect={(v) => handleAnswerChange(scen.id, v)}
                    disabled={showResults}
                    showResults={showResults}
                    correctAnswer={scen.answer}
                  />

                  {showResults && (
                    <div className={`mt-3 text-xs p-2.5 rounded border ${correct ? "bg-green-950/30 border-green-800/40 text-green-300" : "bg-red-950/30 border-red-800/40 text-red-300"}`}>
                      <p className="font-bold mb-0.5">{correct ? "✓ CORRECT" : "✗ INCORRECT"}</p>
                      <p className="text-slate-300">{scen.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* -------- Part 3: specs -------- */}
        <section className="terminal-box">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 pb-4 border-b border-border">
            <div>
              <h2 className="text-xl font-bold text-accent underline">Part 3: Specs & Mechanics</h2>
              <p className="text-xs text-slate-400 mt-1">Acronyms, hierarchy, and fire safety mechanics.</p>
            </div>
            {showResults && (
              <div className="font-mono text-sm px-3 py-1 rounded bg-slate-900 border border-border">
                Specs: <span className={specCorrectCount === specs.length ? "text-green-400 font-bold" : "text-yellow-400 font-bold"}>{specCorrectCount}</span> / {specs.length}
              </div>
            )}
          </div>

          <div className="space-y-6">
            {specs.map((spec, index) => {
              const userVal = answers[spec.id] || "";
              const correct = isCorrect(spec.id, spec.answer);

              return (
                <div
                  key={spec.id}
                  className={`p-4 rounded border transition-colors ${
                    showResults ? (correct ? "border-green-500/60 bg-green-950/20" : "border-red-500/60 bg-red-950/20") : "border-border/60 bg-slate-900/50"
                  }`}
                >
                  <span className="text-accent font-mono text-xs font-bold block mb-2">
                    [{String(index + 1).padStart(2, "0")}] {spec.category}
                  </span>
                  <p className="text-sm text-slate-200 font-medium mb-3">{spec.prompt}</p>

                  <OptionButtons
                    options={spec.options}
                    value={userVal}
                    onSelect={(v) => handleAnswerChange(spec.id, v)}
                    disabled={showResults}
                    showResults={showResults}
                    correctAnswer={spec.answer}
                  />

                  {showResults && (
                    <div className={`mt-3 text-xs p-2.5 rounded border ${correct ? "bg-green-950/30 border-green-800/40 text-green-300" : "bg-red-950/30 border-red-800/40 text-red-300"}`}>
                      <p className="font-bold mb-0.5">{correct ? "✓ CORRECT" : "✗ EXPLANATION"}</p>
                      <p className="text-slate-300">{spec.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* -------- validate / reset -------- */}
        <section className="terminal-box flex flex-col items-center justify-center p-6 text-center space-y-4">
          {!showResults ? (
            <button
              onClick={handleValidate}
              disabled={!allAnswered}
              className="px-8 py-3 bg-accent text-slate-950 font-bold font-mono rounded hover:bg-accent/90 transition-colors cursor-pointer w-full sm:w-auto disabled:opacity-40 disabled:cursor-not-allowed"
            >
              VALIDATE ANSWERS
            </button>
          ) : (
            <div className="space-y-4 w-full flex flex-col items-center">
              <div className={`text-2xl font-bold font-mono ${allCorrect ? "text-green-400" : "text-yellow-400"}`}>
                {allCorrect ? "SYSTEM_DIAGNOSTIC_PASSED (100%)" : `DIAGNOSTIC_SCORE: ${totalCorrect} / ${totalQuestions} (${Math.round((totalCorrect / totalQuestions) * 100)}%)`}
              </div>
              <p className="text-sm text-slate-300 max-w-lg">
                {allCorrect
                  ? "Outstanding! You have mastered cable routing, the substitution hierarchy, and fire safety mechanics."
                  : "Review the flagged items above, then reset and try again."}
              </p>
              <button
                onClick={handleResetAndScramble}
                className="px-8 py-3 bg-accent text-slate-950 font-bold font-mono rounded hover:bg-accent/90 transition-colors cursor-pointer w-full sm:w-auto"
              >
                RESET AND RETRY
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
