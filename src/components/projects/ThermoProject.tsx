"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ProjectHero, ProjectInfo, TechCarousel } from "./shared";

const COLOR = "#30d158";

const TECH = ["Java", "Swing", "POO", "Physics Simulation", "Algorithms"];

// 4 imágenes — formato horizontal tipo "feature showcase"
const IMAGES = [
  {
    src: "https://picsum.photos/seed/therm1/900/600",
    alt: "Simulador — vista general",
    label: "Vista general",
  },
  {
    src: "https://picsum.photos/seed/therm2/900/600",
    alt: "Gráfica PV",
    label: "Diagrama P-V",
  },
  {
    src: "https://picsum.photos/seed/therm3/900/600",
    alt: "Partículas en movimiento",
    label: "Partículas",
  },
  {
    src: "https://picsum.photos/seed/therm4/900/600",
    alt: "Panel de control",
    label: "Controles",
  },
];

// Stats del simulador
const STATS = [
  { value: "3", label: "Procesos\nTermodinámicos" },
  { value: "N→∞", label: "Partículas\nsimuladas" },
    { value: "Swing", label: "Render\nGráfico" },
  { value: "Java", label: "Motor de\nSimulación" },
];

export function ThermoProject() {
  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"],
  });

  // Las 4 imágenes entran desde ángulos diferentes
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div id="project-thermo">
      <ProjectHero
        number="04"
        title={"Thermodynamic\nSimulator"}
        category="Desktop · Java"
        tagline="Física en movimiento, en tiempo real."
        description="Simulador termodinámico interactivo desarrollado para representar visualmente el comportamiento de partículas y variables físicas mediante procesos dinámicos en tiempo real basados en las leyes de los gases ideales."
        color={COLOR}
        url="#"
        repo="#"
      />

      <ProjectInfo
        color={COLOR}
        what="Crear una simulación visual capaz de modelar el comportamiento de un gas bajo diferentes procesos termodinámicos utilizando principios físicos reales."
         how="Construí un motor de simulación en Java utilizando Swing para la interfaz gráfica y algoritmos basados en ecuaciones termodinámicas para calcular distinas variables y movimiento de partículas en tiempo real. Implementé renderizado dinámico frame a frame, control de procesos isotérmicos, adiabáticos e isocóricos, además de representación visual de colisiones y cambios energéticos."
        result="El resultado fue un simulador termodinámico funcional con visualización científica en tiempo real, comportamiento dinámico de partículas y herramientas interactivas para explorar distintos escenarios físicos."
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

      {/* Stats — 4 números grandes */}
      <div className="container-apple py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {STATS.map(({ value, label }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl"
              style={{
                background: `${COLOR}08`,
                border: `1px solid ${COLOR}20`,
              }}
            >
              <p
                className="font-display font-extrabold mb-2"
                style={{ fontSize: "2.5rem", color: COLOR }}
              >
                {value}
              </p>
              <p className="font-mono text-xs text-text-muted leading-tight whitespace-pre-line">
                {label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 4 imágenes — layout especial: grande arriba izq + 3 abajo */}
        <div ref={gridRef} className="grid grid-cols-2 gap-4">
          {/* Imagen grande — col 1, span 1 row 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="row-span-2 rounded-3xl overflow-hidden"
            style={{
              y: y1,
              border: `1px solid ${COLOR}25`,
              boxShadow: `0 0 40px ${COLOR}10`,
              gridRow: "span 2",
            }}
          >
            <img
              src={IMAGES[0].src}
              alt={IMAGES[0].alt}
              className="w-full h-full object-cover"
              style={{ minHeight: "400px" }}
            />
            <div
              className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg font-mono text-xs"
              style={{
                background: `${COLOR}20`,
                color: COLOR,
                border: `1px solid ${COLOR}30`,
              }}
            >
              {IMAGES[0].label}
            </div>
          </motion.div>

          {/* Las otras 3 imágenes */}
          {IMAGES.slice(1).map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative rounded-2xl overflow-hidden"
              style={{ y: y2, border: `1px solid ${COLOR}20` }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full object-cover"
              />
              <div
                className="absolute bottom-3 left-3 px-3 py-1 rounded-lg font-mono text-xs"
                style={{
                  background: `${COLOR}20`,
                  color: COLOR,
                  border: `1px solid ${COLOR}30`,
                }}
              >
                {img.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
