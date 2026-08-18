import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wireless Wi-Fi Standards | ENT Study",
  description: "802.11 wireless Wi-Fi IEEE standards specifications matrix.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
