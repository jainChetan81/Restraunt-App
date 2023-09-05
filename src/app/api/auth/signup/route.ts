import prisma from "@/db/prisma";
import { env } from "@/env/server.mjs";
import { generatePasswordHash } from "@/server/utils";
import { SignupSchema, type SchemaType } from "@/utils/validation-schemas";
import * as jose from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const body = (await req.json()) as SchemaType<false>;
	const error = SignupSchema.safeParse(body);
	if (!error.success) {
		console.log(error);
		return new NextResponse(JSON.stringify({ error: error.error.format() }), { status: 401 });
	}
	const userWithEmail = await prisma.user.findUnique({
		where: { email: body.email }
	});
	if (userWithEmail) {
		return new NextResponse(JSON.stringify({ error: "Email already exists" }), { status: 401 });
	}

	const hashedPassword = generatePasswordHash(body.password);

	const alg = "HS256";
	const secret = new TextEncoder().encode(env.JWT_SECRET);
	const token = await new jose.SignJWT({ email: body.email }).setProtectedHeader({ alg }).setExpirationTime("24h").sign(secret);

	const user = await prisma.user.create({
		data: {
			email: body.email,
			password: hashedPassword,
			first_name: body.first_name,
			last_name: body.first_name,
			city: body.city,
			phone: body.phone
		}
	});

	cookies().set("jwt", token, { maxAge: 60 * 6 * 24, secure: true, httpOnly: true, sameSite: "strict" });
	return new NextResponse(JSON.stringify({ user, token }), { status: 200 });
}
