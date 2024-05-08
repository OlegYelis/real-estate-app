import { HeroSection } from "./HeroSection/HeroSection";
import { FeaturedSection } from "./FeaturedSection/FeaturedSection";
import { TypesSection } from "./TypesSection/TypesSection";

export const HomePage = () => {
  return (
    <>
      <HeroSection />

      <FeaturedSection />

      <TypesSection />
    </>
  );
};
