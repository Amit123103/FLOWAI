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

      <div className="max-w-global mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-2 sm:pt-4">
        {/* Hero Copy & Actions in a Frosted Glass Card */}
        <div className="max-w-3xl mx-auto text-center space-y-5 p-6 sm:p-8 rounded-3xl bg-slate-950/45 backdrop-blur-md border border-white/15 shadow-2xl">
          {/* Main Heading */}
          <h1
            id="hero-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold tracking-tight text-white leading-snug"
          >
            Ship AI products{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-amber-300 font-extrabold">
              without the infrastructure headache.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base md:text-lg text-slate-200/90 max-w-xl mx-auto font-normal leading-relaxed">
            Build, evaluate, deploy, and monitor AI applications from one focused developer workspace.
          </p>

          {/* CTA Group */}
          <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#cta"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm shadow-lg shadow-brand-900/50 hover:shadow-brand-600/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-brand-400 border border-brand-400/40"
            >
              <span>Start building</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#dashboard-preview"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 backdrop-blur-sm border border-white/20 hover:border-brand-400/50 text-slate-200 hover:text-white font-medium text-sm shadow-md transition-all duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-brand-400"
            >
              <Terminal className="w-4 h-4 text-brand-400" />
              <span>Explore the workspace</span>
            </a>
          </div>

          {/* Small Supporting Line */}
          <div className="pt-0.5 text-xs text-slate-300/80 font-mono tracking-wide">
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
