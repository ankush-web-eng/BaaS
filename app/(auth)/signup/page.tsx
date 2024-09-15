import { SignupForm } from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata : Metadata = {
    title: "Signup",
    description: "Sign up to create your account"
}

export default function Page(){
    return <SignupForm />
}