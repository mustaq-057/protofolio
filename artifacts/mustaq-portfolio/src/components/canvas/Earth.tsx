import { Suspense, Component, ReactNode, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../layout/Loader";

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

const Earth = ({ onReady }: { onReady: () => void }) => {
  const earth = useGLTF("./planet/scene.gltf");
  // Signal that model is loaded
  if (earth.scene) {
    requestAnimationFrame(onReady);
  }

  return (
    <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />
  );
};

const EarthCanvas = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <CanvasErrorBoundary>
        <Canvas
          shadows
          frameloop="always"
          dpr={[1, 1.5]}
          gl={{
            preserveDrawingBuffer: true,
            antialias: false,
            powerPreference: "high-performance",
          }}
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [-4, 3, 6],
          }}
        >
          <Suspense fallback={<CanvasLoader />}>
            <OrbitControls
              autoRotate
              enablePan={false}
              enableZoom={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
            <Earth onReady={() => setLoaded(true)} />
            <Preload all />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
};

export default EarthCanvas;
