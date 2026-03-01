import { useState, useEffect } from "react";
import { NAV_SECTIONS } from "../constants/data";

/**
 * Tracks which section id is currently in view and
 * whether the page has been scrolled past a threshold.
 */
export default function useScrollSpy(threshold = 120) {
    const [activeSection, setActiveSection] = useState("hero");
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handler = () => {
            setScrolled(window.scrollY > 40);
            for (const id of NAV_SECTIONS) {
                const el = document.getElementById(id);
                if (el) {
                    const { top, bottom } = el.getBoundingClientRect();
                    if (top <= threshold && bottom >= threshold) {
                        setActiveSection(id);
                        break;
                    }
                }
            }
        };
        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, [threshold]);

    return { activeSection, scrolled };
}