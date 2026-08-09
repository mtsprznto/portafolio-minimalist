import { useRef } from "react";
import { IoMdCloudDownload } from "react-icons/io";
import profilePic from "../assets/profilePic.jpeg";
import { HERO_CONTENT } from "../constants";
import {
  gsap,
  useGSAP,
  EASE_LUXURY,
  EASE_OUT_EXPO,
  NO_PREFER_REDUCED_MOTION,
} from "../lib/gsap";

const Hero = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(NO_PREFER_REDUCED_MOTION, () => {
        // 1) Editorial entrance — staggered rise of the text column.
        const tl = gsap.timeline({ defaults: { ease: EASE_OUT_EXPO } });
        tl.fromTo(
          ".hero-badge",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.9 },
          0.15
        )
          .fromTo(
            ".hero-name",
            { autoAlpha: 0, y: 48 },
            { autoAlpha: 1, y: 0, duration: 1.1 },
            0.3
          )
          .fromTo(
            ".hero-tagline",
            { autoAlpha: 0, y: 32 },
            { autoAlpha: 1, y: 0, duration: 0.9 },
            0.55
          )
          .fromTo(
            ".hero-ctas",
            { autoAlpha: 0, y: 28 },
            { autoAlpha: 1, y: 0, duration: 0.9 },
            0.75
          )
          .fromTo(
            ".hero-scroll-hint",
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 1 },
            1.6
          );

        // 2) Ken Burns settle — both portraits breathe in on load.
        gsap.fromTo(
          ".hero-mobile-img",
          { scale: 1.15 },
          { scale: 1.05, duration: 2.4, ease: EASE_LUXURY, delay: 0.4 }
        );
        // Desktop keeps a bit of zoom as headroom for the parallax below.
        gsap.fromTo(
          ".hero-desktop-img",
          { scale: 1.18 },
          { scale: 1.12, duration: 2.4, ease: EASE_LUXURY, delay: 0.4 }
        );

        // 3) Desktop portrait parallax — subtle, scrub-linked to scroll.
        gsap.fromTo(
          ".hero-desktop-img",
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative flex min-h-[100dvh] flex-col overflow-hidden lg:flex-row"
    >
      {/* ── Mobile image (top, 50vh) — visible only on mobile ── */}
      <div className="relative h-[50vh] w-full shrink-0 lg:hidden">
        <img
          src={profilePic}
          alt="Matías Pérez Nauto"
          className="hero-mobile-img h-full w-full object-cover object-top grayscale"
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
      <div className="relative z-10 flex flex-1 flex-col justify-end bg-[#0A0A0A] px-8 pb-16 pt-10 lg:w-[55%] lg:flex-none lg:px-16 lg:pb-24 lg:pt-32">
        {/* Badge */}
        <span className="hero-badge mb-6 block text-[10px] font-medium tracking-[0.2em] text-white/30 uppercase">
          FULLSTACK &amp; AI ENGINEER
        </span>

        {/* Name */}
        <h1 className="hero-name font-primary text-[clamp(2.8rem,7vw,7rem)] font-extrabold leading-[0.85] tracking-[-0.04em] text-white">
          Matías
          <br />
          Pérez Nauto
        </h1>

        {/* Tagline */}
        <p className="hero-tagline mt-6 max-w-sm text-[14px] leading-relaxed text-white/40">
          {HERO_CONTENT}
        </p>

        {/* CTAs */}
        <div className="hero-ctas mt-10 flex flex-wrap items-center gap-3">
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
        </div>
      </div>

      {/* ── Desktop image column (45%) ── */}
      <div className="relative hidden lg:block lg:w-[45%]">
        <img
          src={profilePic}
          alt="Matías Pérez Nauto"
          className="hero-desktop-img absolute inset-0 h-full w-full object-cover grayscale"
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
      <div className="hero-scroll-hint pointer-events-none absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
        <span className="text-[10px] font-medium tracking-[0.2em] text-white/25 uppercase">
          SCROLL
        </span>
        <div className="h-10 w-px bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
