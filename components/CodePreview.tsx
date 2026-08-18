"use client";

import React, { useState } from "react";
import { CODE_SNIPPETS } from "@/lib/data";
import { Code2, Copy, Check, Terminal, CheckCircle2, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

type TabType = "workflow" | "prompt" | "evaluation";

export default function CodePreview() {
  const [activeTab, setActiveTab] = useState<TabType>("workflow");
  const [copied, setCopied] = useState(false);

  const tabs: { id: TabType; label: string; file: string }[] = [
    { id: "workflow", label: "Workflow", file: "flowai.config.ts" },
    { id: "prompt", label: "Prompt", file: "triage.system.md" },
    { id: "evaluation", label: "Evaluation", file: "triage-quality.eval.ts" },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(CODE_SNIPPETS[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="developer" className="py-20 md:py-32 relative" aria-labelledby="dev-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Technical Credibility Text */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-50 border border-brand-200 text-xs font-mono uppercase tracking-wider text-brand-700 shadow-sm">
              <Code2 className="w-3.5 h-3.5 text-brand-600" />
              Developer Experience
            </div>

            <h2
              id="dev-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight"
            >
              From experiment to production, without losing the thread.
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Define workflows as type-safe code or YAML declarations. Version prompts alongside your test suites and commit everything into your existing Git workflow.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-brand-50 border border-brand-200 text-brand-600 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Type-safe configuration</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Autocomplete and schema validation for model parameters, prompt templates, and routing logic.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-brand-50 border border-brand-200 text-brand-600 shrink-0 mt-0.5">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Programmatic test assertions</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Write deterministic unit tests and semantic quality gates directly in TypeScript.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Code Editor Mockup with Interactive Tabs */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden">
              {/* Editor Header & Tabs */}
              <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                  <span className="ml-3 text-xs font-mono text-slate-400 hidden sm:inline">
                    {tabs.find((t) => t.id === activeTab)?.file}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  {/* Tabs */}
                  <div className="flex items-center gap-1 bg-slate-800/80 p-0.5 rounded-lg border border-slate-700">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                          "px-3 py-1 text-xs font-mono rounded-md transition-colors",
                          activeTab === tab.id
                            ? "bg-slate-700 text-white font-semibold shadow-sm"
                            : "text-slate-400 hover:text-slate-200"
                        )}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Copy Button */}
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    title="Copy code snippet"
                    aria-label="Copy code snippet"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Code Content */}
              <div className="p-4 sm:p-6 overflow-x-auto bg-slate-950 font-mono text-xs leading-relaxed text-slate-200">
                <pre tabIndex={0} className="focus:outline-none">
                  <code>{CODE_SNIPPETS[activeTab]}</code>
                </pre>
              </div>

              {/* Bottom status bar */}
              <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-t border-slate-800 text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3 h-3 text-brand-400" />
                  <span>FlowAI Language Server: Ready</span>
                </div>
                <span className="text-emerald-400">UTF-8 // TypeScript</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
