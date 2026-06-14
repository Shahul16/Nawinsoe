import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, MessageCircle, CheckCircle, ArrowRight, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { trackLeadCapture, trackUtmParams } from "@/lib/crm";
import { trackEvent } from "@/lib/analytics";

export default function Contact() {
  const createInquiry = trpc.inquiries.create.useMutation();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [indiaTime, setIndiaTime] = useState("");
  const [ukTime, setUkTime] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    trackUtmParams();
    trackEvent("contact_page_view", {
      lead_source: params.get("lead_source") ?? undefined,
      job_role: params.get("job_role") ?? undefined,
      subject: params.get("subject") ?? undefined,
    });
    if (params.get("subject")) setFormData(p => ({ ...p, subject: params.get("subject")! }));
  }, []);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setIndiaTime(now.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: true }));
      setUkTime(now.toLocaleTimeString("en-GB", { timeZone: "Europe/London", hour: "2-digit", minute: "2-digit", hour12: true }));
    };
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams(window.location.search);
      await createInquiry.mutateAsync({
        name: formData.name, email: formData.email,
        phone: formData.phone || undefined,
        subject: formData.subject || "Contact Inquiry",
        message: formData.message,
        lead_source: params.get("lead_source") ?? undefined,
        job_role: params.get("job_role") ?? undefined,
        utm_source: params.get("utm_source") ?? undefined,
        utm_medium: params.get("utm_medium") ?? undefined,
        utm_campaign: params.get("utm_campaign") ?? undefined,
      });
      trackLeadCapture({ name: formData.name, email: formData.email, phone: formData.phone, preferredCourse: formData.subject });
      toast.success("Message sent!", { description: "Our team will contact you within 24 hours." });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      toast.error("Failed to send.", { description: "Please try WhatsApp or email us directly." });
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9ff]">
      <Navigation />

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[#030f2d] via-[#06226b] to-[#081b4e]">
        <div className="container text-center">
          <span className="inline-block rounded-full bg-[#C59D50]/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#C59D50] mb-5">
            Get In Touch
          </span>
          <h1 className="text-5xl font-bold text-white mb-4">Contact Nawins Education</h1>
          <p className="text-blue-100/85 text-lg max-w-xl mx-auto mb-8">
            Our counselors are ready to guide you. Reach us by WhatsApp, phone, or the form below.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://wa.me/919943738177?text=Hi%20Nawins%20Education%2C%20I%20would%20like%20to%20know%20more%20about%20studying%20abroad."
               target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-3 rounded-full bg-[#25D366] px-8 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-[#20c25c] transition hover:scale-105">
              <MessageCircle className="w-5 h-5" /> WhatsApp Us Now
            </a>
          </div>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="py-14 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="rounded-2xl border border-blue-100 bg-[#f7f9ff] p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                <Mail className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#94a3b8] mb-1">Email</p>
              <a href="mailto:info@nawinsedutech.com" className="text-sm font-semibold text-[#294fca] hover:underline break-all">
                info@nawinsedutech.com
              </a>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-[#f7f9ff] p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
                <span className="text-lg">🇮🇳</span>
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#94a3b8] mb-1">India Office — {indiaTime}</p>
              <a href="tel:+919943738177" className="text-sm font-semibold text-[#294fca] hover:underline block mb-1">
                +91 99437 38177
              </a>
              <a href="https://wa.me/919943738177" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[#25D366] font-semibold hover:underline">
                <MessageCircle className="w-3 h-3" /> WhatsApp
              </a>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-[#f7f9ff] p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                <span className="text-lg">🇬🇧</span>
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#94a3b8] mb-1">UK Office — {ukTime}</p>
              <a href="tel:+447778099414" className="text-sm font-semibold text-[#294fca] hover:underline block">
                +44 77780 99414
              </a>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-[#f7f9ff] p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                <span className="text-lg">🇦🇪</span>
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#94a3b8] mb-1">UAE Office</p>
              <p className="text-sm font-semibold text-[#07173d]">
                +971 58 992 2059
              </p>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-[#f7f9ff] p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <MapPin className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#94a3b8] mb-1">Office</p>
              <p className="text-sm text-[#48608f] leading-snug">
                Marappa Gounder Plaza,<br />West Car Street, Tiruchengode,<br />Tamil Nadu – 637211
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-14 bg-[#f7f9ff]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">

            {/* Form */}
            <div className="rounded-2xl bg-white border border-blue-100 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-[#07173d] mb-2">Send Us a Message</h2>
              <p className="text-sm text-[#48608f] mb-6">We respond within 24 business hours.</p>

              <ul className="space-y-2 mb-7">
                {["Free initial consultation","University shortlisting","Visa & documentation guidance","Scholarship identification"].map(i => (
                  <li key={i} className="flex items-center gap-2 text-sm text-[#355183]">
                    <CheckCircle className="w-4 h-4 text-[#C59D50] flex-shrink-0" />{i}
                  </li>
                ))}
              </ul>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#07173d] mb-1 block">Full Name *</label>
                    <Input name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required className="rounded-xl bg-[#f7f9ff]" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#07173d] mb-1 block">Email *</label>
                    <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@email.com" required className="rounded-xl bg-[#f7f9ff]" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#07173d] mb-1 block">Phone</label>
                    <Input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+91 or +44" className="rounded-xl bg-[#f7f9ff]" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#07173d] mb-1 block">Subject *</label>
                    <Input name="subject" value={formData.subject} onChange={handleChange} placeholder="e.g. UK Masters Enquiry" required className="rounded-xl bg-[#f7f9ff]" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#07173d] mb-1 block">Message *</label>
                  <textarea
                    name="message" value={formData.message} onChange={handleChange} required rows={4}
                    placeholder="Tell us about your academic background and study goals..."
                    className="w-full rounded-xl border border-[#dbe4f0] bg-[#f7f9ff] px-4 py-3 text-sm text-[#07173d] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#294fca]/30 focus:border-[#294fca] transition"
                  />
                </div>
                <Button
                  type="submit" disabled={createInquiry.isPending}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-[#17337d] to-[#2854c8] text-white font-semibold hover:from-[#20449f] hover:to-[#3060d8] transition shadow-md"
                >
                  {createInquiry.isPending
                    ? <span className="flex items-center gap-2"><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />Sending...</span>
                    : <span className="flex items-center gap-2">Send Message <ArrowRight className="w-4 h-4" /></span>
                  }
                </Button>
                <p className="text-xs text-center text-[#94a3b8]">
                  By submitting you agree to our <a href="/privacy" className="underline hover:text-[#294fca]">Privacy Policy</a>.
                </p>
              </form>
            </div>

            {/* Map + hours */}
            <div className="flex flex-col gap-6">
              <div className="rounded-2xl overflow-hidden border border-blue-100 bg-white shadow-sm">
                <iframe
                  title="Nawins Education Office"
                  loading="lazy"
                  className="w-full h-64"
                  src="https://www.google.com/maps?q=No%2059%2F3%20-%2013%2F4%2C%20HDFC%20Bank%20Upstairs%2C%20Marappa%20Gounder%20Plaza%2C%20West%20Car%20Street%2C%20Tiruchengode%20Namakkal%20637211&output=embed"
                />
                <div className="p-4">
                  <p className="text-sm font-semibold text-[#07173d]">Head Office — Tiruchengode</p>
                  <p className="text-xs text-[#48608f]">No 59/3 - 13/4, 3rd Floor, Marappa Gounder Plaza, West Car Street, Tiruchengode, Namakkal – 637211</p>
                </div>
              </div>

              <div className="rounded-2xl bg-[#040F23] p-6 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-[#C59D50]" />
                  <p className="text-sm font-semibold">Office Hours</p>
                </div>
                <div className="space-y-2 text-sm text-blue-100/80">
                  <div className="flex justify-between"><span>Monday – Friday</span><span className="text-white font-medium">9:00 AM – 6:00 PM IST</span></div>
                  <div className="flex justify-between"><span>Saturday</span><span className="text-white font-medium">10:00 AM – 4:00 PM IST</span></div>
                  <div className="flex justify-between"><span>Sunday</span><span className="text-red-400 font-medium">Closed</span></div>
                </div>
                <div className="mt-5 space-y-3">
                  <a href="https://wa.me/919943738177" target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/20 transition">
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />WhatsApp India · +91 99437 38177
                  </a>
                  <a href="https://wa.me/447778099414" target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/20 transition">
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />WhatsApp UK · +44 77780 99414
                  </a>
                  <a href="mailto:info@nawinsedutech.com"
                     className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/20 transition">
                    <Mail className="w-4 h-4 text-[#C59D50]" />info@nawinsedutech.com
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
