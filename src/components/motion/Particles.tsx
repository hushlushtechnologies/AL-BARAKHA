"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

type Props = { count?: number; className?: string };

type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  phase: number;
  speed: number;
};

export function Particles({ count = 70, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduce) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let raf = 0;
    let running = false;
    let particles: Particle[] = [];

    const spawn = (initial: boolean): Particle => {
      // Average of 3 randoms clusters particles towards the horizontal center
      const spread = (Math.random() + Math.random() + Math.random()) / 3;
      return {
        x: spread * width,
        y: initial ? Math.random() * height : height + 20,
        r: Math.random() < 0.15 ? 3 + Math.random() * 4 : 0.8 + Math.random() * 1.8,
        vx: (Math.random() - 0.5) * 0.2,
        vy: 0.15 + Math.random() * 0.45,
        phase: Math.random() * Math.PI * 2,
        speed: 0.01 + Math.random() * 0.02,
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: count }, () => spawn(true));
    };

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y -= p.vy;
        p.phase += p.speed;
        if (p.y < -20) Object.assign(p, spawn(false));

        const twinkle = 0.45 + Math.sin(p.phase) * 0.35;
        const fadeTop = Math.max(0, Math.min(1, p.y / (height * 0.25)));
        const alpha = twinkle * fadeTop;
        const radius = p.r * 3;

        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
        glow.addColorStop(0, `rgba(95, 240, 191, ${alpha})`);
        glow.addColorStop(0.4, `rgba(35, 226, 155, ${alpha * 0.6})`);
        glow.addColorStop(1, "rgba(35, 226, 155, 0)");

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Only animate while visible
    const io = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (running) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [count, reduce]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}