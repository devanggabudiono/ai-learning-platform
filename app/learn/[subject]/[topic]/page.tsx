"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import ReactMarkdown from 'react-markdown'
import { Sparkles, Loader2 } from "lucide-react"

export default function DynamicTopicPage() {
    const params = useParams()
    const subject = params.subject as string
    const topic = params.topic as string

    const [material, setMaterial] = useState<{ title: string, content: string } | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!subject || !topic) return;

        const fetchMaterial = async () => {
            setLoading(true)
            try {
                const res = await fetch('/api/generate-material', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ subject, topic })
                })
                const data = await res.json()
                if (data.success) {
                    setMaterial(data.data)
                }
            } catch (error) {
                console.error("Failed to load material:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchMaterial()
    }, [subject, topic])

    // Format strings (e.g. "newton-laws" to "Newton Laws")
    const formatStr = (str: string) => str.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

    if (loading) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-neutral-400">
                <Loader2 size={32} className="animate-spin mb-4 text-blue-500" />
                <p>NIBIT AI is generating A-Z material for {formatStr(topic)}...</p>
                <div className="w-48 bg-neutral-800 h-1 rounded-full overflow-hidden mt-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-1/2 h-full animate-pulse rounded-full"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-blue-400 uppercase mb-4">
                <Sparkles size={14} /> AI GENERATED CURRICULUM
            </div>

            <h1 className="text-4xl font-bold text-white mb-8 leading-tight">
                {material?.title || formatStr(topic)}
            </h1>

            {/* Markdown Wrapper with prose styles for gorgeous typography */}
            <div className="prose prose-invert prose-blue max-w-none 
                            prose-headings:text-neutral-100 prose-headings:font-semibold
                            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-[#1f2229] prose-h2:pb-3
                            prose-h3:text-xl prose-h3:mt-8
                            prose-p:text-neutral-300 prose-p:leading-relaxed prose-p:text-[15px]
                            prose-a:text-blue-400 hover:prose-a:text-blue-300
                            prose-strong:text-white prose-strong:font-semibold
                            prose-ul:text-neutral-300 prose-li:my-1
                            prose-code:text-amber-300 prose-code:bg-amber-400/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                            prose-pre:bg-[#17191e] prose-pre:border prose-pre:border-[#1f2229] prose-pre:rounded-xl">
                <ReactMarkdown>
                    {material?.content || "No content generated."}
                </ReactMarkdown>
            </div>
        </div>
    )
}
