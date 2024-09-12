import { FloatingNav } from "@/components/ui/floating-navbar";

const navItems = [
    {
        name: "Home",
        link: "/",
    },
    {
        name: "About",
        link: "https://ankushsingh.tech/about",
    },
    {
        name: "Contact",
        link: "https://ankushsingh.tech/freelance",
    },
    {
        name: "Dashboard",
        link: "/dashboard"
    }
];

export default function Navbar() {
    return (
        <FloatingNav navItems={navItems} />
    )
}