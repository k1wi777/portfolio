// ─── ExperienceSection.tsx ────────────────────────────────────────────────────
"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useAnimations";
import { staggerContainer, fadeUp, fadeLeft } from "@/lib/animations";

const experiences = [
  {
    title: "Simulación y Desarrollo en Java",
    company: "Aplicaciones Desktop & Simulación",
    period: "2024 ",

    description:
      "Desarrollé simulaciones gráficas y aplicaciones orientadas a modelado físico utilizando Java, fortaleciendo habilidades de lógica, programación orientada a objetos y visualización dinámica.",

    highlights: [
      "Implementé simulaciones termodinámicas con representación gráfica en tiempo real.",
      "Trabajé con animaciones de partículas, cálculos físicos y estructuras orientadas a objetos.",
      "Desarrollé interfaces gráficas dinámicas utilizando Java Swing.",
    ],

    tech: ["Java", "Swing", "POO", "Simulación"],

    color: "#4ade80",
  },
  {
    title: "Desarrollo Web Frontend",
    company: "HTML, CSS & JavaScript",
    period: "2024 - 2025",

    description:
      "Durante esta etapa desarrollé múltiples interfaces web interactivas utilizando tecnologías frontend base, enfocándome en lógica del lado del cliente, estructura visual y experiencia de usuario.",

    highlights: [
      "Construí plataformas educativas interactivas con sistemas de evaluación dinámica.",
      "Trabajé con manipulación del DOM, validaciones y navegación entre vistas.",
      "Mejoré habilidades de maquetación responsive y organización visual de interfaces.",
    ],

    tech: ["HTML", "CSS", "JavaScript"],

    color: "#60a5fa",
  },
  {
    title: "Interfaces Modernas & Experiencia Visual",
    company: "Next.js & Motion Design",
    period: "2025 - 2026",

    description:
      "Exploré la construcción de interfaces modernas enfocadas en interacción, animaciones fluidas y experiencias visuales utilizando tecnologías frontend avanzadas.",

    highlights: [
      "Implementé animaciones basadas en scroll y transiciones interactivas.",
      "Trabajé con Framer Motion y arquitectura visual moderna.",
      "Desarrollé interfaces enfocadas en estética, rendimiento y usabilidad.",
    ],

    tech: ["Next.js", "Framer Motion", "TypeScript", "TailwindCSS"],

    color: "#a78bfa",
  },
  {
    title: "Frontend & Mobile Developer",
    company: "Unytick Platform",
    period: "2026 — Presente",

    description:
      "Participo en el desarrollo de una plataforma digital enfocada en la compra, venta y validación de tickets para cafeterías universitarias, construyendo experiencias tanto web como mobile orientadas a usuarios reales.",

    highlights: [
      "Desarrollé interfaces móviles utilizando React Native, Expo y TypeScript para estudiantes.",
      "Construí módulos web para operarios enfocados en venta y validación de tickets.",
      "Implementé manejo de sesiones y autenticación basada en JWT para protección de rutas.",
      "Trabajé con integración de APIs y estructuras frontend reutilizables para mantener escalabilidad y mantenibilidad.",
      "Participé en la mejora de flujos de usuario y experiencia multiplataforma entre web y mobile.",
    ],

    tech: [
      "React Native",
      "Expo",
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "JWT",
      "REST APIs",
    ],

    color: "#00f5ff",
  },
];

export function ExperienceSection() {
  const { ref, controls } = useScrollReveal(0.1);

  return (
    <section id="experience" className="section-padding relative">
      <div className="container-apple">
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
            03. experiencia
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-5xl md:text-6xl font-bold text-text-primary"
          >
            Mi evolución como desarrollador
          </motion.h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Línea vertical */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-cyan/30 via-neon-blue/20 to-transparent" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`relative flex ${i % 2 === 0 ? "md:justify-start" : "md:justify-end"} pl-8 md:pl-0`}
              >
                {/* Dot en la línea */}
                <div
                  className="absolute left-0 md:left-1/2 top-6 -translate-x-1/2 w-3 h-3 rounded-full border-2"
                  style={{
                    backgroundColor: exp.color,
                    borderColor: exp.color,
                    boxShadow: `0 0 10px ${exp.color}80`,
                  }}
                />

                {/* Card */}
                <div
                  className={`glass rounded-2xl p-6 border border-white/5 hover:border-white/10
                                 transition-all duration-300 max-w-lg
                                 ${i % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-display text-xl font-bold text-text-primary">
                        {exp.title}
                      </h3>
                      <p className="text-text-secondary text-sm mt-0.5">
                        {exp.company}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-text-muted whitespace-nowrap ml-4 mt-1">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md text-xs font-mono glass border border-white/5 text-text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
