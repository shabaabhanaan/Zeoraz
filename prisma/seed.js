const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding real data...');

    // Create some users/sellers
    const seller1 = await prisma.user.upsert({
        where: { email: 'techstore@zeoraz.global' },
        update: {},
        create: {
            email: 'techstore@zeoraz.global',
            name: 'TechStore Elite',
            role: 'SELLER',
            vendorProfile: {
                create: {
                    storeName: 'TechStore Elite',
                    description: 'Premium tech components and electronics.',
                    status: 'ACTIVE'
                }
            }
        }
    });

    const seller2 = await prisma.user.upsert({
        where: { email: 'audiopro@zeoraz.global' },
        update: {},
        create: {
            email: 'audiopro@zeoraz.global',
            name: 'AudioPro Systems',
            role: 'SELLER',
            vendorProfile: {
                create: {
                    storeName: 'AudioPro Systems',
                    description: 'High-end audio equipment for audiophiles.',
                    status: 'ACTIVE'
                }
            }
        }
    });

    // Create real products
    const products = [
        {
            name: 'Pro Wireless Headphones',
            description: 'Active noise cancelling headphones with 40h battery life.',
            price: 349.99,
            stock: 50,
            sellerId: seller1.id,
            status: 'ACTIVE',
            category: 'Audio'
        },
        {
            name: 'Mechanical Gaming Keyboard',
            description: 'RGB Backlit mechanical keyboard with brown switches.',
            price: 159.99,
            stock: 30,
            sellerId: seller1.id,
            status: 'ACTIVE',
            category: 'Peripherals'
        },
        {
            name: 'Professional Studio Monitor',
            description: 'Reference grade studio monitors for precise audio work.',
            price: 899.00,
            stock: 12,
            sellerId: seller2.id,
            status: 'ACTIVE',
            category: 'Audio'
        }
    ];

    for (const product of products) {
        await prisma.product.create({
            data: product
        });
    }

    console.log('✅ Seeding complete!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
