import { type ReactNode } from "react"
export const metadata = {
    title: "Menu of Restaurant | Open Table",
    description: "Open Table Restaurant App",
};

const LayoutRestaurant = ({ children }: { children: ReactNode }) => (
    <>
        {children}
    </>
)

export default LayoutRestaurant