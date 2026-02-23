import { useState, useEffect } from "react";
import { NAV_SECTIONS } from "../constants/data";

export default function useScrollSpy() {
    const [active, setActive] = useState("hero");

    useEffect(() => {
        const el = document.getElementById("main-scroll");
        if (!el) return;

        const handler = () => {
            const offset = el.scrollTop + 120;
            for (const id of [...NAV_SECTIONS].reverse()) {
                const section = document.getElementById(id);
                if (section && section.offsetTop <= offset) {
                    setActive(id);
                    break;
                }
            }
        };

        el.addEventListener("scroll", handler, { passive: true });
        return () => el.removeEventListener("scroll", handler);
    }, []);

    return active;
}