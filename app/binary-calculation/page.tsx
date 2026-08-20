"use client";

import { useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type QuestionType = "leading" | "trailing" | "random";

interface Challenge {
  bits: string;
  value: number;
  options: number[];
}

function generateNewChallenges(): Challenge[] {
  const newChallenges: Challenge[] = [];

  for (let i = 0; i < 4; i++) {
    const types: QuestionType[] = ["leading", "trailing", "random"];
    const type = types[Math.floor(Math.random() * types.length)];
    let newBits = "";

    if (type === "leading") {
      const ones = Math.floor(Math.random() * 7) + 1; // 1 to 7 ones
      newBits = "1".repeat(ones) + "0".repeat(8 - ones);
    } else if (type === "trailing") {
      const ones = Math.floor(Math.random() * 7) + 1; // 1 to 7 ones
      newBits = "0".repeat(8 - ones) + "1".repeat(ones);
    } else {
      for (let j = 0; j < 8; j++) {
        newBits += Math.random() > 0.5 ? "1" : "0";
      }
    }

    const newValue = parseInt(newBits, 2);

    // Generate options for MC
    const newOptions = [newValue];
    while (newOptions.length < 4) {
      const rand = Math.floor(Math.random() * 256);
      if (!newOptions.includes(rand)) {
        newOptions.push(rand);
      }
    }

    newChallenges.push({
      bits: newBits,
      value: newValue,
      options: newOptions.sort((a, b) => a - b)
    });
  }

  return newChallenges;
}

function BinaryCalculationContent() {
  const searchParams = useSearchParams();
  const isMastery = searchParams.get("mastery") === "true";

  const [challenges, setChallenges] = useState<Challenge[]>(generateNewChallenges);
  const [userInputs, setUserInputs] = useState<string[]>(["", "", "", ""]);
  const [validationResults, setValidationResults] = useState<(boolean | null)[]>([null, null, null, null]);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [showHint1, setShowHint1] = useState<boolean>(false);
  const [showHint2, setShowHint2] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");

  const generateQuestion = useCallback(() => {
    setChallenges(generateNewChallenges());
    setUserInputs(["", "", "", ""]);
    setValidationResults([null, null, null, null]);
    setFeedback("");
    setShowHint1(false);
    setShowHint2(false);
  }, []);

  const handleCheck = () => {
    const results = challenges.map((challenge, index) => {
      const answer = parseInt(userInputs[index]);
      return answer === challenge.value;
    });

    setValidationResults(results);

    if (results.every(r => r === true)) {
      setFeedback("CORRECT! All systems synchronized.");
      setCorrectCount(prev => prev + 4);
      setTimeout(() => {
        generateQuestion();
      }, 1500);
    } else {
      setFeedback("ERROR: Parity mismatch detected. Check highlighted fields.");
    }
  };

  const handleOptionClick = (challengeIndex: number, selectedValue: number) => {
    const newInputs = [...userInputs];
    newInputs[challengeIndex] = selectedValue.toString();
    setUserInputs(newInputs);
  };

  const handleInputChange = (challengeIndex: number, value: string) => {
    const newInputs = [...userInputs];
    newInputs[challengeIndex] = value;
    setUserInputs(newInputs);
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
            <span className="text-xs text-slate-400 font-mono">8_BIT_REGISTERS</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="text-emerald-400 font-mono">ENT_ROUTER_V1</span>
            <span className="text-slate-600 font-light">|</span>
            <span className="text-slate-200">Binary Calculation</span>
          </h1>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <Link
            href="/study-guide#counting-bits--calculating-binary"
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

      <main className="w-full max-w-4xl space-y-8">
        <section className="terminal-box border-l-4 border-l-emerald-500 shadow-2xl">
          <div className="flex items-center justify-between pb-3 mb-6 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
                [8_BIT_REGISTER_DECIMAL_CONVERSION]
              </h2>
            </div>
            {correctCount > 0 && (
              <div className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/50">
                SCORE: {correctCount} SYNCS
              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {challenges.map((challenge, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    validationResults[idx] === false
                      ? "border-rose-500/70 bg-rose-950/20 shadow-rose-950/40 shadow-md"
                      : validationResults[idx] === true
                      ? "border-emerald-500/70 bg-emerald-950/20 shadow-emerald-950/40 shadow-md"
                      : "border-slate-800 bg-slate-900/80"
                  }`}
                >
                  <div className="mb-4">
                    {showHint1 && (
                      <div className="grid grid-cols-8 text-center mb-1.5 font-mono text-[11px] text-cyan-400 font-bold">
                        {[128, 64, 32, 16, 8, 4, 2, 1].map((v) => (
                          <div key={v} className="bg-slate-950/60 py-0.5 rounded border border-slate-800/60">
                            {v}
                          </div>
                        ))}
                      </div>
                    )}
                    {/* 8-bit register cells */}
                    <div className="grid grid-cols-8 gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 shadow-inner">
                      {challenge.bits.split("").map((bit, i) => {
                        const isOn = bit === "1";
                        return (
                          <div
                            key={i}
                            className={`aspect-square flex items-center justify-center font-mono text-lg sm:text-xl font-bold rounded transition-all ${
                              isOn
                                ? "bg-emerald-500/20 border border-emerald-400/80 text-emerald-300 shadow-sm shadow-emerald-500/30"
                                : "bg-slate-900 border border-slate-800 text-slate-600"
                            }`}
                          >
                            {bit}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {correctCount === 0 && !isMastery ? (
                    <div className="grid grid-cols-2 gap-2">
                      {challenge.options.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleOptionClick(idx, opt)}
                          disabled={validationResults[idx] === true}
                          className={`p-2.5 border rounded-lg font-mono text-base transition-colors cursor-pointer disabled:cursor-default ${
                            userInputs[idx] === opt.toString()
                              ? "bg-emerald-500 text-slate-950 font-bold border-emerald-400 shadow-md"
                              : "bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-200"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <input
                      type="number"
                      value={userInputs[idx]}
                      onChange={(e) => handleInputChange(idx, e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-lg font-mono text-lg text-center outline-none text-slate-100 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                      placeholder="ENTER DECIMAL VALUE..."
                    />
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={handleCheck}
              disabled={userInputs.some((input) => input === "") || validationResults.every((r) => r === true)}
              className="px-10 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-sm rounded-lg shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              VALIDATE PARITY
            </button>

            {feedback && (
              <div
                className={`p-4 rounded-lg font-mono text-sm text-center border shadow-lg w-full ${
                  validationResults.every((r) => r === true)
                    ? "border-emerald-500/60 bg-emerald-950/40 text-emerald-300 shadow-emerald-950/40"
                    : "border-rose-500/60 bg-rose-950/40 text-rose-300 shadow-rose-950/40"
                }`}
              >
                {feedback}
              </div>
            )}

            <div className="flex flex-wrap gap-4 justify-center">
              <button
                type="button"
                onClick={() => setShowHint1(!showHint1)}
                className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-xs font-mono text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-all cursor-pointer"
              >
                {showHint1 ? "[HIDE_VALUE_TABLE]" : "[SHOW_VALUE_TABLE]"}
              </button>
              <button
                type="button"
                onClick={() => setShowHint2(!showHint2)}
                className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-xs font-mono text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-all cursor-pointer"
              >
                {showHint2 ? "[HIDE_TRICKS]" : "[SHOW_TRICKS]"}
              </button>
              <button
                type="button"
                onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank', 'noopener,noreferrer')}
                className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-xs font-mono text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-all cursor-pointer"
              >
                [SHOW_RICKS]
              </button>
            </div>

            {showHint2 && (
              <div className="w-full p-4 bg-slate-950 border border-slate-800 rounded-lg text-sm space-y-4 shadow-inner">
                <div>
                  <h4 className="font-bold text-emerald-400 font-mono text-xs mb-1">
                    TRICK 1: TRAILING 1&apos;s
                  </h4>
                  <p className="text-slate-400 italic text-xs sm:text-sm">
                    If there&apos;s a solid line of 1&apos;s on the right, the value is always 1 less than the next digit (e.g., 0111 is 8-1=7).
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-emerald-400 font-mono text-xs mb-1">
                    TRICK 2: LEADING 1&apos;s
                  </h4>
                  <p className="text-slate-400 italic text-xs sm:text-sm">
                    If there&apos;s a solid line of 1&apos;s on the left, start with 255 and subtract the value of the trailing zeros if they were ones (e.g., 11110000 is 255-15=240).
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-emerald-400 font-mono text-xs mb-1">
                    TRICK 3: ODD/EVEN
                  </h4>
                  <p className="text-slate-400 italic text-xs sm:text-sm">
                    If the sequence ends in 1, it&apos;s ODD. If it ends in 0, it&apos;s EVEN. Use this to eliminate wrong choices!
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default function BinaryCalculation() {
  return (
    <Suspense fallback={null}>
      <BinaryCalculationContent />
    </Suspense>
  );
}
