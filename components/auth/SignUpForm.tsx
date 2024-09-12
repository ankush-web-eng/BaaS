'use client';
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import axios from "axios";
import { IconBrandGoogle } from "@tabler/icons-react";
import { useToast } from "@/hooks/use-toast";
import { RiLoader2Line } from "react-icons/ri";

type SignupFormData = {
    firstname: string;
    email: string;
    password: string;
};

export function SignupForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>();
    const { toast } = useToast();
    const [loading, setLoading] = React.useState(false);

    const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/signup`, data);
            console.log(data);
            if (response.status === 201) {
                toast({
                    title: "Success",
                    description: "User created successfully!",
                });
            }
            console.log(response.data);
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Something went wrong",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center dark:bg-[#0f0a39]">
            <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-2xl bg-white dark:bg-black shadow-blue-950">
                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                    Welcome to DevX
                </h2>

                <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                        <LabelInputContainer>
                            <Label htmlFor="firstname">First name</Label>
                            <Input 
                                id="firstname" 
                                placeholder="Ankush" 
                                {...register("firstname", { required: true })}
                            />
                            {errors.firstname && <span className="text-red-500 text-sm">First name is required</span>}
                        </LabelInputContainer>
                    </div>

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                            id="email" 
                            placeholder="ankushsingh.dev@gmail.com" 
                            type="email" 
                            {...register("email", { required: true })}
                        />
                        {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
                    </LabelInputContainer>

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="password">Password</Label>
                        <Input 
                            id="password" 
                            placeholder="••••••••" 
                            type="password" 
                            {...register("password", { required: true })}
                        />
                        {errors.password && <span className="text-red-500 text-sm">Password is required</span>}
                    </LabelInputContainer>

                    <button
                        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] "
                        type="submit"
                    >
                        {loading ? <RiLoader2Line className="animate-spin" /> : "Sign up"}
                        <BottomGradient />
                    </button>

                    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                    <div className="flex flex-col space-y-4">
                        <button
                            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                            type="button"
                        >
                            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                                Google
                            </span>
                            <BottomGradient />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
