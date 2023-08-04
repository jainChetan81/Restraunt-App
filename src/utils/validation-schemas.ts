import { z } from "zod";
export const LoginSchema = z.object({
	email: z.string().email().nonempty(),
	password: z.string().min(6).max(20)
});
export const SignupSchema = LoginSchema.extend({
	first_name: z.string().min(2).max(20),
	last_name: z.string().min(2).max(20),
	phone: z.string().min(10).max(10),
	city: z.string().min(2).max(20)
});
export type SchemaType<T = false> = T extends true ? z.infer<typeof LoginSchema> : z.infer<typeof SignupSchema>;
