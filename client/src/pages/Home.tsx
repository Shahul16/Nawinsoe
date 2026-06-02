import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { BookOpen, Users, Briefcase, Globe, Award, Heart, GraduationCap, Zap, MessageSquare, MapPin, Search } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MotionWrapper from "@/components/animations/MotionWrapper";
import Reveal from "@/components/animations/Reveal";
import ServicesGrid from "@/components/premium/ServicesGrid";
import Destinations from "@/components/premium/Destinations";
import PartnersWall from "@/components/premium/PartnersWall";
import JourneyTimeline from "@/components/premium/JourneyTimeline";
import TestimonialsPremium from "@/components/premium/TestimonialsPremium";
import ContactFormPremium from "@/components/premium/ContactFormPremium";
import Logo from "@/components/Logo";
import { toast } from "sonner";
import { fallbackTestimonials, fallbackUniversities } from "@/lib/fallbackData";
import CTASection from "@/components/CTASection";

export default function Home() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredCourse: "",
    intakeYear: new Date().getFullYear(),
  });

  const { data: universities = [] } = trpc.universities.list.useQuery();
  const { data: testimonials = [] } = trpc.testimonials.list.useQuery();
  const createInquiry = trpc.inquiries.create.useMutation();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "intakeYear" ? parseInt(value) : value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res: any = await createInquiry.mutateAsync(formData);
      setFormData({ name: "", email: "", phone: "", preferredCourse: "", intakeYear: new Date().getFullYear() });
      if (res?.forwarded) {
        toast.success("Inquiry received.", {
          description: "Lead forwarded to CRM/email. We'll reach out soon.",
        });
      } else {
        toast.success("Inquiry submitted successfully.", {
          description: "Our counselor will contact you soon.",
        });
      }
    } catch (error) {
      toast.error("Failed to submit inquiry.", {
        description: "Please try again in a moment.",
      });
    }
  };

  const mergedUniversities = universities.length > 0 ? universities : fallbackUniversities;
  const mergedTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials;
  const topUniversities = mergedUniversities.slice(0, 6);
  const displayedTestimonials = mergedTestimonials.slice(0, 3);

  const handleSearch = () => {
    const query = searchQuery.trim();
    if (!query) {
      toast.info("Type a course or university to search.");
      return;
    }
    setLocation(`/universities?q=${encodeURIComponent(query)}`);
  };

  const servicesData = [
    { id: "counseling", icon: MessageSquare, title: "Free Counseling", desc: "Expert guidance at every step of your journey" },
    { id: "identification", icon: BookOpen, title: "Course & University Identification", desc: "Find the perfect fit for your goals" },
    { id: "testing", icon: Zap, title: "Test Preparation", desc: "Ace IELTS, TOEFL, GRE, and more" },
    { id: "application", icon: Briefcase, title: "Application & Visa Support", desc: "Seamless application and visa processing" },
  ];

  const benefitsData = [
    { id: "diverse", icon: BookOpen, title: "Diverse Courses", desc: "Explore thousands of programs across all disciplines" },
    { id: "employability", icon: Award, title: "Enhanced Employability", desc: "Graduates are highly sought after by top employers" },
    { id: "language", icon: Globe, title: "Language Immersion", desc: "Improve English skills in a native environment" },
    { id: "exposure", icon: Users, title: "International Exposure", desc: "Connect with students from around the world" },
    { id: "perspective", icon: Zap, title: "Global Perspective", desc: "Develop a multinational mindset and worldview" },
    { id: "experience", icon: Heart, title: "Unforgettable Experience", desc: "Create lifelong memories and meaningful connections" },
  ];

  const coursesData = [
    "Business Administration",
    "Finance & Accounting",
    "Computer Science",
    "Engineering",
    "Law",
    "Medicine",
    "Psychology",
    "Hospitality & Tourism",
    "International Relations",
    "Marketing & Communication",
    "Renewable Energy",
    "Sports Management",
  ];

  return (
    <MotionWrapper className="min-h-screen bg-[#f7f9ff]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#030f2d] via-[#06226b] to-[#081b4e] pb-28 pt-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-12 right-10 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
          <div className="absolute -bottom-16 left-8 h-80 w-80 rounded-full bg-amber-300/20 blur-3xl" />
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="mb-4 inline-flex rounded-full border border-white/10 bg-[rgba(255,255,255,0.04)] px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
                Nawins Education — Premium Placement & Visa Services
              </span>
              <h1 className="mb-6 text-5xl font-extrabold leading-tight text-white lg:text-6xl">
                Your Gateway To Global Education Excellence
              </h1>
              <p className="mb-8 text-lg text-white/90 lg:text-xl">
                Connecting ambitious students with leading universities across the UK, Europe, Canada, Australia and beyond.
              </p>

              {/* CTA Buttons */}
              <div className="mb-8 flex flex-wrap gap-3">
                <Button onClick={() => setLocation('/contact')} className="rounded-full bg-gradient-to-r from-[#C59D50] to-[#B78D42] px-8 py-3 font-semibold text-[#040F23] shadow-lg">
                  Apply Now
                </Button>
                <Button onClick={() => setLocation('/contact')} variant="outline" className="rounded-full border border-white/20 bg-transparent px-6 py-3 text-white">
                  Book Consultation
                </Button>
              </div>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-md">
                <div className="bg-white/6 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-white">5000+</p>
                  <p className="text-sm text-white/80">Students Guided</p>
                </div>
                <div className="bg-white/6 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-white">100+</p>
                  <p className="text-sm text-white/80">University Partners</p>
                </div>
                <div className="bg-white/6 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-white">15+</p>
                  <p className="text-sm text-white/80">Destination Countries</p>
                </div>
                <div className="bg-white/6 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-white">95%</p>
                  <p className="text-sm text-white/80">Visa Success</p>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative mx-auto max-w-md rounded-[2rem] border border-white/20 bg-white/10 p-7 backdrop-blur-md">
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-100">Nawins Education</p>
                  <span className="rounded-full bg-amber-300/20 px-3 py-1 text-xs text-amber-100">Trusted</span>
                </div>
                <div className="glass-surface rounded-3xl p-6">
                  <div className="brand-logo mx-auto rounded-2xl p-3" style={{ maxWidth: 220 }}>
                    <Logo className="mx-auto h-48 w-auto" width={192} height={192} />
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                    <div className="rounded-xl bg-white/60 px-2 py-3">
                      <p className="text-lg font-bold text-[#04133a]">98%</p>
                      <p className="text-xs text-[#3a4d7a]">Visa Success</p>
                    </div>
                    <div className="rounded-xl bg-white/60 px-2 py-3">
                      <p className="text-lg font-bold text-[#04133a]">12+</p>
                      <p className="text-xs text-[#3a4d7a]">Years</p>
                    </div>
                    <div className="rounded-xl bg-white/60 px-2 py-3">
                      <p className="text-lg font-bold text-[#04133a]">5000+</p>
                      <p className="text-xs text-[#3a4d7a]">Students</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Premium Sections (scaffolded components) */}
      <Reveal><ServicesGrid /></Reveal>
      <Reveal delay={0.08}><Destinations /></Reveal>
      <Reveal delay={0.16}><PartnersWall /></Reveal>
      <Reveal delay={0.24}><JourneyTimeline /></Reveal>
      <Reveal delay={0.32}><TestimonialsPremium /></Reveal>
      <Reveal delay={0.36}><ContactFormPremium /></Reveal>

      {/* CTA Section */}
      <section className="py-20 bg-[#f7f9ff]">
        <div className="container">
          <CTASection
            title="Ready to Start Your Study Abroad Journey?"
            subtitle="Get expert guidance from our counselors and turn your dreams into reality"
          />
        </div>
      </section>

    </MotionWrapper>
      <Footer />
    </div>
  );
}
