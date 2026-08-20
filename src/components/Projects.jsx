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

// The horizontal scene is pinned for the entire width of the track. Each slide
// is a full viewport-width screen (100vw, true full-bleed), so 6 slides drive
// ~5 viewport-heights of scroll. That pacing is deliberate full-screen
// storytelling; the ScrollTrigger snap locks each slide into place so it never
// reads as an endless "giant scroll". The full archive lives in the mobile
// pagination and the GitHub "todos" link.
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

  // Stable key for the desktop featured set — changes only when the actual
  // repos in the horizontal scene change, not on every background fetch that
  // returns the same data.
  const featuredKey = projects
    .filter((p) => PREVIEW_REPOS.has(p.repositorio))
    .slice(0, FEATURED_COUNT)
    .map((p) => p.repositorio)
    .join(",");

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
              snap: {
                // Full-bleed slides snap into place: one snap per slide gap.
                snapTo: 1 / (slides.length - 1),
                duration: { min: 0.2, max: 0.5 },
                ease: "power1.inOut",
                delay: 0.1,
              },
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
                xPercent: startsVisible ? 0 : 8,
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
                  start: "left 100%",
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
                    start: "left 100%",
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
    { scope: sectionRef, dependencies: [featuredKey, loading] }
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
    { scope: sectionRef, dependencies: [mobileCardsKey, loading] }
  );

  if (loading) {
    return (
      <section
        ref={sectionRef}
        id="proyectos"
        className="flex min-h-[70vh] items-center justify-center"
      >
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-400/20 border-t-emerald-400" />
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
          <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-300/60">
            02 // ARCHIVE_INDEX
          </span>
          <h2 className="text-[clamp(1.8rem,4vw,3.5rem)] font-bold uppercase leading-[1.05] tracking-[-0.02em] text-white">
            Proyectos
          </h2>
          <p className="mt-6 max-w-md font-mono text-sm leading-relaxed text-white/40">
            {error
              ? "> error: no se pudieron cargar los proyectos desde GitHub."
              : "> sin registros publicados."}
          </p>
          {error && (
            <button
              type="button"
              onClick={reload}
              className="mt-6 inline-flex items-center gap-2 border border-emerald-400/30 bg-emerald-400/[0.06] px-5 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-emerald-300 transition-all duration-300 hover:bg-emerald-400/10 hover:text-emerald-200 active:scale-[0.98]"
            >
              [ REINTENTAR ]
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
    <div className="project-media absolute inset-0 overflow-hidden bg-[#0a0f0c]">
      {/* Designed placeholder — always rendered behind the preview. A missing
          preview simply never fades in, so there is no src-swap/abort dance
          and no white flash (27/39 repos have no screenshot). */}
      <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(120%_120%_at_50%_0%,#101b14_0%,#0a100c_55%,#050806_100%)]">
        <img
          src="/default-cv.svg"
          alt=""
          aria-hidden="true"
          draggable={false}
          className="h-12 w-12 opacity-[0.14]"
        />
      </div>
      <img
        src={previewSrc(project)}
        alt={`Preview de ${project.titulo}`}
        // The pinned scene is viewed slide-by-slide, so its previews are
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
    const topics = (project.topics ?? []).slice(0, 4);
    const status = project.sitio_web ? "LIVE" : "SOURCE";
    return (
      <>
        {/* Tech-archive grid trace + scanline sweep (decorative) */}
        <div className="bg-grid-tech pointer-events-none absolute inset-0" />
        <div className="tech-scan pointer-events-none absolute inset-x-0 top-0 h-24" />

        {/* Cinematic gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/5" />

        {/* Terminal bar — repo id + status */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-4 px-6 pt-5 lg:px-12 lg:pt-7">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-300/70">
            <span className="text-white/30">REPO://</span>
            {project.repositorio}
          </span>
          <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-300/80">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                status === "LIVE"
                  ? "animate-pulse bg-emerald-400"
                  : "bg-white/25"
              }`}
              aria-hidden="true"
            />
            STATUS: {status}
          </span>
        </div>

        {/* Content overlay — bottom-left */}
        <div className="absolute inset-x-0 bottom-0 p-6 lg:p-12">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">
            <span className="text-emerald-300/70">//</span> {project.fecha}
            <span className="mx-3 text-white/15">·</span>
            {project.lenguaje || "—"}
          </p>

          <h3 className="max-w-3xl text-[clamp(1.9rem,4.5vw,4.2rem)] font-bold uppercase leading-[0.98] tracking-[-0.02em] text-white">
            {project.titulo}
          </h3>

          {description && (
            <p className="mt-4 line-clamp-2 max-w-xl text-[13px] leading-relaxed text-white/50 lg:text-sm">
              {description}
            </p>
          )}

          {topics.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {topics.map((t) => (
                <span
                  key={t}
                  className="border border-emerald-400/15 bg-emerald-400/[0.04] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] text-emerald-300/60"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Código fuente de ${project.titulo}`}
              className="inline-flex items-center gap-2 border border-emerald-400/30 bg-emerald-400/[0.06] px-5 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-emerald-300 transition-all duration-300 hover:bg-emerald-400/10 hover:text-emerald-200 active:scale-[0.98]"
            >
              <FaGithub size={12} />
              [ VER CÓDIGO ]
            </a>

            {project.sitio_web && (
              <a
                href={project.sitio_web}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Demo de ${project.titulo}`}
                className="inline-flex items-center gap-2 border border-white/[0.08] px-5 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-white/45 transition-all duration-300 hover:border-white/20 hover:text-white/70 active:scale-[0.98]"
              >
                <FiExternalLink size={12} />
                [ DEMO ]
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
      className="projects-section relative z-10 h-auto overflow-hidden bg-bg-primary pt-24 pb-14 lg:h-[100svh] lg:pb-0"
    >
      {/* Full-bleed stage: no max-width, no side gutters — the track spans 100vw */}
      <div className="projects-stage flex w-full flex-col justify-end lg:h-full">
        {/* Section Header + counter */}
        <div className="section-header flex items-end justify-between gap-6 px-6 lg:px-12 lg:pt-16">
          <div>
            <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-300/60">
              02 // ARCHIVE_INDEX
            </span>
            <h2 className="text-[clamp(1.8rem,4vw,3.5rem)] font-bold uppercase leading-[1.05] tracking-[-0.02em] text-white">
              Proyectos
            </h2>
            <div className="mt-4 flex items-center gap-2">
              <span className="h-px w-16 bg-emerald-400/50" />
              <span className="h-px w-8 bg-white/10" />
            </div>
          </div>

          <div className="hidden flex-col items-end gap-3 lg:flex">
            <p className="projects-counter pb-1 font-mono text-[11px] uppercase tracking-[0.25em] text-emerald-300/60 tabular-nums">
              {String(1).padStart(2, "0")} /{" "}
              {String(featured.length).padStart(2, "0")}
            </p>
            <a
              href="https://github.com/mtsprznto"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-300/50 transition-colors duration-300 hover:text-emerald-200"
            >
              VER TODOS →
            </a>
          </div>
        </div>

        {/* Desktop — pinned full-bleed scene (100vw slides) */}
        <div className="projects-viewport mt-8 hidden overflow-hidden lg:mt-6 lg:block lg:min-h-0 lg:flex-1">
          <div className="projects-track flex h-full items-stretch">
            {featured.map((project, index) => (
              <article
                key={project.repositorio || index}
                className="project-slide relative h-full w-screen shrink-0 overflow-hidden border-y border-white/[0.06] bg-bg-elevated"
              >
                {renderMedia(project, index, true)}
                {renderContent(project)}
              </article>
            ))}
          </div>
        </div>

        {/* Mobile — stacked full-bleed cards, one page at a time */}
        <div
          ref={mobileListRef}
          className="project-cards mt-10 space-y-12 lg:hidden"
        >
          {mobileProjects.map((project, index) => (
            <article
              key={project.repositorio || index}
              className="project-card relative min-h-[62vh] w-full overflow-hidden border-y border-white/[0.06] bg-bg-elevated"
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
            className="mt-10 flex items-center justify-between gap-4 px-6 lg:hidden"
          >
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Proyectos anteriores"
              className="inline-flex items-center gap-2 border border-white/[0.06] bg-[#121212] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-white/60 transition-all duration-300 hover:border-white/20 hover:text-white disabled:pointer-events-none disabled:opacity-30 active:scale-[0.98]"
            >
              <FaChevronLeft size={10} />
              [ Anterior ]
            </button>

            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-emerald-300/60 tabular-nums">
              {String(currentPage).padStart(2, "0")} /{" "}
              {String(totalPages).padStart(2, "0")}
            </span>

            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Proyectos siguientes"
              className="inline-flex items-center gap-2 border border-white/[0.06] bg-[#121212] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-white/60 transition-all duration-300 hover:border-white/20 hover:text-white disabled:pointer-events-none disabled:opacity-30 active:scale-[0.98]"
            >
              [ Siguiente ]
              <FaChevronRight size={10} />
            </button>
          </nav>
        )}
      </div>

      {/* Progress rail — desktop only, full width */}
      <div className="projects-progress absolute inset-x-0 bottom-0 hidden lg:block">
        <div className="relative h-px w-full bg-white/[0.06]">
          <div
            className="projects-progress-fill absolute inset-0 origin-left bg-emerald-400/60"
            style={{ transform: "scaleX(var(--projects-progress, 0))" }}
          />
        </div>
      </div>
    </section>
  );
};

export default Projects;
