"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/useAnimations";
import { staggerContainer, fadeUp, scaleIn } from "@/lib/animations";

// ─── Project Data — actualiza esto con tus proyectos reales ─────────────────
const projects = [
  {
    id: 1,

    title: "Frikidex",

    description:
      "Construí una Pokédex interactiva para explorar consumo de APIs y renderizado dinámico de datos en React, implementando búsqueda en tiempo real, filtrado eficiente y una arquitectura basada en componentes enfocada en experiencia de usuario y escalabilidad.",

    tech: ["React", "TypeScript", "REST APIs", "Tailwind CSS"],

    url: "https://frikidex.vercel.app/",
    repo: "https://github.com/k1wi777/my-Pokedex",

    color: "#ff375f",

    category: "web page",

    featured: true,
  },
  {
    id: 2,

    title: "Unytick",

    description:
      "Participé en el desarrollo de una plataforma digital para gestión y validación de tickets universitarios, construyendo interfaces mobile y web orientadas a mejorar la experiencia de estudiantes y operarios mediante autenticación segura, flujos optimizados y arquitectura frontend escalable.",

    tech: ["React Native", "Expo", "Next.js", "TypeScript", "JWT"],

    url: "https://unytick.vercel.app",
    repo: "https://github.com/Unytick-app/Unytick-app-web",

    color: "#00f5ff",

    category: "Mobile & Web",

    featured: true,
  },
  {
    id: 3,

    title: "Personal Portfolio",

    description:
      "Diseñé y desarrollé un portfolio interactivo enfocado en animaciones fluidas, experiencias visuales modernas y arquitectura frontend reutilizable, explorando motion design y transiciones basadas en scroll con Next.js y Framer Motion.",

    tech: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],

    url: "#",
    repo: "#",

    color: "#bf5af2",

    category: "UI Engineering",

    featured: true,
  },
  {
    id: 4,

    title: "Thermodynamic Simulator",

    description:
      "Desarrollé simulaciones termodinámicas en Java para representar visualmente variables físicas y comportamiento de partículas en tiempo real, implementando cálculos matemáticos, animaciones dinámicas y representación gráfica de procesos físicos.",

    tech: ["Java", "Swing", "POO", "Physics Simulation"],

    url: "#",
    repo: "#",

    color: "#30d158",

    category: "Desktop Simulation",

    featured: true,
  },
];

// ─── Project Card ────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      variants={scaleIn}
      className="group relative glass rounded-3xl overflow-hidden border border-white/5
                 hover:border-white/10 transition-all duration-500 cursor-pointer"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Gradient glow de color del proyecto en hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${project.color}15, transparent 70%)`,
        }}
      />

      {/* Línea de color superior */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.color}60, transparent)`,
          opacity: hovered ? 1 : 0.3,
        }}
      />

      <div className="p-7 md:p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Color dot */}
            <div
              className="w-3 h-3 rounded-full shadow-lg"
              style={{
                backgroundColor: project.color,
                boxShadow: `0 0 12px ${project.color}80`,
              }}
            />
            <span
              className="text-xs font-mono uppercase tracking-widest"
              style={{ color: project.color + "cc" }}
            >
              {project.category}
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.repo !== "#" && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-text-primary transition-colors duration-200"
                onClick={(e) => e.stopPropagation()}
                aria-label="Ver código"
              >
                {/* GitHub icon */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            )}
            {project.url !== "#" && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-text-primary transition-colors duration-200"
                onClick={(e) => e.stopPropagation()}
                aria-label="Ver demo"
              >
                {/* External link icon */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display text-2xl font-bold text-text-primary mb-3 group-hover:text-gradient-cyan transition-all duration-300">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-text-secondary text-sm leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-md text-xs font-mono"
              style={{
                backgroundColor: project.color + "15",
                color: project.color + "cc",
                border: `1px solid ${project.color}25`,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────
export function ProjectsSection() {
  const { ref, controls } = useScrollReveal(0.1);

  return (
    <section id="projects" className="section-padding relative">
      <div className="container-apple">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="mb-16"
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-neon-cyan text-sm tracking-widest uppercase mb-3"
          >
            02. proyectos
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-5xl md:text-6xl font-bold text-text-primary mb-4"
          >
            Proyectos destacados
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-text-secondary text-lg max-w-xl"
          >
            Una selección de proyectos que demuestran mi enfoque en la calidad,
            el diseño y la experiencia de usuario.
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>

        {/* Ver más en GitHub */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/k1wi777"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-neon-cyan
                       font-medium transition-colors duration-200 group"
          >
            Ver más en GitHub
            <span className="group-hover:translate-x-1 transition-transform duration-200">
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
