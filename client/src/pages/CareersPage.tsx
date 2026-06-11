import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useMemo } from "react";
import { Briefcase, MapPin, Clock, Users, GraduationCap, HeartHandshake, TrendingUp } from "lucide-react";

type Role = {
  title: string;
  description: string;
  location: string;
  employmentType: string;
  experienceRequirement: string;
};

export default function Careers() {
  const [, setLocation] = useLocation();

  const roles: Role[] = useMemo(
    () => [
      {
        title: "Student Counsellor",
        description: "Help aspiring students choose the right pathway with empathetic, outcome-driven counselling.",
        location: "India (Tamil Nadu) • UK/Virtual Coordination",
        employmentType: "Full-time",
        experienceRequirement: "0–3 years experience (Freshers welcome with strong communication skills)",
      },
      {
        title: "Relationship Manager",
        description: "Build long-term relationships with university partners and ensure smooth admissions support.",
        location: "India • International Outreach",
        employmentType: "Full-time",
        experienceRequirement: "2–5 years in B2B relationship management or admissions coordination",
      },
      {
        title: "Documentation Executive",
        description: "Maintain document accuracy and coordinate timely processing for admissions and visa readiness.",
        location: "India",
        employmentType: "Full-time",
        experienceRequirement: "1–4 years in documentation, operations, or student services",
      },
      {
        title: "Digital Marketing Executive",
        description: "Create high-converting campaigns and strengthen global visibility through premium content and performance marketing.",
        location: "Hybrid • Remote-friendly",
        employmentType: "Full-time",
        experienceRequirement: "1–4 years in digital marketing, SEO/content, or lead generation",
      },
      {
        title: "Operations Executive",
        description: "Own daily operational excellence and ensure smooth internal workflows across teams.",
        location: "India",
        employmentType: "Full-time",
        experienceRequirement: "1–4 years in operations / process management",
      },
      {
        title: "Business Development Executive",
        description: "Drive partnerships, expand university network, and support growth through strategic outreach.",
        location: "India • International Partnerships",
        employmentType: "Full-time",
        experienceRequirement: "1–5 years in sales/business development (education sector preferred)",
      },
    ],
    []
  );

  const handleApplyNow = (roleTitle: string) => {
    const subject = `Application for ${roleTitle}`;

    const params = new URLSearchParams(window.location.search);
    const utm_source = params.get("utm_source");
    const utm_medium = params.get("utm_medium");
    const utm_campaign = params.get("utm_campaign");
    const landing_page = params.get("landing_page");

    const next = new URLSearchParams({
      subject,
      lead_source: "careers",
      job_role: roleTitle,
      ...(utm_source ? { utm_source } : {}),
      ...(utm_medium ? { utm_medium } : {}),
      ...(utm_campaign ? { utm_campaign } : {}),
      ...(landing_page ? { landing_page } : {}),
    });

    setLocation(`/contact?${next.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#f7f9ff]">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-[#091f54] via-[#163886] to-[#1b47a8]">
        <div className="container">
          <div className="flex items-center gap-4 mb-6">
            <Briefcase className="w-12 h-12 text-white" />
            <h1 className="text-5xl font-bold text-white">Careers at Nawins Education</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-2xl">
            Join a premium international education consultancy and help students move forward with confidence.
          </p>
        </div>
      </section>

      {/* Keep Career Page Content (redesigned but preserving the required sections) */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#07173d] mb-4">Why Join Nawins Education?</h2>
            <p className="text-[#48608f] max-w-2xl mx-auto">
              We hire people who combine empathy, precision, and ambition—so every student journey is handled with care and excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center border border-blue-100/70 bg-white hover:shadow-lg transition-all">
              <HeartHandshake className="w-12 h-12 text-[#17337d] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#07173d] mb-3">Company Culture</h3>
              <p className="text-[#48608f]">Customer-first thinking, respectful communication, and accountability at every step.</p>
            </Card>

            <Card className="p-8 text-center border border-blue-100/70 bg-white hover:shadow-lg transition-all">
              <Users className="w-12 h-12 text-[#17337d] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#07173d] mb-3">Employee Benefits</h3>
              <p className="text-[#48608f]">Performance-based growth, structured onboarding, and supportive team collaboration.</p>
            </Card>

            <Card className="p-8 text-center border border-blue-100/70 bg-white hover:shadow-lg transition-all">
              <TrendingUp className="w-12 h-12 text-[#17337d] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#07173d] mb-3">Growth Opportunities</h3>
              <p className="text-[#48608f]">Clear career pathways and skill development in international education consulting.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-[#f7f9ff]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#07173d] mb-4">Open Positions</h2>
            <p className="text-[#48608f] mb-6 max-w-2xl mx-auto">
              Select a role below and click Apply Now. We’ll redirect you to the contact form with the subject pre-filled.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {roles.map((role) => (
              <Card
                key={role.title}
                className="p-8 border border-blue-100/70 bg-white hover:shadow-lg transition-all flex flex-col h-full"
              >
                <h3 className="text-2xl font-bold text-[#07173d] mb-3">{role.title}</h3>

                <p className="text-[#48608f] mb-5">{role.description}</p>

                <div className="flex flex-col gap-3 mb-6 text-sm text-[#48608f]">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5" />
                    <span>{role.location}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 mt-0.5" />
                    <span>{role.employmentType}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <GraduationCap className="w-4 h-4 mt-0.5" />
                    <span>{role.experienceRequirement}</span>
                  </div>
                </div>

                <Button
                  className="w-full rounded-xl bg-gradient-to-r from-[#17337d] to-[#213a5b] hover:from-[#1c3c8c] hover:to-[#2a5acb]"
                  onClick={() => handleApplyNow(role.title)}
                >
                  Apply Now
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-[#091f54] to-[#163886]">
        <div className="container text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Have Questions?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Reach our HR team for role-related inquiries.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#C59D50] to-[#B78D42] text-[#040F23] font-semibold rounded-full px-8"
            onClick={() => setLocation("/contact")}
          >
            Contact HR
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
