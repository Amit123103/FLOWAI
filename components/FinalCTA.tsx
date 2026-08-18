"use client";

import React from "react";
import { ArrowRight, Terminal } from "lucide-react";

export default function FinalCTA() {
  return (
    <section id="cta" className="py-20 md:py-32 relative overflow-hidden" aria-labelledby="cta-heading">
      <div className="max-w-global mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-8 sm:p-12 md:p-16 text-center shadow-xl overflow-hidden">
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-50 border border-brand-200 text-xs font-mono uppercase tracking-wider text-brand-700 shadow-sm font-semibold">
              Get Started with FlowAI
            </span>

            <h2
              id="cta-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900"
            >
              Build the workflow. Ship the product.
            </h2>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto">
              Give your AI experiments a workspace designed for the entire journey.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <a
                href="#dashboard-preview"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-lg shadow-brand-600/20 hover:shadow-brand-600/30 transition-all duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-brand-400"
              >
                <span>Start building</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#developer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-medium text-sm shadow-sm transition-all duration-200 hover:border-slate-400 focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <Terminal className="w-4 h-4 text-slate-500" />
                <span>Explore the workspace</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
