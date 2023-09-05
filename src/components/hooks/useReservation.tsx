import { type Dispatch, type SetStateAction, useState } from "react";

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
        try {
            const url = `/api/restaurant/${slug}/reserve`;
            const body = {
                bookerFirstName,
                bookerLastName,
                bookerPhone,
                bookerEmail,
                bookerOccasion,
                bookerRequest,
            };

            const fullURL = `${url}?partySize=${partySize}&day=${day}&time=${time}`;

            const response = await fetch(fullURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const responseData = await response.json();
                throw new Error(responseData.errorMessage);
            }

            const responseData = await response.json();


            setLoading(false);
            setDidBook(true);
            return responseData;
        } catch (error) {
            setLoading(false);
        }
    };

    return { loading, createReservation };
}
