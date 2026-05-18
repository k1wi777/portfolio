import { Navbar } from "@/components/layout/Navbar";
import { SceneBackground } from "@/components/layout/SceneBackground";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main>
      {/* Fondo 3D global — fixed detrás de todo */}
      <SceneBackground />

      {/* Gradientes decorativos */}
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,128,255,0.10), transparent),
            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(191,90,242,0.05), transparent)
          `,
        }}
      />
      <div className="fixed inset-0 bg-grid pointer-events-none z-[1]" />

      {/* Navbar */}
      <Navbar />

      {/*
        Arquitectura storytelling:
        - Cada sección es un "slide" que ocupa 150-200vh de scroll
        - El contenido interno es sticky y se revela/oculta con ScrollTrigger
        - La esfera de fondo reacciona a todo ese scroll
      */}
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </div>
    </main>
  );
}