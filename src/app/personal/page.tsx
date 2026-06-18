import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { personalIntro, interests, communitySnapshot } from "@/data/personal";

export const metadata = {
  title: "Off the clock | Anurag Patwardhan",
  description: "The non-technical side of Anurag Patwardhan: hobbies, interests, and community.",
};

export default function PersonalPage() {
  return (
    <main className="bg-[#050000] text-white">
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-25 [background:radial-gradient(60%_60%_at_50%_0%,#d8ff3a_0%,transparent_60%)]" />
        <div className="relative max-w-6xl mx-auto px-6 md:px-10">
          <Reveal>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm tracking-[0.12em] uppercase text-white/60 hover:text-white transition-colors"
            >
              <BackArrow />
              Home
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-8 text-xs md:text-sm tracking-[0.18em] uppercase text-white/50">{personalIntro.title}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="display mt-4 text-[clamp(2.5rem,8vw,6rem)] text-[#ede1e1] leading-[0.95]">
              The Off-Screen Me
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-3xl text-white/75 text-lg md:text-xl leading-relaxed">{personalIntro.tagline}</p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-4 max-w-3xl text-white/55 text-sm md:text-base leading-relaxed">{personalIntro.pitch}</p>
          </Reveal>
        </div>
      </section>

      <Section eyebrow="What Keeps Me Going">
        <div className="grid md:grid-cols-2 gap-6">
          {interests.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.06} y={40}>
              <article className="group rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-9 h-full transition-colors hover:bg-white/[0.06]">
                <p className="text-sm tracking-[0.16em] uppercase" style={{ color: it.accent }}>
                  {it.tagline}
                </p>
                <h3 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">{it.title}</h3>
                <p className="mt-4 text-white/80 leading-relaxed">{it.body}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {it.tags.map((t) => (
                    <span
                      key={t}
                      className="text-sm px-4 py-2 rounded-full bg-black border border-white/10 text-white/85"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow="Around Campus">
        <Reveal>
          <ul className="grid md:grid-cols-3 gap-4">
            {communitySnapshot.map((c) => (
              <li
                key={c}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-white/85 text-sm md:text-base"
              >
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <section className="py-20 md:py-28 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <Reveal>
            <h2 className="display text-3xl md:text-5xl text-[#ede1e1]">Want the engineering side?</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-white/70">
              Head back to the work, projects, and skills, or drop me a note if you just want to say hi.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/skills" className="btn btn-primary">
                <span>See my skills</span>
                <Arrow />
              </Link>
              <Link href="/contact" className="btn btn-glass">
                <span>Say hi</span>
                <Arrow />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function Section({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <Reveal>
          <p className="text-sm tracking-[0.2em] uppercase text-white/60">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-6">{children}</div>
        </Reveal>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg className="btn-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BackArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M11 7H3M3 7L7 3M3 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
