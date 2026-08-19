"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle2, Briefcase } from "lucide-react";
import { registerB2BUser, loginUser } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import { PRODUCT_CATEGORIES } from "@/data/products";

const BUSINESS_TYPES = [
  "Manufacturer",
  "Distributor / Reseller",
  "System Integrator",
  "Educational Institution",
  "Government Agency",
  "Research Organization",
  "Startup",
  "Other",
];

const PROCUREMENT_VOLUMES = [
  "Under ₹1 Lakh",
  "₹1 Lakh - ₹5 Lakh",
  "₹5 Lakh - ₹25 Lakh",
  "₹25 Lakh - ₹1 Crore",
  "Above ₹1 Crore",
];

export default function RegisterB2BPage() {
  const [form, setForm] = useState({
    // Personal / Login
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    // Company details
    companyName: "",
    gstNumber: "",
    businessType: "",
    contactPersonName: "",
    designation: "",
    businessEmail: "",
    businessPhone: "",
    // Company address
    companyStreet: "",
    companyCity: "",
    companyState: "",
    companyPinCode: "",
    // B2B specifics
    annualProcurementVolume: "",
    categoriesOfInterest: [] as string[],
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleCategory = (slug: string) => {
    setForm((prev) => ({
      ...prev,
      categoriesOfInterest: prev.categoriesOfInterest.includes(slug)
        ? prev.categoriesOfInterest.filter((c) => c !== slug)
        : [...prev.categoriesOfInterest, slug],
    }));
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
      registerB2BUser({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role: "b2b",
        accountType: "b2b",
        address: {
          street: form.companyStreet,
          city: form.companyCity,
          state: form.companyState,
          pinCode: form.companyPinCode,
        },
        companyName: form.companyName,
        gstNumber: form.gstNumber,
        businessType: form.businessType,
        contactPersonName: form.contactPersonName,
        designation: form.designation,
        businessEmail: form.businessEmail,
        businessPhone: form.businessPhone,
        companyAddress: {
          street: form.companyStreet,
          city: form.companyCity,
          state: form.companyState,
          pinCode: form.companyPinCode,
        },
        annualProcurementVolume: form.annualProcurementVolume,
        categoriesOfInterest: form.categoriesOfInterest,
      });

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
  const selectClass =
    "w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent transition-all appearance-none";

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-orange-50/20">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-100 border border-amber-200 mb-4">
              <Briefcase className="w-7 h-7 text-amber-700" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">B2B Partner Registration</h1>
            <p className="text-sm text-slate-500 mt-1">Get access to bulk pricing, dedicated support, and exclusive B2B benefits</p>
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
                B2B Account created! Redirecting...
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Section 1: Company Details */}
              <div className="pb-2 mb-1 border-b border-amber-100">
                <span className="text-[10px] font-mono font-bold text-amber-700 uppercase tracking-wider">Company Information</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="companyName" className="block text-xs font-bold text-slate-700 mb-1.5">Company Name *</label>
                  <input id="companyName" name="companyName" required value={form.companyName} onChange={handleChange} className={inputClass} placeholder="Acme Drones Pvt. Ltd." />
                </div>
                <div>
                  <label htmlFor="gstNumber" className="block text-xs font-bold text-slate-700 mb-1.5">GST Number *</label>
                  <input id="gstNumber" name="gstNumber" required value={form.gstNumber} onChange={handleChange} className={inputClass} placeholder="22AAAAA0000A1Z5" />
                </div>
              </div>

              <div>
                <label htmlFor="businessType" className="block text-xs font-bold text-slate-700 mb-1.5">Business Type *</label>
                <select id="businessType" name="businessType" required value={form.businessType} onChange={handleChange} className={selectClass}>
                  <option value="">Select business type</option>
                  {BUSINESS_TYPES.map((bt) => (
                    <option key={bt} value={bt}>{bt}</option>
                  ))}
                </select>
              </div>

              {/* Section 2: Contact Person */}
              <div className="pt-3 pb-2 mb-1 border-b border-amber-100">
                <span className="text-[10px] font-mono font-bold text-amber-700 uppercase tracking-wider">Contact Person Details</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contactPersonName" className="block text-xs font-bold text-slate-700 mb-1.5">Contact Person Name *</label>
                  <input id="contactPersonName" name="contactPersonName" required value={form.contactPersonName} onChange={handleChange} className={inputClass} placeholder="Rajesh Kumar" />
                </div>
                <div>
                  <label htmlFor="designation" className="block text-xs font-bold text-slate-700 mb-1.5">Designation *</label>
                  <input id="designation" name="designation" required value={form.designation} onChange={handleChange} className={inputClass} placeholder="Procurement Manager" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="businessEmail" className="block text-xs font-bold text-slate-700 mb-1.5">Business Email *</label>
                  <input id="businessEmail" name="businessEmail" type="email" required value={form.businessEmail} onChange={handleChange} className={inputClass} placeholder="procurement@company.com" />
                </div>
                <div>
                  <label htmlFor="businessPhone" className="block text-xs font-bold text-slate-700 mb-1.5">Business Phone *</label>
                  <input id="businessPhone" name="businessPhone" type="tel" required value={form.businessPhone} onChange={handleChange} className={inputClass} placeholder="+91 98765 43210" />
                </div>
              </div>

              {/* Section 3: Company Address */}
              <div className="pt-3 pb-2 mb-1 border-b border-amber-100">
                <span className="text-[10px] font-mono font-bold text-amber-700 uppercase tracking-wider">Company Address</span>
              </div>

              <div>
                <label htmlFor="companyStreet" className="block text-xs font-bold text-slate-700 mb-1.5">Street Address *</label>
                <input id="companyStreet" name="companyStreet" required value={form.companyStreet} onChange={handleChange} className={inputClass} placeholder="Plot 42, Industrial Area, Phase 2" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="companyCity" className="block text-xs font-bold text-slate-700 mb-1.5">City *</label>
                  <input id="companyCity" name="companyCity" required value={form.companyCity} onChange={handleChange} className={inputClass} placeholder="Pune" />
                </div>
                <div>
                  <label htmlFor="companyState" className="block text-xs font-bold text-slate-700 mb-1.5">State *</label>
                  <input id="companyState" name="companyState" required value={form.companyState} onChange={handleChange} className={inputClass} placeholder="Maharashtra" />
                </div>
                <div>
                  <label htmlFor="companyPinCode" className="block text-xs font-bold text-slate-700 mb-1.5">PIN Code *</label>
                  <input id="companyPinCode" name="companyPinCode" required value={form.companyPinCode} onChange={handleChange} className={inputClass} placeholder="411057" />
                </div>
              </div>

              {/* Section 4: Login Credentials */}
              <div className="pt-3 pb-2 mb-1 border-b border-amber-100">
                <span className="text-[10px] font-mono font-bold text-amber-700 uppercase tracking-wider">Login Credentials</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-bold text-slate-700 mb-1.5">Full Name *</label>
                  <input id="fullName" name="fullName" required value={form.fullName} onChange={handleChange} className={inputClass} placeholder="Your full name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-slate-700 mb-1.5">Login Email *</label>
                  <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className={inputClass} placeholder="you@company.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-slate-700 mb-1.5">Phone *</label>
                  <input id="phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} className={inputClass} placeholder="+91 98765 43210" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="password" className="block text-xs font-bold text-slate-700 mb-1.5">Password *</label>
                    <div className="relative">
                      <input id="password" name="password" type={showPassword ? "text" : "password"} required value={form.password} onChange={handleChange} className={`${inputClass} pr-9`} placeholder="Min 6" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-xs font-bold text-slate-700 mb-1.5">Confirm *</label>
                    <input id="confirmPassword" name="confirmPassword" type="password" required value={form.confirmPassword} onChange={handleChange} className={inputClass} placeholder="Re-enter" />
                  </div>
                </div>
              </div>

              {/* Section 5: Procurement Details */}
              <div className="pt-3 pb-2 mb-1 border-b border-amber-100">
                <span className="text-[10px] font-mono font-bold text-amber-700 uppercase tracking-wider">Procurement Details</span>
              </div>

              <div>
                <label htmlFor="annualProcurementVolume" className="block text-xs font-bold text-slate-700 mb-1.5">Annual Procurement Volume *</label>
                <select id="annualProcurementVolume" name="annualProcurementVolume" required value={form.annualProcurementVolume} onChange={handleChange} className={selectClass}>
                  <option value="">Select volume</option>
                  {PROCUREMENT_VOLUMES.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Product Categories of Interest</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <button
                      key={cat.slug}
                      type="button"
                      onClick={() => toggleCategory(cat.slug)}
                      className={`text-left px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                        form.categoriesOfInterest.includes(cat.slug)
                          ? "bg-brand-50 border-brand-300 text-brand-700"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Section 6: Document Upload (UI only) */}
              <div className="pt-3 pb-2 mb-1 border-b border-amber-100">
                <span className="text-[10px] font-mono font-bold text-amber-700 uppercase tracking-wider">Business Documents (Optional)</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Business License / Certificate</label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-brand-300 transition-colors cursor-pointer">
                  <p className="text-xs text-slate-500">Drag & drop your document here, or click to browse</p>
                  <p className="text-[10px] text-slate-400 mt-1">PDF, JPG, PNG (Max 5MB)</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || success}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-sm font-bold shadow-lg shadow-amber-600/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {loading ? "Creating B2B Account..." : "Create B2B Account"}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            <p className="text-center text-xs text-slate-500 mt-5">
              Want a personal account?{" "}
              <a href="/auth/register" className="font-semibold text-brand-600 hover:text-brand-700">Register here</a>
              {" "} · {" "}
              Already registered?{" "}
              <a href="/auth/login" className="font-semibold text-brand-600 hover:text-brand-700">Sign in</a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
