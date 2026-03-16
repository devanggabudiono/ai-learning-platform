
"use client"

import { useState, useEffect } from "react"

export default function ChatTutor({ topic }: { topic: string }) {

    const [messages, setMessages] = useState<any[]>([])
    const [input, setInput] = useState("")

    async function askAI(message: string) {

        const res = await fetch("/api/ai", {
            method: "POST",
            body: JSON.stringify({
                message,
                topic
            })
        })

        const data = await res.json()

        return data.reply
    }

    async function sendMessage() {

        const userMessage = {
            role: "user",
            content: input
        }

        setMessages(prev => [...prev, userMessage])

        const reply = await askAI(input)

        setMessages(prev => [
            ...prev,
            { role: "assistant", content: reply }
        ])

        setInput("")
    }

    useEffect(() => {

        async function init() {

            const reply = await askAI(
                "Explain this topic briefly"
            )

            setMessages([
                { role: "assistant", content: reply }
            ])

        }

        init()

    }, [])

    return (

        <div className="flex flex-col h-[600px]">

            <div className="flex-1 overflow-auto p-4 space-y-4">

                {messages.map((m, i) => (

                    <div
                        key={i}
                        className={
                            m.role === "user"
                                ? "text-right"
                                : "text-left"
                        }
                    >
                        {m.content}
                    </div>

                ))}

            </div>

            <div className="border-t border-gray-800 p-3">

                <input
                    className="w-full p-2 bg-gray-900 rounded"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about mechanics..."
                />

                <button
                    onClick={sendMessage}
                    className="mt-2 w-full bg-blue-600 p-2 rounded"
                >
                    Send
                </button>

            </div>

        </div>
    )
}