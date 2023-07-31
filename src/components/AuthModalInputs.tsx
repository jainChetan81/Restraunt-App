import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface Props {
    isSignin: boolean;
}
const LoginSchema = z.object({
    email: z.string().email().nonempty(),
    password: z.string().min(6).max(20)
})
const SignupSchema = LoginSchema.extend({
    firstName: z.string().min(2).max(20),
    lastName: z.string().min(2).max(20),
    phone: z.string().min(10).max(10),
    city: z.string().min(2).max(20),
})
type SchemaType<T extends boolean> = z.infer<T extends true ? typeof LoginSchema : typeof SignupSchema>
export default function AuthModalInputs({
    isSignin,
}: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm<SchemaType<typeof isSignin>>({
        resolver: zodResolver(isSignin ? LoginSchema : SignupSchema),
    })
    const onSubmit = (data: SchemaType<typeof isSignin>) => {
        console.log("dsdsds", data)
    }
    console.log({ errors })
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {
                isSignin ? null : (
                    <div className="my-3 flex justify-between text-sm">
                        <input
                            type="text"
                            className="border rounded p-2 py-3 w-[49%]"
                            placeholder="First Name"
                            {...register("firstName")}
                        />
                        <input
                            type="text"
                            className="border rounded p-2 py-3 w-[49%]"
                            placeholder="Last Name"
                            {...register("lastName")}
                        />
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
            </div>
            {
                isSignin ? null : (
                    <div className="my-3 flex justify-between text-sm">
                        <input
                            type="text"
                            className="border rounded p-2 py-3 w-[49%]"
                            placeholder="Phone"
                            {...register("phone")}
                        />
                        <input
                            type="text"
                            className="border rounded p-2 py-3 w-[49%]"
                            placeholder="City"
                            {...register("city")}
                        />
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
            </div>
            <button
                className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400"
            >
                {isSignin ? "Sign In" : "Create Account"}
            </button>
        </form >
    );
}