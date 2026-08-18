export interface WorkflowNodeData {
  id: string;
  name: string;
  type: string;
  badge: string;
  description: string;
  details: {
    modelOrType?: string;
    temperature?: string;
    latency?: string;
    status: string;
    metricLabel?: string;
    metricValue?: string;
    configSnippet?: string;
  };
}

export const WORKFLOW_NODES: WorkflowNodeData[] = [
  {
    id: "input",
    name: "Input Payload",
    type: "Source",
    badge: "Schema v2",
    description: "Structured incoming context, user prompt, and metadata attributes.",
    details: {
      modelOrType: "JSON Schema Validator",
      status: "Valid",
      metricLabel: "Throughput",
      metricValue: "420 req/s",
      configSnippet: '{\n  "userId": "usr_9918",\n  "intent": "support_query",\n  "ragContextLength": 1024\n}',
    },
  },
  {
    id: "model",
    name: "Reasoning Model",
    type: "LLM Pipeline",
    badge: "Active",
    description: "Target foundation model with structured chain-of-thought routing.",
    details: {
      modelOrType: "GPT-style reasoning model",
      temperature: "0.4",
      latency: "820ms",
      status: "Ready",
      metricLabel: "Token Speed",
      metricValue: "64 tok/s",
      configSnippet: 'model:\n  provider: "flow-core-v2"\n  temperature: 0.40\n  maxTokens: 2048\n  topP: 0.95',
    },
  },
  {
    id: "evaluation",
    name: "Quality Evaluation",
    type: "Test Suite",
    badge: "Automated",
    description: "Regression scoring, hallucination guardrails, and latency checks.",
    details: {
      modelOrType: "Semantic Guard + Assertion Suite",
      status: "Passed (98.4%)",
      metricLabel: "Eval Score",
      metricValue: "0.96 / 1.0",
      configSnippet: 'eval:\n  suite: "support-quality-v3"\n  similarityThreshold: 0.92\n  guardrails: ["pii_filter", "toxicity"]',
    },
  },
  {
    id: "deploy",
    name: "Production Gateway",
    type: "Deployment",
    badge: "Live v2.4",
    description: "Multi-region endpoint routing with automatic rollback safety.",
    details: {
      modelOrType: "Zero-Downtime Edge Router",
      latency: "18ms edge overhead",
      status: "Deployed",
      metricLabel: "Uptime",
      metricValue: "99.99%",
      configSnippet: 'deploy:\n  environment: "production"\n  concurrency: 120\n  fallback: "flow-backup-region"',
    },
  },
];

export const RECENT_RUNS = [
  { id: "#1042", workflow: "Support Copilot", status: "Completed", latency: "842ms", evalScore: "99.2%", time: "2m ago" },
  { id: "#1041", workflow: "Doc Synthesis", status: "Completed", latency: "915ms", evalScore: "98.4%", time: "14m ago" },
  { id: "#1040", workflow: "Ticket Router", status: "Testing", latency: "420ms", evalScore: "Running...", time: "Just now" },
  { id: "#1039", workflow: "Support Copilot", status: "Completed", latency: "790ms", evalScore: "97.8%", time: "1h ago" },
];

export const CAPABILITIES = [
  {
    id: "build",
    title: "Build",
    subtitle: "Create and iterate AI workflows",
    description: "Visually compose prompt pipelines, test different foundation models, and configure context retrieval without managing raw infrastructure.",
    previewType: "graph",
    features: [
      "Modular pipeline nodes with dynamic variable passing",
      "Multi-provider model selection and temperature controls",
      "Deterministic sandbox for rapid local iterations",
    ],
  },
  {
    id: "evaluate",
    title: "Evaluate",
    subtitle: "Compare outputs and catch regressions",
    description: "Run repeatable test suites across edge cases before pushing changes. Measure quality regressions, latency shifts, and cost changes side-by-side.",
    previewType: "diff",
    features: [
      "Automated regression testing across test matrices",
      "Semantic similarity scoring & custom assertion rules",
      "Version-to-version output comparison with highlighted diffs",
    ],
  },
  {
    id: "monitor",
    title: "Monitor",
    subtitle: "Understand production behavior without tool-switching",
    description: "Track live latency, token consumption, fallback rates, and output anomalies from the same developer workspace you use for building.",
    previewType: "metrics",
    features: [
      "Real-time traces with per-step latency breakdowns",
      "Error attribution down to specific prompt templates",
      "Custom metric alerts for drift and assertion breaches",
    ],
  },
];

export const FEATURES = [
  {
    title: "Visual workflows",
    description: "Connect prompts, models, tools, and evaluations in one workspace with immediate execution feedback.",
    category: "Architecture",
  },
  {
    title: "Evaluation runs",
    description: "Compare model behavior across repeatable test cases to spot subtle quality regressions before shipping.",
    category: "Testing",
  },
  {
    title: "Deployment controls",
    description: "Move tested workflows toward production with clear status visibility, canary stages, and instant rollback.",
    category: "Release",
  },
  {
    title: "Observability",
    description: "See latency, failures, token costs, and step-level workflow behavior in one place without third-party dashboards.",
    category: "Telemetry",
  },
  {
    title: "Prompt versioning",
    description: "Keep experiments organized, reproducible, and tracked like standard Git branches with full configuration diffs.",
    category: "Versioning",
  },
  {
    title: "Developer-first workspace",
    description: "Built for engineers who want clean APIs, reproducible environments, and zero vendor lock-in.",
    category: "Core DX",
  },
];

export const WORKFLOW_STEPS = [
  {
    number: "01",
    name: "Build",
    tagline: "Create your AI workflow",
    description: "Assemble prompts, context injectors, and reasoning models into a structured, type-safe execution graph.",
    detail: "Define parameters, test isolated steps, and inspect intermediate JSON payloads immediately in the local playground.",
  },
  {
    number: "02",
    name: "Evaluate",
    tagline: "Test outputs against repeatable cases",
    description: "Benchmark your graph against curated evaluation datasets before sending a single token to users.",
    detail: "Catch prompt injection risks, check assertion score boundaries, and compare output consistency across model versions.",
  },
  {
    number: "03",
    name: "Ship",
    tagline: "Deploy and monitor behavior",
    description: "Promote your validated pipeline to an isolated production endpoint with integrated telemetry and alerts.",
    detail: "Track latency distributions, inspect failed traces, and roll back instantly if output quality drifts below tolerance.",
  },
];

export const CODE_SNIPPETS = {
  workflow: `// flowai.config.ts
import { defineWorkflow, step } from "@flowai/core";

export default defineWorkflow({
  name: "customer-triage-pipeline",
  version: "2.4.0",
  nodes: [
    step.input({ schema: "./schemas/ticket.json" }),
    step.model({
      provider: "flow-core-v2",
      temperature: 0.4,
      systemPrompt: "./prompts/triage.system.md",
    }),
    step.evaluation({
      suite: "support-quality-v3",
      minScore: 0.92,
      onFailure: "alert_and_hold",
    }),
    step.deploy({
      environment: "production",
      concurrency: 120,
      autoRollback: true,
    }),
  ],
});`,
  prompt: `<!-- prompts/triage.system.md -->
# Role: Technical Support Assistant

You are an expert AI support triage agent for FlowAI.

## Instructions
1. Analyze the customer's incoming issue payload: {{input.ticketBody}}
2. Categorize urgency: [CRITICAL, HIGH, MEDIUM, LOW]
3. Extract error stack traces or API response codes if present.
4. Generate a concise resolution recommendation with verified code steps.

## Constraints
- Temperature: 0.4 (Strict adherence)
- Do not output speculative answers for unknown configurations.
- Format response as structured schema: #TriageResult`,
  evaluation: `// tests/triage-quality.eval.ts
import { defineEvalSuite, assertSemanticQuality } from "@flowai/eval";

export const suite = defineEvalSuite({
  name: "support-quality-v3",
  dataset: "./datasets/verified-tickets-500.jsonl",
  assertions: [
    assertSemanticQuality({
      threshold: 0.92,
      model: "flow-evaluator-v1",
      metric: "resolution_accuracy",
    }),
    {
      name: "no_hallucinated_endpoints",
      rule: (output) => !output.includes("https://fake-api.internal"),
    },
    {
      name: "latency_sla",
      maxLatencyMs: 1200,
    },
  ],
});`,
};
