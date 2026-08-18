"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";

// ---------------------------------------------------------------------------
// TYPES & DATA STRUCTURES
// ---------------------------------------------------------------------------

export type SecurityOptionKey = "OPEN" | "WEP" | "WPA" | "WPA2" | "WPA3" | "WPS";

export interface SecurityOptionMeta {
  key: SecurityOptionKey;
  label: string;
  isBest: boolean;
  notes: string;
}

export const ALL_SECURITY_OPTIONS: Record<SecurityOptionKey, SecurityOptionMeta> = {
  OPEN: {
    key: "OPEN",
    label: "Open",
    isBest: false,
    notes: "Do not connect! Transmits all traffic unencrypted in plaintext.",
  },
  WEP: {
    key: "WEP",
    label: "WEP",
    isBest: false,
    notes: "Broken initialization vectors allow cracking within seconds.",
  },
  WPA: {
    key: "WPA",
    label: "WPA",
    isBest: false,
    notes: "TKIP has known collision attacks and is deprecated.",
  },
  WPA2: {
    key: "WPA2",
    label: "WPA2",
    isBest: true,
    notes: "Standard enterprise/home security using robust AES cipher blocks.",
  },
  WPA3: {
    key: "WPA3",
    label: "WPA3",
    isBest: true,
    notes: "Cutting-edge standard offering forward secrecy and brute-force resistance.",
  },
  WPS: {
    key: "WPS",
    label: "WPS",
    isBest: false,
    notes: "PIN validation splits into two halves, drastically reducing brute-force complexity.",
  },
};

// Scenarios for the pretend router setup
export interface RouterScenario {
  id: string;
  name: string;
  firmware: string;
  ssid: string;
  frequencyBand: string;
  channel: string;
  clientEnvironment: string;
  targetSecureOption: "WPA2" | "WPA3"; // Always one, never both
  insecureOptions: SecurityOptionKey[]; // Exactly 3 insecure options
}

const ROUTER_SCENARIOS: RouterScenario[] = [
  {
    id: "scen-corp-hq",
    name: "Enterprise Access Point - Corporate HQ",
    firmware: "ENT-RouterOS v4.19.0-Enterprise",
    ssid: "ENT-CORP-SECURE-WLAN",
    frequencyBand: "5 GHz (High Throughput)",
    channel: "Channel 36 (Non-overlapping 5GHz)",
    clientEnvironment: "Corporate workstations and executives requiring DoD-grade encryption.",
    targetSecureOption: "WPA2",
    insecureOptions: ["OPEN", "WEP", "WPA"],
  },
  {
    id: "scen-dod-branch",
    name: "Defense Branch Office Wireless AP",
    firmware: "TACTICAL-AP v2.8.4",
    ssid: "GOV-DEFENSE-LAN",
    frequencyBand: "2.4 GHz + 5 GHz",
    channel: "Channel 6 (2.4GHz) / Channel 149 (5GHz)",
    clientEnvironment: "Government workstations adhering to US Department of Defense AES standards.",
    targetSecureOption: "WPA2",
    insecureOptions: ["WPS", "WEP", "OPEN"],
  },
  {
    id: "scen-cutting-edge-lab",
    name: "Next-Gen Research Lab Wireless Hub",
    firmware: "QUANTUM-OS v8.2.1-NextGen",
    ssid: "RESEARCH-LAB-FAST",
    frequencyBand: "2.4 GHz + 5 GHz",
    channel: "Channel 1 (2.4GHz) / Channel 44 (5GHz)",
    clientEnvironment: "Cutting-edge research devices equipped with the latest wireless security standard.",
    targetSecureOption: "WPA3",
    insecureOptions: ["OPEN", "WPA", "WPS"],
  },
  {
    id: "scen-smart-facility",
    name: "Automated Smart Facility Wireless Gateway",
    firmware: "IOT-SECURE-GATEWAY v3.1",
    ssid: "FACILITY-IOT-PRIVATE",
    frequencyBand: "2.4 GHz (Long Range)",
    channel: "Channel 11 (Non-overlapping 2.4GHz)",
    clientEnvironment: "High-security industrial controller network requiring modern cutting-edge protection.",
    targetSecureOption: "WPA3",
    insecureOptions: ["WEP", "WPA", "WPS"],
  },
  {
    id: "scen-executive-suite",
    name: "Executive Suite Wireless Access Point",
    firmware: "AP-PRO-COMMERCIAL v5.0",
    ssid: "EXEC-CONFIDENTIAL-NET",
    frequencyBand: "5 GHz",
    channel: "Channel 157 (5GHz)",
    clientEnvironment: "Confidential corporate finance meeting room requiring AES encryption standard.",
    targetSecureOption: "WPA2",
    insecureOptions: ["WPA", "WPS", "OPEN"],
  },
];

// Security Knowledge Questions
interface SecurityQuestion {
  id: string;
  prompt: string;
  options: string[];
  answer: string;
  explanation: string;
}

const initialSecurityQuestions: SecurityQuestion[] = [
  {
    id: "sec-q1-wpa2-cipher",
    prompt: "Which robust symmetric encryption algorithm is utilized by WPA2 (and approved by the US DoD)?",
    options: ["AES", "TKIP", "RC4", "DES"],
    answer: "AES",
    explanation: "WPA2 uses AES (Advanced Encryption Standard), which is used by the US Department of Defense and considered secure.",
  },
  {
    id: "sec-q2-wpa-flaw",
    prompt: "What key mechanism does original legacy WPA utilize that renders it insecure and easily hackable today?",
    options: ["TKIP", "AES-256", "Diffie-Hellman", "RSA-4096"],
    answer: "TKIP",
    explanation: "Original WPA relied on TKIP (Temporal Key Integrity Protocol), which is no longer secure and is easily hackable.",
  },
  {
    id: "sec-q3-dod-standard",
    prompt: "Which Wi-Fi security standard is used by the US Department of Defense?",
    options: ["WPA2", "WEP", "WPA", "WPS"],
    answer: "WPA2",
    explanation: "WPA2 uses AES encryption and is utilized by the US Department of Defense.",
  },
  {
    id: "sec-q5-open-danger",
    prompt: "Why should you never connect to an Open Wi-Fi network?",
    options: [
      "Open networks lack encryption, allowing hackers to steal data and deploy malicious honeypots",
      "Open networks immediately overload and permanently fry wireless network cards",
      "Open networks are strictly reserved for US government entities",
      "Open networks only operate on infrared light frequencies",
    ],
    answer: "Open networks lack encryption, allowing hackers to steal data and deploy malicious honeypots",
    explanation: "Open networks lack encryption, allowing data theft and potential rogue honeypots.",
  },
  {
    id: "sec-q6-wps-flaw",
    prompt: "What is the assessment of WPS (Wi-Fi Protected Setup)?",
    options: [
      "Easy to set up, but very insecure",
      "Very hard to set up, but perfectly secure",
      "Approved by the US Department of Defense",
      "Uses AES encryption with TKIP keys",
    ],
    answer: "Easy to set up, but very insecure",
    explanation: "WPS was designed for easy push-button/PIN configuration, but is known to be very insecure.",
  },
];

// Frequency & Channel Questions
interface FrequencyQuestion {
  category: "Channels & Overlap" | "RF Propagation" | "Interference & Speed";
  id: string;
  prompt: string;
  options: string[];
  answer: string;
  explanation: string;
}

const initialFrequencyQuestions: FrequencyQuestion[] = [
  {
    id: "freq-24-total-channels",
    category: "Channels & Overlap",
    prompt: "How many total channels exist in the 2.4 GHz frequency band?",
    options: ["11 channels", "3 channels", "25 channels", "14 channels"],
    answer: "11 channels",
    explanation: "The 2.4 GHz spectrum has 11 channels total in standard North American Wi-Fi allocation.",
  },
  {
    id: "freq-24-non-overlap",
    category: "Channels & Overlap",
    prompt: "Which three channels in the 2.4 GHz band do NOT overlap with each other?",
    options: ["Channels 1, 6, and 11", "Channels 1, 2, and 3", "Channels 2, 7, and 11", "Channels 6, 8, and 11"],
    answer: "Channels 1, 6, and 11",
    explanation: "In the 2.4 GHz band, only Channels 1, 6, and 11 are non-overlapping with sufficient spectrum separation.",
  },
  {
    id: "freq-5-non-overlap",
    category: "Channels & Overlap",
    prompt: "How many non-overlapping channels are available in the 5 GHz frequency band?",
    options: ["25 channels", "11 channels", "3 channels", "8 channels"],
    answer: "25 channels",
    explanation: "5 GHz provides 25 non-overlapping channels, greatly reducing co-channel interference.",
  },
  {
    id: "freq-penetration-distance",
    category: "RF Propagation",
    prompt: "Which Wi-Fi frequency band travels a farther distance and more easily penetrates solid objects like walls?",
    options: ["2.4 GHz", "5 GHz", "60 GHz", "900 MHz"],
    answer: "2.4 GHz",
    explanation: "2.4 GHz uses longer wavelengths, allowing it to go farther and penetrate solid walls better than 5 GHz.",
  },
  {
    id: "freq-speed-comparison",
    category: "Interference & Speed",
    prompt: "Which frequency band is generally faster with higher data throughput, despite shorter range?",
    options: ["2.4 GHz", "5 GHz", "60 GHz", "900 MHz"],
    answer: "5 GHz",
    explanation: "5 GHz has wider channel bandwidths and higher frequency transmission, making it generally faster than 2.4 GHz.",
  },
  {
    id: "freq-interference-sources",
    category: "Interference & Speed",
    prompt: "Why does 2.4 GHz suffer from more interference than 5 GHz?",
    options: [
      "2.4 GHz is shared by many devices",
      "2.4 GHz uses optical pulses that reflect off walls",
      "2.4 GHz has 25 non-overlapping channels that collide",
      "2.4 GHz operates exclusively at 100 Mb/s",
    ],
    answer: "2.4 GHz is shared by common devices like microwaves, Bluetooth headphones, and cordless phones",
    explanation: "2.4 GHz is crowded with consumer electronics like microwave ovens, Bluetooth gear, and cordless landlines.",
  },
];

// Helper functions for shuffling
function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Generate the 4 options for a router scenario:
// Exactly one of WPA2 or WPA3, and 3 insecure options from (Open, WEP, WPA, WPS)
function generateRouterOptions(scenario: RouterScenario): SecurityOptionMeta[] {
  const secureKey: SecurityOptionKey = scenario.targetSecureOption;
  const secureOption = ALL_SECURITY_OPTIONS[secureKey];

  // Pick 3 insecure options from the scenario's list
  const insecureKeys: SecurityOptionKey[] = scenario.insecureOptions.slice(0, 3);
  const insecureOptions = insecureKeys.map((k) => ALL_SECURITY_OPTIONS[k]);

  // Combine and shuffle: exactly 4 options, strictly containing WPA2 OR WPA3 (never both)
  const combined = [secureOption, ...insecureOptions];
  return shuffleArray(combined);
}

// ---------------------------------------------------------------------------
// MAIN QUIZ COMPONENT
// ---------------------------------------------------------------------------

function getRandomScenario(): { scenario: RouterScenario; options: SecurityOptionMeta[] } {
  const randomIdx = Math.floor(Math.random() * ROUTER_SCENARIOS.length);
  const scenario = ROUTER_SCENARIOS[randomIdx];
  return {
    scenario,
    options: generateRouterOptions(scenario),
  };
}

export default function Wireless80211Page() {
  // State
  const [initialSetup] = useState(() => getRandomScenario());
  const [currentScenario, setCurrentScenario] = useState<RouterScenario>(() => initialSetup.scenario);
  const [routerOptions, setRouterOptions] = useState<SecurityOptionMeta[]>(() => initialSetup.options);
  const [selectedSecurityOption, setSelectedSecurityOption] = useState<SecurityOptionKey | "">("");

  // General Questions State
  const [securityQuestions, setSecurityQuestions] = useState<SecurityQuestion[]>(() =>
    shuffleArray(initialSecurityQuestions).map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }))
  );
  const [frequencyQuestions, setFrequencyQuestions] = useState<FrequencyQuestion[]>(() =>
    shuffleArray(initialFrequencyQuestions).map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }))
  );

  // General Answers: key = questionId
  const [generalAnswers, setGeneralAnswers] = useState<Record<string, string>>({});

  const [showResults, setShowResults] = useState<boolean>(false);

  const handleNextRandomScenario = useCallback(() => {
    const randomIdx = Math.floor(Math.random() * ROUTER_SCENARIOS.length);
    const sc = ROUTER_SCENARIOS[randomIdx];
    setCurrentScenario(sc);
    setRouterOptions(generateRouterOptions(sc));
    setSelectedSecurityOption("");
    setShowResults(false);
  }, []);

  // Answer change handlers
  const handleAnswerChange = (id: string, value: string) => {
    setGeneralAnswers((prev) => ({ ...prev, [id]: value }));
  };

  // Answer validation helper
  const isQuestionCorrect = useCallback(
    (id: string, correctAnswer: string) => {
      return (generalAnswers[id] || "") === correctAnswer;
    },
    [generalAnswers]
  );

  // Router Setup Evaluation
  const isRouterSecurityCorrect = useMemo(() => {
    if (!selectedSecurityOption) return false;
    // The correct option is the target secure option (WPA2 or WPA3) present in the pretend setup
    return selectedSecurityOption === currentScenario.targetSecureOption;
  }, [selectedSecurityOption, currentScenario]);

  // Scoring
  const secQuestionsCorrect = securityQuestions.filter((q) =>
    isQuestionCorrect(q.id, q.answer)
  ).length;

  const freqQuestionsCorrect = frequencyQuestions.filter((q) =>
    isQuestionCorrect(q.id, q.answer)
  ).length;

  const totalQuestions =
    1 + // Router setup question
    securityQuestions.length +
    frequencyQuestions.length;

  const totalCorrect =
    (isRouterSecurityCorrect ? 1 : 0) +
    secQuestionsCorrect +
    freqQuestionsCorrect;

  const allPassed = totalCorrect === totalQuestions;

  const handleValidate = () => {
    setShowResults(true);
  };

  const handleResetAndScramble = () => {
    setSecurityQuestions(
      shuffleArray(initialSecurityQuestions).map((q) => ({
        ...q,
        options: shuffleArray(q.options),
      }))
    );
    setFrequencyQuestions(
      shuffleArray(initialFrequencyQuestions).map((q) => ({
        ...q,
        options: shuffleArray(q.options),
      }))
    );

    // Re-generate router options with random scenario
    const randomIdx = Math.floor(Math.random() * ROUTER_SCENARIOS.length);
    const sc = ROUTER_SCENARIOS[randomIdx];
    setCurrentScenario(sc);
    setRouterOptions(generateRouterOptions(sc));

    setGeneralAnswers({});
    setSelectedSecurityOption("");
    setShowResults(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-8">
      {/* HEADER */}
      <header className="w-full max-w-5xl mb-8 border-b border-border pb-4">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-accent">ENT_ROUTER_V1 | Wireless 802.11</h1>
          </div>
          <div className="flex items-center gap-4 text-sm font-mono">
            <Link
              href="/study-guide#wireless-80211"
              className="text-accent hover:underline flex items-center gap-1"
            >
              [VIEW IN STUDY GUIDE]
            </Link>
            <Link href="/" className="text-sm text-accent hover:underline">
              {"<"} BACK TO HUB
            </Link>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-2">
          <p className="text-sm text-slate-400">
            Diagnostic &amp; Interactive Examination: RF Bands (2.4/5 GHz) and Router Security Configurations (WPA2/WPA3)
          </p>
        </div>
      </header>

      <main className="w-full max-w-5xl space-y-8">
        {/* ================================================================= */}
        {/* SECTION 1: PRETEND ROUTER SETUP (WI-FI SECURITY CONFIGURATION)    */}
        {/* ================================================================= */}
        <section className="terminal-box border-l-4 border-l-emerald-500 bg-slate-900/90 shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 pb-3 border-b border-border">
            <div>
              <span className="text-xs text-accent font-mono uppercase tracking-wider">[SECTION 1]</span>
              <h2 className="text-xl font-bold text-slate-100">
                Pretend Router Setup - Wi-Fi Security Configuration
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleNextRandomScenario}
                className="text-xs px-3 py-1 bg-slate-800 hover:bg-slate-700 text-accent border border-border rounded font-mono transition-colors"
                title="Load another pretend router scenario"
              >
                [NEXT AP PROFILE]
              </button>
            </div>
          </div>

          <p className="text-sm text-slate-300 mb-4 leading-relaxed">
            Configure the pretend Access Point below. Review the router parameters and select the{" "}
            <strong className="text-accent font-bold">best security option</strong> for this Wi-Fi network setup.
          </p>

          {/* ROUTER GUI SIMULATOR BOX */}
          <div className="bg-slate-950 border border-slate-700 rounded-lg p-4 sm:p-6 shadow-inner space-y-6">
            {/* Router Top Status Bar */}
            <div className="flex flex-wrap justify-between items-center bg-slate-900 border border-slate-800 px-4 py-2 rounded text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-emerald-400 font-bold">{currentScenario.firmware}</span>
              </div>
              <div className="text-slate-400">
                AP Mode: <span className="text-slate-200 font-semibold">Infrastructure BSSID</span>
              </div>
            </div>

            {/* Router Hardware & Wireless Parameters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900/60 p-4 rounded border border-slate-800">
              <div>
                <span className="text-xs text-slate-400 block font-mono">Access Point / Profile Name</span>
                <span className="text-sm font-bold text-slate-200">{currentScenario.name}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-mono">Wireless SSID (Network Name)</span>
                <span className="text-sm font-bold text-emerald-400 font-mono tracking-wide">
                  &ldquo;{currentScenario.ssid}&rdquo;
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-mono">Operating Radio Band</span>
                <span className="text-sm font-semibold text-slate-300">{currentScenario.frequencyBand}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-mono">Assigned Broadcast Channel</span>
                <span className="text-sm font-semibold text-slate-300">{currentScenario.channel}</span>
              </div>
              <div className="md:col-span-2 text-xs text-slate-400 border-t border-slate-800 pt-2">
                <span className="font-bold text-slate-300">Environment Requirement: </span>
                {currentScenario.clientEnvironment}
              </div>
            </div>

            {/* 4 Security Options Selection Grid */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-200 font-mono">
                  Select Wireless Security Mode:
                </label>
                <span className="text-xs text-slate-400 font-mono">
                  Target: Best Security Option
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {routerOptions.map((opt) => {
                  const isSelected = selectedSecurityOption === opt.key;
                  const isOptionTarget = opt.key === currentScenario.targetSecureOption;

                  let cardBorderClass = "border-slate-700 bg-slate-900 hover:border-slate-500";
                  if (isSelected) {
                    cardBorderClass = "border-accent bg-emerald-950/30 ring-1 ring-accent";
                  }
                  if (showResults) {
                    if (isOptionTarget) {
                      cardBorderClass = "border-green-500 bg-green-950/40 ring-2 ring-green-400";
                    } else if (isSelected && !isOptionTarget) {
                      cardBorderClass = "border-red-500 bg-red-950/40 ring-2 ring-red-400";
                    }
                  }

                  return (
                    <button
                      key={opt.key}
                      type="button"
                      disabled={showResults}
                      onClick={() => setSelectedSecurityOption(opt.key)}
                      className={`p-3.5 rounded-lg border text-left transition-all flex items-center justify-between ${cardBorderClass}`}
                    >
                      <span className="font-mono font-bold text-sm text-slate-100 flex items-center gap-2.5">
                        <span
                          className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                            isSelected ? "border-accent bg-accent" : "border-slate-500"
                          }`}
                        >
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                        </span>
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Feedback on Router Setup */}
            {showResults && (
              <div
                className={`p-4 rounded border text-sm ${
                  isRouterSecurityCorrect
                    ? "bg-green-950/40 border-green-500 text-green-300"
                    : "bg-red-950/40 border-red-500 text-red-300"
                }`}
              >
                <div className="font-bold font-mono text-base mb-1">
                  {isRouterSecurityCorrect
                    ? "[ROUTER CONFIGURATION OPTIMAL]"
                    : "[SECURITY CONFIGURATION FLAW DETECTED]"}
                </div>
                <p>
                  {isRouterSecurityCorrect ? (
                    <>
                      Correct. <strong>{ALL_SECURITY_OPTIONS[currentScenario.targetSecureOption].label}</strong> is the best security choice for this configuration profile.
                    </>
                  ) : (
                    <>
                      The selected option (
                      {selectedSecurityOption
                        ? ALL_SECURITY_OPTIONS[selectedSecurityOption].label
                        : "None selected"}
                      ) is insecure or suboptimal. The best option for this AP setup is{" "}
                      <strong>{ALL_SECURITY_OPTIONS[currentScenario.targetSecureOption].label}</strong>.
                    </>
                  )}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 2: SECURITY PROTOCOLS & CRYPTOGRAPHIC STANDARDS           */}
        {/* ================================================================= */}
        <section className="terminal-box border-l-4 border-l-blue-500">
          <div className="mb-4 pb-3 border-b border-border">
            <span className="text-xs text-accent font-mono uppercase tracking-wider">[SECTION 2]</span>
            <h2 className="text-xl font-bold text-slate-100">
              Wireless Security Protocols & Threat Knowledge
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Verify your understanding of WEP, WPA, WPA2, WPA3, Open Wi-Fi risks, and WPS vulnerabilities.
            </p>
          </div>

          <div className="space-y-6">
            {securityQuestions.map((q, idx) => {
              const isCorrect = isQuestionCorrect(q.id, q.answer);
              const userAnswer = generalAnswers[q.id] || "";

              return (
                <div
                  key={q.id}
                  className="border-b border-border/50 pb-5 last:border-0 space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-accent font-mono text-sm font-bold shrink-0">
                      [2.{idx + 1}]
                    </span>
                    <div className="flex-grow">
                      <p className="text-sm font-semibold text-slate-200">{q.prompt}</p>
                    </div>
                  </div>

                  <div className="ml-7 max-w-xl">
                    <select
                      className={`w-full bg-slate-900 border p-2 text-sm rounded font-mono focus:border-accent outline-none ${
                        showResults
                          ? isCorrect
                            ? "border-green-500 text-green-400"
                            : "border-red-500 text-red-400"
                          : "border-border text-slate-200"
                      }`}
                      value={userAnswer}
                      onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                      disabled={showResults}
                    >
                      <option value="">-- Select Security Parameter --</option>
                      {q.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>

                    {showResults && !isCorrect && (
                      <div className="text-xs text-red-400 mt-1.5 space-y-0.5">
                        <div className="font-mono">Expected: {q.answer}</div>
                        <div className="text-slate-400">{q.explanation}</div>
                      </div>
                    )}
                    {showResults && isCorrect && (
                      <div className="text-xs text-green-400 mt-1">Correct: {q.explanation}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 3: 2.4 GHz vs 5 GHz FREQUENCIES & CHANNELS               */}
        {/* ================================================================= */}
        <section className="terminal-box border-l-4 border-l-cyan-500">
          <div className="mb-4 pb-3 border-b border-border">
            <span className="text-xs text-accent font-mono uppercase tracking-wider">[SECTION 3]</span>
            <h2 className="text-xl font-bold text-slate-100">
              Radio Frequencies & Channels (2.4 GHz vs 5 GHz)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Test channel overlap, propagation physics, range, wall penetration, and environmental interference sources.
            </p>
          </div>

          <div className="space-y-6">
            {frequencyQuestions.map((q, idx) => {
              const isCorrect = isQuestionCorrect(q.id, q.answer);
              const userAnswer = generalAnswers[q.id] || "";

              return (
                <div
                  key={q.id}
                  className="border-b border-border/50 pb-5 last:border-0 space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-accent font-mono text-sm font-bold shrink-0">
                      [3.{idx + 1}]
                    </span>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded">
                          {q.category}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-slate-200">{q.prompt}</p>
                    </div>
                  </div>

                  <div className="ml-7 max-w-xl">
                    <select
                      className={`w-full bg-slate-900 border p-2 text-sm rounded font-mono focus:border-accent outline-none ${
                        showResults
                          ? isCorrect
                            ? "border-green-500 text-green-400"
                            : "border-red-500 text-red-400"
                          : "border-border text-slate-200"
                      }`}
                      value={userAnswer}
                      onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                      disabled={showResults}
                    >
                      <option value="">-- Select RF Specification --</option>
                      {q.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>

                    {showResults && !isCorrect && (
                      <div className="text-xs text-red-400 mt-1.5 space-y-0.5">
                        <div className="font-mono">Expected: {q.answer}</div>
                        <div className="text-slate-400">{q.explanation}</div>
                      </div>
                    )}
                    {showResults && isCorrect && (
                      <div className="text-xs text-green-400 mt-1">Correct: {q.explanation}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================================================================= */}
        {/* VALIDATION & CONTROL ACTIONS                                      */}
        {/* ================================================================= */}
        <div className="terminal-box bg-slate-900 border-accent/40 flex flex-col items-center gap-4 p-6">
          {!showResults ? (
            <button
              type="button"
              onClick={handleValidate}
              className="px-8 py-3 bg-accent text-slate-900 font-bold rounded hover:bg-emerald-400 transition-all font-mono text-base shadow-lg hover:shadow-emerald-500/20 active:scale-95"
            >
              [VALIDATE WIRELESS 802.11 CONFIGURATION]
            </button>
          ) : (
            <div className="w-full text-center space-y-4">
              <div
                className={`p-5 rounded-lg border ${
                  allPassed
                    ? "bg-green-950/50 text-green-400 border-green-500"
                    : "bg-red-950/50 text-red-400 border-red-500"
                }`}
              >
                <div className="text-2xl font-bold font-mono mb-2">
                  {allPassed ? "[SYSTEM VALIDATION PASSED]" : "[DIAGNOSTIC MISMATCH DETECTED]"}
                </div>
                <p className="text-sm mb-3">
                  Score: {totalCorrect} / {totalQuestions} (
                  {Math.round((totalCorrect / totalQuestions) * 100)}%)
                </p>

                {/* Breakdown by section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono text-left max-w-2xl mx-auto bg-slate-950/70 p-3 rounded border border-slate-800">
                  <div className={isRouterSecurityCorrect ? "text-emerald-400" : "text-red-400"}>
                    Sec 1 Router: {isRouterSecurityCorrect ? "1/1" : "0/1"}
                  </div>
                  <div className={secQuestionsCorrect === securityQuestions.length ? "text-emerald-400" : "text-amber-400"}>
                    Sec 2 Protocols: {secQuestionsCorrect}/{securityQuestions.length}
                  </div>
                  <div className={freqQuestionsCorrect === frequencyQuestions.length ? "text-emerald-400" : "text-amber-400"}>
                    Sec 3 RF/Freq: {freqQuestionsCorrect}/{frequencyQuestions.length}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <button
                  type="button"
                  onClick={handleResetAndScramble}
                  className="px-6 py-2.5 border border-accent text-accent font-bold rounded hover:bg-accent/10 transition-colors font-mono text-sm"
                >
                  [RESET FIRMWARE & SCRAMBLE QUESTIONS]
                </button>
                <button
                  type="button"
                  onClick={handleNextRandomScenario}
                  className="px-6 py-2.5 bg-slate-800 border border-slate-600 text-slate-200 font-bold rounded hover:bg-slate-700 transition-colors font-mono text-sm"
                >
                  [TEST NEW AP SCENARIO]
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
