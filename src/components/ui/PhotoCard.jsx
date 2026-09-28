import { useRef, useEffect } from "react";

const CORNER_ICONS = [
    { emoji: "🧙‍♂️", label: "Wizard", pos: { top: -14, right: -14 } },
    { emoji: "🔮", label: "Sphere", pos: { bottom: -14, left: -14 } },
];

// Move these to GlobalStyles.jsx to avoid injecting a <style> tag on every mount
const PHOTO_CSS = `
  @keyframes photo-float {
    0%,100% { transform: perspective(900px) rotateY(-1deg) translateY(0);    box-shadow: 0 14px 36px rgba(0,0,0,0.12); }
    50%      { transform: perspective(900px) rotateY(1deg)  translateY(-5px); box-shadow: 0 22px 44px rgba(0,0,0,0.15); }
  }
  @media (hover: none) and (prefers-reduced-motion: no-preference) {
    .photo-card { animation: photo-float 4s ease-in-out infinite; }
  }
  .flee-icon { cursor: default; user-select: none; }
`;

// Named constants replace magic numbers
const IDLE_SPEED = 0.012;
const TILT_MAX = 18;
const FLEE_RADIUS = 88;
const FLEE_FORCE = 38;
const FLEE_EASE = "transform 0.45s cubic-bezier(0.34,1.56,0.64,1)";
const FLEE_IDENTITY = "translate(0,0) rotate(0deg) scale(1)";

export default function PhotoCard({ src, alt, fill = false, radius = 16 }) {
    const cardRef = useRef(null);
    const shineRef = useRef(null);
    const iconRefs = useRef([]);
    const rafRef = useRef(null);  // idle loop handle
    const moveRef = useRef(null);  // mousemove throttle handle
    const lastMove = useRef(null);  // most recent mousemove event
    const tRef = useRef(0);

    useEffect(() => {
        const isTouch = window.matchMedia("(hover: none)").matches;
        const noMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (isTouch || noMotion) return;

        const card = cardRef.current;
        const shine = shineRef.current;
        let hovered = false;

        // ── Idle float ──────────────────────────────────────────────────────
        function loop() {
            if (!hovered) {
                tRef.current += IDLE_SPEED;
                const t = tRef.current;
                const ty = Math.sin(t + 1) * 3;
                card.style.transform = `perspective(900px) rotateX(${Math.cos(t * 0.7) * 0.4}deg) rotateY(${Math.sin(t) * 1.5}deg) translateY(${ty}px)`;
                card.style.boxShadow = `0 ${14 + Math.abs(ty)}px 40px rgba(0,0,0,${0.12 + Math.abs(ty) * 0.005})`;
            }
            rafRef.current = requestAnimationFrame(loop);
        }
        loop();

        // ── Flee icons ──────────────────────────────────────────────────────
        function applyFlee(e) {
            iconRefs.current.forEach(el => {
                if (!el) return;
                const r = el.getBoundingClientRect();
                const dx = e.clientX - (r.left + r.width / 2);
                const dy = e.clientY - (r.top + r.height / 2);
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < FLEE_RADIUS) {
                    const force = ((FLEE_RADIUS - dist) / FLEE_RADIUS) ** 1.4;
                    const len = dist || 1;
                    el.style.transition = "none";
                    el.style.transform = `translate(${-(dx / len) * force * FLEE_FORCE}px, ${-(dy / len) * force * FLEE_FORCE}px) rotate(${dx * dy * 0.008 * force}deg) scale(${1 - force * 0.12})`;
                } else if (el.style.transition !== FLEE_EASE) {
                    // Guard: skip DOM write if icon is already at rest
                    resetIcon(el);
                }
            });
        }

        function resetIcon(el) {
            el.style.transition = FLEE_EASE;
            el.style.transform = FLEE_IDENTITY;
        }

        function resetAllIcons() {
            iconRefs.current.forEach(el => { if (el) resetIcon(el); });
        }

        // ── Mouse events ────────────────────────────────────────────────────
        function onEnter() {
            hovered = true;
            card.style.transition = "transform 0.1s ease, box-shadow 0.1s ease";
        }

        function processMove(e) {
            moveRef.current = null;
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;

            card.style.transform = `perspective(900px) rotateX(${-y * TILT_MAX}deg) rotateY(${x * TILT_MAX}deg) scale(1.03)`;
            card.style.boxShadow = `${-x * 20}px ${y * 20 + 22}px 48px rgba(0,0,0,0.18)`;
            shine.style.opacity = "1";
            shine.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.32) 0%, transparent 65%)`;

            applyFlee(e);
        }

        function onMove(e) {
            // RAF throttle: always process the *last* event, cap at ~60fps
            lastMove.current = e;
            if (moveRef.current) return;
            moveRef.current = requestAnimationFrame(() => processMove(lastMove.current));
        }

        function onLeave() {
            hovered = false;
            card.style.transition = "transform 0.55s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease";
            shine.style.opacity = "0";
            resetAllIcons();
            card.addEventListener("transitionend", () => {
                if (!hovered) card.style.transition = "";
            }, { once: true });
        }

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);

        return () => {
            cancelAnimationFrame(rafRef.current);
            cancelAnimationFrame(moveRef.current); // cancel any pending throttled frame
            card.removeEventListener("mouseenter", onEnter);
            card.removeEventListener("mousemove", onMove);
            card.removeEventListener("mouseleave", onLeave);
        };
    }, []);

    return (
        <>
            <style>{PHOTO_CSS}</style>
            <div ref={cardRef} className="photo-card" style={{ position: "relative", width: "100%", height: fill ? "100%" : undefined, borderRadius: radius, willChange: "transform" }}>
                {CORNER_ICONS.map(({ emoji, label, pos }, i) => (
                    <div
                        key={label}
                        ref={el => iconRefs.current[i] = el}
                        className="flee-icon"
                        aria-hidden="true"
                        style={{
                            position: "absolute", ...pos, zIndex: 3,
                            width: 44, height: 44, borderRadius: "12px",
                            background: "#fff",
                            border: "0.5px solid var(--border)",
                            boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "1.25rem",
                        }}
                    >
                        {emoji}
                    </div>
                ))}
                <div style={{ width: "100%", height: fill ? "100%" : undefined, aspectRatio: fill ? undefined : "3 / 4", borderRadius: radius, overflow: "hidden", position: "relative" }}>
                    <img
                        src={src} alt={alt}
                        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 55%", display: "block" }}
                    />
                    <div ref={shineRef} style={{ position: "absolute", inset: 0, opacity: 0, transition: "opacity 0.1s", pointerEvents: "none", borderRadius: radius }} />
                </div>
            </div>
        </>
    );
}