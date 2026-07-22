import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { useProjects } from "../hooks/useProjects";

const Projects = () => {
  const { projects, loading } = useProjects();
  const [imageLoading, setImageLoading] = useState({});

  useEffect(() => {
    if (projects.length) {
      const initialState = projects.reduce(
        (acc, _, i) => ({ ...acc, [i]: true }),
        {}
      );
      setImageLoading(initialState);
    }
  }, [projects]);

  if (loading) {
    return (
      <section id="proyectos" className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </section>
    );
  }

  return (
    <section id="proyectos" className="relative py-28 lg:py-36">
      {/* Section Header — full-width, left-padded */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="mb-12 px-8 lg:mb-16 lg:px-16"
      >
        <span className="mb-3 block text-[11px] font-medium tracking-[0.15em] text-white/30 uppercase">
          Trabajos
        </span>
        <h2 className="text-[clamp(1.8rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white">
          Proyectos
        </h2>
        <div className="mt-4 h-px w-16 bg-white/10" />
      </motion.div>

      {/* Cinematic grid — asymmetric alternating widths */}
      <div className="px-0">
        {projects.reduce((rows, project, i) => {
          // Group into pairs
          if (i % 2 === 0) rows.push([]);
          rows[rows.length - 1].push({ project, index: i });
          return rows;
        }, []).map((row, rowIdx) => (
          <div
            key={rowIdx}
            className={`flex flex-col lg:flex-row ${
              rowIdx % 2 === 0 ? "" : "lg:flex-row-reverse"
            }`}
          >
            {row.map(({ project, index }) => {
              const isWide = (rowIdx % 2 === 0 && index % 2 === 0) ||
                             (rowIdx % 2 !== 0 && index % 2 !== 0);
              return (
                <motion.article
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: (index % 2) * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  className={`col-immersive min-h-[50vh] lg:min-h-[70vh] ${
                    isWide ? "lg:flex-[2]" : "lg:flex-[1]"
                  }`}
                  style={{ flex: isWide ? "2 1 0%" : "1 1 0%" }}
                >
                  {/* Background image */}
                  <img
                    src={
                      project.sitio_web
                        ? `https://raw.githubusercontent.com/mtsprznto/auto_actualizar_cv/refs/heads/main/api/static/previews/${project.repositorio}.png`
                        : "/default-cv.svg"
                    }
                    alt={`Preview de ${project.titulo}`}
                    loading="lazy"
                    onLoad={() =>
                      setImageLoading((prev) => ({ ...prev, [index]: false }))
                    }
                    onError={(e) => {
                      setImageLoading((prev) => ({ ...prev, [index]: false }));
                      e.target.src = "/default-cv.svg";
                    }}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                      imageLoading[index] ? "opacity-0" : "opacity-100"
                    }`}
                  />

                  {/* Loading placeholder */}
                  {imageLoading[index] && (
                    <div className="absolute inset-0 bg-[#121212]" />
                  )}

                  {/* Cinematic gradient overlay */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 40%, rgba(10,10,10,0.1) 100%)",
                    }}
                  />

                  {/* Content overlay — bottom-left */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                    <span className="mb-2 block text-[10px] font-medium tracking-[0.15em] text-white/40 uppercase">
                      {project.fecha}
                    </span>

                    <h3 className="text-xl font-bold uppercase tracking-[0.05em] text-white lg:text-2xl">
                      {project.titulo}
                    </h3>

                    <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-white/45 line-clamp-2">
                      {project.descripcion}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Código fuente"
                        className="inline-flex items-center gap-2 bg-[#1A1A1A] border border-white/[0.06] px-5 py-2 text-[11px] font-medium tracking-[0.12em] text-white/70 uppercase transition-all duration-300 hover:border-white/20 hover:text-white active:scale-[0.98]"
                      >
                        <FaGithub size={12} />
                        VER PROYECTO
                      </a>

                      {project.sitio_web && (
                        <a
                          href={project.sitio_web}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 border border-white/[0.04] px-5 py-2 text-[11px] font-medium tracking-[0.12em] text-white/40 uppercase transition-all duration-300 hover:border-white/15 hover:text-white/70 active:scale-[0.98]"
                        >
                          <FiExternalLink size={12} />
                          DEMO
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
