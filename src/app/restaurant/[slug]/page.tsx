import { getSingleRestaurant } from "@/server/fetcher";
import Image from "next/image";
import ReservationCard from "./components/ReservationCard";
import { calculateReviewRatingAverage } from "@/utils";
import Stars from "@/components/Stars";

const RestaurantDetailsPage = async ({ params }: { params: { slug: string } }) => {
	const restaurant = await getSingleRestaurant(params.slug)
	return (
		<>

			<div className="mt-4 border-b pb-6">
				<h1 className="font-bold text-6xl">{restaurant?.name}</h1>
			</div>
			<div className="flex items-end">
				<div className="ratings mt-2 flex items-center">
					<ul><Stars reviews={restaurant.Review} /></ul>
					<p className="text-reg ml-3">{calculateReviewRatingAverage(restaurant.Review)}</p>
				</div>
				<div>
					<p className="text-reg ml-4">{restaurant.Review?.length} Reviews</p>
				</div>
			</div>
			<div className="mt-4">
				<p className="text-lg font-light">
					{restaurant?.description}
				</p>
			</div>
			<div>
				<h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">{restaurant?.images.length} photos</h1>
				<div className="flex flex-wrap">
					{restaurant?.images?.map((image, idx) => (
						<Image className="w-56 h-44 mr-1 mb-1" src={image} alt="" key={idx} width={224} height={176} />
					))}
				</div>
			</div>
			<div>
				{restaurant.Review?.length && <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">What {restaurant.Review?.length} people are saying</h1>}
				<div>
					{restaurant?.Review?.map((review, idx) => (
						<div className="border-b pb-7 mb-7" key={review.id}>
							<div className="flex">
								<div className="w-1/6 flex flex-col items-center">
									<div className="rounded-full bg-blue-400 w-16 h-16 flex items-center justify-center">
										<h2 className="text-white text-2xl uppercase">{review.first_name?.[0] ?? "" + review.last_name?.[0] ?? ""}</h2>
									</div>
									<p className="text-center">{review.first_name + " " + review.last_name}</p>
								</div>
								<div className="ml-10 w-5/6">
									<div className="flex items-center">
										<div className="flex mr-5"><Stars reviews={restaurant.Review} /></div>
									</div>
									<div className="mt-5">
										<p className="text-lg font-light">{review.text}</p>
									</div>
								</div>
							</div>
						</div>))}
				</div>
			</div>
			<div className="w-[27%] relative text-reg">
				<ReservationCard />
			</div>
		</>
	);
};
export default RestaurantDetailsPage;
