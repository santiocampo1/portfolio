import Reveal from "../ui/Reveal";

import { mono } from "../../styles/typography";

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
                        <Reveal key={i} delay={i * 0.07} style={{ height: "100%" }}>
                            <div className="cert-card">
                                <span className={`cert-badge ${item.status === "in-progress" ? "in-progress" : "done"}`}>
                                    {item.status === "in-progress"
                                        ? <><span className="badge-dot" />{t.education.inProgress}</>
                                        : <>✓ {item.year}</>}
                                </span>
                                <div style={{ fontSize: "1.6rem", marginBottom: "0.7rem", lineHeight: 1 }}>{item.icon}</div>
                                <h3 style={{ fontWeight: 700, fontSize: "1.1rem", letterSpacing: "-0.02em", color: "var(--text)", lineHeight: 1.3, marginBottom: "4px" }}>{item.name}</h3>
                                <p style={{ ...mono, fontSize: "0.72rem", color: "var(--text-3)", letterSpacing: "0.02em", marginBottom: "0.7rem" }}>{item.issuer}</p>
                                <p style={{ fontSize: "0.9rem", color: "var(--text-3)", lineHeight: 1.6, marginTop: "auto" }}>{item.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}