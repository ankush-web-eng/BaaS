'use client';
import dynamic from "next/dynamic";
import SpotlightPreview from "@/components/layout/HeroSection";
const LazyComponent = dynamic(() => import("@/components/LoadingHomePage"), { ssr: false });

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
      <SpotlightPreview />
      <LazyComponent />
    </>
  )
}