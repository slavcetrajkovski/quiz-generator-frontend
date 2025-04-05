"use client";

import HeroSection from "./_components/hero-section";
import FeatureSection from "./_components/feature-section";
import Footer from "./_components/footer";

export default function Home() {
  return (
    <div className="flex flex-col bg-white">
      <HeroSection />
      <FeatureSection />
      <Footer />
    </div>
  );
}
