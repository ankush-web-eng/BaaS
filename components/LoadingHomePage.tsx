'use client';
import { useState, useEffect } from "react";
import YouTubeTutorial from "./includes/YoutubeTutorial";
import { PostmanScroll } from "./layout/PostmanScroll";

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
        <div className="no-visible-scrollbar mb-8">
            {scrolled ?
                <>
                    <PostmanScroll />
                    <YouTubeTutorial />
                </>
                :
                <div className="min-h-screen"></div>
            }
        </div>
    );
}
