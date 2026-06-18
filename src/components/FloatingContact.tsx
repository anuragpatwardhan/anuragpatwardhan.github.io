"use client";
import Link from "next/link";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

export default function FloatingContact() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setShow(y > 700);
  });

  return (
    <Link
      href="/contact"
      aria-label="Contact me"
      className={`float-cta ${show ? "is-visible" : ""}`}
    >
      <span className="btn btn-primary btn-breathing">
        <span>Get in touch</span>
        <Arrow />
      </span>
    </Link>
  );
}

function Arrow() {
  return (
    <svg className="btn-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M3 11L11 3M11 3H5M11 3V9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
