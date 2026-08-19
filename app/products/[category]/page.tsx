"use client";

import React, { useState, use } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PRODUCT_CATEGORIES, getProductsByCategory } from "@/data/products";
import { addToCart } from "@/lib/cart";
import { ShoppingCart, Star, Check, ArrowLeft, Filter, Sparkles } from "lucide-react";
import Link from "next/link";

export default function ProductCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const resolvedParams = use(params);
  const categorySlug = resolvedParams.category;
  
  const currentCategory = PRODUCT_CATEGORIES.find((c) => c.slug === categorySlug) || {
    name: categorySlug.replace(/-/g, " ").toUpperCase(),
    description: "Premium drone components, ready-to-fly platforms and accessories.",
    productCount: 12,
    slug: categorySlug,
    icon: "Cpu",
  };

  const products = getProductsByCategory(categorySlug);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const handleAddToCart = (product: { id: string; name: string; price: number; category: string }) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      category: currentCategory.name,
    });
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Breadcrumb & Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <span className="text-xs font-mono text-slate-400">
            {products.length} Products Available
          </span>
        </div>

        {/* Category Header */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm mb-10 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-brand-50 rounded-full blur-3xl opacity-70 pointer-events-none" />
          
          <div className="max-w-2xl relative z-10 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-brand-50 text-brand-700 border border-brand-200">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              Category Showcase
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {currentCategory.name}
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              {currentCategory.description}
            </p>
          </div>

          {/* Quick Category switcher pills */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {PRODUCT_CATEGORIES.slice(0, 8).map((cat) => (
              <Link
                key={cat.slug}
                href={`/products/${cat.slug}`}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                  cat.slug === categorySlug
                    ? "bg-brand-600 text-white shadow-md shadow-brand-600/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length === 0 ? (
            <div className="col-span-full text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
              <p className="text-base font-bold text-slate-700">No products listed in this category yet.</p>
              <p className="text-xs text-slate-500 mt-1">Check back soon or explore our other drone components.</p>
              <Link
                href="/products/fpv-components"
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold"
              >
                Browse FPV Components
              </Link>
            </div>
          ) : (
            products.map((product) => {
              const isAdded = addedIds[product.id];
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-brand-300 hover:shadow-lg transition-all duration-200 p-5 flex flex-col justify-between group"
                >
                  <div>
                    {/* Badge & Stock */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 uppercase">
                        {currentCategory.name}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                          product.inStock
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {product.inStock ? "In Stock" : "Backorder"}
                      </span>
                    </div>

                    {/* Image placeholder with drone aesthetic */}
                    <div className="w-full h-44 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200/60 border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-[1.01] transition-transform">
                      <div className="p-4 rounded-2xl bg-white/80 shadow-sm border border-slate-200/60 text-slate-500 group-hover:text-brand-600 transition-colors">
                        <ShoppingCart className="w-8 h-8" />
                      </div>
                    </div>

                    {/* Title & Desc */}
                    <h3 className="font-bold text-base text-slate-900 group-hover:text-brand-700 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mt-3">
                      <div className="flex items-center text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="text-xs font-bold text-slate-800 ml-1">{product.rating}</span>
                      </div>
                      <span className="text-[11px] text-slate-400">({product.reviews} reviews)</span>
                    </div>
                  </div>

                  {/* Pricing & Add to Cart */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-base font-extrabold text-slate-900">
                        ₹{product.price.toLocaleString("en-IN")}
                      </div>
                      {product.originalPrice && (
                        <div className="text-[11px] text-slate-400 line-through">
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      disabled={!product.inStock}
                      onClick={() => handleAddToCart(product)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                        isAdded
                          ? "bg-emerald-600 text-white"
                          : product.inStock
                          ? "bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-600/20 active:scale-95"
                          : "bg-slate-100 text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Added
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
