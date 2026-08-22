"use client";

import { useState, ReactNode } from "react";
import QuizHeader from "./QuizHeader";

export interface QuizTab {
  id: string;
  label: string;
  badge?: string | number;
  content: ReactNode;
}

export interface TabbedQuizProps {
  moduleTag?: string;
  moduleCode?: string;
  title?: string;
  studyGuideHref?: string;
  tabs: QuizTab[];
  defaultTabId?: string;
}

export default function TabbedQuiz({
  moduleTag = "DIAGNOSTIC_MODULE",
  moduleCode,
  title,
  studyGuideHref,
  tabs,
  defaultTabId,
}: TabbedQuizProps) {
  const [activeTabId, setActiveTabId] = useState<string>(
    defaultTabId || (tabs.length > 0 ? tabs[0].id : "")
  );

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-8 font-mono">
      {title && (
        <QuizHeader
          moduleTag={moduleTag}
          moduleCode={moduleCode}
          title={title}
          studyGuideHref={studyGuideHref}
        />
      )}

      <main className="w-full max-w-5xl terminal-box border-l-4 border-l-emerald-500 shadow-2xl space-y-6">
        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-slate-800/80">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTabId(tab.id)}
                className={`px-4 py-2 font-mono text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 rounded-lg ${
                  isActive
                    ? "bg-emerald-500/20 border border-emerald-500 text-emerald-400 shadow-sm shadow-emerald-950/50"
                    : "bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded ${
                      isActive
                        ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                        : "bg-slate-950 border border-slate-800 text-slate-400"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={tab.id === activeTabId ? "space-y-6" : "hidden"}
          >
            {tab.content}
          </div>
        ))}
      </main>
    </div>
  );
}
