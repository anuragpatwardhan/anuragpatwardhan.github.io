import { experience } from "@/data/site";
import Reveal from "./motion/Reveal";

export default function Experience() {
  return (
    <section className="bg-black py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <Reveal>
          <h2 className="display text-center text-white text-[clamp(2rem,5vw,4rem)]">Experience</h2>
        </Reveal>
        <ul className="mt-16 divide-y divide-white/15">
          {experience.map((e, i) => (
            <Reveal key={e.role + e.company} delay={i * 0.08}>
              <li className="py-8 md:py-12 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
                <h3 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#d8ff3a]">{e.role}</h3>
                <div className="text-right">
                  <p className="text-3xl md:text-5xl font-semibold tracking-tight text-white">{e.company}</p>
                  <p className="mt-1 text-[#a0a0a0]">{e.dates}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
