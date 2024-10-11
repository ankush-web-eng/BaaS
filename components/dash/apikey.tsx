'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import axios from "axios";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CopyIcon, KeyIcon, RefreshCwIcon } from "lucide-react";

const ApiKey = () => {
    const { user, updateUser } = useUser();
    const { toast } = useToast();
    const { data: session } = useSession();

    const [apiKey, setApiKey] = useState("");
    const [isDashboard, setIsDashboard] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setApiKey(user.APIKey || "");
        }
        setIsDashboard(window.location.pathname === "/dashboard/apikey");
    }, [user]);

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/credentials/apikey`, {
                email: session?.user?.email
            });
            setApiKey(response.data);
            updateUser();
            toast({
                title: "Success",
                description: "New API Key generated successfully",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to generate new API Key",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        if (apiKey) {
            navigator.clipboard.writeText(apiKey);
            toast({
                title: "Copied",
                description: "API Key copied to clipboard",
            });
        }
    };

    return (
        <Card className="w-full min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">API Key</CardTitle>
                <CardDescription>
                    {isDashboard ? "Generate or copy your API Key" : "Your API Key"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="apikey">API Key</Label>
                        <div className="relative">
                            <KeyIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <Input
                                id="apikey"
                                placeholder="Your API Key"
                                className="pl-10 pr-10"
                                value={apiKey}
                                readOnly
                            />
                            <button
                                onClick={handleCopy}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                title="Copy to clipboard"
                            >
                                <CopyIcon size={18} />
                            </button>
                        </div>
                    </div>
                    {isDashboard && (
                        <Button 
                            onClick={handleGenerate} 
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? (
                                <RefreshCwIcon className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <RefreshCwIcon className="mr-2 h-4 w-4" />
                            )}
                            Generate New API Key
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default ApiKey;