"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function StoreSettingsPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formData, setFormData] = useState({
        storeName: "",
        description: "",
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch("/api/seller/profile");
                const data = await res.json();
                if (data.profile) {
                    setFormData({
                        storeName: data.profile.storeName || "",
                        description: data.profile.description || "",
                    });
                }
            } catch (err) {
                console.error(err);
            } finally {
                setFetching(false);
            }
        };
        if (session) fetchProfile();
    }, [session]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/seller/profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                alert("Store updated successfully!");
                router.push("/dashboard/seller");
            } else {
                const data = await res.json();
                alert(data.error || "Failed to update store");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-20 animate-fade-in space-y-12">
            <div className="space-y-4">
                <Link href="/dashboard/seller" className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.5em] mb-4 inline-block hover:underline">
                    ← Back to Dashboard
                </Link>
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
                    Market <span className="gradient-text">Identity</span>
                </h1>
                <p className="text-gray-400 text-xl font-medium">Configure your presence in the Zeoraz ecosystem.</p>
            </div>

            <div className="glass-panel p-10 rounded-[40px] border border-white/5">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Market Name (Store Name)</label>
                        <input
                            required
                            type="text"
                            placeholder="e.g. Nexus Tech Hub"
                            value={formData.storeName}
                            onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                            className="w-full glass-card border-none rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:ring-2 ring-indigo-500/50 outline-none transition"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Market Manifest (Description)</label>
                        <textarea
                            required
                            rows={5}
                            placeholder="Your store's vision and value proposition..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full glass-card border-none rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:ring-2 ring-indigo-500/50 outline-none transition resize-none"
                        />
                    </div>

                    <div className="pt-6">
                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full py-5 bg-white text-black font-black rounded-[20px] hover:bg-gray-200 transition-all active:scale-[0.98] shadow-2xl shadow-white/10 uppercase tracking-widest text-xs disabled:opacity-50"
                        >
                            {loading ? "Reconfiguring..." : "Initialize Market Identity"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
