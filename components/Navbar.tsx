"use client";

import React, { useState, useEffect } from "react";
import { Layers, Menu, ArrowUpRight, Star, Sparkles, X, Terminal, Cpu, Database, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MobileMenu from "./MobileMenu";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onLogoClick?: () => void;
}

export default function Navbar({ onLogoClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [studioModalOpen, setStudioModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Product", href: "#showcase" },
    { label: "ROI Calculator", href: "#roi-calculator" },
    { label: "Benchmarks", href: "#comparison" },
    { label: "Features", href: "#features" },
    { label: "SDK", href: "#developer" },
  ];

  const studioTemplates = [
    {
      title: "Customer Support Intent Classifier",
      desc: "Fast multi-class intent router with PII masking and fallback",
      model: "Claude 3.5 Sonnet",
      icon: Cpu,
    },
    {
      title: "Enterprise RAG & Hybrid Vector Search",
      desc: "Pinecone / Qdrant vector retrieval with re-ranking assertions",
      model: "Gemini 2.0 Flash",
      icon: Database,
    },
    {
      title: "Python Execution & WASM Sandbox",
      desc: "Isolated MicroVM runner with live unit test assertions",
      model: "GPT-4o",
      icon: Terminal,
    },
  ];

  const handleLaunchTemplate = () => {
    setStudioModalOpen(false);
    const target = document.getElementById("dashboard-preview");
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-slate-200 py-3 shadow-md"
            : "bg-white/70 backdrop-blur-md py-4 border-b border-slate-100/50"
        )}
      >
        <div className="max-w-global mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo & GitHub Star Badge */}
            <div className="flex items-center gap-3">
              <button
                onClick={onLogoClick}
                type="button"
                className="group flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-md"
                aria-label="FlowAI Home"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/logo.png"
                  alt="FlowAI Logo"
                  className="w-8 h-8 rounded-lg object-cover shadow-sm border border-slate-200 transition-transform duration-300 group-hover:scale-105"
                />
                <div className="flex flex-col">
                  <span className="font-extrabold text-base tracking-tight text-slate-900 leading-none">
                    FlowAI
                  </span>
                  <span className="text-[9px] font-mono text-brand-700 font-semibold tracking-wider">
                    DEV WORKSPACE
                  </span>
                </div>
              </button>

              {/* GitHub Star Badge */}
              <a
                href="https://github.com/Amit123103/FLOWAI"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-mono font-semibold transition-all hover:scale-105"
              >
                <Star className="w-3 h-3 text-amber-500 fill-amber-400" />
                <span>Star</span>
                <span className="bg-white px-1.5 py-0.2 rounded-full text-[10px] text-slate-600 border border-slate-200">
                  4.8k
                </span>
              </a>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-brand-700 rounded-lg transition-colors hover:bg-brand-50/60 focus-visible:ring-2 focus-visible:ring-brand-600"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop Action CTA Buttons */}
            <div className="hidden md:flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setStudioModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 transition-all hover:border-slate-300"
              >
                <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                <span>Launch Studio</span>
              </button>

              <a
                href="#cta"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-600/20 transition-all duration-200 hover:shadow-brand-600/30 hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-brand-600"
              >
                <span>Get Started</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-slate-600 hover:text-brand-600 hover:bg-brand-50 border border-slate-200 focus-visible:ring-2 focus-visible:ring-brand-600"
              aria-expanded={mobileMenuOpen}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Launch Studio Template Modal */}
      <AnimatePresence>
        {studioModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl p-6 rounded-3xl bg-white border border-slate-200 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-brand-50 text-brand-600 border border-brand-200">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">FlowAI Studio Quick Launcher</h3>
                    <p className="text-xs text-slate-500 font-mono">Select a prebuilt pipeline to test in the simulator</p>
                  </div>
                </div>
                <button
                  onClick={() => setStudioModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2.5">
                {studioTemplates.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={i}
                      onClick={handleLaunchTemplate}
                      className="w-full p-3.5 rounded-2xl border border-slate-200 hover:border-brand-500 bg-slate-50 hover:bg-brand-50/40 text-left transition-all group flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 group-hover:text-brand-600">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-xs text-slate-900 group-hover:text-brand-700">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">{item.desc}</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                        {item.model}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100 text-xs font-mono">
                <button
                  onClick={() => setStudioModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLaunchTemplate}
                  className="px-4 py-2 rounded-xl bg-brand-600 text-white font-bold hover:bg-brand-500"
                >
                  Open Live Playground →
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Dedicated Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={navLinks}
      />
    </>
  );
}
