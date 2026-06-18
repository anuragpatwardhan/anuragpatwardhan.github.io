import Link from "next/link";
import { skills } from "@/data/site";
import Reveal from "./motion/Reveal";

export default function Skills() {
  return (
    <section className="bg-gradient-to-b from-[#f5f1eb] via-[#f5f1eb] to-[#f5f1eb] py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <Reveal>
          <h2 className="display text-center text-black text-[clamp(2rem,4.8vw,3.5rem)]">Skills</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap justify-center gap-3 md:gap-4">
            {skills.map((s) => (
              <span
                key={s}
                className="skill-pill transition-transform hover:scale-105 hover:bg-zinc-800"
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-12 flex justify-center">
            <Link href="/skills" className="btn btn-primary">
              <span>See the full skill set</span>
              <svg className="btn-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M3 11L11 3M11 3H5M11 3V9"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
