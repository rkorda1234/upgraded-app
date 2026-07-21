import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  rotation: number;
  spin: number;
  decay: number;
}

export default function PointerParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, isMoving: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const colors = [
      "rgba(17, 17, 17, 0.8)",    // Charcoal black
      "rgba(100, 116, 139, 0.6)", // Slate gray
      "rgba(203, 213, 225, 0.7)", // Light gray
      "rgba(255, 255, 255, 0.9)",  // Crisp white
      "rgba(37, 99, 235, 0.4)"    // Minimal soft blue accent
    ];

    const isInteractive = (el: HTMLElement | null): boolean => {
      if (!el) return false;
      const tag = el.tagName;
      if (
        tag === "BUTTON" ||
        tag === "A" ||
        el.classList.contains("cursor-pointer") ||
        el.getAttribute("role") === "button"
      ) {
        return true;
      }
      return isInteractive(el.parentElement);
    };

    const createParticle = (x: number, y: number, forceMultiplier = 1) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = (0.6 + Math.random() * 1.8) * forceMultiplier;
      const size = 3.5 + Math.random() * 3.5; // Slightly smaller and subtle
      const decay = 0.025 + Math.random() * 0.025; // Faster decay so they fade out sooner
      
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size,
        alpha: 0.85, // Slightly lower initial opacity
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: angle, // Rotated to point exactly in the direction of travel
        spin: (Math.random() - 0.5) * 0.06,
        decay
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const m = mouseRef.current;
      m.x = e.clientX;
      m.y = e.clientY;
      
      const target = e.target as HTMLElement;
      const isHovering = isInteractive(target);

      const dx = m.x - m.lastX;
      const dy = m.y - m.lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Emit particles on movement ONLY when hovering over an interactive button/element
      if (isHovering && dist > 6) {
        const count = Math.min(Math.floor(dist / 12), 2);
        for (let i = 0; i < count; i++) {
          const interpX = m.lastX + (dx * (i / count));
          const interpY = m.lastY + (dy * (i / count));
          createParticle(interpX, interpY, 0.8);
        }
      }

      m.lastX = m.x;
      m.lastY = m.y;
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Emit a very subtle burst ONLY when clicking an interactive button/element
      if (isInteractive(target)) {
        for (let i = 0; i < 4; i++) {
          createParticle(e.clientX, e.clientY, 0.6);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.spin;
        p.alpha -= p.decay;

        // If alpha is below 0, remove the particle
        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.alpha;

        // Draw a sleek line arrow shape (similar to the button's icon)
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1.8;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.beginPath();
        // Shaft of the arrow pointing right
        ctx.moveTo(-p.size * 0.6, 0);
        ctx.lineTo(p.size * 0.6, 0);
        // Head of the arrow pointing right
        ctx.moveTo(p.size * 0.1, -p.size * 0.35);
        ctx.lineTo(p.size * 0.6, 0);
        ctx.lineTo(p.size * 0.1, p.size * 0.35);
        ctx.stroke();

        // Optional minimal glow path for depth
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 2;
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="pointer-particles-canvas"
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
    />
  );
}
