import { calculateReviewRatingAverage } from '@/utils'
import { type Review } from '@prisma/client'
import Image from 'next/image'
import emptyStar from '../icons/empty-star.png'
import fullStar from '../icons/full-star.png'
import halfStar from '../icons/half-star.png'

const Stars = ({ reviews }: { reviews: Pick<Review, "rating">[] }) => {
    const rating = calculateReviewRatingAverage(reviews)
    const renderStars = () => {
        const stars = []
        for (let i = 0; i < 5; i++) {
            let image = emptyStar
            if (rating >= i + 1) image = fullStar
            else if (rating >= i + 0.5) image = halfStar
            stars.push(<Image src={image} className='w-4 h-4 r-1' alt="" key={i} />)
        }
        return stars
    }
    return (
        <ul className="flex items-center">{renderStars()}</ul>
    )
}

export default Stars