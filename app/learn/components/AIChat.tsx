"use client"

import { useState } from "react"
import { Send, Bot, User, Sparkles, NotebookPen } from "lucide-react"
import { useNotes } from "@/app/hooks/useNotes"

type Message = {
    id: string
    role: "user" | "ai"
    content: string
}

export default function AIChat() {
    const { addNote } = useNotes()
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "ai",
            content: "Hello! I'm your AI Tutor. I can help explain concepts, solve problems, or give you quizzes on this topic. What would you like to learn today?"
        }
    ])
    const [input, setInput] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const [savedMsgId, setSavedMsgId] = useState<string | null>(null)

    const handleSend = async () => {
        if (!input.trim()) return

        const newMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input.trim()
        }

        setMessages(prev => [...prev, newMessage])
        setInput("")
        setIsTyping(true)

        try {
            const res = await fetch('/api/ai-advisor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: newMessage.content, module: 'tutor' })
            });
            const data = await res.json();

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: "ai",
                content: data.answer || "I'm sorry, I couldn't process that request."
            }])
        } catch (error) {
            console.error("AI Chat Error:", error)
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: "ai",
                content: "Error connecting to AI backend."
            }])
        } finally {
            setIsTyping(false)
        }
    }

    const handleSaveNote = (msgContent: string, msgId: string) => {
        addNote({
            title: `AI Tutor Note - ${new Date().toLocaleDateString()}`,
            content: msgContent,
            source: 'ai-tutor'
        });
        setSavedMsgId(msgId);
        setTimeout(() => setSavedMsgId(null), 2000); // Reset after 2s
    }

    return (
        <div className="flex flex-col h-full bg-[#0c0d10] border-l border-[#1f2229]">
            {/* Header */}
            <div className="p-4 border-b border-[#1f2229] flex items-center gap-3 bg-[#0f1115]/50 backdrop-blur-md">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-500/30 shrink-0">
                    <Sparkles size={16} className="text-blue-400" />
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-white">AI Tutor</h3>
                    <p className="text-[11px] text-green-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                        Online & Ready
                    </p>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        {/* Avatar */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                            msg.role === 'user' 
                            ? 'bg-gradient-to-tr from-blue-600 to-purple-600' 
                            : 'bg-neutral-800 border border-neutral-700'
                        }`}>
                            {msg.role === 'user' ? <User size={14} className="text-white"/> : <Bot size={14} className="text-neutral-300"/>}
                        </div>

                        {/* Bubble */}
                        <div className="flex flex-col gap-1 items-start">
                            <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap ${
                                msg.role === 'user'
                                ? 'bg-blue-600 text-white rounded-tr-sm'
                                : 'bg-[#17191e] border border-[#1f2229] text-neutral-200 rounded-tl-sm'
                            }`}>
                                {msg.content}
                            </div>
                            
                            {/* Action Buttons for AI */}
                            {msg.role === 'ai' && (
                                <button 
                                    className={`flex items-center gap-1.5 text-[10px] font-medium transition-colors ml-1 px-2 py-1 rounded ${
                                        savedMsgId === msg.id 
                                        ? 'text-green-400 bg-green-500/10' 
                                        : 'text-neutral-500 hover:text-amber-400 hover:bg-white/5 opacity-0 group-hover:opacity-100'
                                    }`}
                                    onClick={() => handleSaveNote(msg.content, msg.id)}
                                >
                                    <NotebookPen size={12} /> 
                                    {savedMsgId === msg.id ? 'Saved!' : 'Save to Notes'}
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center shrink-0">
                            <Bot size={14} className="text-neutral-300"/>
                        </div>
                        <div className="bg-[#17191e] border border-[#1f2229] rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                            <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce"></div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-[#1f2229] bg-[#0c0d10]">
                <div className="relative flex items-end bg-[#17191e] border border-[#1f2229] rounded-xl focus-within:border-blue-500/50 transition-colors overflow-hidden ring-1 ring-transparent focus-within:ring-blue-500/20 shadow-inner">
                    <textarea 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault()
                                handleSend()
                            }
                        }}
                        placeholder="Ask the AI Tutor..."
                        className="w-full bg-transparent text-sm text-white placeholder-neutral-500 p-3 max-h-32 min-h-[44px] resize-none focus:outline-none custom-scrollbar"
                        rows={1}
                    />
                    <button 
                        onClick={handleSend}
                        disabled={!input.trim() || isTyping}
                        className="p-2 mb-1.5 mr-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-neutral-800 disabled:text-neutral-600 text-white transition-colors"
                    >
                        <Send size={16} />
                    </button>
                </div>
                <div className="text-center mt-2 text-[10px] text-neutral-500">
                    AI can make mistakes. Verify important information.
                </div>
            </div>
        </div>
    )
}
