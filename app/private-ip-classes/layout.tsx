import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private IP Address Classes | ENT Study",
  description: "Interactive table-filling matrix and diagnostic quiz for Private IPv4 address classes (A, B, C), IP ranges, and default subnet masks.",
};

export default function PrivateIPClassesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
