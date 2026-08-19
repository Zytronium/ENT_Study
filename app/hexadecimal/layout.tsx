import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hexadecimal | ENT Study",
  description: "Hexadecimal base-16 number system and converting between hex, binary, and decimal.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
