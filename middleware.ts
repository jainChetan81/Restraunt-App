import { type NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { env } from "@/env/server.mjs";
export async function middleware(req: NextRequest) {
	const bearerToken = req.headers.get("authorization") as string;

	if (!bearerToken) {
		return new NextResponse(JSON.stringify({ error: "Unauthorized request" }), { status: 401 });
	}

	const token = bearerToken.split(" ")[1];

	if (!token) {
		return new NextResponse(JSON.stringify({ error: "Unauthorized request" }), { status: 401 });
	}

	const secret = new TextEncoder().encode(env.JWT_SECRET);

	try {
		await jose.jwtVerify(token, secret);
	} catch (error) {
		return new NextResponse(JSON.stringify({ error: "Unauthorized request" }), { status: 401 });
	}
}

export const config = {
	matcher: ["/api/auth/me"]
};
