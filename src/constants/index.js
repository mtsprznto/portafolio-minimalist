import demo3_academ from "../assets/projects/demo3_academ.png";
import demo5_coffedream from "../assets/projects/demo5_coffe.png";
import demo6_bankco_beta from "../assets/projects/demo6_bankco_beta.png";


export const HERO_CONTENT = `Fullstack & AI Engineer especializado en el diseño de arquitecturas escalables, sistemas distribuidos de baja latencia y automatizaciones avanzadas. Con experiencia liderando el desarrollo de plataformas SaaS, optimización de motores ETL masivos con IA e interfaces interactivas de alto rendimiento. Mi enfoque combina la rigurosidad del código limpio con soluciones en la nube robustas, seguras y orientadas a resolver desafíos críticos de negocio.`;


export const ABOUT_TEXT = `Soy un desarrollador full stack dedicado y versátil con pasión por crear aplicaciones web eficientes y fáciles de usar. Con 5 años de experiencia profesional, he trabajado con una variedad de tecnologías, incluyendo React, Next.js, Node.js, MySQL, PostgreSQL y MongoDB. Mi camino en el desarrollo web comenzó con una profunda curiosidad por entender cómo funcionan las cosas y ha evolucionado en una carrera en la que busco aprender y adaptarme continuamente a nuevos desafíos. Disfruto trabajar en entornos colaborativos y resolver problemas complejos para ofrecer soluciones de alta calidad. Fuera del mundo del código, me gusta mantenerme activo, explorar nuevas tecnologías y contribuir a proyectos de código abierto.`;

export const PROJECTS = [
  {
    title: "Automatizaciones",
    image: "",
    date: "2025-06-30",
    lenguajes_utilizados: { 'Python': 99.01, 'Batchfile': 0.99 },
    topics: ["automation", "python", "scraping"],
    description: "Este repositorio contiene una colección de proyectos de automatización y scraping desarrollados en Python. Cada proyecto está diseñado para optimizar procesos específicos y extraer datos de manera eficiente.",
    technologies: ["Python", "Batchfile"],
    url_demo: "",
    url_codigo: "https://github.com/mtsprznto/Automatizaciones"
  },
  {
    title: "Academ Prod",
    image: demo3_academ,
    date: "2025-06-30",
    lenguajes_utilizados: { 'TypeScript': 98.13, 'CSS': 1.69, 'JavaScript': 0.18 },
    topics: ["fulls", "fullstack", "nextjs"],
    description: "Academ. plataforma es un entorno amigable para compartir conocimiento y aprender de manera organizada. Los usuarios pueden registrarse y acceder a diversas funcionalidades dependiendo de su rol dentro del sistema",
    technologies: ["TypeScript", "CSS", "JavaScript"],
    url_demo: "https://academ-prod.vercel.app",
    url_codigo: "https://github.com/mtsprznto/academ-prod"
  },
  {
    title: "Auto Actualizar Cv",
    image: null,
    date: "2025-06-30",
    lenguajes_utilizados: { 'Python': 100.0 },
    topics: [],
    description: "Una aplicación en Python que automatiza la actualización de tu CV con información de tus repositorios de GitHub.",
    technologies: ["Python"],
    url_demo: "",
    url_codigo: "https://github.com/mtsprznto/auto_actualizar_cv"
  },
  {
    title: "Scanndata ",
    image: null,
    date: "2025-06-30",
    lenguajes_utilizados: { 'Python': 97.44, 'HTML': 2.13, 'Inno Setup': 0.43 },
    topics: ["flet", "flutter", "python"],
    description: "ScannData mantener organizada la información de boletas y facturas. Nuestra aplicación está diseñada para automatizar el escaneo de documentos PDF y la conversión de imágenes a texto, facilitando la gestión de tus documentos.",
    technologies: ["Python", "HTML", "Inno Setup"],
    url_demo: "",
    url_codigo: "https://github.com/mtsprznto/scanndata-"
  },
  {
    title: "Ecommerce Coffe",
    image: demo5_coffedream,
    date: "2025-06-29",
    lenguajes_utilizados: { 'TypeScript': 88.53, 'JavaScript': 7.44, 'CSS': 4.03 },
    topics: [],
    description: "Bienvenido a CoffeeDream, una plataforma de comercio electrónico especializada en la venta de granos de café de alta calidad. Este proyecto demuestra una aplicación full stack moderna con despliegue continuo.",
    technologies: ["TypeScript", "JavaScript", "CSS"],
    url_demo: "https://coffedream.vercel.app",
    url_codigo: "https://github.com/mtsprznto/ecommerce-coffe"
  },
  {
    title: "Ges Inventario",
    image: null,
    date: "2025-06-29",
    lenguajes_utilizados: { 'JavaScript': 98.82, 'CSS': 0.64, 'HTML': 0.55 },
    topics: [],
    description: "Sistema de gestión de inventario moderno y escalable desarrollado con React, Vite y Supabase. Esta aplicación permite a las empresas gestionar su inventario, usuarios y configuraciones de manera eficiente.",
    technologies: ["JavaScript", "CSS", "HTML"],
    url_demo: "",
    url_codigo: "https://github.com/mtsprznto/ges-inventario"
  },
  {
    title: "Landing Banco",
    image: demo6_bankco_beta,
    date: "2025-06-29",
    lenguajes_utilizados: { 'TypeScript': 89.92, 'CSS': 8.47, 'JavaScript': 1.61 },
    topics: [],
    description: "Bienvenido al repositorio de la landing page de nuestro banco. Este proyecto ha sido desarrollado con Next.js 14, ofreciendo un rendimiento óptimo y una excelente experiencia de usuario.",
    technologies: ["TypeScript", "CSS", "JavaScript"],
    url_demo: "https://bankco-beta.vercel.app",
    url_codigo: "https://github.com/mtsprznto/landing-banco"
  },
  {
    title: "Sis Ges Med",
    image: null,
    date: "2025-06-29",
    lenguajes_utilizados: { 'JavaScript': 91.21, 'CSS': 5.91, 'Blade': 1.92, 'PHP': 0.97, 'SCSS': 0.0 },
    topics: [],
    description: "Sistema integral de gestión de citas médicas diseñado para clínicas y consultorios médicos. Facilita la administración de pacientes, doctores, citas y servicios médicos con un panel de control intuitivo y roles de acceso personalizados.",
    technologies: ["JavaScript", "CSS", "Blade", "PHP", "SCSS"],
    url_demo: "",
    url_codigo: "https://github.com/mtsprznto/sis_ges_med"
  },
];






export const EXPERIENCES = [
  {
    year: "2026 - Presente",
    role: "Lead Fullstack Developer",
    company: "Blast-Up",
    description: `Liderazgo técnico en una plataforma SaaS para ingeniería de minas, desarrollando un simulador de vibraciones geomecánicas en tiempo real. Diseñé visualizaciones 3D complejas utilizando React Three Fiber y mapeo geoespacial interactivo con Leaflet. Coordiné la arquitectura completa del sistema integrando seguridad avanzada con Next-Auth, persistencia robusta con Prisma/PostgreSQL y la automatización de procesamiento de infraestructura multimedia optimizada en nubes AWS.`,
    technologies: ["Next.js", "React 19", "TypeScript", "Three.js", "Prisma", "PostgreSQL", "AWS S3", "Vitest", "Tailwind CSS"],
  },
  {
    year: "2026 - Junio 2026",
    role: "Fullstack AI Engineer / Developer",
    company: "Jurispeed",
    description: `Implementación del ciclo de vida de datos para un ecosistema de IA legal. Desarrollé un motor ETL masivo en Python para la ingesta e indexación de más de 600k sentencias judiciales bajo una arquitectura RAG. Responsable del desarrollo evolutivo de un chatbot especializado (Vue 3 / FastAPI), optimizando la recuperación semántica y la interfaz de usuario. Implementé sistemas de scraping distribuido y resiliente con Scrapy y Playwright para la extracción automatizada de datos públicos.`,
    technologies: ["Python", "FastAPI", "Vue 3", "TypeScript", "DynamoDB", "Redis", "RAG", "Docker", "Playwright", "Clerk"],
  },
];



export const CONTACT = {
  address: "Puerto Varas",
  email: "contacto@mtsprz.org",
};