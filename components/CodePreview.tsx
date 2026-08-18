"use client";

import React, { useState } from "react";
import { CODE_SNIPPETS } from "@/data/flowai";
import { Copy, Check, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

type TabType = "workflow" | "prompt" | "evaluation";

export default function CodePreview() {
  const [activeTab, setActiveTab] = useState<TabType>("workflow");
  const [copied, setCopied] = useState(false);

  const tabs: { id: TabType; label: string; file: string }[] = [
    { id: "workflow", label: "Workflow", file: "flowai.config.yaml" },
    { id: "prompt", label: "Prompt", file: "triage.prompt.yaml" },
    { id: "evaluation", label: "Evaluation", file: "quality.eval.yaml" },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(CODE_SNIPPETS[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
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
          {/* Tabs Buttons */}
          <div className="flex items-center gap-1 bg-slate-800/80 p-0.5 rounded-lg border border-slate-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-3 py-1 text-xs font-mono rounded-md transition-all",
                  activeTab === tab.id
                    ? "bg-brand-600 hover:bg-brand-500 text-white font-bold shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-slate-700/50"
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

      {/* Bottom Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-t border-slate-800 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-3 h-3 text-brand-400" />
          <span>FlowAI Runtime: Validated</span>
        </div>
        <span className="text-emerald-400">YAML // Declarative</span>
      </div>
    </div>
  );
}
