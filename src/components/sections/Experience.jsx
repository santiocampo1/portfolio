import Reveal from "../ui/Reveal";

const sans = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const mono = { fontFamily: "'DM Mono', monospace" };

export default function Experience({ t }) {
  return (
    <section id="experience" className="section">
      <div className="section-inner">
        <Reveal>
          <p className="section-eyebrow">{t.experience.eyebrow}</p>
          <h2 className="section-title">{t.experience.title}</h2>
        </Reveal>

        {t.experience.items.map((item, i) => (
          <Reveal key={i} delay={i * 0.07}>
            <div className="exp-item">
              {/* Left: meta */}
              <div>
                <p style={{ ...mono, fontSize: "0.68rem", color: "var(--text-3)", whiteSpace: "pre-line", lineHeight: 1.6, letterSpacing: "0.02em" }}>
                  {item.period}
                </p>
                <p style={{ ...sans, fontWeight: 600, fontSize: "0.86rem", color: "var(--text)", marginTop: "0.45rem" }}>{item.company}</p>
                <p style={{ fontSize: "0.76rem", color: "var(--text-4)", marginTop: "2px" }}>{item.location}</p>
                {item.current && (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", ...mono, fontSize: "0.58rem", color: "var(--success)", marginTop: "0.4rem", letterSpacing: "0.05em" }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--success)", animation: "pulse-green 2s infinite", flexShrink: 0 }} />
                    {t.experience.current}
                  </span>
                )}
              </div>
              {/* Right: content */}
              <div>
                <h3 style={{ ...sans, fontWeight: 700, fontSize: "0.97rem", color: "var(--text)", marginBottom: "0.45rem", letterSpacing: "-0.01em" }}>
                  {item.role}
                </h3>
                <p style={{ fontSize: "0.86rem", color: "var(--text-2)", lineHeight: 1.75, marginBottom: "0.85rem" }}>
                  {item.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                  {item.highlights.map(h => <span key={h} className="tag">{h}</span>)}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}