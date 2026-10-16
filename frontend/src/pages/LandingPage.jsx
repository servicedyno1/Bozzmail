import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { ProductShowcase } from "@/components/landing/ProductShowcase";
import { Values } from "@/components/landing/Values";
import { DarkBand } from "@/components/landing/DarkBand";
import { DownloadSection } from "@/components/landing/DownloadSection";
import { Mission } from "@/components/landing/Mission";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { Audiences } from "@/components/landing/Audiences";
import { CTABand } from "@/components/landing/CTABand";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main className="bg-paper" data-testid="landing-page">
      <Header />
      <Hero />
      <ProductShowcase />
      <Values />
      <DarkBand />
      <DownloadSection />
      <Mission />
      <FeatureGrid />
      <Audiences />
      <CTABand />
      <Footer />
    </main>
  );
}
