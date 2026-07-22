import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { CONTACT } from "../constants";

const Contact = () => {
  return (
    <section
      id="contacto"
      className="relative flex min-h-screen flex-col items-center justify-center border-t border-white/[0.04]"
    >
      <div className="w-full max-w-5xl px-8 py-28 lg:px-16 lg:py-36">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12"
        >
          <span className="text-[11px] font-medium tracking-[0.15em] text-white/30 uppercase">
            Contacto
          </span>
        </motion.div>

        {/* Large email */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <a
            href={`mailto:${CONTACT.email}`}
            className="block text-[clamp(1.5rem,4vw,3.5rem)] font-light leading-tight text-white/50 transition-colors duration-500 hover:text-white"
            aria-label={`Enviar email a ${CONTACT.email}`}
          >
            {CONTACT.email}
          </a>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-5"
        >
          <span className="inline-flex items-center gap-2 text-sm text-white/25">
            <HiOutlineLocationMarker className="h-3.5 w-3.5" />
            {CONTACT.address}
          </span>
        </motion.div>

        {/* Divider + social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-14"
        >
          <div className="border-t border-white/[0.04]" />
          <div className="mt-8 flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/matiaspereznauto/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white/25 transition-colors duration-300 hover:text-white/70"
            >
              <FaLinkedin size={17} />
            </a>
            <a
              href="https://github.com/mtsprznto"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Github"
              className="text-white/25 transition-colors duration-300 hover:text-white/70"
            >
              <FaGithub size={17} />
            </a>
            <a
              href="https://www.instagram.com/lllit_3/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/25 transition-colors duration-300 hover:text-white/70"
            >
              <FaInstagram size={17} />
            </a>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16"
        >
          <p className="text-[10px] font-medium tracking-[0.15em] text-white/10 uppercase">
            &copy; {new Date().getFullYear()} MATÍAS PÉREZ NAUTO
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
