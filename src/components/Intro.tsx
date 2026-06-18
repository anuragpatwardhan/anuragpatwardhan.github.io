import Image from "next/image";
import Link from "next/link";
import { images } from "@/data/site";
import Reveal from "./motion/Reveal";

export default function Intro() {
  return (
    <section className="bg-black py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-12 items-center">
        <Reveal y={50}>
          <h2 className="text-[clamp(1.5rem,2.6vw,2.5rem)] font-semibold tracking-tight text-white/50 leading-[1.25]">
            <span>Hey, I&apos;m</span>{" "}
            <InlineImage src={images.profile} alt="" />{" "}
            <span className="text-white">Anurag</span>
            <br />
            <span className="text-[#d8ff3a]">Software Developer</span>{" "}
            <InlineImage src={images.codeBanner} alt="" />
            <br />
            <span>Living in</span>{" "}
            <InlineImage src={images.boston} alt="" />{" "}
            <span className="text-white">Boston</span>
          </h2>
          <p className="mt-8 text-white/80 max-w-md leading-relaxed text-lg md:text-xl">
            I turn product ideas into shipped software. My day-to-day moves between Angular and React on the
            frontend, C# .NET and Spring Boot on the backend, and SQL where it counts. I gravitate toward
            problems that need both engineering rigor and a sense of taste.
          </p>
          <Link href="/contact" className="btn btn-primary mt-8">
            <span>Get In Touch Today</span>
            <svg className="btn-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </Reveal>
        <Reveal y={50} delay={0.15} className="justify-self-end">
          <div className="w-[min(420px,85vw)] aspect-square rounded-[28%] overflow-hidden bg-zinc-800 border border-white/10">
            <Image
              src={images.portrait}
              alt="Anurag Patwardhan"
              width={420}
              height={420}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function InlineImage({ src, alt }: { src: string; alt: string }) {
  return (
    <span className="inline-block align-middle w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden">
      <Image src={src} alt={alt} width={48} height={48} className="w-full h-full object-cover" />
    </span>
  );
}
