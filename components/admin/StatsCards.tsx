"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: LucideIcon;
  color: string;
  delay?: number;
}

export default function StatsCard({ label, value, change, trend, icon: Icon, color, delay = 0 }: StatCardProps) {
  const colorMap: Record<string, string> = {
    brand: "bg-brand-50 text-brand-600 border-brand-200",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-200",
    amber: "bg-amber-50 text-amber-600 border-amber-200",
    violet: "bg-violet-50 text-violet-600 border-violet-200",
    sky: "bg-sky-50 text-sky-600 border-sky-200",
  };

  const trendColors = {
    up: "text-emerald-600",
    down: "text-red-500",
    neutral: "text-slate-400",
  };

  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-xl border ${colorMap[color] || colorMap.brand}`}>
          <Icon className="w-4 h-4" />
        </div>
        {change && trend && (
          <div className={`flex items-center gap-1 text-xs font-semibold ${trendColors[trend]}`}>
            <TrendIcon className="w-3 h-3" />
            {change}
          </div>
        )}
      </div>
      <div className="text-2xl font-extrabold text-slate-900 tracking-tight">{value}</div>
      <div className="text-xs text-slate-500 font-medium mt-0.5">{label}</div>
    </motion.div>
  );
}
