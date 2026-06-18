"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { nav } from "@/data/site";
import Logo from "./Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className={`nav-halo ${scrolled ? "is-visible" : ""}`} aria-hidden="true" />
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(1180px,calc(100%-2rem))]">
        <motion.div
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          style={
            scrolled
              ? {
                  backdropFilter: "blur(24px) saturate(160%)",
                  WebkitBackdropFilter: "blur(24px) saturate(160%)",
                }
              : undefined
          }
          className={`nav-card ${scrolled ? "is-scrolled" : ""} flex items-center justify-between gap-6 px-5 py-3 md:px-7 md:py-4`}
        >
          <Link href="/" aria-label="Home" className="shrink-0 transition-transform hover:scale-110">
            <Logo className="h-8 w-8 md:h-9 md:w-9" />
          </Link>
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-[13px] font-semibold tracking-[0.08em] uppercase">
            {nav.slice(0, 5).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative hover:opacity-60 transition-opacity after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-current after:transition-all hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="relative hover:opacity-60 transition-opacity after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-current after:transition-all hover:after:w-full"
            >
              Contact
            </Link>
          </nav>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <span>Resume</span>
          </a>
        </motion.div>
      </header>
    </>
  );
}
