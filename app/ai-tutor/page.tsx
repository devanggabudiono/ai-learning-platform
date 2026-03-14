"use client"

import { useState } from "react"

export default function AITutor() {

    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")
    const [loading, setLoading] = useState(false)

    async function askAI() {

        try {

            setLoading(true)

            const res = await fetch("/api/ai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    question: question
                })
            })

            const data = await res.json()

            setAnswer(data.answer)

        } catch (error) {

            setAnswer("Error contacting AI API")

        } finally {

            setLoading(false)

        }
    }

    return (
        <div className="max-w-3xl mx-auto p-10 text-white">

            <h1 className="text-3xl font-bold mb-6">
                AI Tutor
            </h1>

            <textarea
                className="w-full border border-gray-700 bg-gray-900 text-white p-3 rounded"
                placeholder="Ask a physics or math question..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />

            <button
                onClick={askAI}
                className="mt-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
                Ask AI
            </button>

            {loading && <p className="mt-4 text-gray-400">Thinking...</p>}

            <div className="mt-6 whitespace-pre-wrap text-gray-200">
                {answer}
            </div>

        </div>
    )
}