"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  WORKFLOW_NODES,
  AI_MODELS,
  PROMPT_PRESETS,
  WorkflowNodeItem,
  AIModelOption,
  PromptPreset,
} from "@/data/flowai";
import WorkflowNode from "./WorkflowNode";
import {
  ArrowRight,
  Terminal,
  Cpu,
  Play,
  CheckCircle2,
  Sparkles,
  Zap,
  Activity,
  Layers,
  Copy,
  Check,
  RefreshCw,
  Plus,
  Sliders,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkflowGraphProps {
  selectedNodeId: string;
  onSelectNode: (id: string) => void;
}

export default function WorkflowGraph({ selectedNodeId, onSelectNode }: WorkflowGraphProps) {
  const [nodes, setNodes] = useState<WorkflowNodeItem[]>(WORKFLOW_NODES);
  const [selectedModel, setSelectedModel] = useState<AIModelOption>(AI_MODELS[1]); // Claude 3.5 Sonnet
  const [selectedPreset, setSelectedPreset] = useState<PromptPreset>(PROMPT_PRESETS[0]);
  const [promptText, setPromptText] = useState(PROMPT_PRESETS[0].prompt);
  const [temperature, setTemperature] = useState(0.3);

  // Execution Simulator State
  const [isExecuting, setIsExecuting] = useState(false);
  const [executingNodeIndex, setExecutingNodeIndex] = useState<number | null>(null);
  const [outputStream, setOutputStream] = useState("");
  const [executionStats, setExecutionStats] = useState({
    latencyMs: 310,
    tokens: 184,
    cost: "$0.0006",
    evalScore: 0.992,
    status: "Ready",
  });
  const [copied, setCopied] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);

  const NODE_TEMPLATES: WorkflowNodeItem[] = [
    {
      id: "rag",
      title: "VECTOR DB",
      subtitle: "RAG Retrieval",
      badge: "Pinecone / Qdrant",
      iconType: "database",
      details: {
        title: "Semantic Vector Retriever",
        description: "Hybrid dense-sparse vector search across enterprise knowledge base embeddings.",
        attributes: [
          { label: "Top-K", value: "5 chunks" },
          { label: "Index", value: "text-embedding-3-small" },
          { label: "Similarity Threshold", value: "> 0.88", highlight: true },
          { label: "Latency", value: "24ms", highlight: true },
        ],
        manifest: `vector_retrieval:\n  provider: "pinecone"\n  index: "kb-enterprise-v2"\n  top_k: 5\n  metric: "cosine"\n  rerank: "cohere-rerank-v3"`,
      },
    },
    {
      id: "sandbox",
      title: "CODE SANDBOX",
      subtitle: "Python WASM",
      badge: "Secure MicroVM",
      iconType: "code",
      details: {
        title: "Isolated Code Execution Sandbox",
        description: "Executes LLM-generated code snippets in an isolated, secure sub-10ms microVM.",
        attributes: [
          { label: "Runtime", value: "Python 3.12 (WASM)" },
          { label: "Timeout", value: "2500ms" },
          { label: "Memory Limit", value: "128MB" },
          { label: "Network Access", value: "Disabled (Safe)", highlight: true },
        ],
        manifest: `code_sandbox:\n  runtime: "python3.12-wasm"\n  timeout_ms: 2500\n  memory_mb: 128\n  allowed_modules: ["numpy", "pandas", "json", "math"]`,
      },
    },
    {
      id: "guardrail",
      title: "GUARDRAIL",
      subtitle: "Safety & PII",
      badge: "Llama Guard",
      iconType: "shield",
      details: {
        title: "Safety & Privacy Guardrails",
        description: "Real-time moderation for PII redaction, prompt injection defense, and toxicity blocking.",
        attributes: [
          { label: "PII Masking", value: "SSN, Email, Cards", highlight: true },
          { label: "Toxicity Filter", value: "Score < 0.05" },
          { label: "Action on Breach", value: "Block & Log" },
          { label: "Overhead", value: "8ms" },
        ],
        manifest: `guardrail:\n  pii_masking: ["email", "phone", "credit_card", "ssn"]\n  jailbreak_prevention: "strict"\n  toxicity_threshold: 0.05\n  fail_strategy: "redact_or_block"`,
      },
    },
  ];

  const handleAddNode = (template: WorkflowNodeItem) => {
    const newNode = {
      ...template,
      id: `${template.id}-${Date.now()}` as any,
    };
    // Insert before deploy node if present, or at the end
    setNodes((prev) => {
      const deployIndex = prev.findIndex((n) => n.id.startsWith("deploy"));
      if (deployIndex !== -1) {
        const copy = [...prev];
        copy.splice(deployIndex, 0, newNode);
        return copy;
      }
      return [...prev, newNode];
    });
    onSelectNode(newNode.id);
    setShowAddModal(false);
  };

  const handleRemoveNode = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (nodes.length <= 2) return;
    setNodes((prev) => prev.filter((n) => n.id !== id));
    if (selectedNodeId === id) {
      onSelectNode(nodes[0].id);
    }
  };

  const handleResetNodes = () => {
    setNodes(WORKFLOW_NODES);
    onSelectNode("model");
  };

  const handleCopyOutput = () => {
    if (!outputStream) return;
    navigator.clipboard.writeText(outputStream);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunExecution = () => {
    if (isExecuting) return;
    setIsExecuting(true);
    setOutputStream("");

    // Dynamic execution through all nodes in sequence
    let currentStep = 0;
    const totalSteps = nodes.length;

    const stepInterval = setInterval(() => {
      if (currentStep < totalSteps) {
        setExecutingNodeIndex(currentStep);

        // If it's a model node, stream simulated output tokens
        if (nodes[currentStep].id.includes("model") || currentStep === 1) {
          const fullText = selectedPreset.expectedOutput;
          let currentLength = 0;
          const streamInterval = setInterval(() => {
            currentLength += Math.floor(Math.random() * 10) + 6;
            if (currentLength >= fullText.length) {
              setOutputStream(fullText);
              clearInterval(streamInterval);
            } else {
              setOutputStream(fullText.slice(0, currentLength));
            }
          }, 20);
        }

        currentStep++;
      } else {
        clearInterval(stepInterval);
        setExecutingNodeIndex(null);
        setIsExecuting(false);
        setExecutionStats({
          latencyMs: selectedModel.latencyMs + Math.floor(Math.random() * 30 - 15) + (nodes.length - 4) * 18,
          tokens: selectedPreset.tokens,
          cost: selectedModel.costPer1k,
          evalScore: +(0.988 + Math.random() * 0.011).toFixed(3),
          status: "Success (All Nodes Passed)",
        });
      }
    }, 280);
  };

  const handleSelectPreset = (preset: PromptPreset) => {
    setSelectedPreset(preset);
    setPromptText(preset.prompt);
    setOutputStream("");
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Top Simulator Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900 text-white shadow-sm border border-slate-800">
        {/* Model Selector Pill */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
            <Cpu className="w-3.5 h-3.5 text-brand-400" />
            <span className="hidden sm:inline">Active Model:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1">
            {AI_MODELS.map((model) => (
              <button
                key={model.id}
                type="button"
                onClick={() => setSelectedModel(model)}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-mono transition-all",
                  selectedModel.id === model.id
                    ? "bg-brand-600 text-white font-bold shadow-sm ring-1 ring-brand-400"
                    : "bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white"
                )}
              >
                {model.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRunExecution}
            disabled={isExecuting}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-rose-600 hover:from-brand-500 hover:to-rose-500 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-brand-900/40 transition-all hover:scale-105 active:scale-95"
          >
            {isExecuting ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Simulating Pipeline...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Execution Test</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Visual Pipeline Nodes with Animated Particle Flow */}
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
          {nodes.map((node, index) => {
            const isSelected = node.id === selectedNodeId;
            const isDimmed = Boolean(selectedNodeId && !isSelected);
            const isCurrentlyExecuting = executingNodeIndex === index;

            return (
              <div key={node.id} className="relative flex flex-col">
                <WorkflowNode
                  node={node}
                  isSelected={isSelected}
                  isDimmed={isDimmed}
                  isExecuting={isCurrentlyExecuting}
                  onSelect={onSelectNode}
                />

                {/* Connecting arrow on desktop */}
                {index < nodes.length - 1 && (
                  <div className="hidden lg:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-30 text-slate-400 pointer-events-none">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Prompt & Live Execution Simulator Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Interactive Prompt & Preset Config (5 Cols) */}
        <div className="lg:col-span-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                Test Prompt & Presets
              </span>
              <span className="text-[10px] font-mono text-slate-500">Live Simulator</span>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              {PROMPT_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={cn(
                    "text-[10px] font-mono px-2 py-1 rounded-md border transition-all",
                    selectedPreset.id === preset.id
                      ? "bg-brand-50 text-brand-800 border-brand-300 font-bold shadow-xs"
                      : "bg-slate-50 text-slate-600 hover:text-slate-900 border-slate-200 hover:border-slate-300"
                  )}
                >
                  {preset.name.split(" ")[0]} {preset.name.split(" ")[1]}
                </button>
              ))}
            </div>

            {/* Prompt Editor Textarea */}
            <textarea
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              rows={3}
              className="w-full text-xs font-mono p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 resize-none"
              placeholder="Enter user prompt or API request payload..."
            />
          </div>

          {/* Temperature & Live Parameters */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-600">
            <div className="flex items-center gap-2">
              <span>Temp: {temperature}</span>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-16 accent-brand-600 h-1 cursor-pointer"
              />
            </div>
            <span className="text-[11px] text-slate-500">
              Est. Latency: <strong className="text-brand-700">{selectedModel.latencyMs}ms</strong>
            </span>
          </div>
        </div>

        {/* Right: Live Streamed Token Output & Telemetry Console (7 Cols) */}
        <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-slate-950 p-4 shadow-sm flex flex-col justify-between text-white">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-xs font-mono font-bold text-slate-200">
                  Execution Output Console
                </span>
                {isExecuting && (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono animate-pulse">
                    Streaming Tokens...
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyOutput}
                  disabled={!outputStream}
                  className="text-slate-400 hover:text-white text-xs flex items-center gap-1 font-mono transition-colors disabled:opacity-30"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            {/* Console Output Area */}
            <div className="h-32 overflow-y-auto font-mono text-[11px] text-emerald-300/90 whitespace-pre-wrap leading-relaxed select-text p-1 bg-slate-900/60 rounded border border-slate-800/80">
              {outputStream ? (
                outputStream
              ) : (
                <span className="text-slate-600 italic">
                  // Press "Run Execution Test" above to stream AI tokens through the pipeline...
                </span>
              )}
            </div>
          </div>

          {/* Live Execution Telemetry Signals */}
          <div className="mt-3 pt-2.5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-slate-400">
            <div className="flex items-center gap-3">
              <span>
                Latency: <strong className="text-white">{executionStats.latencyMs}ms</strong>
              </span>
              <span>
                Tokens: <strong className="text-white">{executionStats.tokens}</strong>
              </span>
              <span>
                Cost: <strong className="text-emerald-400">{executionStats.cost}</strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3 h-3" />
              <span>Eval Score: {(executionStats.evalScore * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Node Inspector Detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeNode.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="rounded-xl border border-slate-200 bg-white p-4.5 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-brand-50 text-brand-600 border border-brand-200">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900">{activeNode.details.title}</h4>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200 font-semibold">
                    Node: {activeNode.title}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{activeNode.details.description}</p>
              </div>
            </div>

            {/* Contextual attributes */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              {activeNode.details.attributes.map((attr) => (
                <div
                  key={attr.label}
                  className="bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200"
                >
                  <span className="text-slate-500">{attr.label}: </span>
                  <span
                    className={
                      attr.highlight
                        ? "text-emerald-600 font-bold"
                        : "text-slate-900 font-semibold"
                    }
                  >
                    {attr.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Configuration Manifest */}
          <div className="mt-3.5">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-1.5">
              <span className="flex items-center gap-1.5 text-slate-800 font-semibold">
                <Terminal className="w-3.5 h-3.5 text-brand-600" />
                Live Node Manifest
              </span>
              <span className="text-[10px] text-slate-400">Interactive Micro-Interaction</span>
            </div>
            <pre className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto shadow-inner">
              <code>{activeNode.details.manifest}</code>
            </pre>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
