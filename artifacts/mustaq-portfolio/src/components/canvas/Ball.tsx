import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Decal, Preload, useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { ThreeEvent } from "@react-three/fiber";

// Convert any image (including SVG) to PNG dataURL so WebGL can load it
function useImageAsPng(src: string) {
  const [pngUrl, setPngUrl] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (cancelled) return;
      const c = document.createElement("canvas");
      c.width = 128;
      c.height = 128;
      const ctx = c.getContext("2d");
      if (ctx) ctx.drawImage(img, 0, 0, 128, 128);
      setPngUrl(c.toDataURL("image/png"));
    };
    img.onerror = () => {
      if (!cancelled) setPngUrl(src);
    };
    img.src = src;
    return () => { cancelled = true; };
  }, [src]);
  return pngUrl;
}

function useVisible(ref: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { rootMargin: "600px" }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

const BallMesh = ({ imgUrl }: { imgUrl: string }) => {
  const [decal] = useTexture([imgUrl]);
  decal.colorSpace = THREE.SRGBColorSpace;
  decal.minFilter = THREE.LinearFilter;
  decal.magFilter = THREE.LinearFilter;
  decal.needsUpdate = true;

  const meshRef = useRef<THREE.Mesh>(null);
  const dragging = useRef(false);
  const prev = useRef({ x: 0, y: 0 });
  // Track current rotation so ball stays wherever user leaves it
  const rot = useRef({ x: 0, y: 0 });

  useFrame(() => {
    const m = meshRef.current;
    if (!m || dragging.current) return;
    // Only apply stored rotation — NO auto-return, NO auto-spin
    m.rotation.x = rot.current.x;
    m.rotation.y = rot.current.y;
  });

  const onDown = (e: ThreeEvent<PointerEvent>) => {
    dragging.current = true;
    prev.current = { x: e.clientX, y: e.clientY };
    (e.nativeEvent.target as HTMLElement)?.setPointerCapture?.(e.nativeEvent.pointerId);
    e.stopPropagation();
  };

  const onMove = (e: ThreeEvent<PointerEvent>) => {
    if (!dragging.current || !meshRef.current) return;
    const dx = e.clientX - prev.current.x;
    const dy = e.clientY - prev.current.y;
    rot.current.y += dx * 0.012;
    rot.current.x += dy * 0.012;
    meshRef.current.rotation.y = rot.current.y;
    meshRef.current.rotation.x = rot.current.x;
    prev.current = { x: e.clientX, y: e.clientY };
  };

  const onUp = () => {
    dragging.current = false;
    // Ball stays exactly where you left it — no snap-back
  };

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[0, 0, 0.05]} intensity={1} />
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        scale={2.75}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        onPointerCancel={onUp}
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
    </>
  );
};

const BallCanvas: React.FC<{ icon: string }> = ({ icon }) => {
  const pngUrl = useImageAsPng(icon);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isVisible = useVisible(wrapperRef);

  return (
    <div ref={wrapperRef} style={{ width: "100%", height: "100%" }}>
      {pngUrl && isVisible && (
        <Canvas
          frameloop="always"
          dpr={[1, 1.5]}
          gl={{
            preserveDrawingBuffer: false,
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
          }}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <BallMesh imgUrl={pngUrl} />
          </Suspense>
          <Preload all />
        </Canvas>
      )}
    </div>
  );
};

export default BallCanvas;
