"use client";

import React from "react";
import CodePreview from "./CodePreview";
import { Code2, CheckCircle2, Shield } from "lucide-react";

export default function DeveloperExperience() {
  return (
    <section id="developer" className="py-20 md:py-32 relative" aria-labelledby="dev-heading">
      <div className="max-w-global mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-50 border border-brand-200 text-xs font-mono uppercase tracking-wider text-brand-700 shadow-sm font-semibold">
              <Code2 className="w-3.5 h-3.5 text-brand-600" />
              Developer Experience
            </div>

            <h2
              id="dev-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight"
            >
              From experiment to production, without losing the thread.
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Keep your workflow definition, evaluation context, and deployment configuration close to the work.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-brand-50 border border-brand-200 text-brand-600 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Declarative workflow configs</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Define pipelines, prompt models, and routing gates in version-controlled configuration files.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-brand-50 border border-brand-200 text-brand-600 shrink-0 mt-0.5">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Integrated evaluation suites</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Benchmark changes with strict quality thresholds before pushing deployments forward.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Code Editor Mockup */}
          <div className="lg:col-span-7">
            <CodePreview />
          </div>
        </div>
      </div>
    </section>
  );
}
