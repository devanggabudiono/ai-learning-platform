"use client"

import { HeartPulse, Activity, Moon, Flame, Brain, Send, Bot, User, Plus } from "lucide-react"
import { useState } from "react"
import { useHealth } from "@/app/hooks/useHealth"

type AIMessage = { id: string; role: "user" | "ai"; content: string; }

export default function HealthPage() {
    const { logs, addLog } = useHealth()
    
    // AI Chat State
    const [chatInput, setChatInput] = useState("")
    const [messages, setMessages] = useState<AIMessage[]>([{ id: "1", role: "ai", content: "Hi! I am your Health AI Advisor. How can I assist you with your physical and mental well-being during your studies?" }])
    const [isTyping, setIsTyping] = useState(false)

    const handleSend = async () => {
        if (!chatInput.trim()) return

        const userMsg: AIMessage = { id: Date.now().toString(), role: "user", content: chatInput.trim() }
        setMessages(prev => [...prev, userMsg])
        setChatInput("")
        setIsTyping(true)

        try {
            const res = await fetch('/api/ai-advisor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg.content, module: 'health' })
            });
            const data = await res.json();
            setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: "ai", content: data.answer || "Error." }])
        } catch (error) {
            setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: "ai", content: "AI backend error." }])
        } finally {
            setIsTyping(false)
        }
    }

    const logActivity = () => {
        addLog({ title: "Gym Session", description: "Completed an hour of weightlifting and 15 mins of HIIT cardo.", type: 'activity', metrics: ["600 kcal", "75 mins", "135 bpm avg"] });
    }

    const logMental = () => {
        addLog({ title: "Meditation", description: "10 minutes of guided breathing to relieve exam stress.", type: 'mental', metrics: ["Mood: Calm", "Focus: High"] });
    }

    return (
        <div className="flex h-[calc(100vh-73px)] w-full bg-[#0f1115] overflow-hidden">
            
            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 relative">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/10 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
                                <HeartPulse className="text-rose-400" size={24} />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">Health & Wellness</h1>
                                <p className="text-neutral-400 text-sm">Monitor physical activity and mental well-being routines.</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={logActivity} className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 transition-colors text-sm font-semibold text-white flex items-center gap-2">
                                <Plus size={16} /> Log Activity
                            </button>
                            <button onClick={logMental} className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors text-sm font-semibold text-white flex items-center gap-2">
                                <Plus size={16} /> Log Mental Check-in
                            </button>
                        </div>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid md:grid-cols-3 gap-6 mb-10">
                        <div className="p-6 rounded-2xl glass-panel border-rose-500/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-10">
                                <Activity size={64} />
                            </div>
                            <h3 className="text-sm font-medium text-neutral-400 mb-2">Daily Steps</h3>
                            <p className="text-3xl font-bold text-white">8,432</p>
                        </div>
                        <div className="p-6 rounded-2xl glass-panel border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-10">
                                <Moon size={64} />
                            </div>
                            <h3 className="text-sm font-medium text-neutral-400 mb-2">Sleep Average</h3>
                            <p className="text-3xl font-bold text-white">6h 45m</p>
                        </div>
                        <div className="p-6 rounded-2xl glass-panel border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-10">
                                <Flame size={64} />
                            </div>
                            <h3 className="text-sm font-medium text-neutral-400 mb-2">Active Calories</h3>
                            <p className="text-3xl font-bold text-white">450 kcal</p>
                            <div className="w-full bg-neutral-800 h-1.5 rounded-full mt-3 overflow-hidden">
                                <div className="bg-orange-500 w-[75%] h-full rounded-full"></div>
                            </div>
                            <p className="text-xs text-neutral-500 mt-2">75% of daily 600 kcal goal</p>
                        </div>
                    </div>

                    {/* Recent Activities */}
                    <h2 className="text-xl font-semibold text-white mb-4">Recent Activity Logs</h2>
                    <div className="glass-panel text-left rounded-2xl border-white/5 overflow-hidden">
                        {logs.map(log => (
                            <div key={log.id} className="p-6 border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${log.type === 'activity' ? 'bg-orange-500/10 text-orange-400' : 'bg-indigo-500/10 text-indigo-400'}`}>
                                            {log.type === 'activity' ? <Activity size={18} /> : <Brain size={18} />}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white">{log.title}</h3>
                                            <p className="text-xs text-neutral-500">{new Date(log.date).toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-neutral-300 mb-4">{log.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {log.metrics.map((metric, i) => (
                                        <span key={i} className={`px-2.5 py-1 rounded bg-[#17191e] border border-[#1f2229] text-xs font-medium ${log.type === 'activity' ? 'text-orange-400' : 'text-indigo-400'}`}>
                                            {metric}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* AI Advisor Chat Pane */}
            <div className="w-[380px] hidden xl:flex flex-col shrink-0 bg-[#0c0d10] border-l border-[#1f2229]">
                {/* Header */}
                <div className="p-4 border-b border-[#1f2229] flex items-center gap-3 bg-[#0f1115]/50 backdrop-blur-md">
                    <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center border border-rose-500/30 shrink-0">
                        <Bot size={16} className="text-rose-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-white">Health AI Advisor</h3>
                    </div>
                </div>
                
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                    {messages.map(msg => (
                        <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center shrink-0">
                                {msg.role === 'user' ? <User size={14} className="text-white"/> : <Bot size={14} className="text-rose-400"/>}
                            </div>
                            <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${msg.role === 'user' ? 'bg-rose-600 text-white rounded-tr-sm' : 'bg-[#17191e] border border-[#1f2229] text-neutral-200 rounded-tl-sm'}`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                         <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center shrink-0">
                                <Bot size={14} className="text-rose-400"/>
                            </div>
                            <div className="bg-[#17191e] border border-[#1f2229] rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                                <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce"></div>
                                <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce"></div>
                                <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce"></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-[#1f2229] bg-[#0c0d10]">
                    <div className="relative flex items-end bg-[#17191e] border border-[#1f2229] rounded-xl focus-within:border-rose-500/50 transition-colors overflow-hidden ring-1 ring-transparent focus-within:ring-rose-500/20 shadow-inner">
                        <textarea 
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                            placeholder="Ask for an exam wind-down routine..."
                            className="w-full bg-transparent text-sm text-white placeholder-neutral-500 p-3 max-h-32 min-h-[44px] resize-none focus:outline-none custom-scrollbar"
                            rows={1}
                        />
                        <button onClick={handleSend} disabled={!chatInput.trim() || isTyping} className="p-2 mb-1.5 mr-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 disabled:bg-neutral-800 disabled:text-neutral-600 text-white transition-colors">
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
