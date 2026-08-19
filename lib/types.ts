// ============================================================
// Core Types for Drone E-Commerce Platform
// ============================================================

/** All granular permissions assignable to admins */
export enum Permission {
  MANAGE_PRODUCTS = "manage_products",
  MANAGE_ORDERS = "manage_orders",
  MANAGE_USERS = "manage_users",
  MANAGE_B2B = "manage_b2b",
  VIEW_ANALYTICS = "view_analytics",
  MANAGE_SERVICES = "manage_services",
  MANAGE_INVENTORY = "manage_inventory",
  MANAGE_CONTENT = "manage_content",
}

export const PERMISSION_LABELS: Record<Permission, string> = {
  [Permission.MANAGE_PRODUCTS]: "Manage Products",
  [Permission.MANAGE_ORDERS]: "Manage Orders",
  [Permission.MANAGE_USERS]: "Manage Users",
  [Permission.MANAGE_B2B]: "Manage B2B Accounts",
  [Permission.VIEW_ANALYTICS]: "View Analytics",
  [Permission.MANAGE_SERVICES]: "Manage Services",
  [Permission.MANAGE_INVENTORY]: "Manage Inventory",
  [Permission.MANAGE_CONTENT]: "Manage Content",
};

export type UserRole = "user" | "b2b" | "admin" | "super-admin";
export type AccountType = "normal" | "b2b";

export interface LoginRecord {
  timestamp: string; // ISO string
  ip?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  pinCode: string;
}

/** Base user — normal shopping account */
export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  password: string; // hashed in real app, plain for demo
  role: UserRole;
  accountType: AccountType;
  address: Address;
  createdAt: string; // ISO string
  lastLoginAt: string | null;
  loginHistory: LoginRecord[];
  status: "active" | "inactive";
}

/** B2B user — extended fields */
export interface B2BUser extends User {
  companyName: string;
  gstNumber: string;
  businessType: string;
  contactPersonName: string;
  designation: string;
  businessEmail: string;
  businessPhone: string;
  companyAddress: Address;
  annualProcurementVolume: string;
  categoriesOfInterest: string[];
}

/** Admin record */
export interface Admin {
  id: string;
  name: string;
  email: string;
  password: string;
  permissions: Permission[];
  createdBy: string; // super-admin id
  createdAt: string;
  status: "active" | "inactive";
}

/** Product category */
export interface ProductCategory {
  slug: string;
  name: string;
  description: string;
  icon: string; // lucide icon name
  productCount: number;
}

/** Service */
export interface ServiceItem {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

/** Cart item */
export interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image?: string;
}

/** Session stored in localStorage */
export interface AuthSession {
  userId: string;
  email: string;
  role: UserRole;
  accountType: AccountType;
  fullName: string;
}
