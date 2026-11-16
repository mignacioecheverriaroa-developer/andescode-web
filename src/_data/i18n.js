// Textos de interfaz y contenidos por idioma. Para agregar un idioma, duplica un bloque
// completo y agrega el código en `langs`.
const langs = ['es', 'en'];

const routes = {
  home: { es: '/', en: '/en/' },
  about: { es: '/nosotros/', en: '/en/about/' },
  services: { es: '/servicios/', en: '/en/services/' },
  projects: { es: '/proyectos/', en: '/en/projects/' },
  contact: { es: '/contacto/', en: '/en/contact/' },
  privacy: { es: '/privacidad/', en: '/en/privacy/' },
  notFound: { es: '/404.html', en: '/en/404.html' },
};

const es = {
  locale: 'es-CL',
  langName: 'Español',
  ui: {
    skip: 'Saltar al contenido principal',
    menu: 'Menú',
    mainNav: 'Navegación principal',
    footerNav: 'Navegación del pie de página',
    breadcrumb: 'Ruta de navegación',
    allServices: 'Todos los servicios',
    servicesSubmenu: 'Mostrar servicios',
    langSwitch: 'Read in English',
    langSwitchShort: 'EN',
    theme: 'Tema de color',
    themeAuto: 'Automático',
    themeLight: 'Claro',
    themeDark: 'Oscuro',
    backToTop: 'Volver arriba',
    pending: 'Contenido pendiente',
    emailPending: 'Correo en configuración',
    location: 'Santiago, Chile',
    parentOf: 'Una empresa de',
    parentLogoPending: 'Logo de SmartGrid Group pendiente',
    rights: 'Todos los derechos reservados.',
    externalNew: '(se abre en una pestaña nueva)',
    ctaTitle: '¿Tienes una idea o un sistema que necesita ayuda?',
    ctaText:
      'Cuéntanos qué necesitas. Te respondemos con preguntas concretas y una propuesta de próximos pasos.',
    ctaButton: 'Conversemos tu proyecto',
    photoBy: 'Foto',
    related: 'Servicios relacionados',
    includes: 'Qué incluye',
    forWhom: 'Para quién es',
    approach: 'Cómo lo abordamos',
    faq: 'Preguntas frecuentes',
    askAbout: 'Consultar por este servicio',
    casesPending: 'Casos de estudio reales de este servicio',
    groups: {
      build: {
        title: 'Construimos',
        text: 'Creamos productos digitales nuevos, desde la idea hasta la publicación.',
      },
      maintain: {
        title: 'Mantenemos',
        text: 'Cuidamos y mejoramos lo que ya funciona para que siga funcionando.',
      },
      advise: {
        title: 'Asesoramos',
        text: 'Te ayudamos a tomar buenas decisiones técnicas antes de invertir.',
      },
    },
  },
  nav: {
    home: 'Inicio',
    about: 'Nosotros',
    services: 'Servicios',
    projects: 'Proyectos',
    contact: 'Contacto',
    privacy: 'Privacidad',
  },
  process: [
    {
      title: 'Descubrir',
      text: 'Conversamos sobre tu objetivo, tus usuarios y tus restricciones. Definimos alcance y prioridades.',
    },
    {
      title: 'Diseñar',
      text: 'Proponemos arquitectura, flujos y diseño visual. Validamos contigo antes de programar.',
    },
    { title: 'Desarrollar', text: 'Construimos en etapas cortas, con avances que puedes revisar y probar.' },
    { title: 'Entregar', text: 'Publicamos, capacitamos a tu equipo y entregamos código y documentación.' },
    {
      title: 'Acompañar',
      text: 'Mantenemos, medimos y mejoramos la solución a medida que tu negocio crece.',
    },
  ],
  pages: {
    home: {
      title: 'AndesCode — Desarrollo de software en Santiago de Chile',
      description:
        'Sitios web, aplicaciones, software a medida y videojuegos, con mantenimiento, auditorías y soporte continuo. Desarrollo de software en Santiago de Chile.',
      heroTitle: 'Software hecho en Chile para que tu negocio funcione, conecte y crezca',
      heroText:
        'Diseñamos sitios web, aplicaciones, sistemas a medida y videojuegos con código que te pertenece, propuestas claras y un equipo que sigue a tu lado después del lanzamiento.',
      heroPrimary: 'Conversemos tu proyecto',
      heroSecondary: 'Ver servicios',
      whatTitle: 'Qué hacemos',
      whatText: 'Diez especialidades agrupadas según el momento en que está tu proyecto.',
      howTitle: 'Cómo trabajamos',
      howText: 'Un proceso claro, con avances visibles en cada etapa.',
      principlesTitle: 'Lo que cuidamos en cada proyecto',
      principles: [
        {
          title: 'Funcionalidad',
          text: 'Cada pantalla y cada función responde a una necesidad real de tus usuarios.',
        },
        { title: 'Eficiencia', text: 'Soluciones rápidas de usar, de cargar y de mantener.' },
        { title: 'Seguridad', text: 'Buenas prácticas desde el diseño, no como parche al final.' },
        { title: 'Escalabilidad', text: 'Bases técnicas que permiten crecer sin rehacer todo.' },
      ],
      faqTitle: 'Preguntas frecuentes',
      faq: [
        {
          q: '¿Trabajan con empresas pequeñas y emprendedores?',
          a: 'Sí. Trabajamos con empresas, emprendedores y particulares, y ajustamos el alcance a cada etapa y presupuesto.',
        },
        {
          q: '¿Qué pasa después de que entregan el proyecto?',
          a: 'Puedes contratar mantenimiento, soporte y mejoras continuas. Nuestro objetivo es acompañarte en el largo plazo.',
        },
        {
          q: '¿Cómo se cotiza un proyecto?',
          a: 'Después de una primera conversación sin costo, te enviamos una propuesta con alcance, etapas y valores.',
        },
        {
          q: '¿Atienden fuera de Santiago?',
          a: 'Sí. Trabajamos de forma remota con clientes de todo Chile y del extranjero, en español e inglés.',
        },
      ],
    },
    about: {
      title: 'Nosotros — AndesCode',
      description:
        'AndesCode convierte ideas y necesidades en soluciones digitales reales, funcionales y sostenibles. Conoce nuestra misión y forma de trabajo.',
      heading: 'Nosotros',
      lead: 'Somos una empresa especializada en el diseño, desarrollo y gestión de soluciones tecnológicas para empresas, emprendedores y particulares.',
      missionTitle: 'Nuestra misión',
      mission:
        'Convertir ideas y necesidades en soluciones digitales reales, funcionales y sostenibles, aportando tecnología, innovación y continuidad al desarrollo de nuestros clientes.',
      longTermTitle: 'Relaciones de largo plazo',
      longTerm: [
        'Nuestro trabajo no termina con la entrega de un proyecto. Ofrecemos mantenimiento preventivo y correctivo, actualizaciones, optimización, auditorías técnicas y de seguridad, administración de plataformas y soporte tecnológico.',
        'Buscamos acompañar a nuestros clientes en cada etapa, con soluciones que se adapten a sus necesidades actuales y futuras.',
      ],
      howTitle: 'Cómo trabajamos',
      howText:
        'Usamos tecnologías modernas y metodologías enfocadas en la funcionalidad, la eficiencia, la seguridad y la escalabilidad.',
      groupTitle: 'Parte de SmartGrid Group',
      groupText: 'AndesCode es una empresa de SmartGrid Group, con base en Santiago de Chile.',
      teamPending: 'Equipo: nombres, roles y fotos reales del equipo',
      imageAlt:
        'Ilustración de la cordillera de los Andes al amanecer, con capas de montañas en tonos azules',
    },
    services: {
      title: 'Servicios — AndesCode',
      description:
        'Desarrollo web, apps, software a medida, videojuegos, mantenimiento, optimización, auditorías, administración, integraciones y transformación digital.',
      heading: 'Servicios',
      lead: 'Diez especialidades para crear, cuidar y hacer crecer tus soluciones digitales.',
    },
    projects: {
      title: 'Proyectos — AndesCode',
      description:
        'Sitios web y soluciones digitales que diseñamos y desarrollamos: NetVolt Solutions, VICONS Construcción y SDT.',
      heading: 'Proyectos',
      lead: 'Cada proyecto partió de una necesidad concreta. Aquí está qué se pidió, qué hicimos y con qué tecnologías.',
      challenge: 'El desafío',
      work: 'Qué hicimos',
      stack: 'Tecnologías',
    },
    contact: {
      title: 'Contacto — AndesCode',
      description:
        'Cuéntanos sobre tu proyecto. Respondemos con preguntas concretas y una propuesta de próximos pasos.',
      heading: 'Contacto',
      lead: 'Cuéntanos qué necesitas. Mientras más contexto nos des, más útil será nuestra respuesta.',
      form: {
        name: 'Nombre',
        email: 'Correo electrónico',
        emailHint: 'Lo usaremos solo para responderte.',
        company: 'Empresa u organización (opcional)',
        service: 'Servicio de interés',
        servicePlaceholder: 'Selecciona una opción',
        serviceOther: 'Otro / no estoy seguro',
        message: 'Mensaje',
        messageHint: 'Describe tu idea o problema, plazos y cualquier detalle útil.',
        consent: 'Acepto que AndesCode use estos datos para responder mi consulta, según la',
        consentLink: 'política de privacidad',
        honeypot: 'No completes este campo si eres una persona',
        required: 'obligatorio',
        submit: 'Enviar mensaje',
        sending: 'Enviando…',
        success: 'Mensaje enviado. Te responderemos a la brevedad.',
        error:
          'No pudimos enviar el mensaje. Revisa tu conexión e inténtalo de nuevo, o escríbenos por correo.',
        errorsSummary: 'Revisa los campos marcados:',
        errName: 'Escribe tu nombre.',
        errEmail: 'Escribe un correo válido, por ejemplo nombre@empresa.cl.',
        errMessage: 'Escribe un mensaje de al menos 20 caracteres.',
        errConsent: 'Debes aceptar la política de privacidad para enviar el formulario.',
        notConfigured:
          'El formulario está en configuración y aún no envía mensajes. Mientras tanto, escríbenos por correo.',
      },
      asideTitle: 'Otros canales',
      emailLabel: 'Correo',
      locationLabel: 'Ubicación',
      locationText: 'Santiago, Chile. Trabajamos de forma remota con todo el país.',
      responseLabel: 'Tiempo de respuesta',
      responsePending: 'Tiempo de respuesta comprometido',
    },
    privacy: {
      title: 'Política de privacidad — AndesCode',
      description: 'Cómo AndesCode trata los datos personales que recibe a través de este sitio web.',
      heading: 'Política de privacidad',
      updated: 'Última actualización',
      toc: 'En esta página',
      sections: [
        {
          id: 'responsable',
          title: 'Responsable',
          body: [
            'AndesCode, empresa de SmartGrid Group con domicilio en Santiago, Chile, es responsable del tratamiento de los datos personales recibidos por este sitio.',
          ],
        },
        {
          id: 'datos',
          title: 'Qué datos recopilamos',
          body: [
            'Solo los datos que nos entregas voluntariamente en el formulario de contacto: nombre, correo electrónico, empresa (opcional), servicio de interés y mensaje.',
            'Este sitio no usa cookies, rastreadores ni herramientas de analítica de terceros. La preferencia de tema (claro u oscuro) se guarda solo en tu navegador.',
          ],
        },
        {
          id: 'finalidad',
          title: 'Para qué los usamos',
          body: [
            'Exclusivamente para responder tu consulta y, si lo solicitas, preparar una propuesta. No enviamos publicidad ni compartimos tus datos con fines comerciales.',
          ],
        },
        {
          id: 'base',
          title: 'Base de licitud',
          body: [
            'Tu consentimiento expreso, otorgado al marcar la casilla del formulario, conforme a la Ley N.° 19.628 sobre protección de la vida privada y su normativa vigente.',
          ],
        },
        {
          id: 'encargados',
          title: 'Proveedores que intervienen',
          body: [
            'El formulario se procesa mediante Formspree, que reenvía el mensaje a nuestro correo corporativo. El sitio se aloja en GitHub Pages. Ambos proveedores pueden registrar datos técnicos (como la dirección IP) por razones de seguridad, según sus propias políticas.',
          ],
        },
        {
          id: 'conservacion',
          title: 'Cuánto tiempo los guardamos',
          body: [
            'Conservamos los mensajes mientras dure la conversación comercial y hasta 12 meses después, salvo que nos pidas eliminarlos antes.',
          ],
        },
        {
          id: 'derechos',
          title: 'Tus derechos',
          body: [
            'Puedes solicitar acceso, rectificación, cancelación u oposición al tratamiento de tus datos escribiendo a nuestro correo de contacto. Responderemos dentro de los plazos legales.',
          ],
        },
        {
          id: 'cambios',
          title: 'Cambios a esta política',
          body: [
            'Si actualizamos esta política, publicaremos la nueva versión en esta página con su fecha de actualización.',
          ],
        },
      ],
    },
    notFound: {
      title: 'Página no encontrada — AndesCode',
      description: 'La página que buscas no existe o cambió de dirección.',
      heading: 'No encontramos esta página',
      lead: 'Puede que la dirección esté mal escrita o que la página haya cambiado de lugar. Estos enlaces pueden ayudarte:',
    },
  },
};

const en = {
  locale: 'en',
  langName: 'English',
  ui: {
    skip: 'Skip to main content',
    menu: 'Menu',
    mainNav: 'Main navigation',
    footerNav: 'Footer navigation',
    breadcrumb: 'Breadcrumb',
    allServices: 'All services',
    servicesSubmenu: 'Show services',
    langSwitch: 'Leer en español',
    langSwitchShort: 'ES',
    theme: 'Color theme',
    themeAuto: 'Auto',
    themeLight: 'Light',
    themeDark: 'Dark',
    backToTop: 'Back to top',
    pending: 'Pending content',
    emailPending: 'Email being set up',
    location: 'Santiago, Chile',
    parentOf: 'A company of',
    parentLogoPending: 'SmartGrid Group logo pending',
    rights: 'All rights reserved.',
    externalNew: '(opens in a new tab)',
    ctaTitle: 'Have an idea, or a system that needs help?',
    ctaText: 'Tell us what you need. We reply with specific questions and a proposal for next steps.',
    ctaButton: "Let's talk about your project",
    photoBy: 'Photo',
    related: 'Related services',
    includes: "What's included",
    forWhom: "Who it's for",
    approach: 'How we approach it',
    faq: 'Frequently asked questions',
    askAbout: 'Ask about this service',
    casesPending: 'Real case studies for this service',
    groups: {
      build: { title: 'We build', text: 'We create new digital products, from idea to launch.' },
      maintain: {
        title: 'We maintain',
        text: 'We look after and improve what already works so it keeps working.',
      },
      advise: { title: 'We advise', text: 'We help you make sound technical decisions before you invest.' },
    },
  },
  nav: {
    home: 'Home',
    about: 'About',
    services: 'Services',
    projects: 'Projects',
    contact: 'Contact',
    privacy: 'Privacy',
  },
  process: [
    {
      title: 'Discover',
      text: 'We talk about your goal, your users and your constraints, and define scope and priorities.',
    },
    {
      title: 'Design',
      text: 'We propose architecture, flows and visual design, and validate them with you before coding.',
    },
    { title: 'Build', text: 'We develop in short iterations with progress you can review and test.' },
    { title: 'Deliver', text: 'We launch, train your team and hand over code and documentation.' },
    { title: 'Support', text: 'We maintain, measure and improve the solution as your business grows.' },
  ],
  pages: {
    home: {
      title: 'AndesCode — Software development in Santiago, Chile',
      description:
        'Websites, apps, custom software and video games, with ongoing maintenance, audits and support. Software development based in Santiago, Chile.',
      heroTitle: 'Software made in Chile to help your business run, connect and grow',
      heroText:
        'We design websites, apps, custom systems and video games with code you own, clear proposals and a team that stays with you after launch.',
      heroPrimary: "Let's talk about your project",
      heroSecondary: 'See services',
      whatTitle: 'What we do',
      whatText: 'Ten specialties grouped by the stage your project is in.',
      howTitle: 'How we work',
      howText: 'A clear process with visible progress at every stage.',
      principlesTitle: 'What we care about in every project',
      principles: [
        { title: 'Functionality', text: 'Every screen and feature answers a real need of your users.' },
        { title: 'Efficiency', text: 'Solutions that are fast to use, load and maintain.' },
        { title: 'Security', text: 'Good practices from the design stage, not as a patch at the end.' },
        { title: 'Scalability', text: 'Technical foundations that let you grow without starting over.' },
      ],
      faqTitle: 'Frequently asked questions',
      faq: [
        {
          q: 'Do you work with small businesses and entrepreneurs?',
          a: 'Yes. We work with companies, entrepreneurs and individuals, and adjust scope to each stage and budget.',
        },
        {
          q: 'What happens after you deliver the project?',
          a: 'You can hire maintenance, support and continuous improvements. Our goal is to support you in the long term.',
        },
        {
          q: 'How do you quote a project?',
          a: 'After a free first conversation, we send you a proposal with scope, stages and pricing.',
        },
        {
          q: 'Do you work outside Santiago?',
          a: 'Yes. We work remotely with clients across Chile and abroad, in Spanish and English.',
        },
      ],
    },
    about: {
      title: 'About — AndesCode',
      description:
        'AndesCode turns ideas and needs into real, functional and sustainable digital solutions. Learn about our mission and how we work.',
      heading: 'About us',
      lead: 'We specialize in designing, building and managing technology solutions for companies, entrepreneurs and individuals.',
      missionTitle: 'Our mission',
      mission:
        'To turn ideas and needs into real, functional and sustainable digital solutions, bringing technology, innovation and continuity to our clients’ growth.',
      longTermTitle: 'Long-term relationships',
      longTerm: [
        'Our work does not end when a project is delivered. We offer preventive and corrective maintenance, upgrades, optimization, technical and security audits, platform management and technology support.',
        'We aim to support our clients at every stage, with solutions that adapt to their current and future needs.',
      ],
      howTitle: 'How we work',
      howText:
        'We use modern technologies and methods focused on functionality, efficiency, security and scalability.',
      groupTitle: 'Part of SmartGrid Group',
      groupText: 'AndesCode is a SmartGrid Group company based in Santiago, Chile.',
      teamPending: 'Team: real names, roles and photos',
      imageAlt: 'Illustration of the Andes mountains at dawn, with layers of mountains in blue tones',
    },
    services: {
      title: 'Services — AndesCode',
      description:
        'Web development, apps, custom software, video games, maintenance, optimization, audits, platform management, integrations and digital transformation.',
      heading: 'Services',
      lead: 'Ten specialties to create, look after and grow your digital solutions.',
    },
    projects: {
      title: 'Projects — AndesCode',
      description:
        'Websites and digital solutions we designed and built: NetVolt Solutions, VICONS Construcción and SDT.',
      heading: 'Projects',
      lead: 'Every project started from a specific need. Here is what was asked, what we did and which technologies we used.',
      challenge: 'The challenge',
      work: 'What we did',
      stack: 'Technologies',
    },
    contact: {
      title: 'Contact — AndesCode',
      description:
        'Tell us about your project. We reply with specific questions and a proposal for next steps.',
      heading: 'Contact',
      lead: 'Tell us what you need. The more context you share, the more useful our reply will be.',
      form: {
        name: 'Name',
        email: 'Email',
        emailHint: 'We will only use it to reply to you.',
        company: 'Company or organization (optional)',
        service: 'Service of interest',
        servicePlaceholder: 'Choose an option',
        serviceOther: "Other / I'm not sure",
        message: 'Message',
        messageHint: 'Describe your idea or problem, timelines and any useful details.',
        consent: 'I agree that AndesCode may use this data to answer my enquiry, under the',
        consentLink: 'privacy policy',
        honeypot: 'Leave this field empty if you are human',
        required: 'required',
        submit: 'Send message',
        sending: 'Sending…',
        success: 'Message sent. We will get back to you soon.',
        error: 'We could not send your message. Check your connection and try again, or email us.',
        errorsSummary: 'Please check the highlighted fields:',
        errName: 'Enter your name.',
        errEmail: 'Enter a valid email, for example name@company.com.',
        errMessage: 'Enter a message of at least 20 characters.',
        errConsent: 'You must accept the privacy policy to send the form.',
        notConfigured:
          'The form is being set up and cannot send messages yet. In the meantime, please email us.',
      },
      asideTitle: 'Other channels',
      emailLabel: 'Email',
      locationLabel: 'Location',
      locationText: 'Santiago, Chile. We work remotely across the country.',
      responseLabel: 'Response time',
      responsePending: 'Committed response time',
    },
    privacy: {
      title: 'Privacy policy — AndesCode',
      description: 'How AndesCode handles the personal data it receives through this website.',
      heading: 'Privacy policy',
      updated: 'Last updated',
      toc: 'On this page',
      sections: [
        {
          id: 'controller',
          title: 'Data controller',
          body: [
            'AndesCode, a SmartGrid Group company based in Santiago, Chile, is responsible for the personal data received through this site.',
          ],
        },
        {
          id: 'data',
          title: 'What data we collect',
          body: [
            'Only the data you voluntarily provide in the contact form: name, email, company (optional), service of interest and message.',
            'This site does not use cookies, trackers or third-party analytics. Your theme preference (light or dark) is stored only in your browser.',
          ],
        },
        {
          id: 'purpose',
          title: 'How we use it',
          body: [
            'Only to answer your enquiry and, if you ask, to prepare a proposal. We do not send advertising or share your data for commercial purposes.',
          ],
        },
        {
          id: 'legal-basis',
          title: 'Legal basis',
          body: [
            'Your explicit consent, given by ticking the box in the form, in accordance with Chilean Law No. 19,628 on the protection of private life and applicable regulations.',
          ],
        },
        {
          id: 'processors',
          title: 'Service providers involved',
          body: [
            'The form is processed by Formspree, which forwards the message to our company email. The site is hosted on GitHub Pages. Both providers may log technical data (such as IP address) for security reasons, under their own policies.',
          ],
        },
        {
          id: 'retention',
          title: 'How long we keep it',
          body: [
            'We keep messages for as long as the business conversation lasts and up to 12 months afterwards, unless you ask us to delete them sooner.',
          ],
        },
        {
          id: 'rights',
          title: 'Your rights',
          body: [
            'You can request access to, correction or deletion of your data, or object to its processing, by writing to our contact email. We will reply within the legal time limits.',
          ],
        },
        {
          id: 'changes',
          title: 'Changes to this policy',
          body: [
            'If we update this policy, we will publish the new version on this page with its update date.',
          ],
        },
      ],
    },
    notFound: {
      title: 'Page not found — AndesCode',
      description: 'The page you are looking for does not exist or has moved.',
      heading: 'We couldn’t find this page',
      lead: 'The address may be misspelled or the page may have moved. These links can help:',
    },
  },
};

export default { langs, routes, es, en };
