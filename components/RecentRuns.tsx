"use client";

import React from "react";
import { RECENT_RUNS } from "@/data/flowai";
import { cn } from "@/lib/utils";

export default function RecentRuns() {
  return (
    <div className="rounded-xl border border-surface-border overflow-hidden bg-surface-200">
      <div className="px-4 py-2.5 border-b border-surface-border bg-surface-300 flex items-center justify-between text-xs">
        <span className="font-semibold text-foreground">Recent Pipeline Executions</span>
        <span className="text-[10px] font-mono text-muted">Mock Demonstration Data</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-surface-300/80 text-muted-dark border-b border-surface-border text-[10px] uppercase">
            <tr>
              <th className="py-2 px-4">Run ID</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Latency</th>
              <th className="py-2 px-4">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border">
            {RECENT_RUNS.map((run) => (
              <tr key={run.id} className="hover:bg-surface-100/60 transition-colors">
                <td className="py-2.5 px-4 text-brand-300 font-semibold">{run.id}</td>
                <td className="py-2.5 px-4">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px]",
                      run.status === "Completed"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-300 border border-amber-500/20 animate-pulse"
                    )}
                  >
                    {run.status}
                  </span>
                </td>
                <td className="py-2.5 px-4 text-muted">{run.latency}</td>
                <td className="py-2.5 px-4 text-muted-dark">{run.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
