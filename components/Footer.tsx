import Link from "next/link";

export default function Footer() {
    return (
        <footer className="glass-panel border-t border-white/5 py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
                                <path d="M20 5L35 12.5V27.5L20 35L5 27.5V12.5L20 5Z" stroke="url(#footer-grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                <defs>
                                    <linearGradient id="footer-grad" x1="5" y1="5" x2="35" y2="35" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#22d3ee" />
                                        <stop offset="1" stopColor="#a855f7" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="text-xl font-black text-white tracking-tighter">zeora<span className="text-indigo-400">z</span></div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-medium">
                            The future of global commerce, curated for the modern collector. Experience the elite marketplace.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">Shop</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/products" className="hover:text-indigo-400 transition">All Products</Link></li>
                            <li><Link href="/categories" className="hover:text-indigo-400 transition">Categories</Link></li>
                            <li><Link href="/vendors" className="hover:text-indigo-400 transition">Featured Vendors</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/help" className="hover:text-indigo-400 transition">Help Center</Link></li>
                            <li><Link href="/shipping" className="hover:text-indigo-400 transition">Shipping Info</Link></li>
                            <li><a href="mailto:info.zeoraz@gmail.com" className="hover:text-indigo-400 transition flex items-center gap-2">
                                <span>✉️</span> info.zeoraz@gmail.com
                            </a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">Newsletter</h4>
                        <p className="text-sm text-gray-400 mb-4">Get updates on new tech arrivals.</p>
                        <div className="flex gap-2">
                            <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white outline-none focus:border-indigo-500 transition w-full" />
                            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold">Join</button>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                            &copy; 2026 Zeoraz Global.
                        </p>
                        <a href="mailto:info.zeoraz@gmail.com" className="text-indigo-400 hover:text-indigo-300 text-xs font-bold transition flex items-center gap-2">
                            <span>✉️</span> info.zeoraz@gmail.com
                        </a>
                    </div>
                    <div className="flex gap-6 text-gray-500 text-xs">
                        <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
