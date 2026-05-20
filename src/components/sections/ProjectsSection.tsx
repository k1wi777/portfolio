"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// ─── Tech Carousel ────────────────────────────────────────────────────────────
function TechCarousel({ techs, color }: { techs: string[]; color: string }) {
  // Duplicar para loop infinito
  const items = [...techs, ...techs, ...techs];

  return (
    <div className="relative overflow-hidden py-4" style={{ maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)" }}>
      <motion.div
        className="flex gap-3 w-max"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        {items.map((tech, i) => (
          <span
            key={i}
            className="px-4 py-2 rounded-full text-sm font-mono whitespace-nowrap flex-shrink-0"
            style={{
              background: `${color}12`,
              border: `1px solid ${color}30`,
              color: `${color}cc`,
            }}
          >
            {tech}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Sticky Parallax Grid ─────────────────────────────────────────────────────
function ParallaxGrid({ images, color }: { images: { src: string; alt: string }[]; color: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const col1 = col1Ref.current;
    const col2 = col2Ref.current;
    const col3 = col3Ref.current;
    if (!container || !col1 || !col2 || !col3) return;

    const ctx = gsap.context(() => {
      // Col 1 sube, col 2 baja, col 3 sube — efecto paralaje
      gsap.to(col1, {
        y: -80,
        ease: "none",
        scrollTrigger: { trigger: container, start: "top bottom", end: "bottom top", scrub: 1 },
      });
      gsap.to(col2, {
        y: 80,
        ease: "none",
        scrollTrigger: { trigger: container, start: "top bottom", end: "bottom top", scrub: 1 },
      });
      gsap.to(col3, {
        y: -60,
        ease: "none",
        scrollTrigger: { trigger: container, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    });

    return () => ctx.revert();
  }, []);

  // Distribuir imágenes en 3 columnas
  const col1Imgs = images.filter((_, i) => i % 3 === 0);
  const col2Imgs = images.filter((_, i) => i % 3 === 1);
  const col3Imgs = images.filter((_, i) => i % 3 === 2);

  return (
    <div ref={containerRef} className="grid grid-cols-3 gap-3 overflow-hidden">
      {/* Col 1 */}
      <div ref={col1Ref} className="flex flex-col gap-3">
        {col1Imgs.map((img, i) => (
          <div key={i} className="rounded-2xl overflow-hidden aspect-[3/4] relative"
            style={{ border: `1px solid ${color}20` }}>
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${color}20, transparent)` }} />
          </div>
        ))}
      </div>
      {/* Col 2 — empieza más abajo */}
      <div ref={col2Ref} className="flex flex-col gap-3 mt-12">
        {col2Imgs.map((img, i) => (
          <div key={i} className="rounded-2xl overflow-hidden aspect-[3/4] relative"
            style={{ border: `1px solid ${color}20` }}>
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${color}20, transparent)` }} />
          </div>
        ))}
      </div>
      {/* Col 3 */}
      <div ref={col3Ref} className="flex flex-col gap-3">
        {col3Imgs.map((img, i) => (
          <div key={i} className="rounded-2xl overflow-hidden aspect-[3/4] relative"
            style={{ border: `1px solid ${color}20` }}>
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${color}20, transparent)` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Project Hero ─────────────────────────────────────────────────────────────
function ProjectHero({
  number, title, tagline, description, color, category, url, repo,
}: {
  number: string; title: string; tagline: string; description: string;
  color: string; category: string; url?: string; repo?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="min-h-screen flex flex-col justify-center relative overflow-hidden py-32">
      {/* Glow de fondo */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 60% 50% at 30% 50%, ${color}08, transparent)` }} />

      <div className="container-apple relative z-10">
        {/* Número del proyecto */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-8"
        >
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: `${color}80` }}>
            {number}
          </span>
          <div className="h-px w-16" style={{ background: `${color}40` }} />
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: `${color}80` }}>
            {category}
          </span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Texto */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-extrabold leading-none mb-4"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color }}
            >
              {title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl font-light mb-6"
              style={{ color: `${color}cc` }}
            >
              {tagline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-text-secondary text-base leading-relaxed mb-8 max-w-md"
            >
              {description}
            </motion.p>

            {/* Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex gap-4"
            >
              {url && url !== "#" && (
                <a href={url} target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300"
                  style={{ background: color, color: "#080810" }}>
                  <span>Ver proyecto</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              )}
              {repo && repo !== "#" && (
                <a href={repo} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300"
                  style={{ border: `1px solid ${color}40`, color, background: `${color}10` }}>
                  GitHub →
                </a>
              )}
            </motion.div>
          </div>

          {/* Número grande decorativo */}
          <div className="hidden md:flex items-center justify-center">
            <span
              className="font-display font-extrabold select-none"
              style={{
                fontSize: "20rem",
                lineHeight: 1,
                color: `${color}06`,
                userSelect: "none",
              }}
            >
              {number.replace("0", "")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Divider entre proyectos ──────────────────────────────────────────────────
function ProjectDivider({ color }: { color: string }) {
  return (
    <div className="relative h-px mx-auto my-4" style={{ maxWidth: "80%" }}>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="h-full origin-left"
        style={{ background: `linear-gradient(90deg, ${color}60, transparent)` }}
      />
    </div>
  );
}

// ─── Datos de proyectos ───────────────────────────────────────────────────────
// Reemplaza los src de las imágenes con tus rutas reales en /public
const projects = [
  {
    id: 1,
    number: "01",
    title: "Frikidex",
    category: "Web Responsive",
    tagline: "La Pokédex que siempre quisiste tener.",
    description:
      "Pokédex interactiva construida para explorar consumo de APIs y renderizado dinámico en React. Búsqueda en tiempo real, filtrado por tipo, estadísticas y diseño responsive completo.",
    color: "#ff375f",
    url: "https://frikidex.vercel.app/",
    repo: "https://github.com/k1wi777/my-Pokedex",
    tech: ["React", "TypeScript", "PokéAPI", "REST APIs", "Tailwind CSS", "Vite", "React Hooks"],
    // Imágenes web y mobile — reemplaza con tus rutas
    webImages: [
      { src: "/projects/frikidex/web-1.png", alt: "Frikidex home" },
      { src: "/projects/frikidex/web-2.png", alt: "Frikidex detalle" },
      { src: "/projects/frikidex/web-3.png", alt: "Frikidex filtros" },
    ],
    mobileImages: [
      { src: "/projects/frikidex/mobile-1.png", alt: "Frikidex mobile home" },
      { src: "/projects/frikidex/mobile-2.png", alt: "Frikidex mobile detalle" },
      { src: "/projects/frikidex/mobile-3.png", alt: "Frikidex mobile búsqueda" },
    ],
    what: "Explorar el ecosistema de React consumiendo una API pública real con más de 1000 Pokémon, implementando búsqueda y filtrado sin librerías externas.",
    how: "Arquitectura basada en componentes reutilizables, custom hooks para el fetch y el filtrado, y diseño mobile-first con Tailwind CSS.",
    result: "Interfaz fluida con búsqueda instantánea, filtros por tipo, estadísticas animadas y navegación responsive en cualquier dispositivo.",
  },
  {
    id: 2,
    number: "02",
    title: "Unytick",
    category: "Mobile & Web",
    tagline: "Gestión de tickets universitarios, reimaginada.",
    description:
      "Plataforma digital para validación de tickets universitarios. Interfaces mobile y web con autenticación JWT, flujos optimizados y arquitectura frontend escalable.",
    color: "#00f5ff",
    url: "https://unytick.vercel.app",
    repo: "https://github.com/Unytick-app/Unytick-app-web",
    tech: ["React Native", "Expo", "Next.js", "TypeScript", "JWT", "REST APIs", "Tailwind CSS", "Zustand"],
    webImages: [
      { src: "/projects/unytick/web-1.png", alt: "Unytick dashboard" },
      { src: "/projects/unytick/web-2.png", alt: "Unytick tickets" },
      { src: "/projects/unytick/web-3.png", alt: "Unytick validación" },
      { src: "/projects/unytick/web-4.png", alt: "Unytick reportes" },
    ],
    mobileImages: [
      { src: "/projects/unytick/mobile-1.png", alt: "Unytick app home" },
      { src: "/projects/unytick/mobile-2.png", alt: "Unytick app scanner" },
      { src: "/projects/unytick/mobile-3.png", alt: "Unytick app tickets" },
      { src: "/projects/unytick/mobile-4.png", alt: "Unytick app perfil" },
    ],
    what: "Digitalizar la gestión de tickets de transporte universitario, eliminando el papel y reduciendo tiempos de validación para estudiantes y operarios.",
    how: "App mobile con React Native + Expo para los estudiantes, panel web con Next.js para administración, autenticación JWT compartida y sincronización en tiempo real.",
    result: "Flujo completo de compra, validación QR y reporte de uso. Reducción significativa en tiempos de gestión y mejora en la experiencia de los estudiantes.",
  },
  {
    id: 3,
    number: "03",
    title: "Portfolio",
    category: "UI Engineering",
    tagline: "Donde el código se convierte en experiencia.",
    description:
      "Portfolio personal construido explorando motion design avanzado, scroll storytelling y efectos 3D con Three.js y React Three Fiber.",
    color: "#bf5af2",
    url: "#",
    repo: "#",
    tech: ["Next.js", "TypeScript", "Framer Motion", "GSAP", "Three.js", "React Three Fiber", "Tailwind CSS"],
    webImages: [
      { src: "/projects/portfolio/preview-1.png", alt: "Portfolio hero" },
      { src: "/projects/portfolio/preview-2.png", alt: "Portfolio proyectos" },
      { src: "/projects/portfolio/preview-3.png", alt: "Portfolio contacto" },
    ],
    mobileImages: [],
    what: "Construir un espacio personal que demostrara habilidades técnicas y de diseño al mismo tiempo, usando el sitio como canvas de experimentación.",
    how: "Scroll storytelling con GSAP ScrollTrigger, esfera 3D reactiva con React Three Fiber, animaciones de texto scramble y sistema de diseño neon/Apple.",
    result: "Experiencia visual inmersiva que combina rendimiento y estética, con animaciones que responden al scroll y al mouse en tiempo real.",
  },
  {
    id: 4,
    number: "04",
    title: "Thermodynamic\nSimulator",
    category: "Desktop · Java",
    tagline: "Física en movimiento, en tiempo real.",
    description:
      "Simulaciones termodinámicas en Java con representación visual de variables físicas y comportamiento de partículas en tiempo real.",
    color: "#30d158",
    url: "#",
    repo: "#",
    tech: ["Java", "Swing", "POO", "Physics Simulation", "Algorithms", "Math"],
    webImages: [
      { src: "/projects/thermo/sim-1.png", alt: "Simulador termodinámico" },
      { src: "/projects/thermo/sim-2.png", alt: "Gráfica de partículas" },
      { src: "/projects/thermo/sim-3.png", alt: "Variables en tiempo real" },
      { src: "/projects/thermo/sim-4.png", alt: "Interfaz de control" },
    ],
    mobileImages: [],
    what: "Visualizar procesos termodinámicos (isotérmico, adiabático, isocórico) de forma interactiva para facilitar la comprensión de conceptos físicos.",
    how: "Java Swing para la interfaz gráfica, algoritmos de simulación de partículas basados en ecuaciones de estado de gases ideales, renderizado frame a frame.",
    result: "Simulador funcional que representa visualmente el comportamiento de partículas bajo diferentes condiciones termodinámicas con controles en tiempo real.",
  },
];

// ─── Single Project Section ───────────────────────────────────────────────────
function ProjectSection({ project, index }: { project: typeof projects[0]; index: number }) {
  const hasMobile = project.mobileImages.length > 0;
  const allImages = [...project.webImages, ...project.mobileImages];
  const hasGrid = allImages.length >= 4;

  return (
    <div id={`project-${project.id}`} className="relative">

      {/* ── Hero del proyecto ── */}
      <ProjectHero
        number={project.number}
        title={project.title}
        tagline={project.tagline}
        description={project.description}
        color={project.color}
        category={project.category}
        url={project.url}
        repo={project.repo}
      />

      {/* ── Qué / Cómo / Resultado ── */}
      <div className="container-apple py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { label: "El reto", text: project.what },
            { label: "El enfoque", text: project.how },
            { label: "El resultado", text: project.result },
          ].map(({ label, text }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-1 h-5 rounded-full" style={{ background: project.color }} />
                <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
                  {label}
                </span>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Tech Carousel ── */}
      <div className="py-8 relative overflow-hidden"
        style={{ borderTop: `1px solid ${project.color}15`, borderBottom: `1px solid ${project.color}15` }}>
        <TechCarousel techs={project.tech} color={project.color} />
      </div>

      {/* ── Grid de imágenes ── */}
      {hasGrid && (
        <div className="py-20">
          {/* Si tiene mobile + web, mostrar split */}
          {hasMobile ? (
            <div className="space-y-20">
              {/* Web */}
              <div className="container-apple">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="font-mono text-xs uppercase tracking-widest mb-8"
                  style={{ color: `${project.color}80` }}
                >
                  — versión web
                </motion.p>
                <ParallaxGrid images={project.webImages} color={project.color} />
              </div>

              {/* Mobile — fondo sólido oscuro para contraste */}
              <div className="py-24 relative overflow-hidden"
                style={{ background: "#0d0d1a" }}>
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${project.color}06, transparent)` }} />
                <div className="container-apple relative z-10">
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="font-mono text-xs uppercase tracking-widest mb-12"
                    style={{ color: `${project.color}80` }}
                  >
                    — versión mobile
                  </motion.p>
                  <div className="flex gap-6 justify-center flex-wrap">
                    {project.mobileImages.map((img, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        className="relative"
                        style={{ width: "200px" }}
                      >
                        {/* Marco de teléfono */}
                        <div className="rounded-[2.5rem] overflow-hidden relative"
                          style={{
                            border: `2px solid ${project.color}30`,
                            boxShadow: `0 0 40px ${project.color}20, 0 20px 60px rgba(0,0,0,0.5)`,
                          }}>
                          <img src={img.src} alt={img.alt} className="w-full block" />
                        </div>
                        {/* Reflejo debajo */}
                        <div className="absolute -bottom-8 left-4 right-4 h-8 opacity-20 blur-md"
                          style={{ background: project.color, borderRadius: "50%" }} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Solo web — grid normal
            <div className="container-apple">
              <ParallaxGrid images={project.webImages} color={project.color} />
            </div>
          )}
        </div>
      )}

      {/* ── Para proyectos con pocas imágenes (Thermo, Portfolio) ── */}
      {!hasGrid && project.webImages.length > 0 && (
        <div className="container-apple py-20">
          <div className="grid grid-cols-2 gap-4">
            {project.webImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-2xl overflow-hidden"
                style={{ border: `1px solid ${project.color}20` }}
              >
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Divider entre proyectos */}
      {index < projects.length - 1 && <ProjectDivider color={project.color} />}
    </div>
  );
}

// ─── Projects Section principal ───────────────────────────────────────────────
export function ProjectsSection() {
  return (
    <section id="projects" className="relative">

      {/* Header de la sección */}
      <div className="container-apple pt-32 pb-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-neon-cyan text-sm tracking-widest uppercase mb-3"
        >
          02. proyectos
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-5xl md:text-6xl font-bold text-text-primary mb-4"
        >
          Proyectos destacados
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-text-secondary text-lg max-w-xl"
        >
          Cada proyecto es una historia — un problema, un enfoque y un resultado.
        </motion.p>
      </div>

      {/* Lista de proyectos */}
      {projects.map((project, i) => (
        <ProjectSection key={project.id} project={project} index={i} />
      ))}

      {/* Footer de la sección */}
      <div className="container-apple py-20 text-center">
        <motion.a
          href="https://github.com/k1wi777"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 text-text-secondary hover:text-neon-cyan
                     font-medium transition-colors duration-200 group text-sm font-mono"
        >
          Ver más en GitHub
          <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
        </motion.a>
      </div>
    </section>
  );
}