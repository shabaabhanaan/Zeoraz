"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function UserDashboard() {
  const { data: session } = useSession();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("/api/users/dashboard");
        const json = await res.json();
        if (json.success) {
          setData(json);
        }
      } catch (err) {
        console.error("Dashboard load error", err);
      } finally {
        setLoading(false);
      }
    };
    if (session) fetchDashboard();
  }, [session]);

  const orderHistory = data?.orders || [];
  const wishlist = data?.wishlist || [];
  const stats = data?.stats || { totalSpent: 0, activeOrders: 0, rewardsPoints: 0 };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-indigo-600/20 border-2 border-indigo-500/30 flex items-center justify-center text-3xl overflow-hidden shadow-2xl shadow-indigo-500/10">
            {session?.user?.image ? (
              <img src={session.user.image} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span>👤</span>
            )}
          </div>
          <div>
            <h1 className="text-4xl font-black text-white mb-1">Welcome, <span className="gradient-text">{session?.user?.name?.split(" ")[0] || "User"}</span></h1>
            <p className="text-gray-400 font-medium">Manage your real orders and profile settings.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/seller" className="px-6 py-2.5 bg-indigo-600 text-white text-sm rounded-xl font-bold hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-600/20 flex items-center gap-2">
            <span>🏪</span> Become a Seller
          </Link>
          <button className="px-6 py-2.5 bg-white text-black text-sm rounded-xl font-bold hover:bg-gray-200 transition-all active:scale-95 shadow-lg shadow-white/5">
            Edit Profile
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-white/5 hover:border-indigo-500/30 transition-all group">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-indigo-600/10 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">💰</div>
            <div>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Total Spent</p>
              <p className="text-xl font-black text-white">${stats.totalSpent.toFixed(2)}</p>
            </div>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 w-[65%]" />
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/5 hover:border-indigo-500/30 transition-all group">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-indigo-600/10 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">📦</div>
            <div>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Active Orders</p>
              <p className="text-xl font-black text-white">{stats.activeOrders} Shipments</p>
            </div>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-[85%]" />
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/5 hover:border-indigo-500/30 transition-all group">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-indigo-600/10 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">✨</div>
            <div>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Rewards Points</p>
              <p className="text-xl font-black text-white">{stats.rewardsPoints} Pts</p>
            </div>
          </div>
          <p className="text-[10px] text-indigo-400 font-bold mt-2">Loyalty status: Diamond</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order History */}
        <div className="lg:col-span-2 glass-panel rounded-3xl overflow-hidden border border-white/5">
          <div className="px-6 py-6 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Recent Purchases</h2>
            <Link href="/dashboard/user/orders" className="text-indigo-400 text-xs font-bold hover:text-indigo-300 transition uppercase tracking-widest">Full History</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/[0.02]">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Order</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Total</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orderHistory.length > 0 ? orderHistory.map((order: any) => (
                  <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl group-hover:scale-110 transition-transform">{order.image}</span>
                        <div>
                          <p className="text-sm font-bold text-white group-hover:text-indigo-400 transition">{order.product}</p>
                          <p className="text-[10px] text-gray-500 font-medium uppercase">{order.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400 font-medium">{order.date}</td>
                    <td className="px-6 py-4 text-sm font-bold text-white">{order.total}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${["DELIVERED", "Delivered"].includes(order.status) ? "bg-emerald-500/10 text-emerald-500" :
                        ["SHIPPED", "In Transit"].includes(order.status) ? "bg-indigo-500/10 text-indigo-400" :
                          "bg-amber-500/10 text-amber-500"
                        }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-gray-500 italic">No orders found. Start shopping to see your history!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Wishlist Sidebar */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Wishlist</h3>
              <span className="text-[10px] bg-white/5 text-gray-400 px-2 py-1 rounded-md font-bold">{wishlist.length} Items</span>
            </div>
            <div className="space-y-4">
              {wishlist.length > 0 ? wishlist.map((item: any) => (
                <div key={item.id} className="flex gap-4 p-3 glass-card rounded-2xl hover:border-indigo-500/30 transition group">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">🎁</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white truncate">{item.title}</p>
                    <p className="text-xs text-indigo-400 font-black mt-1">{item.price}</p>
                  </div>
                  <button className="text-gray-500 hover:text-white transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              )) : (
                <p className="text-xs text-gray-500 italic py-4">Your wishlist is empty.</p>
              )}
            </div>
            {wishlist.length > 0 && (
              <button className="w-full mt-6 py-3 glass-panel rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white hover:bg-white/5 transition border border-white/5">
                View All Wishlist
              </button>
            )}
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-white/5 bg-gradient-to-br from-indigo-600/20 to-transparent">
            <h3 className="text-lg font-bold text-white mb-2">Support Level</h3>
            <p className="text-xs text-gray-400 mb-6 font-medium">Premium Member since 2026</p>
            <div className="p-4 glass-card rounded-2xl border-indigo-500/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400 text-lg">💎</div>
                <div>
                  <p className="text-[10px] font-black text-white uppercase tracking-wider">Priority Access</p>
                  <p className="text-[10px] text-indigo-400 font-bold">Enabled</p>
                </div>
              </div>
              <p className="text-[10px] text-gray-500 leading-relaxed font-medium">You have 24/7 access to our premium support channels and early access to new drops.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
