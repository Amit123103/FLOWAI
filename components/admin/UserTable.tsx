"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Search, Trash2, Eye, Edit2, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllUsers, deleteUser, updateUser, onUserUpdate } from "@/lib/auth";
import type { User, B2BUser } from "@/lib/types";

type FilterType = "all" | "normal" | "b2b";

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default function UserTable() {
  const [users, setUsers] = useState<(User | B2BUser)[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedUser, setSelectedUser] = useState<(User | B2BUser) | null>(null);
  const [editingUser, setEditingUser] = useState<(User | B2BUser) | null>(null);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editStatus, setEditStatus] = useState<"active" | "inactive">("active");

  const loadUsers = useCallback(() => {
    setUsers(getAllUsers());
  }, []);

  useEffect(() => {
    loadUsers();
    const unsub = onUserUpdate(loadUsers);
    return unsub;
  }, [loadUsers]);

  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || u.accountType === filter;
    return matchSearch && matchFilter;
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      deleteUser(id);
      loadUsers();
      if (selectedUser?.id === id) setSelectedUser(null);
    }
  };

  const handleEditOpen = (user: User | B2BUser) => {
    setEditingUser(user);
    setEditName(user.fullName);
    setEditPhone(user.phone);
    setEditStatus(user.status);
  };

  const handleEditSave = () => {
    if (!editingUser) return;
    updateUser(editingUser.id, {
      fullName: editName,
      phone: editPhone,
      status: editStatus,
    });
    setEditingUser(null);
    loadUsers();
  };

  const isB2B = (u: User | B2BUser): u is B2BUser => u.accountType === "b2b";

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-600"
          />
        </div>
        <div className="relative">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as FilterType)}
            className="appearance-none pl-4 pr-8 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-600"
          >
            <option value="all">All Users</option>
            <option value="normal">Normal Users</option>
            <option value="b2b">B2B Users</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Real-time indicator */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] font-mono text-slate-500">
          Real-time · {filteredUsers.length} user{filteredUsers.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">User</th>
                <th className="px-4 py-3 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Created At</th>
                <th className="px-4 py-3 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Last Login</th>
                <th className="px-4 py-3 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Logins</th>
                <th className="px-4 py-3 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-sm text-slate-400">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, i) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 text-xs font-bold shrink-0">
                          {user.fullName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">{user.fullName}</p>
                          <p className="text-[10px] text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                          user.accountType === "b2b"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-slate-100 text-slate-600 border border-slate-200"
                        }`}
                      >
                        {user.accountType === "b2b" ? "B2B" : "Normal"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[11px] font-mono text-slate-600">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-[11px] font-mono text-slate-600">
                      {formatDate(user.lastLoginAt)}
                    </td>
                    <td className="px-4 py-3 text-xs font-bold text-slate-700 text-center">
                      {user.loginHistory.length}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          user.status === "active"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50 transition-colors"
                          title="View details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleEditOpen(user)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Detail Modal */}
      <AnimatePresence>
        {selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-900">User Details</h3>
                <button onClick={() => setSelectedUser(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 text-lg font-bold">
                    {selectedUser.fullName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{selectedUser.fullName}</p>
                    <p className="text-xs text-slate-500">{selectedUser.email}</p>
                    <div className="flex gap-2 mt-1">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${selectedUser.accountType === "b2b" ? "bg-amber-50 text-amber-700 border border-amber-200" : "bg-slate-100 text-slate-600 border border-slate-200"}`}>
                        {selectedUser.accountType === "b2b" ? "B2B" : "Normal"}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${selectedUser.status === "active" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                        {selectedUser.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-50 rounded-xl p-3">
                    <p className="font-mono text-[10px] text-slate-400 mb-0.5">Phone</p>
                    <p className="font-semibold text-slate-700">{selectedUser.phone}</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3">
                    <p className="font-mono text-[10px] text-slate-400 mb-0.5">Role</p>
                    <p className="font-semibold text-slate-700 uppercase">{selectedUser.role}</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3">
                    <p className="font-mono text-[10px] text-slate-400 mb-0.5">Created At</p>
                    <p className="font-semibold text-slate-700">{formatDate(selectedUser.createdAt)}</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3">
                    <p className="font-mono text-[10px] text-slate-400 mb-0.5">Last Login</p>
                    <p className="font-semibold text-slate-700">{formatDate(selectedUser.lastLoginAt)}</p>
                  </div>
                </div>

                {/* Address */}
                <div className="bg-slate-50 rounded-xl p-3 text-xs">
                  <p className="font-mono text-[10px] text-slate-400 mb-1">Address</p>
                  <p className="font-semibold text-slate-700">
                    {selectedUser.address.street}, {selectedUser.address.city}, {selectedUser.address.state} - {selectedUser.address.pinCode}
                  </p>
                </div>

                {/* B2B Details */}
                {isB2B(selectedUser) && (
                  <div className="border-t border-slate-200 pt-3 mt-3 space-y-3">
                    <span className="text-[10px] font-mono font-bold text-amber-700 uppercase tracking-wider">B2B Details</span>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-amber-50/50 rounded-xl p-3">
                        <p className="font-mono text-[10px] text-amber-500 mb-0.5">Company</p>
                        <p className="font-semibold text-slate-700">{selectedUser.companyName}</p>
                      </div>
                      <div className="bg-amber-50/50 rounded-xl p-3">
                        <p className="font-mono text-[10px] text-amber-500 mb-0.5">GST</p>
                        <p className="font-semibold text-slate-700">{selectedUser.gstNumber}</p>
                      </div>
                      <div className="bg-amber-50/50 rounded-xl p-3">
                        <p className="font-mono text-[10px] text-amber-500 mb-0.5">Business Type</p>
                        <p className="font-semibold text-slate-700">{selectedUser.businessType}</p>
                      </div>
                      <div className="bg-amber-50/50 rounded-xl p-3">
                        <p className="font-mono text-[10px] text-amber-500 mb-0.5">Designation</p>
                        <p className="font-semibold text-slate-700">{selectedUser.designation}</p>
                      </div>
                      <div className="bg-amber-50/50 rounded-xl p-3">
                        <p className="font-mono text-[10px] text-amber-500 mb-0.5">Procurement Volume</p>
                        <p className="font-semibold text-slate-700">{selectedUser.annualProcurementVolume}</p>
                      </div>
                      <div className="bg-amber-50/50 rounded-xl p-3">
                        <p className="font-mono text-[10px] text-amber-500 mb-0.5">Contact Person</p>
                        <p className="font-semibold text-slate-700">{selectedUser.contactPersonName}</p>
                      </div>
                    </div>
                    {selectedUser.categoriesOfInterest.length > 0 && (
                      <div className="bg-amber-50/50 rounded-xl p-3 text-xs">
                        <p className="font-mono text-[10px] text-amber-500 mb-1">Categories of Interest</p>
                        <div className="flex flex-wrap gap-1">
                          {selectedUser.categoriesOfInterest.map((c) => (
                            <span key={c} className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-medium">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Login History */}
                {selectedUser.loginHistory.length > 0 && (
                  <div className="border-t border-slate-200 pt-3 mt-3">
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Login History ({selectedUser.loginHistory.length})</span>
                    <div className="mt-2 space-y-1 max-h-32 overflow-y-auto">
                      {selectedUser.loginHistory.slice().reverse().map((record, i) => (
                        <div key={i} className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-50 text-[11px] font-mono text-slate-600">
                          <span>Login #{selectedUser.loginHistory.length - i}</span>
                          <span>{formatDate(record.timestamp)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit User Modal */}
      <AnimatePresence>
        {editingUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-900">Edit User</h3>
                <button onClick={() => setEditingUser(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Name</label>
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone</label>
                  <input
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as "active" | "inactive")}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setEditingUser(null)}
                    className="flex-1 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEditSave}
                    className="flex-1 py-2 rounded-xl bg-brand-600 text-white text-sm font-bold hover:bg-brand-500"
                  >
                    Save Changes
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
