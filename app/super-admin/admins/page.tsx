"use client";

import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  UserPlus, 
  Trash2, 
  Edit3, 
  Key, 
  AlertCircle, 
  CheckCircle2, 
  X, 
  Plus, 
  ShieldAlert,
  Sliders
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PermissionManager from "@/components/admin/PermissionManager";
import { 
  getAllAdmins, 
  createAdmin, 
  updateAdminPermissions, 
  removeAdminPermission, 
  deleteAdmin, 
  onUserUpdate 
} from "@/lib/auth";
import { Permission, PERMISSION_LABELS, type Admin } from "@/lib/types";

export default function AdminManagementPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  
  // Create Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    permissions: [Permission.MANAGE_PRODUCTS, Permission.MANAGE_ORDERS] as Permission[],
  });
  
  // Edit Form State
  const [editPermissions, setEditPermissions] = useState<Permission[]>([]);

  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const loadAdmins = () => {
    setAdmins(getAllAdmins());
  };

  useEffect(() => {
    loadAdmins();
    const unsub = onUserUpdate(loadAdmins);
    return unsub;
  }, []);

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      showNotification("error", "Please fill in all required admin details.");
      return;
    }

    try {
      createAdmin({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        permissions: formData.permissions,
        createdBy: "super-admin",
      });
      showNotification("success", `Admin "${formData.name}" assigned successfully!`);
      setFormData({
        name: "",
        email: "",
        password: "",
        permissions: [Permission.MANAGE_PRODUCTS, Permission.MANAGE_ORDERS],
      });
      setIsCreating(false);
      loadAdmins();
    } catch (err: unknown) {
      showNotification("error", err instanceof Error ? err.message : "Failed to create admin");
    }
  };

  const handleOpenEdit = (admin: Admin) => {
    setEditingAdmin(admin);
    setEditPermissions([...admin.permissions]);
  };

  const handleSaveEdit = () => {
    if (!editingAdmin) return;
    try {
      updateAdminPermissions(editingAdmin.id, editPermissions);
      showNotification("success", `Permissions updated for admin "${editingAdmin.name}"!`);
      setEditingAdmin(null);
      loadAdmins();
    } catch (err: unknown) {
      showNotification("error", err instanceof Error ? err.message : "Failed to update permissions");
    }
  };

  const handleRemoveSinglePermission = (adminId: string, perm: Permission) => {
    try {
      removeAdminPermission(adminId, perm);
      showNotification("success", `Revoked "${PERMISSION_LABELS[perm]}" permission.`);
      loadAdmins();
    } catch (err: unknown) {
      showNotification("error", err instanceof Error ? err.message : "Failed to revoke permission");
    }
  };

  const handleDelete = (adminId: string, name: string) => {
    if (confirm(`Are you sure you want to completely remove admin "${name}"?`)) {
      deleteAdmin(adminId);
      showNotification("success", `Admin "${name}" removed.`);
      loadAdmins();
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-violet-500/20 text-violet-400 border border-violet-500/30 uppercase">
              Role Governance
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Administrator Delegation & Permissions
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Create sub-admins, configure granular permissions, or revoke administrative access.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreating(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-lg shadow-brand-600/30 transition-all hover:scale-105 active:scale-95"
        >
          <UserPlus className="w-4 h-4" />
          <span>Assign New Admin</span>
        </button>
      </div>

      {/* Notifications */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-2xl border flex items-center gap-3 text-xs font-semibold ${
            notification.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
              : "bg-red-500/10 border-red-500/30 text-red-400"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{notification.message}</span>
        </motion.div>
      )}

      {/* Admin Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {admins.length === 0 ? (
          <div className="md:col-span-2 text-center py-16 border border-dashed border-slate-800 rounded-3xl bg-slate-950/40 space-y-3">
            <ShieldAlert className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="font-bold text-white text-base">No Delegated Admins Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              You haven&apos;t delegated any admin accounts yet. Click &quot;Assign New Admin&quot; to authorize a new staff member.
            </p>
            <button
              onClick={() => setIsCreating(true)}
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> Assign First Admin
            </button>
          </div>
        ) : (
          admins.map((admin) => (
            <motion.div
              key={admin.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Admin Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-brand-400 text-base font-extrabold shrink-0">
                      {admin.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base text-white">{admin.name}</h3>
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {admin.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-mono">{admin.email}</p>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                        Assigned: {new Date(admin.createdAt).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(admin)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-brand-600/20 border border-slate-700 hover:border-brand-500/40 text-slate-300 hover:text-brand-400 transition-all"
                      title="Edit Permissions"
                    >
                      <Sliders className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(admin.id, admin.name)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-red-500/20 border border-slate-700 hover:border-red-500/40 text-slate-300 hover:text-red-400 transition-all"
                      title="Revoke Admin Access"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Permissions Breakdown */}
                <div className="mt-5 pt-4 border-t border-slate-800/80">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                      Assigned Permissions ({admin.permissions.length})
                    </span>
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(admin)}
                      className="text-[11px] font-mono text-brand-400 hover:text-brand-300 underline"
                    >
                      Manage
                    </button>
                  </div>

                  {admin.permissions.length === 0 ? (
                    <p className="text-xs text-amber-400/80 font-mono italic">
                      No permissions granted yet.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {admin.permissions.map((perm) => (
                        <span
                          key={perm}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-medium text-slate-300 group hover:border-red-500/40 transition-colors"
                        >
                          <span>{PERMISSION_LABELS[perm]}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSinglePermission(admin.id, perm)}
                            className="text-slate-500 hover:text-red-400 transition-colors p-0.5"
                            title={`Revoke ${PERMISSION_LABELS[perm]}`}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Security Token: OK</span>
                <span className="text-slate-400">ID: {admin.id.slice(0, 14)}...</span>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Assign New Admin Modal */}
      <AnimatePresence>
        {isCreating && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-brand-500/20 border border-brand-500/30 text-brand-400">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">Assign New Administrator</h3>
                    <p className="text-xs text-slate-400">Grant delegated administrative roles</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Admin Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Vikram Sharma"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="admin@droneshop.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Initial Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Secure password"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <PermissionManager
                    selectedPermissions={formData.permissions}
                    onChange={(permissions) => setFormData({ ...formData, permissions })}
                  />
                </div>

                <div className="flex gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-300 text-xs font-bold hover:bg-slate-800 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-lg shadow-brand-600/30 transition-all"
                  >
                    Create & Authorize Admin
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Permissions Modal */}
      <AnimatePresence>
        {editingAdmin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="font-bold text-lg text-white">
                    Update Permissions: {editingAdmin.name}
                  </h3>
                  <p className="text-xs text-slate-400">{editingAdmin.email}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingAdmin(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <PermissionManager
                  selectedPermissions={editPermissions}
                  onChange={setEditPermissions}
                />

                <div className="flex gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setEditingAdmin(null)}
                    className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-300 text-xs font-bold hover:bg-slate-800 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveEdit}
                    className="flex-1 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-lg shadow-brand-600/30 transition-all"
                  >
                    Save Permissions
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
