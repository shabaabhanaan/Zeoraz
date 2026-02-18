'use client';

import { useEffect, useRef } from 'react';

export default function Scene3DBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle system for 3D depth effect
        class Particle {
            x: number;
            y: number;
            z: number;
            vz: number;
            color: string;
            size: number;

            constructor(w: number, h: number) {
                this.x = Math.random() * w - w / 2;
                this.y = Math.random() * h - h / 2;
                this.z = Math.random() * 1000;
                this.vz = Math.random() * 0.5 + 0.1;
                this.color = `rgba(${Math.random() > 0.5 ? '99, 102, 241' : '168, 85, 247'}, ${Math.random() * 0.5 + 0.3})`;
                this.size = Math.random() * 2 + 1;
            }

            update(w: number, h: number) {
                this.z -= this.vz;
                if (this.z <= 0) {
                    this.z = 1000;
                    this.x = Math.random() * w - w / 2;
                    this.y = Math.random() * h - h / 2;
                }
            }

            draw(ctx: CanvasRenderingContext2D, w: number, h: number) {
                const scale = 1000 / (1000 + this.z);
                const x2d = this.x * scale + w / 2;
                const y2d = this.y * scale + h / 2;
                const size = this.size * scale;

                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const particles: Particle[] = [];
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle(canvas.width, canvas.height));
        }

        // Animation loop
        const animate = () => {
            if (!canvas || !ctx) return;
            ctx.fillStyle = 'rgba(2, 6, 23, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update(canvas.width, canvas.height);
                particle.draw(ctx, canvas.width, canvas.height);
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none opacity-30 z-0"
            style={{ mixBlendMode: 'screen' }}
        />
    );
}
