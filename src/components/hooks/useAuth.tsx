import { type SchemaType } from "@/utils/validation-schemas";
import { deleteCookie } from "cookies-next";
import { useContext } from "react";
import { AuthenticationContext } from "../app/context/AuthContext";
import { signinMutation, signupMutation } from "@/server/mutation";

const useAuth = () => {
    const { setAuthState } = useContext(AuthenticationContext);

    const signin = async (
        {
            email,
            password,
        }: SchemaType<true>,
        handleClose: () => void
    ) => {
        setAuthState({ data: null, error: null, loading: true, });
        const { data, error } = await signinMutation({ email, password });
        if (error !== null) {
            setAuthState({ data, error, loading: false });
            return;
        }
        setAuthState({ data, error, loading: false });
        handleClose();
    };
    const signup = async (
        data: SchemaType<false>,
        handleClose: () => void
    ) => {
        setAuthState({ data: null, error: null, loading: true, });
        const { data: resData, error } = await signupMutation(data);
        if (error !== null) {
            setAuthState({ data: resData, error, loading: false });
            return;
        }
        setAuthState({ data: resData, error, loading: false });
        handleClose();

    };

    const signout = () => {
        deleteCookie("jwt");

        setAuthState({
            data: null,
            error: null,
            loading: false,
        });
    };

    return {
        signin,
        signup,
        signout,
    };
};

export default useAuth;