"use client";

import { useState } from "react";
import Link from "next/link";

// -------- wire data --------
type Wire = {
  id: string;
  position: number; // correct position, 8 down to 1
  label: string;
  mnemonic: string;
  swatch: string; // css gradient/color for the pin
};

// -------- diagonal candy-stripe helper (matches striped wire look) --------
function stripe(color: string): string {
  return `repeating-linear-gradient(45deg, ${color} 0px, ${color} 10px, #ffffff 10px, #ffffff 20px)`;
}

const wires: Wire[] = [
  { id: "ow", position: 8, label: "Orange/white stripe", mnemonic: "Sun rays", swatch: stripe("#f97316") },
  { id: "o", position: 7, label: "Orange", mnemonic: "Sun", swatch: "#f97316" },
  { id: "gw", position: 6, label: "Green/white stripe", mnemonic: "Aliens!!", swatch: stripe("#22c55e") },
  { id: "b", position: 5, label: "Blue", mnemonic: "Sky", swatch: "#1d4ed8" },
  { id: "bw", position: 4, label: "Blue/white stripe", mnemonic: "Water/rain", swatch: stripe("#1d4ed8") },
  { id: "g", position: 3, label: "Green", mnemonic: "Plants", swatch: "#22c55e" },
  { id: "brw", position: 2, label: "Brown/white stripe", mnemonic: "Tilled dirt", swatch: stripe("#78350f") },
  { id: "br", position: 1, label: "Brown", mnemonic: "Dirt", swatch: "#78350f" },
];

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function EIATIAQuiz() {
  const [order, setOrder] = useState<Wire[]>(() => shuffle(wires));
  const [hints, setHints] = useState<Record<string, boolean>>({});
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const toggleHint = (id: string) => {
    setHints(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDragStart = (id: string) => {
    setDraggedId(id);
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (id !== dragOverId) setDragOverId(id);
  };

  const handleDrop = (targetId: string) => {
    if (!draggedId || draggedId === targetId) {
      setDraggedId(null);
      setDragOverId(null);
      return;
    }
    setOrder(prev => {
      const next = [...prev];
      const fromIndex = next.findIndex(w => w.id === draggedId);
      const toIndex = next.findIndex(w => w.id === targetId);
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
    setDraggedId(null);
    setDragOverId(null);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverId(null);
  };

  // touch support: move a wire up or down by one slot
  const move = (id: string, direction: -1 | 1) => {
    setOrder(prev => {
      const next = [...prev];
      const index = next.findIndex(w => w.id === id);
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const checkResults = () => {
    setShowResults(true);
  };

  const allCorrect = order.every((w, i) => w.position === 8 - i);

  const resetQuiz = () => {
    setShowResults(false);
    setHints({});
    setOrder(shuffle(wires));
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <header className="w-full max-w-4xl mb-8 border-b border-border pb-4">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <h1 className="text-3xl font-bold text-accent">ENT_ROUTER_V1 | EIA/TIA 568B</h1>
          <div className="flex items-center gap-4 text-sm font-mono">
            <Link href="/study-guide#eiatia-568b-standard-specification" className="text-accent hover:underline flex items-center gap-1">
              [VIEW IN STUDY GUIDE]
            </Link>
            <Link href="/" className="text-sm text-accent hover:underline">{"<"} BACK TO HUB</Link>
          </div>
        </div>
      </header>

      <main className="w-full max-w-4xl terminal-box">
        <h2 className="text-xl font-bold mb-2 text-accent underline">Wire Order Drag-to-Sort</h2>
        <p className="mb-2 text-slate-300">
          Drag the wires into the correct EIA/TIA 568B order, pin 8 at the top down to pin 1 at the bottom.
        </p>
        <p className="mb-8 text-slate-400 text-sm">
          Tap &quot;hint&quot; on a wire to reveal its mnemonic.
        </p>

        <div className="space-y-2">
          {order.map((wire, index) => (
            <div
              key={wire.id}
              draggable={!showResults}
              onDragStart={() => handleDragStart(wire.id)}
              onDragOver={(e) => handleDragOver(e, wire.id)}
              onDrop={() => handleDrop(wire.id)}
              onDragEnd={handleDragEnd}
              className={`flex items-center gap-4 border rounded p-3 transition-colors ${
                showResults
                  ? wire.position === 8 - index
                    ? "border-green-500 bg-green-900/20"
                    : "border-red-500 bg-red-900/20"
                  : dragOverId === wire.id
                    ? "border-accent bg-slate-800"
                    : "border-border bg-slate-900"
              } ${draggedId === wire.id ? "opacity-40" : ""} ${!showResults ? "cursor-move" : ""}`}
            >
              <div className="w-8 text-center font-bold text-accent shrink-0">
                {8 - index}
              </div>

              <div
                className="w-16 sm:w-48 md:w-64 lg:w-96 h-6 rounded shrink-0 border border-slate-600 overflow-hidden"
                style={{ background: wire.swatch }}
              />

              <div className="grow text-sm">
                {wire.label}
                {hints[wire.id] && (
                  <div className="text-accent text-xs mt-1 italic">Mnemonic: {wire.mnemonic}</div>
                )}
              </div>

              <button
                onClick={() => toggleHint(wire.id)}
                className="text-xs px-2 py-1 border border-border rounded text-slate-300 hover:border-accent hover:text-accent transition-colors shrink-0"
              >
                {hints[wire.id] ? "hide hint" : "hint"}
              </button>

              {!showResults && (
                <div className="flex flex-col gap-1 shrink-0">
                  <button
                    onClick={() => move(wire.id, -1)}
                    disabled={index === 0}
                    className="text-xs px-2 border border-border rounded text-slate-300 hover:border-accent hover:text-accent disabled:opacity-20 transition-colors"
                    aria-label="Move up"
                  >
                    ^
                  </button>
                  <button
                    onClick={() => move(wire.id, 1)}
                    disabled={index === order.length - 1}
                    className="text-xs px-2 border border-border rounded text-slate-300 hover:border-accent hover:text-accent disabled:opacity-20 transition-colors"
                    aria-label="Move down"
                  >
                    v
                  </button>
                </div>
              )}
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
                    <p>Wire order matches EIA/TIA 568B.</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="text-2xl mb-2">Error!</span>
                    <p>Configuration mismatch detected. Review the pins marked in red.</p>
                  </div>
                )}
              </div>
              <button
                onClick={resetQuiz}
                className="px-6 py-2 border border-accent text-accent font-bold rounded hover:bg-accent/10 transition-colors"
              >
                SCRAMBLE FIRMWARE (reset and scramble order)
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
