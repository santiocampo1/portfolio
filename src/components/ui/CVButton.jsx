import { useEffect, useRef, useState } from "react";

const mono = { fontFamily: "'DM Mono', monospace" };

const CV_FILES = {
    es: { file: "/CV-SantiagoOcampo.pdf", label: "Descargar CV" },
    en: { file: "/Resume-SantiagoOcampo.pdf", label: "Download CV" },
};

export default function CVButton({ lang }) {
    const { file, label } = CV_FILES[lang] || CV_FILES.es;
    const [bottom, setBottom] = useState("1.75rem");

    useEffect(() => {
        const footer = document.querySelector("footer");
        if (!footer) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    const visible = entry.intersectionRect.height;
                    setBottom(`calc(${visible}px + 1rem)`);
                } else {
                    setBottom("1.75rem");
                }
            },
            { threshold: Array.from({ length: 101 }, (_, i) => i / 100) }
        );

        observer.observe(footer);
        return () => observer.disconnect();
    }, []);

    return (
        <a
            href={file}
            download
            title={label}
            className="cv-btn"
            style={{
                position: "fixed",
                bottom,
                right: "1.75rem",
                zIndex: 500,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "var(--text)",
                color: "#fff",
                padding: "10px 16px",
                borderRadius: "8px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.14)",
                textDecoration: "none",
                transition: "background 0.2s, transform 0.2s, box-shadow 0.2s, bottom 0.25s ease",
                ...mono,
                fontSize: "0.68rem",
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                fontWeight: 500,
                whiteSpace: "nowrap",
            }}
            onMouseEnter={e => {
                e.currentTarget.style.background = "var(--accent)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(29,78,216,0.25)";
            }}
            onMouseLeave={e => {
                e.currentTarget.style.background = "var(--text)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.14)";
            }}
        >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                <path d="M7 1v8M7 9l-3-3M7 9l3-3M1 11h12" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="cv-btn-label">{label}</span>
            <span className="cv-btn-tooltip">{label}</span>
        </a>
    );
}