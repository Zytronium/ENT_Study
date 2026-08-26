import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IP Address Assignment | ENT Study",
  description: "Static and automatic IP address assignment, DHCP settings, Windows IP configuration, and the DORA process.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}