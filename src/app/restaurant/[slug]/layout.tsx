import { type ReactNode } from "react"
import Header from "./components/Header"
export const metadata = {
    title: "Restaurant | Open Table",
    description: "Open Table Restaurant App",
};

const LayoutRestaurant = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Header />
            <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
                {children}
            </div>
        </>
    )
}

export default LayoutRestaurant