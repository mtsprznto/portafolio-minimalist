import { motion } from "framer-motion";
import { BiLogoPostgresql } from "react-icons/bi";
import { DiPython, DiRedis } from "react-icons/di";
import { FaNodeJs, FaAws, FaDocker } from "react-icons/fa";
import { RiReactjsLine, RiVuejsLine } from "react-icons/ri";
import { SiMongodb, SiTypescript, SiFastapi, SiNextdotjs, SiTailwindcss } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const floatAnimation = (duration) => ({
  y: [0, -6, 0],
  transition: {
    duration,
    repeat: Infinity,
    ease: "easeInOut",
  },
});

const Technologies = () => {
  return (
    <section id="tecnologias" className="relative overflow-hidden py-28 lg:py-36">
      {/* Section Header — left-padded */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="mb-16 px-8 lg:mb-20 lg:px-16"
      >
        <span className="mb-3 block text-[11px] font-medium tracking-[0.15em] text-white/30 uppercase">
          Stack
        </span>
        <h2 className="text-[clamp(1.8rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white">
          Tecnologías
        </h2>
        <div className="mt-4 h-px w-16 bg-white/10" />
      </motion.div>

      {/* Marquee ticker */}
      <div
        className="relative mb-16 overflow-hidden border-y border-white/[0.03] py-4"
        aria-hidden="true"
      >
        <div className="animate-marquee flex whitespace-nowrap">
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

      {/* Tech Grid */}
      <div className="px-8 lg:px-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mx-auto grid max-w-4xl grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 lg:gap-4"
        >
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                animate={floatAnimation(tech.duration)}
                className="group flex flex-col items-center gap-2 border-b border-white/[0.03] bg-transparent p-4 transition-all duration-500 hover:bg-white/[0.02]"
              >
                <div className="tech-glow transition-transform duration-500 group-hover:scale-110">
                  <Icon className={`text-2xl ${tech.color} lg:text-3xl`} />
                </div>
                <span className="text-[10px] font-medium tracking-[0.08em] text-white/30 uppercase transition-colors duration-300 group-hover:text-white/55">
                  {tech.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Technologies;
