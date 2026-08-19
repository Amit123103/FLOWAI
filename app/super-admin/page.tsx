"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, 
  Briefcase, 
  ShieldCheck, 
  UserCheck, 
  Clock, 
  ArrowRight,
  TrendingUp,
  Activity,
  Layers
} from "lucide-react";
import StatsCard from "@/components/admin/StatsCards";
import { getAllUsers, getAllAdmins, onUserUpdate } from "@/lib/auth";
import type { User, B2BUser, Admin } from "@/lib/types";

export default function SuperAdminDashboard() {
  const [users, setUsers] = useState<(User | B2BUser)[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);

  const loadData = () => {
    setUsers(getAllUsers());
    setAdmins(getAllAdmins());
  };

  useEffect(() => {
    loadData();
    const unsub = onUserUpdate(loadData);
    return unsub;
  }, []);

  const b2bCount = users.filter((u) => u.accountType === "b2b").length;
  const normalCount = users.filter((u) => u.accountType === "normal").length;
  const activeUsersCount = users.filter((u) => u.status === "active").length;
  
  // Recent logins
  const recentLogins = users
    .filter((u) => u.lastLoginAt)
    .sort((a, b) => new Date(b.lastLoginAt!).getTime() - new Date(a.lastLoginAt!).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-brand-500/20 text-brand-400 border border-brand-500/30 uppercase">
              Control Hub
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Live Sync Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Super Admin Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time management of permissions, sub-administrators, and customer accounts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/super-admin/admins"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-lg shadow-brand-600/20 transition-all hover:scale-105"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Assign Admin</span>
          </a>
          <a
            href="/super-admin/users"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs transition-all hover:scale-105"
          >
            <Users className="w-4 h-4" />
            <span>Manage Users</span>
          </a>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatsCard
          label="Total Registered Users"
          value={users.length}
          change={`+${users.length} Total`}
          trend="up"
          icon={Users}
          color="brand"
          delay={0.05}
        />
        <StatsCard
          label="B2B Enterprise Accounts"
          value={b2bCount}
          change={`${((b2bCount / (users.length || 1)) * 100).toFixed(0)}% of userbase`}
          trend="neutral"
          icon={Briefcase}
          color="amber"
          delay={0.1}
        />
        <StatsCard
          label="Active Admins Delegated"
          value={admins.length}
          change="Custom Permissions"
          trend="up"
          icon={ShieldCheck}
          color="violet"
          delay={0.15}
        />
        <StatsCard
          label="Active Consumer Users"
          value={normalCount}
          change={`${activeUsersCount} Active`}
          trend="up"
          icon={UserCheck}
          color="emerald"
          delay={0.2}
        />
      </div>

      {/* Overview Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Quick Admin Permissions Portal */}
        <div className="lg:col-span-2 bg-slate-900/70 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">Delegated Administrators</h3>
                <p className="text-xs text-slate-400">Assigned role-based access controllers</p>
              </div>
            </div>
            <a
              href="/super-admin/admins"
              className="text-xs font-mono font-bold text-brand-400 hover:text-brand-300 flex items-center gap-1"
            >
              Configure <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {admins.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-slate-800 rounded-2xl bg-slate-950/40">
              <ShieldCheck className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-400">No delegated admins created yet</p>
              <p className="text-xs text-slate-500 mt-1 mb-4">Assign new admins with granular permission sets</p>
              <a
                href="/super-admin/admins"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold"
              >
                + Assign First Admin
              </a>
            </div>
          ) : (
            <div className="space-y-3">
              {admins.slice(0, 4).map((admin) => (
                <div
                  key={admin.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-all gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-brand-400 font-bold text-sm">
                      {admin.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">{admin.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {admin.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-mono">{admin.email}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {admin.permissions.slice(0, 3).map((perm) => (
                      <span
                        key={perm}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700"
                      >
                        {perm.replace("manage_", "").replace("_", " ")}
                      </span>
                    ))}
                    {admin.permissions.length > 3 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-brand-900/40 text-brand-300 border border-brand-700/40">
                        +{admin.permissions.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Real-time Live Logins Activity */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">Recent Logins</h3>
                <p className="text-xs text-slate-400">Real-time authentication records</p>
              </div>
            </div>

            <div className="space-y-3">
              {recentLogins.length === 0 ? (
                <p className="text-xs text-slate-500 py-6 text-center font-mono">No recent logins logged</p>
              ) : (
                recentLogins.map((u) => (
                  <div
                    key={u.id}
                    className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0">
                        {u.fullName.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate">{u.fullName}</p>
                        <p className="text-[10px] text-slate-400 truncate">{u.email}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="inline-block text-[10px] font-mono text-emerald-400">
                        {new Date(u.lastLoginAt!).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                      <p className="text-[9px] font-mono text-slate-500">
                        {u.accountType.toUpperCase()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <a
            href="/super-admin/users"
            className="w-full py-2.5 rounded-xl border border-slate-800 bg-slate-950/40 hover:bg-slate-800 text-center text-xs font-mono font-bold text-slate-300 hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <span>View All Realtime Users</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
