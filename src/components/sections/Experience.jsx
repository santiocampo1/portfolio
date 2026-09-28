import Reveal from "../ui/Reveal";
import { mono } from "../../styles/typography";

export default function Experience({ t }) {
  return (
    <section id="experience" className="section">
      <div className="section-inner">
        <Reveal>
          <p className="section-eyebrow">{t.experience.eyebrow}</p>
          <h2 className="section-title">{t.experience.title}</h2>
        </Reveal>

        <div className="exp-list">
          {t.experience.items.map((item, i) => (
            <Reveal key={item.company} delay={i * 0.07}>
              <div className="exp-item">
                <div>
                  <p style={{ ...mono, fontSize: "0.74rem", color: "var(--text-3)", whiteSpace: "pre-line", lineHeight: 1.6 }}>
                    {item.period}
                  </p>
                  <p style={{ fontWeight: 700, fontSize: "1rem", letterSpacing: "-0.02em", marginTop: "0.5rem" }}>{item.company}</p>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-3)", marginTop: 2 }}>{item.location}</p>
                  {item.current && (
                    <span className="avail" style={{ marginTop: "0.6rem", fontSize: "0.72rem", padding: "4px 10px" }}>
                      <i />{t.experience.current}
                    </span>
                  )}
                </div>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: "1.2rem", letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>
                    {item.role}
                  </h3>
                  <p style={{ fontSize: "0.94rem", color: "var(--text-2)", lineHeight: 1.7, marginBottom: "0.9rem", maxWidth: "68ch" }}>
                    {item.description}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                    {item.highlights.map(h => <span key={h} className="tag">{h}</span>)}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
