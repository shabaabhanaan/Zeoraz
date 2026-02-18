"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await signIn("google", { callbackUrl: "/dashboard/user" });
  };

  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock email sign in
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 animate-fade-in relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-lg">
        <div className="absolute inset-0 bg-indigo-600/10 blur-[150px] rounded-full"></div>
      </div>

      <div className="relative w-full max-w-md glass-panel p-10 md:p-12 rounded-[40px] border border-white/10 shadow-3xl">
        <div className="text-center mb-12">
          <div className="mb-6 group inline-block">
            <svg width="48" height="48" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block group-hover:rotate-12 transition-transform duration-500">
              <path d="M20 5L35 12.5V27.5L20 35L5 27.5V12.5L20 5Z" stroke="url(#logo-grad-auth)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M20 12V28M12 20H28" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
              <defs>
                <linearGradient id="logo-grad-auth" x1="5" y1="5" x2="35" y2="35" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#22d3ee" />
                  <stop offset="1" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className="text-4xl font-black text-white mb-3 tracking-tighter leading-none">Security <span className="gradient-text">Protocol</span></h1>
          <p className="text-gray-400 font-medium text-lg leading-relaxed">Authorise your access to the Zeoraz network.</p>
        </div>

        <form onSubmit={handleEmailSignIn} className="space-y-6 mb-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Identity (Email)</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nexus@zeoraz.global"
              className="w-full glass-card border-none rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:ring-2 ring-indigo-500/50 outline-none transition"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Access Key</label>
              <a href="#" className="text-[10px] text-indigo-400 hover:text-indigo-300 font-bold uppercase tracking-widest">Reset</a>
            </div>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full glass-card border-none rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:ring-2 ring-indigo-500/50 outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-white text-black font-black rounded-2xl hover:bg-gray-200 transition-all active:scale-95 shadow-xl shadow-white/5 uppercase tracking-widest text-xs"
          >
            Authenticate
          </button>
        </form>

        <div className="relative mb-8 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5"></div>
          </div>
          <span className="relative px-4 text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] bg-transparent">Or use biometric</span>
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 glass-card rounded-2xl py-4 hover:bg-white/5 transition-all font-bold disabled:opacity-50 border border-white/10"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-300">Continue with Google</span>
        </button>

        <div className="mt-10 text-center">
          <p className="text-xs text-gray-500 font-medium">
            New to the ecosystem?{" "}
            <Link href="/auth/register" className="text-indigo-400 hover:text-indigo-300 font-black uppercase tracking-widest ml-1">
              Initialise Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
