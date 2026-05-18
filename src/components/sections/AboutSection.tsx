"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useAnimations";
import {
  staggerContainer,
  fadeUp,
  fadeLeft,
  fadeRight,
} from "@/lib/animations";

const skills = {
  Frontend: ["React", "Next.js", "React Native", "TypeScript", "JavaScript"],
  Estilos: ["Tailwind CSS", "SCSS/Sass", "Framer Motion", "GSAP"],
  Herramientas: ["Git", "GitHub", "Figma", "VS Code"],
  "Backend básico": ["Node.js", "REST APIs", "Firebase"],
};

const stats = [
  { value: "1+", label: "Años aprendiendo" },
  { value: "5+", label: "Proyectos completados" },
  { value: "5+", label: "Tecnologías utilizadas" },
];

export function AboutSection() {
  const { ref: titleRef, controls: titleControls } = useScrollReveal(0.2);
  const { ref: contentRef, controls: contentControls } = useScrollReveal(0.1);

  return (
    <section id="about" className="section-padding relative ">
      <div className="container-apple">
        {/* Section label */}
        <motion.div
          ref={titleRef}
          variants={staggerContainer}
          initial="hidden"
          animate={titleControls}
          className="mb-16"
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-neon-cyan text-sm tracking-widest uppercase mb-3"
          >
            01. sobre mí
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-5xl md:text-6xl font-bold text-text-primary"
          >
            Quién soy
          </motion.h2>
        </motion.div>

        {/* Grid 2 columnas */}
        <motion.div
          ref={contentRef}
          variants={staggerContainer}
          initial="hidden"
          animate={contentControls}
          className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start"
        >
          {/* Bio */}
          <motion.div variants={fadeLeft} className="space-y-5">
            <p className="text-text-secondary text-lg leading-relaxed">
              Soy un{" "}
              <span className="text-text-primary font-medium">
                Frontend & Mobile Developer
              </span>{" "}
              enfocado en construir experiencias digitales modernas que combinen
              diseño, rendimiento y usabilidad.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              Trabajo principalmente con React, Next.js y TypeScript,
              desarrollando{" "}
              <span className="text-neon-cyan">
                interfaces escalables, interactivas y centradas en la
                experiencia del usuario
              </span>
              . Disfruto crear aplicaciones donde la estética visual y la
              arquitectura frontend trabajen juntas de forma fluida.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              Me interesa especialmente el desarrollo de interfaces modernas, animaciones web, experiencias multiplataforma y la construcción de productos digitales mantenibles con una fuerte atención al detalle.
            </p>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              {stats.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="font-display text-3xl font-bold text-gradient-cyan">
                    {value}
                  </p>
                  <p className="text-text-muted text-xs mt-1 max-w-[80px] leading-tight">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div variants={fadeRight} className="space-y-6">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <p className="text-text-muted text-xs font-mono uppercase tracking-widest mb-3">
                  {category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <motion.span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg glass text-sm text-text-secondary
                                 border border-white/5 hover:border-neon-cyan/25 hover:text-text-primary
                                 transition-all duration-200 cursor-default"
                      whileHover={{ scale: 1.04, y: -2 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 20,
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
