"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle2, Briefcase } from "lucide-react";
import { registerUser, loginUser } from "@/lib/auth";
import Navbar from "@/components/Navbar";

export default function RegisterPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      registerUser({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role: "user",
        accountType: "normal",
        address: {
          street: form.street,
          city: form.city,
          state: form.state,
          pinCode: form.pinCode,
        },
      });

      // Auto-login after registration
      loginUser(form.email, form.password);
      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent transition-all";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-50/30">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Create Account</h1>
            <p className="text-sm text-slate-500 mt-1">Join our drone community and start shopping</p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6 sm:p-8">
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium mb-5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium mb-5">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                Account created! Redirecting...
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Personal Info */}
              <div className="pb-2 mb-2 border-b border-slate-100">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Personal Details</span>
              </div>

              <div>
                <label htmlFor="fullName" className="block text-xs font-bold text-slate-700 mb-1.5">Full Name *</label>
                <input id="fullName" name="fullName" required value={form.fullName} onChange={handleChange} className={inputClass} placeholder="John Doe" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-slate-700 mb-1.5">Email *</label>
                  <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className={inputClass} placeholder="you@example.com" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-slate-700 mb-1.5">Phone *</label>
                  <input id="phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} className={inputClass} placeholder="+91 98765 43210" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="password" className="block text-xs font-bold text-slate-700 mb-1.5">Password *</label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={form.password}
                      onChange={handleChange}
                      className={`${inputClass} pr-10`}
                      placeholder="Min 6 chars"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-xs font-bold text-slate-700 mb-1.5">Confirm Password *</label>
                  <input id="confirmPassword" name="confirmPassword" type="password" required value={form.confirmPassword} onChange={handleChange} className={inputClass} placeholder="Re-enter password" />
                </div>
              </div>

              {/* Address */}
              <div className="pt-2 pb-2 mb-2 border-b border-slate-100">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Shipping Address</span>
              </div>

              <div>
                <label htmlFor="street" className="block text-xs font-bold text-slate-700 mb-1.5">Street Address *</label>
                <input id="street" name="street" required value={form.street} onChange={handleChange} className={inputClass} placeholder="123 Main St, Apt 4B" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="city" className="block text-xs font-bold text-slate-700 mb-1.5">City *</label>
                  <input id="city" name="city" required value={form.city} onChange={handleChange} className={inputClass} placeholder="Mumbai" />
                </div>
                <div>
                  <label htmlFor="state" className="block text-xs font-bold text-slate-700 mb-1.5">State *</label>
                  <input id="state" name="state" required value={form.state} onChange={handleChange} className={inputClass} placeholder="Maharashtra" />
                </div>
                <div>
                  <label htmlFor="pinCode" className="block text-xs font-bold text-slate-700 mb-1.5">PIN Code *</label>
                  <input id="pinCode" name="pinCode" required value={form.pinCode} onChange={handleChange} className={inputClass} placeholder="400001" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || success}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-bold shadow-lg shadow-brand-600/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {loading ? "Creating Account..." : "Create Account"}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[10px] font-mono text-slate-400 uppercase">or</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            <div className="space-y-2">
              <a
                href="/auth/register-b2b"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-amber-200 hover:border-amber-300 bg-amber-50/50 text-sm font-semibold text-amber-800 hover:bg-amber-100/50 transition-all"
              >
                <Briefcase className="w-4 h-4" />
                Register as B2B Partner instead
              </a>
              <p className="text-center text-xs text-slate-500">
                Already have an account?{" "}
                <a href="/auth/login" className="font-semibold text-brand-600 hover:text-brand-700">Sign in</a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
