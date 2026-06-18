import Image from "next/image";
import Link from "next/link";
import { images, techIcons, site } from "@/data/site";
import Reveal from "./motion/Reveal";

export default function About() {
  return (
    <section className="bg-black py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal>
          <h2 className="display text-center text-white text-[clamp(2rem,5vw,4rem)]">About Me</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-center text-white/80 max-w-3xl mx-auto leading-relaxed text-lg md:text-xl">
            I love building end-to-end products, from data and AI-powered features to polished UX. I focus on
            performance, maintainability, and thoughtful design. Let&apos;s build something amazing together. Read more
            about my journey or book a call to discuss your next!
          </p>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Reveal y={50}>
            <div className="relative overflow-hidden rounded-[28px] min-h-[420px] h-full">
              <Image
                src={images.aboutDesk}
                alt="Walking through the city"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-[center_88%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-end p-7 md:p-9">
                <p className="text-xs tracking-[0.18em] uppercase text-white/70">Boston, MA</p>
                <h3 className="mt-2 text-2xl md:text-3xl font-semibold text-white tracking-tight">
                  Anurag Patwardhan
                </h3>
                <p className="mt-1 text-white/75">Full-Stack Software Dev &amp; Product Designer</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/skills" className="btn btn-light">
                    <span>More about me</span>
                    <Arrow />
                  </Link>
                  <Link href="/personal" className="btn btn-glass">
                    <span>Off-screen side</span>
                  </Link>
                  <Link href="/blogs" className="btn btn-glass">
                    <span>Read my blog</span>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal y={50} delay={0.1}>
              <div className="card-white p-7 bg-zinc-100">
                <h3 className="text-2xl font-bold">Book a call with me</h3>
                <p className="mt-2 text-zinc-600">Let&apos;s have a chat about your next project or idea!</p>
                <a
                  href={site.links.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary mt-5"
                >
                  <span>Book a call</span>
                  <Arrow />
                </a>
              </div>
            </Reveal>
            <Reveal y={50} delay={0.2}>
              <div className="card-white p-7">
                <h3 className="text-2xl font-bold">My tech stack</h3>
                <p className="mt-2 text-zinc-600">
                  Building with: TypeScript, React, Node.js, and more tools that power modern, scalable solutions.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {techIcons.map((t) => (
                    <span
                      key={t.name}
                      title={t.name}
                      className="w-12 h-12 rounded-xl flex items-center justify-center bg-black border border-zinc-200 p-2"
                    >
                      <Image src={t.src} alt={t.name} width={28} height={28} className="object-contain w-full h-full" />
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
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
