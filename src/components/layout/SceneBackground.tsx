"use client";

import { useRef, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useScroll, useSpring } from "framer-motion";

// ─── Tipos ────────────────────────────────────────────────────────────────────
interface DistortMaterial extends THREE.Material {
  distort: number;
  color: THREE.Color;
}

interface Velocity {
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

// ─── Constantes (fuera del componente para evitar recalcular en cada render) ──
const PARTICLE_COUNT = 80;
const particlePositions = new Float32Array(PARTICLE_COUNT * 3);

const initialVelocities: Velocity[] = Array.from(
  { length: PARTICLE_COUNT },
  () => ({
    vx: (Math.random() - 0.5) * 0.04,
    vy: (Math.random() - 0.5) * 0.04 + 0.01,
    life: Math.floor(Math.random() * 60),
    maxLife: 40 + Math.random() * 40,
  })
);

// ─── Partículas del mouse ─────────────────────────────────────────────────────
function MouseParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });

  //  inicializador fuera del componente, sin Math.random() en render
  const velocities = useRef<Velocity[]>(initialVelocities);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 10;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 6;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const v = velocities.current[i];
      v.life++;
      if (v.life > v.maxLife) {
        pos[i * 3] = mouse.current.x + (Math.random() - 0.5) * 1.5;
        pos[i * 3 + 1] = mouse.current.y + (Math.random() - 0.5) * 1.5;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 2;
        v.vx = (Math.random() - 0.5) * 0.04;
        v.vy = (Math.random() - 0.5) * 0.04 + 0.005;
        v.life = 0;
        v.maxLife = 40 + Math.random() * 60;
      } else {
        pos[i * 3] += v.vx;
        pos[i * 3 + 1] += v.vy;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlePositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#7a55be"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ─── Esfera que reacciona al scroll global ────────────────────────────────────
function ScrollSphere({
  scrollProgress,
  isMobile,
}: {
  scrollProgress: number;
  isMobile: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const lerpMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const sp = scrollProgress; // 0 → 1

    lerpMouse.current.x += (mouse.current.x - lerpMouse.current.x) * 0.04;
    lerpMouse.current.y += (mouse.current.y - lerpMouse.current.y) * 0.04;

    if (!groupRef.current || !meshRef.current) return;

    // ── Posición del grupo según scroll ──
    const xRange = isMobile ? 1.2 : 3;
    const x = Math.sin(sp * Math.PI * 1.5) * xRange;
    const y = Math.cos(sp * Math.PI) * (isMobile ? 1 : 1.5);
    groupRef.current.position.x = x + lerpMouse.current.x * 0.3;
    groupRef.current.position.y = y + lerpMouse.current.y * 0.3;

    // Escala: crece hasta 50% del scroll, luego baja
    const scale = 0.8 + Math.sin(sp * Math.PI) * 0.6;
    groupRef.current.scale.setScalar(scale);

    // Rotación lenta de todo el grupo
    groupRef.current.rotation.y = t * 0.08;

    // Rotación de la esfera + mouse
    meshRef.current.rotation.x = t * 0.12 + lerpMouse.current.y * 0.4;
    meshRef.current.rotation.y = t * 0.18 + lerpMouse.current.x * 0.4;

    // cast tipado en lugar de `as any`
    const mat = meshRef.current.material as DistortMaterial;

    // Distorsión: baja al inicio, sube a mitad, baja al final
    if (mat?.distort !== undefined) {
      mat.distort = 0.3 + Math.sin(sp * Math.PI) * 0.6;
    }

    // Color dinámico según scroll: cyan (185°) → purple (280°)
    if (mat?.color) {
      const h = 185 + sp * 95;
      mat.color.setHSL(h / 360, 1, 0.55);
    }

    // Anillos
    if (ring1.current) {
      ring1.current.rotation.z = t * 0.5 + sp * Math.PI * 2;
      ring1.current.rotation.x = sp * Math.PI;
    }
    if (ring2.current) {
      ring2.current.rotation.x = t * 0.3 + sp * Math.PI;
      ring2.current.rotation.y = t * 0.2;
    }
    if (ring3.current) {
      ring3.current.rotation.z = -t * 0.4 + sp * Math.PI * 1.5;
      ring3.current.scale.setScalar(1 + sp * 0.5);
    }
  });

  const baseX = isMobile ? 0 : 2.5;
  const baseY = isMobile ? -0.3 : 0;

  return (
    <group ref={groupRef} position={[baseX, baseY, 0]}>
      {/* Esfera principal */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.8, 128, 128]} />
        <MeshDistortMaterial
          color="#00f5ff"
          distort={0.35}
          speed={2}
          roughness={0.05}
          metalness={0.95}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Anillo 1 — cyan */}
      <mesh ref={ring1} rotation={[Math.PI / 2.5, 0.3, 0]}>
        <torusGeometry args={[2.5, 0.018, 16, 100]} />
        <meshBasicMaterial color="#0080ff" transparent opacity={0.45} />
      </mesh>

      {/* Anillo 2 — purple */}
      <mesh ref={ring2} rotation={[Math.PI / 3.5, 1.0, 0]}>
        <torusGeometry args={[2.9, 0.012, 16, 100]} />
        <meshBasicMaterial color="#7a55be" transparent opacity={0.3} />
      </mesh>

      {/* Anillo 3 — más externo */}
      <mesh ref={ring3} rotation={[0.5, 0.5, 0]}>
        <torusGeometry args={[3.4, 0.008, 16, 100]} />
        <meshBasicMaterial color="#00f5ff" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

// ─── Escena completa ──────────────────────────────────────────────────────────
function Scene({
  scrollProgress,
  isMobile,
}: {
  scrollProgress: number;
  isMobile: boolean;
}) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={2.5} color="#00f5ff" />
      <pointLight position={[-8, -5, -8]} intensity={1.5} color="#bf5af2" />
      <pointLight position={[0, -10, 5]} intensity={0.8} color="#0080ff" />
      <Stars
        radius={100}
        depth={60}
        count={isMobile ? 2000 : 4000}
        factor={3}
        saturation={0.3}
        fade
        speed={0.3}
      />
      <ScrollSphere scrollProgress={scrollProgress} isMobile={isMobile} />
      {!isMobile && <MouseParticles />}
    </>
  );
}

// ─── Componente exportable ────────────────────────────────────────────────────
export function SceneBackground() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 25,
  });
  const [scrollVal, setScrollVal] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    return smoothProgress.on("change", (v) => setScrollVal(v));
  }, [smoothProgress]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ width: "100%", maxWidth: "100vw" }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: isMobile ? 55 : 50 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{ antialias: !isMobile, alpha: true }}
        style={{
          background: "transparent",
          width: "100%",
          height: "100%",
          maxWidth: "100%",
          display: "block",
        }}
      >
        <Suspense fallback={null}>
          <Scene scrollProgress={scrollVal} isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}