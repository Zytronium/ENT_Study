import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Networking Tools | ENT Study",
  description: "Tools of the trade for networking professionals.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
