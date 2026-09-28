import { useState, useEffect } from "react";
import { NAV_ITEMS_PRO, NAV_ITEMS_PERSONAL } from "../../constants/data";

function ViewToggle({ t, view, setView, className = "" }) {
    return (
        <div className={`seg view ${className}`}>
            {[["pro", t.nav_label_pro], ["personal", t.nav_label_personal]].map(([v, label]) => (
                <button key={v} className={view === v ? "active" : ""} onClick={() => setView(v)}>
                    {label}
                </button>
            ))}
        </div>
    );
}

export default function Navbar({ t, lang, setLang, active, go, view, setView }) {
    const [open, setOpen] = useState(false);
    const navItems = view === "pro" ? NAV_ITEMS_PRO : NAV_ITEMS_PERSONAL;

    useEffect(() => {
        if (!open) return;
        const close = (e) => { if (e.key === "Escape") setOpen(false); };
        window.addEventListener("keydown", close);
        return () => window.removeEventListener("keydown", close);
    }, [open]);

    const handle = (id) => { go(id); setOpen(false); };

    return (
        <header className="nav">
            <div className="nav-bar">
                <button className="nav-logo" onClick={() => { setView("pro"); setOpen(false); }} aria-label="Santiago Ocampo">
                    santiago<span>.</span>
                </button>

                <nav className="nav-links" aria-label={t.nav_label}>
                    {navItems.map(({ id, labelKey }) => (
                        <button key={id} className={`nav-link ${active === id ? "active" : ""}`} onClick={() => handle(id)}>
                            {t.nav[labelKey]}
                        </button>
                    ))}
                </nav>

                <div className="nav-right">
                    <ViewToggle t={t} view={view} setView={setView} />
                    <div className="seg lang">
                        {[["es", "ES"], ["en", "EN"]].map(([l, label]) => (
                            <button key={l} className={lang === l ? "active" : ""} onClick={() => setLang(l)}>
                                {label}
                            </button>
                        ))}
                    </div>
                    <button className={`ham ${open ? "open" : ""}`} onClick={() => setOpen(o => !o)} aria-label="Menu" aria-expanded={open}>
                        <span /><span /><span />
                    </button>
                </div>
            </div>

            {open && (
                <nav className="nav-sheet" aria-label={t.nav_label}>
                    {navItems.map(({ id, labelKey }) => (
                        <button key={id} className={`nav-link ${active === id ? "active" : ""}`} onClick={() => handle(id)}>
                            {t.nav[labelKey]}
                        </button>
                    ))}
                    <ViewToggle t={t} view={view} setView={(v) => { setView(v); setOpen(false); }} />
                </nav>
            )}
        </header>
    );
}
