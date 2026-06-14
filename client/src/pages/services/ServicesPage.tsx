import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import {
  MessageSquare, BookOpen, FileText, Globe, Award,
  GraduationCap, MapPin, Users, CheckCircle, ArrowRight
} from "lucide-react";

const services = [
  {
    icon: MessageSquare,
    title: "Free Student Counseling",
    tagline: "Start your journey with expert, personalised guidance — at no cost.",
    desc: "Our senior counselors assess your academic background, English proficiency, financial capacity, and career goals to create a tailored study abroad roadmap. Whether you're a school leaver or a working professional, our counseling sessions cover everything from destination selection to realistic university shortlisting.",
    details: [
      "One-on-one sessions with senior counselors",
      "Academic profile evaluation and gap analysis",
      "Destination and intake planning",
      "Budget and financial planning guidance",
      "Course suitability and career alignment",
      "Ongoing support throughout your entire journey",
    ],
    color: "from-blue-600 to-blue-400",
    bg: "bg-blue-50",
    iconColor: "text-blue-700",
  },
  {
    icon: BookOpen,
    title: "Course & University Selection",
    tagline: "Find the perfect university and programme to match your ambitions.",
    desc: "With access to over 10 active UK university partnerships and a growing international network, we match your profile to the institutions most likely to accept and support you. We compare tuition fees, rankings, entry requirements, student support services, and post-study work opportunities — so you make an informed decision.",
    details: [
      "Shortlisting from 10+ partner UK universities",
      "Course comparison: tuition, duration, rankings",
      "Entry requirement verification",
      "January, May, and September intake planning",
      "Pathway programme identification if needed",
      "University webinar and open day coordination",
    ],
    color: "from-indigo-600 to-indigo-400",
    bg: "bg-indigo-50",
    iconColor: "text-indigo-700",
  },
  {
    icon: FileText,
    title: "Application & SOP Support",
    tagline: "Professional document preparation that maximises your acceptance chances.",
    desc: "A strong application is more than filling forms — it tells your story. Our team crafts compelling Statements of Purpose (SOPs), reviews recommendation letters, verifies transcripts and certificates, and submits your application directly through our partner channel with ConnectedHE (UK). We track every application in real time.",
    details: [
      "Statement of Purpose (SOP) drafting and editing",
      "Letter of Recommendation guidance",
      "Academic transcript verification",
      "Personal statement and CV preparation",
      "Application submission via ConnectedHE UK portal",
      "Real-time application status tracking",
    ],
    color: "from-purple-600 to-purple-400",
    bg: "bg-purple-50",
    iconColor: "text-purple-700",
  },
  {
    icon: Globe,
    title: "UK Visa Guidance & CAS Processing",
    tagline: "Navigate the UK visa process with confidence — we handle the complexity.",
    desc: "Our visa team has a 95% UK Student Visa success rate. We guide you through every step of the UKVI process — from CAS Shield registration to financial document preparation, biometric appointment booking, and interview coaching. We work with CAS Shield and ConnectedHE to ensure your CAS is issued correctly and on time.",
    details: [
      "UK Student Visa (Tier 4) application management",
      "CAS Shield portal registration and tracking",
      "Financial evidence preparation and review",
      "UKVI interview preparation and mock sessions",
      "Biometric appointment assistance",
      "Visa tracking until decision received",
    ],
    color: "from-emerald-600 to-emerald-400",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-700",
  },
  {
    icon: Award,
    title: "Scholarship & Funding Assistance",
    tagline: "Reduce your financial burden with scholarship identification and applications.",
    desc: "Many of our partner universities offer merit-based and needs-based scholarships for international students. Our team identifies scholarships you qualify for and helps you prepare strong applications. We also assist with education loan applications through our banking partner HDFC Credila.",
    details: [
      "University scholarship identification",
      "Merit-based and needs-based award applications",
      "HDFC Credila education loan coordination",
      "Fee waiver and bursary applications",
      "Scholarship eligibility assessment",
      "Application essay and documentation support",
    ],
    color: "from-amber-600 to-amber-400",
    bg: "bg-amber-50",
    iconColor: "text-amber-700",
  },
  {
    icon: GraduationCap,
    title: "Language Test Preparation",
    tagline: "Achieve the score you need with targeted IELTS and TOEFL coaching.",
    desc: "English proficiency is a key requirement for most international universities. Our test preparation guidance covers IELTS, TOEFL, and Duolingo English Test — with study strategies, practice material, and coaching on band-improving techniques for listening, reading, writing, and speaking.",
    details: [
      "IELTS Academic and General Training coaching",
      "TOEFL iBT preparation guidance",
      "Duolingo English Test (DET) preparation",
      "Band score improvement strategies",
      "Mock test practice and feedback",
      "Speaking and writing module intensive support",
    ],
    color: "from-rose-600 to-rose-400",
    bg: "bg-rose-50",
    iconColor: "text-rose-700",
  },
  {
    icon: MapPin,
    title: "Pre-Departure Orientation",
    tagline: "Everything you need to know before you board the flight.",
    desc: "Leaving for an international university is a life-changing event. Our pre-departure orientation covers practical essentials — accommodation options, travel insurance, UK bank account setup, student registration at the university, and what to expect during your first few weeks. We make sure you arrive prepared.",
    details: [
      "Accommodation guidance and housing options",
      "Travel and student insurance advice",
      "UK bank account setup assistance",
      "Student registration and induction preparation",
      "Packing checklist and essential documentation",
      "24/7 contact for post-arrival questions",
    ],
    color: "from-teal-600 to-teal-400",
    bg: "bg-teal-50",
    iconColor: "text-teal-700",
  },
  {
    icon: Users,
    title: "NRI & Overseas Indian Student Services",
    tagline: "Specialised support for Non-Resident Indians seeking UK education.",
    desc: "Non-Resident Indians face unique considerations when applying to UK universities — from overseas academic credential recognition to financial arrangements across multiple countries. Our NRI counseling service addresses these specific needs with tailored guidance.",
    details: [
      "Overseas academic credential verification",
      "NRI-specific scholarship identification",
      "Cross-border financial document coordination",
      "Dual-country visa and travel guidance",
      "UK university NRI admissions support",
      "Dedicated NRI counselor availability",
    ],
    color: "from-orange-600 to-orange-400",
    bg: "bg-orange-50",
    iconColor: "text-orange-700",
  },
];

export default function Services() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="py-24 bg-gradient-to-br from-[#030f2d] via-[#06226b] to-[#081b4e]">
        <div className="container">
          <span className="inline-block rounded-full bg-[#C59D50]/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#C59D50] mb-5">
            Our Services
          </span>
          <h1 className="text-5xl font-bold text-white mb-5 max-w-3xl">
            Comprehensive Support for Your Study Abroad Journey
          </h1>
          <p className="text-xl text-blue-100/85 max-w-2xl">
            From your first free consultation to arrival at your university — we are with you at every stage.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              onClick={() => setLocation("/contact")}
              className="rounded-full bg-gradient-to-r from-[#C59D50] to-[#B78D42] px-8 py-3 font-semibold text-[#040F23]"
            >
              Book Free Consultation
            </Button>
            <Button
              onClick={() => setLocation("/destinations")}
              variant="outline"
              className="rounded-full border-white/20 text-white hover:bg-white/10 px-8 py-3"
            >
              Explore Destinations
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f7f9ff]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <Card key={idx} className="p-8 border border-blue-100/70 bg-white hover:shadow-xl transition-all">
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${service.bg} mb-5`}>
                  <service.icon className={`w-7 h-7 ${service.iconColor}`} />
                </div>
                <h2 className="text-2xl font-bold text-[#07173d] mb-1">{service.title}</h2>
                <p className={`text-sm font-semibold mb-3 bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                  {service.tagline}
                </p>
                <p className="text-[#48608f] mb-5 text-sm leading-relaxed">{service.desc}</p>
                <ul className="space-y-2">
                  {service.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-[#C59D50] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-[#355183]">{d}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: "200+", label: "Students Guided" },
              { val: "10+", label: "UK University Partners" },
              { val: "95%", label: "Visa Success Rate" },
              { val: "2023", label: "Established" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-[#f7f9ff] p-6 border border-blue-100/50">
                <p className="text-3xl font-bold text-[#17337d] mb-1">{s.val}</p>
                <p className="text-sm text-[#48608f]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-[#091f54] to-[#163886]">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Begin?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Book your free consultation today and let us map out your personalised study abroad journey.
          </p>
          <Button
            size="lg"
            onClick={() => setLocation("/contact")}
            className="rounded-full bg-gradient-to-r from-[#C59D50] to-[#B78D42] text-[#040F23] font-semibold px-10"
          >
            Get Started — It's Free
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
