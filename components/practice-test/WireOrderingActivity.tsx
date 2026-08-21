"use client";

import { useState, useEffect, useMemo } from "react";

export interface Wire {
  id: string;
  position: number; // 1 to 8 (Pin 1 to Pin 8)
  label: string;
  mnemonic: string;
  swatch: string;
}

function stripe(color: string): string {
  return `repeating-linear-gradient(45deg, ${color} 0px, ${color} 10px, #ffffff 10px, #ffffff 20px)`;
}

export const EIA_WIRES: Wire[] = [
  { id: "ow", position: 1, label: "Orange/white stripe", mnemonic: "Sun rays", swatch: stripe("#f97316") },
  { id: "o", position: 2, label: "Orange", mnemonic: "Sun", swatch: "#f97316" },
  { id: "gw", position: 3, label: "Green/white stripe", mnemonic: "Aliens!!", swatch: stripe("#22c55e") },
  { id: "b", position: 4, label: "Blue", mnemonic: "Sky", swatch: "#1d4ed8" },
  { id: "bw", position: 5, label: "Blue/white stripe", mnemonic: "Water/rain", swatch: stripe("#1d4ed8") },
  { id: "g", position: 6, label: "Green", mnemonic: "Plants", swatch: "#22c55e" },
  { id: "brw", position: 7, label: "Brown/white stripe", mnemonic: "Tilled dirt", swatch: stripe("#78350f") },
  { id: "br", position: 8, label: "Brown", mnemonic: "Dirt", swatch: "#78350f" },
];

function shuffleWires(arr: Wire[]): Wire[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

interface WireOrderingActivityProps {
  order?: Wire[];
  onOrderChange?: (order: Wire[]) => void;
  showResults?: boolean;
  onCompletionChange?: (isComplete: boolean, isAllCorrect: boolean) => void;
}

export default function WireOrderingActivity({
  order: externalOrder,
  onOrderChange,
  showResults = false,
  onCompletionChange,
}: WireOrderingActivityProps) {
  const [internalOrder, setInternalOrder] = useState<Wire[]>(() => shuffleWires(EIA_WIRES));
  const currentOrder = externalOrder ?? internalOrder;
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  const setOrder = (newOrder: Wire[]) => {
    if (onOrderChange) {
      onOrderChange(newOrder);
    } else {
      setInternalOrder(newOrder);
    }
  };

  const handleDragStart = (id: string) => {
    if (showResults) return;
    setDraggedId(id);
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    if (showResults) return;
    e.preventDefault();
    if (id !== dragOverId) setDragOverId(id);
  };

  const handleDrop = (targetId: string) => {
    if (showResults || !draggedId || draggedId === targetId) {
      setDraggedId(null);
      setDragOverId(null);
      return;
    }
    const next = [...currentOrder];
    const fromIndex = next.findIndex((w) => w.id === draggedId);
    const toIndex = next.findIndex((w) => w.id === targetId);
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    setOrder(next);
    setDraggedId(null);
    setDragOverId(null);
  };

  const move = (id: string, direction: -1 | 1) => {
    if (showResults) return;
    const next = [...currentOrder];
    const index = next.findIndex((w) => w.id === id);
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setOrder(next);
  };

  const isAllCorrect = useMemo(() => {
    return currentOrder.every((w, i) => w.position === i + 1);
  }, [currentOrder]);

  const correctCount = useMemo(() => {
    return currentOrder.filter((w, i) => w.position === i + 1).length;
  }, [currentOrder]);

  useEffect(() => {
    if (onCompletionChange) {
      onCompletionChange(true, isAllCorrect);
    }
  }, [isAllCorrect, onCompletionChange]);

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
        <h3 className="text-base sm:text-lg font-bold text-emerald-400 font-mono flex items-center gap-2">
          <span>[EIA/TIA_568B_WIRE_ORDERING]</span>
          <span className="text-slate-300">Pin Sequence Alignment</span>
        </h3>
        <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-900/50 px-2 py-0.5 rounded shrink-0">
          DRAG & DROP OR USE ARROWS (PIN 1 TO PIN 8)
        </span>
      </div>

      <p className="text-xs sm:text-sm text-slate-400 font-mono leading-relaxed">
        Drag and drop or use the arrow controls to reorder the colored conductors into the exact EIA/TIA 568B pinout standard from Pin 1 (top) down to Pin 8 (bottom).
      </p>

      <div className="space-y-2 max-w-xl mx-auto p-4 rounded-xl border border-slate-800 bg-slate-950/80">
        {currentOrder.map((wire, idx) => {
          const pinNumber = idx + 1;
          const isCorrect = wire.position === pinNumber;
          const isDragged = draggedId === wire.id;
          const isOver = dragOverId === wire.id;

          let cardBorderClass = "border-slate-800 bg-slate-900/90";
          if (showResults) {
            cardBorderClass = isCorrect
              ? "border-emerald-500 bg-emerald-950/20 text-emerald-300"
              : "border-rose-500 bg-rose-950/20 text-rose-300";
          } else if (isOver) {
            cardBorderClass = "border-cyan-400 bg-cyan-950/40";
          } else if (isDragged) {
            cardBorderClass = "opacity-40 border-slate-700 bg-slate-900";
          }

          return (
            <div
              key={wire.id}
              draggable={!showResults}
              onDragStart={() => handleDragStart(wire.id)}
              onDragOver={(e) => handleDragOver(e, wire.id)}
              onDrop={() => handleDrop(wire.id)}
              className={`flex items-center justify-between p-2.5 rounded-lg border transition-all duration-150 select-none ${cardBorderClass} ${
                !showResults ? "cursor-grab active:cursor-grabbing" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Pin Index Badge */}
                <span className="w-7 h-7 rounded bg-slate-950 border border-slate-700 text-slate-300 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                  P{pinNumber}
                </span>

                {/* Wire Swatch */}
                <div
                  className="w-6 h-6 rounded-full border border-slate-600 shadow-sm shrink-0"
                  style={{ background: wire.swatch }}
                />

                {/* Wire Name */}
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-mono font-bold text-slate-200">
                    {wire.label}
                  </span>
                  {showResults && !isCorrect && (
                    <span className="text-[10px] font-mono text-rose-400">
                      Expected Pin {wire.position}: {EIA_WIRES.find((w) => w.position === pinNumber)?.label}
                    </span>
                  )}
                </div>
              </div>

              {/* Controls */}
              {!showResults && (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => move(wire.id, -1)}
                    className="p-1 rounded bg-slate-950 hover:bg-slate-800 disabled:opacity-30 border border-slate-700 text-slate-300 text-xs font-mono px-2 transition-colors"
                    title="Move up"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    disabled={idx === currentOrder.length - 1}
                    onClick={() => move(wire.id, 1)}
                    className="p-1 rounded bg-slate-950 hover:bg-slate-800 disabled:opacity-30 border border-slate-700 text-slate-300 text-xs font-mono px-2 transition-colors"
                    title="Move down"
                  >
                    ▼
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showResults && (
        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/90 border border-slate-800 font-mono text-xs">
          <span className="text-slate-400">
            Pin Sequence Accuracy:{" "}
            <span
              className={`font-bold ${
                isAllCorrect
                  ? "text-emerald-400"
                  : correctCount > 0
                  ? "text-amber-400"
                  : "text-rose-400"
              }`}
            >
              {correctCount} / 8 pins correctly placed
            </span>
          </span>
          <span
            className={`font-bold px-2 py-0.5 rounded text-[11px] border ${
              isAllCorrect
                ? "bg-emerald-950/40 border-emerald-900 text-emerald-400"
                : correctCount > 0
                ? "bg-amber-950/40 border-amber-900 text-amber-300"
                : "bg-rose-950/40 border-rose-900 text-rose-400"
            }`}
          >
            {isAllCorrect
              ? "[PASSED - 10/10 PTS]"
              : correctCount > 0
              ? `[PARTIAL - ${Math.floor((correctCount / 8) * 10)}/10 PTS]`
              : "[0/10 PTS]"}
          </span>
        </div>
      )}
    </div>
  );
}
