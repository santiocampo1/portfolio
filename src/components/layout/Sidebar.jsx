import { NAV_ITEMS_PRO, NAV_ITEMS_PERSONAL } from "../../constants/data";

const mono = { fontFamily: "'DM Mono', monospace" };

function ViewTab({ label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            style={{
                ...mono,
                flex: 1,
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: active ? 600 : 400,
                padding: "6px 4px",
                borderRadius: "5px",
                border: "none",
                background: active ? "var(--bg)" : "transparent",
                color: active ? "var(--text)" : "var(--text-4)",
                cursor: "pointer",
                transition: "all 0.15s",
                boxShadow: active ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
            }}
        >
            {label}
        </button>
    );
}

export default function Sidebar({ t, lang, setLang, active, go, view, setView }) {
    const navItems = view === "pro" ? NAV_ITEMS_PRO : NAV_ITEMS_PERSONAL;

    return (
        <aside className="sidebar">
            {/* Logo */}
            <div className="sidebar-logo">
                <span className="sidebar-logo-name">Santiago Ocampo</span>
                <span className="sidebar-logo-role">Fullstack Developer</span>
            </div>

            {/* View switcher */}
            <div style={{
                display: "flex",
                gap: "2px",
                margin: "0 1rem 1rem",
                background: "var(--bg-hover)",
                padding: "3px",
                borderRadius: "7px",
                border: "1px solid var(--border)",
            }}>
                <ViewTab label={t.nav_label_pro} active={view === "pro"} onClick={() => setView("pro")} />
                <ViewTab label={t.nav_label_personal} active={view === "personal"} onClick={() => setView("personal")} />
            </div>

            {/* Nav */}
            <nav className="sidebar-nav">
                {navItems.map(({ id, icon, labelKey }) => (
                    <div
                        key={id}
                        className={`nav-item ${active === id ? "active" : ""}`}
                        onClick={() => go(id)}
                    >
                        <span className="nav-item-icon" style={{ ...mono, fontSize: "0.8rem" }}>{icon}</span>
                        {t.nav[labelKey]}
                    </div>
                ))}
            </nav>
            {/* Footer */}
            <div className="sidebar-footer">
                <div className="available-badge">
                    <span className="available-dot" />
                    {t.available}
                </div>
                <div className="lang-toggle">
                    {[["es", "🇦🇷  ES"], ["en", "🇺🇸  EN"]].map(([l, label]) => (
                        <button
                            key={l}
                            className={`lang-btn ${lang === l ? "active" : ""}`}
                            onClick={() => setLang(l)}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    );
}