import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { trackLeadCapture, trackUtmParams } from "@/lib/crm";
import { trackEvent } from "@/lib/analytics";

export default function Contact() {
  const createInquiry = trpc.inquiries.create.useMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    // Track UTM parameters on page load
    trackUtmParams();
    trackEvent("contact_page_view");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createInquiry.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        preferredCourse: formData.subject || "Contact Inquiry",
        message: formData.message,
      });

      // Track lead capture
      trackLeadCapture({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        preferredCourse: formData.subject,
      });

      toast.success("Message submitted successfully.", {
        description: "Our team will contact you within 24 hours.",
      });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Failed to submit message.", {
        description: "Please try again in a moment.",
      });
    }
  };

  const contactInfo = [
    {
      id: "email-card",
      icon: Mail,
      title: "Email",
      content: "info@nawinsoe.com",
      href: "mailto:info@nawinsoe.com",
    },
    {
      id: "phone-card",
      icon: Phone,
      title: "Phone (India)",
      content: "+91 99437 38177",
      href: "tel:+919943738177",
    },
    {
      id: "address-card",
      icon: MapPin,
      title: "Address",
      content: "12A - 3rd Floor, HDFC Bank Upstairs, Marappa Gounder Plaza, West Car Street, Tiruchengode, Namakkal – 637211",
      href: null,
    },
  ];

  const officeHours = [
    { id: "hours-weekday", day: "Monday - Friday", time: "9:00 AM - 6:00 PM (IST)" },
    { id: "hours-saturday", day: "Saturday", time: "10:00 AM - 4:00 PM (IST)" },
    { id: "hours-sunday", day: "Sunday", time: "Closed" },
  ];

  return (
    <div className="min-h-screen bg-[#f7f9ff]">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-[#091f54] via-[#163886] to-[#1b47a8]">
        <div className="container">
          <h1 className="text-5xl font-bold text-white mb-6">Contact Nawins Overseas Education</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Get in touch with our team. We're here to help you achieve your study abroad dreams!
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-[#f7f9ff]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Contact Info */}
            {contactInfo.map((info) => (
              <Card key={info.id} className="rounded-3xl border border-blue-100/70 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                <info.icon className="w-12 h-12 text-[#294fca] mb-4" />
                <h3 className="text-xl font-bold text-[#07173d] mb-2">{info.title}</h3>
                {info.href ? (
                  <a href={info.href} className="text-[#48608f] hover:text-[#17337d]">
                    {info.content}
                  </a>
                ) : (
                  <p className="text-[#48608f] text-sm">{info.content}</p>
                )}
              </Card>
            ))}
          </div>

          {/* Office Hours */}
          <Card className="mb-12 rounded-3xl border border-blue-100/70 bg-white p-8">
            <div className="flex items-start gap-4">
              <Clock className="w-12 h-12 text-[#294fca] flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-[#07173d] mb-4">Office Hours</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {officeHours.map((hours) => (
                    <div key={hours.id}>
                      <p className="font-semibold text-[#07173d]">{hours.day}</p>
                      <p className="text-[#48608f]">{hours.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-[#07173d] mb-8 text-center">Send us a Message</h2>
            <p className="mb-6 text-center text-[#48608f]">Our counselors will respond within 24 hours during business hours</p>
            <Card className="glass-surface rounded-3xl border-0 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="sr-only">Your Name</label>
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className="border-blue-100 bg-white/85"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="sr-only">Your Email</label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className="border-blue-100 bg-white/85"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="sr-only">Phone Number</label>
                    <Input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="border-blue-100 bg-white/85"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="sr-only">Subject</label>
                    <Input
                      id="subject"
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className="border-blue-100 bg-white/85"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="sr-only">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    rows={6}
                    className="w-full rounded-lg border border-blue-100 bg-white/85 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={createInquiry.isPending}
                  aria-busy={createInquiry.isPending}
                  className="w-full rounded-full bg-gradient-to-r from-[#17337d] to-[#2854c8] py-3 font-semibold text-white hover:from-[#20449f] hover:to-[#2f61df]"
                >
                  {createInquiry.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
