import { useState } from "react";

const NAV_KEYS = ["about", "projects", "experience", "certifications", "contact"];

export default function Navbar({ t, lang, setLang, activeSection, scrolled, go }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleGo = (id) => {
    go(id);
    setMenuOpen(false);
  };

  const serif = { fontFamily: "'Instrument Serif', serif", fontStyle: "italic" };
  const mono  = { fontFamily: "'IBM Plex Mono', monospace" };

  return (
    <>
      {/* ── Mobile overlay menu ── */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {NAV_KEYS.map((key) => (
          <span
            key={key}
            onClick={() => handleGo(key)}
            style={{
              ...mono,
              fontSize: "1.1rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: activeSection === key ? "#1c1c1c" : "#aaa",
              cursor: "pointer",
              padding: "0.5rem 0",
            }}
          >
            {t.nav[key]}
          </span>
        ))}

        <LangToggle lang={lang} setLang={setLang} large />
      </div>

      {/* ── Navbar bar ── */}
      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          padding: "1.1rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled || menuOpen ? "rgba(247,245,240,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          borderBottom: scrolled ? "1px solid #e8e4dc" : "1px solid transparent",
          transition: "all 0.3s",
        }}
      >
        {/* Logo */}
        <span onClick={() => handleGo("hero")} style={{ ...serif, fontSize: "1.2rem", cursor: "pointer" }}>
          Santiago Ocampo
        </span>

        {/* Desktop links */}
        <div className="desktop-nav">
          <div style={{ display: "flex", gap: "2rem" }}>
            {NAV_KEYS.map((key) => (
              <span
                key={key}
                className={`ni ${activeSection === key ? "active" : ""}`}
                onClick={() => handleGo(key)}
              >
                {t.nav[key]}
              </span>
            ))}
          </div>
          <LangToggle lang={lang} setLang={setLang} />
        </div>

        {/* Hamburger */}
        <button
          className={`ham ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
    </>
  );
}

/* ── Language toggle shared between desktop + mobile ── */
function LangToggle({ lang, setLang, large = false }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "2px",
        background: "#ede9e1",
        padding: "3px",
        borderRadius: "6px",
        marginTop: large ? "1rem" : 0,
      }}
    >
      {[["es", "🇦🇷"], ["en", "🇺🇸"]].map(([l, flag]) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          title={l === "es" ? "Español" : "English"}
          style={{
            background: lang === l ? "#fff" : "transparent",
            border: "none",
            cursor: "pointer",
            padding: large ? "5px 10px" : "3px 8px",
            borderRadius: "4px",
            fontSize: large ? "1.2rem" : "1rem",
            lineHeight: 1,
            transition: "background .2s",
            boxShadow: lang === l ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
          }}
        >
          {flag}
        </button>
      ))}
    </div>
  );
}
