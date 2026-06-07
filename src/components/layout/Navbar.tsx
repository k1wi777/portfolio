"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navbarVariants } from "@/lib/animations";

const navLinks = [
  { href: "#about", label: "Sobre mí" },
  { href: "#experience", label: "Experiencia" },
  { href: "#projects", label: "Proyectos" },
  { href: "#education", label: "Estudios" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection("#" + entry.target.id);
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -60% 0px" },
    );
    document
      .querySelectorAll("section[id]")
      .forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        className="fixed top-0 left-0 right-0 z-50 w-full max-w-full overflow-x-clip"
      >
        {/* Pill navbar — flota centrada en la parte superior */}
        <div className="container-apple pt-2 max-w-full">
          <div
            className={`
              flex items-center justify-between gap-2
              min-w-0 max-w-full overflow-hidden
              px-3 sm:px-4 py-1 rounded-2xl
              transition-all duration-500
              ${
                isScrolled
                  ? "bg-[rgba(8,8,16,0.75)] backdrop-blur-2xl border border-white/8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] "
                  : "bg-transparent border border-transparent"
              }
            `}
          >
            {/* Logo */}
            <motion.a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1 select-none min-w-0 shrink"
            >
              <span
                className="font-display font-bold text-sm sm:text-xl truncate"
                style={{
                  background: "linear-gradient(135deg, #00f5ff, #0080ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                <span className="hidden min-[400px]:inline">JOSÉ PADILLA</span>
                <span className="min-[400px]:hidden">J. PADILLA</span>
              </span>
              <span className="text-[#52525b] font-mono text-xs shrink-0">.dev</span>
            </motion.a>

            {/* Links — Desktop */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <motion.button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="relative px-4 py-2 text-sm font-medium rounded-xl
                               transition-colors duration-200 cursor-pointer"
                    style={{
                      color: isActive ? "#00f5ff" : "#a1a1aa",
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onHoverStart={(e) => {
                      if (!isActive)
                        (e.target as HTMLElement).style.color = "#f5f5f7";
                    }}
                    onHoverEnd={(e) => {
                      if (!isActive)
                        (e.target as HTMLElement).style.color = "#a1a1aa";
                    }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: "rgba(0,245,255,0.08)",
                          border: "1px solid rgba(0,245,255,0.2)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </motion.button>
                );
              })}
            </nav>

            {/* CTA */}
            <div className="hidden md:block">
              <motion.button
                onClick={() => handleNavClick("#contact")}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="relative px-4 py-1 rounded-xl text-sm font-semibold overflow-hidden group"
                style={{
                  background: "rgba(0,245,255,0.1)",
                  border: "1px solid rgba(0,245,255,0.35)",
                  color: "#00f5ff",
                }}
              >
                {/* Shimmer */}
                <span
                  className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%]
                             bg-gradient-to-r from-transparent via-white/10 to-transparent
                             transition-transform duration-600"
                />
                <span className="relative z-10">Contáctame</span>
              </motion.button>
            </div>

            {/* Hamburger — Mobile */}
            <motion.button
              className="md:hidden flex flex-col justify-center gap-[5px] p-2 rounded-lg shrink-0"
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label="Menú"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block h-[2px] w-5 rounded-full bg-[#a1a1aa] origin-center"
                  animate={
                    mobileOpen
                      ? i === 0
                        ? { rotate: 45, y: 7 }
                        : i === 1
                          ? { opacity: 0, scaleX: 0 }
                          : { rotate: -45, y: -7 }
                      : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
                  }
                  transition={{ duration: 0.25 }}
                />
              ))}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu — overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 left-4 right-4 z-40 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(8,8,16,0.92)",
              backdropFilter: "blur(40px)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            <nav className="flex flex-col p-3 gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-left px-4 py-3.5 rounded-xl text-sm font-medium
                             transition-colors duration-200"
                  style={{
                    color: activeSection === link.href ? "#00f5ff" : "#a1a1aa",
                    background:
                      activeSection === link.href
                        ? "rgba(0,245,255,0.06)"
                        : "transparent",
                  }}
                >
                  <span className="font-mono text-[10px] text-[#52525b] mr-2">
                    0{i + 1}.
                  </span>
                  {link.label}
                </motion.button>
              ))}

              <div className="mt-2 pt-3 border-t border-white/5 px-3 pb-1">
                <button
                  onClick={() => handleNavClick("#contact")}
                  className="w-full py-3 rounded-xl text-sm font-semibold"
                  style={{
                    background: "rgba(0,245,255,0.1)",
                    border: "1px solid rgba(0,245,255,0.3)",
                    color: "#00f5ff",
                  }}
                >
                  Contáctame
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
