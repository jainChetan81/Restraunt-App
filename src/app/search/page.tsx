import RestaurantCard from "@/components/RestaurantCard";
import { fetchRestaurantByParams } from "@/server/fetcher";
import type { PRICE } from "@prisma/client";
import SearchSidebar from "./SearchSidebar";

const SearchPage = async ({ searchParams }: { searchParams: { city: string, cuisine: string, price: PRICE } }) => {
	const restaurants = await fetchRestaurantByParams(searchParams.city, searchParams.cuisine, searchParams.price);
	return (
		<div className="flex m-auto py-4 w-2/3 justify-between items-start">
			<SearchSidebar searchParams={searchParams} />
			<div className="w-5/6" >
				{restaurants?.length ? restaurants.map((restaurant) => (
					<RestaurantCard restaurant={restaurant}
						key={restaurant.id} />
				)) : <p>Sorry, we found no restaurants in this area</p>}
			</div>

		</div>
	);
};

export default SearchPage;
