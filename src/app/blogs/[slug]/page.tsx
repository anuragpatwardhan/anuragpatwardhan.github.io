import Link from "next/link";
import { notFound } from "next/navigation";
import { blogs } from "@/data/blogs";
import Reveal from "@/components/motion/Reveal";
import type { Metadata } from "next";

export function generateStaticParams() {
  return blogs.filter((b) => !b.external).map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const b = blogs.find((x) => x.slug === slug);
  if (!b) return { title: "Post | Anurag Patwardhan" };
  return { title: `${b.title} | Anurag Patwardhan`, description: b.excerpt };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogs.find((b) => b.slug === slug);
  if (!post || post.external) notFound();

  const idx = blogs.findIndex((b) => b.slug === slug);
  const next = blogs.filter((b) => !b.external && b.slug !== slug)[0];

  return (
    <main className="bg-[#050000] text-white">
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-20 [background:radial-gradient(60%_60%_at_50%_0%,#f4e87a_0%,transparent_60%)]" />
        <div className="relative max-w-3xl mx-auto px-6 md:px-10">
          <Reveal>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm tracking-[0.12em] uppercase text-white/60 hover:text-white transition-colors"
            >
              <BackArrow />
              All writing
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-8 flex items-center gap-3 text-sm tracking-[0.16em] uppercase text-white/50">
              <span>{post.date}</span>
              <span aria-hidden>·</span>
              <span>{post.readTime}</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 text-3xl md:text-5xl font-semibold leading-tight text-[#ede1e1]">{post.title}</h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-5 text-white/75 text-lg leading-relaxed">{post.excerpt}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span key={t} className="text-sm px-4 py-1.5 rounded-full bg-black border border-white/10 text-white/80">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <article className="pb-20 md:pb-28">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <Reveal>
            <div className="prose-content space-y-5 text-white/85 leading-relaxed text-base md:text-lg">
              {(post.body || "").trim().split(/\n\n+/).map((para, i) => (
                <p key={i}>{para.trim()}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </article>

      {next && (
        <section className="py-16 md:py-24 border-t border-white/10">
          <div className="max-w-3xl mx-auto px-6 md:px-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-xs tracking-[0.18em] uppercase text-white/50">Read next</p>
              <h3 className="mt-3 text-2xl md:text-3xl font-semibold text-[#ede1e1]">{next.title}</h3>
              <p className="mt-2 text-white/70">{next.excerpt}</p>
            </div>
            <Link href={`/blogs/${next.slug}`} className="btn btn-primary">
              <span>Open</span>
              <Arrow />
            </Link>
          </div>
        </section>
      )}
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
