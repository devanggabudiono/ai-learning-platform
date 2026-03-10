
export default function Learn() {
    return (
        <div>

            <h1 className="text-4xl font-bold mb-8">
                Learning Topics
            </h1>

            <div className="grid md:grid-cols-3 gap-6">

                <div className="border border-gray-800 p-6 rounded">
                    Mechanics
                </div>

                <div className="border border-gray-800 p-6 rounded">
                    Electromagnetism
                </div>

                <div className="border border-gray-800 p-6 rounded">
                    Quantum Mechanics
                </div>

            </div>

        </div>
    );
}