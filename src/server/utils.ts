import { env } from "@/env/server.mjs";
import { pbkdf2Sync } from "crypto";

// Function to generate a password hash using Node.js crypto
export function generatePasswordHash(password: string): string {
	const salt = Buffer.from(env.JWT_SALT, "hex");
	const iterations = 100000; // You can adjust this value according to your requirements.
	const keylen = 64; // Length of the key
	const digest = "sha512"; // You can choose a different hash function if needed.

	const hash = pbkdf2Sync(password, salt, iterations, keylen, digest);
	return hash.toString("hex");
}
