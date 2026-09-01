import { useState, useRef } from "react";
import frontImg from "../front.png";
import sideImg from "../side.png";
import side1Img from "../side1.png";
import backImg from "../back.png";

const sequence = [
  { id: "back", src: backImg },
  { id: "side", src: sideImg },
  { id: "side1", src: side1Img },
  { id: "front", src: frontImg }
] as const;

export default function InteractiveCharacter() {
  const [frame, setFrame] = useState(0);
  const lastXRef = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (lastXRef.current === null) {
      lastXRef.current = e.clientX;
      return;
    }
    
    const delta = Math.abs(e.clientX - lastXRef.current);
    if (delta > 40) { // Require 40px of movement to change frame
      setFrame((prev) => (prev + 1) % sequence.length);
      lastXRef.current = e.clientX;
    }
  };

  const handleMouseLeave = () => {
    lastXRef.current = null;
    setFrame(0);
  };

  return (
    <div 
      className="relative flex h-full w-full items-center justify-center cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-full w-full flex items-center justify-center pointer-events-none">
        {sequence.map((img, index) => (
          <img
            key={img.id}
            src={img.src}
            alt="Interactive Character"
            className={`absolute max-h-[110%] w-auto object-contain transition-opacity duration-[1500ms] ease-in-out pointer-events-none ${
              frame === index ? "opacity-100" : "opacity-0"
            }`}
            style={{ filter: "drop-shadow(0 0 50px rgba(59,130,246,0.25))" }}
          />
        ))}
      </div>
    </div>
  );
}
