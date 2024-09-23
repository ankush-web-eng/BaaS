'use client';
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { useUser } from "@/context/UserContext";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

import { Label } from "@radix-ui/react-label";
import { LabelInputContainer, BottomGradient } from "@/components/auth/SignUpForm";
import { RiLoader2Line } from "react-icons/ri";

const MailCredentials = () => {

    const { user, updateUser } = useUser();
    const { toast } = useToast();
    const { data: session } = useSession();
    const email = session?.user?.email;

    const [emailUser, setEmailUser] = useState<string | undefined>(user?.Mail?.Email);
    const [password, setPassword] = useState<string | undefined>(user?.Mail?.Password);
    const [dashboard, setDashboard] = useState<boolean>(false);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/credentials/mail`, {
                emailUser,
                password,
                email
            });
            if (res.status === 200) {
                updateUser();
                toast({
                    title: "Success",
                    description: res.data.message,
                });
            }
        } catch (error) {
            const axiosError = error as AxiosError<string>;
            const errorMessage = axiosError.response?.data || "Server error";

            toast({
                title: "Error",
                description: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setEmailUser(user?.Mail?.Email);
        setPassword(user?.Mail?.Password);
    }, [user?.Mail?.Email, user?.Mail?.Password]);

    useEffect(() => {
        if (window.location.pathname === "/dashboard/edit") {
            setDashboard(true)
        }
    }, [])


    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-full max-w-md py-3 px-5 flex flex-col items-center justify-center space-y-3 shadow-blue-950 rounded-xl">
                <form className="my-8 w-full" onSubmit={handleSubmit} >
                    <div className="w-full flex flex-col items-center space-y-2 mb-4">
                        <LabelInputContainer>
                            <Label htmlFor="userEmail">Gmail Address</Label>
                            <Input
                                id="emailUser"
                                placeholder="Gmail Address"
                                disabled={!dashboard}
                                value={emailUser}
                                onChange={(e) => setEmailUser(e.target.value)}
                            />
                        </LabelInputContainer>
                    </div>

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Cloudinary API Key</Label>
                        <Input
                            id="password"
                            placeholder="Password"
                            type="password"
                            disabled={!dashboard}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </LabelInputContainer>

                    {dashboard &&
                        <button
                            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] "
                            type="submit"
                        >
                            {loading ? (
                                <span className="flex justify-center items-center">
                                    <RiLoader2Line className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </span>
                            ) : (
                                'Update Gmail Credentials'
                            )}
                            <BottomGradient />
                        </button>}

                    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                    <div className="flex w-full items-center justify-center mt-3">
                        {dashboard && <Link
                            target="_blank"
                            href={'https://knowledge.workspace.google.com/kb/how-to-create-app-passwords-000009237'}
                            className="text-slate-500 hover:text-slate-300">
                            How to create App Passwords
                        </Link>}
                        {!dashboard && 
                        <p>Total Mails sent : {user?.Mail?.Requests}</p>}
                    </div>
                </form>
            </div>
        </div>
    )
}
export default MailCredentials