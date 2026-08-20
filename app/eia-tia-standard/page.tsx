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
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-8">
      {/* Header */}
      <header className="w-full max-w-4xl mb-8 cyber-glass-panel p-4 sm:p-5 rounded-xl border border-slate-800 shadow-xl flex flex-wrap justify-between items-center gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-1.5 py-0.5 rounded">
              DIAGNOSTIC_MODULE
            </span>
            <span className="text-xs text-slate-500 font-mono">//</span>
            <span className="text-xs text-slate-400 font-mono">RJ45_COLOR_CODE</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="text-emerald-400 font-mono">ENT_ROUTER_V1</span>
            <span className="text-slate-600 font-light">|</span>
            <span className="text-slate-200">EIA/TIA 568B Standard</span>
          </h1>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <Link
            href="/study-guide#eiatia-568b-standard-specification"
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

      <main className="w-full max-w-4xl terminal-box border-l-4 border-l-emerald-500 shadow-2xl font-mono">
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
              [RJ45_MODULAR_PLUG_WIRE_CRIMPING_SIMULATOR]
            </h2>
          </div>
          <div className="text-xs font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
            SPEC: EIA/TIA 568B
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 font-mono mb-2">
          Arrange wires into the correct EIA/TIA 568B sequence, from Pin 8 (top) down to Pin 1 (bottom).
        </p>
        <p className="mb-6 text-xs text-slate-400 font-mono">
          Drag and drop wire channels or use tactile touch buttons. Tap &quot;hint&quot; to reveal mnemonics.
        </p>

        {/* RJ45 Connector Skin Container */}
        <div className="p-4 sm:p-6 bg-slate-950/80 border-2 border-slate-800 rounded-xl shadow-inner relative space-y-3">
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2 flex justify-between items-center border-b border-slate-800/60 pb-2">
            <span>PIN #</span>
            <span>WIRE CONDUCTOR COLOR</span>
            <span>MNEMONIC / CONTROLS</span>
          </div>

          {order.map((wire, index) => {
            const isTargetPin = wire.position === 8 - index;
            return (
              <div
                key={wire.id}
                draggable={!showResults}
                onDragStart={() => handleDragStart(wire.id)}
                onDragOver={(e) => handleDragOver(e, wire.id)}
                onDrop={() => handleDrop(wire.id)}
                onDragEnd={handleDragEnd}
                className={`flex items-center gap-3 sm:gap-4 border rounded-lg p-2.5 sm:p-3 transition-all ${
                  showResults
                    ? isTargetPin
                      ? "border-emerald-500 bg-emerald-950/20 shadow-sm shadow-emerald-950"
                      : "border-rose-500 bg-rose-950/20 shadow-sm shadow-rose-950"
                    : dragOverId === wire.id
                      ? "border-emerald-400 bg-slate-800 ring-2 ring-emerald-500/30"
                      : "border-slate-800 bg-slate-900/90 hover:border-slate-700"
                } ${draggedId === wire.id ? "opacity-30 scale-95" : ""} ${!showResults ? "cursor-grab active:cursor-grabbing" : ""}`}
              >
                <div className="w-10 text-center font-mono font-bold text-xs sm:text-sm text-emerald-400 bg-slate-950 border border-slate-800 py-1 rounded shrink-0">
                  P{8 - index}
                </div>

                <div
                  className="w-16 sm:w-40 md:w-56 h-7 rounded-md shrink-0 border border-slate-600/80 shadow-md relative overflow-hidden"
                  style={{ background: wire.swatch }}
                >
                  {/* Subtle gloss highlight on wire */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/30 pointer-events-none" />
                </div>

                <div className="grow text-xs sm:text-sm font-mono text-slate-200">
                  <span className="font-semibold">{wire.label}</span>
                  {hints[wire.id] && (
                    <div className="text-amber-300 text-xs mt-0.5 italic font-mono flex items-center gap-1">
                      <span>Mnemonic: {wire.mnemonic}</span>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => toggleHint(wire.id)}
                  className="text-[11px] font-mono px-2 py-1 border border-slate-700 rounded-md bg-slate-950 text-slate-400 hover:border-emerald-500/50 hover:text-emerald-400 transition-colors shrink-0 cursor-pointer"
                >
                  {hints[wire.id] ? "hide" : "hint"}
                </button>

                {!showResults && (
                  <div className="flex flex-col gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => move(wire.id, -1)}
                      disabled={index === 0}
                      className="text-[10px] px-1.5 py-0.5 border border-slate-800 rounded bg-slate-950 text-slate-400 hover:border-emerald-500 hover:text-emerald-400 disabled:opacity-20 transition-colors cursor-pointer"
                      aria-label="Move up"
                    >
                      ▲
                    </button>
                    <button
                      type="button"
                      onClick={() => move(wire.id, 1)}
                      disabled={index === order.length - 1}
                      className="text-[10px] px-1.5 py-0.5 border border-slate-800 rounded bg-slate-950 text-slate-400 hover:border-emerald-500 hover:text-emerald-400 disabled:opacity-20 transition-colors cursor-pointer"
                      aria-label="Move down"
                    >
                      ▼
                    </button>
                  </div>
                )}
              </div>
            );
          })}
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
                      Wire pinout matches EIA/TIA 568B specification (Pins 8 through 1).
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold font-mono mb-1 text-rose-400 flex items-center gap-2">
                      <span>[!]</span> CONFIGURATION MISMATCH DETECTED
                    </span>
                    <p className="text-xs sm:text-sm text-rose-300/90 font-mono">
                      One or more wire positions fail EIA/TIA 568B parity. Review pins marked in red.
                    </p>
                  </div>
                )}
              </div>
              <button
                onClick={resetQuiz}
                className="px-6 py-2.5 border border-emerald-500/40 hover:border-emerald-400 bg-slate-900/80 hover:bg-slate-800 text-emerald-400 font-bold font-mono text-sm rounded-lg transition-all cursor-pointer"
              >
                SCRAMBLE FIRMWARE (Reset and scramble order)
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
