"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, Minus, Sparkles, Zap, Shield, Layers, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonRow {
  feature: string;
  category: "speed" | "dx" | "evals";
  description: string;
  flowai: boolean | string;
  langchain: boolean | string;
  llamaindex: boolean | string;
  customGlue: boolean | string;
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    feature: "Time to First Token (TTFT)",
    category: "speed",
    description: "Sub-50ms streaming response directly via global edge Anycast routing.",
    flowai: "< 45ms",
    langchain: "320ms+",
    llamaindex: "280ms+",
    customGlue: "450ms+",
  },
  {
    feature: "Visual Graph & Bidirectional Code Sync",
    category: "dx",
    description: "Visual drag-and-drop canvas stays 100% in sync with version-controlled TypeScript & Python SDKs.",
    flowai: true,
    langchain: false,
    llamaindex: false,
    customGlue: false,
  },
  {
    feature: "Built-in Semantic Caching",
    category: "speed",
    description: "Caches vector-similar queries automatically to reduce LLM costs by up to 60%.",
    flowai: true,
    langchain: "Plugin required",
    llamaindex: "Plugin required",
    customGlue: "Build yourself",
  },
  {
    feature: "Automated Evaluation & Quality Gates",
    category: "evals",
    description: "Built-in assertion suites for hallucination scores, PII leaks, and latency regression checks.",
    flowai: true,
    langchain: "Separate SaaS",
    llamaindex: "Manual scripts",
    customGlue: "Manual scripts",
  },
  {
    feature: "Zero-Downtime Canary Rollouts",
    category: "dx",
    description: "Deploy new workflow versions with weighted canary traffic and automated rollback on failure.",
    flowai: true,
    langchain: false,
    llamaindex: false,
    customGlue: "DevOps infra required",
  },
  {
    feature: "Multi-Model Dynamic Fallbacks",
    category: "evals",
    description: "Automatic failover across OpenAI, Anthropic, Gemini, DeepSeek, and local LLMs when rate-limited.",
    flowai: true,
    langchain: "Complex code",
    llamaindex: "Complex code",
    customGlue: "High maintenance",
  },
];

export default function BenchmarkComparison() {
  const [filter, setFilter] = useState<"all" | "speed" | "dx" | "evals">("all");

  const filteredRows =
    filter === "all" ? COMPARISON_DATA : COMPARISON_DATA.filter((r) => r.category === filter);

  const renderCell = (val: boolean | string, isFlowAi = false) => {
    if (typeof val === "boolean") {
      return val ? (
        <div className="flex items-center justify-center">
          <div className={cn("p-1 rounded-full", isFlowAi ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700")}>
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div className="p-1 rounded-full bg-slate-100 text-slate-400">
            <Minus className="w-4 h-4" />
          </div>
        </div>
      );
    }

    return (
      <span
        className={cn(
          "text-xs font-mono font-bold",
          isFlowAi ? "text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200" : "text-slate-600"
        )}
      >
        {val}
      </span>
    );
  };

  return (
    <section id="comparison" className="py-20 md:py-32 border-t border-slate-200 relative bg-slate-50/50" aria-labelledby="comparison-heading">
      <div className="max-w-global mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center space-y-4 mb-12"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-50 border border-brand-200 text-xs font-mono uppercase tracking-wider text-brand-700 shadow-sm font-semibold">
            <Layers className="w-3.5 h-3.5 text-brand-600" />
            Platform Benchmark Matrix
          </div>

          <h2
            id="comparison-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900"
          >
            Why engineering teams choose FlowAI.
          </h2>

          <p className="text-base sm:text-lg text-slate-600">
            Compare FlowAI against fragmented libraries and custom in-house glue infrastructure.
          </p>
        </motion.div>

        {/* Filter Pills */}
        <div className="flex justify-center gap-2 mb-8">
          {[
            { id: "all", label: "All Capabilities" },
            { id: "speed", label: "⚡ Speed & Latency" },
            { id: "dx", label: "🛠️ Developer Experience" },
            { id: "evals", label: "🛡️ Reliability & Evals" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id as any)}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all",
                filter === tab.id
                  ? "bg-brand-600 text-white shadow-sm"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-brand-300 hover:bg-brand-50/50"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-slate-200 bg-white shadow-xl overflow-x-auto"
        >
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-mono uppercase tracking-wider text-slate-700">
                <th className="p-4 sm:p-5 w-[38%]">Feature / Capability</th>
                <th className="p-4 sm:p-5 w-[18%] text-center bg-brand-50/70 border-x border-brand-200 text-brand-800 font-bold">
                  <div className="flex items-center justify-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                    <span>FlowAI</span>
                  </div>
                </th>
                <th className="p-4 sm:p-5 w-[14%] text-center text-slate-600">LangChain</th>
                <th className="p-4 sm:p-5 w-[14%] text-center text-slate-600">LlamaIndex</th>
                <th className="p-4 sm:p-5 w-[16%] text-center text-slate-600">In-House Glue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredRows.map((row, idx) => (
                <tr key={row.feature} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4 sm:p-5">
                    <div className="font-bold text-slate-900 text-xs sm:text-sm">{row.feature}</div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{row.description}</p>
                  </td>
                  <td className="p-4 sm:p-5 text-center bg-brand-50/30 border-x border-brand-100 font-semibold">
                    {renderCell(row.flowai, true)}
                  </td>
                  <td className="p-4 sm:p-5 text-center">{renderCell(row.langchain)}</td>
                  <td className="p-4 sm:p-5 text-center">{renderCell(row.llamaindex)}</td>
                  <td className="p-4 sm:p-5 text-center">{renderCell(row.customGlue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
