"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function SellerDashboard() {
  const [stats, setStats] = useState<{ totalRevenue: number; orderCount: number } | null>(null);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [vendorProfile, setVendorProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch("/api/seller/dashboard");
        const data = await res.json();

        if (data) {
          setStats(data.stats || { totalRevenue: 0, orderCount: 0 });
          setRecentOrders(data.orders || []);
          setProducts(data.products || []);
          setVendorProfile(data.vendorProfile || null);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
        setRecentOrders([]);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 animate-fade-in space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-4">
          <div className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.5em] mb-2">Merchant Terminal</div>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none">
            {vendorProfile?.storeName || "Seller"} <span className="gradient-text">Command</span>
          </h1>
          <p className="text-gray-400 text-xl font-medium">{vendorProfile?.description || "Manage your operations within the Zeoraz network."}</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/dashboard/seller/add-product"
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-2xl text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-3"
          >
            <span>➕</span> Add New Product
          </Link>
          <Link
            href="/dashboard/seller/store-settings"
            className="px-8 py-3 glass-panel rounded-2xl text-sm font-black uppercase tracking-widest text-white hover:bg-white/5 border border-white/10 transition-all flex items-center gap-3"
          >
            <span>⚙️</span> Store Settings
          </Link>
          <Link
            href="/dashboard/user"
            className="px-8 py-3 glass-panel rounded-2xl text-sm font-black uppercase tracking-widest text-white hover:bg-white/5 border border-white/10 transition-all flex items-center gap-3"
          >
            <span>👤</span> Switch to Customer
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: "Total Revenue", value: `$${stats?.totalRevenue?.toLocaleString() || "0.00"}`, icon: "💰" },
          { label: "Active Orders", value: stats?.orderCount || 0, icon: "📦" },
          { label: "Product Listing", value: products?.length || 0, icon: "🏪" },
        ].map((item, i) => (
          <div key={i} className="glass-panel p-8 rounded-[32px] border border-white/5 group hover:border-indigo-500/30 transition-all">
            <div className="text-3xl mb-4">{item.icon}</div>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{item.label}</p>
            <p className="text-4xl font-black text-white tracking-tighter">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="glass-panel p-10 rounded-[40px] border border-white/5">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-white">Recent Activity</h2>
          </div>
          <div className="space-y-4">
            {recentOrders?.length > 0 ? (
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="glass-card p-4 rounded-2xl flex justify-between items-center border-white/5 hover:border-indigo-500/30">
                    <div>
                      <p className="text-sm font-bold text-white">{order.customerName}</p>
                      <p className="text-[10px] text-gray-500 uppercase font-black">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-indigo-400">${order.amount.toFixed(2)}</p>
                      <p className={`text-[9px] font-black px-2 py-0.5 rounded-full inline-block uppercase ${order.status === 'PAID' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                        }`}>{order.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-10 text-center border-2 border-dashed border-white/5 rounded-3xl">
                <p className="text-gray-500 italic text-sm">No recent transactions detected.</p>
              </div>
            )}
          </div>
        </div>

        <div className="glass-panel p-10 rounded-[40px] border border-white/5">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-white">Inventory</h2>
            <Link href="/dashboard/seller/add-product" className="text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:underline">
              Deploy New +
            </Link>
          </div>
          <div className="space-y-4">
            {products?.length > 0 ? (
              <div className="grid grid-cols-1 gap-3">
                {products.map((product) => (
                  <div key={product.id} className="glass-card p-4 rounded-2xl flex items-center gap-4 border-white/5 group hover:border-indigo-500/30">
                    <div className="w-12 h-12 rounded-xl bg-indigo-600/10 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                      {product.stock > 0 ? '📦' : '⚠️'}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">{product.name}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">${product.price.toFixed(2)}</span>
                        <span className={`text-[10px] font-black uppercase ${product.stock < 10 ? 'text-rose-500' : 'text-emerald-500'}`}>
                          {product.stock} Units
                        </span>
                      </div>
                    </div>
                    <button className="text-gray-600 hover:text-white transition">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl space-y-4">
                <p className="text-gray-500 italic text-sm">Inventory stores are currently empty.</p>
                <Link
                  href="/dashboard/seller/add-product"
                  className="inline-block px-6 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-gray-200 transition"
                >
                  List First Product
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
