import { useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import logo from "../assets/logo.jpg";
import {
  gsap,
  useGSAP,
  ScrollTrigger,
  EASE_LUXURY,
  NO_PREFER_REDUCED_MOTION,
} from "../lib/gsap";

const navLinks = [
  { label: "EXPERIENCIA", index: "01", href: "#experiencia" },
  { label: "PROYECTOS",   index: "02", href: "#proyectos" },
  { label: "TECNOLOGÍAS", index: "03", href: "#tecnologias" },
  { label: "CONTACTO",    index: "04", href: "#contacto" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const rootRef = useRef(null);
  const navRef = useRef(null);
  const overlayRef = useRef(null);

  // Entrance + hide-on-scroll-down / show-on-scroll-up (decorative → respects reduced motion).
  useGSAP(
    () => {
      gsap.matchMedia().add(NO_PREFER_REDUCED_MOTION, () => {
        gsap.fromTo(
          navRef.current,
          { y: -32, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, ease: EASE_LUXURY, delay: 0.2 }
        );

        const hideNav = gsap.to(navRef.current, {
          yPercent: -130,
          duration: 0.4,
          ease: "power2.inOut",
          paused: true,
        });

        ScrollTrigger.create({
          start: 80,
          end: "max",
          onUpdate: (self) => {
            if (self.direction === 1 && self.scroll() > 80) hideNav.play();
            else if (self.direction === -1) hideNav.reverse();
          },
        });
      });
    },
    { scope: rootRef }
  );

  // Mobile overlay — functional (user-initiated), quick fade + stagger.
  useGSAP(
    () => {
      if (menuOpen) {
        gsap.fromTo(
          overlayRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.35, ease: "power2.out" }
        );
        gsap.fromTo(
          ".menu-link",
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "expo.out",
            stagger: 0.06,
            delay: 0.08,
          }
        );
      } else {
        gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.25, ease: "power2.in" });
      }
    },
    { scope: rootRef, dependencies: [menuOpen] }
  );

  return (
    <div ref={rootRef}>
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="flex items-center justify-between px-6 py-2.5 lg:px-10">
          {/* Logo — icon only, name on hover */}
          <a
            href="/"
            aria-label="Inicio"
            className="group relative flex items-center gap-2"
          >
            <img
              src={logo}
              alt="MPN"
              width={28}
              height={28}
              className="rounded-full opacity-70 transition-opacity duration-300 group-hover:opacity-100"
            />
            <span className="max-w-0 overflow-hidden whitespace-nowrap text-[10px] font-medium tracking-[0.15em] text-white/60 uppercase transition-all duration-500 group-hover:max-w-[140px] group-hover:text-white/90">
              Matías Pérez N.
            </span>
          </a>

          {/* Desktop nav links with index numbers */}
          <div className="hidden items-center md:flex">
            {navLinks.map((link, i) => (
              <span key={link.href} className="flex items-center">
                <a
                  href={link.href}
                  className="text-[10px] font-medium tracking-[0.12em] text-white/40 uppercase transition-colors duration-300 hover:text-white/90 px-3"
                >
                  <span className="mr-1.5 text-white/20">{link.index}</span>
                  {link.label}
                </a>
                {i < navLinks.length - 1 && (
                  <span className="text-white/10 select-none">|</span>
                )}
              </span>
            ))}
          </div>

          {/* Right: social icons + hamburger */}
          <div className="flex items-center gap-4">
            {/* Social icons — desktop */}
            <div className="hidden items-center gap-3 md:flex">
              <a
                href="https://www.linkedin.com/in/matiaspereznauto/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white/35 transition-colors duration-300 hover:text-white/80"
              >
                <FaLinkedin size={15} />
              </a>
              <a
                href="https://github.com/mtsprznto"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Github"
                className="text-white/35 transition-colors duration-300 hover:text-white/80"
              >
                <FaGithub size={15} />
              </a>
              <a
                href="https://www.instagram.com/lllit_3/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/35 transition-colors duration-300 hover:text-white/80"
              >
                <FaInstagram size={15} />
              </a>
            </div>

            {/* Hamburger — mobile only */}
            <button
              className="flex flex-col items-center justify-center gap-1 md:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <span
                className={`block h-[1px] w-5 bg-white/60 transition-all duration-300 ${
                  menuOpen ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[1px] w-5 bg-white/60 transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-[1px] w-5 bg-white/60 transition-all duration-300 ${
                  menuOpen ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay menu — always mounted; GSAP toggles visibility */}
      <div
        ref={overlayRef}
        aria-hidden={!menuOpen}
        className="fixed inset-0 z-40 flex flex-col justify-center bg-[#0A0A0A]/95 backdrop-blur-xl md:hidden"
        onClick={() => setMenuOpen(false)}
      >
        <nav className="flex flex-col items-start gap-6 px-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="menu-link text-2xl font-semibold tracking-[-0.02em] text-white/80 transition-colors duration-300 hover:text-white"
            >
              <span className="mr-3 text-sm font-normal text-white/20">
                {link.index}
              </span>
              {link.label}
            </a>
          ))}

          <div className="mt-6 flex items-center gap-5">
            <a
              href="https://www.linkedin.com/in/matiaspereznauto/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white/40 hover:text-white/80"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href="https://github.com/mtsprznto"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Github"
              className="text-white/40 hover:text-white/80"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://www.instagram.com/lllit_3/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/40 hover:text-white/80"
            >
              <FaInstagram size={18} />
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
