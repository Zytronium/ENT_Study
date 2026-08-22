"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import QuestionQuiz, { QuestionQuizItem } from "@/components/study-quiz/QuestionQuiz";

const QUESTIONS: QuestionQuizItem[] = [
  {
    id: "q-traffic-address",
    category: "Architecture & Tables",
    prompt: "Which address type does a Layer 2 switch use to make forwarding decisions?",
    hint: "Layer 2 hardware address",
    answer: "MAC address",
    options: ["MAC address", "IPv4 address", "Default gateway IP", "TCP port number"],
    aliases: [
      "mac",
      "mac address",
      "mac addresses",
      "media access control",
      "physical address",
      "physical addresses",
      "layer 2 address",
      "layer 2 addresses",
    ],
    keywords: ["mac"],
    explanation: "Layer 2 switches make frame forwarding decisions based on Layer 2 MAC (Media Access Control) addresses.",
    canTypeInHardMode: true,
  },
  {
    id: "q-cam-table",
    category: "Architecture & Tables",
    prompt: "Which term is an alternate name for the MAC address table on a Layer 2 switch?",
    hint: "Three-letter acronym table",
    answer: "CAM table",
    options: ["CAM table", "Routing table", "ARP table", "Big MAC"],
    aliases: [
      "cam",
      "cam table",
      "cam tables",
      "content addressable memory",
      "content addressable memory table",
    ],
    keywords: ["cam"],
    explanation: "A switch's MAC address table is also known as a CAM (Content Addressable Memory) table.",
    canTypeInHardMode: true,
  },
  {
    id: "q-table-mapping",
    category: "Architecture & Tables",
    prompt: "What relationship is mapped and maintained within a switch MAC/CAM table?",
    answer: "Physical switch ports to MAC addresses",
    options: [
      "Physical switch ports to MAC addresses",
      "Logical IP addresses to domain names",
      "Switch port numbers to default gateways",
      "MAC addresses to transport port sockets",
    ],
    aliases: [],
    explanation: "A switch's MAC/CAM table maps physical switch ports to their learned MAC addresses.",
    canTypeInHardMode: false,
  },
  {
    id: "q-unknown-mac-broadcast",
    category: "Switch Operation & Forwarding",
    prompt: "How does a Layer 2 switch handle a frame destined for an unknown MAC address?",
    answer: "Broadcasts the frame on all ports except the sending port",
    options: [
      "Broadcasts the frame on all ports except the sending port",
      "Drops the frame immediately and notifies the source",
      "Forwards the frame exclusively to the default gateway",
      "Broadcasts the frame out all ports including the ingress port",
    ],
    aliases: [],
    explanation: "When the destination MAC is not in its table, the switch floods/broadcasts the frame out all ports except the one on which it was received.",
    canTypeInHardMode: false,
  },
  {
    id: "q-mac-learning",
    category: "Switch Operation & Forwarding",
    prompt: "How does a switch learn and record a device MAC address after querying an unknown destination?",
    answer: "Records the MAC address on the port that receives the target response",
    options: [
      "Records the MAC address on the port that receives the target response",
      "Requests an automatic port assignment mapping from the DHCP server",
      "Awaits a manual port configuration entry from a network administrator",
      "Inspects domain host records received directly from the default gateway",
    ],
    aliases: [],
    explanation: "When the target device responds, the switch notes the incoming port and records the device's MAC address under that port in the table.",
    canTypeInHardMode: false,
  },
];

function Layer2SwitchesQuizContent() {
  const searchParams = useSearchParams();
  const isMastery = searchParams.get("mastery") === "true";

  return (
    <QuestionQuiz
      moduleTag="DIAGNOSTIC_MODULE"
      moduleCode="DATA_LINK_HARDWARE"
      title="Layer 2 Switches"
      heading="[SWITCH_LOGIC_&_CAM_TABLE_CHALLENGE]"
      description="Select or type the correct answer for switch frame forwarding, MAC learning, and CAM table operations."
      studyGuideHref="/study-guide#layer-2-switches"
      questions={QUESTIONS}
      initialHardMode={isMastery}
    />
  );
}

export default function Layer2SwitchesQuiz() {
  return (
    <Suspense fallback={null}>
      <Layer2SwitchesQuizContent />
    </Suspense>
  );
}
