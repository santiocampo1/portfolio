const translations = {
  es: {
    nav: {
      about: "Quién Soy",
      projects: "Proyectos",
      experience: "Experiencia",
      certifications: "Certificaciones",
      contact: "Contacto",
    },
    hero: {
      greeting: "Hola, soy",
      role: "Full Stack Developer",
      description:
        "Construyo aplicaciones web robustas y escalables, con foco en la experiencia del usuario y en el código limpio. Apasionado por resolver problemas complejos con soluciones simples.",
      cta: "Ver proyectos",
      ctaContact: "Contactame",
      stats: ["Años exp.", "Proyectos", "Mates 🧉"],
    },
    about: {
      title: "Quién Soy",
      bio: [
        "Soy un desarrollador Full Stack con experiencia en el ecosistema JavaScript moderno. Me especializo en construir productos digitales que combinan sólida ingeniería backend con interfaces frontend cuidadas.",
        "Disfruto del trabajo en equipo, los code reviews y el aprendizaje continuo. Me motiva entregar valor real en cada proyecto, sin perder de vista la calidad del código ni la experiencia de quien lo usa.",
        "Cuando no estoy codificando, exploro nuevas tecnologías, contribuyo a proyectos open source o aprendo sobre diseño de sistemas.",
      ],
      stackTitle: "Stack Tecnológico",
      categories: {
        frontend: "Frontend",
        backend: "Backend",
        data: "Bases de Datos",
        devops: "DevOps & Cloud",
      },
    },
    projects: {
      title: "Proyectos",
      subtitle: "Algunas cosas que construí",
      viewCode: "Ver código",
      items: [
        {
          title: "E-Commerce Platform",
          description:
            "Plataforma de comercio electrónico completa con autenticación, carrito de compras, pasarela de pagos y panel de administración.",
          tech: ["React", "Node.js", "MongoDB", "Stripe"],
          type: "Full Stack",
        },
        {
          title: "Real-Time Chat App",
          description:
            "Aplicación de mensajería en tiempo real con salas, notificaciones push y almacenamiento de historial.",
          tech: ["React", "Socket.io", "Express", "PostgreSQL"],
          type: "Full Stack",
        },
        {
          title: "Analytics Dashboard",
          description:
            "Panel de control con visualizaciones de datos en tiempo real, exportación de reportes y acceso por roles.",
          tech: ["Next.js", "D3.js", "Python", "FastAPI"],
          type: "Full Stack",
        },
        {
          title: "REST API Microservices",
          description:
            "Arquitectura de microservicios con JWT, rate limiting, documentación Swagger y tests automatizados.",
          tech: ["Node.js", "Docker", "Redis", "PostgreSQL"],
          type: "Backend",
        },
      ],
    },
    experience: {
      title: "Experiencia",
      subtitle: "Mi trayectoria profesional",
      items: [
        {
          role: "Full Stack Developer",
          company: "Empresa Tech",
          period: "2023 – Presente",
          description:
            "Desarrollo y mantenimiento de aplicaciones web de alta disponibilidad. Arquitecturas RESTful y optimización de performance en toda la stack.",
          highlights: ["Reducción del 40% en tiempo de carga", "Migración a microservicios", "Lideré equipo de 3 devs"],
        },
        {
          role: "Frontend Developer",
          company: "Agencia Digital",
          period: "2022 – 2023",
          description:
            "Interfaces responsivas y accesibles para clientes de diversas industrias. Colaboración estrecha con diseñadores y stakeholders.",
          highlights: ["+15 proyectos entregados", "Design System propio", "REST & GraphQL"],
        },
        {
          role: "Junior Developer",
          company: "Startup SaaS",
          period: "2021 – 2022",
          description:
            "Primeros pasos profesionales en una SaaS. Metodologías ágiles, code reviews y deploy en la nube.",
          highlights: ["React + Node.js", "CI/CD con GitHub Actions", "AWS S3 & EC2"],
        },
      ],
    },
    certifications: {
      title: "Certificaciones",
      subtitle: "Formación y credenciales",
      inProgress: "En proceso",
      items: [
        {
          name: "AWS Certified Developer – Associate",
          issuer: "Amazon Web Services",
          year: "2025",
          icon: "☁️",
          status: "in-progress",
          description: "Certificación en desarrollo de aplicaciones en la nube con AWS.",
        },
        {
          name: "Meta Front-End Developer",
          issuer: "Meta / Coursera",
          year: "2023",
          icon: "⚛️",
          status: "done",
          description: "Programa profesional de desarrollo frontend con React.",
        },
        {
          name: "Node.js Application Developer",
          issuer: "OpenJS Foundation",
          year: "2023",
          icon: "🟢",
          status: "done",
          description: "Certificación oficial de desarrollo de aplicaciones con Node.js.",
        },
        {
          name: "MongoDB Associate Developer",
          issuer: "MongoDB University",
          year: "2022",
          icon: "🍃",
          status: "done",
          description: "Certificación de desarrollo con MongoDB para aplicaciones modernas.",
        },
      ],
    },
    contact: {
      title: "Contacto",
      subtitle: "¿Tenés un proyecto? Hablemos.",
      description:
        "Estoy abierto a nuevas oportunidades, proyectos freelance o simplemente charlar sobre tecnología.",
      cta: "Enviar email",
    },
  },

  en: {
    nav: {
      about: "About",
      projects: "Projects",
      experience: "Experience",
      certifications: "Certifications",
      contact: "Contact",
    },
    hero: {
      greeting: "Hi, I'm",
      role: "Full Stack Developer",
      description:
        "I build robust and scalable web applications, focused on user experience and clean code. Passionate about solving complex problems with simple solutions.",
      cta: "View projects",
      ctaContact: "Contact me",
      stats: ["Years exp.", "Projects", "Mates 🧉"],
    },
    about: {
      title: "About Me",
      bio: [
        "I'm a Full Stack Developer with experience in the modern JavaScript ecosystem. I specialize in building digital products that combine solid backend engineering with polished frontend interfaces.",
        "I enjoy teamwork, code reviews, and continuous learning. I'm motivated by delivering real value in every project, without losing sight of code quality or user experience.",
        "When I'm not coding, I explore new technologies, contribute to open source projects, or learn about systems design.",
      ],
      stackTitle: "Tech Stack",
      categories: {
        frontend: "Frontend",
        backend: "Backend",
        data: "Databases",
        devops: "DevOps & Cloud",
      },
    },
    projects: {
      title: "Projects",
      subtitle: "Some things I've built",
      viewCode: "View code",
      items: [
        {
          title: "E-Commerce Platform",
          description:
            "Full-featured e-commerce platform with authentication, shopping cart, payment gateway, and admin dashboard.",
          tech: ["React", "Node.js", "MongoDB", "Stripe"],
          type: "Full Stack",
        },
        {
          title: "Real-Time Chat App",
          description: "Real-time messaging application with rooms, push notifications, and conversation history.",
          tech: ["React", "Socket.io", "Express", "PostgreSQL"],
          type: "Full Stack",
        },
        {
          title: "Analytics Dashboard",
          description: "Control panel with real-time data visualizations, report exporting, and role-based access.",
          tech: ["Next.js", "D3.js", "Python", "FastAPI"],
          type: "Full Stack",
        },
        {
          title: "REST API Microservices",
          description: "Scalable microservices with JWT auth, rate limiting, Swagger docs, and automated tests.",
          tech: ["Node.js", "Docker", "Redis", "PostgreSQL"],
          type: "Backend",
        },
      ],
    },
    experience: {
      title: "Experience",
      subtitle: "My professional journey",
      items: [
        {
          role: "Full Stack Developer",
          company: "Tech Company",
          period: "2023 – Present",
          description:
            "Development and maintenance of high-availability web applications. RESTful architectures and performance optimization across the full stack.",
          highlights: ["40% load time reduction", "Migration to microservices", "Led team of 3 devs"],
        },
        {
          role: "Frontend Developer",
          company: "Digital Agency",
          period: "2022 – 2023",
          description:
            "Responsive and accessible interfaces for clients across various industries. Close collaboration with designers and stakeholders.",
          highlights: ["15+ projects delivered", "Custom Design System", "REST & GraphQL"],
        },
        {
          role: "Junior Developer",
          company: "SaaS Startup",
          period: "2021 – 2022",
          description: "First professional steps at a SaaS company. Agile methodologies, code reviews and cloud deployment.",
          highlights: ["React + Node.js", "CI/CD with GitHub Actions", "AWS S3 & EC2"],
        },
      ],
    },
    certifications: {
      title: "Certifications",
      subtitle: "Training & credentials",
      inProgress: "In progress",
      items: [
        {
          name: "AWS Certified Developer – Associate",
          issuer: "Amazon Web Services",
          year: "2025",
          icon: "☁️",
          status: "in-progress",
          description: "Certification in cloud application development with AWS.",
        },
        {
          name: "Meta Front-End Developer",
          issuer: "Meta / Coursera",
          year: "2023",
          icon: "⚛️",
          status: "done",
          description: "Professional frontend development program with React.",
        },
        {
          name: "Node.js Application Developer",
          issuer: "OpenJS Foundation",
          year: "2023",
          icon: "🟢",
          status: "done",
          description: "Official certification for building applications with Node.js.",
        },
        {
          name: "MongoDB Associate Developer",
          issuer: "MongoDB University",
          year: "2022",
          icon: "🍃",
          status: "done",
          description: "Developer certification for building modern applications with MongoDB.",
        },
      ],
    },
    contact: {
      title: "Contact",
      subtitle: "Have a project? Let's talk.",
      description: "I'm open to new opportunities, freelance projects, or just chatting about technology.",
      cta: "Send email",
    },
  },
};

export default translations;
