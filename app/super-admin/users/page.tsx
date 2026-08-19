"use client";

import React, { useState } from "react";
import { Users, UserPlus, FileSpreadsheet, Download, RefreshCw } from "lucide-react";
import UserTable from "@/components/admin/UserTable";
import { registerUser } from "@/lib/auth";

export default function UserManagementPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUserData, setNewUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "Password@123",
    street: "Default Street",
    city: "Mumbai",
    state: "Maharashtra",
    pinCode: "400001",
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      registerUser({
        fullName: newUserData.fullName,
        email: newUserData.email,
        phone: newUserData.phone,
        password: newUserData.password,
        role: "user",
        accountType: "normal",
        address: {
          street: newUserData.street,
          city: newUserData.city,
          state: newUserData.state,
          pinCode: newUserData.pinCode,
        },
      });
      setShowAddModal(false);
      setNewUserData({
        fullName: "",
        email: "",
        phone: "",
        password: "Password@123",
        street: "Default Street",
        city: "Mumbai",
        state: "Maharashtra",
        pinCode: "400001",
      });
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to add user");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">
              Real-Time Feed
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            User Management Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Monitor all registered retail shoppers and B2B enterprise clients with real-time creation and login timestamps.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-lg shadow-brand-600/30 transition-all hover:scale-105 active:scale-95"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add User Manually</span>
          </button>
        </div>
      </div>

      {/* User Table with Real-time synchronization */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-xl">
        <UserTable />
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-lg text-white">Add User (Admin Creation)</h3>
            <p className="text-xs text-slate-400">Directly add a new user to the database.</p>

            <form onSubmit={handleAddUser} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newUserData.fullName}
                  onChange={(e) => setNewUserData({ ...newUserData, fullName: e.target.value })}
                  placeholder="e.g. Ankit Sharma"
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-950 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={newUserData.email}
                  onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                  placeholder="ankit@example.com"
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-950 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={newUserData.phone}
                    onChange={(e) => setNewUserData({ ...newUserData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-950 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Temporary Password</label>
                  <input
                    type="text"
                    required
                    value={newUserData.password}
                    onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-950 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-xs font-bold hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-lg shadow-brand-600/30"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
