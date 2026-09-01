import { useEffect, useRef } from "react";

const WaveLines = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const numLines = 38;

      for (let i = 0; i < numLines; i++) {
        const progress = i / numLines; // 0 → 1

        // Opacity: stronger in middle, fade at edges
        const alpha = 0.08 + progress * 0.28;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(145, 94, 255, ${alpha})`;
        ctx.lineWidth = 0.9;

        const steps = 180;
        for (let s = 0; s <= steps; s++) {
          const x = (s / steps) * width;

          // Each line is a sum of sine waves with different frequencies/phases
          const y =
            height * (0.35 + progress * 0.55) +
            Math.sin(x * 0.008 + t + progress * 3.5) * (60 + progress * 80) +
            Math.sin(x * 0.015 - t * 0.7 + progress * 2.1) * (30 + progress * 40) +
            Math.sin(x * 0.004 + t * 0.4 + i * 0.3) * (20 + progress * 30);

          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.stroke();
      }

      t += 0.008; // animation speed
      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ pointerEvents: "none" }}
    />
  );
};

export default WaveLines;
