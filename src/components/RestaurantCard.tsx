import { calculateReviewRatingAverage } from "@/utils";
import { RestaurantCard } from "@/server/fetcher";
import { PRICE } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import Stars from "./Stars";

const renderPrice = (price: PRICE) => {
	if (price === PRICE.CHEAP) return <>
		<span>$$</span>
		<span className="text-gray-400">$$</span>
	</>
	if (price === PRICE.MEDIUM) return <>
		<span>$$$</span>
		<span className="text-gray-400">$</span>
	</>
	if (price === PRICE.EXPENSIVE) return <span>$$$$</span>

}
const RestaurantCard = ({ restaurant }: { restaurant: RestaurantCard[number] }) => {
	const renderRatingText = () => {
		const rating = calculateReviewRatingAverage(restaurant.Review)
		if (rating === 0) return "No reviews yet"
		if (rating < 2) return "Poor"
		if (rating < 3) return "Fair"
		if (rating < 4) return "Good"
	}

	return (
		<div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
			<Link href={`/restaurant/${restaurant.slug}`} >
				<Image src={restaurant.main_image} alt="" className="w-full h-36" height={144} width={254} priority />
				<div className="p-1">
					<h3 className="font-bold text-2xl mb-2">{restaurant.name}</h3>
					<div className="flex items-start">
						<Stars reviews={restaurant.Review} />
						<div className="ml-2">{renderRatingText()}</div>
					</div>
					<p className="">{restaurant.Review?.length} reviews</p>
					<div className="flex text-reg font-light capitalize">
						<p className="mr-3 capitalize">{restaurant.Cuisine.name}</p>
						<p className="mr-3">{renderPrice(restaurant.price)}</p>
						<p>{restaurant.Location.name}</p>
					</div>
					<p className="text-sm mt-1 font-bold">Booked 3 times today</p>
				</div>
			</Link>
		</div>
	);
};

export default RestaurantCard;
