"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function MechanicsLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const pathname = usePathname()

    const links = [
        {
            name: "Kinematics",
            href: "/learn/physics/mechanics/kinematics"
        },
        {
            name: "Newton's Laws",
            href: "/learn/physics/mechanics/newton-laws"
        },
        {
            name: "Work & Energy",
            href: "/learn/physics/mechanics/energy"
        },
        {
            name: "Momentum",
            href: "/learn/physics/mechanics/momentum"
        }
    ]

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">

            <div className="flex gap-16">

                {/* SIDEBAR */}

                <aside className="w-64 shrink-0">

                    <h2 className="text-xl font-semibold mb-6">
                        Mechanics
                    </h2>

                    <ul className="space-y-2">

                        {links.map((link) => {

                            const active = pathname.startsWith(link.href)

                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={`block px-4 py-2 rounded-lg transition
                    ${active
                                                ? "bg-blue-600 text-white"
                                                : "text-gray-400 hover:text-white hover:bg-gray-800"
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            )

                        })}

                    </ul>

                </aside>


                {/* CONTENT */}

                <main className="flex-1 max-w-3xl">
                    {children}
                </main>

            </div>

        </div>
    )
}