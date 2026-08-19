import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wireless Wi-Fi Standards | ENT Study",
  description: "802.11 wireless IEEE standards chart, frequencies, speeds, and distances.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
