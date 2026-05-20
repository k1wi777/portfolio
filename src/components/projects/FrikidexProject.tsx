"use client";

import { motion } from "framer-motion";
import { ProjectHero, ProjectInfo, TechCarousel, ParallaxGrid, MobileFrame } from "./shared";

const COLOR = "#ff375f";

const TECH = [
  "React", "TypeScript", "PokéAPI", "REST APIs",
  "Tailwind CSS", "Vite", "JavaScript",
];

// Placeholder images — reemplaza con tus rutas reales en /public
const WEB_IMAGES = [
  { src: "https://picsum.photos/seed/fdex1/800/600", alt: "Frikidex home" },
  { src: "https://picsum.photos/seed/fdex2/800/900", alt: "Frikidex listado" },
  { src: "https://picsum.photos/seed/fdex3/800/700", alt: "Frikidex detalle" },
  { src: "https://picsum.photos/seed/fdex4/800/800", alt: "Frikidex filtros" },
  { src: "https://picsum.photos/seed/fdex5/800/600", alt: "Frikidex búsqueda" },
  { src: "https://picsum.photos/seed/fdex6/800/750", alt: "Frikidex stats" },
  { src: "https://picsum.photos/seed/fdex7/800/650", alt: "Frikidex tipos" },
  { src: "https://picsum.photos/seed/fdex8/800/700", alt: "Frikidex comparar" },
];

const MOBILE_IMAGES = [
  { src: "https://picsum.photos/seed/fdexm1/400/860", alt: "Frikidex mobile home" },
  { src: "https://picsum.photos/seed/fdexm2/400/860", alt: "Frikidex mobile lista" },
  { src: "https://picsum.photos/seed/fdexm3/400/860", alt: "Frikidex mobile detalle" },
  { src: "https://picsum.photos/seed/fdexm4/400/860", alt: "Frikidex mobile búsqueda" },
  { src: "https://picsum.photos/seed/fdexm5/400/860", alt: "Frikidex mobile stats" },
];

export function FrikidexProject() {
  return (
    <div id="project-frikidex">
      {/* Hero */}
      <ProjectHero
        number="01"
        title="Frikidex"
        category="Web Responsive"
        tagline="La Pokédex que siempre quisiste tener."
        description="Pokédex interactiva construida para explorar consumo de APIs y renderizado dinámico en React. Búsqueda en tiempo real, filtrado por tipo y estadísticas animadas."
        color={COLOR}
        url="https://frikidex.vercel.app/"
        repo="https://github.com/k1wi777/my-Pokedex"
      />

      {/* Info */}
      <ProjectInfo
        color={COLOR}
        what="Construir una herramienta de exploración de la PokéAPI que pusiera a prueba el manejo de estado, fetch de datos y arquitectura de componentes en React."
        how="Componentes reutilizables, custom hooks para fetch y filtrado, búsqueda con debounce, y diseño mobile-first con Tailwind CSS."
        result="Interfaz fluida con búsqueda instantánea sobre más de 1000 Pokémon, filtros por tipo y estadísticas en tiempo real. Completamente responsive."
      />

      {/* Tech carousel */}
      <div
        className="py-2"
        style={{ borderTop: `1px solid ${COLOR}15`, borderBottom: `1px solid ${COLOR}15` }}
      >
        <TechCarousel techs={TECH} color={COLOR} />
      </div>

      {/* Web — grid Pinterest con parallax */}
      <div className="container-apple py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="h-px w-8" style={{ background: COLOR }} />
          <span className="font-mono text-xs uppercase tracking-widest" style={{ color: `${COLOR}80` }}>
            versión web
          </span>
        </motion.div>
        <ParallaxGrid images={WEB_IMAGES} color={COLOR} />
      </div>

      {/* Mobile — fondo sólido + frames flotantes */}
      <div className="relative py-28 overflow-hidden" style={{ background: "#0a0a12" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${COLOR}06, transparent)` }}
        />
        <div className="container-apple relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-14"
          >
            <div className="h-px w-8" style={{ background: COLOR }} />
            <span className="font-mono text-xs uppercase tracking-widest" style={{ color: `${COLOR}80` }}>
              versión mobile
            </span>
          </motion.div>

          {/* Frames con alturas diferentes para profundidad */}
          <div className="flex gap-6 justify-center items-end flex-wrap">
            {MOBILE_IMAGES.map((img, i) => (
              <motion.div
                key={i}
                style={{ marginBottom: [0, 40, 20, 60, 10][i] ?? 0 }}
              >
                <MobileFrame src={img.src} alt={img.alt} color={COLOR} delay={i * 0.1} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
