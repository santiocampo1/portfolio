import { useState, useEffect } from "react";

/**
 * Fires once when the referenced element enters the viewport.
 * Disconnects the observer after first intersection (one-shot animation).
 */
export default function useVisible(ref, threshold = 0.12) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return visible;
}
