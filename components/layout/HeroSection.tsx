import React from "react";
import { Spotlight } from "@/components/ui/Spotlight";
import { FaGolang } from "react-icons/fa6";

export default function SpotlightPreview() {
  return (
    <div className="min-h-screen w-full rounded-md flex md:items-center md:justify-center bg-black antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
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
      </div>
    </div>
  );
}
