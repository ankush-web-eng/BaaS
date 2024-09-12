import { SigninForm } from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata : Metadata = {
    title: "Signin",
    description : "Signin to your account"
}

export default function Page(){
    return <SigninForm />
}