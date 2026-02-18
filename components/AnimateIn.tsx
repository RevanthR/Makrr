"use client";

import { useEffect, useRef, useState, Children } from "react";

type AnimateInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  rootMargin?: string;
  once?: boolean;
};

export function AnimateIn({
  children,
  className = "",
  delay = 0,
  stagger = 0,
  rootMargin = "0px 0px -40px 0px",
  once = true,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const t = setTimeout(() => setVisible(true), delay);
          return () => clearTimeout(t);
        }
        if (!once) setVisible(false);
      },
      { threshold: 0.1, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, once, rootMargin]);

  const useStagger = stagger > 0;
  const content = useStagger
    ? Children.map(children, (child, i) => (
        <div
          className="animate-in-item"
          style={{ animationDelay: visible ? `${i * stagger}ms` : "0ms" }}
        >
          {child}
        </div>
      ))
    : children;

  return (
    <div
      ref={ref}
      className={`animate-in-wrap ${visible ? "animate-in-visible" : ""} ${className}`}
    >
      {content}
    </div>
  );
}
