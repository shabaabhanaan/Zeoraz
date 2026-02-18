import { NextResponse } from "next/server";

export async function GET() {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "buyer" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "seller" },
  ];

  return NextResponse.json({
    success: true,
    data: users,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.email || !body.name) {
      return NextResponse.json(
        { error: "Email and name required" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User created",
      user: {
        id: Math.floor(Math.random() * 1000),
        ...body,
        role: "buyer",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
