import Reveal from "../ui/Reveal";
const sans = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const mono = { fontFamily: "'DM Mono', monospace" };

const COMPANY_COLORS = {
    "NativoDev": "#1D4ED8",
    "Bizland Tech": "#0EA5E9",
    "Taktiful": "#F59E0B",
    "Mindqube SAC": "#94A3B8",
};

const KIND_COLORS = {
    personal: { bg: "#F5F3FF", border: "#ddd6fe", text: "#7C3AED" },
    freelance: { bg: "#F0FDFA", border: "#99F6E4", text: "#0D9488" },
};

function pillStyle(bg, border, text) {
    return {
        display: "inline-flex", alignItems: "center", gap: "6px",
        background: bg, border: `1px solid ${border}`, borderRadius: "20px",
        padding: "4px 12px", marginBottom: "0.85rem",
        ...mono, fontSize: "0.62rem", color: text,
        letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600,
    };
}

function dotStyle(color) {
    return { width: 8, height: 8, borderRadius: "50%", background: color, display: "inline-block" };
}

function ProfessionalRow({ project, isLast }) {
    const color = COMPANY_COLORS[project.company] || "var(--accent)";
    return (
        <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ position: "relative", width: 18, flexShrink: 0 }}>
                {!isLast && (
                    <span style={{
                        position: "absolute", left: 7.25, top: 18, bottom: 0,
                        width: 1.5, background: "var(--border)",
                    }} />
                )}
                <span style={{
                    position: "absolute", left: 3, top: 6,
                    width: 9, height: 9, borderRadius: "50%",
                    background: color, boxShadow: `0 0 0 3px var(--bg)`,
                }} />
            </div>
            <div style={{ flex: 1, paddingBottom: isLast ? "0.5rem" : "1.85rem", minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", flexWrap: "wrap", marginBottom: "4px" }}>
                    <span style={{ ...sans, fontWeight: 700, fontSize: "0.95rem", color: "var(--text)" }}>
                        {project.name}
                    </span>
                    <span style={{
                        ...mono, fontSize: "0.6rem", padding: "2px 7px", borderRadius: "4px",
                        background: `${color}1A`, color, letterSpacing: "0.03em",
                    }}>
                        {project.company}
                    </span>
                </div>
                <p style={{ fontSize: "0.83rem", color: "var(--text-3)", lineHeight: 1.6, marginBottom: "0.6rem", maxWidth: 520 }}>
                    {project.desc}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                    {project.tech.map(tech => <span key={tech} className="tag">{tech}</span>)}
                    <span className="tag accent">{project.type}</span>
                </div>
            </div>
        </div>
    );
}

function PersonalCard({ project, p }) {
    const colors = KIND_COLORS[project.kind];
    const isCode = project.type === "code";
    const isCurrent = project.type === "current";
    return (
        <Reveal>
            <div className="proj-card" style={{
                border: `1.5px solid ${colors.border}`,
                borderRadius: "10px",
                overflow: "hidden",
                background: "var(--bg)",
                transition: "transform 0.2s, box-shadow 0.2s",
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}>
                <div style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    padding: "0.6rem 0.8rem", background: colors.bg,
                    borderBottom: `1px solid ${colors.border}`,
                }}>
                    {isCode ? (
                        <span style={{ ...mono, fontSize: "0.62rem", color: colors.text, letterSpacing: "0.02em" }}>
                            {"</>"} {project.domain}
                        </span>
                    ) : (
                        <>
                            <span style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
                                <i style={dotStyle("#FF5F57")} />
                                <i style={dotStyle("#FEBC2E")} />
                                <i style={dotStyle("#28C840")} />
                            </span>
                            <span style={{
                                ...mono, fontSize: "0.6rem", color: "var(--text-3)",
                                background: "var(--bg)", border: "1px solid var(--border)",
                                borderRadius: "4px", padding: "1px 8px", marginLeft: "4px",
                                flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                            }}>
                                {project.domain}
                            </span>
                        </>
                    )}
                </div>
                <div style={{ padding: "1.1rem 1.1rem 1.25rem", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.5rem" }}>
                        <span style={{ ...sans, fontWeight: 700, fontSize: "0.92rem", color: "var(--text)" }}>
                            {project.name}
                        </span>
                        <span style={{
                            ...mono, fontSize: "0.56rem", textTransform: "uppercase", letterSpacing: "0.06em",
                            color: colors.text, background: colors.bg, border: `1px solid ${colors.border}`,
                            padding: "2px 7px", borderRadius: "10px", flexShrink: 0,
                        }}>
                            {project.kind === "personal" ? p.personalTag : p.freelanceTag}
                        </span>
                    </div>
                    <p style={{ fontSize: "0.82rem", color: "var(--text-3)", lineHeight: 1.6, marginBottom: "0.85rem", flex: 1 }}>
                        {project.desc}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1rem" }}>
                        {project.tech.map(tech => <span key={tech} className="tag">{tech}</span>)}
                    </div>
                    {isCurrent ? (
                        <p style={{ ...mono, fontSize: "0.6rem", color: colors.text, letterSpacing: "0.02em" }}>
                            {p.currentNote}
                        </p>
                    ) : (
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                ...mono, fontSize: "0.65rem", fontWeight: 600, color: colors.text,
                                textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "5px",
                            }}
                        >
                            {isCode ? p.codeLabel : p.visitLabel} ↗
                        </a>
                    )}
                </div>
            </div>
        </Reveal>
    );
}

export default function Projects({ t }) {
    const p = t.projects;
    return (
        <section id="projects" className="section">
            <style>{`
                .proj-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1.1rem;
                }
                .proj-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 28px rgba(0,0,0,0.08);
                }
                @media (max-width: 700px) {
                    .proj-grid { grid-template-columns: 1fr; }
                }
            `}</style>
            <div className="section-inner">
                <Reveal>
                    <p className="section-eyebrow">{p.eyebrow}</p>
                    <h2 className="section-title">{p.title}</h2>
                </Reveal>

                <Reveal>
                    <div style={pillStyle("var(--accent-bg)", "#c7d7fa", "var(--accent)")}>
                        <span>{p.proLabel}</span>
                        <span style={{ opacity: 0.7 }}>· {p.items.length}</span>
                    </div>
                </Reveal>
                <p style={{ fontSize: "0.82rem", color: "var(--text-3)", marginBottom: "1.75rem", maxWidth: 480 }}>
                    {p.proDesc}
                </p>
                <div style={{ marginBottom: "3rem" }}>
                    {p.items.map((project, i) => (
                        <ProfessionalRow key={i} project={project} isLast={i === p.items.length - 1} />
                    ))}
                </div>

                <Reveal>
                    <div style={pillStyle(KIND_COLORS.personal.bg, KIND_COLORS.personal.border, KIND_COLORS.personal.text)}>
                        <span>{p.personalLabel}</span>
                        <span style={{ opacity: 0.7 }}>· {p.personalItems.length}</span>
                    </div>
                </Reveal>
                <p style={{ fontSize: "0.82rem", color: "var(--text-3)", marginBottom: "1.75rem", maxWidth: 480 }}>
                    {p.personalDesc}
                </p>
                <div className="proj-grid">
                    {p.personalItems.map((project, i) => (
                        <PersonalCard key={i} project={project} p={p} />
                    ))}
                </div>
            </div>
        </section>
    );
}