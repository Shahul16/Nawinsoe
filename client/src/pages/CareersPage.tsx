import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useMemo } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  GraduationCap,
  HeartHandshake,
  Users,
  TrendingUp,
} from "lucide-react";

type Role = {
  title: string;
  description: string;
  location: string;
  employmentType: string;
  experience: string;
};

export default function Careers() {
  const [, setLocation] = useLocation();

  const roles: Role[] = useMemo(
    () => [
      {
        title: "Student Counsellor",
        description:
          "Guide aspiring students with empathetic, outcome-driven counselling to choose the right study destination and university.",
        location: "Tamil Nadu, India · UK/Virtual Coordination",
        employmentType: "Full-time",
        experience: "0–3 years (Freshers welcome with strong communication skills)",
      },
      {
        title: "Relationship Manager",
        description:
          "Build and manage long-term relationships with university partners and ensure smooth admissions support.",
        location: "India · International Outreach",
        employmentType: "Full-time",
        experience: "2–5 years in B2B relationship management or admissions coordination",
      },
      {
        title: "Documentation Executive",
        description:
          "Maintain document accuracy and coordinate timely processing for admissions and visa applications.",
        location: "India",
        employmentType: "Full-time",
        experience: "1–4 years in documentation, operations, or student services",
      },
      {
        title: "Digital Marketing Executive",
        description:
          "Create high-converting campaigns and strengthen global visibility through content and performance marketing.",
        location: "Hybrid · Remote-friendly",
        employmentType: "Full-time",
        experience: "1–4 years in digital marketing, SEO/content, or lead generation",
      },
      {
        title: "Operations Executive",
        description:
          "Own daily operational excellence and ensure smooth internal workflows across counselling and documentation teams.",
        location: "India",
        employmentType: "Full-time",
        experience: "1–4 years in operations or process management",
      },
      {
        title: "Business Development Executive",
        description:
          "Drive partnerships, expand university network, and support growth through strategic institutional outreach.",
        location: "India · International Partnerships",
        employmentType: "Full-time",
        experience: "1–5 years in sales or business development (education sector preferred)",
      },
    ],
    []
  );

  const values = [
    {
      icon: HeartHandshake,
      title: "Student-First Culture",
      description:
        "Customer-first thinking, respectful communication, and accountability at every step.",
    },
    {
      icon: Users,
      title: "Team & Benefits",
      description:
        "Performance-based growth, structured onboarding, and collaborative team environment.",
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description:
        "Clear career pathways and skill development in international education consulting.",
    },
  ];

  const handleApply = (roleTitle: string) => {
    const params = new URLSearchParams({
      subject: `Application for ${roleTitle}`,
      lead_source: "careers",
      job_role: roleTitle,
    });
    setLocation(`/contact?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#f7f9ff]">
      <Navigation />

      {/* Hero */}
      <section className="py-20 bg-gradient-to-r from-[#091f54] via-[#163886] to-[#1b47a8]">
        <div className="container">
          <div className="flex items-center gap-4 mb-6">
            <Briefcase className="w-10 h-10 text-amber-300 flex-shrink-0" />
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              Careers at Nawins Education
            </h1>
          </div>
          <p className="text-lg text-blue-100 max-w-2xl">
            Join a growing international education consultancy and help students achieve their study abroad dreams.
          </p>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#07173d] mb-3">Why Join Nawins Education?</h2>
            <p className="text-[#48608f] max-w-2xl mx-auto">
              We hire people who combine empathy, precision, and ambition — so every student journey is handled with care and excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, description }) => (
              <Card
                key={title}
                className="p-8 text-center border border-blue-100/70 bg-white hover:shadow-lg transition-all"
              >
                <Icon className="w-10 h-10 text-[#17337d] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[#07173d] mb-2">{title}</h3>
                <p className="text-sm text-[#48608f]">{description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-[#f7f9ff]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#07173d] mb-3">Open Positions</h2>
            <p className="text-[#48608f] max-w-xl mx-auto">
              Click Apply Now on any role — we'll pre-fill the contact form with your chosen position.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roles.map((role) => (
              <Card
                key={role.title}
                className="p-7 border border-blue-100/70 bg-white hover:shadow-lg transition-all flex flex-col"
              >
                <h3 className="text-xl font-bold text-[#07173d] mb-2">{role.title}</h3>
                <p className="text-sm text-[#48608f] mb-5 flex-1">{role.description}</p>

                <div className="space-y-2 mb-6 text-sm text-[#48608f]">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#294fca]" />
                    <span>{role.location}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#294fca]" />
                    <span>{role.employmentType}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <GraduationCap className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#294fca]" />
                    <span>{role.experience}</span>
                  </div>
                </div>

                <Button
                  className="w-full rounded-xl bg-gradient-to-r from-[#17337d] to-[#213a5b] hover:from-[#1c3c8c] hover:to-[#2a5acb] text-white"
                  onClick={() => handleApply(role.title)}
                >
                  Apply Now
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#091f54] to-[#163886]">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Have Questions?</h2>
          <p className="text-blue-100 mb-8 max-w-md mx-auto">
            Reach our HR team for role-related enquiries.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#C59D50] to-[#B78D42] text-[#040F23] font-semibold rounded-full px-8"
            onClick={() => setLocation("/contact?subject=HR%20Enquiry&lead_source=careers")}
          >
            Contact HR
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
