import { useState, useEffect } from "react";
import frontImg from "../front.png";
import sideImg from "../side.png";
import side1Img from "../side1.png";
import backImg from "../back.png";

export default function InteractiveCharacter() {
  const [activeImg, setActiveImg] = useState<"back" | "side" | "side1" | "front">("back");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;

    if (x < 0.25) {
      setActiveImg("back");
    } else if (x < 0.5) {
      setActiveImg("side");
    } else if (x < 0.75) {
      setActiveImg("side1");
    } else {
      setActiveImg("front");
    }
  };

  const handleMouseLeave = () => {
    setActiveImg("back");
  };

  return (
    <div 
      className="relative flex h-full w-full items-center justify-center cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-full w-full flex items-center justify-center pointer-events-none">
        {[
          { id: "back", src: backImg },
          { id: "side", src: sideImg },
          { id: "side1", src: side1Img },
          { id: "front", src: frontImg }
        ].map((img) => (
          <img
            key={img.id}
            src={img.src}
            alt="Interactive Character"
            className={`absolute max-h-[110%] w-auto object-contain transition-opacity duration-[1500ms] ease-in-out pointer-events-none ${
              activeImg === img.id ? "opacity-100" : "opacity-0"
            }`}
            style={{ filter: "drop-shadow(0 0 50px rgba(59,130,246,0.25))" }}
          />
        ))}
      </div>
    </div>
  );
}
