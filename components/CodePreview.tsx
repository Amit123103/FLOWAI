"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CODE_SNIPPETS } from "@/data/flowai";
import { Copy, Check, Terminal, FileCode, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type TabType = "workflow" | "prompt" | "evaluation";

export default function CodePreview() {
  const [activeTab, setActiveTab] = useState<TabType>("workflow");
  const [copied, setCopied] = useState(false);

  const tabs: { id: TabType; label: string; file: string; lang: string }[] = [
    { id: "workflow", label: "TypeScript SDK", file: "flowai.config.ts", lang: "typescript" },
    { id: "prompt", label: "Prompt YAML", file: "triage.prompt.yaml", lang: "yaml" },
    { id: "evaluation", label: "Python Evals", file: "test_evals.py", lang: "python" },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(CODE_SNIPPETS[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden">
      {/* Editor Header & Tabs */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-amber-500/70" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
          </div>
          <div className="flex items-center gap-1.5 ml-2 text-xs font-mono text-slate-300">
            <FileCode className="w-3.5 h-3.5 text-brand-400" />
            <span>{currentTab.file}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
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
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
          className="p-4 sm:p-6 overflow-x-auto bg-slate-950 font-mono text-xs leading-relaxed text-slate-200"
        >
          <pre tabIndex={0} className="focus:outline-none">
            <code>{CODE_SNIPPETS[activeTab]}</code>
          </pre>
        </motion.div>
      </AnimatePresence>

      {/* Bottom Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-t border-slate-800 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-3 h-3 text-brand-400" />
          <span>FlowAI Runtime: Ready</span>
        </div>
        <span className="text-emerald-400">{currentTab.lang.toUpperCase()} // Typed SDK</span>
      </div>
    </div>
  );
}
