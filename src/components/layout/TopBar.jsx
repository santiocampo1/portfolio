import { useState } from "react";
import { NAV_ITEMS_PRO, NAV_ITEMS_PERSONAL } from "../../constants/data";

const mono = { fontFamily: "'DM Mono', monospace" };

export default function Topbar({ t, lang, setLang, active, go, view, setView }) {
    const [open, setOpen] = useState(false);
    const handle = (id) => { go(id); setOpen(false); };
    const navItems = view === "pro" ? NAV_ITEMS_PRO : NAV_ITEMS_PERSONAL;

    return (
        <>
            <div className="topbar">
                <span className="topbar-name">Santiago Ocampo</span>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div className="lang-toggle" style={{ marginTop: 0 }}>
                        {[["es", "ES"], ["en", "EN"]].map(([l, label]) => (
                            <button key={l} className={`lang-btn ${lang === l ? "active" : ""}`} onClick={() => setLang(l)}>
                                {label}
                            </button>
                        ))}
                    </div>
                    <button className={`ham ${open ? "open" : ""}`} onClick={() => setOpen(o => !o)} aria-label="Menu">
                        <span /><span /><span />
                    </button>
                </div>
            </div>

            <div className={`mobile-menu ${open ? "open" : ""}`}>
                {/* View switcher */}
                <div style={{
                    display: "flex",
                    gap: "2px",
                    marginBottom: "1rem",
                    background: "var(--bg-hover)",
                    padding: "3px",
                    borderRadius: "7px",
                    border: "1px solid var(--border)",
                }}>
                    {[["pro", t.nav_label_pro], ["personal", t.nav_label_personal]].map(([v, label]) => (
                        <button
                            key={v}
                            onClick={() => { setView(v); setOpen(false); }}
                            style={{
                                ...mono,
                                flex: 1,
                                fontSize: "0.6rem",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                fontWeight: view === v ? 600 : 400,
                                padding: "7px 4px",
                                borderRadius: "5px",
                                border: "none",
                                background: view === v ? "var(--bg)" : "transparent",
                                color: view === v ? "var(--text)" : "var(--text-4)",
                                cursor: "pointer",
                                transition: "all 0.15s",
                                boxShadow: view === v ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                            }}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Nav items */}
                {navItems.map(({ id, icon, labelKey }) => (
                    <div
                        key={id}
                        className={`nav-item ${active === id ? "active" : ""}`}
                        onClick={() => handle(id)}
                    >
                        <span className="nav-item-icon" style={{ ...mono }}>{icon}</span>
                        {t.nav[labelKey]}
                    </div>
                ))}
                <div style={{ marginTop: "auto", paddingTop: "2rem" }}>
                    <div className="available-badge">
                        <span className="available-dot" />
                        {t.available}
                    </div>
                </div>
            </div>
        </>
    );
}