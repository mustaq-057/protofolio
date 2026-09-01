---
name: WebGL preview fallback
description: Three.js canvas previews may not have a WebGL context in the Replit screenshot browser.
---

Three.js scenes should be capability-gated and provide a non-WebGL visual fallback so the app remains usable in preview environments without GPU access.

**Why:** The browser preview can fail to create a WebGL context even when the application code and assets are valid, causing a runtime overlay that hides the rest of the page.

**How to apply:** Detect WebGL before mounting React Three Fiber canvases; keep the 3D path for capable browsers and render a CSS/image fallback otherwise.