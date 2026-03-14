export default function Features() {
    return (
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
    )
}