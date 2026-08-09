import { useRef } from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { CONTACT } from "../constants";
import {
  gsap,
  useGSAP,
  EASE_LUXURY,
  NO_PREFER_REDUCED_MOTION,
} from "../lib/gsap";

const Contact = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(sectionRef.current);

      gsap.matchMedia().add(NO_PREFER_REDUCED_MOTION, () => {
        const tl = gsap.timeline({
          defaults: { ease: EASE_LUXURY },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        });

        tl.fromTo(
          q(".contact-label"),
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.6 }
        )
          .fromTo(
            q(".contact-email"),
            { autoAlpha: 0, y: 36 },
            { autoAlpha: 1, y: 0, duration: 0.9 },
            "-=0.25"
          )
          .fromTo(
            q(".contact-location"),
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 0.6 },
            "-=0.5"
          )
          .fromTo(
            q(".contact-socials"),
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 0.6 },
            "-=0.35"
          )
          .fromTo(
            q(".contact-footer"),
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.8 },
            "-=0.35"
          );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="relative flex min-h-screen flex-col items-center justify-center border-t border-white/[0.04]"
    >
      <div className="w-full max-w-5xl px-8 py-28 lg:px-16 lg:py-36">
        {/* Label */}
        <div className="contact-label mb-12">
          <span className="text-[11px] font-medium tracking-[0.15em] text-white/30 uppercase">
            Contacto
          </span>
        </div>

        {/* Large email */}
        <div className="contact-email">
          <a
            href={`mailto:${CONTACT.email}`}
            className="block text-[clamp(1.5rem,4vw,3.5rem)] font-light leading-tight text-white/50 transition-colors duration-500 hover:text-white"
            aria-label={`Enviar email a ${CONTACT.email}`}
          >
            {CONTACT.email}
          </a>
        </div>

        {/* Location */}
        <div className="contact-location mt-5">
          <span className="inline-flex items-center gap-2 text-sm text-white/25">
            <HiOutlineLocationMarker className="h-3.5 w-3.5" />
            {CONTACT.address}
          </span>
        </div>

        {/* Divider + social links */}
        <div className="contact-socials mt-14">
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
        </div>

        {/* Footer */}
        <div className="contact-footer mt-16">
          <p className="text-[10px] font-medium tracking-[0.15em] text-white/10 uppercase">
            &copy; {new Date().getFullYear()} MATÍAS PÉREZ NAUTO
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
