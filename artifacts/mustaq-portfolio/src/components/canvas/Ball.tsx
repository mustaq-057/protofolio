import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Decal, Preload, useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { ThreeEvent } from "@react-three/fiber";

// Load texture directly — no canvas conversion, instant load
const BallMesh = ({ imgUrl }: { imgUrl: string }) => {
  const [decal] = useTexture([imgUrl]);
  // Fix white/washed-out texture on mobile by forcing SRGB + nearest filter
  decal.colorSpace = THREE.SRGBColorSpace;
  decal.minFilter = THREE.LinearFilter;
  decal.magFilter = THREE.LinearFilter;
  decal.needsUpdate = true;

  const meshRef = useRef<THREE.Mesh>(null);

  const dragging = useRef(false);
  const prev = useRef({ x: 0, y: 0 });
  // Target rotations to lerp toward when released (always back to 0,0)
  const targetX = useRef(0);
  const targetY = useRef(0);

  useFrame(() => {
    const m = meshRef.current;
    if (!m || dragging.current) return;
    // Smoothly return to resting position when not dragging
    m.rotation.x = THREE.MathUtils.lerp(m.rotation.x, targetX.current, 0.07);
    m.rotation.y = THREE.MathUtils.lerp(m.rotation.y, targetY.current, 0.07);
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
    meshRef.current.rotation.y += dx * 0.01;
    meshRef.current.rotation.x += dy * 0.01;
    prev.current = { x: e.clientX, y: e.clientY };
  };

  const onUp = () => {
    dragging.current = false;
    // Reset targets so ball springs back to resting position
    targetX.current = 0;
    targetY.current = 0;
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

function useVisible(ref: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    // Large rootMargin so balls start loading before they scroll into view
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { rootMargin: "800px" }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

const BallCanvas: React.FC<{ icon: string }> = ({ icon }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isVisible = useVisible(wrapperRef);

  return (
    <div ref={wrapperRef} style={{ width: "100%", height: "100%" }}>
      {isVisible && (
        <Canvas
          frameloop="always"
          dpr={[1, 1.5]}
          gl={{
            preserveDrawingBuffer: false,
            alpha: true,
            antialias: false, // off for performance on mobile
            powerPreference: "high-performance",
          }}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <BallMesh imgUrl={icon} />
          </Suspense>
          <Preload all />
        </Canvas>
      )}
    </div>
  );
};

export default BallCanvas;
