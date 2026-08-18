"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

interface StudyTopicLinkProps {
  href: string;
  title: string;
  date: string;
  description: string;
  offline?: boolean;
  mastery: boolean;
}

function StudyTopicLink({ href, title, date, description, offline, mastery }: StudyTopicLinkProps) {
  if (mastery)
    href += "?mastery=true";
  return (
    <Link
      href={href}
      className="p-4 bg-slate-800 hover:bg-slate-700 border border-border rounded transition-colors group"
    >
      <div className="flex justify-between items-center">
        <span className="text-accent group-hover:underline">{">"} {title} {offline && (<span
          className="text-red-500 text-xs ml-2">[OFFLINE]</span>)}</span>
        <span className="text-xs text-slate-500">[{date}]</span>
      </div>
      <p className="text-sm text-slate-400 mt-2">{description}</p>
    </Link>
  );
}

const studyTopics: Array<{
  href: string;
  title: string;
  date: string;
  description: string;
  offline?: boolean;
}> = [
  {
    href: "/osi-model",
    title: "OSI Model",
    date: "8/10-12/26",
    description: "The 7 layers of the Open Systems Interconnection model.",
  },
  {
    href: "/networking-tools",
    title: "Networking Tools",
    date: "8/11/26",
    description: "Tools of the trade for networking professionals.",
  },
  {
    href: "/modem-router",
    title: "Modems VS Routers",
    date: "8/11/26",
    description: "Difference between modems and routers.",
  },
  {
    href: "/eia-tia-standard",
    title: "EIA/TIA 568B Standard Specification",
    date: "8/11/26",
    description: "Order of the colored wires in a CAT5/CAT6 cable plug.",
  },
  {
    href: "/bits-nibbles-bytes",
    title: "Bits, Nibbles, and Bytes",
    date: "8/13/26",
    description: "Bits, nibbles, bytes, kilobits, megabytes, etc.",
  },
  {
    href: "/binary-calculation",
    title: "Binary Calculation",
    date: "8/13/26",
    description: "Calculating binary numbers.",
  },
  {
    href: "/communication-types",
    title: "Communication Types",
    date: "8/13/26",
    description: "Simplex, Half-Duplex, Full Duplex.",
  },
  {
    href: "/network-topologies",
    title: "Wired Network Topologies",
    date: "8/14/26",
    description: "Network layouts; Star, ring, bus, mesh.",
  },
  {
    href: "/802.3-ethernet-standards",
    title: "Wired Ethernet Standards",
    date: "8/14/26",
    description: "802.3 wired ethernet IEEE standards chart.",
  },
  {
    href: "/patch-vs-crossover-cables",
    title: "Patch VS Crossover Cables",
    date: "8/14/26",
    description: "Patch (straight) cables VS crossover cables and shielded vs unshielded twisted pairs.",
  },
  {
    href: "/cable-ratings",
    title: "Cable Ratings",
    date: "8/14/26",
    description: "PVC vs Plenum-rated cable specifications and fire safety ratings.",
  },
  {
    href: "/esd-emi-emp",
    title: "ESD, EMI, & EMP",
    date: "8/14/26",
    description: "Electrostatic discharges, electromagnetic interference, and electromagnetic pulses.",
  },
  {
    href: "/wireless-802-11",
    title: "Wireless 802.11",
    date: "8/18/26",
    description: "Radio frequencies (2.4/5 GHz) and wireless security (WPA2/WPA3 router setup simulator).",
  },
  {
    href: "/802.11-wireless-standards",
    title: "Wireless Wi-Fi Standards",
    date: "8/18/26",
    description: "802.11 wireless standards chart, frequencies, speeds, and laboratory distances.",
  },
  {
    href: "/wired-vs-wireless",
    title: "Wired VS Wireless",
    date: "8/18/26",
    description: "Comparing wired vs wireless characteristics and contention methods (CSMA/CD vs CSMA/CA).",
  },
];

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

export default function Home() {
  const [isMasteryMode, setIsMasteryMode] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [uptimeSeconds, setUptimeSeconds] = useState(0);
  const tooltipRef = useRef<HTMLDivElement>(null);

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
    <div className="min-h-screen flex flex-col items-center p-8">
      <header className="w-full max-w-4xl mb-12 border-b border-border pb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold text-accent">ENT_ROUTER_V1 | Hub</h1>
          <div className="flex flex-col xs:flex-row gap-4 items-start xs:items-center w-full sm:w-auto">
          <div className="relative" ref={tooltipRef}>
              <button
                onClick={() => setIsMasteryMode(!isMasteryMode)}
                className={`px-4 py-2 rounded border transition-colors ${
                  isMasteryMode
                    ? "bg-accent text-slate-900 border-accent hover:bg-green-400"
                    : "bg-slate-800 text-accent border-border hover:bg-slate-700"
                }`}
              >
                <span className="flex items-center gap-2">
                  {isMasteryMode ? "[MASTERY: ON]" : "[MASTERY: OFF]"}
                  <span
                    className="inline-flex items-center justify-center w-3 h-3 text-xs border border-current rounded-full cursor-help"
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
                  >
                    i
                  </span>
                </span>
              </button>
              {showTooltip && (
                <div
                  className="absolute top-full right-0 mt-2 w-64 p-3 bg-slate-800 border border-border rounded shadow-lg text-sm text-slate-300 z-10">
                  Skips to final hard mode on first attempt on all study quizes when on.
                </div>
              )}
            </div>
            <Link href="/study-guide" className="text-accent hover:underline">
              {">"} Study Guide
            </Link>
          </div>
        </div>
        <p className="text-sm text-slate-400">System Uptime: {formatUptime(uptimeSeconds)}</p>
      </header>

      <main className="w-full flex justify-center">
        <section className="terminal-box border-l-4 border-l-accent">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            [STUDY_TOPICS]
          </h2>
          <nav className="flex flex-col gap-4">
            {studyTopics.map((topic) => (
              <StudyTopicLink
                key={topic.href}
                href={topic.href}
                title={topic.title}
                date={topic.date}
                description={topic.description}
                offline={topic.offline ?? false}
                mastery={isMasteryMode}
              />
            ))}
          </nav>
        </section>
      </main>
    </div>
  );
}
