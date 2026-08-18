"use client";

import React from "react";
import {
  LayoutDashboard,
  PlayCircle,
  FlaskConical,
  GitBranch,
  Activity,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardSidebarProps {
  activeItem: string;
  onSelectItem: (item: string) => void;
}

export default function DashboardSidebar({ activeItem, onSelectItem }: DashboardSidebarProps) {
  const sidebarLinks = [
    { name: "Overview", icon: LayoutDashboard },
    { name: "Playground", icon: PlayCircle },
    { name: "Evaluations", icon: FlaskConical, badge: "3 active" },
    { name: "Deployments", icon: GitBranch },
    { name: "Monitoring", icon: Activity },
    { name: "Settings", icon: Settings },
  ];

  return (
    <aside className="hidden md:flex md:col-span-3 lg:col-span-2 flex-col justify-between border-r border-surface-border bg-surface-300/60 p-3.5 text-xs">
      <div className="space-y-1">
        <div className="px-2.5 py-1.5 text-[10px] font-mono font-medium text-muted-dark uppercase tracking-wider">
          Workspace
        </div>
        {sidebarLinks.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.name;
          return (
            <button
              key={item.name}
              type="button"
              onClick={() => onSelectItem(item.name)}
              className={cn(
                "w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-all duration-150",
                isActive
                  ? "bg-surface-50 text-foreground font-semibold border border-surface-border-bright shadow-sm"
                  : "text-muted hover:text-foreground hover:bg-surface-100/50"
              )}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={cn("w-4 h-4", isActive ? "text-brand-400" : "text-muted")} />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-brand-500/10 text-brand-400 border border-brand-500/20">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Sidebar Footer Info */}
      <div className="p-3 rounded-lg bg-surface-200 border border-surface-border space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-muted">Quota Usage</span>
          <span className="font-mono text-foreground font-semibold">34%</span>
        </div>
        <div className="w-full bg-surface-400 h-1.5 rounded-full overflow-hidden">
          <div className="bg-brand-500 h-full w-[34%] rounded-full" />
        </div>
        <div className="text-[10px] text-muted-dark font-mono">1.2M / 3.5M tokens</div>
      </div>
    </aside>
  );
}
