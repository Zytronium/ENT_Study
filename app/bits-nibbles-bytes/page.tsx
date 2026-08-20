"use client";

import { useState } from "react";
import Link from "next/link";

interface Question {
  id: number;
  question: string;
  options?: string[];
  answer: string;
}

const stage1Matching = [
  { id: 1, term: "Bit", definition: "Abbreviated as lowercase 'b', represents a single 1 or 0 (on or off)." },
  { id: 2, term: "Nibble", definition: "A data unit composed of 4 bits." },
  { id: 3, term: "Byte", definition: "Abbreviated as uppercase 'B', consists of 8 bits." },
  { id: 4, term: "Kilobit (Kb)", definition: "Standard unit composed of exactly 1,000 bits." },
  { id: 5, term: "Kilobyte (KB)", definition: "Standard unit composed of exactly 1,024 bytes." },
];

const stage2Conversions: Question[] = [
  { id: 6, question: "How many bits are in a Nibble?", answer: "4" },
  { id: 7, question: "How many bits are in a Byte?", answer: "8" },
  { id: 8, question: "How many nibbles are in a Byte?", answer: "2" },
  { id: 9, question: "How many bits are in a kilobit (Kb)?", answer: "1000" },
  { id: 10, question: "How many bytes are in a kilobyte (KB)?", answer: "1024" },
];

const stage3Misc: Question[] = [
  { id: 11, question: "Data throughput (speed) is typically measured in which unit per second?", options: ["Bits", "Bytes"], answer: "Bits" },
  { id: 12, question: "Data storage is typically measured in which unit?", options: ["Bits", "Bytes"], answer: "Bytes" },
  { id: 13, question: "Which abbreviation represents 1,000 bits?", options: ["Kb", "KB", "Mb", "MB"], answer: "Kb" },
  { id: 14, question: "Which abbreviation represents 1,024 bytes?", options: ["Kb", "KB", "Mb", "MB"], answer: "KB" },
];

export default function BitsBytesNibbles() {
  const [stage, setStage] = useState(1);
  const [assignments, setAssignments] = useState<Record<number, string>>({});
  const [inputs, setInputs] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [completedStages, setCompletedStages] = useState<number[]>([]);

  const handleSelect = (qId: number, value: string) => {
    setAssignments(prev => ({ ...prev, [qId]: value }));
  };

  const handleInputChange = (qId: number, value: string) => {
    setInputs(prev => ({ ...prev, [qId]: value }));
  };

  const checkStage1 = () => {
    let correct = 0;
    stage1Matching.forEach(q => {
      if (assignments[q.id] === q.term) {
        correct++;
      }
    });

    if (correct === stage1Matching.length) {
      setFeedback("PHASE_01 COMPLETE: Definitions synchronized.");
      setCompletedStages(prev => [...prev, 1]);
      setShowResults(true);
      setTimeout(() => {
        setStage(2);
        setShowResults(false);
        setFeedback("");
      }, 2000);
    } else {
      setFeedback(`ERROR: ${stage1Matching.length - correct} definition mismatches detected.`);
      setShowResults(true);
    }
  };

  const checkStage2 = () => {
    let correct = 0;
    stage2Conversions.forEach(q => {
      const normalizedInput = (inputs[q.id] || "").replace(/,/g, "").trim();
      if (normalizedInput === q.answer) {
        correct++;
      }
    });

    if (correct === stage2Conversions.length) {
      setFeedback("PHASE_02 COMPLETE: Conversion tables verified.");
      setCompletedStages(prev => [...prev, 2]);
      setShowResults(true);
      setTimeout(() => {
        setStage(3);
        setShowResults(false);
        setFeedback("");
      }, 2000);
    } else {
      setFeedback(`ERROR: ${stage2Conversions.length - correct} conversion errors detected.`);
      setShowResults(true);
    }
  };

  const checkStage3 = () => {
    let correct = 0;
    stage3Misc.forEach(q => {
      if (inputs[q.id] === q.answer) {
        correct++;
      }
    });

    if (correct === stage3Misc.length) {
      setFeedback("PHASE_03 COMPLETE: System calibration successful.");
      setCompletedStages(prev => [...prev, 3]);
      setShowResults(true);
    } else {
      setFeedback(`ERROR: ${stage3Misc.length - correct} anomalies detected.`);
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setStage(1);
    setAssignments({});
    setInputs({});
    setShowResults(false);
    setFeedback("");
    setCompletedStages([]);
  };

  const allTerms = stage1Matching.map(q => q.term).sort();

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
            <span className="text-xs text-slate-400 font-mono">DATA_UNITS</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="text-emerald-400 font-mono">ENT_ROUTER_V1</span>
            <span className="text-slate-600 font-light">|</span>
            <span className="text-slate-200">Bits, Bytes, and Nibbles</span>
          </h1>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <Link
            href="/study-guide#physical-layer-in-depth---bits-nibbles-and-bytes"
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

      <main className="w-full max-w-4xl terminal-box border-l-4 border-l-emerald-500 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
              {stage === 1 && "[PHASE_01: DEFINITION_MATCHING]"}
              {stage === 2 && "[PHASE_02: UNIT_CONVERSION]"}
              {stage === 3 && "[PHASE_03: MISC_CALIBRATION]"}
              {stage > 3 && "[SYSTEM_VERIFIED]"}
            </h2>
          </div>
          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1 rounded border border-slate-800">
            <span className="text-[11px] font-mono text-slate-500 mr-1">STAGES:</span>
            {[1, 2, 3].map(s => (
              <div
                key={s}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  completedStages.includes(s)
                    ? "bg-emerald-400 shadow-sm shadow-emerald-400/50"
                    : stage === s
                    ? "bg-amber-400 animate-pulse"
                    : "bg-slate-700"
                }`}
              />
            ))}
          </div>
        </div>

        {stage === 1 && (
          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-slate-400 font-mono">
              Match terms to definitions to establish baseline physical data unit parameters.
            </p>
            {stage1Matching.map((q) => (
              <div
                key={q.id}
                className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 bg-slate-900/70 border border-slate-800/80 rounded-lg hover:border-slate-700 transition-colors"
              >
                <div className="flex-grow text-slate-200 font-mono text-xs sm:text-sm">
                  <span className="text-emerald-400 font-mono font-bold mr-2">DEF_{q.id.toString().padStart(2, '0')}:</span>
                  {q.definition}
                </div>
                <div className="w-full md:w-64 shrink-0">
                  <select
                    value={assignments[q.id] || ""}
                    onChange={(e) => handleSelect(q.id, e.target.value)}
                    disabled={showResults && assignments[q.id] === q.term}
                    className={`w-full bg-slate-950 border p-2 rounded-lg font-mono text-xs sm:text-sm outline-none transition-colors ${
                      showResults
                        ? assignments[q.id] === q.term
                          ? "border-emerald-500 text-emerald-400 bg-emerald-950/30"
                          : "border-rose-500 text-rose-400 bg-rose-950/30"
                        : "border-slate-700 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 text-slate-200"
                    }`}
                  >
                    <option value="">-- SELECT TERM --</option>
                    {allTerms.map(term => (
                      <option key={term} value={term}>{term}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
            <div className="mt-8 pt-4 border-t border-slate-800/80 flex flex-col items-center">
              <button
                onClick={checkStage1}
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-sm rounded-lg shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/20 transition-all cursor-pointer"
              >
                VERIFY DEFINITIONS
              </button>
            </div>
          </div>
        )}

        {stage === 2 && (
          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-slate-400 font-mono">
              Calculate unit values to verify arithmetic logic units.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stage2Conversions.map((q) => (
                <div key={q.id} className="p-4 bg-slate-900/70 border border-slate-800/80 rounded-lg space-y-3">
                  <div className="text-slate-200 text-xs sm:text-sm font-medium">
                    <span className="text-emerald-400 font-mono font-bold mr-2">CALC_{q.id.toString().padStart(2, '0')}:</span>
                    {q.question}
                  </div>
                  <input
                    type="text"
                    value={inputs[q.id] || ""}
                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                    disabled={showResults && inputs[q.id] === q.answer}
                    placeholder="ENTER VALUE"
                    className={`w-full bg-slate-950 border p-2 rounded-lg font-mono text-xs sm:text-sm outline-none transition-colors ${
                      showResults
                        ? inputs[q.id] === q.answer
                          ? "border-emerald-500 text-emerald-400 bg-emerald-950/30"
                          : "border-rose-500 text-rose-400 bg-rose-950/30"
                        : "border-slate-700 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 text-slate-200"
                    }`}
                  />
                </div>
              ))}
            </div>
            <div className="mt-8 pt-4 border-t border-slate-800/80 flex flex-col items-center">
              <button
                onClick={checkStage2}
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-sm rounded-lg shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/20 transition-all cursor-pointer"
              >
                VERIFY CALCULATIONS
              </button>
            </div>
          </div>
        )}

        {stage === 3 && (
          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-slate-400 font-mono">
              Finalize system calibration with miscellaneous parameters.
            </p>
            <div className="space-y-4">
              {stage3Misc.map((q) => (
                <div key={q.id} className="p-4 bg-slate-900/70 border border-slate-800/80 rounded-lg space-y-3">
                  <div className="text-slate-200 text-xs sm:text-sm font-medium">
                    <span className="text-emerald-400 font-mono font-bold mr-2">PARAM_{q.id.toString().padStart(2, '0')}:</span>
                    {q.question}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {q.options?.map(opt => (
                      <button
                        key={opt}
                        onClick={() => handleInputChange(q.id, opt)}
                        disabled={showResults && inputs[q.id] === q.answer}
                        className={`px-4 py-2 border rounded-lg font-mono text-xs transition-colors cursor-pointer disabled:cursor-default ${
                          inputs[q.id] === opt
                            ? showResults
                              ? opt === q.answer
                                ? "bg-emerald-950/60 border-emerald-500 text-emerald-400 font-bold"
                                : "bg-rose-950/60 border-rose-500 text-rose-400"
                              : "bg-emerald-950/40 border-emerald-400 text-emerald-300 font-bold shadow-sm"
                            : "bg-slate-950 border-slate-700 hover:border-slate-500 text-slate-300"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-4 border-t border-slate-800/80 flex flex-col items-center gap-4">
              {!completedStages.includes(3) ? (
                <button
                  onClick={checkStage3}
                  className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-sm rounded-lg shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/20 transition-all cursor-pointer"
                >
                  FINAL VALIDATION
                </button>
              ) : (
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-bold text-emerald-400 font-mono flex items-center justify-center gap-2">
                    <span>[OK]</span> SYSTEM FULLY CALIBRATED
                  </h3>
                  <button
                    onClick={resetQuiz}
                    className="px-6 py-2.5 border border-emerald-500/40 hover:border-emerald-400 bg-slate-900/80 hover:bg-slate-800 text-emerald-400 font-bold font-mono text-sm rounded-lg transition-all cursor-pointer"
                  >
                    RESTART VERIFICATION
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {feedback && (
          <div className={`mt-6 p-4 rounded-lg font-mono text-xs sm:text-sm text-center border shadow-lg ${
            feedback.includes("COMPLETE") || feedback.includes("successful")
              ? "border-emerald-500/60 text-emerald-300 bg-emerald-950/40 shadow-emerald-950/40"
              : "border-rose-500/60 text-rose-300 bg-rose-950/40 shadow-rose-950/40"
          }`}>
            {feedback}
          </div>
        )}
      </main>
    </div>
  );
}
