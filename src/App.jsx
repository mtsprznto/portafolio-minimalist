import { Component, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

const Experience = lazy(() => import("./components/Experience"));
const Projects = lazy(() => import("./components/Projects"));
const Technologies = lazy(() => import("./components/Technologies"));
const Contact = lazy(() => import("./components/Contact"));

const SectionFallback = () => (
  <div className="flex h-screen items-center justify-center">
    <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-white" />
  </div>
);

// Catches a failed lazy chunk (network drop / cache eviction) so one section
// can't unmount the whole app. A failed dynamic import stays rejected in the
// module cache, so the only reliable retry is a fresh page load.
class SectionBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("[SectionBoundary]", error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <section className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-8 py-24 text-center">
          <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/30">
            Sección temporalmente no disponible
          </span>
          <p className="max-w-sm text-sm leading-relaxed text-white/40">
            Ocurrió un error al cargar esta sección. Recargá la página para
            intentarlo de nuevo.
          </p>
          <button
            type="button"
            onClick={this.handleRetry}
            className="mt-2 inline-flex items-center gap-2 border border-white/[0.06] bg-[#1A1A1A] px-5 py-2 text-[11px] font-medium uppercase tracking-[0.12em] text-white/70 transition-all duration-300 hover:border-white/20 hover:text-white active:scale-[0.98]"
          >
            Reintentar
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}

const App = () => {
  return (
    <div className="relative min-h-screen bg-[#0A0A0A]">
      {/* Background grid subtle */}
      <div className="pointer-events-none fixed inset-0 bg-grid" />

      {/* Radial glow top-right */}
      <div className="pointer-events-none fixed -right-48 -top-48 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle_400px_at_50%_50%,rgba(255,255,255,0.03),transparent)]" />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main className="relative z-10">
        <Hero />

        <SectionBoundary>
          <Suspense fallback={<SectionFallback />}>
            <Experience />
          </Suspense>
        </SectionBoundary>

        <SectionBoundary>
          <Suspense fallback={<SectionFallback />}>
            <Projects />
          </Suspense>
        </SectionBoundary>

        <SectionBoundary>
          <Suspense fallback={<SectionFallback />}>
            <Technologies />
          </Suspense>
        </SectionBoundary>

        <SectionBoundary>
          <Suspense fallback={<SectionFallback />}>
            <Contact />
          </Suspense>
        </SectionBoundary>
      </main>
    </div>
  );
};

export default App;
