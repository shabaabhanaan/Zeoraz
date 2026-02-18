'use client';

import React from 'react';

export default function GoogleMap() {
    // A stylized dark-themed Google Map embed
    // Using a specific location (Tokyo/Silicon Valley vibe) for the premium marketplace feel
    const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102553.02989100868!2d139.6917!3d35.6895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b8576281c35%3A0x4461f0165b63001!2sTokyo%2C%20Japan!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus&style=feature:all|element:all|invert_lightness:true|saturation:-100|lightness:-50";

    return (
        <div className="relative w-full h-[500px] rounded-[40px] overflow-hidden border border-white/10 glass-panel group">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-indigo-600/5 z-0 group-hover:bg-indigo-600/10 transition-colors duration-700"></div>

            {/* Map Iframe */}
            <iframe
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(1) invert(0.9) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="relative z-10 grayscale-[0.8] opacity-60 group-hover:opacity-80 transition-opacity duration-700 hover:grayscale-0"
            ></iframe>

            {/* Overlay UI elements to make it feel premium */}
            <div className="absolute top-8 left-8 z-20 glass-panel p-6 rounded-3xl border border-white/10 animate-fade-in">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 flex items-center justify-center text-2xl animate-pulse">
                        📍
                    </div>
                    <div>
                        <h4 className="text-white font-black text-sm uppercase tracking-widest">Global Node: Tokyo</h4>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-tighter mt-1">Status: Active & Optimized</p>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-8 right-8 z-20 glass-panel p-4 rounded-2xl border border-white/10 animate-fade-up">
                <div className="flex items-center gap-3">
                    <div className="flex -space-x-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white">
                                {String.fromCharCode(64 + i)}
                            </div>
                        ))}
                    </div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">1.2K+ Partners Nearby</p>
                </div>
            </div>

            {/* Corner Accents */}
            <div className="absolute top-0 right-0 p-4 z-20">
                <div className="w-32 h-[1px] bg-gradient-to-l from-indigo-500/50 to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-0 p-4 z-20">
                <div className="h-32 w-[1px] bg-gradient-to-t from-violet-500/50 to-transparent"></div>
            </div>
        </div>
    );
}
