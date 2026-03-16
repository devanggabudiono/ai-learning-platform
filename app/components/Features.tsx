import { BrainCircuit, NotebookPen, Calculator, HeartPulse } from "lucide-react"

export default function Features() {
    return (
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 pb-24 max-w-7xl mx-auto">

            <div className="glass-panel p-6 rounded-2xl border-blue-500/20 hover:bg-white/[0.03] transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <BrainCircuit className="text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                    AI Learning
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                    A-Z subject mastery powered by dynamic AI tutors. Learn Physics, Math, and Programming with instant feedback.
                </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border-amber-500/20 hover:bg-white/[0.03] transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <NotebookPen className="text-amber-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                    Smart Notes
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                    Seamlessly capture and organize insights directly from your lessons and AI chat sessions into your personal hub.
                </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border-green-500/20 hover:bg-white/[0.03] transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Calculator className="text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                    Student Finance
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                    Track your daily expenses, manage student loans, and receive AI-driven budgeting advice for university life.
                </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border-rose-500/20 hover:bg-white/[0.03] transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <HeartPulse className="text-rose-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                    Health Analytics
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                    Log workouts, monitor sleep patterns, and get personalized tips to maintain physical and mental well-being during intense studies.
                </p>
            </div>

        </section>
    )
}