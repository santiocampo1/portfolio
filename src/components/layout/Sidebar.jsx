const mono = { fontFamily: "'DM Mono', monospace" };

const NAV_ITEMS = [
    { id: "hero", icon: "⌂", labelKey: "hero" },
    { id: "about", icon: "◎", labelKey: "about" },
    { id: "projects", icon: "⬡", labelKey: "projects" },
    { id: "experience", icon: "◈", labelKey: "experience" },
    { id: "education", icon: "◉", labelKey: "education" },
    { id: "contact", icon: "◌", labelKey: "contact" },
];

export default function Sidebar({ t, lang, setLang, active, go }) {
    return (
        <aside className="sidebar">
            {/* Logo */}
            <div className="sidebar-logo">
                <span className="sidebar-logo-name">Santiago Ocampo</span>
                <span className="sidebar-logo-role">Fullstack Developer</span>
            </div>

            {/* Nav */}
            <nav className="sidebar-nav">
                <p className="sidebar-section-label">Navegación</p>
                {NAV_ITEMS.map(({ id, icon, labelKey }) => (
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

                {/* Lang toggle */}
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