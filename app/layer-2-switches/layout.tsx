import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Layer 2 Switches | ENT Study",
  description: "Layer 2 switch operation, MAC/CAM tables, port mapping, and frame broadcasting.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
