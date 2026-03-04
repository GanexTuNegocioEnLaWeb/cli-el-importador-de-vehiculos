import { Divider } from "@mui/joy";
import Features from "../../components/public/sections/Features";
import Hero from "../../components/public/sections/Hero";
import LogoCollection from "../../components/public/sections/LogoCollections";
import Testimonials from "../../components/public/sections/Testimonials";
import FAQ from "../../components/public/sections/FAQ";
import FeaturedSlider from "../../components/public/sections/FeaturedSlider";

function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedSlider autoplay interval={10000} height={500} />
      <LogoCollection />
      <Features />
      <Divider />
      <Testimonials />
      <Divider />
      <FAQ />
      <Divider />
    </>
  );
}

export default HomePage;
