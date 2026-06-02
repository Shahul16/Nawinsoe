import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Globe, Users, TrendingUp, Award, BookOpen, DollarSign, Briefcase, MapPin } from "lucide-react";
import MotionWrapper from "@/components/animations/MotionWrapper";
import Reveal from "@/components/animations/Reveal";
import CTASection from "@/components/CTASection";

export default function Destinations() {
  const [, setLocation] = useLocation();

  const destinations = [
    {
      id: "uk",
      name: "United Kingdom",
      flag: "🇬🇧",
      shortDesc: "World-class education with global reputation",
      fullDesc: "Study at prestigious UK universities with a heritage of excellence. Explore diverse courses, vibrant student life, and international career opportunities.",
      benefits: [
        "Globally recognized degrees",
        "1-2 year Masters programs",
        "Work visa opportunities (PSW)",
        "Multicultural student community",
        "Oxford, Cambridge, and Russell Group universities",
      ],
      topUniversities: [
        "University of Oxford",
        "University of Cambridge",
        "Imperial College London",
        "LSE",
        "University of Manchester",
      ],
      courses: [
        "Business & Management",
        "Engineering",
        "Computer Science",
        "Medicine & Health",
        "Law",
      ],
      career: "Access to Global 500 companies, strong alumni network, Post-Study Work visa available",
      costs: "£15,000 - £40,000 per year",
      duration: "1-2 years for Masters, 3 years for Bachelors",
      visa: "Student visa (Tier 4) with post-study work rights",
      color: "from-blue-600 to-blue-400",
    },
    {
      id: "canada",
      name: "Canada",
      flag: "🇨🇦",
      shortDesc: "Safe, welcoming environment with pathway to permanent residency",
      fullDesc: "Experience quality education in a multicultural nation known for safety and innovation. Strong pathways to work permits and permanent residency.",
      benefits: [
        "Affordable compared to UK/US",
        "Post-graduation work permits (PGWP)",
        "Pathway to permanent residency",
        "Safety and quality of life",
        "Strong tech and research sectors",
      ],
      topUniversities: [
        "University of Toronto",
        "University of British Columbia",
        "McGill University",
        "McMaster University",
        "University of Waterloo",
      ],
      courses: [
        "Software Engineering",
        "Business",
        "Data Science",
        "Environmental Science",
        "Healthcare",
      ],
      career: "Strong PR pathway, PGWP up to 3 years, access to North American market",
      costs: "CAD 15,000 - 30,000 per year",
      duration: "1-2 years for Masters, 4 years for Bachelors",
      visa: "Study permit with PGWP pathway to PR",
      color: "from-red-600 to-red-400",
    },
    {
      id: "australia",
      name: "Australia",
      flag: "🇦🇺",
      shortDesc: "Exceptional quality of life with world-class education",
      fullDesc: "Pursue education in one of the world's most livable countries with strong employment outcomes and excellent university rankings.",
      benefits: [
        "High-ranked universities",
        "Great weather and lifestyle",
        "Work rights during studies",
        "Skill migration opportunities",
        "Strong graduate employment",
      ],
      topUniversities: [
        "University of Melbourne",
        "Australian National University",
        "University of Sydney",
        "UNSW Sydney",
        "Monash University",
      ],
      courses: [
        "Engineering",
        "Business",
        "Healthcare",
        "Agriculture",
        "Technology",
      ],
      career: "Work up to 48 hours/fortnight, TSS visa opportunities, skilled migration points",
      costs: "AUD 20,000 - 45,000 per year",
      duration: "1.5-2 years for Masters, 3 years for Bachelors",
      visa: "Student visa with work rights and pathways to PR",
      color: "from-yellow-600 to-yellow-400",
    },
    {
      id: "ireland",
      name: "Ireland",
      flag: "🇮🇪",
      shortDesc: "EU gateway with rich culture and strong tech industry",
      fullDesc: "Study in the EU's innovation hub with access to European opportunities and a thriving tech ecosystem. Affordable quality education.",
      benefits: [
        "EU location",
        "Strong tech industry (Silicon Valley of Europe)",
        "Work rights on campus and off-campus",
        "Pathway to EU residence",
        "Rich culture and history",
      ],
      topUniversities: [
        "Trinity College Dublin",
        "University College Dublin",
        "University of Cork",
        "DCU",
        "NUI Galway",
      ],
      courses: [
        "Computer Science",
        "Software Engineering",
        "Business Analytics",
        "Data Science",
        "Engineering",
      ],
      career: "Access to EU tech companies, work rights, startup ecosystem",
      costs: "€8,000 - 25,000 per year",
      duration: "1-2 years for Masters, 3-4 years for Bachelors",
      visa: "Student visa with work rights",
      color: "from-green-600 to-green-400",
    },
    {
      id: "europe",
      name: "Europe (Broader)",
      flag: "🇪🇺",
      shortDesc: "Diverse opportunities across multiple countries and cultures",
      fullDesc: "Explore a wide range of European countries offering diverse education systems, cultures, and career pathways. Many with lower tuition fees.",
      benefits: [
        "Diverse education systems",
        "Multiple countries to choose from",
        "Erasmus+ opportunities",
        "Cultural immersion",
        "Affordable options available",
      ],
      topUniversities: [
        "ETH Zurich (Switzerland)",
        "Technical University of Munich (Germany)",
        "KU Leuven (Belgium)",
        "University of Amsterdam (Netherlands)",
        "Sorbonne (France)",
      ],
      courses: [
        "Engineering",
        "Business",
        "Research",
        "Architecture",
        "Medicine",
      ],
      career: "EU work rights in many countries, diverse opportunities, Erasmus placement potential",
      costs: "€5,000 - 30,000 per year (varies by country)",
      duration: "1-2 years for Masters, 3-4 years for Bachelors",
      visa: "Student visa varies by country",
      color: "from-purple-600 to-purple-400",
    },
  ];

  const comparisonMetrics = [
    {
      metric: "Quality of Education",
      uk: "★★★★★",
      canada: "★★★★★",
      australia: "★★★★★",
      ireland: "★★★★☆",
    },
    {
      metric: "Cost (Budget-friendly)",
      uk: "★★★☆☆",
      canada: "★★★★☆",
      australia: "★★★☆☆",
      ireland: "★★★★☆",
    },
    {
      metric: "Work Opportunities",
      uk: "★★★★☆",
      canada: "★★★★★",
      australia: "★★★★☆",
      ireland: "★★★★☆",
    },
    {
      metric: "PR/Settlement Path",
      uk: "★★★☆☆",
      canada: "★★★★★",
      australia: "★★★★☆",
      ireland: "★★★☆☆",
    },
    {
      metric: "Career Growth",
      uk: "★★★★★",
      canada: "★★★★★",
      australia: "★★★★☆",
      ireland: "★★★★☆",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f9ff]">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-[#091f54] via-[#163886] to-[#1b47a8]">
        <MotionWrapper initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="container">
            <h1 className="text-5xl font-bold text-white mb-6">Study Destinations</h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              Explore premium international destinations and find your perfect study abroad match
            </p>
          </div>
        </MotionWrapper>
      </section>

      {/* Destinations Grid */}
      <section className="py-20 bg-[#f7f9ff]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {destinations.map((dest, idx) => (
              <Reveal key={dest.id} delay={idx * 0.1}>
                <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300">
                  <div className={`bg-gradient-to-r ${dest.color} h-24 p-6 flex items-center justify-between`}>
                    <div>
                      <h2 className="text-3xl font-bold text-white">{dest.name}</h2>
                    </div>
                    <span className="text-6xl">{dest.flag}</span>
                  </div>
                  <div className="p-6">
                    <p className="text-[#355183] font-semibold mb-2">{dest.shortDesc}</p>
                    <p className="text-[#48608f] text-sm mb-6">{dest.fullDesc}</p>

                    {/* Key Benefits */}
                    <div className="mb-6">
                      <h3 className="text-sm font-bold text-[#07173d] mb-3">Key Benefits</h3>
                      <ul className="space-y-1 text-sm text-[#48608f]">
                        {dest.benefits.slice(0, 3).map((benefit, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="text-amber-500">✓</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-xs text-[#355183] font-semibold">Costs</p>
                        <p className="text-sm text-[#07173d] font-bold">{dest.costs}</p>
                      </div>
                      <div className="bg-amber-50 p-3 rounded-lg">
                        <p className="text-xs text-[#355183] font-semibold">Duration</p>
                        <p className="text-sm text-[#07173d] font-bold">{dest.duration}</p>
                      </div>
                    </div>

                    <Button
                      onClick={() => setLocation("/contact")}
                      className="w-full bg-gradient-to-r from-[#17337d] to-[#213a5b] hover:opacity-90"
                    >
                      Get Counseling for {dest.name}
                    </Button>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Comparison */}
      <section className="py-20 bg-white">
        <div className="container">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#07173d] mb-4">Destination Comparison</h2>
              <p className="text-xl text-[#48608f]">Compare key metrics across study destinations</p>
            </div>
          </Reveal>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#17337d]">
                  <th className="text-left py-4 px-4 font-bold text-[#07173d]">Metric</th>
                  <th className="text-center py-4 px-4 font-bold text-[#07173d]">🇬🇧 UK</th>
                  <th className="text-center py-4 px-4 font-bold text-[#07173d]">🇨🇦 Canada</th>
                  <th className="text-center py-4 px-4 font-bold text-[#07173d]">🇦🇺 Australia</th>
                  <th className="text-center py-4 px-4 font-bold text-[#07173d]">🇮🇪 Ireland</th>
                </tr>
              </thead>
              <tbody>
                {comparisonMetrics.map((row, idx) => (
                  <tr key={idx} className={`border-b border-[#d0d8e8] ${idx % 2 === 0 ? "bg-white" : "bg-[#f7f9ff]"}`}>
                    <td className="py-4 px-4 font-semibold text-[#07173d]">{row.metric}</td>
                    <td className="text-center py-4 px-4 text-amber-500">{row.uk}</td>
                    <td className="text-center py-4 px-4 text-amber-500">{row.canada}</td>
                    <td className="text-center py-4 px-4 text-amber-500">{row.australia}</td>
                    <td className="text-center py-4 px-4 text-amber-500">{row.ireland}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why Choose Each */}
      <section className="py-20 bg-[#f7f9ff]">
        <div className="container">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#07173d] mb-4">Why Choose Each Destination</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {destinations.map((dest, idx) => (
              <Reveal key={dest.id} delay={idx * 0.1}>
                <Card className="p-6 border border-[#d0d8e8] bg-white hover:shadow-lg transition-all">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-4xl">{dest.flag}</span>
                    <h3 className="text-xl font-bold text-[#07173d]">{dest.name}</h3>
                  </div>
                  <p className="text-[#48608f] mb-4">{dest.fullDesc}</p>
                  <div className="bg-[#f7f9ff] p-4 rounded-lg mb-4">
                    <p className="text-sm font-semibold text-[#07173d] mb-2">Career Opportunities</p>
                    <p className="text-sm text-[#48608f]">{dest.career}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="font-semibold text-[#355183]">Top Universities</p>
                      <p className="text-[#48608f] text-xs mt-1">{dest.topUniversities.slice(0, 2).join(", ")}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-[#355183]">Popular Courses</p>
                      <p className="text-[#48608f] text-xs mt-1">{dest.courses.slice(0, 2).join(", ")}</p>
                    </div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#f7f9ff]">
        <div className="container">
          <CTASection
            title="Unsure Which Destination Is Right for You?"
            subtitle="Our expert counselors will help you choose the perfect destination based on your goals, budget, and aspirations"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
