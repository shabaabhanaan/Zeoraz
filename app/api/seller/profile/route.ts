import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { auth } from '@/auth';

export async function GET() {
    try {
        const session = await auth();
        const userId = session?.user?.id;

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const profile = await db.vendorProfile.findUnique({
            where: { userId }
        });

        return NextResponse.json({ success: true, profile });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await auth();
        const userId = session?.user?.id;

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { storeName, description } = body;

        if (!storeName) {
            return NextResponse.json({ error: "Store name is required" }, { status: 400 });
        }

        const profile = await db.vendorProfile.upsert({
            where: { userId },
            update: {
                storeName,
                description,
            },
            create: {
                userId,
                storeName,
                description,
                status: "ACTIVE"
            }
        });

        return NextResponse.json({ success: true, profile });
    } catch (error) {
        console.error("Profile update error:", error);
        return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
    }
}
