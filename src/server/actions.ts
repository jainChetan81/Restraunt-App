"use server";
export async function myAction() {
	const { cookies } = await require("next/headers");
	cookies().delete("jwt");
}
