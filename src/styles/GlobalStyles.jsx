import { useEffect } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #f7f5f0; color: #1c1c1c; font-family: 'Inter', sans-serif; overflow-x: hidden; }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: #f7f5f0; }
  ::-webkit-scrollbar-thumb { background: #1c1c1c; }
  ::selection { background: #1c1c1c; color: #f7f5f0; }
  a { color: inherit; text-decoration: none; }

  /* ── Animations ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── Nav links ── */
  .ni {
    font-family: 'IBM Plex Mono', monospace;
    font-size: .7rem; letter-spacing: .08em;
    color: #999; cursor: pointer;
    transition: color .25s; text-transform: uppercase;
    padding: 4px 0; position: relative;
  }
  .ni::after {
    content: ''; position: absolute;
    bottom: 0; left: 0; width: 0; height: 1px;
    background: #1c1c1c; transition: width .3s;
  }
  .ni:hover, .ni.active { color: #1c1c1c; }
  .ni:hover::after, .ni.active::after { width: 100%; }

  /* ── Buttons ── */
  .btn-dark {
    display: inline-flex; align-items: center; gap: 8px;
    background: #1c1c1c; color: #f7f5f0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: .7rem; font-weight: 500;
    letter-spacing: .1em; text-transform: uppercase;
    padding: 11px 22px; border: none; cursor: pointer;
    transition: all .25s;
  }
  .btn-dark:hover { background: #333; transform: translateY(-1px); }

  .btn-light {
    display: inline-flex; align-items: center; gap: 8px;
    background: transparent; color: #1c1c1c;
    font-family: 'IBM Plex Mono', monospace;
    font-size: .7rem; font-weight: 500;
    letter-spacing: .1em; text-transform: uppercase;
    padding: 11px 22px; border: 1.5px solid #1c1c1c; cursor: pointer;
    transition: all .25s;
  }
  .btn-light:hover { background: #1c1c1c; color: #f7f5f0; }

  /* ── Cards ── */
  .card {
    background: #fff; border: 1px solid #e8e4dc;
    padding: 2rem; transition: all .3s; cursor: default;
  }
  .card:hover {
    border-color: #1c1c1c;
    transform: translateY(-4px);
    box-shadow: 5px 5px 0 #1c1c1c;
  }

  /* ── Tech pills ── */
  .pill {
    font-family: 'IBM Plex Mono', monospace;
    font-size: .65rem; padding: 3px 9px;
    background: #f7f5f0; border: 1px solid #ddd8cf;
    color: #777; letter-spacing: .04em;
    transition: all .2s; cursor: default;
  }
  .pill:hover { border-color: #1c1c1c; color: #1c1c1c; background: #fff; }

  /* ── Contact rows ── */
  .contact-row {
    display: flex; align-items: center; gap: 1rem;
    padding: 1rem 1.25rem;
    border: 1px solid #e8e4dc; background: #fff;
    transition: all .25s; cursor: pointer;
    color: inherit; text-decoration: none;
  }
  .contact-row:hover {
    border-color: #1c1c1c;
    transform: translateX(6px);
    box-shadow: 4px 0 0 #1c1c1c;
  }

  /* ── Stack category boxes ── */
  .stack-box {
    background: #fff; border: 1px solid #e8e4dc;
    padding: 1.3rem; transition: border-color .25s;
  }
  .stack-box:hover { border-color: #1c1c1c; }

  /* ── Mobile menu ── */
  .mobile-menu {
    display: none;
    position: fixed; inset: 0;
    background: rgba(247,245,240,0.98);
    z-index: 99;
    flex-direction: column; align-items: center; justify-content: center;
    gap: 2.5rem;
    animation: slideDown .25s ease;
  }
  .mobile-menu.open { display: flex; }

  /* ── Hamburger ── */
  .ham {
    display: none; flex-direction: column; gap: 5px;
    cursor: pointer; padding: 4px;
    background: none; border: none;
    z-index: 101; position: relative;
  }
  .ham span {
    display: block; width: 22px; height: 1.5px;
    background: #1c1c1c; transition: all .3s;
  }
  .ham.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
  .ham.open span:nth-child(2) { opacity: 0; }
  .ham.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

  .desktop-nav { display: flex; align-items: center; gap: 2.5rem; }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .ham          { display: flex; }
    .desktop-nav  { display: none; }

    .hero-grid    { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
    .hero-photo   { order: -1; }

    .two-col      { grid-template-columns: 1fr !important; gap: 2rem !important; }
    .four-col     { grid-template-columns: 1fr !important; }

    .section-pad  { padding: 5rem 1.5rem !important; }
    .stat-row     { gap: 1.5rem !important; }
    .btn-row      { flex-direction: column !important; align-items: flex-start; }

    .contact-row:hover { transform: none !important; box-shadow: none !important; }
    .card:hover        { transform: none !important; box-shadow: none !important; }
  }
`;

export default function GlobalStyles() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return null;
}
