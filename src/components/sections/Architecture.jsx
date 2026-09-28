import Reveal from "../ui/Reveal";
import ArchitectureDiagram from "../ui/ArchitectureDiagram";

export default function Architecture({ t }) {
    const p = t.projects;
    return (
        <section id="architecture" className="section">
            <Reveal>
                <div className="blueprint">
                    <p className="bp-mono" style={{ fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--bp-hi)", marginBottom: "0.6rem" }}>
                        {p.archEyebrow}
                    </p>
                    <h2 style={{ fontSize: "clamp(1.9rem, 4vw, 2.9rem)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: "0.75rem", textWrap: "balance" }}>
                        {p.archLabel}
                    </h2>
                    <p style={{ color: "var(--bp-mut)", maxWidth: "58ch", marginBottom: "1.75rem" }}>{p.archDesc}</p>

                    <ArchitectureDiagram content={p.architecture} />

                    <div className="bp-block">
                        {p.archBlock.map(({ label, value }) => (
                            <div key={label}>
                                <small>{label}</small>
                                {value}
                            </div>
                        ))}
                    </div>
                </div>
            </Reveal>
        </section>
    );
}
