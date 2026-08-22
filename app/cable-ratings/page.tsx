"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import MultiSectionQuiz, { MultiSectionConfig } from "@/components/study-quiz/MultiSectionQuiz";
import { QuestionQuizItem } from "@/components/study-quiz/QuestionQuiz";

type CableRating = "CMP (Plenum)" | "CMR (Riser)" | "CM (General Use)";
const CABLE_RATINGS: CableRating[] = ["CMP (Plenum)", "CMR (Riser)", "CM (General Use)"];

// -------- question data --------

const initialZones: QuestionQuizItem[] = [
  {
    id: "zone-drop-ceiling-f2",
    category: "ZONE-A",
    prompt: "Floor 2 Drop Ceiling (HVAC Return Air Plenum): Air-handling space, burning cable smoke circulates building-wide via ductwork.",
    options: CABLE_RATINGS,
    answer: "CMP (Plenum)",
    explanation: "Air-handling return air spaces require CMP (Plenum) cables because they produce low smoke and non-toxic fumes in a fire.",
    canTypeInHardMode: true,
    aliases: ["cmp", "plenum", "cmp plenum", "cmp (plenum)"],
    keywords: ["cmp"],
  },
  {
    id: "zone-riser-shaft-f1-f2",
    category: "ZONE-B",
    prompt: "Vertical Utility Shaft Between Floors 1 & 2: Acts as a chimney in a fire, cables must stop flames climbing floor to floor.",
    options: CABLE_RATINGS,
    answer: "CMR (Riser)",
    explanation: "Vertical shafts between floors require CMR (Riser) rated cables to prevent fire from traveling vertically between floors.",
    canTypeInHardMode: true,
    aliases: ["cmr", "riser", "cmr riser", "cmr (riser)"],
    keywords: ["cmr"],
  },
  {
    id: "zone-cubicle-patch-f1",
    category: "ZONE-D",
    prompt: "Floor 1 Office Desk Run (Patch Cord): Single-room horizontal run, no HVAC or floor slab penetration.",
    options: CABLE_RATINGS,
    answer: "CM (General Use)",
    explanation: "Standard patch runs across a single open room or within furniture channels only require CM (General Use) cable.",
    canTypeInHardMode: true,
    aliases: ["cm", "general use", "general", "cm general use", "cm (general use)"],
    keywords: ["cm"],
  },
  {
    id: "zone-raised-floor-server",
    category: "ZONE-C",
    prompt: "Floor 1 Server Room Raised Floor (Underfloor HVAC Plenum): Underfloor HVAC air circulation, non-plenum cables release poisonous gases into the server room.",
    options: CABLE_RATINGS,
    answer: "CMP (Plenum)",
    explanation: "Raised flooring used for environmental air distribution is classified as a plenum space and requires CMP cable.",
    canTypeInHardMode: true,
    aliases: ["cmp", "plenum", "cmp plenum", "cmp (plenum)"],
    keywords: ["cmp"],
  },
  {
    id: "zone-elevator-chase",
    category: "ZONE-E",
    prompt: "Multi-Story Elevator Shaft Penetration: Open vertical shaft, requires flame-retardant properties to stop vertical flame climb.",
    options: CABLE_RATINGS,
    answer: "CMR (Riser)",
    explanation: "Vertical multi-story penetrations require CMR (Riser) to stop fire from rapidly ascending between floors.",
    canTypeInHardMode: true,
    aliases: ["cmr", "riser", "cmr riser", "cmr (riser)"],
    keywords: ["cmr"],
  },
];

const initialScenarios: QuestionQuizItem[] = [
  {
    id: "scen-cmp-in-riser",
    category: "Substitution Review",
    prompt: "Plenum Cable in Vertical Riser Shaft: A contractor ran CMP (Plenum) rated cable inside a vertical wall chase between Floor 1 and Floor 2 instead of CMR.",
    options: ["Compliant", "Violation"],
    answer: "Compliant",
    explanation: "CMP outranks CMR in the substitution hierarchy, so it may legally replace CMR or CM anywhere.",
    canTypeInHardMode: true,
    aliases: ["compliant", "valid", "allowed", "pass", "yes", "compliant substitution"],
  },
  {
    id: "scen-cm-in-drop-ceiling",
    category: "Substitution Review",
    prompt: "Standard CM Cable in HVAC Return Ceiling: An installer ran standard CM (General Use) patch cabling above a drop ceiling that serves as the HVAC return air plenum.",
    options: ["Compliant", "Violation"],
    answer: "Violation",
    explanation: "CM produces dense toxic smoke when burned; only CMP is rated for plenum air-handling spaces.",
    canTypeInHardMode: true,
    aliases: ["violation", "invalid", "not allowed", "fail", "no", "non-compliant", "noncompliant"],
  },
  {
    id: "scen-cmr-for-desktop",
    category: "Substitution Review",
    prompt: "Riser Cable Used for Desktop Patch Run: An IT department uses leftover CMR (Riser) spool cable for short patch cables connecting desktops to wall jacks.",
    options: ["Compliant", "Violation"],
    answer: "Compliant",
    explanation: "CMR outranks CM, so by the downward substitution rule it may be used anywhere CM is specified.",
    canTypeInHardMode: true,
    aliases: ["compliant", "valid", "allowed", "pass", "yes", "compliant substitution"],
  },
];

const initialSpecQuestions: QuestionQuizItem[] = [
  {
    id: "spec-substitution-hierarchy",
    category: "Code Substitution Hierarchy",
    prompt: "Which statement accurately describes the cable rating substitution hierarchy?",
    options: [
      "CMP can substitute for CMR and CM; CMR can substitute for CM; CM cannot substitute for either",
      "CM can substitute for both CMR and CMP",
      "CMR can substitute for CMP, but not the reverse",
      "All ratings are fully interchangeable",
    ],
    answer: "CMP can substitute for CMR and CM; CMR can substitute for CM; CM cannot substitute for either",
    explanation: "Higher fire-safety ratings can substitute for lower ratings (CMP > CMR > CM), but lower ratings can never substitute for higher ratings.",
    canTypeInHardMode: false,
  },
  {
    id: "spec-fume-toxicity",
    category: "Toxicity & Combustion",
    prompt: "Why is CMP required in plenum spaces instead of CMR or CM?",
    options: [
      "CMP jacket material produces significantly less smoke and toxic fumes when burned",
      "CMP supports higher gigabit throughput bandwidth",
      "CMP has thicker copper cores that resist physical tearing",
      "CMP cables are completely waterproof against flooded ducts",
    ],
    answer: "CMP jacket material produces significantly less smoke and toxic fumes when burned",
    explanation: "Because plenum spaces circulate HVAC air throughout the entire facility, cable in these areas must not produce poisonous fumes or dense smoke when burned.",
    canTypeInHardMode: false,
  },
  {
    id: "spec-vertical-shaft-chimney",
    category: "Fire Mechanics",
    prompt: "What primary fire safety hazard do CMR (Riser) rated cables prevent?",
    options: [
      "Fire spreading vertically between floors via vertical shafts",
      "Electrical sparking from unshielded twisted pair wires",
      "High voltage surges jumping to building structural steel",
      "Radio frequency interference leaking into elevator communications",
    ],
    answer: "Fire spreading vertically between floors via vertical shafts",
    explanation: "Vertical shafts act like chimneys during a fire. CMR's flame-retardant jacket is rated to stop vertical fire spread between floors.",
    canTypeInHardMode: false,
  },
];

const sections: MultiSectionConfig[] = [
  {
    id: "sec-zones",
    title: "INSTALLATION_ZONE_CLASSIFICATION",
    subtitle: "[PART_01: INSTALLATION_ZONE_CLASSIFICATION]",
    description: "Assign the minimum required cable fire safety rating (CMP, CMR, or CM) for each facility installation zone.",
    extraContent: <FacilityBlueprint />,
    type: "questions",
    questions: initialZones,
  },
  {
    id: "sec-compliance",
    title: "BUILDING_CODE_COMPLIANCE_REVIEW",
    subtitle: "[PART_02: COMPLIANCE_REVIEW]",
    description: "Evaluate the cabling inspection reports against National Electrical Code (NEC) fire safety standards.",
    type: "questions",
    questions: initialScenarios,
  },
  {
    id: "sec-specs",
    title: "CODE_SPEC_&_HIERARCHY_VALIDATION",
    subtitle: "[PART_03: CODE_SPEC_VALIDATION]",
    description: "Validate your knowledge of substitution rules, toxicity hazards, and riser fire mechanics.",
    type: "questions",
    questions: initialSpecQuestions,
  },
];

// -------- blueprint diagram (restored from legacy layout) --------

function FacilityBlueprint() {
  return (
    <div className="terminal-box border-l-4 border-l-emerald-500 shadow-2xl mb-8">
      <div className="mb-2 -mx-3 sm:mx-0 p-3 sm:p-4 rounded bg-slate-950 border border-border/80 font-mono text-xs overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
          <span className="text-accent font-bold uppercase tracking-wider text-xs sm:text-sm">
            [FACILITY BLUEPRINT: 2-STORY COMMERCIAL CROSS-SECTION]
          </span>
          <span className="text-slate-500 text-[10px] sm:text-xs">HVAC &amp; RISER SCHEMATIC</span>
        </div>

        <div className="overflow-x-auto py-1">
          <pre className="text-[7.65px] xs:text-[9px] sm:text-[11.5px] md:text-[13px] leading-[1.15] sm:leading-relaxed font-mono select-none text-slate-400 mx-auto w-fit">
{`+========================================================================+
|                       `}<span className="text-cyan-400 font-bold">[ROOFTOP HVAC AIR HANDLER]</span>{`                       |
+========================================================================+
| `}<span className="text-cyan-300 font-bold">[ZONE-A] DROP CEILING (HVAC RETURN AIR PLENUM SPACE)</span>{`                   |
| `}<span className="text-cyan-500">{`<-- <-- Exhaust / Return Air Circulation Path to Rooftop HVAC <-- <--  `}</span>{`|
+------------------------------------+------------------+----------------+
| `}<span className="text-slate-200 font-bold">[FLOOR 2] EXECUTIVE WORKSTATIONS</span>{`   | `}<span className="text-amber-300 font-bold">[ZONE-B]</span>{`         | `}<span className="text-amber-300 font-bold">[ZONE-E]</span>{`       |
|  - Desks & Wall Faceplates         | `}<span className="text-amber-400 font-bold">VERTICAL UTILITY</span>{` | `}<span className="text-amber-400 font-bold">MULTI-STORY</span>{`    |
|  - Horizontal Office Cabling       | `}<span className="text-amber-400 font-bold">RISER SHAFT</span>{`      | `}<span className="text-amber-400 font-bold">ELEVATOR SHAFT</span>{` |
|                                    | (Floor 1 <-> 2)  | CHASE          |
+====================================+                  | (All Floors)   |
| `}<span className="text-slate-500 font-bold">========== CONCRETE FLOOR SLAB / FIRE BARRIER =======</span>{` |                |
+====================================+                  |                |
| `}<span className="text-slate-200 font-bold">[FLOOR 1] MAIN OFFICES & SERVER RM</span>{` | `}<span className="text-amber-500/80">[Riser Zone]</span>{`     |                |
|  - `}<span className="text-emerald-400 font-bold">[ZONE-D] Desk Patch Cord</span>{`        |                  |                |
|    (Wall Jack ---> Desktop PC)     |                  |                |
+------------------------------------+------------------+                |
| `}<span className="text-cyan-300 font-bold">[ZONE-C] RAISED FLOOR (UNDERFLOOR HVAC PLENUM SPACE)</span>{`  |                |
| `}<span className="text-cyan-500">{`<-- Pressurized Cold Air Distribution under Racks <-- `}</span>{`| `}<span className="text-amber-500/80"> [Riser Zone]</span>{`  |
+=======================================================+================+
| `}<span className="text-slate-500 font-bold">================== GROUND CONCRETE FOUNDATION ========================</span>{` |
+========================================================================+`}
          </pre>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-800/80 text-[11px]">
          <div className="flex items-center gap-1.5 text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
            <span><strong>ZONE-A &amp; ZONE-C:</strong> Plenum Air Spaces</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
            <span><strong>ZONE-B &amp; ZONE-E:</strong> Vertical Risers</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <span><strong>ZONE-D:</strong> General Desk Run</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CableRatingsContent() {
  const searchParams = useSearchParams();
  const isMastery = searchParams.get("mastery") === "true";

  return (
      <MultiSectionQuiz
        moduleTag="DIAGNOSTIC_MODULE"
        moduleCode="CABLE_SAFETY_RATINGS"
        title="Cable Ratings (CMP vs CMR vs CM)"
        studyGuideHref="/study-guide#cable-ratings"
        sections={sections}
        initialHardMode={isMastery}
      />
  );
}

export default function CableRatingsQuiz() {
  return (
    <Suspense fallback={null}>
      <CableRatingsContent />
    </Suspense>
  );
}
