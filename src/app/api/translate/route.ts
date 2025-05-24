export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import translate from 'translate-google';

export async function POST(req: NextRequest) {
    try {
        const { text } = await req.json();
        if (!text) {
            return NextResponse.json({ error: "Missing text" }, { status: 400 });
        }

        const to = 'en';

        const result = await translate(text, { to });

        return NextResponse.json({
            text: result,
            iso: to,
        });
    } catch (e) {
        console.error("API /api/translate error:", e);
        return NextResponse.json({ error: "Translation failed" }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}