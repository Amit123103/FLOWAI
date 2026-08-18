export interface WorkflowNodeItem {
  id: "input" | "model" | "evaluation" | "deploy" | "rag" | "sandbox" | "guardrail";
  title: string;
  subtitle: string;
  badge: string;
  iconType?: "input" | "model" | "eval" | "deploy" | "database" | "code" | "shield";
  details: {
    title: string;
    description: string;
    attributes: { label: string; value: string; highlight?: boolean }[];
    manifest: string;
  };
}

export interface AIModelOption {
  id: string;
  name: string;
  provider: string;
  latencyMs: number;
  costPer1k: string;
  contextWindow: string;
  color: string;
}

export const AI_MODELS: AIModelOption[] = [
  {
    id: "gpt-4o",
    name: "GPT-4o Omnichannel",
    provider: "OpenAI",
    latencyMs: 380,
    costPer1k: "$0.005",
    contextWindow: "128k tokens",
    color: "emerald",
  },
  {
    id: "claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    latencyMs: 410,
    costPer1k: "$0.003",
    contextWindow: "200k tokens",
    color: "amber",
  },
  {
    id: "gemini-2-flash",
    name: "Gemini 2.0 Flash",
    provider: "Google",
    latencyMs: 220,
    costPer1k: "$0.001",
    contextWindow: "1M tokens",
    color: "rose",
  },
  {
    id: "deepseek-v3",
    name: "DeepSeek V3 (MoE)",
    provider: "DeepSeek",
    latencyMs: 310,
    costPer1k: "$0.0008",
    contextWindow: "64k tokens",
    color: "cyan",
  },
  {
    id: "llama-3-3-70b",
    name: "Llama 3.3 70B Instruct",
    provider: "Meta / Local",
    latencyMs: 290,
    costPer1k: "$0.0006",
    contextWindow: "128k tokens",
    color: "brand",
  },
];

export interface PromptPreset {
  id: string;
  name: string;
  prompt: string;
  expectedOutput: string;
  tokens: number;
  tags: string[];
}

export const PROMPT_PRESETS: PromptPreset[] = [
  {
    id: "triage",
    name: "Customer Ticket Triage & Routing",
    prompt: "Analyze user issue: 'Payment failed with error code ERR_CARD_DECLINED on billing page' and extract intent, severity, priority, and routing tag.",
    expectedOutput: `{\n  "intent": "BILLING_ERROR",\n  "severity": "HIGH",\n  "errorCode": "ERR_CARD_DECLINED",\n  "routeTo": "finance-support-tier2",\n  "suggestedResolution": "Trigger automated card issuer retry with 3D-Secure fallback",\n  "confidenceScore": 0.992\n}`,
    tokens: 184,
    tags: ["Classification", "Finance", "JSON"],
  },
  {
    id: "rag",
    name: "Enterprise Knowledge Base RAG",
    prompt: "Retrieve enterprise security policy section 4.2 and summarize compliance requirement for SOC2 Type II audit data retention.",
    expectedOutput: `**SOC2 Type II Audit Compliance Summary (Section 4.2):**\n\n1. **Data Retention**: Encrypted audit logs must be immutable and retained for a minimum of 365 days.\n2. **Access Controls**: Multi-factor authorization required for all administrative trace accesses.\n3. **Continuous Monitoring**: Anomaly triggers dispatched to PagerDuty with <50ms SLA.`,
    tokens: 242,
    tags: ["RAG", "Vector DB", "Security"],
  },
  {
    id: "code-eval",
    name: "Python Code Generation & Sandbox",
    prompt: "Generate a production-ready async FastAPI middleware to track LLM token counts and emit Datadog statsd metrics.",
    expectedOutput: `async def flowai_telemetry_middleware(request: Request, call_next):\n    start_time = time.perf_counter()\n    response = await call_next(request)\n    duration_ms = (time.perf_counter() - start_time) * 1000\n    statsd.timing("flowai.request.duration", duration_ms)\n    statsd.increment("flowai.request.tokens", int(response.headers.get("X-Tokens", 0)))\n    return response`,
    tokens: 218,
    tags: ["FastAPI", "Python", "Observability"],
  },
];

export const WORKFLOW_NODES: WorkflowNodeItem[] = [
  {
    id: "input",
    title: "INPUT",
    subtitle: "User request",
    badge: "Schema v2",
    iconType: "input",
    details: {
      title: "Input Context & JSON Schema",
      description: "Structured incoming context, user prompt, and metadata payload validation.",
      attributes: [
        { label: "Type", value: "JSON Schema Validator" },
        { label: "Throughput", value: "1,240 req/s" },
        { label: "Sanitization", value: "Strict Regex", highlight: true },
        { label: "Status", value: "Valid", highlight: true },
      ],
      manifest: `input:\n  schema: "./schemas/triage.json"\n  maxContextLength: 4096\n  sanitization: "strict"\n  rateLimitPerSec: 500`,
    },
  },
  {
    id: "model",
    title: "MODEL",
    subtitle: "Reasoning model",
    badge: "Active MoE",
    iconType: "model",
    details: {
      title: "Reasoning LLM Engine",
      description: "Multi-provider model routing with dynamic latency fallback and streaming tokens.",
      attributes: [
        { label: "Provider", value: "Dynamic Routing" },
        { label: "Temperature", value: "0.3" },
        { label: "Latency", value: "310ms", highlight: true },
        { label: "Streaming", value: "SSE (50ms TTFT)", highlight: true },
      ],
      manifest: `model:\n  provider: "claude-3-5-sonnet"\n  fallback: "gemini-2-flash"\n  temperature: 0.3\n  top_p: 0.95\n  max_tokens: 2048`,
    },
  },
  {
    id: "evaluation",
    title: "EVALUATION",
    subtitle: "Quality gate",
    badge: "Automated",
    iconType: "eval",
    details: {
      title: "Automated Evaluation & Guardrails",
      description: "Live test assertions for hallucination scores, toxicity filters, and PII masking.",
      attributes: [
        { label: "Suite", value: "Enterprise Quality Gate" },
        { label: "Test Cases", value: "128 unit evals" },
        { label: "Passed", value: "99.2%", highlight: true },
        { label: "Failover", value: "Block & Alert" },
      ],
      manifest: `evaluation:\n  suite: "enterprise-gate"\n  cases: 128\n  threshold: 0.95\n  piiMasking: true\n  hallucinationCheck: "embedding_cosine_distance"`,
    },
  },
  {
    id: "deploy",
    title: "DEPLOY",
    subtitle: "Edge routing",
    badge: "Live v2.4",
    iconType: "deploy",
    details: {
      title: "Edge Gateway & Deployment",
      description: "Production gateway with global Anycast routing, canary releases, and zero downtime.",
      attributes: [
        { label: "Environment", value: "Production (Global)" },
        { label: "Edge Overhead", value: "12ms" },
        { label: "Health Check", value: "200 OK (99.99%)", highlight: true },
        { label: "Canary Ratio", value: "90/10" },
      ],
      manifest: `deployment:\n  environment: "production"\n  concurrency: 500\n  autoRollback: true\n  canary: { enabled: true, weight: 10 }`,
    },
  },
];

export const DASHBOARD_METRICS = [
  { label: "Avg Latency", value: "310ms", change: "-84ms", trend: "down" },
  { label: "Eval Pass Rate", value: "99.4%", change: "+1.2%", trend: "up" },
  { label: "Daily Executions", value: "142.8k", change: "+24% wk", trend: "up" },
  { label: "Gateway Status", value: "Healthy", change: "99.99% SLA", trend: "neutral" },
];

export const RECENT_RUNS = [
  { id: "#RUN-8942", status: "Completed", latency: "284ms", model: "Claude 3.5 Sonnet", cost: "$0.0006", timestamp: "Just now" },
  { id: "#RUN-8941", status: "Completed", latency: "312ms", model: "GPT-4o", cost: "$0.0012", timestamp: "1 min ago" },
  { id: "#RUN-8940", status: "Completed", latency: "198ms", model: "Gemini 2.0 Flash", cost: "$0.0002", timestamp: "3 min ago" },
  { id: "#RUN-8939", status: "Testing", latency: "340ms", model: "DeepSeek V3", cost: "$0.0004", timestamp: "6 min ago" },
  { id: "#RUN-8938", status: "Completed", latency: "275ms", model: "Llama 3.3 70B", cost: "$0.0001", timestamp: "12 min ago" },
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
