import { useEffect } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=Geist+Mono:wght@400;500;600&display=swap');

  /* ─── Variables ─── */
  :root {
    --bg:        #F2F3F6;
    --card:      #FFFFFF;
    --bg-subtle: #F6F7F9;
    --bg-hover:  #ECEEF2;
    --ink:       #0E1116;
    --text:      #0E1116;
    --text-2:    #3D4350;
    --text-3:    #6A7080;
    --text-4:    #A3A8B4;
    --accent:    #2F5BFF;
    --accent-2:  #1E45E0;
    --accent-bg: #EEF2FF;
    --border:    #E4E6EB;
    --border-2:  #CDD1D9;
    --success:   #16A34A;
    --warning:   #D97706;
    --radius:    22px;
    --nav-h:     64px;
    --page-w:    1180px;
    --gutter:    clamp(16px, 3vw, 28px);
  }

  /* ─── Reset ─── */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Geist', system-ui, sans-serif;
    font-size: 15px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
  ::selection { background: var(--accent); color: #fff; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-thumb { background: var(--border-2); border-radius: 6px; }
  a { color: inherit; text-decoration: none; }
  button { font-family: inherit; }
  :focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

  /* ─── Layout ─── */
  .main-content {
    max-width: calc(var(--page-w) + var(--gutter) * 2);
    margin: 0 auto;
    padding: calc(var(--nav-h) + 28px) var(--gutter) 0;
  }

  .section {
    padding: 4.5rem 0 0;
    scroll-margin-top: calc(var(--nav-h) + 20px);
  }
  #hero.section { padding-top: 0; }
  .section-inner { width: 100%; }

  .section-eyebrow {
    font-family: 'Geist Mono', ui-monospace, monospace;
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 0.6rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .section-eyebrow::before {
    content: '';
    width: 7px; height: 7px;
    border-radius: 50%;
    background: var(--accent);
    flex-shrink: 0;
  }
  .section-title {
    font-weight: 800;
    font-size: clamp(1.9rem, 4vw, 2.9rem);
    letter-spacing: -0.045em;
    line-height: 1.05;
    color: var(--text);
    margin-bottom: 2rem;
    text-wrap: balance;
  }
  .section-lede {
    font-size: 1rem;
    color: var(--text-3);
    max-width: 58ch;
    margin: -1rem 0 2rem;
  }
  .sub-heading {
    display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; flex-wrap: wrap;
    margin: 3rem 0 1rem;
  }
  .sub-heading h3 { font-size: 1.35rem; font-weight: 700; letter-spacing: -0.03em; }
  .sub-heading p { font-size: 0.9rem; color: var(--text-3); }

  /* ─── Cards ─── */
  .card {
    background: var(--card);
    border: 1px solid rgba(14,17,22,0.05);
    border-radius: var(--radius);
    padding: 1.5rem;
  }
  .card-hover { transition: transform 0.25s ease, box-shadow 0.25s ease; }
  .card-hover:hover { transform: translateY(-3px); box-shadow: 0 18px 32px -18px rgba(14,17,22,0.25); }
  .card-label {
    font-family: 'Geist Mono', ui-monospace, monospace;
    font-size: 0.68rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-3);
  }

  /* Guestbook vive dentro de una tarjeta */
  #guestbook .section-inner {
    background: var(--card);
    border: 1px solid rgba(14,17,22,0.05);
    border-radius: var(--radius);
    padding: clamp(1.5rem, 4vw, 2.75rem);
  }

  /* ─── Tags ─── */
  .tag {
    display: inline-block;
    font-size: 0.72rem;
    font-weight: 500;
    padding: 4px 10px;
    background: var(--bg);
    color: var(--text-2);
    border-radius: 8px;
    white-space: nowrap;
  }
  .tag.accent { background: var(--accent-bg); color: var(--accent); }

  /* ─── Buttons ─── */
  .btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    font-size: 0.88rem; font-weight: 600;
    padding: 12px 18px; border-radius: 12px;
    border: none; cursor: pointer;
    transition: background 0.2s, transform 0.2s, color 0.2s;
    white-space: nowrap;
  }
  .btn:active { transform: scale(0.98); }
  .btn-primary { background: var(--accent); color: #fff; }
  .btn-primary:hover { background: var(--accent-2); }
  .btn-soft { background: var(--bg); color: var(--text); }
  .btn-soft:hover { background: var(--bg-hover); }

  /* ─── Nav ─── */
  .nav {
    position: fixed; top: 12px; left: 0; right: 0; z-index: 400;
    padding: 0 var(--gutter);
  }
  .nav-bar {
    max-width: var(--page-w); margin: 0 auto; height: 52px;
    display: flex; align-items: center; gap: 1rem;
    background: rgba(255,255,255,0.78);
    backdrop-filter: blur(16px) saturate(1.4);
    -webkit-backdrop-filter: blur(16px) saturate(1.4);
    border: 1px solid rgba(14,17,22,0.07);
    border-radius: 99px;
    padding: 0 8px 0 20px;
    box-shadow: 0 8px 24px -16px rgba(14,17,22,0.25);
  }
  .nav-logo { font-weight: 800; font-size: 1.05rem; letter-spacing: -0.04em; cursor: pointer; background: none; border: none; color: var(--text); }
  .nav-logo span { color: var(--accent); }
  .nav-links { display: flex; gap: 2px; margin: 0 auto; }
  .nav-link {
    font-size: 0.84rem; font-weight: 500; color: var(--text-3);
    background: none; border: none; cursor: pointer;
    padding: 7px 11px; border-radius: 99px;
    transition: color 0.15s, background 0.15s;
  }
  .nav-link:hover { color: var(--text); }
  .nav-link.active { color: var(--text); background: var(--bg); }
  .nav-right { display: flex; align-items: center; gap: 6px; margin-left: auto; }
  .seg {
    display: flex; gap: 2px; padding: 3px;
    background: var(--bg); border-radius: 99px;
  }
  .seg button {
    font-size: 0.74rem; font-weight: 600; letter-spacing: 0.02em;
    padding: 6px 11px; border-radius: 99px; border: none; cursor: pointer;
    background: transparent; color: var(--text-3); transition: all 0.15s;
  }
  .seg button.active { background: var(--ink); color: #fff; }
  .ham {
    display: none; flex-direction: column; justify-content: center; gap: 4px;
    width: 38px; height: 38px; border-radius: 50%;
    background: var(--ink); border: none; cursor: pointer; align-items: center;
  }
  .ham span { display: block; width: 15px; height: 1.5px; background: #fff; transition: all 0.22s; }
  .ham.open span:nth-child(1) { transform: translateY(5.5px) rotate(45deg); }
  .ham.open span:nth-child(2) { opacity: 0; }
  .ham.open span:nth-child(3) { transform: translateY(-5.5px) rotate(-45deg); }
  .nav-sheet {
    max-width: var(--page-w); margin: 8px auto 0;
    background: var(--card); border-radius: var(--radius);
    border: 1px solid rgba(14,17,22,0.07);
    box-shadow: 0 24px 48px -24px rgba(14,17,22,0.35);
    padding: 10px; display: flex; flex-direction: column; gap: 2px;
    animation: sheet-in 0.2s ease;
  }
  .nav-sheet .nav-link { text-align: left; font-size: 1rem; padding: 12px 14px; border-radius: 12px; }
  .nav-sheet .seg { margin: 8px 4px 4px; }
  .nav-sheet .seg button { flex: 1; padding: 9px; font-size: 0.8rem; }
  @keyframes sheet-in { from { opacity: 0; transform: translateY(-6px); } }

  /* ─── Bento (hero) ─── */
  .bento {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(150px, auto);
    gap: 12px;
  }
  .tile {
    background: var(--card);
    border: 1px solid rgba(14,17,22,0.05);
    border-radius: var(--radius);
    padding: 1.25rem;
    position: relative;
    overflow: hidden;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }
  .tile:hover { transform: translateY(-3px); box-shadow: 0 18px 32px -18px rgba(14,17,22,0.25); }
  .tile-hero {
    grid-column: span 2; grid-row: span 2;
    display: flex; flex-direction: column; justify-content: space-between; gap: 1.5rem;
    padding: clamp(1.4rem, 3vw, 2.1rem);
  }
  .tile-hero:hover { transform: none; box-shadow: none; }
  .tile-photo { grid-row: span 2; padding: 0; background: transparent; border: none; overflow: visible; }
  .tile-photo:hover { transform: none; box-shadow: none; }
  .tile-globe {
    grid-row: span 2; background: #0A0E1A; color: #fff;
    display: flex; flex-direction: column; padding: 1.1rem 1.1rem 1rem;
  }
  .tile-stat { display: flex; flex-direction: column; justify-content: flex-end; }
  .tile-simon { grid-column: span 2; background: var(--accent-bg); cursor: pointer; text-align: left; border: 1px solid rgba(47,91,255,0.1); font: inherit; color: inherit; display: flex; flex-direction: column; gap: 8px; }
  .tile-stack { grid-column: span 3; padding: 1.1rem 0; display: flex; flex-direction: column; justify-content: center; }
  .tile-visits { background: var(--ink); color: #fff; display: flex; flex-direction: column; justify-content: flex-end; }

  .avail {
    display: inline-flex; align-items: center; gap: 8px; width: fit-content;
    font-size: 0.78rem; font-weight: 500;
    background: #E8F8EE; color: #0F7A3A; padding: 6px 12px; border-radius: 99px;
  }
  .avail i { width: 7px; height: 7px; border-radius: 50%; background: var(--success); animation: pulse-ring 1.8s infinite; }
  @keyframes pulse-ring {
    0% { box-shadow: 0 0 0 0 rgba(22,163,74,0.55); }
    70%, 100% { box-shadow: 0 0 0 8px rgba(22,163,74,0); }
  }
  .stat-num { font-size: clamp(2.4rem, 4.4vw, 3.4rem); font-weight: 800; letter-spacing: -0.06em; line-height: 0.9; font-variant-numeric: tabular-nums; }
  .stat-label { font-size: 0.85rem; color: var(--text-3); margin-top: 8px; }

  .bubble { max-width: 85%; font-size: 0.86rem; padding: 9px 13px; border-radius: 16px; line-height: 1.4; }
  .bubble.q { align-self: flex-end; background: var(--accent); color: #fff; border-bottom-right-radius: 4px; }
  .bubble.a { background: #fff; border-bottom-left-radius: 4px; }

  .marquee { overflow: hidden; -webkit-mask: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent); mask: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent); }
  .marquee-track { display: flex; gap: 8px; width: max-content; animation: marquee 40s linear infinite; }
  .marquee:hover .marquee-track { animation-play-state: paused; }
  .marquee-track span { font-size: 0.86rem; font-weight: 500; padding: 8px 14px; border-radius: 10px; background: var(--bg); white-space: nowrap; }
  @keyframes marquee { to { transform: translateX(-50%); } }

  /* ─── Featured projects ─── */
  .feat {
    display: grid; grid-template-columns: 1fr 1.15fr;
    background: var(--card); border-radius: 28px; overflow: hidden;
    border: 1px solid rgba(14,17,22,0.05);
  }
  .feat.flip .feat-visual { order: -1; }
  .feat-body { padding: clamp(1.5rem, 3.5vw, 2.5rem); display: flex; flex-direction: column; gap: 1.1rem; }
  .feat-visual {
    position: relative; min-height: 420px; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
    padding: 2.5rem 2rem;
  }
  .browser {
    width: 100%; border-radius: 12px; overflow: hidden;
    box-shadow: 0 30px 60px -24px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,0,0,0.08);
    background: #fff; transform: perspective(1400px) rotateY(-6deg) rotateX(2deg);
    transition: transform 0.5s cubic-bezier(.2,.8,.2,1);
  }
  .feat.flip .browser { transform: perspective(1400px) rotateY(6deg) rotateX(2deg); }
  .feat:hover .browser { transform: perspective(1400px) rotateY(0) rotateX(0); }
  .browser-bar { height: 26px; display: flex; align-items: center; gap: 5px; padding: 0 10px; background: #ECEEF2; }
  .browser-bar i { width: 8px; height: 8px; border-radius: 50%; background: #CDD1D9; }
  .browser-bar span { margin-left: 8px; font-size: 0.65rem; color: #6A7080; background: #fff; padding: 1px 8px; border-radius: 5px; font-family: 'Geist Mono', ui-monospace, monospace; }
  .browser img { display: block; width: 100%; height: auto; }
  .phone {
    position: absolute; bottom: -40px; width: 30%; max-width: 190px;
    border-radius: 26px; border: 6px solid #111316; overflow: hidden;
    box-shadow: 0 30px 50px -18px rgba(0,0,0,0.55);
    background: #111316;
    transition: transform 0.5s cubic-bezier(.2,.8,.2,1);
  }
  .feat .phone { right: 6%; }
  .feat.flip .phone { right: auto; left: 6%; }
  .feat:hover .phone { transform: translateY(-14px); }
  .phone img { display: block; width: 100%; height: auto; }
  .flow { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }
  .flow span { font-family: 'Geist Mono', ui-monospace, monospace; font-size: 0.72rem; padding: 5px 10px; border-radius: 8px; border: 1px dashed var(--border-2); color: var(--text-2); }
  .flow b { color: var(--text-4); font-weight: 400; }
  .checks { list-style: none; display: grid; gap: 8px; }
  .checks li { display: flex; gap: 10px; font-size: 0.9rem; color: var(--text-2); line-height: 1.45; }
  .checks li::before { content: ''; flex-shrink: 0; width: 18px; height: 18px; margin-top: 1px; border-radius: 6px; background: var(--feat-soft, var(--accent-bg)) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M4 8.5l2.5 2.5L12 5.5' fill='none' stroke='%23000' stroke-opacity='.65' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center/12px no-repeat; }

  .proj-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }

  /* ─── Blueprint (arquitectura) ─── */
  .blueprint {
    --bp-bg: #0C2342; --bp-line: rgba(110,149,207,0.45); --bp-ink: #E6EEFB; --bp-mut: #8FA8CC; --bp-hi: #FFD23F;
    background:
      linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px) 0 0 / 24px 24px,
      linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px) 0 0 / 24px 24px,
      linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px) 0 0 / 120px 120px,
      linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px) 0 0 / 120px 120px,
      var(--bp-bg);
    color: var(--bp-ink);
    border-radius: 28px;
    padding: clamp(1.4rem, 3.5vw, 2.5rem);
  }
  .bp-mono { font-family: 'Geist Mono', ui-monospace, monospace; }
  .arch-canvas { height: 540px; }
  @media (max-width: 700px) { .arch-canvas { height: 460px; } }
  .bp-block { display: grid; grid-template-columns: repeat(4, 1fr); border: 1.5px solid var(--bp-line); margin-top: 1.25rem; }
  .bp-block div { padding: 10px 12px; border-right: 1px solid var(--bp-line); font-family: 'Geist Mono', ui-monospace, monospace; font-size: 0.78rem; }
  .bp-block div:last-child { border-right: none; }
  .bp-block small { display: block; font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--bp-mut); margin-bottom: 2px; }

  /* ─── Experience ─── */
  .exp-list { display: grid; gap: 12px; }
  .exp-item {
    display: grid; grid-template-columns: 200px 1fr; gap: 2rem;
    background: var(--card); border-radius: var(--radius); padding: 1.6rem 1.75rem;
    border: 1px solid rgba(14,17,22,0.05);
  }

  /* ─── Cert cards ─── */
  .cert-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .cert-card {
    padding: 1.5rem; border-radius: var(--radius); background: var(--card);
    border: 1px solid rgba(14,17,22,0.05);
    display: flex; flex-direction: column; height: 100%;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }
  .cert-card:hover { transform: translateY(-3px); box-shadow: 0 18px 32px -18px rgba(14,17,22,0.25); }
  .cert-badge {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 0.7rem; font-weight: 600; padding: 4px 10px; border-radius: 99px;
    margin-bottom: 1rem; width: fit-content;
  }
  .cert-badge.done { background: #E8F8EE; color: #0F7A3A; }
  .cert-badge.in-progress { background: #FEF3E2; color: #B45309; }
  .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--warning); animation: pulse-green 2s infinite; flex-shrink: 0; }

  /* ─── Contact ─── */
  .contact-card {
    background: var(--ink); color: #fff; border-radius: 28px;
    padding: clamp(1.75rem, 5vw, 3.5rem);
    display: grid; grid-template-columns: 1.1fr 1fr; gap: 2.5rem; align-items: end;
    position: relative; overflow: hidden;
  }
  .contact-card::before {
    content: ''; position: absolute; width: 520px; height: 520px; right: -160px; top: -220px;
    background: radial-gradient(circle, rgba(47,91,255,0.45), transparent 65%);
    pointer-events: none;
  }
  .contact-links { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; position: relative; }
  .contact-link {
    display: flex; flex-direction: column; gap: 2px; min-width: 0;
    padding: 14px 16px; border-radius: 16px;
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08);
    transition: background 0.2s, border-color 0.2s;
  }
  .contact-link:hover { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.18); }
  .c-label { font-family: 'Geist Mono', ui-monospace, monospace; font-size: 0.66rem; letter-spacing: 0.1em; text-transform: uppercase; color: #9AA3B5; display: flex; justify-content: space-between; }
  .c-value { font-size: 0.92rem; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

  /* ─── Animations ─── */
  @keyframes pulse-green {
    0%, 100% { opacity: 1; }
    50%      { opacity: 0.35; }
  }

  /* ─── Responsive ─── */
  @media (max-width: 1100px) {
    .nav-links { display: none; }
    .ham { display: flex; }
    .nav-right .seg.view { display: none; }
  }

  @media (max-width: 900px) {
    .bento { grid-template-columns: repeat(2, 1fr); grid-auto-rows: minmax(128px, auto); }
    .tile-hero { grid-row: auto; }
    .tile-photo, .tile-globe { min-height: 250px; }
    .tile-stack, .tile-visits { grid-column: span 2; }

    .feat, .feat.flip { grid-template-columns: 1fr; }
    .feat-visual, .feat.flip .feat-visual { order: -1; min-height: 0; padding: 1.75rem 1.25rem 3.5rem; }
    .browser, .feat.flip .browser { transform: none; width: 88%; margin-right: 12%; }
    .feat.flip .browser { margin-right: 0; margin-left: 12%; }
    .phone { width: 34%; bottom: -24px; }

    .about-cols { grid-template-columns: 1fr !important; }
    .stack-cols { grid-template-columns: 1fr 1fr !important; }
    .contact-card { grid-template-columns: 1fr; }
    .bp-block { grid-template-columns: 1fr 1fr; }
    .bp-block div:nth-child(2) { border-right: none; }
    .bp-block div:nth-child(-n+2) { border-bottom: 1px solid var(--bp-line); }
  }

  @media (max-width: 700px) {
    .section { padding-top: 3.5rem; }
    .proj-grid, .cert-grid { grid-template-columns: 1fr; }
    .exp-item { grid-template-columns: 1fr; gap: 0.6rem; padding: 1.35rem; }
    .guestbook-form-top { grid-template-columns: 1fr !important; }
  }

  @media (max-width: 600px) {
    .tile-photo, .tile-globe { grid-column: span 2; grid-row: auto; }
    .tile-photo { height: 340px; }
    .tile-globe { min-height: 320px; }
  }

  @media (max-width: 460px) {
    .contact-links { grid-template-columns: 1fr; }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
    html { scroll-behavior: auto; }
  }
`;

export default function GlobalStyles() {
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = css;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);
  return null;
}
