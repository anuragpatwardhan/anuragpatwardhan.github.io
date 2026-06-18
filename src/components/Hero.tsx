"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import BackgroundFX from "./BackgroundFX";
import { images } from "@/data/site";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const yOverlay = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate min-h-screen pt-28 pb-16 overflow-hidden bg-[#050000]"
    >
      <BackgroundFX />

      <motion.div
        style={{ y: yOverlay }}
        className="absolute inset-y-0 right-0 w-[60%] opacity-50 pointer-events-none"
        aria-hidden="true"
      >
        <Image
          src={images.heroOverlay}
          alt=""
          fill
          sizes="60vw"
          className="object-contain object-right"
          priority
        />
      </motion.div>

      <motion.div style={{ y: yText, opacity }} className="relative max-w-7xl mx-auto px-6 md:px-10">
        <motion.h1
          initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="display text-[clamp(5rem,22vw,16rem)] text-[#ede1e1]"
        >
          ANURAG
          <br />
          .DEV
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/contact" className="btn btn-primary btn-breathing text-base md:text-[15px] px-7 py-4">
              <span>Contact Me</span>
              <ArrowOut className="btn-arrow" />
            </Link>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-glass">
              <span>View Resume</span>
            </a>
          </div>
          <div className="text-right">
            <p className="display text-xl md:text-2xl tracking-wide text-white/90">
              FULL-STACK SOFTWARE DEV
              <br />
              &amp; PRODUCT DESIGNER
            </p>
            <motion.svg
              viewBox="0 0 64 64"
              className="w-16 h-16 mt-3 ml-auto text-white/70"
              aria-hidden="true"
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            >
              <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M32 4v56M4 32h56M12 12l40 40M52 12L12 52" stroke="currentColor" strokeWidth="1" />
              <path d="M32 22l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="currentColor" />
            </motion.svg>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ArrowOut({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className={className}>
      <path
        d="M3 11L11 3M11 3H5M11 3V9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
