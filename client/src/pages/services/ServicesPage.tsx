import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { MessageSquare, BookOpen, Zap, Briefcase, CheckCircle } from "lucide-react";
import CTASection from "@/components/CTASection";

export default function Services() {
  const services = [
    {
      icon: MessageSquare,
      title: "Free Counseling",
      desc: "Expert guidance at every step of your journey",
      details: [
        "Personalized career assessment",
        "University selection based on your profile",
        "Admission strategy planning",
        "One-on-one counseling sessions",
      ],
    },
    {
      icon: BookOpen,
      title: "Course & University Identification",
      desc: "Find the perfect fit for your goals",
      details: [
        "Comprehensive course database",
        "University ranking and comparison",
        "Program suitability analysis",
        "Scholarship opportunities identification",
      ],
    },
    {
      icon: Zap,
      title: "Test Preparation",
      desc: "Ace IELTS, TOEFL, GRE, and more",
      details: [
        "Expert coaching for IELTS & TOEFL",
        "GRE & GMAT preparation",
        "Mock tests and practice sessions",
        "Personalized study plans",
      ],
    },
    {
      icon: Briefcase,
      title: "Application & Visa Support",
      desc: "Seamless application and visa processing",
      details: [
        "Application form assistance",
        "Document preparation and verification",
        "Visa application guidance",
        "Interview preparation",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-[#091f54] via-[#163886] to-[#1b47a8]">
        <div className="container">
          <h1 className="text-5xl font-bold text-white mb-6">Our Services</h1>
          <p className="text-xl text-purple-100 max-w-2xl">
            Comprehensive support for your study abroad journey
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {services.map((service, idx) => (
              <Card key={idx} className="p-8 border-0 bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-lg transition-shadow">
                <service.icon className="w-16 h-16 text-[#17337d] mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h2>
                <p className="text-gray-600 mb-6">{service.desc}</p>
                <ul className="space-y-3">
                  {service.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#C59D50] mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why These Services */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Our Services Matter</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Studying abroad is a significant decision. Our comprehensive services ensure you're supported at every stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "1000+", label: "Students Placed" },
              { number: "750+", label: "Partner Universities" },
              { number: "98%", label: "Success Rate" },
            ].map((stat, idx) => (
              <Card key={idx} className="p-8 border-0 bg-white text-center hover:shadow-lg transition-shadow">
                <p className="text-4xl font-bold text-[#17337d] mb-2">{stat.number}</p>
                <p className="text-gray-600">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <CTASection
            title="Ready to Get Started?"
            subtitle="Book a free consultation with our expert counselors and take the first step towards your dream university"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
