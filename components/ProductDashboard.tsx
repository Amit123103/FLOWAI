"use client";

import React, { useState } from "react";
import WorkflowGraph from "./WorkflowGraph";
import { RECENT_RUNS } from "@/lib/data";
import {
  LayoutDashboard,
  PlayCircle,
  FlaskConical,
  GitBranch,
  Activity,
  Settings,
  ChevronDown,
  CircleCheck,
  Clock,
  Zap,
  TrendingUp,
  SlidersHorizontal,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProductDashboard() {
  const [activeTab, setActiveTab] = useState("pipeline");
  const [selectedNodeId, setSelectedNodeId] = useState("model");
  const [sidebarItem, setSidebarItem] = useState("Evaluations");

  const sidebarLinks = [
    { name: "Overview", icon: LayoutDashboard },
    { name: "Playground", icon: PlayCircle },
    { name: "Evaluations", icon: FlaskConical, badge: "3 active" },
    { name: "Deployments", icon: GitBranch },
    { name: "Monitoring", icon: Activity },
    { name: "Settings", icon: Settings },
  ];

  return (
    <div
      id="dashboard-preview"
      className="relative w-full rounded-2xl border border-slate-200/90 bg-white shadow-dashboard overflow-hidden text-slate-900"
    >
      {/* Top Application Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-slate-200 bg-slate-50 text-xs">
        {/* Project Selector & Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-slate-900 tracking-tight">FlowAI Workspace</span>
          </div>
          <span className="text-slate-300 font-light">/</span>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 hover:text-slate-900 cursor-pointer shadow-sm transition-colors">
            <span className="font-mono text-[11px] text-brand-700 font-semibold">Project: Aurora</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-semibold">
            LIVE v2.4
          </span>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-medium shadow-sm transition-colors"
          >
            <RefreshCw className="w-3 h-3 text-brand-600" />
            <span className="hidden sm:inline">Sync Graph</span>
          </button>
          <div className="h-4 w-[1px] bg-slate-200 hidden sm:block" />
          <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>Region: us-east-1</span>
          </div>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[560px]">
        {/* Workspace Sidebar (Desktop) */}
        <aside className="hidden md:flex md:col-span-3 lg:col-span-2 flex-col justify-between border-r border-slate-200 bg-slate-50/60 p-3 text-xs">
          <div className="space-y-1">
            <div className="px-2.5 py-1.5 text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider">
              Workspace
            </div>
            {sidebarLinks.map((item) => {
              const Icon = item.icon;
              const isActive = sidebarItem === item.name;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setSidebarItem(item.name)}
                  className={cn(
                    "w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-all duration-150",
                    isActive
                      ? "bg-white text-slate-900 font-semibold border border-slate-200 shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={cn("w-4 h-4", isActive ? "text-brand-600" : "text-slate-400")} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-brand-50 text-brand-700 border border-brand-200 font-medium">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Sidebar Footer Info */}
          <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-2 shadow-sm">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500 font-medium">Quota Usage</span>
              <span className="font-mono text-slate-900 font-bold">34%</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-brand-600 h-full w-[34%] rounded-full" />
            </div>
            <div className="text-[10px] text-slate-400 font-mono">1.2M / 3.5M tokens</div>
          </div>
        </aside>

        {/* Workspace Canvas / Center Area */}
        <main className="md:col-span-9 lg:col-span-10 p-4 sm:p-6 flex flex-col gap-5 overflow-x-hidden bg-slate-50/30">
          {/* Canvas Subheader with Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-[11px] font-medium">
                <span>Avg Latency</span>
                <Clock className="w-3.5 h-3.5 text-brand-600" />
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 mt-1">820 ms</div>
              <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                <TrendingUp className="w-3 h-3" />
                <span>-42ms vs v2.3</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-[11px] font-medium">
                <span>Eval Pass Rate</span>
                <CircleCheck className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 mt-1">98.4%</div>
              <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                <span>500 test cases</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-[11px] font-medium">
                <span>Throughput</span>
                <Zap className="w-3.5 h-3.5 text-amber-500" />
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 mt-1">420 req/s</div>
              <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                <span>Peak: 680 req/s</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-[11px] font-medium">
                <span>Error SLA</span>
                <Activity className="w-3.5 h-3.5 text-brand-600" />
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 mt-1">0.02%</div>
              <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                <span>Zero failover</span>
              </div>
            </div>
          </div>

          {/* Workflow Interactive Canvas */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">AI Workflow Pipeline</h3>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200 font-mono font-semibold">
                    Interactive
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click any node to inspect execution variables and live metrics.
                </p>
              </div>

              {/* View Switcher */}
              <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100 border border-slate-200 self-start">
                <button
                  type="button"
                  onClick={() => setActiveTab("pipeline")}
                  className={cn(
                    "px-3 py-1 text-xs font-semibold rounded-md transition-colors",
                    activeTab === "pipeline"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  Graph View
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("runs")}
                  className={cn(
                    "px-3 py-1 text-xs font-semibold rounded-md transition-colors",
                    activeTab === "runs"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  Recent Runs
                </button>
              </div>
            </div>

            {/* Workflow Graph or Runs View */}
            {activeTab === "pipeline" ? (
              <WorkflowGraph selectedNodeId={selectedNodeId} onSelectNode={setSelectedNodeId} />
            ) : (
              <div className="rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 text-[11px] font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">Run ID</th>
                      <th className="py-2.5 px-3">Workflow</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Latency</th>
                      <th className="py-2.5 px-3">Eval Score</th>
                      <th className="py-2.5 px-3">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {RECENT_RUNS.map((run) => (
                      <tr key={run.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2.5 px-3 text-brand-700 font-bold">{run.id}</td>
                        <td className="py-2.5 px-3 text-slate-900 font-medium">{run.workflow}</td>
                        <td className="py-2.5 px-3">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold",
                              run.status === "Completed"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-amber-50 text-amber-700 border border-amber-200 animate-pulse"
                            )}
                          >
                            {run.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-600">{run.latency}</td>
                        <td className="py-2.5 px-3 text-slate-900 font-semibold">{run.evalScore}</td>
                        <td className="py-2.5 px-3 text-slate-400">{run.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Bottom telemetry sparkline / run logs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-brand-600" />
                  Latency Distribution (p50 / p95 / p99)
                </span>
                <span className="text-[10px] font-mono text-slate-500">Rolling 1 hour</span>
              </div>
              {/* Custom SVG Sparkline Visualization */}
              <div className="h-16 w-full flex items-end gap-1 pt-2">
                {[45, 52, 48, 60, 58, 70, 65, 50, 48, 55, 62, 59, 44, 48, 52, 60, 72, 64, 58, 50, 47, 52, 49, 46].map(
                  (val, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-slate-200 hover:bg-brand-600 rounded-t transition-all duration-200 group relative"
                      style={{ height: `${val}%` }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-slate-900 text-[9px] font-mono text-white whitespace-nowrap pointer-events-none z-20 shadow-md">
                        {val * 12}ms
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1.5 pt-1.5 border-t border-slate-100">
                <span>p50: 420ms</span>
                <span>p95: 780ms</span>
                <span>p99: 890ms</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-brand-600" />
                    Guardrail Status
                  </span>
                  <span className="text-[10px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    All Passed
                  </span>
                </div>
                <div className="space-y-1.5 text-[11px] font-mono">
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">PII Detection</span>
                    <span className="text-emerald-700 font-semibold">0 breaches</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Toxicity Filter</span>
                    <span className="text-emerald-700 font-semibold">Clean</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-500">Similarity Score</span>
                    <span className="text-brand-700 font-bold">0.96 / 1.0</span>
                  </div>
                </div>
              </div>
              <div className="pt-2 text-[10px] text-slate-400 font-mono">
                Last checked: 4s ago
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
