export default function Hero() {
    return (
        <section className="text-center py-20">

            <h1 className="text-6xl font-bold mb-6">
                Learn Physics with AI
            </h1>

            <p className="text-gray-400 text-lg mb-8">
                Platform belajar fisika dan matematika dengan AI tutor
                yang menjelaskan konsep secara sistematis.
            </p>

            <div className="flex justify-center gap-4">

                <a
                    href="/learn"
                    className="bg-blue-600 px-6 py-3 rounded-lg"
                >
                    Start Learning
                </a>

                <a
                    href="/ai-tutor"
                    className="border border-gray-700 px-6 py-3 rounded-lg"
                >
                    Ask AI Tutor
                </a>

            </div>

        </section>
    )
}