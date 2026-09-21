"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Bot,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  HelpCircle,
  MessageCircle,
  Phone,
  RotateCcw,
  Search,
  Send,
  Sparkles,
  X,
} from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  suggestions?: string[];
  actionLink?: {
    label: string;
    url: string;
    external?: boolean;
  };
};

type FAQItem = {
  id: string;
  question: string;
  answer: string;
  category: "all" | "speed-limiter" | "gps" | "booking" | "fleet";
  tags: string[];
};

const FAQ_LIST: FAQItem[] = [
  {
    id: "frsc-limiter",
    category: "speed-limiter",
    question: "Are your speed limiters FRSC approved and certified?",
    answer:
      "Codcknet provides speed-limiting solutions configured during installation and calibration according to regulatory and client requirements. Contact our team for certification and compliance details.",
    tags: ["frsc", "speed limiter", "certificate", "compliance", "son", "approved", "police", "vio"],
  },
  {
    id: "gps-tracking",
    category: "gps",
    question: "How does Codcknet GPS vehicle tracking work across Nigeria?",
    answer:
      "GPS tracking provides real-time location, trip and route history, current speed, overspeed alerts, area-based alerts, geofencing, and multi-vehicle monitoring through a mobile application and web dashboard. It requires mobile network connectivity.",
    tags: ["gps", "tracking", "tracker", "location", "real time", "engine", "nigeria"],
  },
  {
    id: "booking-installation",
    category: "booking",
    question: "How do I book an installation for my vehicle or fleet?",
    answer:
      "Installation takes a maximum of 3 hours depending on the vehicle model. It is handled by authorised Codcknet technicians and can be done at your preferred location or a selected technician workshop. Book online or contact us on WhatsApp at 07074526007 or by phone at 07040272129.",
    tags: ["book", "booking", "install", "installation", "schedule", "whatsapp", "phone", "location"],
  },
  {
    id: "fleet-monitoring",
    category: "fleet",
    question: "Can I manage and monitor multiple fleet vehicles from one dashboard?",
    answer:
      "Yes. Fleet management supports a centralised multi-vehicle dashboard, multiple manager accounts, driver identification, fleet reporting, idle-time monitoring, harsh braking and acceleration alerts, maintenance reminders, and report exporting. Fuel monitoring requires compatible dedicated sensors and is not standard.",
    tags: ["fleet", "multiple", "vehicles", "trucks", "buses", "fuel", "driver", "reports", "dashboard"],
  },
  {
    id: "pricing-quote",
    category: "booking",
    question: "How much does speed limiter installation or GPS tracking cost?",
    answer:
      "Pricing varies by device type, quantity, package, and installation location. GPS tracking also requires a monthly or yearly subscription unless bundled. Contact our team for a custom quote; fleet and bulk discounts are available.",
    tags: ["cost", "price", "pricing", "quote", "discount", "fee", "how much", "naira", "rate"],
  },
  {
    id: "warranty-support",
    category: "speed-limiter",
    question: "What warranty and after-sales support do you provide?",
    answer:
      "Codcknet technical support handles faults, repairs, and warranty replacements. Contact the team directly for support using WhatsApp at 07074526007 or phone at 07040272129.",
    tags: ["warranty", "support", "guarantee", "repair", "service", "maintenance", "help", "technical"],
  },
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    role: "assistant",
    content:
      "Hello! I am Codcknet's AI Assistant. How can I help you today with speed limiters, GPS tracking, or fleet solutions in Nigeria?",
    suggestions: [
      "Are speed limiters FRSC approved?",
      "How does GPS tracking work?",
      "How to book an installation?",
      "Chat on WhatsApp directly",
    ],
  },
];

function findLocalAnswer(query: string): { answer: string; link?: { label: string; url: string; external?: boolean } } | null {
  const q = query.toLowerCase().trim();

  if (/whatsapp|chat|phone|call|contact|number/.test(q)) {
    return {
      answer: "You can reach our team directly on WhatsApp or phone:\n• WhatsApp: +234 707 452 6007\n• Phone / Helpline: +234 704 027 2129\n• Email: info@codcknet.com",
      link: {
        label: "Chat on WhatsApp (+234 707 452 6007)",
        url: "https://wa.me/2347074526007?text=Hello%20Codcknet,%20I%20have%20an%20enquiry",
        external: true,
      },
    };
  }

  if (/book|schedule|order|buy/.test(q)) {
    return {
      answer: "You can easily schedule a certified installation online or chat with our booking team on WhatsApp for fast scheduling anywhere in Nigeria.",
      link: {
        label: "Go to Book Online Page",
        url: "/book-online",
      },
    };
  }

  for (const item of FAQ_LIST) {
    const isTagMatch = item.tags.some((tag) => q.includes(tag));
    const isWordMatch = item.question.toLowerCase().split(" ").some((w) => w.length > 3 && q.includes(w));

    if (isTagMatch || isWordMatch) {
      return {
        answer: item.answer,
        link: {
          label: "Discuss with an expert on WhatsApp",
          url: "https://wa.me/2347074526007",
          external: true,
        },
      };
    }
  }

  return null;
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"faq" | "chat">("faq");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "speed-limiter" | "gps" | "booking" | "fleet">("all");
  const [openAccordionId, setOpenAccordionId] = useState<string | null>("frsc-limiter");

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Smooth scroll to chat bottom
  useEffect(() => {
    if (isOpen && activeTab === "chat") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, activeTab, messages.length, isLoading]);

  const filteredFaqs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return FAQ_LIST.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.tags.some((t) => t.includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleSendMessage = useCallback(async (messageText: string) => {
    const text = messageText.trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = { role: "user", content: text };
    
    // Clear previous chat messages immediately so only the active query is shown
    setMessages([userMessage]);
    setInput("");

    // 1. Check local match first for instant UI response
    const localMatch = findLocalAnswer(text);
    if (localMatch) {
      setMessages([
        userMessage,
        {
          role: "assistant",
          content: localMatch.answer,
          actionLink: localMatch.link,
          suggestions: ["Ask another question", "Check other FAQs", "Talk on WhatsApp"],
        },
      ]);
      return;
    }

    // 2. Fetch from AI Endpoint if no instant local match found
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: [userMessage],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        let assistantText = data?.response || data?.answer || data?.message;

        if (typeof assistantText === "string" && assistantText.trim()) {
          let cleanContent = assistantText.trim();
          let actionLink: { label: string; url: string; external?: boolean } | undefined = undefined;

          if (cleanContent.includes("REDIRECT_WHATSAPP")) {
            cleanContent = cleanContent.replace(/REDIRECT_WHATSAPP/g, "").trim();
            actionLink = {
              label: "Chat with Admin on WhatsApp (+234 707 452 6007)",
              url: `https://wa.me/2347074526007?text=${encodeURIComponent("Hello Codcknet Admin, I have an enquiry: " + text)}`,
              external: true,
            };
          }

          setMessages([
            userMessage,
            {
              role: "assistant",
              content: cleanContent,
              actionLink,
              suggestions: actionLink ? ["Chat on WhatsApp", "Ask about Speed Limiters", "Ask about GPS Tracking"] : ["Ask another question", "Talk to Admin on WhatsApp", "How to book installation"],
            },
          ]);
          return;
        }
      }
    } catch {
      // Endpoint error handled gracefully by fallback response below
    } finally {
      setIsLoading(false);
    }

    // 3. Fallback when AI endpoint fails or returns unhandled responses
    setMessages([
      userMessage,
      {
        role: "assistant",
        content:
          "Thank you for reaching out! For specific questions about speed limiters, GPS tracking devices, pricing, or fleet setups, our engineering support team is readily available on WhatsApp and phone.",
        actionLink: {
          label: "Chat with Engineer on WhatsApp (+234 707 452 6007)",
          url: `https://wa.me/2347074526007?text=${encodeURIComponent("Hello Codcknet, I have an enquiry: " + text)}`,
          external: true,
        },
        suggestions: ["FRSC Speed Limiters", "GPS Tracking Features", "How to Book"],
      },
    ]);
  }, [isLoading]);

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleSendMessage(input);
  }

  return (
    <aside
      aria-label="Codcknet FAQ and Chat Assistant"
      className="codcknet-chat-widget"
    >
      {/* Expanded FAQ & Chatbot Window */}
      {isOpen && (
        <div
          id="codcknet-chat-window"
          role="dialog"
          aria-modal="false"
          aria-label="Codcknet FAQ & Support Assistant"
          className="codcknet-chat-window-box animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          {/* Header */}
          <header className="codcknet-chat-header">
            <div className="codcknet-chat-header-top">
              <div className="brand dark-brand">
                <img
                  className="brand-mark !w-[38px] !h-[38px] !rounded-[8px]"
                  src="/images/image.png"
                  alt="Codcknet logo"
                />
                <div className="flex flex-col">
                  <span className="brand-name !text-[13px] leading-tight">
                    Codcknet <small className="!text-[8px] !text-[#8290a4]">Nigeria Limited</small>
                  </span>
                  <span className="dark-kicker !text-[8.5px] !gap-1.5 mt-1">
                    <i /> Certified Support
                  </span>
                </div>
              </div>

              <button
                aria-label="Close Assistant window"
                className="codcknet-chat-close-btn"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                <X size={16} />
              </button>
            </div>

            {/* View Tabs */}
            <div className="codcknet-chat-tabs">
              <button
                type="button"
                onClick={() => setActiveTab("faq")}
                className={`codcknet-chat-tab-btn ${activeTab === "faq" ? "active" : ""}`}
              >
                <HelpCircle size={13} />
                <span>Frequently Asked</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("chat")}
                className={`codcknet-chat-tab-btn ${activeTab === "chat" ? "active" : ""}`}
              >
                <Sparkles size={13} />
                <span>Ask AI Chat</span>
              </button>
            </div>
          </header>

          {/* TAB 1: FAQ ACCORDION & SEARCH */}
          {activeTab === "faq" && (
            <div className="flex-1 flex flex-col min-h-0 bg-[#060c14]">
              {/* Search & Category Filter */}
              <div className="p-3 border-b border-[rgba(148,163,184,0.12)] bg-[#0b1420]/80 space-y-2">
                <div className="relative flex items-center">
                  <Search size={13} className="absolute left-3 text-[#78879a] pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search certified FAQ topics..."
                    className="w-full pl-8 pr-7 py-1.5 text-xs rounded-[6px] bg-[#111c2a] border border-[#253950] text-slate-100 placeholder:text-[#78879a] focus:outline-none focus:border-[#5f9df8] focus:ring-1 focus:ring-[#5f9df8]"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 text-[#78879a] hover:text-white text-xs"
                      aria-label="Clear search"
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 codcknet-chat-scroll text-[10px]">
                  {[
                    { id: "all", label: "All" },
                    { id: "speed-limiter", label: "Speed Limiters" },
                    { id: "gps", label: "GPS Tracking" },
                    { id: "booking", label: "Booking" },
                    { id: "fleet", label: "Fleet" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id as typeof selectedCategory)}
                      className={`shrink-0 px-2.5 py-1 rounded-[5px] font-bold uppercase tracking-wider transition-colors ${
                        selectedCategory === cat.id
                          ? "bg-[var(--blue)] text-white"
                          : "bg-[#111c2a] text-[#8e9bad] hover:text-white border border-[#253950]"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* FAQ Accordion List */}
              <div className="flex-1 overflow-y-auto codcknet-chat-scroll p-3 space-y-2">
                {filteredFaqs.length === 0 ? (
                  <div className="py-8 text-center text-xs text-[#8e9bad]">
                    <HelpCircle size={26} className="mx-auto mb-2 text-[#526379]" />
                    <p>No questions matched your search.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("all");
                      }}
                      className="mt-2 text-[#5f9df8] hover:underline text-xs font-semibold"
                    >
                      View all questions
                    </button>
                  </div>
                ) : (
                  filteredFaqs.map((faq) => {
                    const isOpenAccordion = openAccordionId === faq.id;
                    return (
                      <div
                        key={faq.id}
                        className="rounded-[8px] border border-[#1e2d40] bg-[#0c1522] overflow-hidden transition-all duration-200"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenAccordionId(isOpenAccordion ? null : faq.id)}
                          className="w-full flex items-start justify-between gap-2 p-3 text-left hover:bg-white/[0.03] transition-colors"
                          aria-expanded={isOpenAccordion}
                        >
                          <span className="text-xs font-bold text-[#e3ecfb] leading-snug">
                            {faq.question}
                          </span>
                          <span className="shrink-0 text-[#78879a] mt-0.5">
                            {isOpenAccordion ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </span>
                        </button>
                        {isOpenAccordion && (
                          <div className="px-3 pb-3 pt-1 text-[11.5px] text-[#9aa8ba] leading-relaxed border-t border-[rgba(255,255,255,0.06)] bg-[#070e17]">
                            <p>{faq.answer}</p>
                            <div className="mt-2.5 pt-2 border-t border-white/5 flex flex-wrap items-center gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveTab("chat");
                                  handleSendMessage(faq.question);
                                }}
                                className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#5f9df8] hover:text-white"
                              >
                                <Sparkles size={11} /> Ask in chat
                              </button>
                              <a
                                href={`https://wa.me/2347074526007?text=${encodeURIComponent(
                                  "Hello Codcknet, regarding: " + faq.question
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#48d597] hover:text-emerald-300 ml-auto"
                              >
                                <MessageCircle size={11} /> WhatsApp
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Quick Contact Footer Banner */}
              <div className="p-2.5 bg-[#0b1420] border-t border-[rgba(148,163,184,0.14)] flex items-center justify-between gap-2">
                <a
                  href="https://wa.me/2347074526007?text=Hello%20Codcknet%20Team,%20I%20have%20an%20enquiry."
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-[6px] bg-[#142333] border border-[#2f5c97] hover:bg-[#1b3555] text-white text-[10px] font-extrabold uppercase tracking-wider transition-colors"
                >
                  <MessageCircle size={13} className="text-[#48d597]" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href="/book-online#contact"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-[6px] bg-[var(--blue)] hover:bg-[#1b63db] text-white text-[10px] font-extrabold uppercase tracking-wider transition-colors"
                >
                  <span>Book Online</span>
                  <ArrowRight size={12} />
                </a>
              </div>
            </div>
          )}

          {/* TAB 2: INTERACTIVE AI CHAT */}
          {activeTab === "chat" && (
            <div className="flex-1 flex flex-col min-h-0 bg-[#060c14]">
              {/* Chat Sub-Header / New Chat Action */}
              <div className="px-3 py-1.5 bg-[#0b1420]/90 border-b border-[rgba(148,163,184,0.1)] flex items-center justify-between text-[10.5px]">
                <span className="text-[#8898aa] flex items-center gap-1">
                  <Sparkles size={11} className="text-[#5f9df8]" /> AI Support
                </span>
                <button
                  type="button"
                  onClick={() => setMessages(INITIAL_MESSAGES)}
                  className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#78879a] hover:text-[#5f9df8] transition-colors"
                  title="Start a new conversation"
                >
                  <RotateCcw size={10} />
                  <span>New Chat</span>
                </button>
              </div>

              {/* Message List */}
              <div className="flex-1 overflow-y-auto codcknet-chat-scroll p-3 space-y-3" aria-live="polite">
                {messages.map((chatMessage, index) => (
                  <div
                    key={index}
                    className={`flex flex-col ${chatMessage.role === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[88%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed ${
                        chatMessage.role === "user"
                          ? "rounded-br-none bg-[var(--blue)] text-white font-normal shadow-md shadow-blue-900/30"
                          : "rounded-bl-none bg-[#0e1724] border border-[#203248] text-[#e3ecfb]"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{chatMessage.content}</p>

                      {chatMessage.actionLink && (
                        <div className="mt-2.5 pt-2 border-t border-white/10">
                          <a
                            href={chatMessage.actionLink.url}
                            target={chatMessage.actionLink.external ? "_blank" : undefined}
                            rel={chatMessage.actionLink.external ? "noreferrer" : undefined}
                            className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-[5px] bg-[#1a2d46] hover:bg-[#234167] border border-[#3b5574] text-[#dceaff] font-bold text-[10px] uppercase tracking-wider transition-colors"
                          >
                            <span>{chatMessage.actionLink.label}</span>
                            {chatMessage.actionLink.external ? <ExternalLink size={10} /> : <ArrowRight size={10} />}
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Follow-up Suggestions */}
                    {chatMessage.suggestions && chatMessage.suggestions.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1.5 max-w-[95%]">
                        {chatMessage.suggestions.map((suggestion, sIdx) => (
                          <button
                            key={sIdx}
                            type="button"
                            onClick={() => handleSendMessage(suggestion)}
                            className="text-[10px] font-bold uppercase tracking-wider py-1 px-2.5 rounded-[5px] bg-[#0d1723] hover:bg-[#172c4a] border border-[#25394f] text-[#8bb9ff] transition-colors text-left"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-center gap-2 text-xs text-[#8e9bad] bg-[#0e1724] border border-[#203248] px-3 py-2 rounded-xl rounded-bl-none w-fit">
                    <span className="size-2 rounded-full bg-[#5f9df8] animate-ping" />
                    <span>Analyzing your request...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Form */}
              <form onSubmit={handleFormSubmit} className="p-2.5 bg-[#0b1420] border-t border-[rgba(148,163,184,0.14)]">
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your question or request..."
                    disabled={isLoading}
                    className="flex-1 min-w-0 py-2 px-3 text-xs rounded-[6px] bg-[#111c2a] border border-[#253950] text-slate-100 placeholder:text-[#78879a] focus:outline-none focus:border-[#5f9df8] focus:ring-1 focus:ring-[#5f9df8] disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    aria-label="Send message"
                    className="grid size-8 place-items-center rounded-[6px] bg-[var(--blue)] hover:bg-[#1b63db] disabled:bg-[#14202e] disabled:text-[#526379] text-white transition-colors"
                  >
                    <Send size={13} />
                  </button>
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[9px] text-[#78879a] px-1">
                  <span>Helpline: +234 704 027 2129</span>
                  <a href="tel:+2347074526007" className="hover:text-[#8bb9ff] flex items-center gap-1 font-semibold">
                    <Phone size={9} /> 07074526007
                  </a>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Floating Launcher Action Button (FAB) - Matched to Site Brand */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="codcknet-chat-window"
        aria-label={isOpen ? "Close FAQ and Chatbot Assistant" : "Open FAQ and Chatbot Assistant"}
        className="codcknet-chat-launcher"
      >
        <img
          className="codcknet-chat-launcher-mark"
          src="/images/image.png"
          alt="Codcknet logo mark"
        />

        <div className="codcknet-chat-launcher-text">
          <span className="codcknet-chat-launcher-title">
            {isOpen ? "Close Assistant" : "Codcknet Assistant"}
          </span>
          <span className="codcknet-chat-launcher-sub">
            <i /> {isOpen ? "Tap to hide" : "FAQs & Live Chat"}
          </span>
        </div>

        <div className="ml-1 text-[#8bb9ff]">
          {isOpen ? <X size={15} /> : <ArrowRight size={14} />}
        </div>
      </button>
    </aside>
  );
}