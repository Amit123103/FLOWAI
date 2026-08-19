import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlowAI Drone Shop — FPV Components, Industrial Drones, B2B & Services",
  description:
    "India's premier drone ecosystem: FPV components, DJI & heavy lift drones, ATL lab setups, training, and verified B2B wholesale platform.",
  keywords: [
    "FPV drones",
    "DJI drones",
    "Flight controllers",
    "Brushless motors",
    "Drone batteries",
    "Drone lab setup",
    "Atal Tinkering",
    "B2B Drone wholesale",
    "FlowAI Drone Shop",
  ],
  authors: [{ name: "FlowAI Team" }],
  creator: "FlowAI",
  openGraph: {
    title: "FlowAI Drone Shop — FPV Components, Industrial Drones, B2B & Services",
    description:
      "India's premier drone ecosystem: FPV components, DJI & heavy lift drones, ATL lab setups, training, and verified B2B wholesale platform.",
    url: "https://flowai-workspace.dev",
    siteName: "FlowAI Drone Shop",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlowAI Drone Shop — FPV Components, Industrial Drones, B2B & Services",
    description:
      "India's premier drone ecosystem: FPV components, DJI & heavy lift drones, ATL lab setups, training, and verified B2B wholesale platform.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-brand-500/10 selection:text-brand-700">
        {children}
      </body>
    </html>
  );
}
