"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import axios, { AxiosError } from "axios";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "../ui/button";
import { Upload } from "lucide-react";
import UploadFileDemoCode from "./file-upload";

export function FileUploadDemo() {
    const [file, setFile] = useState<File>();
    const [url, setUrl] = useState<string>();
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');

    const handleFileUpload = (files: File[]) => {
        const file = files[0];
        setIsUploading(true);
        setFile(file);
        setError('');
        if (file.size > 2 * 1024 * 1024) {
            setError('Image size is too large (max 2MB)');
            setIsUploading(false);
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new window.Image();
            img.onload = () => {
                // setImageSrc(e.target?.result as string);
                setIsUploading(false);
                // UploadFile(file);
            };
            if (e.target?.result) {
                img.src = e.target.result as string;
            }
        };
        reader.readAsDataURL(file);
    };

    const UploadFile = async (file: File) => {
        if (!file) {
            setError('No file selected');
            return;
        }
        try {
            const formData = new FormData();
            formData.append("file", file as File);
            const res = await axios.post('https://api.devx.ankushsingh.tech/service/upload-file', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Accept": "application/json",
                    "API_KEY": process.env.NEXT_PUBLIC_API_KEY as string
                }
            })
            console.log(res.data);
            setUrl(res.data);
        } catch (error) {
            const axiosError = error as AxiosError<string>;
            alert(axiosError.response?.data);
            console.error(axiosError?.response);
            console.error(error)
        }
    }

    return (
        <div className="w-[40%] max-md:w-full max-w-4xl mx-auto min-h-96 drop-shadow-lmd shadow-md shadow-blue-950 border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
            <FileUpload onChange={handleFileUpload} />
            <Card className="w-full max-w-md mx-auto">
                <CardContent className="flex flex-col items-center space-y-4">
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    {url && (
                        <Alert variant="default" className="w-fit z-20">
                            <AlertDescription>{url}</AlertDescription>
                        </Alert>
                    )}
                    <CardFooter className="flex justify-center">
                        <Button
                            onClick={() => UploadFile(file!)}
                            disabled={isUploading}
                            className="w-full max-w-xs"
                        >
                            {isUploading ? (
                                <>
                                    <Upload className="mr-2 h-4 w-4 animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload Image
                                </>
                            )}
                        </Button>
                    </CardFooter>
                </CardContent>
            </Card>
            <UploadFileDemoCode />
        </div>
    );
}
