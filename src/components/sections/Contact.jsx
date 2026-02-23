import Reveal from "../ui/Reveal";

const sans = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const mono = { fontFamily: "'DM Mono', monospace" };

export default function Contact({ t }) {
  return (
    <section id="contact" className="section" style={{ borderBottom: "none" }}>
      <div className="section-inner">
        <Reveal>
          <p className="section-eyebrow">{t.contact.eyebrow}</p>
          <h2 className="section-title">{t.contact.title}</h2>
          <p style={{ fontSize: "0.92rem", color: "var(--text-2)", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: 440 }}>
            {t.contact.description}
          </p>
        </Reveal>

        <div className="contact-cols" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3.5rem", alignItems: "start" }}>
          <Reveal delay={0.08}>
            <a href={`mailto:${t.contact.cta}`}
              style={{ ...sans, fontWeight: 700, fontSize: "clamp(0.95rem, 1.5vw, 1.2rem)", color: "var(--accent)", letterSpacing: "-0.02em", borderBottom: "2px solid var(--accent)", paddingBottom: "2px", display: "block", width: "fit-content", transition: "opacity 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.65"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              {t.contact.cta} ↗
            </a>
          </Reveal>

          <Reveal delay={0.12}>
            <div>
              {t.contact.links.map(({ icon, label, value, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="contact-link">
                  <div className="c-icon">{icon}</div>
                  <div>
                    <p className="c-label">{label}</p>
                    <p className="c-value">{value}</p>
                  </div>
                  <span className="c-arrow">↗</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}