"use client";

import React, { useState } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import FeatureSection from "@/components/FeatureSection";
import WorkflowSection from "@/components/WorkflowSection";
import CodePreview from "@/components/CodePreview";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import EasterEgg from "@/components/EasterEgg";

export default function Home() {
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [easterEggTriggered, setEasterEggTriggered] = useState(false);

  const handleLogoClick = () => {
    const nextCount = logoClickCount + 1;
    setLogoClickCount(nextCount);
    if (nextCount >= 5) {
      setEasterEggTriggered(true);
      setLogoClickCount(0);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 bg-grid-pattern selection:bg-brand-100 selection:text-brand-800">
      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Sticky Navigation */}
      <Navbar onLogoClick={handleLogoClick} />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-grow">
        {/* 1. Hero Section + Interactive Product Visual */}
        <Hero />

        {/* 2. Product Showcase Section (Build / Evaluate / Monitor) */}
        <ProductShowcase />

        {/* 3. Feature Section (6 Platform Features) */}
        <FeatureSection />

        {/* 4. How it Works / Workflow Section (01 Build / 02 Evaluate / 03 Ship) */}
        <WorkflowSection />

        {/* 5. Developer Experience Section (Code & Prompt Tabs) */}
        <CodePreview />

        {/* 6. CTA Section */}
        <CTASection />
      </main>

      {/* 7. Footer */}
      <Footer />

      {/* Optional Easter Egg */}
      <EasterEgg
        triggeredExternally={easterEggTriggered}
        onClose={() => setEasterEggTriggered(false)}
      />
    </div>
  );
}
