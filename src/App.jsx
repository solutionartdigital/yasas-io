import React, { useEffect, useRef, useState } from "react";
// ThreeScene removed — using image background
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ArrowRight, BarChart3, Bot, CalendarDays, Check,
  ChevronDown, Menu, MessageSquare, Mic2, PhoneCall,
  Play, Send, Smartphone, Sparkles, Workflow, X,
} from "lucide-react";

// ─────────────────────────────────────────────
// COPY
// ─────────────────────────────────────────────
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
    solutionsSub: "A premium stack built to answer chats, automate WhatsApp, handle calls with AI voice agents, organize opportunities and book more appointments.",
    services: [
      ["AI Chat Assistants", "Website assistants that answer FAQs, qualify visitors and guide them to book or request a quote."],
      ["WhatsApp Automation", "Instant replies, lead qualification, reminders, follow-ups and internal alerts through WhatsApp flows."],
      ["AI Voice Agents", "Human-like phone agents that answer calls, explain services, qualify callers and book appointments."],
      ["Complete Automations", "End-to-end workflows connecting forms, chats, calls, calendars, emails, CRMs and notifications."],
      ["Booking Systems", "Appointment flows that reduce friction and help customers schedule faster through calendar integrations."],
      ["CRM & Dashboards", "Simple tracking for leads, calls, conversations, bookings, pipeline value and next actions."],
    ],
    learn: "Learn more",
    learnModal: { industries: "Industries", timeline: "Timeline", cta: "Get a free audit" },
    serviceDetails: [
      {
        long: "A 24/7 AI assistant embedded on your website that instantly engages visitors, answers FAQs, qualifies leads and routes them to book — without any human needed.",
        features: ["Answers FAQs automatically, day or night", "Qualifies visitors with smart questions", "Collects name, email, phone and intent", "Routes to booking link or contact form", "Escalates to human agent when needed", "Custom branded persona and tone"],
        industries: "HVAC · Dental · Real Estate · Legal · Insurance · Coaching",
        timeline: "3–5 business days",
      },
      {
        long: "Turn WhatsApp into your best sales channel. Intelligent conversation flows respond instantly, guide customers, send reminders and qualify leads around the clock.",
        features: ["Instant auto-replies to new inquiries", "Lead qualification conversation flows", "Appointment reminders (24h + 1h before)", "Hot lead alerts to your team", "Broadcast messages for promotions", "Multi-step flows with decision logic"],
        industries: "Dental · HVAC · Real Estate · Restaurants · Coaches · Any WhatsApp-active business",
        timeline: "4–7 business days",
      },
      {
        long: "Never miss a call again. AI voice agents answer 24/7, speak naturally, explain your services, qualify callers and book appointments — all without a receptionist.",
        features: ["Answers calls 24/7, including after hours", "Natural conversational speech, not robotic IVR", "Qualifies callers and collects key details", "Books directly into your calendar", "Sends SMS follow-up after every call", "Call transcripts and recordings delivered to you"],
        industries: "HVAC · Dental · Medical · Legal · Real Estate · Home Services",
        timeline: "5–10 business days (script + testing)",
      },
      {
        long: "Connect every part of your business — forms, chats, calls, email, CRM, calendar and billing — into one automated workflow so nothing falls through the cracks.",
        features: ["Connects tools via Make, Zapier or n8n", "Auto-creates CRM contacts from any source", "Triggers email and SMS sequences on actions", "Notifies your team via Slack, WhatsApp or email", "Automates onboarding and invoice workflows", "Custom logic built for your specific process"],
        industries: "All industries with multi-step sales or service processes",
        timeline: "7–14 business days",
      },
      {
        long: "Remove friction from scheduling. Smart booking flows connect with Calendly or Google Calendar and send automatic confirmations, reminders and follow-ups.",
        features: ["Connects to Calendly or Google Calendar", "Qualification questions before booking", "Automatic confirmation emails and SMS", "Pre-appointment reminders (24h + 1h before)", "No-show follow-up automation", "Integrates with your CRM pipeline"],
        industries: "Dental · Medical · Legal · Coaching · Consulting · Home Services",
        timeline: "3–5 business days",
      },
      {
        long: "Know exactly where every lead and client stands. Visual pipelines and dashboards give you a real-time view of your business — simple, powerful, not overwhelming.",
        features: ["Visual pipeline by stage (lead → client)", "Tracks source, status and next action", "Call, chat and WhatsApp activity log", "Revenue forecasting by pipeline value", "Team assignment and notifications", "Weekly performance summary reports"],
        industries: "Any service business with a sales or client pipeline",
        timeline: "3–5 business days",
      },
    ],
    howEyebrow: "How it works",
    howTitle: "Simple. Strategic.",
    howAccent: "Scalable.",
    steps: [
      ["Discover & Audit", "We analyze your current funnel, response flow and missed opportunities."],
      ["Build & Automate", "We build your AI assistant, WhatsApp flow, voice agent, CRM and booking system."],
      ["Launch & Scale", "We launch, test, optimize and help you turn more conversations into clients."],
    ],
    resultsEyebrow: "Real Results",
    resultsTitle: "Systems that drive",
    resultsAccent: "real growth.",
    statLabels: ["Leads Captured", "Conversations", "Booked Calls", "Closed Deals"],
    testimonial: "yasas.io transformed our chaos into a predictable growth engine.",
    pricingEyebrow: "Pricing",
    pricingTitle: "Start lean. Upgrade",
    pricingAccent: "when ready.",
    pricingSub: "Simple launch packages for businesses that want practical AI implementation without agency bloat.",
    plans: [
      ["AI Starter Setup", "$497", ["AI audit", "Basic chatbot", "FAQ scripts", "Mini CRM", "Video walkthrough"]],
      ["Client Capture System", "$997", ["Landing page", "AI chatbot", "Lead form", "CRM pipeline", "Booking flow", "Follow-up automation"]],
      ["Automation Growth System", "$1,500+", ["WhatsApp automation", "AI voice agent setup", "Custom integrations", "Team notifications", "CRM dashboard", "15-day support"]],
    ],
    start: "Get started",
    bookingEyebrow: "Free AI Audit",
    bookingTitle: "Ready to turn chats and calls into",
    bookingAccent: "clients?",
    bookingSub: "Use the chatbot on this page to request a free audit. In production, this can connect to WhatsApp, Calendly, Google Calendar, email, CRM and AI voice agents for phone-based booking.",
    emailUs: "Email us",
    explore: "Explore again",
    faqEyebrow: "FAQ",
    faqTitle: "Questions before",
    faqAccent: "we build?",
    faqs: [
      ["What does yasas.io actually build?", "We build complete AI automation systems: landing pages, lead forms, WhatsApp automation, AI chat assistants, voice agents that answer calls, CRM tracking, booking flows and follow-up automations so businesses respond faster and close more opportunities."],
      ["Is this only for big companies?", "No. yasas.io is designed for small service businesses, consultants, coaches, local companies and online service providers that want practical AI without hiring a full tech team."],
      ["How fast can you launch a system?", "Most starter systems can be launched in 5–7 business days. More complete systems with WhatsApp, CRM workflows and AI voice agents usually take 7–14 business days depending on integrations, scripts and approvals."],
      ["Can your AI agents book appointments?", "Yes. Our AI chat, WhatsApp and voice agents can qualify leads, collect contact info, answer FAQs and send people to a booking link. In production, we can connect the system with Calendly, Google Calendar, WhatsApp, email, your CRM or tools like Make/Zapier."],
      ["Do you guarantee clients?", "We do not promise guaranteed revenue. We build the system that helps you capture, respond and follow up better. Results depend on your offer, traffic, market and sales process."],
    ],
    footer: "AI systems and automations that help businesses answer chats, automate WhatsApp, handle calls, capture leads, book appointments and scale with less chaos.",
    stay: "Stay in the loop",
    stayText: "Get tips, strategies and AI systems to grow your business.",
    emailPlaceholder: "Enter your email",
    chat: {
      title: "yasas AI Assistant", online: "Online now",
      intro: "Hi, I'm the yasas.io AI assistant. I can answer questions about chatbots, WhatsApp automations, AI voice agents, CRM workflows, or help you book a free AI audit.",
      quick: ["What do you build?", "Do you automate WhatsApp?", "Can AI answer phone calls?", "Book a free audit"],
      input: "Ask anything...",
      formTitle: "Request your free AI audit",
      name: "Name", email: "Email", business: "Business / website", time: "Preferred time",
      times: ["Today afternoon", "Tomorrow morning", "Tomorrow afternoon", "This week"],
      submit: "Request audit",
      booking: "Perfect. I can help you request a free AI audit. Please complete the short form below and we'll confirm availability.",
      price: "Launch packages start at $497 (AI Starter Setup), $997 (Client Capture System with landing page + chatbot + CRM + booking), and $1,500+ for the full Automation Growth System with WhatsApp, voice agent and custom integrations. Which one fits your stage?",
      build: "We build complete AI automation systems: website chatbots, WhatsApp automations, AI voice agents, CRM pipelines, booking flows, follow-up sequences and dashboards. All connected, all working 24/7. What's your biggest pain point right now?",
      wa: "Our WhatsApp flows do a lot: instant replies to new inquiries, multi-step lead qualification, appointment reminders (24h + 1h before), hot-lead alerts to your team, broadcast messages for promos, and no-show follow-ups. Everything connects to your CRM and calendar.",
      voice: "Our AI voice agents answer calls in under 2 seconds, 24/7. They speak naturally (not robotic IVR), introduce your business, answer FAQs, qualify the caller, collect their details and book appointments into your calendar. After each call you get a transcript and SMS summary.",
      calendar: "Yes. We connect Calendly or Google Calendar with smart qualification questions before booking. After booking: automatic confirmation email + SMS, reminders at 24h and 1h, post-appointment follow-up, and no-show re-engagement — all synced with your CRM.",
      guarantee: "We don't promise guaranteed revenue. What we do guarantee is a system built to capture every lead, respond instantly, and follow up automatically — so you stop losing opportunities to slow response times or missed calls.",
      chatbotInfo: "We build custom AI chat assistants that live on your website. They greet visitors, answer FAQs, qualify leads with smart questions, collect contact info and route people to book or request a quote — 24/7, with no manual effort. Fully branded to match your business.",
      automationsInfo: "We build end-to-end workflows using Make, Zapier or n8n. When a new lead comes in from any source, it's automatically added to your CRM, triggers an email/WhatsApp sequence, notifies your team and schedules a follow-up. We can automate intake, onboarding, invoicing, reminders and reporting.",
      bookingSystem: "Our booking flows remove all friction from scheduling. We connect Calendly or Google Calendar with qualification questions — so only real prospects book. Then: automatic confirmation email + SMS, 24h reminder, 1h reminder, post-appointment follow-up and no-show re-engagement. All synced with your CRM.",
      crmInfo: "We set up a simple visual CRM pipeline that tracks every lead from first contact to closed client: source, status, last action, pipeline value and next steps. It integrates with your chat, WhatsApp, voice agent and booking system so everything is in one place. No enterprise complexity.",
      industries: "We work with service businesses across many sectors: HVAC and home services, dental and medical practices, real estate agents and brokerages, law firms, insurance agencies, coaches and consultants. If your business handles leads, appointments or client communication — we can automate it. What industry are you in?",
      timeline: "Most systems launch in 5–14 business days: AI Chat (3–5 days), WhatsApp flows (4–7 days), Booking system (3–5 days), Voice agent (5–10 days, includes scripting + testing), Full automation stack (7–14 days). We move fast and keep you updated throughout.",
      support: "All packages include a video walkthrough and full documentation. The Automation Growth System includes 15 days of direct support. After that, we offer monthly maintenance retainers — new flows, script updates, seasonal campaigns, additional integrations. We're a long-term partner, not a one-time vendor.",
      integrations: "We integrate with: Calendly, Google Calendar, HubSpot, GoHighLevel, Airtable, Notion, Slack, WhatsApp Business, Gmail, Mailchimp, Stripe, Twilio, OpenAI, ElevenLabs, Make, Zapier, n8n and more. If you use a specific tool, tell us — we can almost always connect it.",
      roi: "Our clients typically see: 3x more leads captured vs. missing them after hours, 2x more booked calls vs. manual follow-up, and 40–60% less time on admin tasks. The chatbot and voice agent alone often pay for themselves within the first 30 days by capturing leads that would otherwise be lost.",
      howItWorks: "Step 1 — Free AI Audit: we review your current process and design your system. Step 2 — Build: we create your chatbot, WhatsApp flows, voice agent, CRM and booking integration. Step 3 — Launch & Train: we launch, test everything together and hand over full control. Most clients see results within the first week.",
      hvac: "For HVAC businesses: our AI voice agent answers calls 24/7 (especially after hours and weekends), qualifies service calls vs. estimates, books technician visits and sends automatic reminders. WhatsApp flows follow up on quotes and request reviews. You'll never miss a service call again.",
      dental: "For dental offices: AI chat handles appointment requests 24/7, answers patient FAQs and collects intake info. WhatsApp sends appointment reminders, 6-month recall messages and review requests. Voice agents answer calls when the front desk is busy. Patients get served faster, staff stays focused.",
      realEstate: "For real estate: our AI chat qualifies buyer and seller leads (location, budget, timeline), books property tours and auto-follows up on inactive leads. WhatsApp flows nurture prospects through long sales cycles. Voice agents answer listing inquiries at any hour — so no lead goes cold.",
      legal: "For law firms: AI chat qualifies potential clients (area of law, case type, urgency), collects initial info and books consultations — while screening out non-qualified inquiries. Voice agents handle after-hours calls professionally. WhatsApp follow-ups keep prospects engaged while they decide.",
      fallback: "Good question. yasas.io helps businesses stop losing leads by responding faster and following up automatically. Want to know about a specific service — chatbots, WhatsApp, voice agents? Or book a free audit?",
      missing: "Please fill in all fields so we can confirm your audit slot.",
      done: "Done — your audit request is ready. In production this is sent to your email and CRM, and synced with Calendly or Google Calendar for instant scheduling.",
      phonePlaceholder: "Phone number",
      quickAfterBuild: ["Tell me about chatbots", "WhatsApp automation?", "AI voice agents?", "How much does it cost?"],
      quickAfterPrice: ["What's in the $497 plan?", "Client Capture details?", "How long to launch?", "Book free audit"],
      quickAfterVoice: ["Voice for HVAC?", "Voice for dental?", "WhatsApp automation?", "Book free audit"],
      quickAfterWa: ["WhatsApp for dental?", "What about voice agents?", "Pricing?", "Book free audit"],
      quickAfterIndustries: ["Tell me about HVAC", "Dental automation?", "Real estate?", "Book free audit"],
      quickAfterTimeline: ["What's included?", "How much does it cost?", "Book free audit", "What industries?"],
      quickAfterSupport: ["How long to launch?", "Pricing?", "Book free audit", "What integrations?"],
      quickAfterIntegrations: ["WhatsApp automation?", "AI voice agents?", "Pricing?", "Book free audit"],
      quickAfterRoi: ["How does it work?", "Pricing?", "Book free audit", "What integrations?"],
    },
    visual: {
      pipeline: "Lead Pipeline", lead: "New Lead", follow: "AI Follow-up", booked: "Booked Call",
      captured: "Captured from website", sent: "Automatic reply sent", confirmed: "Appointment confirmed",
      whatsapp: "WhatsApp", waMsg: "Thanks for reaching out. Would you like pricing, availability or to book a consultation?",
      chat: "AI Chat", user: "I want more booked appointments.", bot: "Great — I can qualify you and schedule your audit.",
      voice: "Voice Agent", voiceText: "Answering calls, qualifying leads, booking appointments.",
      call: "Consultation Call", time: "Today, 2:30 PM",
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
    solutionsSub: "Un stack premium para responder chats, automatizar WhatsApp, atender llamadas con agentes de voz IA, organizar oportunidades y agendar más citas.",
    services: [
      ["Asistentes de chat IA", "Asistentes para web que responden dudas, califican visitantes y los guían a reservar o pedir presupuesto."],
      ["Automatización de WhatsApp", "Respuestas instantáneas, calificación de leads, recordatorios, seguimientos y alertas internas por WhatsApp."],
      ["Agentes de voz IA", "Agentes telefónicos que hablan de forma natural, responden llamadas, explican servicios, califican clientes y agendan citas."],
      ["Automatizaciones completas", "Flujos de punta a punta conectando formularios, chats, llamadas, calendarios, emails, CRM y notificaciones."],
      ["Sistemas de agenda", "Flujos de reserva que reducen fricción y ayudan a los clientes a agendar más rápido."],
      ["CRM y dashboards", "Seguimiento simple de leads, llamadas, conversaciones, citas, valor del pipeline y próximas acciones."],
    ],
    learn: "Ver más",
    learnModal: { industries: "Sectores", timeline: "Tiempo de entrega", cta: "Pedir auditoría gratis" },
    serviceDetails: [
      {
        long: "Un asistente IA disponible 24/7 en tu sitio web que responde visitantes al instante, califica leads y los guía a reservar — sin necesidad de personal humano.",
        features: ["Responde preguntas frecuentes automáticamente", "Califica visitantes con preguntas inteligentes", "Captura nombre, email, teléfono e intención", "Dirige a formulario de cita o contacto", "Escala a agente humano cuando sea necesario", "Persona personalizada con tono de tu marca"],
        industries: "HVAC · Dental · Inmobiliaria · Legal · Seguros · Coaching",
        timeline: "3–5 días hábiles",
      },
      {
        long: "Convierte WhatsApp en tu mejor canal de ventas. Flujos de conversación inteligentes responden al instante, guían al cliente, envían recordatorios y califican leads las 24 horas.",
        features: ["Respuestas automáticas a nuevas consultas", "Secuencias de calificación de leads", "Recordatorios de cita (24h + 1h antes)", "Alertas de leads calientes al equipo", "Mensajes broadcast para promociones", "Flujos con lógica de decisión"],
        industries: "Dental · HVAC · Inmobiliaria · Restaurantes · Coaches · Cualquier negocio activo en WhatsApp",
        timeline: "4–7 días hábiles",
      },
      {
        long: "Nunca pierdas una llamada. Los agentes de voz IA responden 24/7, hablan de forma natural, explican tus servicios, califican al cliente y agendan citas — sin recepcionista.",
        features: ["Responde llamadas 24/7, incluso fuera de horario", "Conversación natural, no menús IVR robóticos", "Califica al cliente y recoge sus datos", "Agenda directamente en tu calendario", "Envía SMS de seguimiento después de cada llamada", "Transcripciones y grabaciones de cada llamada"],
        industries: "HVAC · Dental · Médico · Legal · Inmobiliaria · Servicios para el hogar",
        timeline: "5–10 días hábiles (incluye scripts + pruebas)",
      },
      {
        long: "Conecta cada parte de tu negocio — formularios, chats, llamadas, email, CRM, calendario y facturación — en un flujo automatizado de punta a punta.",
        features: ["Conecta herramientas con Make, Zapier o n8n", "Crea contactos en CRM automáticamente", "Activa secuencias de email y WhatsApp", "Notifica a tu equipo por Slack, WhatsApp o email", "Automatiza onboarding y facturación", "Lógica personalizada para tu proceso específico"],
        industries: "Todos los sectores con procesos de venta o servicio en múltiples pasos",
        timeline: "7–14 días hábiles",
      },
      {
        long: "Elimina la fricción al agendar. Flujos inteligentes conectados con Calendly o Google Calendar con confirmaciones, recordatorios y seguimientos automáticos.",
        features: ["Conecta con Calendly o Google Calendar", "Preguntas de calificación antes de agendar", "Confirmación automática por email y SMS", "Recordatorios (24h + 1h antes de la cita)", "Seguimiento automático a no-shows", "Integrado con tu CRM"],
        industries: "Dental · Médico · Legal · Coaching · Consultoría · Servicios para el hogar",
        timeline: "3–5 días hábiles",
      },
      {
        long: "Sabe exactamente en qué estado está cada lead y cliente. Pipelines visuales y dashboards que te dan visibilidad en tiempo real de tu negocio — simple, no abrumador.",
        features: ["Pipeline visual por etapa (lead → cliente)", "Rastrea fuente, estado y próxima acción", "Historial de llamadas, chat y WhatsApp", "Proyección de ingresos por valor del pipeline", "Asignación de equipo y notificaciones", "Reportes semanales de desempeño"],
        industries: "Cualquier negocio de servicios con pipeline de ventas o clientes",
        timeline: "3–5 días hábiles",
      },
    ],
    howEyebrow: "Cómo funciona",
    howTitle: "Simple. Estratégico.",
    howAccent: "Escalable.",
    steps: [
      ["Auditoría", "Analizamos tu embudo actual, tiempos de respuesta y oportunidades perdidas."],
      ["Construcción", "Creamos tu asistente IA, flujo de WhatsApp, agente de voz, CRM y sistema de agenda."],
      ["Lanzamiento", "Lanzamos, probamos, optimizamos y te ayudamos a convertir más conversaciones en clientes."],
    ],
    resultsEyebrow: "Resultados",
    resultsTitle: "Sistemas que generan",
    resultsAccent: "crecimiento real.",
    statLabels: ["Leads capturados", "Conversaciones", "Citas agendadas", "Ventas cerradas"],
    testimonial: "yasas.io convirtió nuestro caos en un sistema de crecimiento predecible.",
    pricingEyebrow: "Precios",
    pricingTitle: "Empieza simple. Escala",
    pricingAccent: "cuando estés listo.",
    pricingSub: "Paquetes claros para negocios que quieren implementación práctica de IA sin complicaciones.",
    plans: [
      ["AI Starter Setup", "$497", ["Auditoría IA", "Chatbot básico", "Scripts de FAQ", "Mini CRM", "Video tutorial"]],
      ["Client Capture System", "$997", ["Landing page", "Chatbot IA", "Formulario de leads", "CRM pipeline", "Sistema de agenda", "Seguimiento automático"]],
      ["Automation Growth System", "$1,500+", ["Automatización WhatsApp", "Agente de voz IA", "Integraciones personalizadas", "Alertas al equipo", "Dashboard CRM", "Soporte 15 días"]],
    ],
    start: "Empezar",
    bookingEyebrow: "Auditoría IA gratis",
    bookingTitle: "¿Lista para convertir chats y llamadas en",
    bookingAccent: "clientes?",
    bookingSub: "Usa el chatbot de esta página para pedir una auditoría gratis. En producción, esto puede conectarse con WhatsApp, Calendly, Google Calendar, email, CRM y agentes de voz IA.",
    emailUs: "Escríbenos",
    explore: "Ver de nuevo",
    faqEyebrow: "FAQ",
    faqTitle: "Preguntas antes de",
    faqAccent: "construir",
    faqs: [
      ["¿Qué construye exactamente yasas.io?", "Creamos sistemas completos de automatización con IA: landing pages, formularios, automatización de WhatsApp, asistentes de chat, agentes de voz, CRM, agenda y seguimiento automático."],
      ["¿Esto es solo para empresas grandes?", "No. yasas.io está pensado para negocios de servicios, consultores, coaches y proveedores online que quieren usar IA sin contratar un equipo técnico completo."],
      ["¿Qué tan rápido se puede lanzar?", "Los sistemas starter suelen lanzarse en 5–7 días hábiles. Sistemas con WhatsApp, CRM y agentes de voz pueden tomar 7–14 días hábiles."],
      ["¿Los agentes IA pueden agendar citas?", "Sí. Los agentes de chat, WhatsApp y voz pueden calificar leads, recoger datos, responder dudas y enviar al cliente a una agenda conectada con Calendly o Google Calendar."],
      ["¿Garantizan clientes?", "No prometemos ingresos garantizados. Creamos el sistema que ayuda a capturar, responder y hacer seguimiento mejor."],
    ],
    footer: "Sistemas y automatizaciones con IA para responder chats, automatizar WhatsApp, atender llamadas, captar leads y escalar con menos caos.",
    stay: "Mantente al día",
    stayText: "Recibe ideas, estrategias y sistemas IA para crecer tu negocio.",
    emailPlaceholder: "Tu email",
    chat: {
      title: "Asistente IA yasas", online: "En línea",
      intro: "Hola, soy el asistente IA de yasas.io. Puedo responder dudas sobre chatbots, automatización de WhatsApp, agentes de voz IA, CRM o ayudarte a pedir una auditoría gratis.",
      quick: ["¿Qué construyen?", "¿Automatizan WhatsApp?", "¿La IA responde llamadas?", "Agendar auditoría gratis"],
      input: "Pregunta lo que quieras...",
      formTitle: "Pide tu auditoría IA gratis",
      name: "Nombre", email: "Email", business: "Negocio / web", time: "Horario preferido",
      times: ["Hoy en la tarde", "Mañana en la mañana", "Mañana en la tarde", "Esta semana"],
      submit: "Pedir auditoría",
      booking: "Perfecto. Te ayudo a pedir una auditoría IA gratis. Completa este formulario corto y confirmamos disponibilidad.",
      price: "Los paquetes empiezan en $497 (AI Starter Setup), $997 (Client Capture System con landing + chatbot + CRM + agenda) y $1,500+ para el sistema completo con WhatsApp, agente de voz e integraciones personalizadas. ¿Cuál encaja con tu etapa?",
      build: "Creamos sistemas completos de automatización con IA: chatbots web, automatización de WhatsApp, agentes de voz, CRM, flujos de agenda y seguimiento automático. Todo conectado, todo funcionando 24/7. ¿Cuál es tu mayor dolor ahora mismo?",
      wa: "Nuestros flujos de WhatsApp hacen mucho: respuestas instantáneas a nuevas consultas, calificación de leads en múltiples pasos, recordatorios de cita (24h + 1h antes), alertas de leads calientes al equipo, mensajes broadcast y seguimiento a no-shows. Todo conectado a tu CRM y calendario.",
      voice: "Nuestros agentes de voz IA responden llamadas en menos de 2 segundos, 24/7. Hablan de forma natural (no menús IVR), presentan tu negocio, responden preguntas, califican al cliente y agendan citas en tu calendario. Después de cada llamada recibes transcripción y resumen por SMS.",
      calendar: "Sí. Conectamos Calendly o Google Calendar con preguntas de calificación antes de agendar. Después: confirmación por email + SMS, recordatorio 24h, recordatorio 1h, seguimiento post-cita y reactivación de no-shows. Todo sincronizado con tu CRM.",
      guarantee: "No prometemos ingresos garantizados. Lo que sí garantizamos es un sistema que captura cada lead, responde al instante y da seguimiento automático — para que dejes de perder oportunidades por respuesta lenta o llamadas perdidas.",
      chatbotInfo: "Creamos asistentes de chat IA personalizados que viven en tu sitio web. Saludan visitantes, responden preguntas frecuentes, califican leads con preguntas inteligentes, recopilan datos de contacto y los dirigen a reservar o pedir presupuesto — 24/7, sin esfuerzo manual.",
      automationsInfo: "Creamos flujos de punta a punta con Make, Zapier o n8n. Cuando llega un nuevo lead de cualquier fuente, se agrega automáticamente al CRM, activa una secuencia de email/WhatsApp, notifica al equipo y agenda un seguimiento. Automatizamos captación, onboarding, facturación y reportes.",
      bookingSystem: "Nuestros flujos de agenda eliminan toda la fricción al reservar. Conectamos Calendly o Google Calendar con preguntas de calificación. Luego: confirmación automática por email + SMS, recordatorio 24h antes, recordatorio 1h antes, seguimiento post-cita y reactivación de no-shows.",
      crmInfo: "Configuramos un CRM visual simple que rastrea cada lead desde el primer contacto hasta cliente cerrado. Ves fuente, estado, última acción, valor del pipeline y próximos pasos. Se integra con tu chat, WhatsApp, agente de voz y sistema de agenda — todo en un lugar.",
      industries: "Trabajamos con negocios de servicios en muchos sectores: HVAC y servicios para el hogar, consultorios dentales y médicos, agentes inmobiliarios, despachos legales, agencias de seguros, coaches y consultores. Si tu negocio maneja leads, citas o comunicación con clientes — podemos automatizarlo. ¿En qué sector estás?",
      timeline: "La mayoría se lanza en 5–14 días hábiles: Chat IA (3–5 días), Flujos de WhatsApp (4–7 días), Sistema de agenda (3–5 días), Agente de voz (5–10 días, incluye scripts + pruebas), Stack completo (7–14 días). Avanzamos rápido y te mantenemos informado en todo momento.",
      support: "Todos los paquetes incluyen video tutorial y documentación completa. El Automation Growth System incluye 15 días de soporte directo. Después ofrecemos mantenimiento mensual: nuevos flujos, actualizaciones de scripts, campañas estacionales e integraciones adicionales. Somos un socio a largo plazo.",
      integrations: "Integramos con: Calendly, Google Calendar, HubSpot, GoHighLevel, Airtable, Notion, Slack, WhatsApp Business, Gmail, Mailchimp, Stripe, Twilio, OpenAI, ElevenLabs, Make, Zapier, n8n y más. Si usas alguna herramienta específica, dinos — casi siempre podemos conectarla.",
      roi: "Nuestros clientes suelen ver: 3x más leads capturados vs. perderlos fuera de horario, 2x más citas agendadas vs. seguimiento manual, y 40–60% menos tiempo en tareas administrativas. El chatbot y el agente de voz suelen pagar su costo en los primeros 30 días.",
      howItWorks: "Paso 1 — Auditoría gratuita: revisamos tu proceso actual y diseñamos tu sistema. Paso 2 — Construcción: creamos tu chatbot, flujos de WhatsApp, agente de voz, CRM e integración de agenda. Paso 3 — Lanzamiento: lanzamos, probamos todo juntos y te entregamos control total. La mayoría ve resultados en la primera semana.",
      hvac: "Para negocios de HVAC: nuestro agente de voz responde llamadas 24/7 (especialmente fuera de horario y fines de semana), califica si es reparación o presupuesto, agenda visitas del técnico y envía recordatorios automáticos. WhatsApp hace seguimiento de cotizaciones y pide reseñas. Nunca más pierdes una llamada de servicio.",
      dental: "Para consultorios dentales: el chat IA atiende solicitudes de cita 24/7, responde dudas frecuentes y recopila datos iniciales del paciente. WhatsApp envía recordatorios, mensajes de revisión semestral y solicitudes de reseña. Los agentes de voz atienden cuando la recepcionista está ocupada.",
      realEstate: "Para inmobiliarias: el chat IA califica leads de compra y venta (zona, presupuesto, plazo), agenda tours y da seguimiento automático a leads inactivos. WhatsApp nutre prospectos en ciclos de venta largos. Los agentes de voz atienden consultas sobre propiedades a cualquier hora.",
      legal: "Para despachos legales: el chat IA califica clientes potenciales (área legal, tipo de caso, urgencia), recopila información inicial y agenda consultas — filtrando consultas no calificadas. Los agentes de voz atienden llamadas fuera de horario de forma profesional.",
      fallback: "Buena pregunta. yasas.io ayuda a dejar de perder leads respondiendo más rápido y dando seguimiento automático. ¿Quieres saber más sobre chatbots, WhatsApp, agentes de voz? ¿O prefieres agendar una auditoría gratis?",
      missing: "Por favor completa todos los campos para confirmar tu horario de auditoría.",
      done: "Listo — tu solicitud quedó registrada. En producción se envía a tu email y CRM, y se sincroniza con Calendly o Google Calendar para confirmar de inmediato.",
      phonePlaceholder: "Número de teléfono",
      quickAfterBuild: ["Cuéntame sobre chatbots", "¿Automatización WhatsApp?", "¿Agentes de voz IA?", "¿Cuánto cuesta?"],
      quickAfterPrice: ["¿Qué incluye el plan $497?", "¿Detalles de Client Capture?", "¿Cuánto tiempo tarda?", "Agendar auditoría"],
      quickAfterVoice: ["¿Voz para HVAC?", "¿Voz para dental?", "¿Automatización WhatsApp?", "Agendar auditoría"],
      quickAfterWa: ["¿WhatsApp para dental?", "¿Agentes de voz?", "¿Precios?", "Agendar auditoría"],
      quickAfterIndustries: ["Cuéntame sobre HVAC", "¿Automatización dental?", "¿Inmobiliaria?", "Agendar auditoría"],
      quickAfterTimeline: ["¿Qué incluye?", "¿Cuánto cuesta?", "Agendar auditoría", "¿Qué sectores?"],
      quickAfterSupport: ["¿Cuánto tiempo tarda?", "¿Precios?", "Agendar auditoría", "¿Qué integraciones?"],
      quickAfterIntegrations: ["¿Automatización WhatsApp?", "¿Agentes de voz?", "¿Precios?", "Agendar auditoría"],
      quickAfterRoi: ["¿Cómo funciona?", "¿Precios?", "Agendar auditoría", "¿Qué integraciones?"],
    },
    visual: {
      pipeline: "Pipeline de leads", lead: "Nuevo lead", follow: "Seguimiento IA", booked: "Cita agendada",
      captured: "Capturado desde la web", sent: "Respuesta automática enviada", confirmed: "Cita confirmada",
      whatsapp: "WhatsApp", waMsg: "Gracias por escribir. ¿Quieres precios, disponibilidad o agendar una consulta?",
      chat: "Chat IA", user: "Quiero más citas agendadas.", bot: "Perfecto — puedo calificarte y agendar tu auditoría.",
      voice: "Agente de voz", voiceText: "Responde llamadas, califica leads y agenda citas.",
      call: "Consulta", time: "Hoy, 2:30 PM",
    },
  },
};

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────
const serviceIcons = [MessageSquare, Smartphone, PhoneCall, Workflow, CalendarDays, BarChart3];
const statNumbers = ["382", "1,276", "342", "89"];
const trustLogos = ["nextwave", "Elevate", "Flow", "KODA", "momentum", "Lumen", "Apex", "Stride"];

const typewriterWords = {
  en: ["clients.", "revenue.", "growth.", "results."],
  es: ["clientes.", "ingresos.", "crecimiento.", "resultados."],
};

const liveActivities = [
  { icon: "📞", text: "AI answered a call",      color: "#10b981" },
  { icon: "✅", text: "New lead captured",        color: "#FFB020" },
  { icon: "💬", text: "WhatsApp reply sent",      color: "#a78bfa" },
  { icon: "📅", text: "Appointment booked",       color: "#10b981" },
  { icon: "⚡", text: "Response in 0.8s",         color: "#FF5A4D" },
  { icon: "🔔", text: "Follow-up automated",      color: "#a78bfa" },
];

// ─────────────────────────────────────────────
// SCROLL PROGRESS BAR
// ─────────────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[#FF5A4D] via-[#FFB020] to-[#7B5CFF]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

// ─────────────────────────────────────────────
// CURSOR GLOW (desktop only)
// ─────────────────────────────────────────────
function CursorGlow() {
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const springX = useSpring(x, { stiffness: 80, damping: 20 });
  const springY = useSpring(y, { stiffness: 80, damping: 20 });

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const move = (e) => { x.set(e.clientX - 240); y.set(e.clientY - 240); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed z-[55] hidden h-[480px] w-[480px] rounded-full md:block"
      style={{
        x: springX, y: springY,
        background: "radial-gradient(circle, rgba(123,92,255,0.10) 0%, rgba(255,90,77,0.04) 40%, transparent 70%)",
      }}
    />
  );
}

// ─────────────────────────────────────────────
// TYPEWRITER
// ─────────────────────────────────────────────
function TypewriterText({ lang }) {
  const words = typewriterWords[lang] || typewriterWords.en;
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let t;
    if (!deleting) {
      if (charIdx < word.length) {
        t = setTimeout(() => setCharIdx((c) => c + 1), 85);
      } else {
        t = setTimeout(() => setDeleting(true), 2400);
      }
    } else {
      if (charIdx > 0) {
        t = setTimeout(() => setCharIdx((c) => c - 1), 42);
      } else {
        setDeleting(false);
        setWordIdx((i) => (i + 1) % words.length);
      }
    }
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words]);

  return (
    <span className="bg-gradient-to-r from-[#FF5A4D] to-[#FFB020] bg-clip-text text-transparent">
      {words[wordIdx].slice(0, charIdx)}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.55, repeat: Infinity, repeatType: "reverse" }}
        className="text-[#FF5A4D]"
      >|</motion.span>
    </span>
  );
}

// ─────────────────────────────────────────────
// ANIMATED COUNTER
// ─────────────────────────────────────────────
function AnimatedCounter({ raw }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);
  const numeric = parseInt(raw.replace(/[^0-9]/g, ""), 10);
  const hasComma = raw.includes(",");
  const suffix = raw.replace(/[0-9,]/g, "");

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * numeric));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, numeric]);

  const formatted = hasComma ? count.toLocaleString() : String(count);
  return <span ref={ref}>{formatted}{suffix}</span>;
}

// ─────────────────────────────────────────────
// LIVE ACTIVITY FEED (inside hero visual)
// ─────────────────────────────────────────────
function LiveActivity() {
  const [items, setItems] = useState([]);
  const idx = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const activity = liveActivities[idx.current % liveActivities.length];
      idx.current += 1;
      const id = Date.now();
      setItems((prev) => [...prev.slice(-1), { ...activity, id }]);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-3 left-3 right-3 z-20 space-y-2">
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#050e1c]/90 px-3 py-2 shadow-xl backdrop-blur-md"
          >
            <span className="text-sm">{item.icon}</span>
            <span className="text-xs font-semibold" style={{ color: item.color }}>{item.text}</span>
            <span className="relative ml-auto flex h-2 w-2">
              <span className="ping-slow absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────
// TILT CARD
// ─────────────────────────────────────────────
function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  function onMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (px - 0.5) * 16, y: (py - 0.5) * -16 });
    setGlowPos({ x: px * 100, y: py * 100 });
  }

  function onLeave() {
    setTilt({ x: 0, y: 0 });
    setGlowPos({ x: 50, y: 50 });
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={{ rotateX: tilt.y, rotateY: tilt.x }}
      transition={{ type: "spring", stiffness: 180, damping: 22 }}
      style={{ transformPerspective: 900, transformStyle: "preserve-3d" }}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[1.6rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(123,92,255,0.18) 0%, transparent 65%)` }}
      />
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// SERVICE MODAL
// ─────────────────────────────────────────────
function ServiceModal({ idx, t, onClose }) {
  const service = idx !== null ? t.services[idx] : null;
  const detail = idx !== null ? t.serviceDetails[idx] : null;
  const Icon = idx !== null ? serviceIcons[idx] : null;
  const lm = t.learnModal;

  return (
    <AnimatePresence>
      {idx !== null && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center sm:p-6"
          onClick={onClose}
        >
          <motion.div className="absolute inset-0 bg-black/65 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/10 bg-[#081020]/97 shadow-[0_40px_120px_rgba(0,0,0,.7)] backdrop-blur-xl"
          >
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#FF5A4D] via-[#FFB020] to-[#7B5CFF]" />
            <div className="p-6 sm:p-8">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-[#7B5CFF]/30 bg-[#7B5CFF]/10 text-[#FF5A4D]">
                    {Icon && <Icon className="h-6 w-6" />}
                  </div>
                  <h3 className="text-xl font-bold leading-tight text-white">{service?.[0]}</h3>
                </div>
                <button onClick={onClose} className="rounded-full p-2 text-white/50 transition hover:bg-white/10 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="mb-5 leading-7 text-white/70">{detail?.long}</p>
              <div className="mb-5 space-y-2.5">
                {detail?.features.map((f) => (
                  <div key={f} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FFB020]" />
                    <span className="text-sm leading-6 text-white/80">{f}</span>
                  </div>
                ))}
              </div>
              <div className="mb-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/35">{lm.industries}</p>
                  <p className="text-xs leading-5 text-white/70">{detail?.industries}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/35">{lm.timeline}</p>
                  <p className="text-sm font-bold text-white">{detail?.timeline}</p>
                </div>
              </div>
              <PrimaryButton href="#booking" className="w-full justify-center text-sm" onClick={onClose}>
                {lm.cta} <ArrowRight className="ml-2 h-4 w-4" />
              </PrimaryButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────
// YASAS LOGO
// ─────────────────────────────────────────────
function YasasLogo({ small = false, iconOnly = false }) {
  const size = small ? 38 : 54;
  const textSize = small ? "text-2xl" : "text-4xl";
  return (
    <div className="flex items-center gap-3">
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className="shrink-0 overflow-visible drop-shadow-[0_0_22px_rgba(123,92,255,.28)]">
        <defs>
          <linearGradient id="yasasLeft" x1="14" y1="12" x2="30" y2="34" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF7A4D" /><stop offset="1" stopColor="#FF4D4D" />
          </linearGradient>
          <linearGradient id="yasasRight" x1="50" y1="12" x2="34" y2="34" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8B5CFF" /><stop offset="1" stopColor="#6D4DFF" />
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

// ─────────────────────────────────────────────
// ANIMATED BACKGROUND (+ mouse parallax)
// ─────────────────────────────────────────────
function AnimatedBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const orb1X = useSpring(useTransform(mouseX, [-1, 1], [-40, 40]), { stiffness: 40, damping: 25 });
  const orb1Y = useSpring(useTransform(mouseY, [-1, 1], [-25, 25]), { stiffness: 40, damping: 25 });
  const orb2X = useSpring(useTransform(mouseX, [-1, 1], [30, -30]), { stiffness: 35, damping: 25 });
  const orb2Y = useSpring(useTransform(mouseY, [-1, 1], [20, -20]), { stiffness: 35, damping: 25 });

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX / window.innerWidth * 2 - 1);
      mouseY.set(e.clientY / window.innerHeight * 2 - 1);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#04050f]">
      {/* ── Main background: animated fiber-optic streams image ── */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: [1, 1.04, 1], x: [0, -12, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        style={{ willChange: "transform" }}
      >
        <img
          src="/assets/ai-background.png"
          alt=""
          aria-hidden="true"
          fetchpriority="high"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* ── Dark vignette — lighter so the image breathes ── */}
      <div className="absolute inset-0 bg-[#04050f]/38" />

      {/* ── Subtle grid overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(180,160,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(180,160,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Brand color radial gradients (stronger than before) ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_12%_18%,rgba(123,92,255,.28),transparent_42%),radial-gradient(ellipse_at_82%_72%,rgba(255,90,77,.18),transparent_38%),radial-gradient(ellipse_at_50%_50%,rgba(255,176,32,.07),transparent_55%)]" />

      {/* ── Animated orbs ── */}
      <motion.div
        className="absolute -left-20 top-20 h-[28rem] w-[28rem] rounded-full bg-[#7B5CFF]/22 blur-3xl"
        style={{ x: orb1X, y: orb1Y }}
      />
      <motion.div
        className="absolute right-0 top-36 h-[32rem] w-[32rem] rounded-full bg-[#FF5A4D]/14 blur-3xl"
        style={{ x: orb2X, y: orb2Y }}
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

// ─────────────────────────────────────────────
// REVEAL
// ─────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "", direction = "up" }) {
  const initial = {
    up:    { opacity: 0, y: 36 },
    down:  { opacity: 0, y: -36 },
    left:  { opacity: 0, x: -36 },
    right: { opacity: 0, x: 36 },
  }[direction];

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// PRIMARY BUTTON (+ shimmer)
// ─────────────────────────────────────────────
function PrimaryButton({ children, href = "#booking", className = "" }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href={href}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-[#FF5A4D] px-7 py-4 font-bold text-white shadow-[0_20px_70px_rgba(255,90,77,.28)] ${className}`}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-[#FF5A4D] via-[#FFB020] to-[#FF5A4D] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <AnimatePresence>
        {hovered && (
          <motion.span
            key="shimmer"
            className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "250%" }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
      <span className="relative z-10 inline-flex items-center">{children}</span>
    </motion.a>
  );
}

function LanguageToggle({ lang, setLang }) {
  return (
    <div className="flex rounded-2xl border border-white/10 bg-white/[0.04] p-1 text-xs font-bold text-white/65">
      {[["en", "EN"], ["es", "ES"]].map(([key, label]) => (
        <button key={key} onClick={() => setLang(key)}
          className={`rounded-xl px-3 py-2 transition ${lang === key ? "bg-white text-[#081020]" : "hover:bg-white/10 hover:text-white"}`}>
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
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
          className="absolute left-4 right-4 top-[76px] z-50 rounded-3xl border border-white/10 bg-[#081020]/95 p-4 shadow-2xl backdrop-blur-xl md:hidden">
          <div className="mb-4 flex items-center justify-between">
            <LanguageToggle lang={lang} setLang={setLang} />
            <button onClick={() => setOpen(false)} className="rounded-xl p-2 text-white/70 hover:bg-white/10"><X className="h-5 w-5" /></button>
          </div>
          <div className="grid gap-2">
            {t.nav.map((item, i) => (
              <a key={item} onClick={() => setOpen(false)} href={hrefs[i]} className="rounded-2xl px-4 py-3 text-white/75 hover:bg-white/10 hover:text-white">{item}</a>
            ))}
          </div>
          <PrimaryButton className="mt-4 w-full px-5 py-3 text-sm">{t.demo} <ArrowRight className="ml-2 h-4 w-4" /></PrimaryButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────
// AI VOICE CALL DEMO (HVAC)
// ─────────────────────────────────────────────
const CALL_LINES = [
  { speaker: "ai",     text: "Thank you for calling Mike's HVAC. I'm Aria, your AI assistant. How can I help you?" },
  { speaker: "client", text: "My AC stopped working and it's 95°F in here. I need someone today!" },
  { speaker: "ai",     text: "I understand — that's urgent. I'm checking availability for emergency service right now..." },
  { speaker: "ai",     text: "I have a technician available today at 4:00 PM. May I get your address?" },
  { speaker: "client", text: "245 Oak Street, Tampa FL" },
  { speaker: "ai",     text: "Got it! And your name and phone number to confirm the booking?" },
  { speaker: "client", text: "James Walker, 813-555-0198" },
  { speaker: "ai",     text: "✅ Confirmed! James, your tech arrives at 4 PM today. You'll get an SMS with tracking. Anything else?" },
];

function AIVoiceCallDemo() {
  const [lineIdx, setLineIdx] = useState(0);
  const [shown, setShown] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    const tick = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    if (lineIdx < CALL_LINES.length) {
      // Client lines appear quicker, AI lines take a beat to "think"
      const isAI = CALL_LINES[lineIdx]?.speaker === "ai";
      const delay = lineIdx === 0 ? 2000 : isAI ? 5500 : 3500;
      const t = setTimeout(() => {
        setShown(prev => [...prev, CALL_LINES[lineIdx]]);
        setLineIdx(i => i + 1);
      }, delay);
      return () => clearTimeout(t);
    } else {
      const restart = setTimeout(() => { setShown([]); setLineIdx(0); setSeconds(0); }, 8000);
      return () => clearTimeout(restart);
    }
  }, [lineIdx]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 9999, behavior: "smooth" });
  }, [shown]);

  const fmt = (s) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a1628]/90 shadow-[0_20px_60px_rgba(0,0,0,.6)] backdrop-blur-xl">
      {/* Call header */}
      <div className="flex items-center gap-3 border-b border-white/10 bg-[#0D1F35]/80 px-4 py-3">
        <motion.div
          animate={{ boxShadow: ["0 0 0 0 rgba(255,90,77,0)", "0 0 0 6px rgba(255,90,77,.25)", "0 0 0 0 rgba(255,90,77,0)"] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#FF5A4D] to-[#7B5CFF]"
        >
          <PhoneCall className="h-4 w-4 text-white" />
        </motion.div>
        <div className="flex-1 min-w-0">
          <p className="truncate text-sm font-bold text-white">Mike's HVAC Services</p>
          <p className="text-[11px] text-[#FF5A4D]">● AI Voice Agent active</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-xs font-mono font-semibold text-white/80">{fmt(seconds)}</p>
          <p className="text-[10px] text-white/40">Live call</p>
        </div>
      </div>

      {/* Waveform */}
      <div className="flex items-center justify-center gap-[3px] border-b border-white/5 py-2 px-4">
        {Array.from({ length: 28 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-[3px] rounded-full bg-gradient-to-t from-[#7B5CFF] to-[#FF5A4D]"
            animate={{ height: [4, Math.random() * 18 + 4, 4] }}
            transition={{ duration: 0.4 + Math.random() * 0.4, repeat: Infinity, delay: i * 0.04, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Transcript */}
      <div ref={scrollRef} className="flex-1 space-y-2 overflow-y-auto p-3 text-xs" style={{ maxHeight: 200 }}>
        {shown.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-2 ${line.speaker === "ai" ? "" : "flex-row-reverse"}`}
          >
            <div className={`shrink-0 h-6 w-6 rounded-full flex items-center justify-center text-[9px] font-bold ${line.speaker === "ai" ? "bg-[#7B5CFF]/30 text-[#c4b5fd]" : "bg-[#FF5A4D]/20 text-[#fca5a5]"}`}>
              {line.speaker === "ai" ? "AI" : "C"}
            </div>
            <div className={`max-w-[80%] rounded-xl px-3 py-2 leading-5 ${line.speaker === "ai" ? "bg-[#7B5CFF]/20 text-white/85" : "bg-white/[0.07] text-white/70"}`}>
              {line.text}
            </div>
          </motion.div>
        ))}
        {lineIdx < CALL_LINES.length && shown.length > 0 && (
          <div className="flex gap-2">
            <div className="shrink-0 h-6 w-6 rounded-full flex items-center justify-center bg-[#7B5CFF]/30 text-[9px] font-bold text-[#c4b5fd]">AI</div>
            <div className="rounded-xl bg-[#7B5CFF]/10 px-3 py-2">
              <div className="flex gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#a78bfa] [animation-delay:-0.2s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#a78bfa] [animation-delay:-0.1s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#a78bfa]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-white/5 px-4 py-2.5">
        <p className="text-[10px] text-white/35 uppercase tracking-widest">Auto-transcribing · AI booking active</p>
        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-400">24/7</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// WHATSAPP DEMO (Dental)
// ─────────────────────────────────────────────
const WA_FLOW = [
  { from: "client", text: "Hi! Do you have availability this week for a cleaning?" },
  { from: "ai",     text: "Hi Sarah! 😊 Yes, we do! Available slots this week:\n📅 Thu Oct 17 — 10:00 AM or 2:00 PM\n📅 Fri Oct 18 — 9:00 AM\nWhich works best for you?" },
  { from: "client", text: "Thursday at 2pm please!" },
  { from: "ai",     text: "✅ Booked! Dr. Martinez will see you\nThursday, Oct 17 at 2:00 PM\n📍 Bright Smile Dental, 520 Bay Ave\n\nYou'll get a reminder 24h before. See you then! 🦷" },
  { from: "client", text: "Perfect, thank you so much!" },
  { from: "ai",     text: "You're welcome! If anything changes, just text us here. We reply instantly 24/7. 💬" },
];

function WhatsAppDemo() {
  const [count, setCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);
  const now = new Date();
  const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`;

  useEffect(() => {
    if (count >= WA_FLOW.length) {
      const restart = setTimeout(() => setCount(0), 6000);
      return () => clearTimeout(restart);
    }
    const isAI = WA_FLOW[count]?.from === "ai";
    if (isAI) {
      setTyping(true);
      const t1 = setTimeout(() => {
        setTyping(false);
        setCount(c => c + 1);
      }, 2800);
      return () => clearTimeout(t1);
    } else {
      const t2 = setTimeout(() => setCount(c => c + 1), 2200);
      return () => clearTimeout(t2);
    }
  }, [count]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 9999, behavior: "smooth" });
  }, [count, typing]);

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b1a11]/90 shadow-[0_20px_60px_rgba(0,0,0,.6)] backdrop-blur-xl">
      {/* WA header */}
      <div className="flex items-center gap-3 bg-[#1a2f1d]/90 px-4 py-3">
        <div className="relative shrink-0">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#25d366] to-[#128c7e] text-lg font-bold text-white">
            🦷
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#1a2f1d] bg-[#25d366]" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-white">Bright Smile Dental</p>
          <p className="text-[11px] text-[#25d366]">● Online · AI agent active</p>
        </div>
        <div className="flex items-center gap-2 text-white/40">
          <Smartphone className="h-4 w-4" />
          <span className="text-[10px] font-mono">{timeStr}</span>
        </div>
      </div>

      {/* Chat area */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-2 overflow-y-auto p-3"
        style={{ maxHeight: 260, background: "linear-gradient(180deg, #0a1a0e 0%, #0d1f13 100%)" }}
      >
        <p className="text-center text-[10px] text-white/25 py-1">Today · Automated responses by ARIA AI</p>
        {WA_FLOW.slice(0, count).map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.92, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className={`flex ${msg.from === "ai" ? "justify-start" : "justify-end"}`}
          >
            <div className={`max-w-[82%] rounded-2xl px-3 py-2 text-xs leading-5 whitespace-pre-line shadow-sm ${
              msg.from === "ai"
                ? "rounded-tl-sm bg-[#1f2c34] text-white/85"
                : "rounded-tr-sm bg-[#005c4b] text-white/90"
            }`}>
              {msg.text}
              <span className="ml-2 text-[9px] text-white/30">
                {timeStr} {msg.from === "ai" && "✓✓"}
              </span>
            </div>
          </motion.div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-tl-sm bg-[#1f2c34] px-3 py-2.5">
              <div className="flex gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#25d366] [animation-delay:-0.2s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#25d366] [animation-delay:-0.1s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#25d366]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-2 border-t border-white/5 bg-[#1a2f1d]/60 px-3 py-2">
        <div className="flex-1 rounded-full bg-[#2a3942] px-3 py-1.5 text-[11px] text-white/30">
          AI handles replies automatically…
        </div>
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#00a884] text-white">
          <Send className="h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// HERO VISUAL
// ─────────────────────────────────────────────
function HeroVisual({ t }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="relative mx-auto w-full max-w-[640px]"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <PhoneCall className="h-3.5 w-3.5 text-[#FF5A4D]" />
            <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-white/50">AI Voice Agent</p>
          </div>
          <AIVoiceCallDemo />
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <Smartphone className="h-3.5 w-3.5 text-[#25d366]" />
            <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-white/50">WhatsApp Automation</p>
          </div>
          <WhatsAppDemo />
        </div>
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-4">
        <LiveActivity />
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// AI RECEPTIONIST SHOWCASE
// ─────────────────────────────────────────────
const APPT_LIST = [
  { name: "Sarah M.",  time: "10:00 AM", industry: "Dental" },
  { name: "James K.", time: "2:00 PM",  industry: "HVAC"   },
  { name: "Lisa R.",  time: "4:30 PM",  industry: "Legal"  },
];

const CHAT_SHOWCASE = [
  { from: "user", text: "Hi! I'd like to know more about your services." },
  { from: "ai",   text: "Sure! I'd be happy to help. What are you interested in?" },
  { from: "user", text: "Interested in Pricing" },
  { from: "ai",   text: "Great! I can share the details with you." },
  { from: "ai",   text: "Would you like to schedule a quick call?" },
];

const AI_FEATURES = [
  "Natural Conversations",
  "Lead Qualification",
  "Calendar Booking",
  "CRM Sync",
  "Smart Follow-ups",
];

function LiveCallPanel() {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="rounded-2xl border border-white/10 bg-[#0a1628]/90 p-4 shadow-[0_8px_40px_rgba(0,0,0,.5)] backdrop-blur-xl"
    >
      <div className="mb-3 flex items-center gap-3">
        <motion.div
          animate={{ boxShadow: ["0 0 0 0 rgba(255,90,77,0)", "0 0 0 8px rgba(255,90,77,.2)", "0 0 0 0 rgba(255,90,77,0)"] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="grid h-9 w-9 place-items-center rounded-full bg-[#FF5A4D]/20 border border-[#FF5A4D]/40"
        >
          <PhoneCall className="h-4 w-4 text-[#FF5A4D]" />
        </motion.div>
        <div>
          <p className="text-sm font-bold text-white">Live Call</p>
          <p className="text-[10px] text-[#FF5A4D]">● AI answering now</p>
        </div>
      </div>
      {/* Waveform */}
      <div className="flex items-end gap-[2px] h-8">
        {Array.from({ length: 32 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-[3px] rounded-full bg-gradient-to-t from-[#FF5A4D] to-[#FFB020] flex-shrink-0"
            animate={{ height: [3, Math.random() * 24 + 4, 3] }}
            transition={{ duration: 0.5 + Math.random() * 0.4, repeat: Infinity, delay: i * 0.035, ease: "easeInOut" }}
          />
        ))}
      </div>
      <p className="mt-2 text-[10px] text-white/40 font-mono">Qualifying lead · 01:24</p>
    </motion.div>
  );
}

function BookedAppointmentsPanel() {
  return (
    <motion.div
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      className="rounded-2xl border border-white/10 bg-[#0a1628]/90 p-4 shadow-[0_8px_40px_rgba(0,0,0,.5)] backdrop-blur-xl"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">Booked Appointments</p>
      <div className="space-y-2.5">
        {APPT_LIST.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.15 }}
            className="flex items-center gap-3"
          >
            <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#7B5CFF]/40 to-[#FF5A4D]/30 text-[10px] font-bold text-white">
              {a.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{a.name}</p>
              <p className="text-[10px] text-white/40">{a.industry}</p>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-[#FFB020]">
              <CalendarDays className="h-3 w-3" />
              {a.time}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function CRMPanel() {
  return (
    <motion.div
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      className="rounded-2xl border border-white/10 bg-[#0a1628]/90 p-4 shadow-[0_8px_40px_rgba(0,0,0,.5)] backdrop-blur-xl"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">CRM Overview</p>
      <div className="flex items-center gap-4">
        {/* Donut chart SVG */}
        <svg width="52" height="52" viewBox="0 0 52 52" className="shrink-0">
          <circle cx="26" cy="26" r="20" fill="none" stroke="#1a2340" strokeWidth="8" />
          <motion.circle
            cx="26" cy="26" r="20" fill="none"
            stroke="url(#donut1)" strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="125.6"
            initial={{ strokeDashoffset: 125.6 }}
            animate={{ strokeDashoffset: 37.7 }}
            transition={{ duration: 1.8, ease: "easeOut", delay: 0.5 }}
            transform="rotate(-90 26 26)"
          />
          <defs>
            <linearGradient id="donut1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7B5CFF" />
              <stop offset="100%" stopColor="#FFB020" />
            </linearGradient>
          </defs>
        </svg>
        <div className="space-y-1.5">
          {[["Total leads","48"],["Booked","31"],["Closed","17"]].map(([l,v]) => (
            <div key={l} className="flex items-center justify-between gap-4">
              <span className="text-[10px] text-white/50">{l}</span>
              <span className="text-[10px] font-bold text-white">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function AIFeaturesPanel() {
  return (
    <motion.div
      animate={{ y: [0, -7, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      className="rounded-2xl border border-[#7B5CFF]/30 bg-[#0a1628]/90 p-4 shadow-[0_8px_40px_rgba(123,92,255,.12)] backdrop-blur-xl"
    >
      <div className="mb-3 flex items-center gap-2">
        <div className="grid h-6 w-6 place-items-center rounded-lg bg-[#7B5CFF]/20">
          <Sparkles className="h-3.5 w-3.5 text-[#7B5CFF]" />
        </div>
        <p className="text-sm font-bold text-white">AI Receptionist</p>
      </div>
      {/* Mini waveform */}
      <div className="mb-3 flex items-end gap-[2px] h-6">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-[3px] rounded-full bg-gradient-to-t from-[#7B5CFF] to-[#FF5A4D] flex-shrink-0"
            animate={{ height: [2, Math.random() * 14 + 3, 2] }}
            transition={{ duration: 0.6 + Math.random() * 0.5, repeat: Infinity, delay: i * 0.05 }}
          />
        ))}
      </div>
      <div className="space-y-2">
        {AI_FEATURES.map((f, i) => (
          <motion.div
            key={f}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="flex items-center gap-2"
          >
            <Check className="h-3.5 w-3.5 text-[#7B5CFF] shrink-0" />
            <span className="text-xs text-white/75">{f}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function ChatShowcasePanel() {
  const [count, setCount] = useState(2);
  useEffect(() => {
    const id = setInterval(() => setCount(c => c < CHAT_SHOWCASE.length ? c + 1 : 2), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      className="rounded-2xl border border-white/10 bg-[#0a1628]/90 p-4 shadow-[0_8px_40px_rgba(0,0,0,.5)] backdrop-blur-xl"
    >
      <div className="mb-3 flex gap-1.5">
        <div className="h-2 w-2 rounded-full bg-[#FF5A4D]/70" />
        <div className="h-2 w-2 rounded-full bg-[#FFB020]/70" />
        <div className="h-2 w-2 rounded-full bg-emerald-400/70" />
      </div>
      <div className="space-y-2">
        {CHAT_SHOWCASE.slice(0, count).map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.from === "ai" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[85%] rounded-xl px-2.5 py-1.5 text-[11px] leading-4 ${
              m.from === "ai" ? "bg-[#25d366] text-white" : "bg-[#1f2c34] text-white/80"
            }`}>
              {m.text}
            </div>
          </motion.div>
        ))}
      </div>
      {/* Action chips */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {["Book Call", "Follow Up Later"].map(label => (
          <div key={label} className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-[10px] text-white/60">
            {label === "Book Call" ? <CalendarDays className="h-2.5 w-2.5" /> : <PhoneCall className="h-2.5 w-2.5" />}
            {label}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function AIAvatarCore() {
  return (
    <div className="relative flex flex-col items-center">
      {/* Deep glow layers behind the figure */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[420px] w-[320px] -translate-x-1/2 rounded-full bg-[#7B5CFF]/20 blur-[80px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[300px] w-[220px] -translate-x-1/2 rounded-full bg-[#FF5A4D]/12 blur-[60px]" />

      {/* Floating receptionist figure */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <img
          src="/assets/recepcionista3.png"
          alt="ARIA — AI Receptionist"
          loading="lazy"
          decoding="async"
          className="relative z-10 w-[260px] sm:w-[300px]"
          style={{
            filter: "drop-shadow(0 0 36px rgba(123,92,255,0.6)) drop-shadow(0 0 16px rgba(255,90,77,0.3))",
          }}
        />

        {/* Live badge — top right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 10 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="absolute -right-6 top-10 z-20 flex items-center gap-2 rounded-2xl border border-white/15 bg-[#060d1a]/90 px-3 py-2 shadow-2xl backdrop-blur-xl"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          <span className="whitespace-nowrap text-[11px] font-semibold text-emerald-400">Live · On call</span>
        </motion.div>

        {/* Waveform badge — top left */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: -10 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.8, type: "spring" }}
          className="absolute -left-8 top-24 z-20 flex items-center gap-2 rounded-2xl border border-[#7B5CFF]/30 bg-[#060d1a]/90 px-3 py-2 shadow-2xl backdrop-blur-xl"
        >
          <PhoneCall className="h-3 w-3 shrink-0 text-[#FF5A4D]" />
          <div className="flex items-end gap-[2px]">
            {[3, 6, 9, 5, 8, 11, 6, 4, 7, 5].map((h, i) => (
              <motion.div
                key={i}
                className="w-[2px] rounded-full bg-[#7B5CFF]"
                animate={{ height: [`${h}px`, `${h * 1.8}px`, `${h}px`] }}
                transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.06, ease: "easeInOut" }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ARIA label */}
      <div className="relative z-10 mt-3 text-center">
        <p className="text-lg font-black tracking-wide text-white">ARIA</p>
        <p className="text-xs text-white/45">AI Receptionist · yasas.io</p>
        <div className="mt-1.5 flex items-center justify-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#4ade80]" />
          <span className="text-[10px] font-semibold text-emerald-400">Online 24/7</span>
        </div>
      </div>

      {/* Action bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="relative z-10 mt-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-[#060d1a]/80 px-4 py-3 backdrop-blur-xl"
      >
        {[
          { Icon: PhoneCall,     color: "#FF5A4D" },
          { Icon: CalendarDays,  color: "#FFB020" },
          { Icon: MessageSquare, color: "#7B5CFF" },
          { Icon: BarChart3,     color: "#10b981" },
          { Icon: Check,         color: "#a78bfa" },
        ].map(({ Icon, color }, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.15 }}
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-xl border border-white/10 bg-white/[0.05]"
            style={{ color }}
          >
            <Icon className="h-4 w-4" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function AIReceptionistShowcase({ t }) {
  return (
    <Reveal>
      <section className="relative overflow-hidden py-20 sm:py-28">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(255,90,77,.06),transparent_50%),radial-gradient(ellipse_at_70%_50%,rgba(123,92,255,.07),transparent_50%)]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Header */}
          <div className="mb-14 text-center">
            <motion.p className="mb-3 text-xs font-semibold uppercase tracking-[.35em] text-[#FFB020]">
              AI Receptionist
            </motion.p>
            <h2 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
              Meet <span className="bg-gradient-to-r from-[#FF5A4D] via-[#FFB020] to-[#7B5CFF] bg-clip-text text-transparent">ARIA</span>
              {" "}— your 24/7 AI agent
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/55 leading-7">
              Answers calls, chats and WhatsApp messages. Qualifies leads, books appointments and syncs your CRM — while you focus on the work.
            </p>
          </div>

          {/* Main layout: panels + avatar */}
          <div className="relative flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-between">

            {/* LEFT PANELS */}
            <div className="flex w-full flex-col gap-4 lg:w-64 lg:pt-8">
              <LiveCallPanel />
              <BookedAppointmentsPanel />
              <CRMPanel />
            </div>

            {/* CENTER AVATAR */}
            <div className="flex shrink-0 justify-center lg:px-8">
              <AIAvatarCore />
            </div>

            {/* RIGHT PANELS */}
            <div className="flex w-full flex-col gap-4 lg:w-64 lg:pt-8">
              <AIFeaturesPanel />
              <ChatShowcasePanel />
            </div>

          </div>
        </div>
      </section>
    </Reveal>
  );
}

// ─────────────────────────────────────────────
// CHATBOT
// ─────────────────────────────────────────────
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
  const [quickReplies, setQuickReplies] = useState(t.chat.quick);
  const [booking, setBooking] = useState({ name: "", email: "", phone: "", business: "", time: "" });
  const bottomRef = useRef(null);

  useEffect(() => {
    setMessages([{ from: "bot", text: t.chat.intro }]);
    setStep("start");
    setQuickReplies(t.chat.quick);
  }, [t.chat.intro]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing, open, step]);

  function botReply(text, nextQuick) {
    setTyping(true);
    const delay = Math.min(500 + text.length * 1.8, 1400);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: "bot", text }]);
      if (nextQuick) setQuickReplies(nextQuick);
    }, delay);
  }

  function handleUser(text) {
    const clean = text.trim();
    if (!clean) return;
    setMessages((m) => [...m, { from: "user", text: clean }]);
    setInput("");
    const s = t.chat;
    const q = clean.toLowerCase();

    if (q.includes("book") || q.includes("audit") || q.includes("schedule") || q.includes("demo") ||
        q.includes("cita") || q.includes("agendar") || q.includes("auditoría") || q.includes("auditoria")) {
      setStep("booking"); botReply(s.booking); return;
    }
    if (q.includes("price") || q.includes("cost") || q.includes("how much") || q.includes("package") ||
        q.includes("precio") || q.includes("cuanto") || q.includes("cuánto") || q.includes("paquete") || q.includes("$")) {
      botReply(s.price, s.quickAfterPrice); return;
    }
    if (q.includes("whatsapp") || (q.includes("wa") && q.length < 12)) {
      botReply(s.wa, s.quickAfterWa); return;
    }
    if (q.includes("voice") || q.includes("phone") || q.includes("answer call") || q.includes("missed call") ||
        q.includes("llamada") || q.includes("voz") || q.includes("teléfono") || q.includes("telefono")) {
      botReply(s.voice, s.quickAfterVoice); return;
    }
    if (q.includes("chatbot") || q.includes("chat assistant") || q.includes("website chat") ||
        q.includes("asistente") || q.includes("chat ia") || q.includes("chat web")) {
      botReply(s.chatbotInfo, s.quickAfterBuild); return;
    }
    if (q.includes("automation") || q.includes("workflow") || q.includes("zapier") || q.includes("make") ||
        q.includes("n8n") || q.includes("automatizac") || q.includes("flujo") || q.includes("connect")) {
      botReply(s.automationsInfo, s.quickAfterBuild); return;
    }
    if (q.includes("booking system") || q.includes("calendar") || q.includes("calendly") || q.includes("schedule") ||
        q.includes("appointment") || q.includes("agenda") || q.includes("reserva")) {
      botReply(s.bookingSystem, s.quickAfterBuild); return;
    }
    if (q.includes("crm") || q.includes("dashboard") || q.includes("pipeline") || q.includes("track")) {
      botReply(s.crmInfo, s.quickAfterBuild); return;
    }
    if (q.includes("what") || q.includes("build") || q.includes("service") || q.includes("do you") ||
        q.includes("constru") || q.includes("hacen") || q.includes("servicio") || q.includes("qué")) {
      botReply(s.build, s.quickAfterBuild); return;
    }
    if (q.includes("industr") || q.includes("sector") || q.includes("business type") || q.includes("who do") ||
        q.includes("tipo") || q.includes("negocio") || q.includes("para quién")) {
      botReply(s.industries, s.quickAfterIndustries); return;
    }
    if (q.includes("hvac") || q.includes("plumb") || q.includes("contractor") || q.includes("heating") || q.includes("air condition")) {
      botReply(s.hvac, s.quickAfterIndustries); return;
    }
    if (q.includes("dental") || q.includes("dentist") || q.includes("clinic") || q.includes("clínica") || q.includes("clinica")) {
      botReply(s.dental, s.quickAfterIndustries); return;
    }
    if (q.includes("real estate") || q.includes("realtor") || q.includes("property") || q.includes("inmobili") || q.includes("bienes raíces")) {
      botReply(s.realEstate, s.quickAfterIndustries); return;
    }
    if (q.includes("lawyer") || q.includes("attorney") || q.includes("law firm") || q.includes("legal") || q.includes("abogado")) {
      botReply(s.legal, s.quickAfterIndustries); return;
    }
    if (q.includes("how long") || q.includes("timeline") || q.includes("how fast") || q.includes("when") ||
        q.includes("cuánto tiempo") || q.includes("tiempo") || q.includes("días") || q.includes("rápido")) {
      botReply(s.timeline, s.quickAfterTimeline); return;
    }
    if (q.includes("support") || q.includes("maintain") || q.includes("after launch") || q.includes("help after") ||
        q.includes("soporte") || q.includes("después") || q.includes("mantenimiento")) {
      botReply(s.support, s.quickAfterSupport); return;
    }
    if (q.includes("integrat") || q.includes("tool") || q.includes("software") || q.includes("connect") ||
        q.includes("integración") || q.includes("herramienta") || q.includes("conectar")) {
      botReply(s.integrations, s.quickAfterIntegrations); return;
    }
    if (q.includes("roi") || q.includes("return") || q.includes("worth it") || q.includes("result") ||
        q.includes("retorno") || q.includes("vale la pena") || q.includes("resultado")) {
      botReply(s.roi, s.quickAfterRoi); return;
    }
    if (q.includes("how it works") || q.includes("process") || q.includes("steps") || q.includes("how do") ||
        q.includes("cómo funciona") || q.includes("como funciona") || q.includes("proceso") || q.includes("pasos")) {
      botReply(s.howItWorks, s.quickAfterTimeline); return;
    }
    if (q.includes("guarantee") || q.includes("promis") || q.includes("garant") || q.includes("promesa")) {
      botReply(s.guarantee, s.quickAfterRoi); return;
    }
    botReply(s.fallback, t.chat.quick);
  }

  function submitBooking(e) {
    e.preventDefault();
    if (Object.values(booking).some((v) => !v.trim())) { botReply(t.chat.missing); return; }
    setMessages((m) => [
      ...m,
      { from: "user", text: `${booking.name} · ${booking.email} · ${booking.phone} · ${booking.business} · ${booking.time}` },
      { from: "bot", text: t.chat.done },
    ]);
    setStep("done");
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-5 sm:right-5">
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="mb-4 h-[82vh] w-[calc(100vw-2rem)] overflow-hidden rounded-[1.7rem] border border-white/15 bg-[#081020]/95 shadow-[0_35px_100px_rgba(0,0,0,.55)] backdrop-blur-xl sm:h-[680px] sm:w-[380px]">
            {/* Header */}
            <div className="relative flex items-center justify-between border-b border-white/10 bg-white/[0.035] p-4">
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#FF5A4D] to-transparent" />
              <div className="flex min-w-0 items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#FF5A4D] via-[#FFB020] to-[#7B5CFF] shadow-[0_0_34px_rgba(123,92,255,.35)]">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-white">{t.chat.title}</p>
                  <p className="flex items-center gap-1.5 text-xs text-emerald-300">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="ping-slow absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </span>
                    {t.chat.online}
                  </p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-full p-2 text-white/60 hover:bg-white/10 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
            {/* Messages */}
            <div className="h-[calc(82vh-230px)] space-y-3 overflow-y-auto p-4 sm:h-[430px]">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <motion.div initial={{ opacity: 0, scale: 0.9, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.22 }}
                    className={`max-w-[84%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.from === "user" ? "bg-[#7B5CFF] text-white" : "bg-white/[0.08] text-white/85"}`}>
                    {m.text}
                  </motion.div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <TypingBubble />
                </div>
              )}
              {step === "booking" && !typing && (
                <motion.form initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onSubmit={submitBooking}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="mb-3 text-sm font-semibold text-white">{t.chat.formTitle}</p>
                  <div className="space-y-2">
                    {[["name", t.chat.name, "text"], ["email", t.chat.email, "email"], ["phone", t.chat.phonePlaceholder, "tel"], ["business", t.chat.business, "text"]].map(([field, ph, type]) => (
                      <input key={field} type={type} placeholder={ph} value={booking[field]}
                        onChange={(e) => setBooking({ ...booking, [field]: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-[#0D172A] px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#7B5CFF]" />
                    ))}
                    <select value={booking.time} onChange={(e) => setBooking({ ...booking, time: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-[#0D172A] px-3 py-2.5 text-sm text-white outline-none focus:border-[#7B5CFF]">
                      <option value="">{t.chat.time}</option>
                      {t.chat.times.map((x) => <option key={x}>{x}</option>)}
                    </select>
                    <button className="w-full rounded-xl bg-gradient-to-r from-[#FF5A4D] to-[#FFB020] py-2.5 text-sm font-bold text-white hover:opacity-90">
                      {t.chat.submit}
                    </button>
                  </div>
                </motion.form>
              )}
              <div ref={bottomRef} />
            </div>
            {/* Input area */}
            <div className="border-t border-white/10 p-3">
              <div className="mb-2 flex flex-wrap gap-1.5">
                {quickReplies.map((q) => (
                  <motion.button key={q} whileHover={{ scale: 1.03 }} onClick={() => handleUser(q)}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70 transition hover:border-[#7B5CFF]/60 hover:bg-[#7B5CFF]/10 hover:text-white">
                    {q}
                  </motion.button>
                ))}
              </div>
              <form onSubmit={(e) => { e.preventDefault(); handleUser(input); }} className="flex gap-2">
                <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={t.chat.input}
                  maxLength={400} autoComplete="off" spellCheck="false"
                  className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#7B5CFF]" />
                <button type="submit" className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#7B5CFF] text-white transition hover:bg-[#6b4df0]">
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button onClick={() => setOpen(!open)} whileHover={{ scale: 1.06, y: -3 }} whileTap={{ scale: 0.95 }}
        className="ml-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF5A4D] via-[#FFB020] to-[#7B5CFF] text-white shadow-[0_20px_70px_rgba(123,92,255,.45)]">
        <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.25 }}>
          {open ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        </motion.div>
      </motion.button>
    </div>
  );
}

function SectionTitle({ eyebrow, title, accent, subtitle }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
        className="mb-3 text-xs font-semibold uppercase tracking-[.35em] text-[#FFB020]">{eyebrow}</motion.p>
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
        {title} <span className="text-[#FF5A4D]">{accent}</span>
      </motion.h2>
      {subtitle && (
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 text-base leading-8 text-white/60 sm:text-lg">{subtitle}</motion.p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default function YasasLandingPage() {
  const [lang, setLang] = useState("en");
  const [faqOpen, setFaqOpen] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openService, setOpenService] = useState(null);
  const t = copy[lang];
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, -50]);
  const hrefs = ["#solutions", "#how", "#results", "#pricing", "#faq"];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050b14] font-sans text-white selection:bg-[#FF5A4D]/40">
      <ScrollProgress />
      <CursorGlow />
      {/* Image background overlay for readability */}
      <div className="pointer-events-none fixed inset-0 z-[1]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(8,16,32,0.55)_0%,transparent_60%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#081020] to-transparent" />
      </div>

      {/* ── HEADER ── */}
      <header className="relative z-40 mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 sm:py-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <YasasLogo small />
        </motion.div>
        <nav className="hidden items-center gap-8 text-sm text-white/70 lg:flex">
          {t.nav.map((item, i) => (
            <motion.a key={item} href={hrefs[i]}
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.07 }}
              className="relative transition hover:text-white after:absolute after:bottom-[-3px] after:left-0 after:h-[1px] after:w-0 after:bg-[#FF5A4D] after:transition-all hover:after:w-full">
              {item}
            </motion.a>
          ))}
        </nav>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="hidden items-center gap-3 md:flex">
          <LanguageToggle lang={lang} setLang={setLang} />
          <PrimaryButton className="px-5 py-3 text-sm">{t.demo} <ArrowRight className="ml-2 h-4 w-4" /></PrimaryButton>
        </motion.div>
        <button onClick={() => setMenuOpen(true)} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-white md:hidden"><Menu className="h-5 w-5" /></button>
        <MobileMenu open={menuOpen} setOpen={setMenuOpen} t={t} lang={lang} setLang={setLang} />
      </header>

      <main className="relative z-10">
        {/* ── HERO ── */}
        <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-14 lg:grid-cols-2 lg:gap-14 lg:pt-24">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center lg:text-left">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#7B5CFF]/40 bg-[#7B5CFF]/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[.2em] text-white/80 sm:text-xs sm:tracking-[.25em]">
              <Sparkles className="h-4 w-4 shrink-0 text-[#FFB020]" /> {t.badge}
            </motion.div>
            <h1 className="mx-auto max-w-4xl text-4xl font-black leading-[1.02] tracking-tight text-white sm:text-5xl md:text-6xl lg:mx-0 lg:text-7xl">
              {t.hero}{" "}
              <TypewriterText key={lang} lang={lang} />
            </h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
              className="mx-auto mt-7 max-w-xl text-base leading-8 text-white/65 sm:text-lg md:text-xl md:leading-9 lg:mx-0">
              {t.sub}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-9 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <PrimaryButton>{t.cta} <ArrowRight className="ml-2 h-5 w-5 transition group-hover:translate-x-1" /></PrimaryButton>
              <motion.a href="#how" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.03] px-7 py-4 font-bold text-white hover:bg-white/[0.07]">
                {t.secondary} <Play className="ml-2 h-5 w-5" />
              </motion.a>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-8 flex flex-wrap justify-center gap-5 text-sm text-white/60 lg:justify-start">
              {t.bullets.map((x, i) => (
                <motion.div key={x} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.1 }} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#7B5CFF]" />{x}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div style={{ y: heroY }}><HeroVisual t={t} /></motion.div>
        </section>

        {/* ── MARQUEE TRUST BAR ── */}
        <Reveal>
          <section className="mx-auto max-w-7xl border-y border-white/10 px-4 py-8 sm:px-6">
            <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[.35em] text-white/35">{t.trusted}</p>
            <div className="overflow-hidden">
              <div className="marquee-track text-lg font-bold text-white/30 sm:text-xl">
                {[...trustLogos, ...trustLogos].map((x, i) => (
                  <span key={i} className="transition-colors hover:text-white/60">{x}</span>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* ── AI RECEPTIONIST SHOWCASE ── */}
        <AIReceptionistShowcase t={t} />

        {/* ── SOLUTIONS ── */}
        <section id="solutions" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
          <SectionTitle eyebrow={t.solutionsEyebrow} title={t.solutionsTitle} accent={t.solutionsAccent} subtitle={t.solutionsSub} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.services.map(([title, text], i) => {
              const Icon = serviceIcons[i];
              return (
                <Reveal key={title} delay={i * 0.07}>
                  <TiltCard className="group h-full rounded-[1.6rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur transition-colors hover:border-[#7B5CFF]/50 hover:bg-white/[0.06]">
                    <motion.div whileHover={{ scale: 1.15, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}
                      className="mb-5 grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-[#101A30] text-[#FF5A4D] group-hover:border-[#7B5CFF]/40 group-hover:text-[#FFB020]">
                      <Icon className="h-6 w-6" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                    <p className="mt-3 leading-7 text-white/55">{text}</p>
                    <motion.button onClick={() => setOpenService(i)} whileHover={{ x: 4 }}
                      className="mt-6 flex items-center text-sm font-bold text-[#7B5CFF]">
                      {t.learn} <ArrowRight className="ml-1 h-4 w-4" />
                    </motion.button>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="how" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <SectionTitle eyebrow={t.howEyebrow} title={t.howTitle} accent={t.howAccent} />
          <div className="grid gap-6 md:grid-cols-3">
            {t.steps.map(([title, desc], i) => (
              <Reveal key={title} delay={i * 0.12} direction={i === 0 ? "left" : i === 2 ? "right" : "up"}>
                <motion.div whileHover={{ y: -10 }} className="relative h-full rounded-[1.6rem] border border-white/10 bg-white/[0.035] p-8">
                  <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", delay: 0.2 + i * 0.12 }}
                    className="mb-8 grid h-16 w-16 place-items-center rounded-full border border-[#FF5A4D]/40 bg-[#FF5A4D]/10 text-2xl font-black text-white">
                    0{i + 1}
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white">{title}</h3>
                  <p className="mt-4 leading-7 text-white/55">{desc}</p>
                  {i < 2 && <div className="absolute right-[-1px] top-1/2 hidden h-px w-8 bg-gradient-to-r from-white/20 to-transparent md:block" />}
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── RESULTS ── */}
        <section id="results" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <SectionTitle eyebrow={t.resultsEyebrow} title={t.resultsTitle} accent={t.resultsAccent} />
          <Reveal>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 sm:p-6 md:p-8">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {statNumbers.map((number, i) => (
                  <motion.div whileHover={{ y: -6, scale: 1.02 }} key={t.statLabels[i]}
                    className="rounded-2xl border border-white/10 bg-[#0D172A]/70 p-6">
                    <p className="text-sm text-white/45">{t.statLabels[i]}</p>
                    <p className="mt-3 text-4xl font-black text-white">
                      <AnimatedCounter raw={number} />
                    </p>
                    <p className="mt-2 text-sm text-emerald-300">+{127 + i * 18}% vs last 30 days</p>
                  </motion.div>
                ))}
              </div>
              <Reveal delay={0.2}>
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
                    <blockquote className="text-xl font-bold leading-8 text-white sm:text-2xl sm:leading-9">"{t.testimonial}"</blockquote>
                    <div className="space-y-2 text-sm text-white/65">
                      {[["3X", "more qualified leads"], ["2X", "more booked calls"], ["187%", "revenue lift"]].map(([n, l]) => (
                        <p key={l}><span className="font-bold text-[#FFB020]">{n}</span> {l}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </Reveal>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <SectionTitle eyebrow={t.pricingEyebrow} title={t.pricingTitle} accent={t.pricingAccent} subtitle={t.pricingSub} />
          <div className="grid gap-6 lg:grid-cols-3">
            {t.plans.map(([name, price, items], idx) => (
              <Reveal key={name} delay={idx * 0.1}>
                <motion.div whileHover={{ y: -12 }}
                  className={`relative h-full rounded-[2rem] border p-8 ${idx === 1 ? "gradient-border-spin border-[#FF5A4D]/40 bg-[#FF5A4D]/10 shadow-[0_0_80px_rgba(255,90,77,.18)]" : "border-white/10 bg-white/[0.035]"}`}>
                  {idx === 1 && (
                    <motion.div animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#FF5A4D] to-[#FFB020] px-4 py-1 text-xs font-bold text-white shadow-lg">
                      Most popular
                    </motion.div>
                  )}
                  <p className="text-xl font-bold text-white">{name}</p>
                  <motion.p className="mt-4 text-5xl font-black text-white"
                    initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", delay: idx * 0.1 }}>
                    {price}
                  </motion.p>
                  <div className="mt-8 space-y-4">
                    {items.map((item, fi) => (
                      <motion.p key={item} className="flex items-center gap-3 text-white/65"
                        initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: fi * 0.06 }}>
                        <Check className="h-5 w-5 shrink-0 text-[#FFB020]" />{item}
                      </motion.p>
                    ))}
                  </div>
                  <a href="#booking" className={`mt-8 inline-flex w-full items-center justify-center rounded-2xl px-5 py-4 font-bold transition ${idx === 1 ? "bg-[#FF5A4D] text-white hover:bg-[#ff4133]" : "border border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.09]"}`}>
                    {t.start} <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── BOOKING CTA ── */}
        <section id="booking" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-6 text-center shadow-2xl sm:p-8 md:p-14">
              <GradientOrb className="left-10 top-0 h-72 w-72 bg-[#7B5CFF]" />
              <GradientOrb className="right-0 bottom-0 h-72 w-72 bg-[#FF5A4D]" />
              <div className="relative z-10">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[.35em] text-[#FFB020]">{t.bookingEyebrow}</p>
                <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-6xl">
                  {t.bookingTitle} <span className="text-[#FF5A4D]">{t.bookingAccent}</span>
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">{t.bookingSub}</p>
                <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                  <PrimaryButton href="mailto:hello@yasas.io?subject=Free AI Audit Request">
                    {t.emailUs} <ArrowRight className="ml-2 h-5 w-5" />
                  </PrimaryButton>
                  <motion.button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] px-7 py-4 font-bold text-white hover:bg-white/[0.08]">
                    {t.explore}
                  </motion.button>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
          <SectionTitle eyebrow={t.faqEyebrow} title={t.faqTitle} accent={t.faqAccent} />
          <div className="space-y-4">
            {t.faqs.map(([q, a], i) => (
              <Reveal key={q} delay={i * 0.06}>
                <motion.div whileHover={{ scale: 1.005 }}
                  className={`rounded-2xl border transition-colors ${faqOpen === i ? "border-[#7B5CFF]/40 bg-[#7B5CFF]/5" : "border-white/10 bg-white/[0.035]"}`}>
                  <button onClick={() => setFaqOpen(faqOpen === i ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left font-bold text-white">
                    {q}
                    <motion.span animate={{ rotate: faqOpen === i ? 180 : 0 }} transition={{ duration: 0.25 }}>
                      <ChevronDown className="h-5 w-5 shrink-0 text-white/60" />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {faqOpen === i && (
                      <motion.p key="content" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden px-6 pb-6 leading-8 text-white/60">{a}</motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t border-white/10 px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <YasasLogo small />
            <p className="mt-4 max-w-xs text-sm leading-7 text-white/50">{t.footer}</p>
          </div>
          <div>
            <p className="mb-4 font-bold text-white">{t.nav[0]}</p>
            <div className="space-y-2 text-sm text-white/50">
              <p>AI Chat Systems</p><p>WhatsApp Automation</p><p>AI Voice Agents</p><p>CRM &amp; Booking Flows</p>
            </div>
          </div>
          <div>
            <p className="mb-4 font-bold text-white">Company</p>
            <div className="space-y-2 text-sm text-white/50">
              <p>About us</p><p>{t.nav[1]}</p><p>{t.nav[2]}</p><p>{t.nav[3]}</p>
            </div>
          </div>
          <div>
            <p className="mb-4 font-bold text-white">{t.stay}</p>
            <p className="text-sm text-white/50">{t.stayText}</p>
            <div className="mt-4 flex rounded-2xl border border-white/10 bg-white/[0.04] p-1">
              <input placeholder={t.emailPlaceholder} className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none" />
              <motion.button whileHover={{ scale: 1.1 }} className="rounded-xl bg-[#7B5CFF] px-4 py-2"><ArrowRight className="h-4 w-4" /></motion.button>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-center text-xs text-white/30">
          © {new Date().getFullYear()} yasas.io — All rights reserved.
        </div>
      </footer>

      <Chatbot t={t} />
      <ServiceModal idx={openService} t={t} onClose={() => setOpenService(null)} />
    </div>
  );
}
