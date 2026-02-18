"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { useState } from "react";

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'payhere'>('card');

  const shipping = total > 500 ? 0 : 25.00;
  const tax = total * 0.08;
  const finalTotal = total + shipping + tax;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="glass-panel p-12 rounded-[40px] text-center max-w-lg border border-white/10 animate-fade-up">
          <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center text-4xl mx-auto mb-8 text-emerald-500 shadow-2xl shadow-emerald-500/20">
            ✓
          </div>
          <h1 className="text-4xl font-black text-white mb-4 italic">Success!</h1>
          <p className="text-gray-400 mb-10 leading-relaxed font-medium">
            Your premium tech order has been placed via {paymentMethod === 'card' ? 'Credit Card' : 'PayHere'}. You'll receive a confirmation email shortly.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/dashboard/user" className="px-10 py-4 bg-white text-black font-black rounded-2xl hover:bg-gray-200 transition-all active:scale-95 shadow-xl shadow-white/5">
              Track Order
            </Link>
            <Link href="/" className="px-10 py-4 glass-panel text-white font-bold rounded-2xl hover:bg-white/5 transition-all">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 animate-fade-in">
      <div className="mb-12">
        <div className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.5em] mb-2">Secure Gateway</div>
        <h1 className="text-5xl md:text-8xl font-black text-white mb-4 tracking-tighter leading-none">
          Finalise <span className="gradient-text">Acquisition</span>
        </h1>
        <p className="text-gray-400 text-xl font-medium">Complete your transaction through our encrypted global network.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Details */}
          <div className="glass-panel p-8 md:p-10 rounded-[40px] border border-white/5">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 bg-indigo-600/10 rounded-xl flex items-center justify-center text-xl">🚚</div>
              <h2 className="text-2xl font-bold text-white">Shipping Information</h2>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">First Name</label>
                  <input required type="text" placeholder="John" className="w-full glass-card border-none rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:ring-2 ring-indigo-500/50 outline-none transition" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Last Name</label>
                  <input required type="text" placeholder="Doe" className="w-full glass-card border-none rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:ring-2 ring-indigo-500/50 outline-none transition" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Street Address</label>
                <input required type="text" placeholder="123 Elite Plaza" className="w-full glass-card border-none rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:ring-2 ring-indigo-500/50 outline-none transition" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="col-span-2 md:col-span-1 space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">City</label>
                  <input required type="text" placeholder="New York" className="w-full glass-card border-none rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:ring-2 ring-indigo-500/50 outline-none transition" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">State</label>
                  <input required type="text" placeholder="NY" className="w-full glass-card border-none rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:ring-2 ring-indigo-500/50 outline-none transition" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">ZIP Code</label>
                  <input required type="text" placeholder="10001" className="w-full glass-card border-none rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:ring-2 ring-indigo-500/50 outline-none transition" />
                </div>
              </div>

              {/* Payment Info Simulation */}
              <div className="pt-10 mt-10 border-t border-white/5">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-10 h-10 bg-indigo-600/10 rounded-xl flex items-center justify-center text-xl">💳</div>
                  <h2 className="text-2xl font-bold text-white">Secure Payment</h2>
                </div>

                {/* Payment Method Selection */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${paymentMethod === 'card' ? 'bg-indigo-600 text-white border-indigo-500 shadow-xl shadow-indigo-600/20' : 'glass-card text-gray-400 border-white/5 hover:bg-white/5'}`}
                  >
                    <span className="text-2xl">💳</span>
                    <span className="text-[10px] font-black uppercase tracking-widest">Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('payhere')}
                    className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${paymentMethod === 'payhere' ? 'bg-[#1a9cff] text-white border-[#1a9cff] shadow-xl shadow-sky-500/20' : 'glass-card text-gray-400 border-white/5 hover:bg-white/5'}`}
                  >
                    <span className="text-2xl">💠</span>
                    <span className="text-[10px] font-black uppercase tracking-widest">PayHere</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {paymentMethod === 'card' && (
                    <div className="animate-fade-in space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Card Number</label>
                        <input required type="text" placeholder="•••• •••• •••• ••••" className="w-full glass-card border-none rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:ring-2 ring-indigo-500/50 outline-none transition" />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Expiry Date</label>
                          <input required type="text" placeholder="MM/YY" className="w-full glass-card border-none rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:ring-2 ring-indigo-500/50 outline-none transition" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">CVC</label>
                          <input required type="text" placeholder="•••" className="w-full glass-card border-none rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:ring-2 ring-indigo-500/50 outline-none transition" />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'payhere' && (
                    <div className="animate-fade-in p-6 glass-card rounded-3xl text-center border border-[#1a9cff]/30 bg-[#1a9cff]/5">
                      <div className="w-16 h-16 bg-[#1a9cff]/20 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 text-[#1a9cff]">💠</div>
                      <h3 className="text-lg font-bold text-white mb-2">Pay via PayHere</h3>
                      <p className="text-sm text-gray-400 mb-6">Trusted by thousands of businesses globally. Secure and seamless checkout.</p>
                      <div className="w-full py-4 bg-[#1a9cff] text-white font-bold rounded-2xl shadow-lg shadow-[#1a9cff]/20 cursor-default">
                        Proceed with PayHere
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button type="submit" className="hidden" id="checkout-submit-btn"></button>
            </form>
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-1">
          <div className="glass-panel p-8 rounded-[40px] border border-white/5 sticky top-32">
            <h2 className="text-xl font-bold text-white mb-8">Order Overview</h2>

            <div className="max-h-64 overflow-y-auto mb-8 pr-2 custom-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 mb-4 last:mb-0">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-xl shrink-0">📦</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white truncate">{item.title}</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-xs font-black text-white">${(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4 mb-8 pt-6 border-t border-white/5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500 font-bold uppercase tracking-widest">Subtotal</span>
                <span className="text-white font-black">${total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500 font-bold uppercase tracking-widest">Premium Shipping</span>
                <span className={`font-black ${shipping === 0 ? "text-emerald-500" : "text-white"}`}>{shipping === 0 ? "FREE" : `$${shipping}`}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500 font-bold uppercase tracking-widest">Surcharge (8%)</span>
                <span className="text-white font-black">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 mb-10">
              <div className="flex justify-between items-end">
                <span className="text-xs font-black text-white uppercase tracking-widest">Final Amount</span>
                <span className="text-3xl font-black text-white tracking-tighter">${finalTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => document.getElementById('checkout-submit-btn')?.click()}
              className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl text-center shadow-2xl shadow-indigo-600/20 transition-all active:scale-95 uppercase tracking-widest text-xs"
            >
              Confirm Transaction
            </button>

            <Link href="/cart" className="block w-full mt-4 py-4 text-center text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition">
              Revise Order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
