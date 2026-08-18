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
    <div className="rounded-2xl border border-surface-border-bright bg-surface-100 shadow-2xl overflow-hidden">
      {/* Editor Header & Tabs */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-surface-200 border-b border-surface-border gap-2">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-amber-500/50" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
          <span className="ml-3 text-xs font-mono text-muted hidden sm:inline">
            {tabs.find((t) => t.id === activeTab)?.file}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {/* Tabs */}
          <div className="flex items-center gap-1 bg-surface-300 p-0.5 rounded-lg border border-surface-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-3 py-1 text-xs font-mono rounded-md transition-colors",
                  activeTab === tab.id
                    ? "bg-surface-50 text-foreground font-semibold shadow-sm border border-surface-border"
                    : "text-muted hover:text-foreground"
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
            className="p-1.5 rounded-md hover:bg-surface-300 text-muted hover:text-foreground transition-colors"
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
      <div className="p-4 sm:p-6 overflow-x-auto bg-surface-400 font-mono text-xs leading-relaxed text-slate-200">
        <pre tabIndex={0} className="focus:outline-none">
          <code>{CODE_SNIPPETS[activeTab]}</code>
        </pre>
      </div>

      {/* Bottom Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-surface-300 border-t border-surface-border text-[11px] font-mono text-muted">
        <div className="flex items-center gap-2">
          <Terminal className="w-3 h-3 text-brand-400" />
          <span>FlowAI Runtime: Validated</span>
        </div>
        <span className="text-emerald-400">YAML // Declarative</span>
      </div>
    </div>
  );
}
