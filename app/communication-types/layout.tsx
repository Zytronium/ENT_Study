import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Communication Types | ENT Study",
  description: "Simplex, Half-Duplex, Full Duplex.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
