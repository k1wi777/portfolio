"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

interface UseStoryScrollOptions {
  /** Altura del contenedor en vh — da el "recorrido" de scroll (default: 180) */
  heightVh?: number;
  /** scrub suavidad — número más alto = más lag/suave (default: 1.2) */
  scrub?: number;
  /** y de salida en px (default: -70) */
  exitY?: number;
  /** en qué punto del scroll empieza la salida, 0-1 (default: 0.65) */
  exitStart?: number;
  /** animaciones de entrada personalizadas — recibe el contexto gsap */
  onEnter?: (ctx: gsap.Context, container: HTMLElement) => void;
}

/**
 * useStoryScroll
 *
 * Implementa el patrón "scroll storytelling":
 * - El contenedor es alto (heightVh) para dar recorrido al scroll
 * - El wrapper interno es sticky — se queda fijo en pantalla
 * - El contenido hace fade+slide out al avanzar el scroll
 * - Acepta un callback onEnter para animaciones de entrada personalizadas
 *
 * @returns containerRef  → va en el div alto externo
 * @returns stickyRef     → va en el div sticky interno
 * @returns contentRef    → va en el div del contenido animable
 *
 * @example
 * const { containerRef, stickyRef, contentRef } = useStoryScroll({ heightVh: 200 });
 *
 * return (
 *   <div ref={containerRef} style={{ height: "200vh" }}>
 *     <div ref={stickyRef} style={{ position: "sticky", top: 0 }} className="min-h-screen">
 *       <div ref={contentRef}>
 *         ... contenido ...
 *       </div>
 *     </div>
 *   </div>
 * );
 */
export function useStoryScroll({
  heightVh  = 180,
  scrub     = 1.2,
  exitY     = -70,
  exitStart = 0.65,
  onEnter,
}: UseStoryScrollOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef    = useRef<HTMLDivElement>(null);
  const contentRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const sticky    = stickyRef.current;
    const content   = contentRef.current;
    if (!container || !sticky || !content) return;

    const ctx = gsap.context(() => {

      // 1. Pin el sticky wrapper mientras dura el contenedor
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: `+=${heightVh - 100}%`,
        pin: sticky,
        anticipatePin: 1,
      });

      // 2. Salida del contenido ligada al scroll (scrub)
      gsap.to(content, {
        opacity: 0,
        y: exitY,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: container,
          start: `${exitStart * 100}% top`,
          end: "95% top",
          scrub,
        },
      });

      // 3. Animaciones de entrada personalizadas (opcionales)
      

    });

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { containerRef, stickyRef, contentRef };
}