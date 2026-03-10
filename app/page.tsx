export default function Home() {
    return (
        <div className="max-w-5xl mx-auto">

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

            <section className="grid md:grid-cols-3 gap-8">

                <div className="border border-gray-800 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3">
                        AI Tutor
                    </h3>
                    <p className="text-gray-400">
                        Tanya konsep fisika dan AI menjelaskan langkah demi langkah.
                    </p>
                </div>

                <div className="border border-gray-800 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3">
                        Practice Problems
                    </h3>
                    <p className="text-gray-400">
                        Latihan soal dengan pembahasan otomatis.
                    </p>
                </div>

                <div className="border border-gray-800 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3">
                        Progress Tracking
                    </h3>
                    <p className="text-gray-400">
                        Pantau perkembangan belajar kamu.
                    </p>
                </div>

            </section>

        </div>
    );
}