import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
	const bearerToken = req.headers.get("authorization") as string;
	const token = bearerToken.split(" ")[1]!;

	const payload = jwt.decode(token) as { email: string };

	if (!token || !payload || !payload.email) {
		return new NextResponse(
			JSON.stringify({
				error: "Unauthorized request"
			}),
			{ status: 401 }
		);
	}

	const user = await prisma.user.findUnique({
		where: {
			email: payload.email
		},
		select: {
			id: true,
			first_name: true,
			last_name: true,
			email: true,
			city: true,
			phone: true
		}
	});

	if (!user) {
		return new NextResponse(
			JSON.stringify({
				error: "User not found"
			}),
			{ status: 200 }
		);
	}

	return new NextResponse(
		JSON.stringify({
			user: {
				id: user.id,
				first_name: user.first_name,
				last_name: user.last_name,
				phone: user.phone,
				city: user.city
			}
		}),
		{ status: 200 }
	);
}
