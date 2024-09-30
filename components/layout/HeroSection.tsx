import React, { useState, useEffect } from "react";
import { Spotlight } from "@/components/ui/Spotlight";
import { FaGolang } from "react-icons/fa6";
import { ChevronDown } from "lucide-react";
import GetStartedButton from "./Header/GetStartedButton";

export default function SpotlightPreview() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
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
    <div className="md:min-h-screen w-full rounded-md flex md:items-center md:justify-center bg-black antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-white text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Get rid of SDK&apos;s <br /> and just focus on development.
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-200 max-w-lg text-center mx-auto">
          Get rid of using the same code again and again. We have built SDK&apos;s for you
          for you so that you can just focus on developing projects. Just make an API call and let us handle the rest.
        </p>
        <p className="mt-4 font-normal text-neutral-300 max-w-lg text-center mx-auto text-xl">
          <FaGolang className="inline" size={40} />
        </p>
        <div className="flex justify-center">
          <GetStartedButton />
        </div>
      </div>
      {isVisible && (
        <div
          className="fixed bottom-8 right-8 bg-white bg-opacity-20 rounded-full p-2 cursor-pointer transition-transform duration-1000 hover:scale-110 animate-bounce"
          onClick={scrollToBottom}
        >
          <ChevronDown className="text-white w-6 h-6" />
        </div>
      )}
    </div>
  );
}