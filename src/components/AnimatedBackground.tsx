import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  pulseSpeed: number;
}

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animId = 0;
    let frame = 0;

    /* Stars */
    const starCount = Math.min(Math.floor((width * height) / 12000), 120);
    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.3,
        alpha: Math.random() * 0.5 + 0.1,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    /* Golden particles */
    const particleCount = Math.min(Math.floor((width * height) / 22000), 50);
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.5 + 0.8,
        alpha: Math.random() * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    const mouse = { x: -1000, y: -1000 };

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    function draw() {
      frame++;
      ctx!.clearRect(0, 0, width, height);

      /* Stars twinkling */
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const twinkle = Math.sin(frame * s.twinkleSpeed + s.twinklePhase) * 0.3 + 0.7;
        const a = s.alpha * twinkle;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${a})`;
        ctx.fill();
      }

      /* Nebula glow 1 - amber */
      const g1 = ctx.createRadialGradient(width * 0.15, height * 0.1, 0, width * 0.15, height * 0.1, width * 0.35);
      g1.addColorStop(0, 'rgba(245, 158, 11, 0.04)');
      g1.addColorStop(0.4, 'rgba(245, 158, 11, 0.02)');
      g1.addColorStop(1, 'rgba(245, 158, 11, 0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      /* Nebula glow 2 - blue */
      const g2 = ctx.createRadialGradient(width * 0.85, height * 0.7, 0, width * 0.85, height * 0.7, width * 0.3);
      g2.addColorStop(0, 'rgba(59, 130, 246, 0.03)');
      g2.addColorStop(0.4, 'rgba(59, 130, 246, 0.015)');
      g2.addColorStop(1, 'rgba(59, 130, 246, 0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);

      /* Mouse glow */
      if (mouse.x > 0 && mouse.y > 0) {
        const gm = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 180);
        gm.addColorStop(0, 'rgba(245, 158, 11, 0.07)');
        gm.addColorStop(1, 'rgba(245, 158, 11, 0)');
        ctx.fillStyle = gm;
        ctx.fillRect(0, 0, width, height);
      }

      /* Update and draw particles */
      const time = frame;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx + Math.sin(time * 0.005 + p.y * 0.01) * 0.1;
        p.y += p.vy + Math.cos(time * 0.005 + p.x * 0.01) * 0.1;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        /* Pulse alpha */
        const pulseAlpha = Math.sin(time * p.pulseSpeed) * 0.3 + 0.7;

        /* Mouse interaction */
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.x += (dx / dist) * force * 1.2;
          p.y += (dy / dist) * force * 1.2;
        }

        const a = p.alpha * pulseAlpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 158, 11, ${a})`;
        ctx.fill();

        /* Glow ring around larger particles */
        if (p.size > 1.8) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245, 158, 11, ${a * 0.12})`;
          ctx.fill();
        }
      }

      /* Connections between nearby particles */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const a = 0.1 * (1 - dist / 140);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(245, 158, 11, ${a})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    }

    draw();

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseout', onMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseout', onMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 grid-bg-animated opacity-15" />
      {/* Vignette overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/30 via-transparent to-ink-950/10" />
      <div className="pointer-events-none absolute left-0 top-0 h-full w-1/4 bg-gradient-to-r from-ink-950/40 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-ink-950/30 to-transparent" />
      {/* Animated glowing orbs */}
      <div className="pointer-events-none absolute left-[10%] top-[5%] h-[400px] w-[400px] rounded-full bg-amber-500/10 blur-[120px] animate-drift" />
      <div className="pointer-events-none absolute right-[5%] top-[30%] h-[350px] w-[350px] rounded-full bg-blue-500/8 blur-[100px] animate-drift-slow" />
      <div className="pointer-events-none absolute bottom-[10%] left-[30%] h-[450px] w-[450px] rounded-full bg-amber-600/6 blur-[130px] animate-drift" />
    </div>
  );
}

