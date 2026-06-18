import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { blogs } from "@/data/blogs";
import { site } from "@/data/site";

export const metadata = {
  title: "Writing | Anurag Patwardhan",
  description: "Articles and notes by Anurag Patwardhan on engineering, design, and the in-between.",
};

export default function BlogsIndex() {
  return (
    <main className="bg-[#050000] text-white">
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-20 [background:radial-gradient(60%_60%_at_50%_0%,#f4e87a_0%,transparent_60%)]" />
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
            <p className="mt-8 text-sm tracking-[0.18em] uppercase text-white/50">Writing</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="display mt-4 text-[clamp(2.5rem,8vw,6rem)] text-[#ede1e1] leading-[0.95]">
              Notes & Articles
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-3xl text-white/75 text-lg md:text-xl leading-relaxed">
              The longer-form stuff. Engineering notes, product write-ups, the occasional Boston field journal.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={site.links.medium} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <span>Medium profile</span>
                <Arrow />
              </a>
              <a
                href={site.links.linkedinArticles}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-glass"
              >
                <span>LinkedIn articles</span>
                <Arrow />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-6">
            {blogs.map((b, i) => {
              const card = (
                <article className="group rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-8 h-full transition-colors hover:bg-white/[0.06] hover:border-white/20">
                  <div className="flex items-center gap-3 text-xs tracking-[0.16em] uppercase text-white/45">
                    <span>{b.date}</span>
                    <span aria-hidden>·</span>
                    <span>{b.readTime}</span>
                    {b.external && (
                      <>
                        <span aria-hidden>·</span>
                        <span className="text-[#f4e87a]">External</span>
                      </>
                    )}
                  </div>
                  <h3 className="mt-4 text-xl md:text-2xl font-semibold tracking-tight text-white group-hover:text-[#ede1e1]">
                    {b.title}
                  </h3>
                  <p className="mt-3 text-white/75 leading-relaxed">{b.excerpt}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {b.tags.map((t) => (
                      <span
                        key={t}
                        className="text-sm px-4 py-1.5 rounded-full bg-black border border-white/10 text-white/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm text-[#f4e87a] group-hover:gap-3 transition-all">
                    {b.external ? "Read on the original" : "Read the full post"}
                    <Arrow />
                  </div>
                </article>
              );
              return (
                <Reveal key={b.slug} delay={(i % 2) * 0.06} y={40}>
                  {b.external ? (
                    <a href={b.external} target="_blank" rel="noopener noreferrer" className="block h-full">
                      {card}
                    </a>
                  ) : (
                    <Link href={`/blogs/${b.slug}`} className="block h-full">
                      {card}
                    </Link>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </main>
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
