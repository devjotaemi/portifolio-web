import React, { useRef, useState, useEffect } from "react";
import "./index.css";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";

interface ParallaxTextProps {
  children: string;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxTextProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();

  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(
    smoothVelocity,
    [0, 1000],
    [0, 5],
    { clamp: false }
  );

  const x = useTransform(baseX, (v) => `${wrap(-45, -20, v)}%`);

  const directionFactor = useRef<number>(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex">
      <motion.div
  className="font-display font-bold text-6xl md:text-9xl tracking-tighter uppercase flex whitespace-nowrap text-white shadow-text"
  style={{ x }}
>
      
        {[...Array(4)].map((_, i) => (
          <span key={i} className="block mr-12">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

const Hero: React.FC = () => {
  const { scrollYProgress } = useScroll();

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [videoReady, setVideoReady] = useState(false);
  const [allowVideo, setAllowVideo] = useState(true);

  useEffect(() => {
    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection;

    if (connection?.effectiveType?.includes("2g")) {
      setAllowVideo(false);
    }
  }, []);

  return (
    <section className="relative h-screen flex flex-col justify-center overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">

        {/* IMAGEM */}
        <img
          src="/bg.webp"
          alt=""
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
            videoReady ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* VIDEO */}
        {allowVideo && (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onCanPlayThrough={() => setVideoReady(true)}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src="/bg.mp4" type="video/mp4" />
          </video>
        )}

        {/* FADE PRETO */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-black pointer-events-none" />
      </div>

      {/* EFEITOS */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px]" />
      </motion.div>

      {/* TEXTO */}
      <div className="relative z-10 space-y-8 md:space-y-16 py-20">
        <ParallaxText baseVelocity={-2}>
          Creative Developer
        </ParallaxText>

        <ParallaxText baseVelocity={2}>
          Interface Designer
        </ParallaxText>
      </div>

      {/* SCROLL */}
      <motion.div
        style={{ scale }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white to-transparent animate-pulse" />
        <span className="text-xs uppercase tracking-[0.3em] text-gray-400">
          Scroll
        </span>
      </motion.div>

    </section>
  );
};

export default Hero;