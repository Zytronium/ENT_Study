import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data-Link Layer | ENT Study",
  description: "Interactive study quiz on the Data-Link Layer: LLC & MAC sublayers, MAC address structure, OUI, and ARP.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
