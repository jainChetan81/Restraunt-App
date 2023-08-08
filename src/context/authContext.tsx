"use client";

import { fetchUserData } from "@/server/mutation";
import { type SchemaType } from "@/utils/validation-schemas";
import React, { useState, createContext, useEffect } from "react";



interface State {
    loading: boolean;
    error: string | null;
    data: SchemaType | null;
}
function useStoreData() {
    const [authState, setAuthState] = useState<State>({
        loading: false,
        data: null,
        error: null,
    });
    return { ...authState, setAuthState };
}

type UseStoreData = ReturnType<typeof useStoreData>;

export const AuthenticationContext = createContext<UseStoreData>({
    loading: false,
    error: null,
    data: null,
    setAuthState: () => { },
});

export default function AuthContext({
    children,
}: {
    children: React.ReactNode;
}) {
    const { setAuthState, ...authState } = useStoreData();

    const fetchUser = async () => {
        setAuthState({ data: null, error: null, loading: true, });
        const { data, error } = await fetchUserData();
        if (error !== null) {
            setAuthState({ data, error, loading: false });
            return;
        }
        setAuthState({ data, error, loading: false });

    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
            {children}
        </AuthenticationContext.Provider>
    );
}