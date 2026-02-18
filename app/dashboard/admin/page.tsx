"use client";

import Link from "next/link";

export default function AdminDashboard() {
  const stats = [
    {
      label: "Total Revenue",
      value: "$125,450.00",
      change: "+15.2%",
      isPositive: true,
      icon: "💰"
    },
    {
      label: "Total Orders",
      value: "12,890",
      change: "+450",
      isPositive: true,
      icon: "📦"
    },
    {
      label: "Total Users",
      value: "2,450",
      change: "+125",
      isPositive: true,
      icon: "👥"
    },
    {
      label: "Active Sellers",
      value: "385",
      change: "-12",
      isPositive: false,
      icon: "🏪"
    },
  ];

  const recentUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", joinDate: "Jan 15, 2025", status: "Active", avatar: "JD" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", joinDate: "Jan 18, 2025", status: "Active", avatar: "JS" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", joinDate: "Jan 20, 2025", status: "Suspended", avatar: "BJ" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", joinDate: "Jan 21, 2025", status: "Active", avatar: "AB" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white mb-2">Platform <span className="gradient-text">Overview</span></h1>
          <p className="text-gray-400">Manage your marketplace ecosystem and monitor performance metrics.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 glass-panel rounded-xl text-sm font-bold text-white hover:bg-white/5 border border-white/10 transition-all">
            Download Report
          </button>
          <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-xl font-bold shadow-lg shadow-indigo-600/20 transition-all active:scale-95">
            System Settings
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="glass-panel p-6 rounded-3xl border border-white/5 hover:border-indigo-500/30 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-indigo-600/10 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-lg ${stat.isPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-2xl font-black text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 glass-panel rounded-3xl overflow-hidden border border-white/5">
          <div className="px-6 py-6 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Recent Users</h2>
            <Link href="/dashboard/admin/users" className="text-indigo-400 text-xs font-bold hover:text-indigo-300 transition uppercase tracking-widest">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/[0.02]">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">User</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Join Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-[10px] font-bold text-indigo-400">
                          {user.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white group-hover:text-indigo-400 transition">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400 font-medium">{user.joinDate}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${user.status === "Active" ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                        }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-gray-500 hover:text-white transition p-2 hover:bg-white/5 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / Status */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-white/5">
            <h3 className="text-lg font-bold text-white mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-3">
              <button className="flex items-center gap-3 w-full p-4 glass-card rounded-2xl hover:border-indigo-500/30 transition text-left group">
                <span className="text-xl group-hover:scale-110 transition-transform">👤</span>
                <div>
                  <p className="text-sm font-bold text-white">Manage Users</p>
                  <p className="text-[10px] text-gray-500">Edit roles and permissions</p>
                </div>
              </button>
              <button className="flex items-center gap-3 w-full p-4 glass-card rounded-2xl hover:border-indigo-500/30 transition text-left group">
                <span className="text-xl group-hover:scale-110 transition-transform">🏪</span>
                <div>
                  <p className="text-sm font-bold text-white">Verify Sellers</p>
                  <p className="text-[10px] text-gray-500">2 pending applications</p>
                </div>
              </button>
              <button className="flex items-center gap-3 w-full p-4 glass-card rounded-2xl hover:border-rose-500/30 transition text-left group">
                <span className="text-xl group-hover:scale-110 transition-transform">⚠️</span>
                <div>
                  <p className="text-sm font-bold text-white">Reported Data</p>
                  <p className="text-[10px] text-gray-500">Review flagged content</p>
                </div>
              </button>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-white/5 bg-gradient-to-br from-indigo-600/20 to-transparent">
            <h3 className="text-lg font-bold text-white mb-2">System Health</h3>
            <p className="text-xs text-gray-400 mb-6 font-medium">Global infrastructure status</p>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-300">API Gateway</span>
                <span className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-300">Database Cluster</span>
                <span className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-300">Storage Nodes</span>
                <span className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Operational
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
