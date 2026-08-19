"use client";

import { useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type ConversionMode = "hex-to-dec" | "dec-to-hex";

interface Challenge {
  hex: string;
  decimal: number;
  options: string[];
}

function getRandomDigitLength(index: number): number {
  const lengths = [1, 2, 2, 3];
  const shuffled = [...lengths].sort(() => Math.random() - 0.5);
  return shuffled[index] ?? (Math.floor(Math.random() * 3) + 1);
}

function generateRandomValue(digitLength: number): { hex: string; decimal: number } {
  let min = 1;
  let max = 15;
  if (digitLength === 2) {
    min = 16;
    max = 255;
  } else if (digitLength === 3) {
    min = 256;
    max = 4095;
  }
  const decimal = Math.floor(Math.random() * (max - min + 1)) + min;
  const hex = decimal.toString(16).toUpperCase();
  return { hex, decimal };
}

function generateChallenges(mode: ConversionMode): Challenge[] {
  const challenges: Challenge[] = [];
  const usedDecimals = new Set<number>();

  for (let i = 0; i < 4; i++) {
    const digitLength = getRandomDigitLength(i);
    let val = generateRandomValue(digitLength);
    while (usedDecimals.has(val.decimal)) {
      val = generateRandomValue(digitLength);
    }
    usedDecimals.add(val.decimal);

    if (mode === "hex-to-dec") {
      const optionsSet = new Set<number>([val.decimal]);
      let attempts = 0;
      while (optionsSet.size < 4 && attempts < 50) {
        attempts++;
        const offsets = [-16, 16, -1, 1, -256, 256, -32, 32];
        const offset = offsets[Math.floor(Math.random() * offsets.length)];
        const candidate = val.decimal + offset;
        if (candidate > 0 && candidate <= 4095) {
          optionsSet.add(candidate);
        } else {
          const randVal = generateRandomValue(digitLength);
          optionsSet.add(randVal.decimal);
        }
      }
      while (optionsSet.size < 4) {
        const randVal = generateRandomValue(digitLength);
        optionsSet.add(randVal.decimal);
      }
      const sortedOptions = Array.from(optionsSet)
        .sort((a, b) => a - b)
        .map(String);

      challenges.push({
        hex: val.hex,
        decimal: val.decimal,
        options: sortedOptions,
      });
    } else {
      const optionsSet = new Set<string>([val.hex]);
      let attempts = 0;
      while (optionsSet.size < 4 && attempts < 50) {
        attempts++;
        const offsets = [-16, 16, -1, 1, -256, 256, -32, 32];
        const offset = offsets[Math.floor(Math.random() * offsets.length)];
        const candidate = val.decimal + offset;
        if (candidate > 0 && candidate <= 4095) {
          optionsSet.add(candidate.toString(16).toUpperCase());
        } else {
          const randVal = generateRandomValue(digitLength);
          optionsSet.add(randVal.hex);
        }
      }
      while (optionsSet.size < 4) {
        const randVal = generateRandomValue(digitLength);
        optionsSet.add(randVal.hex);
      }
      const sortedOptions = Array.from(optionsSet).sort(
        (a, b) => parseInt(a, 16) - parseInt(b, 16)
      );

      challenges.push({
        hex: val.hex,
        decimal: val.decimal,
        options: sortedOptions,
      });
    }
  }

  return challenges;
}

function getModeForAttempt(attemptCount: number): ConversionMode {
  if (attemptCount === 0) return "hex-to-dec";
  if (attemptCount === 1) return "dec-to-hex";
  return attemptCount % 2 === 0 ? "hex-to-dec" : "dec-to-hex";
}

function HexadecimalContent() {
  const searchParams = useSearchParams();
  const isMastery = searchParams.get("mastery") === "true";

  const [attemptCount, setAttemptCount] = useState<number>(0);
  const currentMode = getModeForAttempt(attemptCount);
  const [challenges, setChallenges] = useState<Challenge[]>(() => generateChallenges("hex-to-dec"));
  const [userInputs, setUserInputs] = useState<string[]>(["", "", "", ""]);
  const [validationResults, setValidationResults] = useState<(boolean | null)[]>([null, null, null, null]);
  const [showHexTable, setShowHexTable] = useState<boolean>(false);
  const [showGuide, setShowGuide] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");

  const isTypingMode = isMastery || attemptCount >= 2;

  const resetForNextRound = useCallback((nextAttempt: number) => {
    const nextMode = getModeForAttempt(nextAttempt);
    setChallenges(generateChallenges(nextMode));
    setUserInputs(["", "", "", ""]);
    setValidationResults([null, null, null, null]);
    setFeedback("");
    setShowHexTable(false);
    setShowGuide(false);
  }, []);

  const handleCheck = () => {
    const results = challenges.map((challenge, index) => {
      const rawInput = userInputs[index].trim();
      if (currentMode === "hex-to-dec") {
        const parsed = parseInt(rawInput, 10);
        return !isNaN(parsed) && parsed === challenge.decimal;
      } else {
        const cleanHex = rawInput.toUpperCase().replace(/^0X/, "");
        return cleanHex === challenge.hex.toUpperCase();
      }
    });

    setValidationResults(results);

    if (results.every(r => r === true)) {
      setFeedback("CORRECT! All conversions synchronized.");
      const nextAttempt = attemptCount + 1;
      setAttemptCount(nextAttempt);
      setTimeout(() => {
        resetForNextRound(nextAttempt);
      }, 1500);
    } else {
      setFeedback("ERROR: Conversion mismatch detected. Check highlighted fields.");
    }
  };

  const handleOptionClick = (challengeIndex: number, selectedValue: string) => {
    const newInputs = [...userInputs];
    newInputs[challengeIndex] = selectedValue;
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
        <div className="flex flex-wrap justify-between items-center gap-4">
          <h1 className="text-3xl font-bold text-accent">ENT_ROUTER_V1 | Hexadecimal</h1>
          <div className="flex items-center gap-4 text-sm font-mono">
            <Link
              href="/study-guide#hexadecimal"
              className="text-accent hover:underline flex items-center gap-1"
            >
              [VIEW IN STUDY GUIDE]
            </Link>
            <Link href="/" className="text-sm text-accent hover:underline">
              {"<"} BACK TO HUB
            </Link>
          </div>
        </div>
      </header>

      <main className="w-full max-w-4xl space-y-8">
        <section className="terminal-box border-l-4 border-l-accent">
          <h2 className="text-xl font-bold mb-6 text-accent">[HEXADECIMAL_CHALLENGE]</h2>

          <div className="flex flex-col items-center gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {challenges.map((challenge, idx) => (
                <div
                  key={idx}
                  className={`p-4 border-2 rounded ${
                    validationResults[idx] === false
                      ? "border-red-400"
                      : validationResults[idx] === true
                      ? "border-green-400"
                      : "border-slate-700"
                  }`}
                >
                  <div className="mb-4 text-center">
                    {currentMode === "hex-to-dec" ? (
                      <>
                        <div className="text-xs font-mono text-slate-400 mb-2">
                          CONVERT TO DECIMAL:
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-slate-500 font-mono text-xl font-bold">0x</span>
                          {challenge.hex.split("").map((char, i) => (
                            <div
                              key={i}
                              className="w-11 h-11 flex items-center justify-center bg-slate-900 border-2 border-slate-700 text-2xl font-bold rounded text-accent font-mono"
                            >
                              {char}
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-xs font-mono text-slate-400 mb-2">
                          CONVERT TO HEXADECIMAL:
                        </div>
                        <div className="flex items-center justify-center">
                          <div className="px-6 py-2 bg-slate-900 border-2 border-slate-700 text-2xl font-bold rounded text-slate-100 font-mono">
                            {challenge.decimal}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {!isTypingMode ? (
                    <div className="grid grid-cols-2 gap-2">
                      {challenge.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleOptionClick(idx, opt)}
                          disabled={validationResults[idx] === true}
                          className={`p-2 border border-border rounded font-mono text-lg transition-colors disabled:opacity-50 ${
                            userInputs[idx] === opt
                              ? "bg-accent text-slate-900 font-bold"
                              : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={userInputs[idx]}
                      onChange={(e) => handleInputChange(idx, e.target.value)}
                      disabled={validationResults[idx] === true}
                      className="w-full bg-slate-900 border border-border p-3 rounded font-mono text-xl text-center outline-none uppercase"
                      placeholder="???"
                    />
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={handleCheck}
              disabled={
                userInputs.some((input) => input.trim() === "") ||
                validationResults.every((r) => r === true)
              }
              className="px-12 py-4 bg-accent text-slate-900 font-bold text-lg rounded hover:bg-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              SUBMIT ALL
            </button>

            {feedback && (
              <div
                className={`text-center font-mono font-bold text-lg ${
                  validationResults.every((r) => r === true)
                    ? "text-green-400"
                    : "text-red-400 animate-shake"
                }`}
              >
                {feedback}
              </div>
            )}

            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setShowHexTable(!showHexTable)}
                className="text-xs text-slate-500 hover:text-accent underline cursor-pointer"
              >
                {showHexTable ? "[HIDE_HEX_TABLE]" : "[SHOW_HEX_TABLE]"}
              </button>
              <button
                onClick={() => setShowGuide(!showGuide)}
                className="text-xs text-slate-500 hover:text-accent underline cursor-pointer"
              >
                {showGuide ? "[HIDE_CONVERSION_STEPS]" : "[SHOW_CONVERSION_STEPS]"}
              </button>
            </div>

            {showHexTable && (
              <div className="w-full p-4 bg-slate-900 border border-slate-700 rounded text-sm overflow-x-auto">
                <table className="w-full text-center font-mono text-xs sm:text-sm">
                  <thead>
                    <tr className="text-accent border-b border-slate-700">
                      <th className="p-1">HEX</th>
                      {[
                        "0", "1", "2", "3", "4", "5", "6", "7",
                        "8", "9", "A", "B", "C", "D", "E", "F",
                      ].map((h) => (
                        <th key={h} className="p-1">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-800 text-slate-300">
                      <td className="p-1 text-accent font-bold">DEC</td>
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((d) => (
                        <td key={d} className="p-1">
                          {d}
                        </td>
                      ))}
                    </tr>
                    <tr className="text-slate-400">
                      <td className="p-1 text-accent font-bold">BIN</td>
                      {[
                        "0000", "0001", "0010", "0011",
                        "0100", "0101", "0110", "0111",
                        "1000", "1001", "1010", "1011",
                        "1100", "1101", "1110", "1111",
                      ].map((b) => (
                        <td key={b} className="p-1 text-[10px] sm:text-xs">
                          {b}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {showGuide && (
              <div className="w-full p-4 bg-slate-900 border border-slate-700 rounded text-sm space-y-4">
                <div>
                  <h4 className="font-bold text-accent text-xs mb-1">
                    QUICK REFERENCE: HEX VALUES
                  </h4>
                  <p className="text-slate-400 italic">
                    A = 10, B = 11, C = 12, D = 13, E = 14, F = 15. Base-16 uses digits 0–9 and letters A–F.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-accent text-xs mb-1">
                    HEX TO DECIMAL CONVERSION
                  </h4>
                  <p className="text-slate-400 italic">
                    Convert each hex digit to its 4-bit binary sequence, concatenate them into 8-bit or 12-bit binary, and sum the binary place values (e.g., D4 &rarr; 1101 0100 &rarr; 128+64+16+4 = 212).
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-accent text-xs mb-1">
                    DECIMAL TO HEX CONVERSION
                  </h4>
                  <p className="text-slate-400 italic">
                    Convert decimal to binary, divide into 4-bit nibbles (8-4-2-1), calculate each nibble value, and map to hex digits (e.g., 212 &rarr; 1101 0100 &rarr; 13, 4 &rarr; D4).
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

export default function HexadecimalPage() {
  return (
    <Suspense fallback={null}>
      <HexadecimalContent />
    </Suspense>
  );
}
