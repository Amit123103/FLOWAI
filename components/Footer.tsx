"use client";

import React from "react";
import { Layers } from "lucide-react";

export default function Footer() {
  const footerLinks = {
    product: [
      { label: "Features", href: "#features" },
      { label: "Workflow", href: "#workflow" },
      { label: "Pricing", href: "#cta" },
    ],
    resources: [
      { label: "Documentation", href: "#developer" },
      { label: "Guides", href: "#workflow" },
      { label: "Changelog", href: "#showcase" },
    ],
    company: [
      { label: "About", href: "#hero-heading" },
      { label: "Contact", href: "#cta" },
    ],
  };

  return (
    <footer className="border-t border-surface-border bg-surface-300/80 text-muted py-12 md:py-16 text-xs">
      <div className="max-w-global mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-surface-border">
          {/* Logo & Tagline */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-surface-100 border border-surface-border flex items-center justify-center">
                <Layers className="w-3.5 h-3.5 text-brand-400" />
              </div>
              <span className="font-bold text-base text-foreground tracking-tight">FlowAI</span>
            </div>
            <p className="text-muted max-w-sm text-xs leading-relaxed">
              Build AI products without the infrastructure headache. A focused developer workspace for building, evaluating, deploying, and monitoring AI applications.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="text-[11px] font-mono text-muted-dark">AI Developer Workspace • Demonstration</span>
            </div>
          </div>

          {/* Links: Product */}
          <div>
            <h4 className="font-bold text-foreground text-xs uppercase tracking-wider mb-3 font-mono">
              Product
            </h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-foreground transition-colors duration-150 inline-block py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links: Resources */}
          <div>
            <h4 className="font-bold text-foreground text-xs uppercase tracking-wider mb-3 font-mono">
              Resources
            </h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-foreground transition-colors duration-150 inline-block py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links: Company */}
          <div>
            <h4 className="font-bold text-foreground text-xs uppercase tracking-wider mb-3 font-mono">
              Company
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-foreground transition-colors duration-150 inline-block py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-muted-dark">
          <div>
            © 2026 FlowAI. All rights reserved. Demonstration Project.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-muted cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-muted cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-muted cursor-pointer transition-colors">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
