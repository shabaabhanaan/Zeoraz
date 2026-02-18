import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getActiveProducts } from "@/lib/products";

export async function GET() {
  try {
    const products = await getActiveProducts();

    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Products API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // In a real app, you'd get the sellerId from the session
    if (!body.name || !body.price || !body.sellerId) {
      return NextResponse.json(
        { error: "Name, price and sellerId required" },
        { status: 400 }
      );
    }

    const newProduct = await db.product.create({
      data: {
        name: body.name,
        price: body.price,
        description: body.description || "",
        stock: body.stock || 0,
        sellerId: body.sellerId,
        status: "ACTIVE"
      }
    });

    return NextResponse.json({
      success: true,
      message: "Product created",
      product: newProduct,
    });
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
