import { useState, useRef, useEffect } from "react";
import useGuestbook from "../../hooks/useGuestbook";
import Reveal from "../ui/Reveal";

const sans = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const mono = { fontFamily: "'DM Mono', monospace" };

const COUNTRIES = [
    { name: "Argentina", code: "ar" },
    { name: "Australia", code: "au" },
    { name: "Bolivia", code: "bo" },
    { name: "Brazil", code: "br" },
    { name: "Canada", code: "ca" },
    { name: "Chile", code: "cl" },
    { name: "China", code: "cn" },
    { name: "Colombia", code: "co" },
    { name: "Costa Rica", code: "cr" },
    { name: "Ecuador", code: "ec" },
    { name: "El Salvador", code: "sv" },
    { name: "France", code: "fr" },
    { name: "Germany", code: "de" },
    { name: "Guatemala", code: "gt" },
    { name: "Honduras", code: "hn" },
    { name: "India", code: "in" },
    { name: "Italy", code: "it" },
    { name: "Japan", code: "jp" },
    { name: "Mexico", code: "mx" },
    { name: "Netherlands", code: "nl" },
    { name: "Nicaragua", code: "ni" },
    { name: "Panama", code: "pa" },
    { name: "Paraguay", code: "py" },
    { name: "Peru", code: "pe" },
    { name: "Portugal", code: "pt" },
    { name: "South Korea", code: "kr" },
    { name: "Spain", code: "es" },
    { name: "UK", code: "gb" },
    { name: "Ukraine", code: "ua" },
    { name: "United States", code: "us" },
    { name: "Uruguay", code: "uy" },
    { name: "Venezuela", code: "ve" },
    { name: "Other", code: null },
];

const CODE_MAP = Object.fromEntries(COUNTRIES.map(c => [c.name, c.code]));

function FlagImg({ code, size = 20 }) {
    if (!code) return <span style={{ fontSize: size * 0.85, lineHeight: 1 }}>🌍</span>;
    return (
        <img
            src={`https://flagcdn.com/${size}x${Math.round(size * 0.75)}/${code}.png`}
            srcSet={`https://flagcdn.com/${size * 2}x${Math.round(size * 0.75 * 2)}/${code}.png 2x`}
            width={size}
            height={Math.round(size * 0.75)}
            alt={code}
            style={{ borderRadius: "2px", objectFit: "cover", flexShrink: 0, display: "block" }}
        />
    );
}

function timeAgo(dateStr, lang) {
    const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
    if (diff < 60) return lang === "es" ? "hace un momento" : "just now";
    if (diff < 3600) { const m = Math.floor(diff / 60); return lang === "es" ? `hace ${m} min` : `${m}m ago`; }
    if (diff < 86400) { const h = Math.floor(diff / 3600); return lang === "es" ? `hace ${h}h` : `${h}h ago`; }
    const d = Math.floor(diff / 86400);
    return lang === "es" ? `hace ${d}d` : `${d}d ago`;
}

/* ── Reply toggle ── */
function ReplyBubble({ reply, label }) {
    const [open, setOpen] = useState(false);

    return (
        <div style={{ marginTop: "0.75rem" }}>
            {/* Toggle button */}
            <button
                onClick={() => setOpen(o => !o)}
                style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    background: open ? "var(--accent-bg)" : "transparent",
                    border: `1px solid ${open ? "#c7d7fa" : "var(--border)"}`,
                    borderRadius: "20px",
                    padding: "4px 12px 4px 8px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--accent-bg)"; e.currentTarget.style.borderColor = "#c7d7fa"; }}
                onMouseLeave={e => { if (!open) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "var(--border)"; } }}
            >
                {/* Bubble icon */}
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                    <path d="M14 1H2C1.45 1 1 1.45 1 2v9c0 .55.45 1 1 1h2v3l3.5-3H14c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1z"
                        stroke="var(--accent)" strokeWidth="1.4" strokeLinejoin="round" />
                </svg>
                <span style={{ ...mono, fontSize: "0.58rem", color: "var(--accent)", letterSpacing: "0.06em", fontWeight: 600 }}>
                    {label}
                </span>
                {/* Chevron */}
                <svg
                    style={{ transform: `rotate(${open ? 180 : 0}deg)`, transition: "transform 0.2s" }}
                    width="10" height="10" viewBox="0 0 10 10" fill="none"
                >
                    <path d="M2 3.5l3 3 3-3" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {/* Reply content */}
            <div style={{
                maxHeight: open ? "200px" : "0px",
                overflow: "hidden",
                transition: "max-height 0.3s ease",
            }}>
                <div style={{
                    marginTop: "0.625rem",
                    padding: "0.75rem 1rem",
                    background: "var(--accent-bg)",
                    border: "1px solid #c7d7fa",
                    borderRadius: "8px",
                    borderTopLeftRadius: "2px",
                }}>
                    <p style={{ ...mono, fontSize: "0.58rem", color: "var(--accent)", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 6px", fontWeight: 600 }}>
                        Santiago
                    </p>
                    <p style={{ fontSize: "0.875rem", color: "var(--text-2)", lineHeight: 1.75, margin: 0 }}>
                        {reply}
                    </p>
                </div>
            </div>
        </div>
    );
}

/* ── Custom dropdown ── */
function CountrySelect({ value, onChange, placeholder, focused, onFocus, onBlur }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const selected = COUNTRIES.find(c => c.name === value);

    useEffect(() => {
        function handle(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
        document.addEventListener("mousedown", handle);
        return () => document.removeEventListener("mousedown", handle);
    }, []);

    return (
        <div ref={ref} style={{ position: "relative" }}>
            <button
                type="button"
                onClick={() => { setOpen(o => !o); onFocus(); }}
                onBlur={onBlur}
                style={{
                    width: "100%",
                    background: focused ? "#fff" : "var(--bg-subtle)",
                    border: `1.5px solid ${open || focused ? "var(--accent)" : "var(--border)"}`,
                    borderRadius: "8px",
                    padding: "11px 36px 11px 14px",
                    fontSize: "0.9rem",
                    color: selected ? "var(--text)" : "var(--text-4)",
                    outline: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "border 0.2s, background 0.2s, box-shadow 0.2s",
                    boxShadow: (open || focused) ? "0 0 0 3px rgba(29,78,216,0.08)" : "none",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    boxSizing: "border-box",
                }}
            >
                {selected ? (
                    <>
                        <FlagImg code={selected.code} size={20} />
                        <span>{selected.name}</span>
                    </>
                ) : (
                    <span>{placeholder}</span>
                )}
                <svg style={{ position: "absolute", right: 12, top: "50%", transform: `translateY(-50%) rotate(${open ? 180 : 0}deg)`, transition: "transform 0.2s", pointerEvents: "none" }} width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 4l4 4 4-4" stroke="var(--text-3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {open && (
                <div style={{
                    position: "absolute",
                    top: "calc(100% + 4px)",
                    left: 0, right: 0,
                    background: "#fff",
                    border: "1.5px solid var(--border)",
                    borderRadius: "8px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
                    zIndex: 100,
                    maxHeight: 220,
                    overflowY: "auto",
                    scrollbarWidth: "thin",
                }}>
                    {COUNTRIES.map(({ name: cname, code }) => (
                        <div
                            key={cname}
                            onMouseDown={() => { onChange(cname); setOpen(false); }}
                            style={{
                                padding: "9px 14px",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                cursor: "pointer",
                                fontSize: "0.88rem",
                                color: "var(--text)",
                                background: value === cname ? "var(--accent-bg)" : "transparent",
                                transition: "background 0.1s",
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                            }}
                            onMouseEnter={e => { if (value !== cname) e.currentTarget.style.background = "var(--bg-subtle)"; }}
                            onMouseLeave={e => { if (value !== cname) e.currentTarget.style.background = "transparent"; }}
                        >
                            <FlagImg code={code} size={20} />
                            <span>{cname}</span>
                            {value === cname && (
                                <svg style={{ marginLeft: "auto", color: "var(--accent)" }} width="13" height="13" viewBox="0 0 13 13" fill="none">
                                    <path d="M2 6.5l3.5 3.5 5.5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

/* ── Main component ── */
export default function Guestbook({ t, lang }) {
    const { entries, loading, submitting, error, success, submit } = useGuestbook();
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [country, setCountry] = useState("");
    const [focused, setFocused] = useState(null);

    const g = t.guestbook;

    function handleSubmit(e) {
        e.preventDefault();
        if (!name.trim() || !message.trim()) return;
        submit({ name: name.trim(), message: message.trim(), country: country || "Other" });
        if (!error) { setName(""); setMessage(""); setCountry(""); }
    }

    const inputStyle = (field) => ({
        width: "100%",
        background: focused === field ? "#fff" : "var(--bg-subtle)",
        border: `1.5px solid ${focused === field ? "var(--accent)" : "var(--border)"}`,
        borderRadius: "8px",
        padding: "11px 14px",
        fontSize: "0.9rem",
        color: "var(--text)",
        outline: "none",
        transition: "border 0.2s, background 0.2s, box-shadow 0.2s",
        boxSizing: "border-box",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        boxShadow: focused === field ? "0 0 0 3px rgba(29,78,216,0.08)" : "none",
    });

    const labelStyle = {
        ...mono, fontSize: "0.58rem", letterSpacing: "0.12em",
        textTransform: "uppercase", color: "var(--text-3)",
        display: "block", marginBottom: "6px",
    };

    return (
        <section id="guestbook" className="section">
            <div className="section-inner">

                <Reveal>
                    <p className="section-eyebrow">{g.eyebrow}</p>
                    <h2 className="section-title">{g.title}</h2>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-2)", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: 500 }}>
                        {g.description}
                    </p>
                </Reveal>

                {/* Form */}
                <Reveal delay={0.06}>
                    <form onSubmit={handleSubmit} style={{
                        background: "#fff",
                        border: "1.5px solid var(--border)",
                        borderRadius: "12px",
                        padding: "1.75rem",
                        marginBottom: "2.5rem",
                        maxWidth: 560,
                        boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                    }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem", marginBottom: "0.875rem" }} className="guestbook-form-top">
                            <div>
                                <label style={labelStyle}>{g.labelName}</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    onFocus={() => setFocused("name")}
                                    onBlur={() => setFocused(null)}
                                    placeholder={g.placeholderName}
                                    maxLength={50}
                                    style={inputStyle("name")}
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>{g.labelCountry}</label>
                                <CountrySelect
                                    value={country}
                                    onChange={setCountry}
                                    placeholder={g.placeholderCountry}
                                    focused={focused === "country"}
                                    onFocus={() => setFocused("country")}
                                    onBlur={() => setFocused(null)}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: "1.25rem" }}>
                            <label style={labelStyle}>{g.labelMessage}</label>
                            <textarea
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                onFocus={() => setFocused("message")}
                                onBlur={() => setFocused(null)}
                                placeholder={g.placeholderMessage}
                                maxLength={300}
                                rows={3}
                                style={{ ...inputStyle("message"), resize: "vertical", minHeight: 88 }}
                            />
                            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "4px" }}>
                                <span style={{ ...mono, fontSize: "0.55rem", color: message.length > 260 ? "var(--accent)" : "var(--text-4)" }}>
                                    {message.length}/300
                                </span>
                            </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                            <button
                                type="submit"
                                disabled={submitting || !name.trim() || !message.trim()}
                                style={{
                                    ...mono, fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500,
                                    background: (submitting || !name.trim() || !message.trim()) ? "var(--border-2)" : "var(--accent)",
                                    color: (submitting || !name.trim() || !message.trim()) ? "var(--text-3)" : "#fff",
                                    border: "none", padding: "11px 22px", borderRadius: "6px",
                                    cursor: (submitting || !name.trim() || !message.trim()) ? "not-allowed" : "pointer",
                                    transition: "background 0.2s, color 0.2s",
                                }}
                                onMouseEnter={e => { if (!submitting && name.trim() && message.trim()) e.currentTarget.style.background = "#1740b8"; }}
                                onMouseLeave={e => { if (!submitting && name.trim() && message.trim()) e.currentTarget.style.background = "var(--accent)"; }}
                            >
                                {submitting ? g.sending : g.submit}
                            </button>

                            {success && (
                                <span style={{ ...mono, fontSize: "0.62rem", color: "var(--success)", letterSpacing: "0.04em", display: "flex", alignItems: "center", gap: "5px" }}>
                                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5l3.5 3.5 5.5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    {g.successMsg}
                                </span>
                            )}
                            {error && (
                                <span style={{ ...mono, fontSize: "0.62rem", color: "#e53e3e", letterSpacing: "0.04em" }}>{g.errorMsg}</span>
                            )}
                        </div>
                    </form>
                </Reveal>

                {/* Entries */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", maxWidth: 560 }}>
                    {loading ? (
                        <p style={{ ...mono, fontSize: "0.65rem", color: "var(--text-4)", letterSpacing: "0.06em" }}>{g.loading}</p>
                    ) : entries.length === 0 ? (
                        <div style={{ border: "1.5px dashed var(--border)", borderRadius: "10px", padding: "2rem", textAlign: "center" }}>
                            <p style={{ ...mono, fontSize: "0.65rem", color: "var(--text-4)", letterSpacing: "0.06em" }}>{g.empty}</p>
                        </div>
                    ) : entries.map((entry, i) => (
                        <Reveal key={entry.id} delay={i * 0.04}>
                            <div style={{
                                background: "#fff", border: "1.5px solid var(--border)",
                                borderRadius: "10px", padding: "1.1rem 1.25rem",
                                transition: "border-color 0.2s, box-shadow 0.2s",
                            }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = "#c7d7fa"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(29,78,216,0.06)"; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
                            >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                        <FlagImg code={CODE_MAP[entry.country] || null} size={20} />
                                        <span style={{ ...sans, fontWeight: 700, fontSize: "0.88rem", color: "var(--text)" }}>{entry.name}</span>
                                        {entry.country && (
                                            <span style={{ ...mono, fontSize: "0.55rem", color: "var(--text-4)", letterSpacing: "0.04em" }}>· {entry.country}</span>
                                        )}
                                    </div>
                                    <span style={{ ...mono, fontSize: "0.55rem", color: "var(--text-4)", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
                                        {timeAgo(entry.created_at, lang)}
                                    </span>
                                </div>
                                <p style={{ fontSize: "0.875rem", color: "var(--text-2)", lineHeight: 1.75, margin: 0 }}>
                                    {entry.message}
                                </p>

                                {/* Reply toggle */}
                                {entry.reply && (
                                    <ReplyBubble
                                        reply={entry.reply}
                                        label={lang === "es" ? "1 respuesta" : "1 reply"}
                                    />
                                )}
                            </div>
                        </Reveal>
                    ))}
                </div>

            </div>
        </section>
    );
}