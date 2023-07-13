import { getSingleRestaurant } from "@/server/fetcher";
import Description from "./components/Description";
import Images from "./components/Images";
import Rating from "./components/Rating";
import ReservationCard from "./components/ReservationCard";
import RestaurantNavbar from "./components/RestaurantNavbar";
import Reviews from "./components/Reviews";
import Title from "./components/Title";

const RestaurantDetailsPage = async ({ params }: { params: { slug: string } }) => {
	const restaurant = await getSingleRestaurant(params.slug)
	console.log({ restaurant })
	return (
		<>
			<div className="bg-white w-[70%] rounded p-3 shadow">
				<RestaurantNavbar slug={params.slug} />
				<Title />
				<Rating />
				<Description />
				<Images />
				<Reviews />
			</div>
			<div className="w-[27%] relative text-reg">
				<ReservationCard />
			</div>
		</>
	);
};
export default RestaurantDetailsPage;
