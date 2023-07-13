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
    return restaurant;
}

export type SingleRestaurant = Awaited<ReturnType<typeof getSingleRestaurant>>;