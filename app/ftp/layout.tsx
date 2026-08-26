import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FTP, SFTP, & TFTP | ENT Study",
  description: "File-transfer protocols, including FTP, SFTP, TFTP, and their transport, security, authentication, and port characteristics.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}