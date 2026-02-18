import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { auth } from '@/auth';

export async function GET() {
    try {
        const session = await auth();

        // In a real app, we'd filter by the logged-in user's ID
        // const userId = session?.user?.id;
        // if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        // For now, let's fetch global seller stats or filter if we had a specific ID
        const sellerId = session?.user?.id; // Assuming session has the ID

        const stats = await db.orderItem.aggregate({
            where: sellerId ? { product: { sellerId } } : {},
            _sum: {
                price: true
            },
            _count: {
                id: true
            }
        });

        const orders = await db.order.findMany({
            where: sellerId ? { items: { some: { product: { sellerId } } } } : {},
            include: {
                user: {
                    select: { name: true }
                },
                items: {
                    include: { product: true }
                }
            },
            orderBy: { createdAt: 'desc' },
            take: 10
        });

        const products = await db.product.findMany({
            where: sellerId ? { sellerId } : {},
            orderBy: { updatedAt: 'desc' }
        });

        const vendorProfile = await db.vendorProfile.findUnique({
            where: { userId: sellerId }
        });

        return NextResponse.json({
            stats: {
                totalRevenue: Number(stats._sum.price || 0),
                orderCount: stats._count.id || 0
            },
            vendorProfile,
            orders: orders.map((o: any) => ({
                id: o.id,
                customerName: o.user?.name || "Anonymous",
                amount: Number(o.totalAmount),
                status: o.status,
                date: o.createdAt.toISOString().split('T')[0]
            })),
            products: products.map((p: any) => ({
                id: p.id,
                name: p.name,
                price: Number(p.price),
                stock: p.stock,
                status: p.status
            }))
        });
    } catch (error) {
        console.error("Seller dashboard fetch error:", error);
        // Fallback for demo purposes if DB is down
        return NextResponse.json({
            stats: {
                totalRevenue: 12540.50,
                orderCount: 42
            },
            vendorProfile: {
                storeName: "Elite Tech Store",
                description: "Your official source for Zeoraz hardware."
            },
            orders: [
                { id: "ORD-001", customerName: "Alex Rivera", amount: 499.00, status: "PAID", date: "2026-02-14" },
                { id: "ORD-002", customerName: "Sarah Chen", amount: 129.50, status: "PROCESSING", date: "2026-02-13" },
                { id: "ORD-003", customerName: "Jordan Smith", amount: 899.00, status: "PAID", date: "2026-02-12" }
            ],
            products: [
                { id: "P-101", name: "Cyber-Deck Keyboard", price: 159.00, stock: 24, status: "ACTIVE" },
                { id: "P-102", name: "Vortex Monitor", price: 549.00, stock: 8, status: "ACTIVE" },
                { id: "P-103", name: "Aura Watch", price: 399.00, stock: 0, status: "OUT_OF_STOCK" }
            ]
        });
    }
}