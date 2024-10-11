import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { FaGolang } from "react-icons/fa6";
import GetStartedButton from "@/components/layout/Header/GetStartedButton";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function DotPatternDemo() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.pageYOffset <= 300);
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
        });
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white dark:bg-black">
            <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
                <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
                    Get rid of SDK&apos;s <br /> and just focus on development.
                </h1>
                <p className="mt-4 font-normal text-base text-gray-600 dark:text-gray-300 max-w-lg text-center mx-auto">
                    Get rid of using the same code again and again. We have built SDK&apos;s for you
                    so that you can just focus on developing projects. Just make an API call and let us handle the rest.
                </p>
                <div className="mt-4 flex justify-center">
                    <FaGolang className="text-blue-600 dark:text-blue-400" size={40} />
                </div>
                <div className="mt-8 flex justify-center">
                    <GetStartedButton />
                </div>
            </div>
            {isVisible && (
                <div
                    className="fixed bottom-8 right-8 bg-black dark:bg-white bg-opacity-20 rounded-full p-2 cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-opacity-30 animate-bounce"
                    onClick={scrollToBottom}
                >
                    <ChevronDown className="text-white dark:text-black w-6 h-6" />
                </div>
            )}
            <DotPattern
                className={cn(
                    "absolute inset-0 h-full w-full",
                    "text-gray-300 dark:text-gray-700 opacity-30"
                )}
            />
        </div>
    );
}