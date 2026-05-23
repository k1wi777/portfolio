"use client";

import { motion } from "framer-motion";
import {
  ProjectHero,
  ProjectInfo,
  TechCarousel,
  ParallaxGrid,
  MobileFrame,
} from "./shared";
import Image from "next/image";

const COLOR = "#ff375f";

const TECH = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "PokéAPI",
  "JavaScript",
  "REST APIs",
  "Responsive Design",
  "Vercel",
  "React"
];

// Placeholder images — reemplaza con tus rutas reales en /public
const WEB_IMAGES = [
  { src: "/projects/frikidex/frikidex3.png", alt: "Frikidex detalle" },

  { src: "/projects/frikidex/frikidex4.png", alt: "Frikidex filtros" },
  { src: "/projects/frikidex/frikidex6.gif", alt: "Frikidex stats" },
  { src: "/projects/frikidex/frikidex5.png", alt: "Frikidex búsqueda" },
  { src: "/projects/frikidex/frikidex7.png", alt: "Frikidex tipos" },
  { src: "/projects/frikidex/frikidex8.png", alt: "Frikidex comparar" },
  { src: "/projects/frikidex/frikidex9.gif", alt: "Frikidex comparar" },
  { src: "/projects/frikidex/frikidex2.png", alt: "Frikidex listado" },
  { src: "/projects/frikidex/frikidex10.gif", alt: "Frikidex comparar" },
  { src: "/projects/frikidex/frikidex11.png", alt: "Frikidex comparar" },
  { src: "/projects/frikidex/frikidex14.png", alt: "Frikidex comparar" },
  { src: "/projects/frikidex/frikidex13.png", alt: "Frikidex comparar" },
  { src: "/projects/frikidex/frikidex12.png", alt: "Frikidex comparar" },
  { src: "/projects/frikidex/frikidex1.png", alt: "Frikidex home" },
];

const MOBILE_IMAGES = [
  {
    src: "/projects/frikidex/frikidexMobile1.jpg",
    alt: "Frikidex mobile home",
  },
  {
    src: "/projects/frikidex/frikidexMobile2.jpg",
    alt: "Frikidex mobile lista",
  },
  {
    src: "/projects/frikidex/frikidexMobile3.gif",
    alt: "Frikidex mobile detalle",
  },
  {
    src: "/projects/frikidex/frikidexMobile4.jpg",
    alt: "Frikidex mobile búsqueda",
  },
  {
    src: "/projects/frikidex/frikidexMobile5.jpg",
    alt: "Frikidex mobile stats",
  },
];

export function FrikidexProject() {
  return (
    <div id="project-frikidex ">
      {/* Hero */}

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative w-full "
      >
        <Image
          src="/projects/frikidex/banner1.png"
          alt="Frikidex hero"
          width={1200}
          height={800}
          className="w-[80%]  object-cover opacity-50 absolute top-35 right-0 rounded-3xl mask-l-from-60% mask-l-to-90% mask-r-from-80% mask-b-from-90% mask-t-from-95% z-10 pointer-events-none"
        />
        <ProjectHero
          number="01"
          title="Frikidex"
          category="Web Responsive"
          tagline="La Pokédex que siempre quisiste tener."
          description="Web interactiva diseñada para centralizar información del universo Pokémon en una experiencia agradable. Con búsqueda en tiempo real, filtrado inteligente y más..."
          color={COLOR}
          url="https://frikidex.vercel.app/"
          repo="https://github.com/k1wi777/my-Pokedex"
        />
      </motion.div>

      {/* Info */}
      <ProjectInfo
        color={COLOR}
        what="Centralizar información relevante del universo Pokémon en una plataforma moderna e interactiva que facilitara a los usuarios fanaticos de esta franquisia consultar estadísticas, tipos y datos importantes desde una sola interfaz."
        how="Analicé la estructura de endpoints de la PokéAPI para organizar y transformar la información más relevante dentro de una arquitectura construida con Next.js. Implementé renderizado dinámico, búsqueda optimizada, filtrado por tipos, componentes reutilizables y una interfaz responsive enfocada en rendimiento y experiencia de usuario."
        result="Una Pokédex web fluida y completamente responsive capaz de mostrar información de más de 1000 Pokémon en tiempo real, consolidando habilidades en consumo de APIs, organización de datos, arquitectura frontend y despliegue de aplicaciones modernas."
      />

      {/* Tech carousel */}
      <div
        className="py-2"
        style={{
          borderTop: `1px solid ${COLOR}15`,
          borderBottom: `1px solid ${COLOR}15`,
        }}
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
          <span
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: `${COLOR}80` }}
          >
            versión web
          </span>
        </motion.div>
        <ParallaxGrid images={WEB_IMAGES} color={COLOR} />
      </div>

      {/* Mobile — fondo sólido + frames flotantes */}
      <div
        className="relative py-28 overflow-hidden"
        style={{ background: "#0a0a12" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${COLOR}06, transparent)`,
          }}
        />
        <div className="container-apple relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-14"
          >
            <div className="h-px w-8" style={{ background: COLOR }} />
            <span
              className="font-mono text-xs uppercase tracking-widest"
              style={{ color: `${COLOR}80` }}
            >
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
                <MobileFrame
                  src={img.src}
                  alt={img.alt}
                  color={COLOR}
                  delay={i * 0.1}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
