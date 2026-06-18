import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import HoverCard from "@/components/motion/HoverCard";
import { projectDetails } from "@/data/projectDetails";

export const metadata = {
  title: "Projects | Anurag Patwardhan",
  description: "Every project Anurag Patwardhan has built or is currently working on.",
};

const F = "/images/framer";

type ProjectCard = {
  name: string;
  category: string;
  blurb: string;
  image: string;
  slug: string | null;
};

const upcoming: ProjectCard[] = [
  {
    name: "Husky AI",
    category: "UI DESIGN, DEVELOPMENT",
    blurb:
      "A full-stack support platform with an Angular 17 frontend and a Node.js / Express backend that handles student, faculty and admin workflows.",
    image: `${F}/J5hUuVSmRNsB2heOQvu8E8BBIE.webp`,
    slug: null,
  },
  {
    name: "Syncspace",
    category: "REALTIME, COLLABORATION",
    blurb:
      "A real-time collaboration app built on native WebSockets, tested with 20+ simultaneous clients across multiple rooms.",
    image: `${F}/Gnud6kEeH5LqtjY2UTnA7dw.jpg`,
    slug: null,
  },
];

const cards: ProjectCard[] = [
  ...projectDetails.map((p) => ({
    name: p.name,
    category: p.category,
    blurb: p.tagline,
    image: p.image,
    slug: p.slug,
  })),
  ...upcoming,
];

export default function ProjectsIndex() {
  return (
    <main className="bg-[#050000] text-white">
      {/* Hero */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
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
            <p className="mt-8 text-sm tracking-[0.18em] uppercase text-white/50">All Work</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="display mt-4 text-[clamp(2.5rem,8vw,6rem)] text-[#ede1e1] leading-[0.95]">
              Every Project, In One Place
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-3xl text-white/80 text-lg md:text-xl leading-relaxed">
              The case studies I have published, plus the ones I am currently building. Click any card with a deep
              link to read the full story. The rest are coming soon.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary">
                <span>Hire me</span>
                <Arrow />
              </Link>
              <Link href="/skills" className="btn btn-glass">
                <span>See my skills</span>
                <Arrow />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-6">
            {cards.map((c, i) => {
              const inner = (
                <HoverCard className="group rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] h-full transition-shadow hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
                  <div className="aspect-[16/10] relative bg-zinc-900 overflow-hidden">
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover grayscale group-hover:grayscale-0 transition-[filter,transform] duration-700 group-hover:scale-105"
                    />
                    {!c.slug && (
                      <span className="absolute top-4 right-4 px-3 py-1 text-[10px] tracking-[0.18em] uppercase font-semibold rounded-full bg-white/15 backdrop-blur text-white">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <div className="p-6 md:p-7">
                    <p className="text-xs tracking-[0.18em] uppercase text-white/55">{c.category}</p>
                    <h3 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight text-white flex items-center gap-2">
                      {c.name}
                      {c.slug && (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 14 14"
                          fill="none"
                          className="text-white/60 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#f4e87a]"
                        >
                          <path
                            d="M3 11L11 3M11 3H5M11 3V9"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </h3>
                    <p className="mt-3 text-white/75 leading-relaxed line-clamp-3">{c.blurb}</p>
                  </div>
                </HoverCard>
              );

              return (
                <Reveal key={c.name} delay={(i % 2) * 0.08} y={50}>
                  {c.slug ? (
                    <Link
                      href={`/projects/${c.slug}`}
                      aria-label={`View ${c.name} case study`}
                      className="block h-full"
                    >
                      {inner}
                    </Link>
                  ) : (
                    <div aria-disabled className="cursor-not-allowed h-full">
                      {inner}
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-16 md:py-24 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <Reveal>
            <h2 className="display text-3xl md:text-5xl text-[#ede1e1]">Got a project of your own?</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-white/70 text-lg">
              Happy to chat about ideas, collaborations, or the kind of work I have not built yet.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn btn-primary">
                <span>Get in touch</span>
                <Arrow />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
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

function BackArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M11 7H3M3 7L7 3M3 7L7 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
