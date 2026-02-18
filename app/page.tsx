import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import GoogleMap from "@/components/GoogleMap";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getActiveProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let session = null;
  try {
    session = await auth();
  } catch (err) {
    console.error("Auth session fetch error", err);
  }

  if (session) {
    redirect("/dashboard/user");
  }

  const products = await getActiveProducts();

  const vendors = [
    { name: "Apple", color: "from-gray-700 to-black" },
    { name: "Samsung", color: "from-blue-700 to-blue-900" },
    { name: "Sony", color: "from-gray-600 to-black" },
    { name: "Nintendo", color: "from-red-600 to-red-900" },
    { name: "Microsoft", color: "from-cyan-600 to-blue-900" },
    { name: "Google", color: "from-purple-600 to-indigo-900" },
  ];

  const features = [
    { icon: "🔒", title: "Secure Payments", description: "Military-grade encryption for every transaction." },
    { icon: "⚡", title: "Lightning Delivery", description: "Next-day delivery on most premium products." },
    { icon: "✅", title: "Verified Vendors", description: "Every seller is vetted for quality and trust." },
    { icon: "🔄", title: "Hassle-Free Returns", description: "30-day money-back guarantee, no questions." }
  ];

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-purple-500/10 blur-[120px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-center lg:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 max-w-2xl mx-auto lg:mx-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black text-indigo-300 animate-fade-in uppercase tracking-[0.2em]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Experience the Zeoraz ecosystem
              </div>

              <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter text-white animate-fade-up">
                Future <br />
                <span className="gradient-text">Obsessed.</span>
              </h1>

              <p className="text-xl text-gray-400 leading-relaxed animate-fade-up max-w-lg mx-auto lg:mx-0 font-medium" style={{ animationDelay: '0.1s' }}>
                Zeoraz is the world's most curated marketplace for high-end electronics,
                connecting elite vendors with discerning buyers.
              </p>

              <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start animate-fade-up" style={{ animationDelay: '0.2s' }}>
                <Link href="/products" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-600/20 transition-all hover:-translate-y-1 active:scale-95">
                  Explore Now
                </Link>
                <Link href="/auth/register" className="px-8 py-4 glass-panel text-white font-bold rounded-2xl transition-all hover:-translate-y-1 border border-white/10 text-center">
                  Sell with Us
                </Link>
              </div>

              {/* Stats */}
              <div className="pt-12 border-t border-white/5 flex justify-center lg:justify-start gap-12 animate-fade-up" style={{ animationDelay: '0.3s' }}>
                <div>
                  <p className="text-2xl font-black text-white">50K+</p>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1">Vendors</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-white">2.5M+</p>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1">Users</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-white">$100M+</p>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1">Volume</p>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative animate-fade-in hidden lg:block" style={{ animationDelay: '0.4s' }}>
              <div className="relative z-10 glass-panel p-4 rounded-[40px] border border-white/10 overflow-hidden group">
                <div className="aspect-[4/5] rounded-[32px] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80"
                    alt="Premium Global Marketplace"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute top-10 -right-8 glass-panel p-4 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 text-xs font-bold">✓</div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 leading-none mb-1 uppercase tracking-tight">Authenticity</p>
                      <p className="text-xs font-bold text-white leading-none">Verified Secure</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-indigo-600/20 blur-[80px] rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[10px] uppercase tracking-[0.5em] font-black text-gray-500 mb-8 px-4">CURATED BY TECH GIANTS</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-20 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
            {vendors.map(v => (
              <div key={v.name} className="flex items-center gap-2 cursor-default group/brand">
                <span className="font-black text-xl text-white tracking-tighter group-hover/brand:text-indigo-400 transition-colors">{v.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">The <span className="gradient-text">Anthology</span></h2>
            <p className="text-gray-400 max-w-md text-lg">A hand-picked selection of high-performance tech from our most trusted partners.</p>
          </div>
          <Link href="/products" className="group flex items-center gap-2 text-sm font-bold text-white hover:text-indigo-400 transition uppercase tracking-widest bg-white/5 px-6 py-3 rounded-full border border-white/10 hover:border-indigo-500/50">
            View Collection <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p: any, i: number) => (
            <div key={p.id} className="animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <ProductCard {...p} />
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-32 bg-white/[0.01] border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">The <span className="gradient-text">Zeoraz Standard</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-xl leading-relaxed font-medium">We define the infrastructure for the next generation of global commerce.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div key={i} className="glass-card p-8 rounded-3xl group transition-all duration-500" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-14 h-14 bg-indigo-600/10 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-500">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed font-medium">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Infrastructure Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full"></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
          <div className="lg:col-span-1 space-y-8">
            <div className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.5em]">Network Topology</div>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
              Global <br />
              <span className="gradient-text">Reach.</span>
            </h2>
            <p className="text-gray-400 text-lg font-medium leading-relaxed">
              Zeoraz operates on a high-availability global network, linking elite vendors
              and discerning buyers across 140+ countries. Our infrastructure ensures
              latency-free commerce.
            </p>

            <div className="space-y-4 pt-4">
              {[
                { label: "Data Nodes", value: "34" },
                { label: "Transit Hubs", value: "112" },
                { label: "Uptime", value: "99.99%" }
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4">
                  <span className="text-gray-500 text-xs font-black uppercase tracking-widest">{stat.label}</span>
                  <span className="text-white font-black">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <GoogleMap />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl">
          <div className="absolute inset-0 bg-indigo-600/10 blur-[150px] rounded-full"></div>
        </div>

        <div className="relative max-w-5xl mx-auto glass-panel p-12 md:p-24 rounded-[40px] text-center border border-white/10">
          <h2 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter italic">Join the Elite.</h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Step into the future of commerce. Join thousands of pioneers already trading on Zeoraz.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/auth/register" className="px-12 py-5 bg-white text-black font-black rounded-2xl hover:bg-indigo-50 transition active:scale-95 shadow-2xl shadow-white/10 text-lg">
              Start Shopping
            </Link>
            <Link href="/auth/register" className="px-12 py-5 glass-panel text-white font-black rounded-2xl transition border border-white/10 text-lg">
              Partner with Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
