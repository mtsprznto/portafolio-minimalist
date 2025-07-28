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

export function useProjects() {
    const [projects, setProjects] = useState<Proyecto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://raw.githubusercontent.com/mtsprznto/auto_actualizar_cv/refs/heads/main/data/proyectos_combinados_all.json")
            .then(res => res.json())
            .then(data => {
                setProjects(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error al cargar proyectos", err);
                setLoading(false);
            });
    }, []);

    return { projects, loading };
}

