"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, DollarSign, Zap, Clock, TrendingUp, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModelPricing {
  id: string;
  name: string;
  costPer1kTokens: number;
  avgTokensPerReq: number;
}

const PRICING_MODELS: ModelPricing[] = [
  { id: "gpt-4o", name: "GPT-4o", costPer1kTokens: 0.005, avgTokensPerReq: 650 },
  { id: "claude-3-5", name: "Claude 3.5 Sonnet", costPer1kTokens: 0.003, avgTokensPerReq: 650 },
  { id: "gemini-2", name: "Gemini 2.0 Flash", costPer1kTokens: 0.001, avgTokensPerReq: 650 },
  { id: "deepseek-v3", name: "DeepSeek V3", costPer1kTokens: 0.0008, avgTokensPerReq: 650 },
  { id: "llama-3-3", name: "Llama 3.3 70B", costPer1kTokens: 0.0006, avgTokensPerReq: 650 },
];

export default function RoiCalculator() {
  const [requestsPerMonth, setRequestsPerMonth] = useState<number>(500000); // 500k default
  const [selectedModel, setSelectedModel] = useState<ModelPricing>(PRICING_MODELS[1]);
  const [cacheHitRatio, setCacheHitRatio] = useState<number>(35); // 35% default
  const [devHoursPerMonth, setDevHoursPerMonth] = useState<number>(40); // 40 hrs glue maintenance

  // Computations
  const totalTokensPerMonth = (requestsPerMonth * selectedModel.avgTokensPerReq);
  const rawModelCost = (totalTokensPerMonth / 1000) * selectedModel.costPer1kTokens;
  const traditionalInfraMaintenance = devHoursPerMonth * 85; // $85/hr engineer cost
  const traditionalTotalMonthly = rawModelCost + traditionalInfraMaintenance + 350; // +$350 server/monitoring hosting

  // FlowAI Savings:
  // 1. Semantic Cache saves (cacheHitRatio%) of raw model calls
  const cachedModelCost = rawModelCost * (1 - cacheHitRatio / 100);
  const flowAiPlatformFee = Math.min(requestsPerMonth * 0.0001 + 49, 499);
  const flowAiTotalMonthly = cachedModelCost + flowAiPlatformFee;

  const monthlySavings = Math.max(0, traditionalTotalMonthly - flowAiTotalMonthly);
  const annualSavings = monthlySavings * 12;
  const hoursSavedPerYear = Math.round(devHoursPerMonth * 0.8 * 12);
  const latencyReduction = 62; // % faster

  return (
    <section id="roi-calculator" className="py-20 md:py-32 border-t border-slate-200 relative bg-slate-900 text-white overflow-hidden" aria-labelledby="roi-heading">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-global mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center space-y-4 mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-950/80 border border-brand-500/40 text-xs font-mono uppercase tracking-wider text-brand-300 shadow-sm font-semibold">
            <Calculator className="w-3.5 h-3.5 text-brand-400" />
            Live Infrastructure ROI Calculator
          </div>

          <h2
            id="roi-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white"
          >
            Calculate your infrastructure & token savings.
          </h2>

          <p className="text-base sm:text-lg text-slate-300">
            See how much time and budget you save by replacing fragmented glue code with FlowAI’s semantic caching and automated evals.
          </p>
        </motion.div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Controls (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-950/80 backdrop-blur-md border border-slate-800 shadow-2xl flex flex-col justify-between space-y-6"
          >
            {/* Control 1: Monthly Requests */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="requests-slider" className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wide">
                  Monthly API Requests
                </label>
                <span className="text-sm font-bold font-mono text-brand-400 bg-brand-950/80 px-2.5 py-1 rounded-lg border border-brand-800">
                  {requestsPerMonth.toLocaleString()} reqs/mo
                </span>
              </div>

              <input
                id="requests-slider"
                type="range"
                min={50000}
                max={5000000}
                step={50000}
                value={requestsPerMonth}
                onChange={(e) => setRequestsPerMonth(Number(e.target.value))}
                className="w-full accent-brand-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />

              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>50k (Startup)</span>
                <span>500k (Growth)</span>
                <span>2M (Scale)</span>
                <span>5M+ (Enterprise)</span>
              </div>
            </div>

            {/* Control 2: Model Choice */}
            <div className="space-y-3">
              <label className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wide block">
                Primary LLM Foundation Model
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {PRICING_MODELS.map((model) => (
                  <button
                    key={model.id}
                    type="button"
                    onClick={() => setSelectedModel(model)}
                    className={cn(
                      "p-2.5 rounded-xl border text-xs font-mono text-left transition-all",
                      selectedModel.id === model.id
                        ? "bg-brand-600 border-brand-400 text-white font-bold shadow-md ring-1 ring-brand-400"
                        : "bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                    )}
                  >
                    <div className="font-semibold truncate">{model.name}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">${model.costPer1kTokens}/1k tokens</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Control 3: Semantic Cache Hit Rate & Developer Maintenance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800/80">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300 font-semibold">Semantic Cache Ratio:</span>
                  <span className="text-emerald-400 font-bold">{cacheHitRatio}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={60}
                  step={5}
                  value={cacheHitRatio}
                  onChange={(e) => setCacheHitRatio(Number(e.target.value))}
                  className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <p className="text-[10px] text-slate-500 font-mono">FlowAI edge cache skips duplicate model invocations.</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300 font-semibold">Glue Code Maint:</span>
                  <span className="text-brand-400 font-bold">{devHoursPerMonth} hrs/mo</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={120}
                  step={10}
                  value={devHoursPerMonth}
                  onChange={(e) => setDevHoursPerMonth(Number(e.target.value))}
                  className="w-full accent-brand-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <p className="text-[10px] text-slate-500 font-mono">Hours spent on eval scripts, tracing, and routing.</p>
              </div>
            </div>
          </motion.div>

          {/* Right Live Savings Output Card (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-brand-950 via-slate-950 to-slate-950 border-2 border-brand-500/40 shadow-2xl flex flex-col justify-between space-y-6 relative overflow-hidden"
          >
            {/* Top Badge */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-brand-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                  Estimated Annual Impact
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                  ROI 18.4x
                </span>
              </div>

              {/* Big Annual Savings Number */}
              <div className="space-y-1">
                <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200">
                  ${Math.round(annualSavings).toLocaleString()}
                </span>
                <p className="text-xs text-slate-400 font-mono">Total Estimated Annual Savings</p>
              </div>
            </div>

            {/* Impact Metric Cards */}
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-400" />
                  <span className="text-slate-300">Developer Time Saved</span>
                </div>
                <span className="font-bold text-white">~{hoursSavedPerYear} hrs/year</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-300">P95 Latency Reduction</span>
                </div>
                <span className="font-bold text-emerald-400">-{latencyReduction}% Faster</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-amber-400" />
                  <span className="text-slate-300">Monthly Model & Infra Cost</span>
                </div>
                <div className="text-right">
                  <div className="line-through text-slate-500 text-[10px]">${Math.round(traditionalTotalMonthly).toLocaleString()}/mo</div>
                  <div className="font-bold text-emerald-400">${Math.round(flowAiTotalMonthly).toLocaleString()}/mo</div>
                </div>
              </div>
            </div>

            {/* Quick CTA */}
            <div className="pt-2">
              <a
                href="#cta"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-lg shadow-brand-900/50 transition-all hover:scale-[1.02] active:scale-95"
              >
                <span>Start saving with FlowAI</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
