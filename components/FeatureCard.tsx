"use client";

import React from "react";
import { GitFork, FlaskConical, Rocket, History, Gauge, Terminal, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  category: string;
  index: number;
  hasMiniUI?: boolean;
  uiType?: string;
}

const featureIcons = [
  GitFork,
  FlaskConical,
  Rocket,
  History,
  Gauge,
  Terminal,
];

export default function FeatureCard({
  title,
  description,
  category,
  index,
  hasMiniUI,
  uiType,
}: FeatureCardProps) {
  const Icon = featureIcons[index % featureIcons.length];

  return (
    <div
      className={cn(
        "group relative p-6 sm:p-7 rounded-2xl border border-surface-border bg-surface-200/60 hover:bg-surface-100 transition-all duration-300 flex flex-col justify-between hover:border-surface-border-bright hover:shadow-xl hover:shadow-black/30"
      )}
    >
      <div>
        {/* Category & Icon */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-10 h-10 rounded-xl bg-surface-300 border border-surface-border flex items-center justify-center text-brand-400 group-hover:border-brand-500/40 group-hover:bg-brand-500/10 group-hover:text-brand-300 transition-colors">
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-muted-dark px-2.5 py-0.5 rounded-full bg-surface-300 border border-surface-border font-medium">
            {category}
          </span>
        </div>

        {/* Content */}
        <h3 className="text-lg font-bold text-foreground tracking-tight group-hover:text-brand-300 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted mt-2 leading-relaxed">
          {description}
        </p>

        {/* Miniature UI Visualizations (Section 30) */}
        {hasMiniUI && (
          <div className="mt-5 rounded-xl border border-surface-border bg-surface-300/80 p-3 text-xs font-mono">
            {uiType === "workflow" && (
              <div className="flex items-center justify-between gap-1.5 text-[11px]">
                <span className="px-2 py-1 rounded bg-surface-200 border border-surface-border text-brand-300 font-semibold">
                  Prompt
                </span>
                <span className="text-muted-dark">→</span>
                <span className="px-2 py-1 rounded bg-surface-200 border border-surface-border text-emerald-400 font-semibold">
                  Model
                </span>
                <span className="text-muted-dark">→</span>
                <span className="px-2 py-1 rounded bg-surface-200 border border-surface-border text-indigo-300 font-semibold">
                  Eval
                </span>
              </div>
            )}

            {uiType === "evaluation" && (
              <div className="space-y-1 text-[11px]">
                <div className="flex justify-between text-muted-dark text-[10px] pb-1 border-b border-surface-border">
                  <span>Test Case</span>
                  <span>Result</span>
                </div>
                <div className="flex justify-between items-center text-foreground">
                  <span>Case 01</span>
                  <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3 h-3" /> Pass
                  </span>
                </div>
                <div className="flex justify-between items-center text-foreground">
                  <span>Case 02</span>
                  <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3 h-3" /> Pass
                  </span>
                </div>
                <div className="flex justify-between items-center text-foreground">
                  <span>Case 03</span>
                  <span className="text-amber-400 flex items-center gap-1 font-semibold">
                    <AlertCircle className="w-3 h-3" /> Review
                  </span>
                </div>
              </div>
            )}

            {uiType === "versioning" && (
              <div className="flex items-center gap-2">
                <div className="px-2 py-1 rounded bg-brand-500/10 text-brand-300 border border-brand-500/30 font-semibold">
                  v1.4 (Active)
                </div>
                <div className="px-2 py-1 rounded bg-surface-200 text-muted border border-surface-border">
                  v1.3
                </div>
                <div className="px-2 py-1 rounded bg-surface-200 text-muted border border-surface-border">
                  v1.2
                </div>
              </div>
            )}

            {uiType === "monitoring" && (
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-muted">
                  <span>Latency Telemetry</span>
                  <span className="text-emerald-400 font-semibold">820ms</span>
                </div>
                <div className="h-6 w-full flex items-end gap-1 pt-1">
                  {[40, 60, 50, 75, 65, 80, 55, 45, 50, 48].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-brand-500/40 hover:bg-brand-400 rounded-t"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="mt-6 pt-4 border-t border-surface-border/60 flex items-center text-xs font-mono text-muted-dark group-hover:text-brand-400 transition-colors">
        <span>0{index + 1} // Production Grade</span>
      </div>
    </div>
  );
}
