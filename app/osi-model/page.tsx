"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import MatchToLayerAndNumberQuiz, { LayerItem } from "@/components/study-quiz/MatchToLayerAndNumberQuiz";

const layers: LayerItem[] = [
  { number: 7, name: "Application", description: "Provides network services directly to applications. Closest to the end user." },
  { number: 6, name: "Presentation", description: "Handles translation and encryption of data." },
  { number: 5, name: "Session", description: "Manages (starts, stops, maintains) connections." },
  { number: 4, name: "Transport", description: "Reliable end-to-end flow control and error correction. TCP/UDP." },
  { number: 3, name: "Network", description: "Routing and logical addresses. IP addresses, routers, etc." },
  { number: 2, name: "Data-Link", description: "Communication between devices over a local network. MAC addresses, switches, etc." },
  { number: 1, name: "Physical", description: "Raw bits across physical medium. Cables, antennas, hubs." },
];

function OSIQuizContent() {
  const searchParams = useSearchParams();
  const isMastery = searchParams.get("mastery") === "true";

  return (
    <MatchToLayerAndNumberQuiz
      moduleTag="DIAGNOSTIC_MODULE"
      moduleCode="L1_THROUGH_L7"
      title="OSI Model"
      heading="[OSI_LAYER_ARCHITECTURE_MATCHING]"
      description="Match the correct OSI layer name to its technical description and layer position index."
      studyGuideHref="/study-guide#osi-model"
      layers={layers}
      initialHardMode={isMastery}
    />
  );
}

export default function OSIQuiz() {
  return (
    <Suspense fallback={null}>
      <OSIQuizContent />
    </Suspense>
  );
}
