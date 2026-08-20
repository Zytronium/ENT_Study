"use client";

import { useState, useCallback, useEffect, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface QuizQuestion {
  id: string;
  category: "IPv4 Architecture" | "Public vs Private & NAT" | "Special Addressing" | "IPv6 Architecture";
  prompt: string;
  answer: string;
  options: string[];
  aliases: string[];
  explanation: string;
  canTypeInHardMode: boolean;
}

function isValidIPv4(ip: string): boolean {
  const parts = ip.split(".");
  if (parts.length !== 4) return false;
  return parts.every((p) => {
    if (!/^\d+$/.test(p)) return false;
    const num = Number(p);
    return num >= 0 && num <= 255 && (p === "0" || !p.startsWith("0"));
  });
}

function isPublicIPv4(ip: string): boolean {
  if (!isValidIPv4(ip)) return false;
  const [o1, o2] = ip.split(".").map(Number);
  if (o1 === 0 || o1 === 10 || o1 === 127) return false;
  if (o1 === 172 && o2 >= 16 && o2 <= 31) return false;
  if (o1 === 192 && o2 === 168) return false;
  if (o1 === 169 && o2 === 254) return false;
  if (o1 >= 224) return false;
  return true;
}

function generateRandom192(): string {
  const o3 = Math.floor(Math.random() * 256);
  const o4 = Math.floor(Math.random() * 254) + 1;
  return `192.168.${o3}.${o4}`;
}

function generateRandomPublicIPv4(exclude: string[]): string {
  const validFirstOctets = [
    24, 38, 44, 50, 63, 64, 72, 81, 93, 104, 115, 128, 136, 142, 151, 162, 173, 185, 198, 203, 209, 216,
  ];
  for (let attempts = 0; attempts < 100; attempts++) {
    const o1 = validFirstOctets[Math.floor(Math.random() * validFirstOctets.length)];
    const o2 = Math.floor(Math.random() * 254) + 1;
    const o3 = Math.floor(Math.random() * 254) + 1;
    const o4 = Math.floor(Math.random() * 254) + 1;
    const candidate = `${o1}.${o2}.${o3}.${o4}`;
    if (isPublicIPv4(candidate) && !exclude.includes(candidate)) {
      return candidate;
    }
  }
  return "203.0.113.45";
}

function createPublicIpQuestion(userIp: string): QuizQuestion {
  const random192 = generateRandom192();
  const pub1 = generateRandomPublicIPv4([userIp]);
  const pub2 = generateRandomPublicIPv4([userIp, pub1]);
  const options = [userIp, random192, pub1, pub2];

  return {
    id: "q-user-public-ip",
    category: "Public vs Private & NAT",
    prompt: "Find out what your current public IPv4 address is (as seen by internet servers). Which of the following is your active public IPv4 address?",
    answer: userIp,
    options,
    aliases: [userIp],
    explanation: `Your current public IPv4 address is ${userIp}. Internal network devices with private addresses (such as ${random192}) share this single globally unique public IP via NAT when communicating over the internet.`,
    canTypeInHardMode: true,
  };
}

function createWindowsPublicIpQuestion(): QuizQuestion {
  return {
    id: "q-user-public-ip",
    category: "Public vs Private & NAT",
    prompt: "How would a user find out their current public IPv4 address on a Windows computer?",
    answer: "Visit an IP lookup website or run 'ipconfig' in Command Prompt",
    options: [
      "Visit an IP lookup website or run ipconfig in Command Prompt",
      "You can't, you can only see your private IP address",
      "Check the local loopback adapter configuration at 127.0.0.1",
      "Inspect the physical MAC address in the network adapter properties",
    ],
    aliases: [
      "visit an ip lookup website or run ipconfig in Command Prompt",
      "run ipconfig in command prompt or visit an ip lookup website",
      "what is my ip",
      "search what is my ip",
      "web browser",
      "search what is my ip in a web browser",
      "browser",
      "ip lookup website",
      "ipconfig",
      "ip config",
      "command prompt",
      "command",
      "cmd prompt",
      "cmd",
      "ipconfig in command prompt",
      "run ipconfig",
      "ipconfig and search what is my ip",
      "ipconfig and web browser",
      "ipconfig and ip lookup website",
      "search what is my ip and ipconfig",
      "web browser and ipconfig",
      "ip lookup website and ipconfig",
      "ip lookup service",
      "search whats my ip",
      "whats my ip",
      "what's my ip",
      "search what's my ip",
      "ipconfig and search whats my ip",
      "ipconfig and whats my ip",
      "search whats my ip and ipconfig",
      "whats my ip and ipconfig",
      "ipconfig or ip lookup",
      "ipconfig or web browser",
      "ipconfig or search what is my ip",
      "ipconfig or ip lookup website",
      "ipconfig or search whats my ip",
    ],
    explanation: "Running 'ipconfig' in Command Prompt displays your local private IP address. To find the public IP address assigned by your ISP, search 'what is my IP' in a web browser or use an online IP lookup service.",
    canTypeInHardMode: false,
  };
}

const INITIAL_QUESTIONS: QuizQuestion[] = [
  {
    id: "q-ipv4-bit-length",
    category: "IPv4 Architecture",
    prompt: "What is the total bit length of an IPv4 address?",
    answer: "32 bits",
    options: ["32 bits", "128 bits", "48 bits", "64 bits"],
    aliases: ["32", "32 bits", "32 bit", "32-bit", "32bits", "32b"],
    explanation: "IPv4 addresses are 32-bit dotted decimal addresses composed of 4 octets (8 bits each).",
    canTypeInHardMode: true,
  },
  {
    id: "q-ipv4-components",
    category: "IPv4 Architecture",
    prompt: "An IPv4 address is structurally divided into which two primary parts?",
    answer: "Network and Host IP",
    options: [
      "Network and Host IP",
      "Prefix and Interface ID",
      "OUI and Vendor Assigned ID",
      "Transport Port and Socket",
    ],
    aliases: [
      "network and host",
      "network & host",
      "network and host ip",
      "network & host ip",
      "network and host parts",
      "host and network",
      "host & network",
      "host ip and network",
      "host ip & network",
      "host and network parts",
    ],
    explanation: "An IPv4 address consists of two structural components: the Network part and the Host IP part.",
    canTypeInHardMode: true,
  },
  {
    id: "q-ipv4-octet-range",
    category: "IPv4 Architecture",
    prompt: "What is the valid decimal numerical range for each 8-bit octet in an IPv4 address?",
    answer: "0 to 255",
    options: ["0 to 255", "1 to 254", "0 to 127", "0 to 256"],
    aliases: [
      "0 to 255",
      "0-255",
      "0 - 255",
      "0..255",
      "0 through 255",
      "0, 255",
      "0,255",
    ],
    explanation: "Each of the 4 octets is 8 bits in size, allowing a decimal value range from 0 to 255.",
    canTypeInHardMode: true,
  },
  {
    id: "q-ipv4-total-space",
    category: "IPv4 Architecture",
    prompt: "Approximately how many unique address combinations exist in the complete 32-bit IPv4 address space?",
    answer: "Over 4 billion",
    options: ["Over 4 billion", "Over 16 million", "Over 65 thousand", "Over 340 undecillion"],
    aliases: [
      "4 billion",
      "4 bilion",
      "over 4 billion",
      "over 4 bilion",
      "over 4b",
      "4b",
      "4b+",
      "4+ billion",
      "4+ bilion",
      "4 billion+",
      "4 bilion+",
      "4,000,000,000",
      "4000000000",
      "4,000,000,000",
    ],
    explanation: "With 32 bits of addressing, IPv4 provides over 4 billion (2^32) unique possible addresses.",
    canTypeInHardMode: true,
  },
  {
    id: "q-public-private-split-reason",
    category: "Public vs Private & NAT",
    prompt: "What primary factor necessitated the division of IPv4 into public and private address allocations?",
    answer: "There are fewer possible IPv4 addresses than devices connected to the internet",
    options: [
      "There are fewer possible IPv4 addresses than devices connected to the internet",
      "Private addresses eliminate the operational need for local DHCP servers",
      "Public addresses cannot be routed across Layer 3 interfaces",
      "Local Ethernet switches cannot process standard 32-bit address formats",
    ],
    aliases: [],
    explanation: "Because there are fewer possible IPv4 addresses than devices on the internet, IPv4 addresses were split into public and private pools.",
    canTypeInHardMode: false,
  },
  {
    id: "q-public-ip-characteristics",
    category: "Public vs Private & NAT",
    prompt: "Which statement accurately describes public IPv4 addresses?",
    answer: "They are globally unique and allow communication over the internet",
    options: [
      "They are globally unique and allow communication over the internet",
      "They are assigned locally by internal client operating systems via APIPA",
      "They are restricted exclusively to small private home local area networks",
      "They cannot be translated by NAT-enabled border routing equipment",
    ],
    aliases: [],
    explanation: "Public IP addresses allow devices to communicate over the internet, are globally unique, and are typically assigned to routers by an ISP.",
    canTypeInHardMode: false,
  },
  {
    id: "q-nat-translation",
    category: "Public vs Private & NAT",
    prompt: "Which mechanism allows a router to translate internal private IP addresses to a public IP address for internet access?",
    answer: "NAT (Network Address Translation)",
    options: [
      "NAT (Network Address Translation)",
      "DHCP (Dynamic Host Configuration Protocol)",
      "DNS (Domain Name System)",
      "ARP (Address Resolution Protocol)",
    ],
    aliases: [
      "nat",
      "network address translation",
      "nat (network address translation)",
    ],
    explanation: "When an internal device accesses the internet, the router uses NAT (Network Address Translation) to translate private IPs into the network's public IP.",
    canTypeInHardMode: true,
  },
  createWindowsPublicIpQuestion(),
  {
    id: "q-private-dhcp",
    category: "Public vs Private & NAT",
    prompt: "Which network component is responsible for dynamically assigning private IP addresses to local client devices?",
    answer: "DHCP server",
    options: ["DHCP server", "DNS server", "ISP gateway router", "Default web proxy"],
    aliases: [
      "dhcp",
      "dhcp server",
      "dynamic host configuration protocol",
      "dynamic host configuration protocol server",
    ],
    explanation: "Private IP addresses are assigned to individual devices on a network by a DHCP server.",
    canTypeInHardMode: true,
  },
  {
    id: "q-loopback-address",
    category: "Special Addressing",
    prompt: "Which IPv4 address is specifically designated as the local host loopback address?",
    answer: "127.0.0.1",
    options: ["127.0.0.1", "169.254.0.1", "192.168.0.1", "10.0.0.1"],
    aliases: ["127.0.0.1", "127.0.0.1/8", "127.0.0.0"],
    explanation: "127.0.0.1 is designated as the IPv4 loopback address for internal host stack testing.",
    canTypeInHardMode: true,
  },
  {
    id: "q-apipa-address",
    category: "Special Addressing",
    prompt: "What does an assigned 169.254.X.X IP address indicate on a Windows host?",
    answer: "The DHCP server could not be reached and the device cannot access the internet",
    options: [
      "The DHCP server could not be reached and the device cannot access the internet",
      "The host successfully received a routable public IP address from the ISP",
      "The router configured a permanent static NAT translation mapping",
      "The local host completed a successful internal loopback diagnostic check",
    ],
    aliases: [],
    explanation: "169.254.X.X represents APIPA (Automatic Private IP Addressing). On Windows, this means the DHCP server could not be contacted and the device cannot reach the internet.",
    canTypeInHardMode: false,
  },
  {
    id: "q-ipv6-characteristics",
    category: "IPv6 Architecture",
    prompt: "What is the total bit length and numbering system used for IPv6 addresses?",
    answer: "128-bit hexadecimal address",
    options: [
      "128-bit hexadecimal address",
      "32-bit dotted decimal address",
      "48-bit hexadecimal address",
      "64-bit binary address",
    ],
    aliases: [
      "128-bit hexadecimal",
      "128-bit hex",
      "128 bit hexadecimal",
      "128 bits hexadecimal",
      "128-bit hexadecimal address",
      "128-bit hex address",
      "128 bit hexadecimal address",
      "128 bits hexadecimal address",
    ],
    explanation: "IPv6 uses a 128-bit hexadecimal address format (for example: 2001:0db8:85a3:0020:0000:8a2e:0370:7334).",
    canTypeInHardMode: true,
  },
  {
    id: "q-ipv6-parts",
    category: "IPv6 Architecture",
    prompt: "An IPv6 address is structurally divided into which two primary components?",
    answer: "Prefixes and Host IDs",
    options: [
      "Prefixes and Host IDs",
      "Network numbers and Subnet masks",
      "OUI segments and Vendor NICs",
      "Dotted octets and Socket numbers",
    ],
    aliases: [
      "prefixes and host ids",
      "prefixes & host ids",
      "prefixes and host id",
      "prefix and host id",
      "prefix and host ids",
      "prefixes and host",
    ],
    explanation: "An IPv6 address consists of 2 parts: Prefixes and Host IDs.",
    canTypeInHardMode: true,
  },
  {
    id: "q-ipv6-total-space",
    category: "IPv6 Architecture",
    prompt: "What is the total theoretical address capacity of the 128-bit IPv6 address pool?",
    answer: "Over 340 undecillion (2^128)",
    options: [
      "Over 340 undecillion (2^128)",
      "Over 4 billion (2^32)",
      "Over 16 million (2^24)",
      "Over 65 thousand (2^16)",
    ],
    aliases: [
      "340 undecillion",
      "340 undecilion",
      "over 340 undecillion",
      "over 340 undecilion",
      "340 undecillion (2^128)",
      "340 undecilion (2^128)",
      "over 340 undecillion (2^128)",
      "over 340 undecilion (2^128)",
      "2^128",
      "2¹²⁸",
    ],
    explanation: "IPv6 provides over 340 Undecillion (or 2^128) unique possible addresses.",
    canTypeInHardMode: true,
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

function validateQuestionInput(question: QuizQuestion, input: string): boolean {
  if (!input) return false;
  if (input === question.answer) return true;
  const clean = normalizeInput(input);
  if (clean === normalizeInput(question.answer)) return true;
  return question.aliases.some((alias) => clean === normalizeInput(alias));
}

function NetworkLayerIPAddressesQuizContent() {
  const searchParams = useSearchParams();
  const isMastery = searchParams.get("mastery") === "true";

  const [hasCompletedOnce, setHasCompletedOnce] = useState<boolean>(false);
  const isHardMode = isMastery || hasCompletedOnce;

  const [userPublicIp, setUserPublicIp] = useState<string | null>(null);

  const [questions, setQuestions] = useState<QuizQuestion[]>(() =>
    isMastery ? shuffleArray(INITIAL_QUESTIONS) : INITIAL_QUESTIONS
  );

  useEffect(() => {
    let isMounted = true;
    async function detectPublicIp() {
      const endpoints = [
        "https://api4.ipify.org?format=json",
        "https://api.ipify.org?format=json",
        "https://api4.my-ip.io/ip.json",
      ];

      for (const endpoint of endpoints) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 3500);
          const res = await fetch(endpoint, { signal: controller.signal });
          clearTimeout(timeoutId);
          if (!res.ok) continue;
          const data = await res.json();
          const ip = data?.ip;
          if (ip && typeof ip === "string" && isPublicIPv4(ip)) {
            if (!isMounted) return;
            setUserPublicIp(ip);
            setQuestions((prev) =>
              prev.map((q) => (q.id === "q-user-public-ip" ? createPublicIpQuestion(ip) : q))
            );
            return;
          }
        } catch {
          // Continue to next endpoint or fallback
        }
      }
    }

    detectPublicIp();
    return () => {
      isMounted = false;
    };
  }, []);

  const shuffledOptions = useMemo(() => {
    const map: Record<string, string[]> = {};
    questions.forEach((q) => {
      map[q.id] = shuffleArray(q.options);
    });
    return map;
  }, [questions]);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const totalQuestions = questions.length;

  const results = useMemo(() => {
    if (!showResults) return { questionResults: {}, correctCount: 0 };

    let count = 0;
    const qResults: Record<string, boolean> = {};

    questions.forEach((q) => {
      const isCorrect = validateQuestionInput(q, answers[q.id] || "");
      qResults[q.id] = isCorrect;
      if (isCorrect) count++;
    });

    return { questionResults: qResults, correctCount: count };
  }, [showResults, questions, answers]);

  const allCorrect = showResults && results.correctCount === totalQuestions;

  const handleAnswerChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleValidate = () => {
    setShowResults(true);
    let count = 0;
    questions.forEach((q) => {
      if (validateQuestionInput(q, answers[q.id] || "")) count++;
    });

    if (count === totalQuestions && !hasCompletedOnce) {
      setHasCompletedOnce(true);
    }
  };

  const handleResetAndScramble = useCallback(() => {
    const customQ =
      userPublicIp && isPublicIPv4(userPublicIp)
        ? createPublicIpQuestion(userPublicIp)
        : createWindowsPublicIpQuestion();
    const allQs = INITIAL_QUESTIONS.map((q) => (q.id === "q-user-public-ip" ? customQ : q));
    setQuestions(shuffleArray(allQs));
    setAnswers({});
    setShowResults(false);
  }, [userPublicIp]);

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-8">
      {/* Header */}
      <header className="w-full max-w-4xl mb-8 cyber-glass-panel p-4 sm:p-5 rounded-xl border border-slate-800 shadow-xl flex flex-wrap justify-between items-center gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-1.5 py-0.5 rounded">
              DIAGNOSTIC_MODULE
            </span>
            <span className="text-xs text-slate-500 font-mono">{"//"}</span>
            <span className="text-xs text-slate-400 font-mono">LAYER_3_IP_ADDRESSING</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="text-emerald-400 font-mono">ENT_ROUTER_V1</span>
            <span className="text-slate-600 font-light">|</span>
            <span className="text-slate-200">Network Layer - IP Addresses</span>
          </h1>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <Link
            href="/study-guide#network-layer---ip-addresses"
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
        {/* Main Quiz Section */}
        <section className="terminal-box border-l-4 border-l-emerald-500 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between pb-3 mb-4 border-b border-slate-800/80 gap-2">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
                [IP_ADDRESS_ARCHITECTURE_CHALLENGE]
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 font-mono mb-6">
            {isHardMode
              ? "Type or select the correct answer for each IPv4/IPv6 architecture, NAT, and addressing requirement."
              : "Select the correct option for each IPv4/IPv6 architecture, NAT, and addressing requirement."
            }
          </p>

          <div className="space-y-4">
            {questions.map((item, idx) => {
              const selected = answers[item.id] || "";
              const isCorrect = results.questionResults[item.id];
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
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/40 border border-cyan-900/50 px-1.5 py-0.5 rounded">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 font-medium mb-3">{item.prompt}</p>

                      {shouldType ? (
                        <div className="mt-2">
                          <input
                            type="text"
                            disabled={showResults}
                            value={selected}
                            onChange={(e) => handleAnswerChange(item.id, e.target.value)}
                            placeholder="Type the answer..."
                            className="w-full bg-slate-950 border border-slate-700 p-2.5 rounded-lg font-mono text-xs sm:text-sm text-slate-100 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 disabled:opacity-60"
                          />
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 gap-2 mt-2">
                          {shuffledOptions[item.id].map((opt) => {
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
                          {!isCorrect && shouldType && (
                            <div className="mt-1 text-slate-300">
                              Expected answer: <span className="font-bold text-emerald-400">{item.answer}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Validation & Reset Section */}
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
                      <span>[OK]</span> SUCCESS: NETWORK LAYER IP KNOWLEDGE VALIDATED
                    </span>
                    <p className="text-xs sm:text-sm text-emerald-300/90 font-mono">
                      All IPv4 and IPv6 architecture, address ranges, NAT mechanisms, and special address types verified.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-lg sm:text-xl font-bold font-mono text-rose-400 flex items-center gap-2">
                      <span>[!]</span> CONFIGURATION MISMATCH DETECTED
                    </span>
                    <p className="text-xs sm:text-sm text-rose-300/90 font-mono">
                      {totalQuestions - results.correctCount} item(s) failed validation. Review highlighted errors above.
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

export default function NetworkLayerIPAddressesPage() {
  return (
    <Suspense fallback={null}>
      <NetworkLayerIPAddressesQuizContent />
    </Suspense>
  );
}
