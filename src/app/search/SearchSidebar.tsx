import { fetchAllCuisines, fetchAllLocations } from "@/server/fetcher";
import { PRICE } from "@prisma/client";
import Link from "next/link";
type Props = {
	searchParams: { city: string, cuisine: string, price: PRICE }
}
const SearchSidebar = async ({ searchParams }: Props) => {
	const [locations, cuisines] = await Promise.all([fetchAllLocations(), fetchAllCuisines()]);

	console.log({ locations });
	return (
		<div className="w-1/5">
			<div className="border-b pb-4">
				<h1 className="mb-2">Region</h1>
				{locations?.length ? locations?.map((location) => (
					<Link href={{ pathname: "/search", query: { ...searchParams, city: location.name } }} key={location.name}>
						<p className="font-light text-reg capitalize">{location.name}</p>
					</Link>
				)) : <p>No Location found</p>}

			</div>
			<div className="border-b pb-4 mt-3">
				<h1 className="mb-2">Cuisine</h1>
				{cuisines?.length ? cuisines?.map((cuisine) => (

					<Link href={{ pathname: "/search", query: { ...searchParams, cuisine: cuisine.name } }} key={cuisine.name}>
						<p className="font-light text-reg capitalize" key={cuisine.name}>{cuisine.name}</p>
					</Link>
				)) : <p>No Cuisine found</p>}

			</div>
			<div className="mt-3 pb-4">
				<h1 className="mb-2">Price</h1>
				<div className="flex">
					<Link href={{ pathname: "/search", query: { ...searchParams, price: PRICE.CHEAP } }}><button className="border w-full text-reg font-light rounded-l p-2">$</button></Link>
					<Link href={{ pathname: "/search", query: { ...searchParams, price: PRICE.MEDIUM } }}><button className="border w-full text-reg font-light p-2">$</button></Link>
					<Link href={{ pathname: "/search", query: { ...searchParams, price: PRICE.EXPENSIVE } }}><button className="border w-full text-reg font-light rounded-r p-2">$</button></Link>
				</div>
			</div>
		</div>
	);
};

export default SearchSidebar;
