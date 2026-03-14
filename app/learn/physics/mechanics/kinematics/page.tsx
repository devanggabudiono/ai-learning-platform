export default function KinematicsPage() {

    return (
        <div>

            <h1 className="text-3xl font-bold mb-6">
                Kinematics
            </h1>

            <p className="text-gray-400 mb-6">
                Kinematics describes motion without considering the forces
                that cause the motion.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
                Basic Quantities
            </h2>

            <ul className="list-disc pl-6 text-gray-400 space-y-2">

                <li>Displacement</li>

                <li>Velocity</li>

                <li>Acceleration</li>

            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
                Fundamental Equation
            </h2>

            <p className="text-gray-400">

                v = v₀ + at

            </p>

        </div>
    )
}