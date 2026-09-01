"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { GlobalAnalyticsResponse } from "@/lib/practice-test/analytics-types";
import type { StudyTopicEntry } from "@/lib/json-quizzes";

interface StudyTopicLinkProps {
  href: string;
  title: string;
  date: string;
  description: string;
  offline?: boolean;
  mastery: boolean;
}

function StudyTopicLink({ href, title, date, description, offline, mastery, index }: StudyTopicLinkProps & { index: number }) {
  let targetHref = href;
  if (mastery && !/^https?:\/\//i.test(href)) {
    targetHref += "?mastery=true";
  }
  return (
    <Link
      href={targetHref}
      className="group relative flex flex-col justify-between p-4 bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-emerald-500/50 rounded-lg transition-all duration-200 shadow-sm hover:shadow-emerald-950/30 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
    >
      <div>
        <div className="flex justify-between items-start gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-emerald-500/70 bg-emerald-950/40 border border-emerald-900/50 px-1.5 py-0.5 rounded">
              #{String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-sm sm:text-base font-bold text-slate-100 group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
              <span>{title}</span>
              {offline && (
                <span className="text-rose-400 text-xs font-mono bg-rose-950/40 border border-rose-900/50 px-1.5 py-0.5 rounded">
                  [OFFLINE]
                </span>
              )}
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-500 bg-slate-950/60 border border-slate-800 px-1.5 py-0.5 rounded shrink-0">
            {date}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pl-0.5">{description}</p>
      </div>
      <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-500 group-hover:text-emerald-400 transition-colors">
        <span className="text-[11px] uppercase tracking-wider text-slate-500">Launch Module</span>
        <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </Link>
  );
}

function formatUptime(totalSeconds: number): string {
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const parts = [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0"),
  ];
  return days > 0 ? `${days}d ${parts.join(":")}` : parts.join(":");
}

const DEPLOY_TIME = process.env.NEXT_PUBLIC_BUILD_TIME
  ? new Date(process.env.NEXT_PUBLIC_BUILD_TIME).getTime()
  : Date.now();

export default function HomeClient({ studyTopics }: { studyTopics: StudyTopicEntry[] }) {
  const [isMasteryMode, setIsMasteryMode] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [uptimeSeconds, setUptimeSeconds] = useState(0);
  const [examStats, setExamStats] = useState<GlobalAnalyticsResponse | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/practice-test/analytics")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load analytics");
        return res.json();
      })
      .then((data: GlobalAnalyticsResponse) => {
        setExamStats(data);
      })
      .catch((err) => {
        console.warn("Could not load exam analytics:", err);
      });
  }, []);

  useEffect(() => {
    const update = () => setUptimeSeconds(Math.floor((Date.now() - DEPLOY_TIME) / 1000));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setShowTooltip(false);
      }
    };

    if (showTooltip) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [showTooltip]);
  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-8">
      {/* Console Top Header HUD */}
      <header className="w-full max-w-5xl mb-8 cyber-glass-panel p-5 sm:p-6 rounded-xl border border-slate-800 shadow-2xl relative overflow-hidden">
        {/* Subtle top neon border line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-emerald-500/20 via-emerald-400 to-cyan-500/20" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-[11px] font-mono text-emerald-400 font-bold tracking-wider">SYS_ONLINE</span>
              </div>
              <span className="text-xs font-mono text-slate-500">{"//"}</span>
              <span className="text-xs font-mono text-slate-400">NODE: TTC_ENT_CORE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
              <span className="text-emerald-400 font-mono">ENT_ROUTER_V1</span>
              <span className="text-slate-600 font-light hidden sm:inline">|</span>
              <span className="text-slate-300 font-mono text-xl sm:text-2xl font-semibold">Main Dashboard</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-mono">
              Enterprise Networking Technologies Interactive Quiz & Architecture Console
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-start md:justify-end">
            {/* Mastery Mode Toggle */}
            <div className="relative" ref={tooltipRef}>
              <button
                type="button"
                onClick={() => setIsMasteryMode(!isMasteryMode)}
                className={`px-3.5 py-2 rounded-lg border font-mono text-xs font-bold transition-all duration-200 flex items-center gap-2.5 shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                  isMasteryMode
                    ? "bg-amber-500/15 border-amber-500/60 text-amber-300 shadow-amber-950/40 shadow-md hover:bg-amber-500/25"
                    : "bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600 hover:text-white"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isMasteryMode ? "bg-amber-400" : "bg-slate-600"}`} />
                <span>{isMasteryMode ? "MASTERY_MODE: ACTIVE" : "MASTERY_MODE: OFF"}</span>
                <span
                  className="inline-flex items-center justify-center w-4 h-4 text-[10px] border border-current/50 rounded-full cursor-help hover:bg-white/10"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowTooltip(!showTooltip);
                  }}
                  onTouchStart={(e) => {
                    e.stopPropagation();
                    setShowTooltip(!showTooltip);
                  }}
                  title="Toggle info"
                >
                  ?
                </span>
              </button>

              {showTooltip && (
                <div className="absolute top-full right-0 mt-2 w-72 p-3 bg-slate-900/95 border border-slate-700 rounded-lg shadow-2xl text-xs text-slate-300 z-30 backdrop-blur-md font-mono">
                  <div className="font-bold text-amber-400 mb-1 font-mono flex items-center gap-1.5">
                    <span>[!]</span> MASTERY MODE BEHAVIOR
                  </div>
                  <p className="text-slate-300 leading-relaxed font-mono text-xs">
                    Instantly activates scrambled question order and type-the-answer inputs on all study quizzes from your very first attempt.
                  </p>
                </div>
              )}
            </div>

            {/* Study Guide Link Button */}
            <Link
              href="/study-guide"
              className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 border border-emerald-500/40 hover:border-emerald-400 rounded-lg font-mono text-xs font-bold transition-all duration-200 flex items-center gap-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <span>[READ STUDY GUIDE]</span>
            </Link>
          </div>
        </div>

        {/* Telemetry Bar */}
        <div className="mt-5 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="text-slate-600">UPTIME:</span>
              <span className="text-emerald-400 font-bold">{formatUptime(uptimeSeconds)}</span>
            </span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="hidden sm:flex items-center gap-1.5">
              <span className="text-slate-600">ACTIVE_MODULES:</span>
              <span className="text-cyan-400">{studyTopics.length} Units</span>
            </span>
          </div>
          <div className="text-[11px] text-slate-500">
            ENT PROTOCOL VERSION 2.4.0
          </div>
        </div>
      </header>

      {/* Main Modules Grid Container */}
      <main className="w-full max-w-5xl space-y-6">
        {/* Featured Master Practice Test Card */}
        <section className="terminal-box border-l-4 border-l-cyan-400 shadow-xl bg-slate-900/90 p-5 sm:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/40 border border-cyan-900/50 px-1.5 py-0.5 rounded">
                COMPREHENSIVE_ASSESSMENT
              </span>
              <span className="text-xs text-slate-500 font-mono">{"//"}</span>
              <span className="text-xs text-slate-400 font-mono">RANDOMIZED_PRACTICE_EXAM</span>
              {examStats && examStats.totalAttempts > 0 && (
                <>
                  <span className="text-xs text-slate-500 font-mono hidden sm:inline">{"//"}</span>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-1.5 py-0.5 rounded">
                    {examStats.totalAttempts.toLocaleString()} ATTEMPTS RECORDED | {examStats.averagePercentage}% AVG ACCURACY
                  </span>
                </>
              )}
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white font-mono flex items-center gap-2">
              <span className="text-cyan-400">Master Practice Exam</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-mono">
              Test your CCNA knowledge with a randomized 60-point, 100-point, or 150-point practice exam covering the networking concepts you&apos;ve learned.
            </p>
          </div>
          <Link
            href="/practice-test"
            className="w-full md:w-auto shrink-0 px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-lg shadow-cyan-950/40 hover:shadow-cyan-900/60 flex items-center justify-center gap-2"
          >
            <span>[START MASTER TEST]</span>
            <span>→</span>
          </Link>
          <Link
            href="/practice-test/speedrun"
            className="w-full md:w-auto shrink-0 px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono text-xs font-bold transition-all shadow-lg shadow-amber-950/40 flex items-center justify-center gap-2"
          >
            <span>[SPEEDRUN QUIZ]</span>
            <span>→</span>
          </Link>
        </section>

        <section className="terminal-box border-l-4 border-l-emerald-500 shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-emerald-400 tracking-wider font-mono">
                [SYSTEM_STUDY_MODULES]
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              SELECT A MODULE TO BEGIN INTERACTIVE QUIZ
            </span>
          </div>

          <nav className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {studyTopics.map((topic, idx) => (
              <StudyTopicLink
                key={topic.href}
                href={topic.href}
                title={topic.title}
                date={topic.date}
                description={topic.description}
                offline={topic.offline ?? false}
                mastery={isMasteryMode}
                index={idx}
              />
            ))}
          </nav>
        </section>
      </main>
    </div>
  );
}
