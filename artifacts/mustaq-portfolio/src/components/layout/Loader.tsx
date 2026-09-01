import { Html, useProgress } from "@react-three/drei";

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 80,
          height: 80,
          background: "transparent",
        }}
      >
        <p
          style={{
            fontSize: 14,
            color: "#915EFF",
            fontWeight: 800,
          }}
        >
          {progress.toFixed(0)}%
        </p>
      </span>
    </Html>
  );
};

export default Loader;
