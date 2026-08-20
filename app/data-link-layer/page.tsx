"use client";

import { useState, useCallback, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface TermChallenge {
  id: string;
  prompt: string;
  hint?: string;
  answer: string;
  options: string[];
  aliases: string[];
  explanation: string;
  canTypeInHardMode: boolean;
}

interface ScenarioQuestion {
  id: string;
  prompt: string;
  options: string[];
  answer: string;
  explanation: string;
}

const INITIAL_TERM_CHALLENGES: TermChallenge[] = [
  {
    id: "term-llc",
    prompt: "Upper sublayer of Layer 2 that binds logical addresses to physical cards.",
    hint: "Logical Link Control",
    answer: "LLC (Logical Link Control)",
    options: [
      "LLC (Logical Link Control)",
      "MAC (Media Access Control)",
      "ARP (Address Resolution Protocol)",
      "Physical Layer",
    ],
    aliases: ["llc", "logical link control", "logical link control (llc)"],
    explanation: "LLC stands for Logical Link Control. It is the upper sublayer of Layer 2 and binds logical addresses to physical cards.",
    canTypeInHardMode: true,
  },
  {
    id: "term-mac-sublayer",
    prompt: "Lower sublayer of Layer 2 that sits between LLC and the physical layer, handling medium access and Layer 2 addressing.",
    hint: "Media Access Control",
    answer: "MAC (Media Access Control)",
    options: [
      "MAC (Media Access Control)",
      "LLC (Logical Link Control)",
      "Physical Layer",
      "Network Layer",
    ],
    aliases: ["mac", "media access control", "media access control (mac)"],
    explanation: "MAC stands for Media Access Control. It is the lower sublayer of Layer 2 and manages medium access and Layer 2 addressing.",
    canTypeInHardMode: true,
  },
  {
    id: "term-arp",
    prompt: "Protocol used with IPv4 to determine/resolve the MAC address corresponding to a known local IP address.",
    hint: "Address Resolution Protocol",
    answer: "ARP (Address Resolution Protocol)",
    options: [
      "ARP (Address Resolution Protocol)",
      "LLC (Logical Link Control)",
      "MAC (Media Access Control)",
      "DNS",
    ],
    aliases: ["arp", "address resolution protocol", "address resolution protocol (arp)"],
    explanation: "ARP (Address Resolution Protocol) is what resolves the MAC address from an IPv4 address on the local network.",
    canTypeInHardMode: true,
  },
  {
    id: "term-mac-size-bits",
    prompt: "Total length/size of a traditional Layer 2 MAC address in bits.",
    hint: "Total bits (or 6 bytes)",
    answer: "48 bits",
    options: ["48 bits", "32 bits", "64 bits", "128 bits"],
    aliases: ["48", "48 bits", "48 bit", "48b"],
    explanation: "A traditional MAC address is 48 bits (equal to 6 bytes).",
    canTypeInHardMode: true,
  },
  {
    id: "term-mac-size-bytes",
    prompt: "Total length/size of a traditional Layer 2 MAC address in bytes.",
    hint: "Total bytes (or 48 bits)",
    answer: "6 bytes",
    options: ["6 bytes", "4 bytes", "8 bytes", "16 bytes"],
    aliases: ["6", "6 bytes", "6 byte", "6b"],
    explanation: "A traditional MAC address is 6 bytes (48 bits).",
    canTypeInHardMode: true,
  },
  {
    id: "term-oui-name",
    prompt: "Name of the first half (first 3 hex pairs / 24 bits) of a MAC address assigned to manufacturers.",
    hint: "OUI",
    answer: "OUI (Organizationally Unique Identifier)",
    options: [
      "OUI (Organizationally Unique Identifier)",
      "LLC (Logical Link Control)",
      "NIC (Network Interface Card)",
      "GUID (Globally Unique Identifier)",
    ],
    aliases: [
      "oui",
      "organizationally unique identifier",
      "organizationally unique identifier (oui)",
    ],
    explanation: "The first half of a MAC address is the OUI (Organizationally Unique Identifier).",
    canTypeInHardMode: true,
  },
  {
    id: "term-oui-assigner",
    prompt: "Organization/governing body that assigns the OUI to hardware manufacturers.",
    hint: "Standards organization",
    answer: "IEEE",
    options: ["IEEE", "IETF", "ISO", "FCC"],
    aliases: ["ieee", "institute of electrical and electronics engineers"],
    explanation: "The IEEE assigns the OUI to hardware manufacturers to identify vendor origin.",
    canTypeInHardMode: true,
  },
  {
    id: "term-mac-target",
    prompt: "What does a MAC address specifically identify on a local network?",
    hint: "Hardware component, not location",
    answer: "Network Interface",
    options: [
      "Network Interface",
      "Physical Location of the device",
      "Geographic IP Subnet",
      "Internet Service Provider",
    ],
    aliases: ["network interface", "a network interface", "interface", "nic interface"],
    explanation: "A MAC address identifies a network interface, not the physical location of the device.",
    canTypeInHardMode: true,
  },
];

const INITIAL_SCENARIOS: ScenarioQuestion[] = [
  {
    id: "scen-resolve-mac",
    prompt: "A computer needs to transmit a packet to another device on the local network. It knows the destination IPv4 address but not the destination MAC address. Which protocol resolves the MAC address?",
    options: [
      "ARP (Address Resolution Protocol)",
      "LLC (Logical Link Control)",
      "MAC Sublayer",
      "Physical Layer Carrier Sense",
    ],
    answer: "ARP (Address Resolution Protocol)",
    explanation: "ARP is used with IPv4 to determine the MAC address corresponding to an IP address on the local network (not LLC).",
  },
  {
    id: "scen-oui-segment",
    prompt: "Given the sample MAC address 03:E5:B1:F4:B2:A4, which portion represents the Organizationally Unique Identifier (OUI) assigned to the manufacturer?",
    options: [
      "03:E5:B1",
      "F4:B2:A4",
      "03:E5:B1:F4",
      "B1:F4:B2:A4",
    ],
    answer: "03:E5:B1",
    explanation: "The first half of the 6 hexadecimal pairs (03:E5:B1) is the OUI, which identifies the manufacturer or vendor.",
  },
  {
    id: "scen-device-identifier",
    prompt: "Given the sample MAC address 03:E5:B1:F4:B2:A4, what does the second half (F4:B2:A4) represent?",
    options: [
      "The manufacturer-assigned unique sequence unique to the OUI",
      "The vendor ID code registered with the IEEE",
      "The IP network subnet mask converted to hexadecimal",
      "The room number and physical building coordinates of the hardware",
    ],
    answer: "The manufacturer-assigned unique sequence unique to the OUI",
    explanation: "The second half is a unique sequence produced by the vendor that should not be duplicated across other MAC addresses sharing the same OUI.",
  },
  {
    id: "scen-sublayer-interface",
    prompt: "In IEEE 802 architecture, which sublayer connects the Physical Layer to the upper logical controls and handles accessing the transmission medium?",
    options: [
      "MAC (Media Access Control)",
      "LLC (Logical Link Control)",
      "Network Layer",
      "Session Layer",
    ],
    answer: "MAC (Media Access Control)",
    explanation: "The MAC sublayer is the lower sublayer of Layer 2; it interfaces with the Physical Layer and handles access to the transmission medium.",
  },
  {
    id: "scen-mac-format",
    prompt: "How is a traditional 48-bit MAC address typically written and formatted?",
    options: [
      "Six hexadecimal pairs separated by colons",
      "Four decimal octets separated by dots",
      "Eight 16-bit hexadecimal blocks separated by semicolons",
      "Twelve decimal integers separated by dashes",
    ],
    answer: "Six hexadecimal pairs separated by colons",
    explanation: "A traditional MAC address is 48 bits (6 bytes) written as six hexadecimal pairs separated by colons or hyphens.",
  },
  {
    id: "scen-logical-binding",
    prompt: "Which sublayer of the Data-Link Layer is responsible for binding logical addresses to physical cards?",
    options: [
      "LLC (Logical Link Control)",
      "MAC (Media Access Control)",
      "Physical Layer",
      "Transport Layer",
    ],
    answer: "LLC (Logical Link Control)",
    explanation: "LLC (Logical Link Control) is the upper sublayer of the Data-Link Layer and binds logical addresses to physical cards.",
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function normalizeInput(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function validateTermInput(challenge: TermChallenge, input: string): boolean {
  if (!input) return false;
  if (input === challenge.answer) return true;
  const clean = normalizeInput(input);
  return challenge.aliases.some((alias) => clean === normalizeInput(alias));
}

function DataLinkLayerQuizContent() {
  const searchParams = useSearchParams();
  const isMastery = searchParams.get("mastery") === "true";

  const [hasCompletedOnce, setHasCompletedOnce] = useState<boolean>(false);
  const isHardMode = isMastery || hasCompletedOnce;

  const [termChallenges, setTermChallenges] = useState<TermChallenge[]>(() =>
    isMastery ? shuffleArray(INITIAL_TERM_CHALLENGES) : INITIAL_TERM_CHALLENGES
  );
  const [scenarios, setScenarios] = useState<ScenarioQuestion[]>(() =>
    isMastery ? shuffleArray(INITIAL_SCENARIOS) : INITIAL_SCENARIOS
  );

  const shuffledTermOptions = useMemo(() => {
    const map: Record<string, string[]> = {};
    termChallenges.forEach((item) => {
      map[item.id] = shuffleArray(item.options);
    });
    return map;
  }, [termChallenges]);

  const shuffledScenarioOptions = useMemo(() => {
    const map: Record<string, string[]> = {};
    scenarios.forEach((item) => {
      map[item.id] = shuffleArray(item.options);
    });
    return map;
  }, [scenarios]);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const totalQuestions = termChallenges.length + scenarios.length;

  const results = useMemo(() => {
    if (!showResults) return { termResults: {}, scenarioResults: {}, correctCount: 0 };

    let count = 0;
    const termRes: Record<string, boolean> = {};
    termChallenges.forEach((item) => {
      const isCorrect = validateTermInput(item, answers[item.id] || "");
      termRes[item.id] = isCorrect;
      if (isCorrect) count++;
    });

    const scenRes: Record<string, boolean> = {};
    scenarios.forEach((item) => {
      const isCorrect = answers[item.id] === item.answer;
      scenRes[item.id] = isCorrect;
      if (isCorrect) count++;
    });

    return { termResults: termRes, scenarioResults: scenRes, correctCount: count };
  }, [showResults, termChallenges, scenarios, answers]);

  const allCorrect = showResults && results.correctCount === totalQuestions;

  const handleAnswerChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleValidate = () => {
    setShowResults(true);
    let count = 0;
    termChallenges.forEach((item) => {
      if (validateTermInput(item, answers[item.id] || "")) count++;
    });
    scenarios.forEach((item) => {
      if (answers[item.id] === item.answer) count++;
    });

    if (count === totalQuestions && !hasCompletedOnce) {
      setHasCompletedOnce(true);
    }
  };

  const handleResetAndScramble = useCallback(() => {
    setTermChallenges(shuffleArray(INITIAL_TERM_CHALLENGES));
    setScenarios(shuffleArray(INITIAL_SCENARIOS));
    setAnswers({});
    setShowResults(false);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-8">
      {/* Header */}
      <header className="w-full max-w-4xl mb-8 cyber-glass-panel p-4 sm:p-5 rounded-xl border border-slate-800 shadow-xl flex flex-wrap justify-between items-center gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-1.5 py-0.5 rounded">
              DIAGNOSTIC_MODULE
            </span>
            <span className="text-xs text-slate-500 font-mono">//</span>
            <span className="text-xs text-slate-400 font-mono">LAYER_2_CONCEPTS</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="text-emerald-400 font-mono">ENT_ROUTER_V1</span>
            <span className="text-slate-600 font-light">|</span>
            <span className="text-slate-200">Data-Link Layer</span>
          </h1>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <Link
            href="/study-guide#data-link-layer"
            className="px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-950/30 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-400 transition-all flex items-center gap-1.5 font-bold"
          >
            <span>[STUDY_GUIDE]</span>
          </Link>
          <Link
            href="/"
            className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-600 transition-all font-bold"
          >
            {"<"} BACK TO HUB
          </Link>
        </div>
      </header>

      <main className="w-full max-w-4xl space-y-8 font-mono">
        {/* Section 1: Sublayers & Architecture Matching */}
        <section className="terminal-box border-l-4 border-l-emerald-500 shadow-2xl">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
                [PART_01: SUBLAYER_&_MAC_ARCHITECTURAL_CONCEPTS]
              </h2>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mb-6">
            Identify the corresponding protocol, sublayer, bit length, or governing entity for each Layer 2 requirement.
          </p>

          <div className="space-y-4">
            {termChallenges.map((item, idx) => {
              const selected = answers[item.id] || "";
              const isCorrect = results.termResults[item.id];
              const shouldType = isHardMode && item.canTypeInHardMode;

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-lg border transition-all ${
                    showResults
                      ? isCorrect
                        ? "border-emerald-500/60 bg-emerald-950/20"
                        : "border-rose-500/60 bg-rose-950/20"
                      : "border-slate-800/80 bg-slate-900/70 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-2 py-0.5 rounded shrink-0">
                      #{idx + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm text-slate-200 font-medium mb-3">{item.prompt}</p>

                      {shouldType ? (
                        <div className="mt-2">
                          <input
                            type="text"
                            disabled={showResults}
                            value={selected}
                            onChange={(e) => handleAnswerChange(item.id, e.target.value)}
                            placeholder="Type the exact name, acronym, or number..."
                            className="w-full bg-slate-950 border border-slate-700 p-2.5 rounded-lg font-mono text-xs sm:text-sm text-slate-100 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 disabled:opacity-60"
                          />
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                          {shuffledTermOptions[item.id].map((opt) => {
                            const isOptionSelected = selected === opt;
                            const isOptionCorrect = opt === item.answer;

                            let btnStyle =
                              "bg-slate-950 border-slate-800 text-slate-300 hover:border-emerald-500/50 hover:text-white";
                            if (showResults) {
                              if (isOptionCorrect) {
                                btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold";
                              } else if (isOptionSelected && !isOptionCorrect) {
                                btnStyle = "bg-rose-950/60 border-rose-500 text-rose-300 line-through";
                              } else {
                                btnStyle = "bg-slate-950/40 border-slate-800/40 text-slate-600 opacity-60";
                              }
                            } else if (isOptionSelected) {
                              btnStyle = "bg-emerald-950/40 border-emerald-400 text-emerald-300 font-bold shadow-sm";
                            }

                            return (
                              <button
                                key={opt}
                                type="button"
                                disabled={showResults}
                                onClick={() => handleAnswerChange(item.id, opt)}
                                className={`text-left p-2.5 rounded-lg text-xs font-mono border transition-all flex items-center justify-between cursor-pointer disabled:cursor-default ${btnStyle}`}
                              >
                                <span>{opt}</span>
                                {showResults && isOptionCorrect && (
                                  <span className="text-emerald-400 text-xs font-bold">[OK]</span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {showResults && (
                        <div
                          className={`mt-3 text-xs p-2.5 rounded-lg border font-mono ${
                            isCorrect
                              ? "bg-emerald-950/40 text-emerald-300 border-emerald-800/60"
                              : "bg-rose-950/40 text-rose-300 border-rose-800/60"
                          }`}
                        >
                          <span className="font-bold">
                            {isCorrect ? "[OK] VALIDATED: " : "[!] ERROR: "}
                          </span>
                          <span className="font-mono">{item.explanation}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 2: Scenarios & Address Analysis */}
        <section className="terminal-box border-l-4 border-l-emerald-500 shadow-2xl">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
                [PART_02: SCENARIOS_&_ADDRESS_RESOLUTION_ANALYSIS]
              </h2>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mb-6">
            Evaluate Layer 2 operational scenarios, address field breakdowns, and protocol resolution workflows.
          </p>

          <div className="space-y-4">
            {scenarios.map((item, idx) => {
              const selected = answers[item.id] || "";
              const isCorrect = results.scenarioResults[item.id];

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-lg border transition-all ${
                    showResults
                      ? isCorrect
                        ? "border-emerald-500/60 bg-emerald-950/20"
                        : "border-rose-500/60 bg-rose-950/20"
                      : "border-slate-800/80 bg-slate-900/70 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-2 py-0.5 rounded shrink-0">
                      #{termChallenges.length + idx + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm text-slate-200 font-medium mb-3 font-mono">{item.prompt}</p>

                      <div className="grid grid-cols-1 gap-2 mt-2">
                        {shuffledScenarioOptions[item.id].map((opt) => {
                          const isOptionSelected = selected === opt;
                          const isOptionCorrect = opt === item.answer;

                          let btnStyle =
                            "bg-slate-950 border-slate-800 text-slate-300 hover:border-emerald-500/50 hover:text-white";
                          if (showResults) {
                            if (isOptionCorrect) {
                              btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold";
                            } else if (isOptionSelected && !isOptionCorrect) {
                              btnStyle = "bg-rose-950/60 border-rose-500 text-rose-300 line-through";
                            } else {
                              btnStyle = "bg-slate-950/40 border-slate-800/40 text-slate-600 opacity-60";
                            }
                          } else if (isOptionSelected) {
                            btnStyle = "bg-emerald-950/40 border-emerald-400 text-emerald-300 font-bold shadow-sm";
                          }

                          return (
                            <button
                              key={opt}
                              type="button"
                              disabled={showResults}
                              onClick={() => handleAnswerChange(item.id, opt)}
                              className={`text-left p-2.5 rounded-lg text-xs font-mono border transition-all flex items-center justify-between cursor-pointer disabled:cursor-default ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {showResults && isOptionCorrect && (
                                <span className="text-emerald-400 text-xs font-bold">[OK]</span>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {showResults && (
                        <div
                          className={`mt-3 text-xs p-2.5 rounded-lg border font-mono ${
                            isCorrect
                              ? "bg-emerald-950/40 text-emerald-300 border-emerald-800/60"
                              : "bg-rose-950/40 text-rose-300 border-rose-800/60"
                          }`}
                        >
                          <span className="font-bold">
                            {isCorrect ? "[OK] VALIDATED: " : "[!] ERROR: "}
                          </span>
                          <span className="font-mono">{item.explanation}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Validation & Reset */}
        <section className="terminal-box border-l-4 border-l-emerald-500 shadow-2xl text-center">
          {!showResults ? (
            <div className="flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={handleValidate}
                className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-sm rounded-lg shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/20 transition-all cursor-pointer"
              >
                VALIDATE ALL RESPONSES
              </button>
              <p className="text-xs text-slate-400 font-mono">
                {Object.values(answers).filter((v) => v.trim() !== "").length} of {totalQuestions}{" "}
                questions answered
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div
                className={`p-6 rounded-lg border shadow-lg ${
                  allCorrect
                    ? "bg-emerald-950/40 text-emerald-300 border-emerald-500/60 shadow-emerald-950/40"
                    : "bg-rose-950/40 text-rose-300 border-rose-500/60 shadow-rose-950/40"
                }`}
              >
                {allCorrect ? (
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-lg sm:text-xl font-bold font-mono text-emerald-400 flex items-center gap-2">
                      <span>[OK]</span> SUCCESS: LAYER 2 ARCHITECTURE VALIDATED
                    </span>
                    <p className="text-xs sm:text-sm text-emerald-300/90 font-mono">
                      All MAC sublayer, LLC sublayer, and ARP address resolution workflows verified.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-lg sm:text-xl font-bold font-mono text-rose-400 flex items-center gap-2">
                      <span>[!]</span> LAYER 2 CONFIGURATION MISMATCH DETECTED
                    </span>
                    <p className="text-xs sm:text-sm text-rose-300/90 font-mono">
                      {totalQuestions - results.correctCount} item(s) failed parity check. Review highlighted errors above.
                    </p>
                  </div>
                )}
                <div className="mt-4 text-xs font-mono text-slate-400">
                  Total Score: <span className="font-bold text-slate-200">{results.correctCount}</span> / {totalQuestions} (
                  {Math.round((results.correctCount / totalQuestions) * 100)}%)
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={handleResetAndScramble}
                  className="px-6 py-2.5 border border-emerald-500/40 hover:border-emerald-400 bg-slate-900/80 hover:bg-slate-800 text-emerald-400 font-bold font-mono text-sm rounded-lg transition-all cursor-pointer"
                >
                  SCRAMBLE & RESET
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default function DataLinkLayerPage() {
  return (
    <Suspense fallback={null}>
      <DataLinkLayerQuizContent />
    </Suspense>
  );
}
