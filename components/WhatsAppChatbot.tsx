"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Sparkles, ExternalLink, HelpCircle } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
  showWhatsAppCta?: boolean;
  whatsappMessage?: string;
}

const KNOWLEDGE_BASE: Record<string, { answer: string; whatsappMsg: string }> = {
  about: {
    answer:
      "**FlowAI** is the all-in-one AI Developer Workspace designed to build, evaluate, deploy, and monitor production-grade AI applications without the infrastructure headache. It unifies visual workflow graphs, live evaluation datasets, latency telemetry, and one-click deployment APIs.",
    whatsappMsg: "Hi FlowAI team! I want to know more about the FlowAI Developer Workspace platform.",
  },
  workflow: {
    answer:
      "FlowAI's **Visual Workflow Builder** lets you connect LLM prompts, vector retriever nodes, Python code runners, and guardrails in an intuitive node canvas. You can test branches in real-time and export to production with 1 click.",
    whatsappMsg: "Hi! I would like to see a demo of FlowAI's Visual Workflow Builder.",
  },
  evals: {
    answer:
      "FlowAI includes **Automated Evals & Monitoring** right out of the box. Track latency, token costs, hallucination scores, response relevance, and trace execution step-by-step across all major model providers (OpenAI, Anthropic, Gemini, DeepSeek, Local LLMs).",
    whatsappMsg: "Hi! I am interested in FlowAI's evaluation metrics and telemetry monitoring tools.",
  },
  integration: {
    answer:
      "FlowAI integrates directly into your existing stack via **TypeScript & Python SDKs**, REST APIs, and native webhooks. You can trigger agent workflows with a single API call and receive streaming responses in under 50ms.",
    whatsappMsg: "Hi FlowAI team! I have technical questions regarding API integration and SDKs.",
  },
  contact: {
    answer:
      "Our developer support and solutions engineering team is available 24/7 on WhatsApp! Click below to connect with us directly.",
    whatsappMsg: "Hi FlowAI team! I would like to speak with a solutions engineer about my project.",
  },
};

const DEFAULT_PHONE_NUMBER = ""; // Custom phone number or empty to let user choose

export default function WhatsAppChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "👋 Hi there! Welcome to **FlowAI** — the developer workspace for shipping AI products without infrastructure headaches.",
      time: "Just now",
    },
    {
      id: "welcome-2",
      sender: "bot",
      text: "Ask me anything about FlowAI, or click below to chat directly with our team on **WhatsApp**!",
      time: "Just now",
      showWhatsAppCta: true,
      whatsappMessage: "Hi FlowAI team! I am exploring your workspace and would like to connect.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
    }
  }, [messages, isOpen]);

  const getWhatsAppUrl = (customText: string) => {
    const text = encodeURIComponent(customText || "Hi FlowAI team, I would like to learn more about FlowAI.");
    return DEFAULT_PHONE_NUMBER
      ? `https://wa.me/${DEFAULT_PHONE_NUMBER}?text=${text}`
      : `https://api.whatsapp.com/send?text=${text}`;
  };

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const lower = query.toLowerCase();
      let reply = "";
      let whatsappPrompt = `Hi FlowAI team, I have a question about: "${query}"`;

      if (lower.includes("what is") || lower.includes("about") || lower.includes("overview")) {
        reply = KNOWLEDGE_BASE.about.answer;
        whatsappPrompt = KNOWLEDGE_BASE.about.whatsappMsg;
      } else if (lower.includes("workflow") || lower.includes("node") || lower.includes("build") || lower.includes("graph")) {
        reply = KNOWLEDGE_BASE.workflow.answer;
        whatsappPrompt = KNOWLEDGE_BASE.workflow.whatsappMsg;
      } else if (lower.includes("eval") || lower.includes("monitor") || lower.includes("metric") || lower.includes("cost") || lower.includes("latency")) {
        reply = KNOWLEDGE_BASE.evals.answer;
        whatsappPrompt = KNOWLEDGE_BASE.evals.whatsappMsg;
      } else if (lower.includes("code") || lower.includes("api") || lower.includes("sdk") || lower.includes("integrate") || lower.includes("python")) {
        reply = KNOWLEDGE_BASE.integration.answer;
        whatsappPrompt = KNOWLEDGE_BASE.integration.whatsappMsg;
      } else if (lower.includes("contact") || lower.includes("whatsapp") || lower.includes("talk") || lower.includes("help") || lower.includes("sales")) {
        reply = KNOWLEDGE_BASE.contact.answer;
        whatsappPrompt = KNOWLEDGE_BASE.contact.whatsappMsg;
      } else {
        reply = `FlowAI empowers engineering teams to build, evaluate, and scale AI workflows seamlessly with prebuilt nodes, evals, and low-latency APIs. Would you like to discuss **"${query}"** directly with our engineering team on WhatsApp?`;
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        showWhatsAppCta: true,
        whatsappMessage: whatsappPrompt,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="flex flex-col w-[360px] sm:w-[390px] h-[520px] max-h-[85vh] bg-slate-950/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden mb-4 animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-700 via-teal-800 to-slate-900 px-4 py-3.5 border-b border-emerald-500/20 flex items-center justify-between text-white shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-md">
                  {/* WhatsApp SVG */}
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-900 rounded-full"></span>
              </div>
              <div>
                <h3 className="font-semibold text-sm flex items-center gap-1.5 leading-tight">
                  FlowAI Assistant
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-medium">
                    AI Bot
                  </span>
                </h3>
                <p className="text-[11px] text-emerald-200/90 font-mono">Typically replies instantly</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <a
                href={getWhatsAppUrl("Hi FlowAI team, I'd like to get in touch!")}
                target="_blank"
                rel="noopener noreferrer"
                title="Direct WhatsApp redirect"
                className="p-1.5 text-emerald-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center gap-1 text-xs font-mono"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-950/80 text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-brand-600/30 border border-brand-500/40 flex items-center justify-center shrink-0 text-brand-300 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className="max-w-[82%] space-y-2">
                  <div
                    className={`px-3.5 py-2.5 rounded-2xl ${
                      msg.sender === "user"
                        ? "bg-brand-600 text-white rounded-br-none shadow-md"
                        : "bg-slate-900/90 border border-slate-800 text-slate-100 rounded-bl-none shadow-sm"
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-line text-[13px]">{msg.text}</p>
                    <span
                      className={`block text-[10px] mt-1 font-mono ${
                        msg.sender === "user" ? "text-brand-200 text-right" : "text-slate-400"
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>

                  {/* Direct WhatsApp CTA Card */}
                  {msg.showWhatsAppCta && (
                    <a
                      href={getWhatsAppUrl(msg.whatsappMessage || "Hi FlowAI team!")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 hover:text-emerald-200 text-xs font-semibold transition-all shadow-sm group w-full justify-between"
                    >
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 fill-emerald-400 shrink-0" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                        </svg>
                        <span>Chat on WhatsApp</span>
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  )}
                </div>

                {msg.sender === "user" && (
                  <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-slate-300 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono pl-9">
                <div className="flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]"></span>
                </div>
                <span>FlowAI Assistant is thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick FAQ Pills */}
          <div className="px-3 py-2 bg-slate-900/90 border-t border-slate-800/80 overflow-x-auto flex gap-1.5 no-scrollbar">
            <button
              onClick={() => handleSend("What is FlowAI?")}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-800 hover:bg-brand-900/60 border border-slate-700/80 hover:border-brand-500/50 text-slate-200 hover:text-white transition-colors shrink-0"
            >
              🚀 What is FlowAI?
            </button>
            <button
              onClick={() => handleSend("How does the Workflow Builder work?")}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-800 hover:bg-brand-900/60 border border-slate-700/80 hover:border-brand-500/50 text-slate-200 hover:text-white transition-colors shrink-0"
            >
              ⚡ Workflow Builder
            </button>
            <button
              onClick={() => handleSend("What are the evaluation & monitoring features?")}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-800 hover:bg-brand-900/60 border border-slate-700/80 hover:border-brand-500/50 text-slate-200 hover:text-white transition-colors shrink-0"
            >
              📊 Evals & Telemetry
            </button>
            <button
              onClick={() => handleSend("Can I talk to your team on WhatsApp?")}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-700/60 text-emerald-300 hover:text-emerald-100 transition-colors shrink-0"
            >
              💬 Connect on WhatsApp
            </button>
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask a question or type a message..."
              className="flex-1 bg-slate-950 border border-slate-700/90 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputValue.trim()}
              className="p-2 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-40 disabled:hover:bg-brand-600 text-white transition-colors shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <div className="relative flex items-center justify-end">
        {/* Tooltip speech bubble when closed */}
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-2 mr-3 px-3 py-1.5 rounded-xl bg-slate-900/95 backdrop-blur-md border border-emerald-500/40 text-slate-100 text-xs shadow-xl font-medium animate-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Ask FlowAI & Chat on WhatsApp</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative group p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center ${
            isOpen
              ? "bg-slate-800 text-white border border-slate-700"
              : "bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-emerald-600/30 hover:shadow-emerald-600/50"
          }`}
          aria-label={isOpen ? "Close WhatsApp chat" : "Open WhatsApp AI chat"}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              {/* Pulsing indicator */}
              <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-slate-950"></span>
              </span>

              {/* WhatsApp Icon */}
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
