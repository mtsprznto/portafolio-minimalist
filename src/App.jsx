import { lazy, Suspense } from "react";
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

        <Suspense fallback={<SectionFallback />}>
          <Experience />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Technologies />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>
    </div>
  );
};

export default App;
