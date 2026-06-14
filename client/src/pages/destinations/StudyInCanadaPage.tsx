import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { GraduationCap, MapPin, Clock, DollarSign, CheckCircle, Star, Briefcase, Globe, Home } from "lucide-react";

const QUICK_LINKS = [
  { label: "Scholarships", href: "/scholarships" },
  { label: "Visa Guidance", href: "/visa-guidance" },
  { label: "Student Essentials", href: "/student-essentials" },
];
import CTASection from "@/components/CTASection";
import { useState } from "react";

export default function StudyInCanada() {
  const [, setLocation] = useLocation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "What are the entry requirements for Canadian universities?",
      answer: "Most Canadian universities require a bachelor's degree with 65%+ grades, English proficiency (IELTS 6.5+ or TOEFL 90+), and for some programs, GRE/GMAT scores. Requirements vary by province and institution."
    },
    {
      question: "How much does it cost to study in Canada?",
      answer: "Tuition fees range from CAD 15,000 to CAD 35,000 per year. Living costs are approximately CAD 15,000-20,000 per year. Canada is more affordable than the UK and US while offering excellent education quality."
    },
    {
      question: "Can I work while studying in Canada?",
      answer: "Yes, international students can work up to 20 hours per week during academic sessions and full-time during scheduled breaks. After graduation, the Post-Graduation Work Permit (PGWP) allows you to work for up to 3 years."
    },
    {
      question: "Is Canada good for permanent residency?",
      answer: "Yes, Canada offers excellent PR pathways. The Canadian Experience Class (CEC) and Provincial Nominee Programs (PNP) make it easier for international graduates to transition to permanent residency."
    },
  ];

  const topUniversities = [
    { name: "University of Toronto", ranking: 21, location: "Toronto, ON" },
    { name: "University of British Columbia", ranking: 34, location: "Vancouver, BC" },
    { name: "McGill University", ranking: 30, location: "Montreal, QC" },
    { name: "McMaster University", ranking: 152, location: "Hamilton, ON" },
    { name: "University of Waterloo", ranking: 166, location: "Waterloo, ON" },
    { name: "University of Alberta", ranking: 110, location: "Edmonton, AB" },
  ];

  const popularCourses = [
    "Computer Science & Software Engineering",
    "Data Science & Analytics",
    "Business Administration (MBA)",
    "Engineering (All Streams)",
    "Healthcare & Nursing",
    "Environmental Science",
    "Finance & Accounting",
    "Artificial Intelligence",
  ];

  return (
    <div className="min-h-screen bg-[#f7f9ff]">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-red-700 via-red-600 to-red-500">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white mb-4">
                <Star className="w-4 h-4" />
                Pathway to Permanent Residency
              </span>
              <h1 className="text-5xl font-bold text-white mb-6">
                Study in Canada
              </h1>
              <p className="text-xl text-red-100 mb-8">
                Experience world-class education in one of the world's most welcoming countries. Canada offers excellent post-study work opportunities and a clear pathway to permanent residency.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => setLocation("/contact")}
                  className="bg-white text-red-700 hover:bg-red-50 rounded-full px-8 py-3"
                >
                  Apply Now
                </Button>
                <Button
                  onClick={() => setLocation("/contact")}
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 rounded-full px-8 py-3"
                >
                  Free Consultation
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-white">96</p>
                    <p className="text-red-100">Universities</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-white">3 Years</p>
                    <p className="text-red-100">PGWP Duration</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-white">85%</p>
                    <p className="text-red-100">PR Success Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-white">20 hrs</p>
                    <p className="text-red-100">Work/Week</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Canada Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#07173d] mb-4">Why Study in Canada?</h2>
            <p className="text-xl text-[#48608f] max-w-2xl mx-auto">
              Canada combines academic excellence with quality of life and immigration opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Home, title: "PR Pathway", desc: "Clear pathway to permanent residency after graduation" },
              { icon: DollarSign, title: "Affordable Education", desc: "Lower tuition than UK/US with excellent quality" },
              { icon: Briefcase, title: "Work Opportunities", desc: "Work during studies and get 3-year PGWP after" },
              { icon: Globe, title: "Multicultural Society", desc: "Safe, welcoming environment for international students" },
            ].map((item, idx) => (
              <Card key={idx} className="p-6 border-0 shadow-md hover:shadow-lg transition-shadow">
                <item.icon className="w-12 h-12 text-red-600 mb-4" />
                <h3 className="text-xl font-bold text-[#07173d] mb-2">{item.title}</h3>
                <p className="text-[#48608f]">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top Universities */}
      <section className="py-20 bg-[#f7f9ff]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#07173d] mb-4">Top Canadian Universities</h2>
            <p className="text-xl text-[#48608f]">Study at Canada's most prestigious institutions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topUniversities.map((uni, idx) => (
              <Card key={idx} className="p-6 border border-[#d0d8e8] hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold text-red-600">#{uni.ranking}</span>
                  <MapPin className="w-5 h-5 text-[#48608f]" />
                </div>
                <h3 className="text-lg font-bold text-[#07173d] mb-2">{uni.name}</h3>
                <p className="text-sm text-[#48608f]">{uni.location}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#07173d] mb-4">Popular Courses</h2>
            <p className="text-xl text-[#48608f]">Explore in-demand programs in Canada</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularCourses.map((course, idx) => (
              <Card key={idx} className="p-4 border border-[#d0d8e8] hover:border-red-500 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-[#07173d] font-medium">{course}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Costs & Visa */}
      <section className="py-20 bg-[#f7f9ff]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="p-8 border-0 shadow-md">
              <div className="flex items-center gap-4 mb-6">
                <DollarSign className="w-12 h-12 text-red-600" />
                <h2 className="text-2xl font-bold text-[#07173d]">Costs & Funding</h2>
              </div>
              <ul className="space-y-4">
                <li className="flex justify-between">
                  <span className="text-[#48608f]">Tuition Fees</span>
                  <span className="font-semibold text-[#07173d]">CAD 15,000 - 35,000/year</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[#48608f]">Living Costs</span>
                  <span className="font-semibold text-[#07173d]">CAD 15,000 - 20,000/year</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[#48608f]">Scholarships Available</span>
                  <span className="font-semibold text-green-600">Yes - Multiple Options</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 border-0 shadow-md">
              <div className="flex items-center gap-4 mb-6">
                <MapPin className="w-12 h-12 text-red-600" />
                <h2 className="text-2xl font-bold text-[#07173d]">Visa & Work</h2>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <p className="font-semibold text-[#07173d]">Study Permit</p>
                    <p className="text-sm text-[#48608f]">Valid for program duration</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <p className="font-semibold text-[#07173d]">Work During Studies</p>
                    <p className="text-sm text-[#48608f]">20 hours/week during term</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <p className="font-semibold text-[#07173d]">Post-Graduation Work Permit</p>
                    <p className="text-sm text-[#48608f]">Up to 3 years after graduation</p>
                  </div>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#07173d] mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-[#48608f]">Get answers to common questions about studying in Canada</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <Card key={idx} className="border-0 shadow-md">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between"
                >
                  <span className="font-semibold text-[#07173d] pr-8">{faq.question}</span>
                  <span className={`transform transition-transform ${openFaq === idx ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6">
                    <p className="text-[#48608f]">{faq.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick resources */}
      <section className="py-14 bg-[#f7f9ff]">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {QUICK_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => setLocation(l.href)}
                className="text-left rounded-2xl border border-blue-100 bg-white p-5 hover:border-red-500/50 hover:bg-red-500/5 transition"
              >
                <p className="text-sm font-semibold text-[#07173d]">{l.label}</p>
                <p className="text-xs text-[#48608f] mt-1">Explore guidance & next steps</p>
              </button>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-red-500/25 bg-white p-6">
            <h3 className="text-xl font-bold text-[#07173d] mb-2">Next steps</h3>
            <p className="text-sm text-[#48608f] leading-relaxed">
              Use scholarships page for funding options, then follow visa guidance to prepare your documents.
              If you want exact requirements for your course/intake, book a free consultation.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button onClick={() => setLocation("/free-assessment")} className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6">
                Free Assessment
              </Button>
              <Button
                variant="outline"
                onClick={() => setLocation("/book-consultation")}
                className="border-red-500/50 text-[#07173d] hover:bg-red-600/10 rounded-full px-6"
              >
                Book Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#f7f9ff]">
        <div className="container">
          <CTASection
            title="Start Your Canadian Education Journey"
            subtitle="Get expert guidance on university selection, applications, and visa process"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}