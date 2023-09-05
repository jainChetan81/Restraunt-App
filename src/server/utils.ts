import { timeIntervals } from "@/data";
import prisma from "@/db/prisma";
import { env } from "@/env/server.mjs";
import { pbkdf2Sync } from "crypto";
import type { RestaurantBookings } from "./fetcher";

// Function to generate a password hash using Node.js crypto
export function generatePasswordHash(password: string): string {
	const salt = Buffer.from(env.JWT_SALT, "hex");
	const iterations = 100000; // You can adjust this value according to your requirements.
	const keylen = 64; // Length of the key
	const digest = "sha512"; // You can choose a different hash function if needed.

	const hash = pbkdf2Sync(password, salt, iterations, keylen, digest);
	return hash.toString("hex");
}

export const findAvailableTables = async ({ time, day, restaurant }: { time: string; day: string; restaurant: RestaurantBookings }) => {
	const searchTimes = timeIntervals.find((t) => {
		return t.time === time;
	})?.searchTimes;

	if (!searchTimes) {
		return null;
	}

	const bookings = await prisma.booking.findMany({
		where: {
			booking_time: {
				gte: new Date(`${day}T${searchTimes[0]}`),
				lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`)
			}
		},
		select: {
			number_of_people: true,
			booking_time: true,
			BookingsOnTables: true
		}
	});

	const bookingTablesObj: Record<string, Record<string, number>> = {};

	bookings.forEach((booking) => {
		bookingTablesObj[booking.booking_time.toISOString()] = booking.BookingsOnTables.reduce((obj, table) => {
			return {
				...obj,
				[table.table_id]: true
			};
		}, {});
	});

	const tables = restaurant.Table;

	const searchTimesWithTables = searchTimes.map((searchTime) => {
		return {
			date: new Date(`${day}T${searchTime}`),
			time: searchTime,
			tables
		};
	});

	searchTimesWithTables.forEach((t) => {
		t.tables = t.tables.filter((table) => {
			if (bookingTablesObj[t.date.toISOString()]) {
				if (bookingTablesObj[t.date.toISOString()]?.[table.id]) return false;
			}
			return true;
		});
	});

	return searchTimesWithTables;
};
