import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Master Practice Test | ENT Study",
  description: "Randomized 60, 100, or 150-point CCNA enterprise networking practice exam featuring interactive activities, table matrix completion, generated test questions.",
};

export default function PracticeTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
