import Reveal from "../ui/Reveal";
import PHOTO from "../../assets/photo.jpg";
import { techStack } from "../../constants/data";

const sans = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const mono = { fontFamily: "'DM Mono', monospace" };

export default function About({ t }) {
  return (
    <section id="about" className="section">
      <div className="section-inner">

        <Reveal>
          <p className="section-eyebrow">{t.about.eyebrow}</p>
          <h2 className="section-title">{t.about.title}</h2>
        </Reveal>

        <div style={{
          display: "grid",
          gridTemplateColumns: "200px 1fr",
          gap: "2.5rem",
          alignItems: "start",
          marginBottom: "3rem",
        }} className="about-top-cols">

          {/* Photo */}
          <Reveal delay={0.05}>
            <div style={{ position: "relative" }}>
              <div style={{
                width: "100%",
                aspectRatio: "3 / 4",
                overflow: "hidden",
                borderRadius: "16px",
                display: "flex",
              }}>
                <img
                  src={PHOTO}
                  alt="Santiago Ocampo"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 55%",
                    display: "block",
                    border: "none",
                    outline: "none",
                    transition: "transform 0.5s ease",
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                />
              </div>

              <div style={{ marginTop: "0.85rem" }}>
                <p style={{ ...sans, fontWeight: 600, fontSize: "0.85rem", color: "var(--text)", lineHeight: 1.3 }}>
                  Santiago Ocampo
                </p>
                <p style={{ ...mono, fontSize: "0.6rem", color: "var(--text-3)", letterSpacing: "0.06em", marginTop: "2px" }}>
                  📍 Santa Fe, Argentina
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "0.5rem" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--success)", flexShrink: 0, animation: "pulse-green 2s infinite" }} />
                  <span style={{ ...mono, fontSize: "0.6rem", color: "var(--success)", letterSpacing: "0.04em" }}>
                    {t.available}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Bio */}
          <div>
            {t.about.bio.map((p, i) => (
              <Reveal key={i} delay={0.05 + i * 0.07}>
                <p style={{ fontSize: "0.92rem", lineHeight: 1.85, color: "var(--text-2)", marginBottom: "1rem" }}>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Stack */}
        <Reveal delay={0.15}>
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "2rem" }}>
            <p style={{ ...mono, fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-4)", marginBottom: "1.25rem" }}>
              {t.about.stackTitle}
            </p>
            <div className="stack-cols" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
              {Object.entries(techStack).map(([cat, items]) => (
                <div key={cat}>
                  <p className="stack-group-label">{t.about.categories[cat]}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
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