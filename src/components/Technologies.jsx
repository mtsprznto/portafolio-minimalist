import { useRef } from "react";
import { BiLogoPostgresql } from "react-icons/bi";
import { DiPython, DiRedis } from "react-icons/di";
import { FaNodeJs, FaAws, FaDocker } from "react-icons/fa";
import { RiReactjsLine, RiVuejsLine } from "react-icons/ri";
import { SiMongodb, SiTypescript, SiFastapi, SiNextdotjs, SiTailwindcss } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import {
  gsap,
  useGSAP,
  staggerReveal,
  NO_PREFER_REDUCED_MOTION,
} from "../lib/gsap";

const technologies = [
  { icon: DiPython, name: "Python", color: "text-green-400", duration: 3 },
  { icon: SiTypescript, name: "TypeScript", color: "text-blue-400", duration: 2.5 },
  { icon: TbBrandNextjs, name: "Next.js", color: "text-white", duration: 4 },
  { icon: RiReactjsLine, name: "React", color: "text-cyan-400", duration: 3.5 },
  { icon: RiVuejsLine, name: "Vue.js", color: "text-emerald-400", duration: 2.8 },
  { icon: SiFastapi, name: "FastAPI", color: "text-teal-400", duration: 3.2 },
  { icon: FaNodeJs, name: "Node.js", color: "text-green-500", duration: 4.5 },
  { icon: SiMongodb, name: "MongoDB", color: "text-green-400", duration: 2.2 },
  { icon: BiLogoPostgresql, name: "PostgreSQL", color: "text-sky-500", duration: 3.8 },
  { icon: DiRedis, name: "Redis", color: "text-red-400", duration: 2.7 },
  { icon: FaAws, name: "AWS", color: "text-amber-400", duration: 4.2 },
  { icon: FaDocker, name: "Docker", color: "text-blue-500", duration: 3.3 },
  { icon: SiTailwindcss, name: "Tailwind", color: "text-cyan-300", duration: 2.9 },
];

const tickerItems = [
  "Python", "TypeScript", "React", "Next.js", "Vue.js",
  "FastAPI", "Node.js", "MongoDB", "PostgreSQL", "Redis",
  "AWS", "Docker", "Tailwind", "GraphQL", "REST API",
];

const Technologies = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(sectionRef.current);

      gsap.matchMedia().add(NO_PREFER_REDUCED_MOTION, () => {
        staggerReveal(q(".section-header"), {
          trigger: sectionRef.current,
          start: "top 85%",
          y: 24,
          stagger: 0,
          duration: 0.8,
        });

        // Stack wall entrance — items ripple outward from the center of the
        // wall (feels more deliberate than a left-to-right sweep for a row).
        const reveal = gsap.fromTo(
          q(".tech-item"),
          { autoAlpha: 0, y: 26 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "back.out(1.6)",
            stagger: { each: 0.045, from: "center" },
            scrollTrigger: {
              trigger: q(".tech-wall")[0],
              start: "top 85%",
              once: true,
            },
          }
        );

        // Per-item ambient float — starts only after the entrance finishes so
        // both tweens never fight over the same `y` property. Offset by index
        // so tiles drift asynchronously.
        reveal?.eventCallback("onComplete", () => {
          q(".tech-item").forEach((item, i) => {
            const duration = technologies[i]?.duration || 3;
            gsap.to(item, {
              y: -5,
              duration,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              delay: i * 0.2,
            });
          });
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="tecnologias"
      className="relative overflow-hidden py-28 lg:py-36"
    >
      {/* Section Header */}
      <div className="section-header mb-14 px-8 lg:mb-20 lg:px-16">
        <span className="mb-3 block text-[11px] font-medium tracking-[0.15em] text-white/30 uppercase">
          Stack
        </span>
        <h2 className="text-[clamp(1.8rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white">
          Tecnologías
        </h2>
        <div className="mt-4 h-px w-16 bg-white/10" />
      </div>

      {/* Marquee ticker — full-bleed, CSS loop. `w-max` keeps the flex at its
          intrinsic width so translateX(-50%) = exactly one duplicated set. */}
      <div
        className="relative mb-14 overflow-hidden border-y border-white/[0.03] py-4 lg:mb-20"
        aria-hidden="true"
      >
        <div className="animate-marquee flex w-max whitespace-nowrap">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              className="mx-6 text-[11px] font-medium tracking-[0.2em] text-white/15 uppercase"
            >
              {item}
              <span className="mx-6 text-white/8">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Stack wall — full content width on desktop (13 cells in one row,
          hairline separators, border top/bottom), centered 3-col wrap on
          mobile so the trailing cell never dangles left-aligned. */}
      <div className="px-8 lg:px-16">
        <div className="tech-wall mx-auto flex max-w-[1600px] flex-wrap justify-center gap-3 lg:flex-nowrap lg:gap-0 lg:border-y lg:border-white/[0.06]">
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <div
                key={index}
                className={`tech-item group relative w-[calc((100%_-_1.5rem)/3)] overflow-hidden border border-white/[0.04] bg-white/[0.02] lg:w-auto lg:flex-1 lg:border-0 lg:bg-transparent lg:px-2 ${
                  index === 0 ? "lg:border-l-0" : "lg:border-l lg:border-white/[0.04]"
                }`}
              >
                {/* Hover glow — warm radial rising from the bottom edge */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_115%,rgba(255,255,255,0.07),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative flex flex-col items-center gap-2.5 py-5 transition-transform duration-500 ease-[var(--ease-luxury)] group-hover:-translate-y-1 lg:py-12">
                  <Icon
                    className={`text-3xl ${tech.color} transition-transform duration-500 ease-[var(--ease-luxury)] group-hover:scale-110 lg:text-[2.6rem]`}
                  />
                  <span className="text-[10px] font-medium tracking-[0.12em] text-white/30 uppercase transition-colors duration-300 group-hover:text-white/60">
                    {tech.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Technologies;
