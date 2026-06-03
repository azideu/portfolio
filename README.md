# Addin's Developer Portfolio

A high-performance, responsive, and responsive software engineering portfolio built like a developer's IDE and system console. It replaces standard modern templates with a monospaced terminal aesthetic featuring custom CRT filter screen overlays, live-updating hardware progress trackers, and a GPU-accelerated WebGL pixelated fluid cursor trail.

---

## Live Demo & Visual Style
The theme uses a custom-tailored **Cyber Blue** (`#00d2ff`) neon coordinate accent against a deep slate console workspace background (`#05070a`), stylized with retro CRT monitor grid patterns and scanlines.

*   **Custom Fonts**: Loaded with **Share Tech Mono** (geometric command headers) and **Space Mono** (terminal typewriter interface) via `next/font/google` for native optimization.
*   **Aperture Scanlines**: Emulates analog screens using CSS scanlines and subtle animation screen-flicker keyframes.
*   **Viewport Snapping (Scroll Lock)**: Locks scroll states to full-screen segments (`100vh`) on desktop screen ratios, ensuring that workspace grids remain cleanly aligned.

---

## Technology Stack
*   **Framework**: Next.js (App Router, Turbopack)
*   **Logic**: React 19, TypeScript
*   **Styling**: Tailwind CSS
*   **Scripting / Animation**: jQuery (highly optimized client-hydration modules)
*   **Fluid Simulator**: WebGL Shader Programs (fragment and vertex pipelines)
*   **Entrance Transitions**: Framer Motion

---

## Interactive System Features

### 1. Computer Science Pixelated LED Fluid Cursor
Implemented in [FluidCursor.tsx](src/components/FluidCursor.tsx), this component deploys double-buffered WebGL Framebuffer Objects (FBOs) to solve real-time Navier-Stokes fluid mechanics on the GPU:
*   **Pixelated LED Cell Grid**: The display fragment shader snaps coordinates to a discrete grid (`120` cell rows, dynamically scaled by viewport aspect ratio) to render fluid physics as square LED matrix blocks instead of analog smoke.
*   **3D Refraction Cap**: Samples neighboring blocks to calculate normal derivatives, adding a glossy 3D refract/bevel bump outline to each active pixel block.
*   **Screen Blending**: Set to `mix-blend-mode: screen` at `30%` canvas opacity. When the cursor passes over light text or interactive icons, colors blend additively instead of blocking out text—preserving 100% legibility.

### 2. High-Legibility Lift & Glow Hovers
Replacing text-blurring 3D perspective rotates, hoverable blocks (cards, timeline panels, contact cards) use a hardware-accelerated CSS lift animation:
*   On hover, cards translate `4px` upward (`translateY(-4px)`).
*   Applies a glowing cyber-blue shadow (`box-shadow: 0 8px 20px rgba(0, 210, 255, 0.15)`) and highlights panel borders.

### 3. Decrypt Text Shuffling
Hovering over the logo, navigation links, and section headings triggers a decryption shuffle animation. Interactive text shuffles letters dynamically using a console character array (`A-Z`, `a-z`, symbols) before locking original letters in from left-to-right (takes ~30ms per index).

### 4. Dynamic Header Progress Tracker
*   **Scroll progress bar**: A thin blue line follows the bottom border of the sticky header.
*   **Percentage Counter**: Renders a live-updating console print `[SYS.scrollPct = X%]` in the status bar of the navbar based on the container scroll offset.

---

## 📂 Repository Directory Tree
```text
.
├── public/                 # Static asset definitions
└── src/
    ├── app/
    │   ├── globals.css     # Theme tokens, CRT scanlines, snapping media rules
    │   ├── layout.tsx      # Font config and HTML root structure
    │   └── page.tsx        # Snap container and section index routing
    ├── components/
    │   ├── BackgroundEffect.tsx  # Static coordinate CRT grid layers
    │   ├── FluidCursor.tsx       # WebGL physics and grid shaders
    │   ├── ScrollEffects.tsx     # jQuery scroll percentage and reveals
    │   ├── Navbar.tsx            # Console status bar with shuffle links
    │   ├── Hero.tsx              # CLI boot screen with typing hooks
    │   ├── About.tsx             # File-tree technical directory
    │   ├── Projects.tsx          # IDE Editor mock windows
    │   ├── Experience.tsx        # Git commit branch education timeline
    │   └── Contact.tsx           # Mail parameters and connection tags
    └── context/
        └── ActiveSectionContext.tsx  # Viewport intersection trackers
```

---

## ⚙️ Getting Started & Installation

### 1. Clone the project
```bash
git clone https://github.com/azideu/Portfolio.git
cd Portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Launch the development build
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to inspect console loops.

### 4. Run verification and compilation
Confirm type safety and production static optimizations compile successfully:
```bash
npm run lint
npm run build
```

---

## 📄 License
This project is licensed under the MIT License.
