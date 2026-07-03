import { useState, useCallback } from "react";
import GlobalStyles from "./styles/GlobalStyles";
import translations from "./constants/translations";
import useScrollSpy from "./hooks/useScrollSpy";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/TopBar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import Education from "./components/sections/Education";
import Guestbook from "./components/sections/Guestbook";
import Contact from "./components/sections/Contact";
import Books from "./components/sections/Books";
import Simon from "./components/ui/Simon";

export default function App() {
  const [lang, setLang] = useState("es");
  const [view, setView] = useState("pro");
  const { activeSection: active } = useScrollSpy();
  const t = translations[lang];

  const go = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const switchView = useCallback((v) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const navProps = { t, lang, setLang, active, go, view, setView: switchView };

  return (
    <>
      <GlobalStyles />
      <Topbar {...navProps} />
      <div className="app-shell">
        <Sidebar {...navProps} />
        <main className="main-content">
          {view === "pro" ? (
            <>
              <Hero t={t} go={go} lang={lang} />
              <About t={t} />
              <Projects t={t} />
              <Experience t={t} />
              <Education t={t} />
              <Guestbook t={t} lang={lang} />
              <Contact t={t} />
            </>
          ) : (
            <Books t={t} />
          )}
          <Footer viewSource={t.viewSource} />
        </main>
      </div>
      <Simon lang={lang} />
    </>
  );
}