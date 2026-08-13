"use client";

import { useState, useEffect } from "react";
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

export default function OSIQuiz() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [numberAnswers, setNumberAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [scrambledLayers, setScrambledLayers] = useState(layers);
  const [isScrambled, setIsScrambled] = useState(false);

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
    if (allCorrect) {
      scrambleLayers();
    }
  };

  const allCorrect = layers.every(layer =>
    answers[layer.number] === layer.name &&
    (!isScrambled || numberAnswers[layer.number] === String(layer.number))
  );

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <header className="w-full max-w-4xl mb-8 border-b border-border pb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-accent">ENT_ROUTER_V1# show osi-model</h1>
          <Link href="/" className="text-sm text-accent hover:underline">{"<"} BACK TO HUB</Link>
        </div>
      </header>

      <main className="w-full max-w-4xl terminal-box">
        <h2 className="text-xl font-bold mb-6 text-accent underline">OSI Model Layer Matching</h2>
        <p className="mb-8 text-slate-300">Match the correct OSI layer name to its description and number.</p>

        <div className="space-y-6">
          {scrambledLayers.map((layer) => (
            <div key={layer.number} className="flex flex-col md:flex-row gap-4 border-b border-border/50 pb-4 last:border-0">
              <div className="md:w-24 font-bold text-accent shrink-0 flex items-center gap-2">
                Layer
                {isScrambled ? (
                  <input
                    type="number"
                    min="1"
                    max="7"
                    className={`w-12 bg-slate-900 border border-border p-1 text-sm rounded focus:border-accent outline-none text-center ${
                      showResults
                        ? numberAnswers[layer.number] === String(layer.number)
                          ? "border-green-500 text-green-500"
                          : "border-red-500 text-red-500"
                        : ""
                    }`}
                    value={numberAnswers[layer.number] || ""}
                    onChange={(e) => handleNumberInput(layer.number, e.target.value)}
                    disabled={showResults}
                    placeholder="_"
                  />
                ) : (
                  <span className="w-12 text-center">{layer.number}</span>
                )}
                :
              </div>
              <div className="flex-grow text-sm text-slate-300 italic mb-2 md:mb-0">
                "{layer.description}"
              </div>
              <div className="md:w-48 flex-shrink-0">
                <select
                  className={`w-full bg-slate-900 border border-border p-2 text-sm rounded focus:border-accent outline-none ${
                    showResults 
                      ? answers[layer.number] === layer.name 
                        ? "border-green-500 text-green-500" 
                        : "border-red-500 text-red-500"
                      : ""
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

        <div className="mt-12 flex flex-col items-center gap-4">
          {!showResults ? (
            <button
              onClick={checkResults}
              className="px-6 py-2 bg-accent text-slate-900 font-bold rounded hover:bg-green-400 transition-colors"
            >
              VALIDATE CONFIGURATION
            </button>
          ) : (
            <div className="text-center w-full">
              <div className={`p-4 mb-6 rounded ${allCorrect ? "bg-green-900/30 text-green-400 border border-green-500" : "bg-red-900/30 text-red-400 border border-red-500"}`}>
                {allCorrect ? (
                  <div className="flex flex-col items-center">
                    <span className="text-2xl mb-2">Success!</span>
                    <p>All layers correctly identified.</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="text-2xl mb-2">Error!</span>
                    <p>Configuration mismatch detected. Review the layers marked in red.</p>
                  </div>
                )}
              </div>
              <button
                onClick={resetQuiz}
                className="px-6 py-2 border border-accent text-accent font-bold rounded hover:bg-accent/10 transition-colors"
              >
                {allCorrect || isScrambled ? "SCRAMBLE FIRMWARE (reset and scramble order)" : "RESET FIRMWARE (reset answers)"}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
