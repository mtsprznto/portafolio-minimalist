// src/hooks/useProjects.ts
import { useEffect, useState } from "react";

export interface Proyecto {
  titulo: string;
  descripcion: string;
  fecha: string;
  url: string;
  lenguaje: string;
  lenguajes_completos: Record<string, number>;
  topics: string[];
  sitio_web: string;
  repositorio: string;
}

const URL =
  "https://raw.githubusercontent.com/mtsprznto/auto_actualizar_cv/refs/heads/main/data/proyectos_combinados_all.json";

// Same JSON cached locally so the section paints instantly on repeat visits
// (and still renders content even if the network hiccups). It's a snapshot —
// the background refresh keeps it current.
const CACHE_KEY = "portfolio:proyectos:v1";
const FETCH_TIMEOUT = 10_000; // ms per attempt
const MAX_RETRIES = 2;

function readCache(): Proyecto[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Proyecto[]) : null;
  } catch {
    return null;
  }
}

export function useProjects() {
  const [initial] = useState(() => readCache());
  const [projects, setProjects] = useState<Proyecto[]>(initial ?? []);
  // Cached content means we can render immediately and refresh in the
  // background; otherwise we keep the spinner until the first fetch lands.
  const hasCached = initial !== null;
  const [loading, setLoading] = useState(!hasCached);
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    const timers: number[] = [];

    setLoading(!hasCached);

    const load = async (attempt = 0) => {
      const controller = new AbortController();
      // Guard against a hanging request (slow/flaky GitHub raw) — the fetch
      // that "never comes back" left the section stuck on its spinner.
      const timer = window.setTimeout(() => controller.abort(), FETCH_TIMEOUT);

      try {
        const res = await fetch(URL, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!active) return;

        const list = Array.isArray(data) ? (data as Proyecto[]) : [];
        setProjects(list);
        setError(false);
        if (list.length) {
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(list));
          } catch {
            /* storage unavailable — non-fatal */
          }
        }
      } catch {
        if (!active) return;
        if (attempt < MAX_RETRIES) {
          const retry = window.setTimeout(
            () => load(attempt + 1),
            800 * (attempt + 1)
          );
          timers.push(retry);
          return;
        }
        setError(true);
      } finally {
        window.clearTimeout(timer);
      }

      if (active) setLoading(false);
    };

    load(0);

    return () => {
      active = false;
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [reloadKey, hasCached]);

  return {
    projects,
    loading,
    error,
    reload: () => setReloadKey((k) => k + 1),
  };
}
