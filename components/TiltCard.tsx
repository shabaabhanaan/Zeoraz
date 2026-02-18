'use client';

import { useRef, useState, MouseEvent } from 'react';

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    intensity?: number;
    scale?: number;
    glare?: boolean;
}

export default function TiltCard({
    children,
    className = '',
    intensity = 15,
    scale = 1.05,
    glare = true
}: TiltCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateXValue = ((y - centerY) / centerY) * -intensity;
        const rotateYValue = ((x - centerX) / centerX) * intensity;

        setRotateX(rotateXValue);
        setRotateY(rotateYValue);

        if (glare) {
            const glareX = (x / rect.width) * 100;
            const glareY = (y / rect.height) * 100;
            setGlarePos({ x: glareX, y: glareY });
        }
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
        setGlarePos({ x: 50, y: 50 });
    };

    return (
        <div
            ref={cardRef}
            className={`relative ${className}`}
            style={{
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${rotateX !== 0 || rotateY !== 0 ? scale : 1})`,
                transition: 'transform 0.1s ease-out',
                transformStyle: 'preserve-3d',
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}

            {glare && (
                <div
                    className="absolute inset-0 pointer-events-none rounded-inherit overflow-hidden"
                    style={{
                        background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.15) 0%, transparent 50%)`,
                        opacity: rotateX !== 0 || rotateY !== 0 ? 1 : 0,
                        transition: 'opacity 0.3s ease-out',
                    }}
                />
            )}
        </div>
    );
}
