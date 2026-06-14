import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Award, Target, Briefcase, GraduationCap, CheckCircle2, MapPin } from "lucide-react";
import MotionWrapper from "@/components/animations/MotionWrapper";
import Reveal from "@/components/animations/Reveal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CTASection from "@/components/CTASection";

export default function SuccessStories() {
  const [, setLocation] = useLocation();

  const successStories = [
    {
      id: 1,
      name: "Eshanth V.",
      background: "Higher Secondary, Tamil Nadu",
      university: "University of the West of Scotland, London",
      program: "Undergraduate Programme",
      location: "🇬🇧 UK",
      achievement: "Offer letter secured and CAS processed",
      visa: "✓ UK Student Visa in Progress",
      quote: "Nawins Education guided me through every document and deadline. The team was always available to answer my questions.",
      currentStatus: "Preparing for departure to London",
      avatar: "EV",
      color: "from-blue-400 to-blue-600",
    },
    {
      id: 2,
      name: "Praveen K.",
      background: "Graduate, Tamil Nadu",
      university: "Ulster University London",
      program: "MSc International Business",
      location: "🇬🇧 UK",
      achievement: "CAS issued, UK Student Visa approved",
      visa: "✓ UK Student Visa Approved",
      quote: "My visa was handled with precision. I am now studying in London thanks to the dedicated support from Nawins.",
      currentStatus: "Currently studying in London",
      avatar: "PK",
      color: "from-indigo-400 to-indigo-600",
    },
    {
      id: 3,
      name: "Deepan K.",
      background: "Graduate, Tamil Nadu",
      university: "The University of Law, Business School",
      program: "Business Programme",
      location: "🇬🇧 UK",
      achievement: "Conditional offer received within weeks",
      visa: "✓ CAS Shield Processed",
      quote: "The counseling team knew exactly which universities matched my profile. The process was fast and stress-free.",
      currentStatus: "Offer accepted, preparing for enrollment",
      avatar: "DK",
      color: "from-purple-400 to-purple-600",
    },
    {
      id: 4,
      name: "Hanish J.",
      background: "Engineering Graduate, Tamil Nadu",
      university: "Ulster University London",
      program: "MSc Civil Engineering",
      location: "🇬🇧 UK",
      achievement: "Multiple offers from top UK institutions",
      visa: "✓ Application Active",
      quote: "Nawins helped me apply to three universities at the same time. I received offers from all of them and could choose the best.",
      currentStatus: "Offer accepted, HDFC Credila loan in progress",
      avatar: "HJ",
      color: "from-teal-400 to-teal-600",
    },
    {
      id: 5,
      name: "Karthick S.",
      background: "Graduate, Tamil Nadu",
      university: "University of Chester",
      program: "Postgraduate Programme",
      location: "🇬🇧 UK",
      achievement: "CAS issued, enrollment completed",
      visa: "✓ UK Student Visa Approved",
      quote: "The application support was exceptional. I couldn't have done it without NAWINS Edutech.",
      currentStatus: "Software Engineer at Goldman Sachs, London",
      avatar: "RP",
      color: "from-purple-400 to-purple-600",
    },
    {
      id: 6,
      name: "Divya Krishnan",
      background: "MBBS from CMC Vellore",
      university: "University of British Columbia",
      program: "MSc Public Health",
      location: "🇨🇦 Canada",
      achievement: "Medical professional pursuing specialization",
      visa: "✓ Study Permit Approved - Healthcare pathway",
      quote: "Professional and thorough counseling. They understood my unique healthcare background.",
      currentStatus: "Working in Canadian Healthcare System",
      avatar: "DK",
      color: "from-cyan-400 to-cyan-600",
    },
  ];

  const statistics = [
    {
      icon: GraduationCap,
      number: "1200+",
      label: "Students Placed",
      description: "Successfully admitted to leading universities",
    },
    {
      icon: Target,
      number: "95%",
      label: "Visa Success Rate",
      description: "Outstanding visa approval statistics",
    },
    {
      icon: Award,
      number: "750+",
      label: "Partner Universities",
      description: "Network across UK, Canada, Australia, Ireland & Europe",
    },
    {
      icon: Briefcase,
      number: "₹50+ Crore",
      label: "Scholarships Secured",
      description: "Total value of scholarships for our students",
    },
  ];

  const journeySteps = [
    {
      step: 1,
      title: "Initial Consultation",
      desc: "Free counseling to understand your goals, profile, and aspirations",
      icon: Target,
    },
    {
      step: 2,
      title: "Profile Assessment",
      desc: "Comprehensive evaluation of your academic and professional background",
      icon: Award,
    },
    {
      step: 3,
      title: "University Shortlisting",
      desc: "Personalized list of universities matching your profile and goals",
      icon: CheckCircle2,
    },
    {
      step: 4,
      title: "Application Support",
      desc: "Expert help with application forms, essays, and document preparation",
      icon: Briefcase,
    },
    {
      step: 5,
      title: "Interview Prep",
      desc: "Mock interviews and preparation for university admission interviews",
      icon: GraduationCap,
    },
    {
      step: 6,
      title: "Visa & Beyond",
      desc: "Complete visa support and pre-departure orientation",
      icon: MapPin,
    },
  ];

  const getInitials = (name: string) => name.split(" ").map(n => n[0]).join("");

  return (
    <div className="min-h-screen bg-[#f7f9ff]">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-[#091f54] via-[#163886] to-[#1b47a8]">
        <MotionWrapper initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="container">
            <h1 className="text-5xl font-bold text-white mb-6">Success Stories</h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              Real students, real achievements. Read how our counseling helped transform dreams into reality.
            </p>
          </div>
        </MotionWrapper>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#07173d] mb-4">By The Numbers</h2>
              <p className="text-xl text-[#48608f]">Our proven track record of student success</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statistics.map((stat, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <Card className="p-8 border border-[#d0d8e8] text-center hover:shadow-lg transition-all">
                  <stat.icon className="w-12 h-12 text-[#17337d] mx-auto mb-4" />
                  <p className="text-4xl font-bold text-[#07173d] mb-2">{stat.number}</p>
                  <p className="font-semibold text-[#355183] mb-2">{stat.label}</p>
                  <p className="text-sm text-[#48608f]">{stat.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Grid */}
      <section className="py-20 bg-[#f7f9ff]">
        <div className="container">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#07173d] mb-4">Student Testimonials</h2>
              <p className="text-xl text-[#48608f]">Inspiring journeys of our successful students</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, idx) => (
              <Reveal key={story.id} delay={idx * 0.1}>
                <Card className="overflow-hidden border border-[#d0d8e8] hover:shadow-xl transition-all">
                  <div className={`bg-gradient-to-r ${story.color} h-32 flex items-end justify-center pb-6`}>
                    <Avatar className="h-20 w-20 border-4 border-white">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${story.name}`} />
                      <AvatarFallback className={`bg-gradient-to-r ${story.color} text-white`}>{getInitials(story.name)}</AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#07173d] mb-1">{story.name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg">{story.location}</span>
                      <span className="text-sm font-semibold text-[#355183]">{story.university}</span>
                    </div>
                    <p className="text-sm text-[#48608f] mb-1">
                      <span className="font-semibold">Program:</span> {story.program}
                    </p>
                    <p className="text-sm text-[#48608f] mb-4">
                      <span className="font-semibold">Background:</span> {story.background}
                    </p>

                    {/* Badges */}
                    <div className="space-y-2 mb-4">
                      <div className="bg-amber-50 p-2 rounded-lg flex items-center gap-2">
                        <span className="text-amber-600">⭐</span>
                        <span className="text-sm text-amber-900 font-semibold">{story.achievement}</span>
                      </div>
                      <div className="bg-green-50 p-2 rounded-lg flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-900 font-semibold">{story.visa}</span>
                      </div>
                    </div>

                    {/* Quote */}
                    <p className="text-sm italic text-[#48608f] mb-3 border-l-4 border-[#17337d] pl-3">
                      "{story.quote}"
                    </p>

                    {/* Current Status */}
                    <div className="bg-[#f7f9ff] p-3 rounded-lg">
                      <p className="text-xs font-semibold text-[#355183] mb-1">Current Status</p>
                      <p className="text-sm text-[#07173d] font-semibold">{story.currentStatus}</p>
                    </div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The Nawins Journey */}
      <section className="py-20 bg-white">
        <div className="container">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#07173d] mb-4">The Nawins Education Journey</h2>
              <p className="text-xl text-[#48608f]">How we guide students from dream to destination</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {journeySteps.map((item, idx) => (
              <Reveal key={item.step} delay={idx * 0.1}>
                <Card className="p-6 border border-[#d0d8e8] hover:shadow-lg transition-all relative">
                  <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-r from-[#17337d] to-[#213a5b] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{item.step}</span>
                  </div>
                  <item.icon className="w-10 h-10 text-[#17337d] mb-4" />
                  <h3 className="text-lg font-bold text-[#07173d] mb-2">{item.title}</h3>
                  <p className="text-[#48608f]">{item.desc}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Destination Breakdown */}
      <section className="py-20 bg-[#f7f9ff]">
        <div className="container">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#07173d] mb-4">Where Our Students Study</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { flag: "🇬🇧", name: "UK", count: "450+ students", color: "from-blue-500 to-blue-600" },
              { flag: "🇨🇦", name: "Canada", count: "320+ students", color: "from-red-500 to-red-600" },
              { flag: "🇦🇺", name: "Australia", count: "280+ students", color: "from-yellow-500 to-yellow-600" },
              { flag: "🇮🇪", name: "Ireland", count: "100+ students", color: "from-green-500 to-green-600" },
              { flag: "🇪🇺", name: "Europe", count: "50+ students", color: "from-purple-500 to-purple-600" },
            ].map((dest, idx) => (
              <Reveal key={dest.name} delay={idx * 0.1}>
                <Card className={`bg-gradient-to-br ${dest.color} p-8 text-white text-center hover:shadow-lg transition-all`}>
                  <div className="text-5xl mb-3">{dest.flag}</div>
                  <h3 className="text-2xl font-bold mb-1">{dest.name}</h3>
                  <p className="text-sm font-semibold">{dest.count}</p>
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
            title="Ready to Write Your Success Story?"
            subtitle="Join thousands of successful students who have transformed their dreams into reality with Nawins Education counseling"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
