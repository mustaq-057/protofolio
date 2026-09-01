import React, { Suspense, useEffect, useState, Component, ReactNode } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../layout/Loader";

class CanvasErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

const Computers: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -4.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };
    mediaQuery?.addEventListener?.("change", handleMediaQueryChange);
    return () => {
      mediaQuery?.removeEventListener?.("change", handleMediaQueryChange);
    };
  }, []);

  if (isMobile) return null;

  return (
    <CanvasErrorBoundary>
      <Canvas
        frameloop="demand"
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [20, 3, 5], fov: 25 }}
        gl={{ preserveDrawingBuffer: false, alpha: true, antialias: false, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
        onCreated={({ gl }) => {
          // Use PCFShadowMap to avoid PCFSoftShadowMap deprecation warning
          gl.shadowMap.type = THREE.PCFShadowMap;
          gl.domElement?.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
          });
        }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <Computers isMobile={isMobile} />
        </Suspense>
        <Preload all />
      </Canvas>
    </CanvasErrorBoundary>
  );
};

export default ComputersCanvas;
