"use client"

import { useCallback } from "react"

/**
 * Generates a short 8-bit "pixel click" sound using the Web Audio API.
 * No external file needed — synthesized on the fly.
 * Volume is kept low (0.08) so it's subtle feedback, not disruptive.
 */
export function usePixelClick() {
    const play = useCallback(() => {
        try {
            const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()

            // Oscillator — square wave for 8-bit feel
            const osc = ctx.createOscillator()
            osc.type = "square"
            osc.frequency.setValueAtTime(880, ctx.currentTime)           // start high
            osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.06) // quick drop

            // Gain envelope — sharp attack, fast decay
            const gain = ctx.createGain()
            gain.gain.setValueAtTime(0.08, ctx.currentTime)
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08)

            osc.connect(gain)
            gain.connect(ctx.destination)

            osc.start(ctx.currentTime)
            osc.stop(ctx.currentTime + 0.08)

            // Clean up context after sound finishes
            osc.onended = () => ctx.close()
        } catch {
            // Silently fail if AudioContext isn't available
        }
    }, [])

    return play
}
