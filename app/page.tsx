import HeroSection from "@/components/home/HeroSection";
import LatestUpdates from "@/components/home/LatestUpdates";
import StateJobsSection from "@/components/home/StateJobsSection";
import StudyResourcesSection from "@/components/home/StudyResourcesSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <LatestUpdates />
      <StateJobsSection />
      <StudyResourcesSection />
    </>
  );
}
