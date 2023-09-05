import { getSingleRestaurant } from "@/server/fetcher";
import Image from "next/image";
import { format } from "date-fns";
import { type Time, convertToDisplayTime } from "@/utils";
import Form from "./Form";

const ReserveSlugPage = async ({
	params,
	searchParams,
}: {
	params: { slug: string };
	searchParams: { date: string; partySize: string };
}) => {
	const restaurant = await getSingleRestaurant(params.slug)
	const [day, time] = searchParams.date
	console.log({ day })
	return (
		<div className="border-t h-screen">
			<div className="py-9 w-3/5 m-auto">
				<h3 className="font-bold">You&lsquo;re almost done!</h3>
				<div className="mt-5 flex">
					<Image src={restaurant?.main_image ?? "https://images.otstatic.com/prod1/49153814/2/medium.jpg"} alt="" width={128} height={128} className="w-32 h-18 rounded" />
					<div className="ml-4">
						<h1 className="text-3xl font-bold">{restaurant.name}</h1>
						<div className="flex mt-3">
							<p className="mr-6">{format(new Date(searchParams.date), "ccc, LLL d")}</p>
							<p className="mr-6">{convertToDisplayTime(time as Time)}</p>
							<p className="mr-6">
								{searchParams.partySize} {parseInt(searchParams.partySize) === 1 ? "person" : "people"}
							</p>
						</div>
					</div>
				</div>
				<Form
					partySize={searchParams.partySize}
					slug={params.slug}
					date={searchParams.date}
				/>
			</div>
		</div>
	);
};

export default ReserveSlugPage;
