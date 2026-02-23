import Reveal from "../ui/Reveal";
import { techStack } from "../../constants/data";

const serif = { fontFamily: "'Instrument Serif', serif", fontStyle: "italic" };
const mono  = { fontFamily: "'IBM Plex Mono', monospace" };
const muted = { color: "#aaa", letterSpacing: "0.18em", textTransform: "uppercase", fontSize: "0.65rem" };

export default function About({ t }) {
  return (
    <section
      id="about"
      className="section-pad"
      style={{ padding: "7rem 3rem", background: "#fff" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <SectionHeader number="01" title={t.about.title} />
        </Reveal>

        <div
          className="two-col"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}
        >
          {/* Bio */}
          <div>
            {t.about.bio.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p style={{ color: "#555", lineHeight: 1.85, marginBottom: "1.35rem", fontSize: "0.95rem" }}>
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Tech Stack */}
          <Reveal delay={0.1}>
            <p style={{ ...mono, ...muted, marginBottom: "1.25rem" }}>{t.about.stackTitle}</p>
            <div
              className="four-col"
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem" }}
            >
              {Object.entries(techStack).map(([cat, techs]) => (
                <div key={cat} className="stack-box">
                  <p style={{ ...mono, ...muted, marginBottom: "0.65rem" }}>
                    {t.about.categories[cat]}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                    {techs.map((tech) => (
                      <span key={tech} className="pill">{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ number, title }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: "1.2rem", marginBottom: "3.5rem" }}>
      <span style={{ ...mono, ...muted }}>{number}/</span>
      <h2 style={{ ...serif, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#1c1c1c" }}>{title}</h2>
    </div>
  );
}
