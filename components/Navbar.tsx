"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  ArrowUpRight,
  Star,
  ChevronDown,
  User,
  LogOut,
  Settings,
  Briefcase,
  Cpu,
  Plane,
  Camera,
  CircuitBoard,
  Cog,
  Navigation,
  Printer,
  Video,
  BatteryFull,
  Radio,
  Zap,
  Wrench,
  Truck,
  GraduationCap,
  Building,
  BookOpen,
  Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MobileMenu from "./MobileMenu";
import CartIcon from "./CartIcon";
import { cn } from "@/lib/utils";
import { getCurrentUser, logoutUser } from "@/lib/auth";
import type { AuthSession } from "@/lib/types";

/* eslint-disable @next/next/no-img-element */

// ─── Icon Mapper ─────────────────────────────────────────────
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cpu, Plane, Camera, CircuitBoard, Cog, Navigation, Printer, Video,
  BatteryFull, Radio, Zap, Wrench, Truck, GraduationCap, Building, BookOpen,
};

function getIcon(name: string) {
  return iconMap[name] || Cpu;
}

// ─── Product Categories ──────────────────────────────────────
const productCategories = [
  { name: "FPV Components", slug: "fpv-components", icon: "Cpu" },
  { name: "FPV Drones", slug: "fpv-drones", icon: "Plane" },
  { name: "DJI Drones", slug: "dji-drones", icon: "Camera" },
  { name: "Flight Controllers", slug: "flight-controllers", icon: "CircuitBoard" },
  { name: "Motors", slug: "motors", icon: "Cog" },
  { name: "GPS & Navigation Modules", slug: "gps-navigation", icon: "Navigation" },
  { name: "3D Printing & Accessories", slug: "3d-printing", icon: "Printer" },
  { name: "Cameras and Gimbals", slug: "cameras-gimbals", icon: "Video" },
  { name: "Drone Batteries", slug: "drone-batteries", icon: "BatteryFull" },
  { name: "RC & Transmitter", slug: "rc-transmitter", icon: "Radio" },
  { name: "Cells", slug: "cells", icon: "Zap" },
  { name: "Custom Drone", slug: "custom-drone", icon: "Wrench" },
  { name: "Heavy Lift Drones", slug: "heavy-lift-drones", icon: "Truck" },
];

// ─── Services ────────────────────────────────────────────────
const services = [
  { name: "Custom 3D Parts", slug: "custom-3d-parts", icon: "Printer" },
  { name: "Drone Repair & Customisation", slug: "drone-repair", icon: "Wrench" },
  { name: "Atal Tinkering", slug: "atal-tinkering", icon: "GraduationCap" },
  { name: "Drone Lab Setup", slug: "drone-lab-setup", icon: "Building" },
  { name: "Drone Training", slug: "drone-training", icon: "BookOpen" },
];

interface NavbarProps {
  onLogoClick?: () => void;
}

export default function Navbar({ onLogoClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [session, setSession] = useState<AuthSession | null>(null);

  const productsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const productsTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const servicesTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setSession(getCurrentUser());
    const handler = () => setSession(getCurrentUser());
    window.addEventListener("drone_shop_user_updated", handler);
    return () => window.removeEventListener("drone_shop_user_updated", handler);
  }, []);

  // Close menus on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logoutUser();
    setSession(null);
    setUserMenuOpen(false);
    window.location.href = "/";
  };

  const navLinks = [
    { label: "Home", href: "/" },
  ];

  const mobileNavLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products/fpv-components" },
    { label: "Services", href: "/services/custom-3d-parts" },
    { label: "B2B", href: "/b2b" },
  ];

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-slate-200 py-2.5 shadow-md"
            : "bg-white/70 backdrop-blur-md py-3 border-b border-slate-100/50"
        )}
      >
        <div className="max-w-global mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <a
                href="/"
                onClick={(e) => { if (onLogoClick) { e.preventDefault(); onLogoClick(); } }}
                className="group flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-md"
                aria-label="DroneShop Home"
              >
                <img
                  src="/images/logo.png"
                  alt="DroneShop Logo"
                  className="w-8 h-8 rounded-lg object-cover shadow-sm border border-slate-200 transition-transform duration-300 group-hover:scale-105"
                />
                <div className="flex flex-col">
                  <span className="font-extrabold text-base tracking-tight text-slate-900 leading-none">
                    FlowAI
                  </span>
                  <span className="text-[9px] font-mono text-brand-700 font-semibold tracking-wider">
                    DRONE SHOP
                  </span>
                </div>
              </a>

              {/* GitHub Star Badge */}
              <a
                href="https://github.com/Amit123103/FLOWAI"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-mono font-semibold transition-all hover:scale-105"
              >
                <Star className="w-3 h-3 text-amber-500 fill-amber-400" />
                <span>Star</span>
                <span className="bg-white px-1.5 py-0.5 rounded-full text-[10px] text-slate-600 border border-slate-200">
                  4.8k
                </span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-0.5" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-brand-700 rounded-lg transition-colors hover:bg-brand-50/60"
                >
                  {link.label}
                </a>
              ))}

              {/* Products Mega Dropdown */}
              <div
                ref={productsRef}
                className="relative"
                onMouseEnter={() => {
                  clearTimeout(productsTimer.current);
                  setProductsOpen(true);
                  setServicesOpen(false);
                }}
                onMouseLeave={() => {
                  productsTimer.current = setTimeout(() => setProductsOpen(false), 200);
                }}
              >
                <button
                  type="button"
                  className={cn(
                    "flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors",
                    productsOpen
                      ? "text-brand-700 bg-brand-50/60"
                      : "text-slate-600 hover:text-brand-700 hover:bg-brand-50/60"
                  )}
                >
                  Products
                  <ChevronDown className={cn("w-3 h-3 transition-transform", productsOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {productsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[680px] bg-white rounded-2xl border border-slate-200 shadow-2xl shadow-slate-200/50 p-5 z-50"
                    >
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                        <span className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">All Products</span>
                        <a href="/products/fpv-components" className="text-[10px] font-semibold text-brand-600 hover:text-brand-700">
                          View All →
                        </a>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        {productCategories.map((cat) => {
                          const Icon = getIcon(cat.icon);
                          return (
                            <a
                              key={cat.slug}
                              href={`/products/${cat.slug}`}
                              className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-brand-50/50 transition-colors group"
                            >
                              <div className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-brand-100 text-slate-600 group-hover:text-brand-700 transition-colors">
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-xs font-semibold text-slate-700 group-hover:text-brand-700 transition-colors">
                                {cat.name}
                              </span>
                            </a>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Services Dropdown */}
              <div
                ref={servicesRef}
                className="relative"
                onMouseEnter={() => {
                  clearTimeout(servicesTimer.current);
                  setServicesOpen(true);
                  setProductsOpen(false);
                }}
                onMouseLeave={() => {
                  servicesTimer.current = setTimeout(() => setServicesOpen(false), 200);
                }}
              >
                <button
                  type="button"
                  className={cn(
                    "flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors",
                    servicesOpen
                      ? "text-brand-700 bg-brand-50/60"
                      : "text-slate-600 hover:text-brand-700 hover:bg-brand-50/60"
                  )}
                >
                  Services
                  <ChevronDown className={cn("w-3 h-3 transition-transform", servicesOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[340px] bg-white rounded-2xl border border-slate-200 shadow-2xl shadow-slate-200/50 p-4 z-50"
                    >
                      <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100">
                        <span className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">Our Services</span>
                      </div>
                      <div className="space-y-0.5">
                        {services.map((svc) => {
                          const Icon = getIcon(svc.icon);
                          return (
                            <a
                              key={svc.slug}
                              href={`/services/${svc.slug}`}
                              className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-brand-50/50 transition-colors group"
                            >
                              <div className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-brand-100 text-slate-600 group-hover:text-brand-700 transition-colors">
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-xs font-semibold text-slate-700 group-hover:text-brand-700 transition-colors">
                                {svc.name}
                              </span>
                            </a>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Desktop Right Actions: Cart → B2B → Auth */}
            <div className="hidden md:flex items-center gap-2">
              {/* Cart */}
              <CartIcon />

              {/* B2B Button */}
              <a
                href="/b2b"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-2 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border border-amber-200 text-amber-800 transition-all hover:border-amber-300 hover:shadow-sm"
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>B2B</span>
              </a>

              {/* User Auth */}
              {session ? (
                <div ref={userMenuRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-brand-50 hover:bg-brand-100 border border-brand-200 text-brand-800 transition-all"
                  >
                    <div className="w-5 h-5 rounded-full bg-brand-600 flex items-center justify-center text-white text-[10px] font-bold">
                      {session.fullName.charAt(0).toUpperCase()}
                    </div>
                    <span className="max-w-[80px] truncate">{session.fullName.split(" ")[0]}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.95 }}
                        className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl border border-slate-200 shadow-xl p-2 z-50"
                      >
                        <div className="px-3 py-2 border-b border-slate-100 mb-1">
                          <p className="text-xs font-bold text-slate-900 truncate">{session.fullName}</p>
                          <p className="text-[10px] text-slate-500 truncate">{session.email}</p>
                          <span className="inline-block mt-1 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200 uppercase">
                            {session.role}
                          </span>
                        </div>

                        {(session.role === "super-admin" || session.role === "admin") && (
                          <a
                            href="/super-admin"
                            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-brand-700 hover:bg-brand-50 rounded-lg transition-colors"
                          >
                            <Shield className="w-3.5 h-3.5" />
                            Admin Panel
                          </a>
                        )}

                        <a
                          href="#"
                          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-brand-700 hover:bg-brand-50 rounded-lg transition-colors"
                        >
                          <Settings className="w-3.5 h-3.5" />
                          Settings
                        </a>

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <a
                    href="/auth/login"
                    className="text-xs font-semibold px-3 py-2 rounded-xl text-slate-600 hover:text-brand-700 hover:bg-brand-50/60 transition-colors"
                  >
                    Sign In
                  </a>
                  <a
                    href="/auth/register"
                    className="inline-flex items-center justify-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-600/20 transition-all duration-200 hover:shadow-brand-600/30 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Get Started</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-slate-600 hover:text-brand-600 hover:bg-brand-50 border border-slate-200"
              aria-expanded={mobileMenuOpen}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={mobileNavLinks}
        session={session}
        onLogout={handleLogout}
        productCategories={productCategories}
        services={services}
      />
    </>
  );
}
