"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { staggerContainer, fadeUp, fadeIn } from "@/lib/animations";

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";
const ROLES = [
  "Frontend Developer",
  "Mobile Developer",
  "Systems Engineer",
  "React & Next.js Developer",
  "UI-Focused Engineer",
];

function useTextScramble(words: string[], interval = 3200) {
  const [display, setDisplay] = useState(words[0]);
  const [isScrambling, setIsScrambling] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % words.length;
      const target = words[indexRef.current];
      setIsScrambling(true);
      let iteration = 0;
      const totalFrames = 18;

      const scramble = setInterval(() => {
        setDisplay(
          target
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (i < Math.floor((iteration / totalFrames) * target.length))
                return char;
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join(""),
        );
        iteration++;
        if (iteration >= totalFrames) {
          clearInterval(scramble);
          setDisplay(target);
          setIsScrambling(false);
        }
      }, 40);
    }, interval);

    return () => clearInterval(timer);
  }, [words, interval]);

  return { display, isScrambling };
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { display: roleText, isScrambling } = useTextScramble(ROLES);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.7], [0, -80]);
  const scrollIndicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.15],
    [1, 0],
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center "
    >
      <motion.div
        style={{ opacity, y }}
        className="container-apple w-full pt-24"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Badge */}
          <motion.div variants={fadeIn} className="mb-3">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                             glass border border-neon-cyan/20 text-neon-cyan
                             text-sm font-mono tracking-wider"
            >
              <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              Disponible para oportunidades frontend & mobile
            </span>
          </motion.div>

          {/* Título */}
          <motion.h1
            variants={fadeUp}
            className="font-display text-6xl md:text-8xl font-extrabold leading-[0.95] mb-2"
          >
            <span className="text-text-primary block">Hola, soy</span>
            <span className="text-gradient-neon block mt-1">José Padilla</span>
          </motion.h1>

          {/* Scramble */}
          <motion.div variants={fadeUp} className=" h-10 flex items-center">
            <span
              className={`font-mono text-xl md:text-2xl transition-colors duration-200 ${
                isScrambling ? "text-neon-cyan/60" : "text-neon-cyan"
              }`}
            >
              {roleText}
              <span className="animate-pulse ml-0.5">_</span>
            </span>
          </motion.div>

          {/* Descripción */}
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-text-secondary font-light mb-2 max-w-2xl leading-relaxed"
          >
            Cronstruyo{" "}
            <span className="text-text-primary font-medium">
             experiencias web y móviles modernas{" "}
            </span>
             enfocadas en{" "}
             <span className="text-text-primary font-medium">
             interacción,rendimiento y experiencias{" "}
            </span>
            de usuario memorables.
          </motion.p>

          {/* Pills */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-6">
            {["React", "Next.js", "TypeScript", "React Native", "TailwindCSS"].map(
              (tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg glass text-sm font-mono text-text-secondary
                           border border-white/5 hover:border-neon-cyan/30 hover:text-neon-cyan
                           transition-all duration-200 cursor-default"
                >
                  {tech}
                </span>
              ),
            )}
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-4"
          >
            <motion.a
              href="#projects"
              className="group relative px-8 py-4 rounded-2xl font-semibold
                         bg-neon-cyan text-bg-primary overflow-hidden
                         transition-all duration-300 hover:shadow-neon-cyan hover:scale-[1.02]"
              whileTap={{ scale: 0.97 }}
            >
              <span
                className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%]
                               bg-gradient-to-r from-transparent via-white/20 to-transparent
                               transition-transform duration-700"
              />
              <span className="relative">Ver proyectos</span>
            </motion.a>

            <motion.a
              href="#contact"
              className="px-8 py-4 rounded-2xl font-semibold text-text-primary
                         glass border border-white/10 hover:border-neon-cyan/30
                         hover:bg-neon-cyan/5 transition-all duration-300"
              whileTap={{ scale: 0.97 }}
            >
              Hablemos
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-text-muted text-xs font-mono tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-0.5 h-8 bg-gradient-to-b from-neon-cyan/50 to-transparent rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
