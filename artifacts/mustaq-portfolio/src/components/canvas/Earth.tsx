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
  const [contextLost, setContextLost] = useState(false);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Loading placeholder shown ONLY if context is lost */}
      {contextLost && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          <div className="scene-fallback-ring scene-fallback-ring-one" style={{ position: "absolute", height: "74%", width: "74%" }} />
          <div className="scene-fallback-ring scene-fallback-ring-two" style={{ position: "absolute", height: "52%", width: "86%" }} />
          <div className="scene-fallback-core" style={{ borderRadius: "50%" }}>
            <svg viewBox="0 0 24 24" width="42" height="42" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
        </div>
      )}
      {!contextLost && (
        <CanvasErrorBoundary>
          <Canvas
            shadows
            frameloop="always"
            dpr={[1, 1.5]}
            gl={{
              preserveDrawingBuffer: true,
              antialias: false,
              powerPreference: "low-power",
            }}
            camera={{
              fov: 45,
              near: 0.1,
              far: 200,
              position: [-4, 3, 6],
            }}
            onCreated={({ gl }) => {
              gl.domElement?.addEventListener("webglcontextlost", (e) => {
                e.preventDefault();
                setContextLost(true);
              });
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
      )}
    </div>
  );
};

export default EarthCanvas;
