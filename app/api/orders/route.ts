import { NextResponse } from "next/server";

export async function GET() {
  const orders = [
    { id: 1001, userId: 1, products: ["Wireless Headphones"], total: 49.99, status: "Delivered" },
    { id: 1002, userId: 1, products: ["Smart Watch"], total: 89.99, status: "In Transit" },
  ];

  return NextResponse.json({
    success: true,
    data: orders,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.userId || !body.products) {
      return NextResponse.json(
        { error: "UserId and products required" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Order created",
      order: {
        id: Math.floor(Math.random() * 10000),
        ...body,
        status: "Processing",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
