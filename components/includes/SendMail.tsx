'use client';
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import axios, { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Loader2, MailIcon, SendIcon } from "lucide-react";

const EmailFormDemo = () => {
    const [to, setTo] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(false);

    const { toast } = useToast();
    const { data: session } = useSession();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const emailData = {
            to: to.split(",").map(email => email.trim()),
            subject,
            body,
            from: session?.user?.email
        };

        try {
            const res = await axios.post('https://api.devx.ankushsingh.tech/service/send-mail', emailData, {
                headers: {
                    "API_KEY": process.env.NEXT_PUBLIC_API_KEY as string
                }
            });
            toast({
                title: "Success",
                description: res.data.message,
            });
        } catch (error) {
            const axiosError = error as AxiosError<string>;
            console.error("Error sending email: ", axiosError);
            toast({
                title: "Error",
                description: axiosError.response?.data || "An error occurred while sending the email",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Send an Email</CardTitle>
                <CardDescription>Enter the details to send an email</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="emailTo">To</Label>
                        <div className="relative">
                            <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <Input
                                id="emailTo"
                                placeholder="recipient1@example.com, recipient2@example.com"
                                className="pl-10"
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                            id="subject"
                            placeholder="Enter the subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="body">Body</Label>
                        <Textarea
                            id="body"
                            placeholder="Enter the email body"
                            rows={5}
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                <SendIcon className="mr-2 h-4 w-4" />
                                Send Email
                            </>
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default EmailFormDemo;