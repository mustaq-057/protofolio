import { useState, useRef, Suspense, Component, ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import { random } from "maath";
import type { Points as ThreePoints, TypedArray } from "three";

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

const Stars = (props: any) => {
  const ref = useRef<ThreePoints | null>(null);
  const [sphere] = useState<TypedArray>(() =>
    random.inSphere(new Float32Array(5001), { radius: 1.2 })
  );

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className="absolute inset-0 z-[-1] h-auto w-full">
      <CanvasErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 1] }}
          gl={{
            preserveDrawingBuffer: false,
            antialias: false,
            powerPreference: "low-power",
          }}
          onCreated={({ gl }) => {
            gl.domElement?.addEventListener("webglcontextlost", (e) => {
              e.preventDefault();
            });
          }}
        >
          <Suspense fallback={null}>
            <Stars />
          </Suspense>
          <Preload all />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
};

export default StarsCanvas;
