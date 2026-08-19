"use client";

import React from "react";
import { LayoutDashboard, Users, ShieldCheck, LogOut, ChevronLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/super-admin", icon: LayoutDashboard },
  { label: "Admin Management", href: "/super-admin/admins", icon: ShieldCheck },
  { label: "User Management", href: "/super-admin/users", icon: Users },
];

interface AdminSidebarProps {
  onLogout: () => void;
}

export default function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-slate-900 border-r border-slate-800 flex flex-col shrink-0">
      {/* Header */}
      <div className="p-5 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-8 h-8 rounded-lg object-cover border border-slate-700"
          />
          <div className="flex flex-col">
            <span className="font-extrabold text-sm text-white tracking-tight leading-none">
              FlowAI
            </span>
            <span className="text-[9px] font-mono text-brand-400 font-semibold tracking-wider">
              SUPER ADMIN
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
                isActive
                  ? "bg-brand-600 text-white shadow-lg shadow-brand-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              )}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </a>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-slate-800 space-y-1">
        <a
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Store
        </a>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
