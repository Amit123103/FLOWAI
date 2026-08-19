"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { getCurrentUser, logoutUser } from "@/lib/auth";
import type { AuthSession } from "@/lib/types";
import { ShieldAlert, LogIn } from "lucide-react";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
    setSession(user);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    logoutUser();
    window.location.href = "/auth/login";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 font-mono text-sm">
        Authenticating Super Admin session...
      </div>
    );
  }

  // If not logged in or not an admin/super-admin, show quick auth prompt or access denied
  if (!session || (session.role !== "super-admin" && session.role !== "admin")) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto mb-5">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Restricted Access Area</h2>
          <p className="text-xs text-slate-400 leading-relaxed mb-6">
            You must be signed in with a Super Admin or Administrator account to access the control panel.
          </p>

          <div className="space-y-3">
            <a
              href="/auth/login"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 transition-all"
            >
              <LogIn className="w-4 h-4" />
              Sign in as Admin
            </a>
            <a
              href="/"
              className="w-full inline-block py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white text-xs font-semibold hover:bg-slate-800/50 transition-all"
            >
              Return to Storefront
            </a>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] font-mono text-slate-500 text-left bg-slate-950/60 p-3 rounded-xl">
            <p className="font-bold text-slate-400 mb-1">Demo Super Admin Credentials:</p>
            <p>Email: <span className="text-amber-400">superadmin@droneshop.com</span></p>
            <p>Password: <span className="text-amber-400">SuperAdmin@123</span></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      <AdminSidebar onLogout={handleLogout} />
      <main className="flex-1 min-w-0 bg-slate-900/40 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
