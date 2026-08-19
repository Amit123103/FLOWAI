"use client";

import React, { use } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SERVICES } from "@/data/services";
import { 
  ArrowLeft, 
  Wrench, 
  Printer, 
  GraduationCap, 
  Building, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  PhoneCall, 
  Send
} from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Printer,
  Wrench,
  GraduationCap,
  Building,
  BookOpen,
};

export default function ServiceDetailPage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const resolvedParams = use(params);
  const serviceSlug = resolvedParams.service;

  const currentService = SERVICES.find((s) => s.slug === serviceSlug) || {
    name: serviceSlug.replace(/-/g, " ").toUpperCase(),
    description: "Professional industrial drone services and support.",
    slug: serviceSlug,
    icon: "Wrench",
  };

  const IconComponent = iconMap[currentService.icon] || Wrench;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        {/* Navigation */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-brand-50 border border-brand-200 text-brand-700 flex items-center justify-center shrink-0">
              <IconComponent className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-brand-600 uppercase tracking-wider">
                Industrial Drone Service
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
                {currentService.name}
              </h1>
            </div>
          </div>

          <p className="text-base text-slate-600 leading-relaxed max-w-3xl">
            {currentService.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-900">Certified Engineers</p>
                <p className="text-[10px] text-slate-500">DGCA & OEM Certified</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <Clock className="w-5 h-5 text-brand-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-900">Quick Turnaround</p>
                <p className="text-[10px] text-slate-500">24-48h Diagnostic SLA</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <PhoneCall className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-900">Dedicated Advisor</p>
                <p className="text-[10px] text-slate-500">Direct technical contact</p>
              </div>
            </div>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm">
          <div className="max-w-xl mb-6">
            <h2 className="text-xl font-bold text-slate-900">Request a Service Quote</h2>
            <p className="text-xs text-slate-500 mt-1">
              Submit your inquiry and our engineering team will get back to you within 2 hours.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Service inquiry submitted successfully! Our drone specialists will contact you shortly.");
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Verma"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Contact Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="rahul@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Institution / Org</label>
                <input
                  type="text"
                  placeholder="Company / School / College"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Requirement Details *</label>
              <textarea
                rows={4}
                required
                placeholder="Describe your drone requirements, timeline, quantity, or specific models involved..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Send className="w-4 h-4" />
              <span>Submit Service Request</span>
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
