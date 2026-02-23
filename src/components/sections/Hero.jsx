import PHOTO from "../../assets/photo";
import { STATS } from "../../constants/data";

const serif = { fontFamily: "'Instrument Serif', serif", fontStyle: "italic" };
const mono  = { fontFamily: "'IBM Plex Mono', monospace" };
const STAT_VALUES = ["3+", "15+", "∞"];

export default function Hero({ t, go }) {
  return (
    <section
      id="hero"
      className="section-pad"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "6rem 3rem 4rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dot-grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, #c8c2b5 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.4,
        }}
      />

      <div
        className="hero-grid"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* ── Text column ── */}
        <div>
          <p
            style={{
              ...mono,
              fontSize: "0.7rem",
              color: "#999",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "1.1rem",
              animation: "fadeUp 0.7s ease both",
            }}
          >
            {t.hero.greeting}
          </p>

          <h1
            style={{
              ...serif,
              fontSize: "clamp(3.5rem, 7vw, 6.5rem)",
              lineHeight: 0.94,
              color: "#1c1c1c",
              marginBottom: "1.2rem",
              animation: "fadeUp 0.7s ease 0.1s both",
            }}
          >
            Santiago
            <br />
            Ocampo
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1.5rem",
              animation: "fadeUp 0.7s ease 0.2s both",
            }}
          >
            <div style={{ width: "28px", height: "1px", background: "#ccc" }} />
            <span
              style={{
                ...mono,
                fontSize: "0.72rem",
                color: "#999",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {t.hero.role}
            </span>
          </div>

          <p
            style={{
              fontSize: "0.97rem",
              lineHeight: 1.82,
              color: "#666",
              maxWidth: "420px",
              marginBottom: "2.5rem",
              animation: "fadeUp 0.7s ease 0.3s both",
            }}
          >
            {t.hero.description}
          </p>

          {/* CTAs */}
          <div
            className="btn-row"
            style={{
              display: "flex",
              gap: "0.75rem",
              flexWrap: "wrap",
              animation: "fadeUp 0.7s ease 0.4s both",
            }}
          >
            <button className="btn-dark" onClick={() => go("projects")}>
              {t.hero.cta} →
            </button>
            <button className="btn-light" onClick={() => go("contact")}>
              {t.hero.ctaContact}
            </button>
          </div>

          {/* Stats */}
          <div
            className="stat-row"
            style={{
              display: "flex",
              gap: "2.5rem",
              marginTop: "3.5rem",
              animation: "fadeUp 0.7s ease 0.5s both",
            }}
          >
            {STAT_VALUES.map((value, i) => (
              <div key={i}>
                <div style={{ ...serif, fontSize: "2rem", color: "#1c1c1c", lineHeight: 1 }}>
                  {value}
                </div>
                <div
                  style={{
                    ...mono,
                    fontSize: "0.6rem",
                    color: "#bbb",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginTop: "4px",
                  }}
                >
                  {t.hero.stats[i]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Photo column ── */}
        <div
          className="hero-photo"
          style={{
            display: "flex",
            justifyContent: "center",
            animation: "fadeUp 0.8s ease 0.25s both",
          }}
        >
          <div style={{ position: "relative" }}>
            {/* Offset decorative border */}
            <div
              style={{
                position: "absolute",
                top: -14, right: -14,
                width: "100%", height: "100%",
                border: "1.5px solid #1c1c1c",
                borderRadius: "2px",
                zIndex: 0,
              }}
            />

            {/* Photo frame */}
            <div
              style={{
                width: "min(300px, 85vw)",
                height: "min(370px, 105vw)",
                overflow: "hidden",
                borderRadius: "2px",
                position: "relative",
                zIndex: 1,
                border: "1px solid #ddd8cf",
              }}
            >
              <img
                src={PHOTO}
                alt="Santiago Ocampo"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  transition: "transform 0.5s ease",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.04)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              />
            </div>

            {/* Location label */}
            <div
              style={{
                position: "absolute",
                bottom: -11, left: 14,
                zIndex: 2,
                background: "#1c1c1c",
                color: "#f7f5f0",
                ...mono,
                fontSize: "0.6rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "4px 12px",
              }}
            >
              📍 Argentina
            </div>
          </div>
        </div>
      </div>

      {/* Scroll nudge */}
      <div
        onClick={() => go("about")}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span style={{ ...mono, fontSize: "0.58rem", color: "#ccc", letterSpacing: "0.2em" }}>
          scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "34px",
            background: "linear-gradient(to bottom, #1c1c1c, transparent)",
          }}
        />
      </div>
    </section>
  );
}
