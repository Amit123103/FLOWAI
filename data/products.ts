// ============================================================
// Product Categories Data
// ============================================================

import type { ProductCategory } from "@/lib/types";

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    slug: "fpv-components",
    name: "FPV Components",
    description: "ESCs, VTX modules, antennas, receivers, and everything for building custom FPV rigs.",
    icon: "Cpu",
    productCount: 48,
  },
  {
    slug: "fpv-drones",
    name: "FPV Drones",
    description: "Ready-to-fly and bind-and-fly FPV racing and freestyle drones.",
    icon: "Plane",
    productCount: 24,
  },
  {
    slug: "dji-drones",
    name: "DJI Drones",
    description: "Official DJI consumer and enterprise drones with warranty support.",
    icon: "Camera",
    productCount: 18,
  },
  {
    slug: "flight-controllers",
    name: "Flight Controllers",
    description: "F4, F7, H7 flight controllers from Betaflight, iNav, and ArduPilot ecosystem.",
    icon: "CircuitBoard",
    productCount: 32,
  },
  {
    slug: "motors",
    name: "Motors",
    description: "Brushless motors for racing, freestyle, cinematic, and heavy-lift applications.",
    icon: "Cog",
    productCount: 56,
  },
  {
    slug: "gps-navigation",
    name: "GPS & Navigation Modules",
    description: "GPS, GLONASS, BeiDou modules and compass modules for autonomous flight.",
    icon: "Navigation",
    productCount: 15,
  },
  {
    slug: "3d-printing",
    name: "3D Printing & Accessories",
    description: "TPU mounts, GoPro adapters, antenna holders, and custom 3D printed parts.",
    icon: "Printer",
    productCount: 40,
  },
  {
    slug: "cameras-gimbals",
    name: "Cameras and Gimbals",
    description: "Action cameras, FPV cameras, thermal cameras, and stabilization gimbals.",
    icon: "Video",
    productCount: 28,
  },
  {
    slug: "drone-batteries",
    name: "Drone Batteries",
    description: "LiPo, Li-Ion battery packs in 2S–12S configurations for all drone types.",
    icon: "BatteryFull",
    productCount: 35,
  },
  {
    slug: "rc-transmitter",
    name: "RC & Transmitter",
    description: "Radio transmitters, receivers, ELRS, Crossfire, and ExpressLRS modules.",
    icon: "Radio",
    productCount: 22,
  },
  {
    slug: "cells",
    name: "Cells",
    description: "Individual Li-Ion and LiPo cells for custom battery pack building.",
    icon: "Zap",
    productCount: 19,
  },
  {
    slug: "custom-drone",
    name: "Custom Drone",
    description: "Build-your-own custom drone kits with frame, FC, ESC, and motor bundles.",
    icon: "Wrench",
    productCount: 12,
  },
  {
    slug: "heavy-lift-drones",
    name: "Heavy Lift Drones",
    description: "Industrial heavy-lift platforms for agriculture, delivery, and surveying.",
    icon: "Truck",
    productCount: 8,
  },
];

/** Sample products for each category */
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  inStock: boolean;
  rating: number;
  reviews: number;
}

export function getProductsByCategory(slug: string): Product[] {
  const categoryProducts: Record<string, Product[]> = {
    "fpv-components": [
      { id: "fpv-1", name: "TBS Crossfire Nano RX", price: 2499, originalPrice: 2999, description: "Ultra-low latency long-range receiver", category: slug, inStock: true, rating: 4.8, reviews: 142 },
      { id: "fpv-2", name: "Rush Tank Ultimate VTX", price: 3299, description: "1.6W adjustable power video transmitter", category: slug, inStock: true, rating: 4.7, reviews: 89 },
      { id: "fpv-3", name: "Foxeer Lollipop V4", price: 899, description: "5.8GHz RHCP antenna pair", category: slug, inStock: true, rating: 4.9, reviews: 234 },
      { id: "fpv-4", name: "ELRS EP2 Receiver", price: 1199, description: "ExpressLRS 2.4GHz nano receiver", category: slug, inStock: false, rating: 4.6, reviews: 67 },
    ],
    "fpv-drones": [
      { id: "fpvd-1", name: "iFlight Nazgul5 V3", price: 18999, originalPrice: 21999, description: "5-inch freestyle drone BNF", category: slug, inStock: true, rating: 4.7, reviews: 98 },
      { id: "fpvd-2", name: "GEPRC CineLog35 V2", price: 16499, description: "3.5-inch cinematic FPV drone", category: slug, inStock: true, rating: 4.8, reviews: 76 },
      { id: "fpvd-3", name: "BetaFPV Cetus X", price: 8999, description: "Brushless indoor FPV kit", category: slug, inStock: true, rating: 4.5, reviews: 156 },
    ],
    "dji-drones": [
      { id: "dji-1", name: "DJI Mini 4 Pro", price: 69999, originalPrice: 74999, description: "Sub-250g 4K drone with obstacle avoidance", category: slug, inStock: true, rating: 4.9, reviews: 312 },
      { id: "dji-2", name: "DJI Air 3", price: 89999, description: "Dual-camera aerial photography drone", category: slug, inStock: true, rating: 4.8, reviews: 198 },
      { id: "dji-3", name: "DJI Avata 2", price: 64999, description: "Immersive FPV flying experience", category: slug, inStock: false, rating: 4.7, reviews: 145 },
    ],
    "flight-controllers": [
      { id: "fc-1", name: "SpeedyBee F405 V4", price: 3499, description: "F4 flight controller with Betaflight OSD", category: slug, inStock: true, rating: 4.6, reviews: 87 },
      { id: "fc-2", name: "Matek H743-SLIM", price: 5999, description: "H7 FC for ArduPilot", category: slug, inStock: true, rating: 4.8, reviews: 54 },
      { id: "fc-3", name: "MAMBA F722 Mini", price: 2999, description: "F7 mini flight controller stack", category: slug, inStock: true, rating: 4.5, reviews: 112 },
    ],
    "motors": [
      { id: "mot-1", name: "T-Motor F60 Pro V", price: 2199, description: "2207 1750KV freestyle motor", category: slug, inStock: true, rating: 4.9, reviews: 201 },
      { id: "mot-2", name: "EMAX ECO II 2306", price: 799, originalPrice: 999, description: "Budget racing motor 2400KV", category: slug, inStock: true, rating: 4.5, reviews: 345 },
      { id: "mot-3", name: "BrotherHobby Avenger V3", price: 1599, description: "2207.5 1900KV premium motor", category: slug, inStock: true, rating: 4.7, reviews: 132 },
    ],
    "gps-navigation": [
      { id: "gps-1", name: "BN-880Q GPS Module", price: 1299, description: "Dual GPS/GLONASS with compass", category: slug, inStock: true, rating: 4.6, reviews: 78 },
      { id: "gps-2", name: "Matek M10-5883 GPS", price: 2499, description: "M10 GNSS with QMC5883L compass", category: slug, inStock: true, rating: 4.8, reviews: 45 },
    ],
    "3d-printing": [
      { id: "3dp-1", name: "TPU GoPro Mount Set", price: 499, description: "Adjustable TPU camera mounts pack", category: slug, inStock: true, rating: 4.4, reviews: 89 },
      { id: "3dp-2", name: "Antenna Mount Kit", price: 299, description: "SMA and MMCX antenna holders", category: slug, inStock: true, rating: 4.3, reviews: 56 },
      { id: "3dp-3", name: "Battery Pad Set", price: 199, description: "Anti-slip battery pads various sizes", category: slug, inStock: true, rating: 4.6, reviews: 123 },
    ],
    "cameras-gimbals": [
      { id: "cam-1", name: "GoPro Hero 12 Black", price: 34999, description: "5.3K action camera for FPV", category: slug, inStock: true, rating: 4.8, reviews: 267 },
      { id: "cam-2", name: "RunCam Phoenix 2 SP", price: 2499, description: "1000TVL FPV camera", category: slug, inStock: true, rating: 4.7, reviews: 156 },
      { id: "cam-3", name: "Siyi ZR10 Gimbal", price: 28999, description: "3-axis stabilized gimbal with 30x zoom", category: slug, inStock: false, rating: 4.6, reviews: 34 },
    ],
    "drone-batteries": [
      { id: "bat-1", name: "CNHL 1500mAh 6S", price: 2999, description: "100C high-discharge race LiPo", category: slug, inStock: true, rating: 4.7, reviews: 189 },
      { id: "bat-2", name: "Tattu R-Line V5 1400mAh", price: 3499, description: "6S 150C competition LiPo", category: slug, inStock: true, rating: 4.9, reviews: 98 },
      { id: "bat-3", name: "GNB 650mAh 4S", price: 899, description: "HV LiPo for micro quads", category: slug, inStock: true, rating: 4.5, reviews: 234 },
    ],
    "rc-transmitter": [
      { id: "rc-1", name: "RadioMaster TX16S MKII", price: 14999, originalPrice: 17999, description: "Multi-protocol hall gimbal transmitter", category: slug, inStock: true, rating: 4.8, reviews: 178 },
      { id: "rc-2", name: "TBS Tango 2 Pro", price: 16999, description: "Compact CRSF transmitter", category: slug, inStock: true, rating: 4.7, reviews: 89 },
      { id: "rc-3", name: "RadioMaster Pocket", price: 6999, description: "Ultra-portable ELRS transmitter", category: slug, inStock: true, rating: 4.6, reviews: 145 },
    ],
    "cells": [
      { id: "cel-1", name: "Samsung 30Q 18650", price: 299, description: "3000mAh 15A Li-Ion cell", category: slug, inStock: true, rating: 4.8, reviews: 456 },
      { id: "cel-2", name: "Sony VTC6 18650", price: 349, description: "3000mAh 20A continuous", category: slug, inStock: true, rating: 4.9, reviews: 312 },
      { id: "cel-3", name: "Molicel P42A 21700", price: 449, description: "4200mAh 45A high-drain cell", category: slug, inStock: true, rating: 4.7, reviews: 198 },
    ],
    "custom-drone": [
      { id: "cust-1", name: "5-inch Freestyle Kit", price: 12999, originalPrice: 15999, description: "Complete frame + FC + ESC + Motors bundle", category: slug, inStock: true, rating: 4.6, reviews: 67 },
      { id: "cust-2", name: "7-inch Long Range Kit", price: 18999, description: "Optimized for long range with GPS", category: slug, inStock: true, rating: 4.7, reviews: 34 },
      { id: "cust-3", name: "3-inch Cinewhoop Kit", price: 8999, description: "Ducted prop cinematic build kit", category: slug, inStock: false, rating: 4.5, reviews: 45 },
    ],
    "heavy-lift-drones": [
      { id: "hlift-1", name: "Tarot X8 Frame Kit", price: 45999, description: "Octocopter frame for 10kg payload", category: slug, inStock: true, rating: 4.7, reviews: 23 },
      { id: "hlift-2", name: "Agri Sprayer Drone S40", price: 189999, description: "40L agriculture spraying drone", category: slug, inStock: true, rating: 4.8, reviews: 12 },
      { id: "hlift-3", name: "Survey Mapping Quad", price: 125999, description: "RTK GPS precision mapping platform", category: slug, inStock: false, rating: 4.6, reviews: 8 },
    ],
  };
  return categoryProducts[slug] || [];
}
