import { useEffect } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=DM+Mono:ital,wght@0,400;0,500;1,400&display=swap');

  /* ─── Variables ─── */
  :root {
    --bg:        #FFFFFF;
    --bg-subtle: #F6F6F4;
    --bg-hover:  #EFEFED;
    --text:      #111111;
    --text-2:    #444444;
    --text-3:    #888888;
    --text-4:    #BBBBBB;
    --accent:    #1D4ED8;
    --accent-bg: #EFF3FF;
    --border:    #E8E8E5;
    --border-2:  #D0D0CC;
    --success:   #16A34A;
    --warning:   #D97706;
    --sidebar-w: 220px;
  }

  /* ─── Reset ─── */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 15px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
  ::selection { background: var(--accent); color: #fff; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-thumb { background: var(--border-2); }
  a { color: inherit; text-decoration: none; }

  /* ─── Layout: sidebar fijo + contenido scrolleable ─── */
  .app-shell {
    display: flex;
    min-height: 100vh;
  }

  /* ─── Sidebar (desktop) ─── */
  .sidebar {
    position: fixed;
    top: 0; left: 0;
    width: var(--sidebar-w);
    height: 100vh;
    border-right: 1px solid var(--border);
    background: var(--bg-subtle);
    display: flex;
    flex-direction: column;
    padding: 2rem 0;
    z-index: 100;
    overflow-y: auto;
    flex-shrink: 0;
  }
  .sidebar-logo {
    padding: 0 1.5rem 1.5rem;
    border-bottom: 1px solid var(--border);
    margin-bottom: 1.25rem;
  }
  .sidebar-logo-name {
    font-weight: 700;
    font-size: 0.92rem;
    letter-spacing: -0.01em;
    color: var(--text);
    display: block;
    line-height: 1.3;
  }
  .sidebar-logo-role {
    font-family: 'DM Mono', monospace;
    font-size: 0.62rem;
    color: var(--text-3);
    letter-spacing: 0.04em;
    margin-top: 3px;
    display: block;
  }
  .sidebar-nav { flex: 1; padding: 0 0.6rem; }
  .sidebar-section-label {
    font-family: 'DM Mono', monospace;
    font-size: 0.58rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--text-4);
    padding: 0 0.75rem;
    margin-bottom: 0.4rem;
    margin-top: 1rem;
    display: block;
  }
  .nav-item {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.45rem 0.75rem;
    border-radius: 6px;
    font-size: 0.83rem;
    font-weight: 500;
    color: var(--text-3);
    cursor: pointer;
    transition: all 0.15s;
    margin-bottom: 1px;
    border: 1px solid transparent;
    user-select: none;
  }
  .nav-item:hover { background: var(--bg-hover); color: var(--text-2); }
  .nav-item.active {
    background: var(--accent-bg);
    color: var(--accent);
    border-color: rgba(29,78,216,0.12);
  }
  .nav-item-icon {
    font-family: 'DM Mono', monospace;
    font-size: 0.7rem;
    width: 14px;
    text-align: center;
    flex-shrink: 0;
  }
  .sidebar-footer {
    padding: 1.25rem 1.5rem 0;
    border-top: 1px solid var(--border);
    margin-top: auto;
  }
  .available-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: 'DM Mono', monospace;
    font-size: 0.6rem;
    color: var(--success);
    letter-spacing: 0.04em;
  }
  .available-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--success);
    animation: pulse-green 2s ease-in-out infinite;
    flex-shrink: 0;
  }
  .lang-toggle {
    display: flex;
    gap: 2px;
    margin-top: 0.85rem;
    background: var(--bg-hover);
    padding: 3px;
    border-radius: 6px;
    border: 1px solid var(--border);
  }
  .lang-btn {
    flex: 1;
    background: none;
    border: none;
    padding: 4px 6px;
    border-radius: 4px;
    font-family: 'DM Mono', monospace;
    font-size: 0.62rem;
    letter-spacing: 0.05em;
    cursor: pointer;
    color: var(--text-3);
    transition: all 0.15s;
  }
  .lang-btn.active {
    background: var(--bg);
    color: var(--text);
    box-shadow: 0 1px 2px rgba(0,0,0,0.08);
  }

  /* ─── Main content ─── */
  .main-content {
    margin-left: var(--sidebar-w);
    flex: 1;
    min-width: 0;
  }

  /* ─── Sections ─── */
  .section {
    padding: 4rem 3rem;
    border-bottom: 1px solid var(--border);
    width: 100%;
  }
  .section:last-child { border-bottom: none; }

  .section-inner {
    max-width: 840px;
    width: 100%;
  }

  .section-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 0.63rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 0.65rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .section-eyebrow::before {
    content: '';
    display: inline-block;
    width: 14px; height: 1px;
    background: var(--accent);
    flex-shrink: 0;
  }

  .section-title {
    font-weight: 700;
    font-size: 1.65rem;
    letter-spacing: -0.03em;
    line-height: 1.2;
    color: var(--text);
    margin-bottom: 2rem;
  }

  /* ─── Tags ─── */
  .tag {
    display: inline-block;
    font-family: 'DM Mono', monospace;
    font-size: 0.61rem;
    padding: 2px 7px;
    background: var(--bg-subtle);
    color: var(--text-3);
    border: 1px solid var(--border);
    border-radius: 4px;
    letter-spacing: 0.02em;
    white-space: nowrap;
    transition: all 0.15s;
  }
  .tag:hover { border-color: var(--border-2); color: var(--text-2); }
  .tag.accent {
    background: var(--accent-bg);
    color: var(--accent);
    border-color: rgba(29,78,216,0.18);
  }

  /* ─── Projects table ─── */
  .projects-table-header {
    display: grid;
    grid-template-columns: 1fr 200px 90px;
    gap: 1rem;
    padding: 0.5rem 0.6rem;
    font-family: 'DM Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-4);
    border-bottom: 1px solid var(--border);
  }
  .project-row {
    display: grid;
    grid-template-columns: 1fr 200px 90px;
    gap: 1rem;
    padding: 1rem 0.6rem;
    border-bottom: 1px solid var(--border);
    transition: background 0.15s;
    border-radius: 4px;
    align-items: center;
  }
  .project-row:last-child { border-bottom: none; }
  .project-row:hover { background: var(--bg-hover); }

  /* ─── Experience ─── */
  .exp-item {
    display: grid;
    grid-template-columns: 160px 1fr;
    gap: 2.5rem;
    padding: 2rem 0;
    border-bottom: 1px solid var(--border);
  }
  .exp-item:first-child { border-top: 1px solid var(--border); }

  /* ─── Cert cards ─── */
  .cert-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }
  .cert-card {
    padding: 1.25rem;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--bg-subtle);
    transition: border-color 0.2s, box-shadow 0.2s;
    display: flex;
    flex-direction: column;
  }
  .cert-card:hover {
    border-color: var(--border-2);
    box-shadow: 0 2px 10px rgba(0,0,0,0.06);
  }
  .cert-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-family: 'DM Mono', monospace;
    font-size: 0.58rem;
    padding: 2px 8px;
    border-radius: 20px;
    letter-spacing: 0.05em;
    margin-bottom: 0.85rem;
    width: fit-content;
  }
  .cert-badge.done {
    background: rgba(22,163,74,0.08);
    color: var(--success);
    border: 1px solid rgba(22,163,74,0.2);
  }
  .cert-badge.in-progress {
    background: rgba(217,119,6,0.08);
    color: var(--warning);
    border: 1px solid rgba(217,119,6,0.2);
  }
  .badge-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: var(--warning);
    animation: pulse-green 2s infinite;
    flex-shrink: 0;
  }

  /* ─── Contact ─── */
  .contact-link {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    padding: 0.85rem 0;
    border-bottom: 1px solid var(--border);
    color: inherit;
    text-decoration: none;
    transition: color 0.2s;
  }
  .contact-link:first-child { border-top: 1px solid var(--border); }
  .contact-link:hover { color: var(--accent); }
  .c-icon {
    width: 32px; height: 32px;
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.85rem;
    flex-shrink: 0;
    transition: border-color 0.2s;
  }
  .contact-link:hover .c-icon { border-color: var(--border-2); }
  .c-label {
    font-family: 'DM Mono', monospace;
    font-size: 0.58rem;
    color: var(--text-4);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 2px;
  }
  .c-value { font-size: 0.88rem; font-weight: 500; }
  .c-arrow {
    margin-left: auto;
    color: var(--text-4);
    font-size: 0.85rem;
    transition: transform 0.2s, color 0.2s;
    flex-shrink: 0;
  }
  .contact-link:hover .c-arrow { transform: translate(2px,-2px); color: var(--accent); }

  /* ─── Stack ─── */
  .stack-group-label {
    font-family: 'DM Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-4);
    margin-bottom: 0.55rem;
  }

  /* ─── Animations ─── */
  @keyframes pulse-green {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.35; }
  }

  /* ─── CV Button tooltip ─── */
  .cv-btn { position: relative; }
  .cv-btn-tooltip {
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%) translateY(4px);
    background: var(--text);
    color: #fff;
    font-family: 'DM Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 5px 10px;
    border-radius: 5px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s, transform 0.2s;
  }
  .cv-btn-tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: var(--text);
  }
  .cv-btn:hover .cv-btn-tooltip { opacity: 1; transform: translateX(-50%) translateY(0); }

  /* ─── Mobile topbar ─── */
  .topbar {
    display: none;
    position: fixed; top: 0; left: 0; right: 0;
    height: 52px;
    background: rgba(255,255,255,0.96);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    padding: 0 1.25rem;
    align-items: center;
    justify-content: space-between;
    z-index: 300;
  }
  .topbar-name {
    font-weight: 700;
    font-size: 0.9rem;
    letter-spacing: -0.01em;
  }
  .mobile-menu {
    display: none;
    position: fixed; inset: 0; top: 52px;
    background: rgba(255,255,255,0.98);
    z-index: 299;
    flex-direction: column;
    padding: 1.5rem 1.25rem;
    gap: 2px;
    overflow-y: auto;
  }
  .mobile-menu.open { display: flex; }
  .ham {
    display: flex;
    flex-direction: column; gap: 4px;
    background: none; border: none;
    cursor: pointer; padding: 5px;
  }
  .ham span {
    display: block; width: 18px; height: 1.5px;
    background: var(--text); transition: all 0.22s;
  }
  .ham.open span:nth-child(1) { transform: translateY(5.5px) rotate(45deg); }
  .ham.open span:nth-child(2) { opacity: 0; }
  .ham.open span:nth-child(3) { transform: translateY(-5.5px) rotate(-45deg); }

  /* ─── Responsive ─── */
  @media (max-width: 900px) {
    .sidebar      { display: none; }
    .main-content { margin-left: 0; }
    .topbar       { display: flex; }

    .section { padding: 3rem 1.25rem; }
    .section:first-child { padding-top: calc(3rem + 52px); }

    .section-title { font-size: 1.35rem; }

    /* Hero */
    .hero-photo   { display: none !important; }
    .hero-stats   { grid-template-columns: repeat(2, 1fr) !important; }

    /* Projects */
    .projects-table-header { display: none; }
    .project-row {
      grid-template-columns: 1fr !important;
      gap: 0.4rem;
    }
    .project-row-tech { display: none; }
    .project-row-type { display: none; }

    /* Experience */
    .exp-item {
      grid-template-columns: 1fr !important;
      gap: 0.4rem;
    }

    /* About */
    .about-top-cols {
      grid-template-columns: 1fr !important;
      gap: 1.5rem !important;
    }
    .stack-cols {
      grid-template-columns: 1fr 1fr !important;
      gap: 1rem !important;
    }

    /* Education */
    .cert-grid { grid-template-columns: 1fr !important; }

    /* Guestbook */
    .guestbook-form-top { grid-template-columns: 1fr !important; }

    /* CV Button */
    .cv-btn-label { display: none; }
    .cv-btn {
      padding: 12px !important;
      border-radius: 50% !important;
      right: 1.25rem !important;
    }
    .cv-btn:hover .cv-btn-tooltip,
    .cv-btn:focus .cv-btn-tooltip {
      opacity: 1 !important;
      transform: translateX(-50%) translateY(-4px) !important;
    }

    /* Contact */
    .contact-cols {
      grid-template-columns: 1fr !important;
      gap: 2rem !important;
    }

    /* Buttons */
    .btn-row {
      flex-direction: column !important;
      align-items: flex-start !important;
    }
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