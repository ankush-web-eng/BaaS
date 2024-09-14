'use client';
import { useUser } from "@/context/UserContext";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { useEffect, useState } from "react"
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

const ApiKey = () => {

    const { user, updateUser } = useUser();
    const [apiKey, setApiKey] = useState<string | undefined>(user?.apikey);
    const isApiKey = apiKey ? true : false;

    useEffect(() => {
        updateUser();
    }, [updateUser]);

    const hadleSubmit = async () => {
        if (isApiKey) {
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/service/apikey`, {
                    apikey: apiKey
                });
                setApiKey(response.data);
                updateUser();
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <div className="w-fit h-auto p-3 flex items-center space-x-3">
            <div className="">
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="apikey">API Key</Label>
                    <Input
                        id="apikey"
                        placeholder="Generate your API Key"
                        type="text"
                        value={apiKey}
                        disabled
                    />
                </LabelInputContainer>
            </div>
            {isApiKey && <button
                onClick={hadleSubmit}
                className="relative group/btn flex space-x-2 items-center justify-center px-4 w-fit text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]">
                <span>Generate</span>
                <BottomGradient />
            </button>}
        </div>
    )
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


export default ApiKey