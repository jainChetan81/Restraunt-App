import Navbar from "@/components/Navbar";
import Description from "./components/Description";
import Header from "./components/Header";
import Images from "./components/Images";
import Rating from "./components/Rating";
import RestaurantNavbar from "./components/RestaurantNavbar";
import ReservationCard from "./components/ReservationCard";
import Title from "./components/Title";
import Reviews from "./components/Reviews";

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
						<Images />
						<Reviews />
						{/* IMAGES */} {/* REVIEWS */}
					</div>
					<div className="w-[27%] relative text-reg">
						<ReservationCard />
					</div>
				</div>
			</div>
		</main>
	);
};
export default RestaurantDetailsPage;
