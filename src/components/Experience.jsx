import { motion } from "framer-motion";
import { EXPERIENCES } from "../constants";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const Experience = () => {
  return (
    <section id="experiencia" className="relative py-28 lg:py-36">
      {/* Section Header — full-width, left-padded */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="mb-16 px-8 lg:mb-20 lg:px-16"
      >
        <span className="mb-3 block text-[11px] font-medium tracking-[0.15em] text-white/30 uppercase">
          Trayectoria
        </span>
        <h2 className="text-[clamp(1.8rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white">
          Experiencia
        </h2>
        <div className="mt-4 h-px w-16 bg-white/10" />
      </motion.div>

      {/* Editorial list */}
      <div className="px-8 lg:px-16">
        {EXPERIENCES.map((experience, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="relative border-b border-white/[0.04] py-10 lg:py-12"
          >
            {/* Large background index number */}
            <span
              className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none text-[clamp(5rem,12vw,120px)] font-bold leading-none text-white/[0.02]"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Three-column grid: year | content | tags */}
            <div className="relative grid grid-cols-1 gap-4 lg:grid-cols-[120px_1fr_auto] lg:gap-8">
              {/* Col 1: Year */}
              <div className="lg:pt-1">
                <span className="text-[11px] font-medium tracking-[0.15em] text-white/20 uppercase">
                  {experience.year}
                </span>
              </div>

              {/* Col 2: Role + company + description */}
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {experience.role}
                </h3>
                <p className="mt-0.5 text-sm text-white/40">
                  {experience.company}
                </p>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/40">
                  {experience.description}
                </p>
              </div>

              {/* Col 3: Tech tags — right-aligned on desktop, left on mobile */}
              <div className="flex flex-wrap gap-2 lg:justify-end lg:content-start">
                {experience.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="border border-white/5 bg-white/[0.02] px-3 py-1 text-[10px] font-medium tracking-[0.05em] text-white/35 uppercase transition-colors duration-300 hover:border-white/15 hover:text-white/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
