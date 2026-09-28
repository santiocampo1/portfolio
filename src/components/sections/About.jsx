import Reveal from "../ui/Reveal";
import { techStack } from "../../constants/data";

export default function About({ t }) {
  return (
    <section id="about" className="section">
      <div className="section-inner">
        <Reveal>
          <p className="section-eyebrow">{t.about.eyebrow}</p>
          <h2 className="section-title">{t.about.title}</h2>
        </Reveal>

        <div className="about-cols" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", alignItems: "stretch" }}>
          <Reveal delay={0.05} style={{ height: "100%" }}>
            <div className="card" style={{ height: "100%", padding: "clamp(1.5rem, 3vw, 2rem)" }}>
              {t.about.bio.map((p, i) => (
                <p key={i} style={{ fontSize: "0.98rem", lineHeight: 1.75, color: "var(--text-2)", marginBottom: i < t.about.bio.length - 1 ? "1rem" : 0 }}>{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} style={{ height: "100%" }}>
            <div className="card" style={{ height: "100%", padding: 10, display: "flex", flexDirection: "column" }}>
              <div style={{ position: "relative", aspectRatio: "16 / 9", borderRadius: 14, overflow: "hidden", background: "var(--bg)" }}>
                <iframe
                  src="https://www.youtube.com/embed/drUpq8zFmCk"
                  title="Santiago Ocampo — presentación"
                  style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen loading="lazy"
                />
              </div>
              <p className="card-label" style={{ padding: "12px 8px 4px" }}>▶ {t.about.videoTitle}</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="card" style={{ marginTop: 12, padding: "clamp(1.5rem, 3vw, 2rem)" }}>
            <p className="card-label" style={{ marginBottom: "1.25rem" }}>{t.about.stackTitle}</p>
            <div className="stack-cols" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
              {Object.entries(techStack).map(([cat, items]) => (
                <div key={cat}>
                  <p style={{ fontSize: "0.9rem", fontWeight: 700, letterSpacing: "-0.01em", marginBottom: "0.6rem" }}>{t.about.categories[cat]}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                    {items.map(tech => <span key={tech} className="tag">{tech}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
