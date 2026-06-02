import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Calendar, Clock, User, Mail, Phone, BookOpen, GraduationCap, MapPin } from "lucide-react";

export default function BookConsultation() {
  const [, setLocation] = useLocation();
  const createInquiry = trpc.inquiries.create.useMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryInterest: "",
    courseInterest: "",
    preferredDate: "",
    preferredTime: "",
    notes: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
        preferredCourse: formData.courseInterest || "Consultation Booking",
        message: `Country: ${formData.countryInterest}\nPreferred: ${formData.preferredDate} ${formData.preferredTime}\nNotes: ${formData.notes}`
      });

      toast.success("Consultation booked successfully!", {
        description: "Our team will contact you within 24 hours to confirm your appointment.",
      });
      setFormData({ name: "", email: "", phone: "", countryInterest: "", courseInterest: "", preferredDate: "", preferredTime: "", notes: "" });
    } catch (error) {
      toast.error("Failed to book consultation", {
        description: "Please try again or contact us directly.",
      });
    }
  };

  const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];
  const countries = ["United Kingdom", "Canada", "Australia", "Ireland", "Germany", "France", "Netherlands", "New Zealand"];

  return (
    <div className="min-h-screen bg-[#f7f9ff]">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-[#091f54] via-[#163886] to-[#1b47a8]">
        <div className="container">
          <div className="flex items-center gap-4 mb-6">
            <BookOpen className="w-12 h-12 text-white" />
            <h1 className="text-5xl font-bold text-white">Book Free Consultation</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-2xl">
            Get personalized guidance from our expert counselors for your study abroad journey
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-white">
        <div className="container max-w-4xl">
          <Card className="p-8 md:p-12 border border-blue-100/70 bg-white shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#07173d] mb-4">Schedule Your Session</h2>
              <p className="text-[#48608f]">Choose your preferred date and time - all sessions are free</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-[#07173d] mb-2">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#48608f]" />
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="pl-10 border-blue-100"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#07173d] mb-2">Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#48608f]" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="pl-10 border-blue-100"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Phone and Country */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-[#07173d] mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#48608f]" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone"
                      className="pl-10 border-blue-100"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="countryInterest" className="block text-sm font-semibold text-[#07173d] mb-2">Country of Interest *</label>
                  <select
                    id="countryInterest"
                    name="countryInterest"
                    value={formData.countryInterest}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select country</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Course Interest */}
              <div>
                <label htmlFor="courseInterest" className="block text-sm font-semibold text-[#07173d] mb-2">Course of Interest</label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#48608f]" />
                  <Input
                    id="courseInterest"
                    name="courseInterest"
                    value={formData.courseInterest}
                    onChange={handleChange}
                    placeholder="e.g., Computer Science, MBA, Engineering"
                    className="pl-10 border-blue-100"
                  />
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="preferredDate" className="block text-sm font-semibold text-[#07173d] mb-2">Preferred Date *</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#48608f]" />
                    <Input
                      id="preferredDate"
                      name="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="pl-10 border-blue-100"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="preferredTime" className="block text-sm font-semibold text-[#07173d] mb-2">Preferred Time *</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#48608f]" />
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                      required
                    >
                      <option value="">Select time slot</option>
                      {timeSlots.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="notes" className="block text-sm font-semibold text-[#07173d] mb-2">Additional Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any specific questions or requirements..."
                  rows={4}
                  className="w-full px-4 py-2 border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Submit */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={createInquiry.isPending}
                  className="w-full md:w-auto px-12 py-6 text-lg font-semibold bg-gradient-to-r from-[#17337d] to-[#213a5b] hover:from-[#20449f] hover:to-[#2f61df]"
                >
                  {createInquiry.isPending ? "Booking..." : "Book Free Consultation"}
                </Button>
              </div>

              <p className="text-sm text-center text-[#48608f]">
                By booking, you agree to our <button onClick={() => setLocation("/privacy")} className="text-[#17337d] hover:underline">Privacy Policy</button>
              </p>
            </form>
          </Card>
        </div>
      </section>

      {/* Office Hours */}
      <section className="py-20 bg-[#f7f9ff]">
        <div className="container">
          <Card className="p-8 border border-blue-100/70 bg-white max-w-2xl mx-auto">
            <div className="flex items-start gap-4">
              <Clock className="w-12 h-12 text-[#17337d] flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-[#07173d] mb-4">Office Hours</h3>
                <div className="space-y-2 text-[#48608f]">
                  <p><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM (IST)</p>
                  <p><strong>Saturday:</strong> 10:00 AM - 4:00 PM (IST)</p>
                  <p><strong>Sunday:</strong> Closed</p>
                </div>
                <p className="mt-4 text-sm text-[#48608f]">
                  All consultations are conducted in English. We offer both in-person and virtual sessions.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}