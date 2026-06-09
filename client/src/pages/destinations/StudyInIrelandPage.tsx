import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { GraduationCap, MapPin, DollarSign, CheckCircle, Star, Briefcase, Globe, Heart } from "lucide-react";
import CTASection from "@/components/CTASection";
import { useState } from "react";

export default function StudyInIreland() {
  const [, setLocation] = useLocation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "What are the entry requirements for Irish universities?",
      answer: "Most Irish universities require a bachelor's degree with 55%+ grades, English proficiency (IELTS 6.0-6.5 or TOEFL 80+), and for some programs, GRE/GMAT scores. Requirements vary by university and course."
    },
    {
      question: "How much does it cost to study in Ireland?",
      answer: "Tuition fees range from €8,000 to €25,000 per year. Living costs are approximately €12,000-18,000 per year. Ireland is more affordable than the UK while offering EU-level education quality."
    },
    {
      question: "Can I work while studying in Ireland?",
      answer: "Yes, international students can work up to 20 hours per week during term and 40 hours per week during holidays. After graduation, you can apply for a Stay Back visa to work for up to 2 years."
    },
    {
      question: "Why is Ireland called the Silicon Valley of Europe?",
      answer: "Ireland hosts European headquarters of major tech companies like Google, Facebook, Apple, and Microsoft. This creates excellent internship and employment opportunities for international students, especially in tech and business."
    },
  ];

  const topUniversities = [
    { name: "Trinity College Dublin", ranking: 98, location: "Dublin" },
    { name: "University College Dublin", ranking: 129, location: "Dublin" },
    { name: "University College Cork", ranking: 280, location: "Cork" },
    { name: "Dublin City University", ranking: 490, location: "Dublin" },
    { name: "NUI Galway", ranking: 258, location: "Galway" },
    { name: "University of Limerick", ranking: 501, location: "Limerick" },
  ];

  const popularCourses = [
    "Computer Science & Software Engineering",
    "Data Science & Analytics",
    "Business & Management",
    "Pharmaceutical Sciences",
    "Finance & Accounting",
    "Engineering",
    "Digital Marketing",
    "Biotechnology",
  ];

  return (
    <div className="min-h-screen bg-[#f7f9ff]">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-green-700 via-green-600 to-green-500">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white mb-4">
                <Star className="w-4 h-4" />
                EU Gateway to Tech Careers
              </span>
              <h1 className="text-5xl font-bold text-white mb-6">
                Study in Ireland
              </h1>
              <p className="text-xl text-green-100 mb-8">
                Experience quality education in the heart of Europe's tech hub. Ireland offers affordable tuition, strong industry connections, and a warm, welcoming culture.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => setLocation("/contact")}
                  className="bg-white text-green-700 hover:bg-green-50 rounded-full px-8 py-3"
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
                    <p className="text-4xl font-bold text-white">10</p>
                    <p className="text-green-100">Universities</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-white">€8K-25K</p>
                    <p className="text-green-100">Tuition/Year</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-white">2 Years</p>
                    <p className="text-green-100">Stay Back Visa</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-white">90%</p>
                    <p className="text-green-100">Graduate Employment</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Ireland Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#07173d] mb-4">Why Study in Ireland?</h2>
            <p className="text-xl text-[#48608f] max-w-2xl mx-auto">
              Ireland combines EU-level education quality with affordability and exceptional career opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Briefcase, title: "Tech Hub", desc: "European HQ of Google, Facebook, Apple, Microsoft" },
              { icon: DollarSign, title: "Affordable", desc: "Lower tuition than UK with excellent quality" },
              { icon: Globe, title: "EU Location", desc: "Gateway to European career opportunities" },
              { icon: Heart, title: "Welcoming Culture", desc: "Friendly, safe, and English-speaking country" },
            ].map((item, idx) => (
              <Card key={idx} className="p-6 border-0 shadow-md hover:shadow-lg transition-shadow">
                <item.icon className="w-12 h-12 text-green-600 mb-4" />
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
            <h2 className="text-4xl font-bold text-[#07173d] mb-4">Top Irish Universities</h2>
            <p className="text-xl text-[#48608f]">Study at Ireland's leading institutions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topUniversities.map((uni, idx) => (
              <Card key={idx} className="p-6 border border-[#d0d8e8] hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold text-green-600">#{uni.ranking}</span>
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
            <p className="text-xl text-[#48608f]">Explore in-demand programs in Ireland</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularCourses.map((course, idx) => (
              <Card key={idx} className="p-4 border border-[#d0d8e8] hover:border-green-500 transition-colors cursor-pointer">
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
                <DollarSign className="w-12 h-12 text-green-600" />
                <h2 className="text-2xl font-bold text-[#07173d]">Costs & Funding</h2>
              </div>
              <ul className="space-y-4">
                <li className="flex justify-between">
                  <span className="text-[#48608f]">Tuition Fees</span>
                  <span className="font-semibold text-[#07173d]">€8,000 - 25,000/year</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[#48608f]">Living Costs</span>
                  <span className="font-semibold text-[#07173d]">€12,000 - 18,000/year</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[#48608f]">Scholarships Available</span>
                  <span className="font-semibold text-green-600">Yes - Multiple Options</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 border-0 shadow-md">
              <div className="flex items-center gap-4 mb-6">
                <MapPin className="w-12 h-12 text-green-600" />
                <h2 className="text-2xl font-bold text-[#07173d]">Visa & Work</h2>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <p className="font-semibold text-[#07173d]">Student Visa (Stamp 2)</p>
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
                    <p className="font-semibold text-[#07173d]">Stay Back Visa</p>
                    <p className="text-sm text-[#48608f]">Up to 2 years after graduation</p>
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
            <p className="text-xl text-[#48608f]">Get answers to common questions about studying in Ireland</p>
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
            title="Start Your Irish Education Journey"
            subtitle="Get expert guidance on university selection, applications, and visa process"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}