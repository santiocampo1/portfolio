import Reveal from "../ui/Reveal";
import { SectionHeader } from "./About";

const serif = { fontFamily: "'Instrument Serif', serif", fontStyle: "italic" };
const mono  = { fontFamily: "'IBM Plex Mono', monospace" };
const muted = { color: "#aaa", letterSpacing: "0.18em", textTransform: "uppercase", fontSize: "0.65rem" };

export default function Projects({ t }) {
  return (
    <section
      id="projects"
      className="section-pad"
      style={{ padding: "7rem 3rem", background: "#f7f5f0" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <SectionHeader number="02" title={t.projects.title} />
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
            {t.projects.subtitle}
          </p>
        </Reveal>

        <div
          className="two-col"
          style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}
        >
          {t.projects.items.map((project, i) => (
            <Reveal key={i} delay={i * 0.09}>
              <ProjectCard project={project} index={i} viewCode={t.projects.viewCode} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, viewCode }) {
  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span
          style={{
            ...mono,
            fontSize: "0.6rem",
            color: "#aaa",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            border: "1px solid #e8e4dc",
            padding: "2px 8px",
          }}
        >
          {project.type}
        </span>
        <span style={{ ...serif, fontSize: "1.8rem", color: "#ede9e1" }}>0{index + 1}</span>
      </div>

      <h3 style={{ ...serif, fontSize: "1.35rem", color: "#1c1c1c", lineHeight: 1.2 }}>
        {project.title}
      </h3>

      <p style={{ color: "#777", lineHeight: 1.7, fontSize: "0.88rem", flexGrow: 1 }}>
        {project.description}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
        {project.tech.map((tech) => (
          <span key={tech} className="pill">{tech}</span>
        ))}
      </div>

      <a
        href="https://github.com/santiocampo1"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          ...mono,
          fontSize: "0.62rem",
          color: "#1c1c1c",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
          borderBottom: "1px solid #1c1c1c",
          paddingBottom: "1px",
          transition: "opacity .2s",
          width: "fit-content",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.45)}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
      >
        ↗ {viewCode}
      </a>
    </div>
  );
}
