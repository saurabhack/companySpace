import CTASection from "../component/CTASection";
import FeaturesSection from "../component/Features";
import FooterSection from "../component/FooterSection";
import HeroSection from "../component/HeroSection";
import Navbar from "../component/Navbar";
import StatsSection from "../component/StatsSection";
import TestimonialsSection from "../component/TestimonialsSection";

function Home(){
    return(
        <>
          <HeroSection/>
          <StatsSection/>
          <FeaturesSection/>
          <TestimonialsSection/>
          <CTASection/>
        </>
    )
}
export default Home;