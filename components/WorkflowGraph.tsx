"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WORKFLOW_NODES, WorkflowNodeItem } from "@/data/flowai";
import WorkflowNode from "./WorkflowNode";
import { ArrowRight, Terminal, Cpu } from "lucide-react";

interface WorkflowGraphProps {
  selectedNodeId: "input" | "model" | "evaluation" | "deploy";
  onSelectNode: (id: "input" | "model" | "evaluation" | "deploy") => void;
}

export default function WorkflowGraph({ selectedNodeId, onSelectNode }: WorkflowGraphProps) {
  const activeNode =
    WORKFLOW_NODES.find((n) => n.id === selectedNodeId) || WORKFLOW_NODES[1];

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Visual Pipeline Nodes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative">
        {WORKFLOW_NODES.map((node, index) => {
          const isSelected = node.id === selectedNodeId;
          const isDimmed = Boolean(selectedNodeId && !isSelected);

          return (
            <div key={node.id} className="relative flex flex-col">
              <WorkflowNode
                node={node}
                isSelected={isSelected}
                isDimmed={isDimmed}
                onSelect={onSelectNode}
              />

              {/* Connecting arrow on desktop */}
              {index < WORKFLOW_NODES.length - 1 && (
                <div className="hidden lg:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-slate-400 pointer-events-none">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Primary Micro-Interaction Detail Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeNode.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="rounded-xl border border-slate-200 bg-white p-4.5 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-brand-50 text-brand-600 border border-brand-200">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900">{activeNode.details.title}</h4>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200 font-semibold">
                    Node: {activeNode.title}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{activeNode.details.description}</p>
              </div>
            </div>

            {/* Contextual attributes */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              {activeNode.details.attributes.map((attr) => (
                <div
                  key={attr.label}
                  className="bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200"
                >
                  <span className="text-slate-500">{attr.label}: </span>
                  <span
                    className={
                      attr.highlight
                        ? "text-emerald-600 font-bold"
                        : "text-slate-900 font-semibold"
                    }
                  >
                    {attr.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Configuration Manifest */}
          <div className="mt-3.5">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-1.5">
              <span className="flex items-center gap-1.5 text-slate-800 font-semibold">
                <Terminal className="w-3.5 h-3.5 text-brand-600" />
                Live Node Manifest
              </span>
              <span className="text-[10px] text-slate-400">Interactive Micro-Interaction</span>
            </div>
            <pre className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto shadow-inner">
              <code>{activeNode.details.manifest}</code>
            </pre>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
