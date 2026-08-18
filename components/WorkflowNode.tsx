"use client";

import React from "react";
import { motion } from "framer-motion";
import { Database, Cpu, CheckCircle2, CloudUpload } from "lucide-react";
import { cn } from "@/lib/utils";
import { WorkflowNodeItem } from "@/data/flowai";

interface WorkflowNodeProps {
  node: WorkflowNodeItem;
  isSelected: boolean;
  isDimmed: boolean;
  onSelect: (id: "input" | "model" | "evaluation" | "deploy") => void;
}

const nodeIcons: Record<string, React.ReactNode> = {
  input: <Database className="w-4 h-4" />,
  model: <Cpu className="w-4 h-4" />,
  evaluation: <CheckCircle2 className="w-4 h-4" />,
  deploy: <CloudUpload className="w-4 h-4" />,
};

export default function WorkflowNode({
  node,
  isSelected,
  isDimmed,
  onSelect,
}: WorkflowNodeProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(node.id)}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative w-full text-left p-3.5 rounded-xl border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
        isSelected
          ? "bg-white border-brand-600 shadow-md shadow-brand-500/10 ring-2 ring-brand-500/20 z-20"
          : isDimmed
          ? "bg-slate-50/70 border-slate-200 opacity-80 hover:opacity-100 hover:border-slate-300"
          : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 shadow-sm"
      )}
      aria-pressed={isSelected}
    >
      {/* Node Header */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div
          className={cn(
            "w-7 h-7 rounded-lg flex items-center justify-center border transition-colors",
            isSelected
              ? "bg-brand-50 text-brand-600 border-brand-200"
              : "bg-slate-100 text-slate-500 border-slate-200 group-hover:text-slate-800"
          )}
        >
          {nodeIcons[node.id]}
        </div>
        <span
          className={cn(
            "text-[10px] font-mono px-2 py-0.5 rounded border tracking-wide uppercase font-semibold",
            isSelected
              ? "bg-brand-50 text-brand-700 border-brand-200"
              : "bg-slate-100 text-slate-500 border-slate-200"
          )}
        >
          {node.badge}
        </span>
      </div>

      {/* Node Titles */}
      <div className="text-xs font-bold text-slate-900 tracking-tight flex items-center justify-between">
        <span>{node.title}</span>
        <span className="text-[10px] text-slate-500 font-normal font-mono">{node.subtitle}</span>
      </div>

      <p className="text-[11px] text-slate-500 line-clamp-1 mt-1 font-normal">
        {node.details.description}
      </p>

      {/* Selected Indicator Bottom Bar */}
      {isSelected && (
        <motion.div
          layoutId="node-underline"
          className="absolute -bottom-[1px] left-3 right-3 h-[2px] bg-brand-600 rounded-full"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
    </motion.button>
  );
}
