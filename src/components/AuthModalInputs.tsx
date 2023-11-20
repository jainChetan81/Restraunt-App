import { LoginSchema, type SchemaType, SignupSchema } from '@/utils/validation-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { type FieldErrors, useForm } from 'react-hook-form';


interface Props {
    isSignin: boolean;
    handleClick: (inputs: SchemaType<boolean>) => void
}

export default function AuthModalInputs({
    isSignin, handleClick
}: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm<SchemaType<typeof isSignin>>({
        resolver: zodResolver(isSignin ? LoginSchema : SignupSchema),
    })
    const onSubmit = (data: SchemaType<typeof isSignin>) => {
        handleClick(data)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {
                isSignin ? null : (
                    <div className="my-3 flex justify-between text-sm">
                        <input
                            type="text"
                            className="border rounded p-2 py-3 w-[49%]"
                            placeholder="First Name"
                            {...register("first_name")}
                        />
                        <small className="text-red-500">{(errors as FieldErrors<SchemaType>)?.first_name?.message}</small>
                        <input
                            type="text"
                            className="border rounded p-2 py-3 w-[49%]"
                            placeholder="Last Name"
                            {...register("last_name")}
                        />
                        <small className="text-red-500">{(errors as FieldErrors<SchemaType>)?.last_name?.message}</small>
                    </div>
                )
            }
            < div className="my-3 flex justify-between text-sm">
                <input
                    type="email"
                    className="border rounded p-2 py-3 w-full"
                    placeholder="Email"
                    {...register("email")}
                />
                <small className="text-red-500">{(errors)?.email?.message}</small>
            </div>
            {
                isSignin ? null : (
                    <div className="my-3 flex justify-between text-sm">
                        <input
                            type="tel"
                            className="border rounded p-2 py-3 w-[49%]"
                            minLength={10}
                            maxLength={10}
                            placeholder="Phone"
                            {...register("phone")}
                        />
                        <small className="text-red-500">{(errors as FieldErrors<SchemaType>)?.phone?.message}</small>
                        <input
                            type="text"
                            className="border rounded p-2 py-3 w-[49%]"
                            placeholder="City"
                            {...register("city")}
                        />
                        <small className="text-red-500">{(errors as FieldErrors<SchemaType>)?.city?.message}</small>
                    </div>
                )
            }
            <div className="my-3 flex justify-between text-sm">
                <input
                    type="password"
                    className="border rounded p-2 py-3 w-full"
                    placeholder="Password"
                    {...register("password")}
                />
                <small className="text-red-500">{(errors)?.password?.message}</small>
            </div>
            <button
                type='submit'
                className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400"
            >
                {isSignin ? "Sign In" : "Create Account"}
            </button>
        </form >
    );
}