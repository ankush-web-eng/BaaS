import SpotlightPreview from "@/components/layout/HeroSection";
import LazyComponent from "@/components/LoadingHomePage";

export default function page() {
  return (
    <div className="no-visible-scrollbar">
      <SpotlightPreview />
      <LazyComponent />
    </div>
  )
}