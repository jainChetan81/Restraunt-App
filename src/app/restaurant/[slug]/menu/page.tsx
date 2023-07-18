import { fetchRestaurantItems } from "@/server/fetcher";

const RestaurantSlugMenuPage = async ({ params }: { params: { slug: string } }) => {
	const menu = await fetchRestaurantItems(params.slug);
	return (
		<>
			<main className="bg-white mt-5">
				<div>
					<div className="mt-4 pb-1 mb-1">
						<h1 className="font-bold text-4xl">Menu</h1>
					</div>
					<div className="flex flex-wrap justify-between">
						{menu?.Items?.length ? menu.Items.map(item => <div className="border rounded p-3 w-[49%] mb-3" key={item.id}>
							<h3 className="font-bold text-lg">{item.name}</h3>
							<p className="font-light mt-1 text-sm">{item.description}</p>
							<p className="mt-7">{item.price}</p>
						</div>) : <div className="flex flex-wrap justify-between">
							<p>This Restaurant does not have a menu</p>
						</div>}

					</div>
				</div>
			</main>
		</>
	);
};

export default RestaurantSlugMenuPage;
