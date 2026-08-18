"use client";

import React from "react";
import { WORKFLOW_NODES, WorkflowNodeData } from "@/lib/data";
import { Database, Cpu, CheckCircle2, CloudUpload, ArrowRight, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkflowGraphProps {
  selectedNodeId: string;
  onSelectNode: (nodeId: string) => void;
}

const nodeIcons: Record<string, React.ReactNode> = {
  input: <Database className="w-4 h-4" />,
  model: <Cpu className="w-4 h-4" />,
  evaluation: <CheckCircle2 className="w-4 h-4" />,
  deploy: <CloudUpload className="w-4 h-4" />,
};

export default function WorkflowGraph({ selectedNodeId, onSelectNode }: WorkflowGraphProps) {
  const activeNode = WORKFLOW_NODES.find((n) => n.id === selectedNodeId) || WORKFLOW_NODES[1];

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Visual Pipeline Nodes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {WORKFLOW_NODES.map((node, index) => {
          const isSelected = node.id === selectedNodeId;
          const isDimmed = Boolean(selectedNodeId && !isSelected);

          return (
            <div key={node.id} className="relative flex flex-col">
              <button
                type="button"
                onClick={() => onSelectNode(node.id)}
                className={cn(
                  "group relative w-full text-left p-3.5 rounded-xl border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                  isSelected
                    ? "bg-white border-brand-600 shadow-md shadow-brand-500/10 ring-2 ring-brand-500/20 translate-y-[-2px]"
                    : isDimmed
                    ? "bg-slate-50/70 border-slate-200 opacity-80 hover:opacity-100 hover:border-slate-300"
                    : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 shadow-sm"
                )}
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
                      "text-[10px] font-mono px-2 py-0.5 rounded border tracking-wide uppercase",
                      isSelected
                        ? "bg-brand-50 text-brand-700 border-brand-200 font-semibold"
                        : "bg-slate-100 text-slate-500 border-slate-200"
                    )}
                  >
                    {node.badge}
                  </span>
                </div>

                {/* Node Title */}
                <div className="text-xs font-bold text-slate-900 tracking-tight flex items-center justify-between">
                  <span>{node.name}</span>
                  <span className="text-[10px] text-slate-500 font-normal">{node.type}</span>
                </div>

                <p className="text-[11px] text-slate-500 line-clamp-1 mt-1 font-normal">
                  {node.description}
                </p>

                {/* Selection indicator underline */}
                {isSelected && (
                  <div className="absolute -bottom-[1px] left-3 right-3 h-[2px] bg-brand-600 rounded-full" />
                )}
              </button>

              {/* Step indicator arrow for desktop */}
              {index < WORKFLOW_NODES.length - 1 && (
                <div className="hidden lg:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-slate-400 pointer-events-none">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Node Details Panel (Micro-interaction details update) */}
      <div className="rounded-xl border border-slate-200 bg-white p-4.5 transition-all duration-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-brand-50 text-brand-600 border border-brand-200">
              {nodeIcons[activeNode.id]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-900">{activeNode.name}</h4>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                  {activeNode.details.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{activeNode.description}</p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono">
            {activeNode.details.temperature && (
              <div className="bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                <span className="text-slate-500">Temp: </span>
                <span className="text-slate-900 font-semibold">{activeNode.details.temperature}</span>
              </div>
            )}
            {activeNode.details.latency && (
              <div className="bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                <span className="text-slate-500">Latency: </span>
                <span className="text-emerald-600 font-semibold">{activeNode.details.latency}</span>
              </div>
            )}
            {activeNode.details.metricLabel && (
              <div className="bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                <span className="text-slate-500">{activeNode.details.metricLabel}: </span>
                <span className="text-brand-600 font-semibold">{activeNode.details.metricValue}</span>
              </div>
            )}
          </div>
        </div>

        {/* Configuration / Inspection Preview */}
        <div className="mt-3.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-1.5">
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <Terminal className="w-3.5 h-3.5 text-brand-600" />
              Node Configuration Manifest
            </span>
            <span className="text-[10px] text-slate-400">Type: {activeNode.type}</span>
          </div>
          <pre className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto shadow-inner">
            <code>{activeNode.details.configSnippet}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
