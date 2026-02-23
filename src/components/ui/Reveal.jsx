import { useRef } from "react";
import useVisible from "../../hooks/useVisible";

/**
 * Wraps children in a div that fades + slides up
 * the first time it enters the viewport.
 *
 * @param {number} delay  - CSS transition delay in seconds
 * @param {string} className
 * @param {object} style  - extra inline styles on the wrapper
 */
export default function Reveal({ children, delay = 0, className = "", style = {} }) {
  const ref = useRef(null);
  const visible = useVisible(ref);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(26px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
