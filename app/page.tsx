import Image from "next/image";
import { Button } from "@/components/ui/button"
import BackgroundAnimation from "./dashboard/_components/background-animation";
import Nav from "./dashboard/_components/NavLanding";
import HeroSection from "./dashboard/_components/HeroSection";
import FeaturesSection from "./dashboard/_components/FeatureSection";
import Testimonials from "./dashboard/_components/testimonials";
import Pricing from "./dashboard/_components/Pricing";
import CtaSection from "./dashboard/_components/CTASection";
import Footer from "./dashboard/_components/Footer";


export default function Home() {
  return (
    <div className="relative">
      <BackgroundAnimation />
      <div className="relative z-10">
        <Nav/>
        <main>
          <HeroSection/>
          <FeaturesSection/>
          <Testimonials/>
          <Pricing/>
          <CtaSection/>
        </main>
        <Footer/>
      </div>
    </div>
  );
}
