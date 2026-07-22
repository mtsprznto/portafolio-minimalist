import { motion } from "framer-motion";
import { IoMdCloudDownload } from "react-icons/io";
import profilePic from "../assets/profilePic.jpeg";
import { HERO_CONTENT } from "../constants";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[100dvh] flex-col overflow-hidden lg:flex-row"
    >
      {/* ── Mobile image (top, 50vh) — visible only on mobile ── */}
      <div className="relative h-[50vh] w-full shrink-0 lg:hidden">
        <img
          src={profilePic}
          alt="Matías Pérez Nauto"
          className="h-full w-full object-cover object-top grayscale"
          loading="eager"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(10,10,10,0.7) 80%, #0A0A0A 100%)",
          }}
        />
      </div>

      {/* ── Text column ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-1 flex-col justify-end bg-[#0A0A0A] px-8 pb-16 pt-10 lg:w-[55%] lg:flex-none lg:px-16 lg:pb-24 lg:pt-32"
      >
        {/* Badge */}
        <motion.span
          variants={itemVariants}
          className="mb-6 block text-[10px] font-medium tracking-[0.2em] text-white/30 uppercase"
        >
          FULLSTACK &amp; AI ENGINEER
        </motion.span>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="font-primary text-[clamp(2.8rem,7vw,7rem)] font-extrabold leading-[0.85] tracking-[-0.04em] text-white"
        >
          Matías
          <br />
          Pérez Nauto
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-sm text-[14px] leading-relaxed text-white/40"
        >
          {HERO_CONTENT}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href="/CV_Matias_Perez_Nauto.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.06] px-6 py-3 text-[11px] font-medium tracking-[0.15em] text-white/80 uppercase transition-all duration-500 hover:bg-white/[0.1] hover:text-white active:scale-[0.98]"
          >
            <IoMdCloudDownload className="h-3.5 w-3.5" />
            DESCARGAR CV
          </a>

          <a
            href="#proyectos"
            className="inline-flex items-center border border-white/[0.06] px-6 py-3 text-[11px] font-medium tracking-[0.15em] text-white/50 uppercase transition-all duration-500 hover:border-white/20 hover:text-white/80 active:scale-[0.98]"
          >
            VER PROYECTOS
          </a>
        </motion.div>
      </motion.div>

      {/* ── Desktop image column (45%) ── */}
      <div className="relative hidden lg:block lg:w-[45%]">
        <img
          src={profilePic}
          alt="Matías Pérez Nauto"
          className="absolute inset-0 h-full w-full object-cover grayscale"
          loading="eager"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.15) 40%, rgba(10,10,10,0.0) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-16"
          style={{ background: "linear-gradient(to right, #0A0A0A, transparent)" }}
        />
      </div>

      {/* Scroll indicator — desktop only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="pointer-events-none absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="text-[10px] font-medium tracking-[0.2em] text-white/25 uppercase">
          SCROLL
        </span>
        <div className="h-10 w-px bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
