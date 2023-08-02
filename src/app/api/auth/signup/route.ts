import type { SchemaType } from "@/utils/validation-schemas";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(request: Request) {
	const body = (await request.json()) as SchemaType<false>;
	const userWithEmail = await prisma.user.findUnique({
		where: { email: body.email }
	});
	if (userWithEmail) {
		return NextResponse.json({ error: "Email already exists" });
	}
	const user = await prisma.user.create({
		data: {
			email: body.email,
			password: body.password,
			first_name: body.firstName,
			last_name: body.lastName,
			city: body.city,
			phone: body.phone
		}
	});
	NextResponse.json({ user });
}
