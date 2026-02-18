"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-t-indigo-500 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!session) return null;

  const menuItems = [
    { label: "My Account", path: "/dashboard/user", icon: "👤" },
    { label: "Seller Hub", path: "/dashboard/seller", icon: "🏪" },
    { label: "Platform Admin", path: "/dashboard/admin", icon: "⚙️" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-72 border-r border-white/5 bg-white/[0.01] backdrop-blur-xl p-6 flex flex-col">
        <div className="mb-10 px-2">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6 px-1">Control Center</p>
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group ${isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                >
                  <span className={`text-xl transition-transform group-hover:scale-110 ${isActive ? '' : 'opacity-50 group-hover:opacity-100'}`}>
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-4 mt-4 border-t border-white/5">
              <Link
                href="/dashboard/seller/add-product"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold bg-white text-black hover:bg-gray-200 transition-all shadow-xl shadow-white/5"
              >
                <span className="text-xl">➕</span>
                List New Product
              </Link>
            </div>
          </nav>
        </div>

        <div className="mt-auto pt-6 border-t border-white/5 px-2">
          <div className="glass-card p-4 rounded-2xl border-indigo-500/10 bg-indigo-500/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-indigo-600/20 flex items-center justify-center text-xs">🚀</div>
              <p className="text-[10px] font-black text-white uppercase tracking-wider">Premium Plan</p>
            </div>
            <p className="text-[10px] text-gray-400 leading-relaxed font-medium mb-4">You have unlimited product listings and 0% platform fees.</p>
            <button className="w-full py-2 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition">Manage Plan</button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
