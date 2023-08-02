import { SignupSchema } from "@/utils/validation-schemas";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	const body = request.body;
	const error = SignupSchema.safeParse(body);
	if (!error.success) {
		console.log(error);
		return NextResponse.json({ error: error.error });
	}
	return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: "/auth/signup"
};
