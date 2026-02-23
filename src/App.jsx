import { useState } from "react";

import GlobalStyles from "./styles/GlobalStyles";
import translations from "./constants/translations";
import useScrollSpy from "./hooks/useScrollSpy";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import Certifications from "./components/sections/Certifications";
import Contact from "./components/sections/Contact";

const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function App() {
  const [lang, setLang] = useState("es");
  const { activeSection, scrolled } = useScrollSpy();

  const t = translations[lang];

  return (
    <>
      <GlobalStyles />

      <Navbar
        t={t}
        lang={lang}
        setLang={setLang}
        activeSection={activeSection}
        scrolled={scrolled}
        go={go}
      />

      <main>
        <Hero         t={t} go={go} />
        <About        t={t} />
        <Projects     t={t} />
        <Experience   t={t} />
        <Certifications t={t} />
        <Contact      t={t} />
      </main>

      <Footer />
    </>
  );
}
