import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  targetRadius: number;
  alpha: number;
  pulseSpeed: number;
  pulsePhase: number;
}

export default function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let nodes: Node[] = [];
    const maxNodes = 40;
    const connectionDist = 120;

    const handleResize = () => {
      const rect = containerRef.current?.getBoundingClientRect() || { width: window.innerWidth, height: 600 };
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };

    // Initialize nodes
    const initNodes = () => {
      const rect = containerRef.current?.getBoundingClientRect() || { width: window.innerWidth, height: 600 };
      nodes = [];
      for (let i = 0; i < maxNodes; i++) {
        nodes.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          // Upward drift (negative vy) to represent career upgrade / growth
          vx: (Math.random() - 0.5) * 0.2,
          vy: -0.15 - Math.random() * 0.35,
          radius: 1 + Math.random() * 2,
          targetRadius: 1 + Math.random() * 2,
          alpha: 0.15 + Math.random() * 0.3,
          pulseSpeed: 0.01 + Math.random() * 0.02,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    initNodes();

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    const parent = containerRef.current;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove, { passive: true });
      parent.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    }

    const render = () => {
      const rect = containerRef.current?.getBoundingClientRect() || { width: window.innerWidth, height: 600 };
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Dampen mouse movement for incredibly fluid, high-end organic latency
      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.08;
      m.y += (m.targetY - m.y) * 0.08;

      // Draw subtle isometric blueprint grid lines in background
      ctx.strokeStyle = "rgba(17, 17, 17, 0.015)";
      ctx.lineWidth = 0.5;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw elegant dynamic mathematical sine wave at the bottom to represent industry waves
      ctx.beginPath();
      ctx.strokeStyle = "rgba(17, 17, 17, 0.02)";
      ctx.lineWidth = 1;
      const time = Date.now() * 0.0004;
      for (let x = 0; x < width; x += 5) {
        // Double sine wave modulation
        const y = height * 0.75 + Math.sin(x * 0.003 + time) * 15 + Math.sin(x * 0.01 - time * 1.5) * 5;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Update and Draw Nodes
      nodes.forEach((node) => {
        // Apply forces
        node.x += node.vx;
        node.y += node.vy;

        // Pulse effect for nodes
        node.pulsePhase += node.pulseSpeed;
        const scale = 0.7 + Math.sin(node.pulsePhase) * 0.3;
        const currentRadius = node.radius * scale;

        // Warp nodes when they go off the top (re-introduce at bottom)
        if (node.y < -10) {
          node.y = height + 10;
          node.x = Math.random() * width;
        }
        if (node.x < -10) node.x = width + 10;
        if (node.x > width + 10) node.x = -10;

        // Interactive mouse push/pull
        const dx = node.x - m.x;
        const dy = node.y - m.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          // Softly push node away from cursor
          const force = (150 - dist) / 150;
          const angle = Math.atan2(dy, dx);
          node.x += Math.cos(angle) * force * 1.2;
          node.y += Math.sin(angle) * force * 1.2;
        }

        // Draw node
        ctx.fillStyle = `rgba(17, 17, 17, ${node.alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();

        // Check distance to other nodes to draw connecting web paths
        for (let j = 0; j < nodes.length; j++) {
          const other = nodes[j];
          if (node === other) continue;

          const nDx = node.x - other.x;
          const nDy = node.y - other.y;
          const nDist = Math.sqrt(nDx * nDx + nDy * nDy);

          if (nDist < connectionDist) {
            const alphaFactor = (1 - nDist / connectionDist) * 0.06;
            ctx.strokeStyle = `rgba(17, 17, 17, ${alphaFactor})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }

        // Draw connection to cursor if close enough
        if (dist < 120) {
          const alphaFactor = (1 - dist / 120) * 0.08;
          ctx.strokeStyle = `rgba(37, 99, 235, ${alphaFactor})`; // Minimal elegant soft blue connection
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(m.x, m.y);
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0"
    >
      <canvas
        ref={canvasRef}
        className="block"
      />
    </div>
  );
}
