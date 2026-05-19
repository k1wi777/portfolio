# 3D Interactive Portfolio

Un portafolio inmersivo y altamente interactivo construido con Next.js, Three.js y animaciones avanzadas de scroll. Diseñado con una arquitectura de tipo "storytelling", donde el fondo 3D reacciona de manera dinámica a medida que navegas por las diferentes secciones.

## 🚀 Tecnologías Principales

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Renderizado 3D:** [Three.js](https://threejs.org/) / [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/) / [@react-three/drei](https://github.com/pmndrs/drei)
- **Animaciones:** [GSAP](https://gsap.com/) y [Framer Motion](https://www.framer.com/motion/)
- **Scroll Suave:** [Lenis](https://lenis.darkroom.engineering/)
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/)

## ✨ Características

- **Fondo 3D Global:** Una escena 3D fija detrás del contenido que reacciona de forma dinámica al porcentaje de desplazamiento de la página.
- **Partículas Interactivas:** Efecto visual de partículas en el lienzo que sigue el movimiento del mouse.
- **Scroll Storytelling:** Arquitectura donde cada sección (Hero, About, Projects, Experience, Education, Contact) actúa como un plano a lo largo de un scroll expansivo (150-200vh) revelando el contenido de forma fluida y sincronizada con el modelo 3D.
- **Optimización y Rendimiento:** Impulsado por React 19 y Next.js moderno, aprovechando las últimas capacidades del App Router.

## 🛠️ Instalación y Configuración

Sigue estos pasos para levantar el entorno de desarrollo local:

1. Clona el repositorio.
2. Asegúrate de tener las dependencias usando tu gestor de paquetes favorito (recomendado **pnpm** ya que hay un `pnpm-workspace.yaml`):

```bash
pnpm install
```

3. Inicia el servidor de desarrollo:

```bash
pnpm dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en el navegador para ver el resultado.

## 📁 Estructura Principal

- `src/app/` - Contiene la estructura base de las rutas (App Router) de Next.js, como `page.tsx`.
- `src/components/layout/` - Componentes globales estructurales (ej. `Navbar.tsx`, `SceneBackground.tsx`).
- `src/components/sections/` - Componentes específicos de cada vista del portafolio (Hero, Experience, Projects, etc.).
- `src/hooks/` - Custom hooks encargados de manejar la lógica de scroll y animaciones.
- `src/lib/` - Funciones útiles y configuraciones base para animaciones (GSAP, Framer).
