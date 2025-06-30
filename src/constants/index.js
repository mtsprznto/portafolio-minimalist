import demo1_gestpass from "../assets/projects/demo1_gestpass.png";
import demo4_arriendopv from "../assets/projects/demo4_arriendopv.png";
import demo3_academ from "../assets/projects/demo3_academ.png";
import demo5_coffedream from "../assets/projects/demo5_coffe.png";
import demo6_bankco_beta from "../assets/projects/demo6_bankco_beta.png";
export const HERO_CONTENT = `Desarrollador de software con experiencia en Python, JavaScript, Next.js, PHP , SQL. Apasionado por crear soluciones eficientes, seguras y optimizadas, con enfoque en interfaces y mejores prácticas. Busco aportar en entornos dinámicos e innovadores.`;

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
    year: "2025 - Presente",
    role: "Desarrollador FullStack",
    company: "Gestpass S.A",
    description: `Desarrollé una aplicación de gestión de contraseñas siguiendo las mejores prácticas de seguridad y desarrollo, implementando el patrón MVC para una estructura modular y eficiente. La aplicación permite almacenar, gestionar y encriptar contraseñas de manera segura, además de generar claves robustas con caracteres especiales.
    Para su desarrollo, utilicé Next.js y React, junto con diversas bibliotecas especializadas en seguridad y criptografía, asegurando un sistema confiable y escalable. Este proyecto refleja mi experiencia en desarrollo web y optimización de código, priorizando seguridad y usabilidad.`,
    technologies: ["TypeScript", "JavaScript", "CSS", "React.js"],
  },
  {
    year: "2025 - Presente",
    role: "Desarrollador FullStack",
    company: "Academ S.A",
    description: `La plataforma está diseñada con una arquitectura modular, basada en Node.js, utilizando Next.js para el frontend y un backend optimizado con Prisma y PostgreSQL. Se ha integrado Stripe para la gestión de pagos y Clerk para la autenticación de usuarios.`,
    technologies: ["Next.js", "React", "TailwindCSS", "ShadCN UI", "Node.js", "Prisma ORM", "PostgreSQL (Neon)", "Clerk", "Stripe", "Neon.tech"],
  },
];



export const CONTACT = {
  address: "Puerto Varas",
  phoneNo: "+56975475781",
  email: "matiaspereznauto@gmail.com",
};