import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speedrun Quiz | ENT Study",
  description: "A ten-question timed networking speedrun with a competitive leaderboard.",
};

export default function SpeedrunLayout({ children }: { children: React.ReactNode }) {
  return children;
}