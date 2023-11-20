import prisma from "@/db/prisma";
import { findAvailableTablesBySlug } from "@/server/fetcher";
import { findAvailableTables } from "@/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request, context: { params: { slug: string } }) {
	const url = new URL(req.url);
	const slug = context?.params?.slug;
	const day = url.searchParams.get("day");
	const time = url.searchParams.get("time");
	const partySize = url.searchParams.get("partySize");
	if (!slug || !day || !time || !partySize) {
		return new NextResponse(JSON.stringify({ errorMessage: "Invalid data provided" }), { status: 400 });
	}

	const { bookerEmail, bookerPhone, bookerFirstName, bookerLastName, bookerOccasion, bookerRequest } = await req.json();

	const restaurant = await findAvailableTablesBySlug(slug);

	if (!restaurant) {
		return new NextResponse(JSON.stringify({ errorMessage: "Invalid data provided" }), { status: 400 });
	}

	if (
		new Date(`${day}T${time}`) < new Date(`${day}T${restaurant.open_time}`) ||
		new Date(`${day}T${time}`) > new Date(`${day}T${restaurant.close_time}`)
	) {
		return new NextResponse(JSON.stringify({ errorMessage: "Restaurant is not open at that time" }), { status: 400 });
	}

	const searchTimesWithTables = await findAvailableTables({
		day,
		time,
		restaurant
	});

	if (!searchTimesWithTables) {
		return new NextResponse(JSON.stringify({ errorMessage: "No availability, cannot book" }), { status: 400 });
	}

	const searchTimeWithTables = searchTimesWithTables.find((t) => {
		return t.date.toISOString() === new Date(`${day}T${time}`).toISOString();
	});

	if (!searchTimeWithTables) {
		return new NextResponse(JSON.stringify({ errorMessage: "No availability, cannot book" }), { status: 400 });
	}

	const tablesCount: Record<2 | 4, number[]> = {
		2: [],
		4: []
	};

	searchTimeWithTables.tables.forEach((table) => {
		if (table.seats === 2) {
			tablesCount[2].push(table.id);
		} else {
			tablesCount[4].push(table.id);
		}
	});

	const tablesToBooks: number[] = [];
	let seatsRemaining = parseInt(partySize);

	while (seatsRemaining > 0) {
		if (seatsRemaining >= 3) {
			if (tablesCount[4].length) {
				tablesCount[4][0] && tablesToBooks.push(tablesCount[4][0]);
				tablesCount[4].shift();
				seatsRemaining = seatsRemaining - 4;
			} else {
				tablesCount[2][0] && tablesToBooks.push(tablesCount[2][0]);
				tablesCount[2].shift();
				seatsRemaining = seatsRemaining - 2;
			}
		} else {
			if (tablesCount[2].length) {
				tablesCount[2][0] && tablesToBooks.push(tablesCount[2][0]);
				tablesCount[2].shift();
				seatsRemaining = seatsRemaining - 2;
			} else {
				tablesCount[4][0] && tablesToBooks.push(tablesCount[4][0]);
				tablesCount[4].shift();
				seatsRemaining = seatsRemaining - 4;
			}
		}
	}

	const booking = await prisma.booking.create({
		data: {
			number_of_people: parseInt(partySize),
			booking_time: new Date(`${day}T${time}`),
			booker_email: bookerEmail,
			booker_phone: bookerPhone,
			booker_first_name: bookerFirstName,
			booker_last_name: bookerLastName,
			booker_occasion: bookerOccasion,
			booker_request: bookerRequest,
			restaurant_id: restaurant.id
		}
	});

	const bookingsOnTablesData = tablesToBooks.map((table_id) => {
		return {
			table_id,
			booking_id: booking.id
		};
	});

	await prisma.bookingsOnTables.createMany({
		data: bookingsOnTablesData
	});

	return new NextResponse(JSON.stringify({ booking }), { status: 200 });
}

// http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/reserve?day=2023-02-03&time=15:00:00.000Z&partySize=8
