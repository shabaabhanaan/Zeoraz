import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "HTTP-Referer": `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}`,
                "X-Title": "Zeoraz Marketplace",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "google/gemini-2.0-flash-exp:free",
                messages: [
                    {
                        role: "system",
                        content: "You are the Zeoraz Assistant, a high-end AI support for the Zeoraz Multi-Vendor Marketplace. You are professional, focused on luxury and global commerce, and helpful. Use a premium, slightly futuristic tone. You assist with acquisitions (purchases), merchant operations, logistics, and account management. Keep responses concise and impactful. If the user needs direct support, refer them to info.zeoraz@gmail.com."
                    },
                    ...messages.map((m: any) => ({
                        role: m.sender === "user" ? "user" : "assistant",
                        content: m.text
                    }))
                ]
            })
        });

        const data = await response.json();
        const botResponse = data.choices[0].message.content;

        return NextResponse.json({ text: botResponse });
    } catch (error) {
        console.error("Chat API Error:", error);
        return NextResponse.json({ error: "System synchronization failure. Please standby." }, { status: 500 });
    }
}
