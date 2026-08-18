"use client";

import React from "react";
import { DASHBOARD_METRICS } from "@/data/flowai";
import { Clock, CircleCheck, Zap, Activity, TrendingUp } from "lucide-react";

export default function DashboardMetrics() {
  const icons = [Clock, CircleCheck, Zap, Activity];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {DASHBOARD_METRICS.map((metric, idx) => {
        const Icon = icons[idx % icons.length];
        return (
          <div
            key={metric.label}
            className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm transition-colors hover:border-slate-300"
          >
            <div className="flex items-center justify-between text-slate-500 text-[11px]">
              <span className="font-semibold">{metric.label}</span>
              <Icon className="w-3.5 h-3.5 text-brand-600" />
            </div>
            <div className="text-lg font-bold font-mono text-slate-900 mt-1 tracking-tight">
              {metric.value}
            </div>
            <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5 font-mono">
              <TrendingUp className="w-3 h-3" />
              <span>{metric.change}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
