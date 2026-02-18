import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.email || !body.password || !body.name) {
      return NextResponse.json(
        { error: "Email, name, and password required" },
        { status: 400 }
      );
    }

    // Mock user registration
    return NextResponse.json({
      success: true,
      message: "Registration successful",
      user: {
        id: "user" + Math.random().toString(36).substr(2, 9),
        email: body.email,
        name: body.name,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
