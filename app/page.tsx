import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <header className="w-full max-w-4xl mb-12 border-b border-border pb-4">
        <h1 className="text-3xl font-bold text-accent">ENT_ROUTER_V1 | Hub</h1>
        <p className="text-sm text-slate-400">System Uptime: 2026-08-12 17:53:00</p>
      </header>

      <main className="w-full flex justify-center">
        <section className="terminal-box border-l-4 border-l-accent">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            [STUDY_TOPICS]
          </h2>
          <nav className="flex flex-col gap-4">
            <Link
              href="/osi-model"
              className="p-4 bg-slate-800 hover:bg-slate-700 border border-border rounded transition-colors group"
            >
              <div className="flex justify-between items-center">
                <span className="text-accent group-hover:underline">{">"} OSI Model</span>
                <span className="text-xs text-slate-500">[8/10-12/26]</span>
              </div>
              <p className="text-sm text-slate-400 mt-2">The 7 layers of the Open Systems Interconnection model.</p>
            </Link>

            <Link
              href="/networking-tools"
              className="p-4 bg-slate-800 hover:bg-slate-700 border border-border rounded transition-colors group"
            >
              <div className="flex justify-between items-center">
                <span className="text-accent group-hover:underline">{">"} Networking Tools</span>
                <span className="text-xs text-slate-500">[8/11/26]</span>
              </div>
              <p className="text-sm text-slate-400 mt-2">Tools of the trade for networking professionals.</p>
            </Link>

            <Link
              href="/modem-router"
              className="p-4 bg-slate-800 hover:bg-slate-700 border border-border rounded transition-colors group"
            >
              <div className="flex justify-between items-center">
                <span className="text-accent group-hover:underline">{">"} Modems VS Routers</span>
                <span className="text-xs text-slate-500">[8/11/26]</span>
              </div>
              <p className="text-sm text-slate-400 mt-2">Difference between modems and routers.</p>
            </Link>

            <Link
              href="/eia-tia-standard"
              className="p-4 bg-slate-800 hover:bg-slate-700 border border-border rounded transition-colors group"
            >
              <div className="flex justify-between items-center">
                <span className="text-accent group-hover:underline">{">"} EIA/TIA 568B Standard Specification</span>
                <span className="text-xs text-slate-500">[8/11/26]</span>
              </div>
              <p className="text-sm text-slate-400 mt-2">Order of the colored wires in a CAT5/CAT6 cable plug.</p>
            </Link>
          </nav>
        </section>
      </main>
    </div>
  );
}
