"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, X } from "lucide-react";

interface EasterEggProps {
  triggeredExternally?: boolean;
  onClose?: () => void;
}

export default function EasterEgg({ triggeredExternally, onClose }: EasterEggProps) {
  const [active, setActive] = useState(false);
  const [keySequence, setKeySequence] = useState<string[]>([]);

  useEffect(() => {
    if (triggeredExternally) {
      setActive(true);
    }
  }, [triggeredExternally]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      const key = e.key.toUpperCase();
      const updated = [...keySequence, key].slice(-4);
      setKeySequence(updated);

      if (updated.join("") === "FLOW") {
        setActive(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keySequence]);

  if (!active) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-sm rounded-2xl border border-brand-200 bg-white/95 p-4 shadow-2xl backdrop-blur-md text-xs font-mono text-slate-900 animate-in slide-in-from-bottom-5 fade-in duration-300"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-brand-700 font-bold">
          <Sparkles className="w-4 h-4 text-brand-600 animate-spin" />
          <span>Easter Egg: Flow Engine Unlocked</span>
        </div>
        <button
          type="button"
          onClick={() => {
            setActive(false);
            if (onClose) onClose();
          }}
          className="text-slate-400 hover:text-slate-700 p-0.5 rounded"
          aria-label="Close message"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <p className="mt-2 text-slate-600 text-[11px] leading-relaxed">
        Secret code <span className="text-brand-700 bg-brand-50 border border-brand-200 px-1 py-0.5 rounded font-bold">FLOW</span> detected. All pipeline nodes running at quantum efficiency.
      </p>

      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-emerald-600 font-semibold">
        <span>Latency: 0ms (Simulated)</span>
        <span>Developer Mode: Active</span>
      </div>
    </div>
  );
}
