"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { useCart } from "@/lib/cart";

export default function Navbar() {
  const { data: session, status } = useSession();
  const { itemCount } = useCart();
  const [showMenu, setShowMenu] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <nav className="glass-panel sticky top-0 z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center gap-8">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
            <div className="text-3xl font-black bg-premium-gradient bg-clip-text text-transparent group-hover:rotate-12 transition-transform duration-500">
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
                <path d="M20 5L35 12.5V27.5L20 35L5 27.5V12.5L20 5Z" stroke="url(#logo-grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 12V28M12 20H28" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
                <defs>
                  <linearGradient id="logo-grad" x1="5" y1="5" x2="35" y2="35" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#22d3ee" />
                    <stop offset="1" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="text-2xl font-black text-white tracking-tighter transition-all duration-300 group-hover:tracking-normal">
              zeora<span className="text-indigo-400">z</span>
            </div>
          </Link>

          {/* Centered Search */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <div className={`relative glass-card rounded-xl px-6 py-2.5 transition-all duration-300 ${searchFocused ? 'ring-2 ring-indigo-500/50 border-indigo-500/50' : ''}`}>
              <div className="flex items-center gap-3">
                <span className="text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Search premium electronics..."
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="bg-transparent flex-1 text-sm text-white placeholder-gray-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-5">
            {/* Cart */}
            <Link href="/cart" className="relative group p-2 rounded-full hover:bg-white/5 transition">
              <span className="text-gray-300 group-hover:text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </span>
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center anim-pulse">
                {itemCount}
              </span>
            </Link>

            {/* User Menu */}
            {status === "loading" ? (
              <div className="w-10 h-10 rounded-full bg-white/5 animate-pulse"></div>
            ) : session ? (
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="flex items-center gap-3 glass-card px-2 py-2 rounded-full hover:border-indigo-500/30 transition"
                >
                  <img
                    src={session.user?.image || "https://ui-avatars.com/api/?name=" + session.user?.name}
                    alt={session.user?.name || "User"}
                    className="w-8 h-8 rounded-full border border-white/10"
                  />
                  <span className="text-sm font-medium text-gray-200 hidden sm:inline pr-2">{session.user?.name?.split(" ")[0]}</span>
                </button>

                {showMenu && (
                  <div className="absolute right-0 mt-3 w-64 glass-panel rounded-2xl shadow-2xl border border-white/10 py-3 z-50 animate-fade-up">
                    <div className="px-5 py-3 border-b border-white/5">
                      <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Account Info</p>
                      <p className="font-semibold text-white truncate">{session.user?.email}</p>
                    </div>
                    <div className="p-2 space-y-1">
                      <Link href="/dashboard/user" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition">
                        <span>👤</span> My Account
                      </Link>
                      <Link href="/dashboard/seller" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition">
                        <span>🏪</span> Seller Dashboard
                      </Link>
                      <Link href="/dashboard/admin" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition">
                        <span>⚙️</span> Management
                      </Link>
                    </div>
                    <div className="border-t border-white/5 mt-2 p-2">
                      <button
                        onClick={() => {
                          setShowMenu(false);
                          signOut({ callbackUrl: "/" });
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-rose-400 hover:bg-rose-500/10 rounded-xl transition font-semibold"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/signin"
                  className="px-5 py-2.5 text-sm text-gray-300 font-semibold hover:text-white transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-xl font-bold shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
                >
                  Join Now
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
