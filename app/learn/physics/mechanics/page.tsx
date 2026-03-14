export default function MechanicsPage() {

    return (
        <div>

            <h1 className="text-4xl font-bold mb-6">
                Classical Mechanics
            </h1>

            <p className="text-gray-400 mb-6">
                Classical mechanics studies the motion of objects under the influence
                of forces. It forms the foundation of physics and engineering.
            </p>

            <p className="text-gray-400 mb-6">
                In this section you will learn the fundamental topics of Newtonian
                mechanics including motion, forces, energy, and momentum.
            </p>

            <h2 className="text-2xl font-semibold mt-10 mb-4">
                Topics Covered
            </h2>

            <ul className="list-disc pl-6 text-gray-400 space-y-2">

                <li>Kinematics — motion without forces</li>

                <li>Newton's Laws — relationship between force and motion</li>

                <li>Work and Energy — conservation principles</li>

                <li>Momentum and Collisions</li>

            </ul>

            <p className="text-gray-500 mt-10">
                Select a chapter from the sidebar to begin learning.
            </p>

        </div>
    )
}