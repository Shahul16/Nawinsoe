import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, Clock, MessageCircle, ArrowRight, CheckCircle } from "lucide-react";
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
  const [uaeTime, setUAETime] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const subjectFromUrl = params.get("subject") ?? "";
    const leadSourceFromUrl = params.get("lead_source") ?? "";
    const jobRoleFromUrl = params.get("job_role") ?? "";
    const landingPageFromUrl = params.get("landing_page") ?? "";

    // Track utm params (event-only) as before
    trackUtmParams();

    // Track contact page view with career/student prefill metadata (if present)
    trackEvent("contact_page_view", {
      lead_source: leadSourceFromUrl || undefined,
      job_role: jobRoleFromUrl || undefined,
      landing_page: landingPageFromUrl || undefined,
      subject: subjectFromUrl || undefined,
    });

    // Prefill subject; preserve normal editing
    if (subjectFromUrl) {
      setFormData((prev) => ({ ...prev, subject: subjectFromUrl }));
    }
  }, []);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setIndiaTime(now.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }));
      setUkTime(now.toLocaleTimeString("en-GB", { timeZone: "Europe/London", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }));
      setUAETime(now.toLocaleTimeString("en-GB", { timeZone: "Asia/Dubai", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams(window.location.search);

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,

        // Primary inquiry subject (not preferredCourse)
        subject: formData.subject || "Contact Inquiry",
        message: formData.message,

        // Lead source tracking for reporting
        lead_source: params.get("lead_source") ?? undefined,
        job_role: params.get("job_role") ?? undefined,
        landing_page: params.get("landing_page") ?? undefined,

        utm_source: params.get("utm_source") ?? undefined,
        utm_medium: params.get("utm_medium") ?? undefined,
        utm_campaign: params.get("utm_campaign") ?? undefined,
      };

      await createInquiry.mutateAsync(payload);

      trackLeadCapture({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        preferredCourse: payload.subject, // keep current client signature; server now stores subject
        university: undefined,
      });

      toast.success("Message sent successfully.", { description: "Our team will contact you within 24 hours." });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to send message.";
      toast.error("Failed to send message.", {
        description: message,
      });
    }
  };

const indiaHours = [
  { id: "in-wd", day: "Monday – Friday", time: "9:00 AM – 6:00 PM", closed: false },
  { id: "in-sat", day: "Saturday", time: "10:00 AM – 4:00 PM", closed: false },
  { id: "in-sun", day: "Sunday", time: "Closed", closed: true },
];

const uaeHours = [
  { id: "uae-wd", day: "Monday – Friday", time: "9:00 AM – 6:00 PM", closed: false },
  { id: "uae-sat", day: "Saturday", time: "10:00 AM – 2:00 PM", closed: false },
  { id: "uae-sun", day: "Sunday", time: "Closed", closed: true },
];

const ukHours = [
  { id: "uk-wd", day: "Monday – Friday", time: "9:30 AM – 6:00 PM", closed: false },
  { id: "uk-sat", day: "Saturday", time: "10:00 AM – 4:00 PM", closed: false },
  { id: "uk-sun", day: "Sunday", time: "Closed", closed: true },
];

  return (
    <div className="min-h-screen bg-[#f7f9ff]">
      <Navigation />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#030f2d] via-[#06226b] to-[#081b4e] py-24">
        <div className="pointer-events-none absolute -top-20 right-0 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-0 h-80 w-80 rounded-full bg-amber-300/15 blur-3xl" />
        <div className="container relative z-10">
          <span className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white/80">
            Get In Touch
          </span>
          <h1 className="mb-4 text-5xl font-extrabold leading-tight text-white lg:text-6xl">
            Contact Nawins Education
          </h1>
          <p className="max-w-xl text-lg text-blue-100/90">
            Reach our counselling team in India or the UK. We're here to guide you every step of your study abroad journey.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://wa.me/919943738177"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp India
            </a>
<a
              href="https://wa.me/447778099414"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/20 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp UK
            </a>
          </div>
        </div>
      </section>

      {/* ── Google Maps + Google Business Profile ───────────────── */}
      <section className="py-16 bg-[#f7f9ff]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-[#040F23] mb-4">
                Visit Our Office
              </h2>

              <div className="overflow-hidden rounded-2xl border border-blue-100/70 bg-white shadow-sm">
                {/* Google Maps embed (address-based) */}
                <iframe
                  title="Nawins Education Google Maps"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-[320px] md:h-[400px]"
                  src="https://www.google.com/maps?q=No%2059%2F3%20-%2013%2F4%2C%203rd%20Floor%2C%20HDFC%20Bank%20Upstairs%2C%20Marappa%20Gounder%20Plaza%2C%20West%20Car%20Street%2C%20Tiruchengode%20Namakkal%20637211&output=embed"
                />
              </div>

              <p className="mt-4 text-sm text-[#48608f]">
                Use the map above for directions. We’re happy to help you with your consultation planning.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#040F23] mb-2">
                  Google Business Profile
                </h3>
                <p className="text-sm text-[#48608f] mb-4">
                  See ratings, reviews, and get quick contact actions.
                </p>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=No%2059%2F3%20-%2013%2F4%2C%203rd%20Floor%2C%20HDFC%20Bank%20Upstairs%2C%20Marappa%20Gounder%20Plaza%2C%20West%20Car%20Street%2C%20Tiruchengode%2C%20Namakkal%20637211"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl border border-blue-100/70 bg-white p-5 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B1E4D] text-[#C59D50] font-bold">
                      G
                    </span>
                    <div>
                      <p className="font-semibold text-[#040F23]">Open on Google Maps</p>
                      <p className="text-xs text-[#48608f]">Reviews & directions</p>
                    </div>
                  </div>
                </a>

                <p className="mt-2 text-xs text-[#48608f]">
                  If your GBP link isn’t set yet, replace the placeholder Google Maps CID URL with your real GBP.
                </p>
              </div>

              {/* WhatsApp CTA (single, prominent) */}
              <div className="rounded-2xl bg-gradient-to-r from-[#0B1E4D] to-[#040F23] p-6 text-white border border-white/10">
                <h3 className="text-xl font-bold mb-2">
                  WhatsApp for quick counselling
                </h3>
                <p className="text-sm text-blue-100/90 mb-4">
                  Choose your region and message us instantly.
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href="https://wa.me/919943738177"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C59D50] px-4 py-3 font-semibold text-[#040F23] hover:opacity-95 transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp India
                  </a>
                  <a
                    href="https://wa.me/447778099414"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 font-semibold text-white hover:bg-white/20 transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp UK
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact Cards ─────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Email */}
            <Card className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#294fca]">
                <Mail className="w-6 h-6" />
              </div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#94a3b8]">Email Us</p>
              <p className="mb-1 font-bold text-[#07173d]">General Enquiries</p>
              <a href="mailto:info@nawinsedutech.com" className="text-sm text-[#294fca] hover:underline break-all">
                info@nawinsedutech.com
              </a>
            </Card>

            {/* India Phone */}
            <Card className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                <span className="text-xl">🇮🇳</span>
              </div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#94a3b8]">India Office</p>
              <p className="mb-1 font-bold text-[#07173d]">Namakkal, Tamil Nadu</p>
              <a href="tel:+919943738177" className="text-sm font-semibold text-[#294fca] hover:underline">
                +91 99437 38177
              </a>
            </Card>

            {/* UK Phone */}
            <Card className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <span className="text-xl">🇬🇧</span>
              </div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#94a3b8]">UK Office</p>
              <p className="mb-1 font-bold text-[#07173d]">United Kingdom</p>
              <a href="tel:+447586261118" className="text-sm font-semibold text-[#294fca] hover:underline">
                +44 7778 099414
              </a>
            </Card>

            {/* UAE Phone */}
            <Card className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <span className="text-xl">🇦🇪</span>
              </div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#94a3b8]">UAE Office</p>
              <p className="mb-1 font-bold text-[#07173d]">Dubai, UAE</p>
              <a href="tel:+971589922059" className="text-sm font-semibold text-[#294fca] hover:underline">
                +971 589922059
              </a>
            </Card>

            {/* Address */}
            <Card className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <MapPin className="w-6 h-6" />
              </div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#94a3b8]">Visit Us</p>
              <p className="mb-1 font-bold text-[#07173d]">Head Office</p>
              <p className="text-sm text-[#48608f] leading-relaxed">
                No 59/3 - 13/4, 3rd Floor, HDFC Bank Upstairs, Marappa Gounder Plaza,<br />
                West Car Street, Tiruchengode,<br />
                Namakkal – 637211, Tamil Nadu
              </p>
            </Card>

          </div>
        </div>
      </section>

      {/* ── Office Hours ──────────────────────────────────────────── */}
      <section className="py-16 bg-[#f7f9ff]">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-[#07173d]">Office Hours</h2>
            <p className="mt-2 text-[#48608f]">We operate across three time zones to serve students in India, the UK, and UAE</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">

            {/* India */}
            <Card className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
              <div className="flex items-center justify-between bg-gradient-to-r from-[#ff9933]/10 to-[#138808]/10 border-b border-blue-50 px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🇮🇳</span>
                  <div>
                    <p className="font-bold text-[#07173d]">India Office</p>
                    <p className="text-xs text-[#48608f]">Tamil Nadu · IST (UTC +5:30)</p>
                  </div>
                </div>
                {indiaTime && (
                  <div className="text-right">
                    <p className="text-xs text-[#94a3b8] mb-0.5">Current Time</p>
                    <span className="rounded-lg bg-green-100 px-3 py-1 text-xs font-mono font-bold text-green-700">
                      {indiaTime}
                    </span>
                  </div>
                )}
              </div>
              <div className="divide-y divide-[#f0f4ff] px-6">
                {indiaHours.map((h) => (
                  <div key={h.id} className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#94a3b8]" />
                      <span className="text-sm font-medium text-[#07173d]">{h.day}</span>
                    </div>
                    <span className={`text-sm font-semibold ${h.closed ? "text-red-500" : "text-[#294fca]"}`}>
                      {h.closed ? "Closed" : `${h.time} IST`}
                    </span>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 bg-[#f7f9ff]">
                <a
                  href="tel:+919943738177"
                  className="flex items-center justify-between text-sm font-semibold text-[#294fca] hover:text-[#07173d] transition-colors"
                >
                  <span>📞 +91 99437 38177</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </Card>

            {/* UK */}
            <Card className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
              <div className="flex items-center justify-between bg-gradient-to-r from-[#012169]/10 to-[#C8102E]/10 border-b border-blue-50 px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🇬🇧</span>
                  <div>
                    <p className="font-bold text-[#07173d]">UK Office</p>
                    <p className="text-xs text-[#48608f]">United Kingdom · GMT/BST (auto-adjusts)</p>
                  </div>
                </div>
                {ukTime && (
                  <div className="text-right">
                    <p className="text-xs text-[#94a3b8] mb-0.5">Current Time</p>
                    <span className="rounded-lg bg-blue-100 px-3 py-1 text-xs font-mono font-bold text-blue-700">
                      {ukTime}
                    </span>
                  </div>
                )}
              </div>
              <div className="divide-y divide-[#f0f4ff] px-6">
                {ukHours.map((h) => (
                  <div key={h.id} className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#94a3b8]" />
                      <span className="text-sm font-medium text-[#07173d]">{h.day}</span>
                    </div>
                    <span className={`text-sm font-semibold ${h.closed ? "text-red-500" : "text-[#294fca]"}`}>
                      {h.closed ? "Closed" : `${h.time} GMT/BST`}
                    </span>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 bg-[#f7f9ff]">
                 <a href="tel:+447586261118"
                    className="flex items-center justify-between text-sm font-semibold text-[#294fca] hover:text-[#07173d] transition-colors"
                  >
                    <span>📞 +44 7778 099414</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </Card>

              {/* UAE */}
              <Card className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
                <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 border-b border-blue-50 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🇦🇪</span>
                    <div>
                      <p className="font-bold text-[#07173d]">UAE Office</p>
                      <p className="text-xs text-[#48608f]">Dubai · GST (UTC +4)</p>
                    </div>
                  </div>
                  {uaeTime && (
                    <div className="text-right">
                      <p className="text-xs text-[#94a3b8] mb-0.5">Current Time</p>
                      <span className="rounded-lg bg-green-100 px-3 py-1 text-xs font-mono font-bold text-green-700">
                        {uaeTime}
                      </span>
                    </div>
                  )}
                </div>
                <div className="divide-y divide-[#f0f4ff] px-6">
                  {uaeHours.map((h) => (
                    <div key={h.id} className="flex items-center justify-between py-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#94a3b8]" />
                        <span className="text-sm font-medium text-[#07173d]">{h.day}</span>
                      </div>
                      <span className={`text-sm font-semibold ${h.closed ? "text-red-500" : "text-[#294fca]"}`}>
                        {h.closed ? "Closed" : `${h.time} GST`}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="px-6 py-4 bg-[#f7f9ff]">
                  <a
                    href="tel:+971589922059"
                    className="flex items-center justify-between text-sm font-semibold text-[#294fca] hover:text-[#07173d] transition-colors"
                  >
                    <span>📞 +971 589922059</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </Card>

            </div>
        </div>
      </section>

      {/* ── Contact Form + Info Side-by-Side ─────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start max-w-6xl mx-auto">

            {/* Left — Info Panel */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-[#07173d] mb-3">Send Us a Message</h2>
                <p className="text-[#48608f]">
                  Fill in the form and one of our senior counsellors will respond within 24 business hours.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  "Free initial consultation",
                  "University shortlisting support",
                  "Visa & documentation guidance",
                  "Scholarship identification",
                  "Pre-departure orientation",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-[#355183]">{item}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-[#030f2d] to-[#06226b] p-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-300 mb-3">Quick Contact</p>
                <div className="space-y-3">
                  <a href="https://wa.me/919943738177" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/20 transition-colors">
                    <MessageCircle className="w-4 h-4 text-green-400" />
                    WhatsApp India &nbsp;·&nbsp; +91 99437 38177
                  </a>
                  <a href="https://wa.me/447778099414" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/20 transition-colors">
                    <MessageCircle className="w-4 h-4 text-green-400" />
                    WhatsApp UK &nbsp;·&nbsp; +44 7778 099414
                  </a>
                  <a href="https://wa.me/971589922059" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/20 transition-colors">
                    <MessageCircle className="w-4 h-4 text-green-400" />
                    WhatsApp UAE &nbsp;·&nbsp; +971 589922059
                  </a>
                  <a href="mailto:info@nawinsedutech.com"
                    className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/20 transition-colors">
                    <Mail className="w-4 h-4 text-amber-300" />
                    info@nawinsedutech.com
                  </a>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className="lg:col-span-3">
              <Card className="rounded-2xl border border-blue-100 bg-white p-8 shadow-md">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-sm font-semibold text-[#07173d]">Full Name <span className="text-red-500">*</span></label>
                      <Input id="name" name="name" placeholder="e.g. Arjun Kumar" value={formData.name} onChange={handleChange} required className="h-11 rounded-xl border-[#dbe4f0] bg-[#f7f9ff] focus:border-[#294fca]" />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-sm font-semibold text-[#07173d]">Email Address <span className="text-red-500">*</span></label>
                      <Input id="email" name="email" type="email" placeholder="you@email.com" value={formData.email} onChange={handleChange} required className="h-11 rounded-xl border-[#dbe4f0] bg-[#f7f9ff] focus:border-[#294fca]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="text-sm font-semibold text-[#07173d]">Phone Number</label>
                      <Input id="phone" name="phone" type="tel" placeholder="+91 or +44" value={formData.phone} onChange={handleChange} className="h-11 rounded-xl border-[#dbe4f0] bg-[#f7f9ff] focus:border-[#294fca]" />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="subject" className="text-sm font-semibold text-[#07173d]">Subject <span className="text-red-500">*</span></label>
                      <Input id="subject" name="subject" placeholder="e.g. UK Masters Enquiry" value={formData.subject} onChange={handleChange} required className="h-11 rounded-xl border-[#dbe4f0] bg-[#f7f9ff] focus:border-[#294fca]" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-sm font-semibold text-[#07173d]">Your Message <span className="text-red-500">*</span></label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your academic background, preferred destination, and how we can help..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full rounded-xl border border-[#dbe4f0] bg-[#f7f9ff] px-4 py-3 text-sm text-[#07173d] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#294fca]/40 focus:border-[#294fca] transition"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={createInquiry.isPending}
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-[#17337d] to-[#2854c8] text-white font-semibold text-sm tracking-wide hover:from-[#20449f] hover:to-[#3060d8] transition-all shadow-md"
                  >
                    {createInquiry.isPending ? (
                      <span className="flex items-center gap-2"><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> Sending...</span>
                    ) : (
                      <span className="flex items-center gap-2">Send Message <ArrowRight className="w-4 h-4" /></span>
                    )}
                  </Button>

                  <p className="text-center text-xs text-[#94a3b8]">
                    By submitting, you agree to our{" "}
                    <a href="/privacy" className="underline hover:text-[#294fca]">Privacy Policy</a>.
                    We respond within 24 business hours.
                  </p>
                </form>
              </Card>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
