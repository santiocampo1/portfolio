import Reveal from "../ui/Reveal";
import { SectionHeader } from "./About";

const serif = { fontFamily: "'Instrument Serif', serif", fontStyle: "italic" };
const mono  = { fontFamily: "'IBM Plex Mono', monospace" };
const muted = { color: "#aaa", letterSpacing: "0.18em", textTransform: "uppercase", fontSize: "0.65rem" };

export default function Experience({ t }) {
  return (
    <section
      id="experience"
      className="section-pad"
      style={{ padding: "7rem 3rem", background: "#fff" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <SectionHeader number="03" title={t.experience.title} />
          <p
            style={{
              ...mono,
              fontSize: "0.68rem",
              color: "#bbb",
              letterSpacing: "0.1em",
              marginBottom: "3rem",
              marginTop: "-2.5rem",
              paddingLeft: "3.1rem",
            }}
          >
            {t.experience.subtitle}
          </p>
        </Reveal>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: 0, top: 0, bottom: 0,
              width: "1px",
              background: "#e8e4dc",
            }}
          />

          {t.experience.items.map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{ paddingLeft: "2.5rem", paddingBottom: "3rem", position: "relative" }}>
                {/* Timeline dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "-5px", top: "7px",
                    width: "10px", height: "10px",
                    background: "#fff",
                    border: "2px solid #1c1c1c",
                    borderRadius: "50%",
                  }}
                />

                {/* Header row */}
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "baseline",
                    flexWrap: "wrap",
                    marginBottom: "0.4rem",
                  }}
                >
                  <h3 style={{ ...serif, fontSize: "1.35rem", color: "#1c1c1c" }}>{item.role}</h3>
                  <span style={{ ...mono, fontSize: "0.7rem", color: "#888" }}>@ {item.company}</span>
                  <span style={{ ...mono, fontSize: "0.62rem", color: "#bbb", marginLeft: "auto" }}>
                    {item.period}
                  </span>
                </div>

                <p
                  style={{
                    color: "#666",
                    lineHeight: 1.75,
                    marginBottom: "0.85rem",
                    fontSize: "0.92rem",
                    maxWidth: "600px",
                  }}
                >
                  {item.description}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                  {item.highlights.map((h) => (
                    <span key={h} className="pill">{h}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
