import ApiKey from "@/components/dash/apikey";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "API Key",
    description: "Get your API key here",
    keywords: "API, Key, Dashboard",
}

export default function Page(){
    return <ApiKey />
}