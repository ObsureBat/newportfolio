# Ayush Sharma — Cinematic 3D WebGL Portfolio

A high-performance, cinematic 3D interactive portfolio site built with **Next.js (App Router)**, **React Three Fiber (R3F)**, **Three.js**, **GSAP ScrollTrigger**, **Lenis**, and custom **GLSL Shaders**.

---

## 🌟 Key Features

1. **Depth-Map Particle "Face Scan" Effect**:
   - Precomputed client-side/offline using monocular depth estimation (MiDaS/DPT model).
   - Custom `ShaderMaterial` rendering 40k–60k GPU particles displaced in 3D volume by depth.
   - Interactive mouse-tracking tilt, entrance assembly on load, and scroll-scrubbed 3D dispersal.
   - Recolored dynamically through a glowing luxury palette (Electric Blue, Violet, Magenta, Mint).

2. **Single Persistent Scene Architecture**:
   - One full-viewport `<Canvas>` fixed behind transparent DOM elements.
   - Zero remounting across section transitions.
   - Smooth continuous camera fly-through driven by normalized scroll progress (`0.0` to `1.0`).

3. **Cinematic Ambient Lightscape**:
   - Soft off-white base (`#FAFAF7`) with animated volumetric gradient mesh and glowing dust particles.
   - Post-processing pipeline with Bloom, Chromatic Aberration, and Depth of Field.

4. **3D Interactive Content Modules**:
   - Liquid noise displacement shader planes on featured project cards.
   - Floating 3D skill constellation tag nodes.
   - Full-bleed research spotlight with animated stat counters.
   - Custom magnetic hover buttons and morphing cursor ring.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **Python**: v3.10+ (for regenerating depth maps)

### Installation

```bash
# Install dependencies
npm install
```

### Running Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

---

## 📸 Swapping Portrait Photo & Depth Map Precomputing

To use a new portrait photo:

1. Place your new front-facing photo at `public/assets/face-photo.jpg` (or pass a path to the script).
2. Run the included Python precomputing script:

```bash
npm run generate-depth
```

Or run Python directly:

```bash
python scripts/generate_depth_map.py "path/to/your/photo.jpg" "public/assets/face-depth.png" "public/assets/face-photo.jpg"
```

The script uses HuggingFace Transformers and PyTorch (`Intel/dpt-hybrid-midas` model) to automatically infer monocular depth and export a 16-bit/8-bit grayscale depth texture (`public/assets/face-depth.png`).

---

## 🎨 Customizing Color Palette

The site's vibrant accent palette is defined in three places:

1. **Tailwind Theme** (`tailwind.config.ts`):
   ```ts
   accent: {
     blue: '#4D6BFF',
     violet: '#8A4FFF',
     magenta: '#FF4FD8',
     mint: '#3FE8B0',
   }
   ```
2. **Particle Face Scan Shader** (`src/components/canvas/FaceScanParticles.tsx`):
   ```ts
   uColor1: new THREE.Color('#4D6BFF'),
   uColor2: new THREE.Color('#8A4FFF'),
   uColor3: new THREE.Color('#FF4FD8'),
   uColor4: new THREE.Color('#3FE8B0'),
   ```
3. **Background Mesh Shader** (`src/lib/shaders/backgroundGradient.ts`):
   Edit `uColorBlue`, `uColorViolet`, `uColorMagenta`, and `uColorMint` uniforms.

---

## 🎥 Adjusting Camera Waypoints & Trajectory

Camera navigation across sections is managed by `src/components/canvas/CameraRig.tsx`.

Modify the `WAYPOINTS` array to adjust camera coordinates, target focus points (`look`), or FOV for any section:

```ts
const WAYPOINTS = [
  // Section 0: Hero
  { pos: new THREE.Vector3(0, 0, 5.8), look: new THREE.Vector3(0, 0, 0), fov: 45 },
  // Section 1: About
  { pos: new THREE.Vector3(2.8, -0.2, 7.5), look: new THREE.Vector3(-1.0, 0, 0), fov: 48 },
  // Section 2: Experience
  { pos: new THREE.Vector3(-2.2, -4.5, 7.0), look: new THREE.Vector3(1.2, -4.5, 0), fov: 46 },
  // ...
];
```

---

## 📱 Hardware Performance & Fallback

- Desktop devices with dedicated GPUs render **40,000 to 60,000** particles with full post-processing.
- Mobile and low-end devices automatically drop to **6,400 to 8,100** particles and bypass heavy post-processing passes to maintain 60 FPS.
- Full support for `prefers-reduced-motion`.
