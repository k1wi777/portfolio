// ─── ContactSection.tsx ───────────────────────────────────────────────────────
"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useAnimations";
import { staggerContainer, fadeUp } from "@/lib/animations";

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/k1wi777",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/jose-a-padilla/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.２２７ ２４ ２２．２７１V１．７２９C２４ .７７４ ２３．２ ０ ２２．２２２ ０h．００３z" />
      </svg>
    ),
  },
];

export function ContactSection() {
  const { ref, controls } = useScrollReveal(0.1);

  return (
    <section id="contact" className="section-padding relative overflow-x-clip">
      {/* Glow background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[300px]
                        bg-neon-cyan/5 blur-[100px] rounded-full"
        />
      </div>

      <div className="container-apple relative">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-neon-cyan text-sm tracking-widest uppercase mb-4"
          >
            05. contacto
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-5xl md:text-6xl font-bold text-text-primary mb-6"
          >
            ¿Hablamos?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-text-secondary text-lg leading-relaxed mb-10"
          >
            Me apasiona construir interfaces modernas que combinen rendimiento,
            diseño y experiencias memorables. Siempre estoy abierto a colaborar
            en proyectos interesantes, ideas creativas o conversaciones sobre
            frontend y tecnología.
          </motion.p>

          {/* Email CTA */}
          <motion.a
            variants={fadeUp}
            href="mailto:jp3563454@gmail.com?subject=Contacto%20desde%20tu%20portfolio&body=Hola%20José,..."
            className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl
                       font-semibold text-lg text-bg-primary bg-neon-cyan
                       hover:shadow-neon-cyan hover:scale-[1.03] transition-all duration-300
                       relative overflow-hidden "
            whileTap={{ scale: 0.97 }}
          >
            <span
              className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%]
                             bg-gradient-to-r from-transparent via-white/20 to-transparent
                             transition-transform duration-700"
            />
            
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
            </svg>
            <span className="relative">Envíame un mensaje</span>
          </motion.a>

          {/* Social links */}
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-6 mt-10"
          >
            {socialLinks.map(({ name, url, icon }) => (
              <motion.a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl glass border border-white/5
                           flex items-center justify-center text-text-muted
                           hover:text-neon-cyan hover:border-neon-cyan/30 hover:shadow-neon-cyan
                           transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={name}
              >
                {icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


