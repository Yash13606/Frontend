import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import TestimonialCards from "@/components/landing/TestimonialCards";
import ModulePhases from "@/components/landing/ModulePhases";
import RecognitionGrid from "@/components/landing/RecognitionGrid";
import IndustryVerticals from "@/components/landing/IndustryVerticals";
import DeploymentJourney from "@/components/landing/DeploymentJourney";
import WhyVisionIQ from "@/components/landing/WhyVisionIQ";
import ComparisonTable from "@/components/landing/ComparisonTable";
import BlogSection from "@/components/landing/BlogSection";
import FAQSection from "@/components/landing/FAQSection";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";
import { BGPattern } from "@/components/ui/bg-pattern";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Full-page grid background behind everything */}
      <BGPattern
        variant="grid"
        mask="none"
        size={60}
        fill="rgba(255,255,255,0.07)"
      />
      <Navbar />
      <HeroSection />
      <ModulePhases />
      <RecognitionGrid />
      <DeploymentJourney />
      <IndustryVerticals />
      <WhyVisionIQ />
      <TestimonialCards />
      <ComparisonTable />
      <BlogSection />
      <FAQSection />
      <FinalCTA />
      <div id="footer-section">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
