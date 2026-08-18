"use client";

import React, { useState } from "react";
import { PRODUCT_CAPABILITIES } from "@/data/flowai";
import {
  Hammer,
  CheckCheck,
  Activity,
  Layers,
  ChevronRight,
  GitCompare,
  Sliders,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const capabilityIcons = {
  build: Hammer,
  evaluate: CheckCheck,
  monitor: Activity,
};

export default function ProductCapabilities() {
  const [activeTab, setActiveTab] = useState<"build" | "evaluate" | "monitor">("build");

  const current =
    PRODUCT_CAPABILITIES.find((c) => c.id === activeTab) || PRODUCT_CAPABILITIES[0];

  return (
    <section
      id="showcase"
      className="py-20 md:py-32 border-t border-slate-200 relative bg-slate-50/50"
      aria-labelledby="showcase-heading"
    >
      <div className="max-w-global mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-50 border border-brand-200 text-xs font-mono uppercase tracking-wider text-brand-700 shadow-sm font-semibold">
            <Layers className="w-3.5 h-3.5 text-brand-600" />
            Core Platform
          </div>
          <h2
            id="showcase-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900"
          >
            Everything you need to move from prompt to production.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Keep experimentation, evaluation, deployment, and monitoring inside one focused workflow.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {PRODUCT_CAPABILITIES.map((cap) => {
            const Icon = capabilityIcons[cap.id as keyof typeof capabilityIcons];
            const isActive = activeTab === cap.id;
            return (
              <button
                key={cap.id}
                type="button"
                onClick={() => setActiveTab(cap.id as "build" | "evaluate" | "monitor")}
                className={cn(
                  "flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                  isActive
                    ? "bg-white text-slate-900 border border-brand-600 shadow-md shadow-brand-500/15 ring-2 ring-brand-500/20"
                    : "bg-white/80 text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-white shadow-sm"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-brand-600" : "text-slate-400")} />
                <span>{cap.title}</span>
              </button>
            );
          })}
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:p-10 shadow-sm">
          {/* Left Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-brand-700 tracking-wider">
                {current.title} Stage
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                {current.title} AI Applications
              </h3>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">{current.copy}</p>
            </div>

            <ul className="space-y-3 pt-2">
              {current.features.map((feat, index) => (
                <li key={index} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-brand-50 border border-brand-200 flex items-center justify-center shrink-0">
                    <ChevronRight className="w-2.5 h-2.5 text-brand-600" />
                  </div>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Real Mini UI Visuals */}
          <div className="lg:col-span-7">
            {activeTab === "build" && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <Sliders className="w-4 h-4 text-brand-600" />
                    <span className="text-slate-900 font-bold">Mini Workflow Composer</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200 shadow-xs">
                    schema: triage-v2
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-white border border-slate-200 flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-brand-600" />
                      <span className="text-slate-800 font-medium">System Prompt Context</span>
                    </div>
                    <span className="text-[10px] text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200 font-semibold">
                      Markdown Template
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-white border border-slate-200 flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-rose-700" />
                      <span className="text-slate-800 font-medium">Model: flow-model-core</span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500">
                      <span>temp: 0.4</span>
                      <span>top_p: 0.95</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-white border border-slate-200 flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-600" />
                      <span className="text-slate-800 font-medium">Assertion Guardrails</span>
                    </div>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                      3 Rules Enforced
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
                  <span className="text-brand-300">$ flowai test --node model</span>
                  <span className="block text-emerald-400 mt-1 font-semibold">
                    ✓ Evaluated in 410ms (Tokens: 142 in / 68 out)
                  </span>
                </div>
              </div>
            )}

            {activeTab === "evaluate" && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <GitCompare className="w-4 h-4 text-emerald-600" />
                    <span className="text-slate-900 font-bold">Evaluation Run Diff (v2.3 vs v2.4)</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                    +4.2% Quality
                  </span>
                </div>

                <div className="space-y-2.5 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-2 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-900 font-semibold">TC-108: Multi-turn ambiguity handling</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold flex items-center gap-1 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" /> Passed
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2 rounded bg-slate-100 border border-slate-200">
                        <span className="text-slate-500 block text-[10px]">v2.3 Score: 0.81</span>
                        <span className="text-amber-700 text-[10px] font-medium">Missing clarifying prompt</span>
                      </div>
                      <div className="p-2 rounded bg-slate-100 border border-slate-200">
                        <span className="text-slate-500 block text-[10px]">v2.4 Score: 0.98</span>
                        <span className="text-emerald-700 text-[10px] font-semibold">Accurate question asked</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-white border border-slate-200 flex items-center justify-between shadow-xs">
                    <div>
                      <span className="text-slate-900 font-semibold block">TC-109: Schema validation strictness</span>
                      <span className="text-[10px] text-slate-500">100% compliant JSON responses</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold flex items-center gap-1 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" /> Passed
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs">
                  <span>500 test cases benchmarked</span>
                  <span className="text-slate-900 font-bold">Zero Regressions Detected</span>
                </div>
              </div>
            )}

            {activeTab === "monitor" && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <Activity className="w-4 h-4 text-brand-600" />
                    <span className="text-slate-900 font-bold">Production Trace Breakdown</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200 shadow-xs">
                    Trace ID: #tr_991b4
                  </span>
                </div>

                {/* Waterfall Tracing Tree */}
                <div className="space-y-2 font-mono text-xs">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-600 font-medium">
                      <span>1. Input Validation</span>
                      <span className="text-slate-900 font-bold">12ms</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-600 rounded-full w-[4%]" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-600 font-medium">
                      <span>2. Model Inference (flow-model-core)</span>
                      <span className="text-emerald-600 font-bold">740ms</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-700 rounded-full w-[85%]" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-600 font-medium">
                      <span>3. Quality Guardrails</span>
                      <span className="text-slate-900 font-bold">24ms</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full w-[8%]" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-xs">
                    <span className="text-[10px] text-slate-500 block">Total Latency</span>
                    <span className="text-slate-900 font-bold">776ms</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-xs">
                    <span className="text-[10px] text-slate-500 block">Tokens</span>
                    <span className="text-slate-900 font-bold">312 tok</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-xs">
                    <span className="text-[10px] text-slate-500 block">Cost / Req</span>
                    <span className="text-emerald-700 font-bold">$0.00041</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
