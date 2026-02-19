import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      backgroundColor: "transparent",
      borderColor: "rgba(255, 255, 255, 0.5)",
      height: 40,
      width: 40,
    },
    text: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      backgroundColor: "rgba(255, 255, 255, 1)",
      borderColor: "rgba(255, 255, 255, 0)",
      height: 80,
      width: 80,
      mixBlendMode: "difference" as any,
    }
  };

  const dotVariants = {
    default: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
    },
    text: {
        x: mousePosition.x - 4,
        y: mousePosition.y - 4,
    }
  };

  return (
    <>
      <motion.div
        className="cursor-dot fixed top-0 left-0 bg-white rounded-full pointer-events-none z-[9999] w-2 h-2"
        variants={dotVariants}
        animate={cursorVariant}
        transition={{ type: "tween", ease: "backOut", duration: 0 }}
      />
      <motion.div
        className="cursor-outline fixed top-0 left-0 border border-white/50 rounded-full pointer-events-none z-[9998]"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
    </>
  );
};

export default CustomCursor;