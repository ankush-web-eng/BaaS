import dynamic from "next/dynamic";
import SpotlightPreview from "@/components/layout/HeroSection";
const LazyComponent = dynamic(() => import("@/components/LoadingHomePage"), { ssr: false });

export default function page() {
  return (
    <div className="">
      <SpotlightPreview />
      <LazyComponent />
    </div>
  )
}