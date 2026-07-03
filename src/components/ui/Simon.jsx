import { useState, useRef, useEffect } from "react";
import { sans, mono } from "../../styles/typography";
import useChatSimon, { parseMarkdown } from "../../hooks/useChatSimon";
import useFooterAware from "../../hooks/useFooterAware";
import DogAvatar from "./DogAvatar";

const isMobile = () => window.innerWidth <= 768;

const SIMON_STYLES = `
  @keyframes simon-ring           { 0%   { transform: scale(1);    opacity: 0.7; } 100% { transform: scale(1.75); opacity: 0; } }
  @keyframes simon-shimmer        { 0%,100% { box-shadow: 0 0 0 2px rgba(139,92,246,0.6), 0 0 12px 3px rgba(139,92,246,0.3); } 50% { box-shadow: 0 0 0 3px rgba(167,139,250,0.9), 0 0 22px 7px rgba(139,92,246,0.5); } }
  @keyframes simon-fadein         { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes simon-slidein        { from { opacity: 0; transform: translateY(12px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
  @keyframes simon-slidein-mobile { from { opacity: 0; transform: translateY(100%); } to { opacity: 1; transform: translateY(0); } }
  @keyframes simon-bounce         { 0%,80%,100% { transform: translateY(0); opacity: 0.4; } 40% { transform: translateY(-5px); opacity: 1; } }
`;

// ─── Sub-components ────────────────────────────────────────────────────────

function HintBubble({ lang }) {
    const label = lang === "es" ? "¡Preguntame algo! 🐾" : "Ask me something! 🐾";
    return (
        <div style={{
            position: "absolute", bottom: "calc(100% + 10px)", right: 0,
            background: "var(--text)", color: "#fff",
            ...mono, fontSize: "0.6rem", letterSpacing: "0.06em",
            padding: "6px 12px", borderRadius: "8px",
            whiteSpace: "nowrap", animation: "simon-fadein 0.4s ease",
        }}>
            {label}
            <div style={{
                position: "absolute", top: "100%", right: "18px",
                border: "5px solid transparent", borderTopColor: "var(--text)",
            }} />
        </div>
    );
}

function PulseRings() {
    const ring = (delay = "") => ({
        position: "absolute", inset: 0, borderRadius: "50%", pointerEvents: "none",
        border: `2px solid rgba(139,92,246,${delay ? "0.4" : "0.6"})`,
        animation: `simon-ring 2s ease-out ${delay} infinite`,
    });
    return (
        <>
            <span style={ring()} />
            <span style={ring("0.7s")} />
        </>
    );
}

function TypingIndicator() {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "4px", padding: "2px 0" }}>
            {[0, 1, 2].map(i => (
                <span key={i} style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: "var(--text-3)", display: "inline-block",
                    animation: `simon-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                }} />
            ))}
        </div>
    );
}

function ChatHeader({ lang, onClose }) {
    return (
        <div style={{
            padding: "1rem 1.25rem",
            borderBottom: "1px solid var(--border)",
            display: "flex", alignItems: "center", gap: "0.65rem",
            background: "var(--bg-subtle)", flexShrink: 0,
        }}>
            <img
                src="/simon-avatar-face.jpg" alt="Simón"
                style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", border: "1.5px solid #c7d7fa", flexShrink: 0 }}
                onError={e => { e.currentTarget.style.display = "none"; }}
            />
            <div>
                <p style={{ ...sans, fontWeight: 700, fontSize: "0.88rem", color: "var(--text)", lineHeight: 1.2 }}>Simón</p>
                <p style={{ ...mono, fontSize: "0.56rem", color: "var(--success)", letterSpacing: "0.06em", display: "flex", alignItems: "center", gap: "4px" }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--success)", display: "inline-block" }} />
                    {lang === "es" ? "El perro de Santiago" : "Santiago's dog"}
                </p>
            </div>
            <button
                onClick={onClose}
                style={{
                    marginLeft: "auto", background: "none", border: "none", cursor: "pointer",
                    color: "var(--text-4)", fontSize: "1.2rem", padding: "4px", borderRadius: "4px",
                    minWidth: 36, minHeight: 36, display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "color 0.15s",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
                onMouseLeave={e => e.currentTarget.style.color = "var(--text-4)"}
            >✕</button>
        </div>
    );
}

function MessageBubble({ message }) {
    const isUser = message.role === "user";
    return (
        <div style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start" }}>
            <div style={{
                maxWidth: "82%", padding: "8px 12px",
                borderRadius: isUser ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                background: isUser ? "var(--accent)" : "var(--bg-subtle)",
                color: isUser ? "#fff" : "var(--text-2)",
                fontSize: "0.9rem", lineHeight: 1.6, ...sans,
            }}>
                <span dangerouslySetInnerHTML={{ __html: parseMarkdown(message.content) }} />
            </div>
        </div>
    );
}

function SuggestionList({ suggestions, onSend }) {
    return (
        <>
            {suggestions.map((s, i) => (
                <button
                    key={i} onClick={() => onSend(s)}
                    style={{
                        ...sans, fontSize: "0.85rem", color: "var(--text-2)",
                        background: "var(--bg-subtle)", border: "1px solid var(--border)",
                        borderRadius: "8px", padding: "10px 12px",
                        cursor: "pointer", textAlign: "left", transition: "all 0.15s", lineHeight: 1.4,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#c7d7fa"; e.currentTarget.style.background = "var(--accent-bg)"; e.currentTarget.style.color = "var(--accent)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "var(--bg-subtle)"; e.currentTarget.style.color = "var(--text-2)"; }}
                >{s}</button>
            ))}
        </>
    );
}

// ─── Main component ────────────────────────────────────────────────────────

const SUGGESTIONS = {
    es: ["¿Cuántos años de experiencia tiene Santiago?", "¿De qué trata Hábitos Atómicos?", "¿Cómo fue construido este portfolio?", "¿Cómo contacto a Santiago?"],
    en: ["How many years of experience does Santiago have?", "What is Deep Work about?", "How was this portfolio built?", "How can I contact Santiago?"],
};

export default function Simon({ lang }) {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [showHint, setShowHint] = useState(true);
    const [hovered, setHovered] = useState(false);

    const bottomRef = useRef(null);
    const inputRef = useRef(null);

    const { messages, loading, send } = useChatSimon(lang);
    const { bottom, hidden } = useFooterAware();
    const suggestions = SUGGESTIONS[lang] ?? SUGGESTIONS.es;

    useEffect(() => {
        document.body.style.overflow = (open && isMobile()) ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    useEffect(() => {
        if (!open) return;
        setShowHint(false);
        const timer = setTimeout(() => inputRef.current?.focus(), 100);
        return () => clearTimeout(timer);
    }, [open]);

    function handleSend(text) {
        const value = text ?? input;
        send(value);
        if (!text) setInput("");
    }

    function handleKey(e) {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
    }

    const btnShadow = open
        ? "0 4px 16px rgba(0,0,0,0.14)"
        : "0 0 0 2px rgba(139,92,246,0.6), 0 0 14px 4px rgba(139,92,246,0.3)";

    const chatStyles = isMobile()
        ? { position: "fixed", inset: 0, width: "100%", height: "100%", borderRadius: 0, border: "none", zIndex: 600 }
        : { position: "fixed", bottom: `calc(${bottom} + 52px + 12px)`, right: "1.75rem", width: "min(360px, calc(100vw - 2rem))", borderRadius: "16px", border: "1.5px solid var(--border)", zIndex: 501 };

    return (
        <>
            <style>{SIMON_STYLES}</style>

            {/* Floating trigger */}
            <div style={{
                position: "fixed", bottom, right: "1.75rem", zIndex: 500,
                opacity: hidden ? 0 : 1, pointerEvents: hidden ? "none" : "auto",
                transition: "bottom 0.25s ease, opacity 0.2s",
            }}>
                {showHint && !open && <HintBubble lang={lang} />}
                {!open && <PulseRings />}
                <button
                    onClick={() => setOpen(o => !o)}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    title="Simón"
                    style={{
                        width: 52, height: 52, borderRadius: "50%",
                        background: hovered ? "#7c3aed" : "#fff",
                        border: "none", cursor: "pointer", padding: 0, overflow: "visible",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: btnShadow,
                        animation: open ? "none" : "simon-shimmer 2.5s ease-in-out infinite",
                        transform: hovered ? "scale(1.08)" : "scale(1)",
                        transition: "background 0.2s, transform 0.2s, box-shadow 0.2s",
                        position: "relative", zIndex: 1,
                    }}
                >
                    {open
                        ? <span style={{ fontSize: "1.1rem", color: hovered ? "#fff" : "var(--text-3)" }}>✕</span>
                        : <DogAvatar />
                    }
                </button>
            </div>

            {/* Chat window */}
            {open && (
                <div style={{
                    background: "#fff", display: "flex", flexDirection: "column",
                    overflow: "hidden", boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
                    animation: isMobile() ? "simon-slidein-mobile 0.3s ease" : "simon-slidein 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                    ...chatStyles,
                }}>
                    <ChatHeader lang={lang} onClose={() => setOpen(false)} />

                    {/* Messages */}
                    <div style={{
                        flex: 1, overflowY: "auto", padding: "1rem",
                        display: "flex", flexDirection: "column", gap: "0.75rem",
                        ...(isMobile() ? {} : { minHeight: 220, maxHeight: 320 }),
                        scrollbarWidth: "thin", WebkitOverflowScrolling: "touch",
                    }}>
                        {messages.length === 0 ? (
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                <p style={{ ...mono, fontSize: "0.62rem", color: "var(--text-4)", letterSpacing: "0.04em", marginBottom: "0.25rem" }}>
                                    {lang === "es" ? "¡Hola! ¿Qué querés saber? 🐾" : "Hi! What do you want to know? 🐾"}
                                </p>
                                <SuggestionList suggestions={suggestions} onSend={handleSend} />
                            </div>
                        ) : (
                            messages.map((m, i) => <MessageBubble key={i} message={m} />)
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
                        padding: "0.75rem 1rem", borderTop: "1px solid var(--border)",
                        display: "flex", gap: "0.5rem", alignItems: "flex-end", flexShrink: 0,
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
                                background: "var(--bg-subtle)", border: "1.5px solid var(--border)",
                                borderRadius: "8px", padding: "10px 12px",
                                outline: "none", resize: "none", color: "var(--text)",
                                transition: "border 0.2s", lineHeight: 1.5, maxHeight: 80, overflowY: "auto",
                            }}
                            onFocus={e => e.currentTarget.style.borderColor = "var(--accent)"}
                            onBlur={e => e.currentTarget.style.borderColor = "var(--border)"}
                        />
                        <button
                            onClick={() => handleSend()}
                            disabled={!input.trim() || loading}
                            style={{
                                width: 40, height: 40, borderRadius: "8px", border: "none",
                                background: (!input.trim() || loading) ? "var(--border-2)" : "var(--accent)",
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