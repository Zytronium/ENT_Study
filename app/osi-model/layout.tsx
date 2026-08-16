import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OSI Model | ENT Study",
  description: "The 7 layers of the Open Systems Interconnection model.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
