import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

export default function Hero() {
    return (
        <section className="relative text-center py-24 md:py-32 overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto px-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 text-sm font-medium text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                    <Sparkles size={16} />
                    <span>Welcome to NIBIT</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-white leading-[1.1]">
                    The All-in-One <br/>
                    <span className="text-gradient from-blue-400 via-purple-400 to-emerald-400 bg-gradient-to-r">Student Management</span> Platform
                </h1>

                <p className="text-xl text-neutral-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Elevate your university experience with NIBIT. Seamlessly integrate your learning, 
                    take smart notes, manage your finances, and track your health—all powered by AI.
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Link
                        href="/learn"
                        className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-black font-semibold hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 group"
                    >
                        Start Learning
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                        href="/dashboard"
                        className="w-full sm:w-auto px-8 py-4 rounded-xl glass-panel border border-white/10 hover:bg-white/5 text-white font-medium transition-all flex items-center justify-center"
                    >
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        </section>
    )
}