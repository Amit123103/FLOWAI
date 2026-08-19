// ============================================================
// Cart Utilities (localStorage)
// ============================================================

import type { CartItem } from "./types";

const CART_KEY = "drone_shop_cart";
const CART_EVENT = "drone_shop_cart_updated";

function dispatchCartEvent() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CART_EVENT));
  }
}

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(CART_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  dispatchCartEvent();
}

export function addToCart(item: Omit<CartItem, "quantity">) {
  const cart = getCart();
  const existing = cart.find((c) => c.id === item.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  saveCart(cart);
}

export function removeFromCart(itemId: string) {
  const cart = getCart().filter((c) => c.id !== itemId);
  saveCart(cart);
}

export function updateCartQuantity(itemId: string, quantity: number) {
  const cart = getCart();
  const item = cart.find((c) => c.id === itemId);
  if (item) {
    item.quantity = Math.max(0, quantity);
    if (item.quantity === 0) {
      saveCart(cart.filter((c) => c.id !== itemId));
    } else {
      saveCart(cart);
    }
  }
}

export function getCartCount(): number {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

export function clearCart() {
  saveCart([]);
}

export function onCartUpdate(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const handler = () => callback();
  window.addEventListener(CART_EVENT, handler);
  const storageHandler = (e: StorageEvent) => {
    if (e.key === CART_KEY) callback();
  };
  window.addEventListener("storage", storageHandler);
  return () => {
    window.removeEventListener(CART_EVENT, handler);
    window.removeEventListener("storage", storageHandler);
  };
}
