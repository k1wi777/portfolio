import { Variants } from "framer-motion";

// ─── Fade Variants ──────────────────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const fadeDown: Variants = {
  hidden:  { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const fadeLeft: Variants = {
  hidden:  { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const fadeRight: Variants = {
  hidden:  { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─── Scale Variants ─────────────────────────────────────────────────────────
export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }, // spring-like
  },
};

export const scaleInSmooth: Variants = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─── Stagger Container ──────────────────────────────────────────────────────
/**
 * Usar en el padre para hacer stagger de los hijos.
 * Los hijos deben usar una de las variantes de arriba.
 *
 * @example
 * <motion.ul variants={staggerContainer} initial="hidden" animate="visible">
 *   <motion.li variants={fadeUp}>Item 1</motion.li>
 *   <motion.li variants={fadeUp}>Item 2</motion.li>
 * </motion.ul>
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

// ─── Slide Variants ─────────────────────────────────────────────────────────
export const slideUp: Variants = {
  hidden:  { y: "100%" },
  visible: {
    y: "0%",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
};

// ─── Card Hover ─────────────────────────────────────────────────────────────
export const cardHover = {
  initial: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -6,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─── Button Variants ─────────────────────────────────────────────────────────
export const buttonTap = {
  tap: {
    scale: 0.96,
    transition: { duration: 0.1 },
  },
};

// ─── Page Transition ─────────────────────────────────────────────────────────
export const pageTransition: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

// ─── Navbar ──────────────────────────────────────────────────────────────────
export const navbarVariants: Variants = {
  hidden:  { y: -80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 },
  },
};

// ─── Draw (para SVG paths) ───────────────────────────────────────────────────
export const drawPath: Variants = {
  hidden:  { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.5, ease: "easeInOut" }, opacity: { duration: 0.3 } },
  },
};
