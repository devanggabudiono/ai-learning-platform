"use client"

import { useParams } from "next/navigation"
import { Sparkles, ArrowLeft } from "lucide-react"

export default function SubjectLandingPage() {
    const params = useParams()
    const subject = params?.subject as string || "this subject"
    
    const formattedSubject = subject.charAt(0).toUpperCase() + subject.slice(1)

    return (
        <div className="h-full flex flex-col items-center justify-center p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-center relative overflow-hidden">
            
            {/* Background Aesthetic */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 w-20 h-20 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 mb-8 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                <Sparkles size={40} className="text-blue-400" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{formattedSubject}</span>
            </h1>
            
            <p className="text-lg text-neutral-400 max-w-lg mb-8 leading-relaxed">
                NIBIT AI has meticulously prepared a comprehensive curriculum for you. Select a specific topic from the sidebar to begin generating your personalized textbook material.
            </p>

            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium animate-pulse">
                <ArrowLeft size={16} /> Choose a topic from the menu
            </div>
        </div>
    )
}
