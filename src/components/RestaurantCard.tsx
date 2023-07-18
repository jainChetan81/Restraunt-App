import { RestaurantCard } from "@/server/fetcher";
import { PRICE } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

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
	return (
		<div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
			<Link href={`/restaurant/${restaurant.slug}`} >
				<Image src={restaurant.main_image} alt="" className="w-full h-36" height={144} width={254} priority />
				<div className="p-1">
					<h3 className="font-bold text-2xl mb-2">{restaurant.name}</h3>
					<div className="flex items-start">
						<div className="flex mb-2">*******</div>
						<p className="ml-2">77 reviews</p>
					</div>
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
