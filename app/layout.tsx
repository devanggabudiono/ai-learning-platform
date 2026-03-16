import "./globals.css";
import 'katex/dist/katex.min.css';
import Link from "next/link";
import { Sparkles, NotebookPen, Calculator, HeartPulse } from "lucide-react";

export const metadata = {
  title: "NIBIT - All-in-One Student Management",
  description: "AI-powered learning, notes, finance, and health management for students.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0f1115] text-white antialiased min-h-screen flex flex-col">

        {/* Premium Navbar */}
        <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 border-b border-[#1f2229] bg-[#0f1115]/80 backdrop-blur-md">

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                <Sparkles size={18} className="text-blue-400" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">
                NI<span className="text-gradient from-blue-400 to-emerald-400 bg-gradient-to-r">BIT</span>
            </h1>
          </div>

          <div className="flex gap-6 lg:gap-8 text-neutral-400 font-medium text-sm">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/learn" className="text-white">Learn</Link>
            <Link href="/notes" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                <NotebookPen size={14} /> Notes
            </Link>
            <Link href="/finance" className="hover:text-green-400 transition-colors flex items-center gap-1.5">
                <Calculator size={14} /> Finance
            </Link>
            <Link href="/health" className="hover:text-rose-400 transition-colors flex items-center gap-1.5">
                <HeartPulse size={14} /> Health
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-neutral-400 hover:text-white transition-colors text-sm font-medium mr-2">
                 Dashboard
              </Link>
              <Link href="/profile" className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 text-neutral-300">
                  Profile
              </Link>
              <button className="px-4 py-2 rounded-lg text-sm font-semibold bg-white text-black hover:bg-neutral-200 transition-colors">
                  Sign In
              </button>
          </div>

        </nav>

        <main className="flex-1 flex flex-col">
          {children}
        </main>

      </body>
    </html>
  );
}
