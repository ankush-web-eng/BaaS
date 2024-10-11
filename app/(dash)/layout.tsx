import Menu from "@/components/layout/Header/Menu";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-white dark:bg-black">
            <Menu />
            {children}
        </div>
    )
}