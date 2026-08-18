"use client";

import React from "react";
import { RECENT_RUNS } from "@/data/flowai";
import { cn } from "@/lib/utils";

export default function RecentRuns() {
  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm">
      <div className="px-4 py-2.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
        <span className="font-bold text-slate-900">Recent Pipeline Executions</span>
        <span className="text-[10px] font-mono text-slate-500">Mock Demonstration Data</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 text-[10px] uppercase font-semibold">
            <tr>
              <th className="py-2.5 px-4">Run ID</th>
              <th className="py-2.5 px-4">Status</th>
              <th className="py-2.5 px-4">Latency</th>
              <th className="py-2.5 px-4">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {RECENT_RUNS.map((run) => (
              <tr key={run.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-2.5 px-4 text-brand-700 font-bold">{run.id}</td>
                <td className="py-2.5 px-4">
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
                <td className="py-2.5 px-4 text-slate-600">{run.latency}</td>
                <td className="py-2.5 px-4 text-slate-400">{run.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
