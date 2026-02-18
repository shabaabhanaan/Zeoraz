'use client';

import { useEffect, useState } from 'react';

interface FloatingElement {
    id: number;
    x: number;
    y: number;
    size: number;
    delay: number;
    duration: number;
    icon: string;
    color: string;
}

export default function FloatingElements() {
    const [elements] = useState<FloatingElement[]>([
        { id: 1, x: 10, y: 20, size: 60, delay: 0, duration: 8, icon: '💎', color: 'from-indigo-500/20 to-purple-500/20' },
        { id: 2, x: 85, y: 15, size: 50, delay: 1, duration: 10, icon: '⚡', color: 'from-cyan-500/20 to-blue-500/20' },
        { id: 3, x: 15, y: 70, size: 55, delay: 2, duration: 9, icon: '🚀', color: 'from-purple-500/20 to-pink-500/20' },
        { id: 4, x: 75, y: 65, size: 45, delay: 0.5, duration: 11, icon: '✨', color: 'from-yellow-500/20 to-orange-500/20' },
        { id: 5, x: 50, y: 40, size: 70, delay: 1.5, duration: 7, icon: '🎯', color: 'from-green-500/20 to-emerald-500/20' },
        { id: 6, x: 30, y: 50, size: 40, delay: 2.5, duration: 12, icon: '🔥', color: 'from-red-500/20 to-orange-500/20' },
    ]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ perspective: '1200px' }}>
            {elements.map((el) => (
                <div
                    key={el.id}
                    className="absolute float-3d"
                    style={{
                        left: `${el.x}%`,
                        top: `${el.y}%`,
                        width: `${el.size}px`,
                        height: `${el.size}px`,
                        animationDelay: `${el.delay}s`,
                        animationDuration: `${el.duration}s`,
                        transformStyle: 'preserve-3d',
                    }}
                >
                    <div className={`w-full h-full rounded-3xl bg-gradient-to-br ${el.color} backdrop-blur-xl border border-white/10 flex items-center justify-center text-3xl shadow-3d`}>
                        {el.icon}
                    </div>
                </div>
            ))}

            {/* Geometric 3D Shapes */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 rotate-3d opacity-20">
                <div className="w-full h-full border-2 border-indigo-500/30 rounded-2xl" style={{ transform: 'rotateX(45deg) rotateY(45deg)' }} />
            </div>

            <div className="absolute bottom-1/3 right-1/4 w-24 h-24 rotate-3d opacity-20" style={{ animationDuration: '15s' }}>
                <div className="w-full h-full border-2 border-purple-500/30 rounded-full" style={{ transform: 'rotateX(60deg) rotateZ(30deg)' }} />
            </div>
        </div>
    );
}
