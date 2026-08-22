"use client";

import Link from "next/link";

interface QuizHeaderProps {
  moduleTag?: string;
  moduleCode?: string;
  title: string;
  studyGuideHref?: string;
}

export default function QuizHeader({
  moduleTag = "DIAGNOSTIC_MODULE",
  moduleCode,
  title,
  studyGuideHref,
}: QuizHeaderProps) {
  return (
    <header className="w-full max-w-4xl mb-8 cyber-glass-panel p-4 sm:p-5 rounded-xl border border-slate-800 shadow-xl flex flex-wrap justify-between items-center gap-4">
      <div className="flex flex-col">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-1.5 py-0.5 rounded">
            {moduleTag}
          </span>
          {moduleCode && (
            <>
              <span className="text-xs text-slate-500 font-mono">{"//"}</span>
              <span className="text-xs text-slate-400 font-mono">{moduleCode}</span>
            </>
          )}
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2 font-mono">
          <span className="text-emerald-400">ENT_ROUTER_V1</span>
          <span className="text-slate-600 font-light">|</span>
          <span className="text-slate-200">{title}</span>
        </h1>
      </div>
      <div className="flex items-center gap-3 text-xs font-mono">
        {studyGuideHref && (
          <Link
            href={studyGuideHref}
            className="px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-950/30 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-400 transition-all flex items-center gap-1.5 font-bold"
          >
            <span>[STUDY_GUIDE]</span>
          </Link>
        )}
        <Link
          href="/"
          className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-600 transition-all font-bold"
        >
          {"<"} BACK TO HUB
        </Link>
      </div>
    </header>
  );
}
