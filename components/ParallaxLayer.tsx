'use client';

import { useEffect, useRef, useState } from 'react';

interface ParallaxLayerProps {
    children: React.ReactNode;
    speed?: number;
    className?: string;
    depth?: number;
}

export default function ParallaxLayer({
    children,
    speed = 0.5,
    className = '',
    depth = 0
}: ParallaxLayerProps) {
    const layerRef = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!layerRef.current) return;

            const scrolled = window.scrollY;
            const rect = layerRef.current.getBoundingClientRect();
            const elementTop = rect.top + scrolled;
            const elementHeight = rect.height;
            const viewportHeight = window.innerHeight;

            // Calculate parallax offset
            const scrollProgress = (scrolled - elementTop + viewportHeight) / (elementHeight + viewportHeight);
            const parallaxOffset = scrollProgress * 100 * speed;

            setOffset(parallaxOffset);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial calculation

        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    return (
        <div
            ref={layerRef}
            className={`parallax-layer ${className}`}
            style={{
                transform: `translateY(${offset}px) translateZ(${depth}px)`,
                transformStyle: 'preserve-3d',
                willChange: 'transform',
            }}
        >
            {children}
        </div>
    );
}
