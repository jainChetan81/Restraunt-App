import { type Review } from "@prisma/client";

export const calculateReviewRatingAverage = (reviews: Pick<Review, "rating">[]) => {
	if (!reviews.length) return 0;
	const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
	return totalRating / reviews.length;
};

export const debounce = (func: (...args: unknown[]) => void, wait: number) => {
	let timeout: ReturnType<typeof setTimeout>;
	return function executedFunction(...args: unknown[]) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
};
