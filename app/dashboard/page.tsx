import ApiKey from "@/components/dash/apikey";
import CloudinaryCredentials from "@/components/dash/cloudinary";
import MailCredentials from "@/components/dash/mail";
import Menu from "@/components/layout/Header/Menu";
import { Metadata } from "next";

export const metadata : Metadata = {
    title : "Dashboard",
    description : "DevX Dashboard",
    keywords : "DevX, Dashboard, Acocunt"
}

export default function Page() {

    return (
        <div className="min-h-screen bg-[#0f0a39] flex max-md:flex-col max-md:space-y-3 justify-center items-center space-x-5">
            <Menu />
            <ApiKey />
            <CloudinaryCredentials />
            <MailCredentials />
        </div>
    )
}