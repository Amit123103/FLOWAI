# FlowAI

Premium AI developer workspace landing page.

"Ship AI products without the infrastructure headache."

FlowAI is a focused AI developer workspace designed for engineering teams building, evaluating, deploying, and monitoring AI-powered applications from one unified surface.

---

## Features

- **Interactive Product Dashboard**: Live preview with node-level inspection, pipeline topology, and real-time execution metrics.
- **Workflow Graph Micro-Interaction**: Clickable pipeline nodes (`Input` → `Model` → `Evaluation` → `Deploy`) that dynamically update configuration manifests and telemetry.
- **Product Showcase**: Detailed UI breakdowns for Build, Evaluate, and Monitor stages without fake screenshots.
- **Declarative Code Editor Mockup**: Tabbed editor supporting Workflow (TypeScript), Prompt (Markdown), and Evaluation (Assertion) manifests.
- **Technical & Honest Marketing**: Free from fake testimonials, artificial user counts, and fabricated partner logos.
- **Accessible & Responsive**: Fully responsive from 390px mobile screens to 1440px+ ultra-wide displays with semantic HTML and keyboard accessibility.
- **Easter Egg**: Secret code `FLOW` (or 5 clicks on the logo) triggers an interactive developer notification.

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/) & CSS Hardware Accelerated Transitions

---

## Project Structure

```text
flowai/
├── app/
│   ├── globals.css         # Dark theme system, grid backgrounds, accessibility styles
│   ├── layout.tsx          # Root layout with SEO & OpenGraph metadata
│   └── page.tsx            # Composition of all landing page sections
├── components/
│   ├── AnnouncementBar.tsx # Top notification bar with micro-interaction
│   ├── Navbar.tsx          # Responsive sticky navigation & mobile drawer
│   ├── Hero.tsx            # Dominant headline, value prop, and embedded dashboard
│   ├── ProductDashboard.tsx# Core developer workspace UI demonstration
│   ├── WorkflowGraph.tsx   # Interactive pipeline graph with node inspection
│   ├── ProductShowcase.tsx # Deep dive into Build, Evaluate, and Monitor
│   ├── FeatureSection.tsx  # Grid of 6 developer-focused capabilities
│   ├── FeatureCard.tsx     # Reusable feature card with category badges
│   ├── WorkflowSection.tsx # 3-step shipping lifecycle with visual connectors
│   ├── CodePreview.tsx     # Code/prompt editor with interactive tabs
│   ├── CTASection.tsx      # Final conversion section without false urgency
│   ├── Footer.tsx          # Clean, structured navigation footer
│   └── EasterEgg.tsx       # Easter egg triggered via 'FLOW' key sequence
├── lib/
│   ├── data.ts             # Structured TypeScript data for features & metrics
│   └── utils.ts            # Utility functions for class merging (clsx + tailwind-merge)
├── README.md               # Project documentation
├── DECISIONS.md            # Architecture, trade-offs, and verification log
├── tailwind.config.ts      # Custom dark color palette and spacing
└── package.json            # Scripts and dependencies
```

---

## Running Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Production Build

1. **Build the production bundle**:
   ```bash
   npm run build
   ```

2. **Start the production server**:
   ```bash
   npm start
   ```

---

## Deployment Instructions

This project is configured for one-click deployment on [Vercel](https://vercel.com):

1. Push code to your GitHub repository.
2. Import the repository in Vercel.
3. Keep default settings (`Next.js` framework preset).
4. Deploy.
