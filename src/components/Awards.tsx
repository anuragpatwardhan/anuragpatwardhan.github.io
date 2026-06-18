import { awards } from "@/data/site";
import Reveal from "./motion/Reveal";

export default function Awards() {
  return (
    <section className="bg-gradient-to-b from-[#050000] via-[#1a1f17] to-[#050000] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal>
          <h2 className="display text-center text-white text-[clamp(2rem,5vw,4rem)]">
            Awards &amp; Recognitions
          </h2>
        </Reveal>
        <div className="mt-16 grid md:grid-cols-2 gap-x-16 gap-y-12">
          {awards.map((a, i) => (
            <Reveal key={a.name} delay={(i % 2) * 0.08} y={50}>
              <article className="flex items-start gap-6 md:gap-10 border-b border-white/10 pb-10">
                <span className="display text-white/20 text-5xl md:text-7xl shrink-0 [writing-mode:vertical-rl] rotate-180">
                  {a.year}
                </span>
                <div className="flex items-start gap-5 md:gap-7 flex-1">
                  <span className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/20 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-9 h-9 text-white/70" fill="none">
                      <circle cx="12" cy="9" r="6" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M8 14l-2 7 6-3 6 3-2-7" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="display text-white text-2xl md:text-3xl">{a.name}</h3>
                    <p className="mt-3 text-white/70 leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
