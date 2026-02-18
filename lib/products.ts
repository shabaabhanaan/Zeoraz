import db from "@/lib/db";

export async function getActiveProducts() {
    try {
        const products = await db.product.findMany({
            where: {
                status: "ACTIVE"
            },
            include: {
                seller: {
                    select: {
                        name: true,
                        vendorProfile: {
                            select: {
                                storeName: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return products.map((p: any) => ({
            id: p.id,
            title: p.name,
            price: p.price,
            seller: p.seller?.vendorProfile?.storeName || p.seller?.name || "Unknown",
            rating: 4.5,
            image: p.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
        }));
    } catch (error) {
        console.error("Database fetch failed, using mock data:", error);
        return [
            {
                id: "mock-1",
                title: "Premium Sound 3D Headphones",
                price: 299.99,
                seller: "Audio Elite",
                rating: 4.8,
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
            },
            {
                id: "mock-2",
                title: "Vortex Gaming Monitor",
                price: 899.00,
                seller: "Future Vision",
                rating: 4.9,
                image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80"
            },
            {
                id: "mock-3",
                title: "Cyber-Deck Mechanical Keyboard",
                price: 159.50,
                seller: "Tech Core",
                rating: 4.7,
                image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80"
            },
            {
                id: "mock-4",
                title: "Aura Smart Watch Series X",
                price: 449.00,
                seller: "Zeoraz Elite",
                rating: 4.9,
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
            }
        ];
    }
}
