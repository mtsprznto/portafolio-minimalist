import { useRef } from "react";
import { EXPERIENCES } from "../constants";
import { gsap, useGSAP, staggerReveal } from "../lib/gsap";

const Experience = () => {
  const sectionRef = useRef(null);

  // gsap.context() reverts tweens/ScrollTriggers but NOT raw DOM listeners or
  // lazily-created quickTo tweens, so we remove/kill them manually — both when
  // the media conditions re-run (breakpoint or reduced-motion toggles) and when
  // the component unmounts.
  const listenerCleanups = [];

  useGSAP(
    () => {
      const q = gsap.utils.selector(sectionRef.current);

      // Responsive + reduced-motion in one place: the handler re-runs whenever
      // any condition toggles, so `isDesktop` is always fresh — resizing across
      // the 1024px breakpoint re-registers the correct branch, and with
      // prefers-reduced-motion no condition matches, so nothing animates.
      gsap.matchMedia().add(
        {
          isDesktop:
            "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          isMobile:
            "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { isDesktop } = context.conditions;

          // Remove listeners + kill quickTo tweens left behind by a previous
          // run before re-registering the desktop-only interactions.
          listenerCleanups.forEach((cleanup) => cleanup());
          listenerCleanups.length = 0;

          // Section header
          staggerReveal(q(".section-header"), {
            trigger: sectionRef.current,
            start: "top 85%",
            y: 24,
            stagger: 0,
            duration: 0.8,
          });

          // Timeline rail — the progress line paints top→bottom, scrubbed to
          // the scroll so the career reads as a journey being drawn.
          gsap.fromTo(
            q(".timeline-progress"),
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: q(".experience-list")[0],
                start: "top 72%",
                end: "bottom 55%",
                scrub: 0.5,
              },
            }
          );

          q(".exp-card").forEach((card, i) => {
            const inner = card.querySelector(".exp-inner");
            const dot = card.querySelector(".exp-dot");
            const halo = card.querySelector(".exp-dot-halo");
            const indexEl = card.querySelector(".exp-index");
            const chips = card.querySelectorAll(".exp-chip");

            // Node ignites (scale + glow halo) when its card enters.
            gsap.fromTo(
              dot,
              { scale: 0 },
              {
                scale: 1,
                duration: 0.5,
                ease: "back.out(2.5)",
                scrollTrigger: { trigger: card, start: "top 80%" },
              }
            );
            gsap.to(halo, {
              autoAlpha: 1,
              duration: 0.5,
              delay: 0.1,
              scrollTrigger: { trigger: card, start: "top 80%" },
            });

            // Giant index drifts slower than the card → depth layer behind
            // the content (parallax scrub).
            gsap.fromTo(
              indexEl,
              { yPercent: -25 },
              {
                yPercent: -75,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );

            // Entrance — cards flip up from a 3D angle on desktop (alternating
            // sides), soft rise on mobile. Chips cascade in after.
            const from = {
              x: isDesktop ? (i % 2 === 0 ? -24 : 24) : 0,
              rotationY: isDesktop ? (i % 2 === 0 ? 6 : -6) : 0,
              y: 28,
              autoAlpha: 0,
            };
            const tl = gsap.timeline({
              scrollTrigger: { trigger: card, start: "top 78%" },
            });
            tl.fromTo(
              card,
              from,
              {
                x: 0,
                rotationY: 0,
                y: 0,
                autoAlpha: 1,
                duration: 0.9,
                ease: "power3.out",
                transformPerspective: 1200,
              },
              0
            ).fromTo(
              chips,
              { autoAlpha: 0, y: 12 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.35,
                ease: "power3.out",
                stagger: 0.04,
              },
              "-=0.5"
            );

            // Desktop micro-interactions: cursor 3D tilt (quickTo) + glare
            // sweep. Applied to the inner wrapper so they never fight the
            // entrance tween on the card. transformPerspective gives the tilt
            // real depth (a CSS `perspective` on the element itself would only
            // affect its children, not its own rotation).
            if (isDesktop) {
              // Persist the perspective on the inner wrapper so the tilt has
              // real depth from the very first frame — no jump when a quickTo
              // tween starts, and it stays consistent while the cursor moves.
              gsap.set(inner, { transformPerspective: 1200 });

              // Agile follow: short duration so the card tracks the cursor
              // almost 1:1. A long duration makes the tilt lag behind the
              // pointer and read as floating/rubbery — the "brusco" feel.
              const rX = gsap.quickTo(inner, "rotationX", {
                duration: 0.3,
                ease: "power3.out",
                transformPerspective: 1200,
              });
              const rY = gsap.quickTo(inner, "rotationY", {
                duration: 0.3,
                ease: "power3.out",
                transformPerspective: 1200,
              });
              const glare = card.querySelector(".exp-glare");

              const onMove = (e) => {
                const rect = card.getBoundingClientRect();
                const px = (e.clientX - rect.left) / rect.width - 0.5;
                const py = (e.clientY - rect.top) / rect.height - 0.5;
                rY(px * 6);
                rX(-py * 6);
                // Spotlight follows the cursor; opacity is toggled via the CSS
                // class so the fade is a plain transition, never a tween that
                // could clash with the tilt transforms.
                glare.style.setProperty("--mx", `${e.clientX - rect.left}px`);
                glare.style.setProperty("--my", `${e.clientY - rect.top}px`);
              };
              const onEnter = () => glare.classList.add("is-visible");
              const onLeave = () => {
                rX(0);
                rY(0);
                glare.classList.remove("is-visible");
              };

              card.addEventListener("mousemove", onMove);
              card.addEventListener("mouseenter", onEnter);
              card.addEventListener("mouseleave", onLeave);
              listenerCleanups.push(() => {
                card.removeEventListener("mousemove", onMove);
                card.removeEventListener("mouseenter", onEnter);
                card.removeEventListener("mouseleave", onLeave);
                rX.tween && rX.tween.kill();
                rY.tween && rY.tween.kill();
              });
            }
          });

          // Custom cleanup: raw DOM listeners + lazily-created quickTo tweens
          // aren't recorded by the context, so remove/kill them when the
          // conditions stop matching (breakpoint cross, reduced-motion toggle)
          // or when the component unmounts.
          return () => {
            listenerCleanups.forEach((cleanup) => cleanup());
            listenerCleanups.length = 0;
          };
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="experiencia"
      className="relative overflow-hidden py-28 lg:py-36"
    >
      {/* Section Header — full-width, left-padded */}
      <div className="section-header mb-16 px-8 lg:mb-20 lg:px-16">
        <span className="mb-3 block text-[11px] font-medium tracking-[0.15em] text-white/30 uppercase">
          Trayectoria
        </span>
        <h2 className="text-[clamp(1.8rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white">
          Experiencia
        </h2>
        <div className="mt-4 h-px w-16 bg-white/10" />
      </div>

      {/* Timeline */}
      <div className="experience-list relative px-8 lg:px-16">
        {/* Rail — baseline + progress that paints with scroll */}
        <div className="pointer-events-none absolute bottom-0 left-8 top-0 w-px bg-white/[0.05] lg:left-16">
          <div className="timeline-progress h-full w-full origin-top bg-gradient-to-b from-white/70 via-white/25 to-transparent" />
        </div>

        {EXPERIENCES.map((experience, index) => (
          <article
            key={index}
            className="exp-card relative border-b border-white/[0.04] pl-12 pb-14 pt-2 lg:pl-20 lg:pb-20 lg:pt-4"
          >
            {/* Node on the rail */}
            <span className="exp-dot absolute top-8 left-[calc(2rem_-_0.25rem)] h-2 w-2 rounded-full bg-white/35 lg:top-12 lg:left-[calc(4rem_-_0.25rem)]">
              <span className="exp-dot-halo absolute inset-0 rounded-full bg-white/70 opacity-0 blur-[5px]" />
            </span>

            {/* Giant index — depth layer behind the content */}
            <span
              className="exp-index pointer-events-none absolute right-0 top-1/2 select-none text-[clamp(5rem,14vw,180px)] font-bold leading-none text-white/[0.02]"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* 3D wrapper — receives the cursor tilt on desktop */}
            <div className="exp-inner relative">
              {/* Cursor spotlight — clipped to the card, overlays the content
                  like light on glass (gradient + --mx/--my driven from JS) */}
              <div className="exp-glare pointer-events-none absolute inset-0 z-20 rounded-xl" />

              {/* Content grid */}
              <div className="relative z-10 grid grid-cols-1 gap-4 lg:grid-cols-[120px_1fr_auto] lg:gap-8">
                {/* Col 1: Year */}
                <div className="lg:pt-1">
                  <span className="text-[11px] font-medium tracking-[0.15em] text-white/20 uppercase">
                    {experience.year}
                  </span>
                </div>

                {/* Col 2: Role + company + description */}
                <div>
                  <h3 className="text-xl font-semibold text-white lg:text-2xl">
                    {experience.role}
                  </h3>
                  <p className="mt-0.5 text-sm text-white/40">
                    {experience.company}
                  </p>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/40">
                    {experience.description}
                  </p>
                </div>

                {/* Col 3: Tech tags — right-aligned on desktop */}
                <div className="flex flex-wrap gap-2 lg:justify-end lg:content-start">
                  {experience.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="exp-chip border border-white/5 bg-white/[0.02] px-3 py-1 text-[10px] font-medium tracking-[0.05em] text-white/35 uppercase transition-colors duration-300 hover:border-white/15 hover:text-white/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Experience;
