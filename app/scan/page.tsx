"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function ScanPage() {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [camState, setCamState] = useState<"idle" | "loading" | "active" | "denied">("idle")
    const [snapped, setSnapped] = useState(false)
    const [phase, setPhase] = useState<"idle" | "processing" | "done">("idle")
    const [logLines, setLogLines] = useState<string[]>([])

    const LOG_SEQUENCE = [
        "[SCAN]   CAPTURING FRAME...",
        "[OCR]    EXTRACTING TEXT...",
        "[CALC]   CALCULATING MASS...",
        "[FX]     STABILIZING CURRENCY...",
        "[AI]     MATCHING CATEGORY...",
        "[SYS]    FINALIZING RESULT...",
    ]

    const DUMMY_RESULT = {
        total: "JOMOK",
        category: "SASIMOK",
        confidence: "100%",
        timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
    }

    // Start camera on mount
    useEffect(() => {
        setCamState("loading")
        navigator.mediaDevices
            .getUserMedia({ video: { facingMode: "environment" }, audio: false })
            .then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream
                    videoRef.current.onloadedmetadata = () => {
                        videoRef.current?.play().catch(() => {})
                        setCamState("active")
                    }
                }
            })
            .catch(() => setCamState("denied"))

        // Stop stream on unmount
        return () => {
            if (videoRef.current?.srcObject) {
                const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
                tracks.forEach((t) => t.stop())
            }
        }
    }, [])

    const handleSnap = () => {
        if (phase === "processing") return
        setSnapped(true)
        setPhase("processing")
        setLogLines([])
        setTimeout(() => setSnapped(false), 400)

        // Feed log lines one-by-one every 320ms
        LOG_SEQUENCE.forEach((line, i) => {
            setTimeout(() => {
                setLogLines((prev) => [...prev, line])
            }, i * 320)
        })

        // Show result after all logs
        setTimeout(() => setPhase("done"), LOG_SEQUENCE.length * 320 + 200)
    }

    return (
        <div
            className="relative min-h-[calc(100vh-73px)] w-full overflow-hidden font-mono flex flex-col items-center justify-center gap-5 px-6"
            style={{ backgroundColor: "#000000" }}
        >
            {/* ── CSS Animations ── */}
            <style>{`
                @keyframes scanline {
                    0%   { top: 0%; }
                    100% { top: 100%; }
                }
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50%       { opacity: 0; }
                }
                @keyframes cornerPulse {
                    0%, 100% { opacity: 0.7; }
                    50%       { opacity: 1; filter: drop-shadow(0 0 8px rgba(34,211,238,1)); }
                }
                @keyframes flashWhite {
                    0%   { opacity: 0.7; }
                    50%  { opacity: 1; }
                    100% { opacity: 0; }
                }
                @keyframes logFadeIn {
                    from { opacity: 0; transform: translateX(-6px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
                @keyframes resultReveal {
                    from { opacity: 0; transform: translateY(8px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes crosshairPulse {
                    0%, 100% { opacity: 0.5; filter: drop-shadow(0 0 3px rgba(34,211,238,0.6)); }
                    50%      { opacity: 1;   filter: drop-shadow(0 0 10px rgba(34,211,238,1)); }
                }
                @keyframes aiBoxFloat {
                    0%   { transform: translate(-50%, -50%) translate(0px,   0px); }
                    25%  { transform: translate(-50%, -50%) translate(4px,  -3px); }
                    50%  { transform: translate(-50%, -50%) translate(-3px,  4px); }
                    75%  { transform: translate(-50%, -50%) translate(5px,   2px); }
                    100% { transform: translate(-50%, -50%) translate(0px,   0px); }
                }
            `}</style>

            {/* ── Cyan Coordinate Grid ── */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(34,211,238,0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(34,211,238,0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: "40px 40px",
                }}
            />

            {/* ── CRT Scanline overlay ── */}
            <div
                className="absolute inset-0 pointer-events-none z-20"
                style={{
                    background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 4px)",
                }}
            />

            {/* ── Header ── */}
            <div className="relative z-10 text-center w-full max-w-sm">
                <p className="text-[#22d3ee] text-[9px] tracking-widest uppercase mb-1 opacity-60">
                    &gt; scan.sys — quantum module v1.0
                </p>
                <h1
                    className="text-[#00ff88] text-sm font-bold leading-snug tracking-wide"
                    style={{ textShadow: "0 0 10px rgba(0,255,136,0.8), 2px 2px 0px #003322" }}
                >
                    [SYSTEM] INITIALIZING<br />QUANTUM SCANNER
                    <span style={{ animation: "blink 1s step-start infinite" }}>_</span>
                </h1>
            </div>

            {/* ── Camera Viewport ── */}
            <div className="relative z-10 w-full max-w-sm">
                <div
                    className="relative w-full overflow-hidden bg-[#010f0a]"
                    style={{
                        border: "4px solid #22d3ee",
                        aspectRatio: "4/3",
                        boxShadow: "0 0 0 1px #000, 0 0 24px rgba(34,211,238,0.4), inset 0 0 32px rgba(0,0,0,0.8)",
                    }}
                >
                    {/* Snap flash */}
                    {snapped && (
                        <div
                            className="absolute inset-0 bg-white z-30 pointer-events-none"
                            style={{ animation: "flashWhite 0.35s ease forwards" }}
                        />
                    )}

                    {/* Corner decorations */}
                    {["top-0 left-0", "top-0 right-0 rotate-90", "bottom-0 right-0 rotate-180", "bottom-0 left-0 -rotate-90"].map((cls, i) => (
                        <svg key={i} width="20" height="20" viewBox="0 0 20 20"
                            className={`absolute ${cls} z-20`}
                            style={{ animation: "cornerPulse 2s ease-in-out infinite", imageRendering: "pixelated" }}
                        >
                            <rect x="0" y="0" width="20" height="4" fill="#22d3ee" />
                            <rect x="0" y="0" width="4" height="20" fill="#22d3ee" />
                        </svg>
                    ))}

                    {/* ── GPS Coordinate Labels ── */}
                    {/* Top-left: LAT */}
                    <p className="absolute top-[26px] left-2 z-20 text-[7px] tracking-widest text-[#22d3ee] opacity-70 font-mono">
                        LAT: 7.96° S
                    </p>
                    {/* Top-right: LONG */}
                    <p className="absolute top-[26px] right-2 z-20 text-[7px] tracking-widest text-[#22d3ee] opacity-70 font-mono text-right">
                        LONG: 112.63° E
                    </p>
                    {/* Bottom-right: ALT */}
                    <p className="absolute bottom-7 right-2 z-20 text-[7px] tracking-widest text-[#22d3ee] opacity-70 font-mono text-right">
                        ALT: 444m
                    </p>

                    {/* ── AI Detection Box (dashed yellow, floating) ── */}
                    <div
                        className="absolute z-20 pointer-events-none"
                        style={{
                            top: "50%",
                            left: "50%",
                            width: "38%",
                            height: "45%",
                            border: "2px dashed #ffe566",
                            boxShadow: "0 0 8px rgba(255,229,102,0.3), inset 0 0 8px rgba(255,229,102,0.05)",
                            animation: "aiBoxFloat 3.5s ease-in-out infinite",
                        }}
                    >
                        {/* AI label top-left of box */}
                        <span
                            className="absolute -top-[13px] left-0 text-[#ffe566] text-[7px] tracking-widest font-mono"
                            style={{ textShadow: "0 0 6px rgba(255,229,102,0.8)", animation: "blink 2s step-start infinite" }}
                        >
                            AI: SCANNING
                        </span>
                        {/* Corner dots */}
                        <span className="absolute -top-[2px] -left-[2px] w-[4px] h-[4px] bg-[#ffe566]" />
                        <span className="absolute -top-[2px] -right-[2px] w-[4px] h-[4px] bg-[#ffe566]" />
                        <span className="absolute -bottom-[2px] -left-[2px] w-[4px] h-[4px] bg-[#ffe566]" />
                        <span className="absolute -bottom-[2px] -right-[2px] w-[4px] h-[4px] bg-[#ffe566]" />
                    </div>

                    {/* ── Pulsing Cyan Pixel Crosshair ── */}
                    <div
                        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                        style={{ animation: "crosshairPulse 2s ease-in-out infinite" }}
                    >
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                            style={{ imageRendering: "pixelated" }}
                        >
                            {/* Cross arms */}
                            <rect x="15" y="0"  width="2" height="11" fill="#22d3ee" />
                            <rect x="15" y="21" width="2" height="11" fill="#22d3ee" />
                            <rect x="0"  y="15" width="11" height="2" fill="#22d3ee" />
                            <rect x="21" y="15" width="11" height="2" fill="#22d3ee" />
                            {/* Center pixel */}
                            <rect x="14" y="14" width="4" height="4" fill="#22d3ee" />
                            {/* Inner gap */}
                            <rect x="15" y="15" width="2" height="2" fill="#000" />
                        </svg>
                    </div>

                    {/* Live video stream */}
                    <video
                        ref={videoRef}
                        className="absolute inset-0 w-full h-full object-cover"
                        autoPlay
                        playsInline
                        muted
                        style={{ display: camState === "active" ? "block" : "none" }}
                    />

                    {/* Loading / denied state */}
                    {camState !== "active" && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                            {/* Grid inside camera */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage: `
                                        linear-gradient(rgba(34,211,238,0.07) 1px, transparent 1px),
                                        linear-gradient(90deg, rgba(34,211,238,0.07) 1px, transparent 1px)
                                    `,
                                    backgroundSize: "32px 32px",
                                }}
                            />
                            {/* Crosshair */}
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none"
                                style={{ filter: "drop-shadow(0 0 6px rgba(34,211,238,0.7))", imageRendering: "pixelated" }}
                            >
                                <rect x="22" y="0"  width="4" height="16" fill="rgba(34,211,238,0.5)" />
                                <rect x="22" y="32" width="4" height="16" fill="rgba(34,211,238,0.5)" />
                                <rect x="0"  y="22" width="16" height="4" fill="rgba(34,211,238,0.5)" />
                                <rect x="32" y="22" width="16" height="4" fill="rgba(34,211,238,0.5)" />
                                <rect x="20" y="20" width="8" height="8" fill="#22d3ee" />
                            </svg>
                            <p className="text-[9px] tracking-widest z-10"
                                style={{ color: camState === "denied" ? "#ff4444" : "#22d3ee" }}>
                                {camState === "denied" ? "CAMERA ACCESS DENIED" : "INITIALIZING CAMERA..."}
                            </p>
                        </div>
                    )}

                    {/* Moving scanline — only when active */}
                    {camState === "active" && (
                        <div
                            className="absolute left-0 right-0 h-[3px] z-10 pointer-events-none"
                            style={{
                                background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.7) 20%, rgba(34,211,238,0.9) 50%, rgba(34,211,238,0.7) 80%, transparent)",
                                boxShadow: "0 0 12px rgba(34,211,238,0.6), 0 0 24px rgba(34,211,238,0.3)",
                                animation: "scanline 2.4s linear infinite",
                            }}
                        />
                    )}

                    {/* LIVE indicator */}
                    <div className="absolute bottom-2 left-3 z-20 flex items-center gap-1.5">
                        <span
                            className="w-2 h-2 rounded-full"
                            style={{
                                backgroundColor: camState === "active" ? "#00ff88" : camState === "denied" ? "#ff4444" : "#444",
                                animation: camState === "active" ? "blink 1.2s step-start infinite" : "none",
                                boxShadow: camState === "active" ? "0 0 6px rgba(0,255,136,0.8)" : "none",
                            }}
                        />
                        <span className="text-[8px] tracking-widest uppercase"
                            style={{ color: camState === "active" ? "#00ff88" : "#555" }}>
                            {camState === "active" ? "LIVE" : camState === "denied" ? "OFFLINE" : "WAIT"}
                        </span>
                    </div>

                    {/* Resolution */}
                    <p className="absolute bottom-2 right-3 z-20 text-[#22d3ee] text-[8px] tracking-widest opacity-40">
                        1280×960
                    </p>
                </div>

                {/* Status row */}
                <div className="flex items-center justify-between mt-2 px-1">
                    <p className="text-neutral-600 text-[9px] tracking-wider">
                        MODE: <span className="text-[#22d3ee]">QUANTUM_SCAN</span>
                    </p>
                    <p className="text-neutral-600 text-[9px] tracking-wider">
                        SIG: <span style={{ color: camState === "active" ? "#00ff88" : "#555" }}>
                            {camState === "active" ? "STRONG" : "—"}
                        </span>
                    </p>
                </div>
            </div>

            {/* ── Terminal Log Overlay (processing) ── */}
            {(phase === "processing" || phase === "done") && (
                <div className="relative z-10 w-full max-w-sm">
                    <div
                        className="w-full border border-[#22d3ee]/30 bg-[#000d08] p-3"
                        style={{ boxShadow: "0 0 16px rgba(34,211,238,0.08)" }}
                    >
                        <p className="text-[#22d3ee] text-[8px] tracking-widest uppercase mb-2 opacity-60">&gt; QUANTUM_ANALYSIS.log</p>
                        <div className="flex flex-col gap-1">
                            {logLines.map((line, i) => (
                                <p
                                    key={i}
                                    className="text-[#00ff88] text-[9px] tracking-wide"
                                    style={{ animation: "logFadeIn 0.2s ease forwards" }}
                                >
                                    {line}
                                </p>
                            ))}
                            {phase === "processing" && (
                                <p className="text-[#22d3ee] text-[9px] opacity-50" style={{ animation: "blink 0.7s step-start infinite" }}>
                                    █
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Result card — appears after processing */}
                    {phase === "done" && (
                        <div
                            className="mt-3 w-full border-2 border-[#00ff88] bg-[#001a0d] p-4"
                            style={{
                                boxShadow: "0 0 20px rgba(0,255,136,0.2), 4px 4px 0px #003311",
                                animation: "resultReveal 0.3s ease forwards",
                            }}
                        >
                            <p className="text-[#22d3ee] text-[8px] tracking-widest uppercase mb-3 opacity-60">&gt; RESULT DETECTED</p>

                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-neutral-500 text-[9px] tracking-wider uppercase">Terdeteksi</span>
                                    <span
                                        className="text-[#00ff88] text-base font-bold"
                                        style={{ textShadow: "0 0 10px rgba(0,255,136,0.8), 2px 2px 0px #003322" }}
                                    >
                                        {DUMMY_RESULT.total}
                                    </span>
                                </div>
                                <div className="h-[1px] bg-[#00ff88]/10" />
                                <div className="flex items-center justify-between">
                                    <span className="text-neutral-500 text-[9px] tracking-wider uppercase">Kategori</span>
                                    <span className="text-[#ffe566] text-[11px] font-bold tracking-wide"
                                        style={{ textShadow: "0 0 8px rgba(255,229,102,0.6)" }}>
                                        {DUMMY_RESULT.category}
                                    </span>
                                </div>
                                <div className="h-[1px] bg-[#00ff88]/10" />
                                <div className="flex items-center justify-between">
                                    <span className="text-neutral-500 text-[9px] tracking-wider uppercase">Confidence</span>
                                    <span className="text-[#22d3ee] text-[11px] font-bold">{DUMMY_RESULT.confidence}</span>
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="grid grid-cols-2 gap-2 mt-4">
                                <button
                                    onClick={() => { setPhase("idle"); setLogLines([]) }}
                                    className="py-2 text-[9px] tracking-widest uppercase border border-neutral-700 text-neutral-400 hover:border-cyan-800 hover:text-[#22d3ee] transition-colors"
                                >
                                    ↩ Scan Ulang
                                </button>
                                <button
                                    className="py-2 text-[9px] tracking-widest uppercase font-bold text-black"
                                    style={{ backgroundColor: "#00ff88", border: "2px solid #003311", boxShadow: "2px 2px 0px #003311" }}
                                >
                                    ✓ Simpan Data
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* ── SNAP Button ── */}
            {phase === "idle" && (
            <button
                onClick={handleSnap}
                disabled={camState !== "active"}
                className="relative z-10 w-full max-w-sm py-4 font-mono font-bold text-sm tracking-widest uppercase transition-all duration-100 active:scale-95"
                style={{
                    backgroundColor: camState === "active" ? "#cc0000" : "#1a1a1a",
                    color: camState === "active" ? "#ffffff" : "#333",
                    border: "4px solid #000000",
                    boxShadow: camState === "active"
                        ? "4px 4px 0px #660000, 0 0 16px rgba(204,0,0,0.4)"
                        : "4px 4px 0px #111",
                    cursor: camState === "active" ? "pointer" : "not-allowed",
                    textShadow: camState === "active" ? "1px 1px 0px #660000" : "none",
                }}
            >
                📷 SNAP &amp; ANALYZE DATA
            </button>
            )}

            {/* ── Back ── */}
            <Link
                href="/finance"
                className="relative z-10 border border-neutral-800 px-5 py-2 text-neutral-500 text-[9px] tracking-widest uppercase hover:border-cyan-900 hover:text-[#22d3ee] transition-colors"
            >
                ← Kembali
            </Link>
        </div>
    )
}
