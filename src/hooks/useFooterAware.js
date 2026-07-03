import { useState, useEffect } from "react";

const THRESHOLDS = Array.from({ length: 101 }, (_, i) => i / 100);
const isMobile = () => window.innerWidth <= 768;

export default function useFooterAware() {
    const [bottom, setBottom] = useState("1.75rem");
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const footer = document.querySelector("footer");
        if (!footer) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (isMobile()) {
                setHidden(entry.isIntersecting);
                setBottom("1.25rem");
            } else {
                setHidden(false);
                setBottom(
                    entry.isIntersecting
                        ? `calc(${entry.intersectionRect.height}px + 1rem)`
                        : "1.75rem"
                );
            }
        }, { threshold: THRESHOLDS });

        observer.observe(footer);
        return () => observer.disconnect();
    }, []);

    return { bottom, hidden };
}