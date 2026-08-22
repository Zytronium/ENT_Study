"use client";

import { useState, useMemo, ReactNode } from "react";
import QuizHeader from "./QuizHeader";
import QuestionQuiz, { QuestionQuizItem, validateQuestionAnswer } from "./QuestionQuiz";
import MatchToDefinitionsQuiz, { DefinitionItem, validateDefinitionMatch } from "./MatchToDefinitionsQuiz";
import CalculationQuiz, { CalculationQuestion, validateCalculationAnswer } from "./CalculationQuiz";

export type SectionType = "questions" | "matching" | "calculation" | "custom";

export interface MultiSectionConfig {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  extraContent?: ReactNode;
  type: SectionType;
  questions?: QuestionQuizItem[];
  matchingItems?: DefinitionItem[];
  matchingOptions?: string[];
  calculations?: CalculationQuestion[];
  renderCustom?: (props: {
    showResults: boolean;
    onValidate: (allCorrect: boolean, score: number, total: number) => void;
    isHardMode: boolean;
  }) => ReactNode;
  validateCustom?: () => { allCorrect: boolean; score: number; total: number };
}

export interface MultiSectionQuizProps {
  moduleTag?: string;
  moduleCode?: string;
  title: string;
  studyGuideHref?: string;
  sections: MultiSectionConfig[];
  initialHardMode?: boolean;
  isEmbedded?: boolean;
}

export default function MultiSectionQuiz({
  moduleTag = "DIAGNOSTIC_MODULE",
  moduleCode,
  title,
  studyGuideHref,
  sections,
  initialHardMode = false,
  isEmbedded = false,
}: MultiSectionQuizProps) {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [sectionStates, setSectionStates] = useState<
    Record<
      number,
      {
        validated: boolean;
        allCorrect: boolean;
        score: number;
        total: number;
        answers?: Record<string, string>;
      }
    >
  >({});
  const [isHardMode, setIsHardMode] = useState(initialHardMode);
  const [quizKey, setQuizKey] = useState(0);
  const [retryCount, setRetryCount] = useState(0);

  const activeSection = sections[activeSectionIndex];
  const currentState = sectionStates[activeSectionIndex] || {
    validated: false,
    allCorrect: false,
    score: 0,
    total: 0,
    answers: {},
  };

  const handleAnswersChange = (newAnswers: Record<string, string>) => {
    setSectionStates((prev) => ({
      ...prev,
      [activeSectionIndex]: {
        ...(prev[activeSectionIndex] || {
          validated: false,
          allCorrect: false,
          score: 0,
          total: 0,
        }),
        answers: newAnswers,
      },
    }));
  };

  const handleValidateCurrentSection = (allCorrect: boolean, score: number, total: number) => {
    setSectionStates((prev) => ({
      ...prev,
      [activeSectionIndex]: {
        ...(prev[activeSectionIndex] || { answers: {} }),
        validated: true,
        allCorrect,
        score,
        total,
      },
    }));
  };

  const handleValidateClick = () => {
    const currentAnswers = currentState.answers || {};
    let res = { allCorrect: false, score: 0, total: 0 };

    if (activeSection.type === "questions" && activeSection.questions) {
      let correct = 0;
      activeSection.questions.forEach((q) => {
        if (validateQuestionAnswer(q, currentAnswers[String(q.id)] || "")) {
          correct++;
        }
      });
      res = {
        allCorrect: correct === activeSection.questions.length,
        score: correct,
        total: activeSection.questions.length,
      };
    } else if (activeSection.type === "matching" && activeSection.matchingItems) {
      let correct = 0;
      activeSection.matchingItems.forEach((item) => {
        if (validateDefinitionMatch(item, currentAnswers[String(item.id)] || "")) {
          correct++;
        }
      });
      res = {
        allCorrect: correct === activeSection.matchingItems.length,
        score: correct,
        total: activeSection.matchingItems.length,
      };
    } else if (activeSection.type === "calculation" && activeSection.calculations) {
      let correct = 0;
      activeSection.calculations.forEach((q) => {
        if (validateCalculationAnswer(q, currentAnswers[String(q.id)] || "")) {
          correct++;
        }
      });
      res = {
        allCorrect: correct === activeSection.calculations.length,
        score: correct,
        total: activeSection.calculations.length,
      };
    } else if (activeSection.type === "custom") {
      if (activeSection.validateCustom) {
        res = activeSection.validateCustom();
      } else {
        res = {
          allCorrect: currentState.allCorrect,
          score: currentState.score,
          total: currentState.total || 1,
        };
      }
    }

    setSectionStates((prev) => ({
      ...prev,
      [activeSectionIndex]: {
        answers: currentAnswers,
        validated: true,
        allCorrect: res.allCorrect,
        score: res.score,
        total: res.total,
      },
    }));
  };

  const handleNextSection = () => {
    if (activeSectionIndex + 1 < sections.length) {
      setActiveSectionIndex((prev) => prev + 1);
    }
  };

  const handleRetryCurrentSection = () => {
    setSectionStates((prev) => ({
      ...prev,
      [activeSectionIndex]: {
        validated: false,
        allCorrect: false,
        score: 0,
        total: prev[activeSectionIndex]?.total || 0,
        answers: {},
      },
    }));
    setRetryCount((c) => c + 1);
  };

  const handleResetAll = (enableHardMode: boolean = false) => {
    setSectionStates({});
    setActiveSectionIndex(0);
    setIsHardMode(enableHardMode);
    setQuizKey((k) => k + 1);
    setRetryCount(0);
  };

  const totalScoreSummary = useMemo(() => {
    let earned = 0;
    let total = 0;
    Object.values(sectionStates).forEach((st) => {
      earned += st.score || 0;
      total += st.total || 0;
    });
    return { earned, total };
  }, [sectionStates]);

  const allSectionsComplete = useMemo(() => {
    return (
      sections.length > 0 &&
      sections.every((_, idx) => sectionStates[idx]?.validated && sectionStates[idx]?.allCorrect)
    );
  }, [sections, sectionStates]);

  const contentBody = (
    <>
      {/* Active Section Content Card */}
      <section className={isEmbedded ? "space-y-6 font-mono" : "terminal-box border-l-4 border-l-emerald-500 shadow-2xl space-y-6 font-mono"}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
              {activeSection.subtitle || `[STAGE_${String(activeSectionIndex + 1).padStart(2, "0")}: ${activeSection.title}]`}
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded border border-slate-800">
              <span className="text-[11px] font-mono text-slate-500 mr-1">STAGES:</span>
              {sections.map((sec, idx) => {
                const state = sectionStates[idx];
                const isDone = state?.allCorrect;
                const isCurrent = activeSectionIndex === idx;

                let dotColor = "bg-slate-700";
                if (isDone) {
                  dotColor = "bg-emerald-400 shadow-sm shadow-emerald-400/50";
                } else if (isCurrent) {
                  dotColor = "bg-amber-400";
                }

                return (
                  <div
                    key={sec.id}
                    title={`Stage ${idx + 1}: ${sec.title}`}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${dotColor}`}
                  />
                );
              })}
            </div>
            {currentState.validated && (
              <div className="font-mono text-xs px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300">
                SCORE:{" "}
                <span className={currentState.allCorrect ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                  {currentState.score}
                </span>{" "}
                / {currentState.total}
              </div>
            )}
          </div>
        </div>

        {activeSection.description && (
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            {activeSection.description}
          </p>
        )}

        {activeSection.extraContent}

        {/* Render Active Section by Type */}
        {activeSection.type === "questions" && activeSection.questions && (
          <QuestionQuiz
            key={`${activeSection.id}-${quizKey}-${retryCount}-${isHardMode ? "hard" : "normal"}`}
            isEmbedded={true}
            questions={activeSection.questions}
            heading={activeSection.subtitle || `[PART_${activeSectionIndex + 1}: QUESTIONS]`}
            initialHardMode={isHardMode}
            externalAnswers={currentState.answers}
            externalShowResults={currentState.validated}
            onAnswersChange={handleAnswersChange}
            onValidateSection={handleValidateCurrentSection}
          />
        )}

        {activeSection.type === "matching" && activeSection.matchingItems && (
          <MatchToDefinitionsQuiz
            key={`${activeSection.id}-${quizKey}-${retryCount}-${isHardMode ? "hard" : "normal"}`}
            isEmbedded={true}
            items={activeSection.matchingItems}
            options={activeSection.matchingOptions}
            heading={activeSection.subtitle || `[PART_${activeSectionIndex + 1}: DEFINITION_MATCHING]`}
            initialHardMode={isHardMode}
            externalAnswers={currentState.answers}
            externalShowResults={currentState.validated}
            onAnswersChange={handleAnswersChange}
            onValidateSection={handleValidateCurrentSection}
          />
        )}

        {activeSection.type === "calculation" && activeSection.calculations && (
          <CalculationQuiz
            key={`${activeSection.id}-${quizKey}-${retryCount}-${isHardMode ? "hard" : "normal"}`}
            isEmbedded={true}
            questions={activeSection.calculations}
            heading={activeSection.subtitle || `[PART_${activeSectionIndex + 1}: CALCULATIONS]`}
            initialHardMode={isHardMode}
            externalAnswers={currentState.answers}
            externalShowResults={currentState.validated}
            onAnswersChange={handleAnswersChange}
            onValidateSection={handleValidateCurrentSection}
          />
        )}

        {activeSection.type === "custom" && activeSection.renderCustom && (
          <div key={`${activeSection.id}-${quizKey}-${retryCount}-${isHardMode ? "hard" : "normal"}`}>
            {activeSection.renderCustom({
              showResults: currentState.validated,
              onValidate: handleValidateCurrentSection,
              isHardMode,
            })}
          </div>
        )}

        {/* Section Action Controls */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col items-center gap-4">
          {!currentState.validated ? (
            <button
              type="button"
              onClick={handleValidateClick}
              className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-sm rounded-lg shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/20 transition-all cursor-pointer"
            >
              VALIDATE PART {activeSectionIndex + 1}
            </button>
          ) : (
            <div className="text-center w-full space-y-4">
              <div
                className={`p-4 rounded-lg ${
                  currentState.allCorrect
                    ? "bg-emerald-950/40 text-emerald-300 border border-emerald-500/60 shadow-lg shadow-emerald-950/40"
                    : "bg-rose-950/40 text-rose-300 border border-rose-500/60 shadow-lg shadow-rose-950/40"
                }`}
              >
                {currentState.allCorrect ? (
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold font-mono mb-1 text-emerald-400 flex items-center gap-2">
                      <span>[OK]</span> PART {activeSectionIndex + 1} COMPLETE
                    </span>
                    <p className="text-xs sm:text-sm text-emerald-300/90 font-mono">
                      All items in this section have been verified.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold font-mono mb-1 text-rose-400 flex items-center gap-2">
                      <span>[!]</span> PART {activeSectionIndex + 1} MISMATCH DETECTED
                    </span>
                    <p className="text-xs sm:text-sm text-rose-300/90 font-mono">
                      {currentState.total - currentState.score} item(s) need review. Examine the feedback above.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {currentState.allCorrect && activeSectionIndex + 1 < sections.length && (
                  <button
                    type="button"
                    onClick={handleNextSection}
                    className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-sm rounded-lg shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/20 transition-all cursor-pointer"
                  >
                    PROCEED TO PART {activeSectionIndex + 2} {">"}
                  </button>
                )}

                {!currentState.allCorrect && (
                  <button
                    type="button"
                    onClick={handleRetryCurrentSection}
                    className="px-6 py-2.5 border border-emerald-500/40 hover:border-emerald-400 bg-slate-900/80 hover:bg-slate-800 text-emerald-400 font-bold font-mono text-sm rounded-lg transition-all cursor-pointer"
                  >
                    RETRY PART {activeSectionIndex + 1}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Global Completion Summary Card when all sections passed */}
      {allSectionsComplete && (
        <section className="terminal-box border-l-4 border-l-emerald-500 bg-emerald-950/20 shadow-2xl p-6 text-center space-y-4">
          <span className="text-xl font-bold font-mono text-emerald-400 flex items-center justify-center gap-2">
            <span>[OK]</span> ALL MODULE SECTIONS SYNCHRONIZED
          </span>
          <p className="text-sm text-slate-300 font-mono">
            You have successfully completed all {sections.length} parts of this module. Total score: {totalScoreSummary.earned} / {totalScoreSummary.total}.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => handleResetAll(true)}
              className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-sm rounded-lg shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/20 transition-all cursor-pointer"
            >
              RETRY IN MASTERY MODE
            </button>
            <button
              type="button"
              onClick={() => handleResetAll(false)}
              className="px-6 py-2.5 border border-emerald-500/40 hover:border-emerald-400 bg-slate-900/80 hover:bg-slate-800 text-emerald-400 font-bold font-mono text-sm rounded-lg transition-all cursor-pointer"
            >
              RESET ALL PARTS
            </button>
          </div>
        </section>
      )}
    </>
  );

  if (isEmbedded) {
    return <div className="w-full space-y-6">{contentBody}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-8 font-mono">
      <QuizHeader
        moduleTag={moduleTag}
        moduleCode={moduleCode}
        title={title}
        studyGuideHref={studyGuideHref}
      />
      <main className="w-full max-w-4xl space-y-6">
        {contentBody}
      </main>
    </div>
  );
}
