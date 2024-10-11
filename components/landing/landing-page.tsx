'use client';
import dynamic from "next/dynamic";
import LandingHeroComponent from "@/components/landing/HeroDots";
const LazyComponent = dynamic(() => import("@/components/landing/LoadingHomePage"), { ssr: false });

export default function LandingPage() {
  return (
    <>
      <style jsx global>{`
        ::-webkit-scrollbar {
          display: none;
        }

        html {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <LandingHeroComponent />
      <LazyComponent />
    </>
  )
}