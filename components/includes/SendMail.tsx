"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { RiLoader2Line } from "react-icons/ri";
import { useToast } from "@/hooks/use-toast";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";

export function EmailFormDemo() {
    const [to, setTo] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const { toast } = useToast();
    const { data: session } = useSession();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();

        const emailData = {
            to: to.split(",").map(email => email.trim()),
            subject,
            body,
            from: session?.user?.email
        };

        console.log("Email Data: ", emailData);
        try {
            const res = await axios.post('https://api.devx.ankushsingh.tech/service/send-mail', emailData, {
                headers: {
                    "API_KEY": process.env.NEXT_PUBLIC_API_KEY as string
                }
            });
            console.log("Response: ", res.data);
            toast({
                title: "Success",
                description: res.data.message,
                value: "success",
            });
        } catch (error) {
            console.error("Error sending email: ", error);
            const axiosError = error as AxiosError<string>;
            const errorMessage = axiosError.response?.data || axiosError.message;
            toast({
                title: "Error",
                description: errorMessage,
                value: "destructive",
            })
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md w-[50%] max-md:w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <p className="text-neutral-600 drop-shadow-2xl shadow-blue-950  max-w-sm mt-2 dark:text-neutral-300 text-xl font-bold">
                Enter details to send an email
            </p>

            <form className="my-8" onSubmit={handleSubmit}>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="emailTo">Email (To)</Label>
                    <Input
                        id="emailTo"
                        placeholder="recipient1@example.com, recipient2@example.com"
                        type="text"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                    />
                </LabelInputContainer>

                <LabelInputContainer className="mb-4">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                        id="subject"
                        placeholder="Enter the subject"
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </LabelInputContainer>

                <LabelInputContainer className="mb-8">
                    <Label htmlFor="body">Body</Label>
                    <textarea
                        id="body"
                        placeholder="Enter the email body"
                        className="w-full p-2 rounded-md border dark:bg-zinc-800"
                        rows={5}
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </LabelInputContainer>

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
                        'Send Email'
                    )}
                    <BottomGradient />
                </button>
            </form>
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
