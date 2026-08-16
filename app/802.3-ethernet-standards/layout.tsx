import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wired Ethernet Standards | ENT Study",
  description: "802.3 wired ethernet IEEE standards chart.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
