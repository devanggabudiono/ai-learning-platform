
export default function AITutor() {
    return (
        <div className="max-w-3xl mx-auto">

            <h1 className="text-3xl font-bold mb-6">
                AI Tutor
            </h1>

            <textarea
                className="w-full bg-gray-900 border border-gray-700 p-4 rounded-lg"
                placeholder="Ask a physics question..."
            />

            <button className="mt-4 bg-blue-600 px-6 py-2 rounded">
                Ask
            </button>

        </div>
    );
}