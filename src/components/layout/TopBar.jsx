import { useState } from "react";
import { NAV_ITEMS } from "../../constants/data";

const mono = { fontFamily: "'DM Mono', monospace" };

export default function Topbar({ t, lang, setLang, active, go }) {
    const [open, setOpen] = useState(false);
    const handle = (id) => { go(id); setOpen(false); };

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
                <p className="sidebar-section-label" style={{ marginBottom: "0.75rem" }}>Navegación</p>
                {NAV_ITEMS.map(({ id, icon, labelKey }) => (
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