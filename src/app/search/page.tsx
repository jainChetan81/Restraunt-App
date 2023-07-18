import Header from "@/components/Header";
import SearchSidebar from "./SearchSidebar";
import { fetchRestaurantByLocation } from "@/server/fetcher";
import RestaurantCard from "@/components/RestaurantCard";

const SearchPage = async ({ searchParams }: { searchParams: { city: string } }) => {
	const restaurants = await fetchRestaurantByLocation(searchParams.city);
	console.log({ restaurants })
	return (
		<>
			<Header />
			<div className="flex m-auto py-4 w-2/3 justify-between items-start">
				<SearchSidebar />
				<div className="w-5/6" >
					{restaurants?.length ? restaurants.map((restaurant) => (
						<RestaurantCard restaurant={restaurant}
							key={restaurant.id} />
					)) : <p>Sorry, we found no restaurants in this area</p>}
				</div>
			</div>
		</>
	);
};

export default SearchPage;
