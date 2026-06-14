import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, MessageCircle, CheckCircle, ArrowRight, X } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface CTASectionProps {
  variant?: "default" | "inline" | "floating";
  title?: string;
  subtitle?: string;
  showWhatsApp?: boolean;
  showPhone?: boolean;
  showCalendar?: boolean;
  className?: string;
}

// ── IDP-style Enquiry Modal ──────────────────────────────────────────
function EnquiryModal({ onClose }: { onClose: () => void }) {
  const createInquiry = trpc.inquiries.create.useMutation();
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    destination: "", intake: "", studyLevel: "", budget: "",
  });
  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const DESTINATIONS = ["United Kingdom","Ireland","Germany","Canada","Australia","New Zealand","USA","Netherlands"];
  const INTAKES = ["January 2026","May 2026","September 2026","January 2027","September 2027"];
  const LEVELS = ["Foundation","Undergraduate","Postgraduate / Master's","PhD / Doctorate"];
  const BUDGETS = ["Under ₹15 Lakhs","₹15 – ₹25 Lakhs","₹25 – ₹50 Lakhs","₹50 Lakhs+"];

  const submit = async () => {
    try {
      await createInquiry.mutateAsync({
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        phone: form.phone,
        subject: `Enquiry — ${form.destination || "Study Abroad"}`,
        message: `Destination: ${form.destination} | Intake: ${form.intake} | Level: ${form.studyLevel} | Budget: ${form.budget}`,
        lead_source: "Enquiry Modal",
      });
      setDone(true);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#040F23] to-[#06226b] px-6 py-5 flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">Get Expert Guidance</h3>
            <p className="text-blue-200 text-sm mt-1">Fill in your details — our counselor will contact you within 24 hours</p>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors mt-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-6">
          {done ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-xl font-bold text-[#07173d] mb-2">Enquiry Submitted!</h4>
              <p className="text-[#48608f] text-sm mb-5">Our senior counselor will call you within 24 hours.</p>
              <a href="https://wa.me/919943738177" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#20c25c] transition">
                <MessageCircle className="w-4 h-4" /> Chat on WhatsApp Now
              </a>
            </div>
          ) : step === 1 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#07173d] mb-1.5 block">First Name *</label>
                  <Input value={form.firstName} onChange={e => set("firstName", e.target.value)} placeholder="First name" className="rounded-xl h-10 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#07173d] mb-1.5 block">Last Name *</label>
                  <Input value={form.lastName} onChange={e => set("lastName", e.target.value)} placeholder="Last name" className="rounded-xl h-10 text-sm" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#07173d] mb-1.5 block">Email Address *</label>
                <Input type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="you@email.com" className="rounded-xl h-10 text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#07173d] mb-1.5 block">Mobile Number *</label>
                <div className="flex gap-2">
                  <div className="flex items-center rounded-xl border border-input bg-[#f7f9ff] px-3 text-sm text-[#48608f] h-10 shrink-0">+91</div>
                  <Input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="99999 99999" className="rounded-xl h-10 text-sm flex-1" />
                </div>
              </div>
              <Button
                onClick={() => { if (form.firstName && form.email && form.phone) setStep(2); else toast.error("Please fill all required fields"); }}
                className="w-full h-11 rounded-xl bg-gradient-to-r from-[#17337d] to-[#2854c8] text-white font-semibold">
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#07173d] mb-2 block">Preferred Study Destination *</label>
                <div className="grid grid-cols-2 gap-2">
                  {DESTINATIONS.map(d => (
                    <button key={d} onClick={() => set("destination", d)}
                      className={`text-xs rounded-lg border p-2 text-left transition-all ${form.destination === d ? "border-[#294fca] bg-blue-50 text-[#294fca] font-semibold" : "border-blue-100 text-[#48608f] hover:border-[#294fca]"}`}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#07173d] mb-2 block">Study Level</label>
                  <div className="space-y-1.5">
                    {LEVELS.map(l => (
                      <button key={l} onClick={() => set("studyLevel", l)}
                        className={`w-full text-xs rounded-lg border p-2 text-left transition-all ${form.studyLevel === l ? "border-[#294fca] bg-blue-50 text-[#294fca] font-semibold" : "border-blue-100 text-[#48608f] hover:border-[#294fca]"}`}>
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#07173d] mb-2 block">Intake</label>
                  <div className="space-y-1.5">
                    {INTAKES.map(i => (
                      <button key={i} onClick={() => set("intake", i)}
                        className={`w-full text-xs rounded-lg border p-2 text-left transition-all ${form.intake === i ? "border-[#294fca] bg-blue-50 text-[#294fca] font-semibold" : "border-blue-100 text-[#48608f] hover:border-[#294fca]"}`}>
                        {i}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1 rounded-xl h-10 text-sm">Back</Button>
                <Button onClick={submit} disabled={createInquiry.isPending}
                  className="flex-[2] h-10 rounded-xl bg-gradient-to-r from-[#C59D50] to-[#B78D42] text-[#040F23] font-bold text-sm">
                  {createInquiry.isPending ? "Submitting..." : "Submit Enquiry"}
                </Button>
              </div>
              <p className="text-[10px] text-center text-[#94a3b8]">
                By submitting you agree to our <a href="/privacy" className="underline">Privacy Policy</a>. We'll contact you within 24 hours.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main CTA Section (home page) ─────────────────────────────────────
export default function CTASection({
  variant = "default",
  title = "Ready to Start Your Journey?",
  subtitle = "Book a free consultation with our expert counselors today",
  showWhatsApp = true,
  showPhone = true,
  showCalendar = true,
  className = "",
}: CTASectionProps) {
  const [showModal, setShowModal] = useState(false);

  if (variant === "inline") {
    return (
      <div className={`flex flex-wrap items-center justify-between gap-4 p-4 bg-gradient-to-r from-[#091f54]/10 to-[#163886]/10 rounded-xl border border-[#091f54]/20 ${className}`}>
        <div>
          <p className="font-semibold text-[#07173d]">{title}</p>
          <p className="text-sm text-[#48608f]">{subtitle}</p>
        </div>
        <Button onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-[#C59D50] to-[#B78D42] text-[#040F23] font-semibold rounded-full">
          Free Enquiry <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        {showModal && <EnquiryModal onClose={() => setShowModal(false)} />}
      </div>
    );
  }

  return (
    <>
      {/* Curved section */}
      <div className={`relative overflow-hidden ${className}`}>
        <div className="bg-gradient-to-br from-[#040F23] via-[#06226b] to-[#0a1f5c] py-20 px-4">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-blue-500/10" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#C59D50]/10" />

          <div className="container relative text-center max-w-3xl mx-auto">
            <span className="inline-block rounded-full bg-[#C59D50]/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#C59D50] mb-5">
              Start Today — It's Free
            </span>
            <h2 className="text-4xl font-extrabold text-white mb-4 leading-tight">
              Ready to Start Your<br />Study Abroad Journey?
            </h2>
            <p className="text-blue-100/85 text-lg mb-8 max-w-xl mx-auto">
              Get expert guidance from our certified counselors and turn your study abroad dream into reality.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#C59D50] to-[#B78D42] px-8 py-4 text-base font-bold text-[#040F23] shadow-lg hover:opacity-95 transition hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Free Consultation
              </button>
              <a
                href="https://wa.me/919943738177?text=Hi%20Nawins%20Education%2C%20I%20would%20like%20to%20know%20more%20about%20studying%20abroad."
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-[#20c25c] transition hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>
              <a
                href="tel:+919943738177"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white hover:bg-white/20 transition"
              >
                <Phone className="w-5 h-5" />
                +91 99437 38177
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-blue-200/80">
              {["Free consultation", "Expert guidance", "200+ students guided", "95% visa success rate"].map(t => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#C59D50]" /> {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showModal && <EnquiryModal onClose={() => setShowModal(false)} />}
    </>
  );
}
