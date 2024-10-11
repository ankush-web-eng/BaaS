'use client';
import { useState, useEffect } from "react";
import { HeroVideo } from "./layout/VideoPlayer";

export default function LazyComponent() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="bg-white dark:bg-black pb-8">
            {scrolled ?
                <>
                    <HeroVideo />
                </>
                :
                <div className="min-h-screen"></div>
            }
        </div>
    );
}
