import { getSingleRestaurant } from "@/server/fetcher";
import Image from "next/image";
import ReservationCard from "./components/ReservationCard";
import RestaurantNavbar from "./components/RestaurantNavbar";

const RestaurantDetailsPage = async ({ params }: { params: { slug: string } }) => {
	const restaurant = await getSingleRestaurant(params.slug)!
	console.log({ restaurant })
	return (
		<>
			<div className="bg-white w-[70%] rounded p-3 shadow">
				<RestaurantNavbar slug={params.slug} />
				<div className="mt-4 border-b pb-6">
					<h1 className="font-bold text-6xl">{restaurant?.name}</h1>
				</div>
				<div className="flex items-end">
					<div className="ratings mt-2 flex items-center">
						<p>*****</p>
						<p className="text-reg ml-3">4.9</p>
					</div>
					<div>
						<p className="text-reg ml-4">600 Reviews</p>
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
							<Image className="w-56 h-44 mr-1 mb-1" src={image} alt="" key={idx} />
						))}
					</div>
				</div>
				<div>
					<h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">What 100 people are saying</h1>
					<div>
						<div className="border-b pb-7 mb-7">
							<div className="flex">
								<div className="w-1/6 flex flex-col items-center">
									<div className="rounded-full bg-blue-400 w-16 h-16 flex items-center justify-center">
										<h2 className="text-white text-2xl">MJ</h2>
									</div>
									<p className="text-center">Micheal Jordan</p>
								</div>
								<div className="ml-10 w-5/6">
									<div className="flex items-center">
										<div className="flex mr-5">*****</div>
									</div>
									<div className="mt-5">
										<p className="text-lg font-light">
											Laurie was on top of everything! Slow night due to the snow storm so it worked in our favor to have more one on
											one with the staff. Delicious and well worth the money.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="w-[27%] relative text-reg">
				<ReservationCard />
			</div>
		</>
	);
};
export default RestaurantDetailsPage;
