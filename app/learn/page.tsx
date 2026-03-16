import Link from "next/link"
import { Atom, Calculator, Code2, ChevronRight, Sparkles } from "lucide-react"

export default function LearnPage() {
    return (
        <div className="min-h-screen bg-[#0f1115] relative overflow-hidden flex flex-col items-center justify-center py-20 px-6">
            
            {/* Background effects */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col items-center">
                
                {/* Header Section */}
                <div className="text-center mb-16 space-y-4 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-4 text-sm font-medium text-blue-200">
                        <Sparkles size={16} className="text-blue-400" />
                        <span>Interactive Learning Paths</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
                        Master your craft with <br/>
                        <span className="text-gradient">AI-Powered</span> Learning
                    </h1>
                    <p className="text-lg text-neutral-400 leading-relaxed">
                        Explore comprehensive curricula spanning fundamental logic to advanced systems. 
                        Choose a discipline to begin your journey.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-3 gap-6 w-full">
                    
                    {/* Physics Card */}
                    <Link href="/learn/physics" className="group">
                        <div className="h-full glass-panel p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/[0.05] hover:border-blue-500/30 flex flex-col">
                            <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-blue-500/20">
                                <Atom className="text-blue-400" size={32} strokeWidth={1.5} />
                            </div>
                            <h2 className="text-2xl font-semibold mb-3 text-white group-hover:text-blue-200 transition-colors">
                                Physics
                            </h2>
                            <p className="text-neutral-400 mb-8 flex-1 leading-relaxed">
                                Uncover the laws of the universe. From classical mechanics to thermodynamics, waves, and electromagnetism.
                            </p>
                            <div className="flex items-center gap-2 text-sm font-semibold text-blue-400 group-hover:text-blue-300 mt-auto opacity-80 group-hover:opacity-100 transition-all">
                                <span>Start Learning</span>
                                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>

                    {/* Math Card */}
                    <Link href="/learn/math" className="group">
                        <div className="h-full glass-panel p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/[0.05] hover:border-purple-500/30 flex flex-col relative overflow-hidden">
                            <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-purple-500/20">
                                <Calculator className="text-purple-400" size={32} strokeWidth={1.5} />
                            </div>
                            <h2 className="text-2xl font-semibold mb-3 text-white group-hover:text-purple-200 transition-colors">
                                Mathematics
                            </h2>
                            <p className="text-neutral-400 mb-8 flex-1 leading-relaxed">
                                Build a strong foundation of logic. Master algebra, calculus, statistics, and linear algebra.
                            </p>
                            <div className="flex items-center gap-2 text-sm font-semibold text-purple-400 group-hover:text-purple-300 mt-auto opacity-80 group-hover:opacity-100 transition-all">
                                <span>Start Learning</span>
                                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>

                    {/* Programming Card */}
                    <Link href="/learn/programming" className="group">
                        <div className="h-full glass-panel p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/[0.05] hover:border-emerald-500/30 flex flex-col relative overflow-hidden">
                            <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-emerald-500/20">
                                <Code2 className="text-emerald-400" size={32} strokeWidth={1.5} />
                            </div>
                            <h2 className="text-2xl font-semibold mb-3 text-white group-hover:text-emerald-200 transition-colors">
                                Programming
                            </h2>
                            <p className="text-neutral-400 mb-8 flex-1 leading-relaxed">
                                Build modern software. Learn fundamentals, data structures, algorithms, and full-stack web development.
                            </p>
                            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400 group-hover:text-emerald-300 mt-auto opacity-80 group-hover:opacity-100 transition-all">
                                <span>Start Learning</span>
                                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    )
}