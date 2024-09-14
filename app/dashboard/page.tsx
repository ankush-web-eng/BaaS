import ApiKey from "@/components/dash/apikey";
import { Metadata } from "next";

export const metadata : Metadata = {
    title : "Dashboard",
    description : "DevX Dashboard",
    keywords : "DevX, Dashboard, Acocunt"
}

export default function Page() {

    return (
        <div className="min-h-screen bg-[#0f0a39] flex justify-center items-center">
            <ApiKey />
        </div>
    )
}