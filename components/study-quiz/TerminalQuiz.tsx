"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import QuizHeader from "./QuizHeader";
import type { TerminalConfigJson, TerminalTaskJson, TerminalCommandStepJson, TerminalStateValue } from "@/lib/json-quizzes";

type TerminalQuizProps = {
  moduleTag?: string;
  moduleCode?: string;
  title?: string;
  heading?: string;
  description?: string;
  studyGuideHref?: string;
  terminal: TerminalConfigJson;
  isEmbedded?: boolean;
  initialHardMode?: boolean;
};

type TranscriptLine = { kind: "command" | "output" | "error"; text: string };

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function shuffleTaskOptions(tasks: TerminalTaskJson[]): TerminalTaskJson[] {
  return tasks.map((task) => task.question
    ? { ...task, question: { ...task.question, options: shuffle(task.question.options) } }
    : task
  );
}

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function isAnswerCorrect(task: TerminalTaskJson, answer: string) {
  if (!task.question) return true;
  const normalized = normalize(answer);
  return [task.question.answer, ...(task.question.aliases ?? [])].some(
    (candidate) => normalize(candidate) === normalized
  );
}

// -------- terminal state helpers --------
function stateMatches(condition: Record<string, TerminalStateValue> | undefined, state: Record<string, TerminalStateValue>) {
  if (!condition) return true;
  return Object.entries(condition).every(([key, value]) => state[key] === value);
}

function applyTemplate(text: string, state: Record<string, TerminalStateValue>) {
  return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    const value = state[key];
    return value === undefined ? match : String(value);
  });
}

function getInitialTaskState(task: TerminalTaskJson | undefined, terminal: TerminalConfigJson) {
  return { ...terminal.initialState, ...task?.initialState };
}

function resolveOutcome(step: TerminalCommandStepJson, command: string, state: Record<string, TerminalStateValue>) {
  if (!step.outcomes) return null;
  return step.outcomes.find(
    (outcome) =>
      outcome.commands.some((candidate) => normalize(candidate) === normalize(command)) &&
      stateMatches(outcome.when, state)
  ) ?? null;
}

function stepAcceptsCommand(
  step: TerminalCommandStepJson,
  command: string,
  state: Record<string, TerminalStateValue>,
) {
  const pool = [
    ...step.commands,
    ...(step.outcomes?.filter((outcome) => stateMatches(outcome.when, state)).flatMap((outcome) => outcome.commands) ?? []),
  ];
  return pool.some((candidate) => normalize(candidate) === normalize(command));
}

function findKnownStep(
  terminal: TerminalConfigJson,
  command: string,
  state: Record<string, TerminalStateValue>,
) {
  for (const knownTask of terminal.tasks) {
    for (const knownStep of knownTask.steps) {
      const outcome = resolveOutcome(knownStep, command, state);
      if (outcome) return { step: knownStep, outcome };
      if (knownStep.commands.some((candidate) => normalize(candidate) === normalize(command))) {
        return { step: knownStep, outcome: null };
      }
    }
  }
  return null;
}

export default function TerminalQuiz({
                                       moduleTag,
                                       moduleCode,
                                       title,
                                       heading = "[TERMINAL_COMMAND_CHALLENGE]",
                                       description,
                                       studyGuideHref,
                                       terminal,
                                       isEmbedded = false,
                                       initialHardMode = false,
                                     }: TerminalQuizProps) {
  const initialTasks = useMemo(
    () => shuffleTaskOptions(initialHardMode ? shuffle(terminal.tasks) : terminal.tasks),
    [initialHardMode, terminal.tasks]
  );
  const [tasks, setTasks] = useState(initialTasks);
  const [taskIndex, setTaskIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [input, setInput] = useState("");
  const [transcript, setTranscript] = useState<TranscriptLine[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [feedback, setFeedback] = useState<string | null>(null);
  const [hasCompletedOnce, setHasCompletedOnce] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [questionReady, setQuestionReady] = useState(false);
  const [wrongCommandPulse, setWrongCommandPulse] = useState(false);
  const [awaitingNextTask, setAwaitingNextTask] = useState(false);
  const [taskState, setTaskState] = useState<Record<string, TerminalStateValue>>(
    getInitialTaskState(initialTasks[0], terminal),
  );
  const commandInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const focusCommandInput = (event: KeyboardEvent) => {
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(target.tagName))
      ) return;
      if (event.ctrlKey || event.metaKey || event.altKey || event.key.length !== 1 || /\s/.test(event.key)) return;

      const inputElement = commandInputRef.current;
      if (!inputElement || inputElement.disabled) return;
      event.preventDefault();
      inputElement.focus();
      setInput((previous) => previous + event.key);
    };

    window.addEventListener("keydown", focusCommandInput);
    return () => window.removeEventListener("keydown", focusCommandInput);
  }, []);

  const task = tasks[taskIndex];
  const currentStep = task?.steps[stepIndex];
  const allCorrect = tasks.length > 0 && Object.keys(completed).length === tasks.length;
  const progress = `${Math.min(taskIndex + 1, tasks.length)} / ${tasks.length}`;

  const appendTranscript = (lines: TranscriptLine[]) => setTranscript((previous) => [...previous, ...lines]);

  const pulseWrongCommand = () => {
    setWrongCommandPulse(false);
    window.setTimeout(() => setWrongCommandPulse(true), 0);
    window.setTimeout(() => setWrongCommandPulse(false), 750);
  };

  const submitCommand = () => {
    if (!task || !currentStep || !input.trim() || isRunning) return;
    const command = input.trim();
    setInput("");

    const outcome = resolveOutcome(currentStep, command, taskState);
    const isAccepted = outcome ? true : stepAcceptsCommand(currentStep, command, taskState);
    const knownMatch = !isAccepted ? findKnownStep(terminal, command, taskState) : null;

    if (!isAccepted && !knownMatch) {
      appendTranscript([
        { kind: "command", text: command },
        { kind: "error", text: terminal.platform === "windows"
            ? `\'${command}\' is not recognized as an internal or external command,\noperable program or batch file.`
            : `bash: ${command}: command not found` },
      ]);
      pulseWrongCommand();
      setFeedback(null);
      return;
    }

    appendTranscript([{ kind: "command", text: command }]);
    setFeedback("Running simulated command...");
    setIsRunning(true);
    window.setTimeout(() => {
      const rawOutput = outcome?.output ?? knownMatch?.outcome?.output ?? (knownMatch?.step ?? currentStep).output;
      appendTranscript([{ kind: "output", text: applyTemplate(rawOutput, taskState) }]);
      setIsRunning(false);

      if (outcome?.setState) {
        setTaskState((previous) => ({ ...previous, ...outcome.setState }));
      }

      const wasWrongStep = !isAccepted;
      if (wasWrongStep) {
        pulseWrongCommand();
        setFeedback(null);
        return;
      }

      const shouldAdvance = outcome ? outcome.advance !== false : true;
      setFeedback(null);
      if (!shouldAdvance) return;

      if (stepIndex < task.steps.length - 1) {
        setStepIndex(stepIndex + 1);
        return;
      }
      if (task.question) {
        setQuestionReady(true);
        setFeedback("Output received. Select the best answer below.");
        return;
      }
      setFeedback("[OK] Objective complete.");
      completeTask(task);
    }, 650);
  };

  const completeTask = (finishedTask: TerminalTaskJson) => {
    const nextCompleted = { ...completed, [String(finishedTask.id)]: true };
    setCompleted(nextCompleted);
    setFeedback("[OK] Objective complete.");
    if (taskIndex < tasks.length - 1) setAwaitingNextTask(true);
  };

  const proceedToNextTask = () => {
    if (!awaitingNextTask) return;
    setTaskIndex(taskIndex + 1);
    setStepIndex(0);
    setSelectedAnswer("");
    setTranscript([]);
    setQuestionReady(false);
    setFeedback(null);
    setAwaitingNextTask(false);
    setTaskState(getInitialTaskState(tasks[taskIndex + 1], terminal));
  };

  const submitAnswer = (answer: string) => {
    if (!task?.question) return;
    setSelectedAnswer(answer);
    if (!isAnswerCorrect(task, answer)) {
      setFeedback(`Incorrect. Review the simulated output and try again.`);
      return;
    }
    completeTask(task);
  };

  const reset = () => {
    const nextTasks = shuffleTaskOptions(allCorrect || hasCompletedOnce || initialHardMode ? shuffle(terminal.tasks) : terminal.tasks);
    setTasks(nextTasks);
    setTaskIndex(0);
    setStepIndex(0);
    setInput("");
    setTranscript([]);
    setSelectedAnswer("");
    setCompleted({});
    setFeedback(null);
    setQuestionReady(false);
    setWrongCommandPulse(false);
    setAwaitingNextTask(false);
    setTaskState(getInitialTaskState(nextTasks[0], terminal));
    if (allCorrect) setHasCompletedOnce(true);
  };

  if (!task) return null;

  return (
    <div className="terminal-quiz w-full max-w-4xl mx-auto font-mono">
      {!isEmbedded && <QuizHeader moduleTag={moduleTag} moduleCode={moduleCode} title={title ?? "Terminal Quiz"} studyGuideHref={studyGuideHref} />}
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <h2 className="text-base sm:text-lg font-bold tracking-tight text-emerald-400">
            <span className="text-cyan-500">&gt;</span> {heading}
          </h2>
          <span className="terminal-chip rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-slate-300">
            TASK {progress} <span className="text-slate-600">·</span> {terminal.platform.toUpperCase()}
          </span>
        </div>
        {!isEmbedded && description && <p className="text-xs sm:text-sm text-slate-400">{description}</p>}

        <div className="terminal-objective rounded-lg border border-cyan-500/30 bg-cyan-950/20 p-4 shadow-lg shadow-cyan-950/10">
          <div className="text-[10px] uppercase tracking-[0.2em] text-cyan-400 mb-2 flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
            OBJECTIVE
          </div>
          <p className="text-sm sm:text-base text-slate-100">{task.prompt}</p>
        </div>

        <div className="terminal-box terminal-box-glow overflow-hidden p-0">
          <div className="flex items-center justify-between border-b border-slate-700/70 bg-slate-950/80 px-4 py-2 text-xs">
            <span className="text-emerald-400">{terminal.platform === "windows" ? "COMMAND PROMPT" : "TERMINAL"}</span>
            <span className="text-slate-500">VIRTUAL SANDBOX // ADMINISTRATOR ACCESS</span>
          </div>
          <div className="terminal-crt flex min-h-52 max-h-80 flex-col bg-slate-950/70 text-xs sm:text-sm">
            <div className="min-h-36 flex-1 overflow-y-auto p-4 whitespace-pre-wrap">
              {transcript.length === 0 && <div className="text-slate-500">{terminal.platform === "windows" ? "Microsoft Windows [Version 10.0.22631.3155]" : "Linux 6.8.0-ent-study x86_64"}</div>}
              {transcript.map((line, index) => (
                <div key={`${index}-${line.text}`} className={line.kind === "command" ? "text-cyan-300" : line.kind === "error" ? "text-rose-400" : "text-slate-300"}>
                  {line.kind === "command" ? `${terminal.platform === "windows" ? ">" : "$"} ${line.text}` : line.text}
                </div>
              ))}
            </div>
            <div className={`terminal-command-prompt flex shrink-0 items-center gap-2 border border-slate-800 px-4 py-3 text-emerald-400${wrongCommandPulse ? " terminal-command-prompt-wrong" : ""}`}>
              <span className="text-slate-500">{terminal.platform === "windows" ? "C:\\Users\\student>" : "user@ent-study:~$"}</span>
              <div className="relative min-w-0 flex-1">
                <input ref={commandInputRef} aria-label="Terminal command" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === "Enter" && submitCommand()} disabled={allCorrect || isRunning || questionReady || awaitingNextTask || completed[String(task.id)]} autoComplete="off" className="terminal-command-input w-full text-slate-100 outline-none placeholder:text-slate-600" placeholder={isRunning ? "running..." : "type command..."} />
              </div>
              <button type="button" onClick={submitCommand} disabled={!input.trim() || allCorrect || isRunning || awaitingNextTask || completed[String(task.id)]} className="quiz-action-btn shrink-0 rounded border border-emerald-300 bg-emerald-400 px-3 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400 disabled:opacity-100">RUN</button>
            </div>
          </div>
        </div>

        {task.question && questionReady && !completed[String(task.id)] && (
          <div className="space-y-3 rounded-lg border border-slate-700 bg-slate-900/70 p-4">
            <p className="text-sm text-slate-200">{task.question.prompt}</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {task.question.options.map((option) => <button key={option} type="button" onClick={() => submitAnswer(option)} className={`quiz-action-btn rounded border px-3 py-2 text-left text-xs text-slate-100 ${selectedAnswer === option ? "border-cyan-300 bg-cyan-500 text-slate-950" : "border-slate-600 bg-slate-800 hover:border-cyan-400"}`}>{option}</button>)}
            </div>
            {feedback && <p className="text-xs text-amber-300">{feedback}</p>}
          </div>
        )}

        {awaitingNextTask && (
          <div className="space-y-3 text-center">
            {feedback && <p className="text-xs text-emerald-300">{feedback}</p>}
            <button type="button" onClick={proceedToNextTask} className="quiz-action-btn rounded border border-cyan-300 bg-cyan-400 px-5 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-300">
              NEXT TASK
            </button>
          </div>
        )}

        {allCorrect && (
          <div className="terminal-success-banner rounded-lg border border-emerald-500/60 p-4 text-center text-emerald-300 font-bold tracking-wide">
            [OK] ALL TERMINAL TASKS VERIFIED
          </div>
        )}
        {!isEmbedded && (allCorrect || Object.keys(completed).length > 0) && <button type="button" onClick={reset} className="mx-auto block rounded border border-emerald-500/40 bg-slate-900 px-5 py-2 text-xs font-bold text-emerald-400 hover:border-emerald-400">{allCorrect || hasCompletedOnce ? "SCRAMBLE TERMINAL TASKS" : "RESET TERMINAL"}</button>}
      </div>
    </div>
  );
}
