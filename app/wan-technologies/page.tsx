"use client";

import { useState, useCallback, Suspense, useMemo } from "react";
import Link from "next/link";

interface WANQuestion {
  id: string;
  prompt: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface WANScenarioMatch {
  id: string;
  scenarioTitle: string;
  description: string;
  options: string[];
  answer: string;
  explanation: string;
}

// ---------------------------------------------------------------------------
// INITIAL DATA DEFINITIONS
// ---------------------------------------------------------------------------

const initialPart1Questions: WANQuestion[] = [
  {
    id: "wan-pots-acronym",
    prompt: "What does the acronym 'POTS' or 'POT lines' stand for in telecommunications?",
    options: [
      "Plain Old Telephone Service lines",
      "Packet Optical Transmission System",
      "Private Open Telephony Standard",
      "Point of Termination System",
    ],
    answer: "Plain Old Telephone Service lines",
    explanation: "POTS stands for Plain Old Telephone lines (or Plain Old Telephone Service), providing analog voice connections over legacy copper wiring.",
  },
  {
    id: "wan-pots-signal-type",
    prompt: "What signal type was used by traditional POTS lines for dial-up connections?",
    options: [
      "Analog signals",
      "Digital signals",
      "Radio frequency signals",
      "Telepathy",
    ],
    answer: "Analog signals",
    explanation: "Traditional POTS lines provided analog telephone connections over physical copper wires.",
  },
  {
    id: "wan-dialup-speeds",
    prompt: "What was the typical speed range of traditional dial-up modems?",
    options: [
      "Approximately 300 bps to 54 Kbps",
      "Approximately 64 Kbps to 128 Kbps",
      "Approximately 1.544 Mbps to 44.736 Mbps",
      "Approximately 10 Mb/s to 100 Mb/s",
    ],
    answer: "Approximately 300 bps to 54 Kbps",
    explanation: "Dial-up modem speeds ranged from approximately 300 bps (early acoustic couplers) up to 54 Kbps (or 56 Kbps standard), depending on the modem and line standard.",
  },
];

const initialPart2Questions: WANQuestion[] = [
  {
    id: "wan-channel-bandwidth",
    prompt: "What is the standard bandwidth capacity of each individual digital channel used in ISDN, T-carrier, and E-carrier systems?",
    options: [
      "64 Kbps",
      "32 Kbps",
      "128 Kbps",
      "54 Kbps",
    ],
    answer: "64 Kbps",
    explanation: "Standard digital carrier channels (DS0 channels) operate at 64 Kbps each, which is the bandwidth required to digitize an analog voice telephone call.",
  },
  {
    id: "wan-isdn-spec",
    prompt: "What is the maximum throughput and 64 Kbps channel count of an ISDN connection?",
    options: [
      "128 Kbps (2 channels)",
      "1.544 Mbps (24 channels)",
      "2.048 Mbps (32 channels)",
      "44.736 Mbps (672 channels)",
    ],
    answer: "128 Kbps (2 channels)",
    explanation: "Basic ISDN combines 2 individual 64 Kbps channels to deliver a maximum aggregate throughput of 128 Kbps.",
  },
  {
    id: "wan-t1-throughput",
    prompt: "What is the maximum throughput provided by a single North American T1 carrier line?",
    options: [
      "1.544 Mbps",
      "2.048 Mbps",
      "34.368 Mbps",
      "44.736 Mbps",
    ],
    answer: "1.544 Mbps",
    explanation: "A T1 carrier line provides a total maximum throughput of 1.544 Mbps across its 24 channels (including framing overhead).",
  },
  {
    id: "wan-e1-throughput",
    prompt: "What is the maximum throughput provided by a single European E1 carrier line?",
    options: [
      "2.048 Mbps",
      "1.544 Mbps",
      "34.368 Mbps",
      "44.736 Mbps",
    ],
    answer: "2.048 Mbps",
    explanation: "An E1 carrier line provides a total maximum throughput of 2.048 Mbps across its 32 channels.",
  },
  {
    id: "wan-t3-throughput",
    prompt: "What is the maximum throughput provided by a North American T3 carrier line?",
    options: [
      "44.736 Mbps",
      "34.368 Mbps",
      "1.544 Mbps",
      "2.048 Mbps",
    ],
    answer: "44.736 Mbps",
    explanation: "A T3 carrier line delivers a maximum throughput of 44.736 Mbps (aggregating 28 bundled T1 circuits).",
  },
  {
    id: "wan-e3-throughput",
    prompt: "What is the maximum throughput provided by a European E3 carrier line?",
    options: [
      "34.368 Mbps",
      "44.736 Mbps",
      "2.048 Mbps",
      "1.544 Mbps",
    ],
    answer: "34.368 Mbps",
    explanation: "An E3 carrier line delivers a maximum throughput of 34.368 Mbps (aggregating 16 bundled E1 circuits).",
  },
];

const initialPart3Questions: WANQuestion[] = [
  {
    id: "wan-t1-channel-count",
    prompt: "How many 64 Kbps channels are contained within a single T1 line?",
    options: [
      "24 channels",
      "32 channels",
      "28 channels",
      "16 channels",
    ],
    answer: "24 channels",
    explanation: "A standard T1 line contains exactly 24 individual 64 Kbps DS0 channels.",
  },
  {
    id: "wan-e1-channel-count",
    prompt: "How many 64 Kbps channels are contained within a single E1 line?",
    options: [
      "32 channels",
      "24 channels",
      "16 channels",
      "28 channels",
    ],
    answer: "32 channels",
    explanation: "A standard E1 line contains exactly 32 individual 64 Kbps channels (30 voice/data channels plus 2 framing/signaling channels).",
  },
  {
    id: "wan-t3-multiplier",
    prompt: "How many T1 circuits are bundled together to form a single T3 line, and how many total 64 Kbps channels does it provide?",
    options: [
      "28 T1 lines (672 channels)",
      "16 T1 lines (512 channels)",
      "24 T1 lines (576 channels)",
      "32 T1 lines (768 channels)",
    ],
    answer: "28 T1 lines (672 channels)",
    explanation: "A T3 line multiplexes 28 T1 lines (T1x28), providing a total of 672 channels (28 x 24 = 672).",
  },
  {
    id: "wan-e3-multiplier",
    prompt: "How many E1 circuits are bundled together to form a single E3 line, and how many total 64 Kbps channels does it provide?",
    options: [
      "16 E1 lines (512 channels)",
      "28 E1 lines (672 channels)",
      "24 E1 lines (768 channels)",
      "32 E1 lines (1024 channels)",
    ],
    answer: "16 E1 lines (512 channels)",
    explanation: "An E3 line multiplexes 16 E1 lines (E1x16), providing a total of 512 channels (16 x 32 = 512).",
  },
];

const initialPart4Questions: WANQuestion[] = [
  {
    id: "wan-north-america-standards",
    prompt: "Which digital carrier line standards were primarily used in North America?",
    options: [
      "T1 and T3",
      "E1 and E3",
      "ISDN and E1",
      "E3 and T3",
    ],
    answer: "T1 and T3",
    explanation: "T-carrier systems (T1 and T3) were developed and primarily deployed across North America and Japan.",
  },
  {
    id: "wan-europe-standards",
    prompt: "Which digital carrier line standards were primarily used in Europe?",
    options: [
      "E1 and E3",
      "T1 and T3",
      "T1 and E1",
      "ISDN and T3",
    ],
    answer: "E1 and E3",
    explanation: "E-carrier systems (E1 and E3) were developed and primarily deployed throughout Europe and internationally.",
  },
];

const initialScenarios: WANScenarioMatch[] = [
  {
    id: "scen-na-branch-primary",
    scenarioTitle: "Regional Office Dedicated Leased Line",
    description: "A branch office in Chicago requires a dedicated digital connection supporting exactly 24 channels of 64 Kbps with a max throughput of 1.544 Mbps.",
    options: ["T1", "T3", "E1", "E3", "ISDN", "Dial-up POTS"],
    answer: "T1",
    explanation: "T1 is the North American digital carrier standard offering 24 channels and 1.544 Mbps max throughput.",
  },
  {
    id: "scen-eu-datacenter-link",
    scenarioTitle: "European Data Center Primary Trunk",
    description: "A data center in Frankfurt deploys a digital line providing 32 channels of 64 Kbps with an overall throughput of 2.048 Mbps.",
    options: ["T1", "T3", "E1", "E3", "ISDN", "Dial-up POTS"],
    answer: "E1",
    explanation: "E1 is the European digital carrier standard delivering 32 channels and 2.048 Mbps max throughput.",
  },
  {
    id: "scen-na-telecom-aggregator",
    scenarioTitle: "North American High-Capacity Core Backbone",
    description: "An ISP core router aggregates 28 T1 circuits into a single high-speed trunk providing 672 channels and 44.736 Mbps throughput.",
    options: ["T1", "T3", "E1", "E3", "ISDN", "Dial-up POTS"],
    answer: "T3",
    explanation: "T3 bundles 28 T1 lines together (T1x28) to provide 672 channels and 44.736 Mbps throughput in North America.",
  },
  {
    id: "scen-eu-broadband-backbone",
    scenarioTitle: "European Metropolitan Trunk Bundling",
    description: "A telecom provider in Paris bundles 16 E1 circuits into a high-throughput line supplying 512 channels and 34.368 Mbps bandwidth.",
    options: ["T1", "T3", "E1", "E3", "ISDN", "Dial-up POTS"],
    answer: "E3",
    explanation: "E3 bundles 16 E1 lines together (E1x16) to provide 512 channels and 34.368 Mbps throughput in Europe.",
  },
  {
    id: "scen-small-office-digital",
    scenarioTitle: "Dual-Channel Digital Subscriber Connection",
    description: "A small business connects two 64 Kbps channels simultaneously over digital telephone lines to achieve 128 Kbps total bandwidth.",
    options: ["T1", "T3", "E1", "E3", "ISDN", "Dial-up POTS"],
    answer: "ISDN",
    explanation: "Basic ISDN operates by bonding two 64 Kbps channels together to reach a maximum throughput of 128 Kbps.",
  },
  {
    id: "scen-legacy-analog-terminal",
    scenarioTitle: "Remote Outpost Point-of-Sale Terminal",
    description: "A remote kiosk transmits point-of-sale data over copper telephone lines using an acoustic modulator ranging between 300 bps and 54 Kbps.",
    options: ["T1", "T3", "E1", "E3", "ISDN", "Dial-up POTS"],
    answer: "Dial-up POTS",
    explanation: "Dial-up POTS lines utilize analog telephone lines over copper wires with modem speeds ranging from 300 bps to 54 Kbps.",
  },
];

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function WANQuizContent() {
  const [part1Questions, setPart1Questions] = useState<WANQuestion[]>(() =>
    shuffleArray(initialPart1Questions).map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }))
  );

  const [part2Questions, setPart2Questions] = useState<WANQuestion[]>(() =>
    shuffleArray(initialPart2Questions).map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }))
  );

  const [part3Questions, setPart3Questions] = useState<WANQuestion[]>(() =>
    shuffleArray(initialPart3Questions).map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }))
  );

  const [part4Questions, setPart4Questions] = useState<WANQuestion[]>(() =>
    shuffleArray(initialPart4Questions).map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }))
  );

  const [scenarios, setScenarios] = useState<WANScenarioMatch[]>(() =>
    shuffleArray(initialScenarios).map((s) => ({
      ...s,
      options: shuffleArray(s.options),
    }))
  );

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSelectAnswer = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const isQuestionCorrect = useCallback(
    (id: string, correct: string) => {
      const userVal = (answers[id] || "").trim();
      return userVal === correct;
    },
    [answers]
  );

  const part1CorrectCount = useMemo(
    () => part1Questions.filter((q) => isQuestionCorrect(q.id, q.answer)).length,
    [part1Questions, isQuestionCorrect]
  );

  const part2CorrectCount = useMemo(
    () => part2Questions.filter((q) => isQuestionCorrect(q.id, q.answer)).length,
    [part2Questions, isQuestionCorrect]
  );

  const part3CorrectCount = useMemo(
    () => part3Questions.filter((q) => isQuestionCorrect(q.id, q.answer)).length,
    [part3Questions, isQuestionCorrect]
  );

  const part4CorrectCount = useMemo(
    () => part4Questions.filter((q) => isQuestionCorrect(q.id, q.answer)).length,
    [part4Questions, isQuestionCorrect]
  );

  const scenarioCorrectCount = useMemo(
    () => scenarios.filter((s) => isQuestionCorrect(s.id, s.answer)).length,
    [scenarios, isQuestionCorrect]
  );

  const totalQuestions =
    part1Questions.length +
    part2Questions.length +
    part3Questions.length +
    part4Questions.length +
    scenarios.length;

  const totalCorrect =
    part1CorrectCount +
    part2CorrectCount +
    part3CorrectCount +
    part4CorrectCount +
    scenarioCorrectCount;

  const allCorrect = totalCorrect === totalQuestions;
  const totalAnswered = Object.keys(answers).length;

  const handleValidate = () => {
    setShowResults(true);
  };

  const handleResetAndScramble = () => {
    setAnswers({});
    setShowResults(false);
    setPart1Questions(
      shuffleArray(initialPart1Questions).map((q) => ({
        ...q,
        options: shuffleArray(q.options),
      }))
    );
    setPart2Questions(
      shuffleArray(initialPart2Questions).map((q) => ({
        ...q,
        options: shuffleArray(q.options),
      }))
    );
    setPart3Questions(
      shuffleArray(initialPart3Questions).map((q) => ({
        ...q,
        options: shuffleArray(q.options),
      }))
    );
    setPart4Questions(
      shuffleArray(initialPart4Questions).map((q) => ({
        ...q,
        options: shuffleArray(q.options),
      }))
    );
    setScenarios(
      shuffleArray(initialScenarios).map((s) => ({
        ...s,
        options: shuffleArray(s.options),
      }))
    );
  };

  const renderQuestionBlock = (q: WANQuestion, index: number) => {
    const selected = answers[q.id] || "";
    const isCorrect = isQuestionCorrect(q.id, q.answer);

    return (
      <div
        key={q.id}
        className={`p-4 rounded border transition-colors ${
          showResults
            ? isCorrect
              ? "border-green-500/60 bg-green-950/20"
              : "border-red-500/60 bg-red-950/20"
            : "border-border/60 bg-slate-900/50"
        }`}
      >
        <div className="flex items-start gap-3">
          <span className="text-accent font-mono text-xs mt-0.5 shrink-0">
            [{String(index + 1).padStart(2, "0")}]
          </span>
          <div className="flex-grow">
          <p className="text-sm text-slate-200 font-medium mb-3">{q.prompt}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {q.options.map((opt) => {
                const isOptionSelected = selected === opt;
                const isOptionCorrect = opt === q.answer;

                let btnStyle =
                  "bg-slate-900 border-border text-slate-300 hover:border-accent hover:text-white";
                if (showResults) {
                  if (isOptionCorrect) {
                    btnStyle = "bg-green-900/50 border-green-500 text-green-300 font-bold";
                  } else if (isOptionSelected && !isOptionCorrect) {
                    btnStyle = "bg-red-900/50 border-red-500 text-red-300 line-through";
                  } else {
                    btnStyle = "bg-slate-900/40 border-border/40 text-slate-500 opacity-60";
                  }
                } else if (isOptionSelected) {
                  btnStyle = "bg-accent/20 border-accent text-accent font-bold";
                }

                return (
                  <button
                    key={opt}
                    type="button"
                    disabled={showResults}
                    onClick={() => handleSelectAnswer(q.id, opt)}
                    className={`text-left p-2.5 rounded text-xs border font-mono transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {showResults && isOptionCorrect && (
                      <span className="text-green-400 text-xs font-bold">✓</span>
                    )}
                    {showResults && isOptionSelected && !isOptionCorrect && (
                      <span className="text-red-400 text-xs font-bold">✗</span>
                    )}
                  </button>
                );
              })}
            </div>

            {showResults && (
              <div
                className={`mt-3 text-xs p-2.5 rounded border ${
                  isCorrect
                    ? "bg-green-950/40 text-green-300 border-green-800/60"
                    : "bg-red-950/40 text-red-300 border-red-800/60"
                }`}
              >
                <span className="font-bold font-mono">
                  {isCorrect ? "✓ VALIDATED: " : "✗ ERROR: "}
                </span>
                {q.explanation}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      {/* Header */}
      <header className="w-full max-w-4xl mb-8 border-b border-border pb-4">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <h1 className="text-3xl font-bold text-accent">ENT_ROUTER_V1 | WAN Technologies</h1>
          <div className="flex items-center gap-4 text-sm font-mono">
            <Link
              href="/study-guide#wan-technologies"
              className="text-accent hover:underline flex items-center gap-1"
            >
              [VIEW IN STUDY GUIDE]
            </Link>
            <Link href="/" className="text-sm text-accent hover:underline">
              {"<"} BACK TO HUB
            </Link>
          </div>
        </div>
        <p className="text-sm text-slate-400 mt-2">
          Diagnostic Module: POTS Dial-Up Modems, Carrier Standards (ISDN, T1, T3, E1, E3), Channels &amp; Regional Deployments
        </p>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-4xl space-y-8">
        {/* Part 1: Modems & POTS Fundamentals */}
        <section className="terminal-box">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 pb-4 border-b border-border">
            <div>
              <h2 className="text-xl font-bold text-accent underline">Part 1: Modems &amp; POTS Fundamentals</h2>
              <p className="text-xs text-slate-400 mt-1">
                Select the correct technical response regarding analog copper lines, signal modulation, and dial-up throughput.
              </p>
            </div>
            {showResults && (
              <div className="font-mono text-sm px-3 py-1 rounded bg-slate-900 border border-border">
                Part 1:{" "}
                <span
                  className={
                    part1CorrectCount === part1Questions.length
                      ? "text-green-400 font-bold"
                      : "text-yellow-400 font-bold"
                  }
                >
                  {part1CorrectCount}
                </span>{" "}
                / {part1Questions.length}
              </div>
            )}
          </div>

          <div className="space-y-4">
            {part1Questions.map((q, index) => renderQuestionBlock(q, index))}
          </div>
        </section>

        {/* Part 2: Carrier Standards & Max Throughput */}
        <section className="terminal-box">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 pb-4 border-b border-border">
            <div>
              <h2 className="text-xl font-bold text-accent underline">Part 2: Carrier Standards &amp; Max Throughput</h2>
              <p className="text-xs text-slate-400 mt-1">
                Identify maximum throughput specifications and single-channel bandwidth across ISDN, T-carrier, and E-carrier systems.
              </p>
            </div>
            {showResults && (
              <div className="font-mono text-sm px-3 py-1 rounded bg-slate-900 border border-border">
                Part 2:{" "}
                <span
                  className={
                    part2CorrectCount === part2Questions.length
                      ? "text-green-400 font-bold"
                      : "text-yellow-400 font-bold"
                  }
                >
                  {part2CorrectCount}
                </span>{" "}
                / {part2Questions.length}
              </div>
            )}
          </div>

          <div className="space-y-4">
            {part2Questions.map((q, index) => renderQuestionBlock(q, index))}
          </div>
        </section>

        {/* Part 3: Channel Capacity & Carrier Multipliers */}
        <section className="terminal-box">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 pb-4 border-b border-border">
            <div>
              <h2 className="text-xl font-bold text-accent underline">Part 3: Channel Capacity &amp; Carrier Multipliers</h2>
              <p className="text-xs text-slate-400 mt-1">
                Calculate 64 Kbps channel counts and multiplier bundling for T1, E1, T3, and E3.
              </p>
            </div>
            {showResults && (
              <div className="font-mono text-sm px-3 py-1 rounded bg-slate-900 border border-border">
                Part 3:{" "}
                <span
                  className={
                    part3CorrectCount === part3Questions.length
                      ? "text-green-400 font-bold"
                      : "text-yellow-400 font-bold"
                  }
                >
                  {part3CorrectCount}
                </span>{" "}
                / {part3Questions.length}
              </div>
            )}
          </div>

          <div className="space-y-4">
            {part3Questions.map((q, index) => renderQuestionBlock(q, index))}
          </div>
        </section>

        {/* Part 4: Geographic Deployment & Regional Standards */}
        <section className="terminal-box">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 pb-4 border-b border-border">
            <div>
              <h2 className="text-xl font-bold text-accent underline">Part 4: Geographic Deployment &amp; Regional Standards</h2>
              <p className="text-xs text-slate-400 mt-1">
                Match carrier standards (T-carrier vs E-carrier) to their historical and geographic regions of deployment.
              </p>
            </div>
            {showResults && (
              <div className="font-mono text-sm px-3 py-1 rounded bg-slate-900 border border-border">
                Part 4:{" "}
                <span
                  className={
                    part4CorrectCount === part4Questions.length
                      ? "text-green-400 font-bold"
                      : "text-yellow-400 font-bold"
                  }
                >
                  {part4CorrectCount}
                </span>{" "}
                / {part4Questions.length}
              </div>
            )}
          </div>

          <div className="space-y-4">
            {part4Questions.map((q, index) => renderQuestionBlock(q, index))}
          </div>
        </section>

        {/* Part 5: WAN Link Scenario Classification */}
        <section className="terminal-box">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 pb-4 border-b border-border">
            <div>
              <h2 className="text-xl font-bold text-accent underline">Part 5: WAN Link Scenario Identification</h2>
              <p className="text-xs text-slate-400 mt-1">
                Analyze real-world enterprise deployment scenarios and assign the optimal WAN technology or carrier standard.
              </p>
            </div>
            {showResults && (
              <div className="font-mono text-sm px-3 py-1 rounded bg-slate-900 border border-border">
                Part 5:{" "}
                <span
                  className={
                    scenarioCorrectCount === scenarios.length
                      ? "text-green-400 font-bold"
                      : "text-yellow-400 font-bold"
                  }
                >
                  {scenarioCorrectCount}
                </span>{" "}
                / {scenarios.length}
              </div>
            )}
          </div>

          <div className="space-y-4">
            {scenarios.map((s, index) => {
              const selected = answers[s.id] || "";
              const isCorrect = isQuestionCorrect(s.id, s.answer);

              return (
                <div
                  key={s.id}
                  className={`p-4 rounded border transition-colors ${
                    showResults
                      ? isCorrect
                        ? "border-green-500/60 bg-green-950/20"
                        : "border-red-500/60 bg-red-950/20"
                      : "border-border/60 bg-slate-900/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-accent font-mono text-xs mt-0.5 shrink-0">
                      [{String(index + 1).padStart(2, "0")}]
                    </span>
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-xs font-bold text-slate-300 font-mono">
                          {s.scenarioTitle}
                        </span>
                      </div>
                      <p className="text-sm text-slate-200 font-medium mb-3">{s.description}</p>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                        {s.options.map((opt) => {
                          const isOptionSelected = selected === opt;
                          const isOptionCorrect = opt === s.answer;

                          let btnStyle =
                            "bg-slate-900 border-border text-slate-300 hover:border-accent hover:text-white";
                          if (showResults) {
                            if (isOptionCorrect) {
                              btnStyle = "bg-green-900/50 border-green-500 text-green-300 font-bold";
                            } else if (isOptionSelected && !isOptionCorrect) {
                              btnStyle = "bg-red-900/50 border-red-500 text-red-300 line-through";
                            } else {
                              btnStyle = "bg-slate-900/40 border-border/40 text-slate-500 opacity-60";
                            }
                          } else if (isOptionSelected) {
                            btnStyle = "bg-accent/20 border-accent text-accent font-bold";
                          }

                          return (
                            <button
                              key={opt}
                              type="button"
                              disabled={showResults}
                              onClick={() => handleSelectAnswer(s.id, opt)}
                              className={`text-left p-2.5 rounded text-xs border font-mono transition-all flex items-center justify-between ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {showResults && isOptionCorrect && (
                                <span className="text-green-400 text-xs font-bold">✓</span>
                              )}
                              {showResults && isOptionSelected && !isOptionCorrect && (
                                <span className="text-red-400 text-xs font-bold">✗</span>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {showResults && (
                        <div
                          className={`mt-3 text-xs p-2.5 rounded border ${
                            isCorrect
                              ? "bg-green-950/40 text-green-300 border-green-800/60"
                              : "bg-red-950/40 text-red-300 border-red-800/60"
                          }`}
                        >
                          <span className="font-bold font-mono">
                            {isCorrect ? "✓ VALIDATED: " : "✗ ERROR: "}
                          </span>
                          {s.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Validation / Results Actions */}
        <section className="terminal-box text-center">
          {!showResults ? (
            <div className="flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={handleValidate}
                className="px-8 py-3 bg-accent text-slate-900 font-bold rounded hover:bg-green-400 transition-colors font-mono tracking-wide cursor-pointer shadow-lg shadow-accent/20"
              >
                VALIDATE WAN CONFIG
              </button>
              <p className="text-xs text-slate-400 font-mono">
                {totalAnswered} of {totalQuestions} questions answered
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div
                className={`p-6 rounded border ${
                  allCorrect
                    ? "bg-green-950/40 text-green-300 border-green-700/60"
                    : "bg-red-950/40 text-red-300 border-red-700/60"
                }`}
              >
                {allCorrect ? (
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl font-bold font-mono text-green-400">
                      [DIAGNOSTIC PASSED]
                    </span>
                    <p className="text-sm">
                      All WAN carrier specs, POTS modem principles, and regional standards verified successfully.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl font-bold font-mono text-red-400">
                      [DIAGNOSTIC FAILED]
                    </span>
                    <p className="text-sm">
                      {totalQuestions - totalCorrect} specification mismatch(es) detected. Review the highlighted errors above.
                    </p>
                  </div>
                )}
                <div className="mt-4 text-xs font-mono text-slate-400">
                  Total Score: <span className="font-bold text-slate-200">{totalCorrect}</span> / {totalQuestions} (
                  {Math.round((totalCorrect / totalQuestions) * 100)}%)
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={handleResetAndScramble}
                  className="px-6 py-2.5 border border-accent text-accent font-bold rounded hover:bg-accent/10 transition-colors font-mono text-xs tracking-wider cursor-pointer"
                >
                  [SCRAMBLE &amp; RESET]
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default function WANTechnologiesQuiz() {
  return (
    <Suspense fallback={null}>
      <WANQuizContent />
    </Suspense>
  );
}
