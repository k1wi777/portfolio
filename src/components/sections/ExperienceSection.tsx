// ─── ExperienceSection.tsx ────────────────────────────────────────────────────
"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useAnimations";
import { staggerContainer, fadeUp, fadeLeft } from "@/lib/animations";

const experiences = [
  {
    title: "Frontend Developer",
    company: "Empresa / Freelance",
    period: "2024 — Presente",
    description:
      "Desarrollé interfaces en React/Next.js con foco en rendimiento y animaciones. Colaboré con diseñadores para implementar sistemas de diseño coherentes.",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    color: "#00f5ff",
  },
  {
    title: "Desarrollador Jr.",
    company: "Otra empresa",
    period: "2023 — 2024",
    description:
      "Construcción de componentes reutilizables, integración de APIs REST y optimización de LCP/CLS en proyectos web.",
    tech: ["JavaScript", "React", "SCSS", "REST APIs"],
    color: "#0080ff",
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
          <motion.p variants={fadeUp} className="font-mono text-neon-cyan text-sm tracking-widest uppercase mb-3">
            03. experiencia
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-display text-5xl md:text-6xl font-bold text-text-primary">
            Donde he trabajado
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
                <div className={`glass rounded-2xl p-6 border border-white/5 hover:border-white/10
                                 transition-all duration-300 max-w-lg
                                 ${i % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-display text-xl font-bold text-text-primary">{exp.title}</h3>
                      <p className="text-text-secondary text-sm mt-0.5">{exp.company}</p>
                    </div>
                    <span className="font-mono text-xs text-text-muted whitespace-nowrap ml-4 mt-1">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-md text-xs font-mono glass border border-white/5 text-text-muted">
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
