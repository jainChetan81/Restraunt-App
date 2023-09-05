import prisma from "@/db/prisma";
import { env } from "@/env/server.mjs";
import { generatePasswordHash } from "@/server/utils";
import { LoginSchema, type SchemaType } from "@/utils/validation-schemas";
import * as jose from "jose";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	const body = (await req.json()) as SchemaType<false>;
	const error = LoginSchema.safeParse(body);
	if (!error.success) {
		console.log(error);
		return NextResponse.json({ error: error.error.format() });
	}

	const user = await prisma.user.findUnique({
		where: {
			email: body.email
		}
	});

	if (!user) {
		return new NextResponse(JSON.stringify({ error: "Email or password is invalid" }), { status: 401 });
	}

	const isMatch = user.password === generatePasswordHash(body.password);

	if (!isMatch) {
		return new NextResponse(JSON.stringify({ error: "Email or password is invalid" }), { status: 401 });
	}

	const alg = "HS256";

	const secret = new TextEncoder().encode(env.JWT_SECRET);

	const token = await new jose.SignJWT({ email: user.email }).setProtectedHeader({ alg }).setExpirationTime("24h").sign(secret);

	cookies().set("jwt", token, { maxAge: 60 * 6 * 24, secure: true, httpOnly: true, sameSite: "strict" });
	const userData = {
		id: user.id,
		first_name: user.first_name,
		last_name: user.last_name,
		phone: user.phone,
		city: user.city
	};
	return new NextResponse(JSON.stringify({ user: userData, token }), { status: 200 });
}
