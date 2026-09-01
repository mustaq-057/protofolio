/**
 * Ball.tsx — SINGLE shared WebGL context for ALL skill balls.
 *
 * Root cause of the white-flash bug: having one <Canvas> per skill icon
 * creates 15-20 WebGL contexts simultaneously. Browsers cap this at ~8-16.
 * When the cap is hit, the oldest contexts are forcibly killed — and the
 * dead <canvas> DOM element turns WHITE because it lost its renderer.
 *
 * Fix: one <Canvas> total, all balls rendered inside it. Zero context churn.
 */

import React, {
  Suspense,
  useRef,
  useState,
  useEffect,
  useMemo,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Decal, Preload, useTexture } from "@react-three/drei";
import * as THREE from "three";

/* ─────────────────────────────────────────────────────────
   Convert any image URL to a PNG data-url so Three.js can
   load it as a texture regardless of format.
───────────────────────────────────────────────────────── */
function useImageAsPng(src: string) {
  const [pngUrl, setPngUrl] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (cancelled) return;
      const c = document.createElement("canvas");
      c.width = 128; c.height = 128;
      const ctx = c.getContext("2d");
      if (ctx) ctx.drawImage(img, 0, 0, 128, 128);
      if (!cancelled) setPngUrl(c.toDataURL("image/png"));
    };
    img.onerror = () => { if (!cancelled) setPngUrl(src); };
    img.src = src;
    return () => { cancelled = true; };
  }, [src]);
  return pngUrl;
}

/* ─────────────────────────────────────────────────────────
   Single ball mesh rendered inside the shared scene.
   Each ball sits at its own position in 3D space.
───────────────────────────────────────────────────────── */
const SingleBall = ({
  imgUrl,
  position,
}: {
  imgUrl: string;
  position: [number, number, number];
}) => {
  const [decal] = useTexture([imgUrl]);
  decal.colorSpace = THREE.SRGBColorSpace;
  const meshRef = useRef<THREE.Mesh>(null);

  const dragging = useRef(false);
  const prev = useRef({ x: 0, y: 0 });

  useFrame(() => {
    const m = meshRef.current;
    if (!m || dragging.current) return;
    m.rotation.y = THREE.MathUtils.lerp(m.rotation.y, 0, 0.04);
    m.rotation.x = THREE.MathUtils.lerp(m.rotation.x, 0, 0.04);
  });

  const onDown = (e: any) => {
    dragging.current = true;
    prev.current = { x: e.clientX, y: e.clientY };
    (e.nativeEvent.target as HTMLElement)?.setPointerCapture?.(e.nativeEvent.pointerId);
    e.stopPropagation();
  };
  const onMove = (e: any) => {
    if (!dragging.current || !meshRef.current) return;
    const dx = e.clientX - prev.current.x;
    const dy = e.clientY - prev.current.y;
    meshRef.current.rotation.y += dx * 0.009;
    meshRef.current.rotation.x += dy * 0.009;
    prev.current = { x: e.clientX, y: e.clientY };
  };
  const onUp = () => { dragging.current = false; };

  return (
    <mesh
      ref={meshRef}
      position={position}
      castShadow
      receiveShadow
      scale={2.75}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerLeave={onUp}
    >
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color="#0f172a"
        metalness={0.4}
        roughness={0.35}
        polygonOffset
        polygonOffsetFactor={-5}
        flatShading
      />
      <Decal position={[0, 0, 1.05]} rotation={[0, 0, 0]} scale={1.2} map={decal}
        // @ts-expect-error
        flatShading
      />
    </mesh>
  );
};

/* ─────────────────────────────────────────────────────────
   The single shared <Canvas> that hosts all balls.
   Used by BallsGrid below.
───────────────────────────────────────────────────────── */
const COLS = 5; // balls per row
const SPACING = 7; // world-units between balls

function BallsScene({ icons }: { icons: string[] }) {
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      {icons.map((url, i) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        const x = (col - (Math.min(icons.length, COLS) - 1) / 2) * SPACING;
        const y = -row * SPACING;
        return (
          <Suspense key={url + i} fallback={null}>
            <SingleBall imgUrl={url} position={[x, y, 0]} />
          </Suspense>
        );
      })}
      <Preload all />
    </>
  );
}

/* ─────────────────────────────────────────────────────────
   BallsGrid — public API.
   Drop-in replacement for the old list of <BallCanvas /> calls.

   Usage:
     <BallsGrid icons={technologies.map(t => t.icon)} />
───────────────────────────────────────────────────────── */
export function BallsGrid({ icons }: { icons: string[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Convert all icons to PNG data URLs once
  const [pngUrls, setPngUrls] = useState<string[]>([]);
  useEffect(() => {
    let cancelled = false;
    const promises = icons.map(
      (src) =>
        new Promise<string>((resolve) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => {
            const c = document.createElement("canvas");
            c.width = 128; c.height = 128;
            const ctx = c.getContext("2d");
            if (ctx) ctx.drawImage(img, 0, 0, 128, 128);
            resolve(c.toDataURL("image/png"));
          };
          img.onerror = () => resolve(src);
          img.src = src;
        })
    );
    Promise.all(promises).then((urls) => {
      if (!cancelled) setPngUrls(urls);
    });
    return () => { cancelled = true; };
  }, [icons]);

  // Lazy-mount: only create the WebGL context when this section scrolls into view
  useEffect(() => {
    if (!wrapperRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { rootMargin: "200px" }
    );
    obs.observe(wrapperRef.current);
    return () => obs.disconnect();
  }, []);

  const rows = Math.ceil(icons.length / COLS);
  // Each ball is ~100px, rows stacked
  const heightPx = rows * 110 + 20;
  const fov = 35;

  // Camera Z so all balls fit in view
  const totalW = Math.min(icons.length, COLS) * SPACING;
  const totalH = rows * SPACING;
  const cameraZ = Math.max(totalW, totalH) * 1.4 + 10;

  return (
    <div
      ref={wrapperRef}
      style={{
        width: "100%",
        height: heightPx,
        background: "transparent",
      }}
    >
      {visible && pngUrls.length > 0 && (
        <Canvas
          frameloop="demand"
          dpr={[1, 1.5]}
          camera={{ fov, position: [0, -((rows - 1) * SPACING) / 2, cameraZ] }}
          gl={{
            alpha: true,
            antialias: false,
            preserveDrawingBuffer: false,
            powerPreference: "low-power",
          }}
          style={{ background: "transparent" }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
        >
          <BallsScene icons={pngUrls} />
        </Canvas>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Legacy BallCanvas kept for any existing usage.
   It now renders a simple CSS orb — zero WebGL cost.
───────────────────────────────────────────────────────── */
const BallCanvas: React.FC<{ icon: string }> = ({ icon }) => {
  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        width: 80, height: 80, borderRadius: "50%",
        background: "radial-gradient(circle at 35% 35%, #2a2054, #0a0a0a 70%)",
        border: "1px solid rgba(255,255,255,0.15)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 0 20px rgba(255,255,255,0.08)",
      }}>
        <img src={icon} alt="" style={{ width: 42, height: 42, objectFit: "contain" }} />
      </div>
    </div>
  );
};

export default BallCanvas;
