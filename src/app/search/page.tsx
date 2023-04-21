import Header from "./Header";
import RestaurantCards from "./RestaurantCards";
import SearchSidebar from "./SearchSidebar";

const SearchPage = () => {
	return (
		<>
			<Header />
			<div className="flex m-auto py-4 w-2/3 justify-between items-start">
				<SearchSidebar />
				<div className="w-5/6" >
					<RestaurantCards />
				</div>
			</div>
		</>
	);
};

export default SearchPage;
