"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCapabilities from "@/components/ProductCapabilities";
import FeatureSection from "@/components/FeatureSection";
import HowItWorks from "@/components/HowItWorks";
import BenchmarkComparison from "@/components/BenchmarkComparison";
import RoiCalculator from "@/components/RoiCalculator";
import DeveloperExperience from "@/components/DeveloperExperience";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import WhatsAppChatbot from "@/components/WhatsAppChatbot";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 bg-grid-pattern selection:bg-brand-100 selection:text-brand-800">
      {/* Sticky Navbar */}
      <Navbar />

      {/* Main Page Flow */}
      <main id="main-content" className="flex-grow">
        {/* 3. Hero Section (includes Interactive Product Dashboard & AI Simulator) */}
        <Hero />

        {/* 4. Product Capabilities (Build / Evaluate / Monitor) */}
        <ProductCapabilities />

        {/* 5. Feature Section (6 Platform Features with Mini UIs) */}
        <FeatureSection />

        {/* 6. Platform Benchmark Comparison Matrix */}
        <BenchmarkComparison />

        {/* 7. How It Works (01 Build / 02 Evaluate / 03 Ship) */}
        <HowItWorks />

        {/* 8. Interactive Live Cost & Infrastructure ROI Calculator */}
        <RoiCalculator />

        {/* 9. Developer Experience (Code Editor with Tabs) */}
        <DeveloperExperience />

        {/* 10. Final CTA */}
        <FinalCTA />
      </main>

      {/* 11. Footer */}
      <Footer />

      {/* 12. Floating WhatsApp AI Chatbot Assistant */}
      <WhatsAppChatbot />
    </div>
  );
}
