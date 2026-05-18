// ─── EducationSection.tsx ─────────────────────────────────────────────────────
"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useAnimations";
import { staggerContainer, fadeUp, scaleIn } from "@/lib/animations";

const education = [
  {
    degree: "Ingeniería / Tecnología en Sistemas",
    institution: "Tu Universidad",
    period: "2022 — Presente",
    description: "Formación en desarrollo de software, algoritmos, bases de datos y sistemas distribuidos.",
    color: "#bf5af2",
  },
  {
    degree: "Desarrollo Web Full Stack",
    institution: "Plataforma / Bootcamp",
    period: "2023",
    description: "Especialización en tecnologías modernas web: React, Node.js, bases de datos y despliegue.",
    color: "#00f5ff",
  },
];

export function EducationSection() {
  const { ref, controls } = useScrollReveal(0.1);

  return (
    <section id="education" className="section-padding relative">
      <div className="container-apple">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="mb-16"
        >
          <motion.p variants={fadeUp} className="font-mono text-neon-cyan text-sm tracking-widest uppercase mb-3">
            04. estudios
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-display text-5xl md:text-6xl font-bold text-text-primary">
            Formación
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {education.map((edu, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              className="glass rounded-3xl p-7 border border-white/5 hover:border-white/10
                         transition-all duration-300 group"
              whileHover={{ y: -4 }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: edu.color + "20", border: `1px solid ${edu.color}30` }}
              >
                {/* Graduation cap icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={edu.color} strokeWidth="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>

              <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: edu.color + "cc" }}>
                {edu.period}
              </p>
              <h3 className="font-display text-xl font-bold text-text-primary mb-1">{edu.degree}</h3>
              <p className="text-neon-cyan/70 text-sm mb-3">{edu.institution}</p>
              <p className="text-text-secondary text-sm leading-relaxed">{edu.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
