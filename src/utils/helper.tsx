// eslint-disable-next-line @typescript-eslint/ban-types
export const debounce = (fn: Function, delay: number) => {
	let counter: NodeJS.Timeout;
	return (...args: any[]) => {
		clearTimeout(counter);
		counter = setTimeout(() => fn(...args), delay);
	};
};
