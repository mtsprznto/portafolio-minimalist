import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { useProjects } from "../hooks/useProjects";
import {
  gsap,
  useGSAP,
  staggerReveal,
  NO_PREFER_REDUCED_MOTION,
} from "../lib/gsap";

const PREVIEW_BASE =
  "https://raw.githubusercontent.com/mtsprznto/auto_actualizar_cv/refs/heads/main/api/static/previews";

// Repos with a live screenshot in the preview folder (HTTP 200 verified
// 2026-08-09). Kept as a static set — the preview folder is a deployment
// artifact, so a hardcoded allowlist is the cheapest source of truth. The
// curated scene only features repos that will actually show a preview; the
// placeholder-behind design still catches a 404 gracefully if one ever dies.
const PREVIEW_REPOS = new Set([
  "auto_actualizar_cv",
  "portafolio-minimalist",
  "cabanaspv",
  "CoffeDream",
  "landing-react",
  "landing-banco",
  "chat-bot",
  "api_bot_bd",
  "bot_telegram",
  "landing-moderna-docker",
  "link_bio",
  "radio-esquivo",
]);

// The horizontal scene is pinned for the entire width of the track, so it is
// capped to a curated set: 6 slides ≈ 1.8 viewport-widths of scroll (a ~3-screen
// pin total — anything longer reads as an endless "giant scroll" error). The
// full list is available via the mobile pagination and the GitHub "todos" link.
const FEATURED_COUNT = 6;

// Mobile shows a compact page of cards instead of the full archive.
const MOBILE_PER_PAGE = 5;

const Projects = () => {
  const { projects, loading, error, reload } = useProjects();
  const sectionRef = useRef(null);
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(projects.length / MOBILE_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const mobileProjects = projects.slice(
    (currentPage - 1) * MOBILE_PER_PAGE,
    currentPage * MOBILE_PER_PAGE
  );
  // Re-runs the mobile card reveal only when the visible set actually changes
  // (page switch, or a data refresh that alters the list).
  const mobileCardsKey = mobileProjects
    .map((p) => p.repositorio ?? "")
    .join("|");

  // Fresh dataset → back to the first page.
  useEffect(() => {
    setPage(1);
  }, [projects]);

  // Dataset shrunk while on a deep page → clamp.
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const mobileListRef = useRef(null);

  // Slides the current page out, swaps the data, and lets the stagger reveal
  // (re-created by the page-aware useGSAP) bring the new cards in. Reduced
  // motion swaps instantly.
  const goToPage = (next) => {
    const target = Math.min(Math.max(1, next), totalPages);
    if (target === currentPage) return;

    const list = mobileListRef.current;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!list || reduced) {
      setPage(target);
      return;
    }

    gsap.to(list, {
      autoAlpha: 0,
      y: -18,
      duration: 0.22,
      ease: "power1.in",
      onComplete: () => {
        gsap.set(list, { autoAlpha: 1, y: 0 });
        setPage(target);
      },
    });
  };

  useGSAP(
    () => {
      const q = gsap.utils.selector(sectionRef.current);

      gsap.matchMedia().add(NO_PREFER_REDUCED_MOTION, () => {
        // ── Mobile (< 1024px): header reveal only. The cards + Ken Burns
        //    scrub live in a page-aware useGSAP below so they re-create on
        //    every pagination switch. ──
        gsap.matchMedia().add("(max-width: 1023px)", () => {
          staggerReveal(q(".section-header"), {
            trigger: sectionRef.current,
            start: "top 85%",
            y: 24,
            stagger: 0,
            duration: 0.8,
          });
        });

        // ── Desktop (>= 1024px): pinned horizontal scene ──
        gsap.matchMedia().add("(min-width: 1024px)", () => {
          staggerReveal(q(".section-header"), {
            trigger: sectionRef.current,
            start: "top 92%",
            y: 24,
            stagger: 0,
            duration: 0.8,
          });

          const slides = q(".project-slide");
          const track = q(".projects-track")[0];
          if (!track || !slides.length) return;

          const getAmount = () =>
            Math.max(0, track.scrollWidth - window.innerWidth);

          const horizontalTween = gsap.to(track, {
            x: () => -getAmount(),
            ease: "none",
            willChange: "transform",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => "+=" + getAmount(),
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                sectionRef.current.style.setProperty(
                  "--projects-progress",
                  self.progress
                );
                const total = slides.length;
                const counter = q(".projects-counter")[0];
                if (counter) {
                  const current = Math.min(
                    total,
                    Math.max(1, Math.round(self.progress * (total - 1)) + 1)
                  );
                  counter.textContent = `${String(current).padStart(
                    2,
                    "0"
                  )} / ${String(total).padStart(2, "0")}`;
                }
              },
            },
          });

          // Each slide fades/slides in as it enters the horizontal viewport
          // (containerAnimation links these triggers to the vertical scrub).
          slides.forEach((slide, i) => {
            // The first two slides are already inside the viewport when the
            // pin starts — start them visible so the section never looks empty
            // ("disappeared") on arrival. The rest fade in as they enter.
            const startsVisible = i < 2;
            gsap.fromTo(
              slide,
              {
                xPercent: startsVisible ? 0 : 14,
                autoAlpha: startsVisible ? 1 : 0,
              },
              {
                xPercent: 0,
                autoAlpha: 1,
                ease: "none",
                duration: 1,
                scrollTrigger: {
                  trigger: slide,
                  containerAnimation: horizontalTween,
                  start: "left 96%",
                  toggleActions: "play none none reverse",
                },
              }
            );

            const media = slide.querySelector(".project-media");
            if (media) {
              gsap.fromTo(
                media,
                { scale: 1.16 },
                {
                  scale: 1.05,
                  ease: "none",
                  duration: 1.6,
                  scrollTrigger: {
                    trigger: slide,
                    containerAnimation: horizontalTween,
                    start: "left 96%",
                    end: "left 20%",
                    scrub: true,
                  },
                }
              );
            }
          });
        });
      });
    },
    { scope: sectionRef, dependencies: [projects, loading] }
  );

  // Mobile cards: re-created whenever the visible page changes so the reveal
  // stagger + Ken Burns scrub always target the current set. useGSAP reverts
  // the previous context on dependency change, killing stale ScrollTriggers.
  useGSAP(
    () => {
      const q = gsap.utils.selector(sectionRef.current);
      const cards = q(".project-card");
      if (!cards.length) return;

      gsap.matchMedia().add(NO_PREFER_REDUCED_MOTION, () => {
        gsap.matchMedia().add("(max-width: 1023px)", () => {
          staggerReveal(cards, {
            trigger: q(".project-cards")[0],
            start: "top 78%",
            y: 40,
            stagger: 0.12,
          });

          // Cinematic Ken Burns per card, scrub-linked to vertical scroll.
          cards.forEach((card) => {
            const media = card.querySelector(".project-media");
            if (media) {
              gsap.fromTo(
                media,
                { scale: 1.12 },
                {
                  scale: 1.04,
                  ease: "none",
                  scrollTrigger: {
                    trigger: card,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                  },
                }
              );
            }
          });
        });
      });
    },
    { scope: sectionRef, dependencies: [mobileCardsKey, projects, loading] }
  );

  if (loading) {
    return (
      <section
        ref={sectionRef}
        id="proyectos"
        className="flex min-h-[70vh] items-center justify-center"
      >
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </section>
    );
  }

  if (!projects.length) {
    return (
      <section
        ref={sectionRef}
        id="proyectos"
        className="relative py-28 lg:py-36"
      >
        <div className="px-8 lg:px-16">
          <span className="mb-3 block text-[11px] font-medium uppercase tracking-[0.15em] text-white/30">
            Trabajos
          </span>
          <h2 className="text-[clamp(1.8rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white">
            Proyectos
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/40">
            {error
              ? "No se pudieron cargar los proyectos desde GitHub."
              : "Todavía no hay proyectos publicados."}
          </p>
          {error && (
            <button
              type="button"
              onClick={reload}
              className="mt-6 inline-flex items-center gap-2 border border-white/[0.06] bg-[#1A1A1A] px-5 py-2 text-[11px] font-medium uppercase tracking-[0.12em] text-white/70 transition-all duration-300 hover:border-white/20 hover:text-white active:scale-[0.98]"
            >
              Reintentar
            </button>
          )}
        </div>
      </section>
    );
  }

  const previewSrc = (project) =>
    `${PREVIEW_BASE}/${project.repositorio}.png`;

  // Desktop horizontal scene is curated: only repos with a real preview make
  // the cut, in JSON order. Mobile keeps the full archive (with placeholders).
  const featured = projects
    .filter((p) => PREVIEW_REPOS.has(p.repositorio))
    .slice(0, FEATURED_COUNT);

  const renderMedia = (project, index, eager = false) => (
    <div className="project-media absolute inset-0 overflow-hidden bg-[#101010]">
      {/* Designed placeholder — always rendered behind the preview. A missing
          preview simply never fades in, so there is no src-swap/abort dance
          and no white flash (27/39 repos have no screenshot). */}
      <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(120%_120%_at_50%_0%,#1c1c1c_0%,#101010_55%,#0a0a0a_100%)]">
        <img
          src="/default-cv.svg"
          alt=""
          aria-hidden="true"
          draggable={false}
          className="h-12 w-12 opacity-[0.16]"
        />
      </div>
      <img
        src={previewSrc(project)}
        alt={`Preview de ${project.titulo}`}
        // The pinned scene is viewed slide-by-slide, so its 6 previews are
        // always loaded up front. The mobile archive stays lazy (39 images,
        // most below the fold; eager would also break Chromium's ~3000px
        // lazy threshold for the far end of the horizontal track).
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
        fetchPriority={index < 3 ? "high" : "low"}
        onLoad={(e) => e.currentTarget.classList.add("preview-loaded")}
        className="preview-img h-full w-full object-cover"
      />
    </div>
  );

  const renderContent = (project) => {
    const description =
      project.descripcion === "None" ? "" : project.descripcion;
    return (
      <>
        {/* Cinematic gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/5" />

        {/* Content overlay — bottom-left */}
        <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
          <span className="mb-2 block text-[10px] font-medium uppercase tracking-[0.15em] text-white/40">
            {project.fecha}
          </span>

          <h3 className="text-xl font-bold uppercase tracking-[0.05em] text-white lg:text-2xl">
            {project.titulo}
          </h3>

          {description && (
            <p className="mt-2 line-clamp-2 max-w-md text-[13px] leading-relaxed text-white/45">
              {description}
            </p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Código fuente de ${project.titulo}`}
              className="inline-flex items-center gap-2 border border-white/[0.06] bg-[#1A1A1A] px-5 py-2 text-[11px] font-medium uppercase tracking-[0.12em] text-white/70 transition-all duration-300 hover:border-white/20 hover:text-white active:scale-[0.98]"
            >
              <FaGithub size={12} />
              VER PROYECTO
            </a>

            {project.sitio_web && (
              <a
                href={project.sitio_web}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Demo de ${project.titulo}`}
                className="inline-flex items-center gap-2 border border-white/[0.04] px-5 py-2 text-[11px] font-medium uppercase tracking-[0.12em] text-white/40 transition-all duration-300 hover:border-white/15 hover:text-white/70 active:scale-[0.98]"
              >
                <FiExternalLink size={12} />
                DEMO
              </a>
            )}
          </div>
        </div>
      </>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="proyectos"
      className="projects-section relative z-10 h-auto overflow-hidden bg-bg-primary pt-24 pb-14 lg:h-screen lg:pb-0"
    >
      <div className="projects-stage mx-auto flex w-full max-w-[1600px] flex-col justify-end px-6 lg:h-full lg:px-10 lg:pb-14">
        {/* Section Header + counter */}
        <div className="section-header flex items-end justify-between gap-6">
          <div>
            <span className="mb-3 block text-[11px] font-medium uppercase tracking-[0.15em] text-white/30">
              Trabajos
            </span>
            <h2 className="text-[clamp(1.8rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white">
              Proyectos
            </h2>
            <div className="mt-4 h-px w-16 bg-white/10" />
          </div>

          <div className="hidden flex-col items-end gap-3 lg:flex">
            <p className="projects-counter pb-1 text-[11px] font-medium uppercase tracking-[0.2em] text-white/30 tabular-nums">
              {String(1).padStart(2, "0")} /{" "}
              {String(featured.length).padStart(2, "0")}
            </p>
            <a
              href="https://github.com/mtsprznto"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/30 transition-colors duration-300 hover:text-white"
            >
              Ver todos →
            </a>
          </div>
        </div>

        {/* Desktop — pinned horizontal scene */}
        <div className="projects-viewport mt-12 hidden overflow-hidden lg:mt-16 lg:block">
          <div className="projects-track flex items-end">
            {featured.map((project, index) => {
              const even = index % 2 === 0;
              return (
                <article
                  key={project.repositorio || index}
                  className={`project-slide relative shrink-0 overflow-hidden border border-white/[0.06] bg-bg-elevated ${
                    even
                      ? "h-[52vh] w-[82vw] lg:h-[58vh] lg:w-[54vw]"
                      : "mb-10 h-[44vh] w-[74vw] lg:mb-14 lg:h-[48vh] lg:w-[40vw]"
                  }`}
                >
                  {renderMedia(project, index, true)}
                  {renderContent(project)}
                </article>
              );
            })}
          </div>
        </div>

        {/* Mobile — stacked editorial cards, one page at a time */}
        <div
          ref={mobileListRef}
          className="project-cards mt-12 space-y-14 lg:hidden"
        >
          {mobileProjects.map((project, index) => (
            <article
              key={project.repositorio || index}
              className="project-card relative min-h-[52vh] overflow-hidden border border-white/[0.06] bg-bg-elevated"
            >
              {renderMedia(project, index)}
              {renderContent(project)}
            </article>
          ))}
        </div>

        {/* Mobile — pagination */}
        {totalPages > 1 && (
          <nav
            aria-label="Paginación de proyectos"
            className="mt-12 flex items-center justify-between gap-4 lg:hidden"
          >
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Proyectos anteriores"
              className="inline-flex items-center gap-2 border border-white/[0.06] bg-[#1A1A1A] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.12em] text-white/70 transition-all duration-300 hover:border-white/20 hover:text-white disabled:pointer-events-none disabled:opacity-30 active:scale-[0.98]"
            >
              <FaChevronLeft size={10} />
              Anterior
            </button>

            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/30 tabular-nums">
              {String(currentPage).padStart(2, "0")} /{" "}
              {String(totalPages).padStart(2, "0")}
            </span>

            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Proyectos siguientes"
              className="inline-flex items-center gap-2 border border-white/[0.06] bg-[#1A1A1A] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.12em] text-white/70 transition-all duration-300 hover:border-white/20 hover:text-white disabled:pointer-events-none disabled:opacity-30 active:scale-[0.98]"
            >
              Siguiente
              <FaChevronRight size={10} />
            </button>
          </nav>
        )}
      </div>

      {/* Progress rail — desktop only */}
      <div className="projects-progress absolute inset-x-0 bottom-0 hidden lg:block">
        <div className="relative mx-auto h-px w-full max-w-[1600px] bg-white/[0.06]">
          <div
            className="projects-progress-fill absolute inset-0 origin-left bg-white/40"
            style={{ transform: "scaleX(var(--projects-progress, 0))" }}
          />
        </div>
      </div>
    </section>
  );
};

export default Projects;
