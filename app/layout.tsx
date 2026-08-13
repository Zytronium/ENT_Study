import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ENT Study | Daniel's Interactive Study Guide",
  description: "Daniel's Interactive Study Guide for the Enterprise Networking Technologies (ENT) course at TTC.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={"h-full antialiased"}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
