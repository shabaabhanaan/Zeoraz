import Link from "next/link";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
    const products = [
        { id: 1, title: "Pro Max Flagship Smartphone", price: 1199.99, image: "https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=800" },
        { id: 2, title: "Wireless Noise-Canceling Headphones", price: 349.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800" },
        { id: 3, title: "Smart Watch Pro Series", price: 449.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800" },
        { id: 4, title: "Ultra Fast USB-C Charger", price: 49.99, image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800" },
        { id: 5, title: "Portable Gaming Console", price: 299.99, image: "https://images.unsplash.com/photo-1486572788984-e01132060b47?w=800" },
        { id: 6, title: "4K Web Camera Pro", price: 199.99, image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800" },
        { id: 7, title: "Mechanical RGB Keyboard", price: 149.99, image: "https://images.unsplash.com/photo-1587829191301-41d1c2adfb77?w=800" },
        { id: 8, title: "Wireless Gaming Mouse", price: 79.99, image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800" },
        { id: 9, title: "Curved Gaming Monitor", price: 599.99, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800" },
        { id: 10, title: "Professional Studio Mic", price: 249.99, image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800" },
        { id: 11, title: "VR Headset Elite", price: 799.99, image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800" },
        { id: 12, title: "Smart Home Hub v2", price: 129.99, image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800" },
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 py-20 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20">
                <div className="space-y-4">
                    <div className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.5em] mb-2">Authenticated Collection</div>
                    <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none">
                        The <span className="gradient-text">Catalogue</span>
                    </h1>
                    <p className="text-gray-400 max-w-lg text-xl font-medium leading-relaxed">Curated high-performance technology from verified global partners.</p>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="flex-1 glass-panel px-4 py-3 rounded-2xl flex items-center gap-2 border border-white/5">
                        <span className="text-gray-500">🔍</span>
                        <input type="text" placeholder="Filter collection..." className="bg-transparent text-sm text-white outline-none w-full" />
                    </div>
                    <select className="px-6 py-3 glass-panel rounded-2xl text-sm font-bold text-white bg-transparent border border-white/5 outline-none appearance-none cursor-pointer hover:bg-white/5 transition">
                        <option className="bg-slate-900">Newest</option>
                        <option className="bg-slate-900">Price: Low to High</option>
                        <option className="bg-slate-900">Price: High to Low</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((p, i) => (
                    <div key={p.id} className="animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
                        <ProductCard {...p} />
                    </div>
                ))}
            </div>

            {/* Pagination / Load More */}
            <div className="mt-20 text-center">
                <button className="px-12 py-5 glass-panel rounded-2xl text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white hover:bg-white/5 transition border border-white/10 group">
                    Initialising More Products <span className="inline-block group-hover:translate-x-1 transition-transform ml-2">→</span>
                </button>
            </div>
        </div>
    );
}
