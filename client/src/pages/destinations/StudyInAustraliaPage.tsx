import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { GraduationCap, MapPin, DollarSign, CheckCircle, Star, Briefcase, Globe, Sun } from "lucide-react";
import CTASection from "@/components/CTASection";
import { useState } from "react";

export default function StudyInAustralia() {
  const [, setLocation] = useLocation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "What are the entry requirements for Australian universities?",
      answer: "Most Australian universities require a bachelor's degree with 60%+ grades, English proficiency (IELTS 6.5+ or TOEFL 79+), and for some programs, GRE/GMAT scores. Requirements vary by university and course."
    },
    {
      question: "How much does it cost to study in Australia?",
      answer: "Tuition fees range from AUD 20,000 to AUD 45,000 per year. Living costs are approximately AUD 21,000-27,000 per year. Australia offers excellent quality of life and strong graduate outcomes."
    },
    {
      question: "Can I work while studying in Australia?",
      answer: "Yes, international students can work up to 48 hours per fortnight during term and unlimited hours during breaks. After graduation, you can apply for a Temporary Graduate visa (subclass 485) to work for 2-4 years."
    },
    {
      question: "Is Australia good for permanent residency?",
      answer: "Yes, Australia offers skilled migration pathways. After gaining work experience, you can apply for permanent residency through the General Skilled Migration program or employer sponsorship."
    },
  ];

  const topUniversities = [
    { name: "University of Melbourne", ranking: 14, location: "Melbourne, VIC" },
    { name: "Australian National University", ranking: 30, location: "Canberra, ACT" },
    { name: "University of Sydney", ranking: 19, location: "Sydney, NSW" },
    { name: "UNSW Sydney", ranking: 43, location: "Sydney, NSW" },
    { name: "Monash University", ranking: 37, location: "Melbourne, VIC" },
    { name: "University of Queensland", ranking: 40, location: "Brisbane, QLD" },
  ];

  const popularCourses = [
    "Engineering (All Streams)",
    "Business & Commerce",
    "Healthcare & Medicine",
    "Information Technology",
    "Environmental Science",
    "Agriculture",
    "Data Science",
    "Hospitality & Tourism",
  ];

  return (
    <div className="min-h-screen bg-[#f7f9ff]">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-700 via-yellow-600 to-yellow-500">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white mb-4">
                <Sun className="w-4 h-4" />
                Exceptional Quality of Life
              </span>
              <h1 className="text-5xl font-bold text-white mb-6">
                Study in Australia
              </h1>
              <p className="text-xl text-yellow-100 mb-8">
                Experience world-class education in one of the world's most livable countries. Australia offers excellent employment outcomes, great weather, and a welcoming multicultural society.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => setLocation("/contact")}
                  className="bg-white text-yellow-700 hover:bg-yellow-50 rounded-full px-8 py-3"
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
                    <p className="text-4xl font-bold text-white">43</p>
                    <p className="text-yellow-100">Universities</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-white">7/43</p>
                    <p className="text-yellow-100">In Global Top 100</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-white">87%</p>
                    <p className="text-yellow-100">Graduate Employment</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-white">48 hrs</p>
                    <p className="text-yellow-100">Work/Fortnight</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Australia Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#07173d] mb-4">Why Study in Australia?</h2>
            <p className="text-xl text-[#48608f] max-w-2xl mx-auto">
              Australia combines academic excellence with an unmatched lifestyle and strong career prospects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Sun, title: "Quality of Life", desc: "Great weather, beautiful cities, and outdoor lifestyle" },
              { icon: Briefcase, title: "Work Rights", desc: "Work 48 hours/fortnight during studies, full-time in breaks" },
              { icon: Globe, title: "Multicultural Society", desc: "Safe, friendly environment with diverse communities" },
              { icon: GraduationCap, title: "World-Class Education", desc: "7 universities in global top 100 rankings" },
            ].map((item, idx) => (
              <Card key={idx} className="p-6 border-0 shadow-md hover:shadow-lg transition-shadow">
                <item.icon className="w-12 h-12 text-yellow-600 mb-4" />
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
            <h2 className="text-4xl font-bold text-[#07173d] mb-4">Top Australian Universities</h2>
            <p className="text-xl text-[#48608f]">Study at Australia's Group of Eight leading institutions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topUniversities.map((uni, idx) => (
              <Card key={idx} className="p-6 border border-[#d0d8e8] hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold text-yellow-600">#{uni.ranking}</span>
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
            <p className="text-xl text-[#48608f]">Explore in-demand programs in Australia</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularCourses.map((course, idx) => (
              <Card key={idx} className="p-4 border border-[#d0d8e8] hover:border-yellow-500 transition-colors cursor-pointer">
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
                <DollarSign className="w-12 h-12 text-yellow-600" />
                <h2 className="text-2xl font-bold text-[#07173d]">Costs & Funding</h2>
              </div>
              <ul className="space-y-4">
                <li className="flex justify-between">
                  <span className="text-[#48608f]">Tuition Fees</span>
                  <span className="font-semibold text-[#07173d]">AUD 20,000 - 45,000/year</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[#48608f]">Living Costs</span>
                  <span className="font-semibold text-[#07173d]">AUD 21,000 - 27,000/year</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[#48608f]">Scholarships Available</span>
                  <span className="font-semibold text-green-600">Yes - Multiple Options</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 border-0 shadow-md">
              <div className="flex items-center gap-4 mb-6">
                <MapPin className="w-12 h-12 text-yellow-600" />
                <h2 className="text-2xl font-bold text-[#07173d]">Visa & Work</h2>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <p className="font-semibold text-[#07173d]">Student Visa (Subclass 500)</p>
                    <p className="text-sm text-[#48608f]">Valid for program duration</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <p className="font-semibold text-[#07173d]">Work During Studies</p>
                    <p className="text-sm text-[#48608f]">48 hours per fortnight</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <p className="font-semibold text-[#07173d]">Temporary Graduate Visa</p>
                    <p className="text-sm text-[#48608f]">2-4 years post-study work rights</p>
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
            <p className="text-xl text-[#48608f]">Get answers to common questions about studying in Australia</p>
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

      {/* CTA Section */}
      <section className="py-20 bg-[#f7f9ff]">
        <div className="container">
          <CTASection
            title="Start Your Australian Education Journey"
            subtitle="Get expert guidance on university selection, applications, and visa process"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}