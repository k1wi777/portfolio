"use client";

import { useEffect, useRef, MutableRefObject } from "react";
import { useInView, useAnimation } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar plugins GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── useScrollReveal ────────────────────────────────────────────────────────
/**
 * Retorna controles de Framer Motion que se activan cuando el elemento
 * entra al viewport. Ideal para animaciones de "fade up" en secciones.
 *
 * @example
 * const { ref, controls } = useScrollReveal();
 * <motion.div ref={ref} animate={controls} initial="hidden" variants={fadeUpVariants} />
 */
export function useScrollReveal(threshold = 0.2) {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true, amount: threshold });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return { ref, controls, isInView };
}

// ─── useParallax ─────────────────────────────────────────────────────────────
/**
 * Parallax con GSAP ScrollTrigger.
 * El elemento se mueve a una velocidad diferente al scroll.
 *
 * @param speed - Factor de velocidad. 0.5 = mitad del scroll, -0.3 = dirección opuesta
 *
 * @example
 * const ref = useParallax(0.4);
 * <div ref={ref} />
 */
export function useParallax<T extends HTMLElement>(
  speed: number = 0.4
): MutableRefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: () => speed * ScrollTrigger.maxScroll(window),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return ref;
}

// ─── useTextReveal ──────────────────────────────────────────────────────────
/**
 * Anima texto letra por letra o palabra por palabra cuando entra al viewport.
 * Efecto "scramble" tipo terminal o reveal suave.
 *
 * @param splitBy - "chars" para letra a letra, "words" para palabra a palabra
 */
export function useTextReveal(splitBy: "chars" | "words" = "words") {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const text = el.textContent || "";
    const items =
      splitBy === "chars"
        ? text.split("")
        : text.split(" ").map((w) => w + " ");

    // Crear spans por cada unidad
    el.innerHTML = items
      .map(
        (item, i) =>
          `<span class="reveal-item" style="display:inline-block; opacity:0; transform:translateY(30px);">${
            item === " " ? "&nbsp;" : item
          }</span>`
      )
      .join("");

    const spans = el.querySelectorAll(".reveal-item");

    const ctx = gsap.context(() => {
      gsap.to(spans, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: splitBy === "chars" ? 0.03 : 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, [splitBy]);

  return ref;
}

// ─── useCountUp ──────────────────────────────────────────────────────────────
/**
 * Anima un número de 0 hasta el valor objetivo cuando entra al viewport.
 * Ideal para stats y métricas.
 *
 * @example
 * const ref = useCountUp(42);
 * <span ref={ref} />  →  animará de 0 a 42
 */
export function useCountUp(
  target: number,
  duration: number = 2,
  suffix: string = ""
): MutableRefObject<HTMLElement | null> {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const counter = { value: 0 };

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        value: target,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          once: true,
        },
        onUpdate: () => {
          el.textContent = Math.round(counter.value) + suffix;
        },
      });
    });

    return () => ctx.revert();
  }, [target, duration, suffix]);

  return ref;
}

// ─── useMagneticEffect ───────────────────────────────────────────────────────
/**
 * Efecto magnético en hover — el elemento se mueve ligeramente
 * hacia el cursor (usado típicamente en botones o iconos sociales).
 */
export function useMagneticEffect<T extends HTMLElement>(
  strength: number = 0.4
): MutableRefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(el, {
        x: deltaX,
        y: deltaY,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)",
      });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return ref;
}
