"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight, X, ChevronDown, ShoppingCart, Briefcase, Shield, LogOut } from "lucide-react";
import type { AuthSession } from "@/lib/types";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
  session?: AuthSession | null;
  onLogout?: () => void;
  productCategories?: { name: string; slug: string; icon: string }[];
  services?: { name: string; slug: string; icon: string }[];
}

export default function MobileMenu({
  isOpen,
  onClose,
  links,
  session,
  onLogout,
  productCategories = [],
  services = [],
}: MobileMenuProps) {
  const [productsExpanded, setProductsExpanded] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
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
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
      className="fixed inset-0 z-50 md:hidden bg-white/98 backdrop-blur-2xl flex flex-col justify-between animate-in fade-in zoom-in-95 duration-200 overflow-y-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 p-5">
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-8 h-8 rounded-lg object-cover shadow-sm border border-slate-200"
          />
          <span className="font-bold text-lg tracking-tight text-slate-900">FlowAI</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-lg text-slate-600 hover:text-brand-600 hover:bg-brand-50 border border-slate-200"
          aria-label="Close navigation menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Session Info */}
      {session && (
        <div className="px-5 py-3 bg-brand-50/50 border-b border-brand-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-sm">
              {session.fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">{session.fullName}</p>
              <p className="text-xs text-slate-500">{session.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Nav Links */}
      <nav className="flex flex-col px-5 py-4 flex-1 space-y-1" aria-label="Mobile menu links">
        {/* Basic links */}
        {links.filter((l) => l.label !== "Products" && l.label !== "Services").map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={onClose}
            className="text-base font-bold text-slate-800 hover:text-brand-600 transition-colors py-3 border-b border-slate-100"
          >
            {link.label}
          </a>
        ))}

        {/* Products Collapsible */}
        {productCategories.length > 0 && (
          <div className="border-b border-slate-100">
            <button
              type="button"
              onClick={() => setProductsExpanded(!productsExpanded)}
              className="w-full flex items-center justify-between text-base font-bold text-slate-800 py-3"
            >
              Products
              <ChevronDown className={`w-4 h-4 transition-transform ${productsExpanded ? "rotate-180" : ""}`} />
            </button>
            {productsExpanded && (
              <div className="pl-4 pb-3 space-y-1">
                {productCategories.map((cat) => (
                  <a
                    key={cat.slug}
                    href={`/products/${cat.slug}`}
                    onClick={onClose}
                    className="block py-2 text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
                  >
                    {cat.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Services Collapsible */}
        {services.length > 0 && (
          <div className="border-b border-slate-100">
            <button
              type="button"
              onClick={() => setServicesExpanded(!servicesExpanded)}
              className="w-full flex items-center justify-between text-base font-bold text-slate-800 py-3"
            >
              Services
              <ChevronDown className={`w-4 h-4 transition-transform ${servicesExpanded ? "rotate-180" : ""}`} />
            </button>
            {servicesExpanded && (
              <div className="pl-4 pb-3 space-y-1">
                {services.map((svc) => (
                  <a
                    key={svc.slug}
                    href={`/services/${svc.slug}`}
                    onClick={onClose}
                    className="block py-2 text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
                  >
                    {svc.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Cart & B2B */}
        <a
          href="/cart"
          onClick={onClose}
          className="flex items-center gap-3 text-base font-bold text-slate-800 hover:text-brand-600 transition-colors py-3 border-b border-slate-100"
        >
          <ShoppingCart className="w-4 h-4" />
          Cart
        </a>
        <a
          href="/b2b"
          onClick={onClose}
          className="flex items-center gap-3 text-base font-bold text-amber-800 hover:text-amber-600 transition-colors py-3 border-b border-slate-100"
        >
          <Briefcase className="w-4 h-4" />
          B2B Portal
        </a>

        {/* Admin Link */}
        {session && (session.role === "super-admin" || session.role === "admin") && (
          <a
            href="/super-admin"
            onClick={onClose}
            className="flex items-center gap-3 text-base font-bold text-brand-700 hover:text-brand-600 transition-colors py-3 border-b border-slate-100"
          >
            <Shield className="w-4 h-4" />
            Admin Panel
          </a>
        )}
      </nav>

      {/* Bottom Actions */}
      <div className="p-5 border-t border-slate-200 flex flex-col gap-3">
        {session ? (
          <button
            onClick={() => { onLogout?.(); onClose(); }}
            className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-red-600 border border-red-200 rounded-xl bg-red-50 hover:bg-red-100 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        ) : (
          <>
            <a
              href="/auth/login"
              onClick={onClose}
              className="w-full text-center py-3 text-sm font-medium text-slate-700 hover:text-slate-900 border border-slate-200 rounded-xl bg-slate-50 hover:bg-brand-50/50"
            >
              Sign In
            </a>
            <a
              href="/auth/register"
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-semibold bg-brand-600 hover:bg-brand-500 text-white rounded-xl shadow-lg shadow-brand-600/25 transition-all"
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </>
        )}
      </div>
    </div>
  );
}
