import { useRef } from "react";
import useVisible from "../../hooks/useVisible";

export default function Reveal({ children, delay = 0, style = {}, className = "" }) {
  const ref = useRef(null);
  const visible = useVisible(ref);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}