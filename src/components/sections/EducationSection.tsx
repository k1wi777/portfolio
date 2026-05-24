// ─── EducationSection.tsx ─────────────────────────────────────────────────────
"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useAnimations";
import { staggerContainer, fadeUp, scaleIn } from "@/lib/animations";
import Image from "next/image";

const education = [
  {
    degree: "Ingeniería de Sistemas",

    institution: "Universidad de Córdoba",

    period: "2023 — Presente",

    description:
      "Formación en desarrollo de software, estructuras de datos, programación orientada a objetos y arquitectura de sistemas, complementada con proyectos prácticos enfocados en frontend, simulación y aplicaciones multiplataforma.",

    color: "#bf5af2",
  },
  {
    degree: "Aprendizaje autodidacta",

    institution: "Frontend, Motion & UI Engineering",

    period: "2024 — Presente",

    description:
      "Exploración continua de tecnologías frontend modernas, animaciones avanzadas, experiencia de usuario y desarrollo multiplataforma mediante proyectos personales y construcción de productos digitales.",

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
          className="mb-10"
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-neon-cyan text-sm tracking-widest uppercase mb-3"
          >
            04. estudios
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-5xl md:text-6xl font-bold text-text-primary"
          >
            Formación
          </motion.h2>
          <motion.p>
            Mi formación académica y el aprendizaje práctico que ha impulsado mi
            evolución como desarrollador frontend y mobile.
          </motion.p>
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
                         transition-all duration-300 group relative overflow-hidden"
              whileHover={{ y: -4 }}
            >
             
              <Image width={200} height={200} src={ edu.institution === "Universidad de Córdoba" ?"/Escudo_Universidad_de_Córdoba.png": "/react-logo.png" } alt="escudo Universidad de Córdoba"
              className="absolute -z-10 opacity-4 w-[80%] object-contain top-2 -right-2 scale-110 transition-transform duration-500  rotate-15"
              />
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                style={{
                  backgroundColor: edu.color + "20",
                  border: `1px solid ${edu.color}30`,
                }}
              >
                {/* Graduation cap icon */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={edu.color}
                  strokeWidth="2"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>

              <p
                className="font-mono text-xs uppercase tracking-widest mb-2"
                style={{ color: edu.color + "cc" }}
              >
                {edu.period}
              </p>
              <h3 className="font-display text-xl font-bold text-text-primary mb-1">
                {edu.degree}
              </h3>
              <p className="text-neon-cyan/70 text-sm mb-3">
                {edu.institution}
              </p>
              <p className="text-text-secondary text-sm leading-relaxed">
                {edu.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
