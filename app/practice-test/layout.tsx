import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Master Practice Test | ENT Study",
  description: "60-point randomized CCNA enterprise networking practice exam featuring interactive activities, table matrix completion, generated test questions.",
};

export default function PracticeTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
