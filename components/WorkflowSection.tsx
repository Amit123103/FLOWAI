"use client";

import React, { useState } from "react";
import { WORKFLOW_STEPS } from "@/lib/data";
import { GitCommit, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function WorkflowSection() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section
      id="workflow"
      className="py-20 md:py-32 border-t border-slate-200 relative bg-slate-50/60"
      aria-labelledby="workflow-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-50 border border-brand-200 text-xs font-mono uppercase tracking-wider text-brand-700 shadow-sm">
            <GitCommit className="w-3.5 h-3.5 text-brand-600" />
            Simple 3-Step Lifecycle
          </div>
          <h2
            id="workflow-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900"
          >
            How FlowAI powers your shipping velocity.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            From local experiment to production endpoint in minutes, without fragile scripts.
          </p>
        </div>

        {/* 3 Steps with visual connecting line */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Visual connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-brand-200 via-brand-400 to-brand-200 -translate-y-12 pointer-events-none z-0" />

          {WORKFLOW_STEPS.map((step, idx) => {
            const isHovered = hoveredStep === idx;
            return (
              <div
                key={step.number}
                onMouseEnter={() => setHoveredStep(idx)}
                onMouseLeave={() => setHoveredStep(null)}
                className={cn(
                  "relative z-10 p-6 sm:p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between shadow-sm",
                  isHovered
                    ? "bg-white border-brand-500 shadow-xl shadow-brand-500/5 translate-y-[-4px]"
                    : "bg-white border-slate-200 hover:border-slate-300"
                )}
              >
                <div>
                  {/* Step Number & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-2xl font-bold text-brand-600">
                      {step.number}
                    </span>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-semibold">
                      Step {step.number}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                    {step.name}
                  </h3>
                  <div className="text-xs font-semibold text-brand-700 mt-1 mb-3">
                    {step.tagline}
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-600 font-mono flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{step.detail}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
