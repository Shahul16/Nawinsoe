import { useState, useRef, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { X, Phone, MessageCircle, Calendar, ChevronRight, Send, Bot, User } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────
type Message = {
  id: number;
  from: "bot" | "user";
  text: string;
  options?: { label: string; action: string }[];
};

// ── Quick-action flows ────────────────────────────────────────────────
const FLOWS: Record<string, Message> = {
  welcome: {
    id: 0, from: "bot",
    text: "Hi! 👋 Welcome to Nawins Education. How can I help you today?",
    options: [
      { label: "🎓 Looking to study abroad", action: "study_abroad" },
      { label: "🇬🇧 Study in the UK",         action: "study_uk"     },
      { label: "📅 Book a consultation",      action: "book"         },
      { label: "📋 Check my eligibility",     action: "eligibility"  },
      { label: "🏫 University partners",      action: "universities" },
    ],
  },
  study_abroad: {
    id: 1, from: "bot",
    text: "Great! We help students study in 19 countries. Where are you interested in?",
    options: [
      { label: "🇬🇧 United Kingdom",  action: "study_uk"        },
      { label: "🇨🇦 Canada",          action: "study_canada"    },
      { label: "🇦🇺 Australia",       action: "study_australia" },
      { label: "🇮🇪 Ireland",         action: "study_ireland"   },
      { label: "🇩🇪 Germany",         action: "study_germany"   },
      { label: "🌍 Other countries",  action: "other_countries" },
    ],
  },
  study_uk: {
    id: 2, from: "bot",
    text: "The UK is our primary market! 🇬🇧 We work with 10+ UK universities including Greenwich, Roehampton, Ulster, and the University of Law. What would you like to know?",
    options: [
      { label: "🎓 Universities we partner with", action: "universities" },
      { label: "📋 Entry requirements",           action: "requirements"  },
      { label: "💳 Education loans (HDFC)",       action: "loans"         },
      { label: "📅 Book free consultation",       action: "book"          },
    ],
  },
  study_canada: {
    id: 3, from: "bot",
    text: "Canada is a great choice! 🇨🇦 Known for post-study work permits (PGWP) and PR pathways. Our counselors can help with Canadian university applications.",
    options: [
      { label: "📅 Book consultation", action: "book"          },
      { label: "💬 WhatsApp us now",   action: "whatsapp"      },
      { label: "🔙 Back to countries", action: "study_abroad"  },
    ],
  },
  study_australia: {
    id: 4, from: "bot",
    text: "Australia offers world-class education with 2-4 year post-study work rights! 🇦🇺 Great for Nursing, Engineering, and Business.",
    options: [
      { label: "📅 Book consultation", action: "book"         },
      { label: "💬 WhatsApp us now",   action: "whatsapp"     },
      { label: "🔙 Go back",           action: "study_abroad" },
    ],
  },
  study_ireland: {
    id: 5, from: "bot",
    text: "Ireland is a gateway to Europe! 🇮🇪 English-speaking, EU-recognised degrees, and a thriving tech industry. Great for Business and IT programmes.",
    options: [
      { label: "📅 Book consultation", action: "book"         },
      { label: "💬 WhatsApp us now",   action: "whatsapp"     },
      { label: "🔙 Go back",           action: "study_abroad" },
    ],
  },
  study_germany: {
    id: 6, from: "bot",
    text: "Germany offers low or no tuition fees at public universities! 🇩🇪 Top for Engineering, Design, and Business. Many English-taught programmes available.",
    options: [
      { label: "📅 Book consultation", action: "book"         },
      { label: "💬 WhatsApp us now",   action: "whatsapp"     },
      { label: "🔙 Go back",           action: "study_abroad" },
    ],
  },
  other_countries: {
    id: 7, from: "bot",
    text: "We cover 19 destinations including UAE, USA, Spain, Italy, Japan, South Korea, Finland, Cyprus, Georgia, Switzerland, Malta, Netherlands, and New Zealand! 🌍",
    options: [
      { label: "📅 Book consultation",    action: "book"        },
      { label: "🗺️ View all destinations", action: "destinations" },
      { label: "💬 WhatsApp us",          action: "whatsapp"    },
    ],
  },
  universities: {
    id: 8, from: "bot",
    text: "We actively partner with these UK universities:\n\n🎓 University of Greenwich\n🎓 University of Roehampton\n🎓 University of East London\n🎓 Ulster University London\n🎓 Univ. of West of Scotland\n🎓 The University of Law\n🎓 University of Chester\n🎓 University of Portsmouth\n🎓 Regent College London",
    options: [
      { label: "📅 Apply through Nawins", action: "book"     },
      { label: "💬 Ask a question",       action: "contact_form" },
    ],
  },
  requirements: {
    id: 9, from: "bot",
    text: "General UK university requirements:\n\n✅ Bachelor's degree (for PG)\n✅ IELTS 6.0 – 6.5 typically\n✅ Academic transcripts\n✅ Statement of Purpose (SOP)\n✅ Financial proof\n\nOur counselors verify your specific eligibility!",
    options: [
      { label: "✅ Check my eligibility", action: "eligibility" },
      { label: "📅 Book consultation",   action: "book"        },
    ],
  },
  loans: {
    id: 10, from: "bot",
    text: "We partner with HDFC Credila for education loans! 💳\n\nCovers tuition + living costs, competitive interest rates, moratorium during studies, and easy documentation through Nawins.",
    options: [
      { label: "📅 Book consultation", action: "book"    },
      { label: "💬 WhatsApp us",       action: "whatsapp" },
    ],
  },
  eligibility: {
    id: 11, from: "bot",
    text: "Let's check your eligibility! Our online checker takes just 2 minutes and shows matching universities instantly. 🎯",
    options: [
      { label: "✅ Go to Eligibility Checker", action: "goto_eligibility" },
      { label: "📋 Free Assessment Form",      action: "goto_assessment"  },
      { label: "💬 Talk to a counselor",       action: "book"             },
    ],
  },
  book: {
    id: 12, from: "bot",
    text: "Book your FREE consultation with our senior counselor! 📅\n\nChoose a slot that works for you via Google Calendar — available 6 days a week.",
    options: [
      { label: "📅 Open calendar booking",  action: "goto_calendar" },
      { label: "💬 WhatsApp instead",       action: "whatsapp"      },
      { label: "📞 Call us now",            action: "call"          },
    ],
  },
  contact_form: {
    id: 13, from: "bot",
    text: "What would you like to know? Type your question below and our team will respond within a few hours. Or contact us directly:",
    options: [
      { label: "💬 WhatsApp: +91 99437 38177", action: "whatsapp" },
      { label: "📞 Call India: +91 99437 38177", action: "call"   },
      { label: "🇬🇧 Call UK: +44 77780 99414",  action: "call_uk" },
    ],
  },
  destinations: { id: 14, from: "bot", text: "Redirecting to our destinations page...", options: [] },
  whatsapp:     { id: 15, from: "bot", text: "Opening WhatsApp...", options: [] },
  call:         { id: 16, from: "bot", text: "Calling +91 99437 38177...", options: [] },
  call_uk:      { id: 17, from: "bot", text: "Calling +44 77780 99414...", options: [] },
};

// ── Side contact panel ────────────────────────────────────────────────
function ContactPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute bottom-16 right-0 w-72 rounded-2xl bg-[#1a1a2e] text-white shadow-2xl overflow-hidden z-50">
      <div className="divide-y divide-white/10">
        <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ25CqKjdcao9zckdQXO71Cbvd4PY8330aKP3Bi2mUHeeuPdrR35_CIXi2gEOH5t8nSdQm54IAEN"
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-4 px-5 py-4 hover:bg-white/5 transition group">
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
            <Calendar className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-semibold text-sm">Book an appointment</p>
            <p className="text-xs text-white/60">We'll call you back</p>
          </div>
          <ChevronRight className="w-4 h-4 text-white/40 ml-auto group-hover:text-white transition" />
        </a>

        <a href="tel:+919943738177"
          className="flex items-center gap-4 px-5 py-4 bg-blue-600 hover:bg-blue-700 transition group">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <Phone className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-semibold text-sm">Call India</p>
            <p className="text-xs text-white/80">+91 99437 38177</p>
          </div>
        </a>

        <a href="tel:+447778099414"
          className="flex items-center gap-4 px-5 py-4 hover:bg-white/5 transition group">
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
            <Phone className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-semibold text-sm">Call UK</p>
            <p className="text-xs text-white/60">+44 77780 99414</p>
          </div>
          <ChevronRight className="w-4 h-4 text-white/40 ml-auto group-hover:text-white transition" />
        </a>

        <a href="https://wa.me/919943738177?text=Hi%20Nawins%20Education%2C%20I%20want%20to%20know%20about%20studying%20abroad."
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-4 px-5 py-4 hover:bg-white/5 transition group">
          <div className="w-9 h-9 rounded-full bg-[#25D366]/20 flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
          </div>
          <div>
            <p className="font-semibold text-sm">Study overseas</p>
            <p className="text-xs text-white/60">WhatsApp: +91 99437 38177</p>
          </div>
          <ChevronRight className="w-4 h-4 text-white/40 ml-auto group-hover:text-white transition" />
        </a>

        <a href="https://wa.me/447778099414"
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-4 px-5 py-4 hover:bg-white/5 transition group">
          <div className="w-9 h-9 rounded-full bg-[#25D366]/20 flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
          </div>
          <div>
            <p className="font-semibold text-sm">UK Office</p>
            <p className="text-xs text-white/60">WhatsApp: +44 77780 99414</p>
          </div>
          <ChevronRight className="w-4 h-4 text-white/40 ml-auto group-hover:text-white transition" />
        </a>
      </div>

      <div className="px-5 py-3 border-t border-white/10">
        <a href="/privacy" className="text-xs text-white/40 hover:text-white/70 transition">Privacy Policy</a>
      </div>
    </div>
  );
}

// ── Main Chat Widget ──────────────────────────────────────────────────
export default function NawinsAssistant() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"chat" | "contact">("chat");
  const [messages, setMessages] = useState<Message[]>([FLOWS.welcome]);
  const [inputText, setInputText] = useState("");
  const [nextId, setNextId] = useState(100);
  const bottomRef = useRef<HTMLDivElement>(null);
  const createInquiry = trpc.inquiries.create.useMutation();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMsg = (msg: Message) => setMessages(p => [...p, { ...msg, id: nextId + 1 }]);
  const bumpId = () => setNextId(p => p + 1);

  const handleOption = (action: string) => {
    // Add user choice as a message
    const label = Object.values(FLOWS).flatMap(f => f.options || []).find(o => o.action === action)?.label || action;
    setMessages(p => [...p, { id: nextId, from: "user", text: label }]);
    bumpId();

    // Handle special navigation actions
    if (action === "goto_calendar") {
      window.open("https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ25CqKjdcao9zckdQXO71Cbvd4PY8330aKP3Bi2mUHeeuPdrR35_CIXi2gEOH5t8nSdQm54IAEN", "_blank");
      setTimeout(() => addMsg({ id: 0, from: "bot", text: "Great! I've opened the calendar in a new tab. Pick a slot and our counselor will join you. 📅", options: [{ label: "🔙 Back to main menu", action: "restart" }] }), 400);
      return;
    }
    if (action === "goto_eligibility") { window.location.href = "/eligibility-checker"; return; }
    if (action === "goto_assessment")  { window.location.href = "/free-assessment"; return; }
    if (action === "destinations")     { window.location.href = "/destinations"; return; }
    if (action === "whatsapp") {
      window.open("https://wa.me/919943738177?text=Hi%20Nawins%20Education%2C%20I%20want%20to%20know%20about%20studying%20abroad.", "_blank");
      setTimeout(() => addMsg({ id: 0, from: "bot", text: "Opening WhatsApp... 💬 You can also type your question here.", options: [{ label: "🔙 Main menu", action: "restart" }] }), 400);
      return;
    }
    if (action === "call") { window.location.href = "tel:+919943738177"; return; }
    if (action === "call_uk") { window.location.href = "tel:+447778099414"; return; }
    if (action === "restart") { setMessages([FLOWS.welcome]); return; }

    const next = FLOWS[action];
    if (next) setTimeout(() => addMsg(next), 350);
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;
    const txt = inputText.trim();
    setInputText("");
    setMessages(p => [...p, { id: nextId, from: "user", text: txt }]);
    bumpId();

    // Auto-reply + submit to CRM
    setTimeout(() => {
      addMsg({
        id: 0, from: "bot",
        text: "Thanks for your message! Our team will get back to you within a few hours. 📨 Or connect instantly:",
        options: [
          { label: "💬 WhatsApp now", action: "whatsapp" },
          { label: "📅 Book a call",  action: "book"     },
        ],
      });
    }, 500);

    // Submit to CRM
    try {
      await createInquiry.mutateAsync({
        name: "Chat Widget User",
        email: "chat@nawins.widget",
        subject: "Chat Widget Message",
        message: txt,
        lead_source: "Virtual Assistant Chat",
      });
    } catch { /* silent */ }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">

      {/* ── Chat window ── */}
      {open && mode === "chat" && (
        <div className="w-[340px] rounded-2xl overflow-hidden shadow-2xl flex flex-col bg-white border border-gray-200" style={{ height: "520px" }}>

          {/* Header */}
          <div className="bg-[#040F23] px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#C59D50]/20 flex items-center justify-center flex-shrink-0">
              <Bot className="w-5 h-5 text-[#C59D50]" />
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">Nawins Virtual Assistant</p>
              <span className="inline-flex items-center gap-1 text-[10px] text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" /> Online
              </span>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white transition">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f7f9ff]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                {msg.from === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-[#040F23] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-[#C59D50]" />
                  </div>
                )}
                <div className={`max-w-[80%] ${msg.from === "user" ? "" : ""}`}>
                  <div className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                    msg.from === "user"
                      ? "bg-[#040F23] text-white rounded-br-sm"
                      : "bg-white text-[#07173d] border border-blue-100 rounded-bl-sm shadow-sm"
                  }`}>
                    {msg.text}
                  </div>
                  {msg.options && msg.options.length > 0 && (
                    <div className="mt-2 space-y-1.5">
                      {msg.options.map(opt => (
                        <button
                          key={opt.action}
                          onClick={() => handleOption(opt.action)}
                          className="block w-full text-left rounded-xl border border-[#040F23]/15 bg-white px-3 py-2 text-xs font-semibold text-[#07173d] hover:bg-[#040F23] hover:text-white hover:border-[#040F23] transition-all"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {msg.from === "user" && (
                  <div className="w-7 h-7 rounded-full bg-[#C59D50] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-100 bg-white px-3 py-3 flex items-center gap-2">
            <input
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
              placeholder="Type your question..."
              className="flex-1 rounded-full border border-blue-100 bg-[#f7f9ff] px-4 py-2 text-sm text-[#07173d] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#C59D50] transition"
            />
            <button
              onClick={handleSend}
              className="w-9 h-9 rounded-full bg-[#040F23] flex items-center justify-center hover:bg-[#06226b] transition flex-shrink-0"
            >
              <Send className="w-4 h-4 text-[#C59D50]" />
            </button>
          </div>

          {/* Footer */}
          <div className="bg-white border-t border-gray-100 px-4 py-2 flex items-center justify-between">
            <span className="text-[10px] text-[#94a3b8]">Powered by Nawins Education</span>
            <a href="/privacy" className="text-[10px] text-[#94a3b8] hover:text-[#294fca]">Privacy Policy</a>
          </div>
        </div>
      )}

      {/* ── Contact panel ── */}
      {open && mode === "contact" && (
        <div className="relative">
          <ContactPanel onClose={() => setOpen(false)} />
        </div>
      )}

      {/* ── FAB buttons ── */}
      <div className="flex items-center gap-3">

        {/* Contact / Call button */}
        <button
          onClick={() => { setOpen(p => !p); setMode("contact"); }}
          title="Contact options"
          className="w-14 h-14 rounded-full bg-[#1a1a2e] flex items-center justify-center shadow-xl hover:scale-105 transition-all"
        >
          <Phone className="w-6 h-6 text-white" />
        </button>

        {/* Chat button */}
        <button
          onClick={() => { setOpen(p => mode === "chat" ? !p : true); setMode("chat"); }}
          title="Chat with Nawins Assistant"
          className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C59D50] to-[#B78D42] flex items-center justify-center shadow-xl hover:scale-105 transition-all relative"
        >
          <Bot className="w-7 h-7 text-white" />
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full border-4 border-[#C59D50]/40 animate-ping" />
        </button>
      </div>

    </div>
  );
}
