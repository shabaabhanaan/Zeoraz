"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AddProductPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "Electronics",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price),
                    stock: parseInt(formData.stock),
                    sellerId: (session?.user as any)?.id, // In a real app, the API should get this from the session
                }),
            });

            if (res.ok) {
                alert("Product added successfully!");
                router.push("/dashboard/seller");
            } else {
                const data = await res.json();
                alert(data.error || "Failed to add product");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-20 animate-fade-in space-y-12">
            <div className="space-y-4">
                <Link href="/dashboard/seller" className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.5em] mb-4 inline-block hover:underline">
                    ← Back to Dashboard
                </Link>
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
                    Add <span className="gradient-text">Inventory</span>
                </h1>
                <p className="text-gray-400 text-xl font-medium">Deploy new products to the Zeoraz ecosystem.</p>
            </div>

            <div className="glass-panel p-10 rounded-[40px] border border-white/5">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Product Name</label>
                            <input
                                required
                                type="text"
                                placeholder="e.g. Zen-Rest Luxury Sofa or Quantum X Headphones"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full glass-card border-none rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:ring-2 ring-indigo-500/50 outline-none transition"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full glass-card border-none rounded-2xl px-6 py-4 text-white outline-none transition appearance-none"
                            >
                                <option value="Tech & Electronics" className="bg-black">Tech & Electronics</option>
                                <option value="Home & Living" className="bg-black">Home & Living</option>
                                <option value="Fashion & Apparels" className="bg-black">Fashion & Apparels</option>
                                <option value="Beauty & Wellness" className="bg-black">Beauty & Wellness</option>
                                <option value="Gourmet & Provisions" className="bg-black">Gourmet & Provisions</option>
                                <option value="Art & Artifacts" className="bg-black">Art & Artifacts</option>
                                <option value="Outdoor & Sport" className="bg-black">Outdoor & Sport</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Detailed description</label>
                        <textarea
                            required
                            rows={4}
                            placeholder="Describe the unique features, craftsmanship, and specifications of your listing..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full glass-card border-none rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:ring-2 ring-indigo-500/50 outline-none transition resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Price (USD)</label>
                            <input
                                required
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                className="w-full glass-card border-none rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:ring-2 ring-indigo-500/50 outline-none transition"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Stock Units</label>
                            <input
                                required
                                type="number"
                                placeholder="0"
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                className="w-full glass-card border-none rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:ring-2 ring-indigo-500/50 outline-none transition"
                            />
                        </div>
                    </div>

                    <div className="pt-6">
                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full py-5 bg-white text-black font-black rounded-[20px] hover:bg-gray-200 transition-all active:scale-[0.98] shadow-2xl shadow-white/10 uppercase tracking-widest text-xs disabled:opacity-50"
                        >
                            {loading ? "Synchronizing..." : "Publish to Marketplace"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
