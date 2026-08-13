"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

type QuestionType = "leading" | "trailing" | "random";

export default function BinaryCalculation() {
  interface Challenge {
    bits: string;
    value: number;
    options: number[];
  }

  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [userInputs, setUserInputs] = useState<string[]>(["", "", "", ""]);
  const [validationResults, setValidationResults] = useState<(boolean | null)[]>([null, null, null, null]);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [showHint1, setShowHint1] = useState<boolean>(false);
  const [showHint2, setShowHint2] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");

  const generateQuestion = useCallback(() => {
    const newChallenges: Challenge[] = [];

    for (let i = 0; i < 4; i++) {
      const types: QuestionType[] = ["leading", "trailing", "random"];
      const type = types[Math.floor(Math.random() * types.length)];
      let newBits = "";
      let newValue = 0;

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

      newValue = parseInt(newBits, 2);

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

    setChallenges(newChallenges);
    setUserInputs(["", "", "", ""]);
    setValidationResults([null, null, null, null]);
    setFeedback("");
    setShowHint1(false);
    setShowHint2(false);
  }, []);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

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
    <div className="min-h-screen flex flex-col items-center p-8">
      <header className="w-full max-w-4xl mb-8 border-b border-border pb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-accent">ENT_ROUTER_V1 | Binary Calculation</h1>
          <Link href="/" className="text-sm text-accent hover:underline">{"<"} BACK TO HUB</Link>
        </div>
      </header>

      <main className="w-full max-w-4xl space-y-8">
        <section className="terminal-box border-l-4 border-l-accent">
          <h2 className="text-xl font-bold mb-6 text-accent">[BINARY_CHALLENGE]</h2>

          <div className="flex flex-col items-center gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {challenges.map((challenge, idx) => (
                <div key={idx}
                     className={`p-4 border-2 rounded ${validationResults[idx] === false ? 'border-red-400' : validationResults[idx] === true ? 'border-green-400' : 'border-slate-700'}`}>
                  <div className="mb-4">
                    {showHint1 && (
                      <div className="grid grid-cols-8 text-center mb-2 font-mono text-xs text-slate-400">
                        {[128, 64, 32, 16, 8, 4, 2, 1].map(v => <div key={v}>{v}</div>)}
                      </div>
                    )}
                    <div className="grid grid-cols-8 gap-1">
                      {challenge.bits.split("").map((bit, i) => (
                        <div key={i}
                             className="aspect-square flex items-center justify-center bg-slate-900 border-2 border-slate-700 text-xl font-bold rounded">
                          {bit}
                        </div>
                      ))}
                    </div>
                  </div>

                  {correctCount === 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {challenge.options.map(opt => (
                        <button
                          key={opt}
                          onClick={() => handleOptionClick(idx, opt)}
                          disabled={validationResults.some(r => r === true)}
                          className={`p-2 border border-border rounded font-mono text-lg transition-colors disabled:opacity-50 ${
                            userInputs[idx] === opt.toString() ? 'bg-accent text-slate-900' : 'bg-slate-800 hover:bg-slate-700'
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
                      className="w-full bg-slate-900 border border-border p-3 rounded font-mono text-xl text-center outline-none"
                      placeholder="???"
                    />
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={handleCheck}
              disabled={userInputs.some(input => input === "") || validationResults.every(r => r === true)}
              className="px-12 py-4 bg-accent text-slate-900 font-bold text-lg rounded hover:bg-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              SUBMIT ALL
            </button>

            {feedback && (
              <div
                className={`text-center font-mono font-bold text-lg ${validationResults.every(r => r === true) ? "text-green-400" : "text-red-400 animate-shake"}`}>
                {feedback}
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => setShowHint1(!showHint1)}
                className="text-xs text-slate-500 hover:text-accent underline"
              >
                {showHint1 ? "[HIDE_VALUE_TABLE]" : "[SHOW_VALUE_TABLE]"}
              </button>
              <button
                onClick={() => setShowHint2(!showHint2)}
                className="text-xs text-slate-500 hover:text-accent underline"
              >
                {showHint2 ? "[HIDE_TRICKS]" : "[SHOW_TRICKS]"}
              </button>
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer"
                 className="text-xs text-slate-500 hover:text-accent underline">
                [SHOW_RICKS]
              </a>
            </div>

            {showHint2 && (
              <div className="w-full p-4 bg-slate-900 border border-slate-700 rounded text-sm space-y-4">
                <div>
                  <h4 className="font-bold text-accent text-xs mb-1">TRICK 1: TRAILING 1&apos;s</h4>
                  <p className="text-slate-400 italic">If there&apos;s a solid line of 1&apos;s on the right, the value is always 1 less than the next digit (e.g., 0111 is 8-1=7).</p>
                </div>
                <div>
                  <h4 className="font-bold text-accent text-xs mb-1">TRICK 2: LEADING 1's</h4>
                  <p className="text-slate-400 italic">If there&apos;s a solid line of 1&apos;s on the left, start with 255 and subtract the value of the trailing zeros if they were ones (e.g., 11110000 is 255-15=240).</p>
                </div>
                <div>
                  <h4 className="font-bold text-accent text-xs mb-1">TRICK 3: ODD/EVEN</h4>
                  <p className="text-slate-400 italic">If the sequence ends in 1, it&apos;s ODD. If it ends in 0, it&apos;s EVEN. Use this to eliminate wrong choices!</p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
