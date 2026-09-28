import { useState, useEffect, lazy, Suspense } from "react";
import { mono } from "../../styles/typography";
import useVisitorCount from "../../hooks/useVisitorCount";
import Celebration from "../ui/Celebration";
import PhotoCard from "../ui/PhotoCard";
import PHOTO from "../../assets/photo.png";
import { CITIES, techStack } from "../../constants/data";

// Three.js pesa: se baja en un chunk aparte para no bloquear el primer render
const EarthGlobe3D = lazy(() => import("../ui/EarthGlobe3D"));

const CV_FILES = { es: "/CV-SantiagoOcampo.pdf", en: "/Resume-SantiagoOcampo.pdf" };
const STACK = Object.values(techStack).flat();

function IntroTile({ t, go, cvFile }) {
  return (
    <div className="tile tile-hero">
      <span className="avail"><i />{t.available}</span>
      <div>
        <h1 style={{ fontSize: "clamp(2.2rem, 4.2vw, 3.3rem)", fontWeight: 800, letterSpacing: "-0.055em", lineHeight: 0.98, textWrap: "balance" }}>
          {t.hero.headline}{" "}
          <span style={{ color: "var(--text-4)" }}>{t.hero.headlineSub}</span>
        </h1>
        <p style={{ marginTop: "1.1rem", fontSize: "0.98rem", lineHeight: 1.65, color: "var(--text-3)", maxWidth: "52ch" }}>
          {t.hero.description}
        </p>
      </div>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <button className="btn btn-primary" onClick={() => go("projects")}>{t.hero.cta} →</button>
        <button className="btn btn-soft" onClick={() => go("contact")}>{t.hero.ctaContact}</button>
        <a className="btn btn-soft" href={cvFile} download>
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M7 1v8M7 9l-3-3M7 9l3-3M1 11h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          {t.hero.cvLabel}
        </a>
      </div>
    </div>
  );
}

function PhotoTile({ caption }) {
  return (
    <div className="tile tile-photo">
      <PhotoCard src={PHOTO} alt="Santiago Ocampo" fill radius={22} />
      <span style={{
        position: "absolute", left: 12, bottom: 12, zIndex: 2, pointerEvents: "none",
        background: "rgba(255,255,255,0.88)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
        fontSize: "0.75rem", fontWeight: 500, padding: "5px 11px", borderRadius: 99,
      }}>
        📍 {caption}
      </span>
    </div>
  );
}

function GlobeTile({ t }) {
  return (
    <div className="tile tile-globe">
      <span className="card-label" style={{ color: "#9AA3B5" }}>{t.hero.remoteLabel}</span>
      <div style={{ flex: 1, minHeight: 150, margin: "0 -1.1rem" }}>
        <Suspense fallback={null}>
          <EarthGlobe3D />
        </Suspense>
      </div>
      <p style={{ fontSize: "0.95rem", fontWeight: 600, lineHeight: 1.25, marginBottom: "0.55rem" }}>{t.hero.remoteCaption}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 10px" }}>
        {CITIES.map(city => (
          <span key={city.name} style={{ display: "inline-flex", alignItems: "center", gap: 5, ...mono, fontSize: "0.64rem", color: "#9AA3B5" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: `#${city.color.toString(16).padStart(6, "0")}` }} />
            {city.name}
          </span>
        ))}
      </div>
    </div>
  );
}

function StatTile({ value, label }) {
  return (
    <div className="tile tile-stat">
      <span className="stat-num">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

function SimonTile({ t }) {
  const ask = () => window.dispatchEvent(new CustomEvent("simon:open", { detail: { question: t.hero.simonQuestion } }));
  return (
    <button className="tile tile-simon" onClick={ask}>
      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <img src="/simon-avatar-face.jpg" alt="" style={{ width: 26, height: 26, borderRadius: "50%", objectFit: "cover" }} />
        <span className="card-label">{t.hero.simonLabel}</span>
      </span>
      <span className="bubble q">{t.hero.simonQuestion}</span>
      <span className="bubble a">{t.hero.simonAnswer}</span>
      <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--accent)", marginTop: "auto" }}>{t.hero.simonCta}</span>
    </button>
  );
}

function StackTile({ label }) {
  return (
    <div className="tile tile-stack">
      <span className="card-label" style={{ padding: "0 1.25rem", marginBottom: 10 }}>{label}</span>
      <div className="marquee">
        <div className="marquee-track">
          {[...STACK, ...STACK].map((tech, i) => <span key={i} aria-hidden={i >= STACK.length}>{tech}</span>)}
        </div>
      </div>
    </div>
  );
}

function VisitsTile({ count, label }) {
  const value = typeof count === "number" ? count.toLocaleString() : count ?? "…";
  return (
    <div className="tile tile-visits">
      <span className="stat-num" style={{ fontSize: "clamp(2rem, 3.4vw, 2.6rem)" }}>{value}</span>
      <span className="stat-label" style={{ color: "#9AA3B5" }}>{label}</span>
    </div>
  );
}

export default function Hero({ t, go, lang }) {
  const { count, isMilestone, clearMilestone } = useVisitorCount();
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => { if (isMilestone) setShowCelebration(true); }, [isMilestone]);

  const cvFile = CV_FILES[lang] ?? CV_FILES.es;
  const [years, companies] = t.hero.stats;

  return (
    <section id="hero" className="section">
      <div className="bento">
        <IntroTile t={t} go={go} cvFile={cvFile} />
        <PhotoTile caption={t.hero.photoCaption} />
        <GlobeTile t={t} />
        <StatTile value={years.value} label={years.label} />
        <StatTile value={companies.value} label={companies.label} />
        <SimonTile t={t} />
        <StackTile label={t.hero.stackLabel} />
        <VisitsTile count={count} label={t.hero.visitorsLabel} />
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
