"use client";

import React, { useState, useEffect } from "react";
import { Layers, Menu, ArrowUpRight } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onLogoClick?: () => void;
}

export default function Navbar({ onLogoClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Product", href: "#showcase" },
    { label: "Features", href: "#features" },
    { label: "Workflow", href: "#workflow" },
    { label: "Developer", href: "#developer" },
    { label: "Pricing", href: "#cta" },
  ];

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          scrolled
            ? "bg-white/90 backdrop-blur-md border-b border-slate-200 py-3.5 shadow-sm"
            : "bg-transparent py-5 border-b border-transparent"
        )}
      >
        <div className="max-w-global mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={onLogoClick}
              type="button"
              className="group flex items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-md"
              aria-label="FlowAI Home"
            >
              <img
                src="/images/logo.png"
                alt="FlowAI Logo"
                className="w-9 h-9 rounded-lg object-cover shadow-sm border border-slate-200 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight text-slate-900 flex items-center gap-1.5 leading-none">
                  FlowAI
                </span>
                <span className="text-[9px] font-mono text-slate-400 font-medium tracking-wide">
                  WORKSPACE
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3.5 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-md transition-colors duration-150 hover:bg-brand-50/50 focus-visible:ring-2 focus-visible:ring-brand-600"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop Action CTA Button */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="#dashboard-preview"
                className="text-xs font-medium text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md transition-colors"
              >
                Sign In
              </a>
              <a
                href="#cta"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-600/20 transition-all duration-200 hover:shadow-brand-600/30 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-brand-600"
              >
                <span>Start building</span>
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

      {/* Dedicated Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={navLinks}
      />
    </>
  );
}
