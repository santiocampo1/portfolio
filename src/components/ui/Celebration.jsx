import { useEffect, useState } from "react";

const sans = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const mono = { fontFamily: "'DM Mono', monospace" };

const COLORS = ["#1D4ED8", "#60A5FA", "#111111", "#FBBF24", "#34D399", "#F87171", "#A78BFA"];

function Confetti() {
    const pieces = Array.from({ length: 60 }, (_, i) => ({
        id: i,
        color: COLORS[i % COLORS.length],
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 1.5}s`,
        duration: `${2.5 + Math.random() * 2}s`,
        size: `${6 + Math.random() * 8}px`,
        rotation: `${Math.random() * 360}deg`,
        shape: Math.random() > 0.5 ? "50%" : "0%",
    }));

    return (
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 998, overflow: "hidden" }}>
            {pieces.map(p => (
                <div key={p.id} style={{
                    position: "absolute",
                    top: "-20px",
                    left: p.left,
                    width: p.size,
                    height: p.size,
                    background: p.color,
                    borderRadius: p.shape,
                    transform: `rotate(${p.rotation})`,
                    animation: `confetti-fall ${p.duration} ${p.delay} ease-in forwards`,
                    opacity: 0.9,
                }} />
            ))}
            <style>{`
        @keyframes confetti-fall {
          0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
        </div>
    );
}

export default function Celebration({ count, onClose, onGuestbook, t }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    function handleClose() {
        setVisible(false);
        setTimeout(onClose, 350);
    }

    function handleGuestbook() {
        handleClose();
        setTimeout(onGuestbook, 400);
    }

    const c = t.celebration;

    return (
        <>
            <Confetti />

            {/* Overlay */}
            <div
                onClick={handleClose}
                style={{
                    position: "fixed", inset: 0,
                    background: "rgba(0,0,0,0.35)",
                    zIndex: 999,
                    opacity: visible ? 1 : 0,
                    transition: "opacity 0.35s ease",
                }}
            />

            {/* Modal */}
            <div style={{
                position: "fixed",
                top: "50%", left: "50%",
                transform: `translate(-50%, ${visible ? "-50%" : "-44%"})`,
                opacity: visible ? 1 : 0,
                transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.35s ease",
                zIndex: 1000,
                background: "#fff",
                borderRadius: "16px",
                border: "1.5px solid var(--border)",
                boxShadow: "0 24px 64px rgba(0,0,0,0.14)",
                padding: "2.5rem 2rem",
                maxWidth: "420px",
                width: "90vw",
                textAlign: "center",
            }}>
                {/* Emoji */}
                <div style={{ fontSize: "3rem", lineHeight: 1, marginBottom: "1rem" }}>🎉</div>

                {/* Title */}
                <h2 style={{
                    ...sans, fontWeight: 800,
                    fontSize: "clamp(1.3rem, 4vw, 1.7rem)",
                    letterSpacing: "-0.03em",
                    color: "var(--text)",
                    lineHeight: 1.2,
                    marginBottom: "0.75rem",
                }}>
                    {c.title}
                </h2>

                {/* Visitor number */}
                <div style={{
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    background: "var(--accent-bg)",
                    border: "1.5px solid #c7d7fa",
                    borderRadius: "8px",
                    padding: "8px 16px",
                    marginBottom: "1.25rem",
                }}>
                    <span style={{ ...mono, fontSize: "0.62rem", color: "var(--accent)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                        {c.visitorLabel}
                    </span>
                    <span style={{ ...sans, fontWeight: 800, fontSize: "1.4rem", color: "var(--accent)", letterSpacing: "-0.03em" }}>
                        #{count.toLocaleString()}
                    </span>
                </div>

                {/* Description */}
                <p style={{
                    fontSize: "0.9rem", color: "var(--text-2)",
                    lineHeight: 1.75, marginBottom: "1.75rem",
                }}>
                    {c.description}
                </p>

                {/* Buttons */}
                <div style={{ display: "flex", gap: "0.65rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button
                        onClick={handleGuestbook}
                        style={{
                            ...mono, fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase",
                            fontWeight: 500, background: "var(--accent)", color: "#fff",
                            border: "none", padding: "11px 22px", borderRadius: "6px",
                            cursor: "pointer", transition: "background 0.2s",
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = "#1740b8"}
                        onMouseLeave={e => e.currentTarget.style.background = "var(--accent)"}
                    >
                        {c.cta} →
                    </button>
                    <button
                        onClick={handleClose}
                        style={{
                            ...mono, fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase",
                            fontWeight: 500, background: "transparent", color: "var(--text-3)",
                            border: "1px solid var(--border)", padding: "11px 22px", borderRadius: "6px",
                            cursor: "pointer", transition: "all 0.2s",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border-2)"; e.currentTarget.style.color = "var(--text)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-3)"; }}
                    >
                        {c.dismiss}
                    </button>
                </div>
            </div>
        </>
    );
}