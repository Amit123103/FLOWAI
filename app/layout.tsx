import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlowAI — Ship AI Products Without the Infrastructure Headache",
  description:
    "FlowAI is a focused AI developer workspace for building, evaluating, deploying, and monitoring AI applications.",
  keywords: [
    "AI developer workspace",
    "prompt engineering",
    "LLM evaluation",
    "AI observability",
    "production AI deployment",
    "FlowAI",
  ],
  authors: [{ name: "FlowAI Team" }],
  creator: "FlowAI",
  openGraph: {
    title: "FlowAI — Ship AI Products Without the Infrastructure Headache",
    description:
      "Build, evaluate, deploy, and monitor AI applications from one focused developer workspace.",
    url: "https://flowai-workspace.dev",
    siteName: "FlowAI",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlowAI — Ship AI Products Without the Infrastructure Headache",
    description:
      "Build, evaluate, deploy, and monitor AI applications from one focused developer workspace.",
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
