// ============================================================
// Services Data
// ============================================================

import type { ServiceItem } from "@/lib/types";

export const SERVICES: ServiceItem[] = [
  {
    slug: "custom-3d-parts",
    name: "Custom 3D Parts",
    description: "Get custom-designed and 3D-printed drone parts, mounts, adapters, and enclosures tailored to your specific requirements. We support TPU, PLA, PETG, and Nylon materials.",
    icon: "Printer",
  },
  {
    slug: "drone-repair",
    name: "Drone Repair & Customisation",
    description: "Expert drone repair services including motor replacement, ESC diagnostics, frame repair, firmware flashing, PID tuning, and complete custom builds.",
    icon: "Wrench",
  },
  {
    slug: "atal-tinkering",
    name: "Atal Tinkering",
    description: "We help set up and support Atal Tinkering Labs with drone kits, curriculum, training materials, and hands-on workshop facilitation for schools.",
    icon: "GraduationCap",
  },
  {
    slug: "drone-lab-setup",
    name: "Drone Lab Setup",
    description: "End-to-end drone lab infrastructure setup for educational institutions and research organizations including workbenches, tools, safety equipment, and test flight cages.",
    icon: "Building",
  },
  {
    slug: "drone-training",
    name: "Drone Training",
    description: "DGCA-aligned drone pilot training programs covering both theory and practical sessions. Includes beginner, intermediate, and commercial pilot certification courses.",
    icon: "BookOpen",
  },
];
