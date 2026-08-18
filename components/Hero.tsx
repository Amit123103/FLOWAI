"use client";

import React from "react";
import ProductDashboard from "./ProductDashboard";
import { ArrowRight, Terminal } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden" aria-labelledby="hero-heading">
      {/* Background Ambient Glow Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none -z-10 bg-radial-gradient opacity-60" />

      <div className="max-w-global mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Copy & Actions */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-200 border border-surface-border text-xs font-mono tracking-wider uppercase text-brand-300 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
            THE AI DEVELOPER WORKSPACE
          </div>

          {/* Main Heading */}
          <h1
            id="hero-heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.08]"
          >
            Ship AI products{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-brand-400 to-indigo-200">
              without the infrastructure headache.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg md:text-xl text-muted max-w-2xl mx-auto font-normal leading-relaxed">
            Build, evaluate, deploy, and monitor AI applications from one focused developer workspace.
          </p>

          {/* CTA Group */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href="#cta"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm shadow-lg shadow-brand-600/25 hover:shadow-brand-500/35 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-brand-400"
            >
              <span>Start building</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#dashboard-preview"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-surface-100 hover:bg-surface-50 border border-surface-border text-foreground font-medium text-sm transition-all duration-200 hover:border-surface-border-bright focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <Terminal className="w-4 h-4 text-muted" />
              <span>Explore the workspace</span>
            </a>
          </div>

          {/* Small Supporting Line */}
          <div className="pt-1 text-xs text-muted font-mono">
            Built for developers who want to move from experiment to production.
          </div>
        </div>

        {/* Hero Interactive Product Visual */}
        <div className="mt-12 md:mt-16 max-w-6xl mx-auto">
          <ProductDashboard />
        </div>
      </div>
    </section>
  );
}
