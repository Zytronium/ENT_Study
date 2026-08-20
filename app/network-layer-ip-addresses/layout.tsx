import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Network Layer - IP Addresses | ENT Study",
  description: "Diagnostic quiz on IPv4 and IPv6 architecture, public vs private IP addresses, NAT, APIPA, and loopback addressing.",
};

export default function NetworkLayerIPAddressesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
