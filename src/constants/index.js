import demo1_gestpass from "../assets/projects/demo1_gestpass.png";
import demo2_particles from "../assets/projects/demo2_particle.png";


export const HERO_CONTENT = `Desarrollador de software con experiencia en tecnologías como Python, SQL, Next.js, React y PHP. Apasionado por la creación de soluciones eficientes y seguras, con especial enfoque en el desarrollo full stack y la optimización de interfaces. Con un sólido historial de proyectos personales y académicos, destaco por mi capacidad de análisis, resolución de problemas y compromiso con las mejores prácticas en desarrollo. Busco oportunidades para aplicar mis conocimientos en entornos dinámicos, colaborativos e innovadores.`;

export const ABOUT_TEXT = `Soy un desarrollador full stack dedicado y versátil con pasión por crear aplicaciones web eficientes y fáciles de usar. Con 5 años de experiencia profesional, he trabajado con una variedad de tecnologías, incluyendo React, Next.js, Node.js, MySQL, PostgreSQL y MongoDB. Mi camino en el desarrollo web comenzó con una profunda curiosidad por entender cómo funcionan las cosas y ha evolucionado en una carrera en la que busco aprender y adaptarme continuamente a nuevos desafíos. Disfruto trabajar en entornos colaborativos y resolver problemas complejos para ofrecer soluciones de alta calidad. Fuera del mundo del código, me gusta mantenerme activo, explorar nuevas tecnologías y contribuir a proyectos de código abierto.`;

export const PROJECTS = [
  {
    title: "Gestpass",
    image: demo1_gestpass,
    description: "Desarrollé una aplicación de gestión de contraseñas siguiendo las mejores prácticas de seguridad y desarrollo, implementando el patrón MVC para una estructura modular y eficiente.La aplicación permite almacenar, gestionar y encriptar contraseñas de manera segura, además de generar claves robustas concaracteres especiales",
    technologies: ["TypeScript", "JavaScript", "CSS", "React.js"],
    url_demo: "https://gestpass.vercel.app/",
    url_codigo: "https://github.com/mtsprznto/gestpass",
  },
  {
    title: "Particles Portafolio",
    image: demo2_particles,
    description: "Esta aplicación demo combina el poder de Next.js, React y Spline para ofrecer una experiencia visual y dinámica que redefine la forma en que interactuamos con interfaces gráficas en la web",
    technologies: ["Next.js", "React", "Spline"],
    url_demo: "https://lllitparticles.netlify.app/",
    url_codigo: "https://github.com/mtsprznto/particles-portafolio",
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
];



export const CONTACT = {
  address: "Puerto Varas",
  phoneNo: "+56975475781",
  email: "matiaspereznauto@gmail.com",
};