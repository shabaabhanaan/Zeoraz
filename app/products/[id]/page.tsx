"use client";

import { useCart } from "@/lib/cart";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useState, use } from "react";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { addToCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  // Mock data for now since we don't have a backend to fetch from reliably 
  const product = {
    id: parseInt(id),
    name: "Premium Technology Item " + id,
    price: 999.00,
    description: "Experience the pinnacle of innovation with this premium tech product. Designed for those who demand excellence.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"
  };

  const handleAddToCart = () => {
    if (!session) {
      router.push("/auth/signin");
      return;
    }
    addToCart({
      id: product.id,
      title: product.name,
      price: product.price,
      image: product.image
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (!session) {
      router.push("/auth/signin");
      return;
    }
    addToCart({
      id: product.id,
      title: product.name,
      price: product.price,
      image: product.image
    });
    router.push("/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Gallery */}
        <div className="glass-panel p-4 rounded-[40px] border border-white/10 overflow-hidden group">
          <div className="aspect-square rounded-[32px] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Info */}
        <div className="space-y-8">
          <div className="space-y-4">
            <nav className="flex gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
              <span>Collection</span>
              <span>/</span>
              <span className="text-indigo-400">General Artifacts</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight italic tracking-tight">{product.name}</h1>
            <div className="flex items-center gap-4">
              <p className="text-3xl font-black text-white tracking-tighter">${product.price.toLocaleString()}</p>
              <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest rounded-lg border border-emerald-500/20">
                Optimised Stock
              </div>
            </div>
          </div>

          <p className="text-gray-400 text-lg leading-relaxed font-medium">{product.description}</p>

          <div className="space-y-4 pt-4">
            <button
              onClick={handleAddToCart}
              className={`w-full py-5 text-white font-black rounded-2xl shadow-xl transition-all active:scale-95 text-xs uppercase tracking-[0.2em] ${added ? "bg-emerald-500 shadow-emerald-500/20" : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20"
                }`}
            >
              {added ? "✓ Product Initialised in Cart" : "Add to Acquisition"}
            </button>
            <button
              onClick={handleBuyNow}
              className="w-full py-5 glass-panel text-white font-black rounded-2xl hover:bg-white/5 transition border border-white/10 text-xs uppercase tracking-[0.2em]"
            >
              Instant Secure Checkout
            </button>
          </div>

          {/* Vendor Info Component Placeholder */}
          <div className="pt-10 border-t border-white/5">
            <div className="flex items-center gap-4 p-6 glass-card rounded-[24px]">
              <div className="w-12 h-12 rounded-full bg-indigo-600/20 border border-indigo-500/10 flex items-center justify-center text-xl">🏬</div>
              <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none mb-2">Verified Vendor</p>
                <p className="text-sm font-bold text-white leading-none">Elite Global Merchants <span className="text-indigo-400 ml-1">✓</span></p>
              </div>
              <button className="ml-auto text-[10px] font-black text-indigo-400 hover:text-indigo-300 uppercase tracking-widest transition">Visit Store →</button>
            </div>
          </div>

          <div className="flex items-center gap-3 px-4">
            <span className="text-emerald-500 text-sm">🛡️</span>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Garanteed Authenticity & Secure Transaction</p>
          </div>
        </div>
      </div>
    </div>
  );
}
