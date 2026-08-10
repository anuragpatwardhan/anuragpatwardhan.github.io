"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // dot tracks the pointer 1:1 (snappy spring)
  const dotX = useSpring(x, { damping: 28, stiffness: 700, mass: 0.4 });
  const dotY = useSpring(y, { damping: 28, stiffness: 700, mass: 0.4 });

  // ring lags behind for that elastic feel
  const ringX = useSpring(x, { damping: 18, stiffness: 180, mass: 0.6 });
  const ringY = useSpring(y, { damping: 18, stiffness: 180, mass: 0.6 });

  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [supportsFinePointer, setSupportsFinePointer] = useState(false);

  useEffect(() => {
    const fineQuery = window.matchMedia("(pointer: fine)");
    setSupportsFinePointer(fineQuery.matches);
    const onFineChange = (e: MediaQueryListEvent) => setSupportsFinePointer(e.matches);
    fineQuery.addEventListener("change", onFineChange);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      // any clickable thing counts
      const interactive = t.closest(
        'a, button, [role="button"], input, textarea, select, label, .btn, [data-cursor="hover"]',
      );
      setHover(!!interactive);
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      fineQuery.removeEventListener("change", onFineChange);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [x, y, visible]);

  // bail out on touch devices entirely
  if (!supportsFinePointer) return null;

  return (
    <>
      {/* outer blur ring */}
      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY }}
        animate={{
          width: hover ? 72 : 36,
          height: hover ? 72 : 36,
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.85 : 1,
        }}
        transition={{ width: { duration: 0.25 }, height: { duration: 0.25 }, opacity: { duration: 0.2 } }}
        className="custom-cursor-ring"
      />
      {/* center dot */}
      <motion.div
        aria-hidden
        style={{ x: dotX, y: dotY }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hover ? 0.4 : 1,
        }}
        transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.2 } }}
        className="custom-cursor-dot"
      />
    </>
  );
}
