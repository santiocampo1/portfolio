import { useState, useEffect, useRef } from "react";
import useVisitorCount from "../../hooks/useVisitorCount";
import Celebration from "../ui/Celebration";

const sans = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const mono = { fontFamily: "'DM Mono', monospace" };

const CV_FILES = {
  es: { file: "/CV-SantiagoOcampo.pdf", label: "Descargar CV" },
  en: { file: "/Resume-SantiagoOcampo.pdf", label: "Download CV" },
};

function VideoEmbed() {
  const [playing, setPlaying] = useState(false);
  const containerRef = useRef(null);

  function handlePlay() {
    const el = containerRef.current;
    const req = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;
    if (req) {
      try { req.call(el); } catch { /* algunos navegadores bloquean, seguimos igual */ }
    }
    setPlaying(true);
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 560,
        aspectRatio: "16 / 9",
        borderRadius: "10px",
        overflow: "hidden",
        border: "1px solid var(--border)",
        marginBottom: "2.5rem",
        background: "#000",
      }}
    >
      {!playing ? (
        <button
          onClick={handlePlay}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            border: "none", cursor: "pointer",
            padding: 0,
            backgroundImage: "url(https://img.youtube.com/vi/drUpq8zFmCk/hqdefault.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <span style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 56, height: 56, borderRadius: "50%",
            background: "rgba(0,0,0,0.65)",
            transition: "background 0.2s, transform 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(29,78,216,0.85)"; e.currentTarget.style.transform = "scale(1.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,0,0,0.65)"; e.currentTarget.style.transform = "scale(1)"; }}
          >
            <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
              <path d="M1 1.5v19l18-9.5z" fill="#fff" />
            </svg>
          </span>
        </button>
      ) : (
        <iframe
          src="https://www.youtube.com/embed/drUpq8zFmCk?autoplay=1&playsinline=1"
          title="Santiago Ocampo — presentación"
          style={{ width: "100%", height: "100%", border: "none", display: "block" }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      )}
    </div>
  );
}

export default function Hero({ t, go, lang }) {
  const { count, isMilestone, clearMilestone } = useVisitorCount();
  const [showCelebration, setShowCelebration] = useState(false);
  const { file, label } = CV_FILES[lang] || CV_FILES.es;

  useEffect(() => {
    if (isMilestone) setShowCelebration(true);
  }, [isMilestone]);

  return (
    <section id="hero" className="section">
      <div className="section-inner" style={{ maxWidth: 680 }}>
        <p style={{
          ...mono, fontSize: "0.63rem", color: "var(--accent)",
          letterSpacing: "0.2em", textTransform: "uppercase",
          marginBottom: "1.5rem",
          display: "flex", alignItems: "center", gap: "0.5rem",
        }}>
          <span style={{ display: "inline-block", width: 14, height: 1, background: "var(--accent)" }} />
          {t.hero.greeting}
        </p>
        <h1 style={{
          ...sans, fontWeight: 800,
          fontSize: "clamp(2.6rem, 5vw, 4.5rem)",
          letterSpacing: "-0.04em", lineHeight: 1.0,
          color: "var(--text)", marginBottom: "1rem",
        }}>
          Santiago<br />Ocampo
        </h1>
        <p style={{
          ...mono, fontSize: "0.73rem", color: "var(--text-3)",
          letterSpacing: "0.12em", textTransform: "uppercase",
          marginBottom: "2rem", paddingBottom: "2rem",
          borderBottom: "1px solid var(--border)",
        }}>
          {t.hero.role}
        </p>
        <p style={{ fontSize: "0.95rem", lineHeight: 1.85, color: "var(--text-2)", marginBottom: "2rem" }}>
          {t.hero.description}
        </p>
        <VideoEmbed />
        {/* CTA buttons */}
        <div className="btn-row" style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap", marginBottom: "3rem" }}>
          <button
            onClick={() => go("projects")}
            style={{ ...mono, fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500, background: "var(--accent)", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "4px", cursor: "pointer", transition: "background 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#1740b8"}
            onMouseLeave={e => e.currentTarget.style.background = "var(--accent)"}
          >
            {t.hero.cta} →
          </button>
          <button
            onClick={() => go("contact")}
            style={{ ...mono, fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500, background: "transparent", color: "var(--text)", border: "1px solid var(--border-2)", padding: "10px 20px", borderRadius: "4px", cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-2)"; e.currentTarget.style.color = "var(--text)"; }}
          >
            {t.hero.ctaContact}
          </button>
          <a
            href={file}
            download
            style={{
              ...mono, fontSize: "0.68rem", letterSpacing: "0.08em",
              textTransform: "uppercase", fontWeight: 500,
              background: "transparent", color: "var(--text-3)",
              border: "1px solid var(--border)",
              padding: "10px 20px", borderRadius: "4px",
              cursor: "pointer", transition: "all 0.2s",
              textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: "6px",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border-2)"; e.currentTarget.style.color = "var(--text)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-3)"; }}
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v8M7 9l-3-3M7 9l3-3M1 11h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {label}
          </a>
        </div>

        {/* Stats grid */}
        <div className="hero-stats" style={{
          display: "grid",
          gridTemplateColumns: `repeat(${t.hero.stats.length}, 1fr)`,
          borderTop: "1px solid var(--border)",
          borderLeft: "1px solid var(--border)",
          marginBottom: "1rem",
        }}>
          {t.hero.stats.map(({ value, label }, i) => (
            <div key={i} style={{
              padding: "1.1rem 1rem",
              borderRight: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
            }}>
              <div style={{ ...sans, fontWeight: 700, fontSize: "1.4rem", color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1 }}>
                {value}
              </div>
              <div style={{ ...mono, fontSize: "0.58rem", color: "var(--text-4)", marginTop: "5px", letterSpacing: "0.04em", lineHeight: 1.4 }}>
                {label}
              </div>
            </div>
          ))}
        </div> 

        {/* Visitor badge */}
        {count !== null && (
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            marginTop: "0.85rem",
            background: "var(--accent-bg)",
            border: "1px solid #c7d7fa",
            borderRadius: "6px",
            padding: "6px 12px",
          }}>
            <span style={{ fontSize: "0.7rem" }}>✦</span>
            <p style={{ ...mono, fontSize: "0.62rem", color: "var(--accent)", letterSpacing: "0.04em", lineHeight: 1, margin: 0 }}>
              {t.visitors}{" "}
              <span style={{ fontWeight: 700 }}>
                {typeof count === "number" ? count.toLocaleString() : count}
              </span>{" "}
              {t.visitorsUnit}
            </p>
          </div>
        )}
      </div>

      {/* Celebration modal */}
      {showCelebration && typeof count === "number" && (
        <Celebration
          count={count}
          lang={lang}
          onClose={() => { setShowCelebration(false); clearMilestone(); }}
          onGuestbook={() => { setShowCelebration(false); clearMilestone(); document.getElementById("guestbook")?.scrollIntoView({ behavior: "smooth" }); }}
        />
      )}
    </section>
  );
}