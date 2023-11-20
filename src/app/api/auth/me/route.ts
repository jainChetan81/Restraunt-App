import prisma from "@/db/prisma";
import jwt from "jsonwebtoken";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	const bearerToken = req.cookies.get("jwt")?.value;

	const payload = bearerToken ? (jwt.decode(bearerToken) as { email: string }) : null;

	if (!bearerToken || !payload || !payload.email) {
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
