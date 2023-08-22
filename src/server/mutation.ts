"use server";
import { type SchemaType } from "@/utils/validation-schemas";

type FetchReturnType<T = unknown> =
	| {
			data: null;
			error: string;
	  }
	| {
			data: T;
			error: null;
	  };
export const signinMutation = async (data: SchemaType<true>): Promise<FetchReturnType<SchemaType>> => {
	try {
		const response = await fetch("http://localhost:3000/api/auth/signin", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: data.email,
				password: data.password
			})
		});

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const responseData = (await response.json()) as SchemaType;
		return { data: responseData, error: null };
	} catch (error) {
		// @ts-expect-error - error is not a Response
		let errorMessage = error.message; // default to thrown error message

		if (error instanceof TypeError) {
			errorMessage = "There was an error with the request.";
		} else if (error instanceof Response) {
			// If you have specific error messages sent from your backend, you can extract it like:
			const errorData = await error.json();
			errorMessage = errorData.errorMessage;
		}

		return { data: null, error: errorMessage };
	}
};

export const signupMutation = async (data: SchemaType<false>): Promise<FetchReturnType<SchemaType<false>>> => {
	try {
		const response = await fetch("/api/auth/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: data.email,
				password: data.password,
				first_name: data.first_name,
				last_name: data.last_name,
				city: data.city,
				phone: data.phone
			})
		});

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const responseData = await response.json();
		return { data: responseData, error: null };
	} catch (error) {
		// @ts-expect-error - error is not a Response
		let errorMessage = error?.message ?? ""; // default to thrown error message

		if (error instanceof TypeError) {
			errorMessage = "There was an error with the request.";
		} else if (error instanceof Response) {
			// If you have specific error messages sent from your backend, you can extract it like:
			const errorData = await error.json();
			errorMessage = errorData.errorMessage;
		}
		return { data: null, error: errorMessage };
	}
};

export const fetchUserData = async () => {
	try {
		const response = await fetch("http://localhost:3000/api/auth/me", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const responseData = await response.json();

		// In axios, you would globally set the default headers for all subsequent requests.
		// With fetch, you'd typically need to include the headers each time you make a request.
		// If you really want a similar behavior, you might need to manage headers in a central place in your code.

		return { data: responseData, error: null };
	} catch (error) {
		// @ts-expect-error - error is not a Response
		let errorMessage = error?.message ?? ""; // default to thrown error message

		if (error instanceof TypeError) {
			errorMessage = "There was an error with the request.";
		} else if (error instanceof Response) {
			// If you have specific error messages sent from your backend, you can extract it like:
			const errorData = await error.json();
			errorMessage = errorData.errorMessage;
		}
		return { data: null, error: errorMessage };
	}
};

export async function myAction() {
	const { cookies } = await require("next/headers");
	cookies().delete("jwt");
}
