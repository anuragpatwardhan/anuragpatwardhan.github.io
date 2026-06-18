import Image from "next/image";
import Link from "next/link";
import { highlights } from "@/data/site";
import Reveal from "./motion/Reveal";
import HoverCard from "./motion/HoverCard";

export default function Highlights() {
  return (
    <section className="bg-black py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal>
          <h2 className="display text-center text-white text-[clamp(2rem,5vw,4rem)]">Highlights</h2>
        </Reveal>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {highlights.map((h, i) => {
            const inner = (
              <HoverCard className="group card-white p-7 flex flex-col h-full transition-shadow hover:shadow-[0_20px_60px_-10px_rgba(244,232,122,0.25)]">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
                  {h.name}
                  {h.slug && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-zinc-500"
                    >
                      <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </h3>
                <p className="mt-2 text-zinc-600">{h.subtitle}</p>
                <div className="mt-6 aspect-[4/3] relative overflow-hidden rounded-2xl bg-zinc-100">
                  <Image
                    src={h.image}
                    alt={h.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover grayscale group-hover:grayscale-0 transition-[filter,transform] duration-500 group-hover:scale-105"
                  />
                  {!h.slug && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] tracking-[0.18em] uppercase font-semibold rounded-full bg-black/55 backdrop-blur text-white">
                      Coming Soon
                    </span>
                  )}
                </div>
              </HoverCard>
            );
            return (
              <Reveal key={h.name} delay={i * 0.1}>
                {h.slug ? (
                  <Link href={`/projects/${h.slug}`} aria-label={`View ${h.name} case study`} className="block h-full">
                    {inner}
                  </Link>
                ) : (
                  <div aria-disabled className="cursor-not-allowed h-full">{inner}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
