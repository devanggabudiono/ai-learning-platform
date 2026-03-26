"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

// Pixel star positions [x%, y%, size(1|2), colorType(0=white,1=cyan,2=yellow)]
const STARS: [number, number, number, number][] = [
    [5, 8, 1, 0], [12, 22, 2, 1], [18, 60, 1, 0], [25, 40, 1, 2], [30, 15, 2, 0],
    [38, 75, 1, 1], [44, 30, 1, 0], [50, 88, 2, 2], [57, 5, 1, 0], [63, 50, 1, 1],
    [70, 20, 2, 0], [76, 65, 1, 2], [82, 35, 1, 0], [88, 80, 2, 1], [93, 12, 1, 0],
    [8, 90, 1, 2], [20, 48, 2, 0], [35, 3, 1, 1], [48, 70, 1, 0], [60, 92, 2, 0],
    [72, 42, 1, 1], [85, 58, 1, 2], [96, 28, 2, 0], [15, 33, 1, 0], [55, 17, 1, 1],
    [33, 8, 1, 2], [67, 44, 1, 0], [42, 95, 2, 1], [9, 50, 1, 0], [77, 5, 2, 2],
]
const STAR_COLORS = ["#ffffff", "#22d3ee", "#ffe566"]

// Pre-computed tick mark coordinates to avoid hydration mismatch from Math.sin/cos
const TICK_MARKS = Array.from({ length: 24 }).map((_, i) => {
    const angle = (i / 24) * 360
    const rad = (angle * Math.PI) / 180
    const cos = Math.cos(rad - Math.PI / 2)
    const sin = Math.sin(rad - Math.PI / 2)
    const round = (n: number) => parseFloat(n.toFixed(4))
    return {
        x1: round(40 + 36 * cos),
        y1: round(40 + 36 * sin),
        x2: round(40 + (i % 6 === 0 ? 30 : 33) * cos),
        y2: round(40 + (i % 6 === 0 ? 30 : 33) * sin),
        isMajor: i % 6 === 0,
    }
})

export default function FinancePage() {
    const pathname = usePathname()

    // Nav config — each item declares which pathname it "owns"
    const navItems = [
        {
            href: "/",
            label: "Home",
            matches: ["/", "/dashboard"],
            border: "border-r",
            icon: (active: boolean) => (
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                    style={{ imageRendering: "pixelated", transition: "filter 0.2s ease" }}
                    className={active ? "[filter:drop-shadow(0_0_6px_rgba(34,211,238,0.9))_drop-shadow(0_0_12px_rgba(34,211,238,0.5))]" : ""}
                >
                    <rect x="3" y="8" width="10" height="7" fill={active ? "#22d3ee" : "#4b5563"} />
                    <polygon points="0,9 8,1 16,9" fill={active ? "#22d3ee" : "#4b5563"} />
                    <rect x="6" y="10" width="4" height="5" fill="#000" />
                </svg>
            ),
        },
        {
            href: "/scan",
            label: "Scan",
            matches: ["/scan"],
            border: "border-r",
            icon: (active: boolean) => (
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                    style={{ imageRendering: "pixelated", transition: "filter 0.2s ease" }}
                    className={active ? "[filter:drop-shadow(0_0_6px_rgba(34,211,238,0.9))_drop-shadow(0_0_12px_rgba(34,211,238,0.5))]" : ""}
                >
                    {["1,1,4,2","1,1,2,4","11,1,4,2","13,1,2,4","1,13,4,2","1,11,2,4","11,13,4,2","13,11,2,4"].map((r, i) => {
                        const [x,y,w,h] = r.split(",").map(Number)
                        return <rect key={i} x={x} y={y} width={w} height={h} fill={active ? "#22d3ee" : "#4b5563"} />
                    })}
                    <circle cx="8" cy="8" r="2.5" stroke={active ? "#22d3ee" : "#4b5563"} strokeWidth="1" fill="none" />
                    <line x1="8" y1="5" x2="8" y2="11" stroke={active ? "#22d3ee" : "#4b5563"} strokeWidth="0.8" />
                    <line x1="5" y1="8" x2="11" y2="8" stroke={active ? "#22d3ee" : "#4b5563"} strokeWidth="0.8" />
                </svg>
            ),
        },
        {
            href: "/finance/history",
            label: "History",
            matches: ["/finance", "/finance/history"],
            border: "border-r",
            icon: (active: boolean) => (
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                    style={{ imageRendering: "pixelated", transition: "filter 0.2s ease" }}
                    className={active ? "[filter:drop-shadow(0_0_6px_rgba(34,211,238,0.9))_drop-shadow(0_0_12px_rgba(34,211,238,0.5))]" : ""}
                >
                    <rect x="2" y="1" width="12" height="14" fill={active ? "#0e2d33" : "#374151"} />
                    <rect x="2" y="1" width="2" height="14" fill={active ? "#22d3ee" : "#4b5563"} />
                    <rect x="5" y="4" width="7" height="1" fill={active ? "#22d3ee" : "#6b7280"} />
                    <rect x="5" y="7" width="7" height="1" fill={active ? "#22d3ee" : "#6b7280"} />
                    <rect x="5" y="10" width="4" height="1" fill={active ? "#22d3ee" : "#6b7280"} />
                </svg>
            ),
        },
        {
            href: "/finance/report",
            label: "Report",
            matches: ["/finance/report"],
            border: "",
            icon: (active: boolean) => (
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                    style={{ imageRendering: "pixelated", transition: "filter 0.2s ease" }}
                    className={active ? "[filter:drop-shadow(0_0_6px_rgba(34,211,238,0.9))_drop-shadow(0_0_12px_rgba(34,211,238,0.5))]" : ""}
                >
                    <rect x="1" y="10" width="3" height="5" fill={active ? "#22d3ee" : "#374151"} />
                    <rect x="6" y="7" width="3" height="8" fill={active ? "#22d3ee" : "#374151"} />
                    <rect x="11" y="4" width="3" height="11" fill={active ? "#22d3ee" : "#374151"} />
                    <polyline points="2,9 7,5 12,2" stroke={active ? "#22d3ee" : "#4b5563"} strokeWidth="1.2" fill="none" />
                    <rect x="1" y="15" width="14" height="1" fill={active ? "#22d3ee" : "#4b5563"} />
                </svg>
            ),
        },
    ]

    return (
        <div
            className="relative min-h-[calc(100vh-73px)] w-full overflow-y-auto font-mono"
            style={{ backgroundColor: "#000000" }}
        >
            {/* ── Pixel Star Field ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {STARS.map(([x, y, size, colorType], i) => (
                    <div
                        key={i}
                        className="absolute"
                        style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            width: size === 2 ? "4px" : "2px",
                            height: size === 2 ? "4px" : "2px",
                            backgroundColor: STAR_COLORS[colorType],
                            opacity: colorType === 2 ? 0.55 : (0.35 + (i % 4) * 0.1),
                            imageRendering: "pixelated",
                        }}
                    />
                ))}
            </div>

            {/* ── Physics Grid Overlay ── */}
            <div
                className="absolute inset-0 pointer-events-none z-[1]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
                    `,
                    backgroundSize: "48px 48px",
                }}
            />

            {/* ── CRT Scanline Overlay ── */}
            <div
                className="absolute inset-0 pointer-events-none z-20"
                style={{
                    background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.13) 3px, rgba(0,0,0,0.13) 4px)",
                    mixBlendMode: "multiply",
                }}
            />

            {/* ── Decorative: Atom 8-bit — pojok kanan atas ── */}
            <div
                className="absolute top-4 right-4 z-10 pointer-events-none"
                style={{
                    opacity: 0.35,
                    animation: "atomPulse 3s ease-in-out infinite",
                    filter: "drop-shadow(0 0 6px rgba(34,211,238,0.8))",
                }}
            >
                <style>{`
                    @keyframes atomPulse {
                        0%, 100% { opacity: 0.25; filter: drop-shadow(0 0 4px rgba(34,211,238,0.4)); }
                        50%       { opacity: 0.55; filter: drop-shadow(0 0 12px rgba(34,211,238,0.9)) drop-shadow(0 0 24px rgba(34,211,238,0.4)); }
                    }
                `}</style>
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#22d3ee" strokeWidth="1.2" />
                    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#22d3ee" strokeWidth="1.2" transform="rotate(60 12 12)" />
                    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#22d3ee" strokeWidth="1.2" transform="rotate(120 12 12)" />
                    <circle cx="12" cy="12" r="2" fill="#22d3ee" />
                </svg>
            </div>

            {/* ── Decorative: Saturn Pixel — sela-sela kartu fitur ── */}
            <div className="absolute z-10 pointer-events-none opacity-15" style={{ top: "62%", right: "6%" }}>
                <svg width="44" height="28" viewBox="0 0 44 28" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
                    {/* Ring planet */}
                    <ellipse cx="22" cy="18" rx="20" ry="5" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
                    {/* Body planet */}
                    <circle cx="22" cy="14" r="9" fill="#4a5568" stroke="#94a3b8" strokeWidth="1" />
                    {/* Band planet */}
                    <ellipse cx="22" cy="13" rx="7" ry="2" fill="none" stroke="#64748b" strokeWidth="0.8" />
                    <ellipse cx="22" cy="16" rx="6" ry="1.5" fill="none" stroke="#64748b" strokeWidth="0.8" />
                </svg>
            </div>

            {/* ── Content ── */}
            <div className="relative z-10 flex flex-col items-start pt-6 px-6 text-left pb-24">

                {/* Decorative: Satellite kecil di dekat judul */}
                <div className="flex items-center gap-2 mb-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-50">
                        <rect x="9" y="9" width="6" height="6" rx="1" stroke="#22d3ee" strokeWidth="1.5" />
                        <line x1="12" y1="2" x2="12" y2="7" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="12" y1="17" x2="12" y2="22" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="2" y1="12" x2="7" y2="12" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="17" y1="12" x2="22" y2="12" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span className="text-[#22d3ee] text-[9px] font-mono tracking-widest uppercase opacity-60">finance.sys v2.6</span>
                </div>

                {/* Greeting */}
                <h1 className="text-[#ffff00] text-2xl font-bold leading-snug tracking-tight">
                    WOI, WONG SOLO! 👋
                </h1>

                {/* ── Kartu Total Balance ── */}
                <div
                    className="relative mt-5 w-full border-4 border-black p-5 overflow-hidden"
                    style={{
                        backgroundColor: "#0a0a0a",
                        boxShadow: "6px 6px 0px #111111",
                        imageRendering: "pixelated",
                    }}
                >
                    {/* ── Pixel Star Scatter di dalam kartu ── */}
                    {([
                        [8, 12], [18, 55], [28, 80], [42, 20], [55, 65], [68, 30], [78, 72], [90, 10], [14, 40], [35, 90], [50, 8], [82, 48],
                    ] as [number, number][]).map(([x, y], i) => (
                        <div
                            key={i}
                            className="absolute pointer-events-none"
                            style={{
                                left: `${x}%`, top: `${y}%`,
                                width: i % 3 === 0 ? "3px" : "2px",
                                height: i % 3 === 0 ? "3px" : "2px",
                                backgroundColor: i % 4 === 0 ? "#22d3ee" : "#ffffff",
                                opacity: 0.25 + (i % 3) * 0.1,
                            }}
                        />
                    ))}

                    {/* ── Orbital Path SVG — garis orbit + planet + satelit ── */}
                    <svg
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="xMidYMid slice"
                    >
                        {/* Garis koordinat horizontal */}
                        <line x1="0" y1="33%" x2="100%" y2="33%" stroke="rgba(139,92,246,0.1)" strokeWidth="0.7" strokeDasharray="5 10" />
                        <line x1="0" y1="66%" x2="100%" y2="66%" stroke="rgba(139,92,246,0.06)" strokeWidth="0.7" strokeDasharray="5 10" />
                        {/* Garis koordinat vertikal */}
                        <line x1="25%" y1="0" x2="25%" y2="100%" stroke="rgba(34,211,238,0.06)" strokeWidth="0.6" strokeDasharray="3 9" />
                        <line x1="75%" y1="0" x2="75%" y2="100%" stroke="rgba(34,211,238,0.04)" strokeWidth="0.6" strokeDasharray="3 9" />

                        {/* ── Orbital Ring Utama ── */}
                        {/* Ring luar — dashed tipis */}
                        <ellipse
                            cx="80%" cy="50%" rx="90" ry="42"
                            fill="none"
                            stroke="rgba(34,211,238,0.18)"
                            strokeWidth="1"
                            strokeDasharray="4 7"
                        />
                        {/* Ring dalam — lebih tipis + warna berbeda */}
                        <ellipse
                            cx="80%" cy="50%" rx="60" ry="27"
                            fill="none"
                            stroke="rgba(167,139,250,0.14)"
                            strokeWidth="0.8"
                            strokeDasharray="2 6"
                        />

                        {/* ── Planet Pixel di orbit luar ── */}
                        {/* Shadow glow planet */}
                        <circle cx="80%" cy="10%" r="8" fill="rgba(167,139,250,0.08)" />
                        {/* Body planet */}
                        <circle cx="80%" cy="10%" r="5" fill="#4a3770" stroke="rgba(167,139,250,0.6)" strokeWidth="1" />
                        {/* Band planet horizontal (pixel style) */}
                        <rect x="0" y="0" width="8" height="1.5"
                            fill="rgba(139,92,246,0.5)"
                            transform="translate(calc(80% - 4px), calc(10% - 0.75px))"
                        />
                        {/* Dot atmosfer */}
                        <circle cx="80%" cy="10%" r="2" fill="rgba(167,139,250,0.4)" />

                        {/* ── Satelit Pixel di orbit dalam ── */}
                        {/* Body satelit — kotak kecil */}
                        <rect x="-4" y="-3" width="8" height="6" rx="1"
                            fill="rgba(34,211,238,0.15)"
                            stroke="rgba(34,211,238,0.7)"
                            strokeWidth="0.8"
                            transform="translate(56%, 80%)"
                        />
                        {/* Panel surya kiri */}
                        <rect x="-10" y="-1" width="5" height="2" rx="0"
                            fill="rgba(34,211,238,0.4)"
                            transform="translate(56%, 80%)"
                        />
                        {/* Panel surya kanan */}
                        <rect x="5" y="-1" width="5" height="2" rx="0"
                            fill="rgba(34,211,238,0.4)"
                            transform="translate(56%, 80%)"
                        />
                        {/* Antena satelit */}
                        <line
                            x1="0" y1="-5" x2="0" y2="-3"
                            stroke="rgba(34,211,238,0.6)" strokeWidth="0.8"
                            transform="translate(56%, 80%)"
                        />
                        <circle cx="0" cy="-6" r="1"
                            fill="rgba(34,211,238,0.7)"
                            transform="translate(56%, 80%)"
                        />

                        {/* Crosshair kiri bawah */}
                        <line x1="15" y1="75%" x2="35" y2="75%" stroke="rgba(34,211,238,0.18)" strokeWidth="0.8" />
                        <line x1="25" y1="68%" x2="25" y2="82%" stroke="rgba(34,211,238,0.18)" strokeWidth="0.8" />
                        <circle cx="25" cy="75%" r="4" fill="none" stroke="rgba(34,211,238,0.12)" strokeWidth="0.8" />
                    </svg>

                    {/* ── Futuristic Glowing Wallet Icon — pojok kanan atas ── */}
                    <div className="absolute top-4 right-4 z-10">
                        <div style={{ filter: "drop-shadow(0 0 6px rgba(34,211,238,0.7)) drop-shadow(0 0 14px rgba(34,211,238,0.35))" }}>
                            <svg width="30" height="26" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* Body */}
                                <rect x="1" y="4" width="28" height="20" rx="2" stroke="#22d3ee" strokeWidth="1.4" fill="rgba(34,211,238,0.06)" />
                                {/* Flap atas */}
                                <path d="M5 4V2.5C5 1.7 5.7 1 6.5 1H23.5C24.3 1 25 1.7 25 2.5V4" stroke="#22d3ee" strokeWidth="1.2" />
                                {/* Coin pocket */}
                                <rect x="18" y="11" width="9" height="8" rx="1" fill="rgba(34,211,238,0.1)" stroke="#22d3ee" strokeWidth="1" />
                                {/* Coin */}
                                <circle cx="22.5" cy="15" r="2" fill="rgba(34,211,238,0.35)" stroke="#22d3ee" strokeWidth="0.8" />
                                {/* Garis kartu debit */}
                                <line x1="4" y1="11" x2="14" y2="11" stroke="rgba(34,211,238,0.4)" strokeWidth="1" strokeLinecap="round" />
                                <line x1="4" y1="15" x2="11" y2="15" stroke="rgba(34,211,238,0.25)" strokeWidth="0.8" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>

                    {/* Label */}
                    <p className="text-[#22d3ee] text-[10px] font-mono uppercase tracking-widest mb-3">
                        &gt; TOTAL BALANCE
                    </p>

                    {/* Nominal */}
                    <p
                        className="font-bold leading-none font-mono"
                        style={{
                            fontSize: "clamp(2rem, 9vw, 3.5rem)",
                            color: "#ff00ff",
                            textShadow: "3px 3px 0px #7700aa",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Rp 226.000
                    </p>

                    {/* Sub-label */}
                    <p className="text-[#aaaaaa] text-[10px] font-mono mt-2 tracking-wider">
                        _ SALDO AKTIF █
                    </p>

                    {/* ── Income / Expense Modules ── */}
                    <div className="grid grid-cols-2 gap-3 mt-4">
                        {/* Income Module */}
                        <div>
                            <p className="text-[#aaaaaa] text-[9px] font-mono uppercase tracking-widest mb-1">
                                &gt; INCOME
                            </p>
                            <p className="text-[#00ff88] text-base font-bold font-mono leading-tight">
                                +Rp 930.000
                            </p>
                            {/* Indikator garis hijau */}
                            <div className="mt-2 h-[2px] w-full bg-[#1a1a1a]">
                                <div className="h-full bg-[#00ff88]" style={{ width: "72%" }} />
                            </div>
                        </div>

                        {/* Expense Module */}
                        <div>
                            <p className="text-[#aaaaaa] text-[9px] font-mono uppercase tracking-widest mb-1">
                                &gt; EXPENSE
                            </p>
                            <p className="text-[#ff4444] text-base font-bold font-mono leading-tight">
                                -Rp 704.000
                            </p>
                            {/* Indikator garis merah */}
                            <div className="mt-2 h-[2px] w-full bg-[#1a1a1a]">
                                <div className="h-full bg-[#ff4444]" style={{ width: "54%" }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Action Buttons ── */}
                <div className="grid grid-cols-2 gap-3 mt-4 w-full">

                    {/* Add Income */}
                    <button
                        className="group flex items-center justify-center gap-2 border border-neutral-700 bg-[#0a0a0a] px-4 py-3 font-mono text-sm font-bold text-[#00ff88] uppercase tracking-widest transition-colors duration-150 hover:border-cyan-400 hover:text-cyan-300 hover:bg-[#0d1f1f]"
                    >
                        {/* Ikon atom */}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                            <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" />
                            <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)" />
                            <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 12 12)" />
                            <circle cx="12" cy="12" r="2" fill="currentColor" />
                        </svg>
                        Add Income
                    </button>

                    {/* Add Expense */}
                    <button
                        className="group flex items-center justify-center gap-2 border border-neutral-700 bg-[#0a0a0a] px-4 py-3 font-mono text-sm font-bold text-[#ff4444] uppercase tracking-widest transition-colors duration-150 hover:border-cyan-400 hover:text-cyan-300 hover:bg-[#0d1f1f]"
                    >
                        {/* Ikon satelit */}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                            <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                            <line x1="12" y1="2" x2="12" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <line x1="12" y1="17" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <line x1="2" y1="12" x2="7" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <line x1="17" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <circle cx="12" cy="4.5" r="1.5" fill="currentColor" opacity="0.6" />
                            <circle cx="12" cy="19.5" r="1.5" fill="currentColor" opacity="0.6" />
                        </svg>
                        Add Expense
                    </button>

                </div>

                {/* ──────────────────────────────── */}
                {/* ── Fitur Orbit (Bento Grid) ── */}
                {/* ──────────────────────────────── */}
                <div className="mt-6 w-full">
                    <p className="text-neutral-500 text-[9px] font-mono uppercase tracking-widest mb-3">
                        &gt; FITUR ORBIT
                    </p>
                    <div className="grid grid-cols-4 gap-2">

                        {/* Cuan Performance */}
                        <div className="border border-neutral-700 bg-[#0a0a0a] p-3 flex flex-col items-center gap-2 hover:border-cyan-700 transition-colors cursor-pointer">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="8" r="3" stroke="#22d3ee" strokeWidth="1.4" />
                                <circle cx="12" cy="8" r="1" fill="#22d3ee" opacity="0.6" />
                                <line x1="3" y1="20" x2="21" y2="20" stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round" />
                                <line x1="5" y1="15" x2="7" y2="12" stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round" />
                                <line x1="9" y1="11" x2="15" y2="11" stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round" />
                                <line x1="17" y1="12" x2="19" y2="15" stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round" />
                            </svg>
                            <span className="text-[8px] font-mono text-neutral-400 text-center leading-tight">Cuan Performance</span>
                        </div>

                        {/* Budgeting Challenge */}
                        <div className="border border-neutral-700 bg-[#0a0a0a] p-3 flex flex-col items-center gap-2 hover:border-cyan-700 transition-colors cursor-pointer">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="9" stroke="#38bdf8" strokeWidth="1.4" />
                                <circle cx="12" cy="12" r="9" stroke="#38bdf8" strokeWidth="4" strokeDasharray={`${2 * Math.PI * 9 * 0.72} ${2 * Math.PI * 9}`} strokeDashoffset="0" strokeLinecap="butt" transform="rotate(-90 12 12)" opacity="0.25" />
                                <text x="12" y="15.5" textAnchor="middle" fill="#38bdf8" fontSize="6" fontFamily="monospace" fontWeight="bold">72%</text>
                            </svg>
                            <span className="text-[8px] font-mono text-neutral-400 text-center leading-tight">Budgeting</span>
                        </div>

                        {/* Dream Journey */}
                        <div className="border border-neutral-700 bg-[#0a0a0a] p-3 flex flex-col items-center gap-2 hover:border-cyan-700 transition-colors cursor-pointer">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L9 9H3L8 13.5L6 21L12 17L18 21L16 13.5L21 9H15L12 2Z" stroke="#a78bfa" strokeWidth="1.3" strokeLinejoin="round" />
                                <circle cx="12" cy="11" r="2" fill="rgba(167,139,250,0.35)" />
                            </svg>
                            <span className="text-[8px] font-mono text-neutral-400 text-center leading-tight">Dream Journey</span>
                        </div>

                        {/* Duit Nganggur */}
                        <div className="border border-neutral-700 bg-[#0a0a0a] p-3 flex flex-col items-center gap-2 hover:border-cyan-700 transition-colors cursor-pointer">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9" cy="8" r="3" stroke="#f472b6" strokeWidth="1.3" />
                                <circle cx="15" cy="8" r="3" stroke="#f472b6" strokeWidth="1.3" />
                                <path d="M3 20C3 16.7 5.7 14 9 14" stroke="#f472b6" strokeWidth="1.3" strokeLinecap="round" />
                                <path d="M21 20C21 16.7 18.3 14 15 14" stroke="#f472b6" strokeWidth="1.3" strokeLinecap="round" />
                                <line x1="12" y1="14" x2="12" y2="20" stroke="#f472b6" strokeWidth="1" strokeDasharray="2 2" strokeLinecap="round" />
                            </svg>
                            <span className="text-[8px] font-mono text-neutral-400 text-center leading-tight">Uang Nganggur</span>
                        </div>

                    </div>
                </div>

                {/* ────────────────────────────────── */}
                {/* ── Dream Journey — Solo Travel ── */}
                {/* ────────────────────────────────── */}
                <div className="mt-4 w-full border border-neutral-700 bg-[#0a0a0a] p-4 relative overflow-hidden">
                    {/* Gradient accent kiri */}
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#a78bfa] via-[#22d3ee] to-transparent" />

                    <div className="flex items-start gap-4 pl-3">
                        {/* Ikon roket */}
                        <div className="shrink-0 mt-0.5" style={{ filter: "drop-shadow(0 0 5px rgba(167,139,250,0.6))" }}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C12 2 7 7 7 13H17C17 7 12 2 12 2Z" stroke="#a78bfa" strokeWidth="1.4" strokeLinejoin="round" />
                                <rect x="9" y="13" width="6" height="5" stroke="#a78bfa" strokeWidth="1.2" />
                                <path d="M9 13L6 18M15 13L18 18" stroke="#a78bfa" strokeWidth="1.2" strokeLinecap="round" />
                                <circle cx="12" cy="9" r="1.5" fill="rgba(167,139,250,0.5)" />
                                <line x1="12" y1="18" x2="12" y2="22" stroke="#a78bfa" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="1.5 2" />
                            </svg>
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                                <p className="text-[#a78bfa] text-[9px] font-mono uppercase tracking-widest">
                                    &gt; DREAM JOURNEY
                                </p>
                                <span className="text-[8px] font-mono text-neutral-600">SOLO TRAVEL</span>
                            </div>
                            <p className="text-white text-sm font-bold font-mono leading-tight mb-2">
                                Ngawi Trip 🏯
                            </p>
                            {/* Progress bar */}
                            <div className="flex items-center gap-2">
                                <div className="flex-1 h-[3px] bg-[#1a1a2e]">
                                    <div className="h-full bg-gradient-to-r from-[#a78bfa] to-[#22d3ee]" style={{ width: "38%" }} />
                                </div>
                                <span className="text-[8px] font-mono text-neutral-500 shrink-0">38%</span>
                            </div>
                            <div className="flex items-center justify-between mt-1.5">
                                <p className="text-neutral-600 text-[9px] font-mono">Rp 380.000 / Rp 1.000.000</p>
                                <p className="text-[#22d3ee] text-[9px] font-mono">ETA: Jun&apos;25</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Feature Grid ── */}
                <div className="grid grid-cols-2 gap-3 mt-6 w-full mb-8">

                    {/* ── Cuan Performance (Line Chart) ── */}
                    <div className="border border-neutral-700 bg-[#0a0a0a] p-4 flex flex-col gap-3">
                        <p className="text-neutral-400 text-[9px] font-mono uppercase tracking-widest">
                            &gt; CUAN PERFORMANCE
                        </p>
                        {/* Mini line chart SVG */}
                        <svg viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
                            {/* Grid lines */}
                            <line x1="0" y1="10" x2="80" y2="10" stroke="#1f2937" strokeWidth="0.8" />
                            <line x1="0" y1="20" x2="80" y2="20" stroke="#1f2937" strokeWidth="0.8" />
                            <line x1="0" y1="30" x2="80" y2="30" stroke="#1f2937" strokeWidth="0.8" />
                            {/* Area fill */}
                            <polygon
                                points="0,38 12,30 24,34 36,18 48,22 60,10 72,14 80,8 80,40 0,40"
                                fill="rgba(34,211,238,0.08)"
                            />
                            {/* Line */}
                            <polyline
                                points="0,38 12,30 24,34 36,18 48,22 60,10 72,14 80,8"
                                fill="none"
                                stroke="#22d3ee"
                                strokeWidth="1.5"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                            />
                            {/* Dots */}
                            {[[0, 38], [12, 30], [24, 34], [36, 18], [48, 22], [60, 10], [72, 14], [80, 8]].map(([x, y], i) => (
                                <circle key={i} cx={x} cy={y} r="2" fill="#22d3ee" />
                            ))}
                        </svg>
                        <p className="text-[#22d3ee] text-xs font-bold font-mono">+18.4%</p>
                        <p className="text-neutral-600 text-[9px] font-mono">30 hari terakhir</p>
                    </div>

                    {/* ── Budgeting Challenge (Circular Progress) ── */}
                    <div className="border border-neutral-700 bg-[#0a0a0a] p-4 flex flex-col items-center gap-2">
                        <p className="text-neutral-400 text-[9px] font-mono uppercase tracking-widest self-start">
                            &gt; BUDGET O₂
                        </p>
                        {/* Circular progress — gaya indikator oksigen astronot */}
                        <svg viewBox="0 0 80 80" className="w-20 h-20" xmlns="http://www.w3.org/2000/svg">
                            {/* Track (outer ring) */}
                            <circle cx="40" cy="40" r="32" fill="none" stroke="#1f2937" strokeWidth="6" />
                            {/* Tick marks */}
                            {TICK_MARKS.map(({ x1, y1, x2, y2, isMajor }, i) => (
                                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                                    stroke={isMajor ? "#94a3b8" : "#374151"}
                                    strokeWidth={isMajor ? "1.2" : "0.6"}
                                />
                            ))}
                            {/* Progress arc — 72% = 259.2deg of 360 */}
                            <circle
                                cx="40" cy="40" r="28"
                                fill="none"
                                stroke="#38bdf8"
                                strokeWidth="5"
                                strokeDasharray={`${2 * Math.PI * 28 * 0.72} ${2 * Math.PI * 28}`}
                                strokeLinecap="butt"
                                strokeDashoffset={0}
                                transform="rotate(-90 40 40)"
                            />
                            {/* Center label */}
                            <text x="40" y="37" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontFamily="monospace" fontWeight="bold">72%</text>
                            <text x="40" y="48" textAnchor="middle" fill="#64748b" fontSize="5.5" fontFamily="monospace">O2 STABLE</text>
                        </svg>
                        <p className="text-[#38bdf8] text-[10px] font-mono font-bold">Budget aman</p>
                        <p className="text-neutral-600 text-[9px] font-mono">Rp 196.000 tersisa</p>
                    </div>

                </div>

            </div>

            {/* ── Fixed HUD Navigation Bar ── */}
            <nav
                className="fixed bottom-0 left-0 right-0 z-50 font-mono backdrop-blur-md bg-black/80"
                style={{
                    borderTop: "2px solid rgba(34,211,238,0.6)",
                    boxShadow: "0 -1px 0 rgba(34,211,238,0.15), 0 -8px 32px rgba(0,0,0,0.8)",
                }}
            >
                {/* Cyan neon line — pixel tegas */}
                <div
                    className="absolute top-0 left-0 right-0 h-[1px]"
                    style={{ background: "linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.9) 30%, rgba(34,211,238,1) 50%, rgba(34,211,238,0.9) 70%, transparent 100%)" }}
                />

                <div className="grid grid-cols-4">
                    {navItems.map(({ href, label, matches, border, icon }) => {
                        const isActive = matches.includes(pathname)
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`group flex flex-col items-center justify-center gap-1.5 py-3 transition-colors
                                    ${border ? `${border} border-white/5` : ""}
                                    ${isActive ? "bg-cyan-950/20" : "hover:bg-cyan-950/20"}`}
                            >
                                {icon(isActive)}
                                <span
                                    className="text-[8px] tracking-widest uppercase transition-colors duration-200 font-bold"
                                    style={{
                                        color: isActive ? "#22d3ee" : "#4b5563",
                                        textShadow: isActive ? "0 0 8px rgba(34,211,238,0.9)" : "none",
                                    }}
                                >
                                    {label}
                                </span>
                                {/* Active indicator bar */}
                                {isActive && (
                                    <span
                                        className="w-4 h-[2px] bg-[#22d3ee] rounded-full"
                                        style={{ boxShadow: "0 0 6px rgba(34,211,238,0.9), 0 0 12px rgba(34,211,238,0.5)" }}
                                    />
                                )}
                            </Link>
                        )
                    })}
                </div>
            </nav>

        </div>
    )
}
