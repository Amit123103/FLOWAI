"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, Sparkles } from "lucide-react";

export default function FinalCTA() {
  return (
    <section id="cta" className="py-20 md:py-32 relative overflow-hidden" aria-labelledby="cta-heading">
      <div className="max-w-global mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white p-8 sm:p-12 md:p-16 text-center shadow-2xl overflow-hidden"
        >
          {/* Ambient Glowing Background Orb */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-950/80 border border-brand-500/40 text-xs font-mono uppercase tracking-wider text-brand-300 shadow-md font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              Get Started with FlowAI
            </span>

            <h2
              id="cta-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight"
            >
              Build the workflow.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-brand-300 to-amber-300">
                Ship the product.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto font-normal leading-relaxed">
              Give your AI experiments a unified workspace designed for the entire journey from prompt to production.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <a
                href="#dashboard-preview"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm shadow-xl shadow-brand-900/50 hover:shadow-brand-600/40 transition-all duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-brand-400 border border-brand-400/40"
              >
                <span>Start building for free</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#developer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 backdrop-blur-md border border-white/20 hover:border-brand-400/50 text-white font-medium text-sm shadow-lg transition-all duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-brand-400"
              >
                <Terminal className="w-4 h-4 text-brand-400" />
                <span>Explore the SDK</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
