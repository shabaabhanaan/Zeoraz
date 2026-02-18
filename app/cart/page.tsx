"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, total, itemCount } = useCart();

  const shipping = total > 500 || itemCount === 0 ? 0 : 25.00;
  const tax = total * 0.08;
  const finalTotal = total + shipping + tax;

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-4">
          <div className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.5em] mb-2">Pending Selection</div>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-2 tracking-tighter leading-none">Your <span className="gradient-text">Manifest</span></h1>
          <p className="text-gray-400 text-xl font-medium">Review your curated technology selections.</p>
        </div>
        <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">
          {itemCount} Items Selected
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-4">
          {cart.length > 0 ? (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="glass-panel p-6 rounded-3xl border border-white/5 flex flex-col sm:flex-row gap-6 group hover:border-indigo-500/30 transition-all duration-500">
                  <div className="w-full sm:w-32 h-32 bg-white/5 rounded-2xl flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-500">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl">📦</span>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition">{item.title}</h3>
                        <p className="text-lg font-black text-white">${(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-4">Quantity: {item.quantity}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 p-1 bg-white/5 border border-white/10 rounded-xl">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs font-black text-rose-500 uppercase tracking-widest hover:bg-rose-500/10 px-4 py-2 rounded-xl transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-panel p-20 rounded-[40px] text-center border-dashed border-white/10">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">🛒</div>
              <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
              <p className="text-gray-500 mb-8 max-w-xs mx-auto">Looks like you haven't added any premium tech to your collection yet.</p>
              <Link href="/products" className="inline-block px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-600/20 transition-all active:scale-95">
                Start Shopping
              </Link>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="glass-panel p-8 rounded-[40px] border border-white/5 sticky top-32">
            <h2 className="text-2xl font-black text-white mb-8 italic">Summary</h2>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-bold uppercase tracking-widest">Subtotal</span>
                <span className="text-white font-black">${total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-bold uppercase tracking-widest">Estimated Shipping</span>
                <span className={`font-black ${shipping === 0 ? "text-emerald-500" : "text-white"}`}>
                  {shipping === 0 ? "FREE" : `$${shipping.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-bold uppercase tracking-widest">Estimated Tax</span>
                <span className="text-white font-black">${tax.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 mb-10">
              <div className="flex justify-between items-end">
                <span className="text-xs font-black text-white uppercase tracking-widest">Total Amount</span>
                <span className="text-3xl font-black text-white tracking-tighter">${finalTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-4">
              {itemCount > 0 ? (
                <Link href="/checkout" className="block w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl text-center shadow-2xl shadow-indigo-600/20 transition-all active:scale-95 uppercase tracking-widest text-xs">
                  Proceed to Checkout
                </Link>
              ) : (
                <button disabled className="w-full py-5 bg-white/5 text-gray-500 font-black rounded-2xl text-center cursor-not-allowed uppercase tracking-widest text-xs border border-white/5">
                  Cart Empty
                </button>
              )}
              <Link href="/products" className="block w-full py-5 glass-card rounded-2xl text-center font-black text-xs uppercase tracking-widest text-gray-400 hover:text-white transition">
                Continue Shopping
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-3 p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
              <span className="text-emerald-500 text-xl">🛡️</span>
              <p className="text-[10px] text-gray-400 leading-tight font-medium">
                Your purchase is protected by our <span className="text-emerald-500 font-bold">SafeTrade Guarantee</span> with 30-day money back.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
