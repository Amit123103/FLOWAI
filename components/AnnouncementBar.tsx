"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <aside
      aria-label="Product Announcement"
      className="relative z-50 border-b border-slate-200 bg-slate-50/90 backdrop-blur-md text-xs py-2 px-4 text-center transition-colors duration-200"
    >
      <a
        href="#workflow"
        className="group inline-flex items-center justify-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors"
      >
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-700 border border-brand-200">
          <Sparkles className="w-3 h-3 text-brand-600" />
          v2.4
        </span>
        <span>FlowAI Workspace — Build your next AI workflow faster</span>
        <ArrowRight className="w-3.5 h-3.5 text-slate-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-brand-600" />
      </a>
    </aside>
  );
}
