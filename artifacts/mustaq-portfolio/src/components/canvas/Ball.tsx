/**
 * Ball.tsx — SINGLE shared WebGL context for ALL skill balls.
 *
 * Root cause of the white-flash bug: having one <Canvas> per skill icon
 * creates 15-20 WebGL contexts simultaneously. Browsers cap this at ~8-16.
 * When the cap is hit, the oldest contexts are forcibly killed — and the
 * dead <canvas> DOM element turns WHITE because it lost its renderer.
 *
 * Fix: one <Canvas> total, all balls rendered inside it. Zero context churn.
 * Visual: identical to original — dark icosahedron ball + icon decal + name label.
 */

import React, {
  Suspense,
  useRef,
  useState,
  useEffect,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Decal, Html, Preload, useTexture } from "@react-three/drei";
import * as THREE from "three";

/* ─────────────────────────────────────────────────────────
   Convert any image URL to a PNG data-url (fixes SVG/WEBP textures)
───────────────────────────────────────────────────────── */
function toDataUrl(src: string): Promise<string> {
  return new Promise((resolve) => {
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
  });
}

/* ─────────────────────────────────────────────────────────
   Single ball mesh — identical to original icosahedron style
───────────────────────────────────────────────────────── */
const SingleBall = ({
  imgUrl,
  name,
  position,
}: {
  imgUrl: string;
  name: string;
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
    <group position={position}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh
        ref={meshRef}
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
        <Decal
          position={[0, 0, 1.05]}
          rotation={[0, 0, 0]}
          scale={1.2}
          map={decal}
          // @ts-expect-error
          flatShading
        />
      </mesh>
      {/* Skill name label below the ball — rendered as HTML in the 3D scene */}
      <Html
        position={[0, -2.2, 0]}
        center
        style={{ pointerEvents: "none", whiteSpace: "nowrap" }}
      >
        <p
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "rgba(255,255,255,0.8)",
            letterSpacing: "0.05em",
            textAlign: "center",
            marginTop: 4,
            fontFamily: "Inter, sans-serif",
          }}
        >
          {name}
        </p>
      </Html>
    </group>
  );
};

/* ─────────────────────────────────────────────────────────
   Inner scene — all balls laid out in a row-wrapping grid
───────────────────────────────────────────────────────── */
const COLS = 5;
const SPACING = 7.5;

function BallsScene({ skills }: { skills: [string, string][] }) {
  return (
    <>
      {skills.map(([name, url], i) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        const totalCols = Math.min(skills.length - row * COLS, COLS);
        const x = (col - (totalCols - 1) / 2) * SPACING;
        const y = -row * SPACING;
        return (
          <Suspense key={name + i} fallback={null}>
            <SingleBall imgUrl={url} name={name} position={[x, y, 0]} />
          </Suspense>
        );
      })}
      <Preload all />
    </>
  );
}

/* ─────────────────────────────────────────────────────────
   BallsGrid — public API
   Usage: <BallsGrid skills={orbSkills} />
   where orbSkills is [name, iconUrl][]
───────────────────────────────────────────────────────── */
export function BallsGrid({ skills }: { skills: [string, string][] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [pngSkills, setPngSkills] = useState<[string, string][]>([]);

  // Convert all icons to PNG data URLs once
  useEffect(() => {
    let cancelled = false;
    Promise.all(skills.map(([name, src]) => toDataUrl(src).then((url) => [name, url] as [string, string]))).then(
      (result) => { if (!cancelled) setPngSkills(result); }
    );
    return () => { cancelled = true; };
  }, [skills]);

  // Only mount WebGL when section is visible
  useEffect(() => {
    if (!wrapperRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { rootMargin: "200px" }
    );
    obs.observe(wrapperRef.current);
    return () => obs.disconnect();
  }, []);

  const rows = Math.ceil(skills.length / COLS);
  // Extra height for the name labels below each ball
  const heightPx = rows * 130 + 40;

  const totalCols = Math.min(skills.length, COLS);
  const totalW = (totalCols - 1) * SPACING;
  const totalH = (rows - 1) * SPACING;
  const fov = 40;
  const cameraZ = Math.max(totalW, totalH) * 1.2 + 14;
  const cameraY = -((rows - 1) * SPACING) / 2;

  return (
    <div
      ref={wrapperRef}
      style={{ width: "100%", height: heightPx, background: "transparent" }}
    >
      {visible && pngSkills.length > 0 && (
        <Canvas
          frameloop="demand"
          dpr={[1, 1.5]}
          camera={{ fov, position: [0, cameraY, cameraZ] }}
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
          <BallsScene skills={pngSkills} />
        </Canvas>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Legacy BallCanvas — kept for any other usages
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
