import { Metadata } from "next";
import { FileUploadDemo } from "@/components/includes/FileUpload";
import EmailFormDemo from "@/components/includes/SendMail";
import CodeDisplay from "@/components/includes/SampleCode";

export const metadata: Metadata = {
    title: "Docs",
    description: "Documentation - Try sending a mail or uploading a file",
    keywords: "send mail, upload file, docs, documentation, sudodev",
}

export default function Page() {
    return (
        <div className="min-h-screen flex flex-col pt-6 space-y-4 justify-center items-center w-full">
            <div className="flex max-md:flex-col md:justify-evenly max-md:space-y-3 w-full">
                <FileUploadDemo />
                <EmailFormDemo />
            </div>
            <CodeDisplay />
        </div>
    )
}