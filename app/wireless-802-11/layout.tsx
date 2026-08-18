import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wireless 802.11 | ENT Study",
  description: "Interactive study quiz on Wireless 802.11 frequencies, radio bands (2.4/5 GHz), and router security standards.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
