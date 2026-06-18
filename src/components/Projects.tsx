import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/site";
import Reveal from "./motion/Reveal";
import HoverCard from "./motion/HoverCard";

export default function Projects() {
  return (
    <section className="bg-[linear-gradient(to_bottom,#050000_0%,#050000_75%,#f5f1eb_100%)] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal>
          <h2 className="display text-center text-white text-[clamp(2rem,5vw,4rem)]">My Projects</h2>
        </Reveal>
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => {
            const inner = (
              <HoverCard className="group rounded-3xl overflow-hidden transition-shadow hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] h-full">
                <div className="aspect-[4/3] relative bg-zinc-900 overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover grayscale group-hover:grayscale-0 transition-[filter,transform] duration-700 group-hover:scale-105"
                  />
                  {!p.slug && (
                    <span className="absolute top-4 right-4 px-3 py-1 text-[10px] tracking-[0.18em] uppercase font-semibold rounded-full bg-white/15 backdrop-blur text-white">
                      Coming Soon
                    </span>
                  )}
                </div>
                <div className="bg-zinc-900/40 backdrop-blur-sm p-5">
                  <h3 className="text-white text-2xl font-semibold flex items-center gap-2">
                    {p.name}
                    {p.slug && (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
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
                  <p className="mt-1 text-xs tracking-[0.15em] text-white/70 uppercase">{p.tags}</p>
                </div>
              </HoverCard>
            );

            return (
              <Reveal key={p.name} delay={(i % 2) * 0.1} y={60}>
                {p.slug ? (
                  <Link href={`/projects/${p.slug}`} aria-label={`View ${p.name} case study`} className="block h-full">
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
        <Reveal delay={0.1}>
          <div className="mt-14 flex justify-center">
            <Link href="/projects" className="btn btn-primary">
              <span>See all projects</span>
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
