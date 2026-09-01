import { useState, useEffect } from "react";
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
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let interval: number | undefined;
    
    if (isHovering) {
      interval = window.setInterval(() => {
        setFrame((prev) => (prev + 1) % sequence.length);
      }, 1500); // 1.5s interval to perfectly match the 1.5s CSS crossfade
    } else {
      setFrame(0); // Reset to back when mouse leaves
    }

    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <div 
      className="relative flex h-full w-full items-center justify-center cursor-pointer"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
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
          />
        ))}
      </div>
    </div>
  );
}
