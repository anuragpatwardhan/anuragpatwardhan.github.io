import { testimonials } from "@/data/site";
import Reveal from "./motion/Reveal";

export default function Testimonials() {
  return (
    <section className="bg-black py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal y={60}>
          <div className="rounded-3xl bg-[#5b2333] px-6 md:px-14 py-16 md:py-20">
            <Reveal>
              <h2 className="text-center text-white text-3xl md:text-5xl font-semibold tracking-tight">
                Kind words from great teams
              </h2>
            </Reveal>
            <div className="mt-14 grid md:grid-cols-3 gap-10 md:gap-12">
              {testimonials.map((t, i) => (
                <Reveal key={t.name} delay={i * 0.1} y={30}>
                  <figure className="flex flex-col">
                    <blockquote className="text-white/90 leading-relaxed">
                      <span className="text-2xl mr-1">&ldquo;</span>
                      {t.quote}
                      <span className="text-2xl ml-1">&rdquo;</span>
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-3">
                      <span className="w-11 h-11 rounded-full bg-zinc-700 border border-white/10 flex items-center justify-center text-xs text-white/70">
                        {t.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                      <span>
                        <p className="text-white font-medium">{t.name}</p>
                        <p className="text-white/60 text-sm">{t.title}</p>
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
