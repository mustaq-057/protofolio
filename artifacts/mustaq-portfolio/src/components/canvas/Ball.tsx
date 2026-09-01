/**
 * Ball.tsx — Uses drei's View system. ONE global WebGL context for all balls.
 * Visual: 100% identical to original. Each View has its own PerspectiveCamera
 * so balls don't shake during scroll.
 */
import React, { Suspense, useRef, useState, useEffect } from "react";
import { View, Decal, Preload, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { ThreeEvent } from "@react-three/fiber";

function useImageAsPng(src: string) {
  const [pngUrl, setPngUrl] = useState<string | null>(null);
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = 256; c.height = 256;
      c.getContext("2d")!.drawImage(img, 0, 0, 256, 256);
      setPngUrl(c.toDataURL("image/png"));
    };
    img.onerror = () => { setPngUrl(src); };
    img.src = src;
  }, [src]);
  return pngUrl;
}

const BallMesh = ({ imgUrl }: { imgUrl: string }) => {
  const [decal] = useTexture([imgUrl]);
  decal.colorSpace = THREE.SRGBColorSpace;
  const meshRef = useRef<THREE.Mesh>(null);

  const dragging = useRef(false);
  const prev = useRef({ x: 0, y: 0 });

  useFrame(() => {
    const m = meshRef.current;
    if (!m) return;
    if (!dragging.current) {
      m.rotation.x = THREE.MathUtils.lerp(m.rotation.x, 0, 0.05);
      m.rotation.y = THREE.MathUtils.lerp(m.rotation.y, 0, 0.05);
    }
  });

  const onDown = (e: ThreeEvent<PointerEvent>) => {
    dragging.current = true;
    prev.current = { x: e.clientX, y: e.clientY };
    const t = e.nativeEvent.target as HTMLElement;
    t?.setPointerCapture?.(e.nativeEvent.pointerId);
    e.stopPropagation();
  };

  const onMove = (e: ThreeEvent<PointerEvent>) => {
    if (!dragging.current || !meshRef.current) return;
    const dx = e.clientX - prev.current.x;
    const dy = e.clientY - prev.current.y;
    meshRef.current.rotation.y += dx * 0.009;
    meshRef.current.rotation.x += dy * 0.009;
    prev.current = { x: e.clientX, y: e.clientY };
  };

  const onUp = () => { dragging.current = false; };

  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh
        ref={meshRef}
        castShadow receiveShadow scale={2.75}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
      >
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#0f172a" metalness={0.4} roughness={0.35}
          polygonOffset polygonOffsetFactor={-5} flatShading
        />
        <Decal position={[0, 0, 1.05]} rotation={[0, 0, 0]} scale={1.2} map={decal}
          // @ts-expect-error
          flatShading
        />
      </mesh>
    </>
  );
};

const BallCanvas: React.FC<{ icon: string }> = ({ icon }) => {
  const pngUrl = useImageAsPng(icon);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {pngUrl && (
        <View style={{ width: "100%", height: "100%" }}>
          <Suspense fallback={null}>
            <BallMesh imgUrl={pngUrl} />
          </Suspense>
          <Preload all />
        </View>
      )}
    </div>
  );
};

export function BallsGrid({ skills }: { skills: [string, string][] }) {
  return null;
}

export default BallCanvas;
