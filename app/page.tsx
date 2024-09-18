import SpotlightPreview from "@/components/layout/HeroSection";
import { PostmanScroll } from "@/components/layout/PostmanScroll";

export default function page() {
  return (
    <div className="no-visible-scrollbar">
      <SpotlightPreview />
      <PostmanScroll />
    </div>
  )
}