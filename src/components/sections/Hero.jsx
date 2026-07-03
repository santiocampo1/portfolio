import { useState, useEffect } from "react";
import { sans, mono } from "../../styles/typography";
import useVisitorCount from "../../hooks/useVisitorCount";
import Celebration from "../ui/Celebration";
import EarthGlobe3D, { CITIES } from "../ui/EarthGlobe3D";

const CV_FILES = { es: "/CV-SantiagoOcampo.pdf", en: "/Resume-SantiagoOcampo.pdf" };

const HERO_STYLES = `
  @keyframes hero-media-fadein { from { opacity: 0; transform: scale(0.985); } to { opacity: 1; transform: scale(1); } }
  @keyframes hero-tab-glow     { 0%,100% { box-shadow: 0 0 0 0 rgba(124,58,237,0.45); } 50% { box-shadow: 0 0 0 6px rgba(124,58,237,0); } }
  .hero-media-active    { animation: hero-media-fadein 0.35s ease; }
  .hero-tab-active-glow { animation: hero-tab-glow 2.2s ease-out infinite; border-radius: 24px; }
`;

function MediaToggle({ active, onSelect, t }) {
  const tabStyle = (id, color) => ({
    flex: 1, position: "relative", zIndex: 1,
    ...mono, fontSize: "0.66rem", letterSpacing: "0.05em", textTransform: "uppercase",
    fontWeight: 600, background: "none", border: "none", cursor: "pointer",
    padding: "9px 14px", borderRadius: "24px",
    display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
    transition: "color 0.2s", color: active === id ? color : "var(--text-3)",
  });
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: active === "globe" ? "0.6rem" : "1rem" }}>
      <div style={{ width: 300, position: "relative", display: "flex", background: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: "30px", padding: "4px" }}>
        <div style={{ position: "absolute", top: 4, left: 4, width: "calc(50% - 4px)", height: "calc(100% - 8px)", background: "#fff", borderRadius: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", transform: active === "globe" ? "translateX(100%)" : "translateX(0)", transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)" }} />
        <button onClick={() => onSelect("video")} className={active === "video" ? "hero-tab-active-glow" : ""} style={tabStyle("video", "var(--text)")}>▶ {t.hero.tabVideo}</button>
        <button onClick={() => onSelect("globe")} className={active === "globe" ? "hero-tab-active-glow" : ""} style={tabStyle("globe", "var(--accent)")}>🌐 {t.hero.tabGlobe}</button>
      </div>
    </div>
  );
}

function VideoEmbed() {
  return (
    <div key="video" className="hero-media-active" style={{ position: "relative", aspectRatio: "16 / 9", borderRadius: "10px", overflow: "hidden", border: "1px solid var(--border)", background: "var(--bg-subtle)" }}>
      <iframe src="https://www.youtube.com/embed/drUpq8zFmCk" title="Santiago Ocampo — presentación" style={{ width: "100%", height: "100%", border: "none", display: "block" }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
    </div>
  );
}

function GlobeView({ caption }) {
  return (
    <div key="globe" className="hero-media-active">
      <div style={{ position: "relative", aspectRatio: "16 / 9", borderRadius: "10px", overflow: "hidden", border: "1px solid var(--border)", background: "#0a0e1a" }}>
        <EarthGlobe3D />
      </div>
      <p style={{ ...mono, fontSize: "0.62rem", color: "var(--text-3)", letterSpacing: "0.04em", textAlign: "center", margin: "0.6rem 0 0.85rem" }}>{caption}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", justifyContent: "center", marginBottom: "1.9rem" }}>
        {CITIES.map(city => (
          <span key={city.name} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: `#${city.color.toString(16).padStart(6, "0")}`, display: "inline-block" }} />
            <span style={{ ...mono, fontSize: "0.55rem", color: "var(--text-4)", letterSpacing: "0.02em" }}>{city.name}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function HeroCTAs({ t, go, cvFile, cvLabel }) {
  const base = { ...mono, fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500, padding: "10px 20px", borderRadius: "4px", cursor: "pointer", transition: "all 0.2s" };
  return (
    <div className="btn-row" style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap", marginBottom: "3rem" }}>
      <button onClick={() => go("projects")} style={{ ...base, background: "var(--accent)", color: "#fff", border: "none" }} onMouseEnter={e => e.currentTarget.style.background = "#1740b8"} onMouseLeave={e => e.currentTarget.style.background = "var(--accent)"}>{t.hero.cta} →</button>
      <button onClick={() => go("contact")} style={{ ...base, background: "transparent", color: "var(--text)", border: "1px solid var(--border-2)" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-2)"; e.currentTarget.style.color = "var(--text)"; }}>{t.hero.ctaContact}</button>
      <a href={cvFile} download style={{ ...base, background: "transparent", color: "var(--text-3)", border: "1px solid var(--border)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border-2)"; e.currentTarget.style.color = "var(--text)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-3)"; }}>
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 1v8M7 9l-3-3M7 9l3-3M1 11h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        {cvLabel}
      </a>
    </div>
  );
}

function StatsGrid({ stats }) {
  return (
    <div className="hero-stats" style={{ display: "grid", gridTemplateColumns: `repeat(${stats.length}, 1fr)`, borderTop: "1px solid var(--border)", borderLeft: "1px solid var(--border)", marginBottom: "1rem" }}>
      {stats.map(({ value, label }, i) => (
        <div key={i} style={{ padding: "1.1rem 1rem", borderRight: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
          <div style={{ ...sans, fontWeight: 700, fontSize: "1.4rem", color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1 }}>{value}</div>
          <div style={{ ...mono, fontSize: "0.58rem", color: "var(--text-4)", marginTop: "5px", letterSpacing: "0.04em", lineHeight: 1.4 }}>{label}</div>
        </div>
      ))}
    </div>
  );
}

function VisitorBadge({ count, t }) {
  if (count === null) return null;
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginTop: "0.85rem", background: "var(--accent-bg)", border: "1px solid #c7d7fa", borderRadius: "6px", padding: "6px 12px" }}>
      <span style={{ fontSize: "0.7rem" }}>✦</span>
      <p style={{ ...mono, fontSize: "0.62rem", color: "var(--accent)", letterSpacing: "0.04em", lineHeight: 1, margin: 0 }}>
        {t.visitors} <span style={{ fontWeight: 700 }}>{typeof count === "number" ? count.toLocaleString() : count}</span> {t.visitorsUnit}
      </p>
    </div>
  );
}

export default function Hero({ t, go, lang }) {
  const { count, isMilestone, clearMilestone } = useVisitorCount();
  const [showCelebration, setShowCelebration] = useState(false);
  const [activeMedia, setActiveMedia] = useState("video");

  useEffect(() => { if (isMilestone) setShowCelebration(true); }, [isMilestone]);

  const cvFile = CV_FILES[lang] ?? CV_FILES.es;
  const cvLabel = lang === "es" ? "Descargar CV" : "Download CV";

  return (
    <section id="hero" className="section">
      <style>{HERO_STYLES}</style>
      <div className="section-inner" style={{ maxWidth: 680 }}>
        <p style={{ ...mono, fontSize: "0.63rem", color: "var(--accent)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ display: "inline-block", width: 14, height: 1, background: "var(--accent)" }} />
          {t.hero.greeting}
        </p>
        <h1 style={{ ...sans, fontWeight: 800, fontSize: "clamp(2.6rem, 5vw, 4.5rem)", letterSpacing: "-0.04em", lineHeight: 1.0, color: "var(--text)", marginBottom: "1rem" }}>
          Santiago<br />Ocampo
        </h1>
        <p style={{ ...mono, fontSize: "0.73rem", color: "var(--text-3)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "2rem", paddingBottom: "2rem", borderBottom: "1px solid var(--border)" }}>
          {t.hero.role}
        </p>
        <p style={{ fontSize: "0.95rem", lineHeight: 1.85, color: "var(--text-2)", marginBottom: "2rem" }}>{t.hero.description}</p>

        <MediaToggle active={activeMedia} onSelect={setActiveMedia} t={t} />
        <div style={{ marginBottom: activeMedia === "globe" ? "0.6rem" : "2.5rem" }}>
          {activeMedia === "video" ? <VideoEmbed /> : <GlobeView caption={t.hero.globeCaption} />}
        </div>

        <HeroCTAs t={t} go={go} cvFile={cvFile} cvLabel={cvLabel} />
        <StatsGrid stats={t.hero.stats} />
        <VisitorBadge count={count} t={t} />
      </div>

      {showCelebration && typeof count === "number" && (
        <Celebration count={count} lang={lang}
          onClose={() => { setShowCelebration(false); clearMilestone(); }}
          onGuestbook={() => { setShowCelebration(false); clearMilestone(); document.getElementById("guestbook")?.scrollIntoView({ behavior: "smooth" }); }}
        />
      )}
    </section>
  );
}