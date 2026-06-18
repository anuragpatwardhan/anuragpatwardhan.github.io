import Link from "next/link";
import Reveal from "./motion/Reveal";

export default function GotAnIdea() {
  return (
    <section className="glow-yellow py-32 md:py-48">
      <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
        <Reveal>
          <h2 className="display text-black text-[clamp(2.5rem,5.5vw,4.5rem)]">
            Got an idea?
            <br />
            Let&apos;s bring it to life
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <Link href="/contact" className="btn btn-light mt-12 px-7 py-3.5">
            <span>Get in touch</span>
            <svg className="btn-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
