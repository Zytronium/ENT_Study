import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Binary Calculation | ENT Study",
  description: "Calculating binary numbers.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
