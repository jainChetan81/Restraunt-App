import { useState } from "react"

export default function useAvailabilities() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState<{ time: string; available: boolean }[] | null>(null)


    const fetchAvailabilities = async ({ slug, partySize, day, time }: { slug: string; partySize: string; day: string; time: string }) => {
        setLoading(true)

        try {
            const url = new URL(`http://localhost:3000/api/restaurant/${slug}/availability`);
            url.search = new URLSearchParams({
                day,
                time,
                partySize
            }).toString();

            const response = await fetch(url.toString());

            // Check if the response status is okay
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.errorMessage);
            }

            const data = await response.json();
            console.log(data);
            setLoading(false);
            setData(data);
        } catch (error) {
            // @ts-expect-error - error is not a Response
            let errorMessage = error?.message ?? ""; // default to thrown error message

            if (error instanceof TypeError) {
                errorMessage = "There was an error with the request.";
            } else if (error instanceof Response) {
                // If you have specific error messages sent from your backend, you can extract it like:
                const errorData = await error.json();
                errorMessage = errorData.errorMessage;
            }
            setLoading(false);
            setError(errorMessage ?? "");
        }


    }

    return { loading, data, error, fetchAvailabilities }

}