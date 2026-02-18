import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Mock authentication
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    // Mock successful login
    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: "user123",
        email: body.email,
        name: "John Doe",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
