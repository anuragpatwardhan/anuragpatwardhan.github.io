import { education } from "@/data/skillsData";
import Reveal from "./motion/Reveal";

export default function Education() {
  return (
    <section className="bg-black py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <Reveal>
          <h2 className="display text-center text-white text-[clamp(2rem,5vw,4rem)]">
            Education
          </h2>
        </Reveal>
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {education.map((e, i) => (
            <Reveal key={e.school} delay={i * 0.1} y={50}>
              <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10 h-full">
                <p className="text-xs tracking-[0.18em] uppercase text-white/50">{e.dates}</p>
                <h3 className="mt-3 text-2xl md:text-3xl font-semibold text-white tracking-tight">
                  {e.school}
                </h3>
                <p className="mt-2 text-[#d8ff3a] text-lg">{e.degree}</p>
                <p className="mt-4 text-white/70">GPA {e.gpa}</p>
                <div className="mt-6">
                  <p className="text-xs tracking-[0.18em] uppercase text-white/50">Coursework</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {e.coursework.map((c) => (
                      <span
                        key={c}
                        className="text-xs px-3 py-1.5 rounded-full bg-black border border-white/10 text-white/85"
                      >
                        {c}
                      </span>
                    ))}
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
