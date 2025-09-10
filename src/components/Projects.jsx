import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { useProjects } from "../hooks/useProjects";
import { useState, useEffect } from "react";

const Projects = () => {
  const { projects, loading } = useProjects();
  const [visibleCount, setVisibleCount] = useState(6); // muestra los primeros 6
  const [imageLoading, setImageLoading] = useState({});

  useEffect(() => {
    const initialState = projects.reduce(
      (acc, _, i) => ({ ...acc, [i]: true }),
      {}
    );
    setImageLoading(initialState);
  }, [projects]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <motion.div
          className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
      </div>
    );

  return (
    <div className="pb-4 text-stone-200">
      <motion.h2
        className="my-20 text-center text-4xl"
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
      >
        Proyectos
      </motion.h2>

      <div className="grid md:grid-cols-2 grid-cols-1">
        {projects.slice(0, visibleCount).map((project, index) => (
          <div
            key={index}
            className="mb-8 flex flex-wrap lg:justify-center justify-center md:border-none border-l border-stone-600 py-3 px-4 rounded-lg shadow-md"
          >
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: -100 }}
              transition={{ duration: 1 }}
              className="w-full md:w-full flex justify-center relative "
            >
              <img
                src={
                  project.sitio_web
                    ? `https://raw.githubusercontent.com/mtsprznto/auto_actualizar_cv/refs/heads/main/api/static/previews/${project.repositorio}.png`
                    : "/default-cv.svg"
                }
                alt={`Preview de ${project.titulo}`}
                width={250}
                height={250}
                onLoad={() =>
                  setImageLoading((prev) => ({ ...prev, [index]: false }))
                }
                onError={() =>
                  setImageLoading((prev) => ({ ...prev, [index]: false }))
                }
                className={`mb-6 rounded mx-auto object-cover shadow-md w-60 h-60 transition-opacity duration-500 ${
                  imageLoading[index] ? "opacity-0" : "opacity-100"
                }`}
              />

              {imageLoading[index] && (
                <div className="absolute top-0 left-0 w-60 h-60 flex justify-center items-center">
                  <motion.div
                    className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  />
                </div>
              )}
            </motion.div>

            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 100 }}
              transition={{ duration: 1 }}
              className="w-full max-w-xl lg:w-3/4"
            >
              <h3 className="mb-2 font-semibold text-2xl">{project.titulo}</h3>
              <p className="mb-2 text-sm text-stone-400">
                Fecha: {project.fecha}
              </p>
              <p className="mb-4 text-stone-400">{project.descripcion}</p>
              <div className="mb-5 flex items-center gap-4">
                {project.sitio_web && (
                  <a
                    href={project.sitio_web}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-full py-2 px-4 text-sm text-stone-800 font-bold hover:bg-white/40 hover:text-white duration-240"
                  >
                    DEMO
                  </a>
                )}

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Github"
                  className="border rounded-full py-2 px-4 text-sm font-bold hover:bg-white/40 hover:text-white duration-240"
                >
                  <FaGithub></FaGithub>
                </a>
              </div>
              <div className="flex flex-wrap">
                {(() => {
                  const total = Object.values(
                    project.lenguajes_completos
                  ).reduce((acc, val) => acc + val, 0);
                  return Object.entries(project.lenguajes_completos).map(
                    ([lenguaje, bytes], index) => {
                      const porcentaje = ((bytes / total) * 100).toFixed(1);
                      return (
                        <span
                          className="mr-2 rounded bg-stone-900 p-2 text-[10px] md:text-sm font-medium text-stone-300"
                          key={index}
                        >
                          {lenguaje}: {porcentaje}%
                        </span>
                      );
                    }
                  );
                })()}
              </div>
            </motion.div>
          </div>
        ))}
        
      </div>
      {visibleCount < projects.length && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="bg-white text-stone-900 font-bold px-6 py-2 rounded-full hover:bg-white/40 hover:text-white transition duration-300"
            >
              Ver más proyectos
            </button>
          </div>
        )}
    </div>
  );
};

export default Projects;
