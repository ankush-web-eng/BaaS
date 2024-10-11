'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import axios, { AxiosError } from "axios";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Loader2, CloudIcon, KeyIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";

const CloudinaryCredentials = () => {
    const { user, updateUser } = useUser();
    const { toast } = useToast();
    const { data: session } = useSession();

    const [cloudname, setCloudname] = useState("");
    const [apikey, setApikey] = useState("");
    const [apisecret, setApisecret] = useState("");
    const [isDashboard, setIsDashboard] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showApiKey, setShowApiKey] = useState(false);
    const [showApiSecret, setShowApiSecret] = useState(false);

    useEffect(() => {
        if (user && user.Cloudinary) {
            setCloudname(user.Cloudinary.CloudName || "");
            setApikey(user.Cloudinary.APIKey || "");
            setApisecret(user.Cloudinary.APISecret || "");
        }
        setIsDashboard(window.location.pathname === "/dashboard/edit");
    }, [user]);

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/credentials/cloudinary`, {
                email: session?.user?.email,
                cloudname,
                apikey,
                apisecret
            });
            updateUser();
            toast({
                title: "Success",
                description: response.data.message,
            });
        } catch (error) {
            const axiosError = error as AxiosError<string>;
            toast({
                title: "Error",
                description: axiosError.response?.data || "An error occurred",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Cloudinary Credentials</CardTitle>
                    <CardDescription className="text-center">
                        {isDashboard ? "Update your Cloudinary credentials" : "Your Cloudinary information"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="cloudname">Cloud Name</Label>
                            <div className="relative">
                                <CloudIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <Input
                                    id="cloudname"
                                    placeholder="Enter cloud name"
                                    className="pl-10"
                                    disabled={!isDashboard}
                                    value={cloudname}
                                    onChange={(e) => setCloudname(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="apikey">API Key</Label>
                            <div className="relative">
                                <KeyIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <Input
                                    id="apikey"
                                    type={showApiKey ? "text" : "password"}
                                    placeholder="Enter API key"
                                    className="pl-10 pr-10"
                                    disabled={!isDashboard}
                                    value={apikey}
                                    onChange={(e) => setApikey(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowApiKey(!showApiKey)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                >
                                    {showApiKey ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                                </button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="apisecret">API Secret</Label>
                            <div className="relative">
                                <KeyIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <Input
                                    id="apisecret"
                                    type={showApiSecret ? "text" : "password"}
                                    placeholder="Enter API secret"
                                    className="pl-10 pr-10"
                                    disabled={!isDashboard}
                                    value={apisecret}
                                    onChange={(e) => setApisecret(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowApiSecret(!showApiSecret)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                >
                                    {showApiSecret ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                                </button>
                            </div>
                        </div>
                        {isDashboard && (
                            <Button className="w-full" type="submit" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    'Update Credentials'
                                )}
                            </Button>
                        )}
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col items-center">
                    <div className="w-full h-px bg-gray-200 dark:bg-gray-700 my-4" />
                    {isDashboard ? (
                        <Link
                            href="https://cloudinary.com/documentation/finding_your_credentials_tutorial"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            How to get Cloudinary Credentials
                        </Link>
                    ) : (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Total files uploaded: {user?.Cloudinary?.Requests || 0}
                        </p>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
};

export default CloudinaryCredentials;