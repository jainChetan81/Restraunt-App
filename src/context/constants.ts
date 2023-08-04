import type { SchemaType } from "@/utils/validation-schemas";

export function isSignupInputs(input: SchemaType<boolean>): input is SchemaType<false> {
	return "first_name" in input;
}
