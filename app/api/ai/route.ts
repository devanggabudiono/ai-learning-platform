import OpenAI from "openai"

export async function POST(req: Request) {

    try {

        const { question } = await req.json()

        const client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        })

        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are a tutor that explains physics, mathematics, and programming clearly."
                },
                {
                    role: "user",
                    content: question
                }
            ]
        })

        return Response.json({
            answer: completion.choices[0].message.content
        })

    } catch (error) {

        console.error("OPENAI ERROR:", error)

        return Response.json({
            answer: "AI server error"
        }, { status: 500 })

    }
}