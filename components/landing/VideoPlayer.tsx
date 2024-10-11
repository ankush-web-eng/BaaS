import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/magicui/dot-pattern";

export function HeroVideo() {
    return (
        <div className="relative md:min-h-screen max-md:px-3 flex justify-center items-center bg-white dark:bg-black">
            <HeroVideoDialog
                className="dark:hidden block"
                animationStyle="from-center"
                videoSrc="https://www.youtube.com/embed/gGhcjKgid4A?si=QY5HNbEykyi7gTfS"
                thumbnailSrc="https://sudodev.ankushsingh.tech/og-image.png"
                thumbnailAlt="Hero Video"
            />
            <HeroVideoDialog
                className="hidden dark:block"
                animationStyle="from-center"
                videoSrc="https://www.youtube.com/embed/gGhcjKgid4A?si=QY5HNbEykyi7gTfS"
                thumbnailSrc="https://sudodev.ankushsingh.tech/og-image.png"
                thumbnailAlt="Hero Video"
            />
            <DotPattern
                className={cn(
                    "absolute inset-0 h-full w-full",
                    "text-gray-300 dark:text-gray-700 opacity-30 -z-10"
                )}
            />
        </div>
    );
}
