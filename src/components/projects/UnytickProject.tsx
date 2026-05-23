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
  "Zustand",
  "Node.js",
];

const WEB_IMAGES = [
  { src: "https://picsum.photos/seed/uny1/800/600", alt: "Unytick dashboard" },
  { src: "https://picsum.photos/seed/uny2/800/900", alt: "Unytick tickets" },
  { src: "https://picsum.photos/seed/uny3/800/650", alt: "Unytick validación" },
  { src: "https://picsum.photos/seed/uny4/800/800", alt: "Unytick reportes" },
  { src: "https://picsum.photos/seed/uny5/800/700", alt: "Unytick usuarios" },
  {
    src: "https://picsum.photos/seed/uny6/800/600",
    alt: "Unytick panel admin",
  },
  { src: "https://picsum.photos/seed/uny7/800/750", alt: "Unytick historial" },
  {
    src: "https://picsum.photos/seed/uny8/800/650",
    alt: "Unytick estadísticas",
  },
  {
    src: "https://picsum.photos/seed/uny9/800/900",
    alt: "Unytick estadísticas",
  },
];

const MOBILE_IMAGES = [
  { src: "https://picsum.photos/seed/unym1/400/860", alt: "Unytick app home" },
  {
    src: "https://picsum.photos/seed/unym2/400/860",
    alt: "Unytick app mis tickets",
  },
  {
    src: "https://picsum.photos/seed/unym3/400/860",
    alt: "Unytick app scanner QR",
  },
  {
    src: "https://picsum.photos/seed/unym4/400/860",
    alt: "Unytick app perfil",
  },
  {
    src: "https://picsum.photos/seed/unym5/400/860",
    alt: "Unytick app historial",
  },
  {
    src: "https://picsum.photos/seed/unym6/400/860",
    alt: "Unytick app notificaciones",
  },
  {
    src: "https://picsum.photos/seed/unym7/400/860",
    alt: "Unytick app recarga",
  },
  { src: "https://picsum.photos/seed/unym8/400/860", alt: "Unytick app login" },
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
        className="relative w-full "
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
          description="Plataforma digital completa para validación de tickets de transporte universitario. App mobile para estudiantes + panel web de administración con autenticación JWT."
          color={COLOR}
          url="https://unytick.vercel.app"
          repo="https://github.com/Unytick-app/Unytick-app-web"
        />
      </motion.div>

      {/* Info */}
      <ProjectInfo
        color={COLOR}
        what="Digitalizar el proceso de gestión y validación de tickets universitarios, eliminando el papel y los tiempos de espera para estudiantes y operarios del transporte."
        how="Arquitectura dual: app React Native + Expo para estudiantes con scanner QR, y panel Next.js para administradores. JWT compartido entre ambas plataformas."
        result="Sistema completo de compra, validación y reporte. Flujo de autenticación seguro, escaneo QR en tiempo real y dashboard con métricas de uso."
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
