"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import MultiSectionQuiz, { MultiSectionConfig } from "@/components/study-quiz/MultiSectionQuiz";
import { QuestionQuizItem } from "@/components/study-quiz/QuestionQuiz";

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

export interface RouterScenario {
  id: string;
  name: string;
  firmware: string;
  ssid: string;
  frequencyBand: string;
  channel: string;
  clientEnvironment: string;
  targetSecureOption: "WPA2" | "WPA3";
  insecureOptions: SecurityOptionKey[];
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

const initialSecurityQuestions: QuestionQuizItem[] = [
  {
    id: "sec-q1-wpa2-cipher",
    category: "Encryption Standards",
    prompt: "Which robust symmetric encryption algorithm is utilized by WPA2 (and approved by the US DoD)?",
    options: ["AES", "TKIP", "RC4", "DES"],
    answer: "AES",
    explanation: "WPA2 uses AES (Advanced Encryption Standard), which is used by the US Department of Defense and considered secure.",
    canTypeInHardMode: true,
    aliases: ["aes", "advanced encryption standard", "aes encryption", "aes-256", "aes 256"],
    keywords: ["aes"],
  },
  {
    id: "sec-q2-wpa-flaw",
    category: "Vulnerabilities",
    prompt: "What key mechanism does original legacy WPA utilize that renders it insecure and easily hackable today?",
    options: ["TKIP", "AES-256", "Diffie-Hellman", "RSA-4096"],
    answer: "TKIP",
    explanation: "Original WPA relied on TKIP (Temporal Key Integrity Protocol), which is no longer secure and is easily hackable.",
    canTypeInHardMode: true,
    aliases: ["tkip", "temporal key integrity protocol"],
    keywords: ["tkip"],
  },
  {
    id: "sec-q3-dod-standard",
    category: "Enterprise Standards",
    prompt: "Which Wi-Fi security standard is used by the US Department of Defense?",
    options: ["WPA2", "WEP", "WPA", "WPS"],
    answer: "WPA2",
    explanation: "WPA2 uses AES encryption and is utilized by the US Department of Defense.",
    canTypeInHardMode: true,
    aliases: ["wpa2", "wpa 2", "wpa-2", "wpa2-psk", "wpa2 enterprise"],
    keywords: ["wpa2"],
  },
  {
    id: "sec-q5-open-danger",
    category: "Open Networks",
    prompt: "Why should you never connect to an Open Wi-Fi network?",
    options: [
      "Open networks lack encryption, allowing hackers to steal data and deploy malicious honeypots",
      "Open networks immediately overload and permanently fry wireless network cards",
      "Open networks are strictly reserved for US government entities",
      "Open networks only operate on infrared light frequencies",
    ],
    answer: "Open networks lack encryption, allowing hackers to steal data and deploy malicious honeypots",
    explanation: "Open networks lack encryption, allowing data theft and potential rogue honeypots.",
    canTypeInHardMode: false,
  },
  {
    id: "sec-q6-wps-flaw",
    category: "Vulnerabilities",
    prompt: "What is the assessment of WPS (Wi-Fi Protected Setup)?",
    options: [
      "Easy to set up, but very insecure",
      "Very hard to set up, but perfectly secure",
      "Approved by the US Department of Defense",
      "Uses AES encryption with TKIP keys",
    ],
    answer: "Easy to set up, but very insecure",
    explanation: "WPS was designed for easy push-button/PIN configuration, but is known to be very insecure.",
    canTypeInHardMode: false,
  },
];

const initialFrequencyQuestions: QuestionQuizItem[] = [
  {
    id: "freq-24-total-channels",
    category: "Channels & Overlap",
    prompt: "How many total channels exist in the 2.4 GHz frequency band?",
    options: ["11 channels", "3 channels", "25 channels", "14 channels"],
    answer: "11 channels",
    explanation: "The 2.4 GHz spectrum has 11 channels total in standard North American Wi-Fi allocation.",
    canTypeInHardMode: true,
    aliases: ["11", "11 channels", "11 total channels", "11 total"],
    keywords: ["11"],
  },
  {
    id: "freq-24-non-overlap",
    category: "Channels & Overlap",
    prompt: "Which three channels in the 2.4 GHz band do NOT overlap with each other?",
    options: ["Channels 1, 6, and 11", "Channels 1, 2, and 3", "Channels 2, 7, and 11", "Channels 6, 8, and 11"],
    answer: "Channels 1, 6, and 11",
    explanation: "In the 2.4 GHz band, only Channels 1, 6, and 11 are non-overlapping with sufficient spectrum separation.",
    canTypeInHardMode: true,
    aliases: [
      "1, 6, and 11",
      "1, 6, 11",
      "1 6 11",
      "channels 1, 6, and 11",
      "channels 1, 6, 11",
      "1,6,11",
      "1/6/11",
      "channel 1, 6, 11",
    ],
    keywords: ["1", "6", "11"],
  },
  {
    id: "freq-5-non-overlap",
    category: "Channels & Overlap",
    prompt: "How many non-overlapping channels are available in the 5 GHz frequency band?",
    options: ["25 channels", "11 channels", "3 channels", "8 channels"],
    answer: "25 channels",
    explanation: "5 GHz provides 25 non-overlapping channels, greatly reducing co-channel interference.",
    canTypeInHardMode: true,
    aliases: ["25", "25 channels", "25 non-overlapping channels", "25 non overlapping"],
    keywords: ["25"],
  },
  {
    id: "freq-penetration-distance",
    category: "RF Propagation",
    prompt: "Which Wi-Fi frequency band travels a farther distance and more easily penetrates solid objects like walls?",
    options: ["2.4 GHz", "5 GHz", "60 GHz", "900 MHz"],
    answer: "2.4 GHz",
    explanation: "2.4 GHz uses longer wavelengths, allowing it to go farther and penetrate solid walls better than 5 GHz.",
    canTypeInHardMode: true,
    aliases: ["2.4 ghz", "2.4ghz", "2.4", "2.4 g"],
    keywords: ["2.4"],
  },
  {
    id: "freq-speed-comparison",
    category: "Interference & Speed",
    prompt: "Which frequency band is generally faster with higher data throughput, despite shorter range?",
    options: ["2.4 GHz", "5 GHz", "60 GHz", "900 MHz"],
    answer: "5 GHz",
    explanation: "5 GHz has wider channel bandwidths and higher frequency transmission, making it generally faster than 2.4 GHz.",
    canTypeInHardMode: true,
    aliases: ["5 ghz", "5ghz", "5", "5 g"],
    keywords: ["5"],
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
    answer: "2.4 GHz is shared by many devices",
    explanation: "2.4 GHz is crowded with consumer electronics like microwave ovens, Bluetooth gear, and cordless landlines.",
    canTypeInHardMode: false,
  },
];

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function generateRouterOptions(scenario: RouterScenario): SecurityOptionMeta[] {
  const secureKey: SecurityOptionKey = scenario.targetSecureOption;
  const secureOption = ALL_SECURITY_OPTIONS[secureKey];
  const insecureKeys: SecurityOptionKey[] = scenario.insecureOptions.slice(0, 3);
  const insecureOptions = insecureKeys.map((k) => ALL_SECURITY_OPTIONS[k]);
  return shuffleArray([secureOption, ...insecureOptions]);
}

function RouterSimSection({
  showResults,
  onValidate,
}: {
  showResults: boolean;
  onValidate: (allCorrect: boolean, score: number, total: number) => void;
}) {
  const [scenario, setScenario] = useState<RouterScenario>(() => ROUTER_SCENARIOS[0]);
  const [options, setOptions] = useState<SecurityOptionMeta[]>(() => generateRouterOptions(ROUTER_SCENARIOS[0]));
  const [selected, setSelected] = useState<SecurityOptionKey | "">("");

  const isCorrect = selected === scenario.targetSecureOption;

  const handleSelect = (key: SecurityOptionKey) => {
    setSelected(key);
  };

  const handleShuffle = () => {
    const randomIdx = Math.floor(Math.random() * ROUTER_SCENARIOS.length);
    const sc = ROUTER_SCENARIOS[randomIdx];
    setScenario(sc);
    setOptions(generateRouterOptions(sc));
    setSelected("");
  };

  return (
    <div className="space-y-6 font-mono">
      <div className="bg-slate-950/80 p-4 sm:p-6 rounded-xl border border-slate-800 space-y-4">
        <div className="flex flex-wrap justify-between items-center gap-2 pb-3 border-b border-slate-800">
          <div>
            <div className="text-xs text-slate-400">TARGET ACCESS POINT:</div>
            <div className="text-sm font-bold text-emerald-400">{scenario.name}</div>
          </div>
          <button
            type="button"
            onClick={handleShuffle}
            className="px-2.5 py-1 text-xs border border-slate-700 bg-slate-900 text-slate-300 hover:text-white rounded"
          >
            RANDOMIZE SCENARIO
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div><span className="text-slate-500">SSID:</span> <span className="text-slate-200">{scenario.ssid}</span></div>
          <div><span className="text-slate-500">Band:</span> <span className="text-slate-200">{scenario.frequencyBand}</span></div>
          <div><span className="text-slate-500">Channel:</span> <span className="text-slate-200">{scenario.channel}</span></div>
          <div><span className="text-slate-500">Firmware:</span> <span className="text-slate-200">{scenario.firmware}</span></div>
        </div>

        <div className="p-3 bg-slate-900/60 rounded border border-slate-800/80 text-xs text-slate-300">
          <span className="text-cyan-400 font-bold">Requirement:</span> {scenario.clientEnvironment}
        </div>

        <div className="pt-2">
          <div className="text-xs text-slate-400 mb-2 font-bold">SELECT SECURITY ENCRYPTION MODE:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {options.map((opt) => {
              const isSelected = selected === opt.key;
              const isOptCorrect = opt.key === scenario.targetSecureOption;

              let btnClasses = "w-full text-left p-3 rounded-lg text-xs font-mono border transition-all cursor-pointer ";
              if (showResults) {
                if (isOptCorrect) {
                  btnClasses += "bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold";
                } else if (isSelected && !isOptCorrect) {
                  btnClasses += "bg-rose-950/60 border-rose-500 text-rose-300 line-through";
                } else {
                  btnClasses += "bg-slate-950/40 border-slate-800/40 text-slate-600 opacity-60";
                }
              } else if (isSelected) {
                btnClasses += "bg-emerald-950/40 border-emerald-400 text-emerald-300 font-bold shadow-sm";
              } else {
                btnClasses += "bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300";
              }

              return (
                <button
                  key={opt.key}
                  type="button"
                  disabled={showResults}
                  onClick={() => {
                    handleSelect(opt.key);
                    onValidate(opt.key === scenario.targetSecureOption, opt.key === scenario.targetSecureOption ? 1 : 0, 1);
                  }}
                  className={btnClasses}
                >
                  <div className="font-bold flex items-center justify-between">
                    <span>{opt.label}</span>
                    <span>{isSelected ? "[●]" : "[ ]"}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">{opt.notes}</div>
                </button>
              );
            })}
          </div>
        </div>

        {showResults && (
          <div className={`p-3 rounded text-xs border ${isCorrect ? "bg-emerald-950/30 border-emerald-800/50 text-emerald-300" : "bg-rose-950/30 border-rose-800/50 text-rose-300"}`}>
            <div className="font-bold">
              {isCorrect ? "[OK] SECURE CONFIGURATION APPLIED" : `[!] INSECURE PROTOCOL SELECTED - Recommended: ${scenario.targetSecureOption}`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const sections: MultiSectionConfig[] = [
  {
    id: "sec-router-sim",
    title: "ROUTER_SECURITY_CONFIGURATION",
    subtitle: "[PART_01: WIRELESS_AP_SIMULATION]",
    description: "Inspect the access point specifications and deploy the optimal wireless encryption standard (WPA2 or WPA3).",
    type: "custom",
    renderCustom: (props) => <RouterSimSection {...props} />,
  },
  {
    id: "sec-security-specs",
    title: "SECURITY_STANDARDS_&_CIPHERS",
    subtitle: "[PART_02: ENCRYPTION_&_SECURITY_MECHANICS]",
    description: "Validate encryption algorithms, legacy vulnerabilities (WEP, TKIP), and open network security rules.",
    type: "questions",
    questions: initialSecurityQuestions,
  },
  {
    id: "sec-frequency-channels",
    title: "SPECTRUM_CHANNELS_&_PROPAGATION",
    subtitle: "[PART_03: SPECTRUM_CHANNELS_&_PROPAGATION]",
    description: "Validate 2.4 GHz non-overlapping channels (1, 6, 11), 5 GHz spectrum channels, and physical wall penetration traits.",
    type: "questions",
    questions: initialFrequencyQuestions,
  },
];

function Wireless80211Content() {
  const searchParams = useSearchParams();
  const isMastery = searchParams.get("mastery") === "true";

  return (
    <MultiSectionQuiz
      moduleTag="DIAGNOSTIC_MODULE"
      moduleCode="802.11_WIRELESS_SECURITY"
      title="Wireless 802.11 & Security"
      studyGuideHref="/study-guide#wireless-80211"
      sections={sections}
      initialHardMode={isMastery}
    />
  );
}

export default function Wireless80211Page() {
  return (
    <Suspense fallback={null}>
      <Wireless80211Content />
    </Suspense>
  );
}
