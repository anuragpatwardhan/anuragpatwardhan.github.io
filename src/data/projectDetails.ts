const F = "/images/framer";
const GH_USER = "https://github.com/anuragpatwardhan";

export type ProjectDetail = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  image: string;
  github: string;
  liveDemo?: string;
  problem: { intro: string; bullets: string[]; closing: string };
  framing: { isLines: string[]; isNotLines: string[]; interviewLine: string };
  useCases: string[];
  features: { title: string; what: string[]; tech: string[]; note?: string }[];
  techStack: { group: string; items: string[] }[];
  architecture: { flow: string; components: string[]; explanation: string };
  dataModel: string[];
  challenges: { problem: string; solution: string[] }[];
  pitch: string;
};

export const projectDetails: ProjectDetail[] = [
  {
    slug: "opscanvas",
    name: "OpsCanvas",
    tagline:
      "A manager-centric operational command center that converts noisy Jira + GitHub + Slack activity into actionable signals with deep links back to source tools.",
    category: "PRODUCT, ENGINEERING",
    image: `${F}/EbVTwBl2zlrq59jCraQRfnBJ5w.jpg`,
    github: `${GH_USER}/opscanvas`,
    problem: {
      intro: "Managers and tech leads waste time jumping between tools to answer basic questions:",
      bullets: [
        "What is at risk right now?",
        "Where is work blocked or drifting?",
        "Is review or incident load piling up?",
        "What needs my attention today?",
      ],
      closing:
        "Jira, GitHub and Slack each show partial truth. OpsCanvas closes the situational-awareness gap by turning tool events into human-readable signals.",
    },
    framing: {
      isLines: [
        "A decision-support system for managers / tech leads",
        "A signal layer above existing tools",
        "A read-only aggregator that links back to sources",
      ],
      isNotLines: [
        "A replacement for Jira (execution happens in Jira)",
        "A replacement for GitHub (code work stays there)",
        "A metrics dashboard with vanity charts",
      ],
      interviewLine:
        "Execution stays in Jira and GitHub. OpsCanvas is the situational-awareness layer that tells you where to look.",
    },
    useCases: [
      "See project health at a glance: Stable / Watch / At Risk",
      "Detect team load: Balanced / Stretched / Overloaded",
      "Surface attention signals: PR churn, stale tickets, incident follow-up gaps",
      "Reconstruct a work thread across Jira + PRs + Slack",
    ],
    features: [
      {
        title: "Unified Canvas View",
        what: [
          "Single calm screen with three zones: Project Health, Team Load, and Attention Signals",
          "Project cards show state, trend, top reason and deep-link buttons",
        ],
        tech: ["JavaFX", "ControlsFX", "JavaFX CSS theming"],
      },
      {
        title: "Connector & Normalizer Layer",
        what: [
          "GitHub, Jira and Slack connectors with a mock connector for demo data",
          "Raw API events normalized into a common schema",
        ],
        tech: ["Java HttpClient", "Jackson", "GitHub REST API", "Jira REST API", "Slack Web API"],
      },
      {
        title: "Signal Engine",
        what: [
          "Rule-based engine over normalized events: explainable, tunable, no black-box ML",
          "Computes project health, team load, and attention signals with evidence",
        ],
        tech: ["Spring Boot", "Java scheduling", "rule weights + thresholds"],
        note: "Started with rules instead of ML because managers need transparency.",
      },
      {
        title: "Work Thread Timeline",
        what: [
          "Groups Jira tickets, PR activity and Slack discussion into a single narrative thread",
          "Answers: how did we get here?",
        ],
        tech: ["thread + thread_links tables", "correlation strategy with confidence"],
      },
    ],
    techStack: [
      { group: "Desktop UI", items: ["Java 17 (OpenJDK)", "JavaFX (OpenJFX)", "ControlsFX"] },
      { group: "Backend / Core Engine", items: ["Spring Boot", "Java HttpClient / OkHttp", "Jackson", "SLF4J + Logback"] },
      { group: "Storage", items: ["SQLite (desktop)", "PostgreSQL (enterprise)", "Hibernate / JPA"] },
      { group: "Integrations", items: ["GitHub REST + Webhooks", "Jira REST", "Slack Web / Events API"] },
      { group: "Background Processing", items: ["Java Executors", "ScheduledExecutorService", "Internal blocking queue"] },
      { group: "Packaging & CI", items: ["Gradle", "jpackage (native installer)", "GitHub Actions"] },
    ],
    architecture: {
      flow: "Connectors → Normalizer → Store → Signal Engine → View Model → UI",
      components: [
        "Connector Layer: GitHub, Jira, Slack and Mock",
        "Event Normalizer: common NormalizedEvent schema",
        "Persistence: raw events, snapshots and computed signals",
        "Signal Engine: rule-based health, load and attention",
        "UI ViewModel Layer: prepares cards and summaries",
        "JavaFX UI: calm canvas with click-through deep links",
      ],
      explanation:
        "OpsCanvas is an event-driven system: events from GitHub / Jira / Slack are normalized into a common schema, persisted for auditability, then a signal engine runs lightweight rules to produce health states and alerts which the UI renders via view models.",
    },
    dataModel: [
      "projects(id, name, jiraKey, githubRepo, slackChannel)",
      "events(id, source, type, ts, projectId, normalizedJson, rawJson)",
      "signals(id, projectId, severity, title, reason, evidenceJson, createdAt, resolvedAt)",
      "snapshots(projectId, generatedAt, healthState, loadState, summaryJson)",
      "threads(id, projectId, title, status)",
      "thread_links(threadId, sourceType, externalId)",
    ],
    challenges: [
      {
        problem: "Event mismatch across tools. Jira tickets, PRs and Slack threads share no ID.",
        solution: [
          "Correlation strategy: explicit keys first (PR titles, branch names, commits)",
          "Heuristic fallback when no explicit link exists",
          "Stored correlation confidence + evidence so the matching is explainable",
        ],
      },
      {
        problem: "API rate limits and redundant events from frequent polling.",
        solution: [
          "Incremental sync using since timestamps",
          "ETag caching where the APIs support it",
          "Exponential backoff on 429s + dedupe by (source, type, externalId, ts)",
        ],
      },
      {
        problem: "JavaFX UI freezing on network / data processing work.",
        solution: [
          "Background collectors on worker threads",
          "Event processing via an internal queue",
          "UI updates via Platform.runLater; snapshot-based rendering",
        ],
      },
      {
        problem: "Dashboard noise. Too many alerts make the canvas useless.",
        solution: [
          "Severity levels (Info / Watch / AtRisk)",
          "Signal grouping and suppression windows",
          "Only top 3 reasons per project, with evidence always visible",
        ],
      },
    ],
    pitch:
      "OpsCanvas is a manager-centric command center that synthesizes Jira, GitHub and Slack activity into actionable signals like project health, team load and attention alerts. Built as an event-driven system: connectors ingest events, a normalizer maps them to a common schema, and a rule-based signal engine produces explainable alerts with evidence and deep links to source tools. The UI is intentionally calm: no raw metrics, just states, reasons, and what needs attention.",
  },
  {
    slug: "insightflow",
    name: "InsightFlow",
    tagline:
      "A data-to-decision analytics platform that transforms raw operational data into explainable insights, trend narratives and decision-ready summaries, not another raw dashboard.",
    category: "DATA, FULL-STACK",
    image: `${F}/SeHCjIgw4p9tEWYF6WQnDflHm4.png`,
    github: `${GH_USER}/insightflow`,
    problem: {
      intro: "Most analytics tools fail at the last mile of data:",
      bullets: [
        "Dashboards show what changed, not why",
        "Managers must manually interpret charts",
        "Metrics drift silently without context",
        "Insights are not connected to actions",
      ],
      closing: "InsightFlow closes the interpretation gap between raw data and business decisions.",
    },
    framing: {
      isLines: [
        "A decision intelligence layer",
        "A data interpretation system",
        "An analytics engine focused on explanations",
        "A full-stack data platform",
      ],
      isNotLines: [
        "A static BI dashboard",
        "A charting tool",
        "A Tableau / Power BI clone",
        "A data-viz toy project",
      ],
      interviewLine: "I intentionally avoided building another dashboard and focused on interpretation and explainability.",
    },
    useCases: [
      "Connect operational datasets (tickets, events, metrics)",
      "Track metric trends over time and detect meaningful changes",
      "Understand why metrics moved, by segment",
      "Surface recommended actions and follow-up questions",
    ],
    features: [
      {
        title: "Metric Ingestion & Modeling",
        what: [
          "Ingests time-series and event-based data",
          "Standardizes metrics into a common schema with ownership and history",
        ],
        tech: ["Python + FastAPI", "PostgreSQL / DuckDB", "dbt-style transformations"],
        note: "Treated metrics as first-class data products with schema, ownership and history.",
      },
      {
        title: "Trend Detection Engine",
        what: [
          "Detects spikes, drops, plateaus and volatility shifts beyond noise",
          "Configurable thresholds per metric",
        ],
        tech: ["NumPy / Pandas", "rolling averages", "z-score deviations"],
      },
      {
        title: "Segmentation & Drill-down",
        what: [
          "Breaks metric changes by team, project, time window, category",
          "Ranks segments by contribution to change",
        ],
        tech: ["SQL window functions", "DuckDB analytical queries", "Python orchestration"],
        note: "Instead of showing a drop, InsightFlow shows which segment caused it.",
      },
      {
        title: "Insight Narratives",
        what: [
          'Converts metric changes into human-readable explanations',
          '"Ticket resolution time increased 18% primarily due to Project X backlog growth over the last 7 days."',
        ],
        tech: ["Rule-based templates", "Optional Ollama (local LLM) for refinement", "Metadata-driven narratives"],
        note: "This is where InsightFlow stops being analytics and becomes decision support.",
      },
      {
        title: "Insight Feed (Action-Oriented UI)",
        what: [
          "Presents insights as a feed, not charts",
          "Each insight shows what changed, why, evidence and suggested follow-up",
        ],
        tech: ["Next.js + React", "TypeScript", "Tailwind CSS"],
        note: "Designed the UI to answer questions, not display numbers.",
      },
    ],
    techStack: [
      { group: "Backend / Data", items: ["Python + FastAPI", "PostgreSQL", "DuckDB (analytics)", "dbt Core", "Pandas / NumPy"] },
      { group: "Frontend", items: ["Next.js + React + TypeScript", "Tailwind CSS", "TanStack Query"] },
      { group: "Background Processing", items: ["Scheduled batch jobs", "Async workers"] },
      { group: "AI (optional, narrative refinement only)", items: ["Ollama (local LLM)"] },
      { group: "DevOps", items: ["Docker", "Docker Compose", "GitHub Actions"] },
    ],
    architecture: {
      flow: "Data Sources → Ingestion → Modeling → Analysis Engine → Insight Generator → UI Feed",
      components: [
        "Ingestion Layer: pulls raw operational data",
        "Modeling Layer: cleans and structures metrics",
        "Analysis Engine: detects meaningful changes",
        "Insight Generator: produces explanations with evidence",
        "Frontend: displays insights as decisions, not charts",
      ],
      explanation:
        "InsightFlow is a layered data system. Raw metrics are modeled and analyzed before being converted into explainable insights. The focus is on interpretation rather than visualization.",
    },
    dataModel: [
      "metrics(id, name, owner, schema)",
      "metric_values(metric_id, ts, value, dimensions)",
      "metric_changes(metric_id, window, delta, significance)",
      "segments(metric_id, dimension, contribution)",
      "insights(id, metric_id, summary, evidence_json, created_at)",
    ],
    challenges: [
      {
        problem: "Alert noise. Too many insignificant metric changes flooding the feed.",
        solution: [
          "Minimum effect-size thresholds",
          "Significance scoring per change",
          "Suppression windows to avoid repeated firings",
        ],
      },
      {
        problem: "Overfitting insights. Explaining noise as signal.",
        solution: [
          "Statistical validation across multiple windows",
          "Multiple-window confirmation before raising",
          "Human-readable confidence indicators on every insight",
        ],
      },
      {
        problem: "Slow aggregations on large historical datasets.",
        solution: [
          "DuckDB for fast analytical queries",
          "Pre-aggregated rollups",
          "Incremental processing of new data only",
        ],
      },
      {
        problem: "Technical explanations confusing non-technical users.",
        solution: [
          "Plain-language narrative templates",
          "Evidence-based explanations with linked data",
          "Consistent structure: what / why / evidence / action",
        ],
      },
    ],
    pitch:
      "InsightFlow is a data interpretation platform that focuses on explaining metric changes instead of showing dashboards. A layered analytics system detects significant changes, segments the contributing factors, and generates human-readable insights with evidence. The hardest part was balancing statistical rigor with clarity. I solved that using significance scoring, suppression rules and structured narrative templates.",
  },
  {
    slug: "pulseiq",
    name: "Pulse IQ",
    tagline:
      "An operational telemetry and early-warning system that continuously monitors system and process signals to detect abnormal patterns, degradation trends and risk buildup before failures occur.",
    category: "DATA, SYSTEMS",
    image: `${F}/EmYkJ0GAsJLRjpzNmsG8YUrzwRI.jpg`,
    github: `${GH_USER}/pulseiq`,
    problem: {
      intro: "Most organizations monitor failures, not degradation:",
      bullets: [
        "Alerts fire after something breaks",
        'Metrics look "within limits" but behavior is changing',
        "Teams miss slow regressions, fatigue, overload or drift",
        "Monitoring tools generate noise, not foresight",
      ],
      closing: "PulseIQ closes the early-signal gap. It detects when things are slowly going wrong, not just when they break.",
    },
    framing: {
      isLines: [
        "An early-warning intelligence layer",
        "A behavioral monitoring system",
        "A platform for detecting trend drift, pressure buildup and risk",
        "A data + systems project",
      ],
      isNotLines: [
        "A log viewer",
        "A metrics dashboard",
        "A Prometheus clone",
        'A generic "AI monitoring" tool',
      ],
      interviewLine: "PulseIQ focuses on trend behavior and early degradation, not threshold-based alerts.",
    },
    useCases: [
      "Detect review backlog slowly increasing",
      "Identify ticket resolution times degrading week-over-week",
      "Spot system load patterns that precede incidents",
      "Surface teams under sustained operational pressure",
      "Highlight silent failures where metrics look stable but behavior changed",
    ],
    features: [
      {
        title: "Signal Ingestion Layer",
        what: [
          "Collects system metrics, workflow metrics and process timings",
          "Supports batch + near-real-time ingestion",
        ],
        tech: ["Python + FastAPI", "REST ingestion endpoints", "Scheduled collectors", "PostgreSQL / DuckDB"],
        note: "Treated everything as a signal stream, not just metrics.",
      },
      {
        title: "Behavioral Baseline Engine",
        what: [
          "Learns normal behavior over time",
          "Establishes baselines per signal: averages, variance, trend slope, basic seasonality",
        ],
        tech: ["Pandas / NumPy", "Rolling windows", "EWMA (exponentially weighted moving averages)"],
        note: 'Most tools check "value > threshold". PulseIQ checks "is behavior changing?"',
      },
      {
        title: "Degradation & Drift Detection",
        what: [
          "Detects slow regressions, sustained pressure, variance collapse / explosion",
          "Catches abnormal smoothness, the silent-failure case",
        ],
        tech: ["Z-score trend deviation", "Slope change detection", "Variance shift detection", "Rule-driven heuristics"],
      },
      {
        title: "Risk Scoring Engine",
        what: [
          "Combines multiple weak signals into a single risk score",
          "Inputs: trend drift, duration, severity, confidence",
        ],
        tech: ["Weighted scoring model", "Configurable rule weights", "No black-box ML"],
        note: "Managers understand risk, not raw metrics.",
      },
      {
        title: "Early Warning Feed",
        what: [
          "Surfaces emerging risks and degradation summaries with confidence",
          "Each warning explains why it fired, evidence, and what to watch next",
        ],
        tech: ["Next.js + React", "TypeScript", "Tailwind CSS"],
        note: "Avoided dashboards entirely and focused on warnings and explanations.",
      },
    ],
    techStack: [
      { group: "Backend / Data", items: ["Python + FastAPI", "PostgreSQL", "DuckDB", "Pandas / NumPy"] },
      { group: "Frontend", items: ["Next.js + React + TypeScript", "Tailwind CSS", "TanStack Query"] },
      { group: "Background Processing", items: ["Scheduled batch jobs", "Async workers"] },
      { group: "AI (optional, summarization only)", items: ["Ollama (local LLM)"] },
      { group: "DevOps", items: ["Docker", "Docker Compose", "GitHub Actions"] },
    ],
    architecture: {
      flow: "Signals → Baseline Engine → Drift Detection → Risk Scoring → Warning Feed",
      components: [
        "Ingestion Layer: collects signals",
        "Baseline Calculator: learns normal patterns",
        "Drift Detector: finds behavioral change",
        "Risk Aggregator: scores risk from multiple signals",
        "UI Feed: surfaces warnings with evidence",
      ],
      explanation:
        "PulseIQ is a layered signal-processing system. Signals are ingested and baselined over time, behavioral drift is detected using statistical methods, multiple weak signals are combined into a risk score, and results are surfaced as early warnings with evidence.",
    },
    dataModel: [
      "signals(id, name, source)",
      "signal_values(signal_id, ts, value)",
      "baselines(signal_id, window, avg, variance, slope)",
      "drifts(signal_id, type, severity, confidence)",
      "risks(id, summary, score, evidence_json, created_at)",
    ],
    challenges: [
      {
        problem: "Too many false positives. Early warnings becoming noise.",
        solution: [
          "Multi-window confirmation before firing",
          "Minimum duration thresholds",
          "Confidence scoring shown on each warning",
        ],
      },
      {
        problem: "Soft signals (drift) are hard to explain.",
        solution: [
          "Narrative templates per drift type",
          "Visual trend comparison built into each warning",
          'Explicit "why this matters" text on every alert',
        ],
      },
      {
        problem: "Long-history queries were slow on raw tables.",
        solution: [
          "DuckDB for analytical queries",
          "Rolling aggregates persisted alongside raw values",
          "Snapshot caching of recent baselines",
        ],
      },
      {
        problem: 'Avoiding the "AI monitoring" hype trap.',
        solution: [
          "Rule-first approach with transparent scoring",
          "AI summarization layered on top only for plain-English warning text",
          "Every score is explainable and tunable",
        ],
      },
    ],
    pitch:
      "PulseIQ is an early-warning system that focuses on behavioral drift rather than threshold breaches. A signal-processing pipeline baselines normal behavior, detects slow regressions and variance shifts, aggregates them into risk scores, and surfaces explainable warnings instead of dashboards. The hardest part was balancing sensitivity with noise. I addressed that using confidence scoring and multi-window confirmation.",
  },
];

export function getProjectBySlug(slug: string) {
  return projectDetails.find((p) => p.slug === slug);
}
