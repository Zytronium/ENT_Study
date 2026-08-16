import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wired Network Topologies | ENT Study",
  description: "Network layouts; Star, ring, bus, mesh.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
