import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getRestaurants = async () => {
    const restaurants = await prisma.restaurant.findMany({
        select: {
            id: true,
            name: true,
            main_image: true,
            Cuisine: true,
            Location: true,
            price: true,
            slug: true,
        }

    });
    if (!restaurants) throw new Error("No Restaurants found")
    return restaurants;
}
export type RestaurantCard = Awaited<ReturnType<typeof getRestaurants>>;

export const getSingleRestaurant = async (slug: string) => {
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
        }
    });
    if (!restaurant) throw new Error("Restaurant not found");
    return restaurant;
}
export type SingleRestaurant = Awaited<ReturnType<typeof getSingleRestaurant>>;

export const fetchRestaurantItems = async (slug: string) => {
    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug
        },
        select: {
            Items: true
        }
    })
    if (!restaurant) throw new Error("Items not found");

    return restaurant;
}

export type RestaurantItems = Awaited<ReturnType<typeof fetchRestaurantItems>>;

export const fetchRestaurantByLocation = async (city: string) => {
    console.log({ city })
    if (!city) return await getRestaurants();
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
        }
    });
    if (!restaurants) throw new Error("No Restaurants found")
    return restaurants;
}
export type RestaurantByLocation = Awaited<ReturnType<typeof fetchRestaurantByLocation>>;