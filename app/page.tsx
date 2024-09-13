import SpotlightPreview from "@/components/layout/HeroSection";

export default function page() {
  return (
    <div className="no-visible-scrollbar">
      <SpotlightPreview />
      <div className="min-h-screen flex justify-center items-center bg-[#0f0a39]">
        The app is in development mode right now!!
      </div>
    </div>
  )
}