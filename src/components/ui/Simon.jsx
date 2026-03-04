import { useState, useRef, useEffect } from "react";
const sans = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const mono = { fontFamily: "'DM Mono', monospace" };
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUGGESTIONS = {
    es: [
        "¿Cuántos años de experiencia tiene Santiago?",
        "¿De qué trata Hábitos Atómicos?",
        "¿Cómo fue construido este portfolio?",
        "¿Cómo contacto a Santiago?",
    ],
    en: [
        "How many years of experience does Santiago have?",
        "What is Deep Work about?",
        "How was this portfolio built?",
        "How can I contact Santiago?",
    ],
};
function TypingIndicator() {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "4px", padding: "2px 0" }}>
            {[0, 1, 2].map(i => (
                <span key={i} style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: "var(--text-3)",
                    display: "inline-block",
                    animation: `simon-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                }} />
            ))}
            <style>{`
                @keyframes simon-bounce {
                    0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
                    40% { transform: translateY(-5px); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
export default function Simon({ lang }) {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showHint, setShowHint] = useState(true);
    const [bottom, setBottom] = useState("1.75rem");
    const [hidden, setHidden] = useState(false);
    const bottomRef = useRef(null);
    const inputRef = useRef(null);
    const suggestions = SUGGESTIONS[lang] || SUGGESTIONS.es;
    const isMobile = () => window.innerWidth <= 768;
    useEffect(() => {
        const footer = document.querySelector("footer");
        if (!footer) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (isMobile()) {
                    setHidden(entry.isIntersecting);
                    setBottom("1.25rem");
                } else {
                    setHidden(false);
                    if (entry.isIntersecting) {
                        const visible = entry.intersectionRect.height;
                        setBottom(`calc(${visible}px + 1rem)`);
                    } else {
                        setBottom("1.75rem");
                    }
                }
            },
            { threshold: Array.from({ length: 101 }, (_, i) => i / 100) }
        );
        observer.observe(footer);
        return () => observer.disconnect();
    }, []);
    useEffect(() => {
        if (open && isMobile()) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [open]);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);
    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 100);
            setShowHint(false);
        }
    }, [open]);
    async function send(text) {
        const userText = text || input.trim();
        if (!userText || loading) return;
        setInput("");
        const newMessages = [...messages, { role: "user", content: userText }];
        setMessages(newMessages);
        setLoading(true);
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 30000);
        try {
            const res = await fetch(`${SUPABASE_URL}/functions/v1/chat-simon`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
                },
                body: JSON.stringify({ messages: newMessages }),
                signal: controller.signal,
            });
            clearTimeout(timeout);
            const data = await res.json();
            setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
        } catch (err) {
            clearTimeout(timeout);
            const isTimeout = err.name === "AbortError";
            setMessages(prev => [...prev, {
                role: "assistant",
                content: lang === "es"
                    ? isTimeout
                        ? "Woof... tardé demasiado 🐾 Intentá de nuevo."
                        : "Woof... algo salió mal 🐾 Intentá de nuevo."
                    : isTimeout
                        ? "Woof... that took too long 🐾 Try again."
                        : "Woof... something went wrong 🐾 Try again.",
            }]);
        } finally {
            setLoading(false);
        }
    }
    function handleKey(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    }
    const isEmpty = messages.length === 0;
    const chatStyles = isMobile() ? {
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        borderRadius: 0,
        border: "none",
        zIndex: 600,
    } : {
        position: "fixed",
        bottom: `calc(${bottom} + 52px + 12px)`,
        right: "1.75rem",
        width: "min(360px, calc(100vw - 2rem))",
        borderRadius: "16px",
        border: "1.5px solid var(--border)",
        zIndex: 501,
    };
    return (
        <>
            <style>{`
                @keyframes simon-ring {
                    0%   { transform: scale(1);    opacity: 0.7; }
                    100% { transform: scale(1.75); opacity: 0;   }
                }
                @keyframes simon-shimmer {
                    0%, 100% { box-shadow: 0 0 0 2px rgba(139,92,246,0.6), 0 0 12px 3px rgba(139,92,246,0.3); }
                    50%      { box-shadow: 0 0 0 3px rgba(167,139,250,0.9), 0 0 22px 7px rgba(139,92,246,0.5); }
                }
                @keyframes simon-fadein {
                    from { opacity: 0; transform: translateY(4px); }
                    to   { opacity: 1; transform: translateY(0);   }
                }
                @keyframes simon-slidein {
                    from { opacity: 0; transform: translateY(12px) scale(0.97); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes simon-slidein-mobile {
                    from { opacity: 0; transform: translateY(100%); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            {/* Floating button */}
            <div style={{
                position: "fixed",
                bottom,
                right: "1.75rem",
                zIndex: 500,
                opacity: hidden ? 0 : 1,
                pointerEvents: hidden ? "none" : "auto",
                transition: "bottom 0.25s ease, opacity 0.2s",
            }}>
                {showHint && !open && (
                    <div style={{
                        position: "absolute",
                        bottom: "calc(100% + 10px)", right: 0,
                        background: "var(--text)", color: "#fff",
                        ...mono, fontSize: "0.6rem", letterSpacing: "0.06em",
                        padding: "6px 12px", borderRadius: "8px",
                        whiteSpace: "nowrap", animation: "simon-fadein 0.4s ease",
                    }}>
                        {lang === "es" ? "¡Preguntame algo! 🐾" : "Ask me something! 🐾"}
                        <div style={{
                            position: "absolute", top: "100%", right: "18px",
                            border: "5px solid transparent", borderTopColor: "var(--text)",
                        }} />
                    </div>
                )}
                {!open && <>
                    <span style={{
                        position: "absolute", inset: 0, borderRadius: "50%",
                        border: "2px solid rgba(139,92,246,0.6)",
                        animation: "simon-ring 2s ease-out infinite",
                        pointerEvents: "none",
                    }} />
                    <span style={{
                        position: "absolute", inset: 0, borderRadius: "50%",
                        border: "2px solid rgba(167,139,250,0.4)",
                        animation: "simon-ring 2s ease-out 0.7s infinite",
                        pointerEvents: "none",
                    }} />
                </>}
                <button
                    onClick={() => setOpen(o => !o)}
                    title="Simón"
                    style={{
                        width: 52, height: 52, borderRadius: "50%",
                        background: "#fff",
                        border: "none",
                        cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "1.5rem",
                        boxShadow: open
                            ? "0 4px 16px rgba(0,0,0,0.14)"
                            : "0 0 0 2px rgba(139,92,246,0.6), 0 0 14px 4px rgba(139,92,246,0.3)",
                        animation: open ? "none" : "simon-shimmer 2.5s ease-in-out infinite",
                        transition: "background 0.2s, transform 0.2s, box-shadow 0.2s",
                        position: "relative", zIndex: 1,
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = "#7c3aed";
                        e.currentTarget.style.transform = "scale(1.08)";
                        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(139,92,246,0.9), 0 0 24px 8px rgba(139,92,246,0.55)";
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = "#fff";
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow = open
                            ? "0 4px 16px rgba(0,0,0,0.14)"
                            : "0 0 0 2px rgba(139,92,246,0.6), 0 0 14px 4px rgba(139,92,246,0.3)";
                    }}
                >
                    🐶
                </button>
            </div>

            {/* Chat window */}
            {open && (
                <div style={{
                    background: "#fff",
                    boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    animation: isMobile() ? "simon-slidein-mobile 0.3s ease" : "simon-slidein 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                    ...chatStyles,
                }}>
                    {/* Header */}
                    <div style={{
                        padding: "1rem 1.25rem",
                        borderBottom: "1px solid var(--border)",
                        display: "flex", alignItems: "center", gap: "0.65rem",
                        background: "var(--bg-subtle)",
                        flexShrink: 0,
                    }}>
                        <img
                            src="/simon-avatar-face.jpg"
                            alt="Simón"
                            style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", border: "1.5px solid #c7d7fa", flexShrink: 0 }}
                            onError={e => { e.currentTarget.style.display = "none"; }}
                        />
                        <div>
                            <p style={{ ...sans, fontWeight: 700, fontSize: "0.88rem", color: "var(--text)", lineHeight: 1.2 }}>
                                Simón
                            </p>
                            <p style={{ ...mono, fontSize: "0.56rem", color: "var(--success)", letterSpacing: "0.06em", display: "flex", alignItems: "center", gap: "4px" }}>
                                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--success)", display: "inline-block" }} />
                                {lang === "es" ? "El perro de Santiago" : "Santiago's dog"}
                            </p>
                        </div>
                        <button
                            onClick={() => setOpen(false)}
                            style={{
                                marginLeft: "auto", background: "none", border: "none",
                                cursor: "pointer", color: "var(--text-4)", fontSize: "1.2rem",
                                padding: "4px", borderRadius: "4px", transition: "color 0.15s",
                                minWidth: 36, minHeight: 36,
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
                            onMouseLeave={e => e.currentTarget.style.color = "var(--text-4)"}
                        >
                            ✕
                        </button>
                    </div>

                    {/* Messages */}
                    <div style={{
                        flex: 1, overflowY: "auto",
                        padding: "1rem",
                        display: "flex", flexDirection: "column", gap: "0.75rem",
                        ...(isMobile() ? {} : { minHeight: 220, maxHeight: 320 }),
                        scrollbarWidth: "thin",
                        WebkitOverflowScrolling: "touch",
                    }}>
                        {isEmpty ? (
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                <p style={{ ...mono, fontSize: "0.62rem", color: "var(--text-4)", letterSpacing: "0.04em", marginBottom: "0.25rem" }}>
                                    {lang === "es" ? "¡Hola! ¿Qué querés saber? 🐾" : "Hi! What do you want to know? 🐾"}
                                </p>
                                {suggestions.map((s, i) => (
                                    <button
                                        key={i}
                                        onClick={() => send(s)}
                                        style={{
                                            ...sans, fontSize: "0.85rem", color: "var(--text-2)",
                                            background: "var(--bg-subtle)",
                                            border: "1px solid var(--border)",
                                            borderRadius: "8px", padding: "10px 12px",
                                            cursor: "pointer", textAlign: "left",
                                            transition: "all 0.15s", lineHeight: 1.4,
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = "#c7d7fa"; e.currentTarget.style.background = "var(--accent-bg)"; e.currentTarget.style.color = "var(--accent)"; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "var(--bg-subtle)"; e.currentTarget.style.color = "var(--text-2)"; }}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            messages.map((m, i) => (
                                <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                                    <div style={{
                                        maxWidth: "82%", padding: "8px 12px",
                                        borderRadius: m.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                                        background: m.role === "user" ? "var(--accent)" : "var(--bg-subtle)",
                                        color: m.role === "user" ? "#fff" : "var(--text-2)",
                                        fontSize: "0.9rem", lineHeight: 1.6, ...sans,
                                    }}>
                                        <span dangerouslySetInnerHTML={{
                                            __html: m.content
                                                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                                                .replace(/^- (.+)$/gm, "<span style='display:block;padding-left:0.75rem;position:relative'><span style='position:absolute;left:0'>·</span>$1</span>")
                                                .replace(/\n{2,}/g, "<br/><br/>")
                                                .replace(/\n/g, "<br/>")
                                        }} />
                                    </div>
                                </div>
                            ))
                        )}
                        {loading && (
                            <div style={{ display: "flex", justifyContent: "flex-start" }}>
                                <div style={{ padding: "10px 14px", borderRadius: "12px 12px 12px 2px", background: "var(--bg-subtle)" }}>
                                    <TypingIndicator />
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    {/* Input */}
                    <div style={{
                        padding: "0.75rem 1rem",
                        borderTop: "1px solid var(--border)",
                        display: "flex", gap: "0.5rem", alignItems: "flex-end",
                        flexShrink: 0,
                        paddingBottom: isMobile() ? "max(0.75rem, env(safe-area-inset-bottom))" : "0.75rem",
                    }}>
                        <textarea
                            ref={inputRef}
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={handleKey}
                            placeholder={lang === "es" ? "Escribí tu pregunta..." : "Type your question..."}
                            rows={1}
                            style={{
                                flex: 1, ...sans, fontSize: "1rem",
                                background: "var(--bg-subtle)",
                                border: "1.5px solid var(--border)",
                                borderRadius: "8px", padding: "10px 12px",
                                outline: "none", resize: "none",
                                color: "var(--text)", transition: "border 0.2s",
                                lineHeight: 1.5, maxHeight: 80, overflowY: "auto",
                            }}
                            onFocus={e => e.currentTarget.style.borderColor = "var(--accent)"}
                            onBlur={e => e.currentTarget.style.borderColor = "var(--border)"}
                        />
                        <button
                            onClick={() => send()}
                            disabled={!input.trim() || loading}
                            style={{
                                width: 40, height: 40, borderRadius: "8px",
                                background: (!input.trim() || loading) ? "var(--border-2)" : "var(--accent)",
                                border: "none",
                                cursor: (!input.trim() || loading) ? "not-allowed" : "pointer",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                flexShrink: 0, transition: "background 0.2s",
                            }}
                        >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M1 7h12M7 1l6 6-6 6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}