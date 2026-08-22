"use client";

import { useState, useCallback, useMemo } from "react";
import QuizHeader from "./QuizHeader";

export interface LayerItem {
  number: number;
  name: string;
  description: string;
}

export interface MatchToLayerAndNumberQuizProps {
  moduleTag?: string;
  moduleCode?: string;
  title?: string;
  heading?: string;
  description?: string;
  studyGuideHref?: string;
  layers: LayerItem[];
  isEmbedded?: boolean;
  hideHeader?: boolean;
  initialHardMode?: boolean;
  onValidateSection?: (allCorrect: boolean, score: number, total: number) => void;
  onAnswersChange?: (layerAnswers: Record<number, string>, numberAnswers: Record<number, string>) => void;
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function MatchToLayerAndNumberQuiz({
  moduleTag = "DIAGNOSTIC_MODULE",
  moduleCode = "L1_THROUGH_L7",
  title = "OSI Model",
  heading = "[OSI_LAYER_ARCHITECTURE_MATCHING]",
  description = "Match the correct OSI layer name to its technical description and layer position index.",
  studyGuideHref = "/study-guide#osi-model",
  layers,
  isEmbedded = false,
  hideHeader = false,
  initialHardMode = false,
  onValidateSection,
  onAnswersChange,
}: MatchToLayerAndNumberQuizProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [numberAnswers, setNumberAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [isScrambled, setIsScrambled] = useState(initialHardMode);
  const [scrambledLayers, setScrambledLayers] = useState<LayerItem[]>(() =>
    initialHardMode ? shuffleArray(layers) : layers
  );

  const scrambleLayers = useCallback(() => {
    const shuffled = shuffleArray(layers);
    setScrambledLayers(shuffled);
    setIsScrambled(true);
  }, [layers]);

  const handleSelect = (layerNumber: number, value: string) => {
    const updated = { ...answers, [layerNumber]: value };
    setAnswers(updated);
    onAnswersChange?.(updated, numberAnswers);
  };

  const handleNumberInput = (layerNumber: number, value: string) => {
    const updated = { ...numberAnswers, [layerNumber]: value };
    setNumberAnswers(updated);
    onAnswersChange?.(answers, updated);
  };

  const checkResults = () => {
    setShowResults(true);
    onValidateSection?.(allCorrect, correctCount, layers.length);
  };

  const resetQuiz = () => {
    setAnswers({});
    setNumberAnswers({});
    setShowResults(false);
    if (allCorrect || isScrambled || initialHardMode) {
      scrambleLayers();
    }
  };

  const isLayerCorrect = (layer: LayerItem) => {
    const nameMatch = answers[layer.number] === layer.name;
    const numberMatch = !isScrambled || numberAnswers[layer.number] === String(layer.number);
    return nameMatch && numberMatch;
  };

  const correctCount = layers.filter(isLayerCorrect).length;

  const allCorrect = correctCount === layers.length;

  const sortedLayerNames = useMemo(() => {
    return [...layers].sort((a, b) => a.name.localeCompare(b.name));
  }, [layers]);

  const content = (
    <div className="space-y-6 font-mono">
      <div className="flex items-center justify-between pb-3 mb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <h2 className="text-base sm:text-lg font-bold text-emerald-400 font-mono">{heading}</h2>
        </div>
        {showResults && (
          <div className="font-mono text-xs px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300">
            SCORE:{" "}
            <span className={allCorrect ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
              {correctCount}
            </span>{" "}
            / {layers.length}
          </div>
        )}
      </div>

      <p className="mb-6 text-xs sm:text-sm text-slate-400 font-mono">
        {description}
      </p>

      <div className="space-y-4">
        {scrambledLayers.map((layer) => {
          const isNameCorrect = answers[layer.number] === layer.name;
          const isNumberCorrect = !isScrambled || numberAnswers[layer.number] === String(layer.number);

          return (
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
                        ? isNumberCorrect
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
                      ? isNameCorrect
                        ? "border-emerald-500 text-emerald-400 bg-emerald-950/30"
                        : "border-rose-500 text-rose-400 bg-rose-950/30"
                      : "border-slate-700 text-slate-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                  }`}
                  value={answers[layer.number] || ""}
                  onChange={(e) => handleSelect(layer.number, e.target.value)}
                  disabled={showResults}
                >
                  <option value="">-- Select Layer --</option>
                  {sortedLayerNames.map((l) => (
                    <option key={l.name} value={l.name}>
                      {l.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          );
        })}
      </div>

      {!isEmbedded && (
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col items-center gap-4">
          {!showResults ? (
            <button
              type="button"
              onClick={checkResults}
              className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-sm rounded-lg shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/20 transition-all cursor-pointer"
            >
              VALIDATE CONFIGURATION
            </button>
          ) : (
            <div className="text-center w-full">
              <div
                className={`p-4 mb-6 rounded-lg ${
                  allCorrect
                    ? "bg-emerald-950/40 text-emerald-300 border border-emerald-500/60 shadow-lg shadow-emerald-950/40"
                    : "bg-rose-950/40 text-rose-300 border border-rose-500/60 shadow-lg shadow-rose-950/40"
                }`}
              >
                {allCorrect ? (
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold font-mono mb-1 text-emerald-400 flex items-center gap-2">
                      <span>[OK]</span> CONFIGURATION SYNCHRONIZED
                    </span>
                    <p className="text-xs sm:text-sm text-emerald-300/90 font-mono">
                      All {layers.length} OSI layers correctly identified and mapped.
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
                type="button"
                onClick={resetQuiz}
                className="px-6 py-2.5 border border-emerald-500/40 hover:border-emerald-400 bg-slate-900/80 hover:bg-slate-800 text-emerald-400 font-bold font-mono text-sm rounded-lg transition-all cursor-pointer"
              >
                {allCorrect || isScrambled
                  ? "SCRAMBLE FIRMWARE (Reset and scramble order)"
                  : "RESET FIRMWARE (Reset answers)"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (isEmbedded || hideHeader) {
    return content;
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-8">
      {title && (
        <QuizHeader
          moduleTag={moduleTag}
          moduleCode={moduleCode}
          title={title}
          studyGuideHref={studyGuideHref}
        />
      )}
      <main className="w-full max-w-4xl terminal-box border-l-4 border-l-emerald-500 shadow-2xl">
        {content}
      </main>
    </div>
  );
}
