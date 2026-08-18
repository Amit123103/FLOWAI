"use client";

import React from "react";
import FeatureCard from "./FeatureCard";
import { FEATURES_DATA } from "@/data/flowai";
import { Cpu } from "lucide-react";

export default function FeatureSection() {
  return (
    <section id="features" className="py-20 md:py-32 relative" aria-labelledby="features-heading">
      <div className="max-w-global mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-surface-200 border border-surface-border text-xs font-mono uppercase tracking-wider text-brand-300">
            <Cpu className="w-3.5 h-3.5 text-brand-400" />
            Capabilities
          </div>
          <h2
            id="features-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground"
          >
            A workspace built around the way developers actually work.
          </h2>
          <p className="text-base sm:text-lg text-muted">
            Eliminate fragmented tools, scattered prompts, and unmeasured quality regressions with a unified platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES_DATA.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              index={index}
              title={feature.title}
              description={feature.description}
              category={feature.category}
              hasMiniUI={feature.hasMiniUI}
              uiType={feature.uiType}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
