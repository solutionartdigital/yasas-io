import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CalendarDays,
  Check,
  ChevronDown,
  Menu,
  MessageSquare,
  Mic2,
  PhoneCall,
  Play,
  Send,
  Smartphone,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";

const copy = {
  en: {
    nav: ["Solutions", "How it works", "Results", "Pricing", "FAQ"],
    demo: "Book a demo",
    badge: "AI systems, voice agents & automations",
    hero: "AI systems that turn messages, chats and calls into",
    heroAccent: "clients.",
    sub: "We build premium AI chat systems, WhatsApp automations, voice agents and booking flows that help businesses respond faster, qualify leads and close with less chaos.",
    cta: "Get a free audit",
    secondary: "See how it works",
    bullets: ["No long-term contracts", "Built for results", "Secure & scalable"],
    trusted: "Trusted by growing businesses",
    solutionsEyebrow: "Our Solutions",
    solutionsTitle: "All the systems",
    solutionsAccent: "you need.",
    solutionsSub:
      "A premium stack built to answer chats, automate WhatsApp, handle calls with AI voice agents, organize opportunities and book more appointments.",
    services: [
      [
        "AI Chat Assistants",
        "Website assistants that answer FAQs, qualify visitors and guide them to book or request a quote.",
      ],
      [
        "WhatsApp Automation",
        "Instant replies, lead qualification, reminders, follow-ups and internal alerts through WhatsApp flows.",
      ],
      [
        "AI Voice Agents",
        "Human-like phone agents that answer calls, explain services, qualify callers and book appointments.",
      ],
      [
        "Complete Automations",
        "End-to-end workflows connecting forms, chats, calls, calendars, emails, CRMs and notifications.",
      ],
      [
        "Booking Systems",
        "Appointment flows that reduce friction and help customers schedule faster through calendar integrations.",
      ],
      [
        "CRM & Dashboards",
        "Simple tracking for leads, calls, conversations, bookings, pipeline value and next actions.",
      ],
    ],
    learn: "Learn more",
    howEyebrow: "How it works",
    howTitle: "Simple. Strategic.",
    howAccent: "Scalable.",
    steps: [
      [
        "Discover & Audit",
        "We analyze your current funnel, response flow and missed opportunities.",
      ],
      [
        "Build & Automate",
        "We build your AI assistant, WhatsApp flow, voice agent, CRM and booking system.",
      ],
      [
        "Launch & Scale",
        "We launch, test, optimize and help you turn more conversations into clients.",
      ],
    ],
    resultsEyebrow: "Real Results",
    resultsTitle: "Systems that drive",
    resultsAccent: "real growth.",
    statLabels: ["Leads Captured", "Conversations", "Booked Calls", "Closed Deals"],
    testimonial:
      "yasas.io transformed our chaos into a predictable growth engine.",
    pricingEyebrow: "Pricing",
    pricingTitle: "Start lean. Upgrade",
    pricingAccent: "when ready.",
    pricingSub:
      "Simple launch packages for businesses that want practical AI implementation without agency bloat.",
    plans: [
      [
        "AI Starter Setup",
        "$497",
        ["AI audit", "Basic chatbot", "FAQ scripts", "Mini CRM", "Video walkthrough"],
      ],
      [
        "Client Capture System",
        "$997",
        [
          "Landing page",
          "AI chatbot",
          "Lead form",
          "CRM pipeline",
          "Booking flow",
          "Follow-up automation",
        ],
      ],
      [
        "Automation Growth System",
        "$1,500+",
        [
          "WhatsApp automation",
          "AI voice agent setup",
          "Custom integrations",
          "Team notifications",
          "CRM dashboard",
          "15-day support",
        ],
      ],
    ],
    start: "Get started",
    bookingEyebrow: "Free AI Audit",
    bookingTitle: "Ready to turn chats and calls into",
    bookingAccent: "clients?",
    bookingSub:
      "Use the chatbot on this page to request a free audit. In production, this can connect to WhatsApp, Calendly, Google Calendar, email, CRM and AI voice agents for phone-based booking.",
    emailUs: "Email us",
    explore: "Explore again",
    faqEyebrow: "FAQ",
    faqTitle: "Questions before",
    faqAccent: "we build?",
    faqs: [
      [
        "What does yasas.io actually build?",
        "We build complete AI automation systems: landing pages, lead forms, WhatsApp automation, AI chat assistants, voice agents that answer calls, CRM tracking, booking flows and follow-up automations so businesses respond faster and close more opportunities.",
      ],
      [
        "Is this only for big companies?",
        "No. yasas.io is designed for small service businesses, consultants, coaches, local companies and online service providers that want practical AI without hiring a full tech team.",
      ],
      [
        "How fast can you launch a system?",
        "Most starter systems can be launched in 5–7 business days. More complete systems with WhatsApp, CRM workflows and AI voice agents usually take 7–14 business days depending on integrations, scripts and approvals.",
      ],
      [
        "Can your AI agents book appointments?",
        "Yes. Our AI chat, WhatsApp and voice agents can qualify leads, collect contact info, answer FAQs and send people to a booking link. In production, we can connect the system with Calendly, Google Calendar, WhatsApp, email, your CRM or tools like Make/Zapier.",
      ],
      [
        "Do you guarantee clients?",
        "We do not promise guaranteed revenue. We build the system that helps you capture, respond and follow up better. Results depend on your offer, traffic, market and sales process.",
      ],
    ],
    footer:
      "AI systems and automations that help businesses answer chats, automate WhatsApp, handle calls, capture leads, book appointments and scale with less chaos.",
    stay: "Stay in the loop",
    stayText: "Get tips, strategies and AI systems to grow your business.",
    emailPlaceholder: "Enter your email",
    chat: {
      title: "yasas AI Assistant",
      online: "Online now",
      intro:
        "Hi, I'm the yasas.io AI assistant. I can answer questions about chatbots, WhatsApp automations, AI voice agents, CRM workflows, or help you book a free AI audit.",
      quick: [
        "What do you build?",
        "Do you automate WhatsApp?",
        "Can AI answer phone calls?",
        "Book a free audit",
      ],
      input: "Ask anything...",
      formTitle: "Request your free AI audit",
      name: "Name",
      email: "Email",
      business: "Business / website",
      time: "Preferred time",
      times: [
        "Today afternoon",
        "Tomorrow morning",
        "Tomorrow afternoon",
        "This week",
      ],
      submit: "Request audit",
      booking:
        "Perfect. I can help you request a free AI audit. Please complete the short form below and we'll confirm availability.",
      price:
        "Launch packages start at $497 for a Starter Setup, $997 for a Client Capture System, and $1,500+ for complete automation systems. Voice agents and WhatsApp integrations depend on call volume, tools and complexity.",
      build:
        "We build complete AI automation systems: website chatbots, WhatsApp automations, AI voice agents, CRM pipelines, booking flows, follow-up sequences and dashboards.",
      wa: "Yes. We create WhatsApp flows that answer common questions, collect lead details, send reminders, notify your team and guide customers to book an appointment or request a quote.",
      voice:
        "Yes. We can set up AI voice agents that answer calls naturally, ask qualifying questions, explain services, capture customer details and book appointments. In production this connects with a voice AI provider, calendar and CRM.",
      calendar:
        "Yes. The system can send users to a Calendly/Google Calendar booking link or connect through Make/Zapier to your CRM and calendar.",
      guarantee:
        "We don't guarantee revenue. We improve the system that captures, responds and follows up with leads. Results depend on your offer, traffic, market and sales process.",
      fallback:
        "Good question. yasas.io helps businesses stop losing leads by responding faster, capturing data and following up automatically. Would you like to book a free audit?",
      missing:
        "Please complete all fields so we can request your audit properly.",
      done: "Done — your audit request is ready. In the real version, this would be sent to your email/CRM and synced with Calendly or Google Calendar.",
    },
    visual: {
      pipeline: "Lead Pipeline",
      lead: "New Lead",
      follow: "AI Follow-up",
      booked: "Booked Call",
      captured: "Captured from website",
      sent: "Automatic reply sent",
      confirmed: "Appointment confirmed",
      whatsapp: "WhatsApp",
      waMsg:
        "Thanks for reaching out. Would you like pricing, availability or to book a consultation?",
      chat: "AI Chat",
      user: "I want more booked appointments.",
      bot: "Great — I can qualify you and schedule your audit.",
      voice: "Voice Agent",
      voiceText: "Answering calls, qualifying leads, booking appointments.",
      call: "Consultation Call",
      time: "Today, 2:30 PM",
    },
  },
  es: {
    nav: ["Soluciones", "Cómo funciona", "Resultados", "Precios", "FAQ"],
    demo: "Agendar demo",
    badge: "Sistemas IA, agentes de voz y automatizaciones",
    hero: "Sistemas con IA que convierten mensajes, chats y llamadas en",
    heroAccent: "clientes.",
    sub: "Creamos sistemas premium de chat con IA, automatización de WhatsApp, agentes de voz y flujos de agenda para que los negocios respondan más rápido, califiquen leads y vendan con menos caos.",
    cta: "Pedir auditoría gratis",
    secondary: "Ver cómo funciona",
    bullets: ["Sin contratos largos", "Creado para resultados", "Seguro y escalable"],
    trusted: "Para negocios que quieren crecer",
    solutionsEyebrow: "Soluciones",
    solutionsTitle: "Todos los sistemas",
    solutionsAccent: "que necesitas.",
    solutionsSub:
      "Un stack premium para responder chats, automatizar WhatsApp, atender llamadas con agentes de voz IA, organizar oportunidades y agendar más citas.",
    services: [
      [
        "Asistentes de chat IA",
        "Asistentes para web que responden dudas, califican visitantes y los guían a reservar o pedir presupuesto.",
      ],
      [
        "Automatización de WhatsApp",
        "Respuestas instantáneas, calificación de leads, recordatorios, seguimientos y alertas internas por WhatsApp.",
      ],
      [
        "Agentes de voz IA",
        "Agentes telefónicos que hablan de forma natural, responden llamadas, explican servicios, califican clientes y agendan citas.",
      ],
      [
        "Automatizaciones completas",
        "Flujos de punta a punta conectando formularios, chats, llamadas, calendarios, emails, CRM y notificaciones.",
      ],
      [
        "Sistemas de agenda",
        "Flujos de reserva que reducen fricción y ayudan a los clientes a agendar más rápido.",
      ],
      [
        "CRM y dashboards",
        "Seguimiento simple de leads, llamadas, conversaciones, citas, valor del pipeline y próximas acciones.",
      ],
    ],
    learn: "Ver más",
    howEyebrow: "Cómo funciona",
    howTitle: "Simple. Estratégico.",
    howAccent: "Escalable.",
    steps: [
      [
        "Auditoría",
        "Analizamos tu embudo actual, tiempos de respuesta y oportunidades perdidas.",
      ],
      [
        "Construcción",
        "Creamos tu asistente IA, flujo de WhatsApp, agente de voz, CRM y sistema de agenda.",
      ],
      [
        "Lanzamiento",
        "Lanzamos, probamos, optimizamos y te ayudamos a convertir más conversaciones en clientes.",
      ],
    ],
    resultsEyebrow: "Resultados",
    resultsTitle: "Sistemas que generan",
    resultsAccent: "crecimiento real.",
    statLabels: ["Leads capturados", "Conversaciones", "Citas agendadas", "Ventas cerradas"],
    testimonial:
      "yasas.io convirtió nuestro caos en un sistema de crecimiento predecible.",
    pricingEyebrow: "Precios",
    pricingTitle: "Empieza simple. Escala",
    pricingAccent: "cuando estés listo.",
    pricingSub:
      "Paquetes claros para negocios que quieren implementación práctica de IA sin complicaciones de agencia gigante.",
    plans: [
      [
        "AI Starter Setup",
        "$497",
        [
          "Auditoría IA",
          "Chatbot básico",
          "Scripts de FAQ",
          "Mini CRM",
          "Video tutorial",
        ],
      ],
      [
        "Client Capture System",
        "$997",
        [
          "Landing page",
          "Chatbot IA",
          "Formulario de leads",
          "CRM pipeline",
          "Sistema de agenda",
          "Seguimiento automático",
        ],
      ],
      [
        "Automation Growth System",
        "$1,500+",
        [
          "Automatización WhatsApp",
          "Agente de voz IA",
          "Integraciones personalizadas",
          "Alertas al equipo",
          "Dashboard CRM",
          "Soporte 15 días",
        ],
      ],
    ],
    start: "Empezar",
    bookingEyebrow: "Auditoría IA gratis",
    bookingTitle: "¿Lista para convertir chats y llamadas en",
    bookingAccent: "clientes?",
    bookingSub:
      "Usa el chatbot de esta página para pedir una auditoría gratis. En producción, esto puede conectarse con WhatsApp, Calendly, Google Calendar, email, CRM y agentes de voz IA para agendar por teléfono.",
    emailUs: "Escríbenos",
    explore: "Ver de nuevo",
    faqEyebrow: "FAQ",
    faqTitle: "Preguntas antes de",
    faqAccent: "construir",
    faqs: [
      [
        "¿Qué construye exactamente yasas.io?",
        "Creamos sistemas completos de automatización con IA: landing pages, formularios de leads, automatización de WhatsApp, asistentes de chat IA, agentes de voz que responden llamadas, CRM, agenda y seguimiento automático.",
      ],
      [
        "¿Esto es solo para empresas grandes?",
        "No. yasas.io está pensado para negocios de servicios, consultores, coaches, negocios locales y proveedores online que quieren usar IA de forma práctica sin contratar un equipo técnico completo.",
      ],
      [
        "¿Qué tan rápido se puede lanzar?",
        "Los sistemas starter suelen lanzarse en 5–7 días hábiles. Sistemas con WhatsApp, CRM y agentes de voz IA pueden tomar 7–14 días hábiles según integraciones, scripts y aprobaciones.",
      ],
      [
        "¿Los agentes IA pueden agendar citas?",
        "Sí. Los agentes de chat, WhatsApp y voz pueden calificar leads, recoger datos, responder dudas y enviar al cliente a una agenda. En producción puede conectarse con Calendly, Google Calendar, WhatsApp, email, CRM o Make/Zapier.",
      ],
      [
        "¿Garantizan clientes?",
        "No prometemos ingresos garantizados. Creamos el sistema que ayuda a capturar, responder y hacer seguimiento mejor. Los resultados dependen de tu oferta, tráfico, mercado y proceso de ventas.",
      ],
    ],
    footer:
      "Sistemas y automatizaciones con IA para responder chats, automatizar WhatsApp, atender llamadas, captar leads, agendar citas y escalar con menos caos.",
    stay: "Mantente al día",
    stayText: "Recibe ideas, estrategias y sistemas IA para crecer tu negocio.",
    emailPlaceholder: "Tu email",
    chat: {
      title: "Asistente IA yasas",
      online: "En línea",
      intro:
        "Hola, soy el asistente IA de yasas.io. Puedo responder dudas sobre chatbots, automatización de WhatsApp, agentes de voz IA, CRM o ayudarte a pedir una auditoría gratis.",
      quick: [
        "¿Qué construyen?",
        "¿Automatizan WhatsApp?",
        "¿La IA responde llamadas?",
        "Agendar auditoría gratis",
      ],
      input: "Pregunta lo que quieras...",
      formTitle: "Pide tu auditoría IA gratis",
      name: "Nombre",
      email: "Email",
      business: "Negocio / web",
      time: "Horario preferido",
      times: [
        "Hoy en la tarde",
        "Mañana en la mañana",
        "Mañana en la tarde",
        "Esta semana",
      ],
      submit: "Pedir auditoría",
      booking:
        "Perfecto. Te ayudo a pedir una auditoría IA gratis. Completa este formulario corto y confirmaremos disponibilidad.",
      price:
        "Los paquetes empiezan en $497 para Starter Setup, $997 para Client Capture System y $1,500+ para sistemas completos. Agentes de voz y WhatsApp dependen del volumen de llamadas, herramientas y complejidad.",
      build:
        "Creamos sistemas completos con IA: chatbots web, automatización de WhatsApp, agentes de voz IA, CRM, agenda, seguimiento automático y dashboards.",
      wa: "Sí. Creamos flujos de WhatsApp que responden dudas, recogen datos, envían recordatorios, notifican al equipo y guían al cliente a agendar o pedir presupuesto.",
      voice:
        "Sí. Podemos configurar agentes de voz IA que responden llamadas de forma natural, hacen preguntas, explican servicios, capturan datos y agendan citas. En producción se conecta con proveedor de voz IA, calendario y CRM.",
      calendar:
        "Sí. El sistema puede enviar a Calendly/Google Calendar o conectarse por Make/Zapier con tu CRM y calendario.",
      guarantee:
        "No garantizamos ingresos. Mejoramos el sistema que captura, responde y da seguimiento a leads. Los resultados dependen de oferta, tráfico, mercado y ventas.",
      fallback:
        "Buena pregunta. yasas.io ayuda a los negocios a dejar de perder leads respondiendo más rápido, capturando datos y haciendo seguimiento automático. ¿Quieres agendar una auditoría gratis?",
      missing:
        "Por favor completa todos los campos para solicitar tu auditoría.",
      done: "Listo — tu solicitud de auditoría quedó preparada. En la versión real se enviaría a tu email/CRM y se sincronizaría con Calendly o Google Calendar.",
    },
    visual: {
      pipeline: "Pipeline de leads",
      lead: "Nuevo lead",
      follow: "Seguimiento IA",
      booked: "Cita agendada",
      captured: "Capturado desde la web",
      sent: "Respuesta automática enviada",
      confirmed: "Cita confirmada",
      whatsapp: "WhatsApp",
      waMsg:
        "Gracias por escribir. ¿Quieres precios, disponibilidad o agendar una consulta?",
      chat: "Chat IA",
      user: "Quiero más citas agendadas.",
      bot: "Perfecto — puedo calificarte y agendar tu auditoría.",
      voice: "Agente de voz",
      voiceText: "Responde llamadas, califica leads y agenda citas.",
      call: "Consulta",
      time: "Hoy, 2:30 PM",
    },
  },
};

const serviceIcons = [MessageSquare, Smartphone, PhoneCall, Workflow, CalendarDays, BarChart3];
const statNumbers = ["382", "1,276", "342", "89"];

function YasasLogo({ small = false, iconOnly = false }) {
  const size = small ? 38 : 54;
  const textSize = small ? "text-2xl" : "text-4xl";

  return (
    <div className="flex items-center gap-3">
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 overflow-visible drop-shadow-[0_0_22px_rgba(123,92,255,.28)]"
        aria-label="yasas.io logo"
      >
        <defs>
          <linearGradient id="yasasLeft" x1="14" y1="12" x2="30" y2="34" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF7A4D" />
            <stop offset="1" stopColor="#FF4D4D" />
          </linearGradient>
          <linearGradient id="yasasRight" x1="50" y1="12" x2="34" y2="34" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8B5CFF" />
            <stop offset="1" stopColor="#6D4DFF" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="10" r="6" fill="#FFB020" />
        <path d="M16 16 L30.4 31.8" stroke="url(#yasasLeft)" strokeWidth="9" strokeLinecap="round" />
        <path d="M48 16 L33.6 31.8" stroke="url(#yasasRight)" strokeWidth="9" strokeLinecap="round" />
        <path d="M32 31.5 L32 54" stroke="#F8FAFC" strokeWidth="9" strokeLinecap="round" />
      </svg>
      {!iconOnly && (
        <div className="flex items-center leading-none">
          <span className={`${textSize} font-extrabold tracking-tight text-white`}>yasas</span>
          <span className={`${textSize} font-extrabold tracking-tight text-[#7B5CFF]`}>.io</span>
        </div>
      )}
    </div>
  );
}

function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#081020]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(123,92,255,.22),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(255,90,77,.18),transparent_25%),radial-gradient(circle_at_45%_88%,rgba(255,176,32,.11),transparent_34%),linear-gradient(180deg,#081020_0%,#0A1020_52%,#050914_100%)]" />
      <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:48px_48px]" />
      <motion.div
        className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-[#7B5CFF]/30 blur-3xl"
        animate={{ x: [0, 70, 0], y: [0, 30, 0], scale: [1, 1.16, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-0 top-40 h-96 w-96 rounded-full bg-[#FF5A4D]/24 blur-3xl"
        animate={{ x: [0, -80, 0], y: [0, 45, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-[#FFB020]/13 blur-3xl"
        animate={{ x: [0, 25, 0], y: [0, -35, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[-25%] top-[58%] h-px w-[150%] bg-gradient-to-r from-transparent via-[#FF5A4D] to-transparent opacity-35"
        animate={{ x: ["-6%", "6%", "-6%"] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[-25%] top-[61%] h-px w-[150%] bg-gradient-to-r from-transparent via-[#7B5CFF] to-transparent opacity-30"
        animate={{ x: ["6%", "-6%", "6%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function GradientOrb({ className }) {
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.62, 0.35] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function PrimaryButton({ children, href = "#booking", className = "" }) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-[#FF5A4D] px-7 py-4 font-bold text-white shadow-[0_20px_70px_rgba(255,90,77,.26)] ${className}`}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-[#FF5A4D] via-[#FFB020] to-[#FF5A4D] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="relative z-10 inline-flex items-center">{children}</span>
    </motion.a>
  );
}

function LanguageToggle({ lang, setLang }) {
  return (
    <div className="flex rounded-2xl border border-white/10 bg-white/[0.04] p-1 text-xs font-bold text-white/65">
      {[["en", "EN"], ["es", "ES"]].map(([key, label]) => (
        <button
          key={key}
          onClick={() => setLang(key)}
          className={`rounded-xl px-3 py-2 transition ${
            lang === key ? "bg-white text-[#081020]" : "hover:bg-white/10 hover:text-white"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function MobileMenu({ open, setOpen, t, lang, setLang }) {
  const hrefs = ["#solutions", "#how", "#results", "#pricing", "#faq"];
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          className="absolute left-4 right-4 top-[76px] z-50 rounded-3xl border border-white/10 bg-[#081020]/95 p-4 shadow-2xl backdrop-blur-xl md:hidden"
        >
          <div className="mb-4 flex items-center justify-between">
            <LanguageToggle lang={lang} setLang={setLang} />
            <button
              onClick={() => setOpen(false)}
              className="rounded-xl p-2 text-white/70 hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="grid gap-2">
            {t.nav.map((item, i) => (
              <a
                key={item}
                onClick={() => setOpen(false)}
                href={hrefs[i]}
                className="rounded-2xl px-4 py-3 text-white/75 hover:bg-white/10 hover:text-white"
              >
                {item}
              </a>
            ))}
          </div>
          <PrimaryButton className="mt-4 w-full px-5 py-3 text-sm">
            {t.demo} <ArrowRight className="ml-2 h-4 w-4" />
          </PrimaryButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function HeroVisual({ t }) {
  const v = t.visual;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="relative mx-auto h-auto min-h-[540px] w-full max-w-[640px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 shadow-[0_40px_120px_rgba(0,0,0,.48)] backdrop-blur-xl sm:p-6 lg:h-[520px] lg:min-h-0"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(123,92,255,.20),transparent_30%),radial-gradient(circle_at_18%_82%,rgba(255,90,77,.16),transparent_32%)]" />
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,.65)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.65)_1px,transparent_1px)] [background-size:34px_34px]" />
      <motion.div
        className="absolute left-[44%] top-[29%] hidden h-[2px] w-[180px] origin-left bg-gradient-to-r from-[#FF5A4D] to-[#FFB020] sm:block"
        animate={{ opacity: [0.35, 1, 0.35], scaleX: [0.55, 1.08, 0.55] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[44%] top-[50%] hidden h-[2px] w-[180px] origin-left bg-gradient-to-r from-[#7B5CFF] to-[#FF5A4D] sm:block"
        animate={{ opacity: [0.3, 1, 0.3], scaleX: [0.5, 1.04, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[49%] top-[23%] h-[260px] w-[260px] rounded-full border border-[#FF5A4D]/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute right-[-80px] bottom-[-70px] h-60 w-60 rounded-full bg-[#7B5CFF]/20 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="relative z-10 grid h-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        <div className="space-y-4">
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-2xl border border-white/10 bg-[#0D172A]/82 p-4 shadow-2xl"
          >
            <p className="mb-3 text-xs uppercase tracking-[.22em] text-white/45">{v.pipeline}</p>
            {[[v.lead, v.captured], [v.follow, v.sent], [v.booked, v.confirmed]].map(
              ([item, desc], i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.16 }}
                  className="mb-3 rounded-xl border border-white/10 bg-white/[0.045] p-3"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        i === 0 ? "bg-[#FFB020]" : i === 1 ? "bg-[#7B5CFF]" : "bg-emerald-400"
                      }`}
                    />
                    <p className="text-sm font-semibold text-white">{item}</p>
                  </div>
                  <p className="mt-1 text-xs text-white/45">{desc}</p>
                </motion.div>
              )
            )}
          </motion.div>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-2xl border border-white/10 bg-[#0D172A]/78 p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[.2em] text-white/45">{v.whatsapp}</p>
              <Smartphone className="h-4 w-4 text-[#FFB020]" />
            </div>
            <div className="rounded-xl bg-[#25D366]/10 p-3 text-xs leading-5 text-white/75">
              {v.waMsg}
            </div>
          </motion.div>
        </div>
        <div className="space-y-4">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-2xl border border-white/10 bg-[#0D172A]/82 p-4 shadow-2xl"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[.2em] text-white/45">{v.chat}</p>
              <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[10px] font-bold text-emerald-300">
                online
              </span>
            </div>
            <div className="space-y-2">
              <div className="w-3/4 rounded-xl bg-white/10 p-2 text-xs text-white/80">
                Hi! How can I help?
              </div>
              <div className="ml-auto w-4/5 rounded-xl bg-[#7B5CFF]/30 p-2 text-xs text-white/80">
                {v.user}
              </div>
              <div className="w-full rounded-xl bg-white/10 p-2 text-xs text-white/80">{v.bot}</div>
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-2xl border border-white/10 bg-[#0D172A]/82 p-4"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-white">{v.voice}</p>
                <p className="mt-1 text-xs leading-5 text-white/45">{v.voiceText}</p>
              </div>
              <motion.div
                className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#FF5A4D] to-[#7B5CFF]"
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(255,90,77,0)",
                    "0 0 36px rgba(255,90,77,.45)",
                    "0 0 0 rgba(255,90,77,0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Mic2 className="h-5 w-5 text-white" />
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-2xl border border-white/10 bg-[#0D172A]/82 p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">{v.call}</p>
                <p className="mt-1 text-xs text-white/50">{v.time}</p>
              </div>
              <CalendarDays className="h-6 w-6 text-[#FF5A4D]" />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function TypingBubble() {
  return (
    <div className="inline-flex items-center gap-1 rounded-2xl bg-white/10 px-4 py-3">
      <span className="h-2 w-2 animate-bounce rounded-full bg-white/60 [animation-delay:-0.2s]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-white/60 [animation-delay:-0.1s]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-white/60" />
    </div>
  );
}

function Chatbot({ t }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("start");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([{ from: "bot", text: t.chat.intro }]);
  const [input, setInput] = useState("");
  const [booking, setBooking] = useState({ name: "", email: "", business: "", time: "" });
  const bottomRef = useRef(null);

  useEffect(() => {
    setMessages([{ from: "bot", text: t.chat.intro }]);
    setStep("start");
  }, [t.chat.intro]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, open, step]);

  function botReply(text) {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: "bot", text }]);
    }, 650);
  }

  function handleUser(text) {
    const clean = text.trim();
    if (!clean) return;
    setMessages((m) => [...m, { from: "user", text: clean }]);
    setInput("");
    const s = t.chat;
    const q = clean.toLowerCase();
    if (
      q.includes("book") ||
      q.includes("appointment") ||
      q.includes("audit") ||
      q.includes("cita") ||
      q.includes("agendar")
    ) {
      setStep("booking");
      botReply(s.booking);
      return;
    }
    if (
      q.includes("price") ||
      q.includes("cost") ||
      q.includes("how much") ||
      q.includes("precio") ||
      q.includes("cuanto") ||
      q.includes("cuánto")
    ) {
      botReply(s.price);
      return;
    }
    if (
      q.includes("what") ||
      q.includes("build") ||
      q.includes("service") ||
      q.includes("constru") ||
      q.includes("hacen") ||
      q.includes("servicio")
    ) {
      botReply(s.build);
      return;
    }
    if (q.includes("whatsapp") || q.includes("wa")) {
      botReply(s.wa);
      return;
    }
    if (
      q.includes("voice") ||
      q.includes("call") ||
      q.includes("phone") ||
      q.includes("llamada") ||
      q.includes("voz")
    ) {
      botReply(s.voice);
      return;
    }
    if (
      q.includes("calendar") ||
      q.includes("calendly") ||
      q.includes("google") ||
      q.includes("agenda")
    ) {
      botReply(s.calendar);
      return;
    }
    if (q.includes("guarantee") || q.includes("garant")) {
      botReply(s.guarantee);
      return;
    }
    botReply(s.fallback);
  }

  function submitBooking(e) {
    e.preventDefault();
    const missing = Object.entries(booking).find(([, v]) => !v.trim());
    if (missing) {
      botReply(t.chat.missing);
      return;
    }
    setMessages((m) => [
      ...m,
      {
        from: "user",
        text: `Booking request: ${booking.name}, ${booking.email}, ${booking.business}, ${booking.time}`,
      },
      { from: "bot", text: t.chat.done },
    ]);
    setStep("done");
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-5 sm:right-5">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="mb-4 h-[76vh] w-[calc(100vw-2rem)] overflow-hidden rounded-[1.7rem] border border-white/15 bg-[#081020]/95 shadow-[0_35px_100px_rgba(0,0,0,.55)] backdrop-blur-xl sm:h-[640px] sm:w-[360px]"
          >
            <div className="relative flex items-center justify-between border-b border-white/10 bg-white/[0.035] p-4">
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#FF5A4D] to-transparent" />
              <div className="flex min-w-0 items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#FF5A4D] via-[#FFB020] to-[#7B5CFF] shadow-[0_0_34px_rgba(123,92,255,.35)]">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-white">{t.chat.title}</p>
                  <p className="flex items-center gap-1 text-xs text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> {t.chat.online}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-2 text-white/60 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="h-[calc(76vh-220px)] space-y-3 overflow-y-auto p-4 sm:h-[400px]">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      m.from === "user" ? "bg-[#7B5CFF] text-white" : "bg-white/10 text-white/85"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && <TypingBubble />}
              {step === "booking" && (
                <form
                  onSubmit={submitBooking}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-3"
                >
                  <p className="mb-3 text-sm font-semibold text-white">{t.chat.formTitle}</p>
                  <div className="space-y-2">
                    <input
                      placeholder={t.chat.name}
                      value={booking.name}
                      onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-[#0D172A] px-3 py-2 text-sm text-white outline-none focus:border-[#7B5CFF]"
                    />
                    <input
                      placeholder={t.chat.email}
                      value={booking.email}
                      onChange={(e) => setBooking({ ...booking, email: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-[#0D172A] px-3 py-2 text-sm text-white outline-none focus:border-[#7B5CFF]"
                    />
                    <input
                      placeholder={t.chat.business}
                      value={booking.business}
                      onChange={(e) => setBooking({ ...booking, business: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-[#0D172A] px-3 py-2 text-sm text-white outline-none focus:border-[#7B5CFF]"
                    />
                    <select
                      value={booking.time}
                      onChange={(e) => setBooking({ ...booking, time: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-[#0D172A] px-3 py-2 text-sm text-white outline-none focus:border-[#7B5CFF]"
                    >
                      <option value="">{t.chat.time}</option>
                      {t.chat.times.map((x) => (
                        <option key={x}>{x}</option>
                      ))}
                    </select>
                    <button className="w-full rounded-xl bg-[#FF5A4D] py-2 text-sm font-semibold text-white hover:bg-[#ff4a3b]">
                      {t.chat.submit}
                    </button>
                  </div>
                </form>
              )}
              <div ref={bottomRef} />
            </div>
            <div className="border-t border-white/10 p-3">
              <div className="mb-2 flex flex-wrap gap-2">
                {t.chat.quick.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleUser(q)}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/75 hover:border-[#7B5CFF] hover:text-white"
                  >
                    {q}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUser(input);
                }}
                className="flex gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t.chat.input}
                  className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white outline-none focus:border-[#7B5CFF]"
                />
                <button className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#7B5CFF] text-white hover:bg-[#6b4df0]">
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="ml-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF5A4D] via-[#FFB020] to-[#7B5CFF] text-white shadow-[0_20px_70px_rgba(123,92,255,.45)]"
      >
        {open ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </motion.button>
    </div>
  );
}

function SectionTitle({ eyebrow, title, accent, subtitle }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[.35em] text-[#FFB020]">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
        {title} <span className="text-[#FF5A4D]">{accent}</span>
      </h2>
      {subtitle && (
        <p className="mt-5 text-base leading-8 text-white/60 sm:text-lg">{subtitle}</p>
      )}
    </div>
  );
}

export default function YasasLandingPage() {
  const [lang, setLang] = useState("en");
  const [faqOpen, setFaqOpen] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[lang];
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, -40]);
  const hrefs = ["#solutions", "#how", "#results", "#pricing", "#faq"];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#081020] font-sans text-white selection:bg-[#FF5A4D]/40">
      <AnimatedBackground />

      {/* HEADER */}
      <header className="relative z-40 mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 sm:py-6">
        <YasasLogo small />
        <nav className="hidden items-center gap-8 text-sm text-white/70 lg:flex">
          {t.nav.map((item, i) => (
            <a key={item} href={hrefs[i]} className="hover:text-white transition">
              {item}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <LanguageToggle lang={lang} setLang={setLang} />
          <PrimaryButton className="px-5 py-3 text-sm">
            {t.demo} <ArrowRight className="ml-2 h-4 w-4" />
          </PrimaryButton>
        </div>
        <button
          onClick={() => setMenuOpen(true)}
          className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-white md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <MobileMenu open={menuOpen} setOpen={setMenuOpen} t={t} lang={lang} setLang={setLang} />
      </header>

      <main className="relative z-10">
        {/* HERO */}
        <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-14 lg:grid-cols-2 lg:gap-14 lg:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#7B5CFF]/40 bg-[#7B5CFF]/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[.2em] text-white/80 sm:text-xs sm:tracking-[.25em]">
              <Sparkles className="h-4 w-4 shrink-0 text-[#FFB020]" /> {t.badge}
            </div>
            <h1 className="mx-auto max-w-4xl text-4xl font-black leading-[1.02] tracking-tight text-white sm:text-5xl md:text-6xl lg:mx-0 lg:text-7xl">
              {t.hero}{" "}
              <span className="bg-gradient-to-r from-[#FF5A4D] to-[#FFB020] bg-clip-text text-transparent">
                {t.heroAccent}
              </span>
            </h1>
            <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-white/65 sm:text-lg md:text-xl md:leading-9 lg:mx-0">
              {t.sub}
            </p>
            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <PrimaryButton>
                {t.cta} <ArrowRight className="ml-2 h-5 w-5 transition group-hover:translate-x-1" />
              </PrimaryButton>
              <motion.a
                href="#how"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.03] px-7 py-4 font-bold text-white hover:bg-white/[0.07]"
              >
                {t.secondary} <Play className="ml-2 h-5 w-5" />
              </motion.a>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-5 text-sm text-white/60 lg:justify-start">
              {t.bullets.map((x) => (
                <div key={x} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#7B5CFF]" />
                  {x}
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div style={{ y: heroY }} className="lg:block">
            <HeroVisual t={t} />
          </motion.div>
        </section>

        {/* TRUST BAR */}
        <Reveal>
          <section className="mx-auto max-w-7xl border-y border-white/10 px-4 py-8 sm:px-6">
            <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[.35em] text-white/35">
              {t.trusted}
            </p>
            <div className="grid grid-cols-2 gap-6 text-center text-lg font-bold text-white/35 sm:text-xl md:grid-cols-6">
              {["nextwave", "Elevate", "Flow", "KODA", "momentum", "Lumen"].map((x) => (
                <div key={x}>{x}</div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* SOLUTIONS */}
        <section id="solutions" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
          <SectionTitle
            eyebrow={t.solutionsEyebrow}
            title={t.solutionsTitle}
            accent={t.solutionsAccent}
            subtitle={t.solutionsSub}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.services.map(([title, text], i) => {
              const Icon = serviceIcons[i];
              return (
                <Reveal key={title} delay={i * 0.06}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="group h-full rounded-[1.6rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur transition hover:border-[#7B5CFF]/60 hover:bg-white/[0.06]"
                  >
                    <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-[#101A30] text-[#FF5A4D] group-hover:text-[#FFB020]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                    <p className="mt-3 leading-7 text-white/55">{text}</p>
                    <p className="mt-6 flex items-center text-sm font-bold text-[#7B5CFF]">
                      {t.learn} <ArrowRight className="ml-1 h-4 w-4" />
                    </p>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <SectionTitle eyebrow={t.howEyebrow} title={t.howTitle} accent={t.howAccent} />
          <div className="grid gap-6 md:grid-cols-3">
            {t.steps.map(([title, desc], i) => (
              <Reveal key={title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="relative h-full rounded-[1.6rem] border border-white/10 bg-white/[0.035] p-8"
                >
                  <div className="mb-8 grid h-16 w-16 place-items-center rounded-full border border-[#FF5A4D]/40 bg-[#FF5A4D]/10 text-2xl font-black text-white">
                    0{i + 1}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{title}</h3>
                  <p className="mt-4 leading-7 text-white/55">{desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* RESULTS */}
        <section id="results" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <SectionTitle
            eyebrow={t.resultsEyebrow}
            title={t.resultsTitle}
            accent={t.resultsAccent}
          />
          <Reveal>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 sm:p-6 md:p-8">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {statNumbers.map((number, i) => (
                  <motion.div
                    whileHover={{ y: -6 }}
                    key={t.statLabels[i]}
                    className="rounded-2xl border border-white/10 bg-[#0D172A]/70 p-6"
                  >
                    <p className="text-sm text-white/45">{t.statLabels[i]}</p>
                    <p className="mt-3 text-4xl font-black text-white">{number}</p>
                    <p className="mt-2 text-sm text-emerald-300">
                      +{127 + i * 18}% vs last 30 days
                    </p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-white/10 bg-[#0D172A]/70 p-6">
                <div className="grid gap-8 lg:grid-cols-[1fr_2fr_1fr] lg:items-center">
                  <div className="flex items-center gap-4">
                    <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#FF5A4D] to-[#7B5CFF] sm:h-20 sm:w-20">
                      <YasasLogo small iconOnly />
                    </div>
                    <div>
                      <p className="font-bold text-white">Elevate Coaching</p>
                      <p className="text-sm text-white/45">Business Coaching</p>
                    </div>
                  </div>
                  <blockquote className="text-xl font-bold leading-8 text-white sm:text-2xl sm:leading-9">
                    "{t.testimonial}"
                  </blockquote>
                  <div className="space-y-2 text-sm text-white/65">
                    <p>
                      <span className="font-bold text-[#FFB020]">3X</span> more qualified leads
                    </p>
                    <p>
                      <span className="font-bold text-[#FFB020]">2X</span> more booked calls
                    </p>
                    <p>
                      <span className="font-bold text-[#FFB020]">187%</span> revenue lift
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* PRICING */}
        <section id="pricing" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <SectionTitle
            eyebrow={t.pricingEyebrow}
            title={t.pricingTitle}
            accent={t.pricingAccent}
            subtitle={t.pricingSub}
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {t.plans.map(([name, price, items], idx) => (
              <Reveal key={name} delay={idx * 0.1}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className={`h-full rounded-[2rem] border p-8 ${
                    idx === 1
                      ? "border-[#FF5A4D]/50 bg-[#FF5A4D]/10 shadow-[0_0_80px_rgba(255,90,77,.15)]"
                      : "border-white/10 bg-white/[0.035]"
                  }`}
                >
                  <p className="text-xl font-bold text-white">{name}</p>
                  <p className="mt-4 text-5xl font-black text-white">{price}</p>
                  <div className="mt-8 space-y-4">
                    {items.map((item) => (
                      <p key={item} className="flex items-center gap-3 text-white/65">
                        <Check className="h-5 w-5 shrink-0 text-[#FFB020]" />
                        {item}
                      </p>
                    ))}
                  </div>
                  <a
                    href="#booking"
                    className={`mt-8 inline-flex w-full items-center justify-center rounded-2xl px-5 py-4 font-bold ${
                      idx === 1
                        ? "bg-[#FF5A4D] text-white"
                        : "border border-white/10 bg-white/[0.04] text-white"
                    }`}
                  >
                    {t.start} <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* BOOKING / CTA */}
        <section id="booking" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-6 text-center shadow-2xl sm:p-8 md:p-14">
              <GradientOrb className="left-10 top-0 h-72 w-72 bg-[#7B5CFF]" />
              <GradientOrb className="right-0 bottom-0 h-72 w-72 bg-[#FF5A4D]" />
              <div className="relative z-10">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[.35em] text-[#FFB020]">
                  {t.bookingEyebrow}
                </p>
                <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-6xl">
                  {t.bookingTitle}{" "}
                  <span className="text-[#FF5A4D]">{t.bookingAccent}</span>
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
                  {t.bookingSub}
                </p>
                <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                  <PrimaryButton href="mailto:hello@yasas.io?subject=Free AI Audit Request">
                    {t.emailUs} <ArrowRight className="ml-2 h-5 w-5" />
                  </PrimaryButton>
                  <motion.button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] px-7 py-4 font-bold text-white"
                  >
                    {t.explore}
                  </motion.button>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
          <SectionTitle eyebrow={t.faqEyebrow} title={t.faqTitle} accent={t.faqAccent} />
          <div className="space-y-4">
            {t.faqs.map(([q, a], i) => (
              <Reveal key={q} delay={i * 0.05}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.035]">
                  <button
                    onClick={() => setFaqOpen(faqOpen === i ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left font-bold text-white"
                  >
                    {q}
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 transition ${faqOpen === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {faqOpen === i && (
                      <motion.p
                        key="faq-content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden px-6 pb-6 leading-8 text-white/60"
                      >
                        {a}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <YasasLogo small />
            <p className="mt-4 max-w-xs text-sm leading-7 text-white/50">{t.footer}</p>
          </div>
          <div>
            <p className="mb-4 font-bold text-white">{t.nav[0]}</p>
            <div className="space-y-2 text-sm text-white/50">
              <p>AI Chat Systems</p>
              <p>WhatsApp Automation</p>
              <p>AI Voice Agents</p>
              <p>CRM &amp; Booking Flows</p>
            </div>
          </div>
          <div>
            <p className="mb-4 font-bold text-white">Company</p>
            <div className="space-y-2 text-sm text-white/50">
              <p>About us</p>
              <p>{t.nav[1]}</p>
              <p>{t.nav[2]}</p>
              <p>{t.nav[3]}</p>
            </div>
          </div>
          <div>
            <p className="mb-4 font-bold text-white">{t.stay}</p>
            <p className="text-sm text-white/50">{t.stayText}</p>
            <div className="mt-4 flex rounded-2xl border border-white/10 bg-white/[0.04] p-1">
              <input
                placeholder={t.emailPlaceholder}
                className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none"
              />
              <button className="rounded-xl bg-[#7B5CFF] px-4 py-2">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-center text-xs text-white/30">
          © {new Date().getFullYear()} yasas.io — All rights reserved.
        </div>
      </footer>

      <Chatbot t={t} />
    </div>
  );
}
