import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "General IP Address Classes | ENT Study",
  description: "Interactive table-filling matrix and diagnostic quiz for IPv4 address classes (A, B, C, D, E), network numbers, net/host formats, subnet masks, possible networks, possible hosts, and class designations.",
};

export default function IPAddressClassesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
