import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ESD, EMI, & EMP | ENT Study",
  description: "Electrostatic discharges, electromagnetic interference, and electromagnetic pulses.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
