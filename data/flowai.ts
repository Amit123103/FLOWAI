export interface WorkflowNodeItem {
  id: "input" | "model" | "evaluation" | "deploy";
  title: string;
  subtitle: string;
  badge: string;
  details: {
    title: string;
    description: string;
    attributes: { label: string; value: string; highlight?: boolean }[];
    manifest: string;
  };
}

export const WORKFLOW_NODES: WorkflowNodeItem[] = [
  {
    id: "input",
    title: "INPUT",
    subtitle: "User request",
    badge: "Schema v2",
    details: {
      title: "Input Context",
      description: "Structured incoming context, user prompt, and metadata payload.",
      attributes: [
        { label: "Type", value: "JSON Schema Validator" },
        { label: "Throughput", value: "420 req/s" },
        { label: "Status", value: "Valid", highlight: true },
      ],
      manifest: `input:\n  schema: "./schemas/triage.json"\n  maxContextLength: 2048\n  sanitization: "strict"`,
    },
  },
  {
    id: "model",
    title: "MODEL",
    subtitle: "Reasoning model",
    badge: "Active",
    details: {
      title: "Model",
      description: "Reasoning model with structured chain-of-thought routing.",
      attributes: [
        { label: "Provider", value: "flow-model-core" },
        { label: "Temperature", value: "0.4" },
        { label: "Latency", value: "820ms", highlight: true },
        { label: "Status", value: "Ready", highlight: true },
      ],
      manifest: `model:\n  provider: "flow-model-core"\n  temperature: 0.4\n  top_p: 0.95\n  max_tokens: 2048`,
    },
  },
  {
    id: "evaluation",
    title: "EVALUATION",
    subtitle: "Quality gate",
    badge: "Automated",
    details: {
      title: "Evaluation",
      description: "Support quality test suite and assertion verification.",
      attributes: [
        { label: "Suite", value: "Support Quality" },
        { label: "Test Cases", value: "48" },
        { label: "Passed", value: "46", highlight: true },
        { label: "Review", value: "2" },
      ],
      manifest: `evaluation:\n  suite: "support-quality"\n  cases: 48\n  threshold: 0.90\n  failover: "block_and_alert"`,
    },
  },
  {
    id: "deploy",
    title: "DEPLOY",
    subtitle: "Edge routing",
    badge: "Live v2.4",
    details: {
      title: "Deployment",
      description: "Production gateway with zero-downtime routing & health checks.",
      attributes: [
        { label: "Environment", value: "Production" },
        { label: "Edge Overhead", value: "18ms" },
        { label: "Status", value: "Operational", highlight: true },
      ],
      manifest: `deployment:\n  environment: "production"\n  concurrency: 120\n  autoRollback: true`,
    },
  },
];

export const DASHBOARD_METRICS = [
  { label: "Latency", value: "820ms", change: "-42ms", trend: "down" },
  { label: "Success", value: "98%", change: "500 runs", trend: "up" },
  { label: "Runs", value: "124", change: "+18 today", trend: "up" },
  { label: "Status", value: "Ready", change: "Healthy", trend: "neutral" },
];

export const RECENT_RUNS = [
  { id: "#1042", status: "Completed", latency: "820ms", timestamp: "2 min ago" },
  { id: "#1041", status: "Completed", latency: "895ms", timestamp: "8 min ago" },
  { id: "#1040", status: "Testing", latency: "420ms", timestamp: "14 min ago" },
  { id: "#1039", status: "Completed", latency: "780ms", timestamp: "23 min ago" },
];

export const PRODUCT_CAPABILITIES = [
  {
    id: "build",
    title: "Build",
    copy: "Design AI workflows with prompts, models, tools, and structured inputs in one place.",
    features: [
      "Visual pipeline composer with real-time node outputs",
      "Multi-provider model configurations and temperature controls",
      "Deterministic local playground for rapid iteration",
    ],
  },
  {
    id: "evaluate",
    title: "Evaluate",
    copy: "Compare outputs against repeatable test cases before changing what reaches production.",
    features: [
      "Automated evaluation matrices across edge cases",
      "Semantic similarity scoring & assertion verification",
      "Output diff comparison across model versions",
    ],
  },
  {
    id: "monitor",
    title: "Monitor",
    copy: "Keep an eye on workflow behavior, latency, errors, and deployment state.",
    features: [
      "Step-by-step trace waterfalls with latency attribution",
      "Real-time token cost & error rate observability",
      "Automatic rollback alerts on assertion drift",
    ],
  },
];

export const FEATURES_DATA = [
  {
    id: "visual-workflows",
    title: "Visual workflows",
    description: "Connect prompts, models, evaluations, and deployment steps visually.",
    category: "Architecture",
    hasMiniUI: true,
    uiType: "workflow",
  },
  {
    id: "repeatable-evaluations",
    title: "Repeatable evaluations",
    description: "Test changes against consistent evaluation cases.",
    category: "Testing",
    hasMiniUI: true,
    uiType: "evaluation",
  },
  {
    id: "deployment-visibility",
    title: "Deployment visibility",
    description: "Understand the current state of each workflow.",
    category: "Release",
    hasMiniUI: false,
  },
  {
    id: "prompt-versioning",
    title: "Prompt versioning",
    description: "Keep experiments organized and easy to compare.",
    category: "Versioning",
    hasMiniUI: true,
    uiType: "versioning",
  },
  {
    id: "workflow-monitoring",
    title: "Workflow monitoring",
    description: "See important runtime signals in one place.",
    category: "Telemetry",
    hasMiniUI: true,
    uiType: "monitoring",
  },
  {
    id: "developer-first",
    title: "Developer-first interface",
    description: "Keep technical work visible without unnecessary complexity.",
    category: "Core DX",
    hasMiniUI: false,
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    number: "01",
    label: "BUILD",
    title: "Create the workflow.",
    description: "Compose prompts, context variables, and model parameters into a deterministic execution graph.",
    detail: "Inspect intermediate node payloads instantly.",
  },
  {
    number: "02",
    label: "EVALUATE",
    title: "Test the behavior.",
    description: "Benchmark changes against repeatable test suites to verify quality thresholds before release.",
    detail: "Catch regressions and token cost spikes early.",
  },
  {
    number: "03",
    label: "SHIP",
    title: "Move the workflow forward.",
    description: "Deploy to production with active monitoring, latency alerts, and zero-downtime routing.",
    detail: "Maintain full trace observability in real time.",
  },
];

export const CODE_SNIPPETS = {
  workflow: `workflow.generate()

model:
  provider: "flow-model"
  temperature: 0.4

evaluation:
  suite: "support-quality"

deployment:
  environment: "production"`,
  prompt: `prompt:
  system: "You are a helpful assistant."
  input: "{{user_message}}"`,
  evaluation: `suite:
  name: "support-quality"
  cases: 48
  threshold: 0.90`,
};
