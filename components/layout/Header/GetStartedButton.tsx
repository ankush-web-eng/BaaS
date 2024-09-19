'use client';
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useSession } from "next-auth/react";

export default function GetStartedButton() {

    const { data: session } = useSession();

    return (
        <Link
            href={session ? "/dashboard" : "/signin"}
            className="inline-flex gap-x-2 justify-start items-start py-3 px-5 ml-3 w-full rounded-3xl border duration-200 sm:w-auto group bg-page-gradient border-white/30 text-md font-geistSans hover:border-zinc-600 hover:bg-transparent/10 hover:text-zinc-100"
        >
            Get Started
            <div className="flex overflow-hidden relative justify-center items-center ml-1 w-5 h-5">
                <ArrowUpRight className="absolute transition-all duration-500 group-hover:translate-x-4 group-hover:-translate-y-5" />
                <ArrowUpRight className="absolute transition-all duration-500 -translate-x-4 -translate-y-5 group-hover:translate-x-0 group-hover:translate-y-0" />
            </div>
        </Link>
    )
}