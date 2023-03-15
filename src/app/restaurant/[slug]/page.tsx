import Navbar from "@/components/Navbar";
import Description from "./components/Description";
import Header from "./components/Header";
import Images from "./components/Images";
import Rating from "./components/Rating";
import RestaurantNavbar from "./components/RestaurantNavbar";
import Reviews from "./components/Reviews";
import Title from "./components/Title";
import ReservationCard from "./components/ReservationCard";

const RestaurantDetailsPage = () =>
{
	return (
		<main className="bg-gray-100 min-h-screen w-screen">
			<div className="max-w-screen-2xl m-auto bg-white">
				<Navbar />
				<Header />
				<div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
					<div className="bg-white w-[70%] rounded p-3 shadow">
						<RestaurantNavbar />
						<Title />
						<Rating />
						<Description />
						<ReservationCard />
						{/* IMAGES */} {/* REVIEWS */}
						<Images />
					</div>
					<Reviews />
				</div>
			</div>
		</main>
	);
};
export default RestaurantDetailsPage;
