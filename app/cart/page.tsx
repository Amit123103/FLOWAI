"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCart, removeFromCart, updateCartQuantity, clearCart, onCartUpdate } from "@/lib/cart";
import type { CartItem } from "@/lib/types";
import { Trash2, ShoppingBag, Plus, Minus, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(getCart());
    const unsub = onCartUpdate(() => setCart(getCart()));
    return unsub;
  }, []);

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs font-mono text-slate-400 hover:text-red-500 transition-colors"
            >
              Clear Cart
            </button>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-8">
          Shopping Cart ({cart.reduce((sum, i) => sum + i.quantity, 0)} items)
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-brand-50 border border-brand-200 text-brand-700 flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Your Cart is Empty</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Looks like you haven&apos;t added any drone parts or components yet.
            </p>
            <Link
              href="/products/fpv-components"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-md shadow-brand-600/20 transition-all"
            >
              <span>Explore Drone Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex items-center justify-between gap-4 shadow-sm"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                      <ShoppingBag className="w-6 h-6 text-slate-400" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                        {item.category}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 truncate">{item.name}</h4>
                      <p className="text-xs font-bold text-brand-700 mt-1">
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 text-slate-500 hover:text-slate-900 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2 text-xs font-bold text-slate-800">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 text-slate-500 hover:text-slate-900 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5 h-fit">
              <h3 className="font-bold text-base text-slate-900">Order Summary</h3>

              <div className="space-y-2.5 text-xs text-slate-600 border-b border-slate-100 pb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">
                    ₹{totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Standard Air Freight</span>
                  <span className="font-semibold text-emerald-600">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated GST (18%)</span>
                  <span className="font-semibold text-slate-900">Included</span>
                </div>
              </div>

              <div className="flex justify-between text-base font-extrabold text-slate-900">
                <span>Total Due</span>
                <span>₹{totalAmount.toLocaleString("en-IN")}</span>
              </div>

              <button
                onClick={() => alert("Checkout initiated! Total: ₹" + totalAmount.toLocaleString("en-IN"))}
                className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
