import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bits, Nibbles, and Bytes | ENT Study",
  description: "Bits, nibbles, bytes, kilobits, megabytes, etc.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
