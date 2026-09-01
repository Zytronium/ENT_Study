import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Master Practice Test | ENT Study",
  description: "Randomized CCNA enterprise networking practice exam and competitive ten-question speedrun.",
};

export default function PracticeTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
