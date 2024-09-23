// import ApiKey from "@/components/dash/apikey";
import ApiKey from "@/components/dash/apikey";
import CloudinaryCredentials from "@/components/dash/cloudinary";
import MailCredentials from "@/components/dash/mail";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "SudoDev Dashboard",
    keywords: "SudoDev, Dashboard, Acocunt"
}

export default function Page() {

    return (
        <div className="min-h-screen flex flex-col max-md:space-y-3 justify-center items-center space-x-5">
            <div className="flex w-full max-md:flex-col">
                <CloudinaryCredentials />
                <MailCredentials />
            </div>
            <ApiKey />
        </div>
    )
}