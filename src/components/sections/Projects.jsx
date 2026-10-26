import Reveal from "../ui/Reveal";
import { mono } from "../../styles/typography";

const COMPANY_COLORS = {
    "NativoDev": "#2F5BFF",
    "Bizland Tech": "#0EA5E9",
    "Taktiful": "#F59E0B",
};

const KIND_COLORS = {
    personal: { bg: "#F3F0FF", text: "#6D28D9" },
    freelance: { bg: "#E9F8F4", text: "#0F766E" },
};

// Identidad visual de cada proyecto destacado, tomada de su propia marca
const FEATURED_THEMES = {
    sury: {
        visual: "radial-gradient(120% 90% at 20% 10%, #F4FAEE 0%, #D6ECC6 55%, #A9D38F 100%)",
        soft: "#E4F2DC",
        ink: "#1F6B2A",
    },
    brianborra: {
        visual: "linear-gradient(115deg, #0F1115 0%, #0F1115 62%, #1A1D24 62%, #1A1D24 78%, #E0A82E 78%, #E0A82E 80%, #1A1D24 80%)",
        soft: "#FBF1DB",
        ink: "#9A6A0C",
    },
};

function FeaturedProject({ project, p, flip }) {
    const theme = FEATURED_THEMES[project.id];
    const { images } = project;
    return (
        <Reveal>
            <article className={`feat ${flip ? "flip" : ""}`} style={{ "--feat-soft": theme.soft }}>
                <div className="feat-body">
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                        <span style={{ fontSize: "0.74rem", fontWeight: 600, padding: "4px 10px", borderRadius: 99, background: theme.soft, color: theme.ink }}>
                            {project.client}
                        </span>
                        <span style={{ ...mono, fontSize: "0.72rem", color: "var(--text-4)" }}>{project.year}</span>
                    </div>

                    <div>
                        <h3 style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 1 }}>
                            {project.name}
                        </h3>
                        <p style={{ fontSize: "1.1rem", fontWeight: 600, letterSpacing: "-0.02em", color: theme.ink, marginTop: 6 }}>
                            {project.tagline}
                        </p>
                    </div>

                    <p style={{ fontSize: "0.95rem", lineHeight: 1.65, color: "var(--text-2)" }}>{project.desc}</p>

                    <ul className="checks">
                        {project.highlights.map(h => <li key={h}>{h}</li>)}
                    </ul>

                    <div>
                        <p className="card-label" style={{ marginBottom: 8 }}>{p.howLabel}</p>
                        <div className="flow">
                            {project.flow.map((step, i) => (
                                <span key={step} style={{ display: "contents" }}>
                                    {i > 0 && <b aria-hidden="true">→</b>}
                                    <span>{step}</span>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                        {project.tech.map(tech => <span key={tech} className="tag">{tech}</span>)}
                    </div>

                    {project.url && (
                        <a href={project.url} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ width: "fit-content", marginTop: 4 }}>
                            {p.visitLabel} {project.domain} ↗
                        </a>
                    )}
                </div>

                <div className="feat-visual" style={{ background: theme.visual }}>
                    <div className="browser">
                        <div className="browser-bar"><i /><i /><i /><span>{project.domain ?? project.name}</span></div>
                        <img src={images.desktop} alt={images.desktopAlt} loading="lazy" width="1440" height="900" />
                    </div>
                    <div className="phone">
                        <img src={images.mobile} alt={images.mobileAlt} loading="lazy" />
                    </div>
                </div>
            </article>
        </Reveal>
    );
}

function PersonalCard({ project, p }) {
    const colors = KIND_COLORS[project.kind];
    const isCode = project.type === "code";
    const isCurrent = project.type === "current";
    return (
        <Reveal style={{ height: "100%" }}>
            <div className="card card-hover" style={{ height: "100%", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                    <span style={{ ...mono, fontSize: "0.72rem", color: "var(--text-3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {isCode ? "</> " : "↗ "}{project.domain}
                    </span>
                    <span style={{ fontSize: "0.7rem", fontWeight: 600, color: colors.text, background: colors.bg, padding: "3px 9px", borderRadius: 99, flexShrink: 0 }}>
                        {project.kind === "personal" ? p.personalTag : p.freelanceTag}
                    </span>
                </div>
                <h4 style={{ fontSize: "1.2rem", fontWeight: 700, letterSpacing: "-0.03em" }}>{project.name}</h4>
                <p style={{ fontSize: "0.9rem", color: "var(--text-3)", lineHeight: 1.6, flex: 1 }}>{project.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                    {project.tech.map(tech => <span key={tech} className="tag">{tech}</span>)}
                </div>
                {isCurrent ? (
                    <p style={{ fontSize: "0.8rem", fontWeight: 500, color: colors.text }}>{p.currentNote}</p>
                ) : (
                    <a href={project.url} target="_blank" rel="noreferrer" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)" }}>
                        {isCode ? p.codeLabel : p.visitLabel} ↗
                    </a>
                )}
            </div>
        </Reveal>
    );
}

function ProfessionalRow({ project, isLast }) {
    const color = COMPANY_COLORS[project.company] || "var(--accent)";
    return (
        <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ position: "relative", width: 18, flexShrink: 0 }}>
                {!isLast && <span style={{ position: "absolute", left: 7.25, top: 18, bottom: 0, width: 1.5, background: "var(--border)" }} />}
                <span style={{ position: "absolute", left: 3, top: 6, width: 10, height: 10, borderRadius: "50%", background: color, boxShadow: "0 0 0 3px var(--card)" }} />
            </div>
            <div style={{ flex: 1, paddingBottom: isLast ? 0 : "1.6rem", minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", flexWrap: "wrap", marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, fontSize: "1.02rem", letterSpacing: "-0.02em" }}>{project.name}</span>
                    <span style={{ fontSize: "0.7rem", fontWeight: 600, padding: "2px 8px", borderRadius: 99, background: `${color}1A`, color }}>{project.company}</span>
                </div>
                <p style={{ fontSize: "0.9rem", color: "var(--text-3)", lineHeight: 1.6, marginBottom: "0.6rem", maxWidth: 640 }}>{project.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                    {project.tech.map(tech => <span key={tech} className="tag">{tech}</span>)}
                    <span className="tag accent">{project.type}</span>
                </div>
            </div>
        </div>
    );
}

export default function Projects({ t }) {
    const p = t.projects;
    return (
        <section id="projects" className="section">
            <div className="section-inner">
                <Reveal>
                    <p className="section-eyebrow">{p.eyebrow}</p>
                    <h2 className="section-title">{p.title}</h2>
                    <p className="section-lede">{p.featuredDesc}</p>
                </Reveal>

                <div style={{ display: "grid", gap: 14 }}>
                    {p.featured.map((project, i) => (
                        <FeaturedProject key={project.id} project={project} p={p} flip={i % 2 === 1} />
                    ))}
                </div>

                <div className="sub-heading">
                    <h3>{p.personalLabel}</h3>
                    <p>{p.personalDesc}</p>
                </div>
                <div className="proj-grid">
                    {p.personalItems.map(project => <PersonalCard key={project.name} project={project} p={p} />)}
                </div>

                <div className="sub-heading">
                    <h3>{p.proLabel}</h3>
                    <p>{p.proDesc}</p>
                </div>
                <Reveal>
                    <div className="card" style={{ padding: "clamp(1.5rem, 3vw, 2rem)" }}>
                        {p.items.map((project, i) => (
                            <ProfessionalRow key={project.name} project={project} isLast={i === p.items.length - 1} />
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
