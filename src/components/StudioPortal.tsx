"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./StudioPortal.module.css";

/**
 * A doorway from the engineering portfolio to the studio at /studio/.
 *
 * Purely additive: everything it renders is a fixed overlay, so it never wraps,
 * selects or restyles existing markup. Deleting the element from page.tsx
 * removes the feature entirely.
 *
 * Ways through, in order of discoverability:
 *   1. Drag or swipe the right-edge seam leftward past the threshold.
 *   2. Click or press Enter on the seam.
 *   3. Press "d" anywhere on the page.
 *
 * /studio/ is a plain static page under public/, not a Next route, so every
 * path uses a real navigation rather than the client router.
 */

const DESTINATION = "/studio/";

/** Fraction of viewport width the seam must travel before it commits. */
const COMMIT_RATIO = 0.28;
/** Below this the drag is treated as a click instead. */
const DRAG_SLOP_PX = 6;

export default function StudioPortal() {
  const [dragging, setDragging] = useState(false);
  const revealRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const navigatingRef = useRef(false);

  const reducedMotion = useRef(false);
  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const go = useCallback(() => {
    if (navigatingRef.current) return;
    navigatingRef.current = true;

    const wipe = wipeRef.current;

    // Reduced motion, or no Web Animations support: navigate immediately.
    if (!wipe || reducedMotion.current || typeof wipe.animate !== "function") {
      window.location.href = DESTINATION;
      return;
    }

    // Iris wipe out of the right edge, where the seam lives.
    const animation = wipe.animate(
      [{ clipPath: "circle(0% at 100% 50%)" }, { clipPath: "circle(150% at 100% 50%)" }],
      { duration: 620, easing: "cubic-bezier(0.76, 0, 0.24, 1)", fill: "forwards" }
    );
    animation.onfinish = () => {
      window.location.href = DESTINATION;
    };
    // Never strand the visitor if the animation is interrupted.
    window.setTimeout(() => {
      if (navigatingRef.current) window.location.href = DESTINATION;
    }, 900);
  }, []);

  /* Hidden power-user path. Ignored while typing in a field. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "d" && e.key !== "D") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) return;
      go();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  /* Drag / swipe. Pointer events cover mouse, touch and pen in one path. */
  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (navigatingRef.current) return;

    const startX = e.clientX;
    const threshold = window.innerWidth * COMMIT_RATIO;
    const seam = e.currentTarget;
    let travelled = 0;
    let active = false;

    seam.setPointerCapture(e.pointerId);

    const onMove = (ev: PointerEvent) => {
      travelled = Math.max(0, startX - ev.clientX);

      if (!active && travelled > DRAG_SLOP_PX) {
        active = true;
        setDragging(true);
      }
      if (!active) return;

      // Live feedback: the studio field widens under the finger, easing past
      // the threshold so the commit point is felt rather than guessed.
      const reveal = revealRef.current;
      if (reveal) {
        const eased = Math.min(travelled / threshold, 1.15);
        reveal.style.width = `${travelled}px`;
        reveal.style.opacity = String(Math.min(0.35 + eased * 0.65, 1));
      }
    };

    const finish = () => {
      seam.releasePointerCapture?.(e.pointerId);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", finish);
      window.removeEventListener("pointercancel", finish);

      const reveal = revealRef.current;

      if (travelled >= threshold) {
        go();
        return;
      }

      // Short of the threshold: spring the seam shut again.
      setDragging(false);
      if (reveal) {
        if (reducedMotion.current || typeof reveal.animate !== "function") {
          reveal.style.width = "0px";
        } else {
          reveal.animate(
            [{ width: `${travelled}px` }, { width: "0px" }],
            { duration: 420, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
          ).onfinish = () => {
            reveal.style.width = "0px";
          };
        }
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", finish);
    window.addEventListener("pointercancel", finish);
  };

  return (
    <>
      <div ref={revealRef} className={styles.reveal} aria-hidden="true">
        <div className={styles.revealInner}>
          <span className={styles.revealWord}>Studio</span>
        </div>
      </div>

      <button
        type="button"
        className={`${styles.seam} ${dragging ? styles.dragging : ""}`}
        onPointerDown={onPointerDown}
        onClick={go}
        aria-label="Enter the design studio"
        title="Drag left, or click, to enter the design studio"
      >
        <span className={styles.line} aria-hidden="true" />
        <span className={styles.orb} aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </span>
        <span className={styles.label} aria-hidden="true">
          Studio
        </span>
      </button>

      <div ref={wipeRef} className={styles.wipe} aria-hidden="true" />
    </>
  );
}
