import Link from "next/link";
import type { Metadata } from "next";

/* Robots: no index | TODO: REMOVE THIS WHEN PAGE IS IMPLEMENTED; Replace with proper metadata for title and description */
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function Placeholder() {
  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <header className="w-full max-w-4xl mb-8 border-b border-border pb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-accent">ENT_ROUTER_V1 | Hexadecimal</h1>
          <Link href="/" className="text-sm text-accent hover:underline">{"<"} BACK TO HUB</Link>
        </div>
      </header>

      <main className="w-full max-w-4xl terminal-box min-h-100 flex flex-col items-center justify-center text-slate-500">
        <div className="text-4xl mb-4">🛠️</div>
        <h2 className="text-xl font-bold mb-2 text-slate-400">[PAGE_UNDER_CONSTRUCTION]</h2>
        <p className="max-w-md text-center">
          This module is currently being provisioned. Please check back later.
        </p>
        <div className="mt-8 font-mono text-xs opacity-50 animate-pulse">
          $ pending_update --module tools --status placeholder
        </div>
      </main>
    </div>
  );
}
