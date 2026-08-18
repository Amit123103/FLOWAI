"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCapabilities from "@/components/ProductCapabilities";
import FeatureSection from "@/components/FeatureSection";
import HowItWorks from "@/components/HowItWorks";
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
        {/* 3. Hero Section (includes Interactive Product Dashboard) */}
        <Hero />

        {/* 4. Product Capabilities (Build / Evaluate / Monitor) */}
        <ProductCapabilities />

        {/* 5. Feature Section (6 Platform Features with Mini UIs) */}
        <FeatureSection />

        {/* 6. How It Works (01 Build / 02 Evaluate / 03 Ship) */}
        <HowItWorks />

        {/* 7. Developer Experience (Code Editor with Tabs) */}
        <DeveloperExperience />

        {/* 8. Final CTA */}
        <FinalCTA />
      </main>

      {/* 9. Footer */}
      <Footer />

      {/* 10. Floating WhatsApp AI Chatbot Assistant */}
      <WhatsAppChatbot />
    </div>
  );
}
