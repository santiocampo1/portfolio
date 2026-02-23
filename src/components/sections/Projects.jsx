import Reveal from "../ui/Reveal";

const sans = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const mono = { fontFamily: "'DM Mono', monospace" };

export default function Projects({ t }) {
  return (
    <section id="projects" className="section">
      <div className="section-inner">
        <Reveal>
          <p className="section-eyebrow">{t.projects.eyebrow}</p>
          <h2 className="section-title">{t.projects.title}</h2>
        </Reveal>

        {/* Table header — desktop only */}
        <div className="projects-table-header">
          <span>{t.projects.colName}</span>
          <span>{t.projects.colTech}</span>
          <span>{t.projects.colType}</span>
        </div>

        {t.projects.items.map((project, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <div className="project-row">
              {/* Name + description */}
              <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.45rem", marginBottom: "3px", flexWrap: "wrap" }}>
                  <span style={{ ...sans, fontWeight: 600, fontSize: "0.88rem", color: "var(--text)" }}>{project.name}</span>
                  <span style={{ ...mono, fontSize: "0.58rem", color: "var(--text-4)", letterSpacing: "0.04em" }}>· {project.company}</span>
                </div>
                <p style={{ fontSize: "0.81rem", color: "var(--text-3)", lineHeight: 1.55 }}>{project.desc}</p>
              </div>
              {/* Tech */}
              <div className="project-row-tech" style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                {project.tech.slice(0, 4).map(tech => <span key={tech} className="tag">{tech}</span>)}
                {project.tech.length > 4 && <span className="tag">+{project.tech.length - 4}</span>}
              </div>
              {/* Type */}
              <div className="project-row-type">
                <span className="tag accent">{project.type}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}