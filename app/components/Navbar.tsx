"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sparkles, NotebookPen, Calculator, HeartPulse } from "lucide-react"

const NAV_LINKS = [
    { href: "/",        label: "Home",    color: "hover:text-white" },
    { href: "/learn",   label: "Learn",   color: "hover:text-white" },
    { href: "/notes",   label: "Notes",   icon: <NotebookPen size={14} />, color: "hover:text-amber-400" },
    { href: "/finance", label: "Finance", icon: <Calculator size={14} />,  color: "hover:text-green-400", matchPrefix: true },
    { href: "/health",  label: "Health",  icon: <HeartPulse size={14} />,  color: "hover:text-rose-400"  },
]

export default function Navbar() {
    const pathname = usePathname()

    const isActive = (href: string, matchPrefix?: boolean) =>
        matchPrefix ? pathname.startsWith(href) : pathname === href

    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 border-b border-[#1f2229] bg-[#0f1115]/80 backdrop-blur-md">

            {/* Logo */}
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                    <Sparkles size={18} className="text-blue-400" />
                </div>
                <h1 className="text-xl font-bold tracking-tight">
                    NI<span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">BIT</span>
                </h1>
            </div>

            {/* Links */}
            <div className="flex gap-6 lg:gap-8 text-neutral-400 font-medium text-sm">
                {NAV_LINKS.map(({ href, label, icon, color, matchPrefix }) => {
                    const active = isActive(href, matchPrefix)
                    return (
                        <div key={href} className="relative flex flex-col items-center gap-0.5">
                            <Link
                                href={href}
                                className={`flex items-center gap-1.5 transition-colors duration-150
                                    ${active ? "text-[#22d3ee]" : `text-neutral-400 ${color}`}`}
                                style={active ? { textShadow: "0 0 8px rgba(34,211,238,0.6)" } : undefined}
                            >
                                {icon}
                                {label}
                            </Link>
                            {/* Active indicator — cyan neon underline */}
                            {active && (
                                <span
                                    className="absolute -bottom-[18px] left-0 right-0 h-[2px] rounded-full bg-[#22d3ee]"
                                    style={{ boxShadow: "0 0 6px rgba(34,211,238,0.9), 0 0 12px rgba(34,211,238,0.5)" }}
                                />
                            )}
                        </div>
                    )
                })}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
                <Link href="/dashboard" className="text-neutral-400 hover:text-white transition-colors text-sm font-medium mr-2">
                    Dashboard
                </Link>
                <Link href="/profile" className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 text-neutral-300">
                    Profile
                </Link>
                <button className="px-4 py-2 rounded-lg text-sm font-semibold bg-white text-black hover:bg-neutral-200 transition-colors">
                    Sign In
                </button>
            </div>
        </nav>
    )
}
