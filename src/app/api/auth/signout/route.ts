import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
	cookies().delete("jwt");
	return new NextResponse(
		JSON.stringify({
			message: "Logged out successfully"
		}),
		{ status: 200 }
	);
}
