"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Reveal from "./motion/Reveal";

type Icon = { label: string; bg: string; color?: string };
type Competency = { name: string; icons: Icon[]; accent: string };

const data: Competency[] = [
  {
    name: "Frontend",
    accent: "#dd0031",
    icons: [
      { label: "React", bg: "#0a0a0a", color: "#61dafb" },
      { label: "Angular", bg: "#dd0031" },
      { label: "JS", bg: "#f7df1e", color: "#000" },
      { label: "TS", bg: "#3178c6" },
      { label: "Next", bg: "#000" },
      { label: "TW", bg: "#06b6d4" },
    ],
  },
  {
    name: "UI/UX",
    accent: "#a259ff",
    icons: [
      { label: "Figma", bg: "#a259ff" },
      { label: "XD", bg: "#ff61f6" },
      { label: "Framer", bg: "#0099ff" },
      { label: "Miro", bg: "#ffd02f", color: "#000" },
      { label: "FigJam", bg: "#ff8a00" },
    ],
  },
  {
    name: "Backend",
    accent: "#6db33f",
    icons: [
      { label: "C#", bg: "#a87bd9" },
      { label: "Spring", bg: "#6db33f" },
      { label: "Node", bg: "#3eaf7c" },
      { label: "Java", bg: "#5382a1" },
      { label: ".NET", bg: "#512bd4" },
      { label: "REST", bg: "#0a0a0a" },
    ],
  },
  {
    name: "Database",
    accent: "#336791",
    icons: [
      { label: "Mongo", bg: "#3eaf7c" },
      { label: "Pg", bg: "#336791" },
      { label: "SQL", bg: "#00758f" },
      { label: "Redis", bg: "#dc382d" },
      { label: "Cache", bg: "#0a0a0a" },
    ],
  },
];

// distinct positions so icons fly out around the word rather than overlap
const positions = [
  { left: "-8%", top: "-30%" },
  { right: "-10%", top: "-20%" },
  { left: "-14%", top: "30%" },
  { right: "-14%", top: "30%" },
  { left: "2%", top: "85%" },
  { right: "4%", top: "85%" },
];

export default function CoreCompetencies() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="bg-[linear-gradient(to_bottom,#f5f1eb_0%,#f5f1eb_80%,#050000_100%)] py-20 md:py-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-10 relative">
        <Reveal>
          <h2 className="display text-center text-black text-[clamp(2rem,5vw,3.75rem)]">Core Competencies</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 text-center text-zinc-500 text-sm tracking-wider">
            Hover each one to see the tools behind it
          </p>
        </Reveal>

        <ul className="mt-16 relative space-y-6 md:space-y-10">
          {data.map((c, i) => {
            const active = hovered === i;
            const inactive = hovered !== null && hovered !== i;
            return (
              <Reveal key={c.name} delay={i * 0.08} y={50}>
                <li
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className="relative text-center cursor-pointer select-none"
                >
                  <motion.span
                    animate={{
                      color: active ? c.accent : "#0a0a0a",
                      opacity: inactive ? 0.18 : 1,
                      scale: active ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="display inline-block text-[clamp(2.5rem,9vw,6.5rem)]"
                  >
                    {c.name}
                  </motion.span>

                  <AnimatePresence>
                    {active &&
                      c.icons.map((icon, j) => (
                        <motion.span
                          key={icon.label}
                          initial={{ opacity: 0, scale: 0.4, rotate: j % 2 ? -15 : 15 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          exit={{ opacity: 0, scale: 0.4, rotate: j % 2 ? 15 : -15 }}
                          transition={{
                            type: "spring",
                            stiffness: 220,
                            damping: 16,
                            delay: j * 0.04,
                          }}
                          style={{
                            background: icon.bg,
                            color: icon.color || "#fff",
                            ...positions[j % positions.length],
                          }}
                          className="absolute w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-3xl shadow-lg flex items-center justify-center text-sm md:text-lg font-bold tracking-tight"
                        >
                          {icon.label}
                        </motion.span>
                      ))}
                  </AnimatePresence>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
