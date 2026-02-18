import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const product = {
    id: parseInt(id),
    title: "Wireless Headphones",
    price: 49.99,
    seller: "TechStore",
    rating: 4.5,
    description: "High-quality wireless headphones with active noise cancellation",
    stock: 15,
  };

  return NextResponse.json({
    success: true,
    data: product,
  });
}
