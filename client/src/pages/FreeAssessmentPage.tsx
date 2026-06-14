import { useState } from "react";
import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { CheckCircle, ArrowRight, Star } from "lucide-react";

const COUNTRIES = ["United Kingdom", "Ireland", "Germany", "Canada", "Australia", "New Zealand", "USA", "Netherlands"];
const QUALIFICATIONS = ["10th Standard", "12th Standard / HSC", "Diploma", "Bachelor's Degree", "Master's Degree"];
const IELTS_OPTIONS = ["7.0+", "6.5", "6.0", "5.5", "Not yet taken", "Planning to take"];
const BUDGETS = ["Under ₹15 Lakhs", "₹15 – ₹25 Lakhs", "₹25 – ₹50 Lakhs", "₹50 Lakhs+"];
const INTAKES = ["January 2026", "May 2026", "September 2026", "January 2027", "September 2027"];

export default function FreeAssessment() {
  const createInquiry = trpc.inquiries.create.useMutation();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    country: "", qualification: "", ielts: "", budget: "", intake: "",
  });

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async () => {
    try {
      await createInquiry.mutateAsync({
        name: form.name, email: form.email, phone: form.phone,
        subject: `Free Assessment — ${form.country}`,
        message: `Country: ${form.country} | Qualification: ${form.qualification} | IELTS: ${form.ielts} | Budget: ${form.budget} | Intake: ${form.intake}`,
        lead_source: "Free Assessment Form",
      });
      setSubmitted(true);
    } catch {
      toast.error("Something went wrong. Please try again or WhatsApp us.");
    }
  };

  if (submitted) return (
    <div className="min-h-screen bg-[#f7f9ff]">
      <Navigation />
      <div className="container py-32 text-center max-w-lg mx-auto">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-[#07173d] mb-3">Assessment Submitted!</h1>
        <p className="text-[#48608f] mb-6">Our senior counselor will review your profile and contact you within 24 hours with your personalised university shortlist.</p>
        <a href="https://wa.me/919943738177" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-3 text-sm font-semibold text-white hover:bg-[#20c25c] transition">
          Chat on WhatsApp
        </a>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f7f9ff]">
      <Navigation />

      <section className="py-16 bg-gradient-to-br from-[#030f2d] via-[#06226b] to-[#081b4e]">
        <div className="container text-center max-w-2xl mx-auto">
          <span className="inline-block rounded-full bg-[#C59D50]/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#C59D50] mb-5">
            Free Service
          </span>
          <h1 className="text-4xl font-bold text-white mb-3">Get Your Free Profile Assessment</h1>
          <p className="text-blue-100/85">Fill in your details and we'll shortlist the best universities for your profile — completely free.</p>
          <div className="flex justify-center gap-2 mt-6">
            {[1,2,3].map(n => (
              <div key={n} className={`h-2 rounded-full transition-all ${n <= step ? "w-12 bg-[#C59D50]" : "w-6 bg-white/20"}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-xl mx-auto">
          <div className="bg-white rounded-2xl border border-blue-100 p-8 shadow-sm">

            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-xl font-bold text-[#07173d]">Your Contact Details</h2>
                <div>
                  <label className="text-xs font-semibold text-[#07173d] mb-1.5 block">Full Name *</label>
                  <Input value={form.name} onChange={e => set("name", e.target.value)} placeholder="Your full name" className="rounded-xl h-11" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#07173d] mb-1.5 block">Email *</label>
                  <Input type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="you@email.com" className="rounded-xl h-11" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#07173d] mb-1.5 block">Phone / WhatsApp *</label>
                  <Input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+91 XXXXXXXXXX" className="rounded-xl h-11" />
                </div>
                <Button onClick={() => { if (form.name && form.email && form.phone) setStep(2); else toast.error("Please fill all fields"); }}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-[#17337d] to-[#2854c8] text-white font-semibold">
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <h2 className="text-xl font-bold text-[#07173d]">Your Academic Profile</h2>
                <div>
                  <label className="text-xs font-semibold text-[#07173d] mb-2 block">Target Country *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {COUNTRIES.map(c => (
                      <button key={c} onClick={() => set("country", c)}
                        className={`text-sm rounded-xl border p-2.5 text-left transition-all ${form.country === c ? "border-[#294fca] bg-blue-50 text-[#294fca] font-semibold" : "border-blue-100 text-[#48608f] hover:border-[#294fca]"}`}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#07173d] mb-2 block">Highest Qualification *</label>
                  <div className="space-y-2">
                    {QUALIFICATIONS.map(q => (
                      <button key={q} onClick={() => set("qualification", q)}
                        className={`w-full text-sm rounded-xl border p-2.5 text-left transition-all ${form.qualification === q ? "border-[#294fca] bg-blue-50 text-[#294fca] font-semibold" : "border-blue-100 text-[#48608f] hover:border-[#294fca]"}`}>
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1 rounded-xl h-11">Back</Button>
                  <Button onClick={() => { if (form.country && form.qualification) setStep(3); else toast.error("Please select country and qualification"); }}
                    className="flex-1 h-11 rounded-xl bg-gradient-to-r from-[#17337d] to-[#2854c8] text-white font-semibold">
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <h2 className="text-xl font-bold text-[#07173d]">Almost done!</h2>
                <div>
                  <label className="text-xs font-semibold text-[#07173d] mb-2 block">IELTS / English Test Score</label>
                  <div className="grid grid-cols-2 gap-2">
                    {IELTS_OPTIONS.map(o => (
                      <button key={o} onClick={() => set("ielts", o)}
                        className={`text-sm rounded-xl border p-2.5 text-left transition-all ${form.ielts === o ? "border-[#294fca] bg-blue-50 text-[#294fca] font-semibold" : "border-blue-100 text-[#48608f] hover:border-[#294fca]"}`}>
                        {o}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#07173d] mb-2 block">Budget Range (Total including tuition + living)</label>
                  <div className="space-y-2">
                    {BUDGETS.map(b => (
                      <button key={b} onClick={() => set("budget", b)}
                        className={`w-full text-sm rounded-xl border p-2.5 text-left transition-all ${form.budget === b ? "border-[#294fca] bg-blue-50 text-[#294fca] font-semibold" : "border-blue-100 text-[#48608f] hover:border-[#294fca]"}`}>
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#07173d] mb-2 block">Preferred Intake</label>
                  <div className="grid grid-cols-2 gap-2">
                    {INTAKES.map(i => (
                      <button key={i} onClick={() => set("intake", i)}
                        className={`text-sm rounded-xl border p-2.5 text-left transition-all ${form.intake === i ? "border-[#294fca] bg-blue-50 text-[#294fca] font-semibold" : "border-blue-100 text-[#48608f] hover:border-[#294fca]"}`}>
                        {i}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1 rounded-xl h-11">Back</Button>
                  <Button onClick={handleSubmit} disabled={createInquiry.isPending}
                    className="flex-1 h-12 rounded-xl bg-gradient-to-r from-[#C59D50] to-[#B78D42] text-[#040F23] font-bold">
                    {createInquiry.isPending ? "Submitting..." : "Get My Free Assessment"}
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#94a3b8]">
                  <Star className="w-3.5 h-3.5 text-[#C59D50]" />
                  Free service · No commitment · Response within 24 hours
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
