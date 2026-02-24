const sans = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const mono = { fontFamily: "'DM Mono', monospace" };

export default function Hero({ t, go }) {
  return (
    <section id="hero" className="section">
      <div className="section-inner" style={{ maxWidth: 680 }}>

        <p style={{
          ...mono, fontSize: "0.63rem", color: "var(--accent)",
          letterSpacing: "0.2em", textTransform: "uppercase",
          marginBottom: "1.5rem",
          display: "flex", alignItems: "center", gap: "0.5rem",
        }}>
          <span style={{ display: "inline-block", width: 14, height: 1, background: "var(--accent)" }} />
          {t.hero.greeting}
        </p>

        <h1 style={{
          ...sans, fontWeight: 800,
          fontSize: "clamp(2.6rem, 5vw, 4.5rem)",
          letterSpacing: "-0.04em", lineHeight: 1.0,
          color: "var(--text)", marginBottom: "1rem",
        }}>
          Santiago Ocampo
        </h1>

        <p style={{
          ...mono, fontSize: "0.73rem", color: "var(--text-3)",
          letterSpacing: "0.12em", textTransform: "uppercase",
          marginBottom: "2rem",
          paddingBottom: "2rem",
          borderBottom: "1px solid var(--border)",
        }}>
          {t.hero.role}
        </p>

        <p style={{
          fontSize: "0.95rem", lineHeight: 1.85,
          color: "var(--text-2)", marginBottom: "2rem",
        }}>
          {t.hero.description}
        </p>

        <div className="btn-row" style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap", marginBottom: "3rem" }}>
          <button
            onClick={() => go("projects")}
            style={{ ...mono, fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500, background: "var(--accent)", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "4px", cursor: "pointer", transition: "background 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#1740b8"}
            onMouseLeave={e => e.currentTarget.style.background = "var(--accent)"}
          >
            {t.hero.cta} →
          </button>
          <button
            onClick={() => go("contact")}
            style={{ ...mono, fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500, background: "transparent", color: "var(--text)", border: "1px solid var(--border-2)", padding: "10px 20px", borderRadius: "4px", cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-2)"; e.currentTarget.style.color = "var(--text)"; }}
          >
            {t.hero.ctaContact}
          </button>
        </div>

        {/* Stats */}
        <div className="hero-stats" style={{
          display: "grid", gridTemplateColumns: "repeat(4,1fr)",
          borderTop: "1px solid var(--border)",
          borderLeft: "1px solid var(--border)",
        }}>
          {t.hero.stats.map(({ value, label }, i) => (
            <div key={i} style={{
              padding: "1.1rem 1rem",
              borderRight: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
            }}>
              <div style={{ ...sans, fontWeight: 700, fontSize: "1.4rem", color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1 }}>{value}</div>
              <div style={{ ...mono, fontSize: "0.58rem", color: "var(--text-4)", marginTop: "5px", letterSpacing: "0.04em", lineHeight: 1.4 }}>{label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}