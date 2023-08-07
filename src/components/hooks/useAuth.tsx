import { type SchemaType } from "@/utils/validation-schemas";
import { deleteCookie } from "cookies-next";
import { useContext } from "react";
import { AuthenticationContext } from "@/context/authContext";
import { signinMutation, signupMutation } from "@/server/mutation";

const useAuth = () => {
    const { setAuthState } = useContext(AuthenticationContext);

    const signin = async (
        inputs: SchemaType<true>,
        handleClose: () => void
    ) => {
        setAuthState({ data: null, error: null, loading: true, });
        const { data: resData, error } = await signinMutation({ email: inputs.email, password: inputs.password });
        if (error !== null) {
            setAuthState({ data: resData, error, loading: false });
            return;
        }
        setAuthState({ data: resData, error, loading: false });
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