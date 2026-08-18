"use client";

import React, { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import WorkflowGraph from "./WorkflowGraph";
import DashboardMetrics from "./DashboardMetrics";
import RecentRuns from "./RecentRuns";
import {
  ChevronDown,
  Clock,
  Activity,
  SlidersHorizontal,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProductDashboard() {
  const [activeTab, setActiveTab] = useState<"graph" | "runs">("graph");
  const [selectedNodeId, setSelectedNodeId] = useState<"input" | "model" | "evaluation" | "deploy">("model");
  const [sidebarItem, setSidebarItem] = useState("Overview");

  return (
    <div
      id="dashboard-preview"
      className="relative w-full rounded-2xl border border-surface-border-bright bg-surface-100/95 shadow-dashboard overflow-hidden text-foreground backdrop-blur-xl"
    >
      {/* Top Application Header (Section 20) */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-surface-border bg-surface-200/90 text-xs">
        {/* Project Selector & Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-foreground tracking-tight">FlowAI</span>
          </div>
          <span className="text-surface-border font-light">/</span>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-300 border border-surface-border text-muted hover:text-foreground cursor-pointer transition-colors">
            <span className="text-muted-dark">Project:</span>
            <span className="font-mono text-[11px] text-brand-300 font-semibold">Aurora</span>
            <ChevronDown className="w-3 h-3 text-muted" />
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-muted">
            <span>Environment: Production</span>
            <span className="text-surface-border">•</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Operational
            </span>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-300 hover:bg-surface-50 border border-surface-border text-muted hover:text-foreground text-[11px] font-medium transition-colors"
          >
            <RefreshCw className="w-3 h-3 text-brand-400" />
            <span className="hidden sm:inline">Sync Graph</span>
          </button>
          <div className="h-4 w-[1px] bg-surface-border hidden sm:block" />
          <div className="flex items-center gap-1 text-[11px] font-mono text-muted">
            <Clock className="w-3 h-3 text-muted-dark" />
            <span>Region: us-east-1</span>
          </div>
        </div>
      </div>

      {/* Main Workspace Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[560px]">
        {/* Workspace Sidebar (Section 19) */}
        <DashboardSidebar activeItem={sidebarItem} onSelectItem={setSidebarItem} />

        {/* Workspace Main Canvas */}
        <main className="md:col-span-9 lg:col-span-10 p-4 sm:p-6 flex flex-col gap-5 overflow-x-hidden">
          {/* Metrics Panel (Section 23) */}
          <DashboardMetrics />

          {/* Workflow Graph Container */}
          <div className="rounded-xl border border-surface-border bg-surface-300/60 p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-foreground">AI Workflow</h3>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-brand-500/10 text-brand-300 border border-brand-500/20 font-mono font-semibold">
                    INPUT → MODEL → EVALUATION → DEPLOY
                  </span>
                </div>
                <p className="text-xs text-muted mt-0.5">
                  Click any node to inspect execution variables and live metrics.
                </p>
              </div>

              {/* View Switcher */}
              <div className="flex items-center gap-1 p-1 rounded-lg bg-surface-200 border border-surface-border self-start">
                <button
                  type="button"
                  onClick={() => setActiveTab("graph")}
                  className={cn(
                    "px-3 py-1 text-xs font-semibold rounded-md transition-colors",
                    activeTab === "graph"
                      ? "bg-brand-600 text-white shadow-sm"
                      : "text-muted hover:text-foreground"
                  )}
                >
                  Workflow
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("runs")}
                  className={cn(
                    "px-3 py-1 text-xs font-semibold rounded-md transition-colors",
                    activeTab === "runs"
                      ? "bg-brand-600 text-white shadow-sm"
                      : "text-muted hover:text-foreground"
                  )}
                >
                  Recent Runs
                </button>
              </div>
            </div>

            {/* Workflow Graph or Recent Runs */}
            {activeTab === "graph" ? (
              <WorkflowGraph
                selectedNodeId={selectedNodeId}
                onSelectNode={setSelectedNodeId}
              />
            ) : (
              <RecentRuns />
            )}
          </div>

          {/* Bottom Telemetry Signals */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 p-3.5 rounded-xl bg-surface-200 border border-surface-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-brand-400" />
                  Latency Distribution (p50 / p95 / p99)
                </span>
                <span className="text-[10px] font-mono text-muted">Rolling 1 hour</span>
              </div>
              {/* Custom SVG Sparkline */}
              <div className="h-16 w-full flex items-end gap-1 pt-2">
                {[45, 52, 48, 60, 58, 70, 65, 50, 48, 55, 62, 59, 44, 48, 52, 60, 72, 64, 58, 50, 47, 52, 49, 46].map(
                  (val, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-surface-300 hover:bg-brand-500 rounded-t transition-all duration-200 group relative"
                      style={{ height: `${val}%` }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-surface-50 text-[9px] font-mono text-foreground border border-surface-border whitespace-nowrap pointer-events-none z-20 shadow-md">
                        {val * 12}ms
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className="flex justify-between text-[10px] font-mono text-muted-dark mt-1.5 pt-1.5 border-t border-surface-border">
                <span>p50: 420ms</span>
                <span>p95: 780ms</span>
                <span>p99: 890ms</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-200 border border-surface-border flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-brand-400" />
                    Guardrail Status
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    All Passed
                  </span>
                </div>
                <div className="space-y-1.5 text-[11px] font-mono">
                  <div className="flex items-center justify-between py-1 border-b border-surface-border">
                    <span className="text-muted">PII Detection</span>
                    <span className="text-emerald-400">0 breaches</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-surface-border">
                    <span className="text-muted">Toxicity Filter</span>
                    <span className="text-emerald-400">Clean</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-muted">Similarity Score</span>
                    <span className="text-brand-300 font-semibold">0.96 / 1.0</span>
                  </div>
                </div>
              </div>
              <div className="pt-2 text-[10px] text-muted-foreground font-mono">
                Last checked: 4s ago
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
