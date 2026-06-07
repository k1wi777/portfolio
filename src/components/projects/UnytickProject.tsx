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

const COLOR = "#00f5ff";

const TECH = [
  "React Native",
  "Expo",
  "Next.js",
  "TypeScript",
  "JWT",
  "REST APIs",
  "Tailwind CSS",
  "Node.js",
];

const WEB_IMAGES = [
  { src: "/projects/unytick/unytick1.png", alt: "Unytick dashboard" },
  { src: "/projects/unytick/unytick2.png", alt: "Unytick tickets" },
  { src: "/projects/unytick/unytick3.png", alt: "Unytick validación" },
  { src: "/projects/unytick/unytick4.png", alt: "Unytick reportes" },
  { src: "/projects/unytick/unytick5.png", alt: "Unytick usuarios" },
  {
    src: "/projects/unytick/unytick6.png",
    alt: "Unytick panel admin",
  },
  { src: "/projects/unytick/unytick7.png", alt: "Unytick historial" },
  {
    src: "/projects/unytick/unytick8.png",
    alt: "Unytick estadísticas",
  },
  {
    src: "/projects/unytick/unytick9.png",
    alt: "Unytick estadísticas",
  },
  { src: "/projects/unytick/unytick10.png", alt: "Unytick reportes" },
  {
    src: "/projects/unytick/unytick11.png",
    alt: "Unytick validación",
  },
];

const MOBILE_IMAGES = [
  { src: "/projects/unytick/unytickMobile1.jpg", alt: "Unytick app home" },
  {
    src: "/projects/unytick/unytickMobile3.gif",
    alt: "Unytick app scanner QR",
  },
  {
    src: "/projects/unytick/unytickMobile2.jpg",
    alt: "Unytick app mis tickets",
  },
  {
    src: "/projects/unytick/unytickMobile6.gif",
    alt: "Unytick app notificaciones",
  },
  {
    src: "/projects/unytick/unytickMobile4.jpg",
    alt: "Unytick app perfil",
  },

  {
    src: "/projects/unytick/unytickMobile7.gif",
    alt: "Unytick app recarga",
  },
  {
    src: "/projects/unytick/unytickMobile5.jpg",
    alt: "Unytick app historial",
  },
  { src: "/projects/unytick/unytickMobile8.gif", alt: "Unytick app login" },
];

export function UnytickProject() {
  return (
    <div id="project-unytick">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative w-full overflow-x-clip"
      >
        <Image
          src="/projects/unytick/banner.png"
          alt="Unytick hero"
          width={1200}
          height={800}
          className="w-[80%] pointer-events-none object-cover opacity-70 absolute top-35 right-0 rounded-3xl mask-l-from-65% mask-l-to-80% mask-r-from-80% mask-b-from-90% mask-t-from-85% z-10"
        />
        <ProjectHero
          number="02"
          title="Unytick"
          category="Mobile & Web Platform"
          tagline="Gestión de tickets universitarios, reimaginada."
          description="Ecosistema digital diseñado para modernizar la gestión de tickets universitarios mediante validación en tiempo real, autenticación segura y sincronización entre aplicación móvil y panel administrativo web."
          color={COLOR}
          url="https://unytick.vercel.app"
          repo="https://github.com/Unytick-app/Unytick-app-web"
        />
      </motion.div>

      {/* Info */}
      <ProjectInfo
        color={COLOR}
        what="Modernizar el proceso de gestión y validación de tickets universitarios mediante una solución digital capaz de reducir tiempos de espera, eliminar procesos manuales y mejorar la experiencia tanto para estudiantes como para operadores."
        how="Desarrollé una arquitectura multiplataforma compuesta por una aplicación móvil construida con React Native y Expo para estudiantes, junto a un panel administrativo en Next.js para gestión y monitoreo. Implementé autenticación segura con JWT, generación y validación de códigos QR en tiempo real, sincronización entre plataformas y una interfaz responsive enfocada en usabilidad."
        result="El proyecto evolucionó en un ecosistema digital completo para compra, validación y administración de tickets universitarios, incorporando autenticación segura, escaneo QR en tiempo real, métricas de uso y una experiencia fluida tanto en dispositivos móviles como en entorno web."
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

      {/* Web — Pinterest grid */}
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
            plataforma web — panel de administración
          </span>
        </motion.div>
        <ParallaxGrid images={WEB_IMAGES} color={COLOR} />
      </div>

      {/* Mobile — dos filas escalonadas */}
      <div
        className="relative py-28 overflow-hidden"
        style={{ background: "#080f14" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 70% at 50% 50%, ${COLOR}05, transparent)`,
          }}
        />
        {/* Líneas decorativas horizontales */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-px pointer-events-none"
            style={{
              top: `${15 + i * 14}%`,
              background: `linear-gradient(90deg, transparent, ${COLOR}08, transparent)`,
            }}
          />
        ))}

        <div className="container-apple relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-16"
          >
            <div className="h-px w-8" style={{ background: COLOR }} />
            <span
              className="font-mono text-xs uppercase tracking-widest"
              style={{ color: `${COLOR}80` }}
            >
              app mobile — experiencia del estudiante
            </span>
          </motion.div>

          {/* Fila 1 — 4 phones, escalonados */}
          <div className="flex gap-5 justify-center items-end mb-8">
            {MOBILE_IMAGES.slice(0, 4).map((img, i) => (
              <motion.div
                key={i}
                style={{ marginBottom: [0, 50, 25, 70][i] ?? 0 }}
              >
                <MobileFrame
                  src={img.src}
                  alt={img.alt}
                  color={COLOR}
                  delay={i * 0.08}
                />
              </motion.div>
            ))}
          </div>

          {/* Fila 2 — 4 phones más, con offset opuesto */}
          <div className="flex gap-5 justify-center items-start mt-12">
            {MOBILE_IMAGES.slice(4).map((img, i) => (
              <motion.div
                key={i}
                style={{ marginTop: [0, 45, 20, 60][i] ?? 0 }}
              >
                <MobileFrame
                  src={img.src}
                  alt={img.alt}
                  color={COLOR}
                  delay={0.4 + i * 0.08}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
