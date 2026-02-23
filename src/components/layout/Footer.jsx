const serif = { fontFamily: "'Instrument Serif', serif", fontStyle: "italic" };
const mono  = { fontFamily: "'IBM Plex Mono', monospace" };

const LINKS = [
  { href: "https://github.com/santiocampo1", label: "GitHub" },
  { href: "https://www.linkedin.com/in/santiocampo/", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer
      style={{
        padding: "1.5rem 2rem",
        borderTop: "1px solid #e8e4dc",
        background: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      <span style={{ ...serif, fontSize: "1rem", color: "#1c1c1c" }}>Santiago Ocampo</span>

      <span style={{ ...mono, fontSize: "0.6rem", color: "#bbb", letterSpacing: "0.1em" }}>
        © {new Date().getFullYear()} — Full Stack Developer
      </span>

      <div style={{ display: "flex", gap: "1.5rem" }}>
        {LINKS.map(({ href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...mono, fontSize: "0.62rem", color: "#bbb", letterSpacing: "0.1em", transition: "color .2s" }}
            onMouseEnter={(e) => (e.target.style.color = "#1c1c1c")}
            onMouseLeave={(e) => (e.target.style.color = "#bbb")}
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  );
}
