import { Dispatch, SetStateAction, useState } from "react";

export default function useReservation() {
    const [loading, setLoading] = useState(false);

    const createReservation = async ({
        slug,
        partySize,
        day,
        time,
        bookerFirstName,
        bookerLastName,
        bookerPhone,
        bookerEmail,
        bookerOccasion,
        bookerRequest,
        setDidBook,
    }: {
        slug: string;
        partySize: string;
        day: string;
        time: string;
        bookerFirstName: string;
        bookerLastName: string;
        bookerPhone: string;
        bookerEmail: string;
        bookerOccasion: string;
        bookerRequest: string;
        setDidBook: Dispatch<SetStateAction<boolean>>;
    }) => {
        setLoading(true);

        // const url = new URL(`http://localhost:3000/api/restaurant/${slug}/reserve`);

        const url = new URL(`/api/restaurant/${slug}/reserve`);
        url.searchParams.append("day", day);
        url.searchParams.append("time", time);
        url.searchParams.append("partySize", partySize);

        try {
            const response = await fetch(url.toString(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    bookerFirstName,
                    bookerLastName,
                    bookerPhone,
                    bookerEmail,
                    bookerOccasion,
                    bookerRequest
                })
            });

            if (!response.ok) {
                const responseData = await response.json();
                throw new Error(responseData.errorMessage);
            }

            const data = await response.json();

            setLoading(false);
            setDidBook(true);
            return data;
        } catch (error) {
            setLoading(false);
        }
    };

    return { loading, createReservation };
}
