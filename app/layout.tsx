import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hub | ENT Study",
  description: "Daniel's Interactive Study Guide for the Enterprise Networking Technologies (ENT) course at TTC.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={"h-full antialiased"}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
