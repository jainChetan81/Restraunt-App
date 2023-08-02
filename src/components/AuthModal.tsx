"use client"
import { Alert, CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import AuthModalInputs from './AuthModalInputs';

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function AuthModal({ isSignin = false }: { isSignin?: boolean }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // const { signin, signup } = useAuth();
    // const { loading, data, error } = useContext(AuthenticationContext);

    const handleClick = () => {
        // if (isSignin) {
        //     signin({ email: inputs.email, password: inputs.password }, handleClose);
        // } else {
        //     signup(inputs, handleClose);
        // }
    };

    return (
        <div>
            <button onClick={handleOpen} className={`${isSignin ? "bg-blue-400 text-white border mr-3" : "border p-1 px-4 rounded"} p-1 px-4 rounded`}>{isSignin ? "Sign in" : "Sign up"}</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {false ? (
                        <div className="py-24 px-2 h-[600px] flex justify-center">
                            <CircularProgress />
                        </div>
                    ) : (
                        <div className="p-2 h-[600px]">
                            {false ? (
                                <Alert severity="error" className="mb-4">
                                    {/* {error} */}
                                </Alert>
                            ) : null}
                            <div className="uppercase font-bold text-center pb-2 border-b mb-2">
                                <p className="text-sm">
                                    {isSignin ? "Sign In" : "Create Account"}
                                </p>
                            </div>
                            <div className="m-auto">
                                <h2 className="text-2xl font-light text-center">
                                    {isSignin ?
                                        "Log Into Your Account" :
                                        "Create Your OpenTable Account"
                                    }
                                </h2>
                                <AuthModalInputs
                                    isSignin={isSignin}
                                />

                            </div>
                        </div>
                    )}
                </Box>
            </Modal>
        </div>
    );
}
