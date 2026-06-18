import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import {
  profile,
  education,
  technicalSkills,
  designSkills,
  softSkills,
  fullExperience,
  campusInvolvement,
  certifications,
  languages,
  focusAreas,
} from "@/data/skillsData";

export const metadata = {
  title: "Skills & Background | Anurag Patwardhan",
  description:
    "Full breakdown of Anurag Patwardhan's technical stack, soft skills, education, experience and campus involvement.",
};

export default function SkillsPage() {
  return (
    <main className="bg-[#050000] text-white">
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-25 [background:radial-gradient(60%_60%_at_50%_0%,#f4e87a_0%,transparent_60%)]" />
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
            <p className="mt-8 text-xs md:text-sm tracking-[0.18em] uppercase text-white/50">
              Skills · Experience · Background
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="display mt-4 text-[clamp(3rem,9vw,8rem)] text-[#ede1e1] leading-[0.95]">
              The Full Picture
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-3xl text-white/75 text-lg md:text-xl leading-relaxed">
              {profile.headline} with {profile.yearsExperience} years of production experience.
              Currently in Boston pursuing an M.S. at Northeastern. {profile.blurb}
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-4 max-w-3xl text-white/55 text-sm leading-relaxed">
              The skills below come from shipped work, school, and the projects I keep building on the side. If you want context on any of it, the contact form is the fastest way to reach me.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <span>Download Resume</span>
                <Arrow />
              </a>
              <Link href="/contact" className="btn btn-glass">
                <span>Get in touch</span>
                <Arrow />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Focus areas */}
      <Section eyebrow="Focus Areas">
        <div className="grid md:grid-cols-2 gap-5">
          {focusAreas.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 h-full">
                <span className="display text-3xl md:text-4xl text-[#f4e87a]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-xl md:text-2xl font-semibold">{f.title}</h3>
                <p className="mt-3 text-white/75 leading-relaxed">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Technical skills */}
      <Section eyebrow="Technical Stack">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {technicalSkills.map((g, i) => (
            <Reveal key={g.group} delay={(i % 3) * 0.05}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 h-full">
                <h3 className="text-sm tracking-[0.16em] uppercase text-white/55">{g.group}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <span
                      key={it}
                      className="text-sm px-4 py-2 rounded-full bg-black border border-white/10 text-white/85"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Design & UX */}
      <Section eyebrow="Design & UX">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {designSkills.map((g, i) => (
            <Reveal key={g.group} delay={(i % 3) * 0.05}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 h-full">
                <h3 className="text-sm tracking-[0.16em] uppercase text-[#f4e87a]">{g.group}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <span
                      key={it}
                      className="text-sm px-4 py-2 rounded-full bg-black border border-white/10 text-white/85"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Soft skills */}
      <Section eyebrow="People & Communication">
        <div className="grid md:grid-cols-2 gap-5">
          {softSkills.map((g, i) => (
            <Reveal key={g.group} delay={i * 0.05}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 h-full">
                <h3 className="text-sm tracking-[0.16em] uppercase text-[#d8ff3a]">{g.group}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <span
                      key={it}
                      className="text-sm px-4 py-2 rounded-full bg-black border border-white/10 text-white/85"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section eyebrow="Experience">
        <div className="relative pl-6 md:pl-10 border-l border-white/15 space-y-10">
          {fullExperience.map((x, i) => (
            <Reveal key={x.role + x.company} delay={i * 0.05}>
              <article className="relative">
                <span className="absolute -left-[33px] md:-left-[49px] top-2 w-3 h-3 rounded-full bg-[#f4e87a] ring-4 ring-[#050000]" />
                <p className="text-sm tracking-[0.16em] uppercase text-white/55">{x.dates}</p>
                <h3 className="mt-1 text-xl md:text-2xl font-semibold text-white">{x.role}</h3>
                <p className="text-[#d8ff3a]">{x.company}</p>
                {x.stack && (
                  <p className="mt-2 text-sm text-white/60 font-mono break-words">{x.stack}</p>
                )}
                <ul className="mt-4 space-y-2 text-white/85 text-[15px] leading-relaxed">
                  {x.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="text-white/35 select-none">·</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Education */}
      <Section eyebrow="Education">
        <div className="grid md:grid-cols-2 gap-5">
          {education.map((e, i) => (
            <Reveal key={e.school} delay={i * 0.05}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 h-full">
                <p className="text-sm tracking-[0.16em] uppercase text-white/55">{e.dates}</p>
                <h3 className="mt-2 text-xl md:text-2xl font-semibold">{e.school}</h3>
                <p className="mt-1 text-[#d8ff3a]">{e.degree}</p>
                <p className="mt-3 text-white/75">GPA: {e.gpa}</p>
                <div className="mt-5">
                  <p className="text-sm tracking-[0.16em] uppercase text-white/55">Coursework</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {e.coursework.map((c) => (
                      <span
                        key={c}
                        className="text-sm px-4 py-2 rounded-full bg-black border border-white/10 text-white/85"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Campus involvement */}
      <Section eyebrow="Campus Involvement & Volunteering">
        <div className="grid md:grid-cols-3 gap-5">
          {campusInvolvement.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 h-full">
                <p className="text-sm tracking-[0.16em] uppercase text-[#f4e87a]">{c.role}</p>
                <h3 className="mt-2 text-lg md:text-xl font-semibold">{c.title}</h3>
                <p className="mt-3 text-white/75 text-sm leading-relaxed">{c.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Languages & Certifications */}
      <Section eyebrow="Languages & Coursework">
        <div className="grid md:grid-cols-2 gap-5">
          <Reveal>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 h-full">
              <h3 className="text-sm tracking-[0.16em] uppercase text-white/55">Languages</h3>
              <ul className="mt-5 space-y-3">
                {languages.map((l) => (
                  <li key={l.name} className="flex justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0">
                    <span className="text-white">{l.name}</span>
                    <span className="text-white/60 text-sm">{l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 h-full">
              <h3 className="text-sm tracking-[0.16em] uppercase text-white/55">Recent Coursework</h3>
              <ul className="mt-5 space-y-3">
                {certifications.map((c) => (
                  <li key={c} className="flex gap-3 text-white/85">
                    <span className="text-[#d8ff3a] shrink-0">●</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* CTA */}
      <section className="py-20 md:py-28 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <Reveal>
            <h2 className="display text-3xl md:text-5xl text-[#ede1e1]">
              Want the rest of the story?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-white/70">
              Drop me a note. Happy to dive deeper on any of the projects, roles, or tools above.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn btn-primary">
                <span>Let&apos;s connect</span>
                <Arrow />
              </Link>
              <Link href="/projects/opscanvas" className="btn btn-glass">
                <span>See the projects</span>
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
