import { type ReactNode } from "react";
import RestaurantNavbar from "./components/RestaurantNavbar";
export const metadata = {
    title: "Restaurant | Open Table",
    description: "Open Table Restaurant App",
};
const renderTitle = (title: string) => {
    if (title?.length <= 1) return title
    const nameArray = title.split("-");
    nameArray[nameArray.length - 1] = `(${nameArray.at(-1)})`
    return nameArray.join(" ")
}
export const dynamic = "force-dynamic"

const LayoutRestaurant = ({ children, params }: { children: ReactNode, params: { slug: string } }) => {
    return (
        <>
            <div className="h-96 overflow-hidden">
                <div className="bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center">
                    <h1 className="text-7xl text-white capitalize text-shadow text-center">{renderTitle(params.slug)}</h1>
                </div>
            </div>
            <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
                <div className="w-full">
                    <RestaurantNavbar slug={params.slug} />
                    {children}
                </div>
            </div>
        </>
    )
}

export default LayoutRestaurant