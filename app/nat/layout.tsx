import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Network Address Translation (NAT) | ENT Study",
  description: "Static, Dynamic, and PAT (Port Address Translation) NAT configurations.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
