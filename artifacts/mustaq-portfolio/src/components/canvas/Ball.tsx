import React, { Suspense, useRef, useState, useEffect, Component, ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Decal, Preload, useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { ThreeEvent } from "@react-three/fiber";

class CanvasErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback ?? null;
    return this.props.children;
  }
}

function FallbackOrbInline({ icon }: { icon: string }) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", border: "1px solid rgba(145,94,255,0.4)", background: "radial-gradient(circle at 35% 30%, #2a2054, #100d25 65%)", boxShadow: "0 0 40px rgba(145,94,255,.18)" }}>
      <img src={icon} alt="" style={{ width: 48, height: 48, objectFit: "contain" }} />
    </div>
  );
}

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

function useVisible(ref: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { rootMargin: "800px" }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

const BallMesh = ({ imgUrl }: { imgUrl: string }) => {
  const [decal] = useTexture([imgUrl]);
  decal.colorSpace = THREE.SRGBColorSpace;
  const meshRef = useRef<THREE.Mesh>(null);
  const { invalidate } = useThree();

  const dragging = useRef(false);
  const prev = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });
  const animating = useRef(false);

  useFrame(() => {
    const m = meshRef.current;
    if (!m) return;

    if (!dragging.current) {
      // Lerp back to original rotation (0, 0, 0)
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

  const onUp = () => {
    dragging.current = false;
  };

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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isVisible = useVisible(wrapperRef);
  const [contextLost, setContextLost] = useState(false);

  return (
    <div ref={wrapperRef} style={{ width: "100%", height: "100%" }}>
      {(!pngUrl || !isVisible || contextLost) && <FallbackOrbInline icon={icon} />}
      {pngUrl && isVisible && !contextLost && (
        <CanvasErrorBoundary fallback={<FallbackOrbInline icon={icon} />}>
          <Canvas
            frameloop="always"
            dpr={[1, 1.5]}
            gl={{ preserveDrawingBuffer: false, alpha: true, antialias: false, powerPreference: "low-power" }}
            style={{ background: "transparent" }}
            onCreated={({ gl }) => {
              gl.domElement?.addEventListener("webglcontextlost", (e) => {
                e.preventDefault();
                setContextLost(true);
              });
            }}
          >
            <Suspense fallback={null}>
              <BallMesh imgUrl={pngUrl} />
            </Suspense>
            <Preload all />
          </Canvas>
        </CanvasErrorBoundary>
      )}
    </div>
  );
};

export default BallCanvas;
