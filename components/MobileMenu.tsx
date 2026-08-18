"use client";

import React, { useEffect } from "react";
import { ArrowUpRight, X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
}

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
      className="fixed inset-0 z-50 md:hidden bg-white/98 backdrop-blur-2xl flex flex-col justify-between p-6 animate-in fade-in zoom-in-95 duration-200"
    >
      <div className="flex items-center justify-between border-b border-slate-200 pb-5">
        <span className="font-bold text-lg tracking-tight text-slate-900">FlowAI</span>
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 focus-visible:ring-2 focus-visible:ring-brand-500"
          aria-label="Close navigation menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex flex-col space-y-4 my-auto" aria-label="Mobile menu links">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={onClose}
            className="text-2xl font-bold text-slate-800 hover:text-brand-600 transition-colors py-2"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="pt-6 border-t border-slate-200 flex flex-col gap-3">
        <a
          href="#dashboard-preview"
          onClick={onClose}
          className="w-full text-center py-3 text-sm font-medium text-slate-700 hover:text-slate-900 border border-slate-200 rounded-xl bg-slate-50"
        >
          Sign In
        </a>
        <a
          href="#cta"
          onClick={onClose}
          className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-semibold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-lg shadow-brand-600/20 transition-all"
        >
          <span>Start building</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
