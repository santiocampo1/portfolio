import Reveal from "../ui/Reveal";
import { SectionHeader } from "./About";
import { contactLinks } from "../../constants/data";

const serif = { fontFamily: "'Instrument Serif', serif", fontStyle: "italic" };
const mono  = { fontFamily: "'IBM Plex Mono', monospace" };
const muted = { color: "#aaa", letterSpacing: "0.18em", textTransform: "uppercase", fontSize: "0.65rem" };

export default function Contact({ t }) {
  return (
    <section
      id="contact"
      className="section-pad"
      style={{ padding: "7rem 3rem", background: "#fff" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <SectionHeader number="05" title={t.contact.title} />
        </Reveal>

        <div
          className="two-col"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}
        >
          {/* Left: CTA copy */}
          <Reveal delay={0.1}>
            <h3
              style={{
                ...serif,
                fontSize: "clamp(1.5rem, 3vw, 2.3rem)",
                color: "#1c1c1c",
                lineHeight: 1.2,
                marginBottom: "1.1rem",
              }}
            >
              {t.contact.subtitle}
            </h3>

            <p style={{ color: "#777", lineHeight: 1.8, marginBottom: "2rem", fontSize: "0.93rem" }}>
              {t.contact.description}
            </p>

            <a href="mailto:sanntiocampo@gmail.com" className="btn-dark">
              {t.contact.cta} →
            </a>
          </Reveal>

          {/* Right: contact links */}
          <Reveal delay={0.15}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
              {contactLinks.map(({ icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-row"
                >
                  <span style={{ fontSize: "1.05rem", width: "22px", textAlign: "center" }}>
                    {icon}
                  </span>

                  <div>
                    <p style={{ ...mono, ...muted, marginBottom: "2px" }}>{label}</p>
                    <p style={{ fontSize: "0.87rem", color: "#444" }}>{value}</p>
                  </div>

                  <span style={{ marginLeft: "auto", color: "#ccc" }}>→</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
