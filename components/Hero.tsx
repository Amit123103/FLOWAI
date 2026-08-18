"use client";

import React, { useState, useEffect } from "react";
import ProductDashboard from "./ProductDashboard";
import { ArrowRight, Terminal } from "lucide-react";

const HERO_BACKGROUNDS = [
  {
    src: "/images/hero-bg-1.jpg",
    title: "AI Neural Core Workspace",
    tag: "Neural Cluster",
  },
  {
    src: "/images/hero-bg-2.jpg",
    title: "Cloud Infrastructure Server Bay",
    tag: "Server Mesh",
  },
  {
    src: "/images/hero-bg-3.jpg",
    title: "Holographic Neural Lattice",
    tag: "Graph Network",
  },
  {
    src: "/images/hero-bg-4.jpg",
    title: "AI Development Environment",
    tag: "Developer IDE",
  },
  {
    src: "/images/hero-bg-5.jpg",
    title: "Interconnected Neural Mesh",
    tag: "Vector Mesh",
  },
  {
    src: "/images/hero-bg-6.jpg",
    title: "High Performance Data Pipeline",
    tag: "Data Pipeline",
  },
];

export default function Hero() {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_BACKGROUNDS.length);
    }, 1500); // 1.5-second delay image transition

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden" aria-labelledby="hero-heading">
      {/* 6 Pure Cycling Background Images (1.5s delay transition, no black background color) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {HERO_BACKGROUNDS.map((bg, index) => {
          const isActive = index === currentIdx;
          return (
            <div
              key={bg.src}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? "opacity-100 scale-100" : "opacity-0 scale-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={bg.src}
                alt={bg.title}
                className="w-full h-full object-cover object-center"
              />
            </div>
          );
        })}
      </div>

      <div className="max-w-global mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-4 sm:pt-6">
        {/* Hero Copy & Actions */}
        <div className="max-w-4xl mx-auto text-center space-y-6">

          {/* Main Heading */}
          <h1
            id="hero-heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08] [text-shadow:_0_4px_24px_rgba(0,0,0,0.85),_0_1px_3px_rgba(0,0,0,0.9)]"
          >
            Ship AI products{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-brand-200 to-amber-200 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              without the infrastructure headache.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg md:text-xl text-white max-w-2xl mx-auto font-medium leading-relaxed [text-shadow:_0_2px_12px_rgba(0,0,0,0.9),_0_1px_2px_rgba(0,0,0,0.9)]">
            Build, evaluate, deploy, and monitor AI applications from one focused developer workspace.
          </p>

          {/* CTA Group */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href="#cta"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm shadow-2xl hover:shadow-brand-600/50 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-brand-400 border border-brand-400/40"
            >
              <span>Start building</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#dashboard-preview"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 backdrop-blur-md border border-white/30 hover:border-brand-400/60 text-white font-medium text-sm shadow-xl transition-all duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-brand-400"
            >
              <Terminal className="w-4 h-4 text-brand-400" />
              <span>Explore the workspace</span>
            </a>
          </div>

          {/* Small Supporting Line */}
          <div className="pt-1 text-xs text-white/90 font-mono tracking-wide [text-shadow:_0_1px_8px_rgba(0,0,0,0.9)]">
            Built for developers who want to move from experiment to production.
          </div>
        </div>

        {/* Hero Interactive Product Visual */}
        <div className="mt-12 md:mt-16 max-w-6xl mx-auto">
          <ProductDashboard />
        </div>
      </div>
    </section>
  );
}
