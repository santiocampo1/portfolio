import Reveal from "../ui/Reveal";

const sans = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const mono = { fontFamily: "'DM Mono', monospace" };

export default function Education({ t }) {
    return (
        <section id="education" className="section">
            <div className="section-inner">
                <Reveal>
                    <p className="section-eyebrow">{t.education.eyebrow}</p>
                    <h2 className="section-title">{t.education.title}</h2>
                </Reveal>

                <div className="cert-grid">
                    {t.education.items.map((item, i) => (
                        <Reveal key={i} delay={i * 0.07}>
                            <div className="cert-card">
                                <span className={`cert-badge ${item.status === "in-progress" ? "in-progress" : "done"}`}>
                                    {item.status === "in-progress"
                                        ? <><span className="badge-dot" />{t.education.inProgress}</>
                                        : <>✓ {item.year}</>}
                                </span>
                                <div style={{ fontSize: "1.4rem", marginBottom: "0.6rem", lineHeight: 1 }}>{item.icon}</div>
                                <h3 style={{ ...sans, fontWeight: 600, fontSize: "0.88rem", color: "var(--text)", lineHeight: 1.35, marginBottom: "3px" }}>{item.name}</h3>
                                <p style={{ ...mono, fontSize: "0.6rem", color: "var(--text-4)", letterSpacing: "0.04em", marginBottom: "0.55rem" }}>{item.issuer}</p>
                                <p style={{ fontSize: "0.81rem", color: "var(--text-3)", lineHeight: 1.65, marginTop: "auto" }}>{item.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}