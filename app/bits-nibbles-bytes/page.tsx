"use client";

import { useState, useEffect, useCallback } from "react";
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
    <div className="min-h-screen flex flex-col items-center p-8">
      <header className="w-full max-w-4xl mb-8 border-b border-border pb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-accent">ENT_ROUTER_V1 | Bits, Bytes, and Nibbles</h1>
          <Link href="/" className="text-sm text-accent hover:underline">{"<"} BACK TO HUB</Link>
        </div>
      </header>

      <main className="w-full max-w-4xl space-y-8">
        <section className="terminal-box border-l-4 border-l-accent">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-accent">
              {stage === 1 && "[PHASE_01: DEFINITION_MATCHING]"}
              {stage === 2 && "[PHASE_02: UNIT_CONVERSION]"}
              {stage === 3 && "[PHASE_03: MISC_CALIBRATION]"}
              {stage > 3 && "[SYSTEM_VERIFIED]"}
            </h2>
            <div className="flex gap-2">
              {[1, 2, 3].map(s => (
                <div key={s} className={`w-3 h-3 rounded-full ${completedStages.includes(s) ? "bg-green-500" : stage === s ? "bg-accent" : "bg-slate-700"}`} />
              ))}
            </div>
          </div>

          {stage === 1 && (
            <div className="space-y-4">
              <p className="text-slate-400 mb-6 italic">Match terms to definitions to establish baseline parameters.</p>
              {stage1Matching.map((q) => (
                <div key={q.id} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 bg-slate-900/50 border border-slate-800 rounded">
                  <div className="flex-grow text-slate-200 font-mono text-sm">
                    <span className="text-accent mr-2">DEF_{q.id.toString().padStart(2, '0')}:</span>
                    {q.definition}
                  </div>
                  <div className="w-full md:w-64 shrink-0">
                    <select
                      value={assignments[q.id] || ""}
                      onChange={(e) => handleSelect(q.id, e.target.value)}
                      disabled={showResults && assignments[q.id] === q.term}
                      className={`w-full bg-slate-950 border p-2 rounded font-mono text-sm outline-none transition-colors ${
                        showResults
                          ? assignments[q.id] === q.term
                            ? "border-green-500 text-green-400"
                            : "border-red-500 text-red-400"
                          : "border-slate-700 focus:border-accent text-slate-300"
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
              <div className="mt-8 flex flex-col items-center">
                <button
                  onClick={checkStage1}
                  className="px-8 py-3 bg-accent text-slate-900 font-bold rounded hover:bg-green-400 transition-colors"
                >
                  VERIFY DEFINITIONS
                </button>
              </div>
            </div>
          )}

          {stage === 2 && (
            <div className="space-y-4">
              <p className="text-slate-400 mb-6 italic">Calculate unit values to verify arithmetic logic units.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stage2Conversions.map((q) => (
                  <div key={q.id} className="p-4 bg-slate-900/50 border border-slate-800 rounded space-y-3">
                    <div className="text-slate-200 font-mono text-sm">
                      <span className="text-accent mr-2">CALC_{q.id.toString().padStart(2, '0')}:</span>
                      {q.question}
                    </div>
                    <input
                      type="text"
                      value={inputs[q.id] || ""}
                      onChange={(e) => handleInputChange(q.id, e.target.value)}
                      disabled={showResults && inputs[q.id] === q.answer}
                      placeholder="ENTER VALUE"
                      className={`w-full bg-slate-950 border p-2 rounded font-mono text-sm outline-none transition-colors ${
                        showResults
                          ? inputs[q.id] === q.answer
                            ? "border-green-500 text-green-400"
                            : "border-red-500 text-red-400"
                          : "border-slate-700 focus:border-accent text-slate-300"
                      }`}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col items-center">
                <button
                  onClick={checkStage2}
                  className="px-8 py-3 bg-accent text-slate-900 font-bold rounded hover:bg-green-400 transition-colors"
                >
                  VERIFY CALCULATIONS
                </button>
              </div>
            </div>
          )}

          {stage === 3 && (
            <div className="space-y-4">
              <p className="text-slate-400 mb-6 italic">Finalize system calibration with miscellaneous parameters.</p>
              <div className="space-y-4">
                {stage3Misc.map((q) => (
                  <div key={q.id} className="p-4 bg-slate-900/50 border border-slate-800 rounded space-y-4">
                    <div className="text-slate-200 font-mono text-sm">
                      <span className="text-accent mr-2">PARAM_{q.id.toString().padStart(2, '0')}:</span>
                      {q.question}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {q.options?.map(opt => (
                        <button
                          key={opt}
                          onClick={() => handleInputChange(q.id, opt)}
                          disabled={showResults && inputs[q.id] === q.answer}
                          className={`px-4 py-2 border rounded font-mono text-xs transition-colors ${
                            inputs[q.id] === opt
                              ? showResults
                                ? opt === q.answer ? "bg-green-900/30 border-green-500 text-green-400" : "bg-red-900/30 border-red-500 text-red-400"
                                : "bg-accent text-slate-900 border-accent"
                              : "border-slate-700 hover:border-slate-500 text-slate-400"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col items-center gap-4">
                {!completedStages.includes(3) ? (
                  <button
                    onClick={checkStage3}
                    className="px-8 py-3 bg-accent text-slate-900 font-bold rounded hover:bg-green-400 transition-colors"
                  >
                    FINAL VALIDATION
                  </button>
                ) : (
                  <div className="text-center space-y-4">
                    <h3 className="text-2xl font-bold text-accent">SYSTEM FULLY CALIBRATED</h3>
                    <button
                      onClick={resetQuiz}
                      className="px-6 py-2 border border-accent text-accent font-bold rounded hover:bg-accent/10 transition-colors"
                    >
                      RESTART VERIFICATION
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {feedback && (
            <div className={`mt-8 p-4 border rounded font-mono text-sm text-center ${
              feedback.includes("COMPLETE") || feedback.includes("successful") ? "border-green-500 text-green-400 bg-green-900/10" : "border-red-500 text-red-400 bg-red-900/10 animate-shake"
            }`}>
              {feedback}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
