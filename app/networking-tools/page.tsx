"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import MatchToDefinitionsQuiz, { DefinitionItem } from "@/components/study-quiz/MatchToDefinitionsQuiz";

const toolsData: DefinitionItem[] = [
  {
    id: 1,
    term: "Cable Stripper",
    definition: "Strips the outer plastic of a cable",
    aliases: ["cable stripper", "wire stripper", "stripper"],
    keywords: ["stripper"],
  },
  {
    id: 2,
    term: "Wire Crimper",
    definition: "Crimps ends of twisted pair cables",
    aliases: ["wire crimper", "crimper", "cable crimper", "crimping tool"],
    keywords: ["crimp"],
  },
  {
    id: 3,
    term: "Cable Tester",
    definition: "Tests network cables by testing continuity across every pin on both ends",
    aliases: ["cable tester", "tester", "continuity tester"],
    keywords: ["cable tester"],
  },
  {
    id: 4,
    term: "Tone Generator",
    definition: "Finds the other end of a cable by generating a tone when near the other end of the cable plugged into it.",
    aliases: ["tone generator", "toner", "tone generator and probe", "fox and hound"],
    keywords: ["tone"],
  },
  {
    id: 5,
    term: "TDR (Time Domain Reflectometer)",
    definition: "Finds breaks in copper cables by sending electrical pulses and measuring how far they go",
    aliases: ["tdr", "time domain reflectometer", "tdr (time domain reflectometer)"],
    keywords: ["tdr"],
  },
  {
    id: 6,
    term: "OTDR (Optical Time Domain Reflectometer)",
    definition: "Finds breaks in fiber optic cables by sending light pulses and measuring how far they go",
    aliases: ["otdr", "optical time domain reflectometer", "otdr (optical time domain reflectometer)"],
    keywords: ["otdr"],
  },
  {
    id: 7,
    term: "Light Meter",
    definition: "Measures light in optical cables. Requires a light source device on one end. Fiber optic cables only.",
    aliases: ["light meter", "optical power meter", "power meter"],
    keywords: ["light meter"],
  },
  {
    id: 8,
    term: "Loopback Adapter",
    definition: "Tests physical ports",
    aliases: ["loopback adapter", "loopback plug", "loopback"],
    keywords: ["loopback"],
  },
  {
    id: 9,
    term: "Butt Set",
    definition: "Used to test and monitor phone lines",
    aliases: ["butt set", "lineman's handset", "linemans handset", "butt-set"],
    keywords: ["butt set"],
  },
  {
    id: 10,
    term: "Punch Down Tool",
    definition: "Seats wires down into a block and cuts off excess wire automatically",
    aliases: ["punch down tool", "punchdown tool", "punch down", "punchdown"],
    keywords: ["punch"],
  },
  {
    id: 11,
    term: "Multimeter",
    definition: "Measures electricity in a wire",
    aliases: ["multimeter", "multi meter", "voltmeter", "digital multimeter", "dmm"],
    keywords: ["multimeter"],
  },
];

function NetworkingToolsQuizContent() {
  const searchParams = useSearchParams();
  const isMastery = searchParams.get("mastery") === "true";

  return (
    <MatchToDefinitionsQuiz
      moduleTag="DIAGNOSTIC_MODULE"
      moduleCode="FIELD_HARDWARE"
      title="Networking Tools"
      heading="[NETWORKING_TOOLS_IDENTIFICATION]"
      description="Match each hardware diagnostic or termination tool to its core networking function."
      selectPlaceholder="-- Select Tool --"
      studyGuideHref="/study-guide#networking-tools"
      items={toolsData}
      initialHardMode={isMastery}
      mode="select"
    />
  );
}

export default function NetworkingToolsQuiz() {
  return (
    <Suspense fallback={null}>
      <NetworkingToolsQuizContent />
    </Suspense>
  );
}
