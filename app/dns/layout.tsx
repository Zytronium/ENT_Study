import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DNS | ENT Study",
  description: "DNS terminology, port usage, and common DNS record types.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}