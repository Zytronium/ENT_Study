import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <header className="w-full max-w-4xl mb-12 border-b border-border pb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-accent">ENT_ROUTER_V1 | Hub</h1>
          <Link href="/study-guide" className="text-accent hover:underline">
            {">"} Study Guide
          </Link>
        </div>
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

            <Link
              href="/bits-nibbles-bytes"
              className="p-4 bg-slate-800 hover:bg-slate-700 border border-border rounded transition-colors group"
            >
              <div className="flex justify-between items-center">
                <span className="text-accent group-hover:underline">{">"} Bits, Nibbles, and Bytes</span>
                <span className="text-xs text-slate-500">[8/13/26]</span>
              </div>
              <p className="text-sm text-slate-400 mt-2">Bits, nibbles, bytes, kilobits, megabytes, etc.</p>
            </Link>

            <Link
              href="/binary-calculation"
              className="p-4 bg-slate-800 hover:bg-slate-700 border border-border rounded transition-colors group"
            >
              <div className="flex justify-between items-center">
                <span className="text-accent group-hover:underline">{">"} Binary Calculation</span>
                <span className="text-xs text-slate-500">[8/13/26]</span>
              </div>
              <p className="text-sm text-slate-400 mt-2">Calculating binary numbers.</p>
            </Link>

            <Link
              href="/communication-types"
              className="p-4 bg-slate-800 hover:bg-slate-700 border border-border rounded transition-colors group"
            >
              <div className="flex justify-between items-center">
                <span className="text-accent group-hover:underline">{">"} Communication Types</span>
                <span className="text-xs text-slate-500">[8/13/26]</span>
              </div>
              <p className="text-sm text-slate-400 mt-2">Simplex, Half-Duplex, Full Duplex.</p>
            </Link>

            <Link
              href="/network-topologies"
              className="p-4 bg-slate-800 hover:bg-slate-700 border border-border rounded transition-colors group"
            >
              <div className="flex justify-between items-center">
                <span className="text-accent group-hover:underline">{">"} Wired Network Topologies</span>
                <span className="text-xs text-slate-500">[8/14/26]</span>
              </div>
              <p className="text-sm text-slate-400 mt-2">Network layouts; Star, ring, bus, mesh.</p>
            </Link>

            <Link
              href="/802.3-ethernet-standards"
              className="p-4 bg-slate-800 hover:bg-slate-700 border border-border rounded transition-colors group"
            >
              <div className="flex justify-between items-center">
                <span className="text-accent group-hover:underline">{">"} Wired Ethernet Standards</span>
                <span className="text-xs text-slate-500">[8/14/26]</span>
              </div>
              <p className="text-sm text-slate-400 mt-2">802.3 wired ethernet IEEE standards chart.</p>
            </Link>

            <Link
              href="/patch-vs-crossover-cables"
              className="p-4 bg-slate-800 hover:bg-slate-700 border border-border rounded transition-colors group"
            >
              <div className="flex justify-between items-center">
                <span className="text-accent group-hover:underline">{">"} Patch VS Crossover Cables <span
                  className="text-red-500 text-xs ml-2">[OFFLINE]</span></span>
                <span className="text-xs text-slate-500">[8/14/26]</span>
              </div>
              <p className="text-sm text-slate-400 mt-2">Patch (aka straight) cables VS crossover cables.</p>
            </Link>

            <Link
              href="/pvc-rated-cables"
              className="p-4 bg-slate-800 hover:bg-slate-700 border border-border rounded transition-colors group"
            >
              <div className="flex justify-between items-center">
                <span className="text-accent group-hover:underline">{">"} Cable Ratings <span
                  className="text-red-500 text-xs ml-2">[OFFLINE]</span></span>
                <span className="text-xs text-slate-500">[8/14/26]</span>
              </div>
              <p className="text-sm text-slate-400 mt-2">PVC vs Plenum-rated cable specifications
                and fire safety ratings.</p>
            </Link>

            <Link
              href="/esd-emi-emp"
              className="p-4 bg-slate-800 hover:bg-slate-700 border border-border rounded transition-colors group"
            >
              <div className="flex justify-between items-center">
                <span className="text-accent group-hover:underline">{">"} ESD, EMI, & EMP <span
                  className="text-red-500 text-xs ml-2">[OFFLINE]</span></span>
                <span className="text-xs text-slate-500">[8/14/26]</span>
              </div>
              <p className="text-sm text-slate-400 mt-2">Electrostatic discharges, electromagnetic interfearance, and
              electromagnetic pulses.</p>
            </Link>
          </nav>
        </section>
      </main>
    </div>
  );
}
