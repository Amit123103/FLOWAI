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
                <div className="hidden lg:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-muted-dark pointer-events-none">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Primary Micro-Interaction Detail Panel (Section 22) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeNode.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="rounded-xl border border-surface-border bg-surface-200/90 p-4.5 shadow-inner"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-border">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-brand-500/10 text-brand-400 border border-brand-500/20">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-foreground">{activeNode.details.title}</h4>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-brand-500/15 text-brand-300 border border-brand-500/30 font-semibold">
                    Node: {activeNode.title}
                  </span>
                </div>
                <p className="text-xs text-muted mt-0.5">{activeNode.details.description}</p>
              </div>
            </div>

            {/* Contextual attributes */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              {activeNode.details.attributes.map((attr) => (
                <div
                  key={attr.label}
                  className="bg-surface-300 px-2.5 py-1 rounded-md border border-surface-border"
                >
                  <span className="text-muted">{attr.label}: </span>
                  <span
                    className={
                      attr.highlight
                        ? "text-emerald-400 font-semibold"
                        : "text-foreground font-medium"
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
            <div className="flex items-center justify-between text-[11px] font-mono text-muted mb-1.5">
              <span className="flex items-center gap-1.5 text-foreground/90 font-medium">
                <Terminal className="w-3.5 h-3.5 text-brand-400" />
                Live Node Manifest
              </span>
              <span className="text-[10px] text-muted-dark">Interactive Micro-Interaction</span>
            </div>
            <pre className="p-3 rounded-lg bg-surface-400 border border-surface-border text-[11px] font-mono text-indigo-200 overflow-x-auto">
              <code>{activeNode.details.manifest}</code>
            </pre>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
