import Reveal from "../ui/Reveal";
import { SectionHeader } from "./About";

const serif = { fontFamily: "'Instrument Serif', serif", fontStyle: "italic" };
const mono  = { fontFamily: "'IBM Plex Mono', monospace" };
const muted = { color: "#aaa", letterSpacing: "0.18em", textTransform: "uppercase", fontSize: "0.65rem" };

export default function Certifications({ t }) {
  return (
    <section
      id="certifications"
      className="section-pad"
      style={{ padding: "7rem 3rem", background: "#f7f5f0" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <SectionHeader number="04" title={t.certifications.title} />
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
            {t.certifications.subtitle}
          </p>
        </Reveal>

        <div
          className="two-col"
          style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}
        >
          {t.certifications.items.map((cert, i) => (
            <Reveal key={i} delay={i * 0.09}>
              <CertCard cert={cert} inProgressLabel={t.certifications.inProgress} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CertCard({ cert, inProgressLabel }) {
  const isInProgress = cert.status === "in-progress";

  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {/* Top row: icon + badge */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontSize: "2rem", lineHeight: 1 }}>{cert.icon}</span>

        {isInProgress ? (
          <span
            style={{
              ...mono,
              fontSize: "0.6rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              background: "#fffbeb",
              border: "1px solid #f59e0b",
              color: "#d97706",
              padding: "3px 10px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#f59e0b",
                display: "inline-block",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            {inProgressLabel}
          </span>
        ) : (
          <span
            style={{
              ...mono,
              fontSize: "0.6rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              background: "#f0fdf4",
              border: "1px solid #86efac",
              color: "#16a34a",
              padding: "3px 10px",
            }}
          >
            ✓ {cert.year}
          </span>
        )}
      </div>

      {/* Name + issuer */}
      <div>
        <h3 style={{ ...serif, fontSize: "1.15rem", color: "#1c1c1c", lineHeight: 1.3, marginBottom: "0.25rem" }}>
          {cert.name}
        </h3>
        <p style={{ ...mono, fontSize: "0.65rem", color: "#aaa", letterSpacing: "0.08em" }}>
          {cert.issuer}
        </p>
      </div>

      <p style={{ color: "#777", fontSize: "0.87rem", lineHeight: 1.65 }}>{cert.description}</p>
    </div>
  );
}
