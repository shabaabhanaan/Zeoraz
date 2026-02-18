import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { AuthProvider } from "@/components/AuthProvider";
import { CartProvider } from "@/lib/cart";

// Fallback to system fonts if Google Fonts fetch fails
const geistSans = { variable: "--font-geist-sans" };
const geistMono = { variable: "--font-geist-mono" };


export const metadata: Metadata = {
  title: "Zeoraz | The Elite Multi-Vendor Marketplace",
  description: "Experience the future of global commerce with Zeoraz. Curated high-performance electronics from verified vendors worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-background text-foreground selection:bg-indigo-500/30`}
      >
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1 w-full">
              {children}
            </main>
            <Chatbot />
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
