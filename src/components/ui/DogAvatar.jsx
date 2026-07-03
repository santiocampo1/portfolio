const ANIMATIONS = `
  @keyframes dog-ear-l      { 0%,100%{transform:rotate(0deg)} 30%{transform:rotate(-6deg)} 60%{transform:rotate(3deg)} }
  @keyframes dog-ear-r      { 0%,100%{transform:rotate(0deg)} 30%{transform:rotate(6deg)} 60%{transform:rotate(-3deg)} }
  @keyframes dog-blink      { 0%,85%,100%{transform:scaleY(1)} 90%{transform:scaleY(0.06)} }
  @keyframes dog-nose       { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }
  @keyframes dog-breathe    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(1px)} }
  @keyframes dog-bark-head  { 0%,58%,100%{transform:translateY(0) scale(1)} 60%{transform:translateY(-6px) scale(1.04)} 63%{transform:translateY(2px) scale(0.98)} 66%{transform:translateY(-4px) scale(1.03)} 70%{transform:translateY(0) scale(1)} }
  @keyframes dog-bark-mouth { 0%,58%,73%,100%{transform:scaleY(1) translateY(0)} 61%,69%{transform:scaleY(1.6) translateY(4px)} }
  @keyframes dog-bark-tongue{ 0%,58%,74%,100%{opacity:0;transform:translateY(-8px)} 62%,70%{opacity:1;transform:translateY(0)} }
  @keyframes dog-bark-ear-l { 0%,57%,75%,100%{transform:rotate(0deg)} 61%,69%{transform:rotate(-22deg)} }
  @keyframes dog-bark-ear-r { 0%,57%,75%,100%{transform:rotate(0deg)} 61%,69%{transform:rotate(22deg)} }
  @keyframes dog-bark-eye   { 0%,57%,75%,100%{transform:scaleY(1)} 61%,69%{transform:scaleY(1.3)} }
  @keyframes dog-soundwave  { 0%,57%,80%,100%{opacity:0;transform:scale(0.5)} 63%{opacity:1;transform:scale(1)} 74%{opacity:0;transform:scale(1.6)} }
  .dog-ear-l   { transform-origin:148px 200px; animation: dog-ear-l 3s ease-in-out infinite, dog-bark-ear-l 6s ease-in-out infinite; }
  .dog-ear-r   { transform-origin:292px 200px; animation: dog-ear-r 3s ease-in-out infinite 0.3s, dog-bark-ear-r 6s ease-in-out infinite; }
  .dog-face    { animation: dog-breathe 3s ease-in-out infinite, dog-bark-head 6s ease-in-out infinite; }
  .dog-eye-l   { transform-origin:188px 228px; animation: dog-blink 4s ease-in-out infinite, dog-bark-eye 6s ease-in-out infinite; }
  .dog-eye-r   { transform-origin:252px 228px; animation: dog-blink 4s ease-in-out infinite 0.15s, dog-bark-eye 6s ease-in-out infinite; }
  .dog-nose    { transform-origin:220px 262px; animation: dog-nose 2.2s ease-in-out infinite; }
  .dog-mouth   { transform-origin:220px 285px; animation: dog-bark-mouth 6s ease-in-out infinite; }
  .dog-tongue  { transform-origin:220px 295px; animation: dog-bark-tongue 6s ease-in-out infinite; }
  .dog-soundwave { transform-origin:310px 220px; animation: dog-soundwave 6s ease-in-out infinite; }
`;

export default function DogAvatar() {
    return (
        <svg
            width="52" height="52" viewBox="90 110 260 260"
            fill="none" xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block", overflow: "visible" }}
        >
            <style>{ANIMATIONS}</style>

            <g className="dog-soundwave">
                <path d="M308 196 Q322 220 308 244" stroke="rgba(139,92,246,0.8)" strokeWidth="5" fill="none" strokeLinecap="round" />
                <path d="M322 185 Q342 220 322 255" stroke="rgba(139,92,246,0.5)" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M336 174 Q362 220 336 266" stroke="rgba(139,92,246,0.25)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            </g>

            <g className="dog-ear-l">
                <ellipse cx="148" cy="196" rx="52" ry="72" fill="#8B5E3C" transform="rotate(-10,148,196)" />
                <ellipse cx="148" cy="200" rx="34" ry="54" fill="#A0714F" transform="rotate(-10,148,200)" />
            </g>
            <g className="dog-ear-r">
                <ellipse cx="292" cy="196" rx="52" ry="72" fill="#7A7A7A" transform="rotate(10,292,196)" />
                <ellipse cx="292" cy="200" rx="34" ry="54" fill="#9A9A9A" transform="rotate(10,292,200)" />
            </g>

            <g className="dog-face">
                <ellipse cx="220" cy="226" rx="108" ry="100" fill="#F5F0EA" />
                <ellipse cx="186" cy="210" rx="44" ry="36" fill="#8B5E3C" opacity="0.75" />
                <ellipse cx="254" cy="214" rx="40" ry="32" fill="#888" opacity="0.6" />
                <ellipse cx="220" cy="148" rx="48" ry="26" fill="#8B5E3C" opacity="0.5" />
                <ellipse cx="220" cy="268" rx="54" ry="40" fill="#EDE8E0" />
                <line x1="220" y1="252" x2="220" y2="290" stroke="#D4C8B8" strokeWidth="1.5" />

                <g className="dog-eye-l">
                    <ellipse cx="188" cy="228" rx="20" ry="21" fill="#2A1A0C" />
                    <ellipse cx="188" cy="228" rx="15" ry="16" fill="#4A2E18" />
                    <ellipse cx="188" cy="228" rx="10" ry="10.5" fill="#1A0E05" />
                    <ellipse cx="194" cy="221" rx="5" ry="4.5" fill="#fff" opacity="0.9" />
                    <ellipse cx="182" cy="233" rx="2" ry="1.8" fill="#fff" opacity="0.45" />
                </g>
                <g className="dog-eye-r">
                    <ellipse cx="252" cy="228" rx="20" ry="21" fill="#2A1A0C" />
                    <ellipse cx="252" cy="228" rx="15" ry="16" fill="#4A2E18" />
                    <ellipse cx="252" cy="228" rx="10" ry="10.5" fill="#1A0E05" />
                    <ellipse cx="258" cy="221" rx="5" ry="4.5" fill="#fff" opacity="0.9" />
                    <ellipse cx="246" cy="233" rx="2" ry="1.8" fill="#fff" opacity="0.45" />
                </g>

                <path d="M168 206 Q188 198 208 206" stroke="#7A4E28" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                <path d="M232 208 Q252 200 272 208" stroke="#666" strokeWidth="3" strokeLinecap="round" fill="none" />

                <g className="dog-nose">
                    <ellipse cx="220" cy="262" rx="26" ry="18" fill="#1A1A1A" />
                    <ellipse cx="208" cy="266" rx="7" ry="5" fill="#111" opacity="0.8" />
                    <ellipse cx="232" cy="266" rx="7" ry="5" fill="#111" opacity="0.8" />
                    <ellipse cx="213" cy="256" rx="6" ry="3.5" fill="#555" opacity="0.7" />
                </g>
                <g className="dog-mouth">
                    <path d="M196 282 Q220 296 244 282" stroke="#B0967A" strokeWidth="4" strokeLinecap="round" fill="none" />
                </g>
                <g className="dog-tongue">
                    <ellipse cx="220" cy="300" rx="18" ry="14" fill="#E06060" />
                    <ellipse cx="220" cy="308" rx="13" ry="9" fill="#D05050" />
                    <path d="M207 300 Q220 316 233 300" stroke="#C04040" strokeWidth="2" fill="none" />
                </g>

                <path d="M194 162 Q202 152 210 162" stroke="#E0D8CC" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                <path d="M230 158 Q238 148 246 158" stroke="#8B5E3C" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" />
                <path d="M176 234 Q180 228 184 234" stroke="#9A7050" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.3" />
            </g>
        </svg>
    );
}