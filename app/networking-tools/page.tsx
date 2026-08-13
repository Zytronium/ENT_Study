"use client";

import { useState } from "react";
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

export default function NetworkingToolsQuiz() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [isHardMode, setIsHardMode] = useState(false);
  const [displayTools, setDisplayTools] = useState(toolsData);

  const handleInputChange = (toolName: string, value: string) => {
    setAnswers(prev => ({ ...prev, [toolName]: value }));
  };

  const checkResults = () => {
    setShowResults(true);
  };

  const resetQuiz = () => {
    const wasAllCorrect = allCorrect;
    if (wasAllCorrect) {
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
    <div className="min-h-screen flex flex-col items-center p-8">
      <header className="w-full max-w-4xl mb-8 border-b border-border pb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-accent">ENT_ROUTER_V1 | Networking Tools</h1>
          <Link href="/" className="text-sm text-accent hover:underline">{"<"} BACK TO HUB</Link>
        </div>
      </header>

      <main className="w-full max-w-4xl terminal-box">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-accent underline">Networking Tools Identification</h2>
        </div>

        <p className="mb-8 text-slate-300">
          {isHardMode
            ? "Type the name of the tool that matches each description. Acronyms accepted for TDR/OTDR. Double check spelling before submitting."
            : "Select the correct tool for each description."}
        </p>

        <div className="space-y-6">
          {displayTools.map((tool, index) => (
            <div key={tool.name} className="flex flex-col gap-2 border-b border-border/50 pb-6 last:border-0">
              <div className="flex items-start gap-4">
                <span className="text-accent font-mono text-sm">[{index + 1}]</span>
                <div className="flex-grow text-sm text-slate-300 italic">
                  "{tool.description}"
                </div>
              </div>

              <div className="ml-8 mt-2 max-w-md">
                {isHardMode ? (
                  <input
                    type="text"
                    className={`w-full bg-slate-900 border border-border p-2 text-sm rounded focus:border-accent outline-none ${
                      showResults
                        ? isCorrect(tool.name, answers[tool.name])
                          ? "border-green-500 text-green-500"
                          : "border-red-500 text-red-500"
                        : ""
                    }`}
                    placeholder="Enter tool name..."
                    value={answers[tool.name] || ""}
                    onChange={(e) => handleInputChange(tool.name, e.target.value)}
                    disabled={showResults}
                  />
                ) : (
                  <select
                    className={`w-full bg-slate-900 border border-border p-2 text-sm rounded focus:border-accent outline-none ${
                      showResults
                        ? isCorrect(tool.name, answers[tool.name])
                          ? "border-green-500 text-green-500"
                          : "border-red-500 text-red-500"
                        : ""
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
                  <div className="text-xs text-red-400 mt-1">
                    Expected: {tool.name}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
          {!showResults ? (
            <button
              onClick={checkResults}
              className="px-6 py-2 bg-accent text-slate-900 font-bold rounded hover:bg-green-400 transition-colors"
            >
              VALIDATE TOOLS CONFIG
            </button>
          ) : (
            <div className="text-center w-full">
              <div className={`p-4 mb-6 rounded ${allCorrect ? "bg-green-900/30 text-green-400 border border-green-500" : "bg-red-900/30 text-red-400 border border-red-500"}`}>
                {allCorrect ? (
                  <div className="flex flex-col items-center">
                    <span className="text-2xl mb-2">Success!</span>
                    <p>All tools correctly identified.</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="text-2xl mb-2">Error!</span>
                    <p>Tool mismatch detected. Review the items marked in red.</p>
                  </div>
                )}
              </div>
              <button
                onClick={resetQuiz}
                className="px-6 py-2 border border-accent text-accent font-bold rounded hover:bg-accent/10 transition-colors"
              >
                {allCorrect && !isHardMode ? "ACTIVATE HARD_MODE (SCRAMBLE & MASK)" : "RESET DIAGNOSTICS"}
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-12 text-xs text-slate-500 italic">
        * Based on STUDY_GUIDE.md for TTC ENT 2026
      </footer>
    </div>
  );
}
