import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import RestaurantCard from "@/components/RestaurantCard";

export default function Home() {
	return (
		<div className="bg-gray-100 min-h-screen w-screen">
			<div className="max-w-screen-2xl m-auto bg-white">
				<Navbar />
				<main>
					<Header />
					<div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
						<RestaurantCard />
					</div>
				</main>
			</div>
		</div>
	);
}
