import { HeroSection } from "./HeroSection/HeroSection";
import { FeaturedSection } from "./FeaturedSection/FeaturedSection";
import { TypesSection } from "./TypesSection/TypesSection";
import { CitiesSection } from "./CitiesSection/CitiesSection";

export const HomePage = () => {
  return (
    <>
      <HeroSection />
      <FeaturedSection />
      <TypesSection />
      <CitiesSection />
    </>
  );
};
