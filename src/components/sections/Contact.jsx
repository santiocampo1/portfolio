import Reveal from "../ui/Reveal";

export default function Contact({ t }) {
  const c = t.contact;
  return (
    <section id="contact" className="section">
      <Reveal>
        <div className="contact-card">
          <div style={{ position: "relative" }}>
            <p className="section-eyebrow" style={{ color: "#8FA6FF" }}>{c.eyebrow}</p>
            <h2 style={{ fontSize: "clamp(2.6rem, 7vw, 4.8rem)", fontWeight: 800, letterSpacing: "-0.06em", lineHeight: 0.95, marginBottom: "1rem" }}>
              {c.title}
            </h2>
            <p style={{ color: "#B4BBC9", fontSize: "1rem", lineHeight: 1.65, maxWidth: "46ch", marginBottom: "1.75rem" }}>{c.description}</p>
            <a href={`mailto:${c.cta}`} className="btn btn-primary" style={{ fontSize: "0.95rem", padding: "14px 20px", maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis" }}>
              {c.cta} ↗
            </a>
          </div>

          <div className="contact-links">
            {c.links.map(({ label, value, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="contact-link">
                <span className="c-label">{label}<span aria-hidden="true">↗</span></span>
                <span className="c-value">{value}</span>
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
