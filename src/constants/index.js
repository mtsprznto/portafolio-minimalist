import demo1_gestpass from "../assets/projects/demo1_gestpass.png";
import demo4_arriendopv from "../assets/projects/demo4_arriendopv.png";
import demo3_academ from "../assets/projects/demo3_academ.png";


export const HERO_CONTENT = `Desarrollador de software con experiencia en Python, JavaScript, Next.js, PHP , SQL. Apasionado por crear soluciones eficientes, seguras y optimizadas, con enfoque en interfaces y mejores prácticas. Busco aportar en entornos dinámicos e innovadores.`;

export const ABOUT_TEXT = `Soy un desarrollador full stack dedicado y versátil con pasión por crear aplicaciones web eficientes y fáciles de usar. Con 5 años de experiencia profesional, he trabajado con una variedad de tecnologías, incluyendo React, Next.js, Node.js, MySQL, PostgreSQL y MongoDB. Mi camino en el desarrollo web comenzó con una profunda curiosidad por entender cómo funcionan las cosas y ha evolucionado en una carrera en la que busco aprender y adaptarme continuamente a nuevos desafíos. Disfruto trabajar en entornos colaborativos y resolver problemas complejos para ofrecer soluciones de alta calidad. Fuera del mundo del código, me gusta mantenerme activo, explorar nuevas tecnologías y contribuir a proyectos de código abierto.`;

export const PROJECTS = [
  {
    title: "Academ",
    image: demo3_academ,
    description: "Academ. plataforma es un entorno amigable para compartir conocimiento y aprender de manera organizada. Los usuarios pueden registrarse y acceder a diversas funcionalidades dependiendo de su rol dentro del sistema",
    technologies: ["TypeScript", "JavaScript", "CSS", "Next.js"],
    url_demo: "https://academ-prod.vercel.app/",
    url_codigo: "https://github.com/mtsprznto/academ-prod",
  },
  {
    title: "Gestpass",
    image: demo1_gestpass,
    description: "Desarrollé una aplicación de gestión de contraseñas siguiendo las mejores prácticas de seguridad y desarrollo, implementando el patrón MVC para una estructura modular y eficiente.La aplicación permite almacenar, gestionar y encriptar contraseñas de manera segura, además de generar claves robustas concaracteres especiales",
    technologies: ["TypeScript", "JavaScript", "CSS", "Next.js"],
    url_demo: "https://gestpass.vercel.app/",
    url_codigo: "https://github.com/mtsprznto/gestpass",
  },
  {
    title: "CabañasPv",
    image: demo4_arriendopv,
    description: "Este proyecto es una aplicación web desarrollada con Next.js (versión 13.5.6), React (versión 18), y Tailwind CSS para el diseño de estilos. Está orientado a la promoción y arriendo de propiedades, en la región de Puerto Varas, Chile",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion","Leaflet"],
    url_demo: "https://cabanaspv.vercel.app/",
    url_codigo: "https://github.com/mtsprznto/cabanaspv",
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