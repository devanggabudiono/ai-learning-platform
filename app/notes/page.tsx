"use client"

import { NotebookPen, Search, Plus, MoreVertical, FileText, ChevronRight, X, Trash2 } from "lucide-react"
import { useNotes, Note } from "@/app/hooks/useNotes"
import { useState } from "react"
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

export default function NotesPage() {
    const { notes, deleteNote } = useNotes()
    const [search, setSearch] = useState("")
    const [activeNote, setActiveNote] = useState<Note | null>(null)

    const filteredNotes = notes.filter(n => n.title.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className="max-w-7xl mx-auto py-10 px-6 relative">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 mb-4 text-sm font-medium text-amber-300">
                        <NotebookPen size={14} />
                        <span>Catatan Pribadi</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                        Smart <span className="text-gradient from-amber-400 to-orange-500 bg-gradient-to-r">Notes</span>
                    </h1>
                    <p className="text-neutral-400 max-w-xl">
                        Your unified knowledge hub. Save critical concepts directly from your AI lessons here.
                    </p>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
                        <input 
                            type="text" 
                            placeholder="Search your notes..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full md:w-64 pl-9 pr-4 py-2.5 rounded-xl bg-[#17191e] border border-[#1f2229] text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500/50 transition-colors text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Notes Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {filteredNotes.map(note => (
                    <div 
                        key={note.id} 
                        onClick={() => setActiveNote(note)}
                        className="group glass-panel rounded-2xl border-white/5 hover:border-amber-500/30 transition-all flex flex-col p-6 cursor-pointer hover:bg-white/[0.02] animate-in fade-in slide-in-from-bottom-4"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                                <FileText size={20} />
                            </div>
                            <button 
                                onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }} 
                                className="text-neutral-500 hover:text-rose-400 transition-colors p-1"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-300 transition-colors line-clamp-1">{note.title}</h3>
                        <p className="text-sm text-neutral-400 line-clamp-3 mb-6 flex-1">
                            {note.content}
                        </p>
                        <div className="flex items-center justify-between text-xs font-semibold pt-4 border-t border-[#1f2229] mt-auto">
                            <span className="text-neutral-500">{new Date(note.createdAt).toLocaleDateString()}</span>
                            <span className="text-amber-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                Open <ChevronRight size={14} />
                            </span>
                        </div>
                    </div>
                ))}

                {/* Empty State / Add New Hint */}
                {filteredNotes.length === 0 && (
                    <div className="md:col-span-2 lg:col-span-3">
                        <div className="glass-panel rounded-2xl border-white/5 border-dashed bg-transparent p-12 text-center flex flex-col items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 mb-4">
                                <NotebookPen size={32} />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">No notes found</h3>
                            <p className="text-neutral-400 max-w-md mx-auto">
                                You haven't saved any notes yet. Use the "Save to Notes" button while chatting with the AI Tutor to start building your knowledge base!
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Note Reader Modal */}
            {activeNote && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-[#12141a] border border-[#1f2229] rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl">
                        <div className="p-6 border-b border-[#1f2229] flex justify-between items-center bg-[#0f1115]/50">
                            <h2 className="text-xl font-bold text-white shrink-0">{activeNote.title}</h2>
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-neutral-500">{new Date(activeNote.createdAt).toLocaleString()}</span>
                                <button onClick={() => setActiveNote(null)} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-neutral-400 hover:text-white">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="p-8 overflow-y-auto custom-scrollbar 
                                        prose prose-invert prose-amber max-w-none 
                                        prose-p:text-neutral-300 prose-p:leading-relaxed 
                                        prose-strong:text-white prose-strong:font-semibold">
                            <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                                {activeNote.content}
                            </ReactMarkdown>
                        </div>
                        <div className="p-4 border-t border-[#1f2229] bg-[#0c0d10] flex justify-end">
                            <button 
                                onClick={() => { deleteNote(activeNote.id); setActiveNote(null); }}
                                className="px-4 py-2 rounded-lg text-sm font-semibold bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors flex items-center gap-2"
                            >
                                <Trash2 size={16} /> Delete Note
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
