"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { generateSpeedrunQuestions } from "@/lib/practice-test/generator";
import { ActivePracticeItem } from "@/lib/practice-test/types";

const PROMPT_BASE_MS = 2200;
const PROMPT_MS_PER_WORD = 120;
const ANSWER_WINDOW_MS = 30000;
const MAX_SCORE_PER_QUESTION = 1000;
const FEEDBACK_DISPLAY_MS = 1200;

const getPromptRevealMs = (prompt: string) => {
  const wordCount = prompt.trim().split(/\s+/).filter(Boolean).length;
  return PROMPT_BASE_MS + wordCount * PROMPT_MS_PER_WORD;
};

interface LeaderboardEntry {
  rank: number;
  displayName: string;
  score: number;
  totalPoints: number;
  elapsedMs: number;
}

interface AnswerFeedback {
  answer: string;
  correct: boolean;
  earned: number;
}

const formatTime = (ms: number) => `${(ms / 1000).toFixed(2)}s`;

export default function SpeedrunQuiz() {
  const [questions, setQuestions] = useState<ActivePracticeItem[]>([]);
  const [index, setIndex] = useState(-1);
  const [isShowingAnswers, setIsShowingAnswers] = useState(false);
  const [answerStartedAt, setAnswerStartedAt] = useState(0);
  const [answerDeadline, setAnswerDeadline] = useState(0);
  const [remainingMs, setRemainingMs] = useState(ANSWER_WINDOW_MS);
  const [score, setScore] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [finished, setFinished] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [answerFeedback, setAnswerFeedback] = useState<AnswerFeedback | null>(null);

  const current = index >= 0 ? questions[index] : undefined;
  const question = current?.type === "question" ? current : undefined;
  const promptRevealMs = question ? getPromptRevealMs(question.prompt) : PROMPT_BASE_MS;

  const loadLeaderboard = useCallback(() => {
    fetch("/api/practice-test/speedrun")
      .then((res) => res.json())
      .then((data) => setLeaderboard(data.leaderboard ?? []))
      .catch(() => setLeaderboard([]));
  }, []);

  useEffect(() => { loadLeaderboard(); }, [loadLeaderboard]);

  const start = () => {
    setQuestions(generateSpeedrunQuestions(10));
    setIndex(0);
    setScore(0);
    setElapsedMs(0);
    setFinished(false);
    setSubmitted(false);
    setIsShowingAnswers(false);
    setAnswerFeedback(null);
  };

  const selectAnswer = useCallback((answer: string) => {
    if (!isShowingAnswers || !question) return;
    const responseMs = Math.min(ANSWER_WINDOW_MS, Math.max(0, performance.now() - answerStartedAt));
    const correct = answer === question.answer;
    const earned = correct ? Math.round(MAX_SCORE_PER_QUESTION * (1 - responseMs / ANSWER_WINDOW_MS)) : 0;
    const nextScore = score + earned;
    const nextElapsed = Math.round(elapsedMs + responseMs);
    setScore(nextScore);
    setElapsedMs(nextElapsed);
    setIsShowingAnswers(false);
    setAnswerFeedback({ answer, correct, earned });
  }, [answerStartedAt, elapsedMs, isShowingAnswers, question, score]);

  useEffect(() => {
    if (!answerFeedback || index < 0) return;
    const transitionTimer = window.setTimeout(() => {
      setAnswerFeedback(null);
      if (index + 1 >= questions.length) {
        setFinished(true);
      } else {
        setIndex(index + 1);
      }
    }, FEEDBACK_DISPLAY_MS);
    return () => window.clearTimeout(transitionTimer);
  }, [answerFeedback, index, questions.length]);

  useEffect(() => {
    if (index < 0 || finished) return;
    const revealTimer = window.setTimeout(() => {
      const now = performance.now();
      setIsShowingAnswers(true);
      setAnswerStartedAt(now);
      setAnswerDeadline(now + ANSWER_WINDOW_MS);
      setRemainingMs(ANSWER_WINDOW_MS);
    }, promptRevealMs);
    return () => window.clearTimeout(revealTimer);
  }, [finished, index, promptRevealMs]);

  useEffect(() => {
    if (!isShowingAnswers || finished) return;
    const timer = window.setInterval(() => {
      const remaining = Math.max(0, answerDeadline - performance.now());
      setRemainingMs(remaining);
      if (remaining === 0) selectAnswer("");
    }, 50);
    return () => window.clearInterval(timer);
  }, [answerDeadline, finished, isShowingAnswers, selectAnswer]);

  const submitScore = async () => {
    if (!displayName.trim() || submitted) return;
    setSubmitted(true);
    try {
      const response = await fetch("/api/practice-test/speedrun", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName, score, elapsedMs }),
      });
      const data = await response.json();
      setLeaderboard(data.leaderboard ?? []);
    } catch {
      setSubmitted(false);
    }
  };

  const progress = useMemo(() => index < 0 ? 0 : Math.min(index + (finished ? 1 : 0), 10), [finished, index]);

  return (
    <main className="min-h-screen p-4 sm:p-8 flex justify-center">
      <div className="w-full max-w-5xl space-y-6">
        <header className="cyber-glass-panel rounded-xl p-5 sm:p-7 border border-amber-500/40">
          <div className="flex flex-wrap justify-between gap-4 items-start">
            <div>
              <p className="text-xs text-amber-400 font-bold tracking-widest">COMPETITIVE_PROTOCOL // 10 QUESTIONS</p>
              <h1 className="text-2xl sm:text-3xl text-white font-bold mt-2">Speedrun Quiz</h1>
              <p className="text-sm text-slate-400 mt-2 max-w-2xl">Read each prompt first. The answer choices then appear for thirty seconds. Correct answers earn more points when selected sooner; incorrect answers always earn zero.</p>
            </div>
            <Link href="/practice-test" className="text-xs text-cyan-400 hover:text-cyan-300">[MASTER TEST]</Link>
          </div>
        </header>

        {index < 0 && !finished && (
          <section className="terminal-box quiz-action-card text-center space-y-4">
            <p className="text-slate-300">Maximum score: <span className="text-amber-400">10,000</span> points. Ranking uses score first, then total elapsed time.</p>
            <button onClick={start} className="quiz-action-btn !bg-amber-400 !text-slate-950 px-6 py-3 rounded font-bold hover:!bg-amber-300">[SPEEDRUN QUIZ]</button>
          </section>
        )}

        {question && !finished && (
          <section className="terminal-box space-y-5">
            <div className="flex justify-between text-xs text-slate-400"><span>QUESTION {progress + 1} / 10</span><span>SCORE {score.toLocaleString()}</span></div>
            <div className="h-1 bg-slate-800 rounded"><div className="h-1 bg-amber-400 rounded transition-all" style={{ width: `${((progress) / 10) * 100}%` }} /></div>
            <div className="rounded-lg border border-slate-700 bg-slate-950/70 p-5 sm:p-8 min-h-44 flex items-center justify-center text-center">
              <h2 className="text-lg sm:text-2xl text-white font-bold">{question.prompt}</h2>
            </div>
            <div className="flex justify-between text-sm"><span className={isShowingAnswers ? "text-emerald-400" : "text-amber-400"}>{isShowingAnswers ? "ANSWERS ACTIVE" : "READ THE PROMPT"}</span>{isShowingAnswers && <span className="text-rose-400">{formatTime(remainingMs)} remaining</span>}</div>
            {(isShowingAnswers || answerFeedback) && <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{question.options.map((option) => {
              const isSelected = answerFeedback?.answer === option;
              const isCorrect = answerFeedback && option === question.answer;
              const feedbackClass = isSelected
                ? answerFeedback.correct
                  ? "border-emerald-400 bg-emerald-400/20 text-emerald-100"
                  : "border-rose-400 bg-rose-400/20 text-rose-100"
                : isCorrect
                  ? "border-emerald-400 bg-emerald-400/20 text-emerald-100"
                  : "border-slate-700 bg-slate-900";
              return <button key={option} onClick={() => selectAnswer(option)} disabled={Boolean(answerFeedback)} className={`text-left p-4 rounded border transition-colors ${feedbackClass} ${!answerFeedback ? "hover:border-amber-400 hover:bg-amber-400/10" : "cursor-default"}`}>{option}</button>;
            })}</div>}
            {answerFeedback && <div className={`rounded border px-4 py-3 text-center font-bold ${answerFeedback.correct ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-300" : "border-rose-400/60 bg-rose-400/10 text-rose-300"}`} role="status">{answerFeedback.correct ? `CORRECT  +${answerFeedback.earned.toLocaleString()} POINTS` : "INCORRECT  +0 POINTS"}</div>}
          </section>
        )}

        {finished && (
          <section className="terminal-box space-y-5">
            <div className="text-center"><p className="text-amber-400 text-xs tracking-widest">RUN COMPLETE</p><h2 className="text-3xl text-white font-bold mt-2">{score.toLocaleString()} / 10,000</h2><p className="text-slate-400 mt-1">Total time: {formatTime(elapsedMs)}</p></div>
            <div className="flex flex-col sm:flex-row gap-3"><input maxLength={24} value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Leaderboard name" className="flex-1 rounded border border-slate-700 px-3 py-3" /><button onClick={submitScore} disabled={!displayName.trim() || submitted} className="quiz-action-btn !bg-emerald-400 !text-slate-950 px-5 py-3 rounded font-bold disabled:opacity-50 hover:!bg-emerald-300">{submitted ? "[SCORE SUBMITTED]" : "[SUBMIT SCORE]"}</button><button onClick={start} className="px-5 py-3 rounded border border-slate-600 text-slate-300 hover:border-slate-300">[RETRY]</button></div>
          </section>
        )}

        <section className="terminal-box"><div className="flex justify-between items-center mb-4"><h2 className="text-lg text-amber-400 font-bold">TOP 10 SPEEDRUNS</h2><button onClick={loadLeaderboard} className="text-xs text-slate-400 hover:text-white cursor-pointer">[REFRESH]</button></div>{leaderboard.length === 0 ? <p className="text-sm text-slate-500">No submitted runs yet.</p> : <div className="space-y-2">{leaderboard.map((entry) => <div key={`${entry.rank}-${entry.displayName}-${entry.score}`} className="grid grid-cols-[2rem_1fr_auto_auto] gap-3 items-center border-b border-slate-800 py-2 text-sm"><span className="text-slate-500">{entry.rank}.</span><span className="text-white truncate">{entry.displayName}</span><span className="text-amber-400">{entry.score.toLocaleString()}</span><span className="text-slate-500">{formatTime(entry.elapsedMs)}</span></div>)}</div>}</section>
      </div>
    </main>
  );
}