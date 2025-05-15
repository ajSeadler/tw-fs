/* eslint-disable react-hooks/exhaustive-deps */
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useEffect } from "react";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Home from "./Home";

const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"]; // Fixed missing hash

const AuroraBackground = () => {
  // Animate a numeric value and map it to colors
  const colorIndex = useMotionValue(0);
  const color = useTransform(colorIndex, [0, 1, 2, 3], COLORS);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #000 50%, ${color})`;

  useEffect(() => {
    const controls = animate(colorIndex, [0, 1, 2, 3, 0], {
      ease: "easeInOut",
      duration: 20,
      repeat: Infinity,
    });

    return controls.stop;
  }, []);

  return (
    <motion.section
      style={{ backgroundImage }}
      className="relative grid min-h-screen place-content-center overflow-hidden bg-black px-4 py-24 text-gray-200"
    >
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={5} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
      <Home />
    </motion.section>
  );
};

export default AuroraBackground;
