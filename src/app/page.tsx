import Header from "@/components/Header";
import RestaurantCard from "@/components/RestaurantCard";
import { getRestaurants } from "@/server/fetcher";


export default async function Home() {
	const restaurants = await getRestaurants();
	return (
		<div>
			<Header />
			<div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
				{restaurants.map((restaurant) => (
					<RestaurantCard restaurant={restaurant}
						key={restaurant.id} />
				))}
			</div>
		</div>

	);
}
