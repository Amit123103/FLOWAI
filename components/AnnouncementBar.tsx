"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <aside
      aria-label="Product Announcement"
      className="relative z-50 border-b border-surface-border bg-surface-300/80 backdrop-blur-md text-xs py-2 px-4 text-center transition-colors duration-200"
    >
      <a
        href="#workflow"
        className="group inline-flex items-center justify-center gap-2 text-muted hover:text-foreground font-medium transition-colors"
      >
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/10 px-2 py-0.5 text-[11px] font-semibold text-brand-400 border border-brand-500/20">
          <Sparkles className="w-3 h-3 text-brand-400" />
          v2.4
        </span>
        <span>FlowAI Workspace — Build your next AI workflow faster</span>
        <ArrowRight className="w-3.5 h-3.5 text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-brand-400" />
      </a>
    </aside>
  );
}
