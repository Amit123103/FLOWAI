"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { GitFork, FlaskConical, Rocket, History, Gauge, Terminal, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  category: string;
  index: number;
  hasMiniUI?: boolean;
  uiType?: string;
}

const featureIcons = [
  GitFork,
  FlaskConical,
  Rocket,
  History,
  Gauge,
  Terminal,
];

export default function FeatureCard({
  title,
  description,
  category,
  index,
  hasMiniUI,
  uiType,
}: FeatureCardProps) {
  const Icon = featureIcons[index % featureIcons.length];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -5, scale: 1.01 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative p-6 sm:p-7 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50/70 transition-all duration-300 flex flex-col justify-between hover:border-brand-300 hover:shadow-xl hover:shadow-brand-500/10 cursor-pointer overflow-hidden"
      )}
    >
      {/* Top Category & Icon */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-600 group-hover:border-brand-400 group-hover:bg-brand-600 group-hover:text-white transition-all duration-200 shadow-xs">
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 group-hover:text-brand-700 font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 group-hover:bg-brand-50 border border-slate-200 group-hover:border-brand-200 transition-colors">
            {category}
          </span>
        </div>

        {/* Content */}
        <h3 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-brand-700 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          {description}
        </p>

        {/* Miniature Interactive Visualizations */}
        {hasMiniUI && (
          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-mono shadow-xs">
            {uiType === "workflow" && (
              <div className="flex items-center justify-between gap-1.5 text-[11px]">
                <span className="px-2 py-1 rounded bg-white border border-slate-200 text-brand-700 font-bold shadow-xs">
                  Prompt
                </span>
                <span className="text-slate-400">→</span>
                <span className="px-2 py-1 rounded bg-white border border-slate-200 text-emerald-700 font-bold shadow-xs">
                  Model
                </span>
                <span className="text-slate-400">→</span>
                <span className="px-2 py-1 rounded bg-white border border-slate-200 text-rose-700 font-bold shadow-xs">
                  Eval
                </span>
              </div>
            )}

            {uiType === "evaluation" && (
              <div className="space-y-1 text-[11px]">
                <div className="flex justify-between text-slate-400 text-[10px] pb-1 border-b border-slate-200">
                  <span>Test Case</span>
                  <span>Result</span>
                </div>
                <div className="flex justify-between items-center text-slate-800">
                  <span>Case 01</span>
                  <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3 h-3" /> Pass
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-800">
                  <span>Case 02</span>
                  <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3 h-3" /> Pass
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-800">
                  <span>Case 03</span>
                  <span className="text-amber-700 flex items-center gap-1 font-semibold">
                    <AlertCircle className="w-3 h-3" /> Review
                  </span>
                </div>
              </div>
            )}

            {uiType === "versioning" && (
              <div className="flex items-center gap-2">
                <div className="px-2 py-1 rounded bg-brand-50 text-brand-700 border border-brand-200 font-bold">
                  v1.4 (Active)
                </div>
                <div className="px-2 py-1 rounded bg-white text-slate-500 border border-slate-200">
                  v1.3
                </div>
                <div className="px-2 py-1 rounded bg-white text-slate-500 border border-slate-200">
                  v1.2
                </div>
              </div>
            )}

            {uiType === "monitoring" && (
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Latency Telemetry</span>
                  <span className="text-emerald-700 font-bold">310ms</span>
                </div>
                <div className="h-6 w-full flex items-end gap-1 pt-1">
                  {[40, 60, 50, 75, 65, 80, 55, 45, 50, 48].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-brand-200 hover:bg-brand-500 rounded-t transition-colors"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-brand-600 transition-colors">
        <span>0{index + 1} // Production Grade</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </motion.div>
  );
}
