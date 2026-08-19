import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WAN Technologies | ENT Study",
  description: "Comparing WAN technologies: POTS dial-up modems, and digital carrier line specifications.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
