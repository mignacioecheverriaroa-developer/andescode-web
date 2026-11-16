// Contenido de las secciones de la portada (y del proceso, compartido con otras páginas).
// Regla editorial: solo compromisos que AndesCode controla. Sin cifras, clientes ni testimonios inventados.
export default {
  es: {
    heroPoints: [
      'El código y las cuentas quedan a tu nombre',
      'Accesibilidad y seguridad desde el diseño',
      'Soporte y mejoras después de la entrega',
    ],
    heroScroll: 'Ver más',
    sections: {
      advantages: 'Ventajas y confianza',
      about: 'Nosotros',
      services: 'Servicios',
      projects: 'Proyectos',
      gallery: 'Galería',
      process: 'Proceso de trabajo',
      faq: 'Preguntas frecuentes',
      contact: 'Contacto',
      location: 'Ubicación y cobertura',
    },
    sectionNav: 'Secciones de la portada',
    advantages: {
      title: 'Lo que puedes esperar de nosotros',
      lead: 'Compromisos concretos, por escrito y desde la primera conversación.',
      items: [
        {
          icon: 'doc',
          title: 'Propuesta clara antes de empezar',
          text: 'Alcance, etapas, plazos y valores por escrito. Sabes qué recibes y cuánto cuesta antes de decidir.',
        },
        {
          icon: 'key',
          title: 'Todo queda a tu nombre',
          text: 'Código fuente, dominio, hosting y cuentas son tuyos. Puedes seguir con nosotros o con quien prefieras.',
        },
        {
          icon: 'shield',
          title: 'Seguridad desde el diseño',
          text: 'Buenas prácticas OWASP, actualizaciones y respaldos planificados, no parches de último minuto.',
        },
        {
          icon: 'access',
          title: 'Accesible para más personas',
          text: 'Construimos según WCAG 2.2 AA para que tu sitio funcione con teclado, lectores de pantalla y en cualquier pantalla.',
        },
        {
          icon: 'gauge',
          title: 'Rápido y fácil de encontrar',
          text: 'Sitios livianos, optimizados para celulares y buscadores, sin rastreadores innecesarios.',
        },
        {
          icon: 'support',
          title: 'Acompañamiento después del lanzamiento',
          text: 'Mantención, soporte y mejoras continuas con tiempos de respuesta acordados.',
        },
      ],
    },
    about: {
      title: 'Un equipo de Santiago que convierte ideas en soluciones que funcionan',
      text: [
        'Somos una empresa de desarrollo de software y soluciones digitales para empresas, emprendedores y particulares. Diseñamos, construimos y administramos tecnología pensada para durar.',
        'Nuestro trabajo no termina con la entrega: mantenemos, optimizamos y auditamos lo que construimos para que siga respondiendo a tus necesidades actuales y futuras.',
      ],
      mission: 'Convertir ideas y necesidades en soluciones digitales reales, funcionales y sostenibles.',
      more: 'Conoce más sobre nosotros',
      parent: 'Somos parte de SmartGrid Group',
    },
    services: {
      title: 'Diez especialidades para cada etapa de tu proyecto',
      lead: 'Desde la primera versión hasta la operación diaria.',
      more: 'Ver detalle',
      all: 'Ver todos los servicios',
    },
    projects: {
      title: 'Proyectos desarrollados',
      lead: 'Sitios que diseñamos y construimos. Cada uno resolvió una necesidad distinta.',
      visit: 'Visitar sitio',
      details: 'Ver proyecto',
      all: 'Ver todos los proyectos',
      nextTitle: 'Tu proyecto puede ser el siguiente',
      nextText: 'Cuéntanos qué necesitas y te proponemos el camino más simple para lograrlo.',
      nextCta: 'Conversemos',
      screenshot: 'Captura de la portada del sitio de',
    },
    process: {
      title: 'Cómo trabajamos, paso a paso',
      lead: 'Cada etapa termina con algo concreto que puedes revisar.',
      deliverable: 'Entregable',
      steps: [
        {
          img: 'proceso-descubrir',
          title: 'Descubrir',
          text: 'Conversamos sobre tu objetivo, tus usuarios y tus restricciones. Definimos alcance y prioridades.',
          deliverable: 'Resumen de objetivos y alcance',
        },
        {
          img: 'proceso-disenar',
          title: 'Diseñar',
          text: 'Proponemos arquitectura, flujos y diseño visual. Validamos contigo antes de programar.',
          deliverable: 'Prototipo navegable y propuesta visual',
        },
        {
          img: 'proceso-desarrollar',
          title: 'Desarrollar',
          text: 'Construimos en etapas cortas, con avances que puedes revisar y probar.',
          deliverable: 'Avances en un sitio de pruebas',
        },
        {
          img: 'proceso-entregar',
          title: 'Entregar',
          text: 'Publicamos, capacitamos a tu equipo y entregamos código y documentación.',
          deliverable: 'Publicación, capacitación y documentación',
        },
        {
          img: 'proceso-acompanar',
          title: 'Acompañar',
          text: 'Mantenemos, medimos y mejoramos la solución a medida que tu negocio crece.',
          deliverable: 'Plan de mantención y mejoras',
        },
      ],
    },
    faqExtra: [
      {
        q: '¿Cuánto cuesta un proyecto?',
        a: 'Depende del alcance. Después de la primera conversación te enviamos una propuesta con valores por escrito, sin compromiso.',
      },
      {
        q: '¿Cuánto se demora?',
        a: 'Un sitio informativo suele tomar semanas; un sistema a medida, algunos meses. Lo definimos juntos en la propuesta, por etapas.',
      },
    ],
    contact: {
      title: 'Conversemos tu proyecto',
      lead: 'Escríbenos con tu idea o problema. Te respondemos con preguntas concretas y una propuesta de próximos pasos.',
    },
    gallery: {
      title: 'Del primer boceto a la operación diaria',
      lead: 'Diseño, código, infraestructura y acompañamiento: el trabajo completo, no solo la entrega.',
      items: [
        { photo: 'software', caption: 'Código revisado y documentado' },
        { photo: 'transformacion', caption: 'Decisiones que tomamos contigo' },
        { photo: 'mantenimiento', caption: 'Servidores monitoreados y respaldados' },
        { photo: 'optimizacion', caption: 'Rendimiento medido, no supuesto' },
        { photo: 'videojuegos', caption: 'Experiencias interactivas y juegos' },
      ],
    },
    mobileBar: { quote: 'Cotizar', write: 'Escribir' },
    location: {
      title: 'Desde Santiago, para todo Chile',
      lead: 'Nuestra base está en Santiago y trabajamos de forma remota con clientes de cualquier región.',
      items: [
        { title: 'Santiago', text: 'Reuniones presenciales o por videollamada, según prefieras.' },
        {
          title: 'Regiones de Chile',
          text: 'Proyectos 100 % remotos, con reuniones periódicas y avances en línea.',
        },
        { title: 'Fuera de Chile', text: 'Trabajamos en español e inglés, coordinando horarios contigo.' },
      ],
      mapLabel: 'Mapa esquemático de Chile con Santiago conectado a ciudades de norte a sur',
    },
  },
  en: {
    heroPoints: [
      'Code and accounts stay in your name',
      'Accessibility and security by design',
      'Support and improvements after launch',
    ],
    heroScroll: 'See more',
    sections: {
      advantages: 'Why trust us',
      about: 'About',
      services: 'Services',
      projects: 'Projects',
      gallery: 'Gallery',
      process: 'How we work',
      faq: 'FAQ',
      contact: 'Contact',
      location: 'Location and coverage',
    },
    sectionNav: 'Home page sections',
    advantages: {
      title: 'What you can expect from us',
      lead: 'Concrete commitments, in writing, from the first conversation.',
      items: [
        {
          icon: 'doc',
          title: 'A clear proposal before we start',
          text: 'Scope, stages, timelines and pricing in writing. You know what you get and what it costs before deciding.',
        },
        {
          icon: 'key',
          title: 'Everything stays in your name',
          text: 'Source code, domain, hosting and accounts are yours. Keep working with us or with whoever you prefer.',
        },
        {
          icon: 'shield',
          title: 'Security by design',
          text: 'OWASP good practices, planned updates and backups — not last-minute patches.',
        },
        {
          icon: 'access',
          title: 'Accessible to more people',
          text: 'We build to WCAG 2.2 AA so your site works with keyboards, screen readers and on any screen.',
        },
        {
          icon: 'gauge',
          title: 'Fast and easy to find',
          text: 'Lightweight sites, optimized for mobile and search engines, without unnecessary trackers.',
        },
        {
          icon: 'support',
          title: 'Support after launch',
          text: 'Maintenance, support and continuous improvements with agreed response times.',
        },
      ],
    },
    about: {
      title: 'A Santiago team that turns ideas into solutions that work',
      text: [
        'We are a software development and digital solutions company for businesses, entrepreneurs and individuals. We design, build and manage technology made to last.',
        'Our work does not end at delivery: we maintain, optimize and audit what we build so it keeps meeting your current and future needs.',
      ],
      mission: 'To turn ideas and needs into real, functional and sustainable digital solutions.',
      more: 'Learn more about us',
      parent: 'We are part of SmartGrid Group',
    },
    services: {
      title: 'Ten specialties for every stage of your project',
      lead: 'From the first version to day-to-day operation.',
      more: 'See details',
      all: 'See all services',
    },
    projects: {
      title: 'Projects we have built',
      lead: 'Sites we designed and developed. Each one solved a different need.',
      visit: 'Visit site',
      details: 'See project',
      all: 'See all projects',
      nextTitle: 'Your project could be next',
      nextText: 'Tell us what you need and we will propose the simplest way to get there.',
      nextCta: "Let's talk",
      screenshot: 'Screenshot of the home page of',
    },
    process: {
      title: 'How we work, step by step',
      lead: 'Every stage ends with something concrete you can review.',
      deliverable: 'Deliverable',
      steps: [
        {
          img: 'proceso-descubrir',
          title: 'Discover',
          text: 'We talk about your goal, your users and your constraints, and define scope and priorities.',
          deliverable: 'Summary of goals and scope',
        },
        {
          img: 'proceso-disenar',
          title: 'Design',
          text: 'We propose architecture, flows and visual design, and validate them with you before coding.',
          deliverable: 'Clickable prototype and visual proposal',
        },
        {
          img: 'proceso-desarrollar',
          title: 'Build',
          text: 'We develop in short iterations with progress you can review and test.',
          deliverable: 'Progress on a staging site',
        },
        {
          img: 'proceso-entregar',
          title: 'Deliver',
          text: 'We launch, train your team and hand over code and documentation.',
          deliverable: 'Launch, training and documentation',
        },
        {
          img: 'proceso-acompanar',
          title: 'Support',
          text: 'We maintain, measure and improve the solution as your business grows.',
          deliverable: 'Maintenance and improvement plan',
        },
      ],
    },
    faqExtra: [
      {
        q: 'How much does a project cost?',
        a: 'It depends on the scope. After the first conversation we send you a written proposal with pricing, with no obligation.',
      },
      {
        q: 'How long does it take?',
        a: 'An informational site usually takes weeks; a custom system, a few months. We define it together, in stages, in the proposal.',
      },
    ],
    contact: {
      title: "Let's talk about your project",
      lead: 'Write to us with your idea or problem. We reply with specific questions and a proposal for next steps.',
    },
    gallery: {
      title: 'From the first sketch to day-to-day operation',
      lead: 'Design, code, infrastructure and support: the whole job, not just the handover.',
      items: [
        { photo: 'software', caption: 'Reviewed, documented code' },
        { photo: 'transformacion', caption: 'Decisions we make with you' },
        { photo: 'mantenimiento', caption: 'Monitored, backed-up servers' },
        { photo: 'optimizacion', caption: 'Performance measured, not assumed' },
        { photo: 'videojuegos', caption: 'Interactive experiences and games' },
      ],
    },
    mobileBar: { quote: 'Get a quote', write: 'Email us' },
    location: {
      title: 'From Santiago, for all of Chile',
      lead: 'We are based in Santiago and work remotely with clients in every region.',
      items: [
        { title: 'Santiago', text: 'In-person meetings or video calls, whichever you prefer.' },
        {
          title: 'Regions of Chile',
          text: 'Fully remote projects, with regular meetings and online progress.',
        },
        { title: 'Outside Chile', text: 'We work in Spanish and English, coordinating time zones with you.' },
      ],
      mapLabel: 'Schematic map of Chile with Santiago connected to cities from north to south',
    },
  },
};
