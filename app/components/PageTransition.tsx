"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { usePixelClick } from "../hooks/usePixelClick"

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const playClick = usePixelClick()

    // Intercept all <a> clicks inside this wrapper and play the pixel sound
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest("a")
            if (target && target.href && !target.href.startsWith("mailto:") && !target.href.startsWith("tel:")) {
                playClick()
            }
        }
        document.addEventListener("click", handleClick)
        return () => document.removeEventListener("click", handleClick)
    }, [playClick])

    return (
        <>
            <style>{`
                @keyframes pageEnter {
                    from {
                        opacity: 0;
                        transform: scale(0.97);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                .page-enter {
                    animation: pageEnter 0.2s ease forwards;
                }
            `}</style>
            {/* key={pathname} forces React to unmount + remount on every route change,
                re-triggering the CSS animation cleanly */}
            <div key={pathname} className="page-enter" style={{ minHeight: "100%" }}>
                {children}
            </div>
        </>
    )
}
