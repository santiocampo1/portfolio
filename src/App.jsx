import { useState, useCallback } from "react";
import GlobalStyles from "./styles/GlobalStyles";
import translations from "./constants/translations";
import useScrollSpy from "./hooks/useScrollSpy";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/TopBar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import Education from "./components/sections/Education";
import Contact from "./components/sections/Contact";
import Guestbook from "./components/sections/Guestbook";
import CVButton from "./components/ui/CVButton";

export default function App() {
  const [lang, setLang] = useState("es");
  const { activeSection: active } = useScrollSpy();
  const t = translations[lang];

  const go = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      <GlobalStyles />
      <Topbar t={t} lang={lang} setLang={setLang} active={active} go={go} />
      <div className="app-shell">
        <Sidebar t={t} lang={lang} setLang={setLang} active={active} go={go} />
        <main className="main-content">
          <Hero t={t} go={go} lang={lang} />
          <About t={t} />
          <Projects t={t} />
          <Experience t={t} />
          <Education t={t} />
          <Guestbook t={t} lang={lang} />
          <Contact t={t} />
          <footer style={{
            padding: "1.25rem 3rem",
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: "var(--text-4)", letterSpacing: "0.1em" }}>
              © {new Date().getFullYear()} Santiago Ocampo
            </span>
            <a
              href="https://github.com/santiocampo1/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                fontFamily: "'DM Mono', monospace", fontSize: "0.62rem",
                color: "var(--text-4)", letterSpacing: "0.08em",
                textDecoration: "none", transition: "color 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--text-4)"}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              {t.viewSource}
            </a>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: "var(--text-4)", letterSpacing: "0.08em" }}>
              Fullstack Developer · Santa Fe, Argentina
            </span>
          </footer>
        </main>
      </div>
      <CVButton lang={lang} />
    </>
  );
}