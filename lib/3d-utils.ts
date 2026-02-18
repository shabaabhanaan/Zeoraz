'use client';

import { useEffect } from 'react';

/**
 * Custom hook for adding 3D mouse tracking effect to the entire page
 * Creates a subtle parallax effect based on mouse position
 */
export function use3DMouseTracking() {
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;

            // Apply subtle 3D rotation to body based on mouse position
            document.body.style.transform = `
        perspective(1200px) 
        rotateY(${x * 2}deg) 
        rotateX(${-y * 2}deg)
      `;
        };

        const handleMouseLeave = () => {
            document.body.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg)';
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            document.body.style.transform = '';
        };
    }, []);
}

/**
 * Custom hook for element-specific 3D hover effect
 */
export function use3DHoverEffect(ref: React.RefObject<HTMLElement>, intensity: number = 10) {
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -intensity;
            const rotateY = ((x - centerX) / centerX) * intensity;

            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        };

        const handleMouseLeave = () => {
            element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        };

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [ref, intensity]);
}

/**
 * Utility function to calculate 3D perspective based on scroll position
 */
export function getScrollPerspective(scrollY: number, maxRotation: number = 5): string {
    const rotation = (scrollY / window.innerHeight) * maxRotation;
    return `perspective(1200px) rotateX(${rotation}deg)`;
}

/**
 * Utility function to create depth layers based on z-index
 */
export function getDepthLayer(layer: number): React.CSSProperties {
    const depths = {
        1: { transform: 'translateZ(50px)', zIndex: 10 },
        2: { transform: 'translateZ(100px)', zIndex: 20 },
        3: { transform: 'translateZ(150px)', zIndex: 30 },
        back: { transform: 'translateZ(-50px)', zIndex: -10 },
    };

    return depths[layer as keyof typeof depths] || {};
}
