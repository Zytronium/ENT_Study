"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const toolsData = [
  { name: "Cable Stripper", description: "Strips the outer plastic of a cable" },
  { name: "Wire Crimper", description: "Crimps ends of twisted pair cables" },
  { name: "Cable Tester", description: "Tests network cables by testing continuity across every pin on both ends" },
  { name: "Tone Generator", description: "Finds the other end of a cable by generating a tone when near the other end of the cable plugged into it." },
  { name: "TDR (Time Domain Reflectometer)", description: "Finds breaks in copper cables by sending electrical pulses and measuring how far they go" },
  { name: "OTDR (Optical Time Domain Reflectometer)", description: "Finds breaks in fiber optic cables by sending light pulses and measuring how far they go" },
  { name: "Light Meter", description: "Measures light in optical cables. Requires a light source device on one end. Fiber optic cables only." },
  { name: "Loopback Adapter", description: "Tests physical ports" },
  { name: "Butt Set", description: "Used to test and monitor phone lines" },
  { name: "Punch Down Tool", description: "Seats wires down into a block and cuts off excess wire automatically" },
  { name: "Multimeter", description: "Measures electricity in a wire" },
];

function NetworkingToolsQuizContent() {
  const searchParams = useSearchParams();
  const isMastery = searchParams.get("mastery") === "true";

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [isHardMode, setIsHardMode] = useState(() => isMastery);
  const [displayTools, setDisplayTools] = useState(() =>
    isMastery ? [...toolsData].sort(() => Math.random() - 0.5) : toolsData
  );

  const handleInputChange = (toolName: string, value: string) => {
    setAnswers(prev => ({ ...prev, [toolName]: value }));
  };

  const checkResults = () => {
    setShowResults(true);
  };

  const resetQuiz = () => {
    const wasAllCorrect = allCorrect;
    if (wasAllCorrect || isMastery) {
      setIsHardMode(true);
      setDisplayTools([...toolsData].sort(() => Math.random() - 0.5));
    }
    setAnswers({});
    setShowResults(false);
  };

  const isCorrect = (toolName: string, answer: string) => {
    if (!answer) return false;
    const tool = toolsData.find(t => t.name === toolName);
    if (!tool) return false;

    const normalizedAnswer = answer.trim().toLowerCase();
    const normalizedName = tool.name.toLowerCase();

    // For TDR and OTDR, also accept just the acronym or the full name without acronym
    const acronym = tool.name.includes(" (") ? tool.name.split(" (")[0].toLowerCase() : null;
    const fullName = tool.name.includes(" (") ? tool.name.split(" (")[1].replace(")", "").toLowerCase() : null;

    return normalizedAnswer === normalizedName || (acronym && normalizedAnswer === acronym) || (fullName && normalizedAnswer === fullName);
  };

  const allCorrect = toolsData.every(tool => isCorrect(tool.name, answers[tool.name]));

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
            <span className="text-xs text-slate-400 font-mono">FIELD_HARDWARE</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="text-emerald-400 font-mono">ENT_ROUTER_V1</span>
            <span className="text-slate-600 font-light">|</span>
            <span className="text-slate-200">Networking Tools</span>
          </h1>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <Link
            href="/study-guide#networking-tools"
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

      <main className="w-full max-w-4xl terminal-box border-l-4 border-l-emerald-500 shadow-2xl">
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
              [NETWORKING_TOOLS_IDENTIFICATION]
            </h2>
          </div>
        </div>

        <p className="mb-6 text-xs sm:text-sm text-slate-400 font-mono">
          {isHardMode
            ? "Type the name of the tool that matches each description. Acronyms accepted for TDR/OTDR."
            : "Select the correct tool for each technical description."}
        </p>

        <div className="space-y-4">
          {displayTools.map((tool, index) => (
            <div
              key={tool.name}
              className="flex flex-col gap-3 p-4 bg-slate-900/70 border border-slate-800/80 rounded-lg hover:border-slate-700 transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-2 py-0.5 rounded shrink-0">
                  #{String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex-grow text-xs sm:text-sm text-slate-300 leading-relaxed font-mono">
                  &ldquo;{tool.description}&rdquo;
                </div>
              </div>

              <div className="sm:ml-10 max-w-md">
                {isHardMode ? (
                  <input
                    type="text"
                    className={`w-full bg-slate-950 border p-2 text-xs sm:text-sm font-mono rounded-lg outline-none transition-colors ${
                      showResults
                        ? isCorrect(tool.name, answers[tool.name])
                          ? "border-emerald-500 text-emerald-400 bg-emerald-950/30"
                          : "border-rose-500 text-rose-400 bg-rose-950/30"
                        : "border-slate-700 text-slate-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                    }`}
                    placeholder="Enter tool name..."
                    value={answers[tool.name] || ""}
                    onChange={(e) => handleInputChange(tool.name, e.target.value)}
                    disabled={showResults}
                  />
                ) : (
                  <select
                    className={`w-full bg-slate-950 border p-2 text-xs sm:text-sm font-mono rounded-lg outline-none transition-colors ${
                      showResults
                        ? isCorrect(tool.name, answers[tool.name])
                          ? "border-emerald-500 text-emerald-400 bg-emerald-950/30"
                          : "border-rose-500 text-rose-400 bg-rose-950/30"
                        : "border-slate-700 text-slate-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                    }`}
                    value={answers[tool.name] || ""}
                    onChange={(e) => handleInputChange(tool.name, e.target.value)}
                    disabled={showResults}
                  >
                    <option value="">-- Select Tool --</option>
                    {[...toolsData].sort((a, b) => a.name.localeCompare(b.name)).map(t => (
                      <option key={t.name} value={t.name}>{t.name}</option>
                    ))}
                  </select>
                )}
                {showResults && !isCorrect(tool.name, answers[tool.name]) && (
                  <div className="text-xs text-rose-400 mt-1 font-mono">
                    Expected: {tool.name}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col items-center gap-4">
          {!showResults ? (
            <button
              onClick={checkResults}
              className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-sm rounded-lg shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/20 transition-all cursor-pointer"
            >
              VALIDATE TOOLS CONFIG
            </button>
          ) : (
            <div className="text-center w-full">
              <div className={`p-4 mb-6 rounded-lg ${
                allCorrect
                  ? "bg-emerald-950/40 text-emerald-300 border border-emerald-500/60 shadow-lg shadow-emerald-950/40"
                  : "bg-rose-950/40 text-rose-300 border border-rose-500/60 shadow-lg shadow-rose-950/40"
              }`}>
                {allCorrect ? (
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold font-mono mb-1 text-emerald-400 flex items-center gap-2">
                      <span>[OK]</span> CONFIGURATION SYNCHRONIZED
                    </span>
                    <p className="text-xs sm:text-sm text-emerald-300/90 font-mono">
                      All tools correctly identified.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold font-mono mb-1 text-rose-400 flex items-center gap-2">
                      <span>[!]</span> CONFIGURATION MISMATCH DETECTED
                    </span>
                    <p className="text-xs sm:text-sm text-rose-300/90 font-mono">
                      Tool mismatch detected. Review items marked in red.
                    </p>
                  </div>
                )}
              </div>
              <button
                onClick={resetQuiz}
                className="px-6 py-2.5 border border-emerald-500/40 hover:border-emerald-400 bg-slate-900/80 hover:bg-slate-800 text-emerald-400 font-bold font-mono text-sm rounded-lg transition-all cursor-pointer"
              >
                {allCorrect && !isHardMode ? "ACTIVATE HARD_MODE (Scramble & Mask)" : "RESET DIAGNOSTICS"}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function NetworkingToolsQuiz() {
  return (
    <Suspense fallback={null}>
      <NetworkingToolsQuizContent />
    </Suspense>
  );
}
