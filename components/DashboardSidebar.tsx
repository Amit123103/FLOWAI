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
    <aside className="hidden md:flex md:col-span-3 lg:col-span-2 flex-col justify-between border-r border-slate-200 bg-slate-50/70 p-3.5 text-xs">
      <div className="space-y-1">
        <div className="px-2.5 py-1.5 text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider">
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
                  ? "bg-white text-slate-900 font-semibold border border-slate-200 shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
              )}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={cn("w-4 h-4", isActive ? "text-brand-600" : "text-slate-400")} />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-brand-50 text-brand-700 border border-brand-200 font-semibold">
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
  );
}
