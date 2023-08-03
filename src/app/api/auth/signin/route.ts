import { env } from "@/env/server.mjs";
import { LoginSchema, type SchemaType } from "@/utils/validation-schemas";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { setCookie } from "cookies-next";
import * as jose from "jose";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(request: Request) {
	const body = (await request.json()) as SchemaType<false>;
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

	const isMatch = await bcrypt.compare(body.password, user.password);

	if (!isMatch) {
		return new NextResponse(JSON.stringify({ error: "Email or password is invalid" }), { status: 401 });
	}

	const alg = "HS256";

	const secret = new TextEncoder().encode(env.JWT_SECRET);

	const token = await new jose.SignJWT({ email: user.email }).setProtectedHeader({ alg }).setExpirationTime("24h").sign(secret);

	// @ts-expect-error request is not accepted by setCookie yet
	setCookie("jwt", token, { request, NextResponse, maxAge: 60 * 6 * 24 });
	const userData = {
		id: user.id,
		first_name: user.first_name,
		last_name: user.last_name,
		phone: user.phone,
		city: user.city
	};
	return new NextResponse(JSON.stringify({ user: userData, token }), { status: 200 });
}
