"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// ─── Tech icon map — devicons CDN ─────────────────────────────────────────────
const TECH_ICONS: Record<string, string> = {
  React:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "React Native":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Next.js":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  TypeScript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  JavaScript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Tailwind CSS":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  TailwindCSS:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  GSAP: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gsap/gsap-original.svg",
  "Framer Motion":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg",
  "Node.js":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  Firebase:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  Git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  Figma:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  Java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  Vite: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
  Expo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/expo/expo-original.svg",
  Zustand:
    "https://raw.githubusercontent.com/pmndrs/zustand/main/examples/demo/public/icon.png",
  JWT: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jsonwebtokens/jsonwebtokens-original.svg",
  "REST APIs":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  PokéAPI:
    "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png",
  "Three.js":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg",
  "React Three Fiber":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "SCSS/Sass":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
  Swing:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  Vercel: "https://cdn.worldvectorlogo.com/logos/vercel.svg",
};

// ─── Tech Carousel con iconos ─────────────────────────────────────────────────
export function TechCarousel({
  techs,
  color,
}: {
  techs: string[];
  color: string;
}) {
  const items = [...techs, ...techs, ...techs];

  return (
    <div
      className="relative overflow-hidden py-5"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <motion.div
        className="flex gap-4 w-max"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {items.map((tech, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl flex-shrink-0"
            style={{
              background: `${color}0d`,
              border: `1px solid ${color}25`,
            }}
          >
            {TECH_ICONS[tech] && (
              <img
                src={TECH_ICONS[tech]}
                alt={tech}
                width={18}
                height={18}
                className="object-contain flex-shrink-0"
                style={{ filter: "drop-shadow(0 0 4px rgba(255,255,255,0.1))" }}
              />
            )}
            <span
              className="text-sm font-mono whitespace-nowrap"
              style={{ color: `${color}cc` }}
            >
              {tech}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

const GridCol = ({
  refs,
  imgs,
  offset = false,
  color,
}: {
  refs: React.RefObject<HTMLDivElement | null>;
  imgs: { src: string; alt: string }[];
  offset?: boolean;
  color: string;
}) => (
  <div ref={refs} className={`flex flex-col gap-3 ${offset ? "mt-10" : ""}`}>
    {imgs.map((img, i) => (
      <div
        key={i}
        className="rounded-2xl overflow-hidden relative group "
        style={{ border: `1px solid ${color}20` }}
      >
        <img
          src={img.src}
          alt={img.alt}
          className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(to top, ${color}30, transparent)`,
          }}
        />
      </div>
    ))}
  </div>
);

export function ParallaxGrid({
  images,
  color,
}: {
  images: { src: string; alt: string }[];
  color: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);

  const col1 = images.filter((_, i) => i % 3 === 0);
  const col2 = images.filter((_, i) => i % 3 === 1);
  const col3 = images.filter((_, i) => i % 3 === 2);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const sticky = stickyRef.current;
    const c1 = col1Ref.current;
    const c2 = col2Ref.current;
    const c3 = col3Ref.current;
    if (!wrapper || !sticky || !c1 || !c2 || !c3) return;

    let ctx: gsap.Context | null = null;

    const init = () => {
      // Limpiar cualquier ScrollTrigger previo de este wrapper
      ScrollTrigger.getAll()
        .filter((st) => st.vars.trigger === wrapper)
        .forEach((st) => st.kill());

      if (ctx) ctx.revert();

      const viewH = sticky.offsetHeight;
      const overflow1 = Math.max(0, c1.offsetHeight - viewH);
      const overflow2 = Math.max(0, c2.offsetHeight - viewH);
      const overflow3 = Math.max(0, c3.offsetHeight - viewH);
      const maxOverflow = Math.max(overflow1, overflow2, overflow3);

      wrapper.style.height = `${viewH + maxOverflow}px`;

      ctx = gsap.context(() => {
        const triggerConfig = {
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        };

        if (overflow1 > 0)
          gsap.fromTo(
            c1,
            { y: 0 },
            { y: -overflow1, ease: "none", scrollTrigger: triggerConfig },
          );
        if (overflow2 > 0)
          gsap.fromTo(
            c2,
            { y: -overflow2 }, // empieza arriba (imágenes del final visibles)
            { y: 0, ease: "none", scrollTrigger: { ...triggerConfig } },
          );
        if (overflow3 > 0)
          gsap.fromTo(
            c3,
            { y: 0 },
            {
              y: -overflow3,
              ease: "none",
              scrollTrigger: { ...triggerConfig },
            },
          );
      });

      ScrollTrigger.refresh();
    };

    // Esperar imágenes y luego un frame extra para que el layout esté estable
    const imgs = [...wrapper.querySelectorAll<HTMLImageElement>("img")];
    const loads = imgs.map((img) =>
      img.complete
        ? Promise.resolve()
        : new Promise<void>((r) => {
            img.onload = () => r();
            img.onerror = () => r();
          }),
    );

    Promise.all(loads).then(() => {
      // requestAnimationFrame doble para asegurar que el DOM pintó
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          init();
        });
      });
    });

    // Agregar resize listener
    const onResize = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          init();
        });
      });
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx?.revert();
      ScrollTrigger.getAll()
        .filter((st) => st.vars.trigger === wrapper)
        .forEach((st) => st.kill());
    };
  }, []);

  return (
    <div ref={wrapperRef} style={{ position: "relative", minHeight: "100vh" }}>
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: "60px", // espacio para el navbar
          height: "calc(100vh - 30px - 40px)", // navbar arriba + margen abajo
          overflow: "hidden",
          display: "flex",
          alignItems: "flex-start",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          boxSizing: "border-box",
          // Máscaras de degradado arriba y abajo
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 w-full">
          <GridCol refs={col1Ref} imgs={col1} color={color} />
          <GridCol refs={col2Ref} imgs={col2} offset color={color} />
          <GridCol refs={col3Ref} imgs={col3} color={color} />
        </div>
      </div>
    </div>
  );
}
// ─── Project Hero header ──────────────────────────────────────────────────────
export function ProjectHero({
  number,
  title,
  tagline,
  description,
  color,
  category,
  url,
  repo,
}: {
  number: string;
  title: string;
  tagline: string;
  description: string;
  color: string;
  category: string;
  url?: string;
  repo?: string;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center relative overflow-hidden py-32 backdrop-blur-xs">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 20% 50%, ${color}07, transparent)`,
        }}
      />
      <div className="container-apple relative z-10">
        {/* Número + categoría */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-8"
        >
          <span
            className="font-mono text-xs tracking-widest uppercase"
            style={{ color: `${color}70` }}
          >
            {number}
          </span>
          <div className="h-px w-12" style={{ background: `${color}40` }} />
          <span
            className="font-mono text-xs tracking-widest uppercase"
            style={{ color: `${color}70` }}
          >
            {category}
          </span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-extrabold leading-none mb-5 whitespace-pre-line"
              style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)", color }}
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl font-light mb-5"
              style={{ color: `${color}bb` }}
            >
              {tagline}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-text-secondary text-base leading-relaxed mb-8 max-w-md"
            >
              {description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex gap-3 flex-wrap"
            >
              {url && url !== "#" && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.03]"
                  style={{ background: color, color: "#080810" }}
                >
                  Ver proyecto
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </a>
              )}
              {repo && repo !== "#" && (
                <a
                  href={repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.03]"
                  style={{
                    border: `1px solid ${color}40`,
                    color,
                    background: `${color}10`,
                  }}
                >
                  GitHub →
                </a>
              )}
            </motion.div>
          </div>

          {/* Número decorativo grande */}
          <div className="hidden md:flex items-center justify-end">
            <span
              className="font-display font-extrabold select-none leading-none"
              style={{ fontSize: "18rem", color: `${color}05` }}
            >
              {number}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── What / How / Result ──────────────────────────────────────────────────────
export function ProjectInfo({
  what,
  how,
  result,
  color,
}: {
  what: string;
  how: string;
  result: string;
  color: string;
}) {
  return (
    <div className="container-apple py-16">
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { label: "El reto", text: what },
          { label: "El enfoque", text: how },
          { label: "El resultado", text: result },
        ].map(({ label, text }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-1 h-5 rounded-full"
                style={{ background: color }}
              />
              <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
                {label}
              </span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              {text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Divider entre proyectos ──────────────────────────────────────────────────
export function ProjectDivider({ color }: { color: string }) {
  return (
    <div className="relative h-px mx-auto" style={{ maxWidth: "70%" }}>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
        className="h-full origin-left"
        style={{
          background: `linear-gradient(90deg, ${color}50, transparent)`,
        }}
      />
    </div>
  );
}

// ─── Mobile mockup frame ──────────────────────────────────────────────────────
export function MobileFrame({
  src,
  alt,
  color,
  delay = 0,
}: {
  src: string;
  alt: string;
  color: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
      className="relative"
      style={{ width: "180px" }}
    >
      <div
        className="rounded-[1.2rem] overflow-hidden relative"
        style={{
          border: `2px solid ${color}35`,
          boxShadow: `0 0 40px ${color}18, 0 30px 80px rgba(0,0,0,0.6)`,
        }}
      >
        <img src={src} alt={alt} className="w-full block" />
      </div>
      {/* Reflejo */}
      <div
        className="absolute -bottom-6 left-6 right-6 h-6 blur-xl opacity-25"
        style={{ background: color, borderRadius: "50%" }}
      />
    </motion.div>
  );
}
