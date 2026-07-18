# 💫 Dedicatoria 3D — Un universo para una amiga especial

Experiencia web 3D inmersiva construida con **Next.js 14 (App Router)**,
**React Three Fiber (Three.js)**, **drei**, **postprocessing** y
**Framer Motion**. Ambientada en el espacio: un agujero negro con anillo de
acreción rosa/rojo, un corazón de miles de partículas flotando encima,
corazones 3D orbitando, miles de estrellas y 20 mensajes flotantes con
frases de cariño.

## 🚀 Instalación

Requiere Node.js 18.18 o superior.

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) — verás la pantalla de
entrada; al hacer click en **"Entrar al universo"** se monta la experiencia
3D (el Canvas se carga de forma diferida para que la primera pantalla sea
instantánea).

## 🎮 Controles

- **Arrastrar (click + mover)**: rotar la cámara libremente alrededor del
  agujero negro.
- **Scroll / pellizcar**: acercar o alejar (zoom suave, con límites).
- El mouse también genera un ligero *parallax* en las estrellas y partículas
  de fondo.

## 🗂 Estructura

```
app/
  layout.tsx        → fuentes (Playfair Display + Inter) y metadata
  page.tsx           → pantalla de entrada (Framer Motion) + montaje del Canvas
  globals.css         → estilos globales y de overlay
components/
  Experience.tsx      → Canvas, cámara, luces, OrbitControls y postproceso (Bloom)
  BlackHole.tsx        → esfera negra + disco de acreción rosa/rojo giratorio
  HeartParticles.tsx   → corazón de ~6000 partículas flotando sobre el agujero negro
  StarField.tsx        → miles de estrellas + partículas reactivas al mouse
  OrbitingHearts.tsx   → corazones 3D pequeños orbitando
  FloatingMessages.tsx → 20 mensajes de texto distribuidos en el espacio 3D
```

## 🎨 Personalizar

- **Frases**: edita el array `MESSAGES` en `components/FloatingMessages.tsx`.
- **Título de entrada / subtítulo**: en `app/page.tsx`, dentro del bloque
  `.intro`.
- **Colores**: la paleta principal (`--pink`, `--rose`, `--red`, `--lavender`)
  está en `app/globals.css`; los colores 3D están en `PALETTE` (mensajes),
  `palette` (corazones orbitantes) y los `colorStop` del disco de acreción en
  `BlackHole.tsx`.
- **Cantidad de estrellas / partículas**: ajusta los `count` en
  `StarField.tsx` y `HeartParticles.tsx` según el rendimiento del dispositivo
  objetivo.

## 📦 Build de producción

```bash
npm run build
npm run start
```

También se puede desplegar directamente en [Vercel](https://vercel.com).

## ⚙️ Notas de rendimiento

- `dpr` del Canvas está limitado a `[1, 1.8]` para mantener fluidez en
  pantallas de alta densidad.
- El Bloom usa `mipmapBlur` para un resplandor de bajo costo.
- Si el proyecto se usa en equipos modestos, baja `count` en `Sparkles` y
  `Stars`, y el número de partículas del corazón (`COUNT` en
  `HeartParticles.tsx`).
