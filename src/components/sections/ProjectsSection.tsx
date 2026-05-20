"use client";

import { motion } from "framer-motion";
import { FrikidexProject } from "@/components/projects/FrikidexProject";
import { UnytickProject } from "@/components/projects/UnytickProject";
import { PortfolioProject } from "@/components/projects/PortfolioProject";
import { ThermoProject } from "@/components/projects/ThermoProject";
import { ProjectDivider } from "@/components/projects/shared";

export function ProjectsSection() {
  return (
    <section id="projects" className="relative">

      {/* Header de sección */}
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

      {/* Proyectos */}
      <FrikidexProject />
      <ProjectDivider color="#ff375f" />

      <UnytickProject />
      <ProjectDivider color="#00f5ff" />

      <PortfolioProject />
      <ProjectDivider color="#bf5af2" />

      <ThermoProject />

      {/* Footer */}
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
          Ver más proyectos en GitHub
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </motion.a>
      </div>
    </section>
  );
}