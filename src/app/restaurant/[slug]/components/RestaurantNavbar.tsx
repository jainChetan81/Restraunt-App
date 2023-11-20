import Link from 'next/link'
type Props = {
    slug: string
}
const RestaurantNavbar = ({ slug }: Props) => {
    return (
        <nav className="flex text-reg border-b pb-2 w-[70%] bg-white p-3 rounded rounded-br-none rounded-bl-none ">
            <Link href={`/restaurant/${slug}`} className="mr-7">
                Overview
            </Link>
            <Link href={`/restaurant/${slug}/menu`} className="mr-7">
                Menu
            </Link>
        </nav>
    )
}

export default RestaurantNavbar