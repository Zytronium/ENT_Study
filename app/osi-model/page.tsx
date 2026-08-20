"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const layers = [
  { number: 7, name: "Application", description: "Provides network services directly to applications. Closest to the end user." },
  { number: 6, name: "Presentation", description: "Handles translation and encryption of data." },
  { number: 5, name: "Session", description: "Manages (starts, stops, maintains) connections." },
  { number: 4, name: "Transport", description: "Reliable end-to-end flow control and error correction. TCP/UDP." },
  { number: 3, name: "Network", description: "Routing and logical addresses. IP addresses, routers, etc." },
  { number: 2, name: "Data-Link", description: "Communication between devices over a local network. MAC addresses, switches, etc." },
  { number: 1, name: "Physical", description: "Raw bits across physical medium. Cables, antennas, hubs." },
];

function OSIQuizContent() {
  const searchParams = useSearchParams();
  const isMastery = searchParams.get("mastery") === "true";

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [numberAnswers, setNumberAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [scrambledLayers, setScrambledLayers] = useState(() =>
    isMastery ? [...layers].sort(() => Math.random() - 0.5) : layers
  );
  const [isScrambled, setIsScrambled] = useState(() => isMastery);

  const scrambleLayers = () => {
    const shuffled = [...layers].sort(() => Math.random() - 0.5);
    setScrambledLayers(shuffled);
    setIsScrambled(true);
  };

  const handleSelect = (layerNumber: number, value: string) => {
    setAnswers(prev => ({ ...prev, [layerNumber]: value }));
  };

  const handleNumberInput = (layerNumber: number, value: string) => {
    setNumberAnswers(prev => ({ ...prev, [layerNumber]: value }));
  };

  const checkResults = () => {
    setShowResults(true);
  };

  const resetQuiz = () => {
    setAnswers({});
    setNumberAnswers({});
    setShowResults(false);
    if (allCorrect || isMastery || isScrambled) {
      scrambleLayers();
    }
  };

  const allCorrect = layers.every(layer =>
    answers[layer.number] === layer.name &&
    (!isScrambled || numberAnswers[layer.number] === String(layer.number))
  );

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
            <span className="text-xs text-slate-400 font-mono">L1_THROUGH_L7</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="text-emerald-400 font-mono">ENT_ROUTER_V1</span>
            <span className="text-slate-600 font-light">|</span>
            <span className="text-slate-200">OSI Model</span>
          </h1>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <Link
            href="/study-guide#osi-model"
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
              [OSI_LAYER_ARCHITECTURE_MATCHING]
            </h2>
          </div>
        </div>

        <p className="mb-6 text-xs sm:text-sm text-slate-400 font-mono">
          Match the correct OSI layer name to its technical description and layer position index.
        </p>

        <div className="space-y-4">
          {scrambledLayers.map((layer) => (
            <div
              key={layer.number}
              className="flex flex-col md:flex-row gap-4 p-4 bg-slate-900/70 border border-slate-800/80 rounded-lg hover:border-slate-700 transition-colors"
            >
              <div className="md:w-28 font-bold text-emerald-400 shrink-0 flex items-center gap-2 font-mono text-sm">
                <span>Layer</span>
                {isScrambled ? (
                  <input
                    type="number"
                    min="1"
                    max="7"
                    className={`w-12 bg-slate-950 border p-1 text-sm rounded font-mono focus:ring-1 focus:ring-emerald-400 outline-none text-center ${
                      showResults
                        ? numberAnswers[layer.number] === String(layer.number)
                          ? "border-emerald-500 text-emerald-400 bg-emerald-950/30"
                          : "border-rose-500 text-rose-400 bg-rose-950/30"
                        : "border-slate-700 text-slate-200 focus:border-emerald-400"
                    }`}
                    value={numberAnswers[layer.number] || ""}
                    onChange={(e) => handleNumberInput(layer.number, e.target.value)}
                    disabled={showResults}
                    placeholder="_"
                  />
                ) : (
                  <span className="w-8 text-center text-emerald-300 bg-slate-950 border border-slate-800 rounded py-0.5">
                    {layer.number}
                  </span>
                )}
                <span>:</span>
              </div>
              <div className="flex-grow text-xs sm:text-sm text-slate-300 leading-relaxed font-mono flex items-center">
                &ldquo;{layer.description}&rdquo;
              </div>
              <div className="md:w-56 flex-shrink-0">
                <select
                  className={`w-full bg-slate-950 border p-2 text-xs sm:text-sm font-mono rounded-lg outline-none transition-colors ${
                    showResults 
                      ? answers[layer.number] === layer.name 
                        ? "border-emerald-500 text-emerald-400 bg-emerald-950/30" 
                        : "border-rose-500 text-rose-400 bg-rose-950/30"
                      : "border-slate-700 text-slate-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                  }`}
                  value={answers[layer.number] || ""}
                  onChange={(e) => handleSelect(layer.number, e.target.value)}
                  disabled={showResults}
                >
                  <option value="">-- Select Layer --</option>
                  {[...layers].sort((a, b) => a.name.localeCompare(b.name)).map(l => (
                    <option key={l.name} value={l.name}>{l.name}</option>
                  ))}
                </select>
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
              VALIDATE CONFIGURATION
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
                      All 7 OSI layers correctly identified and mapped.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold font-mono mb-1 text-rose-400 flex items-center gap-2">
                      <span>[!]</span> CONFIGURATION MISMATCH DETECTED
                    </span>
                    <p className="text-xs sm:text-sm text-rose-300/90 font-mono">
                      One or more layer assignments failed validation. Review highlighted fields.
                    </p>
                  </div>
                )}
              </div>
              <button
                onClick={resetQuiz}
                className="px-6 py-2.5 border border-emerald-500/40 hover:border-emerald-400 bg-slate-900/80 hover:bg-slate-800 text-emerald-400 font-bold font-mono text-sm rounded-lg transition-all cursor-pointer"
              >
                {allCorrect || isScrambled ? "SCRAMBLE FIRMWARE (Reset and scramble order)" : "RESET FIRMWARE (Reset answers)"}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function OSIQuiz() {
  return (
    <Suspense fallback={null}>
      <OSIQuizContent />
    </Suspense>
  );
}
