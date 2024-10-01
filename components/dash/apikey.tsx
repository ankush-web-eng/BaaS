'use client';
import axios from "axios";
import { useEffect, useState } from "react"

import { useUser } from "@/context/UserContext";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { BottomGradient } from "@/components/auth/SignUpForm";

import { CopyIcon } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { useSession } from "next-auth/react";

const ApiKey = () => {

    const { user, updateUser } = useUser();
    const [apiKey, setApiKey] = useState<string | undefined>(user?.APIKey);
    const [dashboard, setDashboard] = useState<boolean>(false);
    const { toast } = useToast();
    const {data:session} = useSession();

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/credentials/apikey`, {
                email: session?.user?.email
            });
            setApiKey(response.data);
            updateUser();
        } catch (error) {
            console.error(error);
        }
    }

    const handleCopy = () => {
        if (apiKey) {
            window.navigator.clipboard.writeText(apiKey);
            toast({
                title: "Copied to clipboard",
                description: "API Key copied to clipboard",
                duration: 3000,
            });
        }
    }

    useEffect(() => {
        setApiKey(user?.APIKey);
    }, [user?.APIKey]);

    useEffect(() => {
        if (window.location.pathname === "/dashboard/edit") {
            setDashboard(true)
        }
    }, [])


    return (
        <div className="w-fit h-auto py-3 px-5 flex flex-col items-center justify-center space-y-3 shadow-blue-950 dark:shadow-blue-950 rounded-xl">
            <Label htmlFor="apikey">API Key</Label>
            <div className="flex space-x-3">
                <div className="mb-4 relative">
                    <Input
                        id="apikey"
                        placeholder="Generate your API Key"
                        type="text"
                        className="max-w-[500px] pr-8"
                        value={apiKey}
                        disabled
                    />
                    <div onClick={handleCopy} className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer">
                        <CopyIcon size={20} />
                    </div>
                </div>
                {dashboard && <button
                    onClick={handleSubmit}
                    className="relative group/btn flex space-x-2 items-center justify-center px-4 w-fit rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)] text-neutral-700 dark:text-neutral-200">
                    <span>Generate</span>
                    <BottomGradient />
                </button>}
            </div>
        </div>
    )
}


export default ApiKey