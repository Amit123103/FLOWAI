"use client";

import React, { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { getCartCount, onCartUpdate } from "@/lib/cart";

export default function CartIcon() {
  const [count, setCount] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setCount(getCartCount());
    const unsub = onCartUpdate(() => {
      setCount(getCartCount());
      setAnimate(true);
      setTimeout(() => setAnimate(false), 300);
    });
    return unsub;
  }, []);

  return (
    <a
      href="/cart"
      className="relative inline-flex items-center justify-center p-2 rounded-xl text-slate-600 hover:text-brand-700 hover:bg-brand-50/60 transition-colors"
      aria-label={`Cart with ${count} items`}
    >
      <ShoppingCart className="w-5 h-5" />
      {count > 0 && (
        <span
          className={`absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold text-white bg-brand-600 rounded-full px-1 shadow-md transition-transform ${
            animate ? "scale-125" : "scale-100"
          }`}
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </a>
  );
}
