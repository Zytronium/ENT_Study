import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wireless 802.11 | ENT Study",
  description: "Radio frequencies (2.4/5 GHz) and wireless security (WPA2/WPA3 router setup simulator).",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
