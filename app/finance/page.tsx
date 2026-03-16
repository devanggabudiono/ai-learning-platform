"use client"

import { Calculator, TrendingUp, DollarSign, PieChart, Activity, Wallet, Bot, Send, Plus, Trash2, User } from "lucide-react"
import { useState } from "react"
import { useFinance } from "@/app/hooks/useFinance"

type AIMessage = { id: string; role: "user" | "ai"; content: string; }

export default function FinancePage() {
    const { transactions, balance, addTransaction, deleteTransaction } = useFinance()
    
    // AI Chat State
    const [chatInput, setChatInput] = useState("")
    const [messages, setMessages] = useState<AIMessage[]>([{ id: "1", role: "ai", content: "Hi! I am your Financial AI Advisor. How can I help you manage your university budget today?" }])
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
                body: JSON.stringify({ message: userMsg.content, module: 'finance' })
            });
            const data = await res.json();
            setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: "ai", content: data.answer || "Error." }])
        } catch (error) {
            setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: "ai", content: "AI backend error." }])
        } finally {
            setIsTyping(false)
        }
    }

    const handleMockDeposit = () => {
        addTransaction({ title: "Allowance", amount: 100, category: "Income", type: "income" });
    }

    const handleMockExpense = () => {
        addTransaction({ title: "Snacks", amount: 15.50, category: "Food", type: "expense" });
    }

    return (
        <div className="flex h-[calc(100vh-73px)] w-full bg-[#0f1115] overflow-hidden">
            
            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 relative">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
                                <Calculator className="text-green-400" size={24} />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">Student Finance</h1>
                                <p className="text-neutral-400 text-sm">Track expenses and get AI budgeting advice.</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={handleMockExpense} className="px-4 py-2 rounded-lg bg-[#17191e] border border-[#1f2229] hover:bg-white/5 transition-colors text-sm font-semibold text-rose-400 flex items-center gap-2">
                                - Log Expense
                            </button>
                            <button onClick={handleMockDeposit} className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 transition-colors text-sm font-semibold text-white flex items-center gap-2">
                                <Plus size={16} /> Add Income
                            </button>
                        </div>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid md:grid-cols-3 gap-6 mb-10">
                        <div className="p-6 rounded-2xl glass-panel border-green-500/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-10">
                                <Wallet size={64} />
                            </div>
                            <h3 className="text-sm font-medium text-neutral-400 mb-2">Total Balance</h3>
                            <p className="text-3xl font-bold text-white">${balance.toFixed(2)}</p>
                        </div>
                        <div className="p-6 rounded-2xl glass-panel border-white/5">
                            <h3 className="text-sm font-medium text-neutral-400 mb-2">Monthly Expenses</h3>
                            <p className="text-3xl font-bold text-white">${transactions.filter(t => t.type === 'expense').reduce((a,b) => a + b.amount, 0).toFixed(2)}</p>
                        </div>
                        <div className="p-6 rounded-2xl glass-panel border-white/5">
                            <h3 className="text-sm font-medium text-neutral-400 mb-2">Savings Goal</h3>
                            <p className="text-3xl font-bold text-white">$400.00</p>
                            <div className="w-full bg-neutral-800 h-1.5 rounded-full mt-3 overflow-hidden">
                                <div className="bg-green-500 w-[60%] h-full rounded-full"></div>
                            </div>
                            <p className="text-xs text-neutral-500 mt-2">60% of $5,000 goal</p>
                        </div>
                    </div>

                    {/* Recent Transactions */}
                    <h2 className="text-xl font-semibold text-white mb-4">Recent Transactions</h2>
                    <div className="glass-panel rounded-2xl border-white/5 overflow-hidden">
                        {transactions.map(t => (
                            <div key={t.id} className="group flex items-center justify-between p-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t.type === 'expense' ? 'bg-rose-500/10 text-rose-400' : 'bg-green-500/10 text-green-400'}`}>
                                        {t.type === 'expense' ? <PieChart size={18} /> : <DollarSign size={18} />}
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">{t.title}</p>
                                        <p className="text-xs text-neutral-500">{t.category} • {new Date(t.date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className={`font-semibold ${t.type === 'expense' ? 'text-rose-400' : 'text-green-400'}`}>
                                        {t.type === 'expense' ? '-' : '+'}${t.amount.toFixed(2)}
                                    </p>
                                    <button onClick={() => deleteTransaction(t.id)} className="text-neutral-600 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {transactions.length === 0 && <div className="p-8 text-center text-neutral-500 text-sm">No transactions logged yet.</div>}
                    </div>
                </div>
            </main>

            {/* AI Advisor Chat Pane */}
            <div className="w-[380px] hidden xl:flex flex-col shrink-0 bg-[#0c0d10] border-l border-[#1f2229]">
                {/* Header */}
                <div className="p-4 border-b border-[#1f2229] flex items-center gap-3 bg-[#0f1115]/50 backdrop-blur-md">
                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center border border-green-500/30 shrink-0">
                        <Bot size={16} className="text-green-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-white">Financial AI Advisor</h3>
                    </div>
                </div>
                
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                    {messages.map(msg => (
                        <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center shrink-0">
                                {msg.role === 'user' ? <User size={14} className="text-white"/> : <Bot size={14} className="text-green-400"/>}
                            </div>
                            <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${msg.role === 'user' ? 'bg-green-600 text-white rounded-tr-sm' : 'bg-[#17191e] border border-[#1f2229] text-neutral-200 rounded-tl-sm'}`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                         <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center shrink-0">
                                <Bot size={14} className="text-green-400"/>
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
                    <div className="relative flex items-end bg-[#17191e] border border-[#1f2229] rounded-xl focus-within:border-green-500/50 transition-colors overflow-hidden ring-1 ring-transparent focus-within:ring-green-500/20 shadow-inner">
                        <textarea 
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                            placeholder="Ask for budgeting advice..."
                            className="w-full bg-transparent text-sm text-white placeholder-neutral-500 p-3 max-h-32 min-h-[44px] resize-none focus:outline-none custom-scrollbar"
                            rows={1}
                        />
                        <button onClick={handleSend} disabled={!chatInput.trim() || isTyping} className="p-2 mb-1.5 mr-1.5 rounded-lg bg-green-600 hover:bg-green-500 disabled:bg-neutral-800 disabled:text-neutral-600 text-white transition-colors">
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
