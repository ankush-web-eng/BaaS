'use client';
// import { Metadata } from "next";
import { useSession } from "next-auth/react";

// export const metadata : Metadata = {
//     title : "Dashboard",
//     description : "DevX Dashboard",
//     keywords : "DevX, Dashboard, Acocunt"
// }

export default function Page() {

    const {data:session} = useSession();
    console.log(session?.user)
    return (
        <div className="min-h-screen bg-[#0f0a39] flex justify-center items-center">
            <h1 className="text-white text-3xl">Dashboard user is {session?.user?.Email}</h1>
        </div>
    )
}