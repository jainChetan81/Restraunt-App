import { findRestaurantBookingBySlug } from "@/server/fetcher";
import { findAvailableTables } from "@/server/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request, context: { params: { slug: string } }) {
	const url = new URL(req.url);

	const day = url.searchParams.get("day");
	const time = url.searchParams.get("time");
	const partySize = url.searchParams.get("partySize");
	const slug = context?.params?.slug;

	if (!slug || !day || !time || !partySize) {
		return new NextResponse(JSON.stringify({ errorMessage: "Invalid data provided" }), { status: 400 });
	}

	const restaurant = await findRestaurantBookingBySlug(slug);

	if (!restaurant) {
		return new NextResponse(JSON.stringify({ errorMessage: "Invalid data provided" }), { status: 400 });
	}

	const searchTimesWithTables = await findAvailableTables({
		day,
		time,
		restaurant
	});

	if (!searchTimesWithTables) {
		return new NextResponse(JSON.stringify({ errorMessage: "Invalid data provided" }), { status: 400 });
	}

	const availabilities = searchTimesWithTables
		.map((t) => {
			const sumSeats = t.tables.reduce((sum, table) => {
				return sum + table.seats;
			}, 0);

			return {
				time: t.time,
				available: sumSeats >= parseInt(partySize)
			};
		})
		.filter((availability) => {
			const timeIsAfterOpeningHour = new Date(`${day}T${availability.time}`) >= new Date(`${day}T${restaurant.open_time}`);
			const timeIsBeforeClosingHour = new Date(`${day}T${availability.time}`) <= new Date(`${day}T${restaurant.close_time}`);

			return timeIsAfterOpeningHour && timeIsBeforeClosingHour;
		});

	return NextResponse.json(availabilities);
}

// http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/availability?day=2023-02-03&time=15:00:00.000Z&partySize=8
