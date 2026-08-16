import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cable Ratings | ENT Study",
  description: "PVC vs Plenum-rated cable specifications and fire safety ratings.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
