export default function PhysicsPage() {
    return (
        <div className="max-w-6xl mx-auto py-20">

            <h1 className="text-4xl font-bold mb-12 text-center">
                Physics Topics
            </h1>

            <div className="grid md:grid-cols-2 gap-10">

                <a
                    href="/learn/physics/mechanics"
                    className="border border-gray-800 p-8 rounded-xl hover:border-blue-500 transition"
                >
                    <h2 className="text-2xl font-semibold mb-3">
                        Classical Mechanics
                    </h2>

                    <p className="text-gray-400">
                        Motion, forces, Newton's laws, energy, and momentum.
                    </p>
                </a>

                <a
                    href="/learn/physics/electromagnetism"
                    className="border border-gray-800 p-8 rounded-xl hover:border-blue-500 transition"
                >
                    <h2 className="text-2xl font-semibold mb-3">
                        Electromagnetism
                    </h2>

                    <p className="text-gray-400">
                        Electric fields, magnetic fields, Maxwell equations.
                    </p>
                </a>

                <a
                    href="/learn/physics/thermodynamics"
                    className="border border-gray-800 p-8 rounded-xl hover:border-blue-500 transition"
                >
                    <h2 className="text-2xl font-semibold mb-3">
                        Thermodynamics
                    </h2>

                    <p className="text-gray-400">
                        Heat, entropy, and laws of thermodynamics.
                    </p>
                </a>

                <a
                    href="/learn/physics/quantum"
                    className="border border-gray-800 p-8 rounded-xl hover:border-blue-500 transition"
                >
                    <h2 className="text-2xl font-semibold mb-3">
                        Quantum Mechanics
                    </h2>

                    <p className="text-gray-400">
                        Wave functions, operators, and quantum states.
                    </p>
                </a>

            </div>

        </div>
    )
}