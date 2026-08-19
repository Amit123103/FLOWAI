// ============================================================
// Auth & User Management Utilities (localStorage mock)
// ============================================================

import type { User, B2BUser, Admin, AuthSession, LoginRecord, Permission } from "./types";

const USERS_KEY = "drone_shop_users";
const ADMINS_KEY = "drone_shop_admins";
const SESSION_KEY = "drone_shop_session";
const USER_EVENT = "drone_shop_user_updated";

// ─── Helpers ─────────────────────────────────────────────────

function generateId(): string {
  return `usr_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function generateAdminId(): string {
  return `adm_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function dispatchUserEvent() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(USER_EVENT));
  }
}

// ─── User CRUD ───────────────────────────────────────────────

export function getAllUsers(): (User | B2BUser)[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveUsers(users: (User | B2BUser)[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  dispatchUserEvent();
}

export function registerUser(data: Omit<User, "id" | "createdAt" | "lastLoginAt" | "loginHistory" | "status">): User {
  const users = getAllUsers();
  const existing = users.find((u) => u.email === data.email);
  if (existing) throw new Error("Email already registered");

  const now = new Date().toISOString();
  const user: User = {
    ...data,
    id: generateId(),
    createdAt: now,
    lastLoginAt: null,
    loginHistory: [],
    status: "active",
  };
  users.push(user);
  saveUsers(users);
  return user;
}

export function registerB2BUser(data: Omit<B2BUser, "id" | "createdAt" | "lastLoginAt" | "loginHistory" | "status">): B2BUser {
  const users = getAllUsers();
  const existing = users.find((u) => u.email === data.email);
  if (existing) throw new Error("Email already registered");

  const now = new Date().toISOString();
  const user: B2BUser = {
    ...data,
    id: generateId(),
    createdAt: now,
    lastLoginAt: null,
    loginHistory: [],
    status: "active",
  };
  users.push(user);
  saveUsers(users);
  return user;
}

export function loginUser(email: string, password: string): AuthSession {
  const users = getAllUsers();
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    // Check admins
    const admins = getAllAdmins();
    const admin = admins.find((a) => a.email === email && a.password === password);
    if (admin) {
      const session: AuthSession = {
        userId: admin.id,
        email: admin.email,
        role: "admin",
        accountType: "normal",
        fullName: admin.name,
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      dispatchUserEvent();
      return session;
    }

    // Check super-admin hardcoded
    if (email === "superadmin@droneshop.com" && password === "SuperAdmin@123") {
      const session: AuthSession = {
        userId: "super_admin_001",
        email,
        role: "super-admin",
        accountType: "normal",
        fullName: "Super Admin",
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return session;
    }

    throw new Error("Invalid email or password");
  }

  const now = new Date().toISOString();
  const loginRecord: LoginRecord = { timestamp: now };
  user.lastLoginAt = now;
  user.loginHistory.push(loginRecord);
  saveUsers(users);

  const session: AuthSession = {
    userId: user.id,
    email: user.email,
    role: user.role,
    accountType: user.accountType,
    fullName: user.fullName,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function logoutUser() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(SESSION_KEY);
    dispatchUserEvent();
  }
}

export function getCurrentUser(): AuthSession | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function getUserById(id: string): User | B2BUser | null {
  const users = getAllUsers();
  return users.find((u) => u.id === id) || null;
}

export function updateUser(id: string, updates: Partial<User | B2BUser>) {
  const users = getAllUsers();
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) throw new Error("User not found");
  users[idx] = { ...users[idx], ...updates };
  saveUsers(users);
}

export function deleteUser(id: string) {
  const users = getAllUsers().filter((u) => u.id !== id);
  saveUsers(users);
}

// ─── Admin CRUD ──────────────────────────────────────────────

export function getAllAdmins(): Admin[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(ADMINS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveAdmins(admins: Admin[]) {
  localStorage.setItem(ADMINS_KEY, JSON.stringify(admins));
  dispatchUserEvent();
}

export function createAdmin(data: { name: string; email: string; password: string; permissions: Permission[]; createdBy: string }): Admin {
  const admins = getAllAdmins();
  const existing = admins.find((a) => a.email === data.email);
  if (existing) throw new Error("Admin email already exists");

  const admin: Admin = {
    id: generateAdminId(),
    name: data.name,
    email: data.email,
    password: data.password,
    permissions: data.permissions,
    createdBy: data.createdBy,
    createdAt: new Date().toISOString(),
    status: "active",
  };
  admins.push(admin);
  saveAdmins(admins);
  return admin;
}

export function updateAdminPermissions(adminId: string, permissions: Permission[]) {
  const admins = getAllAdmins();
  const idx = admins.findIndex((a) => a.id === adminId);
  if (idx === -1) throw new Error("Admin not found");
  admins[idx].permissions = permissions;
  saveAdmins(admins);
}

export function removeAdminPermission(adminId: string, permission: Permission) {
  const admins = getAllAdmins();
  const idx = admins.findIndex((a) => a.id === adminId);
  if (idx === -1) throw new Error("Admin not found");
  admins[idx].permissions = admins[idx].permissions.filter((p) => p !== permission);
  saveAdmins(admins);
}

export function deleteAdmin(adminId: string) {
  const admins = getAllAdmins().filter((a) => a.id !== adminId);
  saveAdmins(admins);
}

export function getAdminById(id: string): Admin | null {
  return getAllAdmins().find((a) => a.id === id) || null;
}

// ─── Event Listener ──────────────────────────────────────────

export function onUserUpdate(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const handler = () => callback();
  window.addEventListener(USER_EVENT, handler);
  // Also listen for cross-tab localStorage changes
  const storageHandler = (e: StorageEvent) => {
    if (e.key === USERS_KEY || e.key === ADMINS_KEY) {
      callback();
    }
  };
  window.addEventListener("storage", storageHandler);
  return () => {
    window.removeEventListener(USER_EVENT, handler);
    window.removeEventListener("storage", storageHandler);
  };
}
