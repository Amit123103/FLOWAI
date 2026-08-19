"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Briefcase, 
  Percent, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  FileText, 
  ArrowRight, 
  Building2, 
  Users
} from "lucide-react";
import Link from "next/link";

export default function B2BPortalPage() {
  const perks = [
    {
      icon: Percent,
      title: "Wholesale & Tiered Pricing",
      desc: "Up to 35% discount on bulk components, motors, ESCs, frames, and commercial drone kits.",
    },
    {
      icon: CreditCard,
      title: "Flexible Net-30 Credit Terms",
      desc: "Instant line of credit for qualified educational institutions and verified enterprises.",
    },
    {
      icon: FileText,
      title: "GST Invoice & Input Tax Credit",
      desc: "100% compliant B2B tax invoicing with automated GST filing and reconciliation support.",
    },
    {
      icon: Truck,
      title: "Priority Air Logistics",
      desc: "Fast express dispatch across India with dedicated supply chain tracking.",
    },
    {
      icon: ShieldCheck,
      title: "Official OEM Warranty",
      desc: "Direct replacement guarantees on defective parts with priority technical RMA.",
    },
    {
      icon: Building2,
      title: "Institutional Customization",
      desc: "Bespoke drone kits and curriculum designed specifically for ATL and research labs.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-amber-500/10 via-white to-slate-50 border-b border-slate-200/80 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300 shadow-sm">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Enterprise & Wholesale Supply</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight max-w-3xl mx-auto leading-tight">
              Empowering India&apos;s Drone Innovators & Institutions
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Get direct OEM pricing, bulk component discounts, and customized ATL lab solutions with our verified B2B Partner Program.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link
                href="/auth/register-b2b"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-sm font-bold shadow-xl shadow-amber-600/25 transition-all hover:scale-105 active:scale-95"
              >
                <span>Register B2B Account</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/auth/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold shadow-sm transition-all"
              >
                Sign In to B2B Account
              </Link>
            </div>
          </div>
        </section>

        {/* Perks Grid */}
        <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Why Partner With Us?
            </h2>
            <p className="text-sm text-slate-500">
              Built for commercial operators, educational universities, and hardware manufacturers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((perk, i) => {
              const Icon = perk.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-amber-300 transition-all space-y-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{perk.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{perk.desc}</p>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
