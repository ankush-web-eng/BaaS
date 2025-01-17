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
import { Loader2, MailIcon, LockIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";

const MailCredentials = () => {
    const { user, updateUser } = useUser();
    const { toast } = useToast();
    const { data: session } = useSession();

    const [emailUser, setEmailUser] = useState("");
    const [password, setPassword] = useState("");
    const [isDashboard, setIsDashboard] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (user && user.Mail) {
            setEmailUser(user.Mail.Email || "");
            setPassword(user.Mail.Password || "");
        }
        setIsDashboard(window.location.pathname === "/dashboard/edit");
    }, [user]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/credentials/mail`, {
                emailUser,
                password,
                email: session?.user?.email
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
                    <CardTitle className="text-2xl font-bold text-center">Gmail Credentials</CardTitle>
                    <CardDescription className="text-center">
                        {isDashboard ? "Update your Gmail credentials" : "Your Gmail information"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="emailUser">Gmail Address</Label>
                            <div className="relative">
                                <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <Input
                                    id="emailUser"
                                    placeholder="Enter Gmail address"
                                    className="pl-10"
                                    disabled={!isDashboard}
                                    value={emailUser}
                                    onChange={(e) => setEmailUser(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">App Password</Label>
                            <div className="relative">
                                <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter app password"
                                    className="pl-10 pr-10"
                                    disabled={!isDashboard}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                >
                                    {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
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
                                    'Update Gmail Credentials'
                                )}
                            </Button>
                        )}
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col items-center">
                    <div className="w-full h-px bg-gray-200 dark:bg-gray-700 my-4" />
                    {isDashboard ? (
                        <Link
                            href="https://knowledge.workspace.google.com/kb/how-to-create-app-passwords-000009237"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            How to create App Passwords
                        </Link>
                    ) : (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Total Mails sent: {user?.Mail?.Requests || 0}
                        </p>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
};

export default MailCredentials;