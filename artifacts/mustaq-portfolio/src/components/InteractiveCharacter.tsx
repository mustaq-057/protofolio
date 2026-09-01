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
  const [isFirstTurn, setIsFirstTurn] = useState(false);

  useEffect(() => {
    let timeout: number;
    let interval: number;
    
    if (isHovering) {
      setIsFirstTurn(true);
      // Trigger the first turn almost immediately
      timeout = window.setTimeout(() => {
        setFrame(1);
        setIsFirstTurn(false); // Turn off fast transition for the rest
        
        // Then start the slow interval loop for the remaining frames
        interval = window.setInterval(() => {
          setFrame((prev) => (prev + 1) % sequence.length);
        }, 1500);
      }, 50); 
    } else {
      setFrame(0);
      setIsFirstTurn(false);
    }

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [isHovering]);

  return (
    <div 
      className="relative flex h-full w-full items-center justify-center cursor-pointer"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative h-full w-full flex items-center justify-center pointer-events-none">
        {sequence.map((img, index) => {
          const isBack = img.id === "back";
          return (
            <img
              key={img.id}
              src={img.src}
              alt="Interactive Character"
              className={`absolute max-h-[110%] w-auto object-contain transition-opacity ease-in-out pointer-events-none ${
                isFirstTurn ? "duration-500" : "duration-[1500ms]"
              } ${
                frame === index ? "opacity-100" : "opacity-0"
              } ${isBack ? "scale-[1.08] -translate-x-4 translate-y-3" : ""}`}
            />
          );
        })}
      </div>
    </div>
  );
}
