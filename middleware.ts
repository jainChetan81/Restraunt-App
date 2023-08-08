import { type NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { env } from "@/env/server.mjs";
export async function middleware(req: NextRequest) {
	const bearerToken = req.cookies.get("jwt")?.value;

	if (!bearerToken) {
		return new NextResponse(JSON.stringify({ error: "Unauthorized request" }), { status: 401 });
	}

	const secret = new TextEncoder().encode(env.JWT_SECRET);

	try {
		await jose.jwtVerify(bearerToken, secret);
	} catch (error) {
		console.log("================================================error", error);
		return new NextResponse(JSON.stringify({ error: "Unauthorized request" }), { status: 401 });
	}
	return NextResponse.next();
}

export const config = {
	matcher: ["/api/auth/me", "/api/auth/signout"]
};
