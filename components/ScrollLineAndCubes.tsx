"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const CUBE_COUNT = 6;
const LINE_COLOR = "rgb(203 213 225)"; // slate-300, soft but visible
const CUBE_COLOR = "rgb(129 140 248)"; // indigo-400, clean accent
const CUBE_SIZE = 36;
const STROKE = 1.25;

function WireframeCube({ className }: { className?: string }) {
  return (
    <svg
      width={CUBE_SIZE}
      height={CUBE_SIZE}
      viewBox="0 0 28 28"
      fill="none"
      className={className}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 10 L14 6 L22 10 L14 14 Z" stroke={CUBE_COLOR} strokeWidth={STROKE} fill="none" />
      <path d="M6 18 L14 14 L22 18 L14 22 Z" stroke={CUBE_COLOR} strokeWidth={STROKE} fill="none" />
      <line x1="6" y1="10" x2="6" y2="18" stroke={CUBE_COLOR} strokeWidth={STROKE} />
      <line x1="14" y1="6" x2="14" y2="14" stroke={CUBE_COLOR} strokeWidth={STROKE} />
      <line x1="22" y1="10" x2="22" y2="18" stroke={CUBE_COLOR} strokeWidth={STROKE} />
      <line x1="6" y1="10" x2="14" y2="14" stroke={CUBE_COLOR} strokeWidth={STROKE} strokeOpacity={0.8} />
      <line x1="14" y1="14" x2="22" y2="18" stroke={CUBE_COLOR} strokeWidth={STROKE} strokeOpacity={0.8} />
    </svg>
  );
}

function CubeNode({
  index,
  scrollYProgress,
  topPercent,
}: {
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  topPercent: number;
}) {
  const threshold = 0.05 + (index / (CUBE_COUNT - 1)) * 0.82;
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, threshold - 0.15), threshold, Math.min(1, threshold + 0.1)],
    [0, 1, 1]
  );
  const scale = useTransform(
    scrollYProgress,
    [Math.max(0, threshold - 0.12), threshold],
    [0.4, 1]
  );
  return (
    <motion.div
      className="absolute left-1/2 flex -translate-x-1/2 items-center justify-center"
      style={{ top: `${topPercent}%`, opacity, scale }}
    >
      <WireframeCube />
    </motion.div>
  );
}

export function ScrollLineAndCubes() {
  const { scrollYProgress } = useScroll();

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-0 h-screen w-[80px] md:w-[100px]"
      aria-hidden
    >
      {/* Clean 1px vertical line */}
      <div
        className="absolute left-[38px] top-0 h-full w-px md:left-[48px]"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, ${LINE_COLOR} 8%, ${LINE_COLOR} 92%, transparent 100%)`,
        }}
      />
      {Array.from({ length: CUBE_COUNT }).map((_, i) => {
        const topPercent = 10 + (i / (CUBE_COUNT - 1)) * 80;
        return (
          <CubeNode
            key={i}
            index={i}
            scrollYProgress={scrollYProgress}
            topPercent={topPercent}
          />
        );
      })}
    </div>
  );
}
