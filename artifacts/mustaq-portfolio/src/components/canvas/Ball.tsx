import React, { Suspense, useRef, useState, useEffect, useCallback } from "react";
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

// ---- Shared GL context approach ----
// Instead of each ball having its own <Canvas> (and thus its own WebGL context),
// we render each ball into an offscreen canvas, snapshot it to an image,
// then only activate a live <Canvas> when the user taps/clicks to interact.

function renderBallToImage(pngUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const size = 224;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
    camera.position.z = 5;

    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const dir = new THREE.DirectionalLight(0xffffff, 1);
    dir.position.set(0, 0, 0.05);
    scene.add(dir);

    const loader = new THREE.TextureLoader();
    loader.load(pngUrl, (decal) => {
      decal.colorSpace = THREE.SRGBColorSpace;
      decal.minFilter = THREE.LinearFilter;
      decal.magFilter = THREE.LinearFilter;

      const geo = new THREE.IcosahedronGeometry(1, 1);
      const mat = new THREE.MeshStandardMaterial({
        color: "#0f172a",
        metalness: 0.4,
        roughness: 0.35,
        polygonOffset: true,
        polygonOffsetFactor: -5,
        flatShading: true,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.scale.setScalar(2.75);

      // Create decal mesh
      const decalGeo = new THREE.IcosahedronGeometry(1, 1);
      const decalMat = new THREE.MeshStandardMaterial({
        map: decal,
        transparent: true,
        polygonOffset: true,
        polygonOffsetFactor: -10,
        flatShading: true,
      });
      // Simple approach: just render with the texture on top
      // Use a slightly larger sphere for the decal overlay
      const decalMesh = new THREE.Mesh(
        new THREE.SphereGeometry(1.06, 32, 32),
        new THREE.MeshBasicMaterial({ map: decal, transparent: true })
      );
      decalMesh.scale.setScalar(2.75);
      // Position decal in front
      decalMesh.position.z = 0;

      scene.add(mesh);
      scene.add(decalMesh);

      renderer.render(scene, camera);
      const dataUrl = renderer.domElement.toDataURL("image/png");

      // Cleanup
      geo.dispose();
      mat.dispose();
      decalGeo.dispose();
      decalMat.dispose();
      decal.dispose();
      renderer.dispose();

      resolve(dataUrl);
    }, undefined, () => {
      renderer.dispose();
      resolve(""); // fail silently
    });
  });
}

// Global queue to render balls one at a time (single GL context at a time)
let renderQueue: Array<{ pngUrl: string; resolve: (url: string) => void }> = [];
let rendering = false;

async function processQueue() {
  if (rendering) return;
  rendering = true;
  while (renderQueue.length > 0) {
    const item = renderQueue.shift()!;
    try {
      const result = await renderBallToImage(item.pngUrl);
      item.resolve(result);
    } catch {
      item.resolve("");
    }
    // Small delay to let browser reclaim context
    await new Promise(r => setTimeout(r, 50));
  }
  rendering = false;
}

function queueBallRender(pngUrl: string): Promise<string> {
  return new Promise((resolve) => {
    renderQueue.push({ pngUrl, resolve });
    processQueue();
  });
}

// ---- Interactive 3D Ball (only when user interacts) ----
const BallMesh = ({ imgUrl }: { imgUrl: string }) => {
  const [decal] = useTexture([imgUrl]);
  decal.colorSpace = THREE.SRGBColorSpace;
  decal.minFilter = THREE.LinearFilter;
  decal.magFilter = THREE.LinearFilter;
  decal.needsUpdate = true;

  const meshRef = useRef<THREE.Mesh>(null);
  const dragging = useRef(false);
  const prev = useRef({ x: 0, y: 0 });
  const rot = useRef({ x: 0, y: 0 });

  useFrame(() => {
    const m = meshRef.current;
    if (!m || dragging.current) return;
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

// ---- Main Component ----
// Renders a pre-rendered image of the ball by default.
// When user clicks/taps, swaps to live interactive 3D canvas.
const BallCanvas: React.FC<{ icon: string }> = ({ icon }) => {
  const pngUrl = useImageAsPng(icon);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [snapshotUrl, setSnapshotUrl] = useState<string | null>(null);
  const [interactive, setInteractive] = useState(false);

  // Pre-render the ball to an image
  useEffect(() => {
    if (!pngUrl) return;
    let cancelled = false;
    queueBallRender(pngUrl).then((url) => {
      if (!cancelled && url) setSnapshotUrl(url);
    });
    return () => { cancelled = true; };
  }, [pngUrl]);

  const activate = useCallback(() => {
    setInteractive(true);
  }, []);

  // If interactive mode: show live canvas
  if (interactive && pngUrl) {
    return (
      <div ref={wrapperRef} style={{ width: "100%", height: "100%" }}>
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
      </div>
    );
  }

  // Default: show pre-rendered image (no WebGL context used)
  return (
    <div
      ref={wrapperRef}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "grab",
      }}
      onClick={activate}
      onTouchStart={activate}
    >
      {snapshotUrl ? (
        <img
          src={snapshotUrl}
          alt=""
          draggable={false}
          style={{ width: "100%", height: "100%", objectFit: "contain", pointerEvents: "none" }}
        />
      ) : (
        // Fallback while rendering
        <div style={{
          width: 112,
          height: 112,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 30%, #2a2054, #100d25 65%)",
          border: "1px solid rgba(145,94,255,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 40px rgba(145,94,255,0.18)",
        }}>
          <img src={icon} alt="" style={{ width: 48, height: 48, objectFit: "contain" }} />
        </div>
      )}
    </div>
  );
};

export default BallCanvas;
