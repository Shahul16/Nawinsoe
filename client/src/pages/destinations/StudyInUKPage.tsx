import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { GraduationCap, MapPin, Clock, DollarSign, CheckCircle, Star, Briefcase, Globe } from "lucide-react";
import CTASection from "@/components/CTASection";
import { useState } from "react";

export default function StudyInUK() {
  const [, setLocation] = useLocation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "What are the entry requirements for UK universities?",
      answer: "Most UK universities require a bachelor's degree with good grades (typically 60%+ for top universities), English proficiency (IELTS 6.0-7.0), and relevant work experience for MBA programs. Specific requirements vary by university and course."
    },
    {
      question: "How much does it cost to study in the UK?",
      answer: "Tuition fees range from £15,000 to £40,000 per year depending on the university and course. Living costs are approximately £12,000-£18,000 per year outside London, and £15,000-£20,000 in London."
    },
    {
      question: "Can I work while studying in the UK?",
      answer: "Yes, international students can work up to 20 hours per week during term time and full-time during holidays. The Graduate Route visa allows you to stay and work for 2 years (3 years for PhD graduates) after completing your studies."
    },
    {
      question: "What is the Graduate Route visa?",
      answer: "The Graduate Route allows international students who have completed a degree at a UK university to stay and work in the UK for up to 2 years (or 3 years for PhD graduates). This is a great opportunity to gain international work experience."
    },
  ];

  const topUniversities = [
    { name: "University of Oxford", ranking: 1, location: "Oxford" },
    { name: "University of Cambridge", ranking: 2, location: "Cambridge" },
    { name: "Imperial College London", ranking: 6, location: "London" },
    { name: "UCL (University College London)", ranking: 9, location: "London" },
    { name: "University of Edinburgh", ranking: 22, location: "Edinburgh" },
    { name: "University of Manchester", ranking: 27, location: "Manchester" },
  ];

  const popularCourses = [
    "Business & Management",
    "Computer Science & IT",
    "Engineering",
    "Finance & Accounting",
    "Data Science & Analytics",
    "Medicine & Healthcare",
    "Law",
    "Marketing",
  ];

  return (
    <div className="min-h-screen bg-[#f7f9ff]">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-[#091f54] via-[#163886] to-[#1b47a8]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-400/20 px-4 py-2 text-sm font-semibold text-amber-300 mb-4">
                <Star className="w-4 h-4" />
                World-Class Education
              </span>
              <h1 className="text-5xl font-bold text-white mb-6">
                Study in the United Kingdom
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Experience education at some of the world's most prestigious universities. The UK offers globally recognized degrees, rich cultural heritage, and excellent career opportunities.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => setLocation("/contact")}
                  className="bg-white text-[#091f54] hover:bg-blue-50 rounded-full px-8 py-3"
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
                    <p className="text-4xl font-bold text-white">183</p>
                    <p className="text-blue-200">Universities</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-white">4</p>
                    <p className="text-blue-200">In Top 10 Global</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-white">95%</p>
                    <p className="text-blue-200">Graduate Employment</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-white">2 Years</p>
                    <p className="text-blue-200">Post-Study Work Visa</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why UK Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#07173d] mb-4">Why Study in the UK?</h2>
            <p className="text-xl text-[#48608f] max-w-2xl mx-auto">
              The UK is home to some of the world's oldest and most prestigious universities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: GraduationCap, title: "World-Class Education", desc: "Globally recognized degrees from top-ranked universities" },
              { icon: Clock, title: "Shorter Duration", desc: "Complete your Master's in just 1 year" },
              { icon: Briefcase, title: "Work Opportunities", desc: "Work 20 hours/week during studies, 2 years post-study" },
              { icon: Globe, title: "Multicultural Environment", desc: "Join students from 200+ countries" },
            ].map((item, idx) => (
              <Card key={idx} className="p-6 border-0 shadow-md hover:shadow-lg transition-shadow">
                <item.icon className="w-12 h-12 text-[#17337d] mb-4" />
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
            <h2 className="text-4xl font-bold text-[#07173d] mb-4">Top UK Universities</h2>
            <p className="text-xl text-[#48608f]">Study at world-renowned institutions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topUniversities.map((uni, idx) => (
              <Card key={idx} className="p-6 border border-[#d0d8e8] hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold text-[#17337d]">#{uni.ranking}</span>
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
            <p className="text-xl text-[#48608f]">Explore in-demand programs in the UK</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularCourses.map((course, idx) => (
              <Card key={idx} className="p-4 border border-[#d0d8e8] hover:border-[#17337d] transition-colors cursor-pointer">
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
                <DollarSign className="w-12 h-12 text-[#17337d]" />
                <h2 className="text-2xl font-bold text-[#07173d]">Costs & Funding</h2>
              </div>
              <ul className="space-y-4">
                <li className="flex justify-between">
                  <span className="text-[#48608f]">Tuition Fees</span>
                  <span className="font-semibold text-[#07173d]">£15,000 - £40,000/year</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[#48608f]">Living Costs</span>
                  <span className="font-semibold text-[#07173d]">£12,000 - £18,000/year</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[#48608f]">Scholarships Available</span>
                  <span className="font-semibold text-green-600">Yes - Multiple Options</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 border-0 shadow-md">
              <div className="flex items-center gap-4 mb-6">
                <MapPin className="w-12 h-12 text-[#17337d]" />
                <h2 className="text-2xl font-bold text-[#07173d]">Visa Information</h2>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <p className="font-semibold text-[#07173d]">Student Visa (Tier 4)</p>
                    <p className="text-sm text-[#48608f]">Valid for duration of course</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <p className="font-semibold text-[#07173d]">Work Rights</p>
                    <p className="text-sm text-[#48608f]">20 hours/week during term</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <p className="font-semibold text-[#07173d]">Graduate Route</p>
                    <p className="text-sm text-[#48608f]">2 years post-study work visa</p>
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
            <p className="text-xl text-[#48608f]">Get answers to common questions about studying in the UK</p>
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
            title="Start Your UK Education Journey"
            subtitle="Get expert guidance on university selection, applications, and visa process"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}