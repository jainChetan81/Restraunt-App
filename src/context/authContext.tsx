"use client";

import { fetchUserData } from "@/server/mutation";
import { type SchemaType } from "@/utils/validation-schemas";
import { getCookie } from "cookies-next";
import React, { useState, createContext, useEffect } from "react";



interface State {
    loading: boolean;
    error: string | null;
    data: SchemaType | null;
}

interface AuthState extends State {
    setAuthState: React.Dispatch<React.SetStateAction<State>>;
}

export const AuthenticationContext = createContext<AuthState>({
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
    const [authState, setAuthState] = useState<State>({
        loading: true,
        data: null,
        error: null,
    });

    const fetchUser = async () => {
        const jwt = getCookie("jwt");
        if (!jwt) return
        setAuthState({ data: null, error: null, loading: true, });
        const { data, error } = await fetchUserData(jwt);
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
        <AuthenticationContext.Provider
            value={{
                ...authState,
                setAuthState,
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
}