import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectDetails, getProjectBySlug } from "@/data/projectDetails";
import Reveal from "@/components/motion/Reveal";
import type { Metadata } from "next";

export function generateStaticParams() {
  return projectDetails.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProjectBySlug(slug);
  if (!p) return { title: "Project | Anurag Patwardhan" };
  return {
    title: `${p.name} | Anurag Patwardhan`,
    description: p.tagline,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const idx = projectDetails.findIndex((p) => p.slug === slug);
  const next = projectDetails[(idx + 1) % projectDetails.length];

  return (
    <main className="bg-[#050000] text-white">
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-20 [background:radial-gradient(60%_60%_at_50%_0%,#f4e87a_0%,transparent_60%)]" />
        <div className="relative max-w-6xl mx-auto px-6 md:px-10">
          <Reveal>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm tracking-[0.12em] uppercase text-white/60 hover:text-white transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M11 7H3M3 7L7 3M3 7L7 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              All projects
            </Link>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mt-8 text-xs md:text-sm tracking-[0.18em] uppercase text-white/50">{project.category}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="display mt-4 text-[clamp(3rem,9vw,8rem)] text-[#ede1e1] leading-[0.95]">
              {project.name}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-3xl text-white/75 text-lg md:text-xl leading-relaxed">
              {project.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-light">
                <GithubIcon />
                <span>View on GitHub</span>
              </a>
              {project.liveDemo && (
                <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <span>Live demo</span>
                  <ArrowOut />
                </a>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-12 md:mt-16 aspect-[16/9] relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_100px_-30px_rgba(0,0,0,0.6)]">
              <Image
                src={project.image}
                alt={project.name}
                fill
                priority
                sizes="(min-width: 768px) 1100px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* The problem */}
      <Section eyebrow="The Problem">
        <p className="text-white/70 leading-relaxed">{project.problem.intro}</p>
        <ul className="mt-6 grid md:grid-cols-2 gap-3">
          {project.problem.bullets.map((b) => (
            <li
              key={b}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white/85"
            >
              {b}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[#f4e87a]/90 leading-relaxed font-medium">{project.problem.closing}</p>
      </Section>

      {/* What it is / is not */}
      <Section eyebrow="Framing">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-white/[0.04] border border-white/10 p-7">
            <h3 className="text-lg font-semibold text-[#d8ff3a] tracking-wide">It is</h3>
            <ul className="mt-4 space-y-2 text-white/85">
              {project.framing.isLines.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="text-[#d8ff3a]">✓</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-white/[0.04] border border-white/10 p-7">
            <h3 className="text-lg font-semibold text-[#ff7676] tracking-wide">It is not</h3>
            <ul className="mt-4 space-y-2 text-white/85">
              {project.framing.isNotLines.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="text-[#ff7676]">✕</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <blockquote className="mt-8 border-l-2 border-[#f4e87a] pl-5 text-white/80 italic">
          &ldquo;{project.framing.interviewLine}&rdquo;
        </blockquote>
      </Section>

      {/* Use cases */}
      <Section eyebrow="Core Use Cases">
        <ul className="grid md:grid-cols-2 gap-3">
          {project.useCases.map((u, i) => (
            <li
              key={u}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white/85 flex gap-3"
            >
              <span className="text-[#f4e87a] font-bold tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{u}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Features */}
      <Section eyebrow="What I Built">
        <div className="space-y-6">
          {project.features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-9">
                <div className="flex items-baseline gap-4">
                  <span className="display text-3xl md:text-4xl text-[#f4e87a]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight">{f.title}</h3>
                </div>
                <ul className="mt-4 space-y-2 text-white/80">
                  {f.what.map((w) => (
                    <li key={w} className="flex gap-2">
                      <span className="text-white/40">·</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {f.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1.5 rounded-full bg-black border border-white/10 text-white/85 tracking-wide"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {f.note && (
                  <p className="mt-5 text-[#d8ff3a]/90 italic text-sm md:text-base">
                    {f.note}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Tech stack */}
      <Section eyebrow="Tech Stack">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {project.techStack.map((g) => (
            <div
              key={g.group}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <h3 className="text-xs tracking-[0.18em] uppercase text-white/50">{g.group}</h3>
              <ul className="mt-4 space-y-1.5">
                {g.items.map((i) => (
                  <li key={i} className="text-white/85 text-sm">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Architecture */}
      <Section eyebrow="Architecture">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-9">
          <p className="text-xs tracking-[0.18em] uppercase text-white/50">Flow</p>
          <p className="mt-3 font-mono text-[#d8ff3a] text-sm md:text-base break-words">
            {project.architecture.flow}
          </p>
          <ol className="mt-8 space-y-2.5">
            {project.architecture.components.map((c, i) => (
              <li key={c} className="flex gap-3 text-white/85">
                <span className="text-[#f4e87a] font-bold tabular-nums shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{c}</span>
              </li>
            ))}
          </ol>
          <p className="mt-7 text-white/70 leading-relaxed italic">
            {project.architecture.explanation}
          </p>
        </div>
      </Section>

      {/* Data model */}
      <Section eyebrow="Data Model">
        <pre className="rounded-3xl border border-white/10 bg-black p-6 md:p-8 overflow-x-auto text-sm leading-relaxed text-white/85 font-mono">
          {project.dataModel.join("\n")}
        </pre>
      </Section>

      {/* Challenges */}
      <Section eyebrow="Challenges & Solutions">
        <div className="space-y-5">
          {project.challenges.map((c, i) => (
            <Reveal key={c.problem} delay={i * 0.05}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-9">
                <p className="text-xs tracking-[0.18em] uppercase text-[#ff7676]">Problem</p>
                <p className="mt-2 text-white text-lg leading-snug">{c.problem}</p>
                <p className="mt-6 text-xs tracking-[0.18em] uppercase text-[#d8ff3a]">Solution</p>
                <ul className="mt-2 space-y-1.5 text-white/85">
                  {c.solution.map((s) => (
                    <li key={s} className="flex gap-2">
                      <span className="text-white/40">·</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Closing pitch */}
      <Section eyebrow="In One Paragraph">
        <p className="text-white/80 text-lg md:text-xl leading-relaxed">{project.pitch}</p>
      </Section>

      {/* Next project */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[#050000] to-black border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.18em] uppercase text-white/50">Next project</p>
            <h3 className="display mt-3 text-4xl md:text-6xl text-[#ede1e1]">{next.name}</h3>
            <p className="mt-2 text-white/70 max-w-md">{next.tagline}</p>
          </div>
          <Link href={`/projects/${next.slug}`} className="btn btn-primary">
            <span>View case study</span>
            <ArrowOut />
          </Link>
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
          <p className="text-xs tracking-[0.22em] uppercase text-white/50">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-6">{children}</div>
        </Reveal>
      </div>
    </section>
  );
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.7.5.6 5.6.6 12c0 5 3.3 9.3 7.8 10.8.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.6 3.3-1.2 3.3-1.2.7 1.6.2 2.9.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6 4.5-1.5 7.8-5.8 7.8-10.8C23.4 5.6 18.3.5 12 .5z" />
    </svg>
  );
}

function ArrowOut() {
  return (
    <svg className="btn-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
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
