import { type PRICE, PrismaClient } from "@prisma/client";
export const getRestaurants = async () => {
	const prisma = new PrismaClient();
	const restaurants = await prisma.restaurant.findMany({
		select: {
			id: true,
			name: true,
			main_image: true,
			Cuisine: true,
			Location: true,
			price: true,
			slug: true,
			Review: {
				select: {
					rating: true
				}
			}
		}
	});
	if (!restaurants) throw new Error("No Restaurants found");
	return restaurants;
};
export type RestaurantCard = Awaited<ReturnType<typeof getRestaurants>>;

export const getSingleRestaurant = async (slug: string) => {
	const prisma = new PrismaClient();
	const restaurant = await prisma.restaurant.findUnique({
		where: {
			slug
		},
		select: {
			id: true,
			name: true,
			main_image: true,
			Cuisine: true,
			Location: true,
			price: true,
			slug: true,
			description: true,
			images: true,
			Review: true,
			open_time: true,
			close_time: true
		}
	});
	if (!restaurant) throw new Error("Restaurant not found");
	return restaurant;
};
export type SingleRestaurant = Awaited<ReturnType<typeof getSingleRestaurant>>;

export const fetchRestaurantItems = async (slug: string) => {
	const prisma = new PrismaClient();
	const restaurant = await prisma.restaurant.findUnique({
		where: {
			slug
		},
		select: {
			Items: true
		}
	});
	if (!restaurant) throw new Error("Items not found");

	return restaurant;
};

export type RestaurantItems = Awaited<ReturnType<typeof fetchRestaurantItems>>;

export const fetchRestaurantByLocation = async (city: string) => {
	if (!city) return await getRestaurants();
	const prisma = new PrismaClient();
	const restaurants = await prisma.restaurant.findMany({
		where: {
			Location: {
				name: {
					equals: city.toLocaleLowerCase()
				}
			}
		},
		select: {
			id: true,
			name: true,
			main_image: true,
			Cuisine: true,
			Location: true,
			price: true,
			slug: true,
			Review: {
				select: {
					rating: true
				}
			}
		}
	});
	if (!restaurants) throw new Error("No Restaurants found");
	return restaurants;
};
export type RestaurantByLocation = Awaited<ReturnType<typeof fetchRestaurantByLocation>>;

export const fetchAllLocations = async () => {
	const prisma = new PrismaClient();
	const locations = await prisma.location.findMany({
		select: {
			name: true
		}
	});
	if (!locations) throw new Error("No locations found");
	return locations;
};
export type AllLocations = Awaited<ReturnType<typeof fetchAllLocations>>;

export const fetchAllCuisines = async () => {
	const prisma = new PrismaClient();
	const cuisines = await prisma.cuisine.findMany({
		select: {
			name: true
		}
	});
	if (!cuisines) throw new Error("No cuisines found");
	return cuisines;
};
export type AllCuisines = Awaited<ReturnType<typeof fetchAllCuisines>>;

export const fetchRestaurantByParams = async (city?: string, cuisine?: string, price?: PRICE) => {
	// Build the where clause dynamically
	const whereClause: Record<string, unknown> = {};

	// Check for city
	if (city && city?.trim()?.length > 0) {
		whereClause.Location = {
			name: {
				equals: city.toLocaleLowerCase()
			}
		};
	}

	// Check for cuisine
	if (cuisine && cuisine?.trim()?.length > 0) {
		whereClause.Cuisine = {
			name: {
				equals: cuisine.toLocaleLowerCase()
			}
		};
	}

	// Check for price
	if (price !== undefined && price !== null) {
		whereClause.price = {
			equals: price
		};
	}
	const prisma = new PrismaClient();

	const restaurants = await prisma.restaurant.findMany({
		where: whereClause,
		select: {
			id: true,
			name: true,
			main_image: true,
			Cuisine: true,
			Location: true,
			price: true,
			slug: true,
			Review: {
				select: {
					rating: true
				}
			}
		}
	});

	if (!restaurants) throw new Error("No Restaurants found");
	return restaurants;
};

export const findRestaurantBookingBySlug = async (slug: string) => {
	if (!slug) throw new Error("Invalid data provided");
	const prisma = new PrismaClient();
	const restaurant = await prisma.restaurant.findUnique({
		where: {
			slug
		},
		select: {
			Booking: true,
			open_time: true,
			close_time: true,
			Table: true
		}
	});
	if (!restaurant) throw new Error("Restaurant not found");
	return restaurant;
};

export type RestaurantBookings = Awaited<ReturnType<typeof findRestaurantBookingBySlug>>;

export const findAvailableTablesBySlug = async (slug: string) => {
	if (!slug) throw new Error("Invalid data provided");
	const prisma = new PrismaClient();
	const restaurant = await prisma.restaurant.findUnique({
		where: {
			slug
		},
		select: {
			Table: true,
			open_time: true,
			close_time: true,
			id: true
		}
	});
	if (!restaurant) throw new Error("Invalid data provided");
	return restaurant;
};

export type RestaurantTablesBySlug = Awaited<ReturnType<typeof findAvailableTablesBySlug>>;
