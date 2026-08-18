"use client";

import React from "react";
import { GitFork, FlaskConical, Rocket, Gauge, History, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  category: string;
  index: number;
}

const featureIcons = [
  GitFork,
  FlaskConical,
  Rocket,
  Gauge,
  History,
  Terminal,
];

export default function FeatureCard({ title, description, category, index }: FeatureCardProps) {
  const Icon = featureIcons[index % featureIcons.length];

  return (
    <div
      className={cn(
        "group relative p-6 sm:p-7 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50/60 transition-all duration-300 flex flex-col justify-between hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50"
      )}
    >
      <div>
        {/* Category & Icon */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-600 group-hover:border-brand-300 group-hover:bg-brand-100 transition-colors">
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200">
            {category}
          </span>
        </div>

        {/* Content */}
        <h3 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-brand-600 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Subtle bottom accent on hover */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-mono text-slate-400 group-hover:text-brand-600 transition-colors">
        <span>0{index + 1} // Ready for production</span>
      </div>
    </div>
  );
}
