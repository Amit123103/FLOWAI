"use client";

import React, { useState } from "react";
import { HOW_IT_WORKS_STEPS } from "@/data/flowai";
import { GitCommit, CheckCircle, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HowItWorks() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section
      id="workflow"
      className="py-20 md:py-32 border-t border-surface-border relative bg-surface-400/40"
      aria-labelledby="workflow-heading"
    >
      <div className="max-w-global mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-surface-200 border border-surface-border text-xs font-mono uppercase tracking-wider text-brand-300">
            <GitCommit className="w-3.5 h-3.5 text-brand-400" />
            Simple 3-Step Lifecycle
          </div>
          <h2
            id="workflow-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground"
          >
            From experiment to production in three clear steps.
          </h2>
          <p className="text-base sm:text-lg text-muted">
            From local experiment to production endpoint in minutes, without fragile scripts.
          </p>
        </div>

        {/* 3 Steps with visual connecting line */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Visual connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-brand-500/20 via-brand-500/50 to-brand-500/20 -translate-y-12 pointer-events-none z-0" />

          {HOW_IT_WORKS_STEPS.map((step, idx) => {
            const isHovered = hoveredStep === idx;
            return (
              <div
                key={step.number}
                onMouseEnter={() => setHoveredStep(idx)}
                onMouseLeave={() => setHoveredStep(null)}
                className={cn(
                  "relative z-10 p-6 sm:p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between",
                  isHovered
                    ? "bg-surface-100 border-brand-500/60 shadow-xl shadow-brand-500/5 translate-y-[-4px]"
                    : "bg-surface-200/80 border-surface-border hover:border-surface-border-bright"
                )}
              >
                <div>
                  {/* Step Number & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={cn(
                        "font-mono text-3xl font-bold transition-colors duration-200",
                        isHovered ? "text-brand-300 scale-105 inline-block" : "text-brand-400"
                      )}
                    >
                      {step.number}
                    </span>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-surface-300 text-muted border border-surface-border font-semibold uppercase">
                      {step.label}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-bold text-foreground tracking-tight">
                    {step.title}
                  </h3>

                  <p className="text-sm text-muted mt-3 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-surface-border/60 text-xs text-muted-dark font-mono flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
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
