"use client";

import { useCart } from "@/lib/cart";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {
    id: number;
    title: string;
    price: number;
    image: string;
};

export default function ProductCard({ id, title, price, image }: Props) {
    const { addToCart } = useCart();
    const { data: session } = useSession();
    const router = useRouter();
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        if (!session) {
            router.push("/auth/signin");
            return;
        }
        addToCart({ id, title, price, image });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="group glass-card rounded-3xl p-4 h-full flex flex-col transition-all duration-500">
            {/* Product Image */}
            <div className="aspect-square bg-white/[0.03] rounded-2xl mb-5 flex items-center justify-center overflow-hidden relative border border-white/5">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    <button
                        onClick={handleAdd}
                        className={`w-full py-3 text-xs font-black rounded-xl shadow-2xl transition-all duration-300 active:scale-95 ${added ? "bg-emerald-500 text-white" : "bg-white text-black hover:bg-gray-100"
                            }`}
                    >
                        {added ? "✓ ADDED TO COLLECTION" : "ADD TO COLLECTION"}
                    </button>
                </div>
                {/* Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black text-white rounded-full shadow-2xl uppercase tracking-widest">
                    Elite
                </div>
            </div>

            {/* Product Info */}
            <div className="flex-1 flex flex-col justify-between px-1">
                <div className="mb-4">
                    <h3 className="font-bold text-lg text-white line-clamp-2 leading-tight mb-2 transition-colors">
                        {title}
                    </h3>
                    <div className="flex items-center gap-2">
                        <div className="flex text-indigo-400 text-[10px]">
                            {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
                        </div>
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">42 Reviews</span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div>
                        <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-0.5">Price</p>
                        <p className="text-white font-black text-xl tracking-tighter">
                            ${price.toFixed(2)}
                        </p>
                    </div>
                    <button className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white hover:text-black text-gray-400 rounded-full transition-all duration-500 group/fav border border-white/5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover/fav:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

