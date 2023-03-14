import Navbar from "@/components/Navbar";
import Header from "./Header";
import RestaurantCards from "./RestaurantCards";
import SearchSidebar from "./SearchSidebar";

const SearchPage = () => {
	return (
		<main className="bg-gray-100 min-h-screen w-screen">
			<main className="max-w-screen-2xl m-auto bg-white">
				<Navbar />
				<Header />
				<div className="flex py-4 m-auto w-2/3 justify-between items-start">
					<SearchSidebar />
					<RestaurantCards />
				</div>
			</main>
		</main>
	);
};

export default SearchPage;
