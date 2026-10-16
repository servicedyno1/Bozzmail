import { Header, AnnouncementBar } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { ProblemBeat } from "@/components/landing/ProblemBeat";
import { FAQ } from "@/components/landing/FAQ";
import { ProductShowcase } from "@/components/landing/ProductShowcase";
import { Values } from "@/components/landing/Values";
import { SignupBand } from "@/components/landing/SignupBand";
import { DownloadSection } from "@/components/landing/DownloadSection";
import { Mission } from "@/components/landing/Mission";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { Business } from "@/components/landing/Business";
import { Pricing } from "@/components/landing/Pricing";
import { Audiences } from "@/components/landing/Audiences";
import { CTABand } from "@/components/landing/CTABand";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main className="bg-white" data-testid="landing-page">
      <AnnouncementBar />
      <Header />
      <Hero />
      <ProblemBeat />
      <ProductShowcase />
      <Values />
      <SignupBand />
      <Mission />
      <FeatureGrid />
      <Pricing />
      <DownloadSection />
      <Business />
      <Audiences />
      <FAQ />
      <CTABand />
      <Footer />
    </main>
  );
}
