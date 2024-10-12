import { Metadata } from "next";
import { FileUploadDemo } from "@/components/includes/FileUpload";
import EmailFormDemo from "@/components/includes/SendMail";

export const metadata: Metadata = {
    title: "Docs",
    description: "Try sending a mail or uploading a file",
    keywords: "send mail, upload file",
}

export default function Page() {
    return (
        <div className="min-h-screen flex justify-center items-center w-full">
            <div className="flex max-md:flex-col md:justify-evenly max-md:space-y-3 w-full">
                <FileUploadDemo />
                <EmailFormDemo />
            </div>
        </div>
    )
}