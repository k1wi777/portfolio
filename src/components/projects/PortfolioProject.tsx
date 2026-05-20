"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ProjectHero, ProjectInfo, TechCarousel } from "./shared";

const COLOR = "#bf5af2";

const TECH = [
  "Next.js", "TypeScript", "Framer Motion", "GSAP",
  "Three.js", "React Three Fiber", "Tailwind CSS",
];

// Para el portfolio usamos un layout diferente — código + preview horizontal
const PREVIEWS = [
  { src: "https://picsum.photos/seed/port1/1200/700", alt: "Portfolio hero section" },
  { src: "https://picsum.photos/seed/port2/1200/700", alt: "Portfolio proyectos" },
  { src: "https://picsum.photos/seed/port3/1200/700", alt: "Portfolio contacto" },
];

// Snippet de código decorativo
const CODE_SNIPPET = `// Scroll storytelling
const { containerRef, contentRef } = useStoryScroll({
  heightVh: 200,
  onEnter: (container) => {
    gsap.from('.hero-title', {
      opacity: 0,
      y: 60,
      stagger: 0.08,
      ease: 'power3.out',
    });
  },
});

// 3D sphere reacts to scroll
useFrame((state) => {
  const sp = scrollProgress;
  mat.distort = 0.3 + Math.sin(sp * Math.PI) * 0.6;
  mat.color.setHSL(185/360 + sp * 0.26, 1, 0.55);
});`;

export function PortfolioProject() {
  const codeRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: codeRef, offset: ["start end", "end start"] });
  const codeY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <div id="project-portfolio">
      <ProjectHero
        number="03"
        title="Portfolio"
        category="UI Engineering"
        tagline="Donde el código se convierte en experiencia."
        description="Portafolio personal que usa el sitio como canvas de experimentación — scroll storytelling, efectos 3D con Three.js y un sistema de diseño neon/Apple."
        color={COLOR}
        url="#"
        repo="#"
      />

      <ProjectInfo
        color={COLOR}
        what="Crear un espacio personal que demostrara habilidades técnicas y de diseño simultáneamente, experimentando con técnicas avanzadas de animación."
        how="Scroll storytelling con GSAP ScrollTrigger, esfera 3D reactiva al scroll y al mouse con React Three Fiber, text scramble y glassmorphism."
        result="Experiencia visual inmersiva que combina rendimiento y estética. La esfera 3D cambia de color y forma a medida que el usuario scrollea por el sitio."
      />

      {/* Tech carousel */}
      <div
        className="py-2"
        style={{ borderTop: `1px solid ${COLOR}15`, borderBottom: `1px solid ${COLOR}15` }}
      >
        <TechCarousel techs={TECH} color={COLOR} />
      </div>

      {/* Layout especial: código a la izquierda, preview a la derecha */}
      <div ref={codeRef} className="container-apple py-24">
        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Snippet de código animado */}
          <motion.div style={{ y: codeY }}>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-xs uppercase tracking-widest mb-4"
              style={{ color: `${COLOR}80` }}
            >
              — bajo el capó
            </motion.p>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-2xl overflow-hidden"
              style={{
                background: "#0d0d1a",
                border: `1px solid ${COLOR}20`,
                boxShadow: `0 0 40px ${COLOR}08`,
              }}
            >
              {/* Barra de título tipo editor */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ borderBottom: `1px solid ${COLOR}15`, background: "#0a0a15" }}
              >
                {["#ff375f", "#ffcc00", "#30d158"].map((c) => (
                  <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
                ))}
                <span className="font-mono text-xs ml-2" style={{ color: `${COLOR}50` }}>
                  useStoryScroll.ts
                </span>
              </div>
              <pre
                className="p-6 text-xs leading-relaxed overflow-x-auto font-mono"
                style={{ color: "#a1a1aa" }}
              >
                <code
                  dangerouslySetInnerHTML={{
                    __html: CODE_SNIPPET
                      .replace(/\/\/.+/g, (m) => `<span style="color:#52525b">${m}</span>`)
                      .replace(/\b(const|useFrame|useScroll|Math)\b/g, (m) => `<span style="color:${COLOR}cc">${m}</span>`)
                      .replace(/\b(opacity|y|stagger|ease|distort|color)\b/g, (m) => `<span style="color:#00f5ff99">${m}</span>`),
                  }}
                />
              </pre>
            </motion.div>
          </motion.div>

          {/* Previews apilados con offset */}
          <div className="space-y-4 pt-8">
            {PREVIEWS.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="rounded-2xl overflow-hidden"
                style={{
                  border: `1px solid ${COLOR}20`,
                  boxShadow: `0 8px 30px rgba(0,0,0,0.4)`,
                  marginLeft: `${i * 16}px`,
                }}
              >
                <img src={img.src} alt={img.alt} className="w-full object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
