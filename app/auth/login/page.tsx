"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, AlertCircle, Briefcase } from "lucide-react";
import { loginUser } from "@/lib/auth";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const session = loginUser(form.email, form.password);
      // Redirect based on role
      if (session.role === "super-admin" || session.role === "admin") {
        window.location.href = "/super-admin";
      } else {
        window.location.href = "/";
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-50/30">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-100 border border-brand-200 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.png" alt="Logo" className="w-8 h-8 rounded-lg" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h1>
            <p className="text-sm text-slate-500 mt-1">Sign in to your account</p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6 sm:p-8">
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium mb-5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent transition-all"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent transition-all pr-10"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-bold shadow-lg shadow-brand-600/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
              >
                {loading ? "Signing in..." : "Sign In"}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[10px] font-mono text-slate-400 uppercase">or</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Register Links */}
            <div className="space-y-2">
              <a
                href="/auth/register"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 hover:border-brand-300 text-sm font-semibold text-slate-700 hover:text-brand-700 hover:bg-brand-50/50 transition-all"
              >
                Create an Account
              </a>
              <a
                href="/auth/register-b2b"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-amber-200 hover:border-amber-300 bg-amber-50/50 text-sm font-semibold text-amber-800 hover:bg-amber-100/50 transition-all"
              >
                <Briefcase className="w-4 h-4" />
                Register as B2B Partner
              </a>
            </div>

            {/* Super Admin hint */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <p className="text-[10px] text-slate-400 font-mono text-center">
                Super Admin: superadmin@droneshop.com / SuperAdmin@123
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
