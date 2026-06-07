"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ProjectHero, ProjectInfo, TechCarousel } from "./shared";

const COLOR = "#bf5af2";

const TECH = [
  "Next.js", "TypeScript", "Framer Motion", "GSAP",
  "Three.js", "React Three Fiber", "Tailwind CSS",
];

const PREVIEWS = [
  { src: "/projects/portfolio/portfolio1.png", alt: "Portfolio hero section" },
  { src: "/projects/portfolio/portfolio2.gif", alt: "Portfolio proyectos" },
  { src: "/projects/portfolio/portfolio3.png", alt: "Portfolio contacto" },
];

// ─── Syntax highlighter manual ────────────────────────────────────────────────
function highlight(code: string, accentColor: string): string {
  return code
    // comentarios
    .replace(/(\/\/.+)/g,           `<span style="color:#4a4a6a;font-style:italic">$1</span>`)
    // keywords
    .replace(/\b(const|let|if|return|new|true|false|null|undefined|void|async|await|=>)\b/g,
                                    `<span style="color:${accentColor}dd">$1</span>`)
    // funciones llamadas  word(
    .replace(/\b([a-zA-Z_$][\w$]*)\s*(?=\()/g,
                                    `<span style="color:#00f5ff">$1</span>`)
    // strings
    .replace(/(['"`])([^'"`\n]*)\1/g,
                                    `<span style="color:#30d158">$1$2$1</span>`)
    // números
    .replace(/\b(\d+\.?\d*)\b/g,   `<span style="color:#ff9f0a">$1</span>`)
    // propiedades de objeto  word:
    .replace(/\b([\w]+)(?=\s*:(?!:))/g,
                                    `<span style="color:#00f5ffaa">$1</span>`)
    // tipos TS  : Word / <Word>
    .replace(/(?<=:\s*)([A-Z][\w]*)/g,
                                    `<span style="color:#ffd60a">$1</span>`)
    // puntuación  { } ( ) [ ] ; ,
    .replace(/([{}()[\];,])/g,      `<span style="color:#52525b">$1</span>`);
}

// ─── Editor card ──────────────────────────────────────────────────────────────
function CodeCard({
  filename,
  code,
  accentColor,
  delay = 0,
}: {
  filename: string;
  code: string;
  accentColor: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
      className="rounded-2xl overflow-hidden w-full min-w-0 max-w-full"
      style={{
        background: "#080810",
        border: `1px solid ${accentColor}20`,
        boxShadow: `0 0 60px ${accentColor}06, 0 20px 60px rgba(0,0,0,0.5)`,
      }}
    >
      {/* Titlebar */}
      <div
        className="flex items-center gap-2 px-3 sm:px-4 py-3 min-w-0"
        style={{ borderBottom: `1px solid ${accentColor}12`, background: "#06060e" }}
      >
        <div className="flex items-center gap-2 shrink-0">
          {["#ff375f", "#ffcc00", "#30d158"].map((c) => (
            <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
          ))}
        </div>
        {/* Tabs decorativas */}
        <div className="flex items-center gap-1 ml-2 sm:ml-4 min-w-0 flex-1">
          <span
            className="px-2 sm:px-3 py-1 rounded-t text-[10px] sm:text-xs font-mono truncate max-w-[140px] sm:max-w-none"
            style={{
              background: `${accentColor}12`,
              color: accentColor,
              borderBottom: `1px solid ${accentColor}`,
            }}
          >
            {filename}
          </span>
        </div>
        {/* Línea de estado git decorativa */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-mono" style={{ color: "#30d15870" }}>● main</span>
          <span className="text-[10px] font-mono" style={{ color: "#52525b" }}>TypeScript</span>
        </div>
      </div>

      {/* Números de línea + código */}
      <div className="flex overflow-x-auto max-w-full overscroll-x-contain">
        {/* Líneas */}
        <div
          className="select-none pt-4 pb-4 pl-3 pr-3 text-right shrink-0"
          style={{ color: "#2a2a3a", fontSize: "11px", lineHeight: "1.75", minWidth: "32px", borderRight: `1px solid ${accentColor}08` }}
        >
          {code.split("\n").map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Código */}
        <pre
          className="p-3 sm:p-4 text-[10px] leading-5 font-mono flex-1 min-w-0 overflow-x-auto whitespace-pre"
          style={{ color: "#a1a1aa" }}
        >
          <code
            dangerouslySetInnerHTML={{ __html: highlight(code, accentColor) }}
          />
        </pre>
      </div>
    </motion.div>
  );
}

// ─── Snippets ─────────────────────────────────────────────────────────────────
const SNIPPET_SCROLL = `// Scroll storytelling
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

const SNIPPET_SPHERE = `// Esfera 3D reactiva al scroll y al mouse
useFrame((state) => {
  const t  = state.clock.getElapsedTime();
  const sp = scrollProgress; // 0 → 1

  // Lerp del mouse para suavizar
  lerpMouse.x += (mouse.x - lerpMouse.x) * 0.04;
  lerpMouse.y += (mouse.y - lerpMouse.y) * 0.04;

  // Rotación + influencia del mouse
  mesh.rotation.x = t * 0.15 + lerpMouse.y * 0.3;
  mesh.rotation.y = t * 0.25 + lerpMouse.x * 0.3;

  // Distorsión y color interpolados con scroll
  mat.distort = 0.3 + Math.sin(sp * Math.PI) * 0.6;
  const hue = 185 / 360 + sp * 0.26; // cyan → purple
  mat.color.setHSL(hue, 1, 0.55);
});`;

export function PortfolioProject() {
  const codeRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: codeRef,
    offset: ["start end", "end start"],
  });
  // Las dos cards se mueven a velocidades distintas → profundidad
  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [80, -20]);

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
         what="El portfolio de un desarrollador frontend es en sí mismo un proyecto técnico. El reto fue construir un sitio que no solo mostrara mi trabajo, sino que fuera evidencia directa de las capacidades que pretendia comunicar."
        how="Arquitectura de scroll storytelling con GSAP ScrollTrigger para transiciones entre secciones sin desplazamiento perceptible. Esfera 3D en WebGL con React Three Fiber que interpola geometría, distorsión y color en función del progreso de scroll. Sistema de diseño propio con tokens neon sobre base oscura inspirada en macOS."
        result="Un sitio donde cada interacción es intencional — desde el scramble de texto en el hero hasta la reacción de la esfera al mouse.Una experiencia que demuestra dominio de animaciónes , 3D en el browser y arquitectura de componentes sin sacrificar rendimiento."
      />

      {/* Tech carousel */}
      <div
        className="py-2"
        style={{ borderTop: `1px solid ${COLOR}15`, borderBottom: `1px solid ${COLOR}15` }}
      >
        <TechCarousel techs={TECH} color={COLOR} />
      </div>

      {/* Layout: dos editor cards a la izquierda + previews a la derecha */}
      <div ref={codeRef} className="container-apple py-24 min-w-0 max-w-full overflow-x-hidden">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs uppercase tracking-widest mb-10"
          style={{ color: `${COLOR}70` }}
        >
          — bajo el capó
        </motion.p>

        <div className="grid md:grid-cols-2 gap-10 items-start min-w-0">

          {/* Columna izquierda — dos editor cards con parallax */}
          <div className="flex flex-col gap-6 min-w-0 max-w-full">
            <motion.div style={{ y: y1 }} className="min-w-0 max-w-full">
              <CodeCard
                filename="useStoryScroll.ts"
                code={SNIPPET_SCROLL}
                accentColor={COLOR}
                delay={0}
              />
            </motion.div>
            <motion.div style={{ y: y2 }} className="min-w-0 max-w-full">
              <CodeCard
                filename="SceneBackground.tsx"
                code={SNIPPET_SPHERE}
                accentColor={COLOR}
                delay={0.15}
              />
            </motion.div>
          </div>

          {/* Columna derecha — previews apiladas con offset */}
          <div className="flex flex-col gap-4 pt-0 md:pt-6 min-w-0 max-w-full">
            {PREVIEWS.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`rounded-2xl overflow-hidden group w-full max-w-full min-w-0 ${
                  i === 1 ? "md:ml-5" : i === 2 ? "md:ml-10" : ""
                }`}
                style={{
                  border: `1px solid ${COLOR}20`,
                  boxShadow: `0 8px 40px rgba(0,0,0,0.4)`,
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full max-w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}