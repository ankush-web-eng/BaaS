import HeroVideoDialog from "@/components/magicui/hero-video-dialog";

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
        </div>
    );
}
