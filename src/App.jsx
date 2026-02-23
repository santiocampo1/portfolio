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

export default function App() {
  const [lang, setLang] = useState("es");
  const active = useScrollSpy();
  const t = translations[lang];

  const go = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      <GlobalStyles />
      <TopbaB t={t} lang={lang} setLang={setLang} active={active} go={go} />

      <div className="app-shell">
        <Sidebar t={t} lang={lang} setLang={setLang} active={active} go={go} />

        <main className="main-content">
          <Hero t={t} go={go} />
          <About t={t} />
          <Projects t={t} />
          <Experience t={t} />
          <Education t={t} />
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
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: "var(--text-4)", letterSpacing: "0.08em" }}>
              Fullstack Developer · Santa Fe, Argentina
            </span>
          </footer>
        </main>
      </div>
    </>
  );
}