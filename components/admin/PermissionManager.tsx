"use client";

import React from "react";
import { Permission, PERMISSION_LABELS } from "@/lib/types";

interface PermissionManagerProps {
  selectedPermissions: Permission[];
  onChange: (permissions: Permission[]) => void;
  disabled?: boolean;
}

export default function PermissionManager({ selectedPermissions, onChange, disabled = false }: PermissionManagerProps) {
  const allPermissions = Object.values(Permission);

  const toggle = (perm: Permission) => {
    if (disabled) return;
    if (selectedPermissions.includes(perm)) {
      onChange(selectedPermissions.filter((p) => p !== perm));
    } else {
      onChange([...selectedPermissions, perm]);
    }
  };

  const selectAll = () => {
    if (disabled) return;
    onChange([...allPermissions]);
  };

  const clearAll = () => {
    if (disabled) return;
    onChange([]);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-700">Permissions</span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={selectAll}
            disabled={disabled}
            className="text-[10px] font-mono font-semibold text-brand-600 hover:text-brand-700 disabled:text-slate-400"
          >
            Select All
          </button>
          <span className="text-slate-300">|</span>
          <button
            type="button"
            onClick={clearAll}
            disabled={disabled}
            className="text-[10px] font-mono font-semibold text-slate-500 hover:text-slate-700 disabled:text-slate-400"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {allPermissions.map((perm) => {
          const isSelected = selectedPermissions.includes(perm);
          return (
            <button
              key={perm}
              type="button"
              onClick={() => toggle(perm)}
              disabled={disabled}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-xs font-semibold border transition-all ${
                isSelected
                  ? "bg-brand-50 border-brand-300 text-brand-700"
                  : "bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300"
              } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
              {/* Toggle */}
              <div
                className={`w-4 h-4 rounded flex items-center justify-center shrink-0 transition-colors ${
                  isSelected ? "bg-brand-600" : "bg-slate-200"
                }`}
              >
                {isSelected && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              {PERMISSION_LABELS[perm]}
            </button>
          );
        })}
      </div>

      <div className="text-[10px] font-mono text-slate-400">
        {selectedPermissions.length} of {allPermissions.length} permissions selected
      </div>
    </div>
  );
}
